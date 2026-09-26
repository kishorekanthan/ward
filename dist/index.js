import { jsx as n, Fragment as L, jsxs as l } from "react/jsx-runtime";
import { useMemo as Zn, useContext as je, createContext as We, useCallback as G, useEffect as A, useState as g, useRef as N, useLayoutEffect as et, useId as $, Fragment as at } from "react";
import { createPortal as nt } from "react-dom";
function ne(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const Fa = (e) => String(e).padStart(2, "0");
function Aa(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${Fa(a % 60)}s` : `${Math.floor(t / 60)}h ${Fa(t % 60)}m`;
}
const tt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function te(e) {
  const a = tt.formatToParts(new Date(e)), t = (r) => {
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
function sn(e, a) {
  return `${e} / ${a}`;
}
const rt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function lt(e) {
  return rt.format(new Date(e));
}
const dn = We(/* @__PURE__ */ new Set());
function Qy({ hidden: e, children: a }) {
  const t = Zn(() => new Set(e), [e]);
  return /* @__PURE__ */ n(dn.Provider, { value: t, children: a });
}
function ot(e) {
  return !je(dn).has(e);
}
function Zy({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(L, { children: ot(e) ? a : t });
}
const it = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function ct(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function st(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = ct(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function dt(e) {
  return { onKeyDown: G(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(it));
      st(t, e.current, r);
    },
    [e]
  ) };
}
function ek(e, a = !0) {
  A(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const ja = { ArrowUp: -1, ArrowDown: 1 }, Wa = { ArrowLeft: -1, ArrowRight: 1 }, ut = (e, a, t) => Math.min(t, Math.max(a, e));
function ht(e, a) {
  if (a !== "horizontal" && e in ja) return ja[e];
  if (a !== "vertical" && e in Wa) return Wa[e];
}
function ha({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  et(() => {
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
      const _ = Math.max(0, h.indexOf(a)), b = ht(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[ut(_ + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
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
const ak = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, nk = "0.2.0", tk = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], mt = [1, 2, 3, 4, 5, 6], wt = [1, 2, 3], _t = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], F = {
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
function un(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function ze(e) {
  return mt.includes(e);
}
function Ea(e) {
  return wt.includes(e);
}
function rk(e) {
  if (!ze(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function vt(e) {
  if (!ze(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const ft = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function bt(e) {
  if (!ze(e)) throw new Error("unvalidated stream step");
  return ft[e];
}
function za(e) {
  return typeof e != "string" ? null : _t.includes(e) ? e : null;
}
function pt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function gt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Nt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function yt(e, a, t) {
  const r = pt(e);
  if (r === null) return null;
  const o = za(t) ?? za(r.type);
  return o === null ? null : { ...r, type: o, id: gt(r, a), at: Nt(r) };
}
function kt(e, a) {
  return e >= de.staleAfter ? "stale" : e >= de.heartbeat && a === "live" ? "reconnecting" : null;
}
function $t(e, a, t) {
  return e >= de.heartbeat && !a && t !== null;
}
function lk(e, a) {
  const [t, r] = g("reconnecting"), [o, i] = g(null), c = N(/* @__PURE__ */ new Map()), s = N(0), u = N(""), d = N(0), h = N(null), _ = N(0), b = N(0), E = N(!1), Z = N("reconnecting"), ee = G((k) => {
    Z.current = k, r(k);
  }, []), re = G(() => {
    s.current = Date.now();
  }, []), Ee = G((k) => {
    for (const [j, he] of c.current)
      (he === "*" || k.itemKey === he) && j(k);
  }, []), le = G(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: (k, j, he) => {
        const $e = yt(k, j, he);
        $e !== null && ($e.id && (u.current = $e.id), re(), E.current = !1, ee("live"), i($e.at), Ee($e));
      },
      onOpen: () => {
        d.current = 0, E.current = !1, re(), ee("live");
      },
      onError: () => {
        var j;
        (j = h.current) == null || j.close(), h.current = null, E.current = !0, Z.current !== "stale" && ee("reconnecting");
        const k = Math.min(de.reconnectBase * 2 ** d.current, de.reconnectMax);
        d.current += 1, _.current = window.setTimeout(le, k);
      }
    });
  }, [Ee, ee, re, a, e]), qe = G((k) => {
    E.current = !0, k.close(), h.current = null, _.current = window.setTimeout(le, de.reconnectBase);
  }, [le]), Ie = G((k, j) => (c.current.set(j, k), () => {
    c.current.delete(j);
  }), []);
  return A(() => (le(), b.current = window.setInterval(() => {
    const k = Date.now() - s.current, j = kt(k, Z.current);
    j && ee(j);
    const he = h.current;
    $t(k, E.current, he) && qe(he);
  }, de.tick), () => {
    var k;
    window.clearInterval(b.current), window.clearTimeout(_.current), E.current = !1, (k = h.current) == null || k.close(), h.current = null;
  }), [le, qe, ee]), { connection: t, lastEventAt: o, subscribe: Ie };
}
function qa(e, a) {
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
function Ct() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ga(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ea(e, a) {
  const t = N(0), r = G((o) => {
    const i = o ?? a, c = e.current;
    c !== null && i !== void 0 && (Ct() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => Ga(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => Ga(c), de.flash)));
  }, [a, e]);
  return A(() => () => window.clearTimeout(t.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const St = "_root_1otpc_2", Rt = {
  root: St
};
function Tt(e, a, t, r, o) {
  const i = [Aa(a)];
  return e || i.push(`as of ${lt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = qa(e, o), c = (a == null ? void 0 : a.at) ?? e, s = Tt(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${Rt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      te(e)
    ] })
  ] });
}
const Lt = "_app_lrbcc_1", xt = "_side_lrbcc_18", At = "_main_lrbcc_26", Et = "_rail_lrbcc_33", qt = "_page_lrbcc_40", It = "_root_lrbcc_91", Mt = "_topbar_lrbcc_98", Bt = "_mark_lrbcc_109", Pt = "_brand_lrbcc_116", Dt = "_tagline_lrbcc_122", Ht = "_identity_lrbcc_128", Ot = "_tools_lrbcc_129", Ft = "_actor_lrbcc_138", jt = "_metadata_lrbcc_139", Wt = "_detail_lrbcc_155", zt = "_nav_lrbcc_160", Gt = "_content_lrbcc_195", Kt = "_skip_lrbcc_218", D = {
  app: Lt,
  side: xt,
  main: At,
  rail: Et,
  page: qt,
  root: It,
  topbar: Mt,
  mark: Bt,
  brand: Pt,
  tagline: Dt,
  identity: Ht,
  tools: Ot,
  actor: Ft,
  metadata: jt,
  detail: Wt,
  nav: zt,
  content: Gt,
  skip: Kt
};
function Ut({ sidebar: e, header: a, children: t, rail: r }) {
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
function Vt({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: D.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function ra({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Yt({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: D.metadata, children: [
    /* @__PURE__ */ n(ra, { value: e, className: D.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(ra, { value: a, className: D.detail })
  ] });
}
function Jt(e) {
  return /* @__PURE__ */ l("header", { className: D.topbar, children: [
    /* @__PURE__ */ n("span", { className: D.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: D.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(ra, { value: e.tagline, className: D.tagline }),
    /* @__PURE__ */ n(Vt, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: D.identity, children: /* @__PURE__ */ n(Yt, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(ra, { value: e.tools, className: D.tools })
  ] });
}
function Xt(e) {
  const a = $();
  return /* @__PURE__ */ l("div", { className: `${D.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: D.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Jt, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: D.content, children: e.children })
  ] });
}
function Qt(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function ok(e) {
  return Qt(e) ? /* @__PURE__ */ n(Ut, { ...e }) : /* @__PURE__ */ n(Xt, { ...e });
}
const Zt = "_btn_llheq_2", er = "_primary_llheq_13", ar = "_secondary_llheq_23", nr = "_ghost_llheq_28", tr = "_overflow_llheq_37", rr = "_sm_llheq_44", lr = "_disabled_llheq_48", Xe = {
  btn: Zt,
  primary: er,
  secondary: ar,
  ghost: nr,
  overflow: tr,
  sm: rr,
  disabled: lr
};
function or(e, a, t, r) {
  const o = a === "sm" ? [Xe.sm, "ward-btn--sm"] : [], i = t ? [Xe.disabled] : [];
  return [Xe.btn, Xe[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function ir(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function cr(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function sr(e) {
  return e.children ?? e.label;
}
function v(e) {
  cr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: or(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...ir(a, e.controls),
      children: sr(e)
    }
  );
}
function Ia(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const dr = "_root_o4yib_2", ur = "_row_o4yib_8", hr = "_box_o4yib_14", mr = "_label_o4yib_21", wr = "_lockedNote_o4yib_26", _r = "_consequence_o4yib_34", vr = "_sample_o4yib_69", Se = {
  root: dr,
  row: ur,
  box: hr,
  label: mr,
  lockedNote: wr,
  consequence: _r,
  sample: vr
};
function fr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function br({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Se.consequence} ward-check-consequence`, children: a }) : null;
}
function pr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Se.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function gr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Se.sample, "aria-hidden": "true", children: e }) : null;
}
function hn(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = fr(e);
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
          "aria-describedby": Ia(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: a, className: Se.label, children: [
        e.label,
        /* @__PURE__ */ n(pr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(gr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(br, { id: t, text: e.consequence })
  ] });
}
const Nr = "_chip_1073r_2", yr = {
  chip: Nr
}, kr = {
  gate: F.chip.gate,
  system: F.chip.system,
  write: F.chip.write,
  drift: F.chip.drift,
  done: F.chip.done,
  attention: F.chip.attention,
  failed: F.chip.failed,
  pending: F.chip.pending,
  running: F.chip.running,
  warn: F.chip.warn,
  meta: F.chip.meta,
  soft: F.chip.soft,
  quiet: F.chip.quiet
};
function $r(e, a) {
  if (e === "stream") return Cr(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = kr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Cr(e) {
  if (!e || !Ea(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = un(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${yr.chip} ward-chip ward-chip--${e}`, style: $r(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
const Sr = "_nav_fbsei_2", Rr = "_list_fbsei_8", Tr = "_item_fbsei_15", Lr = "_link_fbsei_24", xr = "_current_fbsei_33", Ar = "_chips_fbsei_37", Me = {
  nav: Sr,
  list: Rr,
  item: Tr,
  link: Lr,
  current: xr,
  chips: Ar
};
function Er({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((t, r) => /* @__PURE__ */ n("li", { className: Me.item, children: r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Me.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", children: t.label }) }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Me.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const qr = "_field_1oadv_2", Ir = "_label_1oadv_8", Mr = "_labelHidden_1oadv_15", Br = "_control_1oadv_25", Pr = "_mono_1oadv_44", Dr = "_area_1oadv_49", Hr = "_invalid_1oadv_56", ke = {
  field: qr,
  label: Ir,
  labelHidden: Mr,
  control: Br,
  mono: Pr,
  area: Dr,
  invalid: Hr
};
function Or({ controlProps: e, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, ...e });
}
function Fr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function jr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Wr = { input: Or, select: Fr, textarea: jr };
function zr(e, a, t) {
  const r = Wr[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Gr(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ia(r ? t : void 0, e.describedBy),
    onChange: (o) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, o.target.value);
    }
  };
}
function Kr(e) {
  const a = e.mono ? [ke.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [ke.area] : [];
  return [ke.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Ur(e) {
  return e ? `${ke.label} ${ke.labelHidden} ward-field-label` : `${ke.label} ward-field-label`;
}
function x(e) {
  const a = $(), t = `${a}-msg`, r = Gr(e, a, t), o = Kr(e);
  return /* @__PURE__ */ l("div", { className: `${ke.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Ur(e.labelHidden), htmlFor: a, children: e.label }),
    zr(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${ke.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Vr = "_strip_rg8pj_2", Yr = "_tab_rg8pj_12", Jr = "_count_rg8pj_34", $a = {
  strip: Vr,
  tab: Yr,
  count: Jr
}, Ka = 7;
function Xr(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Qr(e) {
  return `${$a.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function ik({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > Ka) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Ka} — the set is fixed`);
  const i = ha({ orientation: "horizontal" }), c = Xr(e, a);
  return A(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: Qr(o),
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
          className: `${$a.tab} ward-tab`,
          "aria-selected": s.id === a,
          "aria-controls": `panel-${s.id}`,
          onClick: () => t(s.id),
          ...i.itemProps(u),
          children: [
            s.label,
            s.count === void 0 ? null : /* @__PURE__ */ l(L, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: $a.count, children: `· ${s.count}` })
            ] })
          ]
        },
        s.id
      ))
    }
  );
}
const Zr = "_root_jem6y_2", el = "_segment_jem6y_7", Ua = {
  root: Zr,
  segment: el
};
function mn({ options: e, value: a, onChange: t, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = ha({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return A(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${Ua.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Ua.segment,
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
const al = "_sidebar_1jywv_3", nl = "_brand_1jywv_9", tl = "_mark_1jywv_17", rl = "_word_1jywv_24", ll = "_nav_1jywv_30", ol = "_navItem_1jywv_38", il = "_group_1jywv_50", cl = "_groupName_1jywv_57", sl = "_agents_1jywv_70", dl = "_agent_1jywv_70", ul = "_agentTop_1jywv_88", hl = "_dot_1jywv_95", ml = "_agentName_1jywv_107", wl = "_agentMeta_1jywv_120", _l = "_foot_1jywv_126", vl = "_footName_1jywv_132", fl = "_footLinks_1jywv_139", bl = "_footLink_1jywv_139", pl = "_root_1jywv_153", gl = "_linkBrand_1jywv_162", Nl = "_label_1jywv_183", yl = "_note_1jywv_188", kl = "_footer_1jywv_202", C = {
  sidebar: al,
  brand: nl,
  mark: tl,
  word: rl,
  nav: ll,
  navItem: ol,
  group: il,
  groupName: cl,
  new: "_new_1jywv_64",
  agents: sl,
  agent: dl,
  agentTop: ul,
  dot: hl,
  agentName: ml,
  agentMeta: wl,
  foot: _l,
  footName: vl,
  footLinks: fl,
  footLink: bl,
  root: pl,
  linkBrand: gl,
  label: Nl,
  note: yl,
  footer: kl
};
function $l({ agent: e }) {
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
              style: { "--dot": un(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Cl({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function Sl({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n($l, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(Cl, { shared: i })
  ] });
}
function Rl(e) {
  return e.destinations ?? e.items ?? [];
}
function Tl({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function Ll({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function xl({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Al(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Tl, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Rl(e).map((a) => /* @__PURE__ */ n(xl, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(Ll, { children: e.children })
  ] });
}
function El(e) {
  return "agents" in e;
}
function ck(e) {
  return El(e) ? /* @__PURE__ */ n(Sl, { ...e }) : /* @__PURE__ */ n(Al, { ...e });
}
const ql = "_mark_wlgi8_3", Il = {
  mark: ql
}, Ml = { met: "✓", unmet: "", failed: "✕" };
function Ma({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Il.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Ml[e]
    }
  );
}
const Bl = "_marker_br9fi_2", Pl = {
  marker: Bl
}, Dl = {
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
function Ae({ size: e, kind: a, label: t }) {
  const r = { "--marker": Dl[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Pl.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Hl = "_root_ti0pq_2", Ol = "_chip_ti0pq_11", Fl = "_noCase_ti0pq_23", Qe = {
  root: Hl,
  chip: Ol,
  noCase: Fl
};
function jl(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Ba({ connection: e, since: a, lastEventAt: t }) {
  const r = jl(a, t), o = qa(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${Qe.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ae, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: Qe.noCase, children: Aa(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    te(r)
  ] });
}
const Wl = "_root_11rs7_2", zl = "_context_11rs7_12", Gl = "_row_11rs7_1", Kl = "_heading_11rs7_25", Ul = "_headingWrap_11rs7_33", Vl = "_chips_11rs7_38", Yl = "_title_11rs7_45", Jl = "_consequence_11rs7_54", Xl = "_actionsWrap_11rs7_59", Ql = "_actions_11rs7_59", Zl = "_action_11rs7_59", eo = "_overflowPanel_11rs7_78", ao = "_measure_11rs7_88", V = {
  root: Wl,
  context: zl,
  row: Gl,
  heading: Kl,
  headingWrap: Ul,
  chips: Vl,
  title: Yl,
  consequence: Jl,
  actionsWrap: Xl,
  actions: Ql,
  action: Zl,
  overflowPanel: eo,
  measure: ao
};
function no({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: V.heading, children: [
    /* @__PURE__ */ n("h1", { className: V.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: V.consequence, children: a })
  ] });
}
function wn({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: V.action, "data-action": "", children: a }, t));
}
function to({ actions: e, collapsed: a, onOverflow: t, disclosure: r }) {
  return a ? t ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: t, children: "···" }) : /* @__PURE__ */ n(v, { variant: "overflow", onClick: r.toggle, expanded: r.open, controls: r.panelId, children: "···" }) : /* @__PURE__ */ n(wn, { actions: e });
}
function ro({ actions: e, disclosure: a, onEscape: t }) {
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: V.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(wn, { actions: e }) });
}
function lo(e, a) {
  const t = $(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function oo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: V.context, children: [
    /* @__PURE__ */ n(Er, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: V.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function io(...e) {
  return e.some((a) => a === null);
}
function co(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function so(e, a, t, r, o) {
  if (o === 0 || io(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = co(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function uo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function ho(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = g(!1);
  return A(() => {
    const s = a.current;
    if (!uo(s)) return;
    const u = () => c(so(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function mo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Ba, { connection: e.connection, since: e.since }) : null;
}
function sk({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], connection: i, onOverflow: c, density: s = "page" }) {
  const { rowRef: u, headingRef: d, actionsRef: h, measureRef: _, collapsed: b } = ho(o), { disclosure: E, close: Z } = lo(b, h);
  return /* @__PURE__ */ l("header", { className: V.root, "data-density": s, children: [
    /* @__PURE__ */ n(oo, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: V.row, ref: u, children: [
      /* @__PURE__ */ n("div", { ref: d, className: V.headingWrap, children: /* @__PURE__ */ n(no, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: V.actionsWrap, children: [
        /* @__PURE__ */ n(mo, { connection: i }),
        /* @__PURE__ */ n("div", { className: V.actions, ref: h, "data-ward-actions": !0, children: /* @__PURE__ */ n(to, { actions: o, collapsed: b, onOverflow: c, disclosure: E }) })
      ] })
    ] }),
    b && !c ? /* @__PURE__ */ n(ro, { actions: o, disclosure: E, onEscape: Z }) : null,
    /* @__PURE__ */ n("div", { className: V.measure, ref: _, "aria-hidden": "true", children: o.map((ee, re) => /* @__PURE__ */ n("span", { children: ee }, re)) })
  ] });
}
function _n(e) {
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
const wo = "_scrim_c7sqj_2", _o = "_drawer_c7sqj_10", vo = "_sheet_c7sqj_14", fo = "_modal_c7sqj_18", bo = "_panel_c7sqj_23", po = "_header_c7sqj_51", go = "_title_c7sqj_59", No = "_body_c7sqj_63", yo = "_close_c7sqj_90", be = {
  scrim: wo,
  drawer: _o,
  sheet: vo,
  modal: fo,
  panel: bo,
  header: po,
  title: go,
  body: No,
  close: yo
}, ko = We(null), la = [], oa = /* @__PURE__ */ new Map();
function $o(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Co(e, a) {
  let t = oa.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, oa.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function So(e, a) {
  for (const t of Array.from(a.children))
    $o(t) || Co(e, t);
}
function Ro(e) {
  for (const a of e.claims) {
    const t = oa.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), oa.delete(a)));
  }
}
function To(e, a) {
  const t = { root: e, claims: [] };
  return la.push(t), So(t, a), t;
}
function Lo(e) {
  const a = la.indexOf(e);
  a >= 0 && la.splice(a, 1), Ro(e);
}
function Va(e) {
  return e !== null && la.at(-1) === e;
}
function xo(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, A(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = To(i, a);
    return r.current = s, () => {
      var d, h;
      const u = Va(s);
      Lo(s), r.current = null, u && ((h = (d = o.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), G(() => Va(r.current), []);
}
function Ao(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Eo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function qo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${be.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("header", { className: `${be.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${be.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${be.body} ward-drawer-body`, children: e.children })
  ] });
}
function Io(e) {
  return `${be.scrim} ${be[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Mo(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${be.panel} ${be[e]} ward-overlay-panel${t}${r}`;
}
function Bo(e) {
  const a = je(ko);
  return e ?? a ?? document.body;
}
function Je(e) {
  const a = N(null), t = N(null), r = $(), o = Bo(e.container), i = _n("(min-width: 768px)"), c = Ao(e.kind, i), s = Eo(e, r), u = dt(t), d = xo(a, o, e.returnFocusTo), h = G(() => {
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
  }, [h]), nt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Io(c),
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
            className: Mo(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${be.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(qo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Po = "_root_drrhx_2", Do = "_ticket_drrhx_15", Ho = "_body_drrhx_24", fa = {
  root: Po,
  ticket: Do,
  body: Ho
};
function dk({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${fa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${fa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: fa.body, children: t })
  ] });
}
const Oo = "_root_1bfqw_2", Fo = "_figure_1bfqw_7", jo = "_of_1bfqw_13", Wo = "_bar_1bfqw_18", zo = "_rows_1bfqw_38", Go = "_row_1bfqw_38", Ko = "_label_1bfqw_49", Uo = "_amount_1bfqw_54", Ne = {
  root: Oo,
  figure: Fo,
  of: jo,
  bar: Wo,
  rows: zo,
  row: Go,
  label: Ko,
  amount: Uo
};
function Vo({ spent: e, ceiling: a, breakdown: t }) {
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
const Yo = "_frame_mg2jl_2", Jo = "_table_mg2jl_6", Xo = "_th_mg2jl_12", Qo = "_td_mg2jl_13", Zo = "_sort_mg2jl_47", ei = "_row_mg2jl_53", ai = "_empty_mg2jl_61", ye = {
  frame: Yo,
  table: Jo,
  th: Xo,
  td: Qo,
  sort: Zo,
  row: ei,
  empty: ai
}, ni = { asc: "ascending", desc: "descending" };
function ti(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ni[a.direction];
}
function ri(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: ye.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function li(e) {
  return e === void 0 ? void 0 : { width: e };
}
function oi({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ye.th,
      style: li(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ti(e, a),
      children: ri(e, t)
    }
  );
}
function ii({ row: e, props: a }) {
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
function ci({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ye.head, children: a.map((h) => /* @__PURE__ */ n(oi, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(ii, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const si = "_set_y5zy3_2", di = "_legend_y5zy3_7", ui = "_row_y5zy3_15", hi = "_control_y5zy3_20", mi = "_input_y5zy3_26", wi = "_label_y5zy3_31", _i = "_consequence_y5zy3_36", Ce = {
  set: si,
  legend: di,
  row: ui,
  control: hi,
  input: mi,
  label: wi,
  consequence: _i
};
function vn({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
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
              "aria-describedby": Ia(b, c),
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
const vi = "_root_1h1ot_2", fi = "_head_1h1ot_11", bi = "_index_1h1ot_25", pi = "_dot_1h1ot_29", gi = "_note_1h1ot_34", Ni = "_counter_1h1ot_40", yi = "_trailing_1h1ot_48", Re = {
  root: vi,
  head: fi,
  index: bi,
  dot: pi,
  note: gi,
  counter: Ni,
  trailing: yi
};
function ki({ index: e }) {
  return e ? /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("span", { className: `${Re.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Re.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function $i({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Re.counter, "aria-hidden": "true", children: e }) : null;
}
function Ci({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Re.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Re.head, children: [
      /* @__PURE__ */ n(ki, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Re.note, children: t }),
    /* @__PURE__ */ n($i, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Re.trailing, children: i })
  ] });
}
const Si = "_strip_1qhvo_2", Ri = "_cell_1qhvo_7", Ti = "_value_1qhvo_12", Li = "_label_1qhvo_27", Ze = {
  strip: Si,
  cell: Ri,
  value: Ti,
  label: Li
};
function xi(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function ma({ cells: e, divided: a = !1 }) {
  return xi(e), /* @__PURE__ */ n("dl", { className: `${Ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Ze.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ze.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Ze.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Ai = "_root_xk7sv_2", Ei = "_track_xk7sv_8", qi = "_thumb_xk7sv_35", Ii = "_labelHidden_xk7sv_53", Mi = "_label_xk7sv_53", Bi = "_lockedNote_xk7sv_68", Te = {
  root: Ai,
  track: Ei,
  thumb: qi,
  labelHidden: Ii,
  label: Mi,
  lockedNote: Bi
};
function Pi(e) {
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
    /* @__PURE__ */ l("span", { id: s, className: Pi(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Te.lockedNote, children: "always on" })
    ] })
  ] });
}
const Di = "_bar_1u2kl_2", Hi = "_skip_1u2kl_11", Oi = "_mark_1u2kl_22", Fi = "_nav_1u2kl_30", ji = "_list_1u2kl_34", Wi = "_select_1u2kl_40", zi = "_dest_1u2kl_47", Gi = "_actor_1u2kl_61", Ki = "_actorMark_1u2kl_74", Ui = "_actorLabel_1u2kl_79", Vi = "_tagline_1u2kl_98", oe = {
  bar: Di,
  skip: Hi,
  mark: Oi,
  nav: Fi,
  list: ji,
  select: Wi,
  dest: zi,
  actor: Gi,
  actorMark: Ki,
  actorLabel: Ui,
  tagline: Vi
};
function Yi(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Ji(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function uk({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = Ji(r);
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
      /* @__PURE__ */ n("span", { className: oe.actorMark, "aria-hidden": "true", children: Yi(s) })
    ] })
  ] });
}
const Xi = "_tree_1lyby_2", Qi = "_item_1lyby_6", Zi = "_row_1lyby_10", ec = "_button_1lyby_22", ia = {
  tree: Xi,
  item: Qi,
  row: Zi,
  button: ec
}, fn = We(null);
function ac({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ha({ orientation: "vertical" });
  return /* @__PURE__ */ n(fn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ia.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const nc = { ArrowRight: !0, ArrowLeft: !1 };
function Ya(e) {
  return e ? !0 : void 0;
}
function tc(e, a) {
  const t = nc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function rc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function lc(e) {
  const a = [ia.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function oc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function ic(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function cc(e) {
  return typeof e == "string" ? e : void 0;
}
function sc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function dc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function bn(e) {
  const a = je(fn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = oc(e);
  return /* @__PURE__ */ l("li", { className: ia.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: lc(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": Ya(e.unresolved),
        "data-inherited": Ya(e.inherited),
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${ia.button} ward-treeitem-btn`,
            onClick: () => rc(e),
            onKeyDown: (r) => tc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: ic(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: cc(e.label), children: e.label }),
              /* @__PURE__ */ n(sc, { value: e.detail }),
              /* @__PURE__ */ n(dc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const uc = "_frame_9lntd_2", hc = "_subjectRail_9lntd_21", mc = "_subject_9lntd_21", wc = "_rail_9lntd_41", _c = "_record_9lntd_63", vc = "_recordBody_9lntd_68", fc = "_band_9lntd_111", bc = "_bandBody_9lntd_120", pc = "_bandActions_9lntd_125", gc = "_scroller_9lntd_132", Nc = "_lanes_9lntd_150", se = {
  frame: uc,
  subjectRail: hc,
  subject: mc,
  rail: wc,
  record: _c,
  recordBody: vc,
  band: fc,
  bandBody: bc,
  bandActions: pc,
  scroller: gc,
  lanes: Nc
};
function hk({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: se.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function Ja(e) {
  return e ? "true" : void 0;
}
function mk({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: se.subjectRail, "data-ward-subject-rail": t, "data-ruled": Ja(i), children: [
    /* @__PURE__ */ n("div", { className: se.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: se.rail, "data-sticky": Ja(o), "aria-label": r, children: a })
  ] });
}
function wk({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: se.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Ci, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: se.recordBody, "data-pad": o, children: a })
  ] });
}
const yc = "_form_1j8ub_2", kc = "_fields_1j8ub_9", $c = "_actions_1j8ub_19", ba = {
  form: yc,
  fields: kc,
  actions: $c
};
function _k({ label: e, children: a, actions: t, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: ba.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: ba.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: ba.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function vk({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: se.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: se.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: se.bandActions, children: a })
  ] });
}
const Cc = "(max-width: 767.98px)";
function Ca({ label: e, children: a }) {
  return /* @__PURE__ */ n("div", { className: se.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", children: a });
}
function Sc({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: se.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(x, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(Ca, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function fk({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = _n(Cc);
  return t === void 0 ? /* @__PURE__ */ n(Ca, { label: a, children: e }) : o ? /* @__PURE__ */ n(Sc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Ca, { label: a, children: t.map((i) => /* @__PURE__ */ n(at, { children: i.content }, i.id)) });
}
const Rc = "_block_1o5o7_2", Tc = "_sentence_1o5o7_15", Lc = "_meta_1o5o7_20", xc = "_action_1o5o7_25", Ac = "_strip_1o5o7_29", Ec = "_loading_1o5o7_48", qc = "_label_1o5o7_56", Ic = "_counter_1o5o7_63", ue = {
  block: Rc,
  sentence: Tc,
  meta: Lc,
  action: xc,
  strip: Ac,
  loading: Ec,
  label: qc,
  counter: Ic
};
function Mc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: ue.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function wa({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${ue.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: ue.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Mc, { action: a })
  ] });
}
function Bc(e) {
  return /* @__PURE__ */ n(wa, { ...e });
}
function bk({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(wa, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: ue.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function pk(e) {
  return /* @__PURE__ */ n(wa, { ...e });
}
function gk({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(wa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: ue.meta, children: [
    "failed at ",
    te(a)
  ] }) });
}
function Nk({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: ue.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    te(e),
    " — showing snapshot from ",
    te(a)
  ] });
}
function yk({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: ue.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    te(a)
  ] });
}
function kk({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = g(!1);
  A(() => {
    const c = window.setTimeout(() => o(!0), de.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = qa(t.current, r);
  return /* @__PURE__ */ l("div", { className: `${ue.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: ue.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: ue.counter, children: Aa(i) }) : null
  ] });
}
const Pc = "_note_tlubt_2", Dc = {
  note: Pc
};
function Hc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: Dc.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const Oc = "_card_12in3_2", Fc = "_hit_12in3_23", jc = "_head_12in3_30", Wc = "_title_12in3_36", zc = "_meta_12in3_44", Gc = "_fields_12in3_45", Kc = "_who_12in3_58", Uc = "_sep_12in3_65", Vc = "_mono_12in3_69", Yc = "_field_12in3_45", Jc = "_last_12in3_84", Xc = "_reason_12in3_96", K = {
  card: Oc,
  hit: Fc,
  head: jc,
  title: Wc,
  meta: zc,
  fields: Gc,
  who: Kc,
  sep: Uc,
  mono: Vc,
  field: Yc,
  last: Jc,
  reason: Xc
}, Qc = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Zc(e, a, t) {
  const r = ea(e, "blue"), o = ea(e, "orange"), i = ea(e, "green"), c = N(/* @__PURE__ */ new Set());
  A(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = Qc[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const es = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : J(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function as(e, a) {
  return es[a](e);
}
function ns({ item: e, connection: a }) {
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
function ts({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: K.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function rs({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: K.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function ls({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: K.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: K.field, children: as(e, t) }, t)) });
}
const Sa = (e) => e ? !0 : void 0;
function os(e) {
  return { "--stream": `var(--ward-stream-${e.streamStep}-id)` };
}
function is(e, a, t) {
  e == null || e(a, t);
}
function cs(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function ss({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: K.last, "data-stale": Sa(a), children: t }) : null;
}
function _a(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  Zc(r, t.key, e.feed);
  const o = cs(e.feed), i = os(t);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: K.card,
      style: i,
      "data-selected": Sa(e.selected),
      "data-flagged": Sa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: K.hit, onClick: (c) => is(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(ts, { item: t }),
        /* @__PURE__ */ n("p", { className: K.title, children: t.title }),
        /* @__PURE__ */ n(ns, { item: t, connection: o }),
        /* @__PURE__ */ n(rs, { reason: t.blockedReason }),
        /* @__PURE__ */ n(ls, { item: t, fields: a }),
        /* @__PURE__ */ n(ss, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const ds = "_column_14784_3", us = "_head_14784_24", hs = "_label_14784_33", ms = "_count_14784_42", ws = "_list_14784_56", Ke = {
  column: ds,
  head: us,
  label: hs,
  count: ms,
  list: ws
};
function pn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function _s({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: Ke.head, children: [
    /* @__PURE__ */ n("h2", { className: Ke.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: Ke.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function vs(e) {
  return /* @__PURE__ */ n("div", { className: Ke.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      _a,
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
function fs({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = $(), h = e.cap !== void 0 && a.length > e.cap, _ = pn(a, r);
  return /* @__PURE__ */ l("section", { className: Ke.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(_s, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(vs, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    h && /* @__PURE__ */ n(Hc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const bs = "_foot_8qg4p_2", ps = "_note_8qg4p_13", gs = "_link_8qg4p_19", pa = {
  foot: bs,
  note: ps,
  link: gs
};
function $k({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: pa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: pa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: pa.link, href: e, children: "Configure board" })
  ] });
}
const Ns = "_head_1la6p_3", ys = "_identity_1la6p_12", ks = "_titleRow_1la6p_18", $s = "_title_1la6p_18", Cs = "_key_1la6p_35", Ss = "_rollup_1la6p_45", Rs = "_tools_1la6p_53", Ts = "_swatch_1la6p_62", Ls = "_mark_1la6p_69", _e = {
  head: Ns,
  identity: ys,
  titleRow: ks,
  title: $s,
  key: Cs,
  rollup: Ss,
  tools: Rs,
  swatch: Ts,
  mark: Ls
}, Xa = "initials:";
function xs(e) {
  return e === void 0 ? "loaded this week unavailable" : `${Q(e)} loaded this week`;
}
function As(e) {
  const a = [`${Q(e.inFlight)} in flight`, xs(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${Q(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ne(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ne(e.p90)}`), a.join(" · ");
}
function Es(e) {
  return e.startsWith(Xa) ? e.slice(Xa.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function qs({ markRef: e, streamStep: a }) {
  const t = { "--stream": `var(--ward-stream-${a}-id)` };
  return e ? /* @__PURE__ */ n("span", { className: `${_e.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Es(e) }) : /* @__PURE__ */ n("span", { className: _e.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Is({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Ck({
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
        /* @__PURE__ */ n(qs, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: _e.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: _e.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: _e.rollup, "aria-live": "polite", children: As(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: _e.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Is, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Ba, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Ms = "_head_kabyh_11", Bs = "_line_kabyh_12", Ps = "_cHandle_kabyh_33", Ds = "_cName_kabyh_38", Hs = "_nameLine_kabyh_46", Os = "_cLabel_kabyh_53", Fs = "_cCap_kabyh_58", js = "_cShown_kabyh_63", Ws = "_name_kabyh_46", zs = "_noCap_kabyh_85", Gs = "_state_kabyh_99", Ks = "_handle_kabyh_104", Us = "_sub_kabyh_118", I = {
  head: Ms,
  line: Bs,
  cHandle: Ps,
  cName: Ds,
  nameLine: Hs,
  cLabel: Os,
  cCap: Fs,
  cShown: js,
  name: Ws,
  noCap: zs,
  state: Gs,
  handle: Ks,
  sub: Us
}, Vs = "can't be hidden or collapsed", Ys = "terminal · counted, not a column";
function Sk() {
  return /* @__PURE__ */ l("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function Js(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Xs(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Qa(e) {
  return e.gate ? Vs : e.terminal ? Ys : Xs(e.agentsMounted);
}
function Qs(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Zs({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: I.cName, children: [
    /* @__PURE__ */ l("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    Qa(e) && /* @__PURE__ */ n("span", { className: I.sub, children: Qa(e) })
  ] });
}
function ed(e) {
  return e === void 0 ? "" : String(e);
}
function ad(e) {
  return e === "" ? void 0 : Number(e);
}
function nd({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Qs(t, a),
      children: "⠿"
    }
  ) });
}
function td({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(x, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: ed(a.cap), onChange: (r) => t({ ...a, cap: ad(r) }) }) });
}
function rd({ stage: e, config: a, onChange: t }) {
  const r = Js(e, a.shown);
  return /* @__PURE__ */ l("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(xe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function ld(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function Rk({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: I.line, "data-kind": ld(e), children: [
    /* @__PURE__ */ n(nd, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Zs, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(x, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(td, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(rd, { stage: e, config: a, onChange: t })
  ] });
}
const od = "_body_hn6d6_2", id = "_head_hn6d6_9", cd = "_summary_hn6d6_19", sd = "_block_hn6d6_20", dd = "_actionsBlock_hn6d6_21", ud = "_title_hn6d6_41", hd = "_note_hn6d6_46", md = "_k_hn6d6_51", wd = "_kv_hn6d6_58", _d = "_row_hn6d6_64", vd = "_label_hn6d6_75", fd = "_value_hn6d6_84", bd = "_quote_hn6d6_90", pd = "_actions_hn6d6_21", gd = "_resolve_hn6d6_103", M = {
  body: od,
  head: id,
  summary: cd,
  block: sd,
  actionsBlock: dd,
  title: ud,
  note: hd,
  k: md,
  kv: wd,
  row: _d,
  label: vd,
  value: fd,
  quote: bd,
  actions: pd,
  resolve: gd
};
function Nd(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function yd(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function kd(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { role: "stream", label: `STEP ${e.streamStep}`, streamStep: e.streamStep }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ne(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Nd(e),
    ...yd(e, a)
  ];
}
function $d({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function Cd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: M.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Sd({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: M.block, children: [
    /* @__PURE__ */ n("p", { className: M.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: M.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: M.note, children: e.agentMeta })
  ] }) : null;
}
function Tk({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = $(), d = kd(e, o);
  return /* @__PURE__ */ n(Je, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: M.body, children: [
    /* @__PURE__ */ n(Cd, { item: e }),
    /* @__PURE__ */ l("div", { className: M.summary, children: [
      /* @__PURE__ */ n("h2", { className: M.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: M.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: M.kv, children: d.map(([h, _]) => /* @__PURE__ */ l("div", { className: M.row, children: [
      /* @__PURE__ */ n("dt", { className: M.label, children: h }),
      /* @__PURE__ */ n("dd", { className: M.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(Sd, { item: e }),
    /* @__PURE__ */ l("div", { className: M.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: M.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: M.note, children: s })
    ] }),
    /* @__PURE__ */ n($d, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Rd = "_root_3azmy_2", Td = "_list_3azmy_7", Ld = "_item_3azmy_12", xd = "_box_3azmy_18", Ad = "_text_3azmy_23", Ed = "_note_3azmy_28", Be = {
  root: Rd,
  list: Td,
  item: Ld,
  box: xd,
  text: Ad,
  note: Ed
};
function va({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ l("div", { className: Be.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Be.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Be.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Be.box, children: /* @__PURE__ */ n(Ma, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Be.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Be.note} ward-checklist-note`, children: a })
  ] });
}
const qd = "_rail_ke7ch_2", Id = "_k_ke7ch_11", Md = "_head_ke7ch_19", Bd = "_section_ke7ch_25", Pd = "_card_ke7ch_38", Dd = "_strip_ke7ch_42", Hd = "_skeleton_ke7ch_56", Od = "_skeletonLabel_ke7ch_70", Fd = "_bar_ke7ch_76", jd = "_note_ke7ch_85", ce = {
  rail: qd,
  k: Id,
  head: Md,
  section: Bd,
  card: Pd,
  strip: Dd,
  skeleton: Hd,
  skeletonLabel: Od,
  bar: Fd,
  note: jd
};
function Wd(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ga({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: ce.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: ce.k, children: e }),
    a
  ] });
}
function zd({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: ce.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: ce.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: ce.bar, "aria-hidden": "true" }, r))
  ] });
}
function Gd({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(fs, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function Kd(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Gd, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(zd, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function Lk(e) {
  const a = Wd(e.onOpen), t = pn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: ce.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${ce.k} ${ce.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(ga, { title: "Card", children: /* @__PURE__ */ n("div", { className: ce.card, children: t && /* @__PURE__ */ n(_a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(ga, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: ce.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Kd, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: ce.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(ga, { title: "Effect of this config", children: /* @__PURE__ */ n(va, { items: e.effects, density: "compact" }) })
  ] });
}
function Ud(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Vd(e) {
  return Math.ceil(e.length / 2);
}
function Yd(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function gn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Jd(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = gn(e);
  o !== void 0 && t(o), r(Yd(e.type));
}
function Xd(e, a, t, r, o) {
  A(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Jd(i, t, r, o));
  }, [e, a, t, r, o]);
}
function Qd(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Zd(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function eu(e, a) {
  return a !== void 0 ? ne(e.timeInStage) + " · waits on " + a.agent : ne(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function au(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + F.height.card + " + " + F.height.cardRow + " * " + String(Vd(a ?? [])) + ")"
  };
}
function nu(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function tu(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: J(e.cost) }) : null;
}
function ru(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function lu(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function ou(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function iu(e, a) {
  return a === void 0 ? e : Ud(e, a.ref);
}
function cu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ve(e) {
  return e === !0 ? "true" : void 0;
}
function Nn(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = ea(o), c = N(/* @__PURE__ */ new Set()), [s, u] = g(Qd(a));
  Xd(e.feed, a.key, c, u, i);
  const d = Zd(a, r), h = eu(a, t), _ = au(a, e.fields), b = ou(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...cu(e),
      className: "ward-workcard",
      "data-flagged": Ve(a.flagged),
      "data-selected": Ve(e.selected),
      style: _,
      ref: iu(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        nu(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          tu(a, e.fields),
          ru(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          lu(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function su({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function du(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function uu(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function hu(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(su, { count: e.items.length, cap: e.column.cap });
}
function mu(e, a) {
  return e.roving ?? a;
}
function wu(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function _u(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    Nn,
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
function vu(e) {
  const a = $(), t = ha({ orientation: "vertical" }), r = mu(e, t), o = du(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ve(o), "data-gate": Ve(e.column.gate), children: [
    uu(e.column, e.items.length, a),
    hu(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...wu(e, t), children: _u(e, r) })
  ] });
}
function fu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ne(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ne(e.p90)), a;
}
function bu(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function pu(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function xk(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: fu(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      bu(e),
      pu(e.onConfigure),
      /* @__PURE__ */ n(Ba, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function gu(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Nu(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(xe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(xe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function yu(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(L, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function Ak(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": Ve(gu(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Nu(e) }),
    /* @__PURE__ */ n(x, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(hn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    yu(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function Ek(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Nn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(vu, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function ku(e, a) {
  const t = gn(e);
  t !== void 0 && a(t);
}
function $u(e, a, t) {
  A(() => {
    if (e != null)
      return e.subscribe(a, (r) => ku(r, t));
  }, [e, a, t]);
}
function Cu(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Su(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ne(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", J(e.cost)]), a;
}
function Ru(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Tu(e, a) {
  return /* @__PURE__ */ l(L, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function qk(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = g((c = a.run) == null ? void 0 : c.lastStep);
  $u(e.feed, a.key, o);
  const i = [...Cu(a), ...Su(a)];
  return /* @__PURE__ */ l(Je, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Ru(t, r)
    ] }),
    Tu(a, e.actions)
  ] });
}
const Lu = "_card_hvxp7_2", xu = "_head_hvxp7_17", Au = "_mark_hvxp7_25", Eu = "_name_hvxp7_37", qu = "_chips_hvxp7_48", Iu = "_description_hvxp7_54", Mu = "_run_hvxp7_59", Bu = "_sep_hvxp7_68", Pu = "_facts_hvxp7_73", Du = "_fact_hvxp7_73", Hu = "_factLabel_hvxp7_86", Ou = "_factValue_hvxp7_90", X = {
  card: Lu,
  head: xu,
  mark: Au,
  name: Eu,
  chips: qu,
  description: Iu,
  run: Mu,
  sep: Bu,
  facts: Pu,
  fact: Du,
  factLabel: Hu,
  factValue: Ou
}, Fu = { live: "done", draft: "running", paused: "meta" };
function ju(e) {
  return e === void 0 ? X.card : `${X.card} ${e}`;
}
function Wu({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: X.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Fu[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function zu({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: X.description, children: e });
}
function Gu({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: X.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: X.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Ku({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: X.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: X.fact, children: [
    /* @__PURE__ */ n("dt", { className: X.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: X.factValue, children: a.value })
  ] }, a.label)) });
}
function Uu(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Vu({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, facts: i, className: c }) {
  const s = { "--stream": `var(--ward-stream-${e.streamStep}-id)` }, u = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": u,
      className: ju(c),
      style: s,
      "data-selected": u,
      "data-paused": Uu(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: X.head, children: [
          /* @__PURE__ */ n("span", { className: X.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${X.name} ward-rowlink`, href: a, "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(zu, { description: e.description }),
        /* @__PURE__ */ n(Gu, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Wu, { versions: e.versions }),
        /* @__PURE__ */ n(Ku, { facts: i })
      ]
    }
  );
}
const Yu = "_list_4dcyc_2", Ju = "_row_4dcyc_11", Xu = "_head_4dcyc_23", Qu = "_id_4dcyc_30", Zu = "_lock_4dcyc_35", eh = "_reason_4dcyc_41", ah = "_remove_4dcyc_46", nh = "_clauses_4dcyc_50", th = "_clause_4dcyc_50", rh = "_label_4dcyc_64", lh = "_cell_4dcyc_71", oh = "_value_4dcyc_76", ae = {
  list: Yu,
  row: Ju,
  head: Xu,
  id: Qu,
  lock: Zu,
  reason: eh,
  remove: ah,
  clauses: nh,
  clause: th,
  label: rh,
  cell: lh,
  value: oh
}, yn = We(!1);
function Ik({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(yn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ae.list, "aria-label": a, children: e }) });
}
function ih({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ae.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(x, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => t(e.key, o) });
}
function ch({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ae.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ae.reason, children: e })
  ] });
}
function sh({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: ae.head, children: [
    /* @__PURE__ */ n("span", { className: ae.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(ch, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ae.remove, children: /* @__PURE__ */ l(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Za(e, a) {
  return e.locked ? void 0 : a;
}
function Mk({ rule: e, onChange: a, onRemove: t }) {
  if (!je(yn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Za(e, a);
  return /* @__PURE__ */ l("li", { className: ae.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(sh, { rule: e, onRemove: Za(e, t) }),
    /* @__PURE__ */ n("dl", { className: ae.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ae.clause, children: [
      /* @__PURE__ */ n("dt", { className: ae.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ae.cell, children: /* @__PURE__ */ n(ih, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const dh = "_ladder_wwnch_2", uh = "_cell_wwnch_7", hh = "_empty_wwnch_26", mh = "_name_wwnch_34", wh = "_holder_wwnch_40", _h = "_request_wwnch_46", vh = "_swatches_wwnch_51", fh = "_swatch_wwnch_51", bh = "_tilesFrame_wwnch_78", ph = "_tiles_wwnch_78", gh = "_tile_wwnch_78", Nh = "_bar_wwnch_117", yh = "_hex_wwnch_128", kh = "_note_wwnch_138", R = {
  ladder: dh,
  cell: uh,
  empty: hh,
  name: mh,
  holder: wh,
  request: _h,
  swatches: vh,
  swatch: fh,
  tilesFrame: bh,
  tiles: ph,
  tile: gh,
  bar: Nh,
  hex: yh,
  note: kh
}, $h = "not validated — needs CVD matrix and dark stepping";
function Ch(e) {
  return e.reserved ? "reserved" : Ea(e.step) ? "validated" : "partial";
}
function kn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Sh(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Rh({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ae, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Th(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Lh(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const en = (e) => String(e).padStart(2, "0");
function xh(e, a, t) {
  return e === "reserved" ? "Reserved — needs revalidation" : t ? "yours" : a ?? kn(e, void 0);
}
function Ah({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: r ? `step ${en(e)}` : bt(e) }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: r ? t : `Step ${en(e)} · ${t}` })
  ] });
}
function Eh({ step: e, value: a, taken: t, onChange: r, presentation: o }) {
  const i = Ch(e), c = kn(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, _ = `${d} — ${o === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...Lh(s, u), "data-validation": i, style: Sh(e, i), onClick: h, onKeyDown: (E) => Th(E, h) }, label: _, name: d, holder: c, validation: i, note: xh(i, t, u), step: e.step };
}
const qh = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${R.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${R.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Ah, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${R.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Rh, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Ih(e) {
  return qh[e.presentation](Eh(e));
}
function Mh(e) {
  for (const a of e)
    if (!a.reserved && !ze(a.step)) throw new Error("colour ladder renders token steps only");
}
function Bh() {
  return /* @__PURE__ */ l("div", { className: `${R.cell} ward-ladder-cell ${R.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Ph(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Dh = { list: R.ladder, swatches: R.swatches, tiles: R.tilesFrame };
function Hh() {
  return /* @__PURE__ */ l("div", { className: `${R.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Oh = { list: Bh, swatches: () => null, tiles: Hh };
function $n(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  Mh(e.steps);
  const r = Ph(e), o = Oh[r], i = /* @__PURE__ */ l(L, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(Ih, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${Dh[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: R.tiles, children: i }) : i });
}
const Fh = "_rail_1el2t_2", jh = "_section_1el2t_12", Wh = "_sectionFlush_1el2t_22", zh = "_head_1el2t_26", Gh = "_headLabel_1el2t_34", Kh = "_sample_1el2t_42", Uh = "_sampleLabel_1el2t_47", Vh = "_sampleTitle_1el2t_54", Yh = "_sampleMeta_1el2t_59", Jh = "_trace_1el2t_65", Xh = "_traceHead_1el2t_70", Qh = "_steps_1el2t_78", Zh = "_step_1el2t_78", em = "_stepTitle_1el2t_97", am = "_hollow_1el2t_107", nm = "_stepBody_1el2t_115", tm = "_stepDetail_1el2t_127", rm = "_publish_1el2t_132", lm = "_reason_1el2t_138", om = "_note_1el2t_143", im = "_reveal_1el2t_148", p = {
  rail: Fh,
  section: jh,
  sectionFlush: Wh,
  head: zh,
  headLabel: Gh,
  sample: Kh,
  sampleLabel: Uh,
  sampleTitle: Vh,
  sampleMeta: Yh,
  trace: Jh,
  traceHead: Xh,
  steps: Qh,
  step: Zh,
  stepTitle: em,
  hollow: am,
  stepBody: nm,
  stepDetail: tm,
  publish: rm,
  reason: lm,
  note: om,
  reveal: im
}, an = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, cm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, sm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, dm = { notSimulated: "not simulated", running: "running" };
function um(e) {
  return e.presentation === "foundry";
}
function hm(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function mm(e, a) {
  var r;
  const t = cm[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function wm(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function _m(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function vm(e) {
  if (wm(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function fm(e) {
  const [a, t] = g(!1);
  A(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function bm(e) {
  const a = dm[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ae, { size: 6, kind: sm[e.kind], label: e.kind });
}
function pm(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function gm(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Nm(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(fm, { kind: a.kind, children: [
    /* @__PURE__ */ n(bm, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(pm, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(gm, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function ym(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ne(a)), t.join(" · ");
}
function Cn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: ym(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Nm, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function km(e) {
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
function $m(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + te(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Cm(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : J(e.run.cost), label: "Cost" }, { value: e.run.turns ? sn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ma, { divided: !0, cells: a }) });
}
function Sm(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: J(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: sn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Rm(e) {
  const a = Sm(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ma, { divided: !0, cells: a }) });
}
function Sn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Tm(e) {
  return /* @__PURE__ */ l("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(Sn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function Lm(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(Sn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Rn(e) {
  return /* @__PURE__ */ l("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: an[e.run.status].role, label: an[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function xm(e, a) {
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
function Am(e) {
  var t;
  _m(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Rn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(km, { sample: e.run.sample }),
    /* @__PURE__ */ n(Cn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Cm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(va, { items: e.checklist }) }),
    /* @__PURE__ */ n(Tm, { reason: hm(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Em(e) {
  var r;
  const a = xm(e.run, e.feed);
  vm(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Rn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n($m, { sample: e.run.sample }),
    /* @__PURE__ */ n(Cn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Rm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(va, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Lm, { reason: mm(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Bk(e) {
  return um(e) ? /* @__PURE__ */ n(Em, { ...e }) : /* @__PURE__ */ n(Am, { ...e });
}
const qm = "_list_142ip_3", Im = "_row_142ip_9", Mm = "_condition_142ip_18", Bm = "_action_142ip_24", aa = {
  list: qm,
  row: Im,
  condition: Mm,
  action: Bm
}, Tn = We(!1);
function Pk({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Tn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: aa.list, "aria-label": a, children: e }) });
}
function Dk({ rule: e }) {
  if (!je(Tn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: aa.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: aa.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: aa.action, children: e.then })
  ] });
}
function Ra(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [o] = r.splice(a, 1);
  return r.splice(t, 0, o), r;
}
function Ln(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function xn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function nn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Pm(e) {
  return e === "up" ? "down" : "up";
}
function Dm(e, a) {
  const t = nn(e, a.id, a.direction) ?? nn(e, a.id, Pm(a.direction));
  t == null || t.focus();
}
function An() {
  const e = N(null), [a, t] = g(null), [r, o] = g("");
  return A(() => {
    e.current !== null && a !== null && Dm(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), o(s);
  } };
}
function En({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ca({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Hm = "_body_1h15q_2", Om = "_title_1h15q_8", Fm = "_section_1h15q_13", jm = "_legend_1h15q_18", Wm = "_stages_1h15q_26", zm = "_stage_1h15q_26", Gm = "_stageIndex_1h15q_44", Km = "_stageName_1h15q_50", Um = "_footer_1h15q_59", Vm = "_note_1h15q_66", Ym = "_reason_1h15q_71", Jm = "_actions_1h15q_76", Xm = "_webHead_1h15q_83", Qm = "_kicker_1h15q_92", Zm = "_webTitle_1h15q_99", ew = "_webBody_1h15q_105", aw = "_webSection_1h15q_109", nw = "_sectionHead_1h15q_121", tw = "_sectionNote_1h15q_129", rw = "_formLabel_1h15q_134", lw = "_identityRow_1h15q_139", ow = "_nameCell_1h15q_145", iw = "_keyCell_1h15q_150", cw = "_colourCell_1h15q_154", sw = "_colourStatus_1h15q_161", dw = "_webStages_1h15q_166", uw = "_webStageList_1h15q_172", hw = "_webStage_1h15q_166", mw = "_webIndex_1h15q_191", ww = "_webStageName_1h15q_196", _w = "_webMoves_1h15q_201", vw = "_addStage_1h15q_215", fw = "_addStageButton_1h15q_223", bw = "_addStageNote_1h15q_231", pw = "_webFooter_1h15q_236", gw = "_webFooterNotes_1h15q_244", Nw = "_webNote_1h15q_251", w = {
  body: Hm,
  title: Om,
  section: Fm,
  legend: jm,
  stages: Wm,
  stage: zm,
  stageIndex: Gm,
  stageName: Km,
  footer: Um,
  note: Vm,
  reason: Ym,
  actions: Jm,
  webHead: Xm,
  kicker: Qm,
  webTitle: Zm,
  webBody: ew,
  webSection: aw,
  sectionHead: nw,
  sectionNote: tw,
  formLabel: rw,
  identityRow: lw,
  nameCell: ow,
  keyCell: iw,
  colourCell: cw,
  colourStatus: sw,
  webStages: dw,
  webStageList: uw,
  webStage: hw,
  webIndex: mw,
  webStageName: ww,
  webMoves: _w,
  addStage: vw,
  addStageButton: fw,
  addStageNote: bw,
  webFooter: pw,
  webFooterNotes: gw,
  webNote: Nw
}, yw = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], qn = "not in catalogue";
function kw(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} — ${qn}` }, ...t];
}
function $w({ stage: e, index: a, catalogue: t, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(x, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${qn}`;
  return /* @__PURE__ */ n(x, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: kw(t, e.name), invalid: i, onChange: r });
}
function In(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Cw(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Sw({ id: e, stage: a, index: t, total: r, catalogue: o, onReplace: i, onMove: c }) {
  const s = In(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n($w, { stage: a, index: t, catalogue: o, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(x, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: yw, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ca, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ca, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function Rw({ stages: e, onChange: a, catalogue: t }) {
  const r = Cw(e.length), o = An(), i = (s, u) => {
    const d = Ln(s, u);
    r.current = Ra(r.current, s, d), o.moved({ id: r.current[d], direction: u }, xn(In(e[s], s), d, e.length)), a(Ra(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(Sw, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(En, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Tw = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Lw = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], xw = "A new stream starts as a draft. Nothing runs on it until you publish it.", Aw = "Create is disabled: name the stream and give it a key first.", Ew = "reorder with the ↑ ↓ buttons · min 2";
function Pa(e, a) {
  return !e.reserved && Ea(e.step) && a[e.step] === void 0;
}
function qw(e, a) {
  const t = e.find((r) => Pa(r, a));
  return t ? t.step : 1;
}
function Iw({ stages: e, onMove: a }) {
  const t = An(), r = (o, i) => {
    const c = Ln(o, i);
    t.moved({ id: e[o].id, direction: i }, xn(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: w.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ca, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ca, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(En, { text: t.announcement })
  ] });
}
function Mw({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: xw }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Bw(e, a) {
  return e !== "" && a !== "" ? null : Aw;
}
function Pw(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = Lw, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = $(), [h, _] = g(""), [b, E] = g(""), [Z, ee] = g(a[0].value), [re, Ee] = g(() => qw(t, r)), [le, qe] = g(e.stages ?? Tw), [Ie, k] = g(o[0].value), j = { name: h, key: b, streamStep: re, owner: Z, stages: le, policy: Ie }, he = Bw(h, b);
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
      /* @__PURE__ */ n($n, { label: "Stream colour", steps: t, value: re, onChange: Ee, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(Iw, { stages: le, onMove: ($e, Qn) => qe(Ra(le, $e, Qn)) })
    ] }),
    /* @__PURE__ */ n(vn, { legend: "Loop policy", options: o, value: Ie, onChange: k }),
    /* @__PURE__ */ n(Mw, { reason: he, onCreate: () => i(j), onDraft: () => c(j) })
  ] }) });
}
const Mn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Dw = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function Hw(e, a, t, r, o, i) {
  var s;
  const c = ((s = Mn.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function Ow(e, a) {
  return Fw(e) && jw(e, a) && Ww(e);
}
function Fw(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function jw(e, a) {
  return e.colourStep !== null && Pa({ step: e.colourStep }, a);
}
function Ww(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function zw(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${$h}.` : Pa({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Gw({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Kw({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Gw, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: Dw })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Uw({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function Vw({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
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
function Yw(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [o, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, E] = g("relay"), [Z, ee] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), re = Hw(o, c, u, h, b, Z), Ee = Ow(re, r), le = Z.find((k) => k.kind === "agent" && k.name.trim() !== ""), qe = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n($n, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), Ie = /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: zw(h, r) }),
    /* @__PURE__ */ n(x, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map((k) => ({ value: k, label: k })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Je, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Uw, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(Vw, { name: o, setName: i, streamKey: c, setKey: s, colour: qe, owner: Ie }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: Ew })
        ] }),
        /* @__PURE__ */ n(Rw, { stages: Z, onChange: ee })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(vn, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: Mn, onChange: E }) }),
      /* @__PURE__ */ n(Kw, { ready: Ee, draft: re, agentStage: le, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function Hk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Yw, { ...e }) : /* @__PURE__ */ n(Pw, { ...e });
}
const Jw = "_row_bs8hc_2", Xw = "_cell_bs8hc_6", Qw = "_condition_bs8hc_11", Zw = "_action_bs8hc_18", e_ = "_contract_bs8hc_24", a_ = "_contractCondition_bs8hc_33", n_ = "_contractAction_bs8hc_39", U = {
  row: Jw,
  cell: Xw,
  condition: Qw,
  action: Zw,
  contract: e_,
  contractCondition: a_,
  contractAction: n_
}, Bn = ["advance", "block", "escalate", "requestReview"], tn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function sa(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Da(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: U.action, children: tn[e.then] }) : /* @__PURE__ */ n(
    x,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => a({ ...e, then: o }),
      options: Bn.map((o) => ({ value: o, label: tn[o] }))
    }
  );
}
function t_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: U.row, children: [
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: U.condition, title: sa(e, r), children: sa(e, r) }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: Da(e, a, t) })
  ] });
}
function r_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: U.row, children: [
    /* @__PURE__ */ l("td", { className: U.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: U.condition, children: sa(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: U.cell, children: Da(e, a, t) })
  ] });
}
function l_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: U.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: U.contractCondition, children: sa(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: U.contractAction, children: Da(e, a, t, !0) })
  ] });
}
const o_ = { two: r_, four: t_, contract: l_ };
function Ok(e) {
  var t;
  if (!Bn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = o_[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const i_ = "_column_lurgk_2", c_ = "_head_lurgk_17", s_ = "_index_lurgk_23", d_ = "_name_lurgk_29", u_ = "_meta_lurgk_38", h_ = "_mono_lurgk_43", m_ = "_gate_lurgk_50", w_ = "_reviewersLabel_lurgk_57", __ = "_reviewers_lurgk_57", v_ = "_reviewer_lurgk_57", f_ = "_agents_lurgk_74", b_ = "_workflowColumn_lurgk_79", p_ = "_workflowHead_lurgk_96", g_ = "_stageRow_lurgk_102", N_ = "_stageLabel_lurgk_109", y_ = "_workflowTitle_lurgk_116", k_ = "_workflowMeta_lurgk_122", $_ = "_workflowGate_lurgk_127", C_ = "_gateNote_lurgk_135", S_ = "_cardNote_lurgk_140", R_ = "_reviewerList_lurgk_149", T_ = "_reviewerRow_lurgk_155", L_ = "_reviewerMark_lurgk_161", x_ = "_reviewerName_lurgk_171", A_ = "_terminalCard_lurgk_177", E_ = "_terminalCount_lurgk_186", q_ = "_workflowAgents_lurgk_192", I_ = "_mount_lurgk_198", y = {
  column: i_,
  head: c_,
  index: s_,
  name: d_,
  meta: u_,
  mono: h_,
  gate: m_,
  reviewersLabel: w_,
  reviewers: __,
  reviewer: v_,
  agents: f_,
  workflowColumn: b_,
  workflowHead: p_,
  stageRow: g_,
  stageLabel: N_,
  workflowTitle: y_,
  workflowMeta: k_,
  workflowGate: $_,
  gateNote: C_,
  cardNote: S_,
  reviewerList: R_,
  reviewerRow: T_,
  reviewerMark: L_,
  reviewerName: x_,
  terminalCard: A_,
  terminalCount: E_,
  workflowAgents: q_,
  mount: I_
}, M_ = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Pn(e) {
  return `${Math.round(e * 100)}%`;
}
function B_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ma, { cells: [
      { value: Pn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: Q(e.count), label: "In stage" }
    ] })
  ] });
}
function P_({ stage: e }) {
  return /* @__PURE__ */ n(ma, { cells: [
    { value: Q(e.count), label: "In stage" },
    { value: Q(e.closedThisWeek ?? 0), label: "Closed this week" }
  ] });
}
function D_({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: M_[e.kind] })
  ] });
}
function H_({ stage: e }) {
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
function O_({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(B_, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(P_, { stage: e }) : null;
}
function F_({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function j_({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(D_, { stage: e, titleId: o }),
    /* @__PURE__ */ n(H_, { stage: e }),
    /* @__PURE__ */ n(O_, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(Vu, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(F_, { onMount: t })
  ] });
}
const W_ = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function z_({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, a.initials)) });
}
function G_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(z_, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Pn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function K_({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: e.closedThisWeek ?? 0 }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: "items closed this week" })
  ] });
}
function U_(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function V_(e) {
  if (e.kind === "terminal") return `${e.closedThisWeek ?? 0} this week`;
  const a = U_(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Y_({ stage: e, titleId: a }) {
  const t = W_[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: V_(e) })
  ] });
}
function J_(e) {
  return e === "entry" || e === "agent";
}
function X_({ stage: e, onMount: a }) {
  return a === void 0 || !J_(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Q_({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Y_, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(G_, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(K_, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(X_, { stage: e, onMount: t })
  ] });
}
function Z_(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function Fk(e) {
  return Z_(e) ? /* @__PURE__ */ n(Q_, { ...e }) : /* @__PURE__ */ n(j_, { ...e });
}
const ev = "_row_ve78g_6", av = "_cell_ve78g_10", nv = "_name_ve78g_19", tv = "_chain_ve78g_26", rv = "_owner_ve78g_32", lv = "_mono_ve78g_38", ov = "_compactRow_ve78g_45", iv = "_compactCell_ve78g_54", cv = "_stack_ve78g_71", sv = "_stat_ve78g_78", dv = "_identityLine_ve78g_85", uv = "_identity_ve78g_85", hv = "_compactName_ve78g_103", mv = "_ownerLine_ve78g_117", wv = "_link_ve78g_130", _v = "_emptyChain_ve78g_136", vv = "_arrow_ve78g_142", fv = "_muted_ve78g_143", bv = "_define_ve78g_148", pv = "_statValue_ve78g_155", gv = "_policyId_ve78g_161", Nv = "_sub_ve78g_166", f = {
  row: ev,
  cell: av,
  name: nv,
  chain: tv,
  owner: rv,
  mono: lv,
  compactRow: ov,
  compactCell: iv,
  stack: cv,
  stat: sv,
  identityLine: dv,
  identity: uv,
  compactName: hv,
  ownerLine: mv,
  link: wv,
  emptyChain: _v,
  arrow: vv,
  muted: fv,
  define: bv,
  statValue: pv,
  policyId: gv,
  sub: Nv
};
function yv(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function kv(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function $v(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${e.members} members`;
}
function Cv(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: $v(e) })
  ] }) });
}
function Sv(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function Rv(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : Sv(e) });
}
function rn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function Tv(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function Lv(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function xv({ stream: e, href: a, presentation: t }) {
  const r = kv(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": `var(--ward-stream-${e.streamStep}-chip)` }, children: [
    Cv(e, a),
    Rv(e.stages, a),
    rn(Lv(e.agents), e.agents === void 0 ? void 0 : yv(e.agents), "—"),
    Tv(e.policy),
    rn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function Av(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function jk(e) {
  if (Av(e)) return xv(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ l("tr", { className: f.row, children: [
    /* @__PURE__ */ l("td", { className: f.cell, children: [
      /* @__PURE__ */ n("a", { className: f.name, href: t, children: a.name }),
      /* @__PURE__ */ n(m, { role: "stream", label: a.key, streamStep: a.streamStep }),
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
const Ev = "_row_1nbe9_2", qv = "_name_1nbe9_15", Iv = "_scope_1nbe9_25", da = {
  row: Ev,
  name: qv,
  scope: Iv
};
function Mv(e) {
  return e === void 0 ? `${da.row} ward-toolrow` : `${da.row} ward-toolrow ${e}`;
}
function Bv(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Pv({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
function Dv({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Hv({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${da.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Ov(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Wk({ tool: e, onChange: a, presentation: t }) {
  const r = $(), o = $(), i = Bv(e, t), c = Ov(t);
  return /* @__PURE__ */ l(c, { className: Mv(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Pv, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${da.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Hv, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(Dv, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Fv = "_strip_g84q9_2", jv = "_head_g84q9_10", Wv = "_name_g84q9_16", zv = "_chart_g84q9_24", Gv = "_segment_g84q9_30", Kv = "_detailedChart_g84q9_36", pe = {
  strip: Fv,
  head: jv,
  name: Wv,
  chart: zv,
  segment: Gv,
  detailedChart: Kv
}, Ta = [1, 2, 3, 4, 5, 6], ua = 100;
function Uv(e, a) {
  return a.has(e) ? `var(--ward-stream-${e}-id, var(--ward-color-line2))` : "var(--ward-color-line)";
}
function Vv({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: pe.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ta.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: pe.segment,
      x: o * ua,
      y: "0",
      width: ua,
      height: "8",
      fill: Uv(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Yv(e) {
  return e !== null && ze(e) ? vt(e) : F.color.line2;
}
function Jv(e) {
  const a = e.slice(0, Ta.length);
  for (; a.length < Ta.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Xv({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${pe.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ua),
        y: "0",
        width: String(ua),
        height: "40",
        style: { fill: Yv(a.streamStep) }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function Dn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Qv(e) {
  const a = Jv(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("section", { className: `${pe.strip} ward-appearance`, "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(_a, { item: e.sample, onOpen: Dn(e.onOpen), feed: null }),
    /* @__PURE__ */ l("p", { className: `${pe.head} ward-envrow ward-appearance-head`, children: [
      /* @__PURE__ */ n("span", { className: "ward-identity", "aria-hidden": "true" }),
      t.streamStep !== null && ze(t.streamStep) ? /* @__PURE__ */ n(m, { role: "stream", label: t.key, streamStep: t.streamStep }) : /* @__PURE__ */ n(m, { role: "meta", label: t.key }),
      /* @__PURE__ */ n("span", { className: `${pe.name} ward-rowlink`, children: t.name })
    ] }),
    /* @__PURE__ */ n("p", { className: "ward-checklist-note", children: "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on." }),
    /* @__PURE__ */ n(Xv, { identities: a })
  ] });
}
function Zv({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": `var(--ward-stream-${e.streamStep}-id)` };
  return /* @__PURE__ */ l("section", { className: pe.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: pe.head, children: [
      /* @__PURE__ */ n(Ae, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: pe.name, children: e.name }),
      /* @__PURE__ */ n(m, { role: "stream", label: e.key, streamStep: e.streamStep })
    ] }),
    /* @__PURE__ */ n(_a, { item: { ...a, streamStep: e.streamStep }, onOpen: Dn(r) }),
    /* @__PURE__ */ n(Vv, { draft: e, streams: t })
  ] });
}
function zk(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Qv, { ...e }) : /* @__PURE__ */ n(Zv, { ...e });
}
const ef = "_row_ixlg5_6", af = "_headCell_ixlg5_10", nf = "_cell_ixlg5_11", tf = "_name_ixlg5_23", rf = "_consequence_ixlg5_29", lf = "_governed_ixlg5_36", of = "_control_ixlg5_42", cf = "_byRole_ixlg5_48", sf = "_webControl_ixlg5_59", df = "_webConsequence_ixlg5_65", uf = "_webGoverned_ixlg5_71", P = {
  row: ef,
  headCell: af,
  cell: nf,
  name: tf,
  consequence: rf,
  governed: lf,
  control: of,
  byRole: cf,
  webControl: sf,
  webConsequence: df,
  webGoverned: uf
};
function hf({
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
function mf({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(hf, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function wf(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function _f({ name: e, cell: a, onChange: t }) {
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
function vf({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(_f, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: wf(e) }) })
  ] });
}
function Gk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(vf, { ...e }) : /* @__PURE__ */ n(mf, { ...e });
}
const ff = "_row_vv64h_2", bf = "_cell_vv64h_6", pf = "_name_vv64h_25", gf = "_note_vv64h_30", Nf = "_webName_vv64h_41", yf = "_webMeta_vv64h_47", z = {
  row: ff,
  cell: bf,
  name: pf,
  note: gf,
  webName: Nf,
  webMeta: yf
}, Hn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function kf(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function $f({ component: e, onRestart: a }) {
  const t = $(), r = Hn[e.state], o = e.state === "drainFirst";
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
function Cf({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: kf(e.state) });
}
function Sf({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { ...Hn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(Cf, { component: e, onRestart: a }) })
  ] });
}
function Kk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Sf, { ...e }) : /* @__PURE__ */ n($f, { ...e });
}
const Rf = "_row_1f1gp_7", Tf = "_cell_1f1gp_11", Lf = "_next_1f1gp_28", xf = "_headCell_1f1gp_38", Af = "_webId_1f1gp_77", Ef = "_webPurpose_1f1gp_83", qf = "_webMeta_1f1gp_91", If = "_webUrgent_1f1gp_97", H = {
  row: Rf,
  cell: Tf,
  next: Lf,
  headCell: xf,
  webId: Af,
  webPurpose: Ef,
  webMeta: qf,
  webUrgent: If
}, Mf = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Bf = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, On = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Pf = Object.fromEntries(On.map((e) => [e.key, e]));
function Pe({ column: e, children: a }) {
  const t = Pf[e];
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
function Uk() {
  return /* @__PURE__ */ n("tr", { children: On.map((e) => /* @__PURE__ */ n(
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
function Df({ cred: e }) {
  const a = Mf[e.state];
  return /* @__PURE__ */ l("tr", { className: H.row, children: [
    /* @__PURE__ */ n(Pe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Pe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Pe, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Pe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Pe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Pe, { column: "next", children: /* @__PURE__ */ n("span", { className: H.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Hf({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${H.webMeta} ${H.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function Of({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: H.row, children: [
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(Hf, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { ...Bf[e.state] }) })
  ] });
}
function Vk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Of, { ...e }) : /* @__PURE__ */ n(Df, { ...e });
}
const Ff = "_card_17zba_2", jf = "_head_17zba_11", Wf = "_env_17zba_18", zf = "_version_17zba_25", Gf = "_meta_17zba_32", Kf = "_webCard_17zba_37", Uf = "_webRow_17zba_47", Vf = "_webTitle_17zba_55", Yf = "_webLine_17zba_65", Jf = "_webVersion_17zba_72", Xf = "_webMeta_17zba_77", W = {
  card: Ff,
  head: jf,
  env: Wf,
  version: zf,
  meta: Gf,
  webCard: Kf,
  webRow: Uf,
  webTitle: Vf,
  webLine: Yf,
  webVersion: Jf,
  webMeta: Xf
}, Fn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Qf({ env: e }) {
  const a = Fn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function Zf(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [te(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function eb(e) {
  return /* @__PURE__ */ l("article", { className: `${W.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${W.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${W.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Fn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${W.version} ${W.webVersion} ${W.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${W.meta} ${W.webMeta} ${W.webLine} ward-cellmeta`, children: Zf(e) })
  ] });
}
function Yk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(eb, { ...e }) : /* @__PURE__ */ n(Qf, { ...e });
}
const ab = "_upload_erepj_2", nb = "_preview_erepj_7", tb = "_mark_erepj_17", rb = "_empty_erepj_22", lb = "_actions_erepj_28", ob = "_input_erepj_33", ib = "_reasons_erepj_41", cb = "_reason_erepj_41", sb = "_accepted_erepj_57", Y = {
  upload: ab,
  preview: nb,
  mark: tb,
  empty: rb,
  actions: lb,
  input: ob,
  reasons: ib,
  reason: cb,
  accepted: sb
}, jn = 1.5, Wn = 22, Ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${jn}px at ${Wn}px`];
function db() {
  return { ok: !1, reasons: [Ye[1]] };
}
function ub(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function hb(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ye[0]] : [];
}
function mb(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ye[1]), e.querySelector("text") !== null && t.push(Ye[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function wb(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? Wn / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < jn;
  }) ? [Ye[3]] : [];
}
function Jk(e) {
  const a = ub(e);
  if (a === null) return db();
  const t = [...hb(a), ...mb(a, e), ...wb(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const _b = "Mark accepted.";
function vb({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: Y.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: Y.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: Y.empty }) });
}
function fb(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function bb(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function pb({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: Y.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: Y.result, role: "status", children: /* @__PURE__ */ n("p", { className: Y.accepted, children: _b }) }) : /* @__PURE__ */ n("div", { className: Y.result, role: "status", children: /* @__PURE__ */ n("ul", { className: Y.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: Y.reason, children: a }, a)) }) });
}
function gb({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(pb, { result: e }) : /* @__PURE__ */ n("p", { className: `${Y.result} ${fb(e, t)}`, role: "status", children: bb(e, t) });
}
function Xk({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: Y.upload, children: [
    /* @__PURE__ */ n(vb, { current: e }),
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
    /* @__PURE__ */ n(gb, { result: i, presentation: r })
  ] });
}
const Nb = "_row_1wp9s_7", yb = "_cell_1wp9s_11", kb = "_head_1wp9s_28", $b = "_name_1wp9s_34", Cb = "_pinned_1wp9s_42", Sb = "_headCell_1wp9s_49", Rb = "_webName_1wp9s_88", Tb = "_webMeta_1wp9s_95", Lb = "_webWarn_1wp9s_103", q = {
  row: Nb,
  cell: yb,
  head: kb,
  name: $b,
  pinned: Cb,
  headCell: Sb,
  webName: Rb,
  webMeta: Tb,
  webWarn: Lb
}, Ha = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, zn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], xb = Object.fromEntries(zn.map((e) => [e.key, e]));
function Ab(e, a) {
  return `mcp.${e}.${a}`;
}
function Eb(e) {
  return Object.keys(Ha).includes(e);
}
function qb(e) {
  return Ha[e !== void 0 && Eb(e) ? e : "unknown"];
}
function Ge({ column: e, children: a }) {
  const t = xb[e];
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
function Qk() {
  return /* @__PURE__ */ n("tr", { children: zn.map((e) => /* @__PURE__ */ n(
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
function Ib({ server: e }) {
  const a = Ha[e.connection];
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
    /* @__PURE__ */ n(Ge, { column: "tools", children: e.tools.map((t) => Ab(e.name, t)).join(" · ") })
  ] });
}
function Mb(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Bb(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Pb({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Db({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Hb({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Ob({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Mb(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Bb(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Pb, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...qb(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n(Db, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Hb, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function Zk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ob, { ...e }) : /* @__PURE__ */ n(Ib, { ...e });
}
const Fb = "_row_1h9nq_2", jb = "_headCell_1h9nq_14", Wb = "_cell_1h9nq_15", zb = "_name_1h9nq_26", Gb = "_consequence_1h9nq_32", Kb = "_reason_1h9nq_38", Ub = "_value_1h9nq_44", Vb = "_webRow_1h9nq_60", Yb = "_webSetting_1h9nq_71", Jb = "_webName_1h9nq_79", Xb = "_webConsequence_1h9nq_87", Qb = "_webControl_1h9nq_93", Zb = "_webState_1h9nq_106", ep = "_webChip_1h9nq_111", T = {
  row: Fb,
  headCell: jb,
  cell: Wb,
  name: zb,
  consequence: Gb,
  reason: Kb,
  value: Ub,
  webRow: Vb,
  webSetting: Yb,
  webName: Jb,
  webConsequence: Xb,
  webControl: Qb,
  webState: Zb,
  webChip: ep
}, Gn = 104, Kn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function ap({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(xe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(mn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: T.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function np({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = $(), i = Kn[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: T.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: T.headCell, children: [
      /* @__PURE__ */ n("span", { className: T.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: T.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: T.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: T.cell, children: /* @__PURE__ */ n(ap, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: T.cell, style: { width: Gn }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Un(e, a) {
  return String(e ?? a);
}
function tp(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function rp(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Un(e.value, "—");
}
function lp({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: T.webControl, children: [
    /* @__PURE__ */ n(xe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: T.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function op(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(lp, { ...e });
  const o = tp(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: T.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(mn, { options: o, value: Un(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${T.webControl} ${T.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: rp(a) });
}
function ip({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = $(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${T.row} ${T.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: T.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${T.name} ${T.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${T.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: T.webControl, children: i(c) }) : /* @__PURE__ */ n(op, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${T.webChip} ward-policy-chip`, style: { width: Gn }, children: /* @__PURE__ */ n(m, { ...Kn[t], size: "tag" }) })
  ] });
}
function e1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ip, { ...e }) : /* @__PURE__ */ n(np, { ...e });
}
const cp = "_label_1o9za_7", sp = "_name_1o9za_15", dp = "_column_1o9za_24", up = "_webFrame_1o9za_57", hp = "_webHead_1o9za_62", mp = "_webHeadLabel_1o9za_74", wp = "_webLabel_1o9za_112", _p = "_webColumns_1o9za_119", vp = "_webGroup_1o9za_125", fp = "_webPeople_1o9za_126", bp = "_webVia_1o9za_127", pp = "_webMeta_1o9za_156", O = {
  label: cp,
  name: sp,
  column: dp,
  webFrame: up,
  webHead: hp,
  webHeadLabel: mp,
  webLabel: wp,
  webColumns: _p,
  webGroup: vp,
  webPeople: fp,
  webVia: bp,
  webMeta: pp
}, gp = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, Na = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function ya({ column: e, children: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: O.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function Np(e) {
  if (!e.matrixRole) return;
  const a = gp[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function yp({ node: e }) {
  const a = Np(e);
  return /* @__PURE__ */ l("span", { className: O.label, children: [
    /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
    /* @__PURE__ */ n(kp, { role: a, node: e }),
    /* @__PURE__ */ n(ya, { column: Na[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(ya, { column: Na[1], children: e.people === void 0 ? "" : Q(e.people) }),
    /* @__PURE__ */ n(ya, { column: Na[2], children: e.requestedVia ?? "" })
  ] });
}
function kp({ role: e, node: a }) {
  return /* @__PURE__ */ l(L, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function $p({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    bn,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(yp, { node: t }),
      children: c
    }
  );
}
function ka({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Cp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${O.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(ka, { className: `${O.webMeta} ${O.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(ka, { className: `${O.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(ka, { className: `${O.webMeta} ${O.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Sp() {
  return /* @__PURE__ */ l("div", { className: O.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: O.webColumns, children: [
      /* @__PURE__ */ n("span", { className: O.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: O.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: O.webVia, children: "Requested via" })
    ] })
  ] });
}
function Rp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${O.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Tp(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Lp({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: O.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Sp, {}),
    /* @__PURE__ */ n(ac, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      bn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Rp, { row: t }),
        detail: /* @__PURE__ */ n(Cp, { row: t }),
        expanded: Tp(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function a1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Lp, { ...e }) : /* @__PURE__ */ n($p, { ...e });
}
const xp = "_runbook_b9agc_2", Ap = "_list_b9agc_7", Ep = "_step_b9agc_15", qp = "_numeral_b9agc_21", Ip = "_body_b9agc_28", Mp = "_head_b9agc_34", Bp = "_title_b9agc_40", Pp = "_detail_b9agc_45", Dp = "_actions_b9agc_50", Hp = "_webList_b9agc_56", Op = "_webStep_b9agc_60", Fp = "_webBody_b9agc_66", jp = "_webTitle_b9agc_74", Wp = "_webDetail_b9agc_78", S = {
  runbook: xp,
  list: Ap,
  step: Ep,
  numeral: qp,
  body: Ip,
  head: Mp,
  title: Bp,
  detail: Pp,
  actions: Dp,
  webList: Hp,
  webStep: Op,
  webBody: Fp,
  webTitle: jp,
  webDetail: Wp
}, Vn = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function Yn(e) {
  return String(e + 1).padStart(2, "0");
}
function zp({ step: e, index: a, connection: t }) {
  const r = Vn[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: Yn(a) }),
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
function Gp({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(zp, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function Kp({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Yn(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Vn[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function Up({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(Kp, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function n1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Up, { ...e }) : /* @__PURE__ */ n(Gp, { ...e });
}
const Vp = "_list_1gu6a_2", Yp = "_check_1gu6a_10", Jp = "_body_1gu6a_16", Xp = "_text_1gu6a_23", Qp = "_pending_1gu6a_32", Zp = "_measured_1gu6a_37", He = {
  list: Vp,
  check: Yp,
  body: Jp,
  text: Xp,
  pending: Qp,
  measured: Zp
};
function eg(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function ag({ check: e }) {
  const a = eg(e.passed);
  return /* @__PURE__ */ l("li", { className: `${He.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Ma, { state: a.state, label: a.label }),
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
function t1({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${He.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(ag, { check: a }, a.text)) });
}
const ng = "_root_16pdz_2", tg = "_list_16pdz_9", rg = "_line_16pdz_16", lg = "_at_16pdz_43", og = "_text_16pdz_47", ig = "_foot_16pdz_51", cg = "_idle_16pdz_62", sg = "_caret_16pdz_69", dg = "_jump_16pdz_76", ve = {
  root: ng,
  list: tg,
  line: rg,
  at: lg,
  text: og,
  foot: ig,
  idle: cg,
  caret: sg,
  jump: dg
}, ug = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Oa(e) {
  return Number.isNaN(Date.parse(e)) ? "" : ug.format(new Date(e));
}
const hg = { warn: "warning", ok: "ok" };
function mg({ kind: e }) {
  const a = hg[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function wg({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Oa(e)}` });
}
function _g({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events — as of ${Oa(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(wg, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function r1({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
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
      /* @__PURE__ */ n("span", { className: ve.at, children: Oa(d.at) }),
      /* @__PURE__ */ n(mg, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(_g, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const vg = "_row_11jhe_2", fg = "_head_11jhe_14", bg = "_author_11jhe_20", pg = "_eta_11jhe_25", gg = "_edited_11jhe_26", Ng = "_body_11jhe_32", yg = "_reason_11jhe_37", kg = "_actions_11jhe_42", we = {
  row: vg,
  head: fg,
  author: bg,
  eta: pg,
  edited: gg,
  body: Ng,
  reason: yg,
  actions: kg
}, $g = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function Cg(e) {
  return {
    queued: `Still in the outbox — editing replaces the queued row and recomputes req_hash, so ${e} receives one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed — edit and resend, or cancel the delivery."
  };
}
function Sg({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
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
function Rg({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: we.reason, id: a, children: e })
  ] });
}
function Tg(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Lg(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Sg, { ...e }) : /* @__PURE__ */ n(Rg, { reason: e.unavailable, reasonId: e.unavailableId });
}
function l1(e) {
  const { comment: a } = e;
  Tg(e);
  const t = $(), r = `${t}-unavailable`, o = $g[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${we.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: we.head, children: [
      /* @__PURE__ */ n("span", { className: we.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: we.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: we.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: we.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: we.reason, id: t, children: Cg(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: we.actions, children: /* @__PURE__ */ n(Lg, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const xg = "_root_c46wj_2", Ag = "_attach_c46wj_11", Eg = "_actions_c46wj_17", qg = "_reply_c46wj_23", Ig = "_replyRow_c46wj_28", Mg = "_sendsAs_c46wj_42", Fe = {
  root: xg,
  attach: Ag,
  actions: Eg,
  reply: qg,
  replyRow: Ig,
  sendsAs: Mg
};
function Bg({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = g(""), i = $();
  return /* @__PURE__ */ l("div", { className: Fe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: Fe.replyRow, children: [
      /* @__PURE__ */ n(x, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Fe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function o1(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Bg, { ...e }) : /* @__PURE__ */ n(Pg, { ...e });
}
function Pg({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ l("div", { className: Fe.root, children: [
    /* @__PURE__ */ n(x, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ l("div", { className: Fe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      hn,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ l("div", { className: Fe.actions, children: [
      /* @__PURE__ */ n(v, { variant: "primary", onClick: () => o(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(v, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const Dg = "_list_1ih9e_2", Hg = "_item_1ih9e_6", Og = "_body_1ih9e_22", Fg = "_text_1ih9e_28", jg = "_evidence_1ih9e_37", Wg = "_consequence_1ih9e_49", zg = "_note_1ih9e_54", Le = {
  list: Dg,
  item: Hg,
  body: Og,
  text: Fg,
  evidence: jg,
  consequence: Wg,
  note: zg
};
function Gg({ criterion: e }) {
  return /* @__PURE__ */ n(Ae, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function ln({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Kg(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function Ug({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Le.body, children: [
    /* @__PURE__ */ n("span", { className: Le.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(L, { children: [
      /* @__PURE__ */ n(ln, { text: " — " }),
      /* @__PURE__ */ n("code", { className: Le.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(L, { children: [
      /* @__PURE__ */ n(ln, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Le.consequence, children: Kg(e.why) })
    ] })
  ] });
}
function Vg({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Le.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Gg, { criterion: e }),
    /* @__PURE__ */ n(Ug, { criterion: e })
  ] });
}
function i1({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Le.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Vg, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Le.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Yg = "_list_dwhoz_2", Jg = "_rung_dwhoz_6", Xg = "_name_dwhoz_18", Qg = "_actor_dwhoz_32", na = {
  list: Yg,
  rung: Jg,
  name: Xg,
  actor: Qg
}, Zg = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function eN({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = Zg[e.state];
  return /* @__PURE__ */ l("li", { className: na.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: na.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${na.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function c1({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${na.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(eN, { rung: a }, a.name)) });
}
const aN = "_sheet_1fqco_2", nN = "_title_1fqco_9", tN = "_stage_1fqco_15", rN = "_effects_1fqco_20", lN = "_effect_1fqco_20", oN = "_numeral_1fqco_31", iN = "_effectText_1fqco_38", cN = "_refusals_1fqco_43", sN = "_reasons_1fqco_52", dN = "_reason_1fqco_52", uN = "_actions_1fqco_62", ie = {
  sheet: aN,
  title: nN,
  stage: tN,
  effects: rN,
  effect: lN,
  numeral: oN,
  effectText: iN,
  refusals: cN,
  reasons: sN,
  reason: dN,
  actions: uN
};
function hN({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function s1({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
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
      Vo,
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
      /* @__PURE__ */ n(hN, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const mN = "_list_1hvqu_2", wN = "_path_1hvqu_7", _N = "_head_1hvqu_21", vN = "_label_1hvqu_28", fN = "_consequence_1hvqu_35", bN = "_ask_1hvqu_36", Oe = {
  list: mN,
  path: wN,
  head: _N,
  label: vN,
  consequence: fN,
  ask: bN
}, La = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function on(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function pN({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: La[e.kind] }) : /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: La[e.kind] }),
    /* @__PURE__ */ n("span", { className: Oe.ask, id: r, children: e.askInstead })
  ] });
}
function gN({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: Oe.path, "data-allowed": e.allowed, "data-role": on(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: Oe.head, children: [
      /* @__PURE__ */ n("span", { className: Oe.label, children: e.title ?? La[e.kind] }),
      /* @__PURE__ */ n(m, { role: on(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Oe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(pN, { path: e, primary: a, onChoose: t })
  ] });
}
function d1({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Oe.list, children: e.map((t, r) => /* @__PURE__ */ n(gN, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const NN = "_list_qjv4r_2", yN = "_item_qjv4r_6", kN = "_node_qjv4r_18", $N = "_body_qjv4r_24", CN = "_head_qjv4r_30", SN = "_stage_qjv4r_36", RN = "_version_qjv4r_41", TN = "_sentence_qjv4r_49", LN = "_meta_qjv4r_54", fe = {
  list: NN,
  item: yN,
  node: kN,
  body: $N,
  head: CN,
  stage: SN,
  version: RN,
  sentence: TN,
  meta: LN
}, xN = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function AN({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: fe.head, children: [
    /* @__PURE__ */ n("span", { className: fe.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: fe.version, title: e.version, children: e.version }) : null
  ] });
}
function EN({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${fe.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${fe.node} ward-history-node`, children: /* @__PURE__ */ n(Ae, { size: 9, kind: xN[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${fe.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(AN, { entry: e }),
      /* @__PURE__ */ n("span", { className: fe.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${fe.meta} ward-history-meta`, children: [
        `${te(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${J(e.cost)}`
      ] })
    ] })
  ] });
}
function u1({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${fe.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(EN, { entry: a }, a.stage + String(t))) });
}
const qN = "_thread_1kn6s_3", IN = "_turn_1kn6s_8", MN = "_who_1kn6s_27", BN = "_body_1kn6s_32", ta = {
  thread: qN,
  turn: IN,
  who: MN,
  body: BN
}, Jn = We(!1);
function h1({ children: e, density: a }) {
  return /* @__PURE__ */ n(Jn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ta.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function m1({ turn: e }) {
  if (!je(Jn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${ta.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${ta.who} ward-chat-who`, children: [
      e.author,
      " · ",
      te(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ta.body} ward-chat-body`, children: e.body })
  ] });
}
const PN = "_list_1rt9c_3", DN = "_row_1rt9c_7", HN = "_label_1rt9c_20", ON = "_n_1rt9c_26", FN = "_cause_1rt9c_33", Ue = {
  list: PN,
  row: DN,
  label: HN,
  n: ON,
  cause: FN
};
function jN(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const WN = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function zN({ row: e, formatNumber: a }) {
  return jN(e), /* @__PURE__ */ l("li", { className: `${Ue.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ae, { size: 8, ...WN[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Ue.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Ue.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(GN, { cause: e.cause })
  ] });
}
function GN({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ue.cause} ward-healthrow-cause`, children: e }) : null;
}
function w1({ rows: e, formatNumber: a = Q }) {
  return /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(zN, { row: t, formatNumber: a }, t.label)) });
}
const KN = "_root_1jxwp_2", UN = {
  root: KN
};
function _1({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: UN.root, "data-density": o, children: [
    /* @__PURE__ */ n(va, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const VN = "_row_dhbre_3", YN = "_key_dhbre_13", JN = "_stack_dhbre_24", XN = "_value_dhbre_32", QN = "_evidence_dhbre_39", ZN = "_mark_dhbre_47", De = {
  row: VN,
  key: YN,
  stack: JN,
  value: XN,
  evidence: QN,
  mark: ZN
};
function ey({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ma, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function v1({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${De.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${De.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${De.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${De.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${De.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${De.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(ey, { state: e.state }) })
  ] });
}
const ay = "_cell_1monp_2", ny = {
  cell: ay
}, ty = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function ry(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function ly(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function oy(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: ry(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function iy(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function f1({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  ly(e, t);
  const r = iy(e);
  return /* @__PURE__ */ n(
    ci,
    {
      label: "Rejection routing",
      columns: ty,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: ny.cell, "data-norerun": o.noRerun ? !0 : void 0, children: oy(o, i) }),
      empty: a ?? /* @__PURE__ */ n(Bc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const cy = "_row_ute8v_2", sy = "_title_ute8v_11", dy = "_turns_ute8v_20", uy = "_waiting_ute8v_21", hy = "_resolved_ute8v_22", my = "_activity_ute8v_23", wy = "_cost_ute8v_29", _y = "_link_ute8v_30", vy = "_tableRow_ute8v_47", fy = "_tableTitle_ute8v_59", by = "_tableResolved_ute8v_64", py = "_tableLink_ute8v_68", gy = "_tableMeta_ute8v_83", Ny = "_tableCost_ute8v_90", yy = "_tableActivity_ute8v_91", ky = "_tableState_ute8v_101", $y = "_tableRecord_ute8v_112", B = {
  row: cy,
  title: sy,
  turns: dy,
  waiting: uy,
  resolved: hy,
  activity: my,
  cost: wy,
  link: _y,
  tableRow: vy,
  tableTitle: fy,
  tableResolved: by,
  tableLink: py,
  tableMeta: gy,
  tableCost: Ny,
  tableActivity: yy,
  tableState: ky,
  tableRecord: $y
}, Xn = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function Cy(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function Sy(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Ry(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const Ty = { duplicate: "CLOSED · DUPLICATE" };
function Ly({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function xy({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : J(e) });
}
function Ay({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function Ey({ session: e, href: a }) {
  const t = Xn[e.state];
  return /* @__PURE__ */ l("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: Sy(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: B.tableResolved, children: [
      Ry(e.resolved),
      /* @__PURE__ */ n(Ly, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(xy, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: Cy(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: Ty[e.state] ?? t.label }),
      /* @__PURE__ */ n(Ay, { link: e.link })
    ] }) })
  ] });
}
function qy({ session: e }) {
  const a = Xn[e.state];
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
function b1(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(Ey, { session: e.session, href: e.href }) : /* @__PURE__ */ n(qy, { session: e.session });
}
const Iy = "_block_1yy2v_3", My = "_list_1yy2v_9", By = "_line_1yy2v_14", xa = {
  block: Iy,
  list: My,
  line: By
}, Py = { warn: "warning", ok: "ok" };
function Dy({ kind: e }) {
  const a = Py[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Hy({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${xa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(Dy, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function p1({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${xa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: xa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(Hy, { line: t }, `${r}-${t.text}`)) }) });
}
const Oy = "_band_tt7hp_1", Fy = "_head_tt7hp_8", jy = "_cell_tt7hp_19", Wy = "_index_tt7hp_35", zy = "_title_tt7hp_42", Gy = "_note_tt7hp_48", Ky = "_cellTitle_tt7hp_53", Uy = "_cellBody_tt7hp_58", Vy = "_tag_tt7hp_64", me = {
  band: Oy,
  head: Fy,
  cell: jy,
  index: Wy,
  title: zy,
  note: Gy,
  cellTitle: Ky,
  cellBody: Uy,
  tag: Vy
}, cn = 4;
function g1({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== cn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${cn}-cell grid`);
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
  r1 as ActivityConsole,
  Vu as AgentCard,
  ok as AppShell,
  zk as AppearanceStrip,
  g1 as Band,
  fs as BoardColumn,
  $k as BoardFootnote,
  Ck as BoardHeader,
  fk as BoardScroller,
  v as Btn,
  tk as CHIP_ROLES,
  On as CREDENTIAL_COLUMNS,
  dk as Callout,
  Gk as CapabilityRow,
  m1 as ChatMessage,
  hn as Checkbox,
  m as Chip,
  l1 as ClarificationRow,
  Mk as ClauseRuleRow,
  Ik as ClauseRules,
  $n as ColourLadder,
  Kk as ComponentRow,
  o1 as Composer,
  Rk as ConfigRow,
  Sk as ConfigRowHead,
  Ba as ConnectionMark,
  h1 as Conversation,
  Vo as CostMeter,
  Vk as CredentialRow,
  Uk as CredentialRowHead,
  i1 as CriteriaList,
  Er as Crumb,
  w1 as DeliveryHealth,
  pk as DeniedState,
  Bk as DryRunRail,
  Bc as EmptyState,
  Yk as EnvCard,
  x as Field,
  bk as FilteredEmpty,
  _k as FormStack,
  va as GateChecklist,
  c1 as GateLadder,
  ci as Grid,
  Dk as HandoffRuleRow,
  Pk as HandoffRules,
  Tk as ItemDrawer,
  _t as LIVE_EVENT_TYPES,
  vu as LegacyBoardColumn,
  xk as LegacyBoardHeader,
  Ak as LegacyConfigRow,
  qk as LegacyItemDrawer,
  su as LegacyOverCapNote,
  Ek as LegacyPreviewRail,
  Nn as LegacyWorkCard,
  ge as LiveIndicator,
  gk as LoadFailed,
  kk as Loading,
  zn as MCP_SERVER_COLUMNS,
  Ma as Mark,
  Xk as MarkUpload,
  Ae as Marker,
  Zk as McpServerRow,
  Qk as McpServerRowHead,
  Hk as NewStreamModal,
  Hc as OverCapNote,
  Je as Overlay,
  $h as PARTIAL_STEP_REASON,
  Gn as POLICY_CHIP_WIDTH,
  hk as PageFrame,
  sk as PageHeader,
  e1 as PolicyRow,
  Lk as PreviewRail,
  Na as ROLE_MATRIX_COLUMNS,
  Bn as RULE_ACTIONS,
  vn as Radio,
  _1 as ReadyChecklist,
  wk as RecordSection,
  s1 as RequeueSheet,
  d1 as ResolveBlock,
  v1 as ResolvedFieldRow,
  a1 as RoleMatrixRow,
  f1 as RoutingTable,
  Ok as RuleRow,
  n1 as RunbookSteps,
  mt as STREAM_STEPS,
  vk as SectionBand,
  Ci as SectionHeader,
  mn as SegmentedControl,
  b1 as SessionRow,
  ck as Sidebar,
  Fk as StageColumn,
  u1 as StageHistory,
  Rw as StageListEditor,
  Nk as StaleStrip,
  ma as StatStrip,
  jk as StreamRow,
  mk as SubjectRail,
  xe as Switch,
  ik as Tabs,
  Wk as ToolRow,
  uk as TopBar,
  ac as Tree,
  bn as TreeRow,
  p1 as TypedInputBlock,
  t1 as ValidationList,
  Qy as VisibilityProvider,
  Zy as Visible,
  nk as WARD_VERSION,
  _a as WorkCard,
  yk as WriteUnavailableStrip,
  Cy as agoSince,
  lt as clock,
  zw as colourStatus,
  Q as count,
  ne as duration,
  Aa as elapsed,
  ak as eventSourceTransport,
  ze as isStreamStep,
  Ea as isValidatedStreamStep,
  Ch as ladderValidation,
  qb as mcpConnectionChip,
  Ab as mcpToolName,
  J as money,
  de as ms,
  pn as ordered,
  sn as ratio,
  kf as restartLabel,
  te as stamp,
  un as stream,
  vt as streamChip,
  bt as streamHex,
  rk as streamVars,
  ea as useBorderFlash,
  dt as useFocusTrap,
  lk as useLiveFeed,
  ek as useReturnFocus,
  ha as useRovingTabindex,
  qa as useTicker,
  ot as useVisible,
  F as v,
  Jk as validateMark,
  wt as validatedStreamSteps
};
