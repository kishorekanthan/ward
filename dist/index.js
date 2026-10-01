import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as bt, useContext as Ke, createContext as Ve, useCallback as Y, useEffect as A, useState as g, useRef as N, useLayoutEffect as kn, useId as k, Fragment as pt } from "react";
import { createPortal as gt } from "react-dom";
function ie(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const Qa = (e) => String(e).padStart(2, "0");
function ja(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${Qa(a % 60)}s` : `${Math.floor(t / 60)}h ${Qa(t % 60)}m`;
}
const Nt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ce(e) {
  const a = Nt.formatToParts(new Date(e)), t = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function ne(e) {
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
function $n(e, a) {
  return `${e} / ${a}`;
}
const yt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function kt(e) {
  return yt.format(new Date(e));
}
const Cn = Ve(/* @__PURE__ */ new Set());
function T1({ hidden: e, children: a }) {
  const t = bt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Cn.Provider, { value: t, children: a });
}
function $t(e) {
  return !Ke(Cn).has(e);
}
function E1({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(S, { children: $t(e) ? a : t });
}
const Ct = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function St(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function Rt(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = St(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Tt(e) {
  return { onKeyDown: Y(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Ct));
      Rt(t, e.current, r);
    },
    [e]
  ) };
}
function L1(e, a = !0) {
  A(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const Za = { ArrowUp: -1, ArrowDown: 1 }, en = { ArrowLeft: -1, ArrowRight: 1 }, Et = (e, a, t) => Math.min(t, Math.max(a, e));
function Lt(e, a) {
  if (a !== "horizontal" && e in Za) return Za[e];
  if (a !== "vertical" && e in en) return en[e];
}
function ba({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), l = N(!1);
  kn(() => {
    var b;
    const s = Array.from(r.current.keys());
    if (s.length === 0 || s.includes(a)) return;
    const h = s[0], _ = l.current;
    l.current = !1, t(h), _ && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = Y((s) => t(s), []), c = Y((s) => {
    var h;
    t(s), (h = r.current.get(s)) == null || h.focus();
  }, []), d = Y(
    (s) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const _ = Math.max(0, h.indexOf(a)), b = Lt(s.key, e);
      b !== void 0 ? (s.preventDefault(), c(h[Et(_ + b, 0, h.length - 1)])) : s.key === "Home" ? (s.preventDefault(), c(h[0])) : s.key === "End" && (s.preventDefault(), c(h[h.length - 1]));
    },
    [a, c, e]
  ), u = Y(
    (s) => ({
      tabIndex: s === a ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(s, h) : (r.current.delete(s), s === a && (l.current = !0));
      },
      onFocus: () => t(s),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: d }, itemProps: u, setActive: i };
}
const A1 = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, x1 = "0.2.0", I1 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], At = [1, 2, 3, 4, 5, 6], xt = [1, 2, 3], It = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], W = {
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
}, me = {
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
function Sn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function pa(e) {
  return At.includes(e);
}
function ga(e) {
  return xt.includes(e);
}
function q1(e) {
  if (!pa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function M1(e) {
  if (!pa(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const qt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Mt(e) {
  if (!pa(e)) throw new Error("unvalidated stream step");
  return qt[e];
}
function an(e) {
  return typeof e != "string" ? null : It.includes(e) ? e : null;
}
function Bt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Pt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Ot(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Dt(e, a, t) {
  const r = Bt(e);
  if (r === null) return null;
  const l = an(t) ?? an(r.type);
  return l === null ? null : { ...r, type: l, id: Pt(r, a), at: Ot(r) };
}
function Ht(e, a) {
  return e >= me.staleAfter ? "stale" : e >= me.heartbeat && a === "live" ? "reconnecting" : null;
}
function Ft(e, a, t) {
  return e >= me.heartbeat && !a && t !== null;
}
function B1(e, a) {
  const [t, r] = g("reconnecting"), [l, i] = g(null), c = N(/* @__PURE__ */ new Map()), d = N(0), u = N(""), s = N(0), h = N(null), _ = N(0), b = N(0), q = N(!1), K = N("reconnecting"), V = Y(($) => {
    K.current = $, r($);
  }, []), le = Y(() => {
    d.current = Date.now();
  }, []), $e = Y(($) => {
    for (const [j, _e] of c.current)
      (_e === "*" || $.itemKey === _e) && j($);
  }, []), ee = Y(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: ($, j, _e) => {
        const Ae = Dt($, j, _e);
        Ae !== null && (Ae.id && (u.current = Ae.id), le(), q.current = !1, V("live"), i(Ae.at), $e(Ae));
      },
      onOpen: () => {
        s.current = 0, q.current = !1, le(), V("live");
      },
      onError: () => {
        var j;
        (j = h.current) == null || j.close(), h.current = null, q.current = !0, K.current !== "stale" && V("reconnecting");
        const $ = Math.min(me.reconnectBase * 2 ** s.current, me.reconnectMax);
        s.current += 1, _.current = window.setTimeout(ee, $);
      }
    });
  }, [$e, V, le, a, e]), De = Y(($) => {
    q.current = !0, $.close(), h.current = null, _.current = window.setTimeout(ee, me.reconnectBase);
  }, [ee]), He = Y(($, j) => (c.current.set(j, $), () => {
    c.current.delete(j);
  }), []);
  return A(() => (ee(), b.current = window.setInterval(() => {
    const $ = Date.now() - d.current, j = Ht($, K.current);
    j && V(j);
    const _e = h.current;
    Ft($, q.current, _e) && De(_e);
  }, me.tick), () => {
    var $;
    window.clearInterval(b.current), window.clearTimeout(_.current), q.current = !1, ($ = h.current) == null || $.close(), h.current = null;
  }), [ee, De, V]), { connection: t, lastEventAt: l, subscribe: He };
}
function Wa(e, a) {
  const t = new Date(e).getTime(), [r, l] = g(() => Date.now());
  return A(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const c = window.setInterval(i, me.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(c), document.removeEventListener("visibilitychange", i);
    };
  }, [a, t]), Math.max(0, r - t);
}
function jt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function nn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function la(e, a) {
  const t = N(0), r = Y((l) => {
    const i = l ?? a, c = e.current;
    c !== null && i !== void 0 && (jt() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => nn(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => nn(c), me.flash)));
  }, [a, e]);
  return A(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Wt = "_root_1otpc_2", zt = {
  root: Wt
};
function Gt(e, a, t, r, l) {
  const i = [ja(a)];
  return e || i.push(`as of ${kt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function ke({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Wa(e, l), c = (a == null ? void 0 : a.at) ?? e, d = Gt(l, i, c, r, a);
  return /* @__PURE__ */ o("span", { className: `${zt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: d.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ce(e)
    ] })
  ] });
}
const Ut = "_app_bcfqb_1", Kt = "_side_bcfqb_18", Vt = "_main_bcfqb_26", Yt = "_rail_bcfqb_33", Xt = "_page_bcfqb_40", Jt = "_root_bcfqb_91", Qt = "_topbar_bcfqb_98", Zt = "_mark_bcfqb_109", er = "_brand_bcfqb_116", ar = "_tagline_bcfqb_122", nr = "_identity_bcfqb_128", tr = "_tools_bcfqb_129", rr = "_metadata_bcfqb_138", lr = "_actor_bcfqb_153", or = "_detail_bcfqb_154", ir = "_nav_bcfqb_159", cr = "_content_bcfqb_194", sr = "_skip_bcfqb_217", O = {
  app: Ut,
  side: Kt,
  main: Vt,
  rail: Yt,
  page: Xt,
  root: Jt,
  topbar: Qt,
  mark: Zt,
  brand: er,
  tagline: ar,
  identity: nr,
  tools: tr,
  metadata: rr,
  actor: lr,
  detail: or,
  nav: ir,
  content: cr,
  skip: sr
}, dr = /^([a-z][a-z0-9+.-]*):/i, ur = /* @__PURE__ */ new Set(["http", "https"]), hr = "#";
function mr(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = dr.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function F(e) {
  const a = mr(e);
  return a === void 0 || ur.has(a) ? e : hr;
}
function wr({ sidebar: e, header: a, children: t, rail: r }) {
  const l = r != null;
  return /* @__PURE__ */ o("div", { className: O.app, "data-rail": l ? "true" : "false", children: [
    /* @__PURE__ */ n("div", { className: O.side, children: e }),
    /* @__PURE__ */ o("main", { className: O.main, children: [
      a,
      /* @__PURE__ */ n("div", { className: O.page, children: t })
    ] }),
    l && /* @__PURE__ */ n("div", { className: O.rail, children: r })
  ] });
}
function _r({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: O.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: F(t.href), "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function sa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function vr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: O.metadata, children: [
    /* @__PURE__ */ n(sa, { value: e, className: O.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(sa, { value: a, className: O.detail })
  ] });
}
function fr(e) {
  return /* @__PURE__ */ o("header", { className: O.topbar, children: [
    /* @__PURE__ */ n("span", { className: O.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: O.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(sa, { value: e.tagline, className: O.tagline }),
    /* @__PURE__ */ n(_r, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: O.identity, children: /* @__PURE__ */ n(vr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(sa, { value: e.tools, className: O.tools })
  ] });
}
function br(e) {
  const a = k();
  return /* @__PURE__ */ o("div", { className: `${O.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: O.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(fr, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: O.content, children: e.children })
  ] });
}
function pr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function P1(e) {
  return pr(e) ? /* @__PURE__ */ n(wr, { ...e }) : /* @__PURE__ */ n(br, { ...e });
}
const gr = "_btn_llheq_2", Nr = "_primary_llheq_13", yr = "_secondary_llheq_23", kr = "_ghost_llheq_28", $r = "_overflow_llheq_37", Cr = "_sm_llheq_44", Sr = "_disabled_llheq_48", aa = {
  btn: gr,
  primary: Nr,
  secondary: yr,
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
function qr(e) {
  return e.children ?? e.label;
}
function v(e) {
  Er(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = Lr(e), i = k();
  return /* @__PURE__ */ o(S, { children: [
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
        children: qr(e)
      }
    ),
    /* @__PURE__ */ n(Ir, { id: i, reason: l })
  ] });
}
function za(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Mr = "_root_o4yib_2", Br = "_row_o4yib_8", Pr = "_box_o4yib_14", Or = "_label_o4yib_21", Dr = "_lockedNote_o4yib_26", Hr = "_consequence_o4yib_34", Fr = "_sample_o4yib_69", qe = {
  root: Mr,
  row: Br,
  box: Pr,
  label: Or,
  lockedNote: Dr,
  consequence: Hr,
  sample: Fr
};
function jr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Wr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${qe.consequence} ward-check-consequence`, children: a }) : null;
}
function zr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${qe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Gr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.sample, "aria-hidden": "true", children: e }) : null;
}
function Rn(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = jr(e);
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
          "aria-describedby": za(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: qe.label, children: [
        e.label,
        /* @__PURE__ */ n(zr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Gr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Wr, { id: t, text: e.consequence })
  ] });
}
const Ur = "_chip_1073r_2", Kr = {
  chip: Ur
}, Vr = {
  gate: W.chip.gate,
  system: W.chip.system,
  write: W.chip.write,
  drift: W.chip.drift,
  done: W.chip.done,
  attention: W.chip.attention,
  failed: W.chip.failed,
  pending: W.chip.pending,
  running: W.chip.running,
  warn: W.chip.warn,
  meta: W.chip.meta,
  soft: W.chip.soft,
  quiet: W.chip.quiet
};
function Yr(e, a) {
  if (e === "stream") return Xr(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Vr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Xr(e) {
  if (!e || !ga(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Sn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Kr.chip} ward-chip ward-chip--${e}`, style: Yr(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function Na(e) {
  return typeof e == "number" && ga(e) ? e : null;
}
function Ee(e, a) {
  const t = Na(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function ya(e, a) {
  const t = Na(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const Jr = "_nav_1mnou_2", Qr = "_list_1mnou_8", Zr = "_item_1mnou_15", el = "_link_1mnou_25", al = "_sep_1mnou_35", nl = "_current_1mnou_39", tl = "_chips_1mnou_43", xe = {
  nav: Jr,
  list: Qr,
  item: Zr,
  link: el,
  sep: al,
  current: nl,
  chips: tl
};
function rl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: xe.nav, children: [
    /* @__PURE__ */ n("ol", { className: xe.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: xe.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: xe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: xe.link, href: F(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: xe.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${xe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const ll = "_field_fy549_2", ol = "_label_fy549_8", il = "_labelHidden_fy549_15", cl = "_control_fy549_25", sl = "_mono_fy549_44", dl = "_area_fy549_49", ul = "_invalid_fy549_56", Te = {
  field: ll,
  label: ol,
  labelHidden: il,
  control: cl,
  mono: sl,
  area: dl,
  invalid: ul
}, hl = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function ml({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? hl : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function wl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function _l({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const vl = { input: ml, select: wl, textarea: _l };
function fl(e, a, t) {
  const r = vl[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function bl(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": za(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function pl(e) {
  const a = e.mono ? [Te.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Te.area] : [];
  return [Te.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function gl(e) {
  return e ? `${Te.label} ${Te.labelHidden} ward-field-label` : `${Te.label} ward-field-label`;
}
function L(e) {
  const a = k(), t = `${a}-msg`, r = bl(e, a, t), l = pl(e);
  return /* @__PURE__ */ o("div", { className: `${Te.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: gl(e.labelHidden), htmlFor: a, children: e.label }),
    fl(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Te.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Nl = "_strip_tivso_2", yl = "_tab_tivso_26", kl = "_count_tivso_49", qa = {
  strip: Nl,
  tab: yl,
  count: kl
}, tn = 7;
function $l(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Cl(e) {
  return `${qa.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function Sl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Tn(e) {
  const a = Sl(e);
  e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end);
}
function Rl(e, a) {
  A(() => {
    const t = e.current;
    if (!t) return;
    const r = () => Tn(t);
    t.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [t, ...t.children]) l == null || l.observe(i);
    return r(), () => {
      t.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, a]);
}
function Tl(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function El(e, a) {
  kn(() => {
    const t = e.current, r = t == null ? void 0 : t.querySelectorAll('[role="tab"]')[a];
    if (!t || !r) return;
    const l = Tl(t, r);
    l !== null && (t.scrollLeft = Math.max(0, l)), Tn(t);
  }, [e, a]);
}
function O1({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > tn) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${tn} — the set is fixed`);
  const i = ba({ orientation: "horizontal" }), c = $l(e, a);
  A(() => i.setActive(c), [i.setActive, c]);
  const d = N(null);
  return Rl(d, e.length), El(d, c), /* @__PURE__ */ n(
    "div",
    {
      ref: d,
      className: Cl(l),
      role: "tablist",
      "aria-label": r,
      "data-level": l,
      ...i.containerProps,
      children: e.map((u, s) => /* @__PURE__ */ o(
        "button",
        {
          id: `tab-${u.id}`,
          type: "button",
          role: "tab",
          className: `${qa.tab} ward-tab`,
          "aria-selected": u.id === a,
          "aria-controls": `panel-${u.id}`,
          onClick: () => t(u.id),
          ...i.itemProps(s),
          children: [
            u.label,
            u.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: qa.count, children: `· ${u.count}` })
            ] })
          ]
        },
        u.id
      ))
    }
  );
}
const Ll = "_root_jem6y_2", Al = "_segment_jem6y_7", rn = {
  root: Ll,
  segment: Al
};
function En({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = ba({ orientation: "horizontal" }), d = Math.max(0, e.findIndex((u) => u.value === a));
  return A(() => c.setActive(d), [c.setActive, d]), /* @__PURE__ */ n("div", { className: `${rn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, s) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: rn.segment,
      "aria-checked": u.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => t(u.value),
      ...c.itemProps(s),
      children: u.label
    },
    u.value
  )) });
}
const xl = "_sidebar_1jywv_3", Il = "_brand_1jywv_9", ql = "_mark_1jywv_17", Ml = "_word_1jywv_24", Bl = "_nav_1jywv_30", Pl = "_navItem_1jywv_38", Ol = "_group_1jywv_50", Dl = "_groupName_1jywv_57", Hl = "_agents_1jywv_70", Fl = "_agent_1jywv_70", jl = "_agentTop_1jywv_88", Wl = "_dot_1jywv_95", zl = "_agentName_1jywv_107", Gl = "_agentMeta_1jywv_120", Ul = "_foot_1jywv_126", Kl = "_footName_1jywv_132", Vl = "_footLinks_1jywv_139", Yl = "_footLink_1jywv_139", Xl = "_root_1jywv_153", Jl = "_linkBrand_1jywv_162", Ql = "_label_1jywv_183", Zl = "_note_1jywv_188", eo = "_footer_1jywv_202", C = {
  sidebar: xl,
  brand: Il,
  mark: ql,
  word: Ml,
  nav: Bl,
  navItem: Pl,
  group: Ol,
  groupName: Dl,
  new: "_new_1jywv_64",
  agents: Hl,
  agent: Fl,
  agentTop: jl,
  dot: Wl,
  agentName: zl,
  agentMeta: Gl,
  foot: Ul,
  footName: Kl,
  footLinks: Vl,
  footLink: Yl,
  root: Xl,
  linkBrand: Jl,
  label: Ql,
  note: Zl,
  footer: eo
};
function ao({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: C.agent,
      href: F(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: C.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: C.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": Sn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function no({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: F(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function to({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: C.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: C.brand, children: [
      /* @__PURE__ */ n("span", { className: C.mark }),
      /* @__PURE__ */ n("span", { className: C.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: C.nav, children: a.map((c) => /* @__PURE__ */ n("a", { className: C.navItem, href: F(c.href), "aria-current": c.current === !0 ? "page" : void 0, children: c.label }, c.href)) }),
    /* @__PURE__ */ o("div", { className: C.group, children: [
      /* @__PURE__ */ o("span", { className: C.groupName, children: [
        t,
        " · ",
        Z(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: C.new, href: F(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(ao, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(no, { shared: i })
  ] });
}
function ro(e) {
  return e.destinations ?? e.items ?? [];
}
function lo({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function oo({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function io({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: F(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function co(e) {
  return /* @__PURE__ */ o("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(lo, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: ro(e).map((a) => /* @__PURE__ */ n(io, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(oo, { children: e.children })
  ] });
}
function so(e) {
  return "agents" in e;
}
function D1(e) {
  return so(e) ? /* @__PURE__ */ n(to, { ...e }) : /* @__PURE__ */ n(co, { ...e });
}
const uo = "_mark_wlgi8_3", ho = {
  mark: uo
}, mo = { met: "✓", unmet: "", failed: "✕" };
function Ga({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: ho.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: mo[e]
    }
  );
}
const wo = "_marker_br9fi_2", _o = {
  marker: wo
}, vo = {
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
function Le({ size: e, kind: a, label: t }) {
  const r = { "--marker": vo[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${_o.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const fo = "_root_ti0pq_2", bo = "_chip_ti0pq_11", po = "_noCase_ti0pq_23", na = {
  root: fo,
  chip: bo,
  noCase: po
};
function go(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Ua({ connection: e, since: a, lastEventAt: t }) {
  const r = go(a, t), l = Wa(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${na.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Le, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: na.noCase, children: ja(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ce(r)
  ] });
}
const No = "_root_114od_2", yo = "_context_114od_12", ko = "_row_114od_1", $o = "_heading_114od_25", Co = "_headingWrap_114od_33", So = "_chips_114od_38", Ro = "_title_114od_45", To = "_consequence_114od_54", Eo = "_actionsWrap_114od_59", Lo = "_actions_114od_59", Ao = "_action_114od_59", xo = "_overflowPanel_114od_78", Io = "_measure_114od_88", te = {
  root: No,
  context: yo,
  row: ko,
  heading: $o,
  headingWrap: Co,
  chips: So,
  title: Ro,
  consequence: To,
  actionsWrap: Eo,
  actions: Lo,
  action: Ao,
  overflowPanel: xo,
  measure: Io
};
function qo({ title: e, consequence: a, consequenceHint: t }) {
  return /* @__PURE__ */ o("div", { className: te.heading, children: [
    /* @__PURE__ */ n("h1", { className: te.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: te.consequence, title: t, children: a })
  ] });
}
function Ma({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: te.action, "data-action": "", children: a }, t));
}
function ln({ disclosure: e }) {
  return /* @__PURE__ */ n(v, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Mo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(ln, { disclosure: l }) : a ? [/* @__PURE__ */ n(ln, { disclosure: l }, "more"), /* @__PURE__ */ n(Ma, { actions: e }, "actions")] : /* @__PURE__ */ n(Ma, { actions: e });
}
function Bo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Po({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: te.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Ma, { actions: e }) });
}
function Oo(e, a) {
  const t = k(), [r, l] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, s;
    l(!1), (s = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || s.focus();
  } };
}
function Do({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: te.context, children: [
    /* @__PURE__ */ n(rl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: te.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function Ho(...e) {
  return e.some((a) => a === null);
}
function Fo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function jo(e, a, t, r, l) {
  if (l === 0 || Ho(a, t, r)) return !1;
  const [i, c, d] = [a, t, r], u = Fo(e), s = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return d.offsetWidth > s || c.scrollWidth > c.clientWidth + 1;
}
function Wo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function zo(e) {
  const a = N(null), t = N(null), r = N(null), l = N(null), [i, c] = g(!1);
  return A(() => {
    const d = a.current;
    if (!Wo(d)) return;
    const u = () => c(jo(d, t.current, r.current, l.current, e.length)), s = new ResizeObserver(u);
    return s.observe(d), u(), () => s.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function Go({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ o("div", { className: te.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(v, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] });
}
function Uo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Ua, { connection: e.connection, since: e.since }) : null;
}
function H1({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: c = [], connection: d, onOverflow: u, density: s = "page" }) {
  const { rowRef: h, headingRef: _, actionsRef: b, measureRef: q, collapsed: K } = zo(i), V = c.length > 0, { disclosure: le, close: $e } = Oo(K || V, b), ee = Bo(c, i, K, u);
  return /* @__PURE__ */ o("header", { className: te.root, "data-density": s, children: [
    /* @__PURE__ */ n(Do, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: te.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: _, className: te.headingWrap, children: /* @__PURE__ */ n(qo, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: te.actionsWrap, children: [
        /* @__PURE__ */ n(Uo, { connection: d }),
        /* @__PURE__ */ n("div", { className: te.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(Mo, { actions: i, hasMore: V, collapsed: K, onOverflow: u, disclosure: le }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Po, { actions: ee, disclosure: le, onEscape: $e }),
    /* @__PURE__ */ n(Go, { actions: i, hasMore: V, measureRef: q })
  ] });
}
function Ln(e) {
  const [a, t] = g(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return A(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (c) => t(c.matches);
    return r.addEventListener("change", l), t(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
const Ko = "_scrim_c7sqj_2", Vo = "_drawer_c7sqj_10", Yo = "_sheet_c7sqj_14", Xo = "_modal_c7sqj_18", Jo = "_panel_c7sqj_23", Qo = "_header_c7sqj_51", Zo = "_title_c7sqj_59", ei = "_body_c7sqj_63", ai = "_close_c7sqj_90", Ne = {
  scrim: Ko,
  drawer: Vo,
  sheet: Yo,
  modal: Xo,
  panel: Jo,
  header: Qo,
  title: Zo,
  body: ei,
  close: ai
}, ni = Ve(null), da = [], ua = /* @__PURE__ */ new Map();
function ti(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function ri(e, a) {
  let t = ua.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ua.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function li(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !ti(r) && ri(e, r);
}
function oi(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (li(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function ii(e) {
  for (const a of e.claims) {
    const t = ua.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ua.delete(a)));
  }
}
function ci(e, a) {
  const t = { root: e, claims: [] };
  return da.push(t), oi(t, a), t;
}
function si(e) {
  const a = da.indexOf(e);
  a >= 0 && da.splice(a, 1), ii(e);
}
function on(e) {
  return e !== null && da.at(-1) === e;
}
function di(e, a, t) {
  const r = N(null), l = N(t);
  return l.current = t, A(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, d = ci(i, a);
    return r.current = d, () => {
      var s, h;
      const u = on(d);
      si(d), r.current = null, u && ((h = (s = l.current ?? c) == null ? void 0 : s.focus) == null || h.call(s));
    };
  }, [a]), Y(() => on(r.current), []);
}
function ui(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function hi(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function mi({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${Ne.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ne.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, children: e.children })
  ] });
}
function wi(e) {
  return `${Ne.scrim} ${Ne[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function _i(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ne.panel} ${Ne[e]} ward-overlay-panel${t}${r}`;
}
function vi(e) {
  const a = Ke(ni);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = N(null), t = N(null), r = k(), l = vi(e.container), i = Ln("(min-width: 768px)"), c = ui(e.kind, i), d = hi(e, r), u = Tt(t), s = di(a, l, e.returnFocusTo), h = Y(() => {
    s() && e.onClose();
  }, [e.onClose, s]);
  return A(() => {
    var _, b;
    s() && ((b = (_ = t.current) == null ? void 0 : _.querySelector("button")) == null || b.focus());
  }, [s]), A(() => {
    const _ = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [h]), gt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: wi(c),
        "data-ward-overlay-kind": c,
        "data-ward-overlay-root": "",
        onClick: h,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": d.labelledBy,
            "aria-label": d.label,
            className: _i(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => s() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ne.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(mi, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const fi = "_root_drrhx_2", bi = "_ticket_drrhx_15", pi = "_body_drrhx_24", Ra = {
  root: fi,
  ticket: bi,
  body: pi
};
function F1({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Ra.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Ra.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Ra.body, children: t })
  ] });
}
const gi = "_root_bf1pc_2", Ni = "_table_bf1pc_9", yi = "_caption_bf1pc_14", ki = "_series_bf1pc_23", $i = "_category_bf1pc_31", Ci = "_cell_bf1pc_39", Si = "_track_bf1pc_45", Ri = "_lane_bf1pc_52", Ti = "_bar_bf1pc_56", Ei = "_value_bf1pc_63", Li = "_swatch_bf1pc_70", Ai = "_empty_bf1pc_78", U = {
  root: gi,
  table: Ni,
  caption: yi,
  series: ki,
  category: $i,
  cell: Ci,
  track: Si,
  lane: Ri,
  bar: Ti,
  value: Ei,
  swatch: Li,
  empty: Ai
}, xi = "—", cn = 6;
function Ii(e, a) {
  if (a.length < 1 || a.length > cn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${cn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function qi(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function An(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Mi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Bi({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Mi(e, a), c = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ o("span", { className: U.track, children: [
    /* @__PURE__ */ n("span", { className: U.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${U.bar} ward-barchart-bar`, "data-step": t, style: c, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: U.value, children: e === null ? l : r(e) })
  ] }) });
}
function Pi({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: U.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: U.swatch, "data-step": An(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Oi({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${U.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: U.caption, children: e }),
    /* @__PURE__ */ n("p", { className: U.empty, children: a })
  ] });
}
function Di({ title: e, categories: a, series: t, top: r, format: l = Z, categoryHead: i = "Category", missing: c = xi }) {
  return /* @__PURE__ */ n("div", { className: `${U.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: U.table, children: [
    /* @__PURE__ */ n("caption", { className: U.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: U.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Pi, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((d, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: U.category, children: d }),
      t.map((s, h) => /* @__PURE__ */ n(Bi, { value: s.values[u], top: r, step: An(h, t.length), format: l, missing: c }, s.name))
    ] }, d)) })
  ] }) });
}
function j1(e) {
  Ii(e.categories, e.series);
  const a = qi(e.series);
  return a === 0 ? /* @__PURE__ */ n(Oi, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Di, { ...e, top: a });
}
const Hi = "_root_1bfqw_2", Fi = "_figure_1bfqw_7", ji = "_of_1bfqw_13", Wi = "_bar_1bfqw_18", zi = "_rows_1bfqw_38", Gi = "_row_1bfqw_38", Ui = "_label_1bfqw_49", Ki = "_amount_1bfqw_54", Ce = {
  root: Hi,
  figure: Fi,
  of: ji,
  bar: Wi,
  rows: zi,
  row: Gi,
  label: Ui,
  amount: Ki
};
function Vi({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ce.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ce.figure} ward-stat-value`, children: [
      ne(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ce.of, children: [
        "of ",
        ne(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Ce.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${ne(e)} of ${ne(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: Ce.rows, children: t.map((l) => /* @__PURE__ */ o("li", { className: `${Ce.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ce.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Ce.amount, children: ne(l.amount) })
    ] }, l.label)) })
  ] });
}
const Yi = "_frame_mg2jl_2", Xi = "_table_mg2jl_6", Ji = "_th_mg2jl_12", Qi = "_td_mg2jl_13", Zi = "_sort_mg2jl_47", ec = "_row_mg2jl_53", ac = "_empty_mg2jl_61", Re = {
  frame: Yi,
  table: Xi,
  th: Ji,
  td: Qi,
  sort: Zi,
  row: ec,
  empty: ac
}, nc = { asc: "ascending", desc: "descending" };
function tc(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return nc[a.direction];
}
function rc(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function lc(e) {
  return e === void 0 ? void 0 : { width: e };
}
function oc({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: lc(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": tc(e, a),
      children: rc(e, t)
    }
  );
}
function ic({ row: e, props: a }) {
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
function cc({
  label: e,
  columns: a,
  rows: t,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: c = [],
  sort: d,
  onSort: u,
  empty: s
}) {
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: Re.empty, children: s }) : /* @__PURE__ */ n("div", { className: Re.frame, children: /* @__PURE__ */ o("table", { className: Re.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(oc, { column: h, sort: d, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(ic, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: c, sort: d, onSort: u, empty: s } }, r(h))) })
  ] }) });
}
const sc = "_set_y5zy3_2", dc = "_legend_y5zy3_7", uc = "_row_y5zy3_15", hc = "_control_y5zy3_20", mc = "_input_y5zy3_26", wc = "_label_y5zy3_31", _c = "_consequence_y5zy3_36", Ie = {
  set: sc,
  legend: dc,
  row: uc,
  control: hc,
  input: mc,
  label: wc,
  consequence: _c
};
function xn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: c, variant: d }) {
  const u = k(), s = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: Ie.set, "data-variant": d, children: [
    /* @__PURE__ */ n("legend", { className: Ie.legend, children: e }),
    a.map((h) => {
      const _ = `${s}-${h.value}`, b = h.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Ie.row, children: [
        /* @__PURE__ */ o("span", { className: Ie.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: s,
              className: Ie.input,
              value: h.value,
              checked: t === h.value,
              disabled: l,
              "aria-describedby": za(b, c),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: _, className: Ie.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Ie.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const vc = "_root_1h1ot_2", fc = "_head_1h1ot_11", bc = "_index_1h1ot_25", pc = "_dot_1h1ot_29", gc = "_note_1h1ot_34", Nc = "_counter_1h1ot_40", yc = "_trailing_1h1ot_48", Me = {
  root: vc,
  head: fc,
  index: bc,
  dot: pc,
  note: gc,
  counter: Nc,
  trailing: yc
};
function kc({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${Me.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Me.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function $c({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Me.counter, "aria-hidden": "true", children: e }) : null;
}
function Cc({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Me.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Me.head, children: [
      /* @__PURE__ */ n(kc, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Me.note, children: t }),
    /* @__PURE__ */ n($c, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Me.trailing, children: i })
  ] });
}
const Sc = "_strip_1cfs3_2", Rc = "_cell_1cfs3_7", Tc = "_value_1cfs3_12", Ec = "_link_1cfs3_27", Lc = "_label_1cfs3_39", Xe = {
  strip: Sc,
  cell: Rc,
  value: Tc,
  link: Ec,
  label: Lc
};
function Ac(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function xc({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(S, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Xe.link} ward-stat-link`, href: F(e.href), "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function ka({ cells: e, divided: a = !1 }) {
  return Ac(e), /* @__PURE__ */ n("dl", { className: `${Xe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Xe.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Xe.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, title: t.hint, children: /* @__PURE__ */ n(xc, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Xe.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Ic = "_root_xk7sv_2", qc = "_track_xk7sv_8", Mc = "_thumb_xk7sv_35", Bc = "_labelHidden_xk7sv_53", Pc = "_label_xk7sv_53", Oc = "_lockedNote_xk7sv_68", Be = {
  root: Ic,
  track: qc,
  thumb: Mc,
  labelHidden: Bc,
  label: Pc,
  lockedNote: Oc
};
function Dc(e) {
  return e ? `${Be.label} ${Be.labelHidden}` : Be.label;
}
function Oe({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: c }) {
  const d = k(), u = l ? !0 : a, s = r || l;
  return /* @__PURE__ */ o("span", { className: `${Be.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": u,
        "aria-label": e,
        "aria-labelledby": d,
        "aria-describedby": i,
        className: `${Be.track} ward-switch`,
        "data-on": u,
        "data-locked": l ? !0 : void 0,
        disabled: s,
        onClick: () => !s && (t == null ? void 0 : t(!u)),
        children: /* @__PURE__ */ n("span", { className: Be.thumb })
      }
    ),
    /* @__PURE__ */ o("span", { id: d, className: Dc(c), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const Hc = "_bar_1u2kl_2", Fc = "_skip_1u2kl_11", jc = "_mark_1u2kl_22", Wc = "_nav_1u2kl_30", zc = "_list_1u2kl_34", Gc = "_select_1u2kl_40", Uc = "_dest_1u2kl_47", Kc = "_actor_1u2kl_61", Vc = "_actorMark_1u2kl_74", Yc = "_actorLabel_1u2kl_79", Xc = "_tagline_1u2kl_98", se = {
  bar: Hc,
  skip: Fc,
  mark: jc,
  nav: Wc,
  list: zc,
  select: Gc,
  dest: Uc,
  actor: Kc,
  actorMark: Vc,
  actorLabel: Yc,
  tagline: Xc
};
function Jc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Qc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function W1({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: c = "main" }) {
  const d = Qc(r);
  return /* @__PURE__ */ o("header", { className: se.bar, children: [
    /* @__PURE__ */ n("a", { className: se.skip, href: `#${c}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: se.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: se.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: se.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: se.dest,
          href: F(u.href),
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        "select",
        {
          className: se.select,
          "aria-label": "Destination",
          value: t,
          onChange: (u) => i == null ? void 0 : i(u.target.value),
          children: a.map((u) => /* @__PURE__ */ n("option", { value: u.id, children: u.label }, u.id))
        }
      )
    ] }),
    d && /* @__PURE__ */ o("span", { className: se.actor, children: [
      /* @__PURE__ */ n("span", { className: se.actorLabel, children: d }),
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: Jc(d) })
    ] })
  ] });
}
const Zc = "_tree_1lyby_2", es = "_item_1lyby_6", as = "_row_1lyby_10", ns = "_button_1lyby_22", ha = {
  tree: Zc,
  item: es,
  row: as,
  button: ns
}, In = Ve(null);
function ts({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ba({ orientation: "vertical" });
  return /* @__PURE__ */ n(In.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ha.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const rs = { ArrowRight: !0, ArrowLeft: !1 };
function sn(e) {
  return e ? !0 : void 0;
}
function ls(e, a) {
  const t = rs[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function os(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function is(e) {
  const a = [ha.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function cs(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function ss(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function ds(e) {
  return typeof e == "string" ? e : void 0;
}
function us({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function hs({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function qn(e) {
  const a = Ke(In);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = cs(e);
  return /* @__PURE__ */ o("li", { className: ha.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: is(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": sn(e.unresolved),
        "data-inherited": sn(e.inherited),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${ha.button} ward-treeitem-btn`,
            onClick: () => os(e),
            onKeyDown: (r) => ls(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: ss(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: ds(e.label), children: e.label }),
              /* @__PURE__ */ n(us, { value: e.detail }),
              /* @__PURE__ */ n(hs, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const ms = "_frame_fdzvs_2", ws = "_subjectRail_fdzvs_21", _s = "_subject_fdzvs_21", vs = "_rail_fdzvs_41", fs = "_record_fdzvs_63", bs = "_recordBody_fdzvs_68", ps = "_band_fdzvs_111", gs = "_bandBody_fdzvs_120", Ns = "_bandActions_fdzvs_125", ys = "_scroller_fdzvs_133", ks = "_lanes_fdzvs_151", he = {
  frame: ms,
  subjectRail: ws,
  subject: _s,
  rail: vs,
  record: fs,
  recordBody: bs,
  band: ps,
  bandBody: gs,
  bandActions: Ns,
  scroller: ys,
  lanes: ks
};
function z1({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: he.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function dn(e) {
  return e ? "true" : void 0;
}
function G1({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: he.subjectRail, "data-ward-subject-rail": t, "data-ruled": dn(i), children: [
    /* @__PURE__ */ n("div", { className: he.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: he.rail, "data-sticky": dn(l), "aria-label": r, children: a })
  ] });
}
function U1({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i }) {
  return /* @__PURE__ */ o("section", { className: he.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Cc, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: he.recordBody, "data-pad": l, children: a })
  ] });
}
const $s = "_form_1j8ub_2", Cs = "_fields_1j8ub_9", Ss = "_actions_1j8ub_19", Ta = {
  form: $s,
  fields: Cs,
  actions: Ss
};
function K1({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ta.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ta.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ta.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function V1({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: he.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: he.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: he.bandActions, children: a })
  ] });
}
const Rs = "(max-width: 767.98px)";
function Ba({ label: e, children: a, laneCount: t }) {
  const r = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { className: he.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: r, children: a });
}
function Ts({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = g(null), i = e.find((d) => d.id === r) ?? e[0], c = e.map((d) => ({ value: d.id, label: `${d.label} · ${d.count}` }));
  return /* @__PURE__ */ o("div", { className: he.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(L, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: l }),
    /* @__PURE__ */ n(Ba, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Y1({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Ln(Rs);
  return t === void 0 ? /* @__PURE__ */ n(Ba, { label: a, children: e }) : l ? /* @__PURE__ */ n(Ts, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Ba, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n(pt, { children: i.content }, i.id)) });
}
const Es = "_block_1o5o7_2", Ls = "_sentence_1o5o7_15", As = "_meta_1o5o7_20", xs = "_action_1o5o7_25", Is = "_strip_1o5o7_29", qs = "_loading_1o5o7_48", Ms = "_label_1o5o7_56", Bs = "_counter_1o5o7_63", we = {
  block: Es,
  sentence: Ls,
  meta: As,
  action: xs,
  strip: Is,
  loading: qs,
  label: Ms,
  counter: Bs
};
function Ps({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: we.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function $a({ sentence: e, action: a, children: t, role: r = "status", tone: l }) {
  return /* @__PURE__ */ o("div", { className: `${we.block} ward-state`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: we.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Ps, { action: a })
  ] });
}
function Os(e) {
  return /* @__PURE__ */ n($a, { ...e });
}
function X1({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n($a, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function J1(e) {
  return /* @__PURE__ */ n($a, { ...e });
}
function Q1({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n($a, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "failed at ",
    ce(a)
  ] }) });
}
function Z1({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ce(e),
    ". Showing snapshot from ",
    ce(a)
  ] });
}
function e$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ce(a)
  ] });
}
function a$({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = g(!1);
  A(() => {
    const c = window.setTimeout(() => l(!0), me.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Wa(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${we.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: we.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: we.counter, children: ja(i) }) : null
  ] });
}
const Ds = "_note_tlubt_2", Hs = {
  note: Ds
};
function Fs({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: Hs.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const js = "_card_12in3_2", Ws = "_hit_12in3_23", zs = "_head_12in3_30", Gs = "_title_12in3_36", Us = "_meta_12in3_44", Ks = "_fields_12in3_45", Vs = "_who_12in3_58", Ys = "_sep_12in3_65", Xs = "_mono_12in3_69", Js = "_field_12in3_45", Qs = "_last_12in3_84", Zs = "_reason_12in3_96", X = {
  card: js,
  hit: Ws,
  head: zs,
  title: Gs,
  meta: Us,
  fields: Ks,
  who: Vs,
  sep: Ys,
  mono: Xs,
  field: Js,
  last: Qs,
  reason: Zs
}, ed = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function ad(e, a, t) {
  const r = la(e, "blue"), l = la(e, "orange"), i = la(e, "green"), c = N(/* @__PURE__ */ new Set());
  A(() => {
    if (!t) return;
    const d = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const s = ed[u.type];
      s && d[s]();
    });
  }, [r, t, i, a, l]);
}
const nd = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function td(e, a) {
  return nd[a](e);
}
function rd({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: X.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: X.meta, children: [
    /* @__PURE__ */ o("span", { className: X.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    t,
    /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: X.meta, children: [
    /* @__PURE__ */ o("span", { className: X.who, children: [
      "waits on ",
      e.waitsOn
    ] }),
    t,
    /* @__PURE__ */ o("span", { className: X.mono, children: [
      ie(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function ld({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: X.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function od({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: X.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function id({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: X.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: X.field, children: td(e, t) }, t)) });
}
const Pa = (e) => e ? !0 : void 0;
function cd(e) {
  return { "--stream": Ee(e.streamStep, "id") };
}
function sd(e, a, t) {
  e == null || e(a, t);
}
function dd(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function ud({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: X.last, "data-stale": Pa(a), children: t }) : null;
}
function Ca(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  ad(r, t.key, e.feed);
  const l = dd(e.feed), i = cd(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: X.card,
      style: i,
      "data-selected": Pa(e.selected),
      "data-flagged": Pa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: X.hit, onClick: (c) => sd(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(ld, { item: t }),
        /* @__PURE__ */ n("p", { className: X.title, children: t.title }),
        /* @__PURE__ */ n(rd, { item: t, connection: l }),
        /* @__PURE__ */ n(od, { reason: t.blockedReason }),
        /* @__PURE__ */ n(id, { item: t, fields: a }),
        /* @__PURE__ */ n(ud, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const hd = "_column_10sxg_3", md = "_head_10sxg_24", wd = "_label_10sxg_33", _d = "_count_10sxg_42", vd = "_list_10sxg_56", Je = {
  column: hd,
  head: md,
  label: wd,
  count: _d,
  list: vd
};
function Mn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function fd({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function bd(e) {
  return /* @__PURE__ */ n("div", { className: Je.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      Ca,
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
function pd({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: d, onKeyDown: u }) {
  const s = k(), h = e.cap !== void 0 && a.length > e.cap, _ = Mn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": s, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(fd, { column: e, count: a.length, id: s }),
    /* @__PURE__ */ n(bd, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: d, rows: _ }),
    h && /* @__PURE__ */ n(Fs, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const gd = "_foot_8qg4p_2", Nd = "_note_8qg4p_13", yd = "_link_8qg4p_19", Ea = {
  foot: gd,
  note: Nd,
  link: yd
};
function n$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ea.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ea.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: Ea.link, href: F(e), children: "Configure board" })
  ] });
}
const kd = "_head_1la6p_3", $d = "_identity_1la6p_12", Cd = "_titleRow_1la6p_18", Sd = "_title_1la6p_18", Rd = "_key_1la6p_35", Td = "_rollup_1la6p_45", Ed = "_tools_1la6p_53", Ld = "_swatch_1la6p_62", Ad = "_mark_1la6p_69", be = {
  head: kd,
  identity: $d,
  titleRow: Cd,
  title: Sd,
  key: Rd,
  rollup: Td,
  tools: Ed,
  swatch: Ld,
  mark: Ad
}, un = "initials:";
function xd(e) {
  return e === void 0 ? "loaded this week unavailable" : `${Z(e)} loaded this week`;
}
function Id(e) {
  const a = [xd(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${Z(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ie(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ie(e.p90)}`), a.join(" · ");
}
function qd(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      Z(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Id(e)
  ] });
}
function Md(e) {
  return e.startsWith(un) ? e.slice(un.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Bd({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ee(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${be.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Md(e) }) : /* @__PURE__ */ n("span", { className: be.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Pd({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function t$({
  stream: e,
  rollups: a,
  connection: t,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: c,
  onConfigure: d,
  actions: u
}) {
  return /* @__PURE__ */ o("div", { className: be.head, children: [
    /* @__PURE__ */ o("div", { className: be.identity, children: [
      /* @__PURE__ */ o("div", { className: be.titleRow, children: [
        /* @__PURE__ */ n(Bd, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: be.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: be.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: be.rollup, "aria-live": "polite", children: qd(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: be.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Pd, { owners: l, owner: i, onOwnerChange: c }),
      d === void 0 ? null : /* @__PURE__ */ n(v, { onClick: d, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Ua, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Od = "_head_kabyh_11", Dd = "_line_kabyh_12", Hd = "_cHandle_kabyh_33", Fd = "_cName_kabyh_38", jd = "_nameLine_kabyh_46", Wd = "_cLabel_kabyh_53", zd = "_cCap_kabyh_58", Gd = "_cShown_kabyh_63", Ud = "_name_kabyh_46", Kd = "_noCap_kabyh_85", Vd = "_state_kabyh_99", Yd = "_handle_kabyh_104", Xd = "_sub_kabyh_118", I = {
  head: Od,
  line: Dd,
  cHandle: Hd,
  cName: Fd,
  nameLine: jd,
  cLabel: Wd,
  cCap: zd,
  cShown: Gd,
  name: Ud,
  noCap: Kd,
  state: Vd,
  handle: Yd,
  sub: Xd
}, Jd = "can't be hidden or collapsed", Qd = "terminal · counted, not a column";
function r$() {
  return /* @__PURE__ */ o("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function Zd(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function eu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function hn(e) {
  return e.gate ? Jd : e.terminal ? Qd : eu(e.agentsMounted);
}
function au(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function nu({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: I.cName, children: [
    /* @__PURE__ */ o("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    hn(e) && /* @__PURE__ */ n("span", { className: I.sub, children: hn(e) })
  ] });
}
function tu(e) {
  return e === void 0 ? "" : String(e);
}
function ru(e) {
  return e === "" ? void 0 : Number(e);
}
function lu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => au(t, a),
      children: "⠿"
    }
  ) });
}
function ou({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(L, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: tu(a.cap), onChange: (r) => t({ ...a, cap: ru(r) }) }) });
}
function iu({ stage: e, config: a, onChange: t }) {
  const r = Zd(e, a.shown);
  return /* @__PURE__ */ o("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(Oe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function cu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function l$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: I.line, "data-kind": cu(e), children: [
    /* @__PURE__ */ n(lu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(nu, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(L, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(ou, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(iu, { stage: e, config: a, onChange: t })
  ] });
}
const su = "_body_hn6d6_2", du = "_head_hn6d6_9", uu = "_summary_hn6d6_19", hu = "_block_hn6d6_20", mu = "_actionsBlock_hn6d6_21", wu = "_title_hn6d6_41", _u = "_note_hn6d6_46", vu = "_k_hn6d6_51", fu = "_kv_hn6d6_58", bu = "_row_hn6d6_64", pu = "_label_hn6d6_75", gu = "_value_hn6d6_84", Nu = "_quote_hn6d6_90", yu = "_actions_hn6d6_21", ku = "_resolve_hn6d6_103", M = {
  body: su,
  head: du,
  summary: uu,
  block: hu,
  actionsBlock: mu,
  title: wu,
  note: _u,
  k: vu,
  kv: fu,
  row: bu,
  label: pu,
  value: gu,
  quote: Nu,
  actions: yu,
  resolve: ku
};
function $u(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Cu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Su(e) {
  const a = Na(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Ru(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...ya(Su(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ie(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...$u(e),
    ...Cu(e, a)
  ];
}
function Tu({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function Eu({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: M.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Lu({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: M.block, children: [
    /* @__PURE__ */ n("p", { className: M.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: M.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: M.note, children: e.agentMeta })
  ] }) : null;
}
function o$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: c, actionsNote: d }) {
  const u = k(), s = Ru(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: M.body, children: [
    /* @__PURE__ */ n(Eu, { item: e }),
    /* @__PURE__ */ o("div", { className: M.summary, children: [
      /* @__PURE__ */ n("h2", { className: M.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: M.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: M.kv, children: s.map(([h, _]) => /* @__PURE__ */ o("div", { className: M.row, children: [
      /* @__PURE__ */ n("dt", { className: M.label, children: h }),
      /* @__PURE__ */ n("dd", { className: M.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(Lu, { item: e }),
    /* @__PURE__ */ o("div", { className: M.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: M.actions, children: a }),
      d && /* @__PURE__ */ n("p", { className: M.note, children: d })
    ] }),
    /* @__PURE__ */ n(Tu, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Au = "_root_3azmy_2", xu = "_list_3azmy_7", Iu = "_item_3azmy_12", qu = "_box_3azmy_18", Mu = "_text_3azmy_23", Bu = "_note_3azmy_28", Fe = {
  root: Au,
  list: xu,
  item: Iu,
  box: qu,
  text: Mu,
  note: Bu
};
function Sa({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: Fe.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Fe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Fe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Fe.box, children: /* @__PURE__ */ n(Ga, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Fe.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Fe.note} ward-checklist-note`, children: a })
  ] });
}
const Pu = "_rail_ke7ch_2", Ou = "_k_ke7ch_11", Du = "_head_ke7ch_19", Hu = "_section_ke7ch_25", Fu = "_card_ke7ch_38", ju = "_strip_ke7ch_42", Wu = "_skeleton_ke7ch_56", zu = "_skeletonLabel_ke7ch_70", Gu = "_bar_ke7ch_76", Uu = "_note_ke7ch_85", ue = {
  rail: Pu,
  k: Ou,
  head: Du,
  section: Hu,
  card: Fu,
  strip: ju,
  skeleton: Wu,
  skeletonLabel: zu,
  bar: Gu,
  note: Uu
};
function Ku(e) {
  return (a) => e == null ? void 0 : e(a);
}
function La({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: ue.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: ue.k, children: e }),
    a
  ] });
}
function Vu({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: ue.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: ue.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: ue.bar, "aria-hidden": "true" }, r))
  ] });
}
function Yu({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(pd, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function Xu(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Yu, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Vu, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function i$(e) {
  const a = Ku(e.onOpen), t = Mn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: ue.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${ue.k} ${ue.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(La, { title: "Card", children: /* @__PURE__ */ n("div", { className: ue.card, children: t && /* @__PURE__ */ n(Ca, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(La, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: ue.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Xu, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: ue.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(La, { title: "Effect of this config", children: /* @__PURE__ */ n(Sa, { items: e.effects, density: "compact" }) })
  ] });
}
function Ju(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Qu(e) {
  return Math.ceil(e.length / 2);
}
function Zu(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Bn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function eh(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Bn(e);
  l !== void 0 && t(l), r(Zu(e.type));
}
function ah(e, a, t, r, l) {
  A(() => {
    if (e !== null)
      return e.subscribe(a, (i) => eh(i, t, r, l));
  }, [e, a, t, r, l]);
}
function nh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function th(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function rh(e, a) {
  return a !== void 0 ? ie(e.timeInStage) + " · waits on " + a.agent : ie(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function lh(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(Qu(a ?? [])) + ")"
  };
}
function oh(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function ih(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: ne(e.cost) }) : null;
}
function ch(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function sh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function dh(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function uh(e, a) {
  return a === void 0 ? e : Ju(e, a.ref);
}
function hh(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ze(e) {
  return e === !0 ? "true" : void 0;
}
function Pn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = N(null), i = la(l), c = N(/* @__PURE__ */ new Set()), [d, u] = g(nh(a));
  ah(e.feed, a.key, c, u, i);
  const s = th(a, r), h = rh(a, t), _ = lh(a, e.fields), b = dh(a, t, d);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...hh(e),
      className: "ward-workcard",
      "data-flagged": Ze(a.flagged),
      "data-selected": Ze(e.selected),
      style: _,
      ref: uh(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        oh(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: s.role, label: s.label }),
          ih(a, e.fields),
          ch(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          sh(t, d, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function mh({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function wh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function _h(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function vh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(mh, { count: e.items.length, cap: e.column.cap });
}
function fh(e, a) {
  return e.roving ?? a;
}
function bh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function ph(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    Pn,
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
function gh(e) {
  const a = k(), t = ba({ orientation: "vertical" }), r = fh(e, t), l = wh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ze(l), "data-gate": Ze(e.column.gate), children: [
    _h(e.column, e.items.length, a),
    vh(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...bh(e, t), children: ph(e, r) })
  ] });
}
function Nh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ie(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ie(e.p90)), a;
}
function yh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function kh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function c$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Nh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      yh(e),
      kh(e.onConfigure),
      /* @__PURE__ */ n(Ua, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function $h(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Ch(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Oe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Oe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Sh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function s$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ze($h(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Ch(e) }),
    /* @__PURE__ */ n(L, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Rn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Sh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function d$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Pn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(gh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Rh(e, a) {
  const t = Bn(e);
  t !== void 0 && a(t);
}
function Th(e, a, t) {
  A(() => {
    if (e != null)
      return e.subscribe(a, (r) => Rh(r, t));
  }, [e, a, t]);
}
function Eh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Lh(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ie(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function Ah(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function xh(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function u$(e) {
  var c;
  const a = e.item, t = a.run, [r, l] = g((c = a.run) == null ? void 0 : c.lastStep);
  Th(e.feed, a.key, l);
  const i = [...Eh(a), ...Lh(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((d) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: d[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(d[1]), children: d[1] })
      ] }, d[0])),
      Ah(t, r)
    ] }),
    xh(a, e.actions)
  ] });
}
const Ih = "_card_hvxp7_2", qh = "_head_hvxp7_17", Mh = "_mark_hvxp7_25", Bh = "_name_hvxp7_37", Ph = "_chips_hvxp7_48", Oh = "_description_hvxp7_54", Dh = "_run_hvxp7_59", Hh = "_sep_hvxp7_68", Fh = "_facts_hvxp7_73", jh = "_fact_hvxp7_73", Wh = "_factLabel_hvxp7_86", zh = "_factValue_hvxp7_90", re = {
  card: Ih,
  head: qh,
  mark: Mh,
  name: Bh,
  chips: Ph,
  description: Oh,
  run: Dh,
  sep: Hh,
  facts: Fh,
  fact: jh,
  factLabel: Wh,
  factValue: zh
}, Gh = { live: "done", draft: "running", paused: "meta" };
function Uh(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function Kh({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Gh[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function Vh({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: re.description, children: e });
}
function Yh({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Xh({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ n("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function Jh(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Qh({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: c }) {
  const d = { "--stream": Ee(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: Uh(c),
      style: d,
      "data-selected": u,
      "data-paused": Jh(e.versions),
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ n("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${re.name} ward-rowlink`, href: F(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(Vh, { description: e.description }),
        /* @__PURE__ */ n(Yh, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(Kh, { versions: e.versions }),
        /* @__PURE__ */ n(Xh, { facts: i })
      ]
    }
  );
}
const Zh = "_list_4dcyc_2", em = "_row_4dcyc_11", am = "_head_4dcyc_23", nm = "_id_4dcyc_30", tm = "_lock_4dcyc_35", rm = "_reason_4dcyc_41", lm = "_remove_4dcyc_46", om = "_clauses_4dcyc_50", im = "_clause_4dcyc_50", cm = "_label_4dcyc_64", sm = "_cell_4dcyc_71", dm = "_value_4dcyc_76", oe = {
  list: Zh,
  row: em,
  head: am,
  id: nm,
  lock: tm,
  reason: rm,
  remove: lm,
  clauses: om,
  clause: im,
  label: cm,
  cell: sm,
  value: dm
}, On = Ve(!1);
function h$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(On.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oe.list, "aria-label": a, children: e }) });
}
function um({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: oe.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(L, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function hm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: oe.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: oe.reason, children: e })
  ] });
}
function mm({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: oe.head, children: [
    /* @__PURE__ */ n("span", { className: oe.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(hm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: oe.remove, children: /* @__PURE__ */ o(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function mn(e, a) {
  return e.locked ? void 0 : a;
}
function m$({ rule: e, onChange: a, onRemove: t }) {
  if (!Ke(On)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = mn(e, a);
  return /* @__PURE__ */ o("li", { className: oe.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(mm, { rule: e, onRemove: mn(e, t) }),
    /* @__PURE__ */ n("dl", { className: oe.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: oe.clause, children: [
      /* @__PURE__ */ n("dt", { className: oe.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: oe.cell, children: /* @__PURE__ */ n(um, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const wm = "_ladder_wwnch_2", _m = "_cell_wwnch_7", vm = "_empty_wwnch_26", fm = "_name_wwnch_34", bm = "_holder_wwnch_40", pm = "_request_wwnch_46", gm = "_swatches_wwnch_51", Nm = "_swatch_wwnch_51", ym = "_tilesFrame_wwnch_78", km = "_tiles_wwnch_78", $m = "_tile_wwnch_78", Cm = "_bar_wwnch_117", Sm = "_hex_wwnch_128", Rm = "_note_wwnch_138", T = {
  ladder: wm,
  cell: _m,
  empty: vm,
  name: fm,
  holder: bm,
  request: pm,
  swatches: gm,
  swatch: Nm,
  tilesFrame: ym,
  tiles: km,
  tile: $m,
  bar: Cm,
  hex: Sm,
  note: Rm
}, Tm = "not validated yet, pending a CVD matrix and dark stepping";
function Em(e) {
  return e.reserved ? "reserved" : ga(e.step) ? "validated" : "partial";
}
function Dn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Lm(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Am({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Le, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${T.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function xm(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Im(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const wn = (e) => String(e).padStart(2, "0");
function qm(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Dn(e, void 0);
}
function Mm({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${T.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${T.hex} ward-ladder-hex`, children: r ? `step ${wn(e)}` : Mt(e) }),
    /* @__PURE__ */ n("span", { className: `${T.note} ward-ladder-note`, children: r ? t : `Step ${wn(e)} · ${t}` })
  ] });
}
function Bm({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = Em(e), c = Dn(i, t), d = c !== "free", u = a === e.step, s = e.name ?? `Step ${e.step}`, h = () => {
    d || r(e.step);
  }, _ = `${s} · ${l === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...Im(d, u), "data-validation": i, style: Lm(e, i), onClick: h, onKeyDown: (q) => xm(q, h) }, label: _, name: s, holder: c, validation: i, note: qm(i, t, u), step: e.step };
}
const Pm = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${T.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${T.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Mm, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${T.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Am, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${T.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${T.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Om(e) {
  return Pm[e.presentation](Bm(e));
}
function Dm(e) {
  for (const a of e)
    if (!a.reserved && !pa(a.step)) throw new Error("colour ladder renders token steps only");
}
function Hm() {
  return /* @__PURE__ */ o("div", { className: `${T.cell} ward-ladder-cell ${T.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${T.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${T.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${T.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Fm(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const jm = { list: T.ladder, swatches: T.swatches, tiles: T.tilesFrame };
function Wm() {
  return /* @__PURE__ */ o("div", { className: `${T.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${T.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${T.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${T.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const zm = { list: Hm, swatches: () => null, tiles: Wm };
function Hn(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var d;
    (d = e.onChange) == null || d.call(e, c);
  };
  Dm(e.steps);
  const r = Fm(e), l = zm[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(Om, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${jm[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: T.tiles, children: i }) : i });
}
const Gm = "_rail_1el2t_2", Um = "_section_1el2t_12", Km = "_sectionFlush_1el2t_22", Vm = "_head_1el2t_26", Ym = "_headLabel_1el2t_34", Xm = "_sample_1el2t_42", Jm = "_sampleLabel_1el2t_47", Qm = "_sampleTitle_1el2t_54", Zm = "_sampleMeta_1el2t_59", ew = "_trace_1el2t_65", aw = "_traceHead_1el2t_70", nw = "_steps_1el2t_78", tw = "_step_1el2t_78", rw = "_stepTitle_1el2t_97", lw = "_hollow_1el2t_107", ow = "_stepBody_1el2t_115", iw = "_stepDetail_1el2t_127", cw = "_publish_1el2t_132", sw = "_reason_1el2t_138", dw = "_note_1el2t_143", uw = "_reveal_1el2t_148", p = {
  rail: Gm,
  section: Um,
  sectionFlush: Km,
  head: Vm,
  headLabel: Ym,
  sample: Xm,
  sampleLabel: Jm,
  sampleTitle: Qm,
  sampleMeta: Zm,
  trace: ew,
  traceHead: aw,
  steps: nw,
  step: tw,
  stepTitle: rw,
  hollow: lw,
  stepBody: ow,
  stepDetail: iw,
  publish: cw,
  reason: sw,
  note: dw,
  reveal: uw
}, _n = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, hw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, mw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, ww = { notSimulated: "not simulated", running: "running" };
function _w(e) {
  return e.presentation === "foundry";
}
function vw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function fw(e, a) {
  var r;
  const t = hw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function bw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function pw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function gw(e) {
  if (bw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Nw(e) {
  const [a, t] = g(!1);
  A(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function yw(e) {
  const a = ww[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Le, { size: 6, kind: mw[e.kind], label: e.kind });
}
function kw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function $w(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Cw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Nw, { kind: a.kind, children: [
    /* @__PURE__ */ n(yw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(kw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n($w, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Sw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ie(a)), t.join(" · ");
}
function Fn(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: Sw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Cw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Rw(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${p.sample} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ o("p", { className: p.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ o("p", { className: p.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Tw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ce(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Ew(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? $n(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ka, { divided: !0, cells: a }) });
}
function Lw(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: $n(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Aw(e) {
  const a = Lw(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ka, { divided: !0, cells: a }) });
}
function jn(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function xw(e) {
  return /* @__PURE__ */ o("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(jn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function Iw(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(jn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Wn(e) {
  return /* @__PURE__ */ o("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: _n[e.run.status].role, label: _n[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function qw(e, a) {
  const [t, r] = g(e.steps);
  return A(() => r(e.steps), [e.steps]), A(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var c, d;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((c = l.step) == null ? void 0 : c.label) ?? "step", detail: (d = l.step) == null ? void 0 : d.tool }];
        });
      });
  }, [a, e.status]), t;
}
function Mw(e) {
  var t;
  pw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Wn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Rw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Fn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Ew, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Sa, { items: e.checklist }) }),
    /* @__PURE__ */ n(xw, { reason: vw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Bw(e) {
  var r;
  const a = qw(e.run, e.feed);
  gw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Wn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Tw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Fn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Aw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Sa, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Iw, { reason: fw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function w$(e) {
  return _w(e) ? /* @__PURE__ */ n(Bw, { ...e }) : /* @__PURE__ */ n(Mw, { ...e });
}
const Pw = "_list_142ip_3", Ow = "_row_142ip_9", Dw = "_condition_142ip_18", Hw = "_action_142ip_24", oa = {
  list: Pw,
  row: Ow,
  condition: Dw,
  action: Hw
}, zn = Ve(!1);
function _$({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(zn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oa.list, "aria-label": a, children: e }) });
}
function v$({ rule: e }) {
  if (!Ke(zn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: oa.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: oa.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: oa.action, children: e.then })
  ] });
}
function Oa(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(t, 0, l), r;
}
function Gn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Un(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function vn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Fw(e) {
  return e === "up" ? "down" : "up";
}
function jw(e, a) {
  const t = vn(e, a.id, a.direction) ?? vn(e, a.id, Fw(a.direction));
  t == null || t.focus();
}
function Kn() {
  const e = N(null), [a, t] = g(null), [r, l] = g("");
  return A(() => {
    e.current !== null && a !== null && jw(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, d) => {
    t(c), l(d);
  } };
}
function Vn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ma({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Ww = "_body_1h15q_2", zw = "_title_1h15q_8", Gw = "_section_1h15q_13", Uw = "_legend_1h15q_18", Kw = "_stages_1h15q_26", Vw = "_stage_1h15q_26", Yw = "_stageIndex_1h15q_44", Xw = "_stageName_1h15q_50", Jw = "_footer_1h15q_59", Qw = "_note_1h15q_66", Zw = "_reason_1h15q_71", e_ = "_actions_1h15q_76", a_ = "_webHead_1h15q_83", n_ = "_kicker_1h15q_92", t_ = "_webTitle_1h15q_99", r_ = "_webBody_1h15q_105", l_ = "_webSection_1h15q_109", o_ = "_sectionHead_1h15q_121", i_ = "_sectionNote_1h15q_129", c_ = "_formLabel_1h15q_134", s_ = "_identityRow_1h15q_139", d_ = "_nameCell_1h15q_145", u_ = "_keyCell_1h15q_150", h_ = "_colourCell_1h15q_154", m_ = "_colourStatus_1h15q_161", w_ = "_webStages_1h15q_166", __ = "_webStageList_1h15q_172", v_ = "_webStage_1h15q_166", f_ = "_webIndex_1h15q_191", b_ = "_webStageName_1h15q_196", p_ = "_webMoves_1h15q_201", g_ = "_addStage_1h15q_215", N_ = "_addStageButton_1h15q_223", y_ = "_addStageNote_1h15q_231", k_ = "_webFooter_1h15q_236", $_ = "_webFooterNotes_1h15q_244", C_ = "_webNote_1h15q_251", w = {
  body: Ww,
  title: zw,
  section: Gw,
  legend: Uw,
  stages: Kw,
  stage: Vw,
  stageIndex: Yw,
  stageName: Xw,
  footer: Jw,
  note: Qw,
  reason: Zw,
  actions: e_,
  webHead: a_,
  kicker: n_,
  webTitle: t_,
  webBody: r_,
  webSection: l_,
  sectionHead: o_,
  sectionNote: i_,
  formLabel: c_,
  identityRow: s_,
  nameCell: d_,
  keyCell: u_,
  colourCell: h_,
  colourStatus: m_,
  webStages: w_,
  webStageList: __,
  webStage: v_,
  webIndex: f_,
  webStageName: b_,
  webMoves: p_,
  addStage: g_,
  addStageButton: N_,
  addStageNote: y_,
  webFooter: k_,
  webFooterNotes: $_,
  webNote: C_
}, S_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Yn = "not in catalogue";
function R_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Yn}` }, ...t];
}
function T_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(L, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Yn}`;
  return /* @__PURE__ */ n(L, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: R_(t, e.name), invalid: i, onChange: r });
}
function Xn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function E_(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function L_({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: c }) {
  const d = Xn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(T_, { stage: a, index: t, catalogue: l, onName: (s) => i({ ...a, name: s }) }) }),
    /* @__PURE__ */ n(L, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: S_, onChange: (s) => i({ ...a, kind: s }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ma, { id: e, name: d, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ma, { id: e, name: d, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function A_({ stages: e, onChange: a, catalogue: t }) {
  const r = E_(e.length), l = Kn(), i = (d, u) => {
    const s = Gn(d, u);
    r.current = Oa(r.current, d, s), l.moved({ id: r.current[s], direction: u }, Un(Xn(e[d], d), s, e.length)), a(Oa(e, d, s));
  }, c = (d, u) => a(e.map((s, h) => h === d ? u : s));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((d, u) => /* @__PURE__ */ n(L_, { id: r.current[u], stage: d, index: u, total: e.length, catalogue: t, onReplace: (s) => c(u, s), onMove: (s) => i(u, s) }, r.current[u])) }),
    /* @__PURE__ */ n(Vn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const x_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], I_ = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], q_ = "A new stream starts as a draft. Nothing runs on it until you publish it.", M_ = "Create is disabled: name the stream and give it a key first.", B_ = "reorder with the ↑ ↓ buttons · min 2";
function Ka(e, a) {
  return !e.reserved && ga(e.step) && a[e.step] === void 0;
}
function P_(e, a) {
  const t = e.find((r) => Ka(r, a));
  return t ? t.step : 1;
}
function O_({ stages: e, onMove: a }) {
  const t = Kn(), r = (l, i) => {
    const c = Gn(l, i);
    t.moved({ id: e[l].id, direction: i }, Un(e[l].name, c, e.length)), a(l, c);
  };
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ma, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ma, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Vn, { text: t.announcement })
  ] });
}
function D_({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: q_ }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function H_(e, a) {
  return e !== "" && a !== "" ? null : M_;
}
function F_(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = I_, onCreate: i, onDraft: c, onClose: d, returnFocusTo: u } = e, s = k(), [h, _] = g(""), [b, q] = g(""), [K, V] = g(a[0].value), [le, $e] = g(() => P_(t, r)), [ee, De] = g(e.stages ?? x_), [He, $] = g(l[0].value), j = { name: h, key: b, streamStep: le, owner: K, stages: ee, policy: He }, _e = H_(h, b);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: s, onClose: d, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: s, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Stream name", value: h, onChange: _ }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Key", value: b, onChange: q, mono: !0 }),
      /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: K, onChange: V, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Hn, { label: "Stream colour", steps: t, value: le, onChange: $e, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(O_, { stages: ee, onMove: (Ae, ft) => De(Oa(ee, Ae, ft)) })
    ] }),
    /* @__PURE__ */ n(xn, { legend: "Loop policy", options: l, value: He, onChange: $ }),
    /* @__PURE__ */ n(D_, { reason: _e, onCreate: () => i(j), onDraft: () => c(j) })
  ] }) });
}
const Jn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], j_ = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function W_(e, a, t, r, l, i) {
  var d;
  const c = ((d = Jn.find((u) => u.value === l)) == null ? void 0 : d.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function z_(e, a) {
  return G_(e) && U_(e, a) && K_(e);
}
function G_(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function U_(e, a) {
  return e.colourStep !== null && Ka({ step: e.colourStep }, a);
}
function K_(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function V_(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${Tm}.` : Ka({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Y_({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function X_({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Y_, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: j_ })
    ] }),
    l && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function J_({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function Q_({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(L, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(L, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function Z_(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [l, i] = g(""), [c, d] = g(""), [u, s] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, q] = g("relay"), [K, V] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = W_(l, c, u, h, b, K), $e = z_(le, r), ee = K.find(($) => $.kind === "agent" && $.name.trim() !== ""), De = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Hn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), He = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: V_(h, r) }),
    /* @__PURE__ */ n(L, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: s })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(J_, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(Q_, { name: l, setName: i, streamKey: c, setKey: d, colour: De, owner: He }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: B_ })
        ] }),
        /* @__PURE__ */ n(A_, { stages: K, onChange: V })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(xn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Jn, onChange: q }) }),
      /* @__PURE__ */ n(X_, { ready: $e, draft: le, agentStage: ee, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function f$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Z_, { ...e }) : /* @__PURE__ */ n(F_, { ...e });
}
const ev = "_row_bs8hc_2", av = "_cell_bs8hc_6", nv = "_condition_bs8hc_11", tv = "_action_bs8hc_18", rv = "_contract_bs8hc_24", lv = "_contractCondition_bs8hc_33", ov = "_contractAction_bs8hc_39", J = {
  row: ev,
  cell: av,
  condition: nv,
  action: tv,
  contract: rv,
  contractCondition: lv,
  contractAction: ov
}, Qn = ["advance", "block", "escalate", "requestReview"], fn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function wa(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Va(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: J.action, children: fn[e.then] }) : /* @__PURE__ */ n(
    L,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: Qn.map((l) => ({ value: l, label: fn[l] }))
    }
  );
}
function iv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: J.condition, title: wa(e, r), children: wa(e, r) }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: Va(e, a, t) })
  ] });
}
function cv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: J.row, children: [
    /* @__PURE__ */ o("td", { className: J.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: J.condition, children: wa(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: J.cell, children: Va(e, a, t) })
  ] });
}
function sv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: J.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: J.contractCondition, children: wa(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: J.contractAction, children: Va(e, a, t, !0) })
  ] });
}
const dv = { two: cv, four: iv, contract: sv };
function b$(e) {
  var t;
  if (!Qn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = dv[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const uv = "_column_lurgk_2", hv = "_head_lurgk_17", mv = "_index_lurgk_23", wv = "_name_lurgk_29", _v = "_meta_lurgk_38", vv = "_mono_lurgk_43", fv = "_gate_lurgk_50", bv = "_reviewersLabel_lurgk_57", pv = "_reviewers_lurgk_57", gv = "_reviewer_lurgk_57", Nv = "_agents_lurgk_74", yv = "_workflowColumn_lurgk_79", kv = "_workflowHead_lurgk_96", $v = "_stageRow_lurgk_102", Cv = "_stageLabel_lurgk_109", Sv = "_workflowTitle_lurgk_116", Rv = "_workflowMeta_lurgk_122", Tv = "_workflowGate_lurgk_127", Ev = "_gateNote_lurgk_135", Lv = "_cardNote_lurgk_140", Av = "_reviewerList_lurgk_149", xv = "_reviewerRow_lurgk_155", Iv = "_reviewerMark_lurgk_161", qv = "_reviewerName_lurgk_171", Mv = "_terminalCard_lurgk_177", Bv = "_terminalCount_lurgk_186", Pv = "_workflowAgents_lurgk_192", Ov = "_mount_lurgk_198", y = {
  column: uv,
  head: hv,
  index: mv,
  name: wv,
  meta: _v,
  mono: vv,
  gate: fv,
  reviewersLabel: bv,
  reviewers: pv,
  reviewer: gv,
  agents: Nv,
  workflowColumn: yv,
  workflowHead: kv,
  stageRow: $v,
  stageLabel: Cv,
  workflowTitle: Sv,
  workflowMeta: Rv,
  workflowGate: Tv,
  gateNote: Ev,
  cardNote: Lv,
  reviewerList: Av,
  reviewerRow: xv,
  reviewerMark: Iv,
  reviewerName: qv,
  terminalCard: Mv,
  terminalCount: Bv,
  workflowAgents: Pv,
  mount: Ov
}, Dv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Ya(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Zn(e) {
  return `${Math.round(e * 100)}%`;
}
function Hv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ka, { cells: [
      { value: Zn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: Z(e.count), label: "In stage" }
    ] })
  ] });
}
function Fv({ stage: e }) {
  return /* @__PURE__ */ n(ka, { cells: [
    { value: Z(e.count), label: "In stage" },
    { value: Ya(e.closedThisWeek, Z), label: "Closed this week" }
  ] });
}
function jv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: Dv[e.kind] })
  ] });
}
function Wv({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: y.meta, children: [
    /* @__PURE__ */ o("span", { className: y.mono, children: [
      Z(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: y.mono, children: [
      ie(e.medianWait),
      " median wait"
    ] })
  ] });
}
function zv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Hv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Fv, { stage: e }) : null;
}
function Gv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Uv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: y.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(jv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(Wv, { stage: e }),
    /* @__PURE__ */ n(zv, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(Qh, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(Gv, { onMount: t })
  ] });
}
const Kv = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function Vv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function Yv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Vv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Zn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Xv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Jv({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: Ya(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: Xv(e.rolledBackThisWeek) })
  ] });
}
function Qv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Zv(e) {
  if (e.kind === "terminal") return `${Ya(e.closedThisWeek)} this week`;
  const a = Qv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function ef({ stage: e, titleId: a }) {
  const t = Kv[e.kind];
  return /* @__PURE__ */ o("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: y.stageRow, children: [
      /* @__PURE__ */ o("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: Zv(e) })
  ] });
}
function af(e) {
  return e === "entry" || e === "agent";
}
function nf({ stage: e, onMount: a }) {
  return a === void 0 || !af(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function tf({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ o("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(ef, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Yv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Jv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(nf, { stage: e, onMount: t })
  ] });
}
function rf(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function p$(e) {
  return rf(e) ? /* @__PURE__ */ n(tf, { ...e }) : /* @__PURE__ */ n(Uv, { ...e });
}
const lf = "_row_ve78g_6", of = "_cell_ve78g_10", cf = "_name_ve78g_19", sf = "_chain_ve78g_26", df = "_owner_ve78g_32", uf = "_mono_ve78g_38", hf = "_compactRow_ve78g_45", mf = "_compactCell_ve78g_54", wf = "_stack_ve78g_71", _f = "_stat_ve78g_78", vf = "_identityLine_ve78g_85", ff = "_identity_ve78g_85", bf = "_compactName_ve78g_103", pf = "_ownerLine_ve78g_117", gf = "_link_ve78g_130", Nf = "_emptyChain_ve78g_136", yf = "_arrow_ve78g_142", kf = "_muted_ve78g_143", $f = "_define_ve78g_148", Cf = "_statValue_ve78g_155", Sf = "_policyId_ve78g_161", Rf = "_sub_ve78g_166", f = {
  row: lf,
  cell: of,
  name: cf,
  chain: sf,
  owner: df,
  mono: uf,
  compactRow: hf,
  compactCell: mf,
  stack: wf,
  stat: _f,
  identityLine: vf,
  identity: ff,
  compactName: bf,
  ownerLine: pf,
  link: gf,
  emptyChain: Nf,
  arrow: yf,
  muted: kf,
  define: $f,
  statValue: Cf,
  policyId: Sf,
  sub: Rf
};
function Tf(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Ef(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function et(e) {
  return `${Z(e)} ${e === 1 ? "member" : "members"}`;
}
function Lf(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${et(e.members)}`;
}
function Af(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ o("span", { className: f.stack, children: [
    /* @__PURE__ */ o("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: F(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Lf(e) })
  ] }) });
}
function xf(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function If(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: F(a), children: "Define workflow" })
  ] }) : xf(e) });
}
function bn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, title: r, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function qf(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function Mf(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Bf({ stream: e, href: a, presentation: t }) {
  const r = Ef(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ee(e.streamStep, "chip") }, children: [
    Af(e, a),
    If(e.stages, a),
    bn(Mf(e.agents), e.agents === void 0 ? void 0 : Tf(e.agents), "—"),
    qf(e.policy),
    bn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Pf(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function g$(e) {
  if (Pf(e)) return Bf(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: f.row, children: [
    /* @__PURE__ */ o("td", { className: f.cell, children: [
      /* @__PURE__ */ n("a", { className: f.name, href: F(t), children: a.name }),
      /* @__PURE__ */ n(m, { ...ya(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, children: /* @__PURE__ */ n("span", { className: f.chain, children: a.stages.map((r) => /* @__PURE__ */ n(m, { role: r.gate ? "gate" : "soft", label: r.name }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, children: /* @__PURE__ */ o("span", { className: f.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: f.cell, children: [
      /* @__PURE__ */ n("span", { className: f.owner, children: a.owner }),
      /* @__PURE__ */ n("span", { className: f.mono, children: et(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, title: a.inFlightHint, children: Z(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : ie(a.p50) }) })
  ] });
}
const Of = "_row_mdce7_2", Df = "_name_mdce7_16", Hf = "_scope_mdce7_24", _a = {
  row: Of,
  name: Df,
  scope: Hf
};
function Ff(e) {
  return e === void 0 ? `${_a.row} ward-toolrow` : `${_a.row} ward-toolrow ${e}`;
}
function jf(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Wf({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function zf({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Gf({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${_a.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Uf(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function N$({ tool: e, onChange: a, presentation: t }) {
  const r = k(), l = k(), i = jf(e, t), c = Uf(t);
  return /* @__PURE__ */ o(c, { className: Ff(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Wf, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${_a.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Gf, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(zf, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Kf = "_strip_1qtlf_2", Vf = "_head_1qtlf_10", Yf = "_name_1qtlf_16", Xf = "_chart_1qtlf_24", Jf = "_segment_1qtlf_30", Qf = "_detailedChart_1qtlf_36", Zf = "_rail_1qtlf_49", eb = "_section_1qtlf_55", ab = "_label_1qtlf_66", nb = "_note_1qtlf_83", Q = {
  strip: Kf,
  head: Vf,
  name: Yf,
  chart: Xf,
  segment: Jf,
  detailedChart: Qf,
  rail: Zf,
  section: eb,
  label: ab,
  note: nb
}, tb = "No item in flight to preview.", rb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", lb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Da = [1, 2, 3, 4, 5, 6], va = 100;
function ob(e, a) {
  return a.has(e) ? Ee(e, "id") : "var(--ward-color-line)";
}
function ib({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: Q.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Da.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: Q.segment,
      x: l * va,
      y: "0",
      width: va,
      height: "8",
      fill: ob(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function cb(e) {
  const a = e.slice(0, Da.length);
  for (; a.length < Da.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function sb({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${Q.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * va),
        y: "0",
        width: String(va),
        height: "40",
        style: { fill: Ee(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function at(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ta({ label: e, children: a }) {
  const t = k();
  return /* @__PURE__ */ o("section", { className: Q.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: Q.label, children: e }),
    a
  ] });
}
function db({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: Q.note, children: a ?? tb }) : /* @__PURE__ */ n(Ca, { item: { ...e, streamStep: Na(t.streamStep) }, onOpen: at(r), feed: null });
}
function ub({ draft: e }) {
  const a = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: Q.head, style: a, children: [
    /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: Q.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...ya(e.key, e.streamStep) })
  ] });
}
function hb(e) {
  const a = cb(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: Q.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ta, { label: "Board card", children: /* @__PURE__ */ n(db, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ta, { label: "Streams index row", children: /* @__PURE__ */ n(ub, { draft: t }) }),
    /* @__PURE__ */ o(ta, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(sb, { identities: a }),
      /* @__PURE__ */ n("p", { className: Q.note, children: rb })
    ] }),
    /* @__PURE__ */ n(ta, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: Q.note, children: lb }) })
  ] });
}
function mb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: Q.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: Q.head, children: [
      /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: Q.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...ya(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(Ca, { item: { ...a, streamStep: e.streamStep }, onOpen: at(r) }),
    /* @__PURE__ */ n(ib, { draft: e, streams: t })
  ] });
}
function y$(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(hb, { ...e }) : /* @__PURE__ */ n(mb, { ...e });
}
const wb = "_row_ixlg5_6", _b = "_headCell_ixlg5_10", vb = "_cell_ixlg5_11", fb = "_name_ixlg5_23", bb = "_consequence_ixlg5_29", pb = "_governed_ixlg5_36", gb = "_control_ixlg5_42", Nb = "_byRole_ixlg5_48", yb = "_webControl_ixlg5_59", kb = "_webConsequence_ixlg5_65", $b = "_webGoverned_ixlg5_71", P = {
  row: wb,
  headCell: _b,
  cell: vb,
  name: fb,
  consequence: bb,
  governed: pb,
  control: gb,
  byRole: Nb,
  webControl: yb,
  webConsequence: kb,
  webGoverned: $b
};
function Cb({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: P.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: P.control, children: [
    /* @__PURE__ */ n(
      Oe,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "PILOT" })
  ] });
}
function Sb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: P.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(Cb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Rb(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Tb({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Oe,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (l) => t == null ? void 0 : t(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${P.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "PILOT" }),
    r
  ] });
}
function Eb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(Tb, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: Rb(e) }) })
  ] });
}
function k$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Eb, { ...e }) : /* @__PURE__ */ n(Sb, { ...e });
}
const Lb = "_row_vv64h_2", Ab = "_cell_vv64h_6", xb = "_name_vv64h_25", Ib = "_note_vv64h_30", qb = "_webName_vv64h_41", Mb = "_webMeta_vv64h_47", G = {
  row: Lb,
  cell: Ab,
  name: xb,
  note: Ib,
  webName: qb,
  webMeta: Mb
}, nt = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Bb(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Pb({ component: e, onRestart: a }) {
  const t = k(), r = nt[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: G.row, children: [
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: G.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: G.cell, "data-mono": "true", children: [
      Z(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { id: t, className: G.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: G.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(v, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Ob({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: Bb(e.state) });
}
function Db({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: G.row, children: [
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: `${G.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: `${G.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(m, { ...nt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(Ob, { component: e, onRestart: a }) })
  ] });
}
function $$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Db, { ...e }) : /* @__PURE__ */ n(Pb, { ...e });
}
const Hb = "_row_1f1gp_7", Fb = "_cell_1f1gp_11", jb = "_next_1f1gp_28", Wb = "_headCell_1f1gp_38", zb = "_webId_1f1gp_77", Gb = "_webPurpose_1f1gp_83", Ub = "_webMeta_1f1gp_91", Kb = "_webUrgent_1f1gp_97", D = {
  row: Hb,
  cell: Fb,
  next: jb,
  headCell: Wb,
  webId: zb,
  webPurpose: Gb,
  webMeta: Ub,
  webUrgent: Kb
}, Vb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Yb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, tt = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Xb = Object.fromEntries(tt.map((e) => [e.key, e]));
function je({ column: e, children: a }) {
  const t = Xb[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: D.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function C$() {
  return /* @__PURE__ */ n("tr", { children: tt.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: D.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function Jb({ cred: e }) {
  const a = Vb[e.state];
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ n(je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(je, { column: "id", children: e.id }),
    /* @__PURE__ */ n(je, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(je, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(je, { column: "next", children: /* @__PURE__ */ n("span", { className: D.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Qb({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ${D.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function Zb({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Qb, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...Yb[e.state] }) })
  ] });
}
function S$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Zb, { ...e }) : /* @__PURE__ */ n(Jb, { ...e });
}
const ep = "_card_17zba_2", ap = "_head_17zba_11", np = "_env_17zba_18", tp = "_version_17zba_25", rp = "_meta_17zba_32", lp = "_webCard_17zba_37", op = "_webRow_17zba_47", ip = "_webTitle_17zba_55", cp = "_webLine_17zba_65", sp = "_webVersion_17zba_72", dp = "_webMeta_17zba_77", z = {
  card: ep,
  head: ap,
  env: np,
  version: tp,
  meta: rp,
  webCard: lp,
  webRow: op,
  webTitle: ip,
  webLine: cp,
  webVersion: sp,
  webMeta: dp
}, rt = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function up({ env: e }) {
  const a = rt[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: z.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ o("div", { className: z.head, children: [
      /* @__PURE__ */ n("span", { className: z.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: z.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: z.meta, children: [
      "deployed ",
      ce(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: z.meta, children: t })
  ] });
}
function hp(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ce(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function mp(e) {
  return /* @__PURE__ */ o("article", { className: `${z.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${z.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${z.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...rt[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${z.version} ${z.webVersion} ${z.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${z.meta} ${z.webMeta} ${z.webLine} ward-cellmeta`, children: hp(e) })
  ] });
}
function R$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(mp, { ...e }) : /* @__PURE__ */ n(up, { ...e });
}
const wp = "_panel_1hmja_2", _p = "_line_1hmja_8", vp = "_actions_1hmja_14", ra = {
  panel: wp,
  line: _p,
  actions: vp
};
function T$(e) {
  return /* @__PURE__ */ o("div", { className: ra.panel, children: [
    /* @__PURE__ */ n("p", { className: ra.line, children: e.status }),
    /* @__PURE__ */ n(L, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ra.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ra.line, children: e.note ?? "" })
  ] });
}
const fp = "_upload_erepj_2", bp = "_preview_erepj_7", pp = "_mark_erepj_17", gp = "_empty_erepj_22", Np = "_actions_erepj_28", yp = "_input_erepj_33", kp = "_reasons_erepj_41", $p = "_reason_erepj_41", Cp = "_accepted_erepj_57", ae = {
  upload: fp,
  preview: bp,
  mark: pp,
  empty: gp,
  actions: Np,
  input: yp,
  reasons: kp,
  reason: $p,
  accepted: Cp
}, lt = 1.5, ot = 22, fa = "script elements or event handlers", Se = "links or external references", ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${lt}px at ${ot}px`], Sp = [ye[1], ye[2], fa, Se], Rp = /* @__PURE__ */ new Map([
  ["image", ye[1]],
  ["text", ye[2]],
  ["tspan", ye[2]],
  ["textPath", ye[2]],
  ["script", fa],
  ["foreignObject", fa],
  ["a", Se],
  ["use", Se],
  ["style", Se],
  ["feImage", Se],
  ["set", Se]
]), Tp = "http://www.w3.org/2000/svg", Ep = "http://www.w3.org/2000/xmlns/", Lp = /* @__PURE__ */ new Set([
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
]), Ap = /* @__PURE__ */ new Set([
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
]), xp = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, Ip = /url\s*\(|['"\\]/i;
function qp() {
  return { ok: !1, reasons: [ye[1]] };
}
function it(e) {
  return e.namespaceURI === Tp || e.namespaceURI === null;
}
function Mp(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && it(a) ? a : null;
  } catch {
    return null;
  }
}
function Bp(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [ye[0]] : [];
}
function Pp(e) {
  return Rp.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function Op(e) {
  return Ip.test(e.replace(xp, ""));
}
function Dp(e) {
  return /^on/i.test(e.localName) ? fa : e.localName === "href" || Op(e.value) ? Se : void 0;
}
function Hp(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(Pp(t));
    for (const r of Array.from(t.attributes)) a.add(Dp(r));
  }
  return Sp.filter((t) => a.has(t));
}
function Fp(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? ot / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < lt;
  }) ? [ye[3]] : [];
}
function jp(e) {
  if (e.namespaceURI === Ep) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Ap.has(a) || a.startsWith("stroke"));
}
function Wp(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && it(a) && Lp.has(a.localName);
}
function zp(e, a) {
  Wp(a) ? a.nodeType === Node.ELEMENT_NODE && ct(a) : e.removeChild(a);
}
function ct(e) {
  for (const a of Array.from(e.attributes)) jp(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) zp(e, a);
  return e;
}
function E$(e) {
  const a = Mp(e);
  if (a === null) return qp();
  const t = [...Bp(a), ...Hp(a), ...Fp(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(ct(a)) };
}
const Gp = "Mark accepted.";
function Up({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: ae.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: ae.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: ae.empty }) });
}
function Kp(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Vp(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Yp({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: ae.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: ae.result, role: "status", children: /* @__PURE__ */ n("p", { className: ae.accepted, children: Gp }) }) : /* @__PURE__ */ n("div", { className: ae.result, role: "status", children: /* @__PURE__ */ n("ul", { className: ae.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: ae.reason, children: a }, a)) }) });
}
function Xp({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Yp, { result: e }) : /* @__PURE__ */ n("p", { className: `${ae.result} ${Kp(e, t)}`, role: "status", children: Vp(e, t) });
}
function L$({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = N(null), [i, c] = g(null), d = (u) => {
    if (u === void 0) return;
    const s = a(u);
    s instanceof Promise ? s.then(c) : c(s);
  };
  return /* @__PURE__ */ o("div", { className: ae.upload, children: [
    /* @__PURE__ */ n(Up, { current: e }),
    /* @__PURE__ */ o("div", { className: ae.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: l,
          className: ae.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          onChange: (u) => {
            var s;
            return d((s = u.target.files) == null ? void 0 : s[0]);
          }
        }
      ),
      /* @__PURE__ */ n(v, { onClick: () => {
        var u;
        return (u = l.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(v, { variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(Xp, { result: i, presentation: r })
  ] });
}
const Jp = "_row_1wp9s_7", Qp = "_cell_1wp9s_11", Zp = "_head_1wp9s_28", eg = "_name_1wp9s_34", ag = "_pinned_1wp9s_42", ng = "_headCell_1wp9s_49", tg = "_webName_1wp9s_88", rg = "_webMeta_1wp9s_95", lg = "_webWarn_1wp9s_103", x = {
  row: Jp,
  cell: Qp,
  head: Zp,
  name: eg,
  pinned: ag,
  headCell: ng,
  webName: tg,
  webMeta: rg,
  webWarn: lg
}, Xa = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, st = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], og = Object.fromEntries(st.map((e) => [e.key, e]));
function ig(e, a) {
  return `mcp.${e}.${a}`;
}
function cg(e) {
  return Object.keys(Xa).includes(e);
}
function sg(e) {
  return Xa[e !== void 0 && cg(e) ? e : "unknown"];
}
function Ye({ column: e, children: a }) {
  const t = og[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: x.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function A$() {
  return /* @__PURE__ */ n("tr", { children: st.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: x.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function dg({ server: e }) {
  const a = Xa[e.connection];
  return /* @__PURE__ */ o("tr", { className: x.row, children: [
    /* @__PURE__ */ o(Ye, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: x.head, children: [
        /* @__PURE__ */ n("span", { className: x.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: x.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(Ye, { column: "connection", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ye, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(Ye, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(Ye, { column: "tools", children: e.tools.map((t) => ig(e.name, t)).join(" · ") })
  ] });
}
function ug(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function hg(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function mg({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${x.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${x.webMeta} ward-cellmeta`, children: e });
}
function wg({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${x.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function _g({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function vg({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: x.row, children: [
    /* @__PURE__ */ o("td", { className: x.cell, children: [
      /* @__PURE__ */ n("span", { className: `${x.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${x.webMeta} ward-cellmeta`, children: ug(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: x.cell, children: /* @__PURE__ */ n("span", { className: `${x.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: x.cell, children: /* @__PURE__ */ n(m, { ...hg(e) }) }),
    /* @__PURE__ */ n("td", { className: x.cell, children: /* @__PURE__ */ n(mg, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: x.cell, children: /* @__PURE__ */ n(m, { ...sg(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: x.cell, children: [
      /* @__PURE__ */ n(wg, { server: e, onRestart: a }),
      /* @__PURE__ */ n(_g, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function x$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(vg, { ...e }) : /* @__PURE__ */ n(dg, { ...e });
}
const fg = "_row_1h9nq_2", bg = "_headCell_1h9nq_14", pg = "_cell_1h9nq_15", gg = "_name_1h9nq_26", Ng = "_consequence_1h9nq_32", yg = "_reason_1h9nq_38", kg = "_value_1h9nq_44", $g = "_webRow_1h9nq_60", Cg = "_webSetting_1h9nq_71", Sg = "_webName_1h9nq_79", Rg = "_webConsequence_1h9nq_87", Tg = "_webControl_1h9nq_93", Eg = "_webState_1h9nq_106", Lg = "_webChip_1h9nq_111", E = {
  row: fg,
  headCell: bg,
  cell: pg,
  name: gg,
  consequence: Ng,
  reason: yg,
  value: kg,
  webRow: $g,
  webSetting: Cg,
  webName: Sg,
  webConsequence: Rg,
  webControl: Tg,
  webState: Eg,
  webChip: Lg
}, dt = 104, ut = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Ag({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Oe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(En, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: E.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function xg({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = k(), i = ut[t], c = t === "locked";
  return /* @__PURE__ */ o("tr", { className: E.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ n("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: E.cell, children: /* @__PURE__ */ n(Ag, { control: a, name: e.name, locked: c, describedBy: c ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: E.cell, style: { width: dt }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function ht(e, a) {
  return String(e ?? a);
}
function Ig(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function qg(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? ht(e.value, "—");
}
function Mg({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: E.webControl, children: [
    /* @__PURE__ */ n(Oe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => l == null ? void 0 : l(c) }),
    /* @__PURE__ */ n("span", { className: E.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function Bg(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(Mg, { ...e });
  const l = Ig(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(En, { options: l, value: ht(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: qg(a) });
}
function Pg({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const c = k(), d = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: E.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: c, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: E.webControl, children: i(c) }) : /* @__PURE__ */ n(Bg, { control: a, name: e.name, locked: d, describedBy: d ? c : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${E.webChip} ward-policy-chip`, style: { width: dt }, children: /* @__PURE__ */ n(m, { ...ut[t], size: "tag" }) })
  ] });
}
function I$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Pg, { ...e }) : /* @__PURE__ */ n(xg, { ...e });
}
const Og = "_label_1o9za_7", Dg = "_name_1o9za_15", Hg = "_column_1o9za_24", Fg = "_webFrame_1o9za_57", jg = "_webHead_1o9za_62", Wg = "_webHeadLabel_1o9za_74", zg = "_webLabel_1o9za_112", Gg = "_webColumns_1o9za_119", Ug = "_webGroup_1o9za_125", Kg = "_webPeople_1o9za_126", Vg = "_webVia_1o9za_127", Yg = "_webMeta_1o9za_156", H = {
  label: Og,
  name: Dg,
  column: Hg,
  webFrame: Fg,
  webHead: jg,
  webHeadLabel: Wg,
  webLabel: zg,
  webColumns: Gg,
  webGroup: Ug,
  webPeople: Kg,
  webVia: Vg,
  webMeta: Yg
}, Xg = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, Aa = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function xa({ column: e, children: a }) {
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
function Jg(e) {
  if (!e.matrixRole) return;
  const a = Xg[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Qg({ node: e }) {
  const a = Jg(e);
  return /* @__PURE__ */ o("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(Zg, { role: a, node: e }),
    /* @__PURE__ */ n(xa, { column: Aa[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(xa, { column: Aa[1], children: e.people === void 0 ? "" : Z(e.people) }),
    /* @__PURE__ */ n(xa, { column: Aa[2], children: e.requestedVia ?? "" })
  ] });
}
function Zg({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function eN({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    qn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(Qg, { node: t }),
      children: c
    }
  );
}
function Ia({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function aN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Ia, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Ia, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Ia, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function nN() {
  return /* @__PURE__ */ o("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function tN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function rN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function lN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(nN, {}),
    /* @__PURE__ */ n(ts, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      qn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(tN, { row: t }),
        detail: /* @__PURE__ */ n(aN, { row: t }),
        expanded: rN(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function q$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(lN, { ...e }) : /* @__PURE__ */ n(eN, { ...e });
}
const oN = "_runbook_b9agc_2", iN = "_list_b9agc_7", cN = "_step_b9agc_15", sN = "_numeral_b9agc_21", dN = "_body_b9agc_28", uN = "_head_b9agc_34", hN = "_title_b9agc_40", mN = "_detail_b9agc_45", wN = "_actions_b9agc_50", _N = "_webList_b9agc_56", vN = "_webStep_b9agc_60", fN = "_webBody_b9agc_66", bN = "_webTitle_b9agc_74", pN = "_webDetail_b9agc_78", R = {
  runbook: oN,
  list: iN,
  step: cN,
  numeral: sN,
  body: dN,
  head: uN,
  title: hN,
  detail: mN,
  actions: wN,
  webList: _N,
  webStep: vN,
  webBody: fN,
  webTitle: bN,
  webDetail: pN
}, mt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function wt(e) {
  return String(e + 1).padStart(2, "0");
}
function gN({ step: e, index: a, connection: t }) {
  const r = mt[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: R.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: R.numeral, children: wt(a) }),
    /* @__PURE__ */ o("span", { className: R.body, children: [
      /* @__PURE__ */ o("span", { className: R.head, children: [
        /* @__PURE__ */ n("span", { className: R.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: R.detail, children: e.detail })
    ] })
  ] });
}
function NN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: R.runbook, children: [
    /* @__PURE__ */ n("ol", { className: R.list, children: e.map((r, l) => /* @__PURE__ */ n(gN, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: R.actions, children: a })
  ] });
}
function yN({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${R.step} ${R.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${R.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: wt(a) }),
    /* @__PURE__ */ o("span", { className: `${R.body} ${R.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${R.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${R.title} ${R.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...mt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${R.detail} ${R.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function kN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: R.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${R.list} ${R.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(yN, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${R.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function M$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(kN, { ...e }) : /* @__PURE__ */ n(NN, { ...e });
}
const $N = "_list_1gu6a_2", CN = "_check_1gu6a_10", SN = "_body_1gu6a_16", RN = "_text_1gu6a_23", TN = "_pending_1gu6a_32", EN = "_measured_1gu6a_37", ze = {
  list: $N,
  check: CN,
  body: SN,
  text: RN,
  pending: TN,
  measured: EN
};
function LN(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function AN({ check: e }) {
  const a = LN(e.passed);
  return /* @__PURE__ */ o("li", { className: `${ze.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Ga, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: ze.body, children: [
      /* @__PURE__ */ n("span", { className: ze.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: ze.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: ze.measured, children: e.measured })
  ] });
}
function B$({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(AN, { check: a }, a.text)) });
}
const xN = "_root_16pdz_2", IN = "_list_16pdz_9", qN = "_line_16pdz_16", MN = "_at_16pdz_43", BN = "_text_16pdz_47", PN = "_foot_16pdz_51", ON = "_idle_16pdz_62", DN = "_caret_16pdz_69", HN = "_jump_16pdz_76", pe = {
  root: xN,
  list: IN,
  line: qN,
  at: MN,
  text: BN,
  foot: PN,
  idle: ON,
  caret: DN,
  jump: HN
}, FN = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Ja(e) {
  return Number.isNaN(Date.parse(e)) ? "" : FN.format(new Date(e));
}
const jN = { warn: "warning", ok: "ok" };
function WN({ kind: e }) {
  const a = jN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function zN({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Ja(e)}` });
}
function GN({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Ja(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${pe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${pe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: pe.idle, children: i }),
    /* @__PURE__ */ n(zN, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function P$({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = N(null), [i, c] = g(0), d = e.at(-1);
  A(() => {
    c(e.length);
  }, [e.length]);
  const u = () => {
    var _;
    const s = l.current;
    if (!s) return;
    s.scrollTop = s.scrollHeight;
    const h = s.querySelectorAll("[data-consline-text]");
    (_ = h.item(h.length - 1)) == null || _.focus();
  };
  return /* @__PURE__ */ o("div", { className: pe.root, children: [
    /* @__PURE__ */ n("ol", { className: pe.list, ref: l, "aria-live": "off", "aria-label": r, children: e.map((s, h) => /* @__PURE__ */ o("li", { className: `${pe.line} ward-consline ward-reveal ward-consline--${s.kind}`, "data-kind": s.kind, "data-revealed": h < i, children: [
      /* @__PURE__ */ n("span", { className: pe.at, children: Ja(s.at) }),
      /* @__PURE__ */ n(WN, { kind: s.kind }),
      /* @__PURE__ */ n("span", { className: pe.text, "data-consline-text": !0, tabIndex: -1, children: s.text })
    ] }, `${s.at}-${h}`)) }),
    /* @__PURE__ */ n(GN, { connection: a, idleSince: t, last: d, children: /* @__PURE__ */ n("button", { type: "button", className: `${pe.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const UN = "_row_11jhe_2", KN = "_head_11jhe_14", VN = "_author_11jhe_20", YN = "_eta_11jhe_25", XN = "_edited_11jhe_26", JN = "_body_11jhe_32", QN = "_reason_11jhe_37", ZN = "_actions_11jhe_42", fe = {
  row: UN,
  head: KN,
  author: VN,
  eta: YN,
  edited: XN,
  body: JN,
  reason: QN,
  actions: ZN
}, ey = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function ay(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function ny({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function ty({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: fe.reason, id: a, children: e })
  ] });
}
function ry(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function ly(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(ny, { ...e }) : /* @__PURE__ */ n(ty, { reason: e.unavailable, reasonId: e.unavailableId });
}
function O$(e) {
  const { comment: a } = e;
  ry(e);
  const t = k(), r = `${t}-unavailable`, l = ey[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${fe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: fe.head, children: [
      /* @__PURE__ */ n("span", { className: fe.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: fe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: fe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: fe.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: fe.reason, id: t, children: ay(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: fe.actions, children: /* @__PURE__ */ n(ly, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const oy = "_root_c46wj_2", iy = "_attach_c46wj_11", cy = "_actions_c46wj_17", sy = "_reply_c46wj_23", dy = "_replyRow_c46wj_28", uy = "_sendsAs_c46wj_42", Ue = {
  root: oy,
  attach: iy,
  actions: cy,
  reply: sy,
  replyRow: dy,
  sendsAs: uy
};
function hy({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = g(""), i = k();
  return /* @__PURE__ */ o("div", { className: Ue.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ue.replyRow, children: [
      /* @__PURE__ */ n(L, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ue.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function D$(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(hy, { ...e }) : /* @__PURE__ */ n(my, { ...e });
}
function my({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [c, d] = g("");
  return /* @__PURE__ */ o("div", { className: Ue.root, children: [
    /* @__PURE__ */ n(L, { kind: "textarea", label: e, value: c, onChange: d }),
    t && /* @__PURE__ */ o("div", { className: Ue.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      Rn,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Ue.actions, children: [
      /* @__PURE__ */ n(v, { variant: "primary", onClick: () => l(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(v, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const wy = "_list_1ih9e_2", _y = "_item_1ih9e_6", vy = "_body_1ih9e_22", fy = "_text_1ih9e_28", by = "_evidence_1ih9e_37", py = "_consequence_1ih9e_49", gy = "_note_1ih9e_54", Pe = {
  list: wy,
  item: _y,
  body: vy,
  text: fy,
  evidence: by,
  consequence: py,
  note: gy
};
function Ny({ criterion: e }) {
  return /* @__PURE__ */ n(Le, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function pn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function yy(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function ky({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Pe.body, children: [
    /* @__PURE__ */ n("span", { className: Pe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(pn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Pe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(pn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Pe.consequence, children: yy(e.why) })
    ] })
  ] });
}
function $y({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Pe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Ny, { criterion: e }),
    /* @__PURE__ */ n(ky, { criterion: e })
  ] });
}
function H$({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n($y, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Pe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Cy = "_list_dwhoz_2", Sy = "_rung_dwhoz_6", Ry = "_name_dwhoz_18", Ty = "_actor_dwhoz_32", ia = {
  list: Cy,
  rung: Sy,
  name: Ry,
  actor: Ty
}, Ey = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function Ly({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = Ey[e.state];
  return /* @__PURE__ */ o("li", { className: ia.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ia.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ia.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function F$({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ia.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(Ly, { rung: a }, a.name)) });
}
const Ay = "_sheet_1fqco_2", xy = "_title_1fqco_9", Iy = "_stage_1fqco_15", qy = "_effects_1fqco_20", My = "_effect_1fqco_20", By = "_numeral_1fqco_31", Py = "_effectText_1fqco_38", Oy = "_refusals_1fqco_43", Dy = "_reasons_1fqco_52", Hy = "_reason_1fqco_52", Fy = "_actions_1fqco_62", de = {
  sheet: Ay,
  title: xy,
  stage: Iy,
  effects: qy,
  effect: My,
  numeral: By,
  effectText: Py,
  refusals: Oy,
  reasons: Dy,
  reason: Hy,
  actions: Fy
};
function jy({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function j$({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: c }) {
  const d = k(), u = `${d}-refusal`, [s, h] = g(""), _ = t.length > 0;
  return /* @__PURE__ */ n(ea, { kind: "sheet", labelledBy: d, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ o("div", { className: de.sheet, children: [
    /* @__PURE__ */ o("h2", { className: de.title, id: d, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: de.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: de.effects, children: a.map((b, q) => /* @__PURE__ */ o("li", { className: de.effect, children: [
      /* @__PURE__ */ n("span", { className: de.numeral, children: String(q + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: de.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      Vi,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(L, { kind: "textarea", label: "Note for the agent", value: s, onChange: h }),
    _ && /* @__PURE__ */ o("div", { className: de.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: de.reasons, children: t.map((b, q) => /* @__PURE__ */ n("li", { className: de.reason, id: q === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: de.actions, children: [
      /* @__PURE__ */ n(jy, { refused: _, reasonId: u, note: s, onRequeue: l }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const Wy = "_list_1hvqu_2", zy = "_path_1hvqu_7", Gy = "_head_1hvqu_21", Uy = "_label_1hvqu_28", Ky = "_consequence_1hvqu_35", Vy = "_ask_1hvqu_36", Ge = {
  list: Wy,
  path: zy,
  head: Gy,
  label: Uy,
  consequence: Ky,
  ask: Vy
}, Ha = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function gn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Nn(e) {
  return e ? "primary" : "secondary";
}
function Yy({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: Nn(a), size: "sm", onClick: () => t(e.kind), children: Ha[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(v, { variant: Nn(a), size: "sm", disabled: !0, describedBy: r, children: Ha[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ge.ask, id: r, children: e.askInstead })
  ] });
}
function Xy({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ge.path, "data-allowed": e.allowed, "data-role": gn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ge.head, children: [
      /* @__PURE__ */ n("span", { className: Ge.label, children: e.title ?? Ha[e.kind] }),
      /* @__PURE__ */ n(m, { role: gn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ge.consequence, children: e.consequence }),
    /* @__PURE__ */ n(Yy, { path: e, primary: a, onChoose: t })
  ] });
}
function W$({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ge.list, children: e.map((t, r) => /* @__PURE__ */ n(Xy, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const Jy = "_list_qjv4r_2", Qy = "_item_qjv4r_6", Zy = "_node_qjv4r_18", ek = "_body_qjv4r_24", ak = "_head_qjv4r_30", nk = "_stage_qjv4r_36", tk = "_version_qjv4r_41", rk = "_sentence_qjv4r_49", lk = "_meta_qjv4r_54", ge = {
  list: Jy,
  item: Qy,
  node: Zy,
  body: ek,
  head: ak,
  stage: nk,
  version: tk,
  sentence: rk,
  meta: lk
}, ok = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function ik({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function ck({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(Le, { size: 9, kind: ok[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(ik, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${ce(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function z$({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(ck, { entry: a }, a.stage + String(t))) });
}
const sk = "_thread_1kn6s_3", dk = "_turn_1kn6s_8", uk = "_who_1kn6s_27", hk = "_body_1kn6s_32", ca = {
  thread: sk,
  turn: dk,
  who: uk,
  body: hk
}, _t = Ve(!1);
function G$({ children: e, density: a }) {
  return /* @__PURE__ */ n(_t.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ca.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function U$({ turn: e }) {
  if (!Ke(_t)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ca.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ca.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ce(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ca.body} ward-chat-body`, children: e.body })
  ] });
}
const mk = "_list_1rt9c_3", wk = "_row_1rt9c_7", _k = "_label_1rt9c_20", vk = "_n_1rt9c_26", fk = "_cause_1rt9c_33", Qe = {
  list: mk,
  row: wk,
  label: _k,
  n: vk,
  cause: fk
};
function bk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const pk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function gk({ row: e, formatNumber: a }) {
  return bk(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Le, { size: 8, ...pk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Nk, { cause: e.cause })
  ] });
}
function Nk({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function K$({ rows: e, formatNumber: a = Z }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(gk, { row: t, formatNumber: a }, t.label)) });
}
const yk = "_root_1jxwp_2", kk = {
  root: yk
};
function V$({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: kk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Sa, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(v, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const $k = "_row_dhbre_3", Ck = "_key_dhbre_13", Sk = "_stack_dhbre_24", Rk = "_value_dhbre_32", Tk = "_evidence_dhbre_39", Ek = "_mark_dhbre_47", We = {
  row: $k,
  key: Ck,
  stack: Sk,
  value: Rk,
  evidence: Tk,
  mark: Ek
};
function Lk({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ga, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function Y$({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${We.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${We.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${We.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${We.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${We.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${We.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(Lk, { state: e.state }) })
  ] });
}
const Ak = "_cell_1monp_2", xk = {
  cell: Ak
}, Ik = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function qk(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function Mk(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function Bk(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: qk(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function Pk(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function X$({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  Mk(e, t);
  const r = Pk(e);
  return /* @__PURE__ */ n(
    cc,
    {
      label: "Rejection routing",
      columns: Ik,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: xk.cell, "data-norerun": l.noRerun ? !0 : void 0, children: Bk(l, i) }),
      empty: a ?? /* @__PURE__ */ n(Os, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Ok = "_row_ute8v_2", Dk = "_title_ute8v_11", Hk = "_turns_ute8v_20", Fk = "_waiting_ute8v_21", jk = "_resolved_ute8v_22", Wk = "_activity_ute8v_23", zk = "_cost_ute8v_29", Gk = "_link_ute8v_30", Uk = "_tableRow_ute8v_47", Kk = "_tableTitle_ute8v_59", Vk = "_tableResolved_ute8v_64", Yk = "_tableLink_ute8v_68", Xk = "_tableMeta_ute8v_83", Jk = "_tableCost_ute8v_90", Qk = "_tableActivity_ute8v_91", Zk = "_tableState_ute8v_101", e1 = "_tableRecord_ute8v_112", B = {
  row: Ok,
  title: Dk,
  turns: Hk,
  waiting: Fk,
  resolved: jk,
  activity: Wk,
  cost: zk,
  link: Gk,
  tableRow: Uk,
  tableTitle: Kk,
  tableResolved: Vk,
  tableLink: Yk,
  tableMeta: Xk,
  tableCost: Jk,
  tableActivity: Qk,
  tableState: Zk,
  tableRecord: e1
}, vt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function a1(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function n1(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function t1(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const r1 = { duplicate: "CLOSED · DUPLICATE" };
function l1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function o1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : ne(e) });
}
function i1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: F(e.href), children: `→ ${e.key}` });
}
function c1({ session: e, href: a }) {
  const t = vt[e.state];
  return /* @__PURE__ */ o("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: F(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: n1(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: B.tableResolved, children: [
      t1(e.resolved),
      /* @__PURE__ */ n(l1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(o1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: a1(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: r1[e.state] ?? t.label }),
      /* @__PURE__ */ n(i1, { link: e.link })
    ] }) })
  ] });
}
function s1({ session: e }) {
  const a = vt[e.state];
  return /* @__PURE__ */ o("div", { className: B.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: B.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: B.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: B.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: B.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: B.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ne(e.cost) }),
    /* @__PURE__ */ n("span", { className: B.activity, children: ce(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: B.link, href: F(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function J$(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(c1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(s1, { session: e.session });
}
const d1 = "_block_1yy2v_3", u1 = "_list_1yy2v_9", h1 = "_line_1yy2v_14", Fa = {
  block: d1,
  list: u1,
  line: h1
}, m1 = { warn: "warning", ok: "ok" };
function w1({ kind: e }) {
  const a = m1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function _1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Fa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(w1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function Q$({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Fa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Fa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(_1, { line: t }, `${r}-${t.text}`)) }) });
}
const v1 = "_band_tt7hp_1", f1 = "_head_tt7hp_8", b1 = "_cell_tt7hp_19", p1 = "_index_tt7hp_35", g1 = "_title_tt7hp_42", N1 = "_note_tt7hp_48", y1 = "_cellTitle_tt7hp_53", k1 = "_cellBody_tt7hp_58", $1 = "_tag_tt7hp_64", ve = {
  band: v1,
  head: f1,
  cell: b1,
  index: p1,
  title: g1,
  note: N1,
  cellTitle: y1,
  cellBody: k1,
  tag: $1
}, yn = 4;
function Z$({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== yn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${yn}-cell grid`);
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
  P$ as ActivityConsole,
  Qh as AgentCard,
  P1 as AppShell,
  y$ as AppearanceStrip,
  Z$ as Band,
  j1 as BarChart,
  pd as BoardColumn,
  n$ as BoardFootnote,
  t$ as BoardHeader,
  Y1 as BoardScroller,
  v as Btn,
  I1 as CHIP_ROLES,
  tt as CREDENTIAL_COLUMNS,
  F1 as Callout,
  k$ as CapabilityRow,
  U$ as ChatMessage,
  Rn as Checkbox,
  m as Chip,
  O$ as ClarificationRow,
  m$ as ClauseRuleRow,
  h$ as ClauseRules,
  Hn as ColourLadder,
  $$ as ComponentRow,
  D$ as Composer,
  l$ as ConfigRow,
  r$ as ConfigRowHead,
  Ua as ConnectionMark,
  G$ as Conversation,
  Vi as CostMeter,
  S$ as CredentialRow,
  C$ as CredentialRowHead,
  H$ as CriteriaList,
  rl as Crumb,
  K$ as DeliveryHealth,
  J1 as DeniedState,
  w$ as DryRunRail,
  Os as EmptyState,
  R$ as EnvCard,
  L as Field,
  X1 as FilteredEmpty,
  K1 as FormStack,
  Sa as GateChecklist,
  F$ as GateLadder,
  cc as Grid,
  v$ as HandoffRuleRow,
  _$ as HandoffRules,
  o$ as ItemDrawer,
  T$ as KeyPanel,
  It as LIVE_EVENT_TYPES,
  gh as LegacyBoardColumn,
  c$ as LegacyBoardHeader,
  s$ as LegacyConfigRow,
  u$ as LegacyItemDrawer,
  mh as LegacyOverCapNote,
  d$ as LegacyPreviewRail,
  Pn as LegacyWorkCard,
  ke as LiveIndicator,
  Q1 as LoadFailed,
  a$ as Loading,
  st as MCP_SERVER_COLUMNS,
  Ga as Mark,
  L$ as MarkUpload,
  Le as Marker,
  x$ as McpServerRow,
  A$ as McpServerRowHead,
  f$ as NewStreamModal,
  Fs as OverCapNote,
  ea as Overlay,
  Tm as PARTIAL_STEP_REASON,
  dt as POLICY_CHIP_WIDTH,
  z1 as PageFrame,
  H1 as PageHeader,
  I$ as PolicyRow,
  i$ as PreviewRail,
  Aa as ROLE_MATRIX_COLUMNS,
  Qn as RULE_ACTIONS,
  xn as Radio,
  V$ as ReadyChecklist,
  U1 as RecordSection,
  j$ as RequeueSheet,
  W$ as ResolveBlock,
  Y$ as ResolvedFieldRow,
  q$ as RoleMatrixRow,
  X$ as RoutingTable,
  b$ as RuleRow,
  M$ as RunbookSteps,
  At as STREAM_STEPS,
  V1 as SectionBand,
  Cc as SectionHeader,
  En as SegmentedControl,
  J$ as SessionRow,
  D1 as Sidebar,
  p$ as StageColumn,
  z$ as StageHistory,
  A_ as StageListEditor,
  Z1 as StaleStrip,
  ka as StatStrip,
  g$ as StreamRow,
  G1 as SubjectRail,
  Oe as Switch,
  O1 as Tabs,
  N$ as ToolRow,
  W1 as TopBar,
  ts as Tree,
  qn as TreeRow,
  Q$ as TypedInputBlock,
  hr as UNSAFE_HREF,
  B$ as ValidationList,
  T1 as VisibilityProvider,
  E1 as Visible,
  x1 as WARD_VERSION,
  Ca as WorkCard,
  e$ as WriteUnavailableStrip,
  a1 as agoSince,
  kt as clock,
  V_ as colourStatus,
  Z as count,
  ie as duration,
  ja as elapsed,
  A1 as eventSourceTransport,
  pa as isStreamStep,
  ga as isValidatedStreamStep,
  Em as ladderValidation,
  sg as mcpConnectionChip,
  ig as mcpToolName,
  ne as money,
  me as ms,
  Mn as ordered,
  $n as ratio,
  Bb as restartLabel,
  F as safeHref,
  ce as stamp,
  Sn as stream,
  M1 as streamChip,
  ya as streamChipProps,
  Ee as streamColour,
  Mt as streamHex,
  q1 as streamVars,
  la as useBorderFlash,
  Tt as useFocusTrap,
  B1 as useLiveFeed,
  L1 as useReturnFocus,
  ba as useRovingTabindex,
  Wa as useTicker,
  $t as useVisible,
  W as v,
  E$ as validateMark,
  Na as validatedStep,
  xt as validatedStreamSteps
};
