import { jsx as n, Fragment as A, jsxs as l } from "react/jsx-runtime";
import { useMemo as it, useContext as We, createContext as ze, useCallback as K, useEffect as E, useState as g, useRef as N, useLayoutEffect as ct, useId as k, Fragment as st } from "react";
import { createPortal as dt } from "react-dom";
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
const ut = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function re(e) {
  const a = ut.formatToParts(new Date(e)), t = (r) => {
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
function fn(e, a) {
  return `${e} / ${a}`;
}
const ht = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function mt(e) {
  return ht.format(new Date(e));
}
const bn = ze(/* @__PURE__ */ new Set());
function yk({ hidden: e, children: a }) {
  const t = it(() => new Set(e), [e]);
  return /* @__PURE__ */ n(bn.Provider, { value: t, children: a });
}
function wt(e) {
  return !We(bn).has(e);
}
function kk({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(A, { children: wt(e) ? a : t });
}
const _t = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function vt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function ft(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = vt(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function bt(e) {
  return { onKeyDown: K(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(_t));
      ft(t, e.current, r);
    },
    [e]
  ) };
}
function $k(e, a = !0) {
  E(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const Ya = { ArrowUp: -1, ArrowDown: 1 }, Ja = { ArrowLeft: -1, ArrowRight: 1 }, pt = (e, a, t) => Math.min(t, Math.max(a, e));
function gt(e, a) {
  if (a !== "horizontal" && e in Ya) return Ya[e];
  if (a !== "vertical" && e in Ja) return Ja[e];
}
function wa({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  ct(() => {
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
      const _ = Math.max(0, h.indexOf(a)), b = gt(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[pt(_ + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
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
const Ck = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, Sk = "0.2.0", Rk = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Nt = [1, 2, 3, 4, 5, 6], yt = [1, 2, 3], kt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], j = {
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
function pn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function _a(e) {
  return Nt.includes(e);
}
function va(e) {
  return yt.includes(e);
}
function Tk(e) {
  if (!_a(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function Lk(e) {
  if (!_a(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const $t = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Ct(e) {
  if (!_a(e)) throw new Error("unvalidated stream step");
  return $t[e];
}
function Xa(e) {
  return typeof e != "string" ? null : kt.includes(e) ? e : null;
}
function St(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Rt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Tt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Lt(e, a, t) {
  const r = St(e);
  if (r === null) return null;
  const o = Xa(t) ?? Xa(r.type);
  return o === null ? null : { ...r, type: o, id: Rt(r, a), at: Tt(r) };
}
function xt(e, a) {
  return e >= ue.staleAfter ? "stale" : e >= ue.heartbeat && a === "live" ? "reconnecting" : null;
}
function At(e, a, t) {
  return e >= ue.heartbeat && !a && t !== null;
}
function xk(e, a) {
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
        const Re = Lt($, F, me);
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
  return E(() => (oe(), b.current = window.setInterval(() => {
    const $ = Date.now() - s.current, F = xt($, G.current);
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
function Et() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Qa(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function na(e, a) {
  const t = N(0), r = K((o) => {
    const i = o ?? a, c = e.current;
    c !== null && i !== void 0 && (Et() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => Qa(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => Qa(c), ue.flash)));
  }, [a, e]);
  return E(() => () => window.clearTimeout(t.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const qt = "_root_1otpc_2", It = {
  root: qt
};
function Mt(e, a, t, r, o) {
  const i = [Da(a)];
  return e || i.push(`as of ${mt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = Oa(e, o), c = (a == null ? void 0 : a.at) ?? e, s = Mt(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${It.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      re(e)
    ] })
  ] });
}
const Bt = "_app_bcfqb_1", Pt = "_side_bcfqb_18", Dt = "_main_bcfqb_26", Ot = "_rail_bcfqb_33", Ht = "_page_bcfqb_40", Ft = "_root_bcfqb_91", jt = "_topbar_bcfqb_98", Wt = "_mark_bcfqb_109", zt = "_brand_bcfqb_116", Gt = "_tagline_bcfqb_122", Kt = "_identity_bcfqb_128", Ut = "_tools_bcfqb_129", Vt = "_metadata_bcfqb_138", Yt = "_actor_bcfqb_153", Jt = "_detail_bcfqb_154", Xt = "_nav_bcfqb_159", Qt = "_content_bcfqb_194", Zt = "_skip_bcfqb_217", D = {
  app: Bt,
  side: Pt,
  main: Dt,
  rail: Ot,
  page: Ht,
  root: Ft,
  topbar: jt,
  mark: Wt,
  brand: zt,
  tagline: Gt,
  identity: Kt,
  tools: Ut,
  metadata: Vt,
  actor: Yt,
  detail: Jt,
  nav: Xt,
  content: Qt,
  skip: Zt
};
function er({ sidebar: e, header: a, children: t, rail: r }) {
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
function ar({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: D.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function oa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function nr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: D.metadata, children: [
    /* @__PURE__ */ n(oa, { value: e, className: D.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(oa, { value: a, className: D.detail })
  ] });
}
function tr(e) {
  return /* @__PURE__ */ l("header", { className: D.topbar, children: [
    /* @__PURE__ */ n("span", { className: D.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: D.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(oa, { value: e.tagline, className: D.tagline }),
    /* @__PURE__ */ n(ar, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: D.identity, children: /* @__PURE__ */ n(nr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(oa, { value: e.tools, className: D.tools })
  ] });
}
function rr(e) {
  const a = k();
  return /* @__PURE__ */ l("div", { className: `${D.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: D.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(tr, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: D.content, children: e.children })
  ] });
}
function lr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function Ak(e) {
  return lr(e) ? /* @__PURE__ */ n(er, { ...e }) : /* @__PURE__ */ n(rr, { ...e });
}
const or = "_btn_llheq_2", ir = "_primary_llheq_13", cr = "_secondary_llheq_23", sr = "_ghost_llheq_28", dr = "_overflow_llheq_37", ur = "_sm_llheq_44", hr = "_disabled_llheq_48", Xe = {
  btn: or,
  primary: ir,
  secondary: cr,
  ghost: sr,
  overflow: dr,
  sm: ur,
  disabled: hr
};
function mr(e, a, t, r) {
  const o = a === "sm" ? [Xe.sm, "ward-btn--sm"] : [], i = t ? [Xe.disabled] : [];
  return [Xe.btn, Xe[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function wr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function _r(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function vr(e) {
  return e.children ?? e.label;
}
function v(e) {
  _r(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: mr(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...wr(a, e.controls),
      children: vr(e)
    }
  );
}
function Ha(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const fr = "_root_o4yib_2", br = "_row_o4yib_8", pr = "_box_o4yib_14", gr = "_label_o4yib_21", Nr = "_lockedNote_o4yib_26", yr = "_consequence_o4yib_34", kr = "_sample_o4yib_69", xe = {
  root: fr,
  row: br,
  box: pr,
  label: gr,
  lockedNote: Nr,
  consequence: yr,
  sample: kr
};
function $r(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Cr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${xe.consequence} ward-check-consequence`, children: a }) : null;
}
function Sr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${xe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Rr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: xe.sample, "aria-hidden": "true", children: e }) : null;
}
function gn(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = $r(e);
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
        /* @__PURE__ */ n(Sr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Rr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Cr, { id: t, text: e.consequence })
  ] });
}
const Tr = "_chip_1073r_2", Lr = {
  chip: Tr
}, xr = {
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
  if (e === "stream") return Er(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = xr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Er(e) {
  if (!e || !va(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = pn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Lr.chip} ward-chip ward-chip--${e}`, style: Ar(e, t), "data-ward-chip": e, "data-size": r, children: a });
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
const qr = "_nav_1mnou_2", Ir = "_list_1mnou_8", Mr = "_item_1mnou_15", Br = "_link_1mnou_25", Pr = "_sep_1mnou_35", Dr = "_current_1mnou_39", Or = "_chips_1mnou_43", Te = {
  nav: qr,
  list: Ir,
  item: Mr,
  link: Br,
  sep: Pr,
  current: Dr,
  chips: Or
};
function Hr({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Te.nav, children: [
    /* @__PURE__ */ n("ol", { className: Te.list, children: e.map((t, r) => /* @__PURE__ */ l("li", { className: Te.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Te.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Te.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Te.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Te.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const Fr = "_field_1oadv_2", jr = "_label_1oadv_8", Wr = "_labelHidden_1oadv_15", zr = "_control_1oadv_25", Gr = "_mono_1oadv_44", Kr = "_area_1oadv_49", Ur = "_invalid_1oadv_56", $e = {
  field: Fr,
  label: jr,
  labelHidden: Wr,
  control: zr,
  mono: Gr,
  area: Kr,
  invalid: Ur
}, Vr = { type: "password", autoComplete: "off", spellCheck: !1 };
function Yr({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? Vr : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function Jr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Xr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Qr = { input: Yr, select: Jr, textarea: Xr };
function Zr(e, a, t) {
  const r = Qr[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function el(e, a, t) {
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
function al(e) {
  const a = e.mono ? [$e.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [$e.area] : [];
  return [$e.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function nl(e) {
  return e ? `${$e.label} ${$e.labelHidden} ward-field-label` : `${$e.label} ward-field-label`;
}
function L(e) {
  const a = k(), t = `${a}-msg`, r = el(e, a, t), o = al(e);
  return /* @__PURE__ */ l("div", { className: `${$e.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: nl(e.labelHidden), htmlFor: a, children: e.label }),
    Zr(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${$e.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const tl = "_strip_jwrf5_2", rl = "_tab_jwrf5_12", ll = "_count_jwrf5_35", xa = {
  strip: tl,
  tab: rl,
  count: ll
}, Za = 7;
function ol(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function il(e) {
  return `${xa.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function Ek({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > Za) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Za} — the set is fixed`);
  const i = wa({ orientation: "horizontal" }), c = ol(e, a);
  return E(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: il(o),
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
            s.count === void 0 ? null : /* @__PURE__ */ l(A, { children: [
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
const cl = "_root_jem6y_2", sl = "_segment_jem6y_7", en = {
  root: cl,
  segment: sl
};
function Nn({ options: e, value: a, onChange: t, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = wa({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return E(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${en.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
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
const dl = "_sidebar_1jywv_3", ul = "_brand_1jywv_9", hl = "_mark_1jywv_17", ml = "_word_1jywv_24", wl = "_nav_1jywv_30", _l = "_navItem_1jywv_38", vl = "_group_1jywv_50", fl = "_groupName_1jywv_57", bl = "_agents_1jywv_70", pl = "_agent_1jywv_70", gl = "_agentTop_1jywv_88", Nl = "_dot_1jywv_95", yl = "_agentName_1jywv_107", kl = "_agentMeta_1jywv_120", $l = "_foot_1jywv_126", Cl = "_footName_1jywv_132", Sl = "_footLinks_1jywv_139", Rl = "_footLink_1jywv_139", Tl = "_root_1jywv_153", Ll = "_linkBrand_1jywv_162", xl = "_label_1jywv_183", Al = "_note_1jywv_188", El = "_footer_1jywv_202", C = {
  sidebar: dl,
  brand: ul,
  mark: hl,
  word: ml,
  nav: wl,
  navItem: _l,
  group: vl,
  groupName: fl,
  new: "_new_1jywv_64",
  agents: bl,
  agent: pl,
  agentTop: gl,
  dot: Nl,
  agentName: yl,
  agentMeta: kl,
  foot: $l,
  footName: Cl,
  footLinks: Sl,
  footLink: Rl,
  root: Tl,
  linkBrand: Ll,
  label: xl,
  note: Al,
  footer: El
};
function ql({ agent: e }) {
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
              style: { "--dot": pn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Il({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function Ml({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(ql, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(Il, { shared: i })
  ] });
}
function Bl(e) {
  return e.destinations ?? e.items ?? [];
}
function Pl({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function Dl({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function Ol({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Hl(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Pl, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Bl(e).map((a) => /* @__PURE__ */ n(Ol, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(Dl, { children: e.children })
  ] });
}
function Fl(e) {
  return "agents" in e;
}
function qk(e) {
  return Fl(e) ? /* @__PURE__ */ n(Ml, { ...e }) : /* @__PURE__ */ n(Hl, { ...e });
}
const jl = "_mark_wlgi8_3", Wl = {
  mark: jl
}, zl = { met: "✓", unmet: "", failed: "✕" };
function Fa({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Wl.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: zl[e]
    }
  );
}
const Gl = "_marker_br9fi_2", Kl = {
  marker: Gl
}, Ul = {
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
  const r = { "--marker": Ul[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Kl.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Vl = "_root_ti0pq_2", Yl = "_chip_ti0pq_11", Jl = "_noCase_ti0pq_23", Qe = {
  root: Vl,
  chip: Yl,
  noCase: Jl
};
function Xl(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function ja({ connection: e, since: a, lastEventAt: t }) {
  const r = Xl(a, t), o = Oa(r, e === "reconnecting");
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
const Ql = "_root_11rs7_2", Zl = "_context_11rs7_12", eo = "_row_11rs7_1", ao = "_heading_11rs7_25", no = "_headingWrap_11rs7_33", to = "_chips_11rs7_38", ro = "_title_11rs7_45", lo = "_consequence_11rs7_54", oo = "_actionsWrap_11rs7_59", io = "_actions_11rs7_59", co = "_action_11rs7_59", so = "_overflowPanel_11rs7_78", uo = "_measure_11rs7_88", Z = {
  root: Ql,
  context: Zl,
  row: eo,
  heading: ao,
  headingWrap: no,
  chips: to,
  title: ro,
  consequence: lo,
  actionsWrap: oo,
  actions: io,
  action: co,
  overflowPanel: so,
  measure: uo
};
function ho({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: Z.heading, children: [
    /* @__PURE__ */ n("h1", { className: Z.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: Z.consequence, children: a })
  ] });
}
function Aa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: Z.action, "data-action": "", children: a }, t));
}
function an({ disclosure: e }) {
  return /* @__PURE__ */ n(v, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function mo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: o }) {
  return t ? r ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(an, { disclosure: o }) : a ? [/* @__PURE__ */ n(an, { disclosure: o }, "more"), /* @__PURE__ */ n(Aa, { actions: e }, "actions")] : /* @__PURE__ */ n(Aa, { actions: e });
}
function wo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function _o({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Aa, { actions: e }) });
}
function vo(e, a) {
  const t = k(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function fo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: Z.context, children: [
    /* @__PURE__ */ n(Hr, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Z.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function bo(...e) {
  return e.some((a) => a === null);
}
function po(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function go(e, a, t, r, o) {
  if (o === 0 || bo(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = po(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function No(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function yo(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = g(!1);
  return E(() => {
    const s = a.current;
    if (!No(s)) return;
    const u = () => c(go(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function ko({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ l("div", { className: Z.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(v, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] });
}
function $o({ connection: e }) {
  return e ? /* @__PURE__ */ n(ja, { connection: e.connection, since: e.since }) : null;
}
function Ik({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], more: i = [], connection: c, onOverflow: s, density: u = "page" }) {
  const { rowRef: d, headingRef: h, actionsRef: _, measureRef: b, collapsed: x } = yo(o), G = i.length > 0, { disclosure: J, close: le } = vo(x || G, _), Ne = wo(i, o, x, s);
  return /* @__PURE__ */ l("header", { className: Z.root, "data-density": u, children: [
    /* @__PURE__ */ n(fo, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: Z.row, ref: d, children: [
      /* @__PURE__ */ n("div", { ref: h, className: Z.headingWrap, children: /* @__PURE__ */ n(ho, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ n($o, { connection: c }),
        /* @__PURE__ */ n("div", { className: Z.actions, ref: _, "data-ward-actions": !0, children: /* @__PURE__ */ n(mo, { actions: o, hasMore: G, collapsed: x, onOverflow: s, disclosure: J }) })
      ] })
    ] }),
    /* @__PURE__ */ n(_o, { actions: Ne, disclosure: J, onEscape: le }),
    /* @__PURE__ */ n(ko, { actions: o, hasMore: G, measureRef: b })
  ] });
}
function yn(e) {
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
const Co = "_scrim_c7sqj_2", So = "_drawer_c7sqj_10", Ro = "_sheet_c7sqj_14", To = "_modal_c7sqj_18", Lo = "_panel_c7sqj_23", xo = "_header_c7sqj_51", Ao = "_title_c7sqj_59", Eo = "_body_c7sqj_63", qo = "_close_c7sqj_90", pe = {
  scrim: Co,
  drawer: So,
  sheet: Ro,
  modal: To,
  panel: Lo,
  header: xo,
  title: Ao,
  body: Eo,
  close: qo
}, Io = ze(null), ia = [], ca = /* @__PURE__ */ new Map();
function Mo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Bo(e, a) {
  let t = ca.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ca.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Po(e, a) {
  for (const t of Array.from(a.children))
    Mo(t) || Bo(e, t);
}
function Do(e) {
  for (const a of e.claims) {
    const t = ca.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ca.delete(a)));
  }
}
function Oo(e, a) {
  const t = { root: e, claims: [] };
  return ia.push(t), Po(t, a), t;
}
function Ho(e) {
  const a = ia.indexOf(e);
  a >= 0 && ia.splice(a, 1), Do(e);
}
function nn(e) {
  return e !== null && ia.at(-1) === e;
}
function Fo(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, E(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = Oo(i, a);
    return r.current = s, () => {
      var d, h;
      const u = nn(s);
      Ho(s), r.current = null, u && ((h = (d = o.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), K(() => nn(r.current), []);
}
function jo(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Wo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function zo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${pe.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n("header", { className: `${pe.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${pe.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${pe.body} ward-drawer-body`, children: e.children })
  ] });
}
function Go(e) {
  return `${pe.scrim} ${pe[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Ko(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${pe.panel} ${pe[e]} ward-overlay-panel${t}${r}`;
}
function Uo(e) {
  const a = We(Io);
  return e ?? a ?? document.body;
}
function Je(e) {
  const a = N(null), t = N(null), r = k(), o = Uo(e.container), i = yn("(min-width: 768px)"), c = jo(e.kind, i), s = Wo(e, r), u = bt(t), d = Fo(a, o, e.returnFocusTo), h = K(() => {
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
  }, [h]), dt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Go(c),
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
            className: Ko(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${pe.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(zo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Vo = "_root_drrhx_2", Yo = "_ticket_drrhx_15", Jo = "_body_drrhx_24", ka = {
  root: Vo,
  ticket: Yo,
  body: Jo
};
function Mk({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${ka.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${ka.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: ka.body, children: t })
  ] });
}
const Xo = "_root_1bfqw_2", Qo = "_figure_1bfqw_7", Zo = "_of_1bfqw_13", ei = "_bar_1bfqw_18", ai = "_rows_1bfqw_38", ni = "_row_1bfqw_38", ti = "_label_1bfqw_49", ri = "_amount_1bfqw_54", ye = {
  root: Xo,
  figure: Qo,
  of: Zo,
  bar: ei,
  rows: ai,
  row: ni,
  label: ti,
  amount: ri
};
function li({ spent: e, ceiling: a, breakdown: t }) {
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
const oi = "_frame_mg2jl_2", ii = "_table_mg2jl_6", ci = "_th_mg2jl_12", si = "_td_mg2jl_13", di = "_sort_mg2jl_47", ui = "_row_mg2jl_53", hi = "_empty_mg2jl_61", ke = {
  frame: oi,
  table: ii,
  th: ci,
  td: si,
  sort: di,
  row: ui,
  empty: hi
}, mi = { asc: "ascending", desc: "descending" };
function wi(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return mi[a.direction];
}
function _i(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: ke.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function vi(e) {
  return e === void 0 ? void 0 : { width: e };
}
function fi({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ke.th,
      style: vi(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": wi(e, a),
      children: _i(e, t)
    }
  );
}
function bi({ row: e, props: a }) {
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
function pi({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ke.head, children: a.map((h) => /* @__PURE__ */ n(fi, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(bi, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const gi = "_set_y5zy3_2", Ni = "_legend_y5zy3_7", yi = "_row_y5zy3_15", ki = "_control_y5zy3_20", $i = "_input_y5zy3_26", Ci = "_label_y5zy3_31", Si = "_consequence_y5zy3_36", Le = {
  set: gi,
  legend: Ni,
  row: yi,
  control: ki,
  input: $i,
  label: Ci,
  consequence: Si
};
function kn({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
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
const Ri = "_root_1h1ot_2", Ti = "_head_1h1ot_11", Li = "_index_1h1ot_25", xi = "_dot_1h1ot_29", Ai = "_note_1h1ot_34", Ei = "_counter_1h1ot_40", qi = "_trailing_1h1ot_48", Ae = {
  root: Ri,
  head: Ti,
  index: Li,
  dot: xi,
  note: Ai,
  counter: Ei,
  trailing: qi
};
function Ii({ index: e }) {
  return e ? /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n("span", { className: `${Ae.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ae.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Mi({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ae.counter, "aria-hidden": "true", children: e }) : null;
}
function Bi({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ae.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ae.head, children: [
      /* @__PURE__ */ n(Ii, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Ae.note, children: t }),
    /* @__PURE__ */ n(Mi, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ae.trailing, children: i })
  ] });
}
const Pi = "_strip_1qhvo_2", Di = "_cell_1qhvo_7", Oi = "_value_1qhvo_12", Hi = "_label_1qhvo_27", Ze = {
  strip: Pi,
  cell: Di,
  value: Oi,
  label: Hi
};
function Fi(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function pa({ cells: e, divided: a = !1 }) {
  return Fi(e), /* @__PURE__ */ n("dl", { className: `${Ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Ze.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ze.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Ze.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const ji = "_root_xk7sv_2", Wi = "_track_xk7sv_8", zi = "_thumb_xk7sv_35", Gi = "_labelHidden_xk7sv_53", Ki = "_label_xk7sv_53", Ui = "_lockedNote_xk7sv_68", Ee = {
  root: ji,
  track: Wi,
  thumb: zi,
  labelHidden: Gi,
  label: Ki,
  lockedNote: Ui
};
function Vi(e) {
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
    /* @__PURE__ */ l("span", { id: s, className: Vi(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ee.lockedNote, children: "always on" })
    ] })
  ] });
}
const Yi = "_bar_1u2kl_2", Ji = "_skip_1u2kl_11", Xi = "_mark_1u2kl_22", Qi = "_nav_1u2kl_30", Zi = "_list_1u2kl_34", ec = "_select_1u2kl_40", ac = "_dest_1u2kl_47", nc = "_actor_1u2kl_61", tc = "_actorMark_1u2kl_74", rc = "_actorLabel_1u2kl_79", lc = "_tagline_1u2kl_98", ie = {
  bar: Yi,
  skip: Ji,
  mark: Xi,
  nav: Qi,
  list: Zi,
  select: ec,
  dest: ac,
  actor: nc,
  actorMark: tc,
  actorLabel: rc,
  tagline: lc
};
function oc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function ic(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function Bk({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = ic(r);
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
      /* @__PURE__ */ n("span", { className: ie.actorMark, "aria-hidden": "true", children: oc(s) })
    ] })
  ] });
}
const cc = "_tree_1lyby_2", sc = "_item_1lyby_6", dc = "_row_1lyby_10", uc = "_button_1lyby_22", sa = {
  tree: cc,
  item: sc,
  row: dc,
  button: uc
}, $n = ze(null);
function hc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = wa({ orientation: "vertical" });
  return /* @__PURE__ */ n($n.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: sa.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const mc = { ArrowRight: !0, ArrowLeft: !1 };
function tn(e) {
  return e ? !0 : void 0;
}
function wc(e, a) {
  const t = mc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function _c(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function vc(e) {
  const a = [sa.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function fc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function bc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function pc(e) {
  return typeof e == "string" ? e : void 0;
}
function gc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Nc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Cn(e) {
  const a = We($n);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = fc(e);
  return /* @__PURE__ */ l("li", { className: sa.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: vc(e),
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
            onClick: () => _c(e),
            onKeyDown: (r) => wc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: bc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: pc(e.label), children: e.label }),
              /* @__PURE__ */ n(gc, { value: e.detail }),
              /* @__PURE__ */ n(Nc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const yc = "_frame_fdzvs_2", kc = "_subjectRail_fdzvs_21", $c = "_subject_fdzvs_21", Cc = "_rail_fdzvs_41", Sc = "_record_fdzvs_63", Rc = "_recordBody_fdzvs_68", Tc = "_band_fdzvs_111", Lc = "_bandBody_fdzvs_120", xc = "_bandActions_fdzvs_125", Ac = "_scroller_fdzvs_133", Ec = "_lanes_fdzvs_151", de = {
  frame: yc,
  subjectRail: kc,
  subject: $c,
  rail: Cc,
  record: Sc,
  recordBody: Rc,
  band: Tc,
  bandBody: Lc,
  bandActions: xc,
  scroller: Ac,
  lanes: Ec
};
function Pk({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: de.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function rn(e) {
  return e ? "true" : void 0;
}
function Dk({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: de.subjectRail, "data-ward-subject-rail": t, "data-ruled": rn(i), children: [
    /* @__PURE__ */ n("div", { className: de.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: de.rail, "data-sticky": rn(o), "aria-label": r, children: a })
  ] });
}
function Ok({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: de.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Bi, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: de.recordBody, "data-pad": o, children: a })
  ] });
}
const qc = "_form_1j8ub_2", Ic = "_fields_1j8ub_9", Mc = "_actions_1j8ub_19", $a = {
  form: qc,
  fields: Ic,
  actions: Mc
};
function Hk({ label: e, children: a, actions: t, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: $a.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: $a.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: $a.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function Fk({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: de.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: de.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: de.bandActions, children: a })
  ] });
}
const Bc = "(max-width: 767.98px)";
function Ea({ label: e, children: a, laneCount: t }) {
  const r = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { className: de.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: r, children: a });
}
function Pc({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: de.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(L, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(Ea, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function jk({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = yn(Bc);
  return t === void 0 ? /* @__PURE__ */ n(Ea, { label: a, children: e }) : o ? /* @__PURE__ */ n(Pc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Ea, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n(st, { children: i.content }, i.id)) });
}
const Dc = "_block_1o5o7_2", Oc = "_sentence_1o5o7_15", Hc = "_meta_1o5o7_20", Fc = "_action_1o5o7_25", jc = "_strip_1o5o7_29", Wc = "_loading_1o5o7_48", zc = "_label_1o5o7_56", Gc = "_counter_1o5o7_63", he = {
  block: Dc,
  sentence: Oc,
  meta: Hc,
  action: Fc,
  strip: jc,
  loading: Wc,
  label: zc,
  counter: Gc
};
function Kc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: he.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function ga({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${he.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: he.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Kc, { action: a })
  ] });
}
function Uc(e) {
  return /* @__PURE__ */ n(ga, { ...e });
}
function Wk({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ga, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: he.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function zk(e) {
  return /* @__PURE__ */ n(ga, { ...e });
}
function Gk({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ga, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: he.meta, children: [
    "failed at ",
    re(a)
  ] }) });
}
function Kk({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: he.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    re(e),
    " — showing snapshot from ",
    re(a)
  ] });
}
function Uk({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: he.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    re(a)
  ] });
}
function Vk({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = g(!1);
  E(() => {
    const c = window.setTimeout(() => o(!0), ue.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Oa(t.current, r);
  return /* @__PURE__ */ l("div", { className: `${he.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: he.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: he.counter, children: Da(i) }) : null
  ] });
}
const Vc = "_note_tlubt_2", Yc = {
  note: Vc
};
function Jc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: Yc.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const Xc = "_card_12in3_2", Qc = "_hit_12in3_23", Zc = "_head_12in3_30", es = "_title_12in3_36", as = "_meta_12in3_44", ns = "_fields_12in3_45", ts = "_who_12in3_58", rs = "_sep_12in3_65", ls = "_mono_12in3_69", os = "_field_12in3_45", is = "_last_12in3_84", cs = "_reason_12in3_96", U = {
  card: Xc,
  hit: Qc,
  head: Zc,
  title: es,
  meta: as,
  fields: ns,
  who: ts,
  sep: rs,
  mono: ls,
  field: os,
  last: is,
  reason: cs
}, ss = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function ds(e, a, t) {
  const r = na(e, "blue"), o = na(e, "orange"), i = na(e, "green"), c = N(/* @__PURE__ */ new Set());
  E(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = ss[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const us = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : Q(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function hs(e, a) {
  return us[a](e);
}
function ms({ item: e, connection: a }) {
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
function ws({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: U.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function _s({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: U.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function vs({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: U.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: U.field, children: hs(e, t) }, t)) });
}
const qa = (e) => e ? !0 : void 0;
function fs(e) {
  return { "--stream": Ce(e.streamStep, "id") };
}
function bs(e, a, t) {
  e == null || e(a, t);
}
function ps(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function gs({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: U.last, "data-stale": qa(a), children: t }) : null;
}
function Na(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  ds(r, t.key, e.feed);
  const o = ps(e.feed), i = fs(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: U.hit, onClick: (c) => bs(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(ws, { item: t }),
        /* @__PURE__ */ n("p", { className: U.title, children: t.title }),
        /* @__PURE__ */ n(ms, { item: t, connection: o }),
        /* @__PURE__ */ n(_s, { reason: t.blockedReason }),
        /* @__PURE__ */ n(vs, { item: t, fields: a }),
        /* @__PURE__ */ n(gs, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const Ns = "_column_10sxg_3", ys = "_head_10sxg_24", ks = "_label_10sxg_33", $s = "_count_10sxg_42", Cs = "_list_10sxg_56", Ke = {
  column: Ns,
  head: ys,
  label: ks,
  count: $s,
  list: Cs
};
function Sn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Ss({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: Ke.head, children: [
    /* @__PURE__ */ n("h2", { className: Ke.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: Ke.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Rs(e) {
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
function Ts({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, _ = Sn(a, r);
  return /* @__PURE__ */ l("section", { className: Ke.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(Ss, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(Rs, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    h && /* @__PURE__ */ n(Jc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Ls = "_foot_8qg4p_2", xs = "_note_8qg4p_13", As = "_link_8qg4p_19", Ca = {
  foot: Ls,
  note: xs,
  link: As
};
function Yk({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Ca.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ca.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: Ca.link, href: e, children: "Configure board" })
  ] });
}
const Es = "_head_1la6p_3", qs = "_identity_1la6p_12", Is = "_titleRow_1la6p_18", Ms = "_title_1la6p_18", Bs = "_key_1la6p_35", Ps = "_rollup_1la6p_45", Ds = "_tools_1la6p_53", Os = "_swatch_1la6p_62", Hs = "_mark_1la6p_69", ve = {
  head: Es,
  identity: qs,
  titleRow: Is,
  title: Ms,
  key: Bs,
  rollup: Ps,
  tools: Ds,
  swatch: Os,
  mark: Hs
}, ln = "initials:";
function Fs(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function js(e) {
  const a = [`${ae(e.inFlight)} in flight`, Fs(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${te(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${te(e.p90)}`), a.join(" · ");
}
function Ws(e) {
  return e.startsWith(ln) ? e.slice(ln.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function zs({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ce(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${ve.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Ws(e) }) : /* @__PURE__ */ n("span", { className: ve.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Gs({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Jk({
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
        /* @__PURE__ */ n(zs, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: ve.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: ve.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: ve.rollup, "aria-live": "polite", children: js(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: ve.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Gs, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(ja, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Ks = "_head_kabyh_11", Us = "_line_kabyh_12", Vs = "_cHandle_kabyh_33", Ys = "_cName_kabyh_38", Js = "_nameLine_kabyh_46", Xs = "_cLabel_kabyh_53", Qs = "_cCap_kabyh_58", Zs = "_cShown_kabyh_63", ed = "_name_kabyh_46", ad = "_noCap_kabyh_85", nd = "_state_kabyh_99", td = "_handle_kabyh_104", rd = "_sub_kabyh_118", I = {
  head: Ks,
  line: Us,
  cHandle: Vs,
  cName: Ys,
  nameLine: Js,
  cLabel: Xs,
  cCap: Qs,
  cShown: Zs,
  name: ed,
  noCap: ad,
  state: nd,
  handle: td,
  sub: rd
}, ld = "can't be hidden or collapsed", od = "terminal · counted, not a column";
function Xk() {
  return /* @__PURE__ */ l("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function id(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function cd(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function on(e) {
  return e.gate ? ld : e.terminal ? od : cd(e.agentsMounted);
}
function sd(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function dd({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: I.cName, children: [
    /* @__PURE__ */ l("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    on(e) && /* @__PURE__ */ n("span", { className: I.sub, children: on(e) })
  ] });
}
function ud(e) {
  return e === void 0 ? "" : String(e);
}
function hd(e) {
  return e === "" ? void 0 : Number(e);
}
function md({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => sd(t, a),
      children: "⠿"
    }
  ) });
}
function wd({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(L, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: ud(a.cap), onChange: (r) => t({ ...a, cap: hd(r) }) }) });
}
function _d({ stage: e, config: a, onChange: t }) {
  const r = id(e, a.shown);
  return /* @__PURE__ */ l("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(Ie, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function vd(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function Qk({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: I.line, "data-kind": vd(e), children: [
    /* @__PURE__ */ n(md, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(dd, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(L, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(wd, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(_d, { stage: e, config: a, onChange: t })
  ] });
}
const fd = "_body_hn6d6_2", bd = "_head_hn6d6_9", pd = "_summary_hn6d6_19", gd = "_block_hn6d6_20", Nd = "_actionsBlock_hn6d6_21", yd = "_title_hn6d6_41", kd = "_note_hn6d6_46", $d = "_k_hn6d6_51", Cd = "_kv_hn6d6_58", Sd = "_row_hn6d6_64", Rd = "_label_hn6d6_75", Td = "_value_hn6d6_84", Ld = "_quote_hn6d6_90", xd = "_actions_hn6d6_21", Ad = "_resolve_hn6d6_103", M = {
  body: fd,
  head: bd,
  summary: pd,
  block: gd,
  actionsBlock: Nd,
  title: yd,
  note: kd,
  k: $d,
  kv: Cd,
  row: Sd,
  label: Rd,
  value: Td,
  quote: Ld,
  actions: xd,
  resolve: Ad
};
function Ed(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function qd(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Id(e) {
  const a = fa(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Md(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...ba(Id(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", te(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Ed(e),
    ...qd(e, a)
  ];
}
function Bd({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function Pd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: M.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Dd({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: M.block, children: [
    /* @__PURE__ */ n("p", { className: M.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: M.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: M.note, children: e.agentMeta })
  ] }) : null;
}
function Zk({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = Md(e, o);
  return /* @__PURE__ */ n(Je, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: M.body, children: [
    /* @__PURE__ */ n(Pd, { item: e }),
    /* @__PURE__ */ l("div", { className: M.summary, children: [
      /* @__PURE__ */ n("h2", { className: M.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: M.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: M.kv, children: d.map(([h, _]) => /* @__PURE__ */ l("div", { className: M.row, children: [
      /* @__PURE__ */ n("dt", { className: M.label, children: h }),
      /* @__PURE__ */ n("dd", { className: M.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(Dd, { item: e }),
    /* @__PURE__ */ l("div", { className: M.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: M.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: M.note, children: s })
    ] }),
    /* @__PURE__ */ n(Bd, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Od = "_root_3azmy_2", Hd = "_list_3azmy_7", Fd = "_item_3azmy_12", jd = "_box_3azmy_18", Wd = "_text_3azmy_23", zd = "_note_3azmy_28", Pe = {
  root: Od,
  list: Hd,
  item: Fd,
  box: jd,
  text: Wd,
  note: zd
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
const Gd = "_rail_ke7ch_2", Kd = "_k_ke7ch_11", Ud = "_head_ke7ch_19", Vd = "_section_ke7ch_25", Yd = "_card_ke7ch_38", Jd = "_strip_ke7ch_42", Xd = "_skeleton_ke7ch_56", Qd = "_skeletonLabel_ke7ch_70", Zd = "_bar_ke7ch_76", eu = "_note_ke7ch_85", se = {
  rail: Gd,
  k: Kd,
  head: Ud,
  section: Vd,
  card: Yd,
  strip: Jd,
  skeleton: Xd,
  skeletonLabel: Qd,
  bar: Zd,
  note: eu
};
function au(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Sa({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: se.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: se.k, children: e }),
    a
  ] });
}
function nu({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: se.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: se.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: se.bar, "aria-hidden": "true" }, r))
  ] });
}
function tu({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(Ts, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function ru(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(tu, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(nu, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function e1(e) {
  const a = au(e.onOpen), t = Sn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: se.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${se.k} ${se.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Sa, { title: "Card", children: /* @__PURE__ */ n("div", { className: se.card, children: t && /* @__PURE__ */ n(Na, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Sa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: se.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(ru, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: se.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Sa, { title: "Effect of this config", children: /* @__PURE__ */ n(ya, { items: e.effects, density: "compact" }) })
  ] });
}
function lu(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function ou(e) {
  return Math.ceil(e.length / 2);
}
function iu(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Rn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function cu(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = Rn(e);
  o !== void 0 && t(o), r(iu(e.type));
}
function su(e, a, t, r, o) {
  E(() => {
    if (e !== null)
      return e.subscribe(a, (i) => cu(i, t, r, o));
  }, [e, a, t, r, o]);
}
function du(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function uu(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function hu(e, a) {
  return a !== void 0 ? te(e.timeInStage) + " · waits on " + a.agent : te(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function mu(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(ou(a ?? [])) + ")"
  };
}
function wu(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function _u(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: Q(e.cost) }) : null;
}
function vu(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function fu(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function bu(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function pu(e, a) {
  return a === void 0 ? e : lu(e, a.ref);
}
function gu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ve(e) {
  return e === !0 ? "true" : void 0;
}
function Tn(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = na(o), c = N(/* @__PURE__ */ new Set()), [s, u] = g(du(a));
  su(e.feed, a.key, c, u, i);
  const d = uu(a, r), h = hu(a, t), _ = mu(a, e.fields), b = bu(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...gu(e),
      className: "ward-workcard",
      "data-flagged": Ve(a.flagged),
      "data-selected": Ve(e.selected),
      style: _,
      ref: pu(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        wu(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          _u(a, e.fields),
          vu(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          fu(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Nu({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function yu(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function ku(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function $u(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Nu, { count: e.items.length, cap: e.column.cap });
}
function Cu(e, a) {
  return e.roving ?? a;
}
function Su(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Ru(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    Tn,
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
function Tu(e) {
  const a = k(), t = wa({ orientation: "vertical" }), r = Cu(e, t), o = yu(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ve(o), "data-gate": Ve(e.column.gate), children: [
    ku(e.column, e.items.length, a),
    $u(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Su(e, t), children: Ru(e, r) })
  ] });
}
function Lu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + te(e.p50)), e.p90 !== void 0 && (a += " · p90 " + te(e.p90)), a;
}
function xu(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Au(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function a1(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Lu(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      xu(e),
      Au(e.onConfigure),
      /* @__PURE__ */ n(ja, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Eu(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function qu(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ie, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ie, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Iu(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(A, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function n1(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": Ve(Eu(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: qu(e) }),
    /* @__PURE__ */ n(L, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(gn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Iu(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function t1(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Tn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Tu, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Mu(e, a) {
  const t = Rn(e);
  t !== void 0 && a(t);
}
function Bu(e, a, t) {
  E(() => {
    if (e != null)
      return e.subscribe(a, (r) => Mu(r, t));
  }, [e, a, t]);
}
function Pu(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Du(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", te(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", Q(e.cost)]), a;
}
function Ou(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Hu(e, a) {
  return /* @__PURE__ */ l(A, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function r1(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = g((c = a.run) == null ? void 0 : c.lastStep);
  Bu(e.feed, a.key, o);
  const i = [...Pu(a), ...Du(a)];
  return /* @__PURE__ */ l(Je, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Ou(t, r)
    ] }),
    Hu(a, e.actions)
  ] });
}
const Fu = "_card_hvxp7_2", ju = "_head_hvxp7_17", Wu = "_mark_hvxp7_25", zu = "_name_hvxp7_37", Gu = "_chips_hvxp7_48", Ku = "_description_hvxp7_54", Uu = "_run_hvxp7_59", Vu = "_sep_hvxp7_68", Yu = "_facts_hvxp7_73", Ju = "_fact_hvxp7_73", Xu = "_factLabel_hvxp7_86", Qu = "_factValue_hvxp7_90", ee = {
  card: Fu,
  head: ju,
  mark: Wu,
  name: zu,
  chips: Gu,
  description: Ku,
  run: Uu,
  sep: Vu,
  facts: Yu,
  fact: Ju,
  factLabel: Xu,
  factValue: Qu
}, Zu = { live: "done", draft: "running", paused: "meta" };
function eh(e) {
  return e === void 0 ? ee.card : `${ee.card} ${e}`;
}
function ah({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ee.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Zu[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function nh({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ee.description, children: e });
}
function th({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ee.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ee.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function rh({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ee.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: ee.fact, children: [
    /* @__PURE__ */ n("dt", { className: ee.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: ee.factValue, children: a.value })
  ] }, a.label)) });
}
function lh(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function oh({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, facts: i, className: c }) {
  const s = { "--stream": Ce(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": u,
      className: eh(c),
      style: s,
      "data-selected": u,
      "data-paused": lh(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: ee.head, children: [
          /* @__PURE__ */ n("span", { className: ee.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ee.name} ward-rowlink`, href: a, "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(nh, { description: e.description }),
        /* @__PURE__ */ n(th, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(ah, { versions: e.versions }),
        /* @__PURE__ */ n(rh, { facts: i })
      ]
    }
  );
}
const ih = "_list_4dcyc_2", ch = "_row_4dcyc_11", sh = "_head_4dcyc_23", dh = "_id_4dcyc_30", uh = "_lock_4dcyc_35", hh = "_reason_4dcyc_41", mh = "_remove_4dcyc_46", wh = "_clauses_4dcyc_50", _h = "_clause_4dcyc_50", vh = "_label_4dcyc_64", fh = "_cell_4dcyc_71", bh = "_value_4dcyc_76", ne = {
  list: ih,
  row: ch,
  head: sh,
  id: dh,
  lock: uh,
  reason: hh,
  remove: mh,
  clauses: wh,
  clause: _h,
  label: vh,
  cell: fh,
  value: bh
}, Ln = ze(!1);
function l1({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Ln.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ne.list, "aria-label": a, children: e }) });
}
function ph({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ne.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(L, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => t(e.key, o) });
}
function gh({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ne.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ne.reason, children: e })
  ] });
}
function Nh({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: ne.head, children: [
    /* @__PURE__ */ n("span", { className: ne.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(gh, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ne.remove, children: /* @__PURE__ */ l(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function cn(e, a) {
  return e.locked ? void 0 : a;
}
function o1({ rule: e, onChange: a, onRemove: t }) {
  if (!We(Ln)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = cn(e, a);
  return /* @__PURE__ */ l("li", { className: ne.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Nh, { rule: e, onRemove: cn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ne.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ne.clause, children: [
      /* @__PURE__ */ n("dt", { className: ne.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ne.cell, children: /* @__PURE__ */ n(ph, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const yh = "_ladder_wwnch_2", kh = "_cell_wwnch_7", $h = "_empty_wwnch_26", Ch = "_name_wwnch_34", Sh = "_holder_wwnch_40", Rh = "_request_wwnch_46", Th = "_swatches_wwnch_51", Lh = "_swatch_wwnch_51", xh = "_tilesFrame_wwnch_78", Ah = "_tiles_wwnch_78", Eh = "_tile_wwnch_78", qh = "_bar_wwnch_117", Ih = "_hex_wwnch_128", Mh = "_note_wwnch_138", R = {
  ladder: yh,
  cell: kh,
  empty: $h,
  name: Ch,
  holder: Sh,
  request: Rh,
  swatches: Th,
  swatch: Lh,
  tilesFrame: xh,
  tiles: Ah,
  tile: Eh,
  bar: qh,
  hex: Ih,
  note: Mh
}, Bh = "not validated — needs CVD matrix and dark stepping";
function Ph(e) {
  return e.reserved ? "reserved" : va(e.step) ? "validated" : "partial";
}
function xn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Dh(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Oh({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Se, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Hh(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Fh(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const sn = (e) => String(e).padStart(2, "0");
function jh(e, a, t) {
  return e === "reserved" ? "Reserved — needs revalidation" : t ? "yours" : a ?? xn(e, void 0);
}
function Wh({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: r ? `step ${sn(e)}` : Ct(e) }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: r ? t : `Step ${sn(e)} · ${t}` })
  ] });
}
function zh({ step: e, value: a, taken: t, onChange: r, presentation: o }) {
  const i = Ph(e), c = xn(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, _ = `${d} — ${o === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...Fh(s, u), "data-validation": i, style: Dh(e, i), onClick: h, onKeyDown: (x) => Hh(x, h) }, label: _, name: d, holder: c, validation: i, note: jh(i, t, u), step: e.step };
}
const Gh = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${R.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${R.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Wh, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${R.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Oh, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Kh(e) {
  return Gh[e.presentation](zh(e));
}
function Uh(e) {
  for (const a of e)
    if (!a.reserved && !_a(a.step)) throw new Error("colour ladder renders token steps only");
}
function Vh() {
  return /* @__PURE__ */ l("div", { className: `${R.cell} ward-ladder-cell ${R.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Yh(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Jh = { list: R.ladder, swatches: R.swatches, tiles: R.tilesFrame };
function Xh() {
  return /* @__PURE__ */ l("div", { className: `${R.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Qh = { list: Vh, swatches: () => null, tiles: Xh };
function An(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  Uh(e.steps);
  const r = Yh(e), o = Qh[r], i = /* @__PURE__ */ l(A, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(Kh, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${Jh[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: R.tiles, children: i }) : i });
}
const Zh = "_rail_1el2t_2", em = "_section_1el2t_12", am = "_sectionFlush_1el2t_22", nm = "_head_1el2t_26", tm = "_headLabel_1el2t_34", rm = "_sample_1el2t_42", lm = "_sampleLabel_1el2t_47", om = "_sampleTitle_1el2t_54", im = "_sampleMeta_1el2t_59", cm = "_trace_1el2t_65", sm = "_traceHead_1el2t_70", dm = "_steps_1el2t_78", um = "_step_1el2t_78", hm = "_stepTitle_1el2t_97", mm = "_hollow_1el2t_107", wm = "_stepBody_1el2t_115", _m = "_stepDetail_1el2t_127", vm = "_publish_1el2t_132", fm = "_reason_1el2t_138", bm = "_note_1el2t_143", pm = "_reveal_1el2t_148", p = {
  rail: Zh,
  section: em,
  sectionFlush: am,
  head: nm,
  headLabel: tm,
  sample: rm,
  sampleLabel: lm,
  sampleTitle: om,
  sampleMeta: im,
  trace: cm,
  traceHead: sm,
  steps: dm,
  step: um,
  stepTitle: hm,
  hollow: mm,
  stepBody: wm,
  stepDetail: _m,
  publish: vm,
  reason: fm,
  note: bm,
  reveal: pm
}, dn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, gm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Nm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, ym = { notSimulated: "not simulated", running: "running" };
function km(e) {
  return e.presentation === "foundry";
}
function $m(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Cm(e, a) {
  var r;
  const t = gm[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function Sm(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Rm(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Tm(e) {
  if (Sm(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Lm(e) {
  const [a, t] = g(!1);
  E(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function xm(e) {
  const a = ym[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Se, { size: 6, kind: Nm[e.kind], label: e.kind });
}
function Am(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Em(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function qm(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(Lm, { kind: a.kind, children: [
    /* @__PURE__ */ n(xm, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Am, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Em, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Im(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(te(a)), t.join(" · ");
}
function En(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: Im(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(qm, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Mm(e) {
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
function Bm(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + re(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Pm(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : Q(e.run.cost), label: "Cost" }, { value: e.run.turns ? fn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(pa, { divided: !0, cells: a }) });
}
function Dm(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: Q(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: fn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Om(e) {
  const a = Dm(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(pa, { divided: !0, cells: a }) });
}
function qn(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Hm(e) {
  return /* @__PURE__ */ l("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(qn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function Fm(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(qn, { reason: e.reason, onPublish: e.onPublish }) });
}
function In(e) {
  return /* @__PURE__ */ l("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: dn[e.run.status].role, label: dn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function jm(e, a) {
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
function Wm(e) {
  var t;
  Rm(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(In, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Mm, { sample: e.run.sample }),
    /* @__PURE__ */ n(En, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Pm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(ya, { items: e.checklist }) }),
    /* @__PURE__ */ n(Hm, { reason: $m(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function zm(e) {
  var r;
  const a = jm(e.run, e.feed);
  Tm(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(In, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Bm, { sample: e.run.sample }),
    /* @__PURE__ */ n(En, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Om, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(ya, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Fm, { reason: Cm(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function i1(e) {
  return km(e) ? /* @__PURE__ */ n(zm, { ...e }) : /* @__PURE__ */ n(Wm, { ...e });
}
const Gm = "_list_142ip_3", Km = "_row_142ip_9", Um = "_condition_142ip_18", Vm = "_action_142ip_24", ta = {
  list: Gm,
  row: Km,
  condition: Um,
  action: Vm
}, Mn = ze(!1);
function c1({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Mn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ta.list, "aria-label": a, children: e }) });
}
function s1({ rule: e }) {
  if (!We(Mn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
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
function Bn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Pn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function un(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Ym(e) {
  return e === "up" ? "down" : "up";
}
function Jm(e, a) {
  const t = un(e, a.id, a.direction) ?? un(e, a.id, Ym(a.direction));
  t == null || t.focus();
}
function Dn() {
  const e = N(null), [a, t] = g(null), [r, o] = g("");
  return E(() => {
    e.current !== null && a !== null && Jm(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), o(s);
  } };
}
function On({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function da({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Xm = "_body_1h15q_2", Qm = "_title_1h15q_8", Zm = "_section_1h15q_13", ew = "_legend_1h15q_18", aw = "_stages_1h15q_26", nw = "_stage_1h15q_26", tw = "_stageIndex_1h15q_44", rw = "_stageName_1h15q_50", lw = "_footer_1h15q_59", ow = "_note_1h15q_66", iw = "_reason_1h15q_71", cw = "_actions_1h15q_76", sw = "_webHead_1h15q_83", dw = "_kicker_1h15q_92", uw = "_webTitle_1h15q_99", hw = "_webBody_1h15q_105", mw = "_webSection_1h15q_109", ww = "_sectionHead_1h15q_121", _w = "_sectionNote_1h15q_129", vw = "_formLabel_1h15q_134", fw = "_identityRow_1h15q_139", bw = "_nameCell_1h15q_145", pw = "_keyCell_1h15q_150", gw = "_colourCell_1h15q_154", Nw = "_colourStatus_1h15q_161", yw = "_webStages_1h15q_166", kw = "_webStageList_1h15q_172", $w = "_webStage_1h15q_166", Cw = "_webIndex_1h15q_191", Sw = "_webStageName_1h15q_196", Rw = "_webMoves_1h15q_201", Tw = "_addStage_1h15q_215", Lw = "_addStageButton_1h15q_223", xw = "_addStageNote_1h15q_231", Aw = "_webFooter_1h15q_236", Ew = "_webFooterNotes_1h15q_244", qw = "_webNote_1h15q_251", w = {
  body: Xm,
  title: Qm,
  section: Zm,
  legend: ew,
  stages: aw,
  stage: nw,
  stageIndex: tw,
  stageName: rw,
  footer: lw,
  note: ow,
  reason: iw,
  actions: cw,
  webHead: sw,
  kicker: dw,
  webTitle: uw,
  webBody: hw,
  webSection: mw,
  sectionHead: ww,
  sectionNote: _w,
  formLabel: vw,
  identityRow: fw,
  nameCell: bw,
  keyCell: pw,
  colourCell: gw,
  colourStatus: Nw,
  webStages: yw,
  webStageList: kw,
  webStage: $w,
  webIndex: Cw,
  webStageName: Sw,
  webMoves: Rw,
  addStage: Tw,
  addStageButton: Lw,
  addStageNote: xw,
  webFooter: Aw,
  webFooterNotes: Ew,
  webNote: qw
}, Iw = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Hn = "not in catalogue";
function Mw(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} — ${Hn}` }, ...t];
}
function Bw({ stage: e, index: a, catalogue: t, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(L, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Hn}`;
  return /* @__PURE__ */ n(L, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: Mw(t, e.name), invalid: i, onChange: r });
}
function Fn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Pw(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Dw({ id: e, stage: a, index: t, total: r, catalogue: o, onReplace: i, onMove: c }) {
  const s = Fn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(Bw, { stage: a, index: t, catalogue: o, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(L, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Iw, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(da, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(da, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function Ow({ stages: e, onChange: a, catalogue: t }) {
  const r = Pw(e.length), o = Dn(), i = (s, u) => {
    const d = Bn(s, u);
    r.current = Ia(r.current, s, d), o.moved({ id: r.current[d], direction: u }, Pn(Fn(e[s], s), d, e.length)), a(Ia(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(Dw, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(On, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Hw = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Fw = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], jw = "A new stream starts as a draft. Nothing runs on it until you publish it.", Ww = "Create is disabled: name the stream and give it a key first.", zw = "reorder with the ↑ ↓ buttons · min 2";
function Wa(e, a) {
  return !e.reserved && va(e.step) && a[e.step] === void 0;
}
function Gw(e, a) {
  const t = e.find((r) => Wa(r, a));
  return t ? t.step : 1;
}
function Kw({ stages: e, onMove: a }) {
  const t = Dn(), r = (o, i) => {
    const c = Bn(o, i);
    t.moved({ id: e[o].id, direction: i }, Pn(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: w.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(da, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(da, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(On, { text: t.announcement })
  ] });
}
function Uw({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: jw }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Vw(e, a) {
  return e !== "" && a !== "" ? null : Ww;
}
function Yw(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = Fw, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [h, _] = g(""), [b, x] = g(""), [G, J] = g(a[0].value), [le, Ne] = g(() => Gw(t, r)), [oe, Me] = g(e.stages ?? Hw), [Be, $] = g(o[0].value), F = { name: h, key: b, streamStep: le, owner: G, stages: oe, policy: Be }, me = Vw(h, b);
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
      /* @__PURE__ */ n(Kw, { stages: oe, onMove: (Re, ot) => Me(Ia(oe, Re, ot)) })
    ] }),
    /* @__PURE__ */ n(kn, { legend: "Loop policy", options: o, value: Be, onChange: $ }),
    /* @__PURE__ */ n(Uw, { reason: me, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const jn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Jw = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function Xw(e, a, t, r, o, i) {
  var s;
  const c = ((s = jn.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function Qw(e, a) {
  return Zw(e) && e_(e, a) && a_(e);
}
function Zw(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function e_(e, a) {
  return e.colourStep !== null && Wa({ step: e.colourStep }, a);
}
function a_(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function n_(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${Bh}.` : Wa({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function t_({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function r_({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(t_, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: Jw })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function l_({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function o_({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
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
function i_(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [o, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, x] = g("relay"), [G, J] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = Xw(o, c, u, h, b, G), Ne = Qw(le, r), oe = G.find(($) => $.kind === "agent" && $.name.trim() !== ""), Me = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(An, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), Be = /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: n_(h, r) }),
    /* @__PURE__ */ n(L, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Je, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(l_, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(o_, { name: o, setName: i, streamKey: c, setKey: s, colour: Me, owner: Be }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: zw })
        ] }),
        /* @__PURE__ */ n(Ow, { stages: G, onChange: J })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(kn, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: jn, onChange: x }) }),
      /* @__PURE__ */ n(r_, { ready: Ne, draft: le, agentStage: oe, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function d1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(i_, { ...e }) : /* @__PURE__ */ n(Yw, { ...e });
}
const c_ = "_row_bs8hc_2", s_ = "_cell_bs8hc_6", d_ = "_condition_bs8hc_11", u_ = "_action_bs8hc_18", h_ = "_contract_bs8hc_24", m_ = "_contractCondition_bs8hc_33", w_ = "_contractAction_bs8hc_39", V = {
  row: c_,
  cell: s_,
  condition: d_,
  action: u_,
  contract: h_,
  contractCondition: m_,
  contractAction: w_
}, Wn = ["advance", "block", "escalate", "requestReview"], hn = {
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
      options: Wn.map((o) => ({ value: o, label: hn[o] }))
    }
  );
}
function __({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { className: V.condition, title: ua(e, r), children: ua(e, r) }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: za(e, a, t) })
  ] });
}
function v_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ l("td", { className: V.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: V.condition, children: ua(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: V.cell, children: za(e, a, t) })
  ] });
}
function f_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: V.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: V.contractCondition, children: ua(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: V.contractAction, children: za(e, a, t, !0) })
  ] });
}
const b_ = { two: v_, four: __, contract: f_ };
function u1(e) {
  var t;
  if (!Wn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = b_[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const p_ = "_column_lurgk_2", g_ = "_head_lurgk_17", N_ = "_index_lurgk_23", y_ = "_name_lurgk_29", k_ = "_meta_lurgk_38", $_ = "_mono_lurgk_43", C_ = "_gate_lurgk_50", S_ = "_reviewersLabel_lurgk_57", R_ = "_reviewers_lurgk_57", T_ = "_reviewer_lurgk_57", L_ = "_agents_lurgk_74", x_ = "_workflowColumn_lurgk_79", A_ = "_workflowHead_lurgk_96", E_ = "_stageRow_lurgk_102", q_ = "_stageLabel_lurgk_109", I_ = "_workflowTitle_lurgk_116", M_ = "_workflowMeta_lurgk_122", B_ = "_workflowGate_lurgk_127", P_ = "_gateNote_lurgk_135", D_ = "_cardNote_lurgk_140", O_ = "_reviewerList_lurgk_149", H_ = "_reviewerRow_lurgk_155", F_ = "_reviewerMark_lurgk_161", j_ = "_reviewerName_lurgk_171", W_ = "_terminalCard_lurgk_177", z_ = "_terminalCount_lurgk_186", G_ = "_workflowAgents_lurgk_192", K_ = "_mount_lurgk_198", y = {
  column: p_,
  head: g_,
  index: N_,
  name: y_,
  meta: k_,
  mono: $_,
  gate: C_,
  reviewersLabel: S_,
  reviewers: R_,
  reviewer: T_,
  agents: L_,
  workflowColumn: x_,
  workflowHead: A_,
  stageRow: E_,
  stageLabel: q_,
  workflowTitle: I_,
  workflowMeta: M_,
  workflowGate: B_,
  gateNote: P_,
  cardNote: D_,
  reviewerList: O_,
  reviewerRow: H_,
  reviewerMark: F_,
  reviewerName: j_,
  terminalCard: W_,
  terminalCount: z_,
  workflowAgents: G_,
  mount: K_
}, U_ = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Ga(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function zn(e) {
  return `${Math.round(e * 100)}%`;
}
function V_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(pa, { cells: [
      { value: zn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function Y_({ stage: e }) {
  return /* @__PURE__ */ n(pa, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Ga(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function J_({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: U_[e.kind] })
  ] });
}
function X_({ stage: e }) {
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
function Q_({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(V_, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Y_, { stage: e }) : null;
}
function Z_({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function ev({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(J_, { stage: e, titleId: o }),
    /* @__PURE__ */ n(X_, { stage: e }),
    /* @__PURE__ */ n(Q_, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(oh, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(Z_, { onMount: t })
  ] });
}
const av = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function nv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function tv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(nv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: zn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function rv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function lv({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: Ga(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: rv(e.rolledBackThisWeek) })
  ] });
}
function ov(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function iv(e) {
  if (e.kind === "terminal") return `${Ga(e.closedThisWeek)} this week`;
  const a = ov(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function cv({ stage: e, titleId: a }) {
  const t = av[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: iv(e) })
  ] });
}
function sv(e) {
  return e === "entry" || e === "agent";
}
function dv({ stage: e, onMount: a }) {
  return a === void 0 || !sv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function uv({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(cv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(tv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(lv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(dv, { stage: e, onMount: t })
  ] });
}
function hv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function h1(e) {
  return hv(e) ? /* @__PURE__ */ n(uv, { ...e }) : /* @__PURE__ */ n(ev, { ...e });
}
const mv = "_row_ve78g_6", wv = "_cell_ve78g_10", _v = "_name_ve78g_19", vv = "_chain_ve78g_26", fv = "_owner_ve78g_32", bv = "_mono_ve78g_38", pv = "_compactRow_ve78g_45", gv = "_compactCell_ve78g_54", Nv = "_stack_ve78g_71", yv = "_stat_ve78g_78", kv = "_identityLine_ve78g_85", $v = "_identity_ve78g_85", Cv = "_compactName_ve78g_103", Sv = "_ownerLine_ve78g_117", Rv = "_link_ve78g_130", Tv = "_emptyChain_ve78g_136", Lv = "_arrow_ve78g_142", xv = "_muted_ve78g_143", Av = "_define_ve78g_148", Ev = "_statValue_ve78g_155", qv = "_policyId_ve78g_161", Iv = "_sub_ve78g_166", f = {
  row: mv,
  cell: wv,
  name: _v,
  chain: vv,
  owner: fv,
  mono: bv,
  compactRow: pv,
  compactCell: gv,
  stack: Nv,
  stat: yv,
  identityLine: kv,
  identity: $v,
  compactName: Cv,
  ownerLine: Sv,
  link: Rv,
  emptyChain: Tv,
  arrow: Lv,
  muted: xv,
  define: Av,
  statValue: Ev,
  policyId: qv,
  sub: Iv
};
function Mv(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Bv(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function Gn(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Pv(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Gn(e.members)}`;
}
function Dv(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Pv(e) })
  ] }) });
}
function Ov(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function Hv(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : Ov(e) });
}
function mn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function Fv(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function jv(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Wv({ stream: e, href: a, presentation: t }) {
  const r = Bv(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ce(e.streamStep, "chip") }, children: [
    Dv(e, a),
    Hv(e.stages, a),
    mn(jv(e.agents), e.agents === void 0 ? void 0 : Mv(e.agents), "—"),
    Fv(e.policy),
    mn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function zv(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function m1(e) {
  if (zv(e)) return Wv(e);
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
      /* @__PURE__ */ n("span", { className: f.mono, children: Gn(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : te(a.p50) }) })
  ] });
}
const Gv = "_row_mdce7_2", Kv = "_name_mdce7_16", Uv = "_scope_mdce7_24", ha = {
  row: Gv,
  name: Kv,
  scope: Uv
};
function Vv(e) {
  return e === void 0 ? `${ha.row} ward-toolrow` : `${ha.row} ward-toolrow ${e}`;
}
function Yv(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Jv({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
function Xv({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Qv({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${ha.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Zv(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function w1({ tool: e, onChange: a, presentation: t }) {
  const r = k(), o = k(), i = Yv(e, t), c = Zv(t);
  return /* @__PURE__ */ l(c, { className: Vv(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Jv, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${ha.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Qv, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(Xv, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const ef = "_strip_1qtlf_2", af = "_head_1qtlf_10", nf = "_name_1qtlf_16", tf = "_chart_1qtlf_24", rf = "_segment_1qtlf_30", lf = "_detailedChart_1qtlf_36", of = "_rail_1qtlf_49", cf = "_section_1qtlf_55", sf = "_label_1qtlf_66", df = "_note_1qtlf_83", Y = {
  strip: ef,
  head: af,
  name: nf,
  chart: tf,
  segment: rf,
  detailedChart: lf,
  rail: of,
  section: cf,
  label: sf,
  note: df
}, uf = "No item in flight to preview.", hf = "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on.", mf = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark — not a theme. Two teams theming the same product produces two products.", Ma = [1, 2, 3, 4, 5, 6], ma = 100;
function wf(e, a) {
  return a.has(e) ? Ce(e, "id") : "var(--ward-color-line)";
}
function _f({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: Y.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ma.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: Y.segment,
      x: o * ma,
      y: "0",
      width: ma,
      height: "8",
      fill: wf(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function vf(e) {
  const a = e.slice(0, Ma.length);
  for (; a.length < Ma.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function ff({ identities: e }) {
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
function Kn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ea({ label: e, children: a }) {
  const t = k();
  return /* @__PURE__ */ l("section", { className: Y.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: Y.label, children: e }),
    a
  ] });
}
function bf({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: Y.note, children: a ?? uf }) : /* @__PURE__ */ n(Na, { item: { ...e, streamStep: fa(t.streamStep) }, onOpen: Kn(r), feed: null });
}
function pf({ draft: e }) {
  const a = { "--stream": Ce(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: Y.head, style: a, children: [
    /* @__PURE__ */ n(Se, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: Y.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...ba(e.key, e.streamStep) })
  ] });
}
function gf(e) {
  const a = vf(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("div", { className: Y.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ea, { label: "Board card", children: /* @__PURE__ */ n(bf, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ea, { label: "Streams index row", children: /* @__PURE__ */ n(pf, { draft: t }) }),
    /* @__PURE__ */ l(ea, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(ff, { identities: a }),
      /* @__PURE__ */ n("p", { className: Y.note, children: hf })
    ] }),
    /* @__PURE__ */ n(ea, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: Y.note, children: mf }) })
  ] });
}
function Nf({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": Ce(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: Y.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: Y.head, children: [
      /* @__PURE__ */ n(Se, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: Y.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...ba(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(Na, { item: { ...a, streamStep: e.streamStep }, onOpen: Kn(r) }),
    /* @__PURE__ */ n(_f, { draft: e, streams: t })
  ] });
}
function _1(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(gf, { ...e }) : /* @__PURE__ */ n(Nf, { ...e });
}
const yf = "_row_ixlg5_6", kf = "_headCell_ixlg5_10", $f = "_cell_ixlg5_11", Cf = "_name_ixlg5_23", Sf = "_consequence_ixlg5_29", Rf = "_governed_ixlg5_36", Tf = "_control_ixlg5_42", Lf = "_byRole_ixlg5_48", xf = "_webControl_ixlg5_59", Af = "_webConsequence_ixlg5_65", Ef = "_webGoverned_ixlg5_71", P = {
  row: yf,
  headCell: kf,
  cell: $f,
  name: Cf,
  consequence: Sf,
  governed: Rf,
  control: Tf,
  byRole: Lf,
  webControl: xf,
  webConsequence: Af,
  webGoverned: Ef
};
function qf({
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
function If({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(qf, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Mf(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Bf({ name: e, cell: a, onChange: t }) {
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
function Pf({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(Bf, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: Mf(e) }) })
  ] });
}
function v1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Pf, { ...e }) : /* @__PURE__ */ n(If, { ...e });
}
const Df = "_row_vv64h_2", Of = "_cell_vv64h_6", Hf = "_name_vv64h_25", Ff = "_note_vv64h_30", jf = "_webName_vv64h_41", Wf = "_webMeta_vv64h_47", z = {
  row: Df,
  cell: Of,
  name: Hf,
  note: Ff,
  webName: jf,
  webMeta: Wf
}, Un = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function zf(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Gf({ component: e, onRestart: a }) {
  const t = k(), r = Un[e.state], o = e.state === "drainFirst";
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
function Kf({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: zf(e.state) });
}
function Uf({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { ...Un[e.state] }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(Kf, { component: e, onRestart: a }) })
  ] });
}
function f1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Uf, { ...e }) : /* @__PURE__ */ n(Gf, { ...e });
}
const Vf = "_row_1f1gp_7", Yf = "_cell_1f1gp_11", Jf = "_next_1f1gp_28", Xf = "_headCell_1f1gp_38", Qf = "_webId_1f1gp_77", Zf = "_webPurpose_1f1gp_83", eb = "_webMeta_1f1gp_91", ab = "_webUrgent_1f1gp_97", O = {
  row: Vf,
  cell: Yf,
  next: Jf,
  headCell: Xf,
  webId: Qf,
  webPurpose: Zf,
  webMeta: eb,
  webUrgent: ab
}, nb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, tb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, Vn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], rb = Object.fromEntries(Vn.map((e) => [e.key, e]));
function De({ column: e, children: a }) {
  const t = rb[e];
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
function b1() {
  return /* @__PURE__ */ n("tr", { children: Vn.map((e) => /* @__PURE__ */ n(
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
function lb({ cred: e }) {
  const a = nb[e.state];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n(De, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(De, { column: "id", children: e.id }),
    /* @__PURE__ */ n(De, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(De, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(De, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(De, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function ob({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function ib({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(ob, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...tb[e.state] }) })
  ] });
}
function p1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ib, { ...e }) : /* @__PURE__ */ n(lb, { ...e });
}
const cb = "_card_17zba_2", sb = "_head_17zba_11", db = "_env_17zba_18", ub = "_version_17zba_25", hb = "_meta_17zba_32", mb = "_webCard_17zba_37", wb = "_webRow_17zba_47", _b = "_webTitle_17zba_55", vb = "_webLine_17zba_65", fb = "_webVersion_17zba_72", bb = "_webMeta_17zba_77", W = {
  card: cb,
  head: sb,
  env: db,
  version: ub,
  meta: hb,
  webCard: mb,
  webRow: wb,
  webTitle: _b,
  webLine: vb,
  webVersion: fb,
  webMeta: bb
}, Yn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function pb({ env: e }) {
  const a = Yn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function gb(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [re(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Nb(e) {
  return /* @__PURE__ */ l("article", { className: `${W.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${W.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${W.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Yn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${W.version} ${W.webVersion} ${W.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${W.meta} ${W.webMeta} ${W.webLine} ward-cellmeta`, children: gb(e) })
  ] });
}
function g1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Nb, { ...e }) : /* @__PURE__ */ n(pb, { ...e });
}
const yb = "_panel_1hmja_2", kb = "_line_1hmja_8", $b = "_actions_1hmja_14", aa = {
  panel: yb,
  line: kb,
  actions: $b
};
function N1(e) {
  return /* @__PURE__ */ l("div", { className: aa.panel, children: [
    /* @__PURE__ */ n("p", { className: aa.line, children: e.status }),
    /* @__PURE__ */ n(L, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: aa.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: aa.line, children: e.note ?? "" })
  ] });
}
const Cb = "_upload_erepj_2", Sb = "_preview_erepj_7", Rb = "_mark_erepj_17", Tb = "_empty_erepj_22", Lb = "_actions_erepj_28", xb = "_input_erepj_33", Ab = "_reasons_erepj_41", Eb = "_reason_erepj_41", qb = "_accepted_erepj_57", X = {
  upload: Cb,
  preview: Sb,
  mark: Rb,
  empty: Tb,
  actions: Lb,
  input: xb,
  reasons: Ab,
  reason: Eb,
  accepted: qb
}, Jn = 1.5, Xn = 22, Ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Jn}px at ${Xn}px`];
function Ib() {
  return { ok: !1, reasons: [Ye[1]] };
}
function Mb(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function Bb(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ye[0]] : [];
}
function Pb(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ye[1]), e.querySelector("text") !== null && t.push(Ye[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function Db(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? Xn / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Jn;
  }) ? [Ye[3]] : [];
}
function y1(e) {
  const a = Mb(e);
  if (a === null) return Ib();
  const t = [...Bb(a), ...Pb(a, e), ...Db(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const Ob = "Mark accepted.";
function Hb({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: X.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: X.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: X.empty }) });
}
function Fb(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function jb(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Wb({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: X.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: X.result, role: "status", children: /* @__PURE__ */ n("p", { className: X.accepted, children: Ob }) }) : /* @__PURE__ */ n("div", { className: X.result, role: "status", children: /* @__PURE__ */ n("ul", { className: X.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: X.reason, children: a }, a)) }) });
}
function zb({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Wb, { result: e }) : /* @__PURE__ */ n("p", { className: `${X.result} ${Fb(e, t)}`, role: "status", children: jb(e, t) });
}
function k1({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: X.upload, children: [
    /* @__PURE__ */ n(Hb, { current: e }),
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
    /* @__PURE__ */ n(zb, { result: i, presentation: r })
  ] });
}
const Gb = "_row_1wp9s_7", Kb = "_cell_1wp9s_11", Ub = "_head_1wp9s_28", Vb = "_name_1wp9s_34", Yb = "_pinned_1wp9s_42", Jb = "_headCell_1wp9s_49", Xb = "_webName_1wp9s_88", Qb = "_webMeta_1wp9s_95", Zb = "_webWarn_1wp9s_103", q = {
  row: Gb,
  cell: Kb,
  head: Ub,
  name: Vb,
  pinned: Yb,
  headCell: Jb,
  webName: Xb,
  webMeta: Qb,
  webWarn: Zb
}, Ka = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, Qn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], ep = Object.fromEntries(Qn.map((e) => [e.key, e]));
function ap(e, a) {
  return `mcp.${e}.${a}`;
}
function np(e) {
  return Object.keys(Ka).includes(e);
}
function tp(e) {
  return Ka[e !== void 0 && np(e) ? e : "unknown"];
}
function Ge({ column: e, children: a }) {
  const t = ep[e];
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
function $1() {
  return /* @__PURE__ */ n("tr", { children: Qn.map((e) => /* @__PURE__ */ n(
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
function rp({ server: e }) {
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
    /* @__PURE__ */ n(Ge, { column: "tools", children: e.tools.map((t) => ap(e.name, t)).join(" · ") })
  ] });
}
function lp(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function op(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function ip({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function cp({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function sp({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function dp({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: lp(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...op(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(ip, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...tp(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n(cp, { server: e, onRestart: a }),
      /* @__PURE__ */ n(sp, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function C1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(dp, { ...e }) : /* @__PURE__ */ n(rp, { ...e });
}
const up = "_row_1h9nq_2", hp = "_headCell_1h9nq_14", mp = "_cell_1h9nq_15", wp = "_name_1h9nq_26", _p = "_consequence_1h9nq_32", vp = "_reason_1h9nq_38", fp = "_value_1h9nq_44", bp = "_webRow_1h9nq_60", pp = "_webSetting_1h9nq_71", gp = "_webName_1h9nq_79", Np = "_webConsequence_1h9nq_87", yp = "_webControl_1h9nq_93", kp = "_webState_1h9nq_106", $p = "_webChip_1h9nq_111", T = {
  row: up,
  headCell: hp,
  cell: mp,
  name: wp,
  consequence: _p,
  reason: vp,
  value: fp,
  webRow: bp,
  webSetting: pp,
  webName: gp,
  webConsequence: Np,
  webControl: yp,
  webState: kp,
  webChip: $p
}, Zn = 104, et = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Cp({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ie, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Nn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: T.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Sp({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), i = et[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: T.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: T.headCell, children: [
      /* @__PURE__ */ n("span", { className: T.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: T.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: T.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: T.cell, children: /* @__PURE__ */ n(Cp, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: T.cell, style: { width: Zn }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function at(e, a) {
  return String(e ?? a);
}
function Rp(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Tp(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? at(e.value, "—");
}
function Lp({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: T.webControl, children: [
    /* @__PURE__ */ n(Ie, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: T.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function xp(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(Lp, { ...e });
  const o = Rp(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: T.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Nn, { options: o, value: at(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${T.webControl} ${T.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: Tp(a) });
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
    i ? /* @__PURE__ */ n("span", { className: T.webControl, children: i(c) }) : /* @__PURE__ */ n(xp, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${T.webChip} ward-policy-chip`, style: { width: Zn }, children: /* @__PURE__ */ n(m, { ...et[t], size: "tag" }) })
  ] });
}
function S1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ap, { ...e }) : /* @__PURE__ */ n(Sp, { ...e });
}
const Ep = "_label_1o9za_7", qp = "_name_1o9za_15", Ip = "_column_1o9za_24", Mp = "_webFrame_1o9za_57", Bp = "_webHead_1o9za_62", Pp = "_webHeadLabel_1o9za_74", Dp = "_webLabel_1o9za_112", Op = "_webColumns_1o9za_119", Hp = "_webGroup_1o9za_125", Fp = "_webPeople_1o9za_126", jp = "_webVia_1o9za_127", Wp = "_webMeta_1o9za_156", H = {
  label: Ep,
  name: qp,
  column: Ip,
  webFrame: Mp,
  webHead: Bp,
  webHeadLabel: Pp,
  webLabel: Dp,
  webColumns: Op,
  webGroup: Hp,
  webPeople: Fp,
  webVia: jp,
  webMeta: Wp
}, zp = {
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
function Gp(e) {
  if (!e.matrixRole) return;
  const a = zp[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Kp({ node: e }) {
  const a = Gp(e);
  return /* @__PURE__ */ l("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(Up, { role: a, node: e }),
    /* @__PURE__ */ n(Ta, { column: Ra[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Ta, { column: Ra[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Ta, { column: Ra[2], children: e.requestedVia ?? "" })
  ] });
}
function Up({ role: e, node: a }) {
  return /* @__PURE__ */ l(A, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Vp({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    Cn,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(Kp, { node: t }),
      children: c
    }
  );
}
function La({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Yp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(La, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(La, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(La, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Jp() {
  return /* @__PURE__ */ l("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function Xp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Qp(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Zp({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Jp, {}),
    /* @__PURE__ */ n(hc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Cn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Xp, { row: t }),
        detail: /* @__PURE__ */ n(Yp, { row: t }),
        expanded: Qp(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function R1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Zp, { ...e }) : /* @__PURE__ */ n(Vp, { ...e });
}
const eg = "_runbook_b9agc_2", ag = "_list_b9agc_7", ng = "_step_b9agc_15", tg = "_numeral_b9agc_21", rg = "_body_b9agc_28", lg = "_head_b9agc_34", og = "_title_b9agc_40", ig = "_detail_b9agc_45", cg = "_actions_b9agc_50", sg = "_webList_b9agc_56", dg = "_webStep_b9agc_60", ug = "_webBody_b9agc_66", hg = "_webTitle_b9agc_74", mg = "_webDetail_b9agc_78", S = {
  runbook: eg,
  list: ag,
  step: ng,
  numeral: tg,
  body: rg,
  head: lg,
  title: og,
  detail: ig,
  actions: cg,
  webList: sg,
  webStep: dg,
  webBody: ug,
  webTitle: hg,
  webDetail: mg
}, nt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function tt(e) {
  return String(e + 1).padStart(2, "0");
}
function wg({ step: e, index: a, connection: t }) {
  const r = nt[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: tt(a) }),
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
function _g({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(wg, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function vg({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: tt(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...nt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function fg({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(vg, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function T1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(fg, { ...e }) : /* @__PURE__ */ n(_g, { ...e });
}
const bg = "_list_1gu6a_2", pg = "_check_1gu6a_10", gg = "_body_1gu6a_16", Ng = "_text_1gu6a_23", yg = "_pending_1gu6a_32", kg = "_measured_1gu6a_37", He = {
  list: bg,
  check: pg,
  body: gg,
  text: Ng,
  pending: yg,
  measured: kg
};
function $g(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Cg({ check: e }) {
  const a = $g(e.passed);
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
function L1({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${He.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Cg, { check: a }, a.text)) });
}
const Sg = "_root_16pdz_2", Rg = "_list_16pdz_9", Tg = "_line_16pdz_16", Lg = "_at_16pdz_43", xg = "_text_16pdz_47", Ag = "_foot_16pdz_51", Eg = "_idle_16pdz_62", qg = "_caret_16pdz_69", Ig = "_jump_16pdz_76", fe = {
  root: Sg,
  list: Rg,
  line: Tg,
  at: Lg,
  text: xg,
  foot: Ag,
  idle: Eg,
  caret: qg,
  jump: Ig
}, Mg = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Ua(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Mg.format(new Date(e));
}
const Bg = { warn: "warning", ok: "ok" };
function Pg({ kind: e }) {
  const a = Bg[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Dg({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Ua(e)}` });
}
function Og({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events — as of ${Ua(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${fe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${fe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: fe.idle, children: i }),
    /* @__PURE__ */ n(Dg, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function x1({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
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
      /* @__PURE__ */ n("span", { className: fe.at, children: Ua(d.at) }),
      /* @__PURE__ */ n(Pg, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: fe.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(Og, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${fe.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const Hg = "_row_11jhe_2", Fg = "_head_11jhe_14", jg = "_author_11jhe_20", Wg = "_eta_11jhe_25", zg = "_edited_11jhe_26", Gg = "_body_11jhe_32", Kg = "_reason_11jhe_37", Ug = "_actions_11jhe_42", _e = {
  row: Hg,
  head: Fg,
  author: jg,
  eta: Wg,
  edited: zg,
  body: Gg,
  reason: Kg,
  actions: Ug
}, Vg = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function Yg(e) {
  return {
    queued: `Still in the outbox — editing replaces the queued row and recomputes req_hash, so ${e} receives one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed — edit and resend, or cancel the delivery."
  };
}
function Jg({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
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
function Xg({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: _e.reason, id: a, children: e })
  ] });
}
function Qg(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Zg(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Jg, { ...e }) : /* @__PURE__ */ n(Xg, { reason: e.unavailable, reasonId: e.unavailableId });
}
function A1(e) {
  const { comment: a } = e;
  Qg(e);
  const t = k(), r = `${t}-unavailable`, o = Vg[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${_e.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: _e.head, children: [
      /* @__PURE__ */ n("span", { className: _e.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: _e.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: _e.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: _e.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: _e.reason, id: t, children: Yg(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: _e.actions, children: /* @__PURE__ */ n(Zg, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const eN = "_root_c46wj_2", aN = "_attach_c46wj_11", nN = "_actions_c46wj_17", tN = "_reply_c46wj_23", rN = "_replyRow_c46wj_28", lN = "_sendsAs_c46wj_42", je = {
  root: eN,
  attach: aN,
  actions: nN,
  reply: tN,
  replyRow: rN,
  sendsAs: lN
};
function oN({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = g(""), i = k();
  return /* @__PURE__ */ l("div", { className: je.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: je.replyRow, children: [
      /* @__PURE__ */ n(L, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: je.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function E1(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(oN, { ...e }) : /* @__PURE__ */ n(iN, { ...e });
}
function iN({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ l("div", { className: je.root, children: [
    /* @__PURE__ */ n(L, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ l("div", { className: je.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      gn,
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
const cN = "_list_1ih9e_2", sN = "_item_1ih9e_6", dN = "_body_1ih9e_22", uN = "_text_1ih9e_28", hN = "_evidence_1ih9e_37", mN = "_consequence_1ih9e_49", wN = "_note_1ih9e_54", qe = {
  list: cN,
  item: sN,
  body: dN,
  text: uN,
  evidence: hN,
  consequence: mN,
  note: wN
};
function _N({ criterion: e }) {
  return /* @__PURE__ */ n(Se, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function wn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function vN(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function fN({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: qe.body, children: [
    /* @__PURE__ */ n("span", { className: qe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(A, { children: [
      /* @__PURE__ */ n(wn, { text: " — " }),
      /* @__PURE__ */ n("code", { className: qe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(A, { children: [
      /* @__PURE__ */ n(wn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: qe.consequence, children: vN(e.why) })
    ] })
  ] });
}
function bN({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: qe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(_N, { criterion: e }),
    /* @__PURE__ */ n(fN, { criterion: e })
  ] });
}
function q1({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(bN, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: qe.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const pN = "_list_dwhoz_2", gN = "_rung_dwhoz_6", NN = "_name_dwhoz_18", yN = "_actor_dwhoz_32", ra = {
  list: pN,
  rung: gN,
  name: NN,
  actor: yN
}, kN = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function $N({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = kN[e.state];
  return /* @__PURE__ */ l("li", { className: ra.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ra.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ra.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function I1({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ra.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n($N, { rung: a }, a.name)) });
}
const CN = "_sheet_1fqco_2", SN = "_title_1fqco_9", RN = "_stage_1fqco_15", TN = "_effects_1fqco_20", LN = "_effect_1fqco_20", xN = "_numeral_1fqco_31", AN = "_effectText_1fqco_38", EN = "_refusals_1fqco_43", qN = "_reasons_1fqco_52", IN = "_reason_1fqco_52", MN = "_actions_1fqco_62", ce = {
  sheet: CN,
  title: SN,
  stage: RN,
  effects: TN,
  effect: LN,
  numeral: xN,
  effectText: AN,
  refusals: EN,
  reasons: qN,
  reason: IN,
  actions: MN
};
function BN({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function M1({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
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
      li,
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
      /* @__PURE__ */ n(BN, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const PN = "_list_1hvqu_2", DN = "_path_1hvqu_7", ON = "_head_1hvqu_21", HN = "_label_1hvqu_28", FN = "_consequence_1hvqu_35", jN = "_ask_1hvqu_36", Fe = {
  list: PN,
  path: DN,
  head: ON,
  label: HN,
  consequence: FN,
  ask: jN
}, Ba = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function _n(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function WN({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: Ba[e.kind] }) : /* @__PURE__ */ l(A, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: Ba[e.kind] }),
    /* @__PURE__ */ n("span", { className: Fe.ask, id: r, children: e.askInstead })
  ] });
}
function zN({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: Fe.path, "data-allowed": e.allowed, "data-role": _n(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: Fe.head, children: [
      /* @__PURE__ */ n("span", { className: Fe.label, children: e.title ?? Ba[e.kind] }),
      /* @__PURE__ */ n(m, { role: _n(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Fe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(WN, { path: e, primary: a, onChoose: t })
  ] });
}
function B1({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Fe.list, children: e.map((t, r) => /* @__PURE__ */ n(zN, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const GN = "_list_qjv4r_2", KN = "_item_qjv4r_6", UN = "_node_qjv4r_18", VN = "_body_qjv4r_24", YN = "_head_qjv4r_30", JN = "_stage_qjv4r_36", XN = "_version_qjv4r_41", QN = "_sentence_qjv4r_49", ZN = "_meta_qjv4r_54", be = {
  list: GN,
  item: KN,
  node: UN,
  body: VN,
  head: YN,
  stage: JN,
  version: XN,
  sentence: QN,
  meta: ZN
}, ey = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function ay({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: be.head, children: [
    /* @__PURE__ */ n("span", { className: be.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: be.version, title: e.version, children: e.version }) : null
  ] });
}
function ny({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${be.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${be.node} ward-history-node`, children: /* @__PURE__ */ n(Se, { size: 9, kind: ey[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${be.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(ay, { entry: e }),
      /* @__PURE__ */ n("span", { className: be.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${be.meta} ward-history-meta`, children: [
        `${re(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${Q(e.cost)}`
      ] })
    ] })
  ] });
}
function P1({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${be.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(ny, { entry: a }, a.stage + String(t))) });
}
const ty = "_thread_1kn6s_3", ry = "_turn_1kn6s_8", ly = "_who_1kn6s_27", oy = "_body_1kn6s_32", la = {
  thread: ty,
  turn: ry,
  who: ly,
  body: oy
}, rt = ze(!1);
function D1({ children: e, density: a }) {
  return /* @__PURE__ */ n(rt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${la.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function O1({ turn: e }) {
  if (!We(rt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${la.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${la.who} ward-chat-who`, children: [
      e.author,
      " · ",
      re(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${la.body} ward-chat-body`, children: e.body })
  ] });
}
const iy = "_list_1rt9c_3", cy = "_row_1rt9c_7", sy = "_label_1rt9c_20", dy = "_n_1rt9c_26", uy = "_cause_1rt9c_33", Ue = {
  list: iy,
  row: cy,
  label: sy,
  n: dy,
  cause: uy
};
function hy(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const my = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function wy({ row: e, formatNumber: a }) {
  return hy(e), /* @__PURE__ */ l("li", { className: `${Ue.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Se, { size: 8, ...my[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Ue.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Ue.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(_y, { cause: e.cause })
  ] });
}
function _y({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ue.cause} ward-healthrow-cause`, children: e }) : null;
}
function H1({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(wy, { row: t, formatNumber: a }, t.label)) });
}
const vy = "_root_1jxwp_2", fy = {
  root: vy
};
function F1({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: fy.root, "data-density": o, children: [
    /* @__PURE__ */ n(ya, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const by = "_row_dhbre_3", py = "_key_dhbre_13", gy = "_stack_dhbre_24", Ny = "_value_dhbre_32", yy = "_evidence_dhbre_39", ky = "_mark_dhbre_47", Oe = {
  row: by,
  key: py,
  stack: gy,
  value: Ny,
  evidence: yy,
  mark: ky
};
function $y({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Fa, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function j1({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Oe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Oe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Oe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Oe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Oe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Oe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n($y, { state: e.state }) })
  ] });
}
const Cy = "_cell_1monp_2", Sy = {
  cell: Cy
}, Ry = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Ty(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function Ly(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function xy(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Ty(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function Ay(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function W1({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  Ly(e, t);
  const r = Ay(e);
  return /* @__PURE__ */ n(
    pi,
    {
      label: "Rejection routing",
      columns: Ry,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: Sy.cell, "data-norerun": o.noRerun ? !0 : void 0, children: xy(o, i) }),
      empty: a ?? /* @__PURE__ */ n(Uc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Ey = "_row_ute8v_2", qy = "_title_ute8v_11", Iy = "_turns_ute8v_20", My = "_waiting_ute8v_21", By = "_resolved_ute8v_22", Py = "_activity_ute8v_23", Dy = "_cost_ute8v_29", Oy = "_link_ute8v_30", Hy = "_tableRow_ute8v_47", Fy = "_tableTitle_ute8v_59", jy = "_tableResolved_ute8v_64", Wy = "_tableLink_ute8v_68", zy = "_tableMeta_ute8v_83", Gy = "_tableCost_ute8v_90", Ky = "_tableActivity_ute8v_91", Uy = "_tableState_ute8v_101", Vy = "_tableRecord_ute8v_112", B = {
  row: Ey,
  title: qy,
  turns: Iy,
  waiting: My,
  resolved: By,
  activity: Py,
  cost: Dy,
  link: Oy,
  tableRow: Hy,
  tableTitle: Fy,
  tableResolved: jy,
  tableLink: Wy,
  tableMeta: zy,
  tableCost: Gy,
  tableActivity: Ky,
  tableState: Uy,
  tableRecord: Vy
}, lt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function Yy(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function Jy(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Xy(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const Qy = { duplicate: "CLOSED · DUPLICATE" };
function Zy({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function ek({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : Q(e) });
}
function ak({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function nk({ session: e, href: a }) {
  const t = lt[e.state];
  return /* @__PURE__ */ l("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: Jy(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: B.tableResolved, children: [
      Xy(e.resolved),
      /* @__PURE__ */ n(Zy, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(ek, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: Yy(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: Qy[e.state] ?? t.label }),
      /* @__PURE__ */ n(ak, { link: e.link })
    ] }) })
  ] });
}
function tk({ session: e }) {
  const a = lt[e.state];
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
function z1(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(nk, { session: e.session, href: e.href }) : /* @__PURE__ */ n(tk, { session: e.session });
}
const rk = "_block_1yy2v_3", lk = "_list_1yy2v_9", ok = "_line_1yy2v_14", Pa = {
  block: rk,
  list: lk,
  line: ok
}, ik = { warn: "warning", ok: "ok" };
function ck({ kind: e }) {
  const a = ik[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function sk({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Pa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(ck, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function G1({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Pa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Pa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(sk, { line: t }, `${r}-${t.text}`)) }) });
}
const dk = "_band_tt7hp_1", uk = "_head_tt7hp_8", hk = "_cell_tt7hp_19", mk = "_index_tt7hp_35", wk = "_title_tt7hp_42", _k = "_note_tt7hp_48", vk = "_cellTitle_tt7hp_53", fk = "_cellBody_tt7hp_58", bk = "_tag_tt7hp_64", we = {
  band: dk,
  head: uk,
  cell: hk,
  index: mk,
  title: wk,
  note: _k,
  cellTitle: vk,
  cellBody: fk,
  tag: bk
}, vn = 4;
function K1({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== vn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${vn}-cell grid`);
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
  x1 as ActivityConsole,
  oh as AgentCard,
  Ak as AppShell,
  _1 as AppearanceStrip,
  K1 as Band,
  Ts as BoardColumn,
  Yk as BoardFootnote,
  Jk as BoardHeader,
  jk as BoardScroller,
  v as Btn,
  Rk as CHIP_ROLES,
  Vn as CREDENTIAL_COLUMNS,
  Mk as Callout,
  v1 as CapabilityRow,
  O1 as ChatMessage,
  gn as Checkbox,
  m as Chip,
  A1 as ClarificationRow,
  o1 as ClauseRuleRow,
  l1 as ClauseRules,
  An as ColourLadder,
  f1 as ComponentRow,
  E1 as Composer,
  Qk as ConfigRow,
  Xk as ConfigRowHead,
  ja as ConnectionMark,
  D1 as Conversation,
  li as CostMeter,
  p1 as CredentialRow,
  b1 as CredentialRowHead,
  q1 as CriteriaList,
  Hr as Crumb,
  H1 as DeliveryHealth,
  zk as DeniedState,
  i1 as DryRunRail,
  Uc as EmptyState,
  g1 as EnvCard,
  L as Field,
  Wk as FilteredEmpty,
  Hk as FormStack,
  ya as GateChecklist,
  I1 as GateLadder,
  pi as Grid,
  s1 as HandoffRuleRow,
  c1 as HandoffRules,
  Zk as ItemDrawer,
  N1 as KeyPanel,
  kt as LIVE_EVENT_TYPES,
  Tu as LegacyBoardColumn,
  a1 as LegacyBoardHeader,
  n1 as LegacyConfigRow,
  r1 as LegacyItemDrawer,
  Nu as LegacyOverCapNote,
  t1 as LegacyPreviewRail,
  Tn as LegacyWorkCard,
  ge as LiveIndicator,
  Gk as LoadFailed,
  Vk as Loading,
  Qn as MCP_SERVER_COLUMNS,
  Fa as Mark,
  k1 as MarkUpload,
  Se as Marker,
  C1 as McpServerRow,
  $1 as McpServerRowHead,
  d1 as NewStreamModal,
  Jc as OverCapNote,
  Je as Overlay,
  Bh as PARTIAL_STEP_REASON,
  Zn as POLICY_CHIP_WIDTH,
  Pk as PageFrame,
  Ik as PageHeader,
  S1 as PolicyRow,
  e1 as PreviewRail,
  Ra as ROLE_MATRIX_COLUMNS,
  Wn as RULE_ACTIONS,
  kn as Radio,
  F1 as ReadyChecklist,
  Ok as RecordSection,
  M1 as RequeueSheet,
  B1 as ResolveBlock,
  j1 as ResolvedFieldRow,
  R1 as RoleMatrixRow,
  W1 as RoutingTable,
  u1 as RuleRow,
  T1 as RunbookSteps,
  Nt as STREAM_STEPS,
  Fk as SectionBand,
  Bi as SectionHeader,
  Nn as SegmentedControl,
  z1 as SessionRow,
  qk as Sidebar,
  h1 as StageColumn,
  P1 as StageHistory,
  Ow as StageListEditor,
  Kk as StaleStrip,
  pa as StatStrip,
  m1 as StreamRow,
  Dk as SubjectRail,
  Ie as Switch,
  Ek as Tabs,
  w1 as ToolRow,
  Bk as TopBar,
  hc as Tree,
  Cn as TreeRow,
  G1 as TypedInputBlock,
  L1 as ValidationList,
  yk as VisibilityProvider,
  kk as Visible,
  Sk as WARD_VERSION,
  Na as WorkCard,
  Uk as WriteUnavailableStrip,
  Yy as agoSince,
  mt as clock,
  n_ as colourStatus,
  ae as count,
  te as duration,
  Da as elapsed,
  Ck as eventSourceTransport,
  _a as isStreamStep,
  va as isValidatedStreamStep,
  Ph as ladderValidation,
  tp as mcpConnectionChip,
  ap as mcpToolName,
  Q as money,
  ue as ms,
  Sn as ordered,
  fn as ratio,
  zf as restartLabel,
  re as stamp,
  pn as stream,
  Lk as streamChip,
  ba as streamChipProps,
  Ce as streamColour,
  Ct as streamHex,
  Tk as streamVars,
  na as useBorderFlash,
  bt as useFocusTrap,
  xk as useLiveFeed,
  $k as useReturnFocus,
  wa as useRovingTabindex,
  Oa as useTicker,
  wt as useVisible,
  j as v,
  y1 as validateMark,
  fa as validatedStep,
  yt as validatedStreamSteps
};
