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
function fk({ hidden: e, children: a }) {
  const t = ot(() => new Set(e), [e]);
  return /* @__PURE__ */ n(fn.Provider, { value: t, children: a });
}
function mt(e) {
  return !We(fn).has(e);
}
function bk({ id: e, children: a, fallback: t = null }) {
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
function pk(e, a = !0) {
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
const gk = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, Nk = "0.2.0", yk = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], gt = [1, 2, 3, 4, 5, 6], Nt = [1, 2, 3], yt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], j = {
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
function kk(e) {
  if (!wa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function $k(e) {
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
function Ck(e, a) {
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
  }, [Ne, J, le, a, e]), Me = K(($) => {
    L.current = !0, $.close(), h.current = null, _.current = window.setTimeout(oe, ue.reconnectBase);
  }, [oe]), Be = K(($, F) => (c.current.set(F, $), () => {
    c.current.delete(F);
  }), []);
  return E(() => (oe(), b.current = window.setInterval(() => {
    const $ = Date.now() - s.current, F = Lt($, G.current);
    F && J(F);
    const me = h.current;
    xt($, L.current, me) && Me(me);
  }, ue.tick), () => {
    var $;
    window.clearInterval(b.current), window.clearTimeout(_.current), L.current = !1, ($ = h.current) == null || $.close(), h.current = null;
  }), [oe, Me, J]), { connection: t, lastEventAt: o, subscribe: Be };
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
function Sk(e) {
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
const vr = "_root_o4yib_2", fr = "_row_o4yib_8", br = "_box_o4yib_14", pr = "_label_o4yib_21", gr = "_lockedNote_o4yib_26", Nr = "_consequence_o4yib_34", yr = "_sample_o4yib_69", xe = {
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
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${xe.consequence} ward-check-consequence`, children: a }) : null;
}
function Cr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${xe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Sr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: xe.sample, "aria-hidden": "true", children: e }) : null;
}
function pn(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = kr(e);
  return /* @__PURE__ */ l("div", { className: `${xe.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: xe.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${xe.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (o) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, o.target.checked));
          },
          "aria-describedby": Oa(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: a, className: xe.label, children: [
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
const Er = "_nav_1mnou_2", qr = "_list_1mnou_8", Ir = "_item_1mnou_15", Mr = "_link_1mnou_25", Br = "_sep_1mnou_35", Pr = "_current_1mnou_39", Dr = "_chips_1mnou_43", Te = {
  nav: Er,
  list: qr,
  item: Ir,
  link: Mr,
  sep: Br,
  current: Pr,
  chips: Dr
};
function Or({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Te.nav, children: [
    /* @__PURE__ */ n("ol", { className: Te.list, children: e.map((t, r) => /* @__PURE__ */ l("li", { className: Te.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Te.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Te.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Te.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Te.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const Hr = "_field_1oadv_2", Fr = "_label_1oadv_8", jr = "_labelHidden_1oadv_15", Wr = "_control_1oadv_25", zr = "_mono_1oadv_44", Gr = "_area_1oadv_49", Kr = "_invalid_1oadv_56", $e = {
  field: Hr,
  label: Fr,
  labelHidden: jr,
  control: Wr,
  mono: zr,
  area: Gr,
  invalid: Kr
};
function Ur({ controlProps: e, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, ...e });
}
function Vr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Yr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Jr = { input: Ur, select: Vr, textarea: Yr };
function Xr(e, a, t) {
  const r = Jr[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Qr(e, a, t) {
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
function Zr(e) {
  const a = e.mono ? [$e.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [$e.area] : [];
  return [$e.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function el(e) {
  return e ? `${$e.label} ${$e.labelHidden} ward-field-label` : `${$e.label} ward-field-label`;
}
function A(e) {
  const a = k(), t = `${a}-msg`, r = Qr(e, a, t), o = Zr(e);
  return /* @__PURE__ */ l("div", { className: `${$e.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: el(e.labelHidden), htmlFor: a, children: e.label }),
    Xr(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${$e.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const al = "_strip_jwrf5_2", nl = "_tab_jwrf5_12", tl = "_count_jwrf5_35", La = {
  strip: al,
  tab: nl,
  count: tl
}, Qa = 7;
function rl(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function ll(e) {
  return `${La.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function Rk({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > Qa) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Qa} — the set is fixed`);
  const i = ma({ orientation: "horizontal" }), c = rl(e, a);
  return E(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: ll(o),
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
const ol = "_root_jem6y_2", il = "_segment_jem6y_7", Za = {
  root: ol,
  segment: il
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
const cl = "_sidebar_1jywv_3", sl = "_brand_1jywv_9", dl = "_mark_1jywv_17", ul = "_word_1jywv_24", hl = "_nav_1jywv_30", ml = "_navItem_1jywv_38", wl = "_group_1jywv_50", _l = "_groupName_1jywv_57", vl = "_agents_1jywv_70", fl = "_agent_1jywv_70", bl = "_agentTop_1jywv_88", pl = "_dot_1jywv_95", gl = "_agentName_1jywv_107", Nl = "_agentMeta_1jywv_120", yl = "_foot_1jywv_126", kl = "_footName_1jywv_132", $l = "_footLinks_1jywv_139", Cl = "_footLink_1jywv_139", Sl = "_root_1jywv_153", Rl = "_linkBrand_1jywv_162", Tl = "_label_1jywv_183", Ll = "_note_1jywv_188", xl = "_footer_1jywv_202", C = {
  sidebar: cl,
  brand: sl,
  mark: dl,
  word: ul,
  nav: hl,
  navItem: ml,
  group: wl,
  groupName: _l,
  new: "_new_1jywv_64",
  agents: vl,
  agent: fl,
  agentTop: bl,
  dot: pl,
  agentName: gl,
  agentMeta: Nl,
  foot: yl,
  footName: kl,
  footLinks: $l,
  footLink: Cl,
  root: Sl,
  linkBrand: Rl,
  label: Tl,
  note: Ll,
  footer: xl
};
function Al({ agent: e }) {
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
function El({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function ql({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(Al, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(El, { shared: i })
  ] });
}
function Il(e) {
  return e.destinations ?? e.items ?? [];
}
function Ml({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function Bl({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function Pl({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Dl(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Ml, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Il(e).map((a) => /* @__PURE__ */ n(Pl, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(Bl, { children: e.children })
  ] });
}
function Ol(e) {
  return "agents" in e;
}
function Tk(e) {
  return Ol(e) ? /* @__PURE__ */ n(ql, { ...e }) : /* @__PURE__ */ n(Dl, { ...e });
}
const Hl = "_mark_wlgi8_3", Fl = {
  mark: Hl
}, jl = { met: "✓", unmet: "", failed: "✕" };
function Ha({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Fl.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: jl[e]
    }
  );
}
const Wl = "_marker_br9fi_2", zl = {
  marker: Wl
}, Gl = {
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
  const r = { "--marker": Gl[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${zl.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Kl = "_root_ti0pq_2", Ul = "_chip_ti0pq_11", Vl = "_noCase_ti0pq_23", Qe = {
  root: Kl,
  chip: Ul,
  noCase: Vl
};
function Yl(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Fa({ connection: e, since: a, lastEventAt: t }) {
  const r = Yl(a, t), o = Da(r, e === "reconnecting");
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
const Jl = "_root_11rs7_2", Xl = "_context_11rs7_12", Ql = "_row_11rs7_1", Zl = "_heading_11rs7_25", eo = "_headingWrap_11rs7_33", ao = "_chips_11rs7_38", no = "_title_11rs7_45", to = "_consequence_11rs7_54", ro = "_actionsWrap_11rs7_59", lo = "_actions_11rs7_59", oo = "_action_11rs7_59", io = "_overflowPanel_11rs7_78", co = "_measure_11rs7_88", Z = {
  root: Jl,
  context: Xl,
  row: Ql,
  heading: Zl,
  headingWrap: eo,
  chips: ao,
  title: no,
  consequence: to,
  actionsWrap: ro,
  actions: lo,
  action: oo,
  overflowPanel: io,
  measure: co
};
function so({ title: e, consequence: a }) {
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
function uo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: o }) {
  return t ? r ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(en, { disclosure: o }) : a ? [/* @__PURE__ */ n(en, { disclosure: o }, "more"), /* @__PURE__ */ n(xa, { actions: e }, "actions")] : /* @__PURE__ */ n(xa, { actions: e });
}
function ho(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function mo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(xa, { actions: e }) });
}
function wo(e, a) {
  const t = k(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function _o({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: Z.context, children: [
    /* @__PURE__ */ n(Or, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Z.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function vo(...e) {
  return e.some((a) => a === null);
}
function fo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function bo(e, a, t, r, o) {
  if (o === 0 || vo(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = fo(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function po(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function go(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = g(!1);
  return E(() => {
    const s = a.current;
    if (!po(s)) return;
    const u = () => c(bo(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function No({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ l("div", { className: Z.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(v, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] });
}
function yo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Fa, { connection: e.connection, since: e.since }) : null;
}
function Lk({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], more: i = [], connection: c, onOverflow: s, density: u = "page" }) {
  const { rowRef: d, headingRef: h, actionsRef: _, measureRef: b, collapsed: L } = go(o), G = i.length > 0, { disclosure: J, close: le } = wo(L || G, _), Ne = ho(i, o, L, s);
  return /* @__PURE__ */ l("header", { className: Z.root, "data-density": u, children: [
    /* @__PURE__ */ n(_o, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: Z.row, ref: d, children: [
      /* @__PURE__ */ n("div", { ref: h, className: Z.headingWrap, children: /* @__PURE__ */ n(so, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ n(yo, { connection: c }),
        /* @__PURE__ */ n("div", { className: Z.actions, ref: _, "data-ward-actions": !0, children: /* @__PURE__ */ n(uo, { actions: o, hasMore: G, collapsed: L, onOverflow: s, disclosure: J }) })
      ] })
    ] }),
    /* @__PURE__ */ n(mo, { actions: Ne, disclosure: J, onEscape: le }),
    /* @__PURE__ */ n(No, { actions: o, hasMore: G, measureRef: b })
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
const ko = "_scrim_c7sqj_2", $o = "_drawer_c7sqj_10", Co = "_sheet_c7sqj_14", So = "_modal_c7sqj_18", Ro = "_panel_c7sqj_23", To = "_header_c7sqj_51", Lo = "_title_c7sqj_59", xo = "_body_c7sqj_63", Ao = "_close_c7sqj_90", pe = {
  scrim: ko,
  drawer: $o,
  sheet: Co,
  modal: So,
  panel: Ro,
  header: To,
  title: Lo,
  body: xo,
  close: Ao
}, Eo = ze(null), oa = [], ia = /* @__PURE__ */ new Map();
function qo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Io(e, a) {
  let t = ia.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ia.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Mo(e, a) {
  for (const t of Array.from(a.children))
    qo(t) || Io(e, t);
}
function Bo(e) {
  for (const a of e.claims) {
    const t = ia.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ia.delete(a)));
  }
}
function Po(e, a) {
  const t = { root: e, claims: [] };
  return oa.push(t), Mo(t, a), t;
}
function Do(e) {
  const a = oa.indexOf(e);
  a >= 0 && oa.splice(a, 1), Bo(e);
}
function an(e) {
  return e !== null && oa.at(-1) === e;
}
function Oo(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, E(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = Po(i, a);
    return r.current = s, () => {
      var d, h;
      const u = an(s);
      Do(s), r.current = null, u && ((h = (d = o.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), K(() => an(r.current), []);
}
function Ho(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Fo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function jo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${pe.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("header", { className: `${pe.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${pe.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${pe.body} ward-drawer-body`, children: e.children })
  ] });
}
function Wo(e) {
  return `${pe.scrim} ${pe[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function zo(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${pe.panel} ${pe[e]} ward-overlay-panel${t}${r}`;
}
function Go(e) {
  const a = We(Eo);
  return e ?? a ?? document.body;
}
function Je(e) {
  const a = N(null), t = N(null), r = k(), o = Go(e.container), i = Nn("(min-width: 768px)"), c = Ho(e.kind, i), s = Fo(e, r), u = ft(t), d = Oo(a, o, e.returnFocusTo), h = K(() => {
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
        className: Wo(c),
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
            className: zo(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${pe.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(jo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Ko = "_root_drrhx_2", Uo = "_ticket_drrhx_15", Vo = "_body_drrhx_24", ya = {
  root: Ko,
  ticket: Uo,
  body: Vo
};
function xk({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${ya.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${ya.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: ya.body, children: t })
  ] });
}
const Yo = "_root_1bfqw_2", Jo = "_figure_1bfqw_7", Xo = "_of_1bfqw_13", Qo = "_bar_1bfqw_18", Zo = "_rows_1bfqw_38", ei = "_row_1bfqw_38", ai = "_label_1bfqw_49", ni = "_amount_1bfqw_54", ye = {
  root: Yo,
  figure: Jo,
  of: Xo,
  bar: Qo,
  rows: Zo,
  row: ei,
  label: ai,
  amount: ni
};
function ti({ spent: e, ceiling: a, breakdown: t }) {
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
const ri = "_frame_mg2jl_2", li = "_table_mg2jl_6", oi = "_th_mg2jl_12", ii = "_td_mg2jl_13", ci = "_sort_mg2jl_47", si = "_row_mg2jl_53", di = "_empty_mg2jl_61", ke = {
  frame: ri,
  table: li,
  th: oi,
  td: ii,
  sort: ci,
  row: si,
  empty: di
}, ui = { asc: "ascending", desc: "descending" };
function hi(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ui[a.direction];
}
function mi(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: ke.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function wi(e) {
  return e === void 0 ? void 0 : { width: e };
}
function _i({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ke.th,
      style: wi(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": hi(e, a),
      children: mi(e, t)
    }
  );
}
function vi({ row: e, props: a }) {
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
function fi({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ke.head, children: a.map((h) => /* @__PURE__ */ n(_i, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(vi, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const bi = "_set_y5zy3_2", pi = "_legend_y5zy3_7", gi = "_row_y5zy3_15", Ni = "_control_y5zy3_20", yi = "_input_y5zy3_26", ki = "_label_y5zy3_31", $i = "_consequence_y5zy3_36", Le = {
  set: bi,
  legend: pi,
  row: gi,
  control: Ni,
  input: yi,
  label: ki,
  consequence: $i
};
function yn({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
  const u = k(), d = i ?? u;
  return /* @__PURE__ */ l("fieldset", { className: Le.set, "data-variant": s, children: [
    /* @__PURE__ */ n("legend", { className: Le.legend, children: e }),
    a.map((h) => {
      const _ = `${d}-${h.value}`, b = h.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: Le.row, children: [
        /* @__PURE__ */ l("span", { className: Le.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: d,
              className: Le.input,
              value: h.value,
              checked: t === h.value,
              disabled: o,
              "aria-describedby": Oa(b, c),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: _, className: Le.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Le.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Ci = "_root_1h1ot_2", Si = "_head_1h1ot_11", Ri = "_index_1h1ot_25", Ti = "_dot_1h1ot_29", Li = "_note_1h1ot_34", xi = "_counter_1h1ot_40", Ai = "_trailing_1h1ot_48", Ae = {
  root: Ci,
  head: Si,
  index: Ri,
  dot: Ti,
  note: Li,
  counter: xi,
  trailing: Ai
};
function Ei({ index: e }) {
  return e ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ae.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ae.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function qi({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ae.counter, "aria-hidden": "true", children: e }) : null;
}
function Ii({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ae.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ae.head, children: [
      /* @__PURE__ */ n(Ei, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Ae.note, children: t }),
    /* @__PURE__ */ n(qi, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ae.trailing, children: i })
  ] });
}
const Mi = "_strip_1qhvo_2", Bi = "_cell_1qhvo_7", Pi = "_value_1qhvo_12", Di = "_label_1qhvo_27", Ze = {
  strip: Mi,
  cell: Bi,
  value: Pi,
  label: Di
};
function Oi(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function ba({ cells: e, divided: a = !1 }) {
  return Oi(e), /* @__PURE__ */ n("dl", { className: `${Ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Ze.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ze.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Ze.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Hi = "_root_xk7sv_2", Fi = "_track_xk7sv_8", ji = "_thumb_xk7sv_35", Wi = "_labelHidden_xk7sv_53", zi = "_label_xk7sv_53", Gi = "_lockedNote_xk7sv_68", Ee = {
  root: Hi,
  track: Fi,
  thumb: ji,
  labelHidden: Wi,
  label: zi,
  lockedNote: Gi
};
function Ki(e) {
  return e ? `${Ee.label} ${Ee.labelHidden}` : Ee.label;
}
function Ie({ label: e, checked: a, onChange: t, disabled: r, locked: o, describedBy: i, labelHidden: c }) {
  const s = k(), u = o ? !0 : a, d = r || o;
  return /* @__PURE__ */ l("span", { className: `${Ee.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": u,
        "aria-label": e,
        "aria-labelledby": s,
        "aria-describedby": i,
        className: `${Ee.track} ward-switch`,
        "data-on": u,
        "data-locked": o ? !0 : void 0,
        disabled: d,
        onClick: () => !d && (t == null ? void 0 : t(!u)),
        children: /* @__PURE__ */ n("span", { className: Ee.thumb })
      }
    ),
    /* @__PURE__ */ l("span", { id: s, className: Ki(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ee.lockedNote, children: "always on" })
    ] })
  ] });
}
const Ui = "_bar_1u2kl_2", Vi = "_skip_1u2kl_11", Yi = "_mark_1u2kl_22", Ji = "_nav_1u2kl_30", Xi = "_list_1u2kl_34", Qi = "_select_1u2kl_40", Zi = "_dest_1u2kl_47", ec = "_actor_1u2kl_61", ac = "_actorMark_1u2kl_74", nc = "_actorLabel_1u2kl_79", tc = "_tagline_1u2kl_98", ie = {
  bar: Ui,
  skip: Vi,
  mark: Yi,
  nav: Ji,
  list: Xi,
  select: Qi,
  dest: Zi,
  actor: ec,
  actorMark: ac,
  actorLabel: nc,
  tagline: tc
};
function rc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function lc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function Ak({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = lc(r);
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
      /* @__PURE__ */ n("span", { className: ie.actorMark, "aria-hidden": "true", children: rc(s) })
    ] })
  ] });
}
const oc = "_tree_1lyby_2", ic = "_item_1lyby_6", cc = "_row_1lyby_10", sc = "_button_1lyby_22", ca = {
  tree: oc,
  item: ic,
  row: cc,
  button: sc
}, kn = ze(null);
function dc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ma({ orientation: "vertical" });
  return /* @__PURE__ */ n(kn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ca.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const uc = { ArrowRight: !0, ArrowLeft: !1 };
function nn(e) {
  return e ? !0 : void 0;
}
function hc(e, a) {
  const t = uc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function mc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function wc(e) {
  const a = [ca.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function _c(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function vc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function fc(e) {
  return typeof e == "string" ? e : void 0;
}
function bc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function pc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function $n(e) {
  const a = We(kn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = _c(e);
  return /* @__PURE__ */ l("li", { className: ca.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: wc(e),
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
            onClick: () => mc(e),
            onKeyDown: (r) => hc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: vc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: fc(e.label), children: e.label }),
              /* @__PURE__ */ n(bc, { value: e.detail }),
              /* @__PURE__ */ n(pc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const gc = "_frame_fdzvs_2", Nc = "_subjectRail_fdzvs_21", yc = "_subject_fdzvs_21", kc = "_rail_fdzvs_41", $c = "_record_fdzvs_63", Cc = "_recordBody_fdzvs_68", Sc = "_band_fdzvs_111", Rc = "_bandBody_fdzvs_120", Tc = "_bandActions_fdzvs_125", Lc = "_scroller_fdzvs_133", xc = "_lanes_fdzvs_151", de = {
  frame: gc,
  subjectRail: Nc,
  subject: yc,
  rail: kc,
  record: $c,
  recordBody: Cc,
  band: Sc,
  bandBody: Rc,
  bandActions: Tc,
  scroller: Lc,
  lanes: xc
};
function Ek({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: de.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function tn(e) {
  return e ? "true" : void 0;
}
function qk({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: de.subjectRail, "data-ward-subject-rail": t, "data-ruled": tn(i), children: [
    /* @__PURE__ */ n("div", { className: de.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: de.rail, "data-sticky": tn(o), "aria-label": r, children: a })
  ] });
}
function Ik({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: de.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Ii, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: de.recordBody, "data-pad": o, children: a })
  ] });
}
const Ac = "_form_1j8ub_2", Ec = "_fields_1j8ub_9", qc = "_actions_1j8ub_19", ka = {
  form: Ac,
  fields: Ec,
  actions: qc
};
function Mk({ label: e, children: a, actions: t, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: ka.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: ka.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: ka.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function Bk({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: de.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: de.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: de.bandActions, children: a })
  ] });
}
const Ic = "(max-width: 767.98px)";
function Aa({ label: e, children: a, laneCount: t }) {
  const r = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { className: de.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: r, children: a });
}
function Mc({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: de.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(A, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(Aa, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Pk({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = Nn(Ic);
  return t === void 0 ? /* @__PURE__ */ n(Aa, { label: a, children: e }) : o ? /* @__PURE__ */ n(Mc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Aa, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n(ct, { children: i.content }, i.id)) });
}
const Bc = "_block_1o5o7_2", Pc = "_sentence_1o5o7_15", Dc = "_meta_1o5o7_20", Oc = "_action_1o5o7_25", Hc = "_strip_1o5o7_29", Fc = "_loading_1o5o7_48", jc = "_label_1o5o7_56", Wc = "_counter_1o5o7_63", he = {
  block: Bc,
  sentence: Pc,
  meta: Dc,
  action: Oc,
  strip: Hc,
  loading: Fc,
  label: jc,
  counter: Wc
};
function zc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: he.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function pa({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${he.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: he.sentence, children: e }),
    t,
    /* @__PURE__ */ n(zc, { action: a })
  ] });
}
function Gc(e) {
  return /* @__PURE__ */ n(pa, { ...e });
}
function Dk({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(pa, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: he.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function Ok(e) {
  return /* @__PURE__ */ n(pa, { ...e });
}
function Hk({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(pa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: he.meta, children: [
    "failed at ",
    re(a)
  ] }) });
}
function Fk({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: he.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    re(e),
    " — showing snapshot from ",
    re(a)
  ] });
}
function jk({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: he.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    re(a)
  ] });
}
function Wk({ label: e, startedAt: a }) {
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
const Kc = "_note_tlubt_2", Uc = {
  note: Kc
};
function Vc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: Uc.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const Yc = "_card_12in3_2", Jc = "_hit_12in3_23", Xc = "_head_12in3_30", Qc = "_title_12in3_36", Zc = "_meta_12in3_44", es = "_fields_12in3_45", as = "_who_12in3_58", ns = "_sep_12in3_65", ts = "_mono_12in3_69", rs = "_field_12in3_45", ls = "_last_12in3_84", os = "_reason_12in3_96", U = {
  card: Yc,
  hit: Jc,
  head: Xc,
  title: Qc,
  meta: Zc,
  fields: es,
  who: as,
  sep: ns,
  mono: ts,
  field: rs,
  last: ls,
  reason: os
}, is = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function cs(e, a, t) {
  const r = aa(e, "blue"), o = aa(e, "orange"), i = aa(e, "green"), c = N(/* @__PURE__ */ new Set());
  E(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = is[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const ss = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : Q(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function ds(e, a) {
  return ss[a](e);
}
function us({ item: e, connection: a }) {
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
function hs({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: U.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function ms({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: U.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function ws({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: U.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: U.field, children: ds(e, t) }, t)) });
}
const Ea = (e) => e ? !0 : void 0;
function _s(e) {
  return { "--stream": Ce(e.streamStep, "id") };
}
function vs(e, a, t) {
  e == null || e(a, t);
}
function fs(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function bs({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: U.last, "data-stale": Ea(a), children: t }) : null;
}
function ga(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  cs(r, t.key, e.feed);
  const o = fs(e.feed), i = _s(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: U.hit, onClick: (c) => vs(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(hs, { item: t }),
        /* @__PURE__ */ n("p", { className: U.title, children: t.title }),
        /* @__PURE__ */ n(us, { item: t, connection: o }),
        /* @__PURE__ */ n(ms, { reason: t.blockedReason }),
        /* @__PURE__ */ n(ws, { item: t, fields: a }),
        /* @__PURE__ */ n(bs, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const ps = "_column_10sxg_3", gs = "_head_10sxg_24", Ns = "_label_10sxg_33", ys = "_count_10sxg_42", ks = "_list_10sxg_56", Ke = {
  column: ps,
  head: gs,
  label: Ns,
  count: ys,
  list: ks
};
function Cn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function $s({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: Ke.head, children: [
    /* @__PURE__ */ n("h2", { className: Ke.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: Ke.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Cs(e) {
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
function Ss({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, _ = Cn(a, r);
  return /* @__PURE__ */ l("section", { className: Ke.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n($s, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(Cs, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    h && /* @__PURE__ */ n(Vc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Rs = "_foot_8qg4p_2", Ts = "_note_8qg4p_13", Ls = "_link_8qg4p_19", $a = {
  foot: Rs,
  note: Ts,
  link: Ls
};
function zk({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: $a.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: $a.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: $a.link, href: e, children: "Configure board" })
  ] });
}
const xs = "_head_1la6p_3", As = "_identity_1la6p_12", Es = "_titleRow_1la6p_18", qs = "_title_1la6p_18", Is = "_key_1la6p_35", Ms = "_rollup_1la6p_45", Bs = "_tools_1la6p_53", Ps = "_swatch_1la6p_62", Ds = "_mark_1la6p_69", ve = {
  head: xs,
  identity: As,
  titleRow: Es,
  title: qs,
  key: Is,
  rollup: Ms,
  tools: Bs,
  swatch: Ps,
  mark: Ds
}, rn = "initials:";
function Os(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Hs(e) {
  const a = [`${ae(e.inFlight)} in flight`, Os(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${te(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${te(e.p90)}`), a.join(" · ");
}
function Fs(e) {
  return e.startsWith(rn) ? e.slice(rn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function js({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ce(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${ve.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Fs(e) }) : /* @__PURE__ */ n("span", { className: ve.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Ws({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Gk({
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
        /* @__PURE__ */ n(js, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: ve.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: ve.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: ve.rollup, "aria-live": "polite", children: Hs(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: ve.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Ws, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Fa, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const zs = "_head_kabyh_11", Gs = "_line_kabyh_12", Ks = "_cHandle_kabyh_33", Us = "_cName_kabyh_38", Vs = "_nameLine_kabyh_46", Ys = "_cLabel_kabyh_53", Js = "_cCap_kabyh_58", Xs = "_cShown_kabyh_63", Qs = "_name_kabyh_46", Zs = "_noCap_kabyh_85", ed = "_state_kabyh_99", ad = "_handle_kabyh_104", nd = "_sub_kabyh_118", I = {
  head: zs,
  line: Gs,
  cHandle: Ks,
  cName: Us,
  nameLine: Vs,
  cLabel: Ys,
  cCap: Js,
  cShown: Xs,
  name: Qs,
  noCap: Zs,
  state: ed,
  handle: ad,
  sub: nd
}, td = "can't be hidden or collapsed", rd = "terminal · counted, not a column";
function Kk() {
  return /* @__PURE__ */ l("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function ld(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function od(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function ln(e) {
  return e.gate ? td : e.terminal ? rd : od(e.agentsMounted);
}
function id(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function cd({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: I.cName, children: [
    /* @__PURE__ */ l("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    ln(e) && /* @__PURE__ */ n("span", { className: I.sub, children: ln(e) })
  ] });
}
function sd(e) {
  return e === void 0 ? "" : String(e);
}
function dd(e) {
  return e === "" ? void 0 : Number(e);
}
function ud({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => id(t, a),
      children: "⠿"
    }
  ) });
}
function hd({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(A, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: sd(a.cap), onChange: (r) => t({ ...a, cap: dd(r) }) }) });
}
function md({ stage: e, config: a, onChange: t }) {
  const r = ld(e, a.shown);
  return /* @__PURE__ */ l("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(Ie, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function wd(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function Uk({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: I.line, "data-kind": wd(e), children: [
    /* @__PURE__ */ n(ud, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(cd, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(A, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(hd, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(md, { stage: e, config: a, onChange: t })
  ] });
}
const _d = "_body_hn6d6_2", vd = "_head_hn6d6_9", fd = "_summary_hn6d6_19", bd = "_block_hn6d6_20", pd = "_actionsBlock_hn6d6_21", gd = "_title_hn6d6_41", Nd = "_note_hn6d6_46", yd = "_k_hn6d6_51", kd = "_kv_hn6d6_58", $d = "_row_hn6d6_64", Cd = "_label_hn6d6_75", Sd = "_value_hn6d6_84", Rd = "_quote_hn6d6_90", Td = "_actions_hn6d6_21", Ld = "_resolve_hn6d6_103", M = {
  body: _d,
  head: vd,
  summary: fd,
  block: bd,
  actionsBlock: pd,
  title: gd,
  note: Nd,
  k: yd,
  kv: kd,
  row: $d,
  label: Cd,
  value: Sd,
  quote: Rd,
  actions: Td,
  resolve: Ld
};
function xd(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Ad(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Ed(e) {
  const a = va(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function qd(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...fa(Ed(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", te(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...xd(e),
    ...Ad(e, a)
  ];
}
function Id({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function Md({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: M.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Bd({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: M.block, children: [
    /* @__PURE__ */ n("p", { className: M.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: M.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: M.note, children: e.agentMeta })
  ] }) : null;
}
function Vk({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = qd(e, o);
  return /* @__PURE__ */ n(Je, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: M.body, children: [
    /* @__PURE__ */ n(Md, { item: e }),
    /* @__PURE__ */ l("div", { className: M.summary, children: [
      /* @__PURE__ */ n("h2", { className: M.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: M.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: M.kv, children: d.map(([h, _]) => /* @__PURE__ */ l("div", { className: M.row, children: [
      /* @__PURE__ */ n("dt", { className: M.label, children: h }),
      /* @__PURE__ */ n("dd", { className: M.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(Bd, { item: e }),
    /* @__PURE__ */ l("div", { className: M.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: M.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: M.note, children: s })
    ] }),
    /* @__PURE__ */ n(Id, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Pd = "_root_3azmy_2", Dd = "_list_3azmy_7", Od = "_item_3azmy_12", Hd = "_box_3azmy_18", Fd = "_text_3azmy_23", jd = "_note_3azmy_28", Pe = {
  root: Pd,
  list: Dd,
  item: Od,
  box: Hd,
  text: Fd,
  note: jd
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
const Wd = "_rail_ke7ch_2", zd = "_k_ke7ch_11", Gd = "_head_ke7ch_19", Kd = "_section_ke7ch_25", Ud = "_card_ke7ch_38", Vd = "_strip_ke7ch_42", Yd = "_skeleton_ke7ch_56", Jd = "_skeletonLabel_ke7ch_70", Xd = "_bar_ke7ch_76", Qd = "_note_ke7ch_85", se = {
  rail: Wd,
  k: zd,
  head: Gd,
  section: Kd,
  card: Ud,
  strip: Vd,
  skeleton: Yd,
  skeletonLabel: Jd,
  bar: Xd,
  note: Qd
};
function Zd(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ca({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: se.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: se.k, children: e }),
    a
  ] });
}
function eu({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: se.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: se.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: se.bar, "aria-hidden": "true" }, r))
  ] });
}
function au({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(Ss, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function nu(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(au, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(eu, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function Yk(e) {
  const a = Zd(e.onOpen), t = Cn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: se.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${se.k} ${se.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ca, { title: "Card", children: /* @__PURE__ */ n("div", { className: se.card, children: t && /* @__PURE__ */ n(ga, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Ca, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: se.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(nu, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: se.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ca, { title: "Effect of this config", children: /* @__PURE__ */ n(Na, { items: e.effects, density: "compact" }) })
  ] });
}
function tu(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function ru(e) {
  return Math.ceil(e.length / 2);
}
function lu(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Sn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function ou(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = Sn(e);
  o !== void 0 && t(o), r(lu(e.type));
}
function iu(e, a, t, r, o) {
  E(() => {
    if (e !== null)
      return e.subscribe(a, (i) => ou(i, t, r, o));
  }, [e, a, t, r, o]);
}
function cu(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function su(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function du(e, a) {
  return a !== void 0 ? te(e.timeInStage) + " · waits on " + a.agent : te(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function uu(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(ru(a ?? [])) + ")"
  };
}
function hu(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function mu(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: Q(e.cost) }) : null;
}
function wu(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function _u(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function vu(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function fu(e, a) {
  return a === void 0 ? e : tu(e, a.ref);
}
function bu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ve(e) {
  return e === !0 ? "true" : void 0;
}
function Rn(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = aa(o), c = N(/* @__PURE__ */ new Set()), [s, u] = g(cu(a));
  iu(e.feed, a.key, c, u, i);
  const d = su(a, r), h = du(a, t), _ = uu(a, e.fields), b = vu(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...bu(e),
      className: "ward-workcard",
      "data-flagged": Ve(a.flagged),
      "data-selected": Ve(e.selected),
      style: _,
      ref: fu(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        hu(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          mu(a, e.fields),
          wu(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          _u(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function pu({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function gu(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Nu(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function yu(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(pu, { count: e.items.length, cap: e.column.cap });
}
function ku(e, a) {
  return e.roving ?? a;
}
function $u(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Cu(e, a) {
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
function Su(e) {
  const a = k(), t = ma({ orientation: "vertical" }), r = ku(e, t), o = gu(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ve(o), "data-gate": Ve(e.column.gate), children: [
    Nu(e.column, e.items.length, a),
    yu(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...$u(e, t), children: Cu(e, r) })
  ] });
}
function Ru(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + te(e.p50)), e.p90 !== void 0 && (a += " · p90 " + te(e.p90)), a;
}
function Tu(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Lu(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function Jk(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Ru(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      Tu(e),
      Lu(e.onConfigure),
      /* @__PURE__ */ n(Fa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function xu(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Au(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ie, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ie, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Eu(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(x, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function Xk(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": Ve(xu(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Au(e) }),
    /* @__PURE__ */ n(A, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(pn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Eu(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function Qk(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Rn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Su, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function qu(e, a) {
  const t = Sn(e);
  t !== void 0 && a(t);
}
function Iu(e, a, t) {
  E(() => {
    if (e != null)
      return e.subscribe(a, (r) => qu(r, t));
  }, [e, a, t]);
}
function Mu(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Bu(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", te(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", Q(e.cost)]), a;
}
function Pu(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Du(e, a) {
  return /* @__PURE__ */ l(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function Zk(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = g((c = a.run) == null ? void 0 : c.lastStep);
  Iu(e.feed, a.key, o);
  const i = [...Mu(a), ...Bu(a)];
  return /* @__PURE__ */ l(Je, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Pu(t, r)
    ] }),
    Du(a, e.actions)
  ] });
}
const Ou = "_card_hvxp7_2", Hu = "_head_hvxp7_17", Fu = "_mark_hvxp7_25", ju = "_name_hvxp7_37", Wu = "_chips_hvxp7_48", zu = "_description_hvxp7_54", Gu = "_run_hvxp7_59", Ku = "_sep_hvxp7_68", Uu = "_facts_hvxp7_73", Vu = "_fact_hvxp7_73", Yu = "_factLabel_hvxp7_86", Ju = "_factValue_hvxp7_90", ee = {
  card: Ou,
  head: Hu,
  mark: Fu,
  name: ju,
  chips: Wu,
  description: zu,
  run: Gu,
  sep: Ku,
  facts: Uu,
  fact: Vu,
  factLabel: Yu,
  factValue: Ju
}, Xu = { live: "done", draft: "running", paused: "meta" };
function Qu(e) {
  return e === void 0 ? ee.card : `${ee.card} ${e}`;
}
function Zu({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ee.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Xu[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function eh({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ee.description, children: e });
}
function ah({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ee.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ee.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function nh({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ee.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: ee.fact, children: [
    /* @__PURE__ */ n("dt", { className: ee.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: ee.factValue, children: a.value })
  ] }, a.label)) });
}
function th(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function rh({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, facts: i, className: c }) {
  const s = { "--stream": Ce(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": u,
      className: Qu(c),
      style: s,
      "data-selected": u,
      "data-paused": th(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: ee.head, children: [
          /* @__PURE__ */ n("span", { className: ee.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ee.name} ward-rowlink`, href: a, "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(eh, { description: e.description }),
        /* @__PURE__ */ n(ah, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Zu, { versions: e.versions }),
        /* @__PURE__ */ n(nh, { facts: i })
      ]
    }
  );
}
const lh = "_list_4dcyc_2", oh = "_row_4dcyc_11", ih = "_head_4dcyc_23", ch = "_id_4dcyc_30", sh = "_lock_4dcyc_35", dh = "_reason_4dcyc_41", uh = "_remove_4dcyc_46", hh = "_clauses_4dcyc_50", mh = "_clause_4dcyc_50", wh = "_label_4dcyc_64", _h = "_cell_4dcyc_71", vh = "_value_4dcyc_76", ne = {
  list: lh,
  row: oh,
  head: ih,
  id: ch,
  lock: sh,
  reason: dh,
  remove: uh,
  clauses: hh,
  clause: mh,
  label: wh,
  cell: _h,
  value: vh
}, Tn = ze(!1);
function e1({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Tn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ne.list, "aria-label": a, children: e }) });
}
function fh({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ne.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(A, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => t(e.key, o) });
}
function bh({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ne.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ne.reason, children: e })
  ] });
}
function ph({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: ne.head, children: [
    /* @__PURE__ */ n("span", { className: ne.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(bh, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ne.remove, children: /* @__PURE__ */ l(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function on(e, a) {
  return e.locked ? void 0 : a;
}
function a1({ rule: e, onChange: a, onRemove: t }) {
  if (!We(Tn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = on(e, a);
  return /* @__PURE__ */ l("li", { className: ne.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(ph, { rule: e, onRemove: on(e, t) }),
    /* @__PURE__ */ n("dl", { className: ne.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ne.clause, children: [
      /* @__PURE__ */ n("dt", { className: ne.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ne.cell, children: /* @__PURE__ */ n(fh, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const gh = "_ladder_wwnch_2", Nh = "_cell_wwnch_7", yh = "_empty_wwnch_26", kh = "_name_wwnch_34", $h = "_holder_wwnch_40", Ch = "_request_wwnch_46", Sh = "_swatches_wwnch_51", Rh = "_swatch_wwnch_51", Th = "_tilesFrame_wwnch_78", Lh = "_tiles_wwnch_78", xh = "_tile_wwnch_78", Ah = "_bar_wwnch_117", Eh = "_hex_wwnch_128", qh = "_note_wwnch_138", R = {
  ladder: gh,
  cell: Nh,
  empty: yh,
  name: kh,
  holder: $h,
  request: Ch,
  swatches: Sh,
  swatch: Rh,
  tilesFrame: Th,
  tiles: Lh,
  tile: xh,
  bar: Ah,
  hex: Eh,
  note: qh
}, Ih = "not validated — needs CVD matrix and dark stepping";
function Mh(e) {
  return e.reserved ? "reserved" : _a(e.step) ? "validated" : "partial";
}
function Ln(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Bh(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Ph({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Se, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Dh(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Oh(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const cn = (e) => String(e).padStart(2, "0");
function Hh(e, a, t) {
  return e === "reserved" ? "Reserved — needs revalidation" : t ? "yours" : a ?? Ln(e, void 0);
}
function Fh({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: r ? `step ${cn(e)}` : $t(e) }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: r ? t : `Step ${cn(e)} · ${t}` })
  ] });
}
function jh({ step: e, value: a, taken: t, onChange: r, presentation: o }) {
  const i = Mh(e), c = Ln(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, _ = `${d} — ${o === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...Oh(s, u), "data-validation": i, style: Bh(e, i), onClick: h, onKeyDown: (L) => Dh(L, h) }, label: _, name: d, holder: c, validation: i, note: Hh(i, t, u), step: e.step };
}
const Wh = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${R.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${R.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Fh, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${R.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Ph, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function zh(e) {
  return Wh[e.presentation](jh(e));
}
function Gh(e) {
  for (const a of e)
    if (!a.reserved && !wa(a.step)) throw new Error("colour ladder renders token steps only");
}
function Kh() {
  return /* @__PURE__ */ l("div", { className: `${R.cell} ward-ladder-cell ${R.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Uh(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Vh = { list: R.ladder, swatches: R.swatches, tiles: R.tilesFrame };
function Yh() {
  return /* @__PURE__ */ l("div", { className: `${R.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Jh = { list: Kh, swatches: () => null, tiles: Yh };
function xn(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  Gh(e.steps);
  const r = Uh(e), o = Jh[r], i = /* @__PURE__ */ l(x, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(zh, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${Vh[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: R.tiles, children: i }) : i });
}
const Xh = "_rail_1el2t_2", Qh = "_section_1el2t_12", Zh = "_sectionFlush_1el2t_22", em = "_head_1el2t_26", am = "_headLabel_1el2t_34", nm = "_sample_1el2t_42", tm = "_sampleLabel_1el2t_47", rm = "_sampleTitle_1el2t_54", lm = "_sampleMeta_1el2t_59", om = "_trace_1el2t_65", im = "_traceHead_1el2t_70", cm = "_steps_1el2t_78", sm = "_step_1el2t_78", dm = "_stepTitle_1el2t_97", um = "_hollow_1el2t_107", hm = "_stepBody_1el2t_115", mm = "_stepDetail_1el2t_127", wm = "_publish_1el2t_132", _m = "_reason_1el2t_138", vm = "_note_1el2t_143", fm = "_reveal_1el2t_148", p = {
  rail: Xh,
  section: Qh,
  sectionFlush: Zh,
  head: em,
  headLabel: am,
  sample: nm,
  sampleLabel: tm,
  sampleTitle: rm,
  sampleMeta: lm,
  trace: om,
  traceHead: im,
  steps: cm,
  step: sm,
  stepTitle: dm,
  hollow: um,
  stepBody: hm,
  stepDetail: mm,
  publish: wm,
  reason: _m,
  note: vm,
  reveal: fm
}, sn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, bm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, pm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, gm = { notSimulated: "not simulated", running: "running" };
function Nm(e) {
  return e.presentation === "foundry";
}
function ym(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function km(e, a) {
  var r;
  const t = bm[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function $m(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Cm(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Sm(e) {
  if ($m(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Rm(e) {
  const [a, t] = g(!1);
  E(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Tm(e) {
  const a = gm[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Se, { size: 6, kind: pm[e.kind], label: e.kind });
}
function Lm(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function xm(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Am(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(Rm, { kind: a.kind, children: [
    /* @__PURE__ */ n(Tm, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Lm, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(xm, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Em(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(te(a)), t.join(" · ");
}
function An(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: Em(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Am, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function qm(e) {
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
function Im(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + re(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Mm(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : Q(e.run.cost), label: "Cost" }, { value: e.run.turns ? vn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ba, { divided: !0, cells: a }) });
}
function Bm(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: Q(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: vn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Pm(e) {
  const a = Bm(e.run);
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
function Dm(e) {
  return /* @__PURE__ */ l("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(En, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function Om(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(En, { reason: e.reason, onPublish: e.onPublish }) });
}
function qn(e) {
  return /* @__PURE__ */ l("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: sn[e.run.status].role, label: sn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Hm(e, a) {
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
function Fm(e) {
  var t;
  Cm(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(qn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(qm, { sample: e.run.sample }),
    /* @__PURE__ */ n(An, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Mm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Na, { items: e.checklist }) }),
    /* @__PURE__ */ n(Dm, { reason: ym(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function jm(e) {
  var r;
  const a = Hm(e.run, e.feed);
  Sm(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(qn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Im, { sample: e.run.sample }),
    /* @__PURE__ */ n(An, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Pm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Na, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Om, { reason: km(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function n1(e) {
  return Nm(e) ? /* @__PURE__ */ n(jm, { ...e }) : /* @__PURE__ */ n(Fm, { ...e });
}
const Wm = "_list_142ip_3", zm = "_row_142ip_9", Gm = "_condition_142ip_18", Km = "_action_142ip_24", na = {
  list: Wm,
  row: zm,
  condition: Gm,
  action: Km
}, In = ze(!1);
function t1({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(In.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: na.list, "aria-label": a, children: e }) });
}
function r1({ rule: e }) {
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
function Um(e) {
  return e === "up" ? "down" : "up";
}
function Vm(e, a) {
  const t = dn(e, a.id, a.direction) ?? dn(e, a.id, Um(a.direction));
  t == null || t.focus();
}
function Pn() {
  const e = N(null), [a, t] = g(null), [r, o] = g("");
  return E(() => {
    e.current !== null && a !== null && Vm(e.current, a);
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
const Ym = "_body_1h15q_2", Jm = "_title_1h15q_8", Xm = "_section_1h15q_13", Qm = "_legend_1h15q_18", Zm = "_stages_1h15q_26", ew = "_stage_1h15q_26", aw = "_stageIndex_1h15q_44", nw = "_stageName_1h15q_50", tw = "_footer_1h15q_59", rw = "_note_1h15q_66", lw = "_reason_1h15q_71", ow = "_actions_1h15q_76", iw = "_webHead_1h15q_83", cw = "_kicker_1h15q_92", sw = "_webTitle_1h15q_99", dw = "_webBody_1h15q_105", uw = "_webSection_1h15q_109", hw = "_sectionHead_1h15q_121", mw = "_sectionNote_1h15q_129", ww = "_formLabel_1h15q_134", _w = "_identityRow_1h15q_139", vw = "_nameCell_1h15q_145", fw = "_keyCell_1h15q_150", bw = "_colourCell_1h15q_154", pw = "_colourStatus_1h15q_161", gw = "_webStages_1h15q_166", Nw = "_webStageList_1h15q_172", yw = "_webStage_1h15q_166", kw = "_webIndex_1h15q_191", $w = "_webStageName_1h15q_196", Cw = "_webMoves_1h15q_201", Sw = "_addStage_1h15q_215", Rw = "_addStageButton_1h15q_223", Tw = "_addStageNote_1h15q_231", Lw = "_webFooter_1h15q_236", xw = "_webFooterNotes_1h15q_244", Aw = "_webNote_1h15q_251", w = {
  body: Ym,
  title: Jm,
  section: Xm,
  legend: Qm,
  stages: Zm,
  stage: ew,
  stageIndex: aw,
  stageName: nw,
  footer: tw,
  note: rw,
  reason: lw,
  actions: ow,
  webHead: iw,
  kicker: cw,
  webTitle: sw,
  webBody: dw,
  webSection: uw,
  sectionHead: hw,
  sectionNote: mw,
  formLabel: ww,
  identityRow: _w,
  nameCell: vw,
  keyCell: fw,
  colourCell: bw,
  colourStatus: pw,
  webStages: gw,
  webStageList: Nw,
  webStage: yw,
  webIndex: kw,
  webStageName: $w,
  webMoves: Cw,
  addStage: Sw,
  addStageButton: Rw,
  addStageNote: Tw,
  webFooter: Lw,
  webFooterNotes: xw,
  webNote: Aw
}, Ew = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], On = "not in catalogue";
function qw(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} — ${On}` }, ...t];
}
function Iw({ stage: e, index: a, catalogue: t, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(A, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${On}`;
  return /* @__PURE__ */ n(A, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: qw(t, e.name), invalid: i, onChange: r });
}
function Hn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Mw(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Bw({ id: e, stage: a, index: t, total: r, catalogue: o, onReplace: i, onMove: c }) {
  const s = Hn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(Iw, { stage: a, index: t, catalogue: o, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(A, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Ew, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(sa, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(sa, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function Pw({ stages: e, onChange: a, catalogue: t }) {
  const r = Mw(e.length), o = Pn(), i = (s, u) => {
    const d = Mn(s, u);
    r.current = qa(r.current, s, d), o.moved({ id: r.current[d], direction: u }, Bn(Hn(e[s], s), d, e.length)), a(qa(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(Bw, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Dn, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Dw = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Ow = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Hw = "A new stream starts as a draft. Nothing runs on it until you publish it.", Fw = "Create is disabled: name the stream and give it a key first.", jw = "reorder with the ↑ ↓ buttons · min 2";
function ja(e, a) {
  return !e.reserved && _a(e.step) && a[e.step] === void 0;
}
function Ww(e, a) {
  const t = e.find((r) => ja(r, a));
  return t ? t.step : 1;
}
function zw({ stages: e, onMove: a }) {
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
function Gw({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: Hw }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Kw(e, a) {
  return e !== "" && a !== "" ? null : Fw;
}
function Uw(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = Ow, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [h, _] = g(""), [b, L] = g(""), [G, J] = g(a[0].value), [le, Ne] = g(() => Ww(t, r)), [oe, Me] = g(e.stages ?? Dw), [Be, $] = g(o[0].value), F = { name: h, key: b, streamStep: le, owner: G, stages: oe, policy: Be }, me = Kw(h, b);
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
      /* @__PURE__ */ n(zw, { stages: oe, onMove: (Re, lt) => Me(qa(oe, Re, lt)) })
    ] }),
    /* @__PURE__ */ n(yn, { legend: "Loop policy", options: o, value: Be, onChange: $ }),
    /* @__PURE__ */ n(Gw, { reason: me, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const Fn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Vw = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function Yw(e, a, t, r, o, i) {
  var s;
  const c = ((s = Fn.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function Jw(e, a) {
  return Xw(e) && Qw(e, a) && Zw(e);
}
function Xw(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Qw(e, a) {
  return e.colourStep !== null && ja({ step: e.colourStep }, a);
}
function Zw(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function e_(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${Ih}.` : ja({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function a_({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function n_({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(a_, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: Vw })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function t_({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function r_({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
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
function l_(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [o, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, L] = g("relay"), [G, J] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = Yw(o, c, u, h, b, G), Ne = Jw(le, r), oe = G.find(($) => $.kind === "agent" && $.name.trim() !== ""), Me = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(xn, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), Be = /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: e_(h, r) }),
    /* @__PURE__ */ n(A, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Je, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(t_, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(r_, { name: o, setName: i, streamKey: c, setKey: s, colour: Me, owner: Be }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: jw })
        ] }),
        /* @__PURE__ */ n(Pw, { stages: G, onChange: J })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(yn, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: Fn, onChange: L }) }),
      /* @__PURE__ */ n(n_, { ready: Ne, draft: le, agentStage: oe, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function l1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(l_, { ...e }) : /* @__PURE__ */ n(Uw, { ...e });
}
const o_ = "_row_bs8hc_2", i_ = "_cell_bs8hc_6", c_ = "_condition_bs8hc_11", s_ = "_action_bs8hc_18", d_ = "_contract_bs8hc_24", u_ = "_contractCondition_bs8hc_33", h_ = "_contractAction_bs8hc_39", V = {
  row: o_,
  cell: i_,
  condition: c_,
  action: s_,
  contract: d_,
  contractCondition: u_,
  contractAction: h_
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
function m_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { className: V.condition, title: da(e, r), children: da(e, r) }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: Wa(e, a, t) })
  ] });
}
function w_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ l("td", { className: V.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: V.condition, children: da(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: V.cell, children: Wa(e, a, t) })
  ] });
}
function __({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: V.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: V.contractCondition, children: da(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: V.contractAction, children: Wa(e, a, t, !0) })
  ] });
}
const v_ = { two: w_, four: m_, contract: __ };
function o1(e) {
  var t;
  if (!jn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = v_[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const f_ = "_column_lurgk_2", b_ = "_head_lurgk_17", p_ = "_index_lurgk_23", g_ = "_name_lurgk_29", N_ = "_meta_lurgk_38", y_ = "_mono_lurgk_43", k_ = "_gate_lurgk_50", $_ = "_reviewersLabel_lurgk_57", C_ = "_reviewers_lurgk_57", S_ = "_reviewer_lurgk_57", R_ = "_agents_lurgk_74", T_ = "_workflowColumn_lurgk_79", L_ = "_workflowHead_lurgk_96", x_ = "_stageRow_lurgk_102", A_ = "_stageLabel_lurgk_109", E_ = "_workflowTitle_lurgk_116", q_ = "_workflowMeta_lurgk_122", I_ = "_workflowGate_lurgk_127", M_ = "_gateNote_lurgk_135", B_ = "_cardNote_lurgk_140", P_ = "_reviewerList_lurgk_149", D_ = "_reviewerRow_lurgk_155", O_ = "_reviewerMark_lurgk_161", H_ = "_reviewerName_lurgk_171", F_ = "_terminalCard_lurgk_177", j_ = "_terminalCount_lurgk_186", W_ = "_workflowAgents_lurgk_192", z_ = "_mount_lurgk_198", y = {
  column: f_,
  head: b_,
  index: p_,
  name: g_,
  meta: N_,
  mono: y_,
  gate: k_,
  reviewersLabel: $_,
  reviewers: C_,
  reviewer: S_,
  agents: R_,
  workflowColumn: T_,
  workflowHead: L_,
  stageRow: x_,
  stageLabel: A_,
  workflowTitle: E_,
  workflowMeta: q_,
  workflowGate: I_,
  gateNote: M_,
  cardNote: B_,
  reviewerList: P_,
  reviewerRow: D_,
  reviewerMark: O_,
  reviewerName: H_,
  terminalCard: F_,
  terminalCount: j_,
  workflowAgents: W_,
  mount: z_
}, G_ = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function za(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Wn(e) {
  return `${Math.round(e * 100)}%`;
}
function K_({ stage: e }) {
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
function U_({ stage: e }) {
  return /* @__PURE__ */ n(ba, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: za(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function V_({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: G_[e.kind] })
  ] });
}
function Y_({ stage: e }) {
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
function J_({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(K_, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(U_, { stage: e }) : null;
}
function X_({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Q_({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(V_, { stage: e, titleId: o }),
    /* @__PURE__ */ n(Y_, { stage: e }),
    /* @__PURE__ */ n(J_, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(rh, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(X_, { onMount: t })
  ] });
}
const Z_ = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function ev({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function av({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(ev, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Wn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function nv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function tv({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: za(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: nv(e.rolledBackThisWeek) })
  ] });
}
function rv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function lv(e) {
  if (e.kind === "terminal") return `${za(e.closedThisWeek)} this week`;
  const a = rv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function ov({ stage: e, titleId: a }) {
  const t = Z_[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: lv(e) })
  ] });
}
function iv(e) {
  return e === "entry" || e === "agent";
}
function cv({ stage: e, onMount: a }) {
  return a === void 0 || !iv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function sv({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(ov, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(av, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(tv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(cv, { stage: e, onMount: t })
  ] });
}
function dv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function i1(e) {
  return dv(e) ? /* @__PURE__ */ n(sv, { ...e }) : /* @__PURE__ */ n(Q_, { ...e });
}
const uv = "_row_ve78g_6", hv = "_cell_ve78g_10", mv = "_name_ve78g_19", wv = "_chain_ve78g_26", _v = "_owner_ve78g_32", vv = "_mono_ve78g_38", fv = "_compactRow_ve78g_45", bv = "_compactCell_ve78g_54", pv = "_stack_ve78g_71", gv = "_stat_ve78g_78", Nv = "_identityLine_ve78g_85", yv = "_identity_ve78g_85", kv = "_compactName_ve78g_103", $v = "_ownerLine_ve78g_117", Cv = "_link_ve78g_130", Sv = "_emptyChain_ve78g_136", Rv = "_arrow_ve78g_142", Tv = "_muted_ve78g_143", Lv = "_define_ve78g_148", xv = "_statValue_ve78g_155", Av = "_policyId_ve78g_161", Ev = "_sub_ve78g_166", f = {
  row: uv,
  cell: hv,
  name: mv,
  chain: wv,
  owner: _v,
  mono: vv,
  compactRow: fv,
  compactCell: bv,
  stack: pv,
  stat: gv,
  identityLine: Nv,
  identity: yv,
  compactName: kv,
  ownerLine: $v,
  link: Cv,
  emptyChain: Sv,
  arrow: Rv,
  muted: Tv,
  define: Lv,
  statValue: xv,
  policyId: Av,
  sub: Ev
};
function qv(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Iv(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function zn(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Mv(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${zn(e.members)}`;
}
function Bv(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Mv(e) })
  ] }) });
}
function Pv(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function Dv(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : Pv(e) });
}
function hn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function Ov(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function Hv(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Fv({ stream: e, href: a, presentation: t }) {
  const r = Iv(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ce(e.streamStep, "chip") }, children: [
    Bv(e, a),
    Dv(e.stages, a),
    hn(Hv(e.agents), e.agents === void 0 ? void 0 : qv(e.agents), "—"),
    Ov(e.policy),
    hn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function jv(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function c1(e) {
  if (jv(e)) return Fv(e);
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
const Wv = "_row_1nbe9_2", zv = "_name_1nbe9_15", Gv = "_scope_1nbe9_25", ua = {
  row: Wv,
  name: zv,
  scope: Gv
};
function Kv(e) {
  return e === void 0 ? `${ua.row} ward-toolrow` : `${ua.row} ward-toolrow ${e}`;
}
function Uv(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Vv({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
function Yv({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Jv({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${ua.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Xv(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function s1({ tool: e, onChange: a, presentation: t }) {
  const r = k(), o = k(), i = Uv(e, t), c = Xv(t);
  return /* @__PURE__ */ l(c, { className: Kv(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Vv, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${ua.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Jv, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(Yv, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Qv = "_strip_1qtlf_2", Zv = "_head_1qtlf_10", ef = "_name_1qtlf_16", af = "_chart_1qtlf_24", nf = "_segment_1qtlf_30", tf = "_detailedChart_1qtlf_36", rf = "_rail_1qtlf_49", lf = "_section_1qtlf_55", of = "_label_1qtlf_66", cf = "_note_1qtlf_83", Y = {
  strip: Qv,
  head: Zv,
  name: ef,
  chart: af,
  segment: nf,
  detailedChart: tf,
  rail: rf,
  section: lf,
  label: of,
  note: cf
}, sf = "No item in flight to preview.", df = "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on.", uf = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark — not a theme. Two teams theming the same product produces two products.", Ia = [1, 2, 3, 4, 5, 6], ha = 100;
function hf(e, a) {
  return a.has(e) ? Ce(e, "id") : "var(--ward-color-line)";
}
function mf({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: Y.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ia.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: Y.segment,
      x: o * ha,
      y: "0",
      width: ha,
      height: "8",
      fill: hf(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function wf(e) {
  const a = e.slice(0, Ia.length);
  for (; a.length < Ia.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function _f({ identities: e }) {
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
function vf({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: Y.note, children: a ?? sf }) : /* @__PURE__ */ n(ga, { item: { ...e, streamStep: va(t.streamStep) }, onOpen: Gn(r), feed: null });
}
function ff({ draft: e }) {
  const a = { "--stream": Ce(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: Y.head, style: a, children: [
    /* @__PURE__ */ n(Se, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: Y.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...fa(e.key, e.streamStep) })
  ] });
}
function bf(e) {
  const a = wf(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("div", { className: Y.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ea, { label: "Board card", children: /* @__PURE__ */ n(vf, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ea, { label: "Streams index row", children: /* @__PURE__ */ n(ff, { draft: t }) }),
    /* @__PURE__ */ l(ea, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(_f, { identities: a }),
      /* @__PURE__ */ n("p", { className: Y.note, children: df })
    ] }),
    /* @__PURE__ */ n(ea, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: Y.note, children: uf }) })
  ] });
}
function pf({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": Ce(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: Y.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: Y.head, children: [
      /* @__PURE__ */ n(Se, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: Y.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...fa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(ga, { item: { ...a, streamStep: e.streamStep }, onOpen: Gn(r) }),
    /* @__PURE__ */ n(mf, { draft: e, streams: t })
  ] });
}
function d1(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(bf, { ...e }) : /* @__PURE__ */ n(pf, { ...e });
}
const gf = "_row_ixlg5_6", Nf = "_headCell_ixlg5_10", yf = "_cell_ixlg5_11", kf = "_name_ixlg5_23", $f = "_consequence_ixlg5_29", Cf = "_governed_ixlg5_36", Sf = "_control_ixlg5_42", Rf = "_byRole_ixlg5_48", Tf = "_webControl_ixlg5_59", Lf = "_webConsequence_ixlg5_65", xf = "_webGoverned_ixlg5_71", P = {
  row: gf,
  headCell: Nf,
  cell: yf,
  name: kf,
  consequence: $f,
  governed: Cf,
  control: Sf,
  byRole: Rf,
  webControl: Tf,
  webConsequence: Lf,
  webGoverned: xf
};
function Af({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: P.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: P.control, children: [
    /* @__PURE__ */ n(
      Ie,
      {
        label: `${e.name} — ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "PILOT" })
  ] });
}
function Ef({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(Af, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function qf(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function If({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Ie,
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
function Mf({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(If, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: qf(e) }) })
  ] });
}
function u1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Mf, { ...e }) : /* @__PURE__ */ n(Ef, { ...e });
}
const Bf = "_row_vv64h_2", Pf = "_cell_vv64h_6", Df = "_name_vv64h_25", Of = "_note_vv64h_30", Hf = "_webName_vv64h_41", Ff = "_webMeta_vv64h_47", z = {
  row: Bf,
  cell: Pf,
  name: Df,
  note: Of,
  webName: Hf,
  webMeta: Ff
}, Kn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function jf(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Wf({ component: e, onRestart: a }) {
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
function zf({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: jf(e.state) });
}
function Gf({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { ...Kn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(zf, { component: e, onRestart: a }) })
  ] });
}
function h1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Gf, { ...e }) : /* @__PURE__ */ n(Wf, { ...e });
}
const Kf = "_row_1f1gp_7", Uf = "_cell_1f1gp_11", Vf = "_next_1f1gp_28", Yf = "_headCell_1f1gp_38", Jf = "_webId_1f1gp_77", Xf = "_webPurpose_1f1gp_83", Qf = "_webMeta_1f1gp_91", Zf = "_webUrgent_1f1gp_97", O = {
  row: Kf,
  cell: Uf,
  next: Vf,
  headCell: Yf,
  webId: Jf,
  webPurpose: Xf,
  webMeta: Qf,
  webUrgent: Zf
}, eb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, ab = {
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
], nb = Object.fromEntries(Un.map((e) => [e.key, e]));
function De({ column: e, children: a }) {
  const t = nb[e];
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
function m1() {
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
function tb({ cred: e }) {
  const a = eb[e.state];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n(De, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(De, { column: "id", children: e.id }),
    /* @__PURE__ */ n(De, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(De, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(De, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(De, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function rb({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function lb({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(rb, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...ab[e.state] }) })
  ] });
}
function w1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(lb, { ...e }) : /* @__PURE__ */ n(tb, { ...e });
}
const ob = "_card_17zba_2", ib = "_head_17zba_11", cb = "_env_17zba_18", sb = "_version_17zba_25", db = "_meta_17zba_32", ub = "_webCard_17zba_37", hb = "_webRow_17zba_47", mb = "_webTitle_17zba_55", wb = "_webLine_17zba_65", _b = "_webVersion_17zba_72", vb = "_webMeta_17zba_77", W = {
  card: ob,
  head: ib,
  env: cb,
  version: sb,
  meta: db,
  webCard: ub,
  webRow: hb,
  webTitle: mb,
  webLine: wb,
  webVersion: _b,
  webMeta: vb
}, Vn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function fb({ env: e }) {
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
function bb(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [re(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function pb(e) {
  return /* @__PURE__ */ l("article", { className: `${W.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${W.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${W.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Vn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${W.version} ${W.webVersion} ${W.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${W.meta} ${W.webMeta} ${W.webLine} ward-cellmeta`, children: bb(e) })
  ] });
}
function _1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(pb, { ...e }) : /* @__PURE__ */ n(fb, { ...e });
}
const gb = "_upload_erepj_2", Nb = "_preview_erepj_7", yb = "_mark_erepj_17", kb = "_empty_erepj_22", $b = "_actions_erepj_28", Cb = "_input_erepj_33", Sb = "_reasons_erepj_41", Rb = "_reason_erepj_41", Tb = "_accepted_erepj_57", X = {
  upload: gb,
  preview: Nb,
  mark: yb,
  empty: kb,
  actions: $b,
  input: Cb,
  reasons: Sb,
  reason: Rb,
  accepted: Tb
}, Yn = 1.5, Jn = 22, Ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Yn}px at ${Jn}px`];
function Lb() {
  return { ok: !1, reasons: [Ye[1]] };
}
function xb(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function Ab(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ye[0]] : [];
}
function Eb(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ye[1]), e.querySelector("text") !== null && t.push(Ye[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function qb(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? Jn / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Yn;
  }) ? [Ye[3]] : [];
}
function v1(e) {
  const a = xb(e);
  if (a === null) return Lb();
  const t = [...Ab(a), ...Eb(a, e), ...qb(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const Ib = "Mark accepted.";
function Mb({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: X.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: X.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: X.empty }) });
}
function Bb(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Pb(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Db({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: X.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: X.result, role: "status", children: /* @__PURE__ */ n("p", { className: X.accepted, children: Ib }) }) : /* @__PURE__ */ n("div", { className: X.result, role: "status", children: /* @__PURE__ */ n("ul", { className: X.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: X.reason, children: a }, a)) }) });
}
function Ob({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Db, { result: e }) : /* @__PURE__ */ n("p", { className: `${X.result} ${Bb(e, t)}`, role: "status", children: Pb(e, t) });
}
function f1({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: X.upload, children: [
    /* @__PURE__ */ n(Mb, { current: e }),
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
    /* @__PURE__ */ n(Ob, { result: i, presentation: r })
  ] });
}
const Hb = "_row_1wp9s_7", Fb = "_cell_1wp9s_11", jb = "_head_1wp9s_28", Wb = "_name_1wp9s_34", zb = "_pinned_1wp9s_42", Gb = "_headCell_1wp9s_49", Kb = "_webName_1wp9s_88", Ub = "_webMeta_1wp9s_95", Vb = "_webWarn_1wp9s_103", q = {
  row: Hb,
  cell: Fb,
  head: jb,
  name: Wb,
  pinned: zb,
  headCell: Gb,
  webName: Kb,
  webMeta: Ub,
  webWarn: Vb
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
], Yb = Object.fromEntries(Xn.map((e) => [e.key, e]));
function Jb(e, a) {
  return `mcp.${e}.${a}`;
}
function Xb(e) {
  return Object.keys(Ga).includes(e);
}
function Qb(e) {
  return Ga[e !== void 0 && Xb(e) ? e : "unknown"];
}
function Ge({ column: e, children: a }) {
  const t = Yb[e];
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
function b1() {
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
function Zb({ server: e }) {
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
    /* @__PURE__ */ n(Ge, { column: "tools", children: e.tools.map((t) => Jb(e.name, t)).join(" · ") })
  ] });
}
function ep(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function ap(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function np({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function tp({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function rp({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function lp({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: ep(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...ap(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(np, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Qb(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n(tp, { server: e, onRestart: a }),
      /* @__PURE__ */ n(rp, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function p1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(lp, { ...e }) : /* @__PURE__ */ n(Zb, { ...e });
}
const op = "_row_1h9nq_2", ip = "_headCell_1h9nq_14", cp = "_cell_1h9nq_15", sp = "_name_1h9nq_26", dp = "_consequence_1h9nq_32", up = "_reason_1h9nq_38", hp = "_value_1h9nq_44", mp = "_webRow_1h9nq_60", wp = "_webSetting_1h9nq_71", _p = "_webName_1h9nq_79", vp = "_webConsequence_1h9nq_87", fp = "_webControl_1h9nq_93", bp = "_webState_1h9nq_106", pp = "_webChip_1h9nq_111", T = {
  row: op,
  headCell: ip,
  cell: cp,
  name: sp,
  consequence: dp,
  reason: up,
  value: hp,
  webRow: mp,
  webSetting: wp,
  webName: _p,
  webConsequence: vp,
  webControl: fp,
  webState: bp,
  webChip: pp
}, Qn = 104, Zn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function gp({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ie, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(gn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: T.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Np({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), i = Zn[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: T.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: T.headCell, children: [
      /* @__PURE__ */ n("span", { className: T.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: T.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: T.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: T.cell, children: /* @__PURE__ */ n(gp, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: T.cell, style: { width: Qn }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function et(e, a) {
  return String(e ?? a);
}
function yp(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function kp(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? et(e.value, "—");
}
function $p({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: T.webControl, children: [
    /* @__PURE__ */ n(Ie, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: T.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function Cp(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n($p, { ...e });
  const o = yp(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: T.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(gn, { options: o, value: et(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${T.webControl} ${T.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: kp(a) });
}
function Sp({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = k(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${T.row} ${T.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: T.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${T.name} ${T.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${T.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: T.webControl, children: i(c) }) : /* @__PURE__ */ n(Cp, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${T.webChip} ward-policy-chip`, style: { width: Qn }, children: /* @__PURE__ */ n(m, { ...Zn[t], size: "tag" }) })
  ] });
}
function g1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Sp, { ...e }) : /* @__PURE__ */ n(Np, { ...e });
}
const Rp = "_label_1o9za_7", Tp = "_name_1o9za_15", Lp = "_column_1o9za_24", xp = "_webFrame_1o9za_57", Ap = "_webHead_1o9za_62", Ep = "_webHeadLabel_1o9za_74", qp = "_webLabel_1o9za_112", Ip = "_webColumns_1o9za_119", Mp = "_webGroup_1o9za_125", Bp = "_webPeople_1o9za_126", Pp = "_webVia_1o9za_127", Dp = "_webMeta_1o9za_156", H = {
  label: Rp,
  name: Tp,
  column: Lp,
  webFrame: xp,
  webHead: Ap,
  webHeadLabel: Ep,
  webLabel: qp,
  webColumns: Ip,
  webGroup: Mp,
  webPeople: Bp,
  webVia: Pp,
  webMeta: Dp
}, Op = {
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
function Hp(e) {
  if (!e.matrixRole) return;
  const a = Op[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Fp({ node: e }) {
  const a = Hp(e);
  return /* @__PURE__ */ l("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(jp, { role: a, node: e }),
    /* @__PURE__ */ n(Ra, { column: Sa[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Ra, { column: Sa[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Ra, { column: Sa[2], children: e.requestedVia ?? "" })
  ] });
}
function jp({ role: e, node: a }) {
  return /* @__PURE__ */ l(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Wp({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
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
      label: /* @__PURE__ */ n(Fp, { node: t }),
      children: c
    }
  );
}
function Ta({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function zp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Ta, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Ta, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Ta, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Gp() {
  return /* @__PURE__ */ l("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function Kp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Up(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Vp({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Gp, {}),
    /* @__PURE__ */ n(dc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      $n,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Kp, { row: t }),
        detail: /* @__PURE__ */ n(zp, { row: t }),
        expanded: Up(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function N1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Vp, { ...e }) : /* @__PURE__ */ n(Wp, { ...e });
}
const Yp = "_runbook_b9agc_2", Jp = "_list_b9agc_7", Xp = "_step_b9agc_15", Qp = "_numeral_b9agc_21", Zp = "_body_b9agc_28", eg = "_head_b9agc_34", ag = "_title_b9agc_40", ng = "_detail_b9agc_45", tg = "_actions_b9agc_50", rg = "_webList_b9agc_56", lg = "_webStep_b9agc_60", og = "_webBody_b9agc_66", ig = "_webTitle_b9agc_74", cg = "_webDetail_b9agc_78", S = {
  runbook: Yp,
  list: Jp,
  step: Xp,
  numeral: Qp,
  body: Zp,
  head: eg,
  title: ag,
  detail: ng,
  actions: tg,
  webList: rg,
  webStep: lg,
  webBody: og,
  webTitle: ig,
  webDetail: cg
}, at = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function nt(e) {
  return String(e + 1).padStart(2, "0");
}
function sg({ step: e, index: a, connection: t }) {
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
function dg({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(sg, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function ug({ step: e, index: a, connection: t }) {
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
function hg({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(ug, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function y1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(hg, { ...e }) : /* @__PURE__ */ n(dg, { ...e });
}
const mg = "_list_1gu6a_2", wg = "_check_1gu6a_10", _g = "_body_1gu6a_16", vg = "_text_1gu6a_23", fg = "_pending_1gu6a_32", bg = "_measured_1gu6a_37", He = {
  list: mg,
  check: wg,
  body: _g,
  text: vg,
  pending: fg,
  measured: bg
};
function pg(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function gg({ check: e }) {
  const a = pg(e.passed);
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
function k1({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${He.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(gg, { check: a }, a.text)) });
}
const Ng = "_root_16pdz_2", yg = "_list_16pdz_9", kg = "_line_16pdz_16", $g = "_at_16pdz_43", Cg = "_text_16pdz_47", Sg = "_foot_16pdz_51", Rg = "_idle_16pdz_62", Tg = "_caret_16pdz_69", Lg = "_jump_16pdz_76", fe = {
  root: Ng,
  list: yg,
  line: kg,
  at: $g,
  text: Cg,
  foot: Sg,
  idle: Rg,
  caret: Tg,
  jump: Lg
}, xg = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Ka(e) {
  return Number.isNaN(Date.parse(e)) ? "" : xg.format(new Date(e));
}
const Ag = { warn: "warning", ok: "ok" };
function Eg({ kind: e }) {
  const a = Ag[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function qg({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Ka(e)}` });
}
function Ig({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events — as of ${Ka(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${fe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${fe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: fe.idle, children: i }),
    /* @__PURE__ */ n(qg, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function $1({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
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
      /* @__PURE__ */ n(Eg, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: fe.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(Ig, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${fe.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const Mg = "_row_11jhe_2", Bg = "_head_11jhe_14", Pg = "_author_11jhe_20", Dg = "_eta_11jhe_25", Og = "_edited_11jhe_26", Hg = "_body_11jhe_32", Fg = "_reason_11jhe_37", jg = "_actions_11jhe_42", _e = {
  row: Mg,
  head: Bg,
  author: Pg,
  eta: Dg,
  edited: Og,
  body: Hg,
  reason: Fg,
  actions: jg
}, Wg = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function zg(e) {
  return {
    queued: `Still in the outbox — editing replaces the queued row and recomputes req_hash, so ${e} receives one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed — edit and resend, or cancel the delivery."
  };
}
function Gg({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
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
function Kg({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: _e.reason, id: a, children: e })
  ] });
}
function Ug(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Vg(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Gg, { ...e }) : /* @__PURE__ */ n(Kg, { reason: e.unavailable, reasonId: e.unavailableId });
}
function C1(e) {
  const { comment: a } = e;
  Ug(e);
  const t = k(), r = `${t}-unavailable`, o = Wg[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${_e.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: _e.head, children: [
      /* @__PURE__ */ n("span", { className: _e.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: _e.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: _e.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: _e.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: _e.reason, id: t, children: zg(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: _e.actions, children: /* @__PURE__ */ n(Vg, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Yg = "_root_c46wj_2", Jg = "_attach_c46wj_11", Xg = "_actions_c46wj_17", Qg = "_reply_c46wj_23", Zg = "_replyRow_c46wj_28", eN = "_sendsAs_c46wj_42", je = {
  root: Yg,
  attach: Jg,
  actions: Xg,
  reply: Qg,
  replyRow: Zg,
  sendsAs: eN
};
function aN({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = g(""), i = k();
  return /* @__PURE__ */ l("div", { className: je.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: je.replyRow, children: [
      /* @__PURE__ */ n(A, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: je.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function S1(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(aN, { ...e }) : /* @__PURE__ */ n(nN, { ...e });
}
function nN({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
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
const tN = "_list_1ih9e_2", rN = "_item_1ih9e_6", lN = "_body_1ih9e_22", oN = "_text_1ih9e_28", iN = "_evidence_1ih9e_37", cN = "_consequence_1ih9e_49", sN = "_note_1ih9e_54", qe = {
  list: tN,
  item: rN,
  body: lN,
  text: oN,
  evidence: iN,
  consequence: cN,
  note: sN
};
function dN({ criterion: e }) {
  return /* @__PURE__ */ n(Se, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function mn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function uN(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function hN({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: qe.body, children: [
    /* @__PURE__ */ n("span", { className: qe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(mn, { text: " — " }),
      /* @__PURE__ */ n("code", { className: qe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(mn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: qe.consequence, children: uN(e.why) })
    ] })
  ] });
}
function mN({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: qe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(dN, { criterion: e }),
    /* @__PURE__ */ n(hN, { criterion: e })
  ] });
}
function R1({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(mN, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: qe.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const wN = "_list_dwhoz_2", _N = "_rung_dwhoz_6", vN = "_name_dwhoz_18", fN = "_actor_dwhoz_32", ta = {
  list: wN,
  rung: _N,
  name: vN,
  actor: fN
}, bN = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function pN({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = bN[e.state];
  return /* @__PURE__ */ l("li", { className: ta.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ta.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ta.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function T1({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ta.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(pN, { rung: a }, a.name)) });
}
const gN = "_sheet_1fqco_2", NN = "_title_1fqco_9", yN = "_stage_1fqco_15", kN = "_effects_1fqco_20", $N = "_effect_1fqco_20", CN = "_numeral_1fqco_31", SN = "_effectText_1fqco_38", RN = "_refusals_1fqco_43", TN = "_reasons_1fqco_52", LN = "_reason_1fqco_52", xN = "_actions_1fqco_62", ce = {
  sheet: gN,
  title: NN,
  stage: yN,
  effects: kN,
  effect: $N,
  numeral: CN,
  effectText: SN,
  refusals: RN,
  reasons: TN,
  reason: LN,
  actions: xN
};
function AN({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function L1({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
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
      ti,
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
      /* @__PURE__ */ n(AN, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const EN = "_list_1hvqu_2", qN = "_path_1hvqu_7", IN = "_head_1hvqu_21", MN = "_label_1hvqu_28", BN = "_consequence_1hvqu_35", PN = "_ask_1hvqu_36", Fe = {
  list: EN,
  path: qN,
  head: IN,
  label: MN,
  consequence: BN,
  ask: PN
}, Ma = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function wn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function DN({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: Ma[e.kind] }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: Ma[e.kind] }),
    /* @__PURE__ */ n("span", { className: Fe.ask, id: r, children: e.askInstead })
  ] });
}
function ON({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: Fe.path, "data-allowed": e.allowed, "data-role": wn(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: Fe.head, children: [
      /* @__PURE__ */ n("span", { className: Fe.label, children: e.title ?? Ma[e.kind] }),
      /* @__PURE__ */ n(m, { role: wn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Fe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(DN, { path: e, primary: a, onChoose: t })
  ] });
}
function x1({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Fe.list, children: e.map((t, r) => /* @__PURE__ */ n(ON, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const HN = "_list_qjv4r_2", FN = "_item_qjv4r_6", jN = "_node_qjv4r_18", WN = "_body_qjv4r_24", zN = "_head_qjv4r_30", GN = "_stage_qjv4r_36", KN = "_version_qjv4r_41", UN = "_sentence_qjv4r_49", VN = "_meta_qjv4r_54", be = {
  list: HN,
  item: FN,
  node: jN,
  body: WN,
  head: zN,
  stage: GN,
  version: KN,
  sentence: UN,
  meta: VN
}, YN = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function JN({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: be.head, children: [
    /* @__PURE__ */ n("span", { className: be.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: be.version, title: e.version, children: e.version }) : null
  ] });
}
function XN({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${be.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${be.node} ward-history-node`, children: /* @__PURE__ */ n(Se, { size: 9, kind: YN[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${be.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(JN, { entry: e }),
      /* @__PURE__ */ n("span", { className: be.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${be.meta} ward-history-meta`, children: [
        `${re(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${Q(e.cost)}`
      ] })
    ] })
  ] });
}
function A1({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${be.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(XN, { entry: a }, a.stage + String(t))) });
}
const QN = "_thread_1kn6s_3", ZN = "_turn_1kn6s_8", ey = "_who_1kn6s_27", ay = "_body_1kn6s_32", ra = {
  thread: QN,
  turn: ZN,
  who: ey,
  body: ay
}, tt = ze(!1);
function E1({ children: e, density: a }) {
  return /* @__PURE__ */ n(tt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ra.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function q1({ turn: e }) {
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
const ny = "_list_1rt9c_3", ty = "_row_1rt9c_7", ry = "_label_1rt9c_20", ly = "_n_1rt9c_26", oy = "_cause_1rt9c_33", Ue = {
  list: ny,
  row: ty,
  label: ry,
  n: ly,
  cause: oy
};
function iy(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const cy = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function sy({ row: e, formatNumber: a }) {
  return iy(e), /* @__PURE__ */ l("li", { className: `${Ue.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Se, { size: 8, ...cy[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Ue.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Ue.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(dy, { cause: e.cause })
  ] });
}
function dy({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ue.cause} ward-healthrow-cause`, children: e }) : null;
}
function I1({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(sy, { row: t, formatNumber: a }, t.label)) });
}
const uy = "_root_1jxwp_2", hy = {
  root: uy
};
function M1({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: hy.root, "data-density": o, children: [
    /* @__PURE__ */ n(Na, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const my = "_row_dhbre_3", wy = "_key_dhbre_13", _y = "_stack_dhbre_24", vy = "_value_dhbre_32", fy = "_evidence_dhbre_39", by = "_mark_dhbre_47", Oe = {
  row: my,
  key: wy,
  stack: _y,
  value: vy,
  evidence: fy,
  mark: by
};
function py({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ha, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function B1({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Oe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Oe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Oe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Oe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Oe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Oe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(py, { state: e.state }) })
  ] });
}
const gy = "_cell_1monp_2", Ny = {
  cell: gy
}, yy = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function ky(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function $y(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function Cy(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: ky(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function Sy(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function P1({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  $y(e, t);
  const r = Sy(e);
  return /* @__PURE__ */ n(
    fi,
    {
      label: "Rejection routing",
      columns: yy,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: Ny.cell, "data-norerun": o.noRerun ? !0 : void 0, children: Cy(o, i) }),
      empty: a ?? /* @__PURE__ */ n(Gc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Ry = "_row_ute8v_2", Ty = "_title_ute8v_11", Ly = "_turns_ute8v_20", xy = "_waiting_ute8v_21", Ay = "_resolved_ute8v_22", Ey = "_activity_ute8v_23", qy = "_cost_ute8v_29", Iy = "_link_ute8v_30", My = "_tableRow_ute8v_47", By = "_tableTitle_ute8v_59", Py = "_tableResolved_ute8v_64", Dy = "_tableLink_ute8v_68", Oy = "_tableMeta_ute8v_83", Hy = "_tableCost_ute8v_90", Fy = "_tableActivity_ute8v_91", jy = "_tableState_ute8v_101", Wy = "_tableRecord_ute8v_112", B = {
  row: Ry,
  title: Ty,
  turns: Ly,
  waiting: xy,
  resolved: Ay,
  activity: Ey,
  cost: qy,
  link: Iy,
  tableRow: My,
  tableTitle: By,
  tableResolved: Py,
  tableLink: Dy,
  tableMeta: Oy,
  tableCost: Hy,
  tableActivity: Fy,
  tableState: jy,
  tableRecord: Wy
}, rt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function zy(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function Gy(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Ky(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const Uy = { duplicate: "CLOSED · DUPLICATE" };
function Vy({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function Yy({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : Q(e) });
}
function Jy({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function Xy({ session: e, href: a }) {
  const t = rt[e.state];
  return /* @__PURE__ */ l("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: Gy(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: B.tableResolved, children: [
      Ky(e.resolved),
      /* @__PURE__ */ n(Vy, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(Yy, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: zy(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: Uy[e.state] ?? t.label }),
      /* @__PURE__ */ n(Jy, { link: e.link })
    ] }) })
  ] });
}
function Qy({ session: e }) {
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
function D1(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(Xy, { session: e.session, href: e.href }) : /* @__PURE__ */ n(Qy, { session: e.session });
}
const Zy = "_block_1yy2v_3", ek = "_list_1yy2v_9", ak = "_line_1yy2v_14", Ba = {
  block: Zy,
  list: ek,
  line: ak
}, nk = { warn: "warning", ok: "ok" };
function tk({ kind: e }) {
  const a = nk[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function rk({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Ba.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(tk, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function O1({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ba.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ba.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(rk, { line: t }, `${r}-${t.text}`)) }) });
}
const lk = "_band_tt7hp_1", ok = "_head_tt7hp_8", ik = "_cell_tt7hp_19", ck = "_index_tt7hp_35", sk = "_title_tt7hp_42", dk = "_note_tt7hp_48", uk = "_cellTitle_tt7hp_53", hk = "_cellBody_tt7hp_58", mk = "_tag_tt7hp_64", we = {
  band: lk,
  head: ok,
  cell: ik,
  index: ck,
  title: sk,
  note: dk,
  cellTitle: uk,
  cellBody: hk,
  tag: mk
}, _n = 4;
function H1({ index: e, title: a, note: t, cells: r }) {
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
  $1 as ActivityConsole,
  rh as AgentCard,
  Sk as AppShell,
  d1 as AppearanceStrip,
  H1 as Band,
  Ss as BoardColumn,
  zk as BoardFootnote,
  Gk as BoardHeader,
  Pk as BoardScroller,
  v as Btn,
  yk as CHIP_ROLES,
  Un as CREDENTIAL_COLUMNS,
  xk as Callout,
  u1 as CapabilityRow,
  q1 as ChatMessage,
  pn as Checkbox,
  m as Chip,
  C1 as ClarificationRow,
  a1 as ClauseRuleRow,
  e1 as ClauseRules,
  xn as ColourLadder,
  h1 as ComponentRow,
  S1 as Composer,
  Uk as ConfigRow,
  Kk as ConfigRowHead,
  Fa as ConnectionMark,
  E1 as Conversation,
  ti as CostMeter,
  w1 as CredentialRow,
  m1 as CredentialRowHead,
  R1 as CriteriaList,
  Or as Crumb,
  I1 as DeliveryHealth,
  Ok as DeniedState,
  n1 as DryRunRail,
  Gc as EmptyState,
  _1 as EnvCard,
  A as Field,
  Dk as FilteredEmpty,
  Mk as FormStack,
  Na as GateChecklist,
  T1 as GateLadder,
  fi as Grid,
  r1 as HandoffRuleRow,
  t1 as HandoffRules,
  Vk as ItemDrawer,
  yt as LIVE_EVENT_TYPES,
  Su as LegacyBoardColumn,
  Jk as LegacyBoardHeader,
  Xk as LegacyConfigRow,
  Zk as LegacyItemDrawer,
  pu as LegacyOverCapNote,
  Qk as LegacyPreviewRail,
  Rn as LegacyWorkCard,
  ge as LiveIndicator,
  Hk as LoadFailed,
  Wk as Loading,
  Xn as MCP_SERVER_COLUMNS,
  Ha as Mark,
  f1 as MarkUpload,
  Se as Marker,
  p1 as McpServerRow,
  b1 as McpServerRowHead,
  l1 as NewStreamModal,
  Vc as OverCapNote,
  Je as Overlay,
  Ih as PARTIAL_STEP_REASON,
  Qn as POLICY_CHIP_WIDTH,
  Ek as PageFrame,
  Lk as PageHeader,
  g1 as PolicyRow,
  Yk as PreviewRail,
  Sa as ROLE_MATRIX_COLUMNS,
  jn as RULE_ACTIONS,
  yn as Radio,
  M1 as ReadyChecklist,
  Ik as RecordSection,
  L1 as RequeueSheet,
  x1 as ResolveBlock,
  B1 as ResolvedFieldRow,
  N1 as RoleMatrixRow,
  P1 as RoutingTable,
  o1 as RuleRow,
  y1 as RunbookSteps,
  gt as STREAM_STEPS,
  Bk as SectionBand,
  Ii as SectionHeader,
  gn as SegmentedControl,
  D1 as SessionRow,
  Tk as Sidebar,
  i1 as StageColumn,
  A1 as StageHistory,
  Pw as StageListEditor,
  Fk as StaleStrip,
  ba as StatStrip,
  c1 as StreamRow,
  qk as SubjectRail,
  Ie as Switch,
  Rk as Tabs,
  s1 as ToolRow,
  Ak as TopBar,
  dc as Tree,
  $n as TreeRow,
  O1 as TypedInputBlock,
  k1 as ValidationList,
  fk as VisibilityProvider,
  bk as Visible,
  Nk as WARD_VERSION,
  ga as WorkCard,
  jk as WriteUnavailableStrip,
  zy as agoSince,
  ht as clock,
  e_ as colourStatus,
  ae as count,
  te as duration,
  Pa as elapsed,
  gk as eventSourceTransport,
  wa as isStreamStep,
  _a as isValidatedStreamStep,
  Mh as ladderValidation,
  Qb as mcpConnectionChip,
  Jb as mcpToolName,
  Q as money,
  ue as ms,
  Cn as ordered,
  vn as ratio,
  jf as restartLabel,
  re as stamp,
  bn as stream,
  $k as streamChip,
  fa as streamChipProps,
  Ce as streamColour,
  $t as streamHex,
  kk as streamVars,
  aa as useBorderFlash,
  ft as useFocusTrap,
  Ck as useLiveFeed,
  pk as useReturnFocus,
  ma as useRovingTabindex,
  Da as useTicker,
  mt as useVisible,
  j as v,
  v1 as validateMark,
  va as validatedStep,
  Nt as validatedStreamSteps
};
