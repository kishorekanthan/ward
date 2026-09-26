import { jsx as n, Fragment as L, jsxs as l } from "react/jsx-runtime";
import { useMemo as nt, useContext as We, createContext as ze, useCallback as G, useEffect as A, useState as g, useRef as N, useLayoutEffect as tt, useId as $, Fragment as rt } from "react";
import { createPortal as lt } from "react-dom";
function ne(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const za = (e) => String(e).padStart(2, "0");
function Ma(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${za(a % 60)}s` : `${Math.floor(t / 60)}h ${za(t % 60)}m`;
}
const ot = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function te(e) {
  const a = ot.formatToParts(new Date(e)), t = (r) => {
    var o;
    return ((o = a.find((i) => i.type === r)) == null ? void 0 : o.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function J(e) {
  return e > 0 && e < 5e-3 ? "<$0.01" : e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function Q(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function hn(e, a) {
  return `${e} / ${a}`;
}
const it = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function ct(e) {
  return it.format(new Date(e));
}
const mn = ze(/* @__PURE__ */ new Set());
function ek({ hidden: e, children: a }) {
  const t = nt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(mn.Provider, { value: t, children: a });
}
function st(e) {
  return !We(mn).has(e);
}
function ak({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(L, { children: st(e) ? a : t });
}
const dt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function ut(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function ht(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = ut(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function mt(e) {
  return { onKeyDown: G(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(dt));
      ht(t, e.current, r);
    },
    [e]
  ) };
}
function nk(e, a = !0) {
  A(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const Ga = { ArrowUp: -1, ArrowDown: 1 }, Ka = { ArrowLeft: -1, ArrowRight: 1 }, wt = (e, a, t) => Math.min(t, Math.max(a, e));
function _t(e, a) {
  if (a !== "horizontal" && e in Ga) return Ga[e];
  if (a !== "vertical" && e in Ka) return Ka[e];
}
function ha({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  tt(() => {
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
      const _ = Math.max(0, h.indexOf(a)), b = _t(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[wt(_ + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
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
const tk = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, rk = "0.2.0", lk = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], vt = [1, 2, 3, 4, 5, 6], ft = [1, 2, 3], bt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], j = {
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
}, de = {
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
function wn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function ma(e) {
  return vt.includes(e);
}
function wa(e) {
  return ft.includes(e);
}
function ok(e) {
  if (!ma(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function ik(e) {
  if (!ma(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const pt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function gt(e) {
  if (!ma(e)) throw new Error("unvalidated stream step");
  return pt[e];
}
function Ua(e) {
  return typeof e != "string" ? null : bt.includes(e) ? e : null;
}
function Nt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function yt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function kt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function $t(e, a, t) {
  const r = Nt(e);
  if (r === null) return null;
  const o = Ua(t) ?? Ua(r.type);
  return o === null ? null : { ...r, type: o, id: yt(r, a), at: kt(r) };
}
function Ct(e, a) {
  return e >= de.staleAfter ? "stale" : e >= de.heartbeat && a === "live" ? "reconnecting" : null;
}
function St(e, a, t) {
  return e >= de.heartbeat && !a && t !== null;
}
function ck(e, a) {
  const [t, r] = g("reconnecting"), [o, i] = g(null), c = N(/* @__PURE__ */ new Map()), s = N(0), u = N(""), d = N(0), h = N(null), _ = N(0), b = N(0), E = N(!1), Z = N("reconnecting"), ee = G((k) => {
    Z.current = k, r(k);
  }, []), re = G(() => {
    s.current = Date.now();
  }, []), qe = G((k) => {
    for (const [F, he] of c.current)
      (he === "*" || k.itemKey === he) && F(k);
  }, []), le = G(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: (k, F, he) => {
        const $e = $t(k, F, he);
        $e !== null && ($e.id && (u.current = $e.id), re(), E.current = !1, ee("live"), i($e.at), qe($e));
      },
      onOpen: () => {
        d.current = 0, E.current = !1, re(), ee("live");
      },
      onError: () => {
        var F;
        (F = h.current) == null || F.close(), h.current = null, E.current = !0, Z.current !== "stale" && ee("reconnecting");
        const k = Math.min(de.reconnectBase * 2 ** d.current, de.reconnectMax);
        d.current += 1, _.current = window.setTimeout(le, k);
      }
    });
  }, [qe, ee, re, a, e]), Ie = G((k) => {
    E.current = !0, k.close(), h.current = null, _.current = window.setTimeout(le, de.reconnectBase);
  }, [le]), Me = G((k, F) => (c.current.set(F, k), () => {
    c.current.delete(F);
  }), []);
  return A(() => (le(), b.current = window.setInterval(() => {
    const k = Date.now() - s.current, F = Ct(k, Z.current);
    F && ee(F);
    const he = h.current;
    St(k, E.current, he) && Ie(he);
  }, de.tick), () => {
    var k;
    window.clearInterval(b.current), window.clearTimeout(_.current), E.current = !1, (k = h.current) == null || k.close(), h.current = null;
  }), [le, Ie, ee]), { connection: t, lastEventAt: o, subscribe: Me };
}
function Ba(e, a) {
  const t = new Date(e).getTime(), [r, o] = g(() => Date.now());
  return A(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    i();
    const c = window.setInterval(i, de.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(c), document.removeEventListener("visibilitychange", i);
    };
  }, [a, t]), Math.max(0, r - t);
}
function Rt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Va(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ea(e, a) {
  const t = N(0), r = G((o) => {
    const i = o ?? a, c = e.current;
    c !== null && i !== void 0 && (Rt() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => Va(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => Va(c), de.flash)));
  }, [a, e]);
  return A(() => () => window.clearTimeout(t.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const Tt = "_root_1otpc_2", Lt = {
  root: Tt
};
function xt(e, a, t, r, o) {
  const i = [Ma(a)];
  return e || i.push(`as of ${ct(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = Ba(e, o), c = (a == null ? void 0 : a.at) ?? e, s = xt(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${Lt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      te(e)
    ] })
  ] });
}
const At = "_app_lrbcc_1", Et = "_side_lrbcc_18", qt = "_main_lrbcc_26", It = "_rail_lrbcc_33", Mt = "_page_lrbcc_40", Bt = "_root_lrbcc_91", Pt = "_topbar_lrbcc_98", Dt = "_mark_lrbcc_109", Ot = "_brand_lrbcc_116", Ht = "_tagline_lrbcc_122", Ft = "_identity_lrbcc_128", jt = "_tools_lrbcc_129", Wt = "_actor_lrbcc_138", zt = "_metadata_lrbcc_139", Gt = "_detail_lrbcc_155", Kt = "_nav_lrbcc_160", Ut = "_content_lrbcc_195", Vt = "_skip_lrbcc_218", D = {
  app: At,
  side: Et,
  main: qt,
  rail: It,
  page: Mt,
  root: Bt,
  topbar: Pt,
  mark: Dt,
  brand: Ot,
  tagline: Ht,
  identity: Ft,
  tools: jt,
  actor: Wt,
  metadata: zt,
  detail: Gt,
  nav: Kt,
  content: Ut,
  skip: Vt
};
function Yt({ sidebar: e, header: a, children: t, rail: r }) {
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
function Jt({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: D.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function ra({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Xt({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: D.metadata, children: [
    /* @__PURE__ */ n(ra, { value: e, className: D.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(ra, { value: a, className: D.detail })
  ] });
}
function Qt(e) {
  return /* @__PURE__ */ l("header", { className: D.topbar, children: [
    /* @__PURE__ */ n("span", { className: D.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: D.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(ra, { value: e.tagline, className: D.tagline }),
    /* @__PURE__ */ n(Jt, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: D.identity, children: /* @__PURE__ */ n(Xt, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(ra, { value: e.tools, className: D.tools })
  ] });
}
function Zt(e) {
  const a = $();
  return /* @__PURE__ */ l("div", { className: `${D.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: D.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Qt, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: D.content, children: e.children })
  ] });
}
function er(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function sk(e) {
  return er(e) ? /* @__PURE__ */ n(Yt, { ...e }) : /* @__PURE__ */ n(Zt, { ...e });
}
const ar = "_btn_llheq_2", nr = "_primary_llheq_13", tr = "_secondary_llheq_23", rr = "_ghost_llheq_28", lr = "_overflow_llheq_37", or = "_sm_llheq_44", ir = "_disabled_llheq_48", Xe = {
  btn: ar,
  primary: nr,
  secondary: tr,
  ghost: rr,
  overflow: lr,
  sm: or,
  disabled: ir
};
function cr(e, a, t, r) {
  const o = a === "sm" ? [Xe.sm, "ward-btn--sm"] : [], i = t ? [Xe.disabled] : [];
  return [Xe.btn, Xe[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function sr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function dr(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function ur(e) {
  return e.children ?? e.label;
}
function v(e) {
  dr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: cr(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...sr(a, e.controls),
      children: ur(e)
    }
  );
}
function Pa(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const hr = "_root_o4yib_2", mr = "_row_o4yib_8", wr = "_box_o4yib_14", _r = "_label_o4yib_21", vr = "_lockedNote_o4yib_26", fr = "_consequence_o4yib_34", br = "_sample_o4yib_69", Se = {
  root: hr,
  row: mr,
  box: wr,
  label: _r,
  lockedNote: vr,
  consequence: fr,
  sample: br
};
function pr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function gr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Se.consequence} ward-check-consequence`, children: a }) : null;
}
function Nr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Se.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function yr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Se.sample, "aria-hidden": "true", children: e }) : null;
}
function _n(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = pr(e);
  return /* @__PURE__ */ l("div", { className: `${Se.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: Se.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Se.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (o) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, o.target.checked));
          },
          "aria-describedby": Pa(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: a, className: Se.label, children: [
        e.label,
        /* @__PURE__ */ n(Nr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(yr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(gr, { id: t, text: e.consequence })
  ] });
}
const kr = "_chip_1073r_2", $r = {
  chip: kr
}, Cr = {
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
function Sr(e, a) {
  if (e === "stream") return Rr(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Cr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Rr(e) {
  if (!e || !wa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = wn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${$r.chip} ward-chip ward-chip--${e}`, style: Sr(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function _a(e) {
  return typeof e == "number" && wa(e) ? e : null;
}
function Ae(e, a) {
  const t = _a(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function va(e, a) {
  const t = _a(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const Tr = "_nav_fbsei_2", Lr = "_list_fbsei_8", xr = "_item_fbsei_15", Ar = "_link_fbsei_24", Er = "_current_fbsei_33", qr = "_chips_fbsei_37", Be = {
  nav: Tr,
  list: Lr,
  item: xr,
  link: Ar,
  current: Er,
  chips: qr
};
function Ir({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Be.nav, children: [
    /* @__PURE__ */ n("ol", { className: Be.list, children: e.map((t, r) => /* @__PURE__ */ n("li", { className: Be.item, children: r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Be.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Be.current, "aria-current": "page", children: t.label }) }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Be.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const Mr = "_field_1oadv_2", Br = "_label_1oadv_8", Pr = "_labelHidden_1oadv_15", Dr = "_control_1oadv_25", Or = "_mono_1oadv_44", Hr = "_area_1oadv_49", Fr = "_invalid_1oadv_56", ke = {
  field: Mr,
  label: Br,
  labelHidden: Pr,
  control: Dr,
  mono: Or,
  area: Hr,
  invalid: Fr
};
function jr({ controlProps: e, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, ...e });
}
function Wr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function zr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Gr = { input: jr, select: Wr, textarea: zr };
function Kr(e, a, t) {
  const r = Gr[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Ur(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Pa(r ? t : void 0, e.describedBy),
    onChange: (o) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, o.target.value);
    }
  };
}
function Vr(e) {
  const a = e.mono ? [ke.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [ke.area] : [];
  return [ke.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Yr(e) {
  return e ? `${ke.label} ${ke.labelHidden} ward-field-label` : `${ke.label} ward-field-label`;
}
function x(e) {
  const a = $(), t = `${a}-msg`, r = Ur(e, a, t), o = Vr(e);
  return /* @__PURE__ */ l("div", { className: `${ke.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Yr(e.labelHidden), htmlFor: a, children: e.label }),
    Kr(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${ke.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Jr = "_strip_rg8pj_2", Xr = "_tab_rg8pj_12", Qr = "_count_rg8pj_34", Ta = {
  strip: Jr,
  tab: Xr,
  count: Qr
}, Ya = 7;
function Zr(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function el(e) {
  return `${Ta.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function dk({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > Ya) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Ya} — the set is fixed`);
  const i = ha({ orientation: "horizontal" }), c = Zr(e, a);
  return A(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: el(o),
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
          className: `${Ta.tab} ward-tab`,
          "aria-selected": s.id === a,
          "aria-controls": `panel-${s.id}`,
          onClick: () => t(s.id),
          ...i.itemProps(u),
          children: [
            s.label,
            s.count === void 0 ? null : /* @__PURE__ */ l(L, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: Ta.count, children: `· ${s.count}` })
            ] })
          ]
        },
        s.id
      ))
    }
  );
}
const al = "_root_jem6y_2", nl = "_segment_jem6y_7", Ja = {
  root: al,
  segment: nl
};
function vn({ options: e, value: a, onChange: t, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = ha({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return A(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${Ja.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Ja.segment,
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
const tl = "_sidebar_1jywv_3", rl = "_brand_1jywv_9", ll = "_mark_1jywv_17", ol = "_word_1jywv_24", il = "_nav_1jywv_30", cl = "_navItem_1jywv_38", sl = "_group_1jywv_50", dl = "_groupName_1jywv_57", ul = "_agents_1jywv_70", hl = "_agent_1jywv_70", ml = "_agentTop_1jywv_88", wl = "_dot_1jywv_95", _l = "_agentName_1jywv_107", vl = "_agentMeta_1jywv_120", fl = "_foot_1jywv_126", bl = "_footName_1jywv_132", pl = "_footLinks_1jywv_139", gl = "_footLink_1jywv_139", Nl = "_root_1jywv_153", yl = "_linkBrand_1jywv_162", kl = "_label_1jywv_183", $l = "_note_1jywv_188", Cl = "_footer_1jywv_202", C = {
  sidebar: tl,
  brand: rl,
  mark: ll,
  word: ol,
  nav: il,
  navItem: cl,
  group: sl,
  groupName: dl,
  new: "_new_1jywv_64",
  agents: ul,
  agent: hl,
  agentTop: ml,
  dot: wl,
  agentName: _l,
  agentMeta: vl,
  foot: fl,
  footName: bl,
  footLinks: pl,
  footLink: gl,
  root: Nl,
  linkBrand: yl,
  label: kl,
  note: $l,
  footer: Cl
};
function Sl({ agent: e }) {
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
              style: { "--dot": wn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Rl({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function Tl({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
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
        Q(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: C.new, href: o.href, children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(Sl, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(Rl, { shared: i })
  ] });
}
function Ll(e) {
  return e.destinations ?? e.items ?? [];
}
function xl({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function Al({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function El({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function ql(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(xl, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Ll(e).map((a) => /* @__PURE__ */ n(El, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(Al, { children: e.children })
  ] });
}
function Il(e) {
  return "agents" in e;
}
function uk(e) {
  return Il(e) ? /* @__PURE__ */ n(Tl, { ...e }) : /* @__PURE__ */ n(ql, { ...e });
}
const Ml = "_mark_wlgi8_3", Bl = {
  mark: Ml
}, Pl = { met: "✓", unmet: "", failed: "✕" };
function Da({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Bl.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Pl[e]
    }
  );
}
const Dl = "_marker_br9fi_2", Ol = {
  marker: Dl
}, Hl = {
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
function Ee({ size: e, kind: a, label: t }) {
  const r = { "--marker": Hl[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Ol.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Fl = "_root_ti0pq_2", jl = "_chip_ti0pq_11", Wl = "_noCase_ti0pq_23", Qe = {
  root: Fl,
  chip: jl,
  noCase: Wl
};
function zl(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Oa({ connection: e, since: a, lastEventAt: t }) {
  const r = zl(a, t), o = Ba(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${Qe.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ee, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: Qe.noCase, children: Ma(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    te(r)
  ] });
}
const Gl = "_root_11rs7_2", Kl = "_context_11rs7_12", Ul = "_row_11rs7_1", Vl = "_heading_11rs7_25", Yl = "_headingWrap_11rs7_33", Jl = "_chips_11rs7_38", Xl = "_title_11rs7_45", Ql = "_consequence_11rs7_54", Zl = "_actionsWrap_11rs7_59", eo = "_actions_11rs7_59", ao = "_action_11rs7_59", no = "_overflowPanel_11rs7_78", to = "_measure_11rs7_88", V = {
  root: Gl,
  context: Kl,
  row: Ul,
  heading: Vl,
  headingWrap: Yl,
  chips: Jl,
  title: Xl,
  consequence: Ql,
  actionsWrap: Zl,
  actions: eo,
  action: ao,
  overflowPanel: no,
  measure: to
};
function ro({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: V.heading, children: [
    /* @__PURE__ */ n("h1", { className: V.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: V.consequence, children: a })
  ] });
}
function fn({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: V.action, "data-action": "", children: a }, t));
}
function lo({ actions: e, collapsed: a, onOverflow: t, disclosure: r }) {
  return a ? t ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: t, children: "···" }) : /* @__PURE__ */ n(v, { variant: "overflow", onClick: r.toggle, expanded: r.open, controls: r.panelId, children: "···" }) : /* @__PURE__ */ n(fn, { actions: e });
}
function oo({ actions: e, disclosure: a, onEscape: t }) {
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: V.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(fn, { actions: e }) });
}
function io(e, a) {
  const t = $(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function co({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: V.context, children: [
    /* @__PURE__ */ n(Ir, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: V.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function so(...e) {
  return e.some((a) => a === null);
}
function uo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function ho(e, a, t, r, o) {
  if (o === 0 || so(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = uo(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function mo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function wo(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = g(!1);
  return A(() => {
    const s = a.current;
    if (!mo(s)) return;
    const u = () => c(ho(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function _o({ connection: e }) {
  return e ? /* @__PURE__ */ n(Oa, { connection: e.connection, since: e.since }) : null;
}
function hk({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], connection: i, onOverflow: c, density: s = "page" }) {
  const { rowRef: u, headingRef: d, actionsRef: h, measureRef: _, collapsed: b } = wo(o), { disclosure: E, close: Z } = io(b, h);
  return /* @__PURE__ */ l("header", { className: V.root, "data-density": s, children: [
    /* @__PURE__ */ n(co, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: V.row, ref: u, children: [
      /* @__PURE__ */ n("div", { ref: d, className: V.headingWrap, children: /* @__PURE__ */ n(ro, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: V.actionsWrap, children: [
        /* @__PURE__ */ n(_o, { connection: i }),
        /* @__PURE__ */ n("div", { className: V.actions, ref: h, "data-ward-actions": !0, children: /* @__PURE__ */ n(lo, { actions: o, collapsed: b, onOverflow: c, disclosure: E }) })
      ] })
    ] }),
    b && !c ? /* @__PURE__ */ n(oo, { actions: o, disclosure: E, onEscape: Z }) : null,
    /* @__PURE__ */ n("div", { className: V.measure, ref: _, "aria-hidden": "true", children: o.map((ee, re) => /* @__PURE__ */ n("span", { children: ee }, re)) })
  ] });
}
function bn(e) {
  const [a, t] = g(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return A(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const o = (c) => t(c.matches);
    return r.addEventListener("change", o), t(r.matches), () => r.removeEventListener("change", o);
  }, [e]), a;
}
const vo = "_scrim_c7sqj_2", fo = "_drawer_c7sqj_10", bo = "_sheet_c7sqj_14", po = "_modal_c7sqj_18", go = "_panel_c7sqj_23", No = "_header_c7sqj_51", yo = "_title_c7sqj_59", ko = "_body_c7sqj_63", $o = "_close_c7sqj_90", be = {
  scrim: vo,
  drawer: fo,
  sheet: bo,
  modal: po,
  panel: go,
  header: No,
  title: yo,
  body: ko,
  close: $o
}, Co = ze(null), la = [], oa = /* @__PURE__ */ new Map();
function So(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Ro(e, a) {
  let t = oa.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, oa.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function To(e, a) {
  for (const t of Array.from(a.children))
    So(t) || Ro(e, t);
}
function Lo(e) {
  for (const a of e.claims) {
    const t = oa.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), oa.delete(a)));
  }
}
function xo(e, a) {
  const t = { root: e, claims: [] };
  return la.push(t), To(t, a), t;
}
function Ao(e) {
  const a = la.indexOf(e);
  a >= 0 && la.splice(a, 1), Lo(e);
}
function Xa(e) {
  return e !== null && la.at(-1) === e;
}
function Eo(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, A(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = xo(i, a);
    return r.current = s, () => {
      var d, h;
      const u = Xa(s);
      Ao(s), r.current = null, u && ((h = (d = o.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), G(() => Xa(r.current), []);
}
function qo(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Io(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Mo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${be.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("header", { className: `${be.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${be.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${be.body} ward-drawer-body`, children: e.children })
  ] });
}
function Bo(e) {
  return `${be.scrim} ${be[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Po(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${be.panel} ${be[e]} ward-overlay-panel${t}${r}`;
}
function Do(e) {
  const a = We(Co);
  return e ?? a ?? document.body;
}
function Je(e) {
  const a = N(null), t = N(null), r = $(), o = Do(e.container), i = bn("(min-width: 768px)"), c = qo(e.kind, i), s = Io(e, r), u = mt(t), d = Eo(a, o, e.returnFocusTo), h = G(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return A(() => {
    var _, b;
    d() && ((b = (_ = t.current) == null ? void 0 : _.querySelector("button")) == null || b.focus());
  }, [d]), A(() => {
    const _ = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [h]), lt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Bo(c),
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
            className: Po(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${be.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Mo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Oo = "_root_drrhx_2", Ho = "_ticket_drrhx_15", Fo = "_body_drrhx_24", Na = {
  root: Oo,
  ticket: Ho,
  body: Fo
};
function mk({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${Na.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Na.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Na.body, children: t })
  ] });
}
const jo = "_root_1bfqw_2", Wo = "_figure_1bfqw_7", zo = "_of_1bfqw_13", Go = "_bar_1bfqw_18", Ko = "_rows_1bfqw_38", Uo = "_row_1bfqw_38", Vo = "_label_1bfqw_49", Yo = "_amount_1bfqw_54", Ne = {
  root: jo,
  figure: Wo,
  of: zo,
  bar: Go,
  rows: Ko,
  row: Uo,
  label: Vo,
  amount: Yo
};
function Jo({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${Ne.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${Ne.figure} ward-stat-value`, children: [
      J(e),
      " ",
      /* @__PURE__ */ l("span", { className: Ne.of, children: [
        "of ",
        J(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Ne.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${J(e)} of ${J(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: Ne.rows, children: t.map((o) => /* @__PURE__ */ l("li", { className: `${Ne.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ne.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: Ne.amount, children: J(o.amount) })
    ] }, o.label)) })
  ] });
}
const Xo = "_frame_mg2jl_2", Qo = "_table_mg2jl_6", Zo = "_th_mg2jl_12", ei = "_td_mg2jl_13", ai = "_sort_mg2jl_47", ni = "_row_mg2jl_53", ti = "_empty_mg2jl_61", ye = {
  frame: Xo,
  table: Qo,
  th: Zo,
  td: ei,
  sort: ai,
  row: ni,
  empty: ti
}, ri = { asc: "ascending", desc: "descending" };
function li(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ri[a.direction];
}
function oi(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: ye.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function ii(e) {
  return e === void 0 ? void 0 : { width: e };
}
function ci({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ye.th,
      style: ii(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": li(e, a),
      children: oi(e, t)
    }
  );
}
function si({ row: e, props: a }) {
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
function di({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ye.head, children: a.map((h) => /* @__PURE__ */ n(ci, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(si, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const ui = "_set_y5zy3_2", hi = "_legend_y5zy3_7", mi = "_row_y5zy3_15", wi = "_control_y5zy3_20", _i = "_input_y5zy3_26", vi = "_label_y5zy3_31", fi = "_consequence_y5zy3_36", Ce = {
  set: ui,
  legend: hi,
  row: mi,
  control: wi,
  input: _i,
  label: vi,
  consequence: fi
};
function pn({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
  const u = $(), d = i ?? u;
  return /* @__PURE__ */ l("fieldset", { className: Ce.set, "data-variant": s, children: [
    /* @__PURE__ */ n("legend", { className: Ce.legend, children: e }),
    a.map((h) => {
      const _ = `${d}-${h.value}`, b = h.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: Ce.row, children: [
        /* @__PURE__ */ l("span", { className: Ce.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: d,
              className: Ce.input,
              value: h.value,
              checked: t === h.value,
              disabled: o,
              "aria-describedby": Pa(b, c),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: _, className: Ce.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Ce.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const bi = "_root_1h1ot_2", pi = "_head_1h1ot_11", gi = "_index_1h1ot_25", Ni = "_dot_1h1ot_29", yi = "_note_1h1ot_34", ki = "_counter_1h1ot_40", $i = "_trailing_1h1ot_48", Re = {
  root: bi,
  head: pi,
  index: gi,
  dot: Ni,
  note: yi,
  counter: ki,
  trailing: $i
};
function Ci({ index: e }) {
  return e ? /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("span", { className: `${Re.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Re.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Si({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Re.counter, "aria-hidden": "true", children: e }) : null;
}
function Ri({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Re.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Re.head, children: [
      /* @__PURE__ */ n(Ci, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Re.note, children: t }),
    /* @__PURE__ */ n(Si, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Re.trailing, children: i })
  ] });
}
const Ti = "_strip_1qhvo_2", Li = "_cell_1qhvo_7", xi = "_value_1qhvo_12", Ai = "_label_1qhvo_27", Ze = {
  strip: Ti,
  cell: Li,
  value: xi,
  label: Ai
};
function Ei(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function fa({ cells: e, divided: a = !1 }) {
  return Ei(e), /* @__PURE__ */ n("dl", { className: `${Ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Ze.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ze.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Ze.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const qi = "_root_xk7sv_2", Ii = "_track_xk7sv_8", Mi = "_thumb_xk7sv_35", Bi = "_labelHidden_xk7sv_53", Pi = "_label_xk7sv_53", Di = "_lockedNote_xk7sv_68", Te = {
  root: qi,
  track: Ii,
  thumb: Mi,
  labelHidden: Bi,
  label: Pi,
  lockedNote: Di
};
function Oi(e) {
  return e ? `${Te.label} ${Te.labelHidden}` : Te.label;
}
function xe({ label: e, checked: a, onChange: t, disabled: r, locked: o, describedBy: i, labelHidden: c }) {
  const s = $(), u = o ? !0 : a, d = r || o;
  return /* @__PURE__ */ l("span", { className: `${Te.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": u,
        "aria-label": e,
        "aria-labelledby": s,
        "aria-describedby": i,
        className: `${Te.track} ward-switch`,
        "data-on": u,
        "data-locked": o ? !0 : void 0,
        disabled: d,
        onClick: () => !d && (t == null ? void 0 : t(!u)),
        children: /* @__PURE__ */ n("span", { className: Te.thumb })
      }
    ),
    /* @__PURE__ */ l("span", { id: s, className: Oi(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Te.lockedNote, children: "always on" })
    ] })
  ] });
}
const Hi = "_bar_1u2kl_2", Fi = "_skip_1u2kl_11", ji = "_mark_1u2kl_22", Wi = "_nav_1u2kl_30", zi = "_list_1u2kl_34", Gi = "_select_1u2kl_40", Ki = "_dest_1u2kl_47", Ui = "_actor_1u2kl_61", Vi = "_actorMark_1u2kl_74", Yi = "_actorLabel_1u2kl_79", Ji = "_tagline_1u2kl_98", oe = {
  bar: Hi,
  skip: Fi,
  mark: ji,
  nav: Wi,
  list: zi,
  select: Gi,
  dest: Ki,
  actor: Ui,
  actorMark: Vi,
  actorLabel: Yi,
  tagline: Ji
};
function Xi(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Qi(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function wk({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = Qi(r);
  return /* @__PURE__ */ l("header", { className: oe.bar, children: [
    /* @__PURE__ */ n("a", { className: oe.skip, href: `#${c}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: oe.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: oe.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: oe.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: oe.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: oe.dest,
          href: u.href,
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        "select",
        {
          className: oe.select,
          "aria-label": "Destination",
          value: t,
          onChange: (u) => i == null ? void 0 : i(u.target.value),
          children: a.map((u) => /* @__PURE__ */ n("option", { value: u.id, children: u.label }, u.id))
        }
      )
    ] }),
    s && /* @__PURE__ */ l("span", { className: oe.actor, children: [
      /* @__PURE__ */ n("span", { className: oe.actorLabel, children: s }),
      /* @__PURE__ */ n("span", { className: oe.actorMark, "aria-hidden": "true", children: Xi(s) })
    ] })
  ] });
}
const Zi = "_tree_1lyby_2", ec = "_item_1lyby_6", ac = "_row_1lyby_10", nc = "_button_1lyby_22", ia = {
  tree: Zi,
  item: ec,
  row: ac,
  button: nc
}, gn = ze(null);
function tc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ha({ orientation: "vertical" });
  return /* @__PURE__ */ n(gn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ia.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const rc = { ArrowRight: !0, ArrowLeft: !1 };
function Qa(e) {
  return e ? !0 : void 0;
}
function lc(e, a) {
  const t = rc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function oc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function ic(e) {
  const a = [ia.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function cc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function sc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function dc(e) {
  return typeof e == "string" ? e : void 0;
}
function uc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function hc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Nn(e) {
  const a = We(gn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = cc(e);
  return /* @__PURE__ */ l("li", { className: ia.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: ic(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": Qa(e.unresolved),
        "data-inherited": Qa(e.inherited),
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${ia.button} ward-treeitem-btn`,
            onClick: () => oc(e),
            onKeyDown: (r) => lc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: sc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: dc(e.label), children: e.label }),
              /* @__PURE__ */ n(uc, { value: e.detail }),
              /* @__PURE__ */ n(hc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const mc = "_frame_9lntd_2", wc = "_subjectRail_9lntd_21", _c = "_subject_9lntd_21", vc = "_rail_9lntd_41", fc = "_record_9lntd_63", bc = "_recordBody_9lntd_68", pc = "_band_9lntd_111", gc = "_bandBody_9lntd_120", Nc = "_bandActions_9lntd_125", yc = "_scroller_9lntd_132", kc = "_lanes_9lntd_150", se = {
  frame: mc,
  subjectRail: wc,
  subject: _c,
  rail: vc,
  record: fc,
  recordBody: bc,
  band: pc,
  bandBody: gc,
  bandActions: Nc,
  scroller: yc,
  lanes: kc
};
function _k({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: se.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function Za(e) {
  return e ? "true" : void 0;
}
function vk({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: se.subjectRail, "data-ward-subject-rail": t, "data-ruled": Za(i), children: [
    /* @__PURE__ */ n("div", { className: se.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: se.rail, "data-sticky": Za(o), "aria-label": r, children: a })
  ] });
}
function fk({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: se.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Ri, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: se.recordBody, "data-pad": o, children: a })
  ] });
}
const $c = "_form_1j8ub_2", Cc = "_fields_1j8ub_9", Sc = "_actions_1j8ub_19", ya = {
  form: $c,
  fields: Cc,
  actions: Sc
};
function bk({ label: e, children: a, actions: t, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: ya.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: ya.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: ya.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function pk({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: se.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: se.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: se.bandActions, children: a })
  ] });
}
const Rc = "(max-width: 767.98px)";
function La({ label: e, children: a }) {
  return /* @__PURE__ */ n("div", { className: se.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", children: a });
}
function Tc({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: se.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(x, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(La, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function gk({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = bn(Rc);
  return t === void 0 ? /* @__PURE__ */ n(La, { label: a, children: e }) : o ? /* @__PURE__ */ n(Tc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(La, { label: a, children: t.map((i) => /* @__PURE__ */ n(rt, { children: i.content }, i.id)) });
}
const Lc = "_block_1o5o7_2", xc = "_sentence_1o5o7_15", Ac = "_meta_1o5o7_20", Ec = "_action_1o5o7_25", qc = "_strip_1o5o7_29", Ic = "_loading_1o5o7_48", Mc = "_label_1o5o7_56", Bc = "_counter_1o5o7_63", ue = {
  block: Lc,
  sentence: xc,
  meta: Ac,
  action: Ec,
  strip: qc,
  loading: Ic,
  label: Mc,
  counter: Bc
};
function Pc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: ue.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function ba({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${ue.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: ue.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Pc, { action: a })
  ] });
}
function Dc(e) {
  return /* @__PURE__ */ n(ba, { ...e });
}
function Nk({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ba, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: ue.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function yk(e) {
  return /* @__PURE__ */ n(ba, { ...e });
}
function kk({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ba, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: ue.meta, children: [
    "failed at ",
    te(a)
  ] }) });
}
function $k({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: ue.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    te(e),
    " — showing snapshot from ",
    te(a)
  ] });
}
function Ck({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: ue.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    te(a)
  ] });
}
function Sk({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = g(!1);
  A(() => {
    const c = window.setTimeout(() => o(!0), de.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Ba(t.current, r);
  return /* @__PURE__ */ l("div", { className: `${ue.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: ue.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: ue.counter, children: Ma(i) }) : null
  ] });
}
const Oc = "_note_tlubt_2", Hc = {
  note: Oc
};
function Fc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: Hc.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const jc = "_card_12in3_2", Wc = "_hit_12in3_23", zc = "_head_12in3_30", Gc = "_title_12in3_36", Kc = "_meta_12in3_44", Uc = "_fields_12in3_45", Vc = "_who_12in3_58", Yc = "_sep_12in3_65", Jc = "_mono_12in3_69", Xc = "_field_12in3_45", Qc = "_last_12in3_84", Zc = "_reason_12in3_96", K = {
  card: jc,
  hit: Wc,
  head: zc,
  title: Gc,
  meta: Kc,
  fields: Uc,
  who: Vc,
  sep: Yc,
  mono: Jc,
  field: Xc,
  last: Qc,
  reason: Zc
}, es = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function as(e, a, t) {
  const r = ea(e, "blue"), o = ea(e, "orange"), i = ea(e, "green"), c = N(/* @__PURE__ */ new Set());
  A(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = es[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const ns = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : J(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function ts(e, a) {
  return ns[a](e);
}
function rs({ item: e, connection: a }) {
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
      ne(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function ls({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: K.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function os({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: K.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function is({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: K.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: K.field, children: ts(e, t) }, t)) });
}
const xa = (e) => e ? !0 : void 0;
function cs(e) {
  return { "--stream": Ae(e.streamStep, "id") };
}
function ss(e, a, t) {
  e == null || e(a, t);
}
function ds(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function us({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: K.last, "data-stale": xa(a), children: t }) : null;
}
function pa(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  as(r, t.key, e.feed);
  const o = ds(e.feed), i = cs(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: K.hit, onClick: (c) => ss(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(ls, { item: t }),
        /* @__PURE__ */ n("p", { className: K.title, children: t.title }),
        /* @__PURE__ */ n(rs, { item: t, connection: o }),
        /* @__PURE__ */ n(os, { reason: t.blockedReason }),
        /* @__PURE__ */ n(is, { item: t, fields: a }),
        /* @__PURE__ */ n(us, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const hs = "_column_14784_3", ms = "_head_14784_24", ws = "_label_14784_33", _s = "_count_14784_42", vs = "_list_14784_56", Ke = {
  column: hs,
  head: ms,
  label: ws,
  count: _s,
  list: vs
};
function yn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function fs({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: Ke.head, children: [
    /* @__PURE__ */ n("h2", { className: Ke.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: Ke.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function bs(e) {
  return /* @__PURE__ */ n("div", { className: Ke.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      pa,
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
function ps({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = $(), h = e.cap !== void 0 && a.length > e.cap, _ = yn(a, r);
  return /* @__PURE__ */ l("section", { className: Ke.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(fs, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(bs, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    h && /* @__PURE__ */ n(Fc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const gs = "_foot_8qg4p_2", Ns = "_note_8qg4p_13", ys = "_link_8qg4p_19", ka = {
  foot: gs,
  note: Ns,
  link: ys
};
function Rk({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: ka.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: ka.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: ka.link, href: e, children: "Configure board" })
  ] });
}
const ks = "_head_1la6p_3", $s = "_identity_1la6p_12", Cs = "_titleRow_1la6p_18", Ss = "_title_1la6p_18", Rs = "_key_1la6p_35", Ts = "_rollup_1la6p_45", Ls = "_tools_1la6p_53", xs = "_swatch_1la6p_62", As = "_mark_1la6p_69", _e = {
  head: ks,
  identity: $s,
  titleRow: Cs,
  title: Ss,
  key: Rs,
  rollup: Ts,
  tools: Ls,
  swatch: xs,
  mark: As
}, en = "initials:";
function Es(e) {
  return e === void 0 ? "loaded this week unavailable" : `${Q(e)} loaded this week`;
}
function qs(e) {
  const a = [`${Q(e.inFlight)} in flight`, Es(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${Q(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ne(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ne(e.p90)}`), a.join(" · ");
}
function Is(e) {
  return e.startsWith(en) ? e.slice(en.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Ms({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ae(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${_e.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Is(e) }) : /* @__PURE__ */ n("span", { className: _e.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Bs({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Tk({
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
  return /* @__PURE__ */ l("div", { className: _e.head, children: [
    /* @__PURE__ */ l("div", { className: _e.identity, children: [
      /* @__PURE__ */ l("div", { className: _e.titleRow, children: [
        /* @__PURE__ */ n(Ms, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: _e.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: _e.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: _e.rollup, "aria-live": "polite", children: qs(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: _e.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Bs, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Oa, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Ps = "_head_kabyh_11", Ds = "_line_kabyh_12", Os = "_cHandle_kabyh_33", Hs = "_cName_kabyh_38", Fs = "_nameLine_kabyh_46", js = "_cLabel_kabyh_53", Ws = "_cCap_kabyh_58", zs = "_cShown_kabyh_63", Gs = "_name_kabyh_46", Ks = "_noCap_kabyh_85", Us = "_state_kabyh_99", Vs = "_handle_kabyh_104", Ys = "_sub_kabyh_118", I = {
  head: Ps,
  line: Ds,
  cHandle: Os,
  cName: Hs,
  nameLine: Fs,
  cLabel: js,
  cCap: Ws,
  cShown: zs,
  name: Gs,
  noCap: Ks,
  state: Us,
  handle: Vs,
  sub: Ys
}, Js = "can't be hidden or collapsed", Xs = "terminal · counted, not a column";
function Lk() {
  return /* @__PURE__ */ l("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function Qs(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Zs(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function an(e) {
  return e.gate ? Js : e.terminal ? Xs : Zs(e.agentsMounted);
}
function ed(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function ad({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: I.cName, children: [
    /* @__PURE__ */ l("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    an(e) && /* @__PURE__ */ n("span", { className: I.sub, children: an(e) })
  ] });
}
function nd(e) {
  return e === void 0 ? "" : String(e);
}
function td(e) {
  return e === "" ? void 0 : Number(e);
}
function rd({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => ed(t, a),
      children: "⠿"
    }
  ) });
}
function ld({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(x, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: nd(a.cap), onChange: (r) => t({ ...a, cap: td(r) }) }) });
}
function od({ stage: e, config: a, onChange: t }) {
  const r = Qs(e, a.shown);
  return /* @__PURE__ */ l("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(xe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function id(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function xk({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: I.line, "data-kind": id(e), children: [
    /* @__PURE__ */ n(rd, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(ad, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(x, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(ld, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(od, { stage: e, config: a, onChange: t })
  ] });
}
const cd = "_body_hn6d6_2", sd = "_head_hn6d6_9", dd = "_summary_hn6d6_19", ud = "_block_hn6d6_20", hd = "_actionsBlock_hn6d6_21", md = "_title_hn6d6_41", wd = "_note_hn6d6_46", _d = "_k_hn6d6_51", vd = "_kv_hn6d6_58", fd = "_row_hn6d6_64", bd = "_label_hn6d6_75", pd = "_value_hn6d6_84", gd = "_quote_hn6d6_90", Nd = "_actions_hn6d6_21", yd = "_resolve_hn6d6_103", M = {
  body: cd,
  head: sd,
  summary: dd,
  block: ud,
  actionsBlock: hd,
  title: md,
  note: wd,
  k: _d,
  kv: vd,
  row: fd,
  label: bd,
  value: pd,
  quote: gd,
  actions: Nd,
  resolve: yd
};
function kd(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function $d(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Cd(e) {
  const a = _a(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Sd(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...va(Cd(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ne(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...kd(e),
    ...$d(e, a)
  ];
}
function Rd({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function Td({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: M.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Ld({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: M.block, children: [
    /* @__PURE__ */ n("p", { className: M.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: M.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: M.note, children: e.agentMeta })
  ] }) : null;
}
function Ak({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = $(), d = Sd(e, o);
  return /* @__PURE__ */ n(Je, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: M.body, children: [
    /* @__PURE__ */ n(Td, { item: e }),
    /* @__PURE__ */ l("div", { className: M.summary, children: [
      /* @__PURE__ */ n("h2", { className: M.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: M.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: M.kv, children: d.map(([h, _]) => /* @__PURE__ */ l("div", { className: M.row, children: [
      /* @__PURE__ */ n("dt", { className: M.label, children: h }),
      /* @__PURE__ */ n("dd", { className: M.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(Ld, { item: e }),
    /* @__PURE__ */ l("div", { className: M.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: M.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: M.note, children: s })
    ] }),
    /* @__PURE__ */ n(Rd, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const xd = "_root_3azmy_2", Ad = "_list_3azmy_7", Ed = "_item_3azmy_12", qd = "_box_3azmy_18", Id = "_text_3azmy_23", Md = "_note_3azmy_28", Pe = {
  root: xd,
  list: Ad,
  item: Ed,
  box: qd,
  text: Id,
  note: Md
};
function ga({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ l("div", { className: Pe.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Pe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Pe.box, children: /* @__PURE__ */ n(Da, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Pe.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Pe.note} ward-checklist-note`, children: a })
  ] });
}
const Bd = "_rail_ke7ch_2", Pd = "_k_ke7ch_11", Dd = "_head_ke7ch_19", Od = "_section_ke7ch_25", Hd = "_card_ke7ch_38", Fd = "_strip_ke7ch_42", jd = "_skeleton_ke7ch_56", Wd = "_skeletonLabel_ke7ch_70", zd = "_bar_ke7ch_76", Gd = "_note_ke7ch_85", ce = {
  rail: Bd,
  k: Pd,
  head: Dd,
  section: Od,
  card: Hd,
  strip: Fd,
  skeleton: jd,
  skeletonLabel: Wd,
  bar: zd,
  note: Gd
};
function Kd(e) {
  return (a) => e == null ? void 0 : e(a);
}
function $a({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: ce.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: ce.k, children: e }),
    a
  ] });
}
function Ud({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: ce.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: ce.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: ce.bar, "aria-hidden": "true" }, r))
  ] });
}
function Vd({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(ps, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function Yd(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Vd, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Ud, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function Ek(e) {
  const a = Kd(e.onOpen), t = yn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: ce.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${ce.k} ${ce.head}`, children: "Live preview" }),
    /* @__PURE__ */ n($a, { title: "Card", children: /* @__PURE__ */ n("div", { className: ce.card, children: t && /* @__PURE__ */ n(pa, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l($a, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: ce.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Yd, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: ce.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n($a, { title: "Effect of this config", children: /* @__PURE__ */ n(ga, { items: e.effects, density: "compact" }) })
  ] });
}
function Jd(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Xd(e) {
  return Math.ceil(e.length / 2);
}
function Qd(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function kn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Zd(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = kn(e);
  o !== void 0 && t(o), r(Qd(e.type));
}
function eu(e, a, t, r, o) {
  A(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Zd(i, t, r, o));
  }, [e, a, t, r, o]);
}
function au(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function nu(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function tu(e, a) {
  return a !== void 0 ? ne(e.timeInStage) + " · waits on " + a.agent : ne(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function ru(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(Xd(a ?? [])) + ")"
  };
}
function lu(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function ou(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: J(e.cost) }) : null;
}
function iu(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function cu(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function su(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function du(e, a) {
  return a === void 0 ? e : Jd(e, a.ref);
}
function uu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ve(e) {
  return e === !0 ? "true" : void 0;
}
function $n(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = ea(o), c = N(/* @__PURE__ */ new Set()), [s, u] = g(au(a));
  eu(e.feed, a.key, c, u, i);
  const d = nu(a, r), h = tu(a, t), _ = ru(a, e.fields), b = su(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...uu(e),
      className: "ward-workcard",
      "data-flagged": Ve(a.flagged),
      "data-selected": Ve(e.selected),
      style: _,
      ref: du(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        lu(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          ou(a, e.fields),
          iu(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          cu(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function hu({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function mu(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function wu(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function _u(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(hu, { count: e.items.length, cap: e.column.cap });
}
function vu(e, a) {
  return e.roving ?? a;
}
function fu(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function bu(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    $n,
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
function pu(e) {
  const a = $(), t = ha({ orientation: "vertical" }), r = vu(e, t), o = mu(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ve(o), "data-gate": Ve(e.column.gate), children: [
    wu(e.column, e.items.length, a),
    _u(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...fu(e, t), children: bu(e, r) })
  ] });
}
function gu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ne(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ne(e.p90)), a;
}
function Nu(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function yu(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function qk(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: gu(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      Nu(e),
      yu(e.onConfigure),
      /* @__PURE__ */ n(Oa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function ku(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function $u(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(xe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(xe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Cu(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(L, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function Ik(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": Ve(ku(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: $u(e) }),
    /* @__PURE__ */ n(x, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(_n, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Cu(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function Mk(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n($n, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(pu, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Su(e, a) {
  const t = kn(e);
  t !== void 0 && a(t);
}
function Ru(e, a, t) {
  A(() => {
    if (e != null)
      return e.subscribe(a, (r) => Su(r, t));
  }, [e, a, t]);
}
function Tu(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Lu(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ne(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", J(e.cost)]), a;
}
function xu(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Au(e, a) {
  return /* @__PURE__ */ l(L, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function Bk(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = g((c = a.run) == null ? void 0 : c.lastStep);
  Ru(e.feed, a.key, o);
  const i = [...Tu(a), ...Lu(a)];
  return /* @__PURE__ */ l(Je, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      xu(t, r)
    ] }),
    Au(a, e.actions)
  ] });
}
const Eu = "_card_hvxp7_2", qu = "_head_hvxp7_17", Iu = "_mark_hvxp7_25", Mu = "_name_hvxp7_37", Bu = "_chips_hvxp7_48", Pu = "_description_hvxp7_54", Du = "_run_hvxp7_59", Ou = "_sep_hvxp7_68", Hu = "_facts_hvxp7_73", Fu = "_fact_hvxp7_73", ju = "_factLabel_hvxp7_86", Wu = "_factValue_hvxp7_90", X = {
  card: Eu,
  head: qu,
  mark: Iu,
  name: Mu,
  chips: Bu,
  description: Pu,
  run: Du,
  sep: Ou,
  facts: Hu,
  fact: Fu,
  factLabel: ju,
  factValue: Wu
}, zu = { live: "done", draft: "running", paused: "meta" };
function Gu(e) {
  return e === void 0 ? X.card : `${X.card} ${e}`;
}
function Ku({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: X.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: zu[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function Uu({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: X.description, children: e });
}
function Vu({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: X.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: X.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Yu({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: X.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: X.fact, children: [
    /* @__PURE__ */ n("dt", { className: X.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: X.factValue, children: a.value })
  ] }, a.label)) });
}
function Ju(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Xu({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, facts: i, className: c }) {
  const s = { "--stream": Ae(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": u,
      className: Gu(c),
      style: s,
      "data-selected": u,
      "data-paused": Ju(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: X.head, children: [
          /* @__PURE__ */ n("span", { className: X.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${X.name} ward-rowlink`, href: a, "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(Uu, { description: e.description }),
        /* @__PURE__ */ n(Vu, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Ku, { versions: e.versions }),
        /* @__PURE__ */ n(Yu, { facts: i })
      ]
    }
  );
}
const Qu = "_list_4dcyc_2", Zu = "_row_4dcyc_11", eh = "_head_4dcyc_23", ah = "_id_4dcyc_30", nh = "_lock_4dcyc_35", th = "_reason_4dcyc_41", rh = "_remove_4dcyc_46", lh = "_clauses_4dcyc_50", oh = "_clause_4dcyc_50", ih = "_label_4dcyc_64", ch = "_cell_4dcyc_71", sh = "_value_4dcyc_76", ae = {
  list: Qu,
  row: Zu,
  head: eh,
  id: ah,
  lock: nh,
  reason: th,
  remove: rh,
  clauses: lh,
  clause: oh,
  label: ih,
  cell: ch,
  value: sh
}, Cn = ze(!1);
function Pk({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Cn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ae.list, "aria-label": a, children: e }) });
}
function dh({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ae.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(x, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => t(e.key, o) });
}
function uh({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ae.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ae.reason, children: e })
  ] });
}
function hh({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: ae.head, children: [
    /* @__PURE__ */ n("span", { className: ae.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(uh, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ae.remove, children: /* @__PURE__ */ l(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function nn(e, a) {
  return e.locked ? void 0 : a;
}
function Dk({ rule: e, onChange: a, onRemove: t }) {
  if (!We(Cn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = nn(e, a);
  return /* @__PURE__ */ l("li", { className: ae.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(hh, { rule: e, onRemove: nn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ae.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ae.clause, children: [
      /* @__PURE__ */ n("dt", { className: ae.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ae.cell, children: /* @__PURE__ */ n(dh, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const mh = "_ladder_wwnch_2", wh = "_cell_wwnch_7", _h = "_empty_wwnch_26", vh = "_name_wwnch_34", fh = "_holder_wwnch_40", bh = "_request_wwnch_46", ph = "_swatches_wwnch_51", gh = "_swatch_wwnch_51", Nh = "_tilesFrame_wwnch_78", yh = "_tiles_wwnch_78", kh = "_tile_wwnch_78", $h = "_bar_wwnch_117", Ch = "_hex_wwnch_128", Sh = "_note_wwnch_138", R = {
  ladder: mh,
  cell: wh,
  empty: _h,
  name: vh,
  holder: fh,
  request: bh,
  swatches: ph,
  swatch: gh,
  tilesFrame: Nh,
  tiles: yh,
  tile: kh,
  bar: $h,
  hex: Ch,
  note: Sh
}, Rh = "not validated — needs CVD matrix and dark stepping";
function Th(e) {
  return e.reserved ? "reserved" : wa(e.step) ? "validated" : "partial";
}
function Sn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Lh(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function xh({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ee, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Ah(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Eh(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const tn = (e) => String(e).padStart(2, "0");
function qh(e, a, t) {
  return e === "reserved" ? "Reserved — needs revalidation" : t ? "yours" : a ?? Sn(e, void 0);
}
function Ih({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: r ? `step ${tn(e)}` : gt(e) }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: r ? t : `Step ${tn(e)} · ${t}` })
  ] });
}
function Mh({ step: e, value: a, taken: t, onChange: r, presentation: o }) {
  const i = Th(e), c = Sn(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, _ = `${d} — ${o === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...Eh(s, u), "data-validation": i, style: Lh(e, i), onClick: h, onKeyDown: (E) => Ah(E, h) }, label: _, name: d, holder: c, validation: i, note: qh(i, t, u), step: e.step };
}
const Bh = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${R.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${R.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Ih, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${R.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(xh, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Ph(e) {
  return Bh[e.presentation](Mh(e));
}
function Dh(e) {
  for (const a of e)
    if (!a.reserved && !ma(a.step)) throw new Error("colour ladder renders token steps only");
}
function Oh() {
  return /* @__PURE__ */ l("div", { className: `${R.cell} ward-ladder-cell ${R.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Hh(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Fh = { list: R.ladder, swatches: R.swatches, tiles: R.tilesFrame };
function jh() {
  return /* @__PURE__ */ l("div", { className: `${R.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Wh = { list: Oh, swatches: () => null, tiles: jh };
function Rn(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  Dh(e.steps);
  const r = Hh(e), o = Wh[r], i = /* @__PURE__ */ l(L, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(Ph, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${Fh[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: R.tiles, children: i }) : i });
}
const zh = "_rail_1el2t_2", Gh = "_section_1el2t_12", Kh = "_sectionFlush_1el2t_22", Uh = "_head_1el2t_26", Vh = "_headLabel_1el2t_34", Yh = "_sample_1el2t_42", Jh = "_sampleLabel_1el2t_47", Xh = "_sampleTitle_1el2t_54", Qh = "_sampleMeta_1el2t_59", Zh = "_trace_1el2t_65", em = "_traceHead_1el2t_70", am = "_steps_1el2t_78", nm = "_step_1el2t_78", tm = "_stepTitle_1el2t_97", rm = "_hollow_1el2t_107", lm = "_stepBody_1el2t_115", om = "_stepDetail_1el2t_127", im = "_publish_1el2t_132", cm = "_reason_1el2t_138", sm = "_note_1el2t_143", dm = "_reveal_1el2t_148", p = {
  rail: zh,
  section: Gh,
  sectionFlush: Kh,
  head: Uh,
  headLabel: Vh,
  sample: Yh,
  sampleLabel: Jh,
  sampleTitle: Xh,
  sampleMeta: Qh,
  trace: Zh,
  traceHead: em,
  steps: am,
  step: nm,
  stepTitle: tm,
  hollow: rm,
  stepBody: lm,
  stepDetail: om,
  publish: im,
  reason: cm,
  note: sm,
  reveal: dm
}, rn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, um = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, hm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, mm = { notSimulated: "not simulated", running: "running" };
function wm(e) {
  return e.presentation === "foundry";
}
function _m(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function vm(e, a) {
  var r;
  const t = um[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function fm(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function bm(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function pm(e) {
  if (fm(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function gm(e) {
  const [a, t] = g(!1);
  A(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Nm(e) {
  const a = mm[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ee, { size: 6, kind: hm[e.kind], label: e.kind });
}
function ym(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function km(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function $m(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(gm, { kind: a.kind, children: [
    /* @__PURE__ */ n(Nm, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(ym, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(km, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Cm(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ne(a)), t.join(" · ");
}
function Tn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: Cm(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n($m, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Sm(e) {
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
function Rm(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + te(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Tm(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : J(e.run.cost), label: "Cost" }, { value: e.run.turns ? hn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(fa, { divided: !0, cells: a }) });
}
function Lm(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: J(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: hn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function xm(e) {
  const a = Lm(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(fa, { divided: !0, cells: a }) });
}
function Ln(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Am(e) {
  return /* @__PURE__ */ l("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(Ln, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function Em(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(Ln, { reason: e.reason, onPublish: e.onPublish }) });
}
function xn(e) {
  return /* @__PURE__ */ l("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: rn[e.run.status].role, label: rn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function qm(e, a) {
  const [t, r] = g(e.steps);
  return A(() => r(e.steps), [e.steps]), A(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((i) => {
          var c, s;
          return [...i, { kind: o.type === "run.finding" ? "finding" : "action", title: ((c = o.step) == null ? void 0 : c.label) ?? "step", detail: (s = o.step) == null ? void 0 : s.tool }];
        });
      });
  }, [a, e.status]), t;
}
function Im(e) {
  var t;
  bm(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(xn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Sm, { sample: e.run.sample }),
    /* @__PURE__ */ n(Tn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Tm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(ga, { items: e.checklist }) }),
    /* @__PURE__ */ n(Am, { reason: _m(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Mm(e) {
  var r;
  const a = qm(e.run, e.feed);
  pm(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(xn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Rm, { sample: e.run.sample }),
    /* @__PURE__ */ n(Tn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(xm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(ga, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Em, { reason: vm(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Ok(e) {
  return wm(e) ? /* @__PURE__ */ n(Mm, { ...e }) : /* @__PURE__ */ n(Im, { ...e });
}
const Bm = "_list_142ip_3", Pm = "_row_142ip_9", Dm = "_condition_142ip_18", Om = "_action_142ip_24", aa = {
  list: Bm,
  row: Pm,
  condition: Dm,
  action: Om
}, An = ze(!1);
function Hk({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(An.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: aa.list, "aria-label": a, children: e }) });
}
function Fk({ rule: e }) {
  if (!We(An)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: aa.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: aa.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: aa.action, children: e.then })
  ] });
}
function Aa(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [o] = r.splice(a, 1);
  return r.splice(t, 0, o), r;
}
function En(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function qn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function ln(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Hm(e) {
  return e === "up" ? "down" : "up";
}
function Fm(e, a) {
  const t = ln(e, a.id, a.direction) ?? ln(e, a.id, Hm(a.direction));
  t == null || t.focus();
}
function In() {
  const e = N(null), [a, t] = g(null), [r, o] = g("");
  return A(() => {
    e.current !== null && a !== null && Fm(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), o(s);
  } };
}
function Mn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ca({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const jm = "_body_1h15q_2", Wm = "_title_1h15q_8", zm = "_section_1h15q_13", Gm = "_legend_1h15q_18", Km = "_stages_1h15q_26", Um = "_stage_1h15q_26", Vm = "_stageIndex_1h15q_44", Ym = "_stageName_1h15q_50", Jm = "_footer_1h15q_59", Xm = "_note_1h15q_66", Qm = "_reason_1h15q_71", Zm = "_actions_1h15q_76", ew = "_webHead_1h15q_83", aw = "_kicker_1h15q_92", nw = "_webTitle_1h15q_99", tw = "_webBody_1h15q_105", rw = "_webSection_1h15q_109", lw = "_sectionHead_1h15q_121", ow = "_sectionNote_1h15q_129", iw = "_formLabel_1h15q_134", cw = "_identityRow_1h15q_139", sw = "_nameCell_1h15q_145", dw = "_keyCell_1h15q_150", uw = "_colourCell_1h15q_154", hw = "_colourStatus_1h15q_161", mw = "_webStages_1h15q_166", ww = "_webStageList_1h15q_172", _w = "_webStage_1h15q_166", vw = "_webIndex_1h15q_191", fw = "_webStageName_1h15q_196", bw = "_webMoves_1h15q_201", pw = "_addStage_1h15q_215", gw = "_addStageButton_1h15q_223", Nw = "_addStageNote_1h15q_231", yw = "_webFooter_1h15q_236", kw = "_webFooterNotes_1h15q_244", $w = "_webNote_1h15q_251", w = {
  body: jm,
  title: Wm,
  section: zm,
  legend: Gm,
  stages: Km,
  stage: Um,
  stageIndex: Vm,
  stageName: Ym,
  footer: Jm,
  note: Xm,
  reason: Qm,
  actions: Zm,
  webHead: ew,
  kicker: aw,
  webTitle: nw,
  webBody: tw,
  webSection: rw,
  sectionHead: lw,
  sectionNote: ow,
  formLabel: iw,
  identityRow: cw,
  nameCell: sw,
  keyCell: dw,
  colourCell: uw,
  colourStatus: hw,
  webStages: mw,
  webStageList: ww,
  webStage: _w,
  webIndex: vw,
  webStageName: fw,
  webMoves: bw,
  addStage: pw,
  addStageButton: gw,
  addStageNote: Nw,
  webFooter: yw,
  webFooterNotes: kw,
  webNote: $w
}, Cw = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Bn = "not in catalogue";
function Sw(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} — ${Bn}` }, ...t];
}
function Rw({ stage: e, index: a, catalogue: t, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(x, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Bn}`;
  return /* @__PURE__ */ n(x, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: Sw(t, e.name), invalid: i, onChange: r });
}
function Pn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Tw(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Lw({ id: e, stage: a, index: t, total: r, catalogue: o, onReplace: i, onMove: c }) {
  const s = Pn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(Rw, { stage: a, index: t, catalogue: o, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(x, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Cw, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ca, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ca, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function xw({ stages: e, onChange: a, catalogue: t }) {
  const r = Tw(e.length), o = In(), i = (s, u) => {
    const d = En(s, u);
    r.current = Aa(r.current, s, d), o.moved({ id: r.current[d], direction: u }, qn(Pn(e[s], s), d, e.length)), a(Aa(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(Lw, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Mn, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Aw = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Ew = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], qw = "A new stream starts as a draft. Nothing runs on it until you publish it.", Iw = "Create is disabled: name the stream and give it a key first.", Mw = "reorder with the ↑ ↓ buttons · min 2";
function Ha(e, a) {
  return !e.reserved && wa(e.step) && a[e.step] === void 0;
}
function Bw(e, a) {
  const t = e.find((r) => Ha(r, a));
  return t ? t.step : 1;
}
function Pw({ stages: e, onMove: a }) {
  const t = In(), r = (o, i) => {
    const c = En(o, i);
    t.moved({ id: e[o].id, direction: i }, qn(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: w.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ca, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ca, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Mn, { text: t.announcement })
  ] });
}
function Dw({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: qw }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Ow(e, a) {
  return e !== "" && a !== "" ? null : Iw;
}
function Hw(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = Ew, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = $(), [h, _] = g(""), [b, E] = g(""), [Z, ee] = g(a[0].value), [re, qe] = g(() => Bw(t, r)), [le, Ie] = g(e.stages ?? Aw), [Me, k] = g(o[0].value), F = { name: h, key: b, streamStep: re, owner: Z, stages: le, policy: Me }, he = Ow(h, b);
  return /* @__PURE__ */ n(Je, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ l("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(x, { kind: "input", label: "Stream name", value: h, onChange: _ }),
      /* @__PURE__ */ n(x, { kind: "input", label: "Key", value: b, onChange: E, mono: !0 }),
      /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: Z, onChange: ee, options: a })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Rn, { label: "Stream colour", steps: t, value: re, onChange: qe, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(Pw, { stages: le, onMove: ($e, at) => Ie(Aa(le, $e, at)) })
    ] }),
    /* @__PURE__ */ n(pn, { legend: "Loop policy", options: o, value: Me, onChange: k }),
    /* @__PURE__ */ n(Dw, { reason: he, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const Dn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Fw = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function jw(e, a, t, r, o, i) {
  var s;
  const c = ((s = Dn.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function Ww(e, a) {
  return zw(e) && Gw(e, a) && Kw(e);
}
function zw(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Gw(e, a) {
  return e.colourStep !== null && Ha({ step: e.colourStep }, a);
}
function Kw(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Uw(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${Rh}.` : Ha({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Vw({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Yw({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Vw, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: Fw })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Jw({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function Xw({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
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
function Qw(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [o, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, E] = g("relay"), [Z, ee] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), re = jw(o, c, u, h, b, Z), qe = Ww(re, r), le = Z.find((k) => k.kind === "agent" && k.name.trim() !== ""), Ie = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Rn, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), Me = /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: Uw(h, r) }),
    /* @__PURE__ */ n(x, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map((k) => ({ value: k, label: k })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Je, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Jw, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(Xw, { name: o, setName: i, streamKey: c, setKey: s, colour: Ie, owner: Me }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: Mw })
        ] }),
        /* @__PURE__ */ n(xw, { stages: Z, onChange: ee })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(pn, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: Dn, onChange: E }) }),
      /* @__PURE__ */ n(Yw, { ready: qe, draft: re, agentStage: le, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function jk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Qw, { ...e }) : /* @__PURE__ */ n(Hw, { ...e });
}
const Zw = "_row_bs8hc_2", e_ = "_cell_bs8hc_6", a_ = "_condition_bs8hc_11", n_ = "_action_bs8hc_18", t_ = "_contract_bs8hc_24", r_ = "_contractCondition_bs8hc_33", l_ = "_contractAction_bs8hc_39", U = {
  row: Zw,
  cell: e_,
  condition: a_,
  action: n_,
  contract: t_,
  contractCondition: r_,
  contractAction: l_
}, On = ["advance", "block", "escalate", "requestReview"], on = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function sa(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Fa(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: U.action, children: on[e.then] }) : /* @__PURE__ */ n(
    x,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => a({ ...e, then: o }),
      options: On.map((o) => ({ value: o, label: on[o] }))
    }
  );
}
function o_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: U.row, children: [
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: U.condition, title: sa(e, r), children: sa(e, r) }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: Fa(e, a, t) })
  ] });
}
function i_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: U.row, children: [
    /* @__PURE__ */ l("td", { className: U.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: U.condition, children: sa(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: U.cell, children: Fa(e, a, t) })
  ] });
}
function c_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: U.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: U.contractCondition, children: sa(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: U.contractAction, children: Fa(e, a, t, !0) })
  ] });
}
const s_ = { two: i_, four: o_, contract: c_ };
function Wk(e) {
  var t;
  if (!On.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = s_[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const d_ = "_column_lurgk_2", u_ = "_head_lurgk_17", h_ = "_index_lurgk_23", m_ = "_name_lurgk_29", w_ = "_meta_lurgk_38", __ = "_mono_lurgk_43", v_ = "_gate_lurgk_50", f_ = "_reviewersLabel_lurgk_57", b_ = "_reviewers_lurgk_57", p_ = "_reviewer_lurgk_57", g_ = "_agents_lurgk_74", N_ = "_workflowColumn_lurgk_79", y_ = "_workflowHead_lurgk_96", k_ = "_stageRow_lurgk_102", $_ = "_stageLabel_lurgk_109", C_ = "_workflowTitle_lurgk_116", S_ = "_workflowMeta_lurgk_122", R_ = "_workflowGate_lurgk_127", T_ = "_gateNote_lurgk_135", L_ = "_cardNote_lurgk_140", x_ = "_reviewerList_lurgk_149", A_ = "_reviewerRow_lurgk_155", E_ = "_reviewerMark_lurgk_161", q_ = "_reviewerName_lurgk_171", I_ = "_terminalCard_lurgk_177", M_ = "_terminalCount_lurgk_186", B_ = "_workflowAgents_lurgk_192", P_ = "_mount_lurgk_198", y = {
  column: d_,
  head: u_,
  index: h_,
  name: m_,
  meta: w_,
  mono: __,
  gate: v_,
  reviewersLabel: f_,
  reviewers: b_,
  reviewer: p_,
  agents: g_,
  workflowColumn: N_,
  workflowHead: y_,
  stageRow: k_,
  stageLabel: $_,
  workflowTitle: C_,
  workflowMeta: S_,
  workflowGate: R_,
  gateNote: T_,
  cardNote: L_,
  reviewerList: x_,
  reviewerRow: A_,
  reviewerMark: E_,
  reviewerName: q_,
  terminalCard: I_,
  terminalCount: M_,
  workflowAgents: B_,
  mount: P_
}, D_ = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Hn(e) {
  return `${Math.round(e * 100)}%`;
}
function O_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(fa, { cells: [
      { value: Hn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: Q(e.count), label: "In stage" }
    ] })
  ] });
}
function H_({ stage: e }) {
  return /* @__PURE__ */ n(fa, { cells: [
    { value: Q(e.count), label: "In stage" },
    { value: Q(e.closedThisWeek ?? 0), label: "Closed this week" }
  ] });
}
function F_({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: D_[e.kind] })
  ] });
}
function j_({ stage: e }) {
  return /* @__PURE__ */ l("p", { className: y.meta, children: [
    /* @__PURE__ */ l("span", { className: y.mono, children: [
      Q(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ l("span", { className: y.mono, children: [
      ne(e.medianWait),
      " median wait"
    ] })
  ] });
}
function W_({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(O_, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(H_, { stage: e }) : null;
}
function z_({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function G_({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(F_, { stage: e, titleId: o }),
    /* @__PURE__ */ n(j_, { stage: e }),
    /* @__PURE__ */ n(W_, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(Xu, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(z_, { onMount: t })
  ] });
}
const K_ = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function U_({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, a.initials)) });
}
function V_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(U_, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Hn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Y_({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: e.closedThisWeek ?? 0 }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: "items closed this week" })
  ] });
}
function J_(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function X_(e) {
  if (e.kind === "terminal") return `${e.closedThisWeek ?? 0} this week`;
  const a = J_(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Q_({ stage: e, titleId: a }) {
  const t = K_[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: X_(e) })
  ] });
}
function Z_(e) {
  return e === "entry" || e === "agent";
}
function ev({ stage: e, onMount: a }) {
  return a === void 0 || !Z_(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function av({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Q_, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(V_, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Y_, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(ev, { stage: e, onMount: t })
  ] });
}
function nv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function zk(e) {
  return nv(e) ? /* @__PURE__ */ n(av, { ...e }) : /* @__PURE__ */ n(G_, { ...e });
}
const tv = "_row_ve78g_6", rv = "_cell_ve78g_10", lv = "_name_ve78g_19", ov = "_chain_ve78g_26", iv = "_owner_ve78g_32", cv = "_mono_ve78g_38", sv = "_compactRow_ve78g_45", dv = "_compactCell_ve78g_54", uv = "_stack_ve78g_71", hv = "_stat_ve78g_78", mv = "_identityLine_ve78g_85", wv = "_identity_ve78g_85", _v = "_compactName_ve78g_103", vv = "_ownerLine_ve78g_117", fv = "_link_ve78g_130", bv = "_emptyChain_ve78g_136", pv = "_arrow_ve78g_142", gv = "_muted_ve78g_143", Nv = "_define_ve78g_148", yv = "_statValue_ve78g_155", kv = "_policyId_ve78g_161", $v = "_sub_ve78g_166", f = {
  row: tv,
  cell: rv,
  name: lv,
  chain: ov,
  owner: iv,
  mono: cv,
  compactRow: sv,
  compactCell: dv,
  stack: uv,
  stat: hv,
  identityLine: mv,
  identity: wv,
  compactName: _v,
  ownerLine: vv,
  link: fv,
  emptyChain: bv,
  arrow: pv,
  muted: gv,
  define: Nv,
  statValue: yv,
  policyId: kv,
  sub: $v
};
function Cv(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Sv(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function Rv(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${e.members} members`;
}
function Tv(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Rv(e) })
  ] }) });
}
function Lv(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function xv(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : Lv(e) });
}
function cn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function Av(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function Ev(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function qv({ stream: e, href: a, presentation: t }) {
  const r = Sv(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ae(e.streamStep, "chip") }, children: [
    Tv(e, a),
    xv(e.stages, a),
    cn(Ev(e.agents), e.agents === void 0 ? void 0 : Cv(e.agents), "—"),
    Av(e.policy),
    cn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function Iv(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function Gk(e) {
  if (Iv(e)) return qv(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ l("tr", { className: f.row, children: [
    /* @__PURE__ */ l("td", { className: f.cell, children: [
      /* @__PURE__ */ n("a", { className: f.name, href: t, children: a.name }),
      /* @__PURE__ */ n(m, { ...va(a.key, a.streamStep) }),
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
        Q(a.members),
        " members"
      ] })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: Q(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : ne(a.p50) }) })
  ] });
}
const Mv = "_row_1nbe9_2", Bv = "_name_1nbe9_15", Pv = "_scope_1nbe9_25", da = {
  row: Mv,
  name: Bv,
  scope: Pv
};
function Dv(e) {
  return e === void 0 ? `${da.row} ward-toolrow` : `${da.row} ward-toolrow ${e}`;
}
function Ov(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Hv({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
function Fv({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function jv({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${da.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Wv(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Kk({ tool: e, onChange: a, presentation: t }) {
  const r = $(), o = $(), i = Ov(e, t), c = Wv(t);
  return /* @__PURE__ */ l(c, { className: Dv(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Hv, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${da.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(jv, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(Fv, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const zv = "_strip_g84q9_2", Gv = "_head_g84q9_10", Kv = "_name_g84q9_16", Uv = "_chart_g84q9_24", Vv = "_segment_g84q9_30", Yv = "_detailedChart_g84q9_36", pe = {
  strip: zv,
  head: Gv,
  name: Kv,
  chart: Uv,
  segment: Vv,
  detailedChart: Yv
}, Ea = [1, 2, 3, 4, 5, 6], ua = 100;
function Jv(e, a) {
  return a.has(e) ? Ae(e, "id") : "var(--ward-color-line)";
}
function Xv({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: pe.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ea.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: pe.segment,
      x: o * ua,
      y: "0",
      width: ua,
      height: "8",
      fill: Jv(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Qv(e) {
  const a = e.slice(0, Ea.length);
  for (; a.length < Ea.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Zv({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${pe.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ua),
        y: "0",
        width: String(ua),
        height: "40",
        style: { fill: Ae(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function Fn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ef(e) {
  const a = Qv(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("section", { className: `${pe.strip} ward-appearance`, "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(pa, { item: { ...e.sample, streamStep: _a(t.streamStep) }, onOpen: Fn(e.onOpen), feed: null }),
    /* @__PURE__ */ l("p", { className: `${pe.head} ward-envrow ward-appearance-head`, children: [
      /* @__PURE__ */ n("span", { className: "ward-identity", "aria-hidden": "true" }),
      /* @__PURE__ */ n(m, { ...va(t.key, t.streamStep) }),
      /* @__PURE__ */ n("span", { className: `${pe.name} ward-rowlink`, children: t.name })
    ] }),
    /* @__PURE__ */ n("p", { className: "ward-checklist-note", children: "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on." }),
    /* @__PURE__ */ n(Zv, { identities: a })
  ] });
}
function af({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": Ae(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: pe.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: pe.head, children: [
      /* @__PURE__ */ n(Ee, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: pe.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...va(e.key, e.streamStep) })
    ] }),
    /* @__PURE__ */ n(pa, { item: { ...a, streamStep: e.streamStep }, onOpen: Fn(r) }),
    /* @__PURE__ */ n(Xv, { draft: e, streams: t })
  ] });
}
function Uk(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(ef, { ...e }) : /* @__PURE__ */ n(af, { ...e });
}
const nf = "_row_ixlg5_6", tf = "_headCell_ixlg5_10", rf = "_cell_ixlg5_11", lf = "_name_ixlg5_23", of = "_consequence_ixlg5_29", cf = "_governed_ixlg5_36", sf = "_control_ixlg5_42", df = "_byRole_ixlg5_48", uf = "_webControl_ixlg5_59", hf = "_webConsequence_ixlg5_65", mf = "_webGoverned_ixlg5_71", P = {
  row: nf,
  headCell: tf,
  cell: rf,
  name: lf,
  consequence: of,
  governed: cf,
  control: sf,
  byRole: df,
  webControl: uf,
  webConsequence: hf,
  webGoverned: mf
};
function wf({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: P.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: P.control, children: [
    /* @__PURE__ */ n(
      xe,
      {
        label: `${e.name} — ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "PILOT" })
  ] });
}
function _f({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(wf, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function vf(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function ff({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    xe,
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
function bf({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(ff, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: vf(e) }) })
  ] });
}
function Vk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(bf, { ...e }) : /* @__PURE__ */ n(_f, { ...e });
}
const pf = "_row_vv64h_2", gf = "_cell_vv64h_6", Nf = "_name_vv64h_25", yf = "_note_vv64h_30", kf = "_webName_vv64h_41", $f = "_webMeta_vv64h_47", z = {
  row: pf,
  cell: gf,
  name: Nf,
  note: yf,
  webName: kf,
  webMeta: $f
}, jn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Cf(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Sf({ component: e, onRestart: a }) {
  const t = $(), r = jn[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: z.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: z.cell, "data-mono": "true", children: [
      Q(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { id: t, className: z.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: z.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(v, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Rf({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: Cf(e.state) });
}
function Tf({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { ...jn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(Rf, { component: e, onRestart: a }) })
  ] });
}
function Yk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Tf, { ...e }) : /* @__PURE__ */ n(Sf, { ...e });
}
const Lf = "_row_1f1gp_7", xf = "_cell_1f1gp_11", Af = "_next_1f1gp_28", Ef = "_headCell_1f1gp_38", qf = "_webId_1f1gp_77", If = "_webPurpose_1f1gp_83", Mf = "_webMeta_1f1gp_91", Bf = "_webUrgent_1f1gp_97", O = {
  row: Lf,
  cell: xf,
  next: Af,
  headCell: Ef,
  webId: qf,
  webPurpose: If,
  webMeta: Mf,
  webUrgent: Bf
}, Pf = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Df = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, Wn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Of = Object.fromEntries(Wn.map((e) => [e.key, e]));
function De({ column: e, children: a }) {
  const t = Of[e];
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
function Jk() {
  return /* @__PURE__ */ n("tr", { children: Wn.map((e) => /* @__PURE__ */ n(
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
function Hf({ cred: e }) {
  const a = Pf[e.state];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n(De, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(De, { column: "id", children: e.id }),
    /* @__PURE__ */ n(De, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(De, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(De, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(De, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Ff({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function jf({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Ff, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...Df[e.state] }) })
  ] });
}
function Xk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(jf, { ...e }) : /* @__PURE__ */ n(Hf, { ...e });
}
const Wf = "_card_17zba_2", zf = "_head_17zba_11", Gf = "_env_17zba_18", Kf = "_version_17zba_25", Uf = "_meta_17zba_32", Vf = "_webCard_17zba_37", Yf = "_webRow_17zba_47", Jf = "_webTitle_17zba_55", Xf = "_webLine_17zba_65", Qf = "_webVersion_17zba_72", Zf = "_webMeta_17zba_77", W = {
  card: Wf,
  head: zf,
  env: Gf,
  version: Kf,
  meta: Uf,
  webCard: Vf,
  webRow: Yf,
  webTitle: Jf,
  webLine: Xf,
  webVersion: Qf,
  webMeta: Zf
}, zn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function eb({ env: e }) {
  const a = zn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: W.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ l("div", { className: W.head, children: [
      /* @__PURE__ */ n("span", { className: W.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: W.version, children: e.version }),
    /* @__PURE__ */ l("p", { className: W.meta, children: [
      "deployed ",
      te(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: W.meta, children: t })
  ] });
}
function ab(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [te(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function nb(e) {
  return /* @__PURE__ */ l("article", { className: `${W.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${W.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${W.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...zn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${W.version} ${W.webVersion} ${W.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${W.meta} ${W.webMeta} ${W.webLine} ward-cellmeta`, children: ab(e) })
  ] });
}
function Qk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(nb, { ...e }) : /* @__PURE__ */ n(eb, { ...e });
}
const tb = "_upload_erepj_2", rb = "_preview_erepj_7", lb = "_mark_erepj_17", ob = "_empty_erepj_22", ib = "_actions_erepj_28", cb = "_input_erepj_33", sb = "_reasons_erepj_41", db = "_reason_erepj_41", ub = "_accepted_erepj_57", Y = {
  upload: tb,
  preview: rb,
  mark: lb,
  empty: ob,
  actions: ib,
  input: cb,
  reasons: sb,
  reason: db,
  accepted: ub
}, Gn = 1.5, Kn = 22, Ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Gn}px at ${Kn}px`];
function hb() {
  return { ok: !1, reasons: [Ye[1]] };
}
function mb(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function wb(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ye[0]] : [];
}
function _b(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ye[1]), e.querySelector("text") !== null && t.push(Ye[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function vb(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? Kn / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Gn;
  }) ? [Ye[3]] : [];
}
function Zk(e) {
  const a = mb(e);
  if (a === null) return hb();
  const t = [...wb(a), ..._b(a, e), ...vb(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const fb = "Mark accepted.";
function bb({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: Y.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: Y.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: Y.empty }) });
}
function pb(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function gb(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Nb({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: Y.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: Y.result, role: "status", children: /* @__PURE__ */ n("p", { className: Y.accepted, children: fb }) }) : /* @__PURE__ */ n("div", { className: Y.result, role: "status", children: /* @__PURE__ */ n("ul", { className: Y.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: Y.reason, children: a }, a)) }) });
}
function yb({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Nb, { result: e }) : /* @__PURE__ */ n("p", { className: `${Y.result} ${pb(e, t)}`, role: "status", children: gb(e, t) });
}
function e1({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: Y.upload, children: [
    /* @__PURE__ */ n(bb, { current: e }),
    /* @__PURE__ */ l("div", { className: Y.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: o,
          className: Y.input,
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
    /* @__PURE__ */ n(yb, { result: i, presentation: r })
  ] });
}
const kb = "_row_1wp9s_7", $b = "_cell_1wp9s_11", Cb = "_head_1wp9s_28", Sb = "_name_1wp9s_34", Rb = "_pinned_1wp9s_42", Tb = "_headCell_1wp9s_49", Lb = "_webName_1wp9s_88", xb = "_webMeta_1wp9s_95", Ab = "_webWarn_1wp9s_103", q = {
  row: kb,
  cell: $b,
  head: Cb,
  name: Sb,
  pinned: Rb,
  headCell: Tb,
  webName: Lb,
  webMeta: xb,
  webWarn: Ab
}, ja = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, Un = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Eb = Object.fromEntries(Un.map((e) => [e.key, e]));
function qb(e, a) {
  return `mcp.${e}.${a}`;
}
function Ib(e) {
  return Object.keys(ja).includes(e);
}
function Mb(e) {
  return ja[e !== void 0 && Ib(e) ? e : "unknown"];
}
function Ge({ column: e, children: a }) {
  const t = Eb[e];
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
function a1() {
  return /* @__PURE__ */ n("tr", { children: Un.map((e) => /* @__PURE__ */ n(
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
function Bb({ server: e }) {
  const a = ja[e.connection];
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
    /* @__PURE__ */ n(Ge, { column: "tools", children: e.tools.map((t) => qb(e.name, t)).join(" · ") })
  ] });
}
function Pb(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Db(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Ob({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Hb({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Fb({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function jb({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Pb(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Db(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Ob, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Mb(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n(Hb, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Fb, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function n1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(jb, { ...e }) : /* @__PURE__ */ n(Bb, { ...e });
}
const Wb = "_row_1h9nq_2", zb = "_headCell_1h9nq_14", Gb = "_cell_1h9nq_15", Kb = "_name_1h9nq_26", Ub = "_consequence_1h9nq_32", Vb = "_reason_1h9nq_38", Yb = "_value_1h9nq_44", Jb = "_webRow_1h9nq_60", Xb = "_webSetting_1h9nq_71", Qb = "_webName_1h9nq_79", Zb = "_webConsequence_1h9nq_87", ep = "_webControl_1h9nq_93", ap = "_webState_1h9nq_106", np = "_webChip_1h9nq_111", T = {
  row: Wb,
  headCell: zb,
  cell: Gb,
  name: Kb,
  consequence: Ub,
  reason: Vb,
  value: Yb,
  webRow: Jb,
  webSetting: Xb,
  webName: Qb,
  webConsequence: Zb,
  webControl: ep,
  webState: ap,
  webChip: np
}, Vn = 104, Yn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function tp({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(xe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(vn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: T.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function rp({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = $(), i = Yn[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: T.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: T.headCell, children: [
      /* @__PURE__ */ n("span", { className: T.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: T.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: T.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: T.cell, children: /* @__PURE__ */ n(tp, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: T.cell, style: { width: Vn }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Jn(e, a) {
  return String(e ?? a);
}
function lp(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function op(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Jn(e.value, "—");
}
function ip({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: T.webControl, children: [
    /* @__PURE__ */ n(xe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: T.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function cp(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(ip, { ...e });
  const o = lp(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: T.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(vn, { options: o, value: Jn(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${T.webControl} ${T.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: op(a) });
}
function sp({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = $(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${T.row} ${T.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: T.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${T.name} ${T.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${T.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: T.webControl, children: i(c) }) : /* @__PURE__ */ n(cp, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${T.webChip} ward-policy-chip`, style: { width: Vn }, children: /* @__PURE__ */ n(m, { ...Yn[t], size: "tag" }) })
  ] });
}
function t1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(sp, { ...e }) : /* @__PURE__ */ n(rp, { ...e });
}
const dp = "_label_1o9za_7", up = "_name_1o9za_15", hp = "_column_1o9za_24", mp = "_webFrame_1o9za_57", wp = "_webHead_1o9za_62", _p = "_webHeadLabel_1o9za_74", vp = "_webLabel_1o9za_112", fp = "_webColumns_1o9za_119", bp = "_webGroup_1o9za_125", pp = "_webPeople_1o9za_126", gp = "_webVia_1o9za_127", Np = "_webMeta_1o9za_156", H = {
  label: dp,
  name: up,
  column: hp,
  webFrame: mp,
  webHead: wp,
  webHeadLabel: _p,
  webLabel: vp,
  webColumns: fp,
  webGroup: bp,
  webPeople: pp,
  webVia: gp,
  webMeta: Np
}, yp = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, Ca = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Sa({ column: e, children: a }) {
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
function kp(e) {
  if (!e.matrixRole) return;
  const a = yp[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function $p({ node: e }) {
  const a = kp(e);
  return /* @__PURE__ */ l("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(Cp, { role: a, node: e }),
    /* @__PURE__ */ n(Sa, { column: Ca[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Sa, { column: Ca[1], children: e.people === void 0 ? "" : Q(e.people) }),
    /* @__PURE__ */ n(Sa, { column: Ca[2], children: e.requestedVia ?? "" })
  ] });
}
function Cp({ role: e, node: a }) {
  return /* @__PURE__ */ l(L, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Sp({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    Nn,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n($p, { node: t }),
      children: c
    }
  );
}
function Ra({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Rp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Ra, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Ra, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Ra, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Tp() {
  return /* @__PURE__ */ l("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function Lp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function xp(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Ap({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Tp, {}),
    /* @__PURE__ */ n(tc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Nn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Lp, { row: t }),
        detail: /* @__PURE__ */ n(Rp, { row: t }),
        expanded: xp(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function r1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ap, { ...e }) : /* @__PURE__ */ n(Sp, { ...e });
}
const Ep = "_runbook_b9agc_2", qp = "_list_b9agc_7", Ip = "_step_b9agc_15", Mp = "_numeral_b9agc_21", Bp = "_body_b9agc_28", Pp = "_head_b9agc_34", Dp = "_title_b9agc_40", Op = "_detail_b9agc_45", Hp = "_actions_b9agc_50", Fp = "_webList_b9agc_56", jp = "_webStep_b9agc_60", Wp = "_webBody_b9agc_66", zp = "_webTitle_b9agc_74", Gp = "_webDetail_b9agc_78", S = {
  runbook: Ep,
  list: qp,
  step: Ip,
  numeral: Mp,
  body: Bp,
  head: Pp,
  title: Dp,
  detail: Op,
  actions: Hp,
  webList: Fp,
  webStep: jp,
  webBody: Wp,
  webTitle: zp,
  webDetail: Gp
}, Xn = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function Qn(e) {
  return String(e + 1).padStart(2, "0");
}
function Kp({ step: e, index: a, connection: t }) {
  const r = Xn[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: Qn(a) }),
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
function Up({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(Kp, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function Vp({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Qn(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Xn[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function Yp({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(Vp, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function l1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Yp, { ...e }) : /* @__PURE__ */ n(Up, { ...e });
}
const Jp = "_list_1gu6a_2", Xp = "_check_1gu6a_10", Qp = "_body_1gu6a_16", Zp = "_text_1gu6a_23", eg = "_pending_1gu6a_32", ag = "_measured_1gu6a_37", He = {
  list: Jp,
  check: Xp,
  body: Qp,
  text: Zp,
  pending: eg,
  measured: ag
};
function ng(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function tg({ check: e }) {
  const a = ng(e.passed);
  return /* @__PURE__ */ l("li", { className: `${He.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Da, { state: a.state, label: a.label }),
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
function o1({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${He.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(tg, { check: a }, a.text)) });
}
const rg = "_root_16pdz_2", lg = "_list_16pdz_9", og = "_line_16pdz_16", ig = "_at_16pdz_43", cg = "_text_16pdz_47", sg = "_foot_16pdz_51", dg = "_idle_16pdz_62", ug = "_caret_16pdz_69", hg = "_jump_16pdz_76", ve = {
  root: rg,
  list: lg,
  line: og,
  at: ig,
  text: cg,
  foot: sg,
  idle: dg,
  caret: ug,
  jump: hg
}, mg = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Wa(e) {
  return Number.isNaN(Date.parse(e)) ? "" : mg.format(new Date(e));
}
const wg = { warn: "warning", ok: "ok" };
function _g({ kind: e }) {
  const a = wg[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function vg({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Wa(e)}` });
}
function fg({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events — as of ${Wa(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(vg, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function i1({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const o = N(null), [i, c] = g(0), s = e.at(-1);
  A(() => {
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
  return /* @__PURE__ */ l("div", { className: ve.root, children: [
    /* @__PURE__ */ n("ol", { className: ve.list, ref: o, "aria-live": "off", "aria-label": r, children: e.map((d, h) => /* @__PURE__ */ l("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${d.kind}`, "data-kind": d.kind, "data-revealed": h < i, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: Wa(d.at) }),
      /* @__PURE__ */ n(_g, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(fg, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const bg = "_row_11jhe_2", pg = "_head_11jhe_14", gg = "_author_11jhe_20", Ng = "_eta_11jhe_25", yg = "_edited_11jhe_26", kg = "_body_11jhe_32", $g = "_reason_11jhe_37", Cg = "_actions_11jhe_42", we = {
  row: bg,
  head: pg,
  author: gg,
  eta: Ng,
  edited: yg,
  body: kg,
  reason: $g,
  actions: Cg
}, Sg = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function Rg(e) {
  return {
    queued: `Still in the outbox — editing replaces the queued row and recomputes req_hash, so ${e} receives one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed — edit and resend, or cancel the delivery."
  };
}
function Tg({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
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
function Lg({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: we.reason, id: a, children: e })
  ] });
}
function xg(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Ag(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Tg, { ...e }) : /* @__PURE__ */ n(Lg, { reason: e.unavailable, reasonId: e.unavailableId });
}
function c1(e) {
  const { comment: a } = e;
  xg(e);
  const t = $(), r = `${t}-unavailable`, o = Sg[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${we.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: we.head, children: [
      /* @__PURE__ */ n("span", { className: we.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: we.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: we.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: we.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: we.reason, id: t, children: Rg(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: we.actions, children: /* @__PURE__ */ n(Ag, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Eg = "_root_c46wj_2", qg = "_attach_c46wj_11", Ig = "_actions_c46wj_17", Mg = "_reply_c46wj_23", Bg = "_replyRow_c46wj_28", Pg = "_sendsAs_c46wj_42", je = {
  root: Eg,
  attach: qg,
  actions: Ig,
  reply: Mg,
  replyRow: Bg,
  sendsAs: Pg
};
function Dg({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = g(""), i = $();
  return /* @__PURE__ */ l("div", { className: je.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: je.replyRow, children: [
      /* @__PURE__ */ n(x, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: je.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function s1(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Dg, { ...e }) : /* @__PURE__ */ n(Og, { ...e });
}
function Og({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ l("div", { className: je.root, children: [
    /* @__PURE__ */ n(x, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ l("div", { className: je.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      _n,
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
const Hg = "_list_1ih9e_2", Fg = "_item_1ih9e_6", jg = "_body_1ih9e_22", Wg = "_text_1ih9e_28", zg = "_evidence_1ih9e_37", Gg = "_consequence_1ih9e_49", Kg = "_note_1ih9e_54", Le = {
  list: Hg,
  item: Fg,
  body: jg,
  text: Wg,
  evidence: zg,
  consequence: Gg,
  note: Kg
};
function Ug({ criterion: e }) {
  return /* @__PURE__ */ n(Ee, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function sn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Vg(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function Yg({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Le.body, children: [
    /* @__PURE__ */ n("span", { className: Le.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(L, { children: [
      /* @__PURE__ */ n(sn, { text: " — " }),
      /* @__PURE__ */ n("code", { className: Le.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(L, { children: [
      /* @__PURE__ */ n(sn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Le.consequence, children: Vg(e.why) })
    ] })
  ] });
}
function Jg({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Le.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Ug, { criterion: e }),
    /* @__PURE__ */ n(Yg, { criterion: e })
  ] });
}
function d1({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Le.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Jg, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Le.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Xg = "_list_dwhoz_2", Qg = "_rung_dwhoz_6", Zg = "_name_dwhoz_18", eN = "_actor_dwhoz_32", na = {
  list: Xg,
  rung: Qg,
  name: Zg,
  actor: eN
}, aN = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function nN({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = aN[e.state];
  return /* @__PURE__ */ l("li", { className: na.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: na.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${na.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function u1({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${na.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(nN, { rung: a }, a.name)) });
}
const tN = "_sheet_1fqco_2", rN = "_title_1fqco_9", lN = "_stage_1fqco_15", oN = "_effects_1fqco_20", iN = "_effect_1fqco_20", cN = "_numeral_1fqco_31", sN = "_effectText_1fqco_38", dN = "_refusals_1fqco_43", uN = "_reasons_1fqco_52", hN = "_reason_1fqco_52", mN = "_actions_1fqco_62", ie = {
  sheet: tN,
  title: rN,
  stage: lN,
  effects: oN,
  effect: iN,
  numeral: cN,
  effectText: sN,
  refusals: dN,
  reasons: uN,
  reason: hN,
  actions: mN
};
function wN({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function h1({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
  const s = $(), u = `${s}-refusal`, [d, h] = g(""), _ = t.length > 0;
  return /* @__PURE__ */ n(Je, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ l("div", { className: ie.sheet, children: [
    /* @__PURE__ */ l("h2", { className: ie.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ie.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ie.effects, children: a.map((b, E) => /* @__PURE__ */ l("li", { className: ie.effect, children: [
      /* @__PURE__ */ n("span", { className: ie.numeral, children: String(E + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ie.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      Jo,
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
    _ && /* @__PURE__ */ l("div", { className: ie.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ie.reasons, children: t.map((b, E) => /* @__PURE__ */ n("li", { className: ie.reason, id: E === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: ie.actions, children: [
      /* @__PURE__ */ n(wN, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const _N = "_list_1hvqu_2", vN = "_path_1hvqu_7", fN = "_head_1hvqu_21", bN = "_label_1hvqu_28", pN = "_consequence_1hvqu_35", gN = "_ask_1hvqu_36", Fe = {
  list: _N,
  path: vN,
  head: fN,
  label: bN,
  consequence: pN,
  ask: gN
}, qa = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function dn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function NN({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: qa[e.kind] }) : /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: qa[e.kind] }),
    /* @__PURE__ */ n("span", { className: Fe.ask, id: r, children: e.askInstead })
  ] });
}
function yN({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: Fe.path, "data-allowed": e.allowed, "data-role": dn(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: Fe.head, children: [
      /* @__PURE__ */ n("span", { className: Fe.label, children: e.title ?? qa[e.kind] }),
      /* @__PURE__ */ n(m, { role: dn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Fe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(NN, { path: e, primary: a, onChoose: t })
  ] });
}
function m1({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Fe.list, children: e.map((t, r) => /* @__PURE__ */ n(yN, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const kN = "_list_qjv4r_2", $N = "_item_qjv4r_6", CN = "_node_qjv4r_18", SN = "_body_qjv4r_24", RN = "_head_qjv4r_30", TN = "_stage_qjv4r_36", LN = "_version_qjv4r_41", xN = "_sentence_qjv4r_49", AN = "_meta_qjv4r_54", fe = {
  list: kN,
  item: $N,
  node: CN,
  body: SN,
  head: RN,
  stage: TN,
  version: LN,
  sentence: xN,
  meta: AN
}, EN = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function qN({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: fe.head, children: [
    /* @__PURE__ */ n("span", { className: fe.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: fe.version, title: e.version, children: e.version }) : null
  ] });
}
function IN({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${fe.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${fe.node} ward-history-node`, children: /* @__PURE__ */ n(Ee, { size: 9, kind: EN[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${fe.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(qN, { entry: e }),
      /* @__PURE__ */ n("span", { className: fe.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${fe.meta} ward-history-meta`, children: [
        `${te(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${J(e.cost)}`
      ] })
    ] })
  ] });
}
function w1({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${fe.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(IN, { entry: a }, a.stage + String(t))) });
}
const MN = "_thread_1kn6s_3", BN = "_turn_1kn6s_8", PN = "_who_1kn6s_27", DN = "_body_1kn6s_32", ta = {
  thread: MN,
  turn: BN,
  who: PN,
  body: DN
}, Zn = ze(!1);
function _1({ children: e, density: a }) {
  return /* @__PURE__ */ n(Zn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ta.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function v1({ turn: e }) {
  if (!We(Zn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${ta.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${ta.who} ward-chat-who`, children: [
      e.author,
      " · ",
      te(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ta.body} ward-chat-body`, children: e.body })
  ] });
}
const ON = "_list_1rt9c_3", HN = "_row_1rt9c_7", FN = "_label_1rt9c_20", jN = "_n_1rt9c_26", WN = "_cause_1rt9c_33", Ue = {
  list: ON,
  row: HN,
  label: FN,
  n: jN,
  cause: WN
};
function zN(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const GN = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function KN({ row: e, formatNumber: a }) {
  return zN(e), /* @__PURE__ */ l("li", { className: `${Ue.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ee, { size: 8, ...GN[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Ue.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Ue.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(UN, { cause: e.cause })
  ] });
}
function UN({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ue.cause} ward-healthrow-cause`, children: e }) : null;
}
function f1({ rows: e, formatNumber: a = Q }) {
  return /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(KN, { row: t, formatNumber: a }, t.label)) });
}
const VN = "_root_1jxwp_2", YN = {
  root: VN
};
function b1({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: YN.root, "data-density": o, children: [
    /* @__PURE__ */ n(ga, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const JN = "_row_dhbre_3", XN = "_key_dhbre_13", QN = "_stack_dhbre_24", ZN = "_value_dhbre_32", ey = "_evidence_dhbre_39", ay = "_mark_dhbre_47", Oe = {
  row: JN,
  key: XN,
  stack: QN,
  value: ZN,
  evidence: ey,
  mark: ay
};
function ny({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Da, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function p1({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Oe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Oe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Oe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Oe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Oe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Oe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(ny, { state: e.state }) })
  ] });
}
const ty = "_cell_1monp_2", ry = {
  cell: ty
}, ly = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function oy(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function iy(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function cy(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: oy(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function sy(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function g1({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  iy(e, t);
  const r = sy(e);
  return /* @__PURE__ */ n(
    di,
    {
      label: "Rejection routing",
      columns: ly,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: ry.cell, "data-norerun": o.noRerun ? !0 : void 0, children: cy(o, i) }),
      empty: a ?? /* @__PURE__ */ n(Dc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const dy = "_row_ute8v_2", uy = "_title_ute8v_11", hy = "_turns_ute8v_20", my = "_waiting_ute8v_21", wy = "_resolved_ute8v_22", _y = "_activity_ute8v_23", vy = "_cost_ute8v_29", fy = "_link_ute8v_30", by = "_tableRow_ute8v_47", py = "_tableTitle_ute8v_59", gy = "_tableResolved_ute8v_64", Ny = "_tableLink_ute8v_68", yy = "_tableMeta_ute8v_83", ky = "_tableCost_ute8v_90", $y = "_tableActivity_ute8v_91", Cy = "_tableState_ute8v_101", Sy = "_tableRecord_ute8v_112", B = {
  row: dy,
  title: uy,
  turns: hy,
  waiting: my,
  resolved: wy,
  activity: _y,
  cost: vy,
  link: fy,
  tableRow: by,
  tableTitle: py,
  tableResolved: gy,
  tableLink: Ny,
  tableMeta: yy,
  tableCost: ky,
  tableActivity: $y,
  tableState: Cy,
  tableRecord: Sy
}, et = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function Ry(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function Ty(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Ly(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const xy = { duplicate: "CLOSED · DUPLICATE" };
function Ay({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function Ey({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : J(e) });
}
function qy({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function Iy({ session: e, href: a }) {
  const t = et[e.state];
  return /* @__PURE__ */ l("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: Ty(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: B.tableResolved, children: [
      Ly(e.resolved),
      /* @__PURE__ */ n(Ay, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(Ey, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: Ry(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: xy[e.state] ?? t.label }),
      /* @__PURE__ */ n(qy, { link: e.link })
    ] }) })
  ] });
}
function My({ session: e }) {
  const a = et[e.state];
  return /* @__PURE__ */ l("div", { className: B.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: B.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: B.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: B.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: B.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: B.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : J(e.cost) }),
    /* @__PURE__ */ n("span", { className: B.activity, children: te(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: B.link, href: e.link.href, children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function N1(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(Iy, { session: e.session, href: e.href }) : /* @__PURE__ */ n(My, { session: e.session });
}
const By = "_block_1yy2v_3", Py = "_list_1yy2v_9", Dy = "_line_1yy2v_14", Ia = {
  block: By,
  list: Py,
  line: Dy
}, Oy = { warn: "warning", ok: "ok" };
function Hy({ kind: e }) {
  const a = Oy[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Fy({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Ia.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(Hy, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function y1({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ia.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ia.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(Fy, { line: t }, `${r}-${t.text}`)) }) });
}
const jy = "_band_tt7hp_1", Wy = "_head_tt7hp_8", zy = "_cell_tt7hp_19", Gy = "_index_tt7hp_35", Ky = "_title_tt7hp_42", Uy = "_note_tt7hp_48", Vy = "_cellTitle_tt7hp_53", Yy = "_cellBody_tt7hp_58", Jy = "_tag_tt7hp_64", me = {
  band: jy,
  head: Wy,
  cell: zy,
  index: Gy,
  title: Ky,
  note: Uy,
  cellTitle: Vy,
  cellBody: Yy,
  tag: Jy
}, un = 4;
function k1({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== un)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${un}-cell grid`);
  return /* @__PURE__ */ l("section", { className: me.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ l("div", { className: me.head, children: [
      /* @__PURE__ */ n("span", { className: me.index, children: e }),
      /* @__PURE__ */ n("span", { className: me.title, children: a }),
      /* @__PURE__ */ n("span", { className: me.note, children: t })
    ] }),
    r.map((o) => /* @__PURE__ */ l("div", { className: me.cell, children: [
      /* @__PURE__ */ n("span", { className: me.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: me.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: me.tag, children: o.tag })
    ] }, o.title))
  ] });
}
export {
  i1 as ActivityConsole,
  Xu as AgentCard,
  sk as AppShell,
  Uk as AppearanceStrip,
  k1 as Band,
  ps as BoardColumn,
  Rk as BoardFootnote,
  Tk as BoardHeader,
  gk as BoardScroller,
  v as Btn,
  lk as CHIP_ROLES,
  Wn as CREDENTIAL_COLUMNS,
  mk as Callout,
  Vk as CapabilityRow,
  v1 as ChatMessage,
  _n as Checkbox,
  m as Chip,
  c1 as ClarificationRow,
  Dk as ClauseRuleRow,
  Pk as ClauseRules,
  Rn as ColourLadder,
  Yk as ComponentRow,
  s1 as Composer,
  xk as ConfigRow,
  Lk as ConfigRowHead,
  Oa as ConnectionMark,
  _1 as Conversation,
  Jo as CostMeter,
  Xk as CredentialRow,
  Jk as CredentialRowHead,
  d1 as CriteriaList,
  Ir as Crumb,
  f1 as DeliveryHealth,
  yk as DeniedState,
  Ok as DryRunRail,
  Dc as EmptyState,
  Qk as EnvCard,
  x as Field,
  Nk as FilteredEmpty,
  bk as FormStack,
  ga as GateChecklist,
  u1 as GateLadder,
  di as Grid,
  Fk as HandoffRuleRow,
  Hk as HandoffRules,
  Ak as ItemDrawer,
  bt as LIVE_EVENT_TYPES,
  pu as LegacyBoardColumn,
  qk as LegacyBoardHeader,
  Ik as LegacyConfigRow,
  Bk as LegacyItemDrawer,
  hu as LegacyOverCapNote,
  Mk as LegacyPreviewRail,
  $n as LegacyWorkCard,
  ge as LiveIndicator,
  kk as LoadFailed,
  Sk as Loading,
  Un as MCP_SERVER_COLUMNS,
  Da as Mark,
  e1 as MarkUpload,
  Ee as Marker,
  n1 as McpServerRow,
  a1 as McpServerRowHead,
  jk as NewStreamModal,
  Fc as OverCapNote,
  Je as Overlay,
  Rh as PARTIAL_STEP_REASON,
  Vn as POLICY_CHIP_WIDTH,
  _k as PageFrame,
  hk as PageHeader,
  t1 as PolicyRow,
  Ek as PreviewRail,
  Ca as ROLE_MATRIX_COLUMNS,
  On as RULE_ACTIONS,
  pn as Radio,
  b1 as ReadyChecklist,
  fk as RecordSection,
  h1 as RequeueSheet,
  m1 as ResolveBlock,
  p1 as ResolvedFieldRow,
  r1 as RoleMatrixRow,
  g1 as RoutingTable,
  Wk as RuleRow,
  l1 as RunbookSteps,
  vt as STREAM_STEPS,
  pk as SectionBand,
  Ri as SectionHeader,
  vn as SegmentedControl,
  N1 as SessionRow,
  uk as Sidebar,
  zk as StageColumn,
  w1 as StageHistory,
  xw as StageListEditor,
  $k as StaleStrip,
  fa as StatStrip,
  Gk as StreamRow,
  vk as SubjectRail,
  xe as Switch,
  dk as Tabs,
  Kk as ToolRow,
  wk as TopBar,
  tc as Tree,
  Nn as TreeRow,
  y1 as TypedInputBlock,
  o1 as ValidationList,
  ek as VisibilityProvider,
  ak as Visible,
  rk as WARD_VERSION,
  pa as WorkCard,
  Ck as WriteUnavailableStrip,
  Ry as agoSince,
  ct as clock,
  Uw as colourStatus,
  Q as count,
  ne as duration,
  Ma as elapsed,
  tk as eventSourceTransport,
  ma as isStreamStep,
  wa as isValidatedStreamStep,
  Th as ladderValidation,
  Mb as mcpConnectionChip,
  qb as mcpToolName,
  J as money,
  de as ms,
  yn as ordered,
  hn as ratio,
  Cf as restartLabel,
  te as stamp,
  wn as stream,
  ik as streamChip,
  va as streamChipProps,
  Ae as streamColour,
  gt as streamHex,
  ok as streamVars,
  ea as useBorderFlash,
  mt as useFocusTrap,
  ck as useLiveFeed,
  nk as useReturnFocus,
  ha as useRovingTabindex,
  Ba as useTicker,
  st as useVisible,
  j as v,
  Zk as validateMark,
  _a as validatedStep,
  ft as validatedStreamSteps
};
