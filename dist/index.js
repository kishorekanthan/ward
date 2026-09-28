import { jsx as n, Fragment as E, jsxs as l } from "react/jsx-runtime";
import { useMemo as ct, useContext as We, createContext as ze, useCallback as K, useEffect as A, useState as g, useRef as N, useLayoutEffect as st, useId as k, Fragment as dt } from "react";
import { createPortal as ut } from "react-dom";
function te(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const Va = (e) => String(e).padStart(2, "0");
function Da(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${Va(a % 60)}s` : `${Math.floor(t / 60)}h ${Va(t % 60)}m`;
}
const ht = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function re(e) {
  const a = ht.formatToParts(new Date(e)), t = (r) => {
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
function bn(e, a) {
  return `${e} / ${a}`;
}
const mt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function wt(e) {
  return mt.format(new Date(e));
}
const pn = ze(/* @__PURE__ */ new Set());
function kk({ hidden: e, children: a }) {
  const t = ct(() => new Set(e), [e]);
  return /* @__PURE__ */ n(pn.Provider, { value: t, children: a });
}
function _t(e) {
  return !We(pn).has(e);
}
function $k({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(E, { children: _t(e) ? a : t });
}
const vt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function ft(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function bt(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = ft(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function pt(e) {
  return { onKeyDown: K(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(vt));
      bt(t, e.current, r);
    },
    [e]
  ) };
}
function Ck(e, a = !0) {
  A(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const Ya = { ArrowUp: -1, ArrowDown: 1 }, Ja = { ArrowLeft: -1, ArrowRight: 1 }, gt = (e, a, t) => Math.min(t, Math.max(a, e));
function Nt(e, a) {
  if (a !== "horizontal" && e in Ya) return Ya[e];
  if (a !== "vertical" && e in Ja) return Ja[e];
}
function wa({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  st(() => {
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
      const _ = Math.max(0, h.indexOf(a)), b = Nt(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[gt(_ + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
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
const Sk = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, Rk = "0.2.0", Tk = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], yt = [1, 2, 3, 4, 5, 6], kt = [1, 2, 3], $t = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], j = {
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
function gn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function _a(e) {
  return yt.includes(e);
}
function va(e) {
  return kt.includes(e);
}
function Lk(e) {
  if (!_a(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function xk(e) {
  if (!_a(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Ct = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function St(e) {
  if (!_a(e)) throw new Error("unvalidated stream step");
  return Ct[e];
}
function Xa(e) {
  return typeof e != "string" ? null : $t.includes(e) ? e : null;
}
function Rt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Tt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Lt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function xt(e, a, t) {
  const r = Rt(e);
  if (r === null) return null;
  const o = Xa(t) ?? Xa(r.type);
  return o === null ? null : { ...r, type: o, id: Tt(r, a), at: Lt(r) };
}
function Et(e, a) {
  return e >= ue.staleAfter ? "stale" : e >= ue.heartbeat && a === "live" ? "reconnecting" : null;
}
function At(e, a, t) {
  return e >= ue.heartbeat && !a && t !== null;
}
function Ek(e, a) {
  const [t, r] = g("reconnecting"), [o, i] = g(null), c = N(/* @__PURE__ */ new Map()), s = N(0), u = N(""), d = N(0), h = N(null), _ = N(0), b = N(0), x = N(!1), G = N("reconnecting"), J = K(($) => {
    G.current = $, r($);
  }, []), le = K(() => {
    s.current = Date.now();
  }, []), Ne = K(($) => {
    for (const [F, me] of c.current)
      (me === "*" || $.itemKey === me) && F($);
  }, []), oe = K(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: ($, F, me) => {
        const Re = xt($, F, me);
        Re !== null && (Re.id && (u.current = Re.id), le(), x.current = !1, J("live"), i(Re.at), Ne(Re));
      },
      onOpen: () => {
        d.current = 0, x.current = !1, le(), J("live");
      },
      onError: () => {
        var F;
        (F = h.current) == null || F.close(), h.current = null, x.current = !0, G.current !== "stale" && J("reconnecting");
        const $ = Math.min(ue.reconnectBase * 2 ** d.current, ue.reconnectMax);
        d.current += 1, _.current = window.setTimeout(oe, $);
      }
    });
  }, [Ne, J, le, a, e]), Me = K(($) => {
    x.current = !0, $.close(), h.current = null, _.current = window.setTimeout(oe, ue.reconnectBase);
  }, [oe]), Be = K(($, F) => (c.current.set(F, $), () => {
    c.current.delete(F);
  }), []);
  return A(() => (oe(), b.current = window.setInterval(() => {
    const $ = Date.now() - s.current, F = Et($, G.current);
    F && J(F);
    const me = h.current;
    At($, x.current, me) && Me(me);
  }, ue.tick), () => {
    var $;
    window.clearInterval(b.current), window.clearTimeout(_.current), x.current = !1, ($ = h.current) == null || $.close(), h.current = null;
  }), [oe, Me, J]), { connection: t, lastEventAt: o, subscribe: Be };
}
function Oa(e, a) {
  const t = new Date(e).getTime(), [r, o] = g(() => Date.now());
  return A(() => {
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
function qt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Qa(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function na(e, a) {
  const t = N(0), r = K((o) => {
    const i = o ?? a, c = e.current;
    c !== null && i !== void 0 && (qt() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => Qa(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => Qa(c), ue.flash)));
  }, [a, e]);
  return A(() => () => window.clearTimeout(t.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const It = "_root_1otpc_2", Mt = {
  root: It
};
function Bt(e, a, t, r, o) {
  const i = [Da(a)];
  return e || i.push(`as of ${wt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = Oa(e, o), c = (a == null ? void 0 : a.at) ?? e, s = Bt(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${Mt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      re(e)
    ] })
  ] });
}
const Pt = "_app_bcfqb_1", Dt = "_side_bcfqb_18", Ot = "_main_bcfqb_26", Ht = "_rail_bcfqb_33", Ft = "_page_bcfqb_40", jt = "_root_bcfqb_91", Wt = "_topbar_bcfqb_98", zt = "_mark_bcfqb_109", Gt = "_brand_bcfqb_116", Kt = "_tagline_bcfqb_122", Ut = "_identity_bcfqb_128", Vt = "_tools_bcfqb_129", Yt = "_metadata_bcfqb_138", Jt = "_actor_bcfqb_153", Xt = "_detail_bcfqb_154", Qt = "_nav_bcfqb_159", Zt = "_content_bcfqb_194", er = "_skip_bcfqb_217", D = {
  app: Pt,
  side: Dt,
  main: Ot,
  rail: Ht,
  page: Ft,
  root: jt,
  topbar: Wt,
  mark: zt,
  brand: Gt,
  tagline: Kt,
  identity: Ut,
  tools: Vt,
  metadata: Yt,
  actor: Jt,
  detail: Xt,
  nav: Qt,
  content: Zt,
  skip: er
};
function ar({ sidebar: e, header: a, children: t, rail: r }) {
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
function nr({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: D.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function oa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function tr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: D.metadata, children: [
    /* @__PURE__ */ n(oa, { value: e, className: D.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(oa, { value: a, className: D.detail })
  ] });
}
function rr(e) {
  return /* @__PURE__ */ l("header", { className: D.topbar, children: [
    /* @__PURE__ */ n("span", { className: D.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: D.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(oa, { value: e.tagline, className: D.tagline }),
    /* @__PURE__ */ n(nr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: D.identity, children: /* @__PURE__ */ n(tr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(oa, { value: e.tools, className: D.tools })
  ] });
}
function lr(e) {
  const a = k();
  return /* @__PURE__ */ l("div", { className: `${D.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: D.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(rr, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: D.content, children: e.children })
  ] });
}
function or(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function Ak(e) {
  return or(e) ? /* @__PURE__ */ n(ar, { ...e }) : /* @__PURE__ */ n(lr, { ...e });
}
const ir = "_btn_llheq_2", cr = "_primary_llheq_13", sr = "_secondary_llheq_23", dr = "_ghost_llheq_28", ur = "_overflow_llheq_37", hr = "_sm_llheq_44", mr = "_disabled_llheq_48", Xe = {
  btn: ir,
  primary: cr,
  secondary: sr,
  ghost: dr,
  overflow: ur,
  sm: hr,
  disabled: mr
};
function wr(e, a, t, r) {
  const o = a === "sm" ? [Xe.sm, "ward-btn--sm"] : [], i = t ? [Xe.disabled] : [];
  return [Xe.btn, Xe[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function _r(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function vr(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function fr(e) {
  return e.children ?? e.label;
}
function v(e) {
  vr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: wr(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ..._r(a, e.controls),
      children: fr(e)
    }
  );
}
function Ha(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const br = "_root_o4yib_2", pr = "_row_o4yib_8", gr = "_box_o4yib_14", Nr = "_label_o4yib_21", yr = "_lockedNote_o4yib_26", kr = "_consequence_o4yib_34", $r = "_sample_o4yib_69", xe = {
  root: br,
  row: pr,
  box: gr,
  label: Nr,
  lockedNote: yr,
  consequence: kr,
  sample: $r
};
function Cr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Sr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${xe.consequence} ward-check-consequence`, children: a }) : null;
}
function Rr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${xe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Tr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: xe.sample, "aria-hidden": "true", children: e }) : null;
}
function Nn(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = Cr(e);
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
          "aria-describedby": Ha(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: a, className: xe.label, children: [
        e.label,
        /* @__PURE__ */ n(Rr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Tr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Sr, { id: t, text: e.consequence })
  ] });
}
const Lr = "_chip_1073r_2", xr = {
  chip: Lr
}, Er = {
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
function Ar(e, a) {
  if (e === "stream") return qr(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Er[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function qr(e) {
  if (!e || !va(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = gn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${xr.chip} ward-chip ward-chip--${e}`, style: Ar(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function fa(e) {
  return typeof e == "number" && va(e) ? e : null;
}
function Ce(e, a) {
  const t = fa(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function ba(e, a) {
  const t = fa(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const Ir = "_nav_1mnou_2", Mr = "_list_1mnou_8", Br = "_item_1mnou_15", Pr = "_link_1mnou_25", Dr = "_sep_1mnou_35", Or = "_current_1mnou_39", Hr = "_chips_1mnou_43", Te = {
  nav: Ir,
  list: Mr,
  item: Br,
  link: Pr,
  sep: Dr,
  current: Or,
  chips: Hr
};
function Fr({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Te.nav, children: [
    /* @__PURE__ */ n("ol", { className: Te.list, children: e.map((t, r) => /* @__PURE__ */ l("li", { className: Te.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Te.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Te.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Te.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Te.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const jr = "_field_fy549_2", Wr = "_label_fy549_8", zr = "_labelHidden_fy549_15", Gr = "_control_fy549_25", Kr = "_mono_fy549_44", Ur = "_area_fy549_49", Vr = "_invalid_fy549_56", $e = {
  field: jr,
  label: Wr,
  labelHidden: zr,
  control: Gr,
  mono: Kr,
  area: Ur,
  invalid: Vr
}, Yr = { type: "password", autoComplete: "off", spellCheck: !1 };
function Jr({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? Yr : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function Xr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Qr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Zr = { input: Jr, select: Xr, textarea: Qr };
function el(e, a, t) {
  const r = Zr[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function al(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ha(r ? t : void 0, e.describedBy),
    onChange: (o) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, o.target.value);
    }
  };
}
function nl(e) {
  const a = e.mono ? [$e.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [$e.area] : [];
  return [$e.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function tl(e) {
  return e ? `${$e.label} ${$e.labelHidden} ward-field-label` : `${$e.label} ward-field-label`;
}
function L(e) {
  const a = k(), t = `${a}-msg`, r = al(e, a, t), o = nl(e);
  return /* @__PURE__ */ l("div", { className: `${$e.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: tl(e.labelHidden), htmlFor: a, children: e.label }),
    el(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${$e.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const rl = "_strip_jwrf5_2", ll = "_tab_jwrf5_12", ol = "_count_jwrf5_35", xa = {
  strip: rl,
  tab: ll,
  count: ol
}, Za = 7;
function il(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function cl(e) {
  return `${xa.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function qk({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > Za) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Za} — the set is fixed`);
  const i = wa({ orientation: "horizontal" }), c = il(e, a);
  return A(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: cl(o),
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
          className: `${xa.tab} ward-tab`,
          "aria-selected": s.id === a,
          "aria-controls": `panel-${s.id}`,
          onClick: () => t(s.id),
          ...i.itemProps(u),
          children: [
            s.label,
            s.count === void 0 ? null : /* @__PURE__ */ l(E, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: xa.count, children: `· ${s.count}` })
            ] })
          ]
        },
        s.id
      ))
    }
  );
}
const sl = "_root_jem6y_2", dl = "_segment_jem6y_7", en = {
  root: sl,
  segment: dl
};
function yn({ options: e, value: a, onChange: t, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = wa({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return A(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${en.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: en.segment,
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
const ul = "_sidebar_1jywv_3", hl = "_brand_1jywv_9", ml = "_mark_1jywv_17", wl = "_word_1jywv_24", _l = "_nav_1jywv_30", vl = "_navItem_1jywv_38", fl = "_group_1jywv_50", bl = "_groupName_1jywv_57", pl = "_agents_1jywv_70", gl = "_agent_1jywv_70", Nl = "_agentTop_1jywv_88", yl = "_dot_1jywv_95", kl = "_agentName_1jywv_107", $l = "_agentMeta_1jywv_120", Cl = "_foot_1jywv_126", Sl = "_footName_1jywv_132", Rl = "_footLinks_1jywv_139", Tl = "_footLink_1jywv_139", Ll = "_root_1jywv_153", xl = "_linkBrand_1jywv_162", El = "_label_1jywv_183", Al = "_note_1jywv_188", ql = "_footer_1jywv_202", C = {
  sidebar: ul,
  brand: hl,
  mark: ml,
  word: wl,
  nav: _l,
  navItem: vl,
  group: fl,
  groupName: bl,
  new: "_new_1jywv_64",
  agents: pl,
  agent: gl,
  agentTop: Nl,
  dot: yl,
  agentName: kl,
  agentMeta: $l,
  foot: Cl,
  footName: Sl,
  footLinks: Rl,
  footLink: Tl,
  root: Ll,
  linkBrand: xl,
  label: El,
  note: Al,
  footer: ql
};
function Il({ agent: e }) {
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
              style: { "--dot": gn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Ml({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function Bl({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(Il, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(Ml, { shared: i })
  ] });
}
function Pl(e) {
  return e.destinations ?? e.items ?? [];
}
function Dl({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function Ol({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function Hl({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Fl(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Dl, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Pl(e).map((a) => /* @__PURE__ */ n(Hl, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(Ol, { children: e.children })
  ] });
}
function jl(e) {
  return "agents" in e;
}
function Ik(e) {
  return jl(e) ? /* @__PURE__ */ n(Bl, { ...e }) : /* @__PURE__ */ n(Fl, { ...e });
}
const Wl = "_mark_wlgi8_3", zl = {
  mark: Wl
}, Gl = { met: "✓", unmet: "", failed: "✕" };
function Fa({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: zl.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Gl[e]
    }
  );
}
const Kl = "_marker_br9fi_2", Ul = {
  marker: Kl
}, Vl = {
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
  const r = { "--marker": Vl[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Ul.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Yl = "_root_ti0pq_2", Jl = "_chip_ti0pq_11", Xl = "_noCase_ti0pq_23", Qe = {
  root: Yl,
  chip: Jl,
  noCase: Xl
};
function Ql(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function ja({ connection: e, since: a, lastEventAt: t }) {
  const r = Ql(a, t), o = Oa(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${Qe.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Se, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: Qe.noCase, children: Da(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    re(r)
  ] });
}
const Zl = "_root_11rs7_2", eo = "_context_11rs7_12", ao = "_row_11rs7_1", no = "_heading_11rs7_25", to = "_headingWrap_11rs7_33", ro = "_chips_11rs7_38", lo = "_title_11rs7_45", oo = "_consequence_11rs7_54", io = "_actionsWrap_11rs7_59", co = "_actions_11rs7_59", so = "_action_11rs7_59", uo = "_overflowPanel_11rs7_78", ho = "_measure_11rs7_88", Z = {
  root: Zl,
  context: eo,
  row: ao,
  heading: no,
  headingWrap: to,
  chips: ro,
  title: lo,
  consequence: oo,
  actionsWrap: io,
  actions: co,
  action: so,
  overflowPanel: uo,
  measure: ho
};
function mo({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: Z.heading, children: [
    /* @__PURE__ */ n("h1", { className: Z.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: Z.consequence, children: a })
  ] });
}
function Ea({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: Z.action, "data-action": "", children: a }, t));
}
function an({ disclosure: e }) {
  return /* @__PURE__ */ n(v, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function wo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: o }) {
  return t ? r ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(an, { disclosure: o }) : a ? [/* @__PURE__ */ n(an, { disclosure: o }, "more"), /* @__PURE__ */ n(Ea, { actions: e }, "actions")] : /* @__PURE__ */ n(Ea, { actions: e });
}
function _o(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function vo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Ea, { actions: e }) });
}
function fo(e, a) {
  const t = k(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function bo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: Z.context, children: [
    /* @__PURE__ */ n(Fr, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Z.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function po(...e) {
  return e.some((a) => a === null);
}
function go(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function No(e, a, t, r, o) {
  if (o === 0 || po(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = go(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function yo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function ko(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = g(!1);
  return A(() => {
    const s = a.current;
    if (!yo(s)) return;
    const u = () => c(No(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function $o({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ l("div", { className: Z.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(v, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] });
}
function Co({ connection: e }) {
  return e ? /* @__PURE__ */ n(ja, { connection: e.connection, since: e.since }) : null;
}
function Mk({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], more: i = [], connection: c, onOverflow: s, density: u = "page" }) {
  const { rowRef: d, headingRef: h, actionsRef: _, measureRef: b, collapsed: x } = ko(o), G = i.length > 0, { disclosure: J, close: le } = fo(x || G, _), Ne = _o(i, o, x, s);
  return /* @__PURE__ */ l("header", { className: Z.root, "data-density": u, children: [
    /* @__PURE__ */ n(bo, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: Z.row, ref: d, children: [
      /* @__PURE__ */ n("div", { ref: h, className: Z.headingWrap, children: /* @__PURE__ */ n(mo, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ n(Co, { connection: c }),
        /* @__PURE__ */ n("div", { className: Z.actions, ref: _, "data-ward-actions": !0, children: /* @__PURE__ */ n(wo, { actions: o, hasMore: G, collapsed: x, onOverflow: s, disclosure: J }) })
      ] })
    ] }),
    /* @__PURE__ */ n(vo, { actions: Ne, disclosure: J, onEscape: le }),
    /* @__PURE__ */ n($o, { actions: o, hasMore: G, measureRef: b })
  ] });
}
function kn(e) {
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
const So = "_scrim_c7sqj_2", Ro = "_drawer_c7sqj_10", To = "_sheet_c7sqj_14", Lo = "_modal_c7sqj_18", xo = "_panel_c7sqj_23", Eo = "_header_c7sqj_51", Ao = "_title_c7sqj_59", qo = "_body_c7sqj_63", Io = "_close_c7sqj_90", pe = {
  scrim: So,
  drawer: Ro,
  sheet: To,
  modal: Lo,
  panel: xo,
  header: Eo,
  title: Ao,
  body: qo,
  close: Io
}, Mo = ze(null), ia = [], ca = /* @__PURE__ */ new Map();
function Bo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Po(e, a) {
  let t = ca.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ca.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Do(e, a) {
  for (const t of Array.from(a.children))
    Bo(t) || Po(e, t);
}
function Oo(e) {
  for (const a of e.claims) {
    const t = ca.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ca.delete(a)));
  }
}
function Ho(e, a) {
  const t = { root: e, claims: [] };
  return ia.push(t), Do(t, a), t;
}
function Fo(e) {
  const a = ia.indexOf(e);
  a >= 0 && ia.splice(a, 1), Oo(e);
}
function nn(e) {
  return e !== null && ia.at(-1) === e;
}
function jo(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, A(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = Ho(i, a);
    return r.current = s, () => {
      var d, h;
      const u = nn(s);
      Fo(s), r.current = null, u && ((h = (d = o.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), K(() => nn(r.current), []);
}
function Wo(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function zo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Go({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${pe.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(E, { children: [
    /* @__PURE__ */ n("header", { className: `${pe.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${pe.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${pe.body} ward-drawer-body`, children: e.children })
  ] });
}
function Ko(e) {
  return `${pe.scrim} ${pe[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Uo(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${pe.panel} ${pe[e]} ward-overlay-panel${t}${r}`;
}
function Vo(e) {
  const a = We(Mo);
  return e ?? a ?? document.body;
}
function Je(e) {
  const a = N(null), t = N(null), r = k(), o = Vo(e.container), i = kn("(min-width: 768px)"), c = Wo(e.kind, i), s = zo(e, r), u = pt(t), d = jo(a, o, e.returnFocusTo), h = K(() => {
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
  }, [h]), ut(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Ko(c),
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
            className: Uo(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${pe.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Go, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Yo = "_root_drrhx_2", Jo = "_ticket_drrhx_15", Xo = "_body_drrhx_24", ka = {
  root: Yo,
  ticket: Jo,
  body: Xo
};
function Bk({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${ka.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${ka.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: ka.body, children: t })
  ] });
}
const Qo = "_root_1bfqw_2", Zo = "_figure_1bfqw_7", ei = "_of_1bfqw_13", ai = "_bar_1bfqw_18", ni = "_rows_1bfqw_38", ti = "_row_1bfqw_38", ri = "_label_1bfqw_49", li = "_amount_1bfqw_54", ye = {
  root: Qo,
  figure: Zo,
  of: ei,
  bar: ai,
  rows: ni,
  row: ti,
  label: ri,
  amount: li
};
function oi({ spent: e, ceiling: a, breakdown: t }) {
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
const ii = "_frame_mg2jl_2", ci = "_table_mg2jl_6", si = "_th_mg2jl_12", di = "_td_mg2jl_13", ui = "_sort_mg2jl_47", hi = "_row_mg2jl_53", mi = "_empty_mg2jl_61", ke = {
  frame: ii,
  table: ci,
  th: si,
  td: di,
  sort: ui,
  row: hi,
  empty: mi
}, wi = { asc: "ascending", desc: "descending" };
function _i(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return wi[a.direction];
}
function vi(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: ke.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function fi(e) {
  return e === void 0 ? void 0 : { width: e };
}
function bi({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ke.th,
      style: fi(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": _i(e, a),
      children: vi(e, t)
    }
  );
}
function pi({ row: e, props: a }) {
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
function gi({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ke.head, children: a.map((h) => /* @__PURE__ */ n(bi, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(pi, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const Ni = "_set_y5zy3_2", yi = "_legend_y5zy3_7", ki = "_row_y5zy3_15", $i = "_control_y5zy3_20", Ci = "_input_y5zy3_26", Si = "_label_y5zy3_31", Ri = "_consequence_y5zy3_36", Le = {
  set: Ni,
  legend: yi,
  row: ki,
  control: $i,
  input: Ci,
  label: Si,
  consequence: Ri
};
function $n({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
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
              "aria-describedby": Ha(b, c),
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
const Ti = "_root_1h1ot_2", Li = "_head_1h1ot_11", xi = "_index_1h1ot_25", Ei = "_dot_1h1ot_29", Ai = "_note_1h1ot_34", qi = "_counter_1h1ot_40", Ii = "_trailing_1h1ot_48", Ee = {
  root: Ti,
  head: Li,
  index: xi,
  dot: Ei,
  note: Ai,
  counter: qi,
  trailing: Ii
};
function Mi({ index: e }) {
  return e ? /* @__PURE__ */ l(E, { children: [
    /* @__PURE__ */ n("span", { className: `${Ee.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ee.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Bi({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ee.counter, "aria-hidden": "true", children: e }) : null;
}
function Pi({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ee.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ee.head, children: [
      /* @__PURE__ */ n(Mi, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Ee.note, children: t }),
    /* @__PURE__ */ n(Bi, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ee.trailing, children: i })
  ] });
}
const Di = "_strip_1qhvo_2", Oi = "_cell_1qhvo_7", Hi = "_value_1qhvo_12", Fi = "_label_1qhvo_27", Ze = {
  strip: Di,
  cell: Oi,
  value: Hi,
  label: Fi
};
function ji(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function pa({ cells: e, divided: a = !1 }) {
  return ji(e), /* @__PURE__ */ n("dl", { className: `${Ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Ze.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ze.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Ze.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Wi = "_root_xk7sv_2", zi = "_track_xk7sv_8", Gi = "_thumb_xk7sv_35", Ki = "_labelHidden_xk7sv_53", Ui = "_label_xk7sv_53", Vi = "_lockedNote_xk7sv_68", Ae = {
  root: Wi,
  track: zi,
  thumb: Gi,
  labelHidden: Ki,
  label: Ui,
  lockedNote: Vi
};
function Yi(e) {
  return e ? `${Ae.label} ${Ae.labelHidden}` : Ae.label;
}
function Ie({ label: e, checked: a, onChange: t, disabled: r, locked: o, describedBy: i, labelHidden: c }) {
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
    /* @__PURE__ */ l("span", { id: s, className: Yi(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ae.lockedNote, children: "always on" })
    ] })
  ] });
}
const Ji = "_bar_1u2kl_2", Xi = "_skip_1u2kl_11", Qi = "_mark_1u2kl_22", Zi = "_nav_1u2kl_30", ec = "_list_1u2kl_34", ac = "_select_1u2kl_40", nc = "_dest_1u2kl_47", tc = "_actor_1u2kl_61", rc = "_actorMark_1u2kl_74", lc = "_actorLabel_1u2kl_79", oc = "_tagline_1u2kl_98", ie = {
  bar: Ji,
  skip: Xi,
  mark: Qi,
  nav: Zi,
  list: ec,
  select: ac,
  dest: nc,
  actor: tc,
  actorMark: rc,
  actorLabel: lc,
  tagline: oc
};
function ic(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function cc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function Pk({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = cc(r);
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
      /* @__PURE__ */ n("span", { className: ie.actorMark, "aria-hidden": "true", children: ic(s) })
    ] })
  ] });
}
const sc = "_tree_1lyby_2", dc = "_item_1lyby_6", uc = "_row_1lyby_10", hc = "_button_1lyby_22", sa = {
  tree: sc,
  item: dc,
  row: uc,
  button: hc
}, Cn = ze(null);
function mc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = wa({ orientation: "vertical" });
  return /* @__PURE__ */ n(Cn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: sa.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const wc = { ArrowRight: !0, ArrowLeft: !1 };
function tn(e) {
  return e ? !0 : void 0;
}
function _c(e, a) {
  const t = wc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function vc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function fc(e) {
  const a = [sa.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function bc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function pc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function gc(e) {
  return typeof e == "string" ? e : void 0;
}
function Nc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function yc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Sn(e) {
  const a = We(Cn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = bc(e);
  return /* @__PURE__ */ l("li", { className: sa.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: fc(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": tn(e.unresolved),
        "data-inherited": tn(e.inherited),
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${sa.button} ward-treeitem-btn`,
            onClick: () => vc(e),
            onKeyDown: (r) => _c(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: pc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: gc(e.label), children: e.label }),
              /* @__PURE__ */ n(Nc, { value: e.detail }),
              /* @__PURE__ */ n(yc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const kc = "_frame_fdzvs_2", $c = "_subjectRail_fdzvs_21", Cc = "_subject_fdzvs_21", Sc = "_rail_fdzvs_41", Rc = "_record_fdzvs_63", Tc = "_recordBody_fdzvs_68", Lc = "_band_fdzvs_111", xc = "_bandBody_fdzvs_120", Ec = "_bandActions_fdzvs_125", Ac = "_scroller_fdzvs_133", qc = "_lanes_fdzvs_151", de = {
  frame: kc,
  subjectRail: $c,
  subject: Cc,
  rail: Sc,
  record: Rc,
  recordBody: Tc,
  band: Lc,
  bandBody: xc,
  bandActions: Ec,
  scroller: Ac,
  lanes: qc
};
function Dk({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: de.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function rn(e) {
  return e ? "true" : void 0;
}
function Ok({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: de.subjectRail, "data-ward-subject-rail": t, "data-ruled": rn(i), children: [
    /* @__PURE__ */ n("div", { className: de.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: de.rail, "data-sticky": rn(o), "aria-label": r, children: a })
  ] });
}
function Hk({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: de.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Pi, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: de.recordBody, "data-pad": o, children: a })
  ] });
}
const Ic = "_form_1j8ub_2", Mc = "_fields_1j8ub_9", Bc = "_actions_1j8ub_19", $a = {
  form: Ic,
  fields: Mc,
  actions: Bc
};
function Fk({ label: e, children: a, actions: t, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: $a.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: $a.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: $a.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function jk({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: de.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: de.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: de.bandActions, children: a })
  ] });
}
const Pc = "(max-width: 767.98px)";
function Aa({ label: e, children: a, laneCount: t }) {
  const r = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { className: de.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: r, children: a });
}
function Dc({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: de.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(L, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(Aa, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Wk({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = kn(Pc);
  return t === void 0 ? /* @__PURE__ */ n(Aa, { label: a, children: e }) : o ? /* @__PURE__ */ n(Dc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Aa, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n(dt, { children: i.content }, i.id)) });
}
const Oc = "_block_1o5o7_2", Hc = "_sentence_1o5o7_15", Fc = "_meta_1o5o7_20", jc = "_action_1o5o7_25", Wc = "_strip_1o5o7_29", zc = "_loading_1o5o7_48", Gc = "_label_1o5o7_56", Kc = "_counter_1o5o7_63", he = {
  block: Oc,
  sentence: Hc,
  meta: Fc,
  action: jc,
  strip: Wc,
  loading: zc,
  label: Gc,
  counter: Kc
};
function Uc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: he.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function ga({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${he.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: he.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Uc, { action: a })
  ] });
}
function Vc(e) {
  return /* @__PURE__ */ n(ga, { ...e });
}
function zk({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ga, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: he.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function Gk(e) {
  return /* @__PURE__ */ n(ga, { ...e });
}
function Kk({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ga, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: he.meta, children: [
    "failed at ",
    re(a)
  ] }) });
}
function Uk({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: he.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    re(e),
    ". Showing snapshot from ",
    re(a)
  ] });
}
function Vk({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: he.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    re(a)
  ] });
}
function Yk({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = g(!1);
  A(() => {
    const c = window.setTimeout(() => o(!0), ue.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Oa(t.current, r);
  return /* @__PURE__ */ l("div", { className: `${he.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: he.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: he.counter, children: Da(i) }) : null
  ] });
}
const Yc = "_note_tlubt_2", Jc = {
  note: Yc
};
function Xc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: Jc.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const Qc = "_card_12in3_2", Zc = "_hit_12in3_23", es = "_head_12in3_30", as = "_title_12in3_36", ns = "_meta_12in3_44", ts = "_fields_12in3_45", rs = "_who_12in3_58", ls = "_sep_12in3_65", os = "_mono_12in3_69", is = "_field_12in3_45", cs = "_last_12in3_84", ss = "_reason_12in3_96", U = {
  card: Qc,
  hit: Zc,
  head: es,
  title: as,
  meta: ns,
  fields: ts,
  who: rs,
  sep: ls,
  mono: os,
  field: is,
  last: cs,
  reason: ss
}, ds = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function us(e, a, t) {
  const r = na(e, "blue"), o = na(e, "orange"), i = na(e, "green"), c = N(/* @__PURE__ */ new Set());
  A(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = ds[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const hs = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : Q(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function ms(e, a) {
  return hs[a](e);
}
function ws({ item: e, connection: a }) {
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
function _s({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: U.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function vs({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: U.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function fs({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: U.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: U.field, children: ms(e, t) }, t)) });
}
const qa = (e) => e ? !0 : void 0;
function bs(e) {
  return { "--stream": Ce(e.streamStep, "id") };
}
function ps(e, a, t) {
  e == null || e(a, t);
}
function gs(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Ns({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: U.last, "data-stale": qa(a), children: t }) : null;
}
function Na(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  us(r, t.key, e.feed);
  const o = gs(e.feed), i = bs(t);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: U.card,
      style: i,
      "data-selected": qa(e.selected),
      "data-flagged": qa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: U.hit, onClick: (c) => ps(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(_s, { item: t }),
        /* @__PURE__ */ n("p", { className: U.title, children: t.title }),
        /* @__PURE__ */ n(ws, { item: t, connection: o }),
        /* @__PURE__ */ n(vs, { reason: t.blockedReason }),
        /* @__PURE__ */ n(fs, { item: t, fields: a }),
        /* @__PURE__ */ n(Ns, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const ys = "_column_10sxg_3", ks = "_head_10sxg_24", $s = "_label_10sxg_33", Cs = "_count_10sxg_42", Ss = "_list_10sxg_56", Ke = {
  column: ys,
  head: ks,
  label: $s,
  count: Cs,
  list: Ss
};
function Rn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Rs({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: Ke.head, children: [
    /* @__PURE__ */ n("h2", { className: Ke.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: Ke.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Ts(e) {
  return /* @__PURE__ */ n("div", { className: Ke.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      Na,
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
function Ls({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, _ = Rn(a, r);
  return /* @__PURE__ */ l("section", { className: Ke.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(Rs, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(Ts, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    h && /* @__PURE__ */ n(Xc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const xs = "_foot_8qg4p_2", Es = "_note_8qg4p_13", As = "_link_8qg4p_19", Ca = {
  foot: xs,
  note: Es,
  link: As
};
function Jk({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Ca.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ca.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: Ca.link, href: e, children: "Configure board" })
  ] });
}
const qs = "_head_1la6p_3", Is = "_identity_1la6p_12", Ms = "_titleRow_1la6p_18", Bs = "_title_1la6p_18", Ps = "_key_1la6p_35", Ds = "_rollup_1la6p_45", Os = "_tools_1la6p_53", Hs = "_swatch_1la6p_62", Fs = "_mark_1la6p_69", ve = {
  head: qs,
  identity: Is,
  titleRow: Ms,
  title: Bs,
  key: Ps,
  rollup: Ds,
  tools: Os,
  swatch: Hs,
  mark: Fs
}, ln = "initials:";
function js(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Ws(e) {
  const a = [`${ae(e.inFlight)} in flight`, js(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${te(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${te(e.p90)}`), a.join(" · ");
}
function zs(e) {
  return e.startsWith(ln) ? e.slice(ln.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Gs({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ce(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${ve.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: zs(e) }) : /* @__PURE__ */ n("span", { className: ve.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Ks({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Xk({
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
        /* @__PURE__ */ n(Gs, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: ve.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: ve.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: ve.rollup, "aria-live": "polite", children: Ws(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: ve.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Ks, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(ja, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Us = "_head_kabyh_11", Vs = "_line_kabyh_12", Ys = "_cHandle_kabyh_33", Js = "_cName_kabyh_38", Xs = "_nameLine_kabyh_46", Qs = "_cLabel_kabyh_53", Zs = "_cCap_kabyh_58", ed = "_cShown_kabyh_63", ad = "_name_kabyh_46", nd = "_noCap_kabyh_85", td = "_state_kabyh_99", rd = "_handle_kabyh_104", ld = "_sub_kabyh_118", I = {
  head: Us,
  line: Vs,
  cHandle: Ys,
  cName: Js,
  nameLine: Xs,
  cLabel: Qs,
  cCap: Zs,
  cShown: ed,
  name: ad,
  noCap: nd,
  state: td,
  handle: rd,
  sub: ld
}, od = "can't be hidden or collapsed", id = "terminal · counted, not a column";
function Qk() {
  return /* @__PURE__ */ l("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function cd(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function sd(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function on(e) {
  return e.gate ? od : e.terminal ? id : sd(e.agentsMounted);
}
function dd(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function ud({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: I.cName, children: [
    /* @__PURE__ */ l("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    on(e) && /* @__PURE__ */ n("span", { className: I.sub, children: on(e) })
  ] });
}
function hd(e) {
  return e === void 0 ? "" : String(e);
}
function md(e) {
  return e === "" ? void 0 : Number(e);
}
function wd({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => dd(t, a),
      children: "⠿"
    }
  ) });
}
function _d({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(L, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: hd(a.cap), onChange: (r) => t({ ...a, cap: md(r) }) }) });
}
function vd({ stage: e, config: a, onChange: t }) {
  const r = cd(e, a.shown);
  return /* @__PURE__ */ l("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(Ie, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function fd(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function Zk({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: I.line, "data-kind": fd(e), children: [
    /* @__PURE__ */ n(wd, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(ud, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(L, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(_d, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(vd, { stage: e, config: a, onChange: t })
  ] });
}
const bd = "_body_hn6d6_2", pd = "_head_hn6d6_9", gd = "_summary_hn6d6_19", Nd = "_block_hn6d6_20", yd = "_actionsBlock_hn6d6_21", kd = "_title_hn6d6_41", $d = "_note_hn6d6_46", Cd = "_k_hn6d6_51", Sd = "_kv_hn6d6_58", Rd = "_row_hn6d6_64", Td = "_label_hn6d6_75", Ld = "_value_hn6d6_84", xd = "_quote_hn6d6_90", Ed = "_actions_hn6d6_21", Ad = "_resolve_hn6d6_103", M = {
  body: bd,
  head: pd,
  summary: gd,
  block: Nd,
  actionsBlock: yd,
  title: kd,
  note: $d,
  k: Cd,
  kv: Sd,
  row: Rd,
  label: Td,
  value: Ld,
  quote: xd,
  actions: Ed,
  resolve: Ad
};
function qd(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Id(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Md(e) {
  const a = fa(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Bd(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...ba(Md(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", te(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...qd(e),
    ...Id(e, a)
  ];
}
function Pd({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function Dd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: M.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Od({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: M.block, children: [
    /* @__PURE__ */ n("p", { className: M.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: M.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: M.note, children: e.agentMeta })
  ] }) : null;
}
function e1({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = Bd(e, o);
  return /* @__PURE__ */ n(Je, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: M.body, children: [
    /* @__PURE__ */ n(Dd, { item: e }),
    /* @__PURE__ */ l("div", { className: M.summary, children: [
      /* @__PURE__ */ n("h2", { className: M.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: M.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: M.kv, children: d.map(([h, _]) => /* @__PURE__ */ l("div", { className: M.row, children: [
      /* @__PURE__ */ n("dt", { className: M.label, children: h }),
      /* @__PURE__ */ n("dd", { className: M.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(Od, { item: e }),
    /* @__PURE__ */ l("div", { className: M.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: M.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: M.note, children: s })
    ] }),
    /* @__PURE__ */ n(Pd, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Hd = "_root_3azmy_2", Fd = "_list_3azmy_7", jd = "_item_3azmy_12", Wd = "_box_3azmy_18", zd = "_text_3azmy_23", Gd = "_note_3azmy_28", Pe = {
  root: Hd,
  list: Fd,
  item: jd,
  box: Wd,
  text: zd,
  note: Gd
};
function ya({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ l("div", { className: Pe.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Pe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Pe.box, children: /* @__PURE__ */ n(Fa, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Pe.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Pe.note} ward-checklist-note`, children: a })
  ] });
}
const Kd = "_rail_ke7ch_2", Ud = "_k_ke7ch_11", Vd = "_head_ke7ch_19", Yd = "_section_ke7ch_25", Jd = "_card_ke7ch_38", Xd = "_strip_ke7ch_42", Qd = "_skeleton_ke7ch_56", Zd = "_skeletonLabel_ke7ch_70", eu = "_bar_ke7ch_76", au = "_note_ke7ch_85", se = {
  rail: Kd,
  k: Ud,
  head: Vd,
  section: Yd,
  card: Jd,
  strip: Xd,
  skeleton: Qd,
  skeletonLabel: Zd,
  bar: eu,
  note: au
};
function nu(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Sa({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: se.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: se.k, children: e }),
    a
  ] });
}
function tu({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: se.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: se.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: se.bar, "aria-hidden": "true" }, r))
  ] });
}
function ru({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(Ls, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function lu(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(ru, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(tu, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function a1(e) {
  const a = nu(e.onOpen), t = Rn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: se.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${se.k} ${se.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Sa, { title: "Card", children: /* @__PURE__ */ n("div", { className: se.card, children: t && /* @__PURE__ */ n(Na, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Sa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: se.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(lu, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: se.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Sa, { title: "Effect of this config", children: /* @__PURE__ */ n(ya, { items: e.effects, density: "compact" }) })
  ] });
}
function ou(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function iu(e) {
  return Math.ceil(e.length / 2);
}
function cu(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Tn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function su(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = Tn(e);
  o !== void 0 && t(o), r(cu(e.type));
}
function du(e, a, t, r, o) {
  A(() => {
    if (e !== null)
      return e.subscribe(a, (i) => su(i, t, r, o));
  }, [e, a, t, r, o]);
}
function uu(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function hu(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function mu(e, a) {
  return a !== void 0 ? te(e.timeInStage) + " · waits on " + a.agent : te(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function wu(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(iu(a ?? [])) + ")"
  };
}
function _u(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function vu(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: Q(e.cost) }) : null;
}
function fu(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function bu(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function pu(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function gu(e, a) {
  return a === void 0 ? e : ou(e, a.ref);
}
function Nu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ve(e) {
  return e === !0 ? "true" : void 0;
}
function Ln(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = na(o), c = N(/* @__PURE__ */ new Set()), [s, u] = g(uu(a));
  du(e.feed, a.key, c, u, i);
  const d = hu(a, r), h = mu(a, t), _ = wu(a, e.fields), b = pu(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...Nu(e),
      className: "ward-workcard",
      "data-flagged": Ve(a.flagged),
      "data-selected": Ve(e.selected),
      style: _,
      ref: gu(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        _u(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          vu(a, e.fields),
          fu(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          bu(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function yu({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function ku(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function $u(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Cu(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(yu, { count: e.items.length, cap: e.column.cap });
}
function Su(e, a) {
  return e.roving ?? a;
}
function Ru(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Tu(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    Ln,
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
function Lu(e) {
  const a = k(), t = wa({ orientation: "vertical" }), r = Su(e, t), o = ku(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ve(o), "data-gate": Ve(e.column.gate), children: [
    $u(e.column, e.items.length, a),
    Cu(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Ru(e, t), children: Tu(e, r) })
  ] });
}
function xu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + te(e.p50)), e.p90 !== void 0 && (a += " · p90 " + te(e.p90)), a;
}
function Eu(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Au(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function n1(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: xu(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      Eu(e),
      Au(e.onConfigure),
      /* @__PURE__ */ n(ja, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function qu(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Iu(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ie, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ie, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Mu(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(E, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function t1(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": Ve(qu(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Iu(e) }),
    /* @__PURE__ */ n(L, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Nn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Mu(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function r1(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Ln, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Lu, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Bu(e, a) {
  const t = Tn(e);
  t !== void 0 && a(t);
}
function Pu(e, a, t) {
  A(() => {
    if (e != null)
      return e.subscribe(a, (r) => Bu(r, t));
  }, [e, a, t]);
}
function Du(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Ou(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", te(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", Q(e.cost)]), a;
}
function Hu(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Fu(e, a) {
  return /* @__PURE__ */ l(E, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function l1(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = g((c = a.run) == null ? void 0 : c.lastStep);
  Pu(e.feed, a.key, o);
  const i = [...Du(a), ...Ou(a)];
  return /* @__PURE__ */ l(Je, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Hu(t, r)
    ] }),
    Fu(a, e.actions)
  ] });
}
const ju = "_card_hvxp7_2", Wu = "_head_hvxp7_17", zu = "_mark_hvxp7_25", Gu = "_name_hvxp7_37", Ku = "_chips_hvxp7_48", Uu = "_description_hvxp7_54", Vu = "_run_hvxp7_59", Yu = "_sep_hvxp7_68", Ju = "_facts_hvxp7_73", Xu = "_fact_hvxp7_73", Qu = "_factLabel_hvxp7_86", Zu = "_factValue_hvxp7_90", ee = {
  card: ju,
  head: Wu,
  mark: zu,
  name: Gu,
  chips: Ku,
  description: Uu,
  run: Vu,
  sep: Yu,
  facts: Ju,
  fact: Xu,
  factLabel: Qu,
  factValue: Zu
}, eh = { live: "done", draft: "running", paused: "meta" };
function ah(e) {
  return e === void 0 ? ee.card : `${ee.card} ${e}`;
}
function nh({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ee.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: eh[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function th({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ee.description, children: e });
}
function rh({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ee.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ee.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function lh({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ee.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: ee.fact, children: [
    /* @__PURE__ */ n("dt", { className: ee.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: ee.factValue, children: a.value })
  ] }, a.label)) });
}
function oh(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function ih({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, facts: i, className: c }) {
  const s = { "--stream": Ce(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": u,
      className: ah(c),
      style: s,
      "data-selected": u,
      "data-paused": oh(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: ee.head, children: [
          /* @__PURE__ */ n("span", { className: ee.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ee.name} ward-rowlink`, href: a, "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(th, { description: e.description }),
        /* @__PURE__ */ n(rh, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(nh, { versions: e.versions }),
        /* @__PURE__ */ n(lh, { facts: i })
      ]
    }
  );
}
const ch = "_list_4dcyc_2", sh = "_row_4dcyc_11", dh = "_head_4dcyc_23", uh = "_id_4dcyc_30", hh = "_lock_4dcyc_35", mh = "_reason_4dcyc_41", wh = "_remove_4dcyc_46", _h = "_clauses_4dcyc_50", vh = "_clause_4dcyc_50", fh = "_label_4dcyc_64", bh = "_cell_4dcyc_71", ph = "_value_4dcyc_76", ne = {
  list: ch,
  row: sh,
  head: dh,
  id: uh,
  lock: hh,
  reason: mh,
  remove: wh,
  clauses: _h,
  clause: vh,
  label: fh,
  cell: bh,
  value: ph
}, xn = ze(!1);
function o1({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(xn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ne.list, "aria-label": a, children: e }) });
}
function gh({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ne.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(L, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => t(e.key, o) });
}
function Nh({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ne.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ne.reason, children: e })
  ] });
}
function yh({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: ne.head, children: [
    /* @__PURE__ */ n("span", { className: ne.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Nh, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ne.remove, children: /* @__PURE__ */ l(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function cn(e, a) {
  return e.locked ? void 0 : a;
}
function i1({ rule: e, onChange: a, onRemove: t }) {
  if (!We(xn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = cn(e, a);
  return /* @__PURE__ */ l("li", { className: ne.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(yh, { rule: e, onRemove: cn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ne.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ne.clause, children: [
      /* @__PURE__ */ n("dt", { className: ne.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ne.cell, children: /* @__PURE__ */ n(gh, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const kh = "_ladder_wwnch_2", $h = "_cell_wwnch_7", Ch = "_empty_wwnch_26", Sh = "_name_wwnch_34", Rh = "_holder_wwnch_40", Th = "_request_wwnch_46", Lh = "_swatches_wwnch_51", xh = "_swatch_wwnch_51", Eh = "_tilesFrame_wwnch_78", Ah = "_tiles_wwnch_78", qh = "_tile_wwnch_78", Ih = "_bar_wwnch_117", Mh = "_hex_wwnch_128", Bh = "_note_wwnch_138", R = {
  ladder: kh,
  cell: $h,
  empty: Ch,
  name: Sh,
  holder: Rh,
  request: Th,
  swatches: Lh,
  swatch: xh,
  tilesFrame: Eh,
  tiles: Ah,
  tile: qh,
  bar: Ih,
  hex: Mh,
  note: Bh
}, Ph = "not validated yet, pending a CVD matrix and dark stepping";
function Dh(e) {
  return e.reserved ? "reserved" : va(e.step) ? "validated" : "partial";
}
function En(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Oh(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Hh({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Se, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Fh(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function jh(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const sn = (e) => String(e).padStart(2, "0");
function Wh(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? En(e, void 0);
}
function zh({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(E, { children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: r ? `step ${sn(e)}` : St(e) }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: r ? t : `Step ${sn(e)} · ${t}` })
  ] });
}
function Gh({ step: e, value: a, taken: t, onChange: r, presentation: o }) {
  const i = Dh(e), c = En(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, _ = `${d} · ${o === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...jh(s, u), "data-validation": i, style: Oh(e, i), onClick: h, onKeyDown: (x) => Fh(x, h) }, label: _, name: d, holder: c, validation: i, note: Wh(i, t, u), step: e.step };
}
const Kh = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${R.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${R.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(zh, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${R.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Hh, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Uh(e) {
  return Kh[e.presentation](Gh(e));
}
function Vh(e) {
  for (const a of e)
    if (!a.reserved && !_a(a.step)) throw new Error("colour ladder renders token steps only");
}
function Yh() {
  return /* @__PURE__ */ l("div", { className: `${R.cell} ward-ladder-cell ${R.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Jh(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Xh = { list: R.ladder, swatches: R.swatches, tiles: R.tilesFrame };
function Qh() {
  return /* @__PURE__ */ l("div", { className: `${R.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Zh = { list: Yh, swatches: () => null, tiles: Qh };
function An(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  Vh(e.steps);
  const r = Jh(e), o = Zh[r], i = /* @__PURE__ */ l(E, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(Uh, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${Xh[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: R.tiles, children: i }) : i });
}
const em = "_rail_1el2t_2", am = "_section_1el2t_12", nm = "_sectionFlush_1el2t_22", tm = "_head_1el2t_26", rm = "_headLabel_1el2t_34", lm = "_sample_1el2t_42", om = "_sampleLabel_1el2t_47", im = "_sampleTitle_1el2t_54", cm = "_sampleMeta_1el2t_59", sm = "_trace_1el2t_65", dm = "_traceHead_1el2t_70", um = "_steps_1el2t_78", hm = "_step_1el2t_78", mm = "_stepTitle_1el2t_97", wm = "_hollow_1el2t_107", _m = "_stepBody_1el2t_115", vm = "_stepDetail_1el2t_127", fm = "_publish_1el2t_132", bm = "_reason_1el2t_138", pm = "_note_1el2t_143", gm = "_reveal_1el2t_148", p = {
  rail: em,
  section: am,
  sectionFlush: nm,
  head: tm,
  headLabel: rm,
  sample: lm,
  sampleLabel: om,
  sampleTitle: im,
  sampleMeta: cm,
  trace: sm,
  traceHead: dm,
  steps: um,
  step: hm,
  stepTitle: mm,
  hollow: wm,
  stepBody: _m,
  stepDetail: vm,
  publish: fm,
  reason: bm,
  note: pm,
  reveal: gm
}, dn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Nm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, ym = { ok: "greenFill", finding: "orangeFill", action: "blue" }, km = { notSimulated: "not simulated", running: "running" };
function $m(e) {
  return e.presentation === "foundry";
}
function Cm(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Sm(e, a) {
  var r;
  const t = Nm[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function Rm(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Tm(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Lm(e) {
  if (Rm(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function xm(e) {
  const [a, t] = g(!1);
  A(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Em(e) {
  const a = km[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Se, { size: 6, kind: ym[e.kind], label: e.kind });
}
function Am(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function qm(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Im(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(xm, { kind: a.kind, children: [
    /* @__PURE__ */ n(Em, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Am, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(qm, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Mm(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(te(a)), t.join(" · ");
}
function qn(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: Mm(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Im, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Bm(e) {
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
function Pm(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + re(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Dm(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : Q(e.run.cost), label: "Cost" }, { value: e.run.turns ? bn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(pa, { divided: !0, cells: a }) });
}
function Om(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: Q(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: bn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Hm(e) {
  const a = Om(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(pa, { divided: !0, cells: a }) });
}
function In(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ l(E, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Fm(e) {
  return /* @__PURE__ */ l("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(In, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function jm(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(In, { reason: e.reason, onPublish: e.onPublish }) });
}
function Mn(e) {
  return /* @__PURE__ */ l("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: dn[e.run.status].role, label: dn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Wm(e, a) {
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
function zm(e) {
  var t;
  Tm(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Mn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Bm, { sample: e.run.sample }),
    /* @__PURE__ */ n(qn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Dm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(ya, { items: e.checklist }) }),
    /* @__PURE__ */ n(Fm, { reason: Cm(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Gm(e) {
  var r;
  const a = Wm(e.run, e.feed);
  Lm(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Mn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Pm, { sample: e.run.sample }),
    /* @__PURE__ */ n(qn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Hm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(ya, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(jm, { reason: Sm(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function c1(e) {
  return $m(e) ? /* @__PURE__ */ n(Gm, { ...e }) : /* @__PURE__ */ n(zm, { ...e });
}
const Km = "_list_142ip_3", Um = "_row_142ip_9", Vm = "_condition_142ip_18", Ym = "_action_142ip_24", ta = {
  list: Km,
  row: Um,
  condition: Vm,
  action: Ym
}, Bn = ze(!1);
function s1({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Bn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ta.list, "aria-label": a, children: e }) });
}
function d1({ rule: e }) {
  if (!We(Bn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: ta.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: ta.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: ta.action, children: e.then })
  ] });
}
function Ia(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [o] = r.splice(a, 1);
  return r.splice(t, 0, o), r;
}
function Pn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Dn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function un(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Jm(e) {
  return e === "up" ? "down" : "up";
}
function Xm(e, a) {
  const t = un(e, a.id, a.direction) ?? un(e, a.id, Jm(a.direction));
  t == null || t.focus();
}
function On() {
  const e = N(null), [a, t] = g(null), [r, o] = g("");
  return A(() => {
    e.current !== null && a !== null && Xm(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), o(s);
  } };
}
function Hn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function da({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Qm = "_body_1h15q_2", Zm = "_title_1h15q_8", ew = "_section_1h15q_13", aw = "_legend_1h15q_18", nw = "_stages_1h15q_26", tw = "_stage_1h15q_26", rw = "_stageIndex_1h15q_44", lw = "_stageName_1h15q_50", ow = "_footer_1h15q_59", iw = "_note_1h15q_66", cw = "_reason_1h15q_71", sw = "_actions_1h15q_76", dw = "_webHead_1h15q_83", uw = "_kicker_1h15q_92", hw = "_webTitle_1h15q_99", mw = "_webBody_1h15q_105", ww = "_webSection_1h15q_109", _w = "_sectionHead_1h15q_121", vw = "_sectionNote_1h15q_129", fw = "_formLabel_1h15q_134", bw = "_identityRow_1h15q_139", pw = "_nameCell_1h15q_145", gw = "_keyCell_1h15q_150", Nw = "_colourCell_1h15q_154", yw = "_colourStatus_1h15q_161", kw = "_webStages_1h15q_166", $w = "_webStageList_1h15q_172", Cw = "_webStage_1h15q_166", Sw = "_webIndex_1h15q_191", Rw = "_webStageName_1h15q_196", Tw = "_webMoves_1h15q_201", Lw = "_addStage_1h15q_215", xw = "_addStageButton_1h15q_223", Ew = "_addStageNote_1h15q_231", Aw = "_webFooter_1h15q_236", qw = "_webFooterNotes_1h15q_244", Iw = "_webNote_1h15q_251", w = {
  body: Qm,
  title: Zm,
  section: ew,
  legend: aw,
  stages: nw,
  stage: tw,
  stageIndex: rw,
  stageName: lw,
  footer: ow,
  note: iw,
  reason: cw,
  actions: sw,
  webHead: dw,
  kicker: uw,
  webTitle: hw,
  webBody: mw,
  webSection: ww,
  sectionHead: _w,
  sectionNote: vw,
  formLabel: fw,
  identityRow: bw,
  nameCell: pw,
  keyCell: gw,
  colourCell: Nw,
  colourStatus: yw,
  webStages: kw,
  webStageList: $w,
  webStage: Cw,
  webIndex: Sw,
  webStageName: Rw,
  webMoves: Tw,
  addStage: Lw,
  addStageButton: xw,
  addStageNote: Ew,
  webFooter: Aw,
  webFooterNotes: qw,
  webNote: Iw
}, Mw = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Fn = "not in catalogue";
function Bw(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Fn}` }, ...t];
}
function Pw({ stage: e, index: a, catalogue: t, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(L, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Fn}`;
  return /* @__PURE__ */ n(L, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: Bw(t, e.name), invalid: i, onChange: r });
}
function jn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Dw(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Ow({ id: e, stage: a, index: t, total: r, catalogue: o, onReplace: i, onMove: c }) {
  const s = jn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(Pw, { stage: a, index: t, catalogue: o, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(L, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Mw, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(da, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(da, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function Hw({ stages: e, onChange: a, catalogue: t }) {
  const r = Dw(e.length), o = On(), i = (s, u) => {
    const d = Pn(s, u);
    r.current = Ia(r.current, s, d), o.moved({ id: r.current[d], direction: u }, Dn(jn(e[s], s), d, e.length)), a(Ia(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(Ow, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Hn, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Fw = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], jw = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Ww = "A new stream starts as a draft. Nothing runs on it until you publish it.", zw = "Create is disabled: name the stream and give it a key first.", Gw = "reorder with the ↑ ↓ buttons · min 2";
function Wa(e, a) {
  return !e.reserved && va(e.step) && a[e.step] === void 0;
}
function Kw(e, a) {
  const t = e.find((r) => Wa(r, a));
  return t ? t.step : 1;
}
function Uw({ stages: e, onMove: a }) {
  const t = On(), r = (o, i) => {
    const c = Pn(o, i);
    t.moved({ id: e[o].id, direction: i }, Dn(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(E, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: w.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(da, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(da, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Hn, { text: t.announcement })
  ] });
}
function Vw({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: Ww }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Yw(e, a) {
  return e !== "" && a !== "" ? null : zw;
}
function Jw(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = jw, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [h, _] = g(""), [b, x] = g(""), [G, J] = g(a[0].value), [le, Ne] = g(() => Kw(t, r)), [oe, Me] = g(e.stages ?? Fw), [Be, $] = g(o[0].value), F = { name: h, key: b, streamStep: le, owner: G, stages: oe, policy: Be }, me = Yw(h, b);
  return /* @__PURE__ */ n(Je, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ l("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Stream name", value: h, onChange: _ }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Key", value: b, onChange: x, mono: !0 }),
      /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: G, onChange: J, options: a })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(An, { label: "Stream colour", steps: t, value: le, onChange: Ne, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(Uw, { stages: oe, onMove: (Re, it) => Me(Ia(oe, Re, it)) })
    ] }),
    /* @__PURE__ */ n($n, { legend: "Loop policy", options: o, value: Be, onChange: $ }),
    /* @__PURE__ */ n(Vw, { reason: me, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const Wn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Xw = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function Qw(e, a, t, r, o, i) {
  var s;
  const c = ((s = Wn.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function Zw(e, a) {
  return e_(e) && a_(e, a) && n_(e);
}
function e_(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function a_(e, a) {
  return e.colourStep !== null && Wa({ step: e.colourStep }, a);
}
function n_(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function t_(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${Ph}.` : Wa({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function r_({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function l_({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(r_, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: Xw })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function o_({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function i_({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(L, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(L, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function c_(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [o, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, x] = g("relay"), [G, J] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = Qw(o, c, u, h, b, G), Ne = Zw(le, r), oe = G.find(($) => $.kind === "agent" && $.name.trim() !== ""), Me = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(An, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), Be = /* @__PURE__ */ l(E, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: t_(h, r) }),
    /* @__PURE__ */ n(L, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Je, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(o_, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(i_, { name: o, setName: i, streamKey: c, setKey: s, colour: Me, owner: Be }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: Gw })
        ] }),
        /* @__PURE__ */ n(Hw, { stages: G, onChange: J })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n($n, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Wn, onChange: x }) }),
      /* @__PURE__ */ n(l_, { ready: Ne, draft: le, agentStage: oe, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function u1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(c_, { ...e }) : /* @__PURE__ */ n(Jw, { ...e });
}
const s_ = "_row_bs8hc_2", d_ = "_cell_bs8hc_6", u_ = "_condition_bs8hc_11", h_ = "_action_bs8hc_18", m_ = "_contract_bs8hc_24", w_ = "_contractCondition_bs8hc_33", __ = "_contractAction_bs8hc_39", V = {
  row: s_,
  cell: d_,
  condition: u_,
  action: h_,
  contract: m_,
  contractCondition: w_,
  contractAction: __
}, zn = ["advance", "block", "escalate", "requestReview"], hn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ua(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function za(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: V.action, children: hn[e.then] }) : /* @__PURE__ */ n(
    L,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => a({ ...e, then: o }),
      options: zn.map((o) => ({ value: o, label: hn[o] }))
    }
  );
}
function v_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { className: V.condition, title: ua(e, r), children: ua(e, r) }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: za(e, a, t) })
  ] });
}
function f_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ l("td", { className: V.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: V.condition, children: ua(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: V.cell, children: za(e, a, t) })
  ] });
}
function b_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: V.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: V.contractCondition, children: ua(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: V.contractAction, children: za(e, a, t, !0) })
  ] });
}
const p_ = { two: f_, four: v_, contract: b_ };
function h1(e) {
  var t;
  if (!zn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = p_[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const g_ = "_column_lurgk_2", N_ = "_head_lurgk_17", y_ = "_index_lurgk_23", k_ = "_name_lurgk_29", $_ = "_meta_lurgk_38", C_ = "_mono_lurgk_43", S_ = "_gate_lurgk_50", R_ = "_reviewersLabel_lurgk_57", T_ = "_reviewers_lurgk_57", L_ = "_reviewer_lurgk_57", x_ = "_agents_lurgk_74", E_ = "_workflowColumn_lurgk_79", A_ = "_workflowHead_lurgk_96", q_ = "_stageRow_lurgk_102", I_ = "_stageLabel_lurgk_109", M_ = "_workflowTitle_lurgk_116", B_ = "_workflowMeta_lurgk_122", P_ = "_workflowGate_lurgk_127", D_ = "_gateNote_lurgk_135", O_ = "_cardNote_lurgk_140", H_ = "_reviewerList_lurgk_149", F_ = "_reviewerRow_lurgk_155", j_ = "_reviewerMark_lurgk_161", W_ = "_reviewerName_lurgk_171", z_ = "_terminalCard_lurgk_177", G_ = "_terminalCount_lurgk_186", K_ = "_workflowAgents_lurgk_192", U_ = "_mount_lurgk_198", y = {
  column: g_,
  head: N_,
  index: y_,
  name: k_,
  meta: $_,
  mono: C_,
  gate: S_,
  reviewersLabel: R_,
  reviewers: T_,
  reviewer: L_,
  agents: x_,
  workflowColumn: E_,
  workflowHead: A_,
  stageRow: q_,
  stageLabel: I_,
  workflowTitle: M_,
  workflowMeta: B_,
  workflowGate: P_,
  gateNote: D_,
  cardNote: O_,
  reviewerList: H_,
  reviewerRow: F_,
  reviewerMark: j_,
  reviewerName: W_,
  terminalCard: z_,
  terminalCount: G_,
  workflowAgents: K_,
  mount: U_
}, V_ = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Ga(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Gn(e) {
  return `${Math.round(e * 100)}%`;
}
function Y_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(pa, { cells: [
      { value: Gn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function J_({ stage: e }) {
  return /* @__PURE__ */ n(pa, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Ga(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function X_({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: V_[e.kind] })
  ] });
}
function Q_({ stage: e }) {
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
function Z_({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Y_, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(J_, { stage: e }) : null;
}
function ev({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function av({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(X_, { stage: e, titleId: o }),
    /* @__PURE__ */ n(Q_, { stage: e }),
    /* @__PURE__ */ n(Z_, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(ih, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(ev, { onMount: t })
  ] });
}
const nv = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function tv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function rv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(tv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Gn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function lv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function ov({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: Ga(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: lv(e.rolledBackThisWeek) })
  ] });
}
function iv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function cv(e) {
  if (e.kind === "terminal") return `${Ga(e.closedThisWeek)} this week`;
  const a = iv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function sv({ stage: e, titleId: a }) {
  const t = nv[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: cv(e) })
  ] });
}
function dv(e) {
  return e === "entry" || e === "agent";
}
function uv({ stage: e, onMount: a }) {
  return a === void 0 || !dv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function hv({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(sv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(rv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(ov, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(uv, { stage: e, onMount: t })
  ] });
}
function mv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function m1(e) {
  return mv(e) ? /* @__PURE__ */ n(hv, { ...e }) : /* @__PURE__ */ n(av, { ...e });
}
const wv = "_row_ve78g_6", _v = "_cell_ve78g_10", vv = "_name_ve78g_19", fv = "_chain_ve78g_26", bv = "_owner_ve78g_32", pv = "_mono_ve78g_38", gv = "_compactRow_ve78g_45", Nv = "_compactCell_ve78g_54", yv = "_stack_ve78g_71", kv = "_stat_ve78g_78", $v = "_identityLine_ve78g_85", Cv = "_identity_ve78g_85", Sv = "_compactName_ve78g_103", Rv = "_ownerLine_ve78g_117", Tv = "_link_ve78g_130", Lv = "_emptyChain_ve78g_136", xv = "_arrow_ve78g_142", Ev = "_muted_ve78g_143", Av = "_define_ve78g_148", qv = "_statValue_ve78g_155", Iv = "_policyId_ve78g_161", Mv = "_sub_ve78g_166", f = {
  row: wv,
  cell: _v,
  name: vv,
  chain: fv,
  owner: bv,
  mono: pv,
  compactRow: gv,
  compactCell: Nv,
  stack: yv,
  stat: kv,
  identityLine: $v,
  identity: Cv,
  compactName: Sv,
  ownerLine: Rv,
  link: Tv,
  emptyChain: Lv,
  arrow: xv,
  muted: Ev,
  define: Av,
  statValue: qv,
  policyId: Iv,
  sub: Mv
};
function Bv(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Pv(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function Kn(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Dv(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Kn(e.members)}`;
}
function Ov(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Dv(e) })
  ] }) });
}
function Hv(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function Fv(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : Hv(e) });
}
function mn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function jv(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function Wv(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function zv({ stream: e, href: a, presentation: t }) {
  const r = Pv(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ce(e.streamStep, "chip") }, children: [
    Ov(e, a),
    Fv(e.stages, a),
    mn(Wv(e.agents), e.agents === void 0 ? void 0 : Bv(e.agents), "—"),
    jv(e.policy),
    mn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function Gv(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function w1(e) {
  if (Gv(e)) return zv(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ l("tr", { className: f.row, children: [
    /* @__PURE__ */ l("td", { className: f.cell, children: [
      /* @__PURE__ */ n("a", { className: f.name, href: t, children: a.name }),
      /* @__PURE__ */ n(m, { ...ba(a.key, a.streamStep) }),
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
      /* @__PURE__ */ n("span", { className: f.mono, children: Kn(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : te(a.p50) }) })
  ] });
}
const Kv = "_row_mdce7_2", Uv = "_name_mdce7_16", Vv = "_scope_mdce7_24", ha = {
  row: Kv,
  name: Uv,
  scope: Vv
};
function Yv(e) {
  return e === void 0 ? `${ha.row} ward-toolrow` : `${ha.row} ward-toolrow ${e}`;
}
function Jv(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Xv({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
function Qv({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Zv({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${ha.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function ef(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function _1({ tool: e, onChange: a, presentation: t }) {
  const r = k(), o = k(), i = Jv(e, t), c = ef(t);
  return /* @__PURE__ */ l(c, { className: Yv(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Xv, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${ha.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Zv, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(Qv, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const af = "_strip_1qtlf_2", nf = "_head_1qtlf_10", tf = "_name_1qtlf_16", rf = "_chart_1qtlf_24", lf = "_segment_1qtlf_30", of = "_detailedChart_1qtlf_36", cf = "_rail_1qtlf_49", sf = "_section_1qtlf_55", df = "_label_1qtlf_66", uf = "_note_1qtlf_83", Y = {
  strip: af,
  head: nf,
  name: tf,
  chart: rf,
  segment: lf,
  detailedChart: of,
  rail: cf,
  section: sf,
  label: df,
  note: uf
}, hf = "No item in flight to preview.", mf = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", wf = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Ma = [1, 2, 3, 4, 5, 6], ma = 100;
function _f(e, a) {
  return a.has(e) ? Ce(e, "id") : "var(--ward-color-line)";
}
function vf({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: Y.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ma.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: Y.segment,
      x: o * ma,
      y: "0",
      width: ma,
      height: "8",
      fill: _f(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function ff(e) {
  const a = e.slice(0, Ma.length);
  for (; a.length < Ma.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function bf({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${Y.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ma),
        y: "0",
        width: String(ma),
        height: "40",
        style: { fill: Ce(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function Un(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ea({ label: e, children: a }) {
  const t = k();
  return /* @__PURE__ */ l("section", { className: Y.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: Y.label, children: e }),
    a
  ] });
}
function pf({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: Y.note, children: a ?? hf }) : /* @__PURE__ */ n(Na, { item: { ...e, streamStep: fa(t.streamStep) }, onOpen: Un(r), feed: null });
}
function gf({ draft: e }) {
  const a = { "--stream": Ce(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: Y.head, style: a, children: [
    /* @__PURE__ */ n(Se, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: Y.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...ba(e.key, e.streamStep) })
  ] });
}
function Nf(e) {
  const a = ff(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("div", { className: Y.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ea, { label: "Board card", children: /* @__PURE__ */ n(pf, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ea, { label: "Streams index row", children: /* @__PURE__ */ n(gf, { draft: t }) }),
    /* @__PURE__ */ l(ea, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(bf, { identities: a }),
      /* @__PURE__ */ n("p", { className: Y.note, children: mf })
    ] }),
    /* @__PURE__ */ n(ea, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: Y.note, children: wf }) })
  ] });
}
function yf({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": Ce(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: Y.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: Y.head, children: [
      /* @__PURE__ */ n(Se, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: Y.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...ba(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(Na, { item: { ...a, streamStep: e.streamStep }, onOpen: Un(r) }),
    /* @__PURE__ */ n(vf, { draft: e, streams: t })
  ] });
}
function v1(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Nf, { ...e }) : /* @__PURE__ */ n(yf, { ...e });
}
const kf = "_row_ixlg5_6", $f = "_headCell_ixlg5_10", Cf = "_cell_ixlg5_11", Sf = "_name_ixlg5_23", Rf = "_consequence_ixlg5_29", Tf = "_governed_ixlg5_36", Lf = "_control_ixlg5_42", xf = "_byRole_ixlg5_48", Ef = "_webControl_ixlg5_59", Af = "_webConsequence_ixlg5_65", qf = "_webGoverned_ixlg5_71", P = {
  row: kf,
  headCell: $f,
  cell: Cf,
  name: Sf,
  consequence: Rf,
  governed: Tf,
  control: Lf,
  byRole: xf,
  webControl: Ef,
  webConsequence: Af,
  webGoverned: qf
};
function If({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: P.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: P.control, children: [
    /* @__PURE__ */ n(
      Ie,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "PILOT" })
  ] });
}
function Mf({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(If, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Bf(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Pf({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Ie,
    {
      label: `${e} · step ${a.streamStep}`,
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
function Df({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(Pf, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: Bf(e) }) })
  ] });
}
function f1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Df, { ...e }) : /* @__PURE__ */ n(Mf, { ...e });
}
const Of = "_row_vv64h_2", Hf = "_cell_vv64h_6", Ff = "_name_vv64h_25", jf = "_note_vv64h_30", Wf = "_webName_vv64h_41", zf = "_webMeta_vv64h_47", z = {
  row: Of,
  cell: Hf,
  name: Ff,
  note: jf,
  webName: Wf,
  webMeta: zf
}, Vn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Gf(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Kf({ component: e, onRestart: a }) {
  const t = k(), r = Vn[e.state], o = e.state === "drainFirst";
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
function Uf({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: Gf(e.state) });
}
function Vf({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { ...Vn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(Uf, { component: e, onRestart: a }) })
  ] });
}
function b1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Vf, { ...e }) : /* @__PURE__ */ n(Kf, { ...e });
}
const Yf = "_row_1f1gp_7", Jf = "_cell_1f1gp_11", Xf = "_next_1f1gp_28", Qf = "_headCell_1f1gp_38", Zf = "_webId_1f1gp_77", eb = "_webPurpose_1f1gp_83", ab = "_webMeta_1f1gp_91", nb = "_webUrgent_1f1gp_97", O = {
  row: Yf,
  cell: Jf,
  next: Xf,
  headCell: Qf,
  webId: Zf,
  webPurpose: eb,
  webMeta: ab,
  webUrgent: nb
}, tb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, rb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, Yn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], lb = Object.fromEntries(Yn.map((e) => [e.key, e]));
function De({ column: e, children: a }) {
  const t = lb[e];
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
function p1() {
  return /* @__PURE__ */ n("tr", { children: Yn.map((e) => /* @__PURE__ */ n(
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
function ob({ cred: e }) {
  const a = tb[e.state];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n(De, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(De, { column: "id", children: e.id }),
    /* @__PURE__ */ n(De, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(De, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(De, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(De, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function ib({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function cb({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(ib, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...rb[e.state] }) })
  ] });
}
function g1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(cb, { ...e }) : /* @__PURE__ */ n(ob, { ...e });
}
const sb = "_card_17zba_2", db = "_head_17zba_11", ub = "_env_17zba_18", hb = "_version_17zba_25", mb = "_meta_17zba_32", wb = "_webCard_17zba_37", _b = "_webRow_17zba_47", vb = "_webTitle_17zba_55", fb = "_webLine_17zba_65", bb = "_webVersion_17zba_72", pb = "_webMeta_17zba_77", W = {
  card: sb,
  head: db,
  env: ub,
  version: hb,
  meta: mb,
  webCard: wb,
  webRow: _b,
  webTitle: vb,
  webLine: fb,
  webVersion: bb,
  webMeta: pb
}, Jn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function gb({ env: e }) {
  const a = Jn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function Nb(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [re(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function yb(e) {
  return /* @__PURE__ */ l("article", { className: `${W.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${W.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${W.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Jn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${W.version} ${W.webVersion} ${W.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${W.meta} ${W.webMeta} ${W.webLine} ward-cellmeta`, children: Nb(e) })
  ] });
}
function N1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(yb, { ...e }) : /* @__PURE__ */ n(gb, { ...e });
}
const kb = "_panel_1hmja_2", $b = "_line_1hmja_8", Cb = "_actions_1hmja_14", aa = {
  panel: kb,
  line: $b,
  actions: Cb
};
function y1(e) {
  return /* @__PURE__ */ l("div", { className: aa.panel, children: [
    /* @__PURE__ */ n("p", { className: aa.line, children: e.status }),
    /* @__PURE__ */ n(L, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: aa.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: aa.line, children: e.note ?? "" })
  ] });
}
const Sb = "_upload_erepj_2", Rb = "_preview_erepj_7", Tb = "_mark_erepj_17", Lb = "_empty_erepj_22", xb = "_actions_erepj_28", Eb = "_input_erepj_33", Ab = "_reasons_erepj_41", qb = "_reason_erepj_41", Ib = "_accepted_erepj_57", X = {
  upload: Sb,
  preview: Rb,
  mark: Tb,
  empty: Lb,
  actions: xb,
  input: Eb,
  reasons: Ab,
  reason: qb,
  accepted: Ib
}, Xn = 1.5, Qn = 22, Ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Xn}px at ${Qn}px`];
function Mb() {
  return { ok: !1, reasons: [Ye[1]] };
}
function Bb(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function Pb(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ye[0]] : [];
}
function Db(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ye[1]), e.querySelector("text") !== null && t.push(Ye[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function Ob(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? Qn / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Xn;
  }) ? [Ye[3]] : [];
}
function k1(e) {
  const a = Bb(e);
  if (a === null) return Mb();
  const t = [...Pb(a), ...Db(a, e), ...Ob(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const Hb = "Mark accepted.";
function Fb({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: X.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: X.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: X.empty }) });
}
function jb(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Wb(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function zb({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: X.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: X.result, role: "status", children: /* @__PURE__ */ n("p", { className: X.accepted, children: Hb }) }) : /* @__PURE__ */ n("div", { className: X.result, role: "status", children: /* @__PURE__ */ n("ul", { className: X.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: X.reason, children: a }, a)) }) });
}
function Gb({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(zb, { result: e }) : /* @__PURE__ */ n("p", { className: `${X.result} ${jb(e, t)}`, role: "status", children: Wb(e, t) });
}
function $1({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: X.upload, children: [
    /* @__PURE__ */ n(Fb, { current: e }),
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
    /* @__PURE__ */ n(Gb, { result: i, presentation: r })
  ] });
}
const Kb = "_row_1wp9s_7", Ub = "_cell_1wp9s_11", Vb = "_head_1wp9s_28", Yb = "_name_1wp9s_34", Jb = "_pinned_1wp9s_42", Xb = "_headCell_1wp9s_49", Qb = "_webName_1wp9s_88", Zb = "_webMeta_1wp9s_95", ep = "_webWarn_1wp9s_103", q = {
  row: Kb,
  cell: Ub,
  head: Vb,
  name: Yb,
  pinned: Jb,
  headCell: Xb,
  webName: Qb,
  webMeta: Zb,
  webWarn: ep
}, Ka = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, Zn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], ap = Object.fromEntries(Zn.map((e) => [e.key, e]));
function np(e, a) {
  return `mcp.${e}.${a}`;
}
function tp(e) {
  return Object.keys(Ka).includes(e);
}
function rp(e) {
  return Ka[e !== void 0 && tp(e) ? e : "unknown"];
}
function Ge({ column: e, children: a }) {
  const t = ap[e];
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
function C1() {
  return /* @__PURE__ */ n("tr", { children: Zn.map((e) => /* @__PURE__ */ n(
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
function lp({ server: e }) {
  const a = Ka[e.connection];
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
    /* @__PURE__ */ n(Ge, { column: "tools", children: e.tools.map((t) => np(e.name, t)).join(" · ") })
  ] });
}
function op(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function ip(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function cp({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function sp({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function dp({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function up({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: op(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...ip(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(cp, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...rp(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n(sp, { server: e, onRestart: a }),
      /* @__PURE__ */ n(dp, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function S1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(up, { ...e }) : /* @__PURE__ */ n(lp, { ...e });
}
const hp = "_row_1h9nq_2", mp = "_headCell_1h9nq_14", wp = "_cell_1h9nq_15", _p = "_name_1h9nq_26", vp = "_consequence_1h9nq_32", fp = "_reason_1h9nq_38", bp = "_value_1h9nq_44", pp = "_webRow_1h9nq_60", gp = "_webSetting_1h9nq_71", Np = "_webName_1h9nq_79", yp = "_webConsequence_1h9nq_87", kp = "_webControl_1h9nq_93", $p = "_webState_1h9nq_106", Cp = "_webChip_1h9nq_111", T = {
  row: hp,
  headCell: mp,
  cell: wp,
  name: _p,
  consequence: vp,
  reason: fp,
  value: bp,
  webRow: pp,
  webSetting: gp,
  webName: Np,
  webConsequence: yp,
  webControl: kp,
  webState: $p,
  webChip: Cp
}, et = 104, at = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Sp({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ie, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(yn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: T.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Rp({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), i = at[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: T.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: T.headCell, children: [
      /* @__PURE__ */ n("span", { className: T.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: T.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: T.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: T.cell, children: /* @__PURE__ */ n(Sp, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: T.cell, style: { width: et }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function nt(e, a) {
  return String(e ?? a);
}
function Tp(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Lp(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? nt(e.value, "—");
}
function xp({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: T.webControl, children: [
    /* @__PURE__ */ n(Ie, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: T.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function Ep(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(xp, { ...e });
  const o = Tp(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: T.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(yn, { options: o, value: nt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${T.webControl} ${T.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: Lp(a) });
}
function Ap({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = k(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${T.row} ${T.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: T.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${T.name} ${T.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${T.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: T.webControl, children: i(c) }) : /* @__PURE__ */ n(Ep, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${T.webChip} ward-policy-chip`, style: { width: et }, children: /* @__PURE__ */ n(m, { ...at[t], size: "tag" }) })
  ] });
}
function R1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ap, { ...e }) : /* @__PURE__ */ n(Rp, { ...e });
}
const qp = "_label_1o9za_7", Ip = "_name_1o9za_15", Mp = "_column_1o9za_24", Bp = "_webFrame_1o9za_57", Pp = "_webHead_1o9za_62", Dp = "_webHeadLabel_1o9za_74", Op = "_webLabel_1o9za_112", Hp = "_webColumns_1o9za_119", Fp = "_webGroup_1o9za_125", jp = "_webPeople_1o9za_126", Wp = "_webVia_1o9za_127", zp = "_webMeta_1o9za_156", H = {
  label: qp,
  name: Ip,
  column: Mp,
  webFrame: Bp,
  webHead: Pp,
  webHeadLabel: Dp,
  webLabel: Op,
  webColumns: Hp,
  webGroup: Fp,
  webPeople: jp,
  webVia: Wp,
  webMeta: zp
}, Gp = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, Ra = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Ta({ column: e, children: a }) {
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
function Kp(e) {
  if (!e.matrixRole) return;
  const a = Gp[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Up({ node: e }) {
  const a = Kp(e);
  return /* @__PURE__ */ l("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(Vp, { role: a, node: e }),
    /* @__PURE__ */ n(Ta, { column: Ra[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Ta, { column: Ra[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Ta, { column: Ra[2], children: e.requestedVia ?? "" })
  ] });
}
function Vp({ role: e, node: a }) {
  return /* @__PURE__ */ l(E, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Yp({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    Sn,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(Up, { node: t }),
      children: c
    }
  );
}
function La({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Jp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(La, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(La, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(La, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Xp() {
  return /* @__PURE__ */ l("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function Qp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Zp(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function eg({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Xp, {}),
    /* @__PURE__ */ n(mc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Sn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Qp, { row: t }),
        detail: /* @__PURE__ */ n(Jp, { row: t }),
        expanded: Zp(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function T1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(eg, { ...e }) : /* @__PURE__ */ n(Yp, { ...e });
}
const ag = "_runbook_b9agc_2", ng = "_list_b9agc_7", tg = "_step_b9agc_15", rg = "_numeral_b9agc_21", lg = "_body_b9agc_28", og = "_head_b9agc_34", ig = "_title_b9agc_40", cg = "_detail_b9agc_45", sg = "_actions_b9agc_50", dg = "_webList_b9agc_56", ug = "_webStep_b9agc_60", hg = "_webBody_b9agc_66", mg = "_webTitle_b9agc_74", wg = "_webDetail_b9agc_78", S = {
  runbook: ag,
  list: ng,
  step: tg,
  numeral: rg,
  body: lg,
  head: og,
  title: ig,
  detail: cg,
  actions: sg,
  webList: dg,
  webStep: ug,
  webBody: hg,
  webTitle: mg,
  webDetail: wg
}, tt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function rt(e) {
  return String(e + 1).padStart(2, "0");
}
function _g({ step: e, index: a, connection: t }) {
  const r = tt[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: rt(a) }),
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
function vg({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(_g, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function fg({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: rt(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...tt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function bg({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(fg, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function L1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(bg, { ...e }) : /* @__PURE__ */ n(vg, { ...e });
}
const pg = "_list_1gu6a_2", gg = "_check_1gu6a_10", Ng = "_body_1gu6a_16", yg = "_text_1gu6a_23", kg = "_pending_1gu6a_32", $g = "_measured_1gu6a_37", He = {
  list: pg,
  check: gg,
  body: Ng,
  text: yg,
  pending: kg,
  measured: $g
};
function Cg(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Sg({ check: e }) {
  const a = Cg(e.passed);
  return /* @__PURE__ */ l("li", { className: `${He.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Fa, { state: a.state, label: a.label }),
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
function x1({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${He.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Sg, { check: a }, a.text)) });
}
const Rg = "_root_16pdz_2", Tg = "_list_16pdz_9", Lg = "_line_16pdz_16", xg = "_at_16pdz_43", Eg = "_text_16pdz_47", Ag = "_foot_16pdz_51", qg = "_idle_16pdz_62", Ig = "_caret_16pdz_69", Mg = "_jump_16pdz_76", fe = {
  root: Rg,
  list: Tg,
  line: Lg,
  at: xg,
  text: Eg,
  foot: Ag,
  idle: qg,
  caret: Ig,
  jump: Mg
}, Bg = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Ua(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Bg.format(new Date(e));
}
const Pg = { warn: "warning", ok: "ok" };
function Dg({ kind: e }) {
  const a = Pg[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Og({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Ua(e)}` });
}
function Hg({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Ua(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${fe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${fe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: fe.idle, children: i }),
    /* @__PURE__ */ n(Og, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function E1({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
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
  return /* @__PURE__ */ l("div", { className: fe.root, children: [
    /* @__PURE__ */ n("ol", { className: fe.list, ref: o, "aria-live": "off", "aria-label": r, children: e.map((d, h) => /* @__PURE__ */ l("li", { className: `${fe.line} ward-consline ward-reveal ward-consline--${d.kind}`, "data-kind": d.kind, "data-revealed": h < i, children: [
      /* @__PURE__ */ n("span", { className: fe.at, children: Ua(d.at) }),
      /* @__PURE__ */ n(Dg, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: fe.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(Hg, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${fe.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const Fg = "_row_11jhe_2", jg = "_head_11jhe_14", Wg = "_author_11jhe_20", zg = "_eta_11jhe_25", Gg = "_edited_11jhe_26", Kg = "_body_11jhe_32", Ug = "_reason_11jhe_37", Vg = "_actions_11jhe_42", _e = {
  row: Fg,
  head: jg,
  author: Wg,
  eta: zg,
  edited: Gg,
  body: Kg,
  reason: Ug,
  actions: Vg
}, Yg = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function Jg(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function Xg({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(E, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(E, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(E, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(E, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function Qg({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(E, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: _e.reason, id: a, children: e })
  ] });
}
function Zg(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function eN(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Xg, { ...e }) : /* @__PURE__ */ n(Qg, { reason: e.unavailable, reasonId: e.unavailableId });
}
function A1(e) {
  const { comment: a } = e;
  Zg(e);
  const t = k(), r = `${t}-unavailable`, o = Yg[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${_e.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: _e.head, children: [
      /* @__PURE__ */ n("span", { className: _e.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: _e.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: _e.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: _e.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: _e.reason, id: t, children: Jg(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: _e.actions, children: /* @__PURE__ */ n(eN, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const aN = "_root_c46wj_2", nN = "_attach_c46wj_11", tN = "_actions_c46wj_17", rN = "_reply_c46wj_23", lN = "_replyRow_c46wj_28", oN = "_sendsAs_c46wj_42", je = {
  root: aN,
  attach: nN,
  actions: tN,
  reply: rN,
  replyRow: lN,
  sendsAs: oN
};
function iN({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = g(""), i = k();
  return /* @__PURE__ */ l("div", { className: je.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: je.replyRow, children: [
      /* @__PURE__ */ n(L, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: je.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function q1(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(iN, { ...e }) : /* @__PURE__ */ n(cN, { ...e });
}
function cN({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ l("div", { className: je.root, children: [
    /* @__PURE__ */ n(L, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ l("div", { className: je.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      Nn,
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
const sN = "_list_1ih9e_2", dN = "_item_1ih9e_6", uN = "_body_1ih9e_22", hN = "_text_1ih9e_28", mN = "_evidence_1ih9e_37", wN = "_consequence_1ih9e_49", _N = "_note_1ih9e_54", qe = {
  list: sN,
  item: dN,
  body: uN,
  text: hN,
  evidence: mN,
  consequence: wN,
  note: _N
};
function vN({ criterion: e }) {
  return /* @__PURE__ */ n(Se, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function wn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function fN(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function bN({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: qe.body, children: [
    /* @__PURE__ */ n("span", { className: qe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(E, { children: [
      /* @__PURE__ */ n(wn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: qe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(E, { children: [
      /* @__PURE__ */ n(wn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: qe.consequence, children: fN(e.why) })
    ] })
  ] });
}
function pN({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: qe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(vN, { criterion: e }),
    /* @__PURE__ */ n(bN, { criterion: e })
  ] });
}
function I1({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(pN, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: qe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const gN = "_list_dwhoz_2", NN = "_rung_dwhoz_6", yN = "_name_dwhoz_18", kN = "_actor_dwhoz_32", ra = {
  list: gN,
  rung: NN,
  name: yN,
  actor: kN
}, $N = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function CN({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = $N[e.state];
  return /* @__PURE__ */ l("li", { className: ra.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ra.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ra.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function M1({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ra.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(CN, { rung: a }, a.name)) });
}
const SN = "_sheet_1fqco_2", RN = "_title_1fqco_9", TN = "_stage_1fqco_15", LN = "_effects_1fqco_20", xN = "_effect_1fqco_20", EN = "_numeral_1fqco_31", AN = "_effectText_1fqco_38", qN = "_refusals_1fqco_43", IN = "_reasons_1fqco_52", MN = "_reason_1fqco_52", BN = "_actions_1fqco_62", ce = {
  sheet: SN,
  title: RN,
  stage: TN,
  effects: LN,
  effect: xN,
  numeral: EN,
  effectText: AN,
  refusals: qN,
  reasons: IN,
  reason: MN,
  actions: BN
};
function PN({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function B1({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
  const s = k(), u = `${s}-refusal`, [d, h] = g(""), _ = t.length > 0;
  return /* @__PURE__ */ n(Je, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ l("div", { className: ce.sheet, children: [
    /* @__PURE__ */ l("h2", { className: ce.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ce.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ce.effects, children: a.map((b, x) => /* @__PURE__ */ l("li", { className: ce.effect, children: [
      /* @__PURE__ */ n("span", { className: ce.numeral, children: String(x + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ce.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      oi,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(L, { kind: "textarea", label: "Note for the agent", value: d, onChange: h }),
    _ && /* @__PURE__ */ l("div", { className: ce.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ce.reasons, children: t.map((b, x) => /* @__PURE__ */ n("li", { className: ce.reason, id: x === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: ce.actions, children: [
      /* @__PURE__ */ n(PN, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const DN = "_list_1hvqu_2", ON = "_path_1hvqu_7", HN = "_head_1hvqu_21", FN = "_label_1hvqu_28", jN = "_consequence_1hvqu_35", WN = "_ask_1hvqu_36", Fe = {
  list: DN,
  path: ON,
  head: HN,
  label: FN,
  consequence: jN,
  ask: WN
}, Ba = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function _n(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function vn(e) {
  return e ? "primary" : "secondary";
}
function zN({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: vn(a), size: "sm", onClick: () => t(e.kind), children: Ba[e.kind] }) : /* @__PURE__ */ l(E, { children: [
    /* @__PURE__ */ n(v, { variant: vn(a), size: "sm", disabled: !0, describedBy: r, children: Ba[e.kind] }),
    /* @__PURE__ */ n("span", { className: Fe.ask, id: r, children: e.askInstead })
  ] });
}
function GN({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: Fe.path, "data-allowed": e.allowed, "data-role": _n(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: Fe.head, children: [
      /* @__PURE__ */ n("span", { className: Fe.label, children: e.title ?? Ba[e.kind] }),
      /* @__PURE__ */ n(m, { role: _n(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Fe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(zN, { path: e, primary: a, onChoose: t })
  ] });
}
function P1({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Fe.list, children: e.map((t, r) => /* @__PURE__ */ n(GN, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const KN = "_list_qjv4r_2", UN = "_item_qjv4r_6", VN = "_node_qjv4r_18", YN = "_body_qjv4r_24", JN = "_head_qjv4r_30", XN = "_stage_qjv4r_36", QN = "_version_qjv4r_41", ZN = "_sentence_qjv4r_49", ey = "_meta_qjv4r_54", be = {
  list: KN,
  item: UN,
  node: VN,
  body: YN,
  head: JN,
  stage: XN,
  version: QN,
  sentence: ZN,
  meta: ey
}, ay = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function ny({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: be.head, children: [
    /* @__PURE__ */ n("span", { className: be.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: be.version, title: e.version, children: e.version }) : null
  ] });
}
function ty({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${be.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${be.node} ward-history-node`, children: /* @__PURE__ */ n(Se, { size: 9, kind: ay[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${be.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(ny, { entry: e }),
      /* @__PURE__ */ n("span", { className: be.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${be.meta} ward-history-meta`, children: [
        `${re(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${Q(e.cost)}`
      ] })
    ] })
  ] });
}
function D1({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${be.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(ty, { entry: a }, a.stage + String(t))) });
}
const ry = "_thread_1kn6s_3", ly = "_turn_1kn6s_8", oy = "_who_1kn6s_27", iy = "_body_1kn6s_32", la = {
  thread: ry,
  turn: ly,
  who: oy,
  body: iy
}, lt = ze(!1);
function O1({ children: e, density: a }) {
  return /* @__PURE__ */ n(lt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${la.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function H1({ turn: e }) {
  if (!We(lt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${la.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${la.who} ward-chat-who`, children: [
      e.author,
      " · ",
      re(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${la.body} ward-chat-body`, children: e.body })
  ] });
}
const cy = "_list_1rt9c_3", sy = "_row_1rt9c_7", dy = "_label_1rt9c_20", uy = "_n_1rt9c_26", hy = "_cause_1rt9c_33", Ue = {
  list: cy,
  row: sy,
  label: dy,
  n: uy,
  cause: hy
};
function my(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const wy = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function _y({ row: e, formatNumber: a }) {
  return my(e), /* @__PURE__ */ l("li", { className: `${Ue.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Se, { size: 8, ...wy[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Ue.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Ue.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(vy, { cause: e.cause })
  ] });
}
function vy({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ue.cause} ward-healthrow-cause`, children: e }) : null;
}
function F1({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(_y, { row: t, formatNumber: a }, t.label)) });
}
const fy = "_root_1jxwp_2", by = {
  root: fy
};
function j1({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: by.root, "data-density": o, children: [
    /* @__PURE__ */ n(ya, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const py = "_row_dhbre_3", gy = "_key_dhbre_13", Ny = "_stack_dhbre_24", yy = "_value_dhbre_32", ky = "_evidence_dhbre_39", $y = "_mark_dhbre_47", Oe = {
  row: py,
  key: gy,
  stack: Ny,
  value: yy,
  evidence: ky,
  mark: $y
};
function Cy({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Fa, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function W1({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Oe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Oe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Oe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Oe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Oe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Oe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(Cy, { state: e.state }) })
  ] });
}
const Sy = "_cell_1monp_2", Ry = {
  cell: Sy
}, Ty = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Ly(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function xy(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function Ey(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Ly(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function Ay(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function z1({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  xy(e, t);
  const r = Ay(e);
  return /* @__PURE__ */ n(
    gi,
    {
      label: "Rejection routing",
      columns: Ty,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: Ry.cell, "data-norerun": o.noRerun ? !0 : void 0, children: Ey(o, i) }),
      empty: a ?? /* @__PURE__ */ n(Vc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const qy = "_row_ute8v_2", Iy = "_title_ute8v_11", My = "_turns_ute8v_20", By = "_waiting_ute8v_21", Py = "_resolved_ute8v_22", Dy = "_activity_ute8v_23", Oy = "_cost_ute8v_29", Hy = "_link_ute8v_30", Fy = "_tableRow_ute8v_47", jy = "_tableTitle_ute8v_59", Wy = "_tableResolved_ute8v_64", zy = "_tableLink_ute8v_68", Gy = "_tableMeta_ute8v_83", Ky = "_tableCost_ute8v_90", Uy = "_tableActivity_ute8v_91", Vy = "_tableState_ute8v_101", Yy = "_tableRecord_ute8v_112", B = {
  row: qy,
  title: Iy,
  turns: My,
  waiting: By,
  resolved: Py,
  activity: Dy,
  cost: Oy,
  link: Hy,
  tableRow: Fy,
  tableTitle: jy,
  tableResolved: Wy,
  tableLink: zy,
  tableMeta: Gy,
  tableCost: Ky,
  tableActivity: Uy,
  tableState: Vy,
  tableRecord: Yy
}, ot = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function Jy(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function Xy(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Qy(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const Zy = { duplicate: "CLOSED · DUPLICATE" };
function ek({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function ak({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : Q(e) });
}
function nk({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function tk({ session: e, href: a }) {
  const t = ot[e.state];
  return /* @__PURE__ */ l("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: Xy(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: B.tableResolved, children: [
      Qy(e.resolved),
      /* @__PURE__ */ n(ek, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(ak, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: Jy(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: Zy[e.state] ?? t.label }),
      /* @__PURE__ */ n(nk, { link: e.link })
    ] }) })
  ] });
}
function rk({ session: e }) {
  const a = ot[e.state];
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
function G1(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(tk, { session: e.session, href: e.href }) : /* @__PURE__ */ n(rk, { session: e.session });
}
const lk = "_block_1yy2v_3", ok = "_list_1yy2v_9", ik = "_line_1yy2v_14", Pa = {
  block: lk,
  list: ok,
  line: ik
}, ck = { warn: "warning", ok: "ok" };
function sk({ kind: e }) {
  const a = ck[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function dk({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Pa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(sk, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function K1({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Pa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Pa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(dk, { line: t }, `${r}-${t.text}`)) }) });
}
const uk = "_band_tt7hp_1", hk = "_head_tt7hp_8", mk = "_cell_tt7hp_19", wk = "_index_tt7hp_35", _k = "_title_tt7hp_42", vk = "_note_tt7hp_48", fk = "_cellTitle_tt7hp_53", bk = "_cellBody_tt7hp_58", pk = "_tag_tt7hp_64", we = {
  band: uk,
  head: hk,
  cell: mk,
  index: wk,
  title: _k,
  note: vk,
  cellTitle: fk,
  cellBody: bk,
  tag: pk
}, fn = 4;
function U1({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== fn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${fn}-cell grid`);
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
  E1 as ActivityConsole,
  ih as AgentCard,
  Ak as AppShell,
  v1 as AppearanceStrip,
  U1 as Band,
  Ls as BoardColumn,
  Jk as BoardFootnote,
  Xk as BoardHeader,
  Wk as BoardScroller,
  v as Btn,
  Tk as CHIP_ROLES,
  Yn as CREDENTIAL_COLUMNS,
  Bk as Callout,
  f1 as CapabilityRow,
  H1 as ChatMessage,
  Nn as Checkbox,
  m as Chip,
  A1 as ClarificationRow,
  i1 as ClauseRuleRow,
  o1 as ClauseRules,
  An as ColourLadder,
  b1 as ComponentRow,
  q1 as Composer,
  Zk as ConfigRow,
  Qk as ConfigRowHead,
  ja as ConnectionMark,
  O1 as Conversation,
  oi as CostMeter,
  g1 as CredentialRow,
  p1 as CredentialRowHead,
  I1 as CriteriaList,
  Fr as Crumb,
  F1 as DeliveryHealth,
  Gk as DeniedState,
  c1 as DryRunRail,
  Vc as EmptyState,
  N1 as EnvCard,
  L as Field,
  zk as FilteredEmpty,
  Fk as FormStack,
  ya as GateChecklist,
  M1 as GateLadder,
  gi as Grid,
  d1 as HandoffRuleRow,
  s1 as HandoffRules,
  e1 as ItemDrawer,
  y1 as KeyPanel,
  $t as LIVE_EVENT_TYPES,
  Lu as LegacyBoardColumn,
  n1 as LegacyBoardHeader,
  t1 as LegacyConfigRow,
  l1 as LegacyItemDrawer,
  yu as LegacyOverCapNote,
  r1 as LegacyPreviewRail,
  Ln as LegacyWorkCard,
  ge as LiveIndicator,
  Kk as LoadFailed,
  Yk as Loading,
  Zn as MCP_SERVER_COLUMNS,
  Fa as Mark,
  $1 as MarkUpload,
  Se as Marker,
  S1 as McpServerRow,
  C1 as McpServerRowHead,
  u1 as NewStreamModal,
  Xc as OverCapNote,
  Je as Overlay,
  Ph as PARTIAL_STEP_REASON,
  et as POLICY_CHIP_WIDTH,
  Dk as PageFrame,
  Mk as PageHeader,
  R1 as PolicyRow,
  a1 as PreviewRail,
  Ra as ROLE_MATRIX_COLUMNS,
  zn as RULE_ACTIONS,
  $n as Radio,
  j1 as ReadyChecklist,
  Hk as RecordSection,
  B1 as RequeueSheet,
  P1 as ResolveBlock,
  W1 as ResolvedFieldRow,
  T1 as RoleMatrixRow,
  z1 as RoutingTable,
  h1 as RuleRow,
  L1 as RunbookSteps,
  yt as STREAM_STEPS,
  jk as SectionBand,
  Pi as SectionHeader,
  yn as SegmentedControl,
  G1 as SessionRow,
  Ik as Sidebar,
  m1 as StageColumn,
  D1 as StageHistory,
  Hw as StageListEditor,
  Uk as StaleStrip,
  pa as StatStrip,
  w1 as StreamRow,
  Ok as SubjectRail,
  Ie as Switch,
  qk as Tabs,
  _1 as ToolRow,
  Pk as TopBar,
  mc as Tree,
  Sn as TreeRow,
  K1 as TypedInputBlock,
  x1 as ValidationList,
  kk as VisibilityProvider,
  $k as Visible,
  Rk as WARD_VERSION,
  Na as WorkCard,
  Vk as WriteUnavailableStrip,
  Jy as agoSince,
  wt as clock,
  t_ as colourStatus,
  ae as count,
  te as duration,
  Da as elapsed,
  Sk as eventSourceTransport,
  _a as isStreamStep,
  va as isValidatedStreamStep,
  Dh as ladderValidation,
  rp as mcpConnectionChip,
  np as mcpToolName,
  Q as money,
  ue as ms,
  Rn as ordered,
  bn as ratio,
  Gf as restartLabel,
  re as stamp,
  gn as stream,
  xk as streamChip,
  ba as streamChipProps,
  Ce as streamColour,
  St as streamHex,
  Lk as streamVars,
  na as useBorderFlash,
  pt as useFocusTrap,
  Ek as useLiveFeed,
  Ck as useReturnFocus,
  wa as useRovingTabindex,
  Oa as useTicker,
  _t as useVisible,
  j as v,
  k1 as validateMark,
  fa as validatedStep,
  kt as validatedStreamSteps
};
