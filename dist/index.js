import { jsx as n, Fragment as L, jsxs as l } from "react/jsx-runtime";
import { useMemo as tt, useContext as We, createContext as ze, useCallback as G, useEffect as A, useState as g, useRef as N, useLayoutEffect as rt, useId as $, Fragment as lt } from "react";
import { createPortal as ot } from "react-dom";
function ne(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const Ga = (e) => String(e).padStart(2, "0");
function Ma(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${Ga(a % 60)}s` : `${Math.floor(t / 60)}h ${Ga(t % 60)}m`;
}
const it = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function te(e) {
  const a = it.formatToParts(new Date(e)), t = (r) => {
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
function mn(e, a) {
  return `${e} / ${a}`;
}
const ct = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function st(e) {
  return ct.format(new Date(e));
}
const wn = ze(/* @__PURE__ */ new Set());
function ak({ hidden: e, children: a }) {
  const t = tt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(wn.Provider, { value: t, children: a });
}
function dt(e) {
  return !We(wn).has(e);
}
function nk({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(L, { children: dt(e) ? a : t });
}
const ut = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function ht(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function mt(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = ht(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function wt(e) {
  return { onKeyDown: G(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(ut));
      mt(t, e.current, r);
    },
    [e]
  ) };
}
function tk(e, a = !0) {
  A(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const Ka = { ArrowUp: -1, ArrowDown: 1 }, Ua = { ArrowLeft: -1, ArrowRight: 1 }, _t = (e, a, t) => Math.min(t, Math.max(a, e));
function vt(e, a) {
  if (a !== "horizontal" && e in Ka) return Ka[e];
  if (a !== "vertical" && e in Ua) return Ua[e];
}
function ha({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  rt(() => {
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
      const _ = Math.max(0, h.indexOf(a)), b = vt(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[_t(_ + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
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
const rk = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, lk = "0.2.0", ok = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], ft = [1, 2, 3, 4, 5, 6], bt = [1, 2, 3], pt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], j = {
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
function _n(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function ma(e) {
  return ft.includes(e);
}
function wa(e) {
  return bt.includes(e);
}
function ik(e) {
  if (!ma(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function ck(e) {
  if (!ma(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const gt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Nt(e) {
  if (!ma(e)) throw new Error("unvalidated stream step");
  return gt[e];
}
function Va(e) {
  return typeof e != "string" ? null : pt.includes(e) ? e : null;
}
function yt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function kt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function $t(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Ct(e, a, t) {
  const r = yt(e);
  if (r === null) return null;
  const o = Va(t) ?? Va(r.type);
  return o === null ? null : { ...r, type: o, id: kt(r, a), at: $t(r) };
}
function St(e, a) {
  return e >= de.staleAfter ? "stale" : e >= de.heartbeat && a === "live" ? "reconnecting" : null;
}
function Rt(e, a, t) {
  return e >= de.heartbeat && !a && t !== null;
}
function sk(e, a) {
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
        const $e = Ct(k, F, he);
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
    const k = Date.now() - s.current, F = St(k, Z.current);
    F && ee(F);
    const he = h.current;
    Rt(k, E.current, he) && Ie(he);
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
function Tt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ya(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ea(e, a) {
  const t = N(0), r = G((o) => {
    const i = o ?? a, c = e.current;
    c !== null && i !== void 0 && (Tt() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => Ya(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => Ya(c), de.flash)));
  }, [a, e]);
  return A(() => () => window.clearTimeout(t.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const Lt = "_root_1otpc_2", xt = {
  root: Lt
};
function At(e, a, t, r, o) {
  const i = [Ma(a)];
  return e || i.push(`as of ${st(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = Ba(e, o), c = (a == null ? void 0 : a.at) ?? e, s = At(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${xt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      te(e)
    ] })
  ] });
}
const Et = "_app_lrbcc_1", qt = "_side_lrbcc_18", It = "_main_lrbcc_26", Mt = "_rail_lrbcc_33", Bt = "_page_lrbcc_40", Pt = "_root_lrbcc_91", Dt = "_topbar_lrbcc_98", Ot = "_mark_lrbcc_109", Ht = "_brand_lrbcc_116", Ft = "_tagline_lrbcc_122", jt = "_identity_lrbcc_128", Wt = "_tools_lrbcc_129", zt = "_actor_lrbcc_138", Gt = "_metadata_lrbcc_139", Kt = "_detail_lrbcc_155", Ut = "_nav_lrbcc_160", Vt = "_content_lrbcc_195", Yt = "_skip_lrbcc_218", D = {
  app: Et,
  side: qt,
  main: It,
  rail: Mt,
  page: Bt,
  root: Pt,
  topbar: Dt,
  mark: Ot,
  brand: Ht,
  tagline: Ft,
  identity: jt,
  tools: Wt,
  actor: zt,
  metadata: Gt,
  detail: Kt,
  nav: Ut,
  content: Vt,
  skip: Yt
};
function Jt({ sidebar: e, header: a, children: t, rail: r }) {
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
function Xt({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: D.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function ra({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Qt({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: D.metadata, children: [
    /* @__PURE__ */ n(ra, { value: e, className: D.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(ra, { value: a, className: D.detail })
  ] });
}
function Zt(e) {
  return /* @__PURE__ */ l("header", { className: D.topbar, children: [
    /* @__PURE__ */ n("span", { className: D.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: D.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(ra, { value: e.tagline, className: D.tagline }),
    /* @__PURE__ */ n(Xt, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: D.identity, children: /* @__PURE__ */ n(Qt, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(ra, { value: e.tools, className: D.tools })
  ] });
}
function er(e) {
  const a = $();
  return /* @__PURE__ */ l("div", { className: `${D.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: D.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Zt, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: D.content, children: e.children })
  ] });
}
function ar(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function dk(e) {
  return ar(e) ? /* @__PURE__ */ n(Jt, { ...e }) : /* @__PURE__ */ n(er, { ...e });
}
const nr = "_btn_llheq_2", tr = "_primary_llheq_13", rr = "_secondary_llheq_23", lr = "_ghost_llheq_28", or = "_overflow_llheq_37", ir = "_sm_llheq_44", cr = "_disabled_llheq_48", Xe = {
  btn: nr,
  primary: tr,
  secondary: rr,
  ghost: lr,
  overflow: or,
  sm: ir,
  disabled: cr
};
function sr(e, a, t, r) {
  const o = a === "sm" ? [Xe.sm, "ward-btn--sm"] : [], i = t ? [Xe.disabled] : [];
  return [Xe.btn, Xe[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function dr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function ur(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function hr(e) {
  return e.children ?? e.label;
}
function v(e) {
  ur(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: sr(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...dr(a, e.controls),
      children: hr(e)
    }
  );
}
function Pa(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const mr = "_root_o4yib_2", wr = "_row_o4yib_8", _r = "_box_o4yib_14", vr = "_label_o4yib_21", fr = "_lockedNote_o4yib_26", br = "_consequence_o4yib_34", pr = "_sample_o4yib_69", Se = {
  root: mr,
  row: wr,
  box: _r,
  label: vr,
  lockedNote: fr,
  consequence: br,
  sample: pr
};
function gr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Nr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Se.consequence} ward-check-consequence`, children: a }) : null;
}
function yr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Se.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function kr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Se.sample, "aria-hidden": "true", children: e }) : null;
}
function vn(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = gr(e);
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
        /* @__PURE__ */ n(yr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(kr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Nr, { id: t, text: e.consequence })
  ] });
}
const $r = "_chip_1073r_2", Cr = {
  chip: $r
}, Sr = {
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
function Rr(e, a) {
  if (e === "stream") return Tr(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Sr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Tr(e) {
  if (!e || !wa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = _n(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Cr.chip} ward-chip ward-chip--${e}`, style: Rr(e, t), "data-ward-chip": e, "data-size": r, children: a });
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
const Lr = "_nav_fbsei_2", xr = "_list_fbsei_8", Ar = "_item_fbsei_15", Er = "_link_fbsei_24", qr = "_current_fbsei_33", Ir = "_chips_fbsei_37", Be = {
  nav: Lr,
  list: xr,
  item: Ar,
  link: Er,
  current: qr,
  chips: Ir
};
function Mr({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Be.nav, children: [
    /* @__PURE__ */ n("ol", { className: Be.list, children: e.map((t, r) => /* @__PURE__ */ n("li", { className: Be.item, children: r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Be.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Be.current, "aria-current": "page", children: t.label }) }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Be.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const Br = "_field_1oadv_2", Pr = "_label_1oadv_8", Dr = "_labelHidden_1oadv_15", Or = "_control_1oadv_25", Hr = "_mono_1oadv_44", Fr = "_area_1oadv_49", jr = "_invalid_1oadv_56", ke = {
  field: Br,
  label: Pr,
  labelHidden: Dr,
  control: Or,
  mono: Hr,
  area: Fr,
  invalid: jr
};
function Wr({ controlProps: e, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, ...e });
}
function zr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Gr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Kr = { input: Wr, select: zr, textarea: Gr };
function Ur(e, a, t) {
  const r = Kr[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Vr(e, a, t) {
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
function Yr(e) {
  const a = e.mono ? [ke.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [ke.area] : [];
  return [ke.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Jr(e) {
  return e ? `${ke.label} ${ke.labelHidden} ward-field-label` : `${ke.label} ward-field-label`;
}
function x(e) {
  const a = $(), t = `${a}-msg`, r = Vr(e, a, t), o = Yr(e);
  return /* @__PURE__ */ l("div", { className: `${ke.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Jr(e.labelHidden), htmlFor: a, children: e.label }),
    Ur(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${ke.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Xr = "_strip_rg8pj_2", Qr = "_tab_rg8pj_12", Zr = "_count_rg8pj_34", Ta = {
  strip: Xr,
  tab: Qr,
  count: Zr
}, Ja = 7;
function el(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function al(e) {
  return `${Ta.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function uk({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > Ja) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Ja} — the set is fixed`);
  const i = ha({ orientation: "horizontal" }), c = el(e, a);
  return A(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: al(o),
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
const nl = "_root_jem6y_2", tl = "_segment_jem6y_7", Xa = {
  root: nl,
  segment: tl
};
function fn({ options: e, value: a, onChange: t, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = ha({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return A(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${Xa.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Xa.segment,
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
const rl = "_sidebar_1jywv_3", ll = "_brand_1jywv_9", ol = "_mark_1jywv_17", il = "_word_1jywv_24", cl = "_nav_1jywv_30", sl = "_navItem_1jywv_38", dl = "_group_1jywv_50", ul = "_groupName_1jywv_57", hl = "_agents_1jywv_70", ml = "_agent_1jywv_70", wl = "_agentTop_1jywv_88", _l = "_dot_1jywv_95", vl = "_agentName_1jywv_107", fl = "_agentMeta_1jywv_120", bl = "_foot_1jywv_126", pl = "_footName_1jywv_132", gl = "_footLinks_1jywv_139", Nl = "_footLink_1jywv_139", yl = "_root_1jywv_153", kl = "_linkBrand_1jywv_162", $l = "_label_1jywv_183", Cl = "_note_1jywv_188", Sl = "_footer_1jywv_202", C = {
  sidebar: rl,
  brand: ll,
  mark: ol,
  word: il,
  nav: cl,
  navItem: sl,
  group: dl,
  groupName: ul,
  new: "_new_1jywv_64",
  agents: hl,
  agent: ml,
  agentTop: wl,
  dot: _l,
  agentName: vl,
  agentMeta: fl,
  foot: bl,
  footName: pl,
  footLinks: gl,
  footLink: Nl,
  root: yl,
  linkBrand: kl,
  label: $l,
  note: Cl,
  footer: Sl
};
function Rl({ agent: e }) {
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
              style: { "--dot": _n(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Tl({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function Ll({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(Rl, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(Tl, { shared: i })
  ] });
}
function xl(e) {
  return e.destinations ?? e.items ?? [];
}
function Al({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function El({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function ql({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Il(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Al, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: xl(e).map((a) => /* @__PURE__ */ n(ql, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(El, { children: e.children })
  ] });
}
function Ml(e) {
  return "agents" in e;
}
function hk(e) {
  return Ml(e) ? /* @__PURE__ */ n(Ll, { ...e }) : /* @__PURE__ */ n(Il, { ...e });
}
const Bl = "_mark_wlgi8_3", Pl = {
  mark: Bl
}, Dl = { met: "✓", unmet: "", failed: "✕" };
function Da({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Pl.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Dl[e]
    }
  );
}
const Ol = "_marker_br9fi_2", Hl = {
  marker: Ol
}, Fl = {
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
  const r = { "--marker": Fl[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Hl.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const jl = "_root_ti0pq_2", Wl = "_chip_ti0pq_11", zl = "_noCase_ti0pq_23", Qe = {
  root: jl,
  chip: Wl,
  noCase: zl
};
function Gl(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Oa({ connection: e, since: a, lastEventAt: t }) {
  const r = Gl(a, t), o = Ba(r, e === "reconnecting");
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
const Kl = "_root_11rs7_2", Ul = "_context_11rs7_12", Vl = "_row_11rs7_1", Yl = "_heading_11rs7_25", Jl = "_headingWrap_11rs7_33", Xl = "_chips_11rs7_38", Ql = "_title_11rs7_45", Zl = "_consequence_11rs7_54", eo = "_actionsWrap_11rs7_59", ao = "_actions_11rs7_59", no = "_action_11rs7_59", to = "_overflowPanel_11rs7_78", ro = "_measure_11rs7_88", V = {
  root: Kl,
  context: Ul,
  row: Vl,
  heading: Yl,
  headingWrap: Jl,
  chips: Xl,
  title: Ql,
  consequence: Zl,
  actionsWrap: eo,
  actions: ao,
  action: no,
  overflowPanel: to,
  measure: ro
};
function lo({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: V.heading, children: [
    /* @__PURE__ */ n("h1", { className: V.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: V.consequence, children: a })
  ] });
}
function bn({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: V.action, "data-action": "", children: a }, t));
}
function oo({ actions: e, collapsed: a, onOverflow: t, disclosure: r }) {
  return a ? t ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: t, children: "···" }) : /* @__PURE__ */ n(v, { variant: "overflow", onClick: r.toggle, expanded: r.open, controls: r.panelId, children: "···" }) : /* @__PURE__ */ n(bn, { actions: e });
}
function io({ actions: e, disclosure: a, onEscape: t }) {
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: V.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(bn, { actions: e }) });
}
function co(e, a) {
  const t = $(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function so({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: V.context, children: [
    /* @__PURE__ */ n(Mr, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: V.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function uo(...e) {
  return e.some((a) => a === null);
}
function ho(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function mo(e, a, t, r, o) {
  if (o === 0 || uo(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = ho(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function wo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function _o(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = g(!1);
  return A(() => {
    const s = a.current;
    if (!wo(s)) return;
    const u = () => c(mo(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function vo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Oa, { connection: e.connection, since: e.since }) : null;
}
function mk({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], connection: i, onOverflow: c, density: s = "page" }) {
  const { rowRef: u, headingRef: d, actionsRef: h, measureRef: _, collapsed: b } = _o(o), { disclosure: E, close: Z } = co(b, h);
  return /* @__PURE__ */ l("header", { className: V.root, "data-density": s, children: [
    /* @__PURE__ */ n(so, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: V.row, ref: u, children: [
      /* @__PURE__ */ n("div", { ref: d, className: V.headingWrap, children: /* @__PURE__ */ n(lo, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: V.actionsWrap, children: [
        /* @__PURE__ */ n(vo, { connection: i }),
        /* @__PURE__ */ n("div", { className: V.actions, ref: h, "data-ward-actions": !0, children: /* @__PURE__ */ n(oo, { actions: o, collapsed: b, onOverflow: c, disclosure: E }) })
      ] })
    ] }),
    b && !c ? /* @__PURE__ */ n(io, { actions: o, disclosure: E, onEscape: Z }) : null,
    /* @__PURE__ */ n("div", { className: V.measure, ref: _, "aria-hidden": "true", children: o.map((ee, re) => /* @__PURE__ */ n("span", { children: ee }, re)) })
  ] });
}
function pn(e) {
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
const fo = "_scrim_c7sqj_2", bo = "_drawer_c7sqj_10", po = "_sheet_c7sqj_14", go = "_modal_c7sqj_18", No = "_panel_c7sqj_23", yo = "_header_c7sqj_51", ko = "_title_c7sqj_59", $o = "_body_c7sqj_63", Co = "_close_c7sqj_90", be = {
  scrim: fo,
  drawer: bo,
  sheet: po,
  modal: go,
  panel: No,
  header: yo,
  title: ko,
  body: $o,
  close: Co
}, So = ze(null), la = [], oa = /* @__PURE__ */ new Map();
function Ro(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function To(e, a) {
  let t = oa.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, oa.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Lo(e, a) {
  for (const t of Array.from(a.children))
    Ro(t) || To(e, t);
}
function xo(e) {
  for (const a of e.claims) {
    const t = oa.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), oa.delete(a)));
  }
}
function Ao(e, a) {
  const t = { root: e, claims: [] };
  return la.push(t), Lo(t, a), t;
}
function Eo(e) {
  const a = la.indexOf(e);
  a >= 0 && la.splice(a, 1), xo(e);
}
function Qa(e) {
  return e !== null && la.at(-1) === e;
}
function qo(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, A(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = Ao(i, a);
    return r.current = s, () => {
      var d, h;
      const u = Qa(s);
      Eo(s), r.current = null, u && ((h = (d = o.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), G(() => Qa(r.current), []);
}
function Io(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Mo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Bo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${be.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("header", { className: `${be.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${be.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${be.body} ward-drawer-body`, children: e.children })
  ] });
}
function Po(e) {
  return `${be.scrim} ${be[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Do(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${be.panel} ${be[e]} ward-overlay-panel${t}${r}`;
}
function Oo(e) {
  const a = We(So);
  return e ?? a ?? document.body;
}
function Je(e) {
  const a = N(null), t = N(null), r = $(), o = Oo(e.container), i = pn("(min-width: 768px)"), c = Io(e.kind, i), s = Mo(e, r), u = wt(t), d = qo(a, o, e.returnFocusTo), h = G(() => {
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
  }, [h]), ot(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Po(c),
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
            className: Do(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${be.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Bo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Ho = "_root_drrhx_2", Fo = "_ticket_drrhx_15", jo = "_body_drrhx_24", Na = {
  root: Ho,
  ticket: Fo,
  body: jo
};
function wk({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${Na.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Na.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Na.body, children: t })
  ] });
}
const Wo = "_root_1bfqw_2", zo = "_figure_1bfqw_7", Go = "_of_1bfqw_13", Ko = "_bar_1bfqw_18", Uo = "_rows_1bfqw_38", Vo = "_row_1bfqw_38", Yo = "_label_1bfqw_49", Jo = "_amount_1bfqw_54", Ne = {
  root: Wo,
  figure: zo,
  of: Go,
  bar: Ko,
  rows: Uo,
  row: Vo,
  label: Yo,
  amount: Jo
};
function Xo({ spent: e, ceiling: a, breakdown: t }) {
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
const Qo = "_frame_mg2jl_2", Zo = "_table_mg2jl_6", ei = "_th_mg2jl_12", ai = "_td_mg2jl_13", ni = "_sort_mg2jl_47", ti = "_row_mg2jl_53", ri = "_empty_mg2jl_61", ye = {
  frame: Qo,
  table: Zo,
  th: ei,
  td: ai,
  sort: ni,
  row: ti,
  empty: ri
}, li = { asc: "ascending", desc: "descending" };
function oi(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return li[a.direction];
}
function ii(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: ye.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function ci(e) {
  return e === void 0 ? void 0 : { width: e };
}
function si({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ye.th,
      style: ci(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": oi(e, a),
      children: ii(e, t)
    }
  );
}
function di({ row: e, props: a }) {
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
function ui({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ye.head, children: a.map((h) => /* @__PURE__ */ n(si, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(di, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const hi = "_set_y5zy3_2", mi = "_legend_y5zy3_7", wi = "_row_y5zy3_15", _i = "_control_y5zy3_20", vi = "_input_y5zy3_26", fi = "_label_y5zy3_31", bi = "_consequence_y5zy3_36", Ce = {
  set: hi,
  legend: mi,
  row: wi,
  control: _i,
  input: vi,
  label: fi,
  consequence: bi
};
function gn({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
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
const pi = "_root_1h1ot_2", gi = "_head_1h1ot_11", Ni = "_index_1h1ot_25", yi = "_dot_1h1ot_29", ki = "_note_1h1ot_34", $i = "_counter_1h1ot_40", Ci = "_trailing_1h1ot_48", Re = {
  root: pi,
  head: gi,
  index: Ni,
  dot: yi,
  note: ki,
  counter: $i,
  trailing: Ci
};
function Si({ index: e }) {
  return e ? /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("span", { className: `${Re.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Re.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ri({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Re.counter, "aria-hidden": "true", children: e }) : null;
}
function Ti({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Re.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Re.head, children: [
      /* @__PURE__ */ n(Si, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Re.note, children: t }),
    /* @__PURE__ */ n(Ri, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Re.trailing, children: i })
  ] });
}
const Li = "_strip_1qhvo_2", xi = "_cell_1qhvo_7", Ai = "_value_1qhvo_12", Ei = "_label_1qhvo_27", Ze = {
  strip: Li,
  cell: xi,
  value: Ai,
  label: Ei
};
function qi(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function fa({ cells: e, divided: a = !1 }) {
  return qi(e), /* @__PURE__ */ n("dl", { className: `${Ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Ze.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ze.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Ze.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Ii = "_root_xk7sv_2", Mi = "_track_xk7sv_8", Bi = "_thumb_xk7sv_35", Pi = "_labelHidden_xk7sv_53", Di = "_label_xk7sv_53", Oi = "_lockedNote_xk7sv_68", Te = {
  root: Ii,
  track: Mi,
  thumb: Bi,
  labelHidden: Pi,
  label: Di,
  lockedNote: Oi
};
function Hi(e) {
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
    /* @__PURE__ */ l("span", { id: s, className: Hi(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Te.lockedNote, children: "always on" })
    ] })
  ] });
}
const Fi = "_bar_1u2kl_2", ji = "_skip_1u2kl_11", Wi = "_mark_1u2kl_22", zi = "_nav_1u2kl_30", Gi = "_list_1u2kl_34", Ki = "_select_1u2kl_40", Ui = "_dest_1u2kl_47", Vi = "_actor_1u2kl_61", Yi = "_actorMark_1u2kl_74", Ji = "_actorLabel_1u2kl_79", Xi = "_tagline_1u2kl_98", oe = {
  bar: Fi,
  skip: ji,
  mark: Wi,
  nav: zi,
  list: Gi,
  select: Ki,
  dest: Ui,
  actor: Vi,
  actorMark: Yi,
  actorLabel: Ji,
  tagline: Xi
};
function Qi(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Zi(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function _k({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = Zi(r);
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
      /* @__PURE__ */ n("span", { className: oe.actorMark, "aria-hidden": "true", children: Qi(s) })
    ] })
  ] });
}
const ec = "_tree_1lyby_2", ac = "_item_1lyby_6", nc = "_row_1lyby_10", tc = "_button_1lyby_22", ia = {
  tree: ec,
  item: ac,
  row: nc,
  button: tc
}, Nn = ze(null);
function rc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ha({ orientation: "vertical" });
  return /* @__PURE__ */ n(Nn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ia.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const lc = { ArrowRight: !0, ArrowLeft: !1 };
function Za(e) {
  return e ? !0 : void 0;
}
function oc(e, a) {
  const t = lc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function ic(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function cc(e) {
  const a = [ia.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function sc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function dc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function uc(e) {
  return typeof e == "string" ? e : void 0;
}
function hc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function mc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function yn(e) {
  const a = We(Nn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = sc(e);
  return /* @__PURE__ */ l("li", { className: ia.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: cc(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": Za(e.unresolved),
        "data-inherited": Za(e.inherited),
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${ia.button} ward-treeitem-btn`,
            onClick: () => ic(e),
            onKeyDown: (r) => oc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: dc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: uc(e.label), children: e.label }),
              /* @__PURE__ */ n(hc, { value: e.detail }),
              /* @__PURE__ */ n(mc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const wc = "_frame_9lntd_2", _c = "_subjectRail_9lntd_21", vc = "_subject_9lntd_21", fc = "_rail_9lntd_41", bc = "_record_9lntd_63", pc = "_recordBody_9lntd_68", gc = "_band_9lntd_111", Nc = "_bandBody_9lntd_120", yc = "_bandActions_9lntd_125", kc = "_scroller_9lntd_132", $c = "_lanes_9lntd_150", se = {
  frame: wc,
  subjectRail: _c,
  subject: vc,
  rail: fc,
  record: bc,
  recordBody: pc,
  band: gc,
  bandBody: Nc,
  bandActions: yc,
  scroller: kc,
  lanes: $c
};
function vk({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: se.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function en(e) {
  return e ? "true" : void 0;
}
function fk({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: se.subjectRail, "data-ward-subject-rail": t, "data-ruled": en(i), children: [
    /* @__PURE__ */ n("div", { className: se.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: se.rail, "data-sticky": en(o), "aria-label": r, children: a })
  ] });
}
function bk({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: se.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Ti, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: se.recordBody, "data-pad": o, children: a })
  ] });
}
const Cc = "_form_1j8ub_2", Sc = "_fields_1j8ub_9", Rc = "_actions_1j8ub_19", ya = {
  form: Cc,
  fields: Sc,
  actions: Rc
};
function pk({ label: e, children: a, actions: t, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: ya.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: ya.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: ya.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function gk({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: se.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: se.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: se.bandActions, children: a })
  ] });
}
const Tc = "(max-width: 767.98px)";
function La({ label: e, children: a }) {
  return /* @__PURE__ */ n("div", { className: se.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", children: a });
}
function Lc({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: se.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(x, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(La, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Nk({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = pn(Tc);
  return t === void 0 ? /* @__PURE__ */ n(La, { label: a, children: e }) : o ? /* @__PURE__ */ n(Lc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(La, { label: a, children: t.map((i) => /* @__PURE__ */ n(lt, { children: i.content }, i.id)) });
}
const xc = "_block_1o5o7_2", Ac = "_sentence_1o5o7_15", Ec = "_meta_1o5o7_20", qc = "_action_1o5o7_25", Ic = "_strip_1o5o7_29", Mc = "_loading_1o5o7_48", Bc = "_label_1o5o7_56", Pc = "_counter_1o5o7_63", ue = {
  block: xc,
  sentence: Ac,
  meta: Ec,
  action: qc,
  strip: Ic,
  loading: Mc,
  label: Bc,
  counter: Pc
};
function Dc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: ue.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function ba({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${ue.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: ue.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Dc, { action: a })
  ] });
}
function Oc(e) {
  return /* @__PURE__ */ n(ba, { ...e });
}
function yk({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ba, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: ue.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function kk(e) {
  return /* @__PURE__ */ n(ba, { ...e });
}
function $k({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ba, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: ue.meta, children: [
    "failed at ",
    te(a)
  ] }) });
}
function Ck({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: ue.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    te(e),
    " — showing snapshot from ",
    te(a)
  ] });
}
function Sk({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: ue.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    te(a)
  ] });
}
function Rk({ label: e, startedAt: a }) {
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
const Hc = "_note_tlubt_2", Fc = {
  note: Hc
};
function jc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: Fc.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const Wc = "_card_12in3_2", zc = "_hit_12in3_23", Gc = "_head_12in3_30", Kc = "_title_12in3_36", Uc = "_meta_12in3_44", Vc = "_fields_12in3_45", Yc = "_who_12in3_58", Jc = "_sep_12in3_65", Xc = "_mono_12in3_69", Qc = "_field_12in3_45", Zc = "_last_12in3_84", es = "_reason_12in3_96", K = {
  card: Wc,
  hit: zc,
  head: Gc,
  title: Kc,
  meta: Uc,
  fields: Vc,
  who: Yc,
  sep: Jc,
  mono: Xc,
  field: Qc,
  last: Zc,
  reason: es
}, as = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function ns(e, a, t) {
  const r = ea(e, "blue"), o = ea(e, "orange"), i = ea(e, "green"), c = N(/* @__PURE__ */ new Set());
  A(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = as[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const ts = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : J(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function rs(e, a) {
  return ts[a](e);
}
function ls({ item: e, connection: a }) {
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
function os({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: K.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function is({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: K.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function cs({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: K.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: K.field, children: rs(e, t) }, t)) });
}
const xa = (e) => e ? !0 : void 0;
function ss(e) {
  return { "--stream": Ae(e.streamStep, "id") };
}
function ds(e, a, t) {
  e == null || e(a, t);
}
function us(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function hs({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: K.last, "data-stale": xa(a), children: t }) : null;
}
function pa(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  ns(r, t.key, e.feed);
  const o = us(e.feed), i = ss(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: K.hit, onClick: (c) => ds(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(os, { item: t }),
        /* @__PURE__ */ n("p", { className: K.title, children: t.title }),
        /* @__PURE__ */ n(ls, { item: t, connection: o }),
        /* @__PURE__ */ n(is, { reason: t.blockedReason }),
        /* @__PURE__ */ n(cs, { item: t, fields: a }),
        /* @__PURE__ */ n(hs, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const ms = "_column_14784_3", ws = "_head_14784_24", _s = "_label_14784_33", vs = "_count_14784_42", fs = "_list_14784_56", Ke = {
  column: ms,
  head: ws,
  label: _s,
  count: vs,
  list: fs
};
function kn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function bs({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: Ke.head, children: [
    /* @__PURE__ */ n("h2", { className: Ke.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: Ke.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function ps(e) {
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
function gs({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = $(), h = e.cap !== void 0 && a.length > e.cap, _ = kn(a, r);
  return /* @__PURE__ */ l("section", { className: Ke.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(bs, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(ps, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    h && /* @__PURE__ */ n(jc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Ns = "_foot_8qg4p_2", ys = "_note_8qg4p_13", ks = "_link_8qg4p_19", ka = {
  foot: Ns,
  note: ys,
  link: ks
};
function Tk({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: ka.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: ka.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: ka.link, href: e, children: "Configure board" })
  ] });
}
const $s = "_head_1la6p_3", Cs = "_identity_1la6p_12", Ss = "_titleRow_1la6p_18", Rs = "_title_1la6p_18", Ts = "_key_1la6p_35", Ls = "_rollup_1la6p_45", xs = "_tools_1la6p_53", As = "_swatch_1la6p_62", Es = "_mark_1la6p_69", _e = {
  head: $s,
  identity: Cs,
  titleRow: Ss,
  title: Rs,
  key: Ts,
  rollup: Ls,
  tools: xs,
  swatch: As,
  mark: Es
}, an = "initials:";
function qs(e) {
  return e === void 0 ? "loaded this week unavailable" : `${Q(e)} loaded this week`;
}
function Is(e) {
  const a = [`${Q(e.inFlight)} in flight`, qs(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${Q(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ne(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ne(e.p90)}`), a.join(" · ");
}
function Ms(e) {
  return e.startsWith(an) ? e.slice(an.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Bs({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ae(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${_e.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Ms(e) }) : /* @__PURE__ */ n("span", { className: _e.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Ps({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Lk({
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
        /* @__PURE__ */ n(Bs, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: _e.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: _e.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: _e.rollup, "aria-live": "polite", children: Is(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: _e.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Ps, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Oa, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Ds = "_head_kabyh_11", Os = "_line_kabyh_12", Hs = "_cHandle_kabyh_33", Fs = "_cName_kabyh_38", js = "_nameLine_kabyh_46", Ws = "_cLabel_kabyh_53", zs = "_cCap_kabyh_58", Gs = "_cShown_kabyh_63", Ks = "_name_kabyh_46", Us = "_noCap_kabyh_85", Vs = "_state_kabyh_99", Ys = "_handle_kabyh_104", Js = "_sub_kabyh_118", I = {
  head: Ds,
  line: Os,
  cHandle: Hs,
  cName: Fs,
  nameLine: js,
  cLabel: Ws,
  cCap: zs,
  cShown: Gs,
  name: Ks,
  noCap: Us,
  state: Vs,
  handle: Ys,
  sub: Js
}, Xs = "can't be hidden or collapsed", Qs = "terminal · counted, not a column";
function xk() {
  return /* @__PURE__ */ l("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function Zs(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function ed(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function nn(e) {
  return e.gate ? Xs : e.terminal ? Qs : ed(e.agentsMounted);
}
function ad(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function nd({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: I.cName, children: [
    /* @__PURE__ */ l("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    nn(e) && /* @__PURE__ */ n("span", { className: I.sub, children: nn(e) })
  ] });
}
function td(e) {
  return e === void 0 ? "" : String(e);
}
function rd(e) {
  return e === "" ? void 0 : Number(e);
}
function ld({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => ad(t, a),
      children: "⠿"
    }
  ) });
}
function od({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(x, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: td(a.cap), onChange: (r) => t({ ...a, cap: rd(r) }) }) });
}
function id({ stage: e, config: a, onChange: t }) {
  const r = Zs(e, a.shown);
  return /* @__PURE__ */ l("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(xe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function cd(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function Ak({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: I.line, "data-kind": cd(e), children: [
    /* @__PURE__ */ n(ld, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(nd, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(x, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(od, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(id, { stage: e, config: a, onChange: t })
  ] });
}
const sd = "_body_hn6d6_2", dd = "_head_hn6d6_9", ud = "_summary_hn6d6_19", hd = "_block_hn6d6_20", md = "_actionsBlock_hn6d6_21", wd = "_title_hn6d6_41", _d = "_note_hn6d6_46", vd = "_k_hn6d6_51", fd = "_kv_hn6d6_58", bd = "_row_hn6d6_64", pd = "_label_hn6d6_75", gd = "_value_hn6d6_84", Nd = "_quote_hn6d6_90", yd = "_actions_hn6d6_21", kd = "_resolve_hn6d6_103", M = {
  body: sd,
  head: dd,
  summary: ud,
  block: hd,
  actionsBlock: md,
  title: wd,
  note: _d,
  k: vd,
  kv: fd,
  row: bd,
  label: pd,
  value: gd,
  quote: Nd,
  actions: yd,
  resolve: kd
};
function $d(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Cd(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Sd(e) {
  const a = _a(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Rd(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...va(Sd(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ne(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...$d(e),
    ...Cd(e, a)
  ];
}
function Td({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function Ld({ item: e }) {
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
function Ek({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = $(), d = Rd(e, o);
  return /* @__PURE__ */ n(Je, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: M.body, children: [
    /* @__PURE__ */ n(Ld, { item: e }),
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
    /* @__PURE__ */ n(Td, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Ad = "_root_3azmy_2", Ed = "_list_3azmy_7", qd = "_item_3azmy_12", Id = "_box_3azmy_18", Md = "_text_3azmy_23", Bd = "_note_3azmy_28", Pe = {
  root: Ad,
  list: Ed,
  item: qd,
  box: Id,
  text: Md,
  note: Bd
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
const Pd = "_rail_ke7ch_2", Dd = "_k_ke7ch_11", Od = "_head_ke7ch_19", Hd = "_section_ke7ch_25", Fd = "_card_ke7ch_38", jd = "_strip_ke7ch_42", Wd = "_skeleton_ke7ch_56", zd = "_skeletonLabel_ke7ch_70", Gd = "_bar_ke7ch_76", Kd = "_note_ke7ch_85", ce = {
  rail: Pd,
  k: Dd,
  head: Od,
  section: Hd,
  card: Fd,
  strip: jd,
  skeleton: Wd,
  skeletonLabel: zd,
  bar: Gd,
  note: Kd
};
function Ud(e) {
  return (a) => e == null ? void 0 : e(a);
}
function $a({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: ce.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: ce.k, children: e }),
    a
  ] });
}
function Vd({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: ce.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: ce.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: ce.bar, "aria-hidden": "true" }, r))
  ] });
}
function Yd({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(gs, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function Jd(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Yd, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Vd, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function qk(e) {
  const a = Ud(e.onOpen), t = kn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: ce.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${ce.k} ${ce.head}`, children: "Live preview" }),
    /* @__PURE__ */ n($a, { title: "Card", children: /* @__PURE__ */ n("div", { className: ce.card, children: t && /* @__PURE__ */ n(pa, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l($a, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: ce.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Jd, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: ce.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n($a, { title: "Effect of this config", children: /* @__PURE__ */ n(ga, { items: e.effects, density: "compact" }) })
  ] });
}
function Xd(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Qd(e) {
  return Math.ceil(e.length / 2);
}
function Zd(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function $n(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function eu(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = $n(e);
  o !== void 0 && t(o), r(Zd(e.type));
}
function au(e, a, t, r, o) {
  A(() => {
    if (e !== null)
      return e.subscribe(a, (i) => eu(i, t, r, o));
  }, [e, a, t, r, o]);
}
function nu(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function tu(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function ru(e, a) {
  return a !== void 0 ? ne(e.timeInStage) + " · waits on " + a.agent : ne(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function lu(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(Qd(a ?? [])) + ")"
  };
}
function ou(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function iu(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: J(e.cost) }) : null;
}
function cu(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function su(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function du(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function uu(e, a) {
  return a === void 0 ? e : Xd(e, a.ref);
}
function hu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ve(e) {
  return e === !0 ? "true" : void 0;
}
function Cn(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = ea(o), c = N(/* @__PURE__ */ new Set()), [s, u] = g(nu(a));
  au(e.feed, a.key, c, u, i);
  const d = tu(a, r), h = ru(a, t), _ = lu(a, e.fields), b = du(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...hu(e),
      className: "ward-workcard",
      "data-flagged": Ve(a.flagged),
      "data-selected": Ve(e.selected),
      style: _,
      ref: uu(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        ou(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          iu(a, e.fields),
          cu(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          su(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function mu({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function wu(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function _u(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function vu(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(mu, { count: e.items.length, cap: e.column.cap });
}
function fu(e, a) {
  return e.roving ?? a;
}
function bu(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function pu(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    Cn,
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
function gu(e) {
  const a = $(), t = ha({ orientation: "vertical" }), r = fu(e, t), o = wu(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ve(o), "data-gate": Ve(e.column.gate), children: [
    _u(e.column, e.items.length, a),
    vu(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...bu(e, t), children: pu(e, r) })
  ] });
}
function Nu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ne(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ne(e.p90)), a;
}
function yu(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function ku(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function Ik(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Nu(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      yu(e),
      ku(e.onConfigure),
      /* @__PURE__ */ n(Oa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function $u(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Cu(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(xe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(xe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Su(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(L, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function Mk(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": Ve($u(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Cu(e) }),
    /* @__PURE__ */ n(x, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(vn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Su(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function Bk(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Cn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(gu, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Ru(e, a) {
  const t = $n(e);
  t !== void 0 && a(t);
}
function Tu(e, a, t) {
  A(() => {
    if (e != null)
      return e.subscribe(a, (r) => Ru(r, t));
  }, [e, a, t]);
}
function Lu(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function xu(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ne(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", J(e.cost)]), a;
}
function Au(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Eu(e, a) {
  return /* @__PURE__ */ l(L, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function Pk(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = g((c = a.run) == null ? void 0 : c.lastStep);
  Tu(e.feed, a.key, o);
  const i = [...Lu(a), ...xu(a)];
  return /* @__PURE__ */ l(Je, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Au(t, r)
    ] }),
    Eu(a, e.actions)
  ] });
}
const qu = "_card_hvxp7_2", Iu = "_head_hvxp7_17", Mu = "_mark_hvxp7_25", Bu = "_name_hvxp7_37", Pu = "_chips_hvxp7_48", Du = "_description_hvxp7_54", Ou = "_run_hvxp7_59", Hu = "_sep_hvxp7_68", Fu = "_facts_hvxp7_73", ju = "_fact_hvxp7_73", Wu = "_factLabel_hvxp7_86", zu = "_factValue_hvxp7_90", X = {
  card: qu,
  head: Iu,
  mark: Mu,
  name: Bu,
  chips: Pu,
  description: Du,
  run: Ou,
  sep: Hu,
  facts: Fu,
  fact: ju,
  factLabel: Wu,
  factValue: zu
}, Gu = { live: "done", draft: "running", paused: "meta" };
function Ku(e) {
  return e === void 0 ? X.card : `${X.card} ${e}`;
}
function Uu({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: X.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Gu[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function Vu({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: X.description, children: e });
}
function Yu({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: X.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: X.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Ju({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: X.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: X.fact, children: [
    /* @__PURE__ */ n("dt", { className: X.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: X.factValue, children: a.value })
  ] }, a.label)) });
}
function Xu(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Qu({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, facts: i, className: c }) {
  const s = { "--stream": Ae(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": u,
      className: Ku(c),
      style: s,
      "data-selected": u,
      "data-paused": Xu(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: X.head, children: [
          /* @__PURE__ */ n("span", { className: X.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${X.name} ward-rowlink`, href: a, "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(Vu, { description: e.description }),
        /* @__PURE__ */ n(Yu, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Uu, { versions: e.versions }),
        /* @__PURE__ */ n(Ju, { facts: i })
      ]
    }
  );
}
const Zu = "_list_4dcyc_2", eh = "_row_4dcyc_11", ah = "_head_4dcyc_23", nh = "_id_4dcyc_30", th = "_lock_4dcyc_35", rh = "_reason_4dcyc_41", lh = "_remove_4dcyc_46", oh = "_clauses_4dcyc_50", ih = "_clause_4dcyc_50", ch = "_label_4dcyc_64", sh = "_cell_4dcyc_71", dh = "_value_4dcyc_76", ae = {
  list: Zu,
  row: eh,
  head: ah,
  id: nh,
  lock: th,
  reason: rh,
  remove: lh,
  clauses: oh,
  clause: ih,
  label: ch,
  cell: sh,
  value: dh
}, Sn = ze(!1);
function Dk({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Sn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ae.list, "aria-label": a, children: e }) });
}
function uh({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ae.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(x, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => t(e.key, o) });
}
function hh({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ae.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ae.reason, children: e })
  ] });
}
function mh({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: ae.head, children: [
    /* @__PURE__ */ n("span", { className: ae.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(hh, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ae.remove, children: /* @__PURE__ */ l(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function tn(e, a) {
  return e.locked ? void 0 : a;
}
function Ok({ rule: e, onChange: a, onRemove: t }) {
  if (!We(Sn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = tn(e, a);
  return /* @__PURE__ */ l("li", { className: ae.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(mh, { rule: e, onRemove: tn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ae.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ae.clause, children: [
      /* @__PURE__ */ n("dt", { className: ae.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ae.cell, children: /* @__PURE__ */ n(uh, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const wh = "_ladder_wwnch_2", _h = "_cell_wwnch_7", vh = "_empty_wwnch_26", fh = "_name_wwnch_34", bh = "_holder_wwnch_40", ph = "_request_wwnch_46", gh = "_swatches_wwnch_51", Nh = "_swatch_wwnch_51", yh = "_tilesFrame_wwnch_78", kh = "_tiles_wwnch_78", $h = "_tile_wwnch_78", Ch = "_bar_wwnch_117", Sh = "_hex_wwnch_128", Rh = "_note_wwnch_138", R = {
  ladder: wh,
  cell: _h,
  empty: vh,
  name: fh,
  holder: bh,
  request: ph,
  swatches: gh,
  swatch: Nh,
  tilesFrame: yh,
  tiles: kh,
  tile: $h,
  bar: Ch,
  hex: Sh,
  note: Rh
}, Th = "not validated — needs CVD matrix and dark stepping";
function Lh(e) {
  return e.reserved ? "reserved" : wa(e.step) ? "validated" : "partial";
}
function Rn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function xh(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Ah({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ee, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Eh(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function qh(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const rn = (e) => String(e).padStart(2, "0");
function Ih(e, a, t) {
  return e === "reserved" ? "Reserved — needs revalidation" : t ? "yours" : a ?? Rn(e, void 0);
}
function Mh({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: r ? `step ${rn(e)}` : Nt(e) }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: r ? t : `Step ${rn(e)} · ${t}` })
  ] });
}
function Bh({ step: e, value: a, taken: t, onChange: r, presentation: o }) {
  const i = Lh(e), c = Rn(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, _ = `${d} — ${o === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...qh(s, u), "data-validation": i, style: xh(e, i), onClick: h, onKeyDown: (E) => Eh(E, h) }, label: _, name: d, holder: c, validation: i, note: Ih(i, t, u), step: e.step };
}
const Ph = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${R.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${R.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Mh, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${R.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Ah, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Dh(e) {
  return Ph[e.presentation](Bh(e));
}
function Oh(e) {
  for (const a of e)
    if (!a.reserved && !ma(a.step)) throw new Error("colour ladder renders token steps only");
}
function Hh() {
  return /* @__PURE__ */ l("div", { className: `${R.cell} ward-ladder-cell ${R.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Fh(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const jh = { list: R.ladder, swatches: R.swatches, tiles: R.tilesFrame };
function Wh() {
  return /* @__PURE__ */ l("div", { className: `${R.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const zh = { list: Hh, swatches: () => null, tiles: Wh };
function Tn(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  Oh(e.steps);
  const r = Fh(e), o = zh[r], i = /* @__PURE__ */ l(L, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(Dh, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${jh[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: R.tiles, children: i }) : i });
}
const Gh = "_rail_1el2t_2", Kh = "_section_1el2t_12", Uh = "_sectionFlush_1el2t_22", Vh = "_head_1el2t_26", Yh = "_headLabel_1el2t_34", Jh = "_sample_1el2t_42", Xh = "_sampleLabel_1el2t_47", Qh = "_sampleTitle_1el2t_54", Zh = "_sampleMeta_1el2t_59", em = "_trace_1el2t_65", am = "_traceHead_1el2t_70", nm = "_steps_1el2t_78", tm = "_step_1el2t_78", rm = "_stepTitle_1el2t_97", lm = "_hollow_1el2t_107", om = "_stepBody_1el2t_115", im = "_stepDetail_1el2t_127", cm = "_publish_1el2t_132", sm = "_reason_1el2t_138", dm = "_note_1el2t_143", um = "_reveal_1el2t_148", p = {
  rail: Gh,
  section: Kh,
  sectionFlush: Uh,
  head: Vh,
  headLabel: Yh,
  sample: Jh,
  sampleLabel: Xh,
  sampleTitle: Qh,
  sampleMeta: Zh,
  trace: em,
  traceHead: am,
  steps: nm,
  step: tm,
  stepTitle: rm,
  hollow: lm,
  stepBody: om,
  stepDetail: im,
  publish: cm,
  reason: sm,
  note: dm,
  reveal: um
}, ln = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, hm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, mm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, wm = { notSimulated: "not simulated", running: "running" };
function _m(e) {
  return e.presentation === "foundry";
}
function vm(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function fm(e, a) {
  var r;
  const t = hm[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function bm(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function pm(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function gm(e) {
  if (bm(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Nm(e) {
  const [a, t] = g(!1);
  A(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function ym(e) {
  const a = wm[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ee, { size: 6, kind: mm[e.kind], label: e.kind });
}
function km(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function $m(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Cm(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(Nm, { kind: a.kind, children: [
    /* @__PURE__ */ n(ym, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(km, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n($m, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Sm(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ne(a)), t.join(" · ");
}
function Ln(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: Sm(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Cm, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Rm(e) {
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
function Tm(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + te(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Lm(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : J(e.run.cost), label: "Cost" }, { value: e.run.turns ? mn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(fa, { divided: !0, cells: a }) });
}
function xm(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: J(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: mn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Am(e) {
  const a = xm(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(fa, { divided: !0, cells: a }) });
}
function xn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Em(e) {
  return /* @__PURE__ */ l("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(xn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function qm(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(xn, { reason: e.reason, onPublish: e.onPublish }) });
}
function An(e) {
  return /* @__PURE__ */ l("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: ln[e.run.status].role, label: ln[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Im(e, a) {
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
function Mm(e) {
  var t;
  pm(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(An, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Rm, { sample: e.run.sample }),
    /* @__PURE__ */ n(Ln, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Lm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(ga, { items: e.checklist }) }),
    /* @__PURE__ */ n(Em, { reason: vm(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Bm(e) {
  var r;
  const a = Im(e.run, e.feed);
  gm(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(An, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Tm, { sample: e.run.sample }),
    /* @__PURE__ */ n(Ln, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Am, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(ga, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(qm, { reason: fm(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Hk(e) {
  return _m(e) ? /* @__PURE__ */ n(Bm, { ...e }) : /* @__PURE__ */ n(Mm, { ...e });
}
const Pm = "_list_142ip_3", Dm = "_row_142ip_9", Om = "_condition_142ip_18", Hm = "_action_142ip_24", aa = {
  list: Pm,
  row: Dm,
  condition: Om,
  action: Hm
}, En = ze(!1);
function Fk({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(En.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: aa.list, "aria-label": a, children: e }) });
}
function jk({ rule: e }) {
  if (!We(En)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
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
function qn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function In(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function on(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Fm(e) {
  return e === "up" ? "down" : "up";
}
function jm(e, a) {
  const t = on(e, a.id, a.direction) ?? on(e, a.id, Fm(a.direction));
  t == null || t.focus();
}
function Mn() {
  const e = N(null), [a, t] = g(null), [r, o] = g("");
  return A(() => {
    e.current !== null && a !== null && jm(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), o(s);
  } };
}
function Bn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ca({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Wm = "_body_1h15q_2", zm = "_title_1h15q_8", Gm = "_section_1h15q_13", Km = "_legend_1h15q_18", Um = "_stages_1h15q_26", Vm = "_stage_1h15q_26", Ym = "_stageIndex_1h15q_44", Jm = "_stageName_1h15q_50", Xm = "_footer_1h15q_59", Qm = "_note_1h15q_66", Zm = "_reason_1h15q_71", ew = "_actions_1h15q_76", aw = "_webHead_1h15q_83", nw = "_kicker_1h15q_92", tw = "_webTitle_1h15q_99", rw = "_webBody_1h15q_105", lw = "_webSection_1h15q_109", ow = "_sectionHead_1h15q_121", iw = "_sectionNote_1h15q_129", cw = "_formLabel_1h15q_134", sw = "_identityRow_1h15q_139", dw = "_nameCell_1h15q_145", uw = "_keyCell_1h15q_150", hw = "_colourCell_1h15q_154", mw = "_colourStatus_1h15q_161", ww = "_webStages_1h15q_166", _w = "_webStageList_1h15q_172", vw = "_webStage_1h15q_166", fw = "_webIndex_1h15q_191", bw = "_webStageName_1h15q_196", pw = "_webMoves_1h15q_201", gw = "_addStage_1h15q_215", Nw = "_addStageButton_1h15q_223", yw = "_addStageNote_1h15q_231", kw = "_webFooter_1h15q_236", $w = "_webFooterNotes_1h15q_244", Cw = "_webNote_1h15q_251", w = {
  body: Wm,
  title: zm,
  section: Gm,
  legend: Km,
  stages: Um,
  stage: Vm,
  stageIndex: Ym,
  stageName: Jm,
  footer: Xm,
  note: Qm,
  reason: Zm,
  actions: ew,
  webHead: aw,
  kicker: nw,
  webTitle: tw,
  webBody: rw,
  webSection: lw,
  sectionHead: ow,
  sectionNote: iw,
  formLabel: cw,
  identityRow: sw,
  nameCell: dw,
  keyCell: uw,
  colourCell: hw,
  colourStatus: mw,
  webStages: ww,
  webStageList: _w,
  webStage: vw,
  webIndex: fw,
  webStageName: bw,
  webMoves: pw,
  addStage: gw,
  addStageButton: Nw,
  addStageNote: yw,
  webFooter: kw,
  webFooterNotes: $w,
  webNote: Cw
}, Sw = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Pn = "not in catalogue";
function Rw(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} — ${Pn}` }, ...t];
}
function Tw({ stage: e, index: a, catalogue: t, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(x, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Pn}`;
  return /* @__PURE__ */ n(x, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: Rw(t, e.name), invalid: i, onChange: r });
}
function Dn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Lw(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function xw({ id: e, stage: a, index: t, total: r, catalogue: o, onReplace: i, onMove: c }) {
  const s = Dn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(Tw, { stage: a, index: t, catalogue: o, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(x, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Sw, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ca, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ca, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function Aw({ stages: e, onChange: a, catalogue: t }) {
  const r = Lw(e.length), o = Mn(), i = (s, u) => {
    const d = qn(s, u);
    r.current = Aa(r.current, s, d), o.moved({ id: r.current[d], direction: u }, In(Dn(e[s], s), d, e.length)), a(Aa(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(xw, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Bn, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Ew = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], qw = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Iw = "A new stream starts as a draft. Nothing runs on it until you publish it.", Mw = "Create is disabled: name the stream and give it a key first.", Bw = "reorder with the ↑ ↓ buttons · min 2";
function Ha(e, a) {
  return !e.reserved && wa(e.step) && a[e.step] === void 0;
}
function Pw(e, a) {
  const t = e.find((r) => Ha(r, a));
  return t ? t.step : 1;
}
function Dw({ stages: e, onMove: a }) {
  const t = Mn(), r = (o, i) => {
    const c = qn(o, i);
    t.moved({ id: e[o].id, direction: i }, In(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: w.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ca, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ca, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Bn, { text: t.announcement })
  ] });
}
function Ow({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: Iw }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Hw(e, a) {
  return e !== "" && a !== "" ? null : Mw;
}
function Fw(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = qw, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = $(), [h, _] = g(""), [b, E] = g(""), [Z, ee] = g(a[0].value), [re, qe] = g(() => Pw(t, r)), [le, Ie] = g(e.stages ?? Ew), [Me, k] = g(o[0].value), F = { name: h, key: b, streamStep: re, owner: Z, stages: le, policy: Me }, he = Hw(h, b);
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
      /* @__PURE__ */ n(Tn, { label: "Stream colour", steps: t, value: re, onChange: qe, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(Dw, { stages: le, onMove: ($e, nt) => Ie(Aa(le, $e, nt)) })
    ] }),
    /* @__PURE__ */ n(gn, { legend: "Loop policy", options: o, value: Me, onChange: k }),
    /* @__PURE__ */ n(Ow, { reason: he, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const On = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], jw = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function Ww(e, a, t, r, o, i) {
  var s;
  const c = ((s = On.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function zw(e, a) {
  return Gw(e) && Kw(e, a) && Uw(e);
}
function Gw(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Kw(e, a) {
  return e.colourStep !== null && Ha({ step: e.colourStep }, a);
}
function Uw(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Vw(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${Th}.` : Ha({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Yw({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Jw({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Yw, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: jw })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Xw({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function Qw({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
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
function Zw(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [o, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, E] = g("relay"), [Z, ee] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), re = Ww(o, c, u, h, b, Z), qe = zw(re, r), le = Z.find((k) => k.kind === "agent" && k.name.trim() !== ""), Ie = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Tn, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), Me = /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: Vw(h, r) }),
    /* @__PURE__ */ n(x, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map((k) => ({ value: k, label: k })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Je, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Xw, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(Qw, { name: o, setName: i, streamKey: c, setKey: s, colour: Ie, owner: Me }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: Bw })
        ] }),
        /* @__PURE__ */ n(Aw, { stages: Z, onChange: ee })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(gn, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: On, onChange: E }) }),
      /* @__PURE__ */ n(Jw, { ready: qe, draft: re, agentStage: le, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function Wk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Zw, { ...e }) : /* @__PURE__ */ n(Fw, { ...e });
}
const e_ = "_row_bs8hc_2", a_ = "_cell_bs8hc_6", n_ = "_condition_bs8hc_11", t_ = "_action_bs8hc_18", r_ = "_contract_bs8hc_24", l_ = "_contractCondition_bs8hc_33", o_ = "_contractAction_bs8hc_39", U = {
  row: e_,
  cell: a_,
  condition: n_,
  action: t_,
  contract: r_,
  contractCondition: l_,
  contractAction: o_
}, Hn = ["advance", "block", "escalate", "requestReview"], cn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function sa(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Fa(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: U.action, children: cn[e.then] }) : /* @__PURE__ */ n(
    x,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => a({ ...e, then: o }),
      options: Hn.map((o) => ({ value: o, label: cn[o] }))
    }
  );
}
function i_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: U.row, children: [
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: U.condition, title: sa(e, r), children: sa(e, r) }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: Fa(e, a, t) })
  ] });
}
function c_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: U.row, children: [
    /* @__PURE__ */ l("td", { className: U.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: U.condition, children: sa(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: U.cell, children: Fa(e, a, t) })
  ] });
}
function s_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: U.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: U.contractCondition, children: sa(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: U.contractAction, children: Fa(e, a, t, !0) })
  ] });
}
const d_ = { two: c_, four: i_, contract: s_ };
function zk(e) {
  var t;
  if (!Hn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = d_[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const u_ = "_column_lurgk_2", h_ = "_head_lurgk_17", m_ = "_index_lurgk_23", w_ = "_name_lurgk_29", __ = "_meta_lurgk_38", v_ = "_mono_lurgk_43", f_ = "_gate_lurgk_50", b_ = "_reviewersLabel_lurgk_57", p_ = "_reviewers_lurgk_57", g_ = "_reviewer_lurgk_57", N_ = "_agents_lurgk_74", y_ = "_workflowColumn_lurgk_79", k_ = "_workflowHead_lurgk_96", $_ = "_stageRow_lurgk_102", C_ = "_stageLabel_lurgk_109", S_ = "_workflowTitle_lurgk_116", R_ = "_workflowMeta_lurgk_122", T_ = "_workflowGate_lurgk_127", L_ = "_gateNote_lurgk_135", x_ = "_cardNote_lurgk_140", A_ = "_reviewerList_lurgk_149", E_ = "_reviewerRow_lurgk_155", q_ = "_reviewerMark_lurgk_161", I_ = "_reviewerName_lurgk_171", M_ = "_terminalCard_lurgk_177", B_ = "_terminalCount_lurgk_186", P_ = "_workflowAgents_lurgk_192", D_ = "_mount_lurgk_198", y = {
  column: u_,
  head: h_,
  index: m_,
  name: w_,
  meta: __,
  mono: v_,
  gate: f_,
  reviewersLabel: b_,
  reviewers: p_,
  reviewer: g_,
  agents: N_,
  workflowColumn: y_,
  workflowHead: k_,
  stageRow: $_,
  stageLabel: C_,
  workflowTitle: S_,
  workflowMeta: R_,
  workflowGate: T_,
  gateNote: L_,
  cardNote: x_,
  reviewerList: A_,
  reviewerRow: E_,
  reviewerMark: q_,
  reviewerName: I_,
  terminalCard: M_,
  terminalCount: B_,
  workflowAgents: P_,
  mount: D_
}, O_ = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function ja(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Fn(e) {
  return `${Math.round(e * 100)}%`;
}
function H_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(fa, { cells: [
      { value: Fn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: Q(e.count), label: "In stage" }
    ] })
  ] });
}
function F_({ stage: e }) {
  return /* @__PURE__ */ n(fa, { cells: [
    { value: Q(e.count), label: "In stage" },
    { value: ja(e.closedThisWeek, Q), label: "Closed this week" }
  ] });
}
function j_({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: O_[e.kind] })
  ] });
}
function W_({ stage: e }) {
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
function z_({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(H_, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(F_, { stage: e }) : null;
}
function G_({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function K_({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(j_, { stage: e, titleId: o }),
    /* @__PURE__ */ n(W_, { stage: e }),
    /* @__PURE__ */ n(z_, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(Qu, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(G_, { onMount: t })
  ] });
}
const U_ = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function V_({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function Y_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(V_, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Fn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function J_({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: ja(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: "items closed this week" })
  ] });
}
function X_(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Q_(e) {
  if (e.kind === "terminal") return `${ja(e.closedThisWeek)} this week`;
  const a = X_(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Z_({ stage: e, titleId: a }) {
  const t = U_[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: Q_(e) })
  ] });
}
function ev(e) {
  return e === "entry" || e === "agent";
}
function av({ stage: e, onMount: a }) {
  return a === void 0 || !ev(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function nv({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Z_, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Y_, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(J_, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(av, { stage: e, onMount: t })
  ] });
}
function tv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function Gk(e) {
  return tv(e) ? /* @__PURE__ */ n(nv, { ...e }) : /* @__PURE__ */ n(K_, { ...e });
}
const rv = "_row_ve78g_6", lv = "_cell_ve78g_10", ov = "_name_ve78g_19", iv = "_chain_ve78g_26", cv = "_owner_ve78g_32", sv = "_mono_ve78g_38", dv = "_compactRow_ve78g_45", uv = "_compactCell_ve78g_54", hv = "_stack_ve78g_71", mv = "_stat_ve78g_78", wv = "_identityLine_ve78g_85", _v = "_identity_ve78g_85", vv = "_compactName_ve78g_103", fv = "_ownerLine_ve78g_117", bv = "_link_ve78g_130", pv = "_emptyChain_ve78g_136", gv = "_arrow_ve78g_142", Nv = "_muted_ve78g_143", yv = "_define_ve78g_148", kv = "_statValue_ve78g_155", $v = "_policyId_ve78g_161", Cv = "_sub_ve78g_166", f = {
  row: rv,
  cell: lv,
  name: ov,
  chain: iv,
  owner: cv,
  mono: sv,
  compactRow: dv,
  compactCell: uv,
  stack: hv,
  stat: mv,
  identityLine: wv,
  identity: _v,
  compactName: vv,
  ownerLine: fv,
  link: bv,
  emptyChain: pv,
  arrow: gv,
  muted: Nv,
  define: yv,
  statValue: kv,
  policyId: $v,
  sub: Cv
};
function Sv(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Rv(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function Tv(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${e.members} members`;
}
function Lv(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Tv(e) })
  ] }) });
}
function xv(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function Av(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : xv(e) });
}
function sn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function Ev(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function qv(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Iv({ stream: e, href: a, presentation: t }) {
  const r = Rv(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ae(e.streamStep, "chip") }, children: [
    Lv(e, a),
    Av(e.stages, a),
    sn(qv(e.agents), e.agents === void 0 ? void 0 : Sv(e.agents), "—"),
    Ev(e.policy),
    sn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function Mv(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function Kk(e) {
  if (Mv(e)) return Iv(e);
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
const Bv = "_row_1nbe9_2", Pv = "_name_1nbe9_15", Dv = "_scope_1nbe9_25", da = {
  row: Bv,
  name: Pv,
  scope: Dv
};
function Ov(e) {
  return e === void 0 ? `${da.row} ward-toolrow` : `${da.row} ward-toolrow ${e}`;
}
function Hv(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Fv({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
function jv({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Wv({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${da.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function zv(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Uk({ tool: e, onChange: a, presentation: t }) {
  const r = $(), o = $(), i = Hv(e, t), c = zv(t);
  return /* @__PURE__ */ l(c, { className: Ov(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Fv, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${da.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Wv, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(jv, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Gv = "_strip_g84q9_2", Kv = "_head_g84q9_10", Uv = "_name_g84q9_16", Vv = "_chart_g84q9_24", Yv = "_segment_g84q9_30", Jv = "_detailedChart_g84q9_36", pe = {
  strip: Gv,
  head: Kv,
  name: Uv,
  chart: Vv,
  segment: Yv,
  detailedChart: Jv
}, Ea = [1, 2, 3, 4, 5, 6], ua = 100;
function Xv(e, a) {
  return a.has(e) ? Ae(e, "id") : "var(--ward-color-line)";
}
function Qv({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: pe.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ea.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: pe.segment,
      x: o * ua,
      y: "0",
      width: ua,
      height: "8",
      fill: Xv(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Zv(e) {
  const a = e.slice(0, Ea.length);
  for (; a.length < Ea.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function ef({ identities: e }) {
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
function jn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function af(e) {
  const a = Zv(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("section", { className: `${pe.strip} ward-appearance`, "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(pa, { item: { ...e.sample, streamStep: _a(t.streamStep) }, onOpen: jn(e.onOpen), feed: null }),
    /* @__PURE__ */ l("p", { className: `${pe.head} ward-envrow ward-appearance-head`, children: [
      /* @__PURE__ */ n("span", { className: "ward-identity", "aria-hidden": "true" }),
      /* @__PURE__ */ n(m, { ...va(t.key, t.streamStep) }),
      /* @__PURE__ */ n("span", { className: `${pe.name} ward-rowlink`, children: t.name })
    ] }),
    /* @__PURE__ */ n("p", { className: "ward-checklist-note", children: "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on." }),
    /* @__PURE__ */ n(ef, { identities: a })
  ] });
}
function nf({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": Ae(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: pe.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: pe.head, children: [
      /* @__PURE__ */ n(Ee, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: pe.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...va(e.key, e.streamStep) })
    ] }),
    /* @__PURE__ */ n(pa, { item: { ...a, streamStep: e.streamStep }, onOpen: jn(r) }),
    /* @__PURE__ */ n(Qv, { draft: e, streams: t })
  ] });
}
function Vk(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(af, { ...e }) : /* @__PURE__ */ n(nf, { ...e });
}
const tf = "_row_ixlg5_6", rf = "_headCell_ixlg5_10", lf = "_cell_ixlg5_11", of = "_name_ixlg5_23", cf = "_consequence_ixlg5_29", sf = "_governed_ixlg5_36", df = "_control_ixlg5_42", uf = "_byRole_ixlg5_48", hf = "_webControl_ixlg5_59", mf = "_webConsequence_ixlg5_65", wf = "_webGoverned_ixlg5_71", P = {
  row: tf,
  headCell: rf,
  cell: lf,
  name: of,
  consequence: cf,
  governed: sf,
  control: df,
  byRole: uf,
  webControl: hf,
  webConsequence: mf,
  webGoverned: wf
};
function _f({
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
function vf({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(_f, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function ff(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function bf({ name: e, cell: a, onChange: t }) {
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
function pf({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(bf, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: ff(e) }) })
  ] });
}
function Yk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(pf, { ...e }) : /* @__PURE__ */ n(vf, { ...e });
}
const gf = "_row_vv64h_2", Nf = "_cell_vv64h_6", yf = "_name_vv64h_25", kf = "_note_vv64h_30", $f = "_webName_vv64h_41", Cf = "_webMeta_vv64h_47", z = {
  row: gf,
  cell: Nf,
  name: yf,
  note: kf,
  webName: $f,
  webMeta: Cf
}, Wn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Sf(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Rf({ component: e, onRestart: a }) {
  const t = $(), r = Wn[e.state], o = e.state === "drainFirst";
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
function Tf({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: Sf(e.state) });
}
function Lf({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { ...Wn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(Tf, { component: e, onRestart: a }) })
  ] });
}
function Jk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Lf, { ...e }) : /* @__PURE__ */ n(Rf, { ...e });
}
const xf = "_row_1f1gp_7", Af = "_cell_1f1gp_11", Ef = "_next_1f1gp_28", qf = "_headCell_1f1gp_38", If = "_webId_1f1gp_77", Mf = "_webPurpose_1f1gp_83", Bf = "_webMeta_1f1gp_91", Pf = "_webUrgent_1f1gp_97", O = {
  row: xf,
  cell: Af,
  next: Ef,
  headCell: qf,
  webId: If,
  webPurpose: Mf,
  webMeta: Bf,
  webUrgent: Pf
}, Df = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Of = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, zn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Hf = Object.fromEntries(zn.map((e) => [e.key, e]));
function De({ column: e, children: a }) {
  const t = Hf[e];
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
function Xk() {
  return /* @__PURE__ */ n("tr", { children: zn.map((e) => /* @__PURE__ */ n(
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
function Ff({ cred: e }) {
  const a = Df[e.state];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n(De, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(De, { column: "id", children: e.id }),
    /* @__PURE__ */ n(De, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(De, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(De, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(De, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function jf({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function Wf({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(jf, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...Of[e.state] }) })
  ] });
}
function Qk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Wf, { ...e }) : /* @__PURE__ */ n(Ff, { ...e });
}
const zf = "_card_17zba_2", Gf = "_head_17zba_11", Kf = "_env_17zba_18", Uf = "_version_17zba_25", Vf = "_meta_17zba_32", Yf = "_webCard_17zba_37", Jf = "_webRow_17zba_47", Xf = "_webTitle_17zba_55", Qf = "_webLine_17zba_65", Zf = "_webVersion_17zba_72", eb = "_webMeta_17zba_77", W = {
  card: zf,
  head: Gf,
  env: Kf,
  version: Uf,
  meta: Vf,
  webCard: Yf,
  webRow: Jf,
  webTitle: Xf,
  webLine: Qf,
  webVersion: Zf,
  webMeta: eb
}, Gn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function ab({ env: e }) {
  const a = Gn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function nb(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [te(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function tb(e) {
  return /* @__PURE__ */ l("article", { className: `${W.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${W.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${W.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Gn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${W.version} ${W.webVersion} ${W.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${W.meta} ${W.webMeta} ${W.webLine} ward-cellmeta`, children: nb(e) })
  ] });
}
function Zk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(tb, { ...e }) : /* @__PURE__ */ n(ab, { ...e });
}
const rb = "_upload_erepj_2", lb = "_preview_erepj_7", ob = "_mark_erepj_17", ib = "_empty_erepj_22", cb = "_actions_erepj_28", sb = "_input_erepj_33", db = "_reasons_erepj_41", ub = "_reason_erepj_41", hb = "_accepted_erepj_57", Y = {
  upload: rb,
  preview: lb,
  mark: ob,
  empty: ib,
  actions: cb,
  input: sb,
  reasons: db,
  reason: ub,
  accepted: hb
}, Kn = 1.5, Un = 22, Ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Kn}px at ${Un}px`];
function mb() {
  return { ok: !1, reasons: [Ye[1]] };
}
function wb(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function _b(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ye[0]] : [];
}
function vb(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ye[1]), e.querySelector("text") !== null && t.push(Ye[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function fb(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? Un / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Kn;
  }) ? [Ye[3]] : [];
}
function e1(e) {
  const a = wb(e);
  if (a === null) return mb();
  const t = [..._b(a), ...vb(a, e), ...fb(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const bb = "Mark accepted.";
function pb({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: Y.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: Y.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: Y.empty }) });
}
function gb(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Nb(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function yb({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: Y.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: Y.result, role: "status", children: /* @__PURE__ */ n("p", { className: Y.accepted, children: bb }) }) : /* @__PURE__ */ n("div", { className: Y.result, role: "status", children: /* @__PURE__ */ n("ul", { className: Y.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: Y.reason, children: a }, a)) }) });
}
function kb({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(yb, { result: e }) : /* @__PURE__ */ n("p", { className: `${Y.result} ${gb(e, t)}`, role: "status", children: Nb(e, t) });
}
function a1({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: Y.upload, children: [
    /* @__PURE__ */ n(pb, { current: e }),
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
    /* @__PURE__ */ n(kb, { result: i, presentation: r })
  ] });
}
const $b = "_row_1wp9s_7", Cb = "_cell_1wp9s_11", Sb = "_head_1wp9s_28", Rb = "_name_1wp9s_34", Tb = "_pinned_1wp9s_42", Lb = "_headCell_1wp9s_49", xb = "_webName_1wp9s_88", Ab = "_webMeta_1wp9s_95", Eb = "_webWarn_1wp9s_103", q = {
  row: $b,
  cell: Cb,
  head: Sb,
  name: Rb,
  pinned: Tb,
  headCell: Lb,
  webName: xb,
  webMeta: Ab,
  webWarn: Eb
}, Wa = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, Vn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], qb = Object.fromEntries(Vn.map((e) => [e.key, e]));
function Ib(e, a) {
  return `mcp.${e}.${a}`;
}
function Mb(e) {
  return Object.keys(Wa).includes(e);
}
function Bb(e) {
  return Wa[e !== void 0 && Mb(e) ? e : "unknown"];
}
function Ge({ column: e, children: a }) {
  const t = qb[e];
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
function n1() {
  return /* @__PURE__ */ n("tr", { children: Vn.map((e) => /* @__PURE__ */ n(
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
function Pb({ server: e }) {
  const a = Wa[e.connection];
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
    /* @__PURE__ */ n(Ge, { column: "tools", children: e.tools.map((t) => Ib(e.name, t)).join(" · ") })
  ] });
}
function Db(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Ob(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Hb({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Fb({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function jb({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Wb({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Db(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Ob(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Hb, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Bb(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n(Fb, { server: e, onRestart: a }),
      /* @__PURE__ */ n(jb, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function t1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Wb, { ...e }) : /* @__PURE__ */ n(Pb, { ...e });
}
const zb = "_row_1h9nq_2", Gb = "_headCell_1h9nq_14", Kb = "_cell_1h9nq_15", Ub = "_name_1h9nq_26", Vb = "_consequence_1h9nq_32", Yb = "_reason_1h9nq_38", Jb = "_value_1h9nq_44", Xb = "_webRow_1h9nq_60", Qb = "_webSetting_1h9nq_71", Zb = "_webName_1h9nq_79", ep = "_webConsequence_1h9nq_87", ap = "_webControl_1h9nq_93", np = "_webState_1h9nq_106", tp = "_webChip_1h9nq_111", T = {
  row: zb,
  headCell: Gb,
  cell: Kb,
  name: Ub,
  consequence: Vb,
  reason: Yb,
  value: Jb,
  webRow: Xb,
  webSetting: Qb,
  webName: Zb,
  webConsequence: ep,
  webControl: ap,
  webState: np,
  webChip: tp
}, Yn = 104, Jn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function rp({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(xe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(fn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: T.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function lp({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = $(), i = Jn[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: T.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: T.headCell, children: [
      /* @__PURE__ */ n("span", { className: T.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: T.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: T.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: T.cell, children: /* @__PURE__ */ n(rp, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: T.cell, style: { width: Yn }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Xn(e, a) {
  return String(e ?? a);
}
function op(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function ip(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Xn(e.value, "—");
}
function cp({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: T.webControl, children: [
    /* @__PURE__ */ n(xe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: T.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function sp(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(cp, { ...e });
  const o = op(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: T.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(fn, { options: o, value: Xn(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${T.webControl} ${T.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: ip(a) });
}
function dp({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = $(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${T.row} ${T.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: T.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${T.name} ${T.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${T.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: T.webControl, children: i(c) }) : /* @__PURE__ */ n(sp, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${T.webChip} ward-policy-chip`, style: { width: Yn }, children: /* @__PURE__ */ n(m, { ...Jn[t], size: "tag" }) })
  ] });
}
function r1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(dp, { ...e }) : /* @__PURE__ */ n(lp, { ...e });
}
const up = "_label_1o9za_7", hp = "_name_1o9za_15", mp = "_column_1o9za_24", wp = "_webFrame_1o9za_57", _p = "_webHead_1o9za_62", vp = "_webHeadLabel_1o9za_74", fp = "_webLabel_1o9za_112", bp = "_webColumns_1o9za_119", pp = "_webGroup_1o9za_125", gp = "_webPeople_1o9za_126", Np = "_webVia_1o9za_127", yp = "_webMeta_1o9za_156", H = {
  label: up,
  name: hp,
  column: mp,
  webFrame: wp,
  webHead: _p,
  webHeadLabel: vp,
  webLabel: fp,
  webColumns: bp,
  webGroup: pp,
  webPeople: gp,
  webVia: Np,
  webMeta: yp
}, kp = {
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
function $p(e) {
  if (!e.matrixRole) return;
  const a = kp[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Cp({ node: e }) {
  const a = $p(e);
  return /* @__PURE__ */ l("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(Sp, { role: a, node: e }),
    /* @__PURE__ */ n(Sa, { column: Ca[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Sa, { column: Ca[1], children: e.people === void 0 ? "" : Q(e.people) }),
    /* @__PURE__ */ n(Sa, { column: Ca[2], children: e.requestedVia ?? "" })
  ] });
}
function Sp({ role: e, node: a }) {
  return /* @__PURE__ */ l(L, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Rp({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    yn,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(Cp, { node: t }),
      children: c
    }
  );
}
function Ra({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Tp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Ra, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Ra, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Ra, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Lp() {
  return /* @__PURE__ */ l("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function xp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Ap(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Ep({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Lp, {}),
    /* @__PURE__ */ n(rc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      yn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(xp, { row: t }),
        detail: /* @__PURE__ */ n(Tp, { row: t }),
        expanded: Ap(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function l1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ep, { ...e }) : /* @__PURE__ */ n(Rp, { ...e });
}
const qp = "_runbook_b9agc_2", Ip = "_list_b9agc_7", Mp = "_step_b9agc_15", Bp = "_numeral_b9agc_21", Pp = "_body_b9agc_28", Dp = "_head_b9agc_34", Op = "_title_b9agc_40", Hp = "_detail_b9agc_45", Fp = "_actions_b9agc_50", jp = "_webList_b9agc_56", Wp = "_webStep_b9agc_60", zp = "_webBody_b9agc_66", Gp = "_webTitle_b9agc_74", Kp = "_webDetail_b9agc_78", S = {
  runbook: qp,
  list: Ip,
  step: Mp,
  numeral: Bp,
  body: Pp,
  head: Dp,
  title: Op,
  detail: Hp,
  actions: Fp,
  webList: jp,
  webStep: Wp,
  webBody: zp,
  webTitle: Gp,
  webDetail: Kp
}, Qn = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function Zn(e) {
  return String(e + 1).padStart(2, "0");
}
function Up({ step: e, index: a, connection: t }) {
  const r = Qn[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: Zn(a) }),
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
function Vp({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(Up, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function Yp({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Zn(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Qn[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function Jp({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(Yp, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function o1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Jp, { ...e }) : /* @__PURE__ */ n(Vp, { ...e });
}
const Xp = "_list_1gu6a_2", Qp = "_check_1gu6a_10", Zp = "_body_1gu6a_16", eg = "_text_1gu6a_23", ag = "_pending_1gu6a_32", ng = "_measured_1gu6a_37", He = {
  list: Xp,
  check: Qp,
  body: Zp,
  text: eg,
  pending: ag,
  measured: ng
};
function tg(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function rg({ check: e }) {
  const a = tg(e.passed);
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
function i1({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${He.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(rg, { check: a }, a.text)) });
}
const lg = "_root_16pdz_2", og = "_list_16pdz_9", ig = "_line_16pdz_16", cg = "_at_16pdz_43", sg = "_text_16pdz_47", dg = "_foot_16pdz_51", ug = "_idle_16pdz_62", hg = "_caret_16pdz_69", mg = "_jump_16pdz_76", ve = {
  root: lg,
  list: og,
  line: ig,
  at: cg,
  text: sg,
  foot: dg,
  idle: ug,
  caret: hg,
  jump: mg
}, wg = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function za(e) {
  return Number.isNaN(Date.parse(e)) ? "" : wg.format(new Date(e));
}
const _g = { warn: "warning", ok: "ok" };
function vg({ kind: e }) {
  const a = _g[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function fg({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${za(e)}` });
}
function bg({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events — as of ${za(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(fg, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function c1({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
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
      /* @__PURE__ */ n("span", { className: ve.at, children: za(d.at) }),
      /* @__PURE__ */ n(vg, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(bg, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const pg = "_row_11jhe_2", gg = "_head_11jhe_14", Ng = "_author_11jhe_20", yg = "_eta_11jhe_25", kg = "_edited_11jhe_26", $g = "_body_11jhe_32", Cg = "_reason_11jhe_37", Sg = "_actions_11jhe_42", we = {
  row: pg,
  head: gg,
  author: Ng,
  eta: yg,
  edited: kg,
  body: $g,
  reason: Cg,
  actions: Sg
}, Rg = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function Tg(e) {
  return {
    queued: `Still in the outbox — editing replaces the queued row and recomputes req_hash, so ${e} receives one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed — edit and resend, or cancel the delivery."
  };
}
function Lg({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
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
function xg({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: we.reason, id: a, children: e })
  ] });
}
function Ag(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Eg(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Lg, { ...e }) : /* @__PURE__ */ n(xg, { reason: e.unavailable, reasonId: e.unavailableId });
}
function s1(e) {
  const { comment: a } = e;
  Ag(e);
  const t = $(), r = `${t}-unavailable`, o = Rg[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${we.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: we.head, children: [
      /* @__PURE__ */ n("span", { className: we.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: we.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: we.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: we.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: we.reason, id: t, children: Tg(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: we.actions, children: /* @__PURE__ */ n(Eg, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const qg = "_root_c46wj_2", Ig = "_attach_c46wj_11", Mg = "_actions_c46wj_17", Bg = "_reply_c46wj_23", Pg = "_replyRow_c46wj_28", Dg = "_sendsAs_c46wj_42", je = {
  root: qg,
  attach: Ig,
  actions: Mg,
  reply: Bg,
  replyRow: Pg,
  sendsAs: Dg
};
function Og({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = g(""), i = $();
  return /* @__PURE__ */ l("div", { className: je.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: je.replyRow, children: [
      /* @__PURE__ */ n(x, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: je.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function d1(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Og, { ...e }) : /* @__PURE__ */ n(Hg, { ...e });
}
function Hg({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ l("div", { className: je.root, children: [
    /* @__PURE__ */ n(x, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ l("div", { className: je.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      vn,
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
const Fg = "_list_1ih9e_2", jg = "_item_1ih9e_6", Wg = "_body_1ih9e_22", zg = "_text_1ih9e_28", Gg = "_evidence_1ih9e_37", Kg = "_consequence_1ih9e_49", Ug = "_note_1ih9e_54", Le = {
  list: Fg,
  item: jg,
  body: Wg,
  text: zg,
  evidence: Gg,
  consequence: Kg,
  note: Ug
};
function Vg({ criterion: e }) {
  return /* @__PURE__ */ n(Ee, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function dn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Yg(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function Jg({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Le.body, children: [
    /* @__PURE__ */ n("span", { className: Le.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(L, { children: [
      /* @__PURE__ */ n(dn, { text: " — " }),
      /* @__PURE__ */ n("code", { className: Le.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(L, { children: [
      /* @__PURE__ */ n(dn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Le.consequence, children: Yg(e.why) })
    ] })
  ] });
}
function Xg({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Le.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Vg, { criterion: e }),
    /* @__PURE__ */ n(Jg, { criterion: e })
  ] });
}
function u1({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Le.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Xg, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Le.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Qg = "_list_dwhoz_2", Zg = "_rung_dwhoz_6", eN = "_name_dwhoz_18", aN = "_actor_dwhoz_32", na = {
  list: Qg,
  rung: Zg,
  name: eN,
  actor: aN
}, nN = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function tN({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = nN[e.state];
  return /* @__PURE__ */ l("li", { className: na.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: na.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${na.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function h1({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${na.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(tN, { rung: a }, a.name)) });
}
const rN = "_sheet_1fqco_2", lN = "_title_1fqco_9", oN = "_stage_1fqco_15", iN = "_effects_1fqco_20", cN = "_effect_1fqco_20", sN = "_numeral_1fqco_31", dN = "_effectText_1fqco_38", uN = "_refusals_1fqco_43", hN = "_reasons_1fqco_52", mN = "_reason_1fqco_52", wN = "_actions_1fqco_62", ie = {
  sheet: rN,
  title: lN,
  stage: oN,
  effects: iN,
  effect: cN,
  numeral: sN,
  effectText: dN,
  refusals: uN,
  reasons: hN,
  reason: mN,
  actions: wN
};
function _N({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function m1({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
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
      Xo,
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
      /* @__PURE__ */ n(_N, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const vN = "_list_1hvqu_2", fN = "_path_1hvqu_7", bN = "_head_1hvqu_21", pN = "_label_1hvqu_28", gN = "_consequence_1hvqu_35", NN = "_ask_1hvqu_36", Fe = {
  list: vN,
  path: fN,
  head: bN,
  label: pN,
  consequence: gN,
  ask: NN
}, qa = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function un(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function yN({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: qa[e.kind] }) : /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: qa[e.kind] }),
    /* @__PURE__ */ n("span", { className: Fe.ask, id: r, children: e.askInstead })
  ] });
}
function kN({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: Fe.path, "data-allowed": e.allowed, "data-role": un(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: Fe.head, children: [
      /* @__PURE__ */ n("span", { className: Fe.label, children: e.title ?? qa[e.kind] }),
      /* @__PURE__ */ n(m, { role: un(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Fe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(yN, { path: e, primary: a, onChoose: t })
  ] });
}
function w1({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Fe.list, children: e.map((t, r) => /* @__PURE__ */ n(kN, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const $N = "_list_qjv4r_2", CN = "_item_qjv4r_6", SN = "_node_qjv4r_18", RN = "_body_qjv4r_24", TN = "_head_qjv4r_30", LN = "_stage_qjv4r_36", xN = "_version_qjv4r_41", AN = "_sentence_qjv4r_49", EN = "_meta_qjv4r_54", fe = {
  list: $N,
  item: CN,
  node: SN,
  body: RN,
  head: TN,
  stage: LN,
  version: xN,
  sentence: AN,
  meta: EN
}, qN = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function IN({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: fe.head, children: [
    /* @__PURE__ */ n("span", { className: fe.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: fe.version, title: e.version, children: e.version }) : null
  ] });
}
function MN({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${fe.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${fe.node} ward-history-node`, children: /* @__PURE__ */ n(Ee, { size: 9, kind: qN[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${fe.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(IN, { entry: e }),
      /* @__PURE__ */ n("span", { className: fe.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${fe.meta} ward-history-meta`, children: [
        `${te(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${J(e.cost)}`
      ] })
    ] })
  ] });
}
function _1({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${fe.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(MN, { entry: a }, a.stage + String(t))) });
}
const BN = "_thread_1kn6s_3", PN = "_turn_1kn6s_8", DN = "_who_1kn6s_27", ON = "_body_1kn6s_32", ta = {
  thread: BN,
  turn: PN,
  who: DN,
  body: ON
}, et = ze(!1);
function v1({ children: e, density: a }) {
  return /* @__PURE__ */ n(et.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ta.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function f1({ turn: e }) {
  if (!We(et)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${ta.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${ta.who} ward-chat-who`, children: [
      e.author,
      " · ",
      te(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ta.body} ward-chat-body`, children: e.body })
  ] });
}
const HN = "_list_1rt9c_3", FN = "_row_1rt9c_7", jN = "_label_1rt9c_20", WN = "_n_1rt9c_26", zN = "_cause_1rt9c_33", Ue = {
  list: HN,
  row: FN,
  label: jN,
  n: WN,
  cause: zN
};
function GN(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const KN = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function UN({ row: e, formatNumber: a }) {
  return GN(e), /* @__PURE__ */ l("li", { className: `${Ue.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ee, { size: 8, ...KN[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Ue.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Ue.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(VN, { cause: e.cause })
  ] });
}
function VN({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ue.cause} ward-healthrow-cause`, children: e }) : null;
}
function b1({ rows: e, formatNumber: a = Q }) {
  return /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(UN, { row: t, formatNumber: a }, t.label)) });
}
const YN = "_root_1jxwp_2", JN = {
  root: YN
};
function p1({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: JN.root, "data-density": o, children: [
    /* @__PURE__ */ n(ga, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const XN = "_row_dhbre_3", QN = "_key_dhbre_13", ZN = "_stack_dhbre_24", ey = "_value_dhbre_32", ay = "_evidence_dhbre_39", ny = "_mark_dhbre_47", Oe = {
  row: XN,
  key: QN,
  stack: ZN,
  value: ey,
  evidence: ay,
  mark: ny
};
function ty({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Da, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function g1({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Oe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Oe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Oe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Oe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Oe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Oe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(ty, { state: e.state }) })
  ] });
}
const ry = "_cell_1monp_2", ly = {
  cell: ry
}, oy = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function iy(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function cy(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function sy(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: iy(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function dy(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function N1({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  cy(e, t);
  const r = dy(e);
  return /* @__PURE__ */ n(
    ui,
    {
      label: "Rejection routing",
      columns: oy,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: ly.cell, "data-norerun": o.noRerun ? !0 : void 0, children: sy(o, i) }),
      empty: a ?? /* @__PURE__ */ n(Oc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const uy = "_row_ute8v_2", hy = "_title_ute8v_11", my = "_turns_ute8v_20", wy = "_waiting_ute8v_21", _y = "_resolved_ute8v_22", vy = "_activity_ute8v_23", fy = "_cost_ute8v_29", by = "_link_ute8v_30", py = "_tableRow_ute8v_47", gy = "_tableTitle_ute8v_59", Ny = "_tableResolved_ute8v_64", yy = "_tableLink_ute8v_68", ky = "_tableMeta_ute8v_83", $y = "_tableCost_ute8v_90", Cy = "_tableActivity_ute8v_91", Sy = "_tableState_ute8v_101", Ry = "_tableRecord_ute8v_112", B = {
  row: uy,
  title: hy,
  turns: my,
  waiting: wy,
  resolved: _y,
  activity: vy,
  cost: fy,
  link: by,
  tableRow: py,
  tableTitle: gy,
  tableResolved: Ny,
  tableLink: yy,
  tableMeta: ky,
  tableCost: $y,
  tableActivity: Cy,
  tableState: Sy,
  tableRecord: Ry
}, at = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function Ty(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function Ly(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function xy(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const Ay = { duplicate: "CLOSED · DUPLICATE" };
function Ey({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function qy({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : J(e) });
}
function Iy({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function My({ session: e, href: a }) {
  const t = at[e.state];
  return /* @__PURE__ */ l("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: Ly(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: B.tableResolved, children: [
      xy(e.resolved),
      /* @__PURE__ */ n(Ey, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(qy, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: Ty(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: Ay[e.state] ?? t.label }),
      /* @__PURE__ */ n(Iy, { link: e.link })
    ] }) })
  ] });
}
function By({ session: e }) {
  const a = at[e.state];
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
function y1(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(My, { session: e.session, href: e.href }) : /* @__PURE__ */ n(By, { session: e.session });
}
const Py = "_block_1yy2v_3", Dy = "_list_1yy2v_9", Oy = "_line_1yy2v_14", Ia = {
  block: Py,
  list: Dy,
  line: Oy
}, Hy = { warn: "warning", ok: "ok" };
function Fy({ kind: e }) {
  const a = Hy[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function jy({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Ia.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(Fy, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function k1({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ia.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ia.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(jy, { line: t }, `${r}-${t.text}`)) }) });
}
const Wy = "_band_tt7hp_1", zy = "_head_tt7hp_8", Gy = "_cell_tt7hp_19", Ky = "_index_tt7hp_35", Uy = "_title_tt7hp_42", Vy = "_note_tt7hp_48", Yy = "_cellTitle_tt7hp_53", Jy = "_cellBody_tt7hp_58", Xy = "_tag_tt7hp_64", me = {
  band: Wy,
  head: zy,
  cell: Gy,
  index: Ky,
  title: Uy,
  note: Vy,
  cellTitle: Yy,
  cellBody: Jy,
  tag: Xy
}, hn = 4;
function $1({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== hn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${hn}-cell grid`);
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
  c1 as ActivityConsole,
  Qu as AgentCard,
  dk as AppShell,
  Vk as AppearanceStrip,
  $1 as Band,
  gs as BoardColumn,
  Tk as BoardFootnote,
  Lk as BoardHeader,
  Nk as BoardScroller,
  v as Btn,
  ok as CHIP_ROLES,
  zn as CREDENTIAL_COLUMNS,
  wk as Callout,
  Yk as CapabilityRow,
  f1 as ChatMessage,
  vn as Checkbox,
  m as Chip,
  s1 as ClarificationRow,
  Ok as ClauseRuleRow,
  Dk as ClauseRules,
  Tn as ColourLadder,
  Jk as ComponentRow,
  d1 as Composer,
  Ak as ConfigRow,
  xk as ConfigRowHead,
  Oa as ConnectionMark,
  v1 as Conversation,
  Xo as CostMeter,
  Qk as CredentialRow,
  Xk as CredentialRowHead,
  u1 as CriteriaList,
  Mr as Crumb,
  b1 as DeliveryHealth,
  kk as DeniedState,
  Hk as DryRunRail,
  Oc as EmptyState,
  Zk as EnvCard,
  x as Field,
  yk as FilteredEmpty,
  pk as FormStack,
  ga as GateChecklist,
  h1 as GateLadder,
  ui as Grid,
  jk as HandoffRuleRow,
  Fk as HandoffRules,
  Ek as ItemDrawer,
  pt as LIVE_EVENT_TYPES,
  gu as LegacyBoardColumn,
  Ik as LegacyBoardHeader,
  Mk as LegacyConfigRow,
  Pk as LegacyItemDrawer,
  mu as LegacyOverCapNote,
  Bk as LegacyPreviewRail,
  Cn as LegacyWorkCard,
  ge as LiveIndicator,
  $k as LoadFailed,
  Rk as Loading,
  Vn as MCP_SERVER_COLUMNS,
  Da as Mark,
  a1 as MarkUpload,
  Ee as Marker,
  t1 as McpServerRow,
  n1 as McpServerRowHead,
  Wk as NewStreamModal,
  jc as OverCapNote,
  Je as Overlay,
  Th as PARTIAL_STEP_REASON,
  Yn as POLICY_CHIP_WIDTH,
  vk as PageFrame,
  mk as PageHeader,
  r1 as PolicyRow,
  qk as PreviewRail,
  Ca as ROLE_MATRIX_COLUMNS,
  Hn as RULE_ACTIONS,
  gn as Radio,
  p1 as ReadyChecklist,
  bk as RecordSection,
  m1 as RequeueSheet,
  w1 as ResolveBlock,
  g1 as ResolvedFieldRow,
  l1 as RoleMatrixRow,
  N1 as RoutingTable,
  zk as RuleRow,
  o1 as RunbookSteps,
  ft as STREAM_STEPS,
  gk as SectionBand,
  Ti as SectionHeader,
  fn as SegmentedControl,
  y1 as SessionRow,
  hk as Sidebar,
  Gk as StageColumn,
  _1 as StageHistory,
  Aw as StageListEditor,
  Ck as StaleStrip,
  fa as StatStrip,
  Kk as StreamRow,
  fk as SubjectRail,
  xe as Switch,
  uk as Tabs,
  Uk as ToolRow,
  _k as TopBar,
  rc as Tree,
  yn as TreeRow,
  k1 as TypedInputBlock,
  i1 as ValidationList,
  ak as VisibilityProvider,
  nk as Visible,
  lk as WARD_VERSION,
  pa as WorkCard,
  Sk as WriteUnavailableStrip,
  Ty as agoSince,
  st as clock,
  Vw as colourStatus,
  Q as count,
  ne as duration,
  Ma as elapsed,
  rk as eventSourceTransport,
  ma as isStreamStep,
  wa as isValidatedStreamStep,
  Lh as ladderValidation,
  Bb as mcpConnectionChip,
  Ib as mcpToolName,
  J as money,
  de as ms,
  kn as ordered,
  mn as ratio,
  Sf as restartLabel,
  te as stamp,
  _n as stream,
  ck as streamChip,
  va as streamChipProps,
  Ae as streamColour,
  Nt as streamHex,
  ik as streamVars,
  ea as useBorderFlash,
  wt as useFocusTrap,
  sk as useLiveFeed,
  tk as useReturnFocus,
  ha as useRovingTabindex,
  Ba as useTicker,
  dt as useVisible,
  j as v,
  e1 as validateMark,
  _a as validatedStep,
  bt as validatedStreamSteps
};
