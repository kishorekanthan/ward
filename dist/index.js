import { jsx as n, Fragment as A, jsxs as l } from "react/jsx-runtime";
import { useMemo as lt, useContext as We, createContext as ze, useCallback as K, useEffect as E, useState as g, useRef as N, useLayoutEffect as ot, useId as k, Fragment as it } from "react";
import { createPortal as ct } from "react-dom";
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
const st = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function re(e) {
  const a = st.formatToParts(new Date(e)), t = (r) => {
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
const dt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function ut(e) {
  return dt.format(new Date(e));
}
const fn = ze(/* @__PURE__ */ new Set());
function wk({ hidden: e, children: a }) {
  const t = lt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(fn.Provider, { value: t, children: a });
}
function ht(e) {
  return !We(fn).has(e);
}
function _k({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(A, { children: ht(e) ? a : t });
}
const mt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function wt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function _t(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = wt(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function vt(e) {
  return { onKeyDown: K(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(mt));
      _t(t, e.current, r);
    },
    [e]
  ) };
}
function vk(e, a = !0) {
  E(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const Va = { ArrowUp: -1, ArrowDown: 1 }, Ya = { ArrowLeft: -1, ArrowRight: 1 }, ft = (e, a, t) => Math.min(t, Math.max(a, e));
function bt(e, a) {
  if (a !== "horizontal" && e in Va) return Va[e];
  if (a !== "vertical" && e in Ya) return Ya[e];
}
function ma({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  ot(() => {
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
      const _ = Math.max(0, h.indexOf(a)), b = bt(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[ft(_ + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
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
const fk = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, bk = "0.2.0", pk = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], pt = [1, 2, 3, 4, 5, 6], gt = [1, 2, 3], Nt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], j = {
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
  return pt.includes(e);
}
function _a(e) {
  return gt.includes(e);
}
function gk(e) {
  if (!wa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function Nk(e) {
  if (!wa(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const yt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function kt(e) {
  if (!wa(e)) throw new Error("unvalidated stream step");
  return yt[e];
}
function Ja(e) {
  return typeof e != "string" ? null : Nt.includes(e) ? e : null;
}
function $t(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Ct(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function St(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Rt(e, a, t) {
  const r = $t(e);
  if (r === null) return null;
  const o = Ja(t) ?? Ja(r.type);
  return o === null ? null : { ...r, type: o, id: Ct(r, a), at: St(r) };
}
function Tt(e, a) {
  return e >= ue.staleAfter ? "stale" : e >= ue.heartbeat && a === "live" ? "reconnecting" : null;
}
function Lt(e, a, t) {
  return e >= ue.heartbeat && !a && t !== null;
}
function yk(e, a) {
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
        const Re = Rt($, F, me);
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
    const $ = Date.now() - s.current, F = Tt($, G.current);
    F && J(F);
    const me = h.current;
    Lt($, L.current, me) && Ie(me);
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
const xt = "_root_1otpc_2", Et = {
  root: xt
};
function qt(e, a, t, r, o) {
  const i = [Pa(a)];
  return e || i.push(`as of ${ut(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = Da(e, o), c = (a == null ? void 0 : a.at) ?? e, s = qt(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${Et.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      re(e)
    ] })
  ] });
}
const It = "_app_lrbcc_1", Mt = "_side_lrbcc_18", Bt = "_main_lrbcc_26", Pt = "_rail_lrbcc_33", Dt = "_page_lrbcc_40", Ot = "_root_lrbcc_91", Ht = "_topbar_lrbcc_98", Ft = "_mark_lrbcc_109", jt = "_brand_lrbcc_116", Wt = "_tagline_lrbcc_122", zt = "_identity_lrbcc_128", Gt = "_tools_lrbcc_129", Kt = "_actor_lrbcc_138", Ut = "_metadata_lrbcc_139", Vt = "_detail_lrbcc_155", Yt = "_nav_lrbcc_160", Jt = "_content_lrbcc_195", Xt = "_skip_lrbcc_218", D = {
  app: It,
  side: Mt,
  main: Bt,
  rail: Pt,
  page: Dt,
  root: Ot,
  topbar: Ht,
  mark: Ft,
  brand: jt,
  tagline: Wt,
  identity: zt,
  tools: Gt,
  actor: Kt,
  metadata: Ut,
  detail: Vt,
  nav: Yt,
  content: Jt,
  skip: Xt
};
function Qt({ sidebar: e, header: a, children: t, rail: r }) {
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
function Zt({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: D.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function la({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function er({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: D.metadata, children: [
    /* @__PURE__ */ n(la, { value: e, className: D.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(la, { value: a, className: D.detail })
  ] });
}
function ar(e) {
  return /* @__PURE__ */ l("header", { className: D.topbar, children: [
    /* @__PURE__ */ n("span", { className: D.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: D.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(la, { value: e.tagline, className: D.tagline }),
    /* @__PURE__ */ n(Zt, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: D.identity, children: /* @__PURE__ */ n(er, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(la, { value: e.tools, className: D.tools })
  ] });
}
function nr(e) {
  const a = k();
  return /* @__PURE__ */ l("div", { className: `${D.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: D.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(ar, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: D.content, children: e.children })
  ] });
}
function tr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function kk(e) {
  return tr(e) ? /* @__PURE__ */ n(Qt, { ...e }) : /* @__PURE__ */ n(nr, { ...e });
}
const rr = "_btn_llheq_2", lr = "_primary_llheq_13", or = "_secondary_llheq_23", ir = "_ghost_llheq_28", cr = "_overflow_llheq_37", sr = "_sm_llheq_44", dr = "_disabled_llheq_48", Xe = {
  btn: rr,
  primary: lr,
  secondary: or,
  ghost: ir,
  overflow: cr,
  sm: sr,
  disabled: dr
};
function ur(e, a, t, r) {
  const o = a === "sm" ? [Xe.sm, "ward-btn--sm"] : [], i = t ? [Xe.disabled] : [];
  return [Xe.btn, Xe[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function hr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function mr(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function wr(e) {
  return e.children ?? e.label;
}
function v(e) {
  mr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: ur(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...hr(a, e.controls),
      children: wr(e)
    }
  );
}
function Oa(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const _r = "_root_o4yib_2", vr = "_row_o4yib_8", fr = "_box_o4yib_14", br = "_label_o4yib_21", pr = "_lockedNote_o4yib_26", gr = "_consequence_o4yib_34", Nr = "_sample_o4yib_69", Le = {
  root: _r,
  row: vr,
  box: fr,
  label: br,
  lockedNote: pr,
  consequence: gr,
  sample: Nr
};
function yr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function kr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Le.consequence} ward-check-consequence`, children: a }) : null;
}
function $r({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Le.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Cr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Le.sample, "aria-hidden": "true", children: e }) : null;
}
function pn(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = yr(e);
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
        /* @__PURE__ */ n($r, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Cr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(kr, { id: t, text: e.consequence })
  ] });
}
const Sr = "_chip_1073r_2", Rr = {
  chip: Sr
}, Tr = {
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
function Lr(e, a) {
  if (e === "stream") return Ar(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Tr[e];
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
  return /* @__PURE__ */ n("span", { className: `${Rr.chip} ward-chip ward-chip--${e}`, style: Lr(e, t), "data-ward-chip": e, "data-size": r, children: a });
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
const xr = "_nav_fbsei_2", Er = "_list_fbsei_8", qr = "_item_fbsei_15", Ir = "_link_fbsei_24", Mr = "_current_fbsei_33", Br = "_chips_fbsei_37", Be = {
  nav: xr,
  list: Er,
  item: qr,
  link: Ir,
  current: Mr,
  chips: Br
};
function Pr({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Be.nav, children: [
    /* @__PURE__ */ n("ol", { className: Be.list, children: e.map((t, r) => /* @__PURE__ */ n("li", { className: Be.item, children: r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Be.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Be.current, "aria-current": "page", children: t.label }) }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Be.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const Dr = "_field_1oadv_2", Or = "_label_1oadv_8", Hr = "_labelHidden_1oadv_15", Fr = "_control_1oadv_25", jr = "_mono_1oadv_44", Wr = "_area_1oadv_49", zr = "_invalid_1oadv_56", $e = {
  field: Dr,
  label: Or,
  labelHidden: Hr,
  control: Fr,
  mono: jr,
  area: Wr,
  invalid: zr
};
function Gr({ controlProps: e, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, ...e });
}
function Kr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Ur({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Vr = { input: Gr, select: Kr, textarea: Ur };
function Yr(e, a, t) {
  const r = Vr[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Jr(e, a, t) {
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
function Xr(e) {
  const a = e.mono ? [$e.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [$e.area] : [];
  return [$e.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Qr(e) {
  return e ? `${$e.label} ${$e.labelHidden} ward-field-label` : `${$e.label} ward-field-label`;
}
function x(e) {
  const a = k(), t = `${a}-msg`, r = Jr(e, a, t), o = Xr(e);
  return /* @__PURE__ */ l("div", { className: `${$e.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Qr(e.labelHidden), htmlFor: a, children: e.label }),
    Yr(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${$e.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Zr = "_strip_rg8pj_2", el = "_tab_rg8pj_12", al = "_count_rg8pj_34", La = {
  strip: Zr,
  tab: el,
  count: al
}, Qa = 7;
function nl(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function tl(e) {
  return `${La.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function $k({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > Qa) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Qa} — the set is fixed`);
  const i = ma({ orientation: "horizontal" }), c = nl(e, a);
  return E(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: tl(o),
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
            s.count === void 0 ? null : /* @__PURE__ */ l(A, { children: [
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
const rl = "_root_jem6y_2", ll = "_segment_jem6y_7", Za = {
  root: rl,
  segment: ll
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
const ol = "_sidebar_1jywv_3", il = "_brand_1jywv_9", cl = "_mark_1jywv_17", sl = "_word_1jywv_24", dl = "_nav_1jywv_30", ul = "_navItem_1jywv_38", hl = "_group_1jywv_50", ml = "_groupName_1jywv_57", wl = "_agents_1jywv_70", _l = "_agent_1jywv_70", vl = "_agentTop_1jywv_88", fl = "_dot_1jywv_95", bl = "_agentName_1jywv_107", pl = "_agentMeta_1jywv_120", gl = "_foot_1jywv_126", Nl = "_footName_1jywv_132", yl = "_footLinks_1jywv_139", kl = "_footLink_1jywv_139", $l = "_root_1jywv_153", Cl = "_linkBrand_1jywv_162", Sl = "_label_1jywv_183", Rl = "_note_1jywv_188", Tl = "_footer_1jywv_202", C = {
  sidebar: ol,
  brand: il,
  mark: cl,
  word: sl,
  nav: dl,
  navItem: ul,
  group: hl,
  groupName: ml,
  new: "_new_1jywv_64",
  agents: wl,
  agent: _l,
  agentTop: vl,
  dot: fl,
  agentName: bl,
  agentMeta: pl,
  foot: gl,
  footName: Nl,
  footLinks: yl,
  footLink: kl,
  root: $l,
  linkBrand: Cl,
  label: Sl,
  note: Rl,
  footer: Tl
};
function Ll({ agent: e }) {
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
function xl({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(Ll, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(Al, { shared: i })
  ] });
}
function El(e) {
  return e.destinations ?? e.items ?? [];
}
function ql({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function Il({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function Ml({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Bl(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(ql, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: El(e).map((a) => /* @__PURE__ */ n(Ml, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(Il, { children: e.children })
  ] });
}
function Pl(e) {
  return "agents" in e;
}
function Ck(e) {
  return Pl(e) ? /* @__PURE__ */ n(xl, { ...e }) : /* @__PURE__ */ n(Bl, { ...e });
}
const Dl = "_mark_wlgi8_3", Ol = {
  mark: Dl
}, Hl = { met: "✓", unmet: "", failed: "✕" };
function Ha({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Ol.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Hl[e]
    }
  );
}
const Fl = "_marker_br9fi_2", jl = {
  marker: Fl
}, Wl = {
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
  const r = { "--marker": Wl[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${jl.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const zl = "_root_ti0pq_2", Gl = "_chip_ti0pq_11", Kl = "_noCase_ti0pq_23", Qe = {
  root: zl,
  chip: Gl,
  noCase: Kl
};
function Ul(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Fa({ connection: e, since: a, lastEventAt: t }) {
  const r = Ul(a, t), o = Da(r, e === "reconnecting");
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
const Vl = "_root_11rs7_2", Yl = "_context_11rs7_12", Jl = "_row_11rs7_1", Xl = "_heading_11rs7_25", Ql = "_headingWrap_11rs7_33", Zl = "_chips_11rs7_38", eo = "_title_11rs7_45", ao = "_consequence_11rs7_54", no = "_actionsWrap_11rs7_59", to = "_actions_11rs7_59", ro = "_action_11rs7_59", lo = "_overflowPanel_11rs7_78", oo = "_measure_11rs7_88", Z = {
  root: Vl,
  context: Yl,
  row: Jl,
  heading: Xl,
  headingWrap: Ql,
  chips: Zl,
  title: eo,
  consequence: ao,
  actionsWrap: no,
  actions: to,
  action: ro,
  overflowPanel: lo,
  measure: oo
};
function io({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: Z.heading, children: [
    /* @__PURE__ */ n("h1", { className: Z.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: Z.consequence, children: a })
  ] });
}
function Aa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: Z.action, "data-action": "", children: a }, t));
}
function en({ disclosure: e }) {
  return /* @__PURE__ */ n(v, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function co({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: o }) {
  return t ? r ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(en, { disclosure: o }) : a ? [/* @__PURE__ */ n(en, { disclosure: o }, "more"), /* @__PURE__ */ n(Aa, { actions: e }, "actions")] : /* @__PURE__ */ n(Aa, { actions: e });
}
function so(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function uo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Aa, { actions: e }) });
}
function ho(e, a) {
  const t = k(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function mo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: Z.context, children: [
    /* @__PURE__ */ n(Pr, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Z.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function wo(...e) {
  return e.some((a) => a === null);
}
function _o(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function vo(e, a, t, r, o) {
  if (o === 0 || wo(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = _o(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function fo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function bo(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = g(!1);
  return E(() => {
    const s = a.current;
    if (!fo(s)) return;
    const u = () => c(vo(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function po({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ l("div", { className: Z.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(v, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] });
}
function go({ connection: e }) {
  return e ? /* @__PURE__ */ n(Fa, { connection: e.connection, since: e.since }) : null;
}
function Sk({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], more: i = [], connection: c, onOverflow: s, density: u = "page" }) {
  const { rowRef: d, headingRef: h, actionsRef: _, measureRef: b, collapsed: L } = bo(o), G = i.length > 0, { disclosure: J, close: le } = ho(L || G, _), Ne = so(i, o, L, s);
  return /* @__PURE__ */ l("header", { className: Z.root, "data-density": u, children: [
    /* @__PURE__ */ n(mo, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: Z.row, ref: d, children: [
      /* @__PURE__ */ n("div", { ref: h, className: Z.headingWrap, children: /* @__PURE__ */ n(io, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ n(go, { connection: c }),
        /* @__PURE__ */ n("div", { className: Z.actions, ref: _, "data-ward-actions": !0, children: /* @__PURE__ */ n(co, { actions: o, hasMore: G, collapsed: L, onOverflow: s, disclosure: J }) })
      ] })
    ] }),
    /* @__PURE__ */ n(uo, { actions: Ne, disclosure: J, onEscape: le }),
    /* @__PURE__ */ n(po, { actions: o, hasMore: G, measureRef: b })
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
const No = "_scrim_c7sqj_2", yo = "_drawer_c7sqj_10", ko = "_sheet_c7sqj_14", $o = "_modal_c7sqj_18", Co = "_panel_c7sqj_23", So = "_header_c7sqj_51", Ro = "_title_c7sqj_59", To = "_body_c7sqj_63", Lo = "_close_c7sqj_90", pe = {
  scrim: No,
  drawer: yo,
  sheet: ko,
  modal: $o,
  panel: Co,
  header: So,
  title: Ro,
  body: To,
  close: Lo
}, Ao = ze(null), oa = [], ia = /* @__PURE__ */ new Map();
function xo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Eo(e, a) {
  let t = ia.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ia.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function qo(e, a) {
  for (const t of Array.from(a.children))
    xo(t) || Eo(e, t);
}
function Io(e) {
  for (const a of e.claims) {
    const t = ia.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ia.delete(a)));
  }
}
function Mo(e, a) {
  const t = { root: e, claims: [] };
  return oa.push(t), qo(t, a), t;
}
function Bo(e) {
  const a = oa.indexOf(e);
  a >= 0 && oa.splice(a, 1), Io(e);
}
function an(e) {
  return e !== null && oa.at(-1) === e;
}
function Po(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, E(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = Mo(i, a);
    return r.current = s, () => {
      var d, h;
      const u = an(s);
      Bo(s), r.current = null, u && ((h = (d = o.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), K(() => an(r.current), []);
}
function Do(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Oo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ho({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${pe.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n("header", { className: `${pe.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${pe.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${pe.body} ward-drawer-body`, children: e.children })
  ] });
}
function Fo(e) {
  return `${pe.scrim} ${pe[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function jo(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${pe.panel} ${pe[e]} ward-overlay-panel${t}${r}`;
}
function Wo(e) {
  const a = We(Ao);
  return e ?? a ?? document.body;
}
function Je(e) {
  const a = N(null), t = N(null), r = k(), o = Wo(e.container), i = Nn("(min-width: 768px)"), c = Do(e.kind, i), s = Oo(e, r), u = vt(t), d = Po(a, o, e.returnFocusTo), h = K(() => {
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
  }, [h]), ct(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Fo(c),
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
            className: jo(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${pe.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Ho, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const zo = "_root_drrhx_2", Go = "_ticket_drrhx_15", Ko = "_body_drrhx_24", ya = {
  root: zo,
  ticket: Go,
  body: Ko
};
function Rk({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${ya.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${ya.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: ya.body, children: t })
  ] });
}
const Uo = "_root_1bfqw_2", Vo = "_figure_1bfqw_7", Yo = "_of_1bfqw_13", Jo = "_bar_1bfqw_18", Xo = "_rows_1bfqw_38", Qo = "_row_1bfqw_38", Zo = "_label_1bfqw_49", ei = "_amount_1bfqw_54", ye = {
  root: Uo,
  figure: Vo,
  of: Yo,
  bar: Jo,
  rows: Xo,
  row: Qo,
  label: Zo,
  amount: ei
};
function ai({ spent: e, ceiling: a, breakdown: t }) {
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
const ni = "_frame_mg2jl_2", ti = "_table_mg2jl_6", ri = "_th_mg2jl_12", li = "_td_mg2jl_13", oi = "_sort_mg2jl_47", ii = "_row_mg2jl_53", ci = "_empty_mg2jl_61", ke = {
  frame: ni,
  table: ti,
  th: ri,
  td: li,
  sort: oi,
  row: ii,
  empty: ci
}, si = { asc: "ascending", desc: "descending" };
function di(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return si[a.direction];
}
function ui(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: ke.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function hi(e) {
  return e === void 0 ? void 0 : { width: e };
}
function mi({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ke.th,
      style: hi(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": di(e, a),
      children: ui(e, t)
    }
  );
}
function wi({ row: e, props: a }) {
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
function _i({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ke.head, children: a.map((h) => /* @__PURE__ */ n(mi, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(wi, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const vi = "_set_y5zy3_2", fi = "_legend_y5zy3_7", bi = "_row_y5zy3_15", pi = "_control_y5zy3_20", gi = "_input_y5zy3_26", Ni = "_label_y5zy3_31", yi = "_consequence_y5zy3_36", Te = {
  set: vi,
  legend: fi,
  row: bi,
  control: pi,
  input: gi,
  label: Ni,
  consequence: yi
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
const ki = "_root_1h1ot_2", $i = "_head_1h1ot_11", Ci = "_index_1h1ot_25", Si = "_dot_1h1ot_29", Ri = "_note_1h1ot_34", Ti = "_counter_1h1ot_40", Li = "_trailing_1h1ot_48", Ae = {
  root: ki,
  head: $i,
  index: Ci,
  dot: Si,
  note: Ri,
  counter: Ti,
  trailing: Li
};
function Ai({ index: e }) {
  return e ? /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n("span", { className: `${Ae.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ae.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function xi({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ae.counter, "aria-hidden": "true", children: e }) : null;
}
function Ei({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ae.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ae.head, children: [
      /* @__PURE__ */ n(Ai, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Ae.note, children: t }),
    /* @__PURE__ */ n(xi, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ae.trailing, children: i })
  ] });
}
const qi = "_strip_1qhvo_2", Ii = "_cell_1qhvo_7", Mi = "_value_1qhvo_12", Bi = "_label_1qhvo_27", Ze = {
  strip: qi,
  cell: Ii,
  value: Mi,
  label: Bi
};
function Pi(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function ba({ cells: e, divided: a = !1 }) {
  return Pi(e), /* @__PURE__ */ n("dl", { className: `${Ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Ze.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ze.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Ze.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Di = "_root_xk7sv_2", Oi = "_track_xk7sv_8", Hi = "_thumb_xk7sv_35", Fi = "_labelHidden_xk7sv_53", ji = "_label_xk7sv_53", Wi = "_lockedNote_xk7sv_68", xe = {
  root: Di,
  track: Oi,
  thumb: Hi,
  labelHidden: Fi,
  label: ji,
  lockedNote: Wi
};
function zi(e) {
  return e ? `${xe.label} ${xe.labelHidden}` : xe.label;
}
function qe({ label: e, checked: a, onChange: t, disabled: r, locked: o, describedBy: i, labelHidden: c }) {
  const s = k(), u = o ? !0 : a, d = r || o;
  return /* @__PURE__ */ l("span", { className: `${xe.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": u,
        "aria-label": e,
        "aria-labelledby": s,
        "aria-describedby": i,
        className: `${xe.track} ward-switch`,
        "data-on": u,
        "data-locked": o ? !0 : void 0,
        disabled: d,
        onClick: () => !d && (t == null ? void 0 : t(!u)),
        children: /* @__PURE__ */ n("span", { className: xe.thumb })
      }
    ),
    /* @__PURE__ */ l("span", { id: s, className: zi(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: xe.lockedNote, children: "always on" })
    ] })
  ] });
}
const Gi = "_bar_1u2kl_2", Ki = "_skip_1u2kl_11", Ui = "_mark_1u2kl_22", Vi = "_nav_1u2kl_30", Yi = "_list_1u2kl_34", Ji = "_select_1u2kl_40", Xi = "_dest_1u2kl_47", Qi = "_actor_1u2kl_61", Zi = "_actorMark_1u2kl_74", ec = "_actorLabel_1u2kl_79", ac = "_tagline_1u2kl_98", ie = {
  bar: Gi,
  skip: Ki,
  mark: Ui,
  nav: Vi,
  list: Yi,
  select: Ji,
  dest: Xi,
  actor: Qi,
  actorMark: Zi,
  actorLabel: ec,
  tagline: ac
};
function nc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function tc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function Tk({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = tc(r);
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
      /* @__PURE__ */ n("span", { className: ie.actorMark, "aria-hidden": "true", children: nc(s) })
    ] })
  ] });
}
const rc = "_tree_1lyby_2", lc = "_item_1lyby_6", oc = "_row_1lyby_10", ic = "_button_1lyby_22", ca = {
  tree: rc,
  item: lc,
  row: oc,
  button: ic
}, kn = ze(null);
function cc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ma({ orientation: "vertical" });
  return /* @__PURE__ */ n(kn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ca.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const sc = { ArrowRight: !0, ArrowLeft: !1 };
function nn(e) {
  return e ? !0 : void 0;
}
function dc(e, a) {
  const t = sc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function uc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function hc(e) {
  const a = [ca.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function mc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function wc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function _c(e) {
  return typeof e == "string" ? e : void 0;
}
function vc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function fc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function $n(e) {
  const a = We(kn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = mc(e);
  return /* @__PURE__ */ l("li", { className: ca.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: hc(e),
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
            onClick: () => uc(e),
            onKeyDown: (r) => dc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: wc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: _c(e.label), children: e.label }),
              /* @__PURE__ */ n(vc, { value: e.detail }),
              /* @__PURE__ */ n(fc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const bc = "_frame_9lntd_2", pc = "_subjectRail_9lntd_21", gc = "_subject_9lntd_21", Nc = "_rail_9lntd_41", yc = "_record_9lntd_63", kc = "_recordBody_9lntd_68", $c = "_band_9lntd_111", Cc = "_bandBody_9lntd_120", Sc = "_bandActions_9lntd_125", Rc = "_scroller_9lntd_132", Tc = "_lanes_9lntd_150", de = {
  frame: bc,
  subjectRail: pc,
  subject: gc,
  rail: Nc,
  record: yc,
  recordBody: kc,
  band: $c,
  bandBody: Cc,
  bandActions: Sc,
  scroller: Rc,
  lanes: Tc
};
function Lk({ children: e, as: a = "main", inset: t = "page" }) {
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
function xk({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: de.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Ei, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: de.recordBody, "data-pad": o, children: a })
  ] });
}
const Lc = "_form_1j8ub_2", Ac = "_fields_1j8ub_9", xc = "_actions_1j8ub_19", ka = {
  form: Lc,
  fields: Ac,
  actions: xc
};
function Ek({ label: e, children: a, actions: t, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: ka.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: ka.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: ka.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function qk({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: de.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: de.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: de.bandActions, children: a })
  ] });
}
const Ec = "(max-width: 767.98px)";
function xa({ label: e, children: a }) {
  return /* @__PURE__ */ n("div", { className: de.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", children: a });
}
function qc({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: de.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(x, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(xa, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Ik({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = Nn(Ec);
  return t === void 0 ? /* @__PURE__ */ n(xa, { label: a, children: e }) : o ? /* @__PURE__ */ n(qc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(xa, { label: a, children: t.map((i) => /* @__PURE__ */ n(it, { children: i.content }, i.id)) });
}
const Ic = "_block_1o5o7_2", Mc = "_sentence_1o5o7_15", Bc = "_meta_1o5o7_20", Pc = "_action_1o5o7_25", Dc = "_strip_1o5o7_29", Oc = "_loading_1o5o7_48", Hc = "_label_1o5o7_56", Fc = "_counter_1o5o7_63", he = {
  block: Ic,
  sentence: Mc,
  meta: Bc,
  action: Pc,
  strip: Dc,
  loading: Oc,
  label: Hc,
  counter: Fc
};
function jc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: he.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function pa({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${he.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: he.sentence, children: e }),
    t,
    /* @__PURE__ */ n(jc, { action: a })
  ] });
}
function Wc(e) {
  return /* @__PURE__ */ n(pa, { ...e });
}
function Mk({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(pa, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: he.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function Bk(e) {
  return /* @__PURE__ */ n(pa, { ...e });
}
function Pk({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(pa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: he.meta, children: [
    "failed at ",
    re(a)
  ] }) });
}
function Dk({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: he.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    re(e),
    " — showing snapshot from ",
    re(a)
  ] });
}
function Ok({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: he.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    re(a)
  ] });
}
function Hk({ label: e, startedAt: a }) {
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
const zc = "_note_tlubt_2", Gc = {
  note: zc
};
function Kc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: Gc.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const Uc = "_card_12in3_2", Vc = "_hit_12in3_23", Yc = "_head_12in3_30", Jc = "_title_12in3_36", Xc = "_meta_12in3_44", Qc = "_fields_12in3_45", Zc = "_who_12in3_58", es = "_sep_12in3_65", as = "_mono_12in3_69", ns = "_field_12in3_45", ts = "_last_12in3_84", rs = "_reason_12in3_96", U = {
  card: Uc,
  hit: Vc,
  head: Yc,
  title: Jc,
  meta: Xc,
  fields: Qc,
  who: Zc,
  sep: es,
  mono: as,
  field: ns,
  last: ts,
  reason: rs
}, ls = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function os(e, a, t) {
  const r = aa(e, "blue"), o = aa(e, "orange"), i = aa(e, "green"), c = N(/* @__PURE__ */ new Set());
  E(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = ls[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const is = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : Q(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function cs(e, a) {
  return is[a](e);
}
function ss({ item: e, connection: a }) {
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
function ds({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: U.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function us({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: U.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function hs({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: U.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: U.field, children: cs(e, t) }, t)) });
}
const Ea = (e) => e ? !0 : void 0;
function ms(e) {
  return { "--stream": Ce(e.streamStep, "id") };
}
function ws(e, a, t) {
  e == null || e(a, t);
}
function _s(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function vs({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: U.last, "data-stale": Ea(a), children: t }) : null;
}
function ga(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  os(r, t.key, e.feed);
  const o = _s(e.feed), i = ms(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: U.hit, onClick: (c) => ws(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(ds, { item: t }),
        /* @__PURE__ */ n("p", { className: U.title, children: t.title }),
        /* @__PURE__ */ n(ss, { item: t, connection: o }),
        /* @__PURE__ */ n(us, { reason: t.blockedReason }),
        /* @__PURE__ */ n(hs, { item: t, fields: a }),
        /* @__PURE__ */ n(vs, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const fs = "_column_14784_3", bs = "_head_14784_24", ps = "_label_14784_33", gs = "_count_14784_42", Ns = "_list_14784_56", Ke = {
  column: fs,
  head: bs,
  label: ps,
  count: gs,
  list: Ns
};
function Cn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function ys({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: Ke.head, children: [
    /* @__PURE__ */ n("h2", { className: Ke.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: Ke.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function ks(e) {
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
function $s({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, _ = Cn(a, r);
  return /* @__PURE__ */ l("section", { className: Ke.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(ys, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(ks, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    h && /* @__PURE__ */ n(Kc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Cs = "_foot_8qg4p_2", Ss = "_note_8qg4p_13", Rs = "_link_8qg4p_19", $a = {
  foot: Cs,
  note: Ss,
  link: Rs
};
function Fk({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: $a.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: $a.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: $a.link, href: e, children: "Configure board" })
  ] });
}
const Ts = "_head_1la6p_3", Ls = "_identity_1la6p_12", As = "_titleRow_1la6p_18", xs = "_title_1la6p_18", Es = "_key_1la6p_35", qs = "_rollup_1la6p_45", Is = "_tools_1la6p_53", Ms = "_swatch_1la6p_62", Bs = "_mark_1la6p_69", ve = {
  head: Ts,
  identity: Ls,
  titleRow: As,
  title: xs,
  key: Es,
  rollup: qs,
  tools: Is,
  swatch: Ms,
  mark: Bs
}, rn = "initials:";
function Ps(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Ds(e) {
  const a = [`${ae(e.inFlight)} in flight`, Ps(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${te(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${te(e.p90)}`), a.join(" · ");
}
function Os(e) {
  return e.startsWith(rn) ? e.slice(rn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Hs({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ce(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${ve.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Os(e) }) : /* @__PURE__ */ n("span", { className: ve.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Fs({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function jk({
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
        /* @__PURE__ */ n(Hs, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: ve.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: ve.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: ve.rollup, "aria-live": "polite", children: Ds(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: ve.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Fs, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Fa, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const js = "_head_kabyh_11", Ws = "_line_kabyh_12", zs = "_cHandle_kabyh_33", Gs = "_cName_kabyh_38", Ks = "_nameLine_kabyh_46", Us = "_cLabel_kabyh_53", Vs = "_cCap_kabyh_58", Ys = "_cShown_kabyh_63", Js = "_name_kabyh_46", Xs = "_noCap_kabyh_85", Qs = "_state_kabyh_99", Zs = "_handle_kabyh_104", ed = "_sub_kabyh_118", I = {
  head: js,
  line: Ws,
  cHandle: zs,
  cName: Gs,
  nameLine: Ks,
  cLabel: Us,
  cCap: Vs,
  cShown: Ys,
  name: Js,
  noCap: Xs,
  state: Qs,
  handle: Zs,
  sub: ed
}, ad = "can't be hidden or collapsed", nd = "terminal · counted, not a column";
function Wk() {
  return /* @__PURE__ */ l("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function td(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function rd(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function ln(e) {
  return e.gate ? ad : e.terminal ? nd : rd(e.agentsMounted);
}
function ld(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function od({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: I.cName, children: [
    /* @__PURE__ */ l("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    ln(e) && /* @__PURE__ */ n("span", { className: I.sub, children: ln(e) })
  ] });
}
function id(e) {
  return e === void 0 ? "" : String(e);
}
function cd(e) {
  return e === "" ? void 0 : Number(e);
}
function sd({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => ld(t, a),
      children: "⠿"
    }
  ) });
}
function dd({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(x, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: id(a.cap), onChange: (r) => t({ ...a, cap: cd(r) }) }) });
}
function ud({ stage: e, config: a, onChange: t }) {
  const r = td(e, a.shown);
  return /* @__PURE__ */ l("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(qe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function hd(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function zk({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: I.line, "data-kind": hd(e), children: [
    /* @__PURE__ */ n(sd, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(od, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(x, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(dd, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(ud, { stage: e, config: a, onChange: t })
  ] });
}
const md = "_body_hn6d6_2", wd = "_head_hn6d6_9", _d = "_summary_hn6d6_19", vd = "_block_hn6d6_20", fd = "_actionsBlock_hn6d6_21", bd = "_title_hn6d6_41", pd = "_note_hn6d6_46", gd = "_k_hn6d6_51", Nd = "_kv_hn6d6_58", yd = "_row_hn6d6_64", kd = "_label_hn6d6_75", $d = "_value_hn6d6_84", Cd = "_quote_hn6d6_90", Sd = "_actions_hn6d6_21", Rd = "_resolve_hn6d6_103", M = {
  body: md,
  head: wd,
  summary: _d,
  block: vd,
  actionsBlock: fd,
  title: bd,
  note: pd,
  k: gd,
  kv: Nd,
  row: yd,
  label: kd,
  value: $d,
  quote: Cd,
  actions: Sd,
  resolve: Rd
};
function Td(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Ld(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Ad(e) {
  const a = va(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function xd(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...fa(Ad(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", te(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Td(e),
    ...Ld(e, a)
  ];
}
function Ed({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function qd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: M.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Id({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: M.block, children: [
    /* @__PURE__ */ n("p", { className: M.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: M.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: M.note, children: e.agentMeta })
  ] }) : null;
}
function Gk({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = xd(e, o);
  return /* @__PURE__ */ n(Je, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: M.body, children: [
    /* @__PURE__ */ n(qd, { item: e }),
    /* @__PURE__ */ l("div", { className: M.summary, children: [
      /* @__PURE__ */ n("h2", { className: M.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: M.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: M.kv, children: d.map(([h, _]) => /* @__PURE__ */ l("div", { className: M.row, children: [
      /* @__PURE__ */ n("dt", { className: M.label, children: h }),
      /* @__PURE__ */ n("dd", { className: M.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(Id, { item: e }),
    /* @__PURE__ */ l("div", { className: M.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: M.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: M.note, children: s })
    ] }),
    /* @__PURE__ */ n(Ed, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Md = "_root_3azmy_2", Bd = "_list_3azmy_7", Pd = "_item_3azmy_12", Dd = "_box_3azmy_18", Od = "_text_3azmy_23", Hd = "_note_3azmy_28", Pe = {
  root: Md,
  list: Bd,
  item: Pd,
  box: Dd,
  text: Od,
  note: Hd
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
const Fd = "_rail_ke7ch_2", jd = "_k_ke7ch_11", Wd = "_head_ke7ch_19", zd = "_section_ke7ch_25", Gd = "_card_ke7ch_38", Kd = "_strip_ke7ch_42", Ud = "_skeleton_ke7ch_56", Vd = "_skeletonLabel_ke7ch_70", Yd = "_bar_ke7ch_76", Jd = "_note_ke7ch_85", se = {
  rail: Fd,
  k: jd,
  head: Wd,
  section: zd,
  card: Gd,
  strip: Kd,
  skeleton: Ud,
  skeletonLabel: Vd,
  bar: Yd,
  note: Jd
};
function Xd(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ca({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: se.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: se.k, children: e }),
    a
  ] });
}
function Qd({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: se.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: se.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: se.bar, "aria-hidden": "true" }, r))
  ] });
}
function Zd({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n($s, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function eu(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Zd, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Qd, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function Kk(e) {
  const a = Xd(e.onOpen), t = Cn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: se.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${se.k} ${se.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ca, { title: "Card", children: /* @__PURE__ */ n("div", { className: se.card, children: t && /* @__PURE__ */ n(ga, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Ca, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: se.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(eu, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: se.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ca, { title: "Effect of this config", children: /* @__PURE__ */ n(Na, { items: e.effects, density: "compact" }) })
  ] });
}
function au(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function nu(e) {
  return Math.ceil(e.length / 2);
}
function tu(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Sn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function ru(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = Sn(e);
  o !== void 0 && t(o), r(tu(e.type));
}
function lu(e, a, t, r, o) {
  E(() => {
    if (e !== null)
      return e.subscribe(a, (i) => ru(i, t, r, o));
  }, [e, a, t, r, o]);
}
function ou(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function iu(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function cu(e, a) {
  return a !== void 0 ? te(e.timeInStage) + " · waits on " + a.agent : te(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function su(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(nu(a ?? [])) + ")"
  };
}
function du(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function uu(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: Q(e.cost) }) : null;
}
function hu(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function mu(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function wu(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function _u(e, a) {
  return a === void 0 ? e : au(e, a.ref);
}
function vu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ve(e) {
  return e === !0 ? "true" : void 0;
}
function Rn(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = aa(o), c = N(/* @__PURE__ */ new Set()), [s, u] = g(ou(a));
  lu(e.feed, a.key, c, u, i);
  const d = iu(a, r), h = cu(a, t), _ = su(a, e.fields), b = wu(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...vu(e),
      className: "ward-workcard",
      "data-flagged": Ve(a.flagged),
      "data-selected": Ve(e.selected),
      style: _,
      ref: _u(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        du(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          uu(a, e.fields),
          hu(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          mu(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function fu({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function bu(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function pu(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function gu(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(fu, { count: e.items.length, cap: e.column.cap });
}
function Nu(e, a) {
  return e.roving ?? a;
}
function yu(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function ku(e, a) {
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
function $u(e) {
  const a = k(), t = ma({ orientation: "vertical" }), r = Nu(e, t), o = bu(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ve(o), "data-gate": Ve(e.column.gate), children: [
    pu(e.column, e.items.length, a),
    gu(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...yu(e, t), children: ku(e, r) })
  ] });
}
function Cu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + te(e.p50)), e.p90 !== void 0 && (a += " · p90 " + te(e.p90)), a;
}
function Su(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Ru(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function Uk(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Cu(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      Su(e),
      Ru(e.onConfigure),
      /* @__PURE__ */ n(Fa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Tu(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Lu(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(qe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(qe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Au(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(A, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function Vk(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": Ve(Tu(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Lu(e) }),
    /* @__PURE__ */ n(x, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(pn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Au(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function Yk(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Rn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n($u, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function xu(e, a) {
  const t = Sn(e);
  t !== void 0 && a(t);
}
function Eu(e, a, t) {
  E(() => {
    if (e != null)
      return e.subscribe(a, (r) => xu(r, t));
  }, [e, a, t]);
}
function qu(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Iu(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", te(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", Q(e.cost)]), a;
}
function Mu(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Bu(e, a) {
  return /* @__PURE__ */ l(A, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function Jk(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = g((c = a.run) == null ? void 0 : c.lastStep);
  Eu(e.feed, a.key, o);
  const i = [...qu(a), ...Iu(a)];
  return /* @__PURE__ */ l(Je, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Mu(t, r)
    ] }),
    Bu(a, e.actions)
  ] });
}
const Pu = "_card_hvxp7_2", Du = "_head_hvxp7_17", Ou = "_mark_hvxp7_25", Hu = "_name_hvxp7_37", Fu = "_chips_hvxp7_48", ju = "_description_hvxp7_54", Wu = "_run_hvxp7_59", zu = "_sep_hvxp7_68", Gu = "_facts_hvxp7_73", Ku = "_fact_hvxp7_73", Uu = "_factLabel_hvxp7_86", Vu = "_factValue_hvxp7_90", ee = {
  card: Pu,
  head: Du,
  mark: Ou,
  name: Hu,
  chips: Fu,
  description: ju,
  run: Wu,
  sep: zu,
  facts: Gu,
  fact: Ku,
  factLabel: Uu,
  factValue: Vu
}, Yu = { live: "done", draft: "running", paused: "meta" };
function Ju(e) {
  return e === void 0 ? ee.card : `${ee.card} ${e}`;
}
function Xu({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ee.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Yu[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function Qu({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ee.description, children: e });
}
function Zu({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ee.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ee.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function eh({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ee.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: ee.fact, children: [
    /* @__PURE__ */ n("dt", { className: ee.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: ee.factValue, children: a.value })
  ] }, a.label)) });
}
function ah(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function nh({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, facts: i, className: c }) {
  const s = { "--stream": Ce(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": u,
      className: Ju(c),
      style: s,
      "data-selected": u,
      "data-paused": ah(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: ee.head, children: [
          /* @__PURE__ */ n("span", { className: ee.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ee.name} ward-rowlink`, href: a, "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(Qu, { description: e.description }),
        /* @__PURE__ */ n(Zu, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Xu, { versions: e.versions }),
        /* @__PURE__ */ n(eh, { facts: i })
      ]
    }
  );
}
const th = "_list_4dcyc_2", rh = "_row_4dcyc_11", lh = "_head_4dcyc_23", oh = "_id_4dcyc_30", ih = "_lock_4dcyc_35", ch = "_reason_4dcyc_41", sh = "_remove_4dcyc_46", dh = "_clauses_4dcyc_50", uh = "_clause_4dcyc_50", hh = "_label_4dcyc_64", mh = "_cell_4dcyc_71", wh = "_value_4dcyc_76", ne = {
  list: th,
  row: rh,
  head: lh,
  id: oh,
  lock: ih,
  reason: ch,
  remove: sh,
  clauses: dh,
  clause: uh,
  label: hh,
  cell: mh,
  value: wh
}, Tn = ze(!1);
function Xk({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Tn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ne.list, "aria-label": a, children: e }) });
}
function _h({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ne.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(x, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => t(e.key, o) });
}
function vh({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ne.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ne.reason, children: e })
  ] });
}
function fh({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: ne.head, children: [
    /* @__PURE__ */ n("span", { className: ne.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(vh, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ne.remove, children: /* @__PURE__ */ l(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function on(e, a) {
  return e.locked ? void 0 : a;
}
function Qk({ rule: e, onChange: a, onRemove: t }) {
  if (!We(Tn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = on(e, a);
  return /* @__PURE__ */ l("li", { className: ne.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(fh, { rule: e, onRemove: on(e, t) }),
    /* @__PURE__ */ n("dl", { className: ne.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ne.clause, children: [
      /* @__PURE__ */ n("dt", { className: ne.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ne.cell, children: /* @__PURE__ */ n(_h, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const bh = "_ladder_wwnch_2", ph = "_cell_wwnch_7", gh = "_empty_wwnch_26", Nh = "_name_wwnch_34", yh = "_holder_wwnch_40", kh = "_request_wwnch_46", $h = "_swatches_wwnch_51", Ch = "_swatch_wwnch_51", Sh = "_tilesFrame_wwnch_78", Rh = "_tiles_wwnch_78", Th = "_tile_wwnch_78", Lh = "_bar_wwnch_117", Ah = "_hex_wwnch_128", xh = "_note_wwnch_138", R = {
  ladder: bh,
  cell: ph,
  empty: gh,
  name: Nh,
  holder: yh,
  request: kh,
  swatches: $h,
  swatch: Ch,
  tilesFrame: Sh,
  tiles: Rh,
  tile: Th,
  bar: Lh,
  hex: Ah,
  note: xh
}, Eh = "not validated — needs CVD matrix and dark stepping";
function qh(e) {
  return e.reserved ? "reserved" : _a(e.step) ? "validated" : "partial";
}
function Ln(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Ih(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Mh({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Se, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Bh(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Ph(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const cn = (e) => String(e).padStart(2, "0");
function Dh(e, a, t) {
  return e === "reserved" ? "Reserved — needs revalidation" : t ? "yours" : a ?? Ln(e, void 0);
}
function Oh({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: r ? `step ${cn(e)}` : kt(e) }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: r ? t : `Step ${cn(e)} · ${t}` })
  ] });
}
function Hh({ step: e, value: a, taken: t, onChange: r, presentation: o }) {
  const i = qh(e), c = Ln(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, _ = `${d} — ${o === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...Ph(s, u), "data-validation": i, style: Ih(e, i), onClick: h, onKeyDown: (L) => Bh(L, h) }, label: _, name: d, holder: c, validation: i, note: Dh(i, t, u), step: e.step };
}
const Fh = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${R.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${R.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Oh, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${R.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Mh, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function jh(e) {
  return Fh[e.presentation](Hh(e));
}
function Wh(e) {
  for (const a of e)
    if (!a.reserved && !wa(a.step)) throw new Error("colour ladder renders token steps only");
}
function zh() {
  return /* @__PURE__ */ l("div", { className: `${R.cell} ward-ladder-cell ${R.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Gh(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Kh = { list: R.ladder, swatches: R.swatches, tiles: R.tilesFrame };
function Uh() {
  return /* @__PURE__ */ l("div", { className: `${R.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Vh = { list: zh, swatches: () => null, tiles: Uh };
function An(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  Wh(e.steps);
  const r = Gh(e), o = Vh[r], i = /* @__PURE__ */ l(A, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(jh, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${Kh[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: R.tiles, children: i }) : i });
}
const Yh = "_rail_1el2t_2", Jh = "_section_1el2t_12", Xh = "_sectionFlush_1el2t_22", Qh = "_head_1el2t_26", Zh = "_headLabel_1el2t_34", em = "_sample_1el2t_42", am = "_sampleLabel_1el2t_47", nm = "_sampleTitle_1el2t_54", tm = "_sampleMeta_1el2t_59", rm = "_trace_1el2t_65", lm = "_traceHead_1el2t_70", om = "_steps_1el2t_78", im = "_step_1el2t_78", cm = "_stepTitle_1el2t_97", sm = "_hollow_1el2t_107", dm = "_stepBody_1el2t_115", um = "_stepDetail_1el2t_127", hm = "_publish_1el2t_132", mm = "_reason_1el2t_138", wm = "_note_1el2t_143", _m = "_reveal_1el2t_148", p = {
  rail: Yh,
  section: Jh,
  sectionFlush: Xh,
  head: Qh,
  headLabel: Zh,
  sample: em,
  sampleLabel: am,
  sampleTitle: nm,
  sampleMeta: tm,
  trace: rm,
  traceHead: lm,
  steps: om,
  step: im,
  stepTitle: cm,
  hollow: sm,
  stepBody: dm,
  stepDetail: um,
  publish: hm,
  reason: mm,
  note: wm,
  reveal: _m
}, sn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, vm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, fm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, bm = { notSimulated: "not simulated", running: "running" };
function pm(e) {
  return e.presentation === "foundry";
}
function gm(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Nm(e, a) {
  var r;
  const t = vm[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function ym(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function km(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function $m(e) {
  if (ym(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Cm(e) {
  const [a, t] = g(!1);
  E(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Sm(e) {
  const a = bm[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Se, { size: 6, kind: fm[e.kind], label: e.kind });
}
function Rm(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Tm(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Lm(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(Cm, { kind: a.kind, children: [
    /* @__PURE__ */ n(Sm, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Rm, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Tm, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Am(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(te(a)), t.join(" · ");
}
function xn(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: Am(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Lm, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function xm(e) {
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
function Em(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + re(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function qm(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : Q(e.run.cost), label: "Cost" }, { value: e.run.turns ? vn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ba, { divided: !0, cells: a }) });
}
function Im(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: Q(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: vn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Mm(e) {
  const a = Im(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ba, { divided: !0, cells: a }) });
}
function En(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Bm(e) {
  return /* @__PURE__ */ l("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(En, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function Pm(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(En, { reason: e.reason, onPublish: e.onPublish }) });
}
function qn(e) {
  return /* @__PURE__ */ l("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: sn[e.run.status].role, label: sn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Dm(e, a) {
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
function Om(e) {
  var t;
  km(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(qn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(xm, { sample: e.run.sample }),
    /* @__PURE__ */ n(xn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(qm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Na, { items: e.checklist }) }),
    /* @__PURE__ */ n(Bm, { reason: gm(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Hm(e) {
  var r;
  const a = Dm(e.run, e.feed);
  $m(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(qn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Em, { sample: e.run.sample }),
    /* @__PURE__ */ n(xn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Mm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Na, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Pm, { reason: Nm(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Zk(e) {
  return pm(e) ? /* @__PURE__ */ n(Hm, { ...e }) : /* @__PURE__ */ n(Om, { ...e });
}
const Fm = "_list_142ip_3", jm = "_row_142ip_9", Wm = "_condition_142ip_18", zm = "_action_142ip_24", na = {
  list: Fm,
  row: jm,
  condition: Wm,
  action: zm
}, In = ze(!1);
function e1({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(In.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: na.list, "aria-label": a, children: e }) });
}
function a1({ rule: e }) {
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
function Gm(e) {
  return e === "up" ? "down" : "up";
}
function Km(e, a) {
  const t = dn(e, a.id, a.direction) ?? dn(e, a.id, Gm(a.direction));
  t == null || t.focus();
}
function Pn() {
  const e = N(null), [a, t] = g(null), [r, o] = g("");
  return E(() => {
    e.current !== null && a !== null && Km(e.current, a);
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
const Um = "_body_1h15q_2", Vm = "_title_1h15q_8", Ym = "_section_1h15q_13", Jm = "_legend_1h15q_18", Xm = "_stages_1h15q_26", Qm = "_stage_1h15q_26", Zm = "_stageIndex_1h15q_44", ew = "_stageName_1h15q_50", aw = "_footer_1h15q_59", nw = "_note_1h15q_66", tw = "_reason_1h15q_71", rw = "_actions_1h15q_76", lw = "_webHead_1h15q_83", ow = "_kicker_1h15q_92", iw = "_webTitle_1h15q_99", cw = "_webBody_1h15q_105", sw = "_webSection_1h15q_109", dw = "_sectionHead_1h15q_121", uw = "_sectionNote_1h15q_129", hw = "_formLabel_1h15q_134", mw = "_identityRow_1h15q_139", ww = "_nameCell_1h15q_145", _w = "_keyCell_1h15q_150", vw = "_colourCell_1h15q_154", fw = "_colourStatus_1h15q_161", bw = "_webStages_1h15q_166", pw = "_webStageList_1h15q_172", gw = "_webStage_1h15q_166", Nw = "_webIndex_1h15q_191", yw = "_webStageName_1h15q_196", kw = "_webMoves_1h15q_201", $w = "_addStage_1h15q_215", Cw = "_addStageButton_1h15q_223", Sw = "_addStageNote_1h15q_231", Rw = "_webFooter_1h15q_236", Tw = "_webFooterNotes_1h15q_244", Lw = "_webNote_1h15q_251", w = {
  body: Um,
  title: Vm,
  section: Ym,
  legend: Jm,
  stages: Xm,
  stage: Qm,
  stageIndex: Zm,
  stageName: ew,
  footer: aw,
  note: nw,
  reason: tw,
  actions: rw,
  webHead: lw,
  kicker: ow,
  webTitle: iw,
  webBody: cw,
  webSection: sw,
  sectionHead: dw,
  sectionNote: uw,
  formLabel: hw,
  identityRow: mw,
  nameCell: ww,
  keyCell: _w,
  colourCell: vw,
  colourStatus: fw,
  webStages: bw,
  webStageList: pw,
  webStage: gw,
  webIndex: Nw,
  webStageName: yw,
  webMoves: kw,
  addStage: $w,
  addStageButton: Cw,
  addStageNote: Sw,
  webFooter: Rw,
  webFooterNotes: Tw,
  webNote: Lw
}, Aw = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], On = "not in catalogue";
function xw(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} — ${On}` }, ...t];
}
function Ew({ stage: e, index: a, catalogue: t, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(x, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${On}`;
  return /* @__PURE__ */ n(x, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: xw(t, e.name), invalid: i, onChange: r });
}
function Hn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function qw(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Iw({ id: e, stage: a, index: t, total: r, catalogue: o, onReplace: i, onMove: c }) {
  const s = Hn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(Ew, { stage: a, index: t, catalogue: o, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(x, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Aw, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(sa, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(sa, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function Mw({ stages: e, onChange: a, catalogue: t }) {
  const r = qw(e.length), o = Pn(), i = (s, u) => {
    const d = Mn(s, u);
    r.current = qa(r.current, s, d), o.moved({ id: r.current[d], direction: u }, Bn(Hn(e[s], s), d, e.length)), a(qa(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(Iw, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Dn, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Bw = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Pw = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Dw = "A new stream starts as a draft. Nothing runs on it until you publish it.", Ow = "Create is disabled: name the stream and give it a key first.", Hw = "reorder with the ↑ ↓ buttons · min 2";
function ja(e, a) {
  return !e.reserved && _a(e.step) && a[e.step] === void 0;
}
function Fw(e, a) {
  const t = e.find((r) => ja(r, a));
  return t ? t.step : 1;
}
function jw({ stages: e, onMove: a }) {
  const t = Pn(), r = (o, i) => {
    const c = Mn(o, i);
    t.moved({ id: e[o].id, direction: i }, Bn(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(A, { children: [
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
function Ww({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: Dw }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function zw(e, a) {
  return e !== "" && a !== "" ? null : Ow;
}
function Gw(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = Pw, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [h, _] = g(""), [b, L] = g(""), [G, J] = g(a[0].value), [le, Ne] = g(() => Fw(t, r)), [oe, Ie] = g(e.stages ?? Bw), [Me, $] = g(o[0].value), F = { name: h, key: b, streamStep: le, owner: G, stages: oe, policy: Me }, me = zw(h, b);
  return /* @__PURE__ */ n(Je, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ l("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(x, { kind: "input", label: "Stream name", value: h, onChange: _ }),
      /* @__PURE__ */ n(x, { kind: "input", label: "Key", value: b, onChange: L, mono: !0 }),
      /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: G, onChange: J, options: a })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(An, { label: "Stream colour", steps: t, value: le, onChange: Ne, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(jw, { stages: oe, onMove: (Re, rt) => Ie(qa(oe, Re, rt)) })
    ] }),
    /* @__PURE__ */ n(yn, { legend: "Loop policy", options: o, value: Me, onChange: $ }),
    /* @__PURE__ */ n(Ww, { reason: me, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const Fn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Kw = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function Uw(e, a, t, r, o, i) {
  var s;
  const c = ((s = Fn.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function Vw(e, a) {
  return Yw(e) && Jw(e, a) && Xw(e);
}
function Yw(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Jw(e, a) {
  return e.colourStep !== null && ja({ step: e.colourStep }, a);
}
function Xw(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Qw(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${Eh}.` : ja({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Zw({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function e_({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Zw, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: Kw })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function a_({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function n_({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(x, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(x, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function t_(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [o, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, L] = g("relay"), [G, J] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = Uw(o, c, u, h, b, G), Ne = Vw(le, r), oe = G.find(($) => $.kind === "agent" && $.name.trim() !== ""), Ie = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(An, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), Me = /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: Qw(h, r) }),
    /* @__PURE__ */ n(x, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Je, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(a_, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(n_, { name: o, setName: i, streamKey: c, setKey: s, colour: Ie, owner: Me }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: Hw })
        ] }),
        /* @__PURE__ */ n(Mw, { stages: G, onChange: J })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(yn, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: Fn, onChange: L }) }),
      /* @__PURE__ */ n(e_, { ready: Ne, draft: le, agentStage: oe, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function n1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(t_, { ...e }) : /* @__PURE__ */ n(Gw, { ...e });
}
const r_ = "_row_bs8hc_2", l_ = "_cell_bs8hc_6", o_ = "_condition_bs8hc_11", i_ = "_action_bs8hc_18", c_ = "_contract_bs8hc_24", s_ = "_contractCondition_bs8hc_33", d_ = "_contractAction_bs8hc_39", V = {
  row: r_,
  cell: l_,
  condition: o_,
  action: i_,
  contract: c_,
  contractCondition: s_,
  contractAction: d_
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
    x,
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
function u_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { className: V.condition, title: da(e, r), children: da(e, r) }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: Wa(e, a, t) })
  ] });
}
function h_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ l("td", { className: V.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: V.condition, children: da(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: V.cell, children: Wa(e, a, t) })
  ] });
}
function m_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: V.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: V.contractCondition, children: da(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: V.contractAction, children: Wa(e, a, t, !0) })
  ] });
}
const w_ = { two: h_, four: u_, contract: m_ };
function t1(e) {
  var t;
  if (!jn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = w_[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const __ = "_column_lurgk_2", v_ = "_head_lurgk_17", f_ = "_index_lurgk_23", b_ = "_name_lurgk_29", p_ = "_meta_lurgk_38", g_ = "_mono_lurgk_43", N_ = "_gate_lurgk_50", y_ = "_reviewersLabel_lurgk_57", k_ = "_reviewers_lurgk_57", $_ = "_reviewer_lurgk_57", C_ = "_agents_lurgk_74", S_ = "_workflowColumn_lurgk_79", R_ = "_workflowHead_lurgk_96", T_ = "_stageRow_lurgk_102", L_ = "_stageLabel_lurgk_109", A_ = "_workflowTitle_lurgk_116", x_ = "_workflowMeta_lurgk_122", E_ = "_workflowGate_lurgk_127", q_ = "_gateNote_lurgk_135", I_ = "_cardNote_lurgk_140", M_ = "_reviewerList_lurgk_149", B_ = "_reviewerRow_lurgk_155", P_ = "_reviewerMark_lurgk_161", D_ = "_reviewerName_lurgk_171", O_ = "_terminalCard_lurgk_177", H_ = "_terminalCount_lurgk_186", F_ = "_workflowAgents_lurgk_192", j_ = "_mount_lurgk_198", y = {
  column: __,
  head: v_,
  index: f_,
  name: b_,
  meta: p_,
  mono: g_,
  gate: N_,
  reviewersLabel: y_,
  reviewers: k_,
  reviewer: $_,
  agents: C_,
  workflowColumn: S_,
  workflowHead: R_,
  stageRow: T_,
  stageLabel: L_,
  workflowTitle: A_,
  workflowMeta: x_,
  workflowGate: E_,
  gateNote: q_,
  cardNote: I_,
  reviewerList: M_,
  reviewerRow: B_,
  reviewerMark: P_,
  reviewerName: D_,
  terminalCard: O_,
  terminalCount: H_,
  workflowAgents: F_,
  mount: j_
}, W_ = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function za(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Wn(e) {
  return `${Math.round(e * 100)}%`;
}
function z_({ stage: e }) {
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
function G_({ stage: e }) {
  return /* @__PURE__ */ n(ba, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: za(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function K_({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: W_[e.kind] })
  ] });
}
function U_({ stage: e }) {
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
function V_({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(z_, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(G_, { stage: e }) : null;
}
function Y_({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function J_({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(K_, { stage: e, titleId: o }),
    /* @__PURE__ */ n(U_, { stage: e }),
    /* @__PURE__ */ n(V_, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(nh, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(Y_, { onMount: t })
  ] });
}
const X_ = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function Q_({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function Z_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Q_, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Wn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function ev({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: za(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: "items closed this week" })
  ] });
}
function av(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function nv(e) {
  if (e.kind === "terminal") return `${za(e.closedThisWeek)} this week`;
  const a = av(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function tv({ stage: e, titleId: a }) {
  const t = X_[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: nv(e) })
  ] });
}
function rv(e) {
  return e === "entry" || e === "agent";
}
function lv({ stage: e, onMount: a }) {
  return a === void 0 || !rv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function ov({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(tv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Z_, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(ev, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(lv, { stage: e, onMount: t })
  ] });
}
function iv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function r1(e) {
  return iv(e) ? /* @__PURE__ */ n(ov, { ...e }) : /* @__PURE__ */ n(J_, { ...e });
}
const cv = "_row_ve78g_6", sv = "_cell_ve78g_10", dv = "_name_ve78g_19", uv = "_chain_ve78g_26", hv = "_owner_ve78g_32", mv = "_mono_ve78g_38", wv = "_compactRow_ve78g_45", _v = "_compactCell_ve78g_54", vv = "_stack_ve78g_71", fv = "_stat_ve78g_78", bv = "_identityLine_ve78g_85", pv = "_identity_ve78g_85", gv = "_compactName_ve78g_103", Nv = "_ownerLine_ve78g_117", yv = "_link_ve78g_130", kv = "_emptyChain_ve78g_136", $v = "_arrow_ve78g_142", Cv = "_muted_ve78g_143", Sv = "_define_ve78g_148", Rv = "_statValue_ve78g_155", Tv = "_policyId_ve78g_161", Lv = "_sub_ve78g_166", f = {
  row: cv,
  cell: sv,
  name: dv,
  chain: uv,
  owner: hv,
  mono: mv,
  compactRow: wv,
  compactCell: _v,
  stack: vv,
  stat: fv,
  identityLine: bv,
  identity: pv,
  compactName: gv,
  ownerLine: Nv,
  link: yv,
  emptyChain: kv,
  arrow: $v,
  muted: Cv,
  define: Sv,
  statValue: Rv,
  policyId: Tv,
  sub: Lv
};
function Av(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function xv(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function Ev(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${e.members} members`;
}
function qv(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Ev(e) })
  ] }) });
}
function Iv(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function Mv(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : Iv(e) });
}
function hn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function Bv(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function Pv(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Dv({ stream: e, href: a, presentation: t }) {
  const r = xv(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ce(e.streamStep, "chip") }, children: [
    qv(e, a),
    Mv(e.stages, a),
    hn(Pv(e.agents), e.agents === void 0 ? void 0 : Av(e.agents), "—"),
    Bv(e.policy),
    hn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function Ov(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function l1(e) {
  if (Ov(e)) return Dv(e);
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
        ae(a.members),
        " members"
      ] })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : te(a.p50) }) })
  ] });
}
const Hv = "_row_1nbe9_2", Fv = "_name_1nbe9_15", jv = "_scope_1nbe9_25", ua = {
  row: Hv,
  name: Fv,
  scope: jv
};
function Wv(e) {
  return e === void 0 ? `${ua.row} ward-toolrow` : `${ua.row} ward-toolrow ${e}`;
}
function zv(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Gv({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
function Kv({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Uv({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${ua.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Vv(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function o1({ tool: e, onChange: a, presentation: t }) {
  const r = k(), o = k(), i = zv(e, t), c = Vv(t);
  return /* @__PURE__ */ l(c, { className: Wv(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Gv, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${ua.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Uv, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(Kv, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Yv = "_strip_1qtlf_2", Jv = "_head_1qtlf_10", Xv = "_name_1qtlf_16", Qv = "_chart_1qtlf_24", Zv = "_segment_1qtlf_30", ef = "_detailedChart_1qtlf_36", af = "_rail_1qtlf_49", nf = "_section_1qtlf_55", tf = "_label_1qtlf_66", rf = "_note_1qtlf_83", Y = {
  strip: Yv,
  head: Jv,
  name: Xv,
  chart: Qv,
  segment: Zv,
  detailedChart: ef,
  rail: af,
  section: nf,
  label: tf,
  note: rf
}, lf = "No item in flight to preview.", of = "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on.", cf = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark — not a theme. Two teams theming the same product produces two products.", Ia = [1, 2, 3, 4, 5, 6], ha = 100;
function sf(e, a) {
  return a.has(e) ? Ce(e, "id") : "var(--ward-color-line)";
}
function df({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: Y.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ia.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: Y.segment,
      x: o * ha,
      y: "0",
      width: ha,
      height: "8",
      fill: sf(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function uf(e) {
  const a = e.slice(0, Ia.length);
  for (; a.length < Ia.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function hf({ identities: e }) {
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
function zn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ea({ label: e, children: a }) {
  const t = k();
  return /* @__PURE__ */ l("section", { className: Y.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: Y.label, children: e }),
    a
  ] });
}
function mf({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: Y.note, children: a ?? lf }) : /* @__PURE__ */ n(ga, { item: { ...e, streamStep: va(t.streamStep) }, onOpen: zn(r), feed: null });
}
function wf({ draft: e }) {
  const a = { "--stream": Ce(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: Y.head, style: a, children: [
    /* @__PURE__ */ n(Se, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: Y.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...fa(e.key, e.streamStep) })
  ] });
}
function _f(e) {
  const a = uf(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("div", { className: Y.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ea, { label: "Board card", children: /* @__PURE__ */ n(mf, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ea, { label: "Streams index row", children: /* @__PURE__ */ n(wf, { draft: t }) }),
    /* @__PURE__ */ l(ea, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(hf, { identities: a }),
      /* @__PURE__ */ n("p", { className: Y.note, children: of })
    ] }),
    /* @__PURE__ */ n(ea, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: Y.note, children: cf }) })
  ] });
}
function vf({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": Ce(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: Y.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: Y.head, children: [
      /* @__PURE__ */ n(Se, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: Y.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...fa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(ga, { item: { ...a, streamStep: e.streamStep }, onOpen: zn(r) }),
    /* @__PURE__ */ n(df, { draft: e, streams: t })
  ] });
}
function i1(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(_f, { ...e }) : /* @__PURE__ */ n(vf, { ...e });
}
const ff = "_row_ixlg5_6", bf = "_headCell_ixlg5_10", pf = "_cell_ixlg5_11", gf = "_name_ixlg5_23", Nf = "_consequence_ixlg5_29", yf = "_governed_ixlg5_36", kf = "_control_ixlg5_42", $f = "_byRole_ixlg5_48", Cf = "_webControl_ixlg5_59", Sf = "_webConsequence_ixlg5_65", Rf = "_webGoverned_ixlg5_71", P = {
  row: ff,
  headCell: bf,
  cell: pf,
  name: gf,
  consequence: Nf,
  governed: yf,
  control: kf,
  byRole: $f,
  webControl: Cf,
  webConsequence: Sf,
  webGoverned: Rf
};
function Tf({
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
function Lf({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(Tf, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Af(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function xf({ name: e, cell: a, onChange: t }) {
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
function Ef({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(xf, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: Af(e) }) })
  ] });
}
function c1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ef, { ...e }) : /* @__PURE__ */ n(Lf, { ...e });
}
const qf = "_row_vv64h_2", If = "_cell_vv64h_6", Mf = "_name_vv64h_25", Bf = "_note_vv64h_30", Pf = "_webName_vv64h_41", Df = "_webMeta_vv64h_47", z = {
  row: qf,
  cell: If,
  name: Mf,
  note: Bf,
  webName: Pf,
  webMeta: Df
}, Gn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Of(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Hf({ component: e, onRestart: a }) {
  const t = k(), r = Gn[e.state], o = e.state === "drainFirst";
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
function Ff({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: Of(e.state) });
}
function jf({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { ...Gn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(Ff, { component: e, onRestart: a }) })
  ] });
}
function s1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(jf, { ...e }) : /* @__PURE__ */ n(Hf, { ...e });
}
const Wf = "_row_1f1gp_7", zf = "_cell_1f1gp_11", Gf = "_next_1f1gp_28", Kf = "_headCell_1f1gp_38", Uf = "_webId_1f1gp_77", Vf = "_webPurpose_1f1gp_83", Yf = "_webMeta_1f1gp_91", Jf = "_webUrgent_1f1gp_97", O = {
  row: Wf,
  cell: zf,
  next: Gf,
  headCell: Kf,
  webId: Uf,
  webPurpose: Vf,
  webMeta: Yf,
  webUrgent: Jf
}, Xf = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Qf = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, Kn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Zf = Object.fromEntries(Kn.map((e) => [e.key, e]));
function De({ column: e, children: a }) {
  const t = Zf[e];
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
function d1() {
  return /* @__PURE__ */ n("tr", { children: Kn.map((e) => /* @__PURE__ */ n(
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
function eb({ cred: e }) {
  const a = Xf[e.state];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n(De, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(De, { column: "id", children: e.id }),
    /* @__PURE__ */ n(De, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(De, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(De, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(De, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function ab({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function nb({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(ab, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...Qf[e.state] }) })
  ] });
}
function u1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(nb, { ...e }) : /* @__PURE__ */ n(eb, { ...e });
}
const tb = "_card_17zba_2", rb = "_head_17zba_11", lb = "_env_17zba_18", ob = "_version_17zba_25", ib = "_meta_17zba_32", cb = "_webCard_17zba_37", sb = "_webRow_17zba_47", db = "_webTitle_17zba_55", ub = "_webLine_17zba_65", hb = "_webVersion_17zba_72", mb = "_webMeta_17zba_77", W = {
  card: tb,
  head: rb,
  env: lb,
  version: ob,
  meta: ib,
  webCard: cb,
  webRow: sb,
  webTitle: db,
  webLine: ub,
  webVersion: hb,
  webMeta: mb
}, Un = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function wb({ env: e }) {
  const a = Un[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function _b(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [re(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function vb(e) {
  return /* @__PURE__ */ l("article", { className: `${W.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${W.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${W.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Un[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${W.version} ${W.webVersion} ${W.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${W.meta} ${W.webMeta} ${W.webLine} ward-cellmeta`, children: _b(e) })
  ] });
}
function h1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(vb, { ...e }) : /* @__PURE__ */ n(wb, { ...e });
}
const fb = "_upload_erepj_2", bb = "_preview_erepj_7", pb = "_mark_erepj_17", gb = "_empty_erepj_22", Nb = "_actions_erepj_28", yb = "_input_erepj_33", kb = "_reasons_erepj_41", $b = "_reason_erepj_41", Cb = "_accepted_erepj_57", X = {
  upload: fb,
  preview: bb,
  mark: pb,
  empty: gb,
  actions: Nb,
  input: yb,
  reasons: kb,
  reason: $b,
  accepted: Cb
}, Vn = 1.5, Yn = 22, Ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Vn}px at ${Yn}px`];
function Sb() {
  return { ok: !1, reasons: [Ye[1]] };
}
function Rb(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function Tb(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ye[0]] : [];
}
function Lb(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ye[1]), e.querySelector("text") !== null && t.push(Ye[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function Ab(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? Yn / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Vn;
  }) ? [Ye[3]] : [];
}
function m1(e) {
  const a = Rb(e);
  if (a === null) return Sb();
  const t = [...Tb(a), ...Lb(a, e), ...Ab(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const xb = "Mark accepted.";
function Eb({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: X.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: X.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: X.empty }) });
}
function qb(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Ib(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Mb({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: X.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: X.result, role: "status", children: /* @__PURE__ */ n("p", { className: X.accepted, children: xb }) }) : /* @__PURE__ */ n("div", { className: X.result, role: "status", children: /* @__PURE__ */ n("ul", { className: X.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: X.reason, children: a }, a)) }) });
}
function Bb({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Mb, { result: e }) : /* @__PURE__ */ n("p", { className: `${X.result} ${qb(e, t)}`, role: "status", children: Ib(e, t) });
}
function w1({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: X.upload, children: [
    /* @__PURE__ */ n(Eb, { current: e }),
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
    /* @__PURE__ */ n(Bb, { result: i, presentation: r })
  ] });
}
const Pb = "_row_1wp9s_7", Db = "_cell_1wp9s_11", Ob = "_head_1wp9s_28", Hb = "_name_1wp9s_34", Fb = "_pinned_1wp9s_42", jb = "_headCell_1wp9s_49", Wb = "_webName_1wp9s_88", zb = "_webMeta_1wp9s_95", Gb = "_webWarn_1wp9s_103", q = {
  row: Pb,
  cell: Db,
  head: Ob,
  name: Hb,
  pinned: Fb,
  headCell: jb,
  webName: Wb,
  webMeta: zb,
  webWarn: Gb
}, Ga = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, Jn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Kb = Object.fromEntries(Jn.map((e) => [e.key, e]));
function Ub(e, a) {
  return `mcp.${e}.${a}`;
}
function Vb(e) {
  return Object.keys(Ga).includes(e);
}
function Yb(e) {
  return Ga[e !== void 0 && Vb(e) ? e : "unknown"];
}
function Ge({ column: e, children: a }) {
  const t = Kb[e];
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
function _1() {
  return /* @__PURE__ */ n("tr", { children: Jn.map((e) => /* @__PURE__ */ n(
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
function Jb({ server: e }) {
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
    /* @__PURE__ */ n(Ge, { column: "tools", children: e.tools.map((t) => Ub(e.name, t)).join(" · ") })
  ] });
}
function Xb(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Qb(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Zb({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function ep({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function ap({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function np({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Xb(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Qb(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Zb, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Yb(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n(ep, { server: e, onRestart: a }),
      /* @__PURE__ */ n(ap, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function v1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(np, { ...e }) : /* @__PURE__ */ n(Jb, { ...e });
}
const tp = "_row_1h9nq_2", rp = "_headCell_1h9nq_14", lp = "_cell_1h9nq_15", op = "_name_1h9nq_26", ip = "_consequence_1h9nq_32", cp = "_reason_1h9nq_38", sp = "_value_1h9nq_44", dp = "_webRow_1h9nq_60", up = "_webSetting_1h9nq_71", hp = "_webName_1h9nq_79", mp = "_webConsequence_1h9nq_87", wp = "_webControl_1h9nq_93", _p = "_webState_1h9nq_106", vp = "_webChip_1h9nq_111", T = {
  row: tp,
  headCell: rp,
  cell: lp,
  name: op,
  consequence: ip,
  reason: cp,
  value: sp,
  webRow: dp,
  webSetting: up,
  webName: hp,
  webConsequence: mp,
  webControl: wp,
  webState: _p,
  webChip: vp
}, Xn = 104, Qn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function fp({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(qe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(gn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: T.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function bp({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), i = Qn[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: T.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: T.headCell, children: [
      /* @__PURE__ */ n("span", { className: T.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: T.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: T.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: T.cell, children: /* @__PURE__ */ n(fp, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: T.cell, style: { width: Xn }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Zn(e, a) {
  return String(e ?? a);
}
function pp(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function gp(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Zn(e.value, "—");
}
function Np({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: T.webControl, children: [
    /* @__PURE__ */ n(qe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: T.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function yp(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(Np, { ...e });
  const o = pp(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: T.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(gn, { options: o, value: Zn(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${T.webControl} ${T.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: gp(a) });
}
function kp({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = k(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${T.row} ${T.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: T.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${T.name} ${T.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${T.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: T.webControl, children: i(c) }) : /* @__PURE__ */ n(yp, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${T.webChip} ward-policy-chip`, style: { width: Xn }, children: /* @__PURE__ */ n(m, { ...Qn[t], size: "tag" }) })
  ] });
}
function f1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(kp, { ...e }) : /* @__PURE__ */ n(bp, { ...e });
}
const $p = "_label_1o9za_7", Cp = "_name_1o9za_15", Sp = "_column_1o9za_24", Rp = "_webFrame_1o9za_57", Tp = "_webHead_1o9za_62", Lp = "_webHeadLabel_1o9za_74", Ap = "_webLabel_1o9za_112", xp = "_webColumns_1o9za_119", Ep = "_webGroup_1o9za_125", qp = "_webPeople_1o9za_126", Ip = "_webVia_1o9za_127", Mp = "_webMeta_1o9za_156", H = {
  label: $p,
  name: Cp,
  column: Sp,
  webFrame: Rp,
  webHead: Tp,
  webHeadLabel: Lp,
  webLabel: Ap,
  webColumns: xp,
  webGroup: Ep,
  webPeople: qp,
  webVia: Ip,
  webMeta: Mp
}, Bp = {
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
function Pp(e) {
  if (!e.matrixRole) return;
  const a = Bp[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Dp({ node: e }) {
  const a = Pp(e);
  return /* @__PURE__ */ l("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(Op, { role: a, node: e }),
    /* @__PURE__ */ n(Ra, { column: Sa[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Ra, { column: Sa[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Ra, { column: Sa[2], children: e.requestedVia ?? "" })
  ] });
}
function Op({ role: e, node: a }) {
  return /* @__PURE__ */ l(A, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Hp({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
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
      label: /* @__PURE__ */ n(Dp, { node: t }),
      children: c
    }
  );
}
function Ta({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Fp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Ta, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Ta, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Ta, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function jp() {
  return /* @__PURE__ */ l("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function Wp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function zp(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Gp({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(jp, {}),
    /* @__PURE__ */ n(cc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      $n,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Wp, { row: t }),
        detail: /* @__PURE__ */ n(Fp, { row: t }),
        expanded: zp(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function b1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Gp, { ...e }) : /* @__PURE__ */ n(Hp, { ...e });
}
const Kp = "_runbook_b9agc_2", Up = "_list_b9agc_7", Vp = "_step_b9agc_15", Yp = "_numeral_b9agc_21", Jp = "_body_b9agc_28", Xp = "_head_b9agc_34", Qp = "_title_b9agc_40", Zp = "_detail_b9agc_45", eg = "_actions_b9agc_50", ag = "_webList_b9agc_56", ng = "_webStep_b9agc_60", tg = "_webBody_b9agc_66", rg = "_webTitle_b9agc_74", lg = "_webDetail_b9agc_78", S = {
  runbook: Kp,
  list: Up,
  step: Vp,
  numeral: Yp,
  body: Jp,
  head: Xp,
  title: Qp,
  detail: Zp,
  actions: eg,
  webList: ag,
  webStep: ng,
  webBody: tg,
  webTitle: rg,
  webDetail: lg
}, et = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function at(e) {
  return String(e + 1).padStart(2, "0");
}
function og({ step: e, index: a, connection: t }) {
  const r = et[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: at(a) }),
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
function ig({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(og, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function cg({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: at(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...et[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function sg({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(cg, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function p1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(sg, { ...e }) : /* @__PURE__ */ n(ig, { ...e });
}
const dg = "_list_1gu6a_2", ug = "_check_1gu6a_10", hg = "_body_1gu6a_16", mg = "_text_1gu6a_23", wg = "_pending_1gu6a_32", _g = "_measured_1gu6a_37", He = {
  list: dg,
  check: ug,
  body: hg,
  text: mg,
  pending: wg,
  measured: _g
};
function vg(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function fg({ check: e }) {
  const a = vg(e.passed);
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
function g1({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${He.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(fg, { check: a }, a.text)) });
}
const bg = "_root_16pdz_2", pg = "_list_16pdz_9", gg = "_line_16pdz_16", Ng = "_at_16pdz_43", yg = "_text_16pdz_47", kg = "_foot_16pdz_51", $g = "_idle_16pdz_62", Cg = "_caret_16pdz_69", Sg = "_jump_16pdz_76", fe = {
  root: bg,
  list: pg,
  line: gg,
  at: Ng,
  text: yg,
  foot: kg,
  idle: $g,
  caret: Cg,
  jump: Sg
}, Rg = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Ka(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Rg.format(new Date(e));
}
const Tg = { warn: "warning", ok: "ok" };
function Lg({ kind: e }) {
  const a = Tg[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Ag({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Ka(e)}` });
}
function xg({ connection: e, idleSince: a, last: t, children: r }) {
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
function N1({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
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
      /* @__PURE__ */ n(Lg, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: fe.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(xg, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${fe.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const Eg = "_row_11jhe_2", qg = "_head_11jhe_14", Ig = "_author_11jhe_20", Mg = "_eta_11jhe_25", Bg = "_edited_11jhe_26", Pg = "_body_11jhe_32", Dg = "_reason_11jhe_37", Og = "_actions_11jhe_42", _e = {
  row: Eg,
  head: qg,
  author: Ig,
  eta: Mg,
  edited: Bg,
  body: Pg,
  reason: Dg,
  actions: Og
}, Hg = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function Fg(e) {
  return {
    queued: `Still in the outbox — editing replaces the queued row and recomputes req_hash, so ${e} receives one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed — edit and resend, or cancel the delivery."
  };
}
function jg({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function Wg({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: _e.reason, id: a, children: e })
  ] });
}
function zg(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Gg(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(jg, { ...e }) : /* @__PURE__ */ n(Wg, { reason: e.unavailable, reasonId: e.unavailableId });
}
function y1(e) {
  const { comment: a } = e;
  zg(e);
  const t = k(), r = `${t}-unavailable`, o = Hg[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${_e.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: _e.head, children: [
      /* @__PURE__ */ n("span", { className: _e.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: _e.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: _e.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: _e.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: _e.reason, id: t, children: Fg(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: _e.actions, children: /* @__PURE__ */ n(Gg, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Kg = "_root_c46wj_2", Ug = "_attach_c46wj_11", Vg = "_actions_c46wj_17", Yg = "_reply_c46wj_23", Jg = "_replyRow_c46wj_28", Xg = "_sendsAs_c46wj_42", je = {
  root: Kg,
  attach: Ug,
  actions: Vg,
  reply: Yg,
  replyRow: Jg,
  sendsAs: Xg
};
function Qg({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = g(""), i = k();
  return /* @__PURE__ */ l("div", { className: je.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: je.replyRow, children: [
      /* @__PURE__ */ n(x, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: je.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function k1(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Qg, { ...e }) : /* @__PURE__ */ n(Zg, { ...e });
}
function Zg({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ l("div", { className: je.root, children: [
    /* @__PURE__ */ n(x, { kind: "textarea", label: e, value: c, onChange: s }),
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
const eN = "_list_1ih9e_2", aN = "_item_1ih9e_6", nN = "_body_1ih9e_22", tN = "_text_1ih9e_28", rN = "_evidence_1ih9e_37", lN = "_consequence_1ih9e_49", oN = "_note_1ih9e_54", Ee = {
  list: eN,
  item: aN,
  body: nN,
  text: tN,
  evidence: rN,
  consequence: lN,
  note: oN
};
function iN({ criterion: e }) {
  return /* @__PURE__ */ n(Se, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function mn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function cN(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function sN({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ee.body, children: [
    /* @__PURE__ */ n("span", { className: Ee.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(A, { children: [
      /* @__PURE__ */ n(mn, { text: " — " }),
      /* @__PURE__ */ n("code", { className: Ee.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(A, { children: [
      /* @__PURE__ */ n(mn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ee.consequence, children: cN(e.why) })
    ] })
  ] });
}
function dN({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ee.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(iN, { criterion: e }),
    /* @__PURE__ */ n(sN, { criterion: e })
  ] });
}
function $1({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ee.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(dN, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Ee.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const uN = "_list_dwhoz_2", hN = "_rung_dwhoz_6", mN = "_name_dwhoz_18", wN = "_actor_dwhoz_32", ta = {
  list: uN,
  rung: hN,
  name: mN,
  actor: wN
}, _N = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function vN({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = _N[e.state];
  return /* @__PURE__ */ l("li", { className: ta.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ta.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ta.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function C1({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ta.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(vN, { rung: a }, a.name)) });
}
const fN = "_sheet_1fqco_2", bN = "_title_1fqco_9", pN = "_stage_1fqco_15", gN = "_effects_1fqco_20", NN = "_effect_1fqco_20", yN = "_numeral_1fqco_31", kN = "_effectText_1fqco_38", $N = "_refusals_1fqco_43", CN = "_reasons_1fqco_52", SN = "_reason_1fqco_52", RN = "_actions_1fqco_62", ce = {
  sheet: fN,
  title: bN,
  stage: pN,
  effects: gN,
  effect: NN,
  numeral: yN,
  effectText: kN,
  refusals: $N,
  reasons: CN,
  reason: SN,
  actions: RN
};
function TN({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function S1({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
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
      ai,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(x, { kind: "textarea", label: "Note for the agent", value: d, onChange: h }),
    _ && /* @__PURE__ */ l("div", { className: ce.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ce.reasons, children: t.map((b, L) => /* @__PURE__ */ n("li", { className: ce.reason, id: L === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: ce.actions, children: [
      /* @__PURE__ */ n(TN, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const LN = "_list_1hvqu_2", AN = "_path_1hvqu_7", xN = "_head_1hvqu_21", EN = "_label_1hvqu_28", qN = "_consequence_1hvqu_35", IN = "_ask_1hvqu_36", Fe = {
  list: LN,
  path: AN,
  head: xN,
  label: EN,
  consequence: qN,
  ask: IN
}, Ma = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function wn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function MN({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: Ma[e.kind] }) : /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: Ma[e.kind] }),
    /* @__PURE__ */ n("span", { className: Fe.ask, id: r, children: e.askInstead })
  ] });
}
function BN({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: Fe.path, "data-allowed": e.allowed, "data-role": wn(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: Fe.head, children: [
      /* @__PURE__ */ n("span", { className: Fe.label, children: e.title ?? Ma[e.kind] }),
      /* @__PURE__ */ n(m, { role: wn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Fe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(MN, { path: e, primary: a, onChoose: t })
  ] });
}
function R1({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Fe.list, children: e.map((t, r) => /* @__PURE__ */ n(BN, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const PN = "_list_qjv4r_2", DN = "_item_qjv4r_6", ON = "_node_qjv4r_18", HN = "_body_qjv4r_24", FN = "_head_qjv4r_30", jN = "_stage_qjv4r_36", WN = "_version_qjv4r_41", zN = "_sentence_qjv4r_49", GN = "_meta_qjv4r_54", be = {
  list: PN,
  item: DN,
  node: ON,
  body: HN,
  head: FN,
  stage: jN,
  version: WN,
  sentence: zN,
  meta: GN
}, KN = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function UN({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: be.head, children: [
    /* @__PURE__ */ n("span", { className: be.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: be.version, title: e.version, children: e.version }) : null
  ] });
}
function VN({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${be.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${be.node} ward-history-node`, children: /* @__PURE__ */ n(Se, { size: 9, kind: KN[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${be.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(UN, { entry: e }),
      /* @__PURE__ */ n("span", { className: be.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${be.meta} ward-history-meta`, children: [
        `${re(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${Q(e.cost)}`
      ] })
    ] })
  ] });
}
function T1({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${be.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(VN, { entry: a }, a.stage + String(t))) });
}
const YN = "_thread_1kn6s_3", JN = "_turn_1kn6s_8", XN = "_who_1kn6s_27", QN = "_body_1kn6s_32", ra = {
  thread: YN,
  turn: JN,
  who: XN,
  body: QN
}, nt = ze(!1);
function L1({ children: e, density: a }) {
  return /* @__PURE__ */ n(nt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ra.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function A1({ turn: e }) {
  if (!We(nt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${ra.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${ra.who} ward-chat-who`, children: [
      e.author,
      " · ",
      re(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ra.body} ward-chat-body`, children: e.body })
  ] });
}
const ZN = "_list_1rt9c_3", ey = "_row_1rt9c_7", ay = "_label_1rt9c_20", ny = "_n_1rt9c_26", ty = "_cause_1rt9c_33", Ue = {
  list: ZN,
  row: ey,
  label: ay,
  n: ny,
  cause: ty
};
function ry(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const ly = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function oy({ row: e, formatNumber: a }) {
  return ry(e), /* @__PURE__ */ l("li", { className: `${Ue.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Se, { size: 8, ...ly[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Ue.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Ue.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(iy, { cause: e.cause })
  ] });
}
function iy({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ue.cause} ward-healthrow-cause`, children: e }) : null;
}
function x1({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(oy, { row: t, formatNumber: a }, t.label)) });
}
const cy = "_root_1jxwp_2", sy = {
  root: cy
};
function E1({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: sy.root, "data-density": o, children: [
    /* @__PURE__ */ n(Na, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const dy = "_row_dhbre_3", uy = "_key_dhbre_13", hy = "_stack_dhbre_24", my = "_value_dhbre_32", wy = "_evidence_dhbre_39", _y = "_mark_dhbre_47", Oe = {
  row: dy,
  key: uy,
  stack: hy,
  value: my,
  evidence: wy,
  mark: _y
};
function vy({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ha, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function q1({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Oe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Oe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Oe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Oe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Oe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Oe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(vy, { state: e.state }) })
  ] });
}
const fy = "_cell_1monp_2", by = {
  cell: fy
}, py = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function gy(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function Ny(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function yy(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: gy(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function ky(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function I1({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  Ny(e, t);
  const r = ky(e);
  return /* @__PURE__ */ n(
    _i,
    {
      label: "Rejection routing",
      columns: py,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: by.cell, "data-norerun": o.noRerun ? !0 : void 0, children: yy(o, i) }),
      empty: a ?? /* @__PURE__ */ n(Wc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const $y = "_row_ute8v_2", Cy = "_title_ute8v_11", Sy = "_turns_ute8v_20", Ry = "_waiting_ute8v_21", Ty = "_resolved_ute8v_22", Ly = "_activity_ute8v_23", Ay = "_cost_ute8v_29", xy = "_link_ute8v_30", Ey = "_tableRow_ute8v_47", qy = "_tableTitle_ute8v_59", Iy = "_tableResolved_ute8v_64", My = "_tableLink_ute8v_68", By = "_tableMeta_ute8v_83", Py = "_tableCost_ute8v_90", Dy = "_tableActivity_ute8v_91", Oy = "_tableState_ute8v_101", Hy = "_tableRecord_ute8v_112", B = {
  row: $y,
  title: Cy,
  turns: Sy,
  waiting: Ry,
  resolved: Ty,
  activity: Ly,
  cost: Ay,
  link: xy,
  tableRow: Ey,
  tableTitle: qy,
  tableResolved: Iy,
  tableLink: My,
  tableMeta: By,
  tableCost: Py,
  tableActivity: Dy,
  tableState: Oy,
  tableRecord: Hy
}, tt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function Fy(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function jy(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Wy(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const zy = { duplicate: "CLOSED · DUPLICATE" };
function Gy({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function Ky({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : Q(e) });
}
function Uy({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function Vy({ session: e, href: a }) {
  const t = tt[e.state];
  return /* @__PURE__ */ l("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: jy(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: B.tableResolved, children: [
      Wy(e.resolved),
      /* @__PURE__ */ n(Gy, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(Ky, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: Fy(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: zy[e.state] ?? t.label }),
      /* @__PURE__ */ n(Uy, { link: e.link })
    ] }) })
  ] });
}
function Yy({ session: e }) {
  const a = tt[e.state];
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
function M1(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(Vy, { session: e.session, href: e.href }) : /* @__PURE__ */ n(Yy, { session: e.session });
}
const Jy = "_block_1yy2v_3", Xy = "_list_1yy2v_9", Qy = "_line_1yy2v_14", Ba = {
  block: Jy,
  list: Xy,
  line: Qy
}, Zy = { warn: "warning", ok: "ok" };
function ek({ kind: e }) {
  const a = Zy[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function ak({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Ba.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(ek, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function B1({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ba.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ba.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(ak, { line: t }, `${r}-${t.text}`)) }) });
}
const nk = "_band_tt7hp_1", tk = "_head_tt7hp_8", rk = "_cell_tt7hp_19", lk = "_index_tt7hp_35", ok = "_title_tt7hp_42", ik = "_note_tt7hp_48", ck = "_cellTitle_tt7hp_53", sk = "_cellBody_tt7hp_58", dk = "_tag_tt7hp_64", we = {
  band: nk,
  head: tk,
  cell: rk,
  index: lk,
  title: ok,
  note: ik,
  cellTitle: ck,
  cellBody: sk,
  tag: dk
}, _n = 4;
function P1({ index: e, title: a, note: t, cells: r }) {
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
  N1 as ActivityConsole,
  nh as AgentCard,
  kk as AppShell,
  i1 as AppearanceStrip,
  P1 as Band,
  $s as BoardColumn,
  Fk as BoardFootnote,
  jk as BoardHeader,
  Ik as BoardScroller,
  v as Btn,
  pk as CHIP_ROLES,
  Kn as CREDENTIAL_COLUMNS,
  Rk as Callout,
  c1 as CapabilityRow,
  A1 as ChatMessage,
  pn as Checkbox,
  m as Chip,
  y1 as ClarificationRow,
  Qk as ClauseRuleRow,
  Xk as ClauseRules,
  An as ColourLadder,
  s1 as ComponentRow,
  k1 as Composer,
  zk as ConfigRow,
  Wk as ConfigRowHead,
  Fa as ConnectionMark,
  L1 as Conversation,
  ai as CostMeter,
  u1 as CredentialRow,
  d1 as CredentialRowHead,
  $1 as CriteriaList,
  Pr as Crumb,
  x1 as DeliveryHealth,
  Bk as DeniedState,
  Zk as DryRunRail,
  Wc as EmptyState,
  h1 as EnvCard,
  x as Field,
  Mk as FilteredEmpty,
  Ek as FormStack,
  Na as GateChecklist,
  C1 as GateLadder,
  _i as Grid,
  a1 as HandoffRuleRow,
  e1 as HandoffRules,
  Gk as ItemDrawer,
  Nt as LIVE_EVENT_TYPES,
  $u as LegacyBoardColumn,
  Uk as LegacyBoardHeader,
  Vk as LegacyConfigRow,
  Jk as LegacyItemDrawer,
  fu as LegacyOverCapNote,
  Yk as LegacyPreviewRail,
  Rn as LegacyWorkCard,
  ge as LiveIndicator,
  Pk as LoadFailed,
  Hk as Loading,
  Jn as MCP_SERVER_COLUMNS,
  Ha as Mark,
  w1 as MarkUpload,
  Se as Marker,
  v1 as McpServerRow,
  _1 as McpServerRowHead,
  n1 as NewStreamModal,
  Kc as OverCapNote,
  Je as Overlay,
  Eh as PARTIAL_STEP_REASON,
  Xn as POLICY_CHIP_WIDTH,
  Lk as PageFrame,
  Sk as PageHeader,
  f1 as PolicyRow,
  Kk as PreviewRail,
  Sa as ROLE_MATRIX_COLUMNS,
  jn as RULE_ACTIONS,
  yn as Radio,
  E1 as ReadyChecklist,
  xk as RecordSection,
  S1 as RequeueSheet,
  R1 as ResolveBlock,
  q1 as ResolvedFieldRow,
  b1 as RoleMatrixRow,
  I1 as RoutingTable,
  t1 as RuleRow,
  p1 as RunbookSteps,
  pt as STREAM_STEPS,
  qk as SectionBand,
  Ei as SectionHeader,
  gn as SegmentedControl,
  M1 as SessionRow,
  Ck as Sidebar,
  r1 as StageColumn,
  T1 as StageHistory,
  Mw as StageListEditor,
  Dk as StaleStrip,
  ba as StatStrip,
  l1 as StreamRow,
  Ak as SubjectRail,
  qe as Switch,
  $k as Tabs,
  o1 as ToolRow,
  Tk as TopBar,
  cc as Tree,
  $n as TreeRow,
  B1 as TypedInputBlock,
  g1 as ValidationList,
  wk as VisibilityProvider,
  _k as Visible,
  bk as WARD_VERSION,
  ga as WorkCard,
  Ok as WriteUnavailableStrip,
  Fy as agoSince,
  ut as clock,
  Qw as colourStatus,
  ae as count,
  te as duration,
  Pa as elapsed,
  fk as eventSourceTransport,
  wa as isStreamStep,
  _a as isValidatedStreamStep,
  qh as ladderValidation,
  Yb as mcpConnectionChip,
  Ub as mcpToolName,
  Q as money,
  ue as ms,
  Cn as ordered,
  vn as ratio,
  Of as restartLabel,
  re as stamp,
  bn as stream,
  Nk as streamChip,
  fa as streamChipProps,
  Ce as streamColour,
  kt as streamHex,
  gk as streamVars,
  aa as useBorderFlash,
  vt as useFocusTrap,
  yk as useLiveFeed,
  vk as useReturnFocus,
  ma as useRovingTabindex,
  Da as useTicker,
  ht as useVisible,
  j as v,
  m1 as validateMark,
  va as validatedStep,
  gt as validatedStreamSteps
};
