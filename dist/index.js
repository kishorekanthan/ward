import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as gt, useContext as Ke, createContext as Ve, useCallback as Y, useEffect as A, useState as g, useRef as p, useLayoutEffect as Cn, useId as k, Fragment as Nt } from "react";
import { createPortal as yt } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const Za = (e) => String(e).padStart(2, "0");
function ja(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${Za(a % 60)}s` : `${Math.floor(t / 60)}h ${Za(t % 60)}m`;
}
const kt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function se(e) {
  const a = kt.formatToParts(new Date(e)), t = (r) => {
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
function Sn(e, a) {
  return `${e} / ${a}`;
}
const $t = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Ct(e) {
  return $t.format(new Date(e));
}
const Rn = Ve(/* @__PURE__ */ new Set());
function M1({ hidden: e, children: a }) {
  const t = gt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Rn.Provider, { value: t, children: a });
}
function St(e) {
  return !Ke(Rn).has(e);
}
function B1({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(S, { children: St(e) ? a : t });
}
const Rt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Tt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function Et(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Tt(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Lt(e) {
  return { onKeyDown: Y(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Rt));
      Et(t, e.current, r);
    },
    [e]
  ) };
}
function P1(e, a = !0) {
  A(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const en = { ArrowUp: -1, ArrowDown: 1 }, an = { ArrowLeft: -1, ArrowRight: 1 }, At = (e, a, t) => Math.min(t, Math.max(a, e));
function xt(e, a) {
  if (a !== "horizontal" && e in en) return en[e];
  if (a !== "vertical" && e in an) return an[e];
}
function fa({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = p(/* @__PURE__ */ new Map()), l = p(!1);
  Cn(() => {
    var b;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const h = d[0], v = l.current;
    l.current = !1, t(h), v && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = Y((d) => t(d), []), c = Y((d) => {
    var h;
    t(d), (h = r.current.get(d)) == null || h.focus();
  }, []), s = Y(
    (d) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const v = Math.max(0, h.indexOf(a)), b = xt(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[At(v + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
    },
    [a, c, e]
  ), u = Y(
    (d) => ({
      tabIndex: d === a ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(d, h) : (r.current.delete(d), d === a && (l.current = !0));
      },
      onFocus: () => t(d),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: s }, itemProps: u, setActive: i };
}
const O1 = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, D1 = "0.2.0", H1 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], It = [1, 2, 3, 4, 5, 6], qt = [1, 2, 3], Mt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], W = {
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
function Tn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function ba(e) {
  return It.includes(e);
}
function pa(e) {
  return qt.includes(e);
}
function F1(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function j1(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Bt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Pt(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return Bt[e];
}
function nn(e) {
  return typeof e != "string" ? null : Mt.includes(e) ? e : null;
}
function Ot(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Dt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Ht(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Ft(e, a, t) {
  const r = Ot(e);
  if (r === null) return null;
  const l = nn(t) ?? nn(r.type);
  return l === null ? null : { ...r, type: l, id: Dt(r, a), at: Ht(r) };
}
function jt(e, a) {
  return e >= me.staleAfter ? "stale" : e >= me.heartbeat && a === "live" ? "reconnecting" : null;
}
function Wt(e, a, t) {
  return e >= me.heartbeat && !a && t !== null;
}
function W1(e, a) {
  const [t, r] = g("reconnecting"), [l, i] = g(null), c = p(/* @__PURE__ */ new Map()), s = p(0), u = p(""), d = p(0), h = p(null), v = p(0), b = p(0), M = p(!1), K = p("reconnecting"), V = Y(($) => {
    K.current = $, r($);
  }, []), oe = Y(() => {
    s.current = Date.now();
  }, []), $e = Y(($) => {
    for (const [j, _e] of c.current)
      (_e === "*" || $.itemKey === _e) && j($);
  }, []), ee = Y(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: ($, j, _e) => {
        const Ae = Ft($, j, _e);
        Ae !== null && (Ae.id && (u.current = Ae.id), oe(), M.current = !1, V("live"), i(Ae.at), $e(Ae));
      },
      onOpen: () => {
        d.current = 0, M.current = !1, oe(), V("live");
      },
      onError: () => {
        var j;
        (j = h.current) == null || j.close(), h.current = null, M.current = !0, K.current !== "stale" && V("reconnecting");
        const $ = Math.min(me.reconnectBase * 2 ** d.current, me.reconnectMax);
        d.current += 1, v.current = window.setTimeout(ee, $);
      }
    });
  }, [$e, V, oe, a, e]), De = Y(($) => {
    M.current = !0, $.close(), h.current = null, v.current = window.setTimeout(ee, me.reconnectBase);
  }, [ee]), He = Y(($, j) => (c.current.set(j, $), () => {
    c.current.delete(j);
  }), []);
  return A(() => (ee(), b.current = window.setInterval(() => {
    const $ = Date.now() - s.current, j = jt($, K.current);
    j && V(j);
    const _e = h.current;
    Wt($, M.current, _e) && De(_e);
  }, me.tick), () => {
    var $;
    window.clearInterval(b.current), window.clearTimeout(v.current), M.current = !1, ($ = h.current) == null || $.close(), h.current = null;
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
function zt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function tn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function la(e, a) {
  const t = p(0), r = Y((l) => {
    const i = l ?? a, c = e.current;
    c !== null && i !== void 0 && (zt() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => tn(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => tn(c), me.flash)));
  }, [a, e]);
  return A(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Gt = "_root_1otpc_2", Ut = {
  root: Gt
};
function Kt(e, a, t, r, l) {
  const i = [ja(a)];
  return e || i.push(`as of ${Ct(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function ke({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Wa(e, l), c = (a == null ? void 0 : a.at) ?? e, s = Kt(l, i, c, r, a);
  return /* @__PURE__ */ o("span", { className: `${Ut.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      se(e)
    ] })
  ] });
}
const Vt = "_app_lu0b1_1", Yt = "_side_lu0b1_18", Xt = "_main_lu0b1_26", Jt = "_rail_lu0b1_33", Qt = "_page_lu0b1_40", Zt = "_root_lu0b1_91", er = "_topbar_lu0b1_98", ar = "_mark_lu0b1_109", nr = "_brand_lu0b1_116", tr = "_tagline_lu0b1_122", rr = "_identity_lu0b1_128", lr = "_tools_lu0b1_129", or = "_metadata_lu0b1_138", ir = "_actor_lu0b1_153", cr = "_detail_lu0b1_154", sr = "_nav_lu0b1_159", dr = "_content_lu0b1_194", ur = "_toolsPanel_lu0b1_207", hr = "_skip_lu0b1_233", x = {
  app: Vt,
  side: Yt,
  main: Xt,
  rail: Jt,
  page: Qt,
  root: Zt,
  topbar: er,
  mark: ar,
  brand: nr,
  tagline: tr,
  identity: rr,
  tools: lr,
  metadata: or,
  actor: ir,
  detail: cr,
  nav: sr,
  content: dr,
  toolsPanel: ur,
  skip: hr
}, mr = "_btn_llheq_2", wr = "_primary_llheq_13", _r = "_secondary_llheq_23", vr = "_ghost_llheq_28", fr = "_overflow_llheq_37", br = "_sm_llheq_44", pr = "_disabled_llheq_48", aa = {
  btn: mr,
  primary: wr,
  secondary: _r,
  ghost: vr,
  overflow: fr,
  sm: br,
  disabled: pr
};
function gr(e, a, t, r) {
  const l = a === "sm" ? [aa.sm, "ward-btn--sm"] : [], i = t ? [aa.disabled] : [];
  return [aa.btn, aa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Nr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function yr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function kr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function $r(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Cr(e, a, t) {
  return $r(e.describedBy, a && t);
}
function Sr({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Rr(e) {
  return e.children ?? e.label;
}
function _(e) {
  yr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = kr(e), i = k();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: gr(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": Cr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Nr(a, e.controls),
        children: Rr(e)
      }
    ),
    /* @__PURE__ */ n(Sr, { id: i, reason: l })
  ] });
}
const Tr = /^([a-z][a-z0-9+.-]*):/i, Er = /* @__PURE__ */ new Set(["http", "https"]), Lr = "#";
function Ar(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Tr.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function F(e) {
  const a = Ar(e);
  return a === void 0 || Er.has(a) ? e : Lr;
}
function za(e) {
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
function xr({ sidebar: e, header: a, children: t, rail: r }) {
  const l = r != null;
  return /* @__PURE__ */ o("div", { className: x.app, "data-rail": l ? "true" : "false", children: [
    /* @__PURE__ */ n("div", { className: x.side, children: e }),
    /* @__PURE__ */ o("main", { className: x.main, children: [
      a,
      /* @__PURE__ */ n("div", { className: x.page, children: t })
    ] }),
    l && /* @__PURE__ */ n("div", { className: x.rail, children: r })
  ] });
}
function Ir({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: x.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: F(t.href), "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function Ia({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function qr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: x.metadata, children: [
    /* @__PURE__ */ n(Ia, { value: e, className: x.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Ia, { value: a, className: x.detail })
  ] });
}
function Mr() {
  const e = za("(max-width: 767.98px)"), a = k(), t = p(null), [r, l] = g(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var c, s;
    l(!1), (s = (c = t.current) == null ? void 0 : c.querySelector("button")) == null || s.focus();
  } };
}
function Br({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: x.tools, children: /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: x.tools, children: e });
}
function Pr({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: x.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function Or(e) {
  return /* @__PURE__ */ o("header", { className: x.topbar, children: [
    /* @__PURE__ */ n("span", { className: x.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: x.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Ia, { value: e.tagline, className: x.tagline }),
    /* @__PURE__ */ n(Ir, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: x.identity, children: /* @__PURE__ */ n(qr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Br, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Dr(e) {
  const a = k(), t = Mr();
  return /* @__PURE__ */ o("div", { className: `${x.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: x.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Or, { ...e, menu: t }),
    /* @__PURE__ */ n(Pr, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: x.content, children: e.children })
  ] });
}
function Hr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function z1(e) {
  return Hr(e) ? /* @__PURE__ */ n(xr, { ...e }) : /* @__PURE__ */ n(Dr, { ...e });
}
function Ga(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Fr = "_root_o4yib_2", jr = "_row_o4yib_8", Wr = "_box_o4yib_14", zr = "_label_o4yib_21", Gr = "_lockedNote_o4yib_26", Ur = "_consequence_o4yib_34", Kr = "_sample_o4yib_69", qe = {
  root: Fr,
  row: jr,
  box: Wr,
  label: zr,
  lockedNote: Gr,
  consequence: Ur,
  sample: Kr
};
function Vr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Yr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${qe.consequence} ward-check-consequence`, children: a }) : null;
}
function Xr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${qe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Jr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.sample, "aria-hidden": "true", children: e }) : null;
}
function En(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = Vr(e);
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
          "aria-describedby": Ga(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: qe.label, children: [
        e.label,
        /* @__PURE__ */ n(Xr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Jr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Yr, { id: t, text: e.consequence })
  ] });
}
const Qr = "_chip_1073r_2", Zr = {
  chip: Qr
}, el = {
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
function al(e, a) {
  if (e === "stream") return nl(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = el[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function nl(e) {
  if (!e || !pa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Tn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Zr.chip} ward-chip ward-chip--${e}`, style: al(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function ga(e) {
  return typeof e == "number" && pa(e) ? e : null;
}
function Ee(e, a) {
  const t = ga(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function Na(e, a) {
  const t = ga(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const tl = "_nav_1mnou_2", rl = "_list_1mnou_8", ll = "_item_1mnou_15", ol = "_link_1mnou_25", il = "_sep_1mnou_35", cl = "_current_1mnou_39", sl = "_chips_1mnou_43", xe = {
  nav: tl,
  list: rl,
  item: ll,
  link: ol,
  sep: il,
  current: cl,
  chips: sl
};
function dl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: xe.nav, children: [
    /* @__PURE__ */ n("ol", { className: xe.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: xe.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: xe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: xe.link, href: F(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: xe.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${xe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const ul = "_field_fy549_2", hl = "_label_fy549_8", ml = "_labelHidden_fy549_15", wl = "_control_fy549_25", _l = "_mono_fy549_44", vl = "_area_fy549_49", fl = "_invalid_fy549_56", Te = {
  field: ul,
  label: hl,
  labelHidden: ml,
  control: wl,
  mono: _l,
  area: vl,
  invalid: fl
}, bl = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function pl({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? bl : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function gl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Nl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const yl = { input: pl, select: gl, textarea: Nl };
function kl(e, a, t) {
  const r = yl[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function $l(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ga(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function Cl(e) {
  const a = e.mono ? [Te.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Te.area] : [];
  return [Te.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Sl(e) {
  return e ? `${Te.label} ${Te.labelHidden} ward-field-label` : `${Te.label} ward-field-label`;
}
function L(e) {
  const a = k(), t = `${a}-msg`, r = $l(e, a, t), l = Cl(e);
  return /* @__PURE__ */ o("div", { className: `${Te.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Sl(e.labelHidden), htmlFor: a, children: e.label }),
    kl(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Te.invalid} ward-field-error`, children: e.invalid })
  ] });
}
function Rl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Ln(e) {
  const a = Rl(e);
  e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end);
}
function An(e, a) {
  A(() => {
    const t = e.current;
    if (!t) return;
    const r = () => Ln(t);
    t.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [t, ...t.children]) l == null || l.observe(i);
    return r(), () => {
      t.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, a]);
}
const Tl = "_strip_tivso_2", El = "_tab_tivso_26", Ll = "_count_tivso_49", qa = {
  strip: Tl,
  tab: El,
  count: Ll
}, rn = 7;
function Al(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function xl(e) {
  return `${qa.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function Il(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function ql(e, a) {
  Cn(() => {
    const t = e.current, r = t == null ? void 0 : t.querySelectorAll('[role="tab"]')[a];
    if (!t || !r) return;
    const l = Il(t, r);
    l !== null && (t.scrollLeft = Math.max(0, l)), Ln(t);
  }, [e, a]);
}
function G1({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > rn) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${rn} — the set is fixed`);
  const i = fa({ orientation: "horizontal" }), c = Al(e, a);
  A(() => i.setActive(c), [i.setActive, c]);
  const s = p(null);
  return An(s, e.length), ql(s, c), /* @__PURE__ */ n(
    "div",
    {
      ref: s,
      className: xl(l),
      role: "tablist",
      "aria-label": r,
      "data-level": l,
      ...i.containerProps,
      children: e.map((u, d) => /* @__PURE__ */ o(
        "button",
        {
          id: `tab-${u.id}`,
          type: "button",
          role: "tab",
          className: `${qa.tab} ward-tab`,
          "aria-selected": u.id === a,
          "aria-controls": `panel-${u.id}`,
          onClick: () => t(u.id),
          ...i.itemProps(d),
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
const Ml = "_root_jem6y_2", Bl = "_segment_jem6y_7", ln = {
  root: Ml,
  segment: Bl
};
function xn({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = fa({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return A(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${ln.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: ln.segment,
      "aria-checked": u.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => t(u.value),
      ...c.itemProps(d),
      children: u.label
    },
    u.value
  )) });
}
const Pl = "_sidebar_1jywv_3", Ol = "_brand_1jywv_9", Dl = "_mark_1jywv_17", Hl = "_word_1jywv_24", Fl = "_nav_1jywv_30", jl = "_navItem_1jywv_38", Wl = "_group_1jywv_50", zl = "_groupName_1jywv_57", Gl = "_agents_1jywv_70", Ul = "_agent_1jywv_70", Kl = "_agentTop_1jywv_88", Vl = "_dot_1jywv_95", Yl = "_agentName_1jywv_107", Xl = "_agentMeta_1jywv_120", Jl = "_foot_1jywv_126", Ql = "_footName_1jywv_132", Zl = "_footLinks_1jywv_139", eo = "_footLink_1jywv_139", ao = "_root_1jywv_153", no = "_linkBrand_1jywv_162", to = "_label_1jywv_183", ro = "_note_1jywv_188", lo = "_footer_1jywv_202", C = {
  sidebar: Pl,
  brand: Ol,
  mark: Dl,
  word: Hl,
  nav: Fl,
  navItem: jl,
  group: Wl,
  groupName: zl,
  new: "_new_1jywv_64",
  agents: Gl,
  agent: Ul,
  agentTop: Kl,
  dot: Vl,
  agentName: Yl,
  agentMeta: Xl,
  foot: Jl,
  footName: Ql,
  footLinks: Zl,
  footLink: eo,
  root: ao,
  linkBrand: no,
  label: to,
  note: ro,
  footer: lo
};
function oo({ agent: e }) {
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
              style: { "--dot": Tn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function io({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: F(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function co({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(oo, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(io, { shared: i })
  ] });
}
function so(e) {
  return e.destinations ?? e.items ?? [];
}
function uo({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function ho({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function mo({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: F(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function wo(e) {
  return /* @__PURE__ */ o("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(uo, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: so(e).map((a) => /* @__PURE__ */ n(mo, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(ho, { children: e.children })
  ] });
}
function _o(e) {
  return "agents" in e;
}
function U1(e) {
  return _o(e) ? /* @__PURE__ */ n(co, { ...e }) : /* @__PURE__ */ n(wo, { ...e });
}
const vo = "_mark_wlgi8_3", fo = {
  mark: vo
}, bo = { met: "✓", unmet: "", failed: "✕" };
function Ua({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: fo.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: bo[e]
    }
  );
}
const po = "_marker_br9fi_2", go = {
  marker: po
}, No = {
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
  const r = { "--marker": No[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${go.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const yo = "_root_ti0pq_2", ko = "_chip_ti0pq_11", $o = "_noCase_ti0pq_23", na = {
  root: yo,
  chip: ko,
  noCase: $o
};
function Co(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Ka({ connection: e, since: a, lastEventAt: t }) {
  const r = Co(a, t), l = Wa(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${na.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Le, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: na.noCase, children: ja(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    se(r)
  ] });
}
const So = "_root_114od_2", Ro = "_context_114od_12", To = "_row_114od_1", Eo = "_heading_114od_25", Lo = "_headingWrap_114od_33", Ao = "_chips_114od_38", xo = "_title_114od_45", Io = "_consequence_114od_54", qo = "_actionsWrap_114od_59", Mo = "_actions_114od_59", Bo = "_action_114od_59", Po = "_overflowPanel_114od_78", Oo = "_measure_114od_88", te = {
  root: So,
  context: Ro,
  row: To,
  heading: Eo,
  headingWrap: Lo,
  chips: Ao,
  title: xo,
  consequence: Io,
  actionsWrap: qo,
  actions: Mo,
  action: Bo,
  overflowPanel: Po,
  measure: Oo
};
function Do({ title: e, consequence: a, consequenceHint: t }) {
  return /* @__PURE__ */ o("div", { className: te.heading, children: [
    /* @__PURE__ */ n("h1", { className: te.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: te.consequence, title: t, children: a })
  ] });
}
function Ma({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: te.action, "data-action": "", children: a }, t));
}
function on({ disclosure: e }) {
  return /* @__PURE__ */ n(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Ho({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(on, { disclosure: l }) : a ? [/* @__PURE__ */ n(on, { disclosure: l }, "more"), /* @__PURE__ */ n(Ma, { actions: e }, "actions")] : /* @__PURE__ */ n(Ma, { actions: e });
}
function Fo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function jo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: te.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Ma, { actions: e }) });
}
function Wo(e, a) {
  const t = k(), [r, l] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function zo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: te.context, children: [
    /* @__PURE__ */ n(dl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: te.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function Go(...e) {
  return e.some((a) => a === null);
}
function Uo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Ko(e, a, t, r, l) {
  if (l === 0 || Go(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = Uo(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function Vo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Yo(e) {
  const a = p(null), t = p(null), r = p(null), l = p(null), [i, c] = g(!1);
  return A(() => {
    const s = a.current;
    if (!Vo(s)) return;
    const u = () => c(Ko(s, t.current, r.current, l.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function Xo({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ o("div", { className: te.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] });
}
function Jo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Ka, { connection: e.connection, since: e.since }) : null;
}
function K1({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: c = [], connection: s, onOverflow: u, density: d = "page" }) {
  const { rowRef: h, headingRef: v, actionsRef: b, measureRef: M, collapsed: K } = Yo(i), V = c.length > 0, { disclosure: oe, close: $e } = Wo(K || V, b), ee = Fo(c, i, K, u);
  return /* @__PURE__ */ o("header", { className: te.root, "data-density": d, children: [
    /* @__PURE__ */ n(zo, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: te.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: v, className: te.headingWrap, children: /* @__PURE__ */ n(Do, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: te.actionsWrap, children: [
        /* @__PURE__ */ n(Jo, { connection: s }),
        /* @__PURE__ */ n("div", { className: te.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(Ho, { actions: i, hasMore: V, collapsed: K, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(jo, { actions: ee, disclosure: oe, onEscape: $e }),
    /* @__PURE__ */ n(Xo, { actions: i, hasMore: V, measureRef: M })
  ] });
}
const Qo = "_scrim_c7sqj_2", Zo = "_drawer_c7sqj_10", ei = "_sheet_c7sqj_14", ai = "_modal_c7sqj_18", ni = "_panel_c7sqj_23", ti = "_header_c7sqj_51", ri = "_title_c7sqj_59", li = "_body_c7sqj_63", oi = "_close_c7sqj_90", Ne = {
  scrim: Qo,
  drawer: Zo,
  sheet: ei,
  modal: ai,
  panel: ni,
  header: ti,
  title: ri,
  body: li,
  close: oi
}, ii = Ve(null), sa = [], da = /* @__PURE__ */ new Map();
function ci(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function si(e, a) {
  let t = da.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, da.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function di(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !ci(r) && si(e, r);
}
function ui(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (di(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function hi(e) {
  for (const a of e.claims) {
    const t = da.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), da.delete(a)));
  }
}
function mi(e, a) {
  const t = { root: e, claims: [] };
  return sa.push(t), ui(t, a), t;
}
function wi(e) {
  const a = sa.indexOf(e);
  a >= 0 && sa.splice(a, 1), hi(e);
}
function cn(e) {
  return e !== null && sa.at(-1) === e;
}
function _i(e, a, t) {
  const r = p(null), l = p(t);
  return l.current = t, A(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = mi(i, a);
    return r.current = s, () => {
      var d, h;
      const u = cn(s);
      wi(s), r.current = null, u && ((h = (d = l.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), Y(() => cn(r.current), []);
}
function vi(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function fi(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function bi({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${Ne.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ne.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, children: e.children })
  ] });
}
function pi(e) {
  return `${Ne.scrim} ${Ne[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function gi(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ne.panel} ${Ne[e]} ward-overlay-panel${t}${r}`;
}
function Ni(e) {
  const a = Ke(ii);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = p(null), t = p(null), r = k(), l = Ni(e.container), i = za("(min-width: 768px)"), c = vi(e.kind, i), s = fi(e, r), u = Lt(t), d = _i(a, l, e.returnFocusTo), h = Y(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return A(() => {
    var v, b;
    d() && ((b = (v = t.current) == null ? void 0 : v.querySelector("button")) == null || b.focus());
  }, [d]), A(() => {
    const v = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [h]), yt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: pi(c),
        "data-ward-overlay-kind": c,
        "data-ward-overlay-root": "",
        onClick: h,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": s.labelledBy,
            "aria-label": s.label,
            className: gi(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (v) => v.stopPropagation(),
            onKeyDown: (v) => d() && u.onKeyDown(v),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ne.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(bi, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const yi = "_root_drrhx_2", ki = "_ticket_drrhx_15", $i = "_body_drrhx_24", Sa = {
  root: yi,
  ticket: ki,
  body: $i
};
function V1({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Sa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Sa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Sa.body, children: t })
  ] });
}
const Ci = "_root_bf1pc_2", Si = "_table_bf1pc_9", Ri = "_caption_bf1pc_14", Ti = "_series_bf1pc_23", Ei = "_category_bf1pc_31", Li = "_cell_bf1pc_39", Ai = "_track_bf1pc_45", xi = "_lane_bf1pc_52", Ii = "_bar_bf1pc_56", qi = "_value_bf1pc_63", Mi = "_swatch_bf1pc_70", Bi = "_empty_bf1pc_78", U = {
  root: Ci,
  table: Si,
  caption: Ri,
  series: Ti,
  category: Ei,
  cell: Li,
  track: Ai,
  lane: xi,
  bar: Ii,
  value: qi,
  swatch: Mi,
  empty: Bi
}, Pi = "—", sn = 6;
function Oi(e, a) {
  if (a.length < 1 || a.length > sn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${sn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Di(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function In(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Hi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Fi({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Hi(e, a), c = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ o("span", { className: U.track, children: [
    /* @__PURE__ */ n("span", { className: U.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${U.bar} ward-barchart-bar`, "data-step": t, style: c, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: U.value, children: e === null ? l : r(e) })
  ] }) });
}
function ji({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: U.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: U.swatch, "data-step": In(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Wi({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${U.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: U.caption, children: e }),
    /* @__PURE__ */ n("p", { className: U.empty, children: a })
  ] });
}
function zi({ title: e, categories: a, series: t, top: r, format: l = Z, categoryHead: i = "Category", missing: c = Pi }) {
  return /* @__PURE__ */ n("div", { className: `${U.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: U.table, children: [
    /* @__PURE__ */ n("caption", { className: U.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: U.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(ji, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((s, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: U.category, children: s }),
      t.map((d, h) => /* @__PURE__ */ n(Fi, { value: d.values[u], top: r, step: In(h, t.length), format: l, missing: c }, d.name))
    ] }, s)) })
  ] }) });
}
function Y1(e) {
  Oi(e.categories, e.series);
  const a = Di(e.series);
  return a === 0 ? /* @__PURE__ */ n(Wi, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(zi, { ...e, top: a });
}
const Gi = "_root_1bfqw_2", Ui = "_figure_1bfqw_7", Ki = "_of_1bfqw_13", Vi = "_bar_1bfqw_18", Yi = "_rows_1bfqw_38", Xi = "_row_1bfqw_38", Ji = "_label_1bfqw_49", Qi = "_amount_1bfqw_54", Ce = {
  root: Gi,
  figure: Ui,
  of: Ki,
  bar: Vi,
  rows: Yi,
  row: Xi,
  label: Ji,
  amount: Qi
};
function Zi({ spent: e, ceiling: a, breakdown: t }) {
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
const ec = "_frame_mg2jl_2", ac = "_table_mg2jl_6", nc = "_th_mg2jl_12", tc = "_td_mg2jl_13", rc = "_sort_mg2jl_47", lc = "_row_mg2jl_53", oc = "_empty_mg2jl_61", Re = {
  frame: ec,
  table: ac,
  th: nc,
  td: tc,
  sort: rc,
  row: lc,
  empty: oc
}, ic = { asc: "ascending", desc: "descending" };
function cc(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ic[a.direction];
}
function sc(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function dc(e) {
  return e === void 0 ? void 0 : { width: e };
}
function uc({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: dc(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": cc(e, a),
      children: sc(e, t)
    }
  );
}
function hc({ row: e, props: a }) {
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
function mc({
  label: e,
  columns: a,
  rows: t,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: c = [],
  sort: s,
  onSort: u,
  empty: d
}) {
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: Re.empty, children: d }) : /* @__PURE__ */ n("div", { className: Re.frame, children: /* @__PURE__ */ o("table", { className: Re.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(uc, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(hc, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const wc = "_list_v0s52_2", _c = {
  list: wc
};
function X1({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: _c.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const vc = "_set_y5zy3_2", fc = "_legend_y5zy3_7", bc = "_row_y5zy3_15", pc = "_control_y5zy3_20", gc = "_input_y5zy3_26", Nc = "_label_y5zy3_31", yc = "_consequence_y5zy3_36", Ie = {
  set: vc,
  legend: fc,
  row: bc,
  control: pc,
  input: gc,
  label: Nc,
  consequence: yc
};
function qn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: c, variant: s }) {
  const u = k(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: Ie.set, "data-variant": s, children: [
    /* @__PURE__ */ n("legend", { className: Ie.legend, children: e }),
    a.map((h) => {
      const v = `${d}-${h.value}`, b = h.consequence ? `${v}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Ie.row, children: [
        /* @__PURE__ */ o("span", { className: Ie.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: v,
              type: "radio",
              name: d,
              className: Ie.input,
              value: h.value,
              checked: t === h.value,
              disabled: l,
              "aria-describedby": Ga(b, c),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: v, className: Ie.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Ie.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const kc = "_root_iycnv_2", $c = "_head_iycnv_11", Cc = "_index_iycnv_27", Sc = "_dot_iycnv_31", Rc = "_note_iycnv_36", Tc = "_counter_iycnv_42", Ec = "_trailing_iycnv_50", Me = {
  root: kc,
  head: $c,
  index: Cc,
  dot: Sc,
  note: Rc,
  counter: Tc,
  trailing: Ec
};
function Lc({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${Me.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Me.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ac({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Me.counter, "aria-hidden": "true", children: e }) : null;
}
function dn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Me.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Me.head, children: [
      /* @__PURE__ */ n(Lc, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Me.note, children: t }),
    /* @__PURE__ */ n(Ac, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Me.trailing, children: i })
  ] });
}
const xc = "_strip_1cfs3_2", Ic = "_cell_1cfs3_7", qc = "_value_1cfs3_12", Mc = "_link_1cfs3_27", Bc = "_label_1cfs3_39", Xe = {
  strip: xc,
  cell: Ic,
  value: qc,
  link: Mc,
  label: Bc
};
function Pc(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function Oc({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(S, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Xe.link} ward-stat-link`, href: F(e.href), "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function ya({ cells: e, divided: a = !1 }) {
  return Pc(e), /* @__PURE__ */ n("dl", { className: `${Xe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Xe.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Xe.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, title: t.hint, children: /* @__PURE__ */ n(Oc, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Xe.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Dc = "_root_xk7sv_2", Hc = "_track_xk7sv_8", Fc = "_thumb_xk7sv_35", jc = "_labelHidden_xk7sv_53", Wc = "_label_xk7sv_53", zc = "_lockedNote_xk7sv_68", Be = {
  root: Dc,
  track: Hc,
  thumb: Fc,
  labelHidden: jc,
  label: Wc,
  lockedNote: zc
};
function Gc(e) {
  return e ? `${Be.label} ${Be.labelHidden}` : Be.label;
}
function Oe({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: c }) {
  const s = k(), u = l ? !0 : a, d = r || l;
  return /* @__PURE__ */ o("span", { className: `${Be.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": u,
        "aria-label": e,
        "aria-labelledby": s,
        "aria-describedby": i,
        className: `${Be.track} ward-switch`,
        "data-on": u,
        "data-locked": l ? !0 : void 0,
        disabled: d,
        onClick: () => !d && (t == null ? void 0 : t(!u)),
        children: /* @__PURE__ */ n("span", { className: Be.thumb })
      }
    ),
    /* @__PURE__ */ o("span", { id: s, className: Gc(c), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const Uc = "_bar_1u2kl_2", Kc = "_skip_1u2kl_11", Vc = "_mark_1u2kl_22", Yc = "_nav_1u2kl_30", Xc = "_list_1u2kl_34", Jc = "_select_1u2kl_40", Qc = "_dest_1u2kl_47", Zc = "_actor_1u2kl_61", es = "_actorMark_1u2kl_74", as = "_actorLabel_1u2kl_79", ns = "_tagline_1u2kl_98", de = {
  bar: Uc,
  skip: Kc,
  mark: Vc,
  nav: Yc,
  list: Xc,
  select: Jc,
  dest: Qc,
  actor: Zc,
  actorMark: es,
  actorLabel: as,
  tagline: ns
};
function ts(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function rs(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function J1({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: c = "main" }) {
  const s = rs(r);
  return /* @__PURE__ */ o("header", { className: de.bar, children: [
    /* @__PURE__ */ n("a", { className: de.skip, href: `#${c}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: de.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: de.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: de.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: de.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: de.dest,
          href: F(u.href),
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        "select",
        {
          className: de.select,
          "aria-label": "Destination",
          value: t,
          onChange: (u) => i == null ? void 0 : i(u.target.value),
          children: a.map((u) => /* @__PURE__ */ n("option", { value: u.id, children: u.label }, u.id))
        }
      )
    ] }),
    s && /* @__PURE__ */ o("span", { className: de.actor, children: [
      /* @__PURE__ */ n("span", { className: de.actorLabel, children: s }),
      /* @__PURE__ */ n("span", { className: de.actorMark, "aria-hidden": "true", children: ts(s) })
    ] })
  ] });
}
const ls = "_tree_1lyby_2", os = "_item_1lyby_6", is = "_row_1lyby_10", cs = "_button_1lyby_22", ua = {
  tree: ls,
  item: os,
  row: is,
  button: cs
}, Mn = Ve(null);
function ss({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = fa({ orientation: "vertical" });
  return /* @__PURE__ */ n(Mn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ua.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const ds = { ArrowRight: !0, ArrowLeft: !1 };
function un(e) {
  return e ? !0 : void 0;
}
function us(e, a) {
  const t = ds[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function hs(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function ms(e) {
  const a = [ua.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function ws(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function _s(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function vs(e) {
  return typeof e == "string" ? e : void 0;
}
function fs({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function bs({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Bn(e) {
  const a = Ke(Mn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = ws(e);
  return /* @__PURE__ */ o("li", { className: ua.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: ms(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": un(e.unresolved),
        "data-inherited": un(e.inherited),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${ua.button} ward-treeitem-btn`,
            onClick: () => hs(e),
            onKeyDown: (r) => us(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: _s(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: vs(e.label), children: e.label }),
              /* @__PURE__ */ n(fs, { value: e.detail }),
              /* @__PURE__ */ n(bs, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const ps = "_frame_1tok6_2", gs = "_subjectRail_1tok6_21", Ns = "_subject_1tok6_21", ys = "_rail_1tok6_41", ks = "_record_1tok6_63", $s = "_recordBody_1tok6_68", Cs = "_stageGrid_1tok6_117", Ss = "_band_1tok6_143", Rs = "_bandBody_1tok6_152", Ts = "_bandActions_1tok6_157", Es = "_scroller_1tok6_165", Ls = "_lanes_1tok6_183", le = {
  frame: ps,
  subjectRail: gs,
  subject: Ns,
  rail: ys,
  record: ks,
  recordBody: $s,
  stageGrid: Cs,
  band: Ss,
  bandBody: Rs,
  bandActions: Ts,
  scroller: Es,
  lanes: Ls
};
function Q1({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: le.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function hn(e) {
  return e ? "true" : void 0;
}
function Z1({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: le.subjectRail, "data-ward-subject-rail": t, "data-ruled": hn(i), children: [
    /* @__PURE__ */ n("div", { className: le.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: le.rail, "data-sticky": hn(l), "aria-label": r, children: a })
  ] });
}
function e$({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: c, measure: s }) {
  return c === "inline" ? /* @__PURE__ */ n("section", { className: le.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(dn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: le.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(dn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: le.recordBody, "data-pad": l, "data-measure": s, children: a })
  ] });
}
const As = "_form_1j8ub_2", xs = "_fields_1j8ub_9", Is = "_actions_1j8ub_19", Ra = {
  form: As,
  fields: xs,
  actions: Is
};
function a$({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ra.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ra.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ra.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function n$({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: le.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: le.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: le.bandActions, children: a })
  ] });
}
const qs = "(max-width: 767.98px)";
function Ba({ label: e, children: a, laneCount: t }) {
  const r = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { className: le.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: r, children: a });
}
function Ms({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ o("div", { className: le.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(L, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: l }),
    /* @__PURE__ */ n(Ba, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function t$({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = za(qs);
  return t === void 0 ? /* @__PURE__ */ n(Ba, { label: a, children: e }) : l ? /* @__PURE__ */ n(Ms, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Ba, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n(Nt, { children: i.content }, i.id)) });
}
function r$({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = p(null), i = Math.max(e, 1);
  An(l, i);
  const c = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: le.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: c, children: a });
}
const Bs = "_block_1o5o7_2", Ps = "_sentence_1o5o7_15", Os = "_meta_1o5o7_20", Ds = "_action_1o5o7_25", Hs = "_strip_1o5o7_29", Fs = "_loading_1o5o7_48", js = "_label_1o5o7_56", Ws = "_counter_1o5o7_63", we = {
  block: Bs,
  sentence: Ps,
  meta: Os,
  action: Ds,
  strip: Hs,
  loading: Fs,
  label: js,
  counter: Ws
};
function zs({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: we.action, children: /* @__PURE__ */ n(_, { onClick: e.onClick, children: e.label }) });
}
function ka({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${we.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: we.sentence, children: e }),
    t,
    /* @__PURE__ */ n(zs, { action: a })
  ] });
}
function Gs(e) {
  return /* @__PURE__ */ n(ka, { ...e, kind: "ward-emptystate" });
}
function l$({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ka, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function o$(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function i$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ka, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "failed at ",
    se(a)
  ] }) });
}
function c$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    se(e),
    ". Showing snapshot from ",
    se(a)
  ] });
}
function s$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    se(a)
  ] });
}
function d$({ label: e, startedAt: a }) {
  const t = p(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = g(!1);
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
const Us = "_note_tlubt_2", Ks = {
  note: Us
};
function Vs({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: Ks.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const Ys = "_card_12in3_2", Xs = "_hit_12in3_23", Js = "_head_12in3_30", Qs = "_title_12in3_36", Zs = "_meta_12in3_44", ed = "_fields_12in3_45", ad = "_who_12in3_58", nd = "_sep_12in3_65", td = "_mono_12in3_69", rd = "_field_12in3_45", ld = "_last_12in3_84", od = "_reason_12in3_96", X = {
  card: Ys,
  hit: Xs,
  head: Js,
  title: Qs,
  meta: Zs,
  fields: ed,
  who: ad,
  sep: nd,
  mono: td,
  field: rd,
  last: ld,
  reason: od
}, id = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function cd(e, a, t) {
  const r = la(e, "blue"), l = la(e, "orange"), i = la(e, "green"), c = p(/* @__PURE__ */ new Set());
  A(() => {
    if (!t) return;
    const s = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = id[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, l]);
}
const sd = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function dd(e, a) {
  return sd[a](e);
}
function ud({ item: e, connection: a }) {
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
      ce(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function hd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: X.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function md({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: X.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function wd({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: X.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: X.field, children: dd(e, t) }, t)) });
}
const Pa = (e) => e ? !0 : void 0;
function _d(e) {
  return { "--stream": Ee(e.streamStep, "id") };
}
function vd(e, a, t) {
  e == null || e(a, t);
}
function fd(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function bd({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: X.last, "data-stale": Pa(a), children: t }) : null;
}
function $a(e) {
  const a = e.fields ?? [], t = e.item, r = p(null);
  cd(r, t.key, e.feed);
  const l = fd(e.feed), i = _d(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: X.hit, onClick: (c) => vd(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(hd, { item: t }),
        /* @__PURE__ */ n("p", { className: X.title, children: t.title }),
        /* @__PURE__ */ n(ud, { item: t, connection: l }),
        /* @__PURE__ */ n(md, { reason: t.blockedReason }),
        /* @__PURE__ */ n(wd, { item: t, fields: a }),
        /* @__PURE__ */ n(bd, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const pd = "_column_10sxg_3", gd = "_head_10sxg_24", Nd = "_label_10sxg_33", yd = "_count_10sxg_42", kd = "_list_10sxg_56", Je = {
  column: pd,
  head: gd,
  label: Nd,
  count: yd,
  list: kd
};
function Pn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function $d({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Cd(e) {
  return /* @__PURE__ */ n("div", { className: Je.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      $a,
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
function Sd({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, v = Pn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n($d, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(Cd, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, rows: v }),
    h && /* @__PURE__ */ n(Vs, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Rd = "_foot_8qg4p_2", Td = "_note_8qg4p_13", Ed = "_link_8qg4p_19", Ta = {
  foot: Rd,
  note: Td,
  link: Ed
};
function u$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ta.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ta.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: Ta.link, href: F(e), children: "Configure board" })
  ] });
}
const Ld = "_head_1la6p_3", Ad = "_identity_1la6p_12", xd = "_titleRow_1la6p_18", Id = "_title_1la6p_18", qd = "_key_1la6p_35", Md = "_rollup_1la6p_45", Bd = "_tools_1la6p_53", Pd = "_swatch_1la6p_62", Od = "_mark_1la6p_69", be = {
  head: Ld,
  identity: Ad,
  titleRow: xd,
  title: Id,
  key: qd,
  rollup: Md,
  tools: Bd,
  swatch: Pd,
  mark: Od
}, mn = "initials:";
function Dd(e) {
  return e === void 0 ? "loaded this week unavailable" : `${Z(e)} loaded this week`;
}
function Hd(e) {
  const a = [Dd(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${Z(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function Fd(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      Z(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Hd(e)
  ] });
}
function jd(e) {
  return e.startsWith(mn) ? e.slice(mn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Wd({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ee(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${be.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: jd(e) }) : /* @__PURE__ */ n("span", { className: be.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function zd({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function h$({
  stream: e,
  rollups: a,
  connection: t,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: c,
  onConfigure: s,
  actions: u
}) {
  return /* @__PURE__ */ o("div", { className: be.head, children: [
    /* @__PURE__ */ o("div", { className: be.identity, children: [
      /* @__PURE__ */ o("div", { className: be.titleRow, children: [
        /* @__PURE__ */ n(Wd, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: be.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: be.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: be.rollup, "aria-live": "polite", children: Fd(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: be.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(zd, { owners: l, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(_, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Ka, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Gd = "_head_kabyh_11", Ud = "_line_kabyh_12", Kd = "_cHandle_kabyh_33", Vd = "_cName_kabyh_38", Yd = "_nameLine_kabyh_46", Xd = "_cLabel_kabyh_53", Jd = "_cCap_kabyh_58", Qd = "_cShown_kabyh_63", Zd = "_name_kabyh_46", eu = "_noCap_kabyh_85", au = "_state_kabyh_99", nu = "_handle_kabyh_104", tu = "_sub_kabyh_118", q = {
  head: Gd,
  line: Ud,
  cHandle: Kd,
  cName: Vd,
  nameLine: Yd,
  cLabel: Xd,
  cCap: Jd,
  cShown: Qd,
  name: Zd,
  noCap: eu,
  state: au,
  handle: nu,
  sub: tu
}, ru = "can't be hidden or collapsed", lu = "terminal · counted, not a column";
function m$() {
  return /* @__PURE__ */ o("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: q.cHandle }),
    /* @__PURE__ */ n("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: q.cShown, children: "Shown" })
  ] });
}
function ou(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function iu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function wn(e) {
  return e.gate ? ru : e.terminal ? lu : iu(e.agentsMounted);
}
function cu(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function su({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: q.cName, children: [
    /* @__PURE__ */ o("span", { className: q.nameLine, children: [
      /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    wn(e) && /* @__PURE__ */ n("span", { className: q.sub, children: wn(e) })
  ] });
}
function du(e) {
  return e === void 0 ? "" : String(e);
}
function uu(e) {
  return e === "" ? void 0 : Number(e);
}
function hu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: q.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => cu(t, a),
      children: "⠿"
    }
  ) });
}
function mu({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: q.cCap, children: /* @__PURE__ */ n(L, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: du(a.cap), onChange: (r) => t({ ...a, cap: uu(r) }) }) });
}
function wu({ stage: e, config: a, onChange: t }) {
  const r = ou(e, a.shown);
  return /* @__PURE__ */ o("span", { className: q.cShown, children: [
    /* @__PURE__ */ n(Oe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: q.state, "aria-hidden": "true", children: r.state })
  ] });
}
function _u(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function w$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: q.line, "data-kind": _u(e), children: [
    /* @__PURE__ */ n(hu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(su, { stage: e }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: /* @__PURE__ */ n(L, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(mu, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(wu, { stage: e, config: a, onChange: t })
  ] });
}
const vu = "_body_hn6d6_2", fu = "_head_hn6d6_9", bu = "_summary_hn6d6_19", pu = "_block_hn6d6_20", gu = "_actionsBlock_hn6d6_21", Nu = "_title_hn6d6_41", yu = "_note_hn6d6_46", ku = "_k_hn6d6_51", $u = "_kv_hn6d6_58", Cu = "_row_hn6d6_64", Su = "_label_hn6d6_75", Ru = "_value_hn6d6_84", Tu = "_quote_hn6d6_90", Eu = "_actions_hn6d6_21", Lu = "_resolve_hn6d6_103", B = {
  body: vu,
  head: fu,
  summary: bu,
  block: pu,
  actionsBlock: gu,
  title: Nu,
  note: yu,
  k: ku,
  kv: $u,
  row: Cu,
  label: Su,
  value: Ru,
  quote: Tu,
  actions: Eu,
  resolve: Lu
};
function Au(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function xu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Iu(e) {
  const a = ga(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function qu(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Na(Iu(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Au(e),
    ...xu(e, a)
  ];
}
function Mu({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: B.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: B.k, children: a }),
    e
  ] });
}
function Bu({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: B.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Pu({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: B.block, children: [
    /* @__PURE__ */ n("p", { className: B.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: B.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: B.note, children: e.agentMeta })
  ] }) : null;
}
function _$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = qu(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: B.body, children: [
    /* @__PURE__ */ n(Bu, { item: e }),
    /* @__PURE__ */ o("div", { className: B.summary, children: [
      /* @__PURE__ */ n("h2", { className: B.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: B.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: B.kv, children: d.map(([h, v]) => /* @__PURE__ */ o("div", { className: B.row, children: [
      /* @__PURE__ */ n("dt", { className: B.label, children: h }),
      /* @__PURE__ */ n("dd", { className: B.value, children: v })
    ] }, h)) }),
    /* @__PURE__ */ n(Pu, { item: e }),
    /* @__PURE__ */ o("div", { className: B.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: B.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: B.note, children: s })
    ] }),
    /* @__PURE__ */ n(Mu, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Ou = "_root_3azmy_2", Du = "_list_3azmy_7", Hu = "_item_3azmy_12", Fu = "_box_3azmy_18", ju = "_text_3azmy_23", Wu = "_note_3azmy_28", Fe = {
  root: Ou,
  list: Du,
  item: Hu,
  box: Fu,
  text: ju,
  note: Wu
};
function Ca({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: Fe.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Fe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Fe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Fe.box, children: /* @__PURE__ */ n(Ua, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Fe.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Fe.note} ward-checklist-note`, children: a })
  ] });
}
const zu = "_rail_ke7ch_2", Gu = "_k_ke7ch_11", Uu = "_head_ke7ch_19", Ku = "_section_ke7ch_25", Vu = "_card_ke7ch_38", Yu = "_strip_ke7ch_42", Xu = "_skeleton_ke7ch_56", Ju = "_skeletonLabel_ke7ch_70", Qu = "_bar_ke7ch_76", Zu = "_note_ke7ch_85", he = {
  rail: zu,
  k: Gu,
  head: Uu,
  section: Ku,
  card: Vu,
  strip: Yu,
  skeleton: Xu,
  skeletonLabel: Ju,
  bar: Qu,
  note: Zu
};
function eh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ea({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: he.k, children: e }),
    a
  ] });
}
function ah({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function nh({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Sd, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function th(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(nh, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(ah, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function v$(e) {
  const a = eh(e.onOpen), t = Pn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ea, { title: "Card", children: /* @__PURE__ */ n("div", { className: he.card, children: t && /* @__PURE__ */ n($a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ea, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(th, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ea, { title: "Effect of this config", children: /* @__PURE__ */ n(Ca, { items: e.effects, density: "compact" }) })
  ] });
}
function rh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function lh(e) {
  return Math.ceil(e.length / 2);
}
function oh(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function On(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function ih(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = On(e);
  l !== void 0 && t(l), r(oh(e.type));
}
function ch(e, a, t, r, l) {
  A(() => {
    if (e !== null)
      return e.subscribe(a, (i) => ih(i, t, r, l));
  }, [e, a, t, r, l]);
}
function sh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function dh(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function uh(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function hh(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(lh(a ?? [])) + ")"
  };
}
function mh(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function wh(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: ne(e.cost) }) : null;
}
function _h(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function vh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function fh(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function bh(e, a) {
  return a === void 0 ? e : rh(e, a.ref);
}
function ph(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ze(e) {
  return e === !0 ? "true" : void 0;
}
function Dn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = p(null), i = la(l), c = p(/* @__PURE__ */ new Set()), [s, u] = g(sh(a));
  ch(e.feed, a.key, c, u, i);
  const d = dh(a, r), h = uh(a, t), v = hh(a, e.fields), b = fh(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...ph(e),
      className: "ward-workcard",
      "data-flagged": Ze(a.flagged),
      "data-selected": Ze(e.selected),
      style: v,
      ref: bh(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        mh(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          wh(a, e.fields),
          _h(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          vh(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function gh({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Nh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function yh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function kh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(gh, { count: e.items.length, cap: e.column.cap });
}
function $h(e, a) {
  return e.roving ?? a;
}
function Ch(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Sh(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    Dn,
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
function Rh(e) {
  const a = k(), t = fa({ orientation: "vertical" }), r = $h(e, t), l = Nh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ze(l), "data-gate": Ze(e.column.gate), children: [
    yh(e.column, e.items.length, a),
    kh(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Ch(e, t), children: Sh(e, r) })
  ] });
}
function Th(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function Eh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Lh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function f$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Th(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Eh(e),
      Lh(e.onConfigure),
      /* @__PURE__ */ n(Ka, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Ah(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function xh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Oe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Oe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Ih(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function b$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ze(Ah(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: xh(e) }),
    /* @__PURE__ */ n(L, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(En, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Ih(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function p$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Dn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Rh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function qh(e, a) {
  const t = On(e);
  t !== void 0 && a(t);
}
function Mh(e, a, t) {
  A(() => {
    if (e != null)
      return e.subscribe(a, (r) => qh(r, t));
  }, [e, a, t]);
}
function Bh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Ph(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function Oh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Dh(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function g$(e) {
  var c;
  const a = e.item, t = a.run, [r, l] = g((c = a.run) == null ? void 0 : c.lastStep);
  Mh(e.feed, a.key, l);
  const i = [...Bh(a), ...Ph(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Oh(t, r)
    ] }),
    Dh(a, e.actions)
  ] });
}
const Hh = "_card_hvxp7_2", Fh = "_head_hvxp7_17", jh = "_mark_hvxp7_25", Wh = "_name_hvxp7_37", zh = "_chips_hvxp7_48", Gh = "_description_hvxp7_54", Uh = "_run_hvxp7_59", Kh = "_sep_hvxp7_68", Vh = "_facts_hvxp7_73", Yh = "_fact_hvxp7_73", Xh = "_factLabel_hvxp7_86", Jh = "_factValue_hvxp7_90", re = {
  card: Hh,
  head: Fh,
  mark: jh,
  name: Wh,
  chips: zh,
  description: Gh,
  run: Uh,
  sep: Kh,
  facts: Vh,
  fact: Yh,
  factLabel: Xh,
  factValue: Jh
}, Qh = { live: "done", draft: "running", paused: "meta" };
function Zh(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function em({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Qh[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function am({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: re.description, children: e });
}
function nm({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function tm({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ n("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function rm(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function lm({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: c }) {
  const s = { "--stream": Ee(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: Zh(c),
      style: s,
      "data-selected": u,
      "data-paused": rm(e.versions),
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ n("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${re.name} ward-rowlink`, href: F(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(am, { description: e.description }),
        /* @__PURE__ */ n(nm, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(em, { versions: e.versions }),
        /* @__PURE__ */ n(tm, { facts: i })
      ]
    }
  );
}
const om = "_list_4dcyc_2", im = "_row_4dcyc_11", cm = "_head_4dcyc_23", sm = "_id_4dcyc_30", dm = "_lock_4dcyc_35", um = "_reason_4dcyc_41", hm = "_remove_4dcyc_46", mm = "_clauses_4dcyc_50", wm = "_clause_4dcyc_50", _m = "_label_4dcyc_64", vm = "_cell_4dcyc_71", fm = "_value_4dcyc_76", ie = {
  list: om,
  row: im,
  head: cm,
  id: sm,
  lock: dm,
  reason: um,
  remove: hm,
  clauses: mm,
  clause: wm,
  label: _m,
  cell: vm,
  value: fm
}, Hn = Ve(!1);
function N$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Hn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function bm({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(L, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function pm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ie.reason, children: e })
  ] });
}
function gm({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ n("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(pm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function _n(e, a) {
  return e.locked ? void 0 : a;
}
function y$({ rule: e, onChange: a, onRemove: t }) {
  if (!Ke(Hn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = _n(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(gm, { rule: e, onRemove: _n(e, t) }),
    /* @__PURE__ */ n("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ n("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ie.cell, children: /* @__PURE__ */ n(bm, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Nm = "_ladder_wwnch_2", ym = "_cell_wwnch_7", km = "_empty_wwnch_26", $m = "_name_wwnch_34", Cm = "_holder_wwnch_40", Sm = "_request_wwnch_46", Rm = "_swatches_wwnch_51", Tm = "_swatch_wwnch_51", Em = "_tilesFrame_wwnch_78", Lm = "_tiles_wwnch_78", Am = "_tile_wwnch_78", xm = "_bar_wwnch_117", Im = "_hex_wwnch_128", qm = "_note_wwnch_138", T = {
  ladder: Nm,
  cell: ym,
  empty: km,
  name: $m,
  holder: Cm,
  request: Sm,
  swatches: Rm,
  swatch: Tm,
  tilesFrame: Em,
  tiles: Lm,
  tile: Am,
  bar: xm,
  hex: Im,
  note: qm
}, Mm = "not validated yet, pending a CVD matrix and dark stepping";
function Bm(e) {
  return e.reserved ? "reserved" : pa(e.step) ? "validated" : "partial";
}
function Fn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Pm(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Om({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Le, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${T.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Dm(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Hm(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const vn = (e) => String(e).padStart(2, "0");
function Fm(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Fn(e, void 0);
}
function jm({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${T.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${T.hex} ward-ladder-hex`, children: r ? `step ${vn(e)}` : Pt(e) }),
    /* @__PURE__ */ n("span", { className: `${T.note} ward-ladder-note`, children: r ? t : `Step ${vn(e)} · ${t}` })
  ] });
}
function Wm({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = Bm(e), c = Fn(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, v = `${d} · ${l === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": v, ...Hm(s, u), "data-validation": i, style: Pm(e, i), onClick: h, onKeyDown: (M) => Dm(M, h) }, label: v, name: d, holder: c, validation: i, note: Fm(i, t, u), step: e.step };
}
const zm = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${T.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${T.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(jm, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${T.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Om, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${T.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${T.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Gm(e) {
  return zm[e.presentation](Wm(e));
}
function Um(e) {
  for (const a of e)
    if (!a.reserved && !ba(a.step)) throw new Error("colour ladder renders token steps only");
}
function Km() {
  return /* @__PURE__ */ o("div", { className: `${T.cell} ward-ladder-cell ${T.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${T.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${T.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${T.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Vm(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Ym = { list: T.ladder, swatches: T.swatches, tiles: T.tilesFrame };
function Xm() {
  return /* @__PURE__ */ o("div", { className: `${T.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${T.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${T.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${T.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Jm = { list: Km, swatches: () => null, tiles: Xm };
function jn(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  Um(e.steps);
  const r = Vm(e), l = Jm[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(Gm, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${Ym[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: T.tiles, children: i }) : i });
}
const Qm = "_rail_1el2t_2", Zm = "_section_1el2t_12", ew = "_sectionFlush_1el2t_22", aw = "_head_1el2t_26", nw = "_headLabel_1el2t_34", tw = "_sample_1el2t_42", rw = "_sampleLabel_1el2t_47", lw = "_sampleTitle_1el2t_54", ow = "_sampleMeta_1el2t_59", iw = "_trace_1el2t_65", cw = "_traceHead_1el2t_70", sw = "_steps_1el2t_78", dw = "_step_1el2t_78", uw = "_stepTitle_1el2t_97", hw = "_hollow_1el2t_107", mw = "_stepBody_1el2t_115", ww = "_stepDetail_1el2t_127", _w = "_publish_1el2t_132", vw = "_reason_1el2t_138", fw = "_note_1el2t_143", bw = "_reveal_1el2t_148", N = {
  rail: Qm,
  section: Zm,
  sectionFlush: ew,
  head: aw,
  headLabel: nw,
  sample: tw,
  sampleLabel: rw,
  sampleTitle: lw,
  sampleMeta: ow,
  trace: iw,
  traceHead: cw,
  steps: sw,
  step: dw,
  stepTitle: uw,
  hollow: hw,
  stepBody: mw,
  stepDetail: ww,
  publish: _w,
  reason: vw,
  note: fw,
  reveal: bw
}, fn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, pw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, gw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Nw = { notSimulated: "not simulated", running: "running" };
function yw(e) {
  return e.presentation === "foundry";
}
function kw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function $w(e, a) {
  var r;
  const t = pw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Cw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Sw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Rw(e) {
  if (Cw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Tw(e) {
  const [a, t] = g(!1);
  A(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${N.step} ${N.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Ew(e) {
  const a = Nw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: N.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Le, { size: 6, kind: gw[e.kind], label: e.kind });
}
function Lw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: N.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Aw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function xw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Tw, { kind: a.kind, children: [
    /* @__PURE__ */ n(Ew, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: N.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: N.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Lw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Aw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Iw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ce(a)), t.join(" · ");
}
function Wn(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${N.trace} ${N.section}`, children: [
    /* @__PURE__ */ n("p", { className: N.traceHead, id: a, children: Iw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: N.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(xw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function qw(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${N.sample} ${N.section}`, children: [
    /* @__PURE__ */ n("p", { className: N.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ o("p", { className: N.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ o("p", { className: N.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Mw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + se(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${N.sampleMeta} ${N.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Bw(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Sn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(ya, { divided: !0, cells: a }) });
}
function Pw(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Sn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Ow(e) {
  const a = Pw(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: N.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(ya, { divided: !0, cells: a }) });
}
function zn(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: `${N.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Dw(e) {
  return /* @__PURE__ */ o("div", { className: `${N.publish} ${N.section}`, children: [
    /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: N.note, children: e.note })
  ] });
}
function Hw(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${N.publish} ${N.section}`, children: /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Gn(e) {
  return /* @__PURE__ */ o("div", { className: `${N.head} ${N.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: N.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: fn[e.run.status].role, label: fn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Fw(e, a) {
  const [t, r] = g(e.steps);
  return A(() => r(e.steps), [e.steps]), A(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var c, s;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((c = l.step) == null ? void 0 : c.label) ?? "step", detail: (s = l.step) == null ? void 0 : s.tool }];
        });
      });
  }, [a, e.status]), t;
}
function jw(e) {
  var t;
  Sw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(qw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Bw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist }) }),
    /* @__PURE__ */ n(Dw, { reason: kw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Ww(e) {
  var r;
  const a = Fw(e.run, e.feed);
  Rw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Mw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Ow, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Hw, { reason: $w(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function k$(e) {
  return yw(e) ? /* @__PURE__ */ n(Ww, { ...e }) : /* @__PURE__ */ n(jw, { ...e });
}
const zw = "_list_142ip_3", Gw = "_row_142ip_9", Uw = "_condition_142ip_18", Kw = "_action_142ip_24", oa = {
  list: zw,
  row: Gw,
  condition: Uw,
  action: Kw
}, Un = Ve(!1);
function $$({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Un.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oa.list, "aria-label": a, children: e }) });
}
function C$({ rule: e }) {
  if (!Ke(Un)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
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
function Kn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Vn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function bn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Vw(e) {
  return e === "up" ? "down" : "up";
}
function Yw(e, a) {
  const t = bn(e, a.id, a.direction) ?? bn(e, a.id, Vw(a.direction));
  t == null || t.focus();
}
function Yn() {
  const e = p(null), [a, t] = g(null), [r, l] = g("");
  return A(() => {
    e.current !== null && a !== null && Yw(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), l(s);
  } };
}
function Xn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ha({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Xw = "_body_1h15q_2", Jw = "_title_1h15q_8", Qw = "_section_1h15q_13", Zw = "_legend_1h15q_18", e_ = "_stages_1h15q_26", a_ = "_stage_1h15q_26", n_ = "_stageIndex_1h15q_44", t_ = "_stageName_1h15q_50", r_ = "_footer_1h15q_59", l_ = "_note_1h15q_66", o_ = "_reason_1h15q_71", i_ = "_actions_1h15q_76", c_ = "_webHead_1h15q_83", s_ = "_kicker_1h15q_92", d_ = "_webTitle_1h15q_99", u_ = "_webBody_1h15q_105", h_ = "_webSection_1h15q_109", m_ = "_sectionHead_1h15q_121", w_ = "_sectionNote_1h15q_129", __ = "_formLabel_1h15q_134", v_ = "_identityRow_1h15q_139", f_ = "_nameCell_1h15q_145", b_ = "_keyCell_1h15q_150", p_ = "_colourCell_1h15q_154", g_ = "_colourStatus_1h15q_161", N_ = "_webStages_1h15q_166", y_ = "_webStageList_1h15q_172", k_ = "_webStage_1h15q_166", $_ = "_webIndex_1h15q_191", C_ = "_webStageName_1h15q_196", S_ = "_webMoves_1h15q_201", R_ = "_addStage_1h15q_215", T_ = "_addStageButton_1h15q_223", E_ = "_addStageNote_1h15q_231", L_ = "_webFooter_1h15q_236", A_ = "_webFooterNotes_1h15q_244", x_ = "_webNote_1h15q_251", w = {
  body: Xw,
  title: Jw,
  section: Qw,
  legend: Zw,
  stages: e_,
  stage: a_,
  stageIndex: n_,
  stageName: t_,
  footer: r_,
  note: l_,
  reason: o_,
  actions: i_,
  webHead: c_,
  kicker: s_,
  webTitle: d_,
  webBody: u_,
  webSection: h_,
  sectionHead: m_,
  sectionNote: w_,
  formLabel: __,
  identityRow: v_,
  nameCell: f_,
  keyCell: b_,
  colourCell: p_,
  colourStatus: g_,
  webStages: N_,
  webStageList: y_,
  webStage: k_,
  webIndex: $_,
  webStageName: C_,
  webMoves: S_,
  addStage: R_,
  addStageButton: T_,
  addStageNote: E_,
  webFooter: L_,
  webFooterNotes: A_,
  webNote: x_
}, I_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Jn = "not in catalogue";
function q_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Jn}` }, ...t];
}
function M_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(L, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Jn}`;
  return /* @__PURE__ */ n(L, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: q_(t, e.name), invalid: i, onChange: r });
}
function Qn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function B_(e) {
  const a = p([]), t = p(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function P_({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: c }) {
  const s = Qn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(M_, { stage: a, index: t, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(L, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: I_, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ha, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ha, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function O_({ stages: e, onChange: a, catalogue: t }) {
  const r = B_(e.length), l = Yn(), i = (s, u) => {
    const d = Kn(s, u);
    r.current = Oa(r.current, s, d), l.moved({ id: r.current[d], direction: u }, Vn(Qn(e[s], s), d, e.length)), a(Oa(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(P_, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Xn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const D_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], H_ = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], F_ = "A new stream starts as a draft. Nothing runs on it until you publish it.", j_ = "Create is disabled: name the stream and give it a key first.", W_ = "reorder with the ↑ ↓ buttons · min 2";
function Va(e, a) {
  return !e.reserved && pa(e.step) && a[e.step] === void 0;
}
function z_(e, a) {
  const t = e.find((r) => Va(r, a));
  return t ? t.step : 1;
}
function G_({ stages: e, onMove: a }) {
  const t = Yn(), r = (l, i) => {
    const c = Kn(l, i);
    t.moved({ id: e[l].id, direction: i }, Vn(e[l].name, c, e.length)), a(l, c);
  };
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ha, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ha, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Xn, { text: t.announcement })
  ] });
}
function U_({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: F_ }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(_, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function K_(e, a) {
  return e !== "" && a !== "" ? null : j_;
}
function V_(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = H_, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [h, v] = g(""), [b, M] = g(""), [K, V] = g(a[0].value), [oe, $e] = g(() => z_(t, r)), [ee, De] = g(e.stages ?? D_), [He, $] = g(l[0].value), j = { name: h, key: b, streamStep: oe, owner: K, stages: ee, policy: He }, _e = K_(h, b);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Stream name", value: h, onChange: v }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Key", value: b, onChange: M, mono: !0 }),
      /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: K, onChange: V, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(jn, { label: "Stream colour", steps: t, value: oe, onChange: $e, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(G_, { stages: ee, onMove: (Ae, pt) => De(Oa(ee, Ae, pt)) })
    ] }),
    /* @__PURE__ */ n(qn, { legend: "Loop policy", options: l, value: He, onChange: $ }),
    /* @__PURE__ */ n(U_, { reason: _e, onCreate: () => i(j), onDraft: () => c(j) })
  ] }) });
}
const Zn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Y_ = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function X_(e, a, t, r, l, i) {
  var s;
  const c = ((s = Zn.find((u) => u.value === l)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function J_(e, a) {
  return Q_(e) && Z_(e, a) && ev(e);
}
function Q_(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Z_(e, a) {
  return e.colourStep !== null && Va({ step: e.colourStep }, a);
}
function ev(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function av(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${Mm}.` : Va({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function nv({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function tv({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(nv, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: Y_ })
    ] }),
    l && /* @__PURE__ */ n(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function rv({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function lv({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function ov(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [l, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, v] = g(null), [b, M] = g("relay"), [K, V] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = X_(l, c, u, h, b, K), $e = J_(oe, r), ee = K.find(($) => $.kind === "agent" && $.name.trim() !== ""), De = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(jn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: v, takenBy: r })
  ] }), He = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: av(h, r) }),
    /* @__PURE__ */ n(L, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: d })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(rv, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(lv, { name: l, setName: i, streamKey: c, setKey: s, colour: De, owner: He }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: W_ })
        ] }),
        /* @__PURE__ */ n(O_, { stages: K, onChange: V })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(qn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Zn, onChange: M }) }),
      /* @__PURE__ */ n(tv, { ready: $e, draft: oe, agentStage: ee, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function S$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ov, { ...e }) : /* @__PURE__ */ n(V_, { ...e });
}
const iv = "_row_bs8hc_2", cv = "_cell_bs8hc_6", sv = "_condition_bs8hc_11", dv = "_action_bs8hc_18", uv = "_contract_bs8hc_24", hv = "_contractCondition_bs8hc_33", mv = "_contractAction_bs8hc_39", J = {
  row: iv,
  cell: cv,
  condition: sv,
  action: dv,
  contract: uv,
  contractCondition: hv,
  contractAction: mv
}, et = ["advance", "block", "escalate", "requestReview"], pn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ma(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Ya(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: J.action, children: pn[e.then] }) : /* @__PURE__ */ n(
    L,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: et.map((l) => ({ value: l, label: pn[l] }))
    }
  );
}
function wv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: J.condition, title: ma(e, r), children: ma(e, r) }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: Ya(e, a, t) })
  ] });
}
function _v({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: J.row, children: [
    /* @__PURE__ */ o("td", { className: J.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: J.condition, children: ma(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: J.cell, children: Ya(e, a, t) })
  ] });
}
function vv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: J.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: J.contractCondition, children: ma(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: J.contractAction, children: Ya(e, a, t, !0) })
  ] });
}
const fv = { two: _v, four: wv, contract: vv };
function R$(e) {
  var t;
  if (!et.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = fv[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const bv = "_column_lurgk_2", pv = "_head_lurgk_17", gv = "_index_lurgk_23", Nv = "_name_lurgk_29", yv = "_meta_lurgk_38", kv = "_mono_lurgk_43", $v = "_gate_lurgk_50", Cv = "_reviewersLabel_lurgk_57", Sv = "_reviewers_lurgk_57", Rv = "_reviewer_lurgk_57", Tv = "_agents_lurgk_74", Ev = "_workflowColumn_lurgk_79", Lv = "_workflowHead_lurgk_96", Av = "_stageRow_lurgk_102", xv = "_stageLabel_lurgk_109", Iv = "_workflowTitle_lurgk_116", qv = "_workflowMeta_lurgk_122", Mv = "_workflowGate_lurgk_127", Bv = "_gateNote_lurgk_135", Pv = "_cardNote_lurgk_140", Ov = "_reviewerList_lurgk_149", Dv = "_reviewerRow_lurgk_155", Hv = "_reviewerMark_lurgk_161", Fv = "_reviewerName_lurgk_171", jv = "_terminalCard_lurgk_177", Wv = "_terminalCount_lurgk_186", zv = "_workflowAgents_lurgk_192", Gv = "_mount_lurgk_198", y = {
  column: bv,
  head: pv,
  index: gv,
  name: Nv,
  meta: yv,
  mono: kv,
  gate: $v,
  reviewersLabel: Cv,
  reviewers: Sv,
  reviewer: Rv,
  agents: Tv,
  workflowColumn: Ev,
  workflowHead: Lv,
  stageRow: Av,
  stageLabel: xv,
  workflowTitle: Iv,
  workflowMeta: qv,
  workflowGate: Mv,
  gateNote: Bv,
  cardNote: Pv,
  reviewerList: Ov,
  reviewerRow: Dv,
  reviewerMark: Hv,
  reviewerName: Fv,
  terminalCard: jv,
  terminalCount: Wv,
  workflowAgents: zv,
  mount: Gv
}, Uv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Xa(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function at(e) {
  return `${Math.round(e * 100)}%`;
}
function Kv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ya, { cells: [
      { value: at(e.gateShare), label: "Gate share", accent: "amber" },
      { value: Z(e.count), label: "In stage" }
    ] })
  ] });
}
function Vv({ stage: e }) {
  return /* @__PURE__ */ n(ya, { cells: [
    { value: Z(e.count), label: "In stage" },
    { value: Xa(e.closedThisWeek, Z), label: "Closed this week" }
  ] });
}
function Yv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: Uv[e.kind] })
  ] });
}
function Xv({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: y.meta, children: [
    /* @__PURE__ */ o("span", { className: y.mono, children: [
      Z(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: y.mono, children: [
      ce(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Jv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Kv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Vv, { stage: e }) : null;
}
function Qv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Zv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: y.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Yv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(Xv, { stage: e }),
    /* @__PURE__ */ n(Jv, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(lm, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(Qv, { onMount: t })
  ] });
}
const ef = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function af({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function nf({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(af, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: at(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function tf(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function rf({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: Xa(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: tf(e.rolledBackThisWeek) })
  ] });
}
function lf(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function of(e) {
  if (e.kind === "terminal") return `${Xa(e.closedThisWeek)} this week`;
  const a = lf(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function cf({ stage: e, titleId: a }) {
  const t = ef[e.kind];
  return /* @__PURE__ */ o("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: y.stageRow, children: [
      /* @__PURE__ */ o("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: of(e) })
  ] });
}
function sf(e) {
  return e === "entry" || e === "agent";
}
function df({ stage: e, onMount: a }) {
  return a === void 0 || !sf(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function uf({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ o("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(cf, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(nf, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(rf, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(df, { stage: e, onMount: t })
  ] });
}
function hf(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function T$(e) {
  return hf(e) ? /* @__PURE__ */ n(uf, { ...e }) : /* @__PURE__ */ n(Zv, { ...e });
}
const mf = "_row_ve78g_6", wf = "_cell_ve78g_10", _f = "_name_ve78g_19", vf = "_chain_ve78g_26", ff = "_owner_ve78g_32", bf = "_mono_ve78g_38", pf = "_compactRow_ve78g_45", gf = "_compactCell_ve78g_54", Nf = "_stack_ve78g_71", yf = "_stat_ve78g_78", kf = "_identityLine_ve78g_85", $f = "_identity_ve78g_85", Cf = "_compactName_ve78g_103", Sf = "_ownerLine_ve78g_117", Rf = "_link_ve78g_130", Tf = "_emptyChain_ve78g_136", Ef = "_arrow_ve78g_142", Lf = "_muted_ve78g_143", Af = "_define_ve78g_148", xf = "_statValue_ve78g_155", If = "_policyId_ve78g_161", qf = "_sub_ve78g_166", f = {
  row: mf,
  cell: wf,
  name: _f,
  chain: vf,
  owner: ff,
  mono: bf,
  compactRow: pf,
  compactCell: gf,
  stack: Nf,
  stat: yf,
  identityLine: kf,
  identity: $f,
  compactName: Cf,
  ownerLine: Sf,
  link: Rf,
  emptyChain: Tf,
  arrow: Ef,
  muted: Lf,
  define: Af,
  statValue: xf,
  policyId: If,
  sub: qf
};
function Mf(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Bf(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function nt(e) {
  return `${Z(e)} ${e === 1 ? "member" : "members"}`;
}
function Pf(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${nt(e.members)}`;
}
function Of(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ o("span", { className: f.stack, children: [
    /* @__PURE__ */ o("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: F(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Pf(e) })
  ] }) });
}
function Df(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function Hf(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: F(a), children: "Define workflow" })
  ] }) : Df(e) });
}
function gn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, title: r, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function Ff(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function jf(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Wf({ stream: e, href: a, presentation: t }) {
  const r = Bf(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ee(e.streamStep, "chip") }, children: [
    Of(e, a),
    Hf(e.stages, a),
    gn(jf(e.agents), e.agents === void 0 ? void 0 : Mf(e.agents), "—"),
    Ff(e.policy),
    gn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function zf(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function E$(e) {
  if (zf(e)) return Wf(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: f.row, children: [
    /* @__PURE__ */ o("td", { className: f.cell, children: [
      /* @__PURE__ */ n("a", { className: f.name, href: F(t), children: a.name }),
      /* @__PURE__ */ n(m, { ...Na(a.key, a.streamStep) }),
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
      /* @__PURE__ */ n("span", { className: f.mono, children: nt(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, title: a.inFlightHint, children: Z(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const Gf = "_row_mdce7_2", Uf = "_name_mdce7_16", Kf = "_scope_mdce7_24", wa = {
  row: Gf,
  name: Uf,
  scope: Kf
};
function Vf(e) {
  return e === void 0 ? `${wa.row} ward-toolrow` : `${wa.row} ward-toolrow ${e}`;
}
function Yf(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Xf({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function Jf({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Qf({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${wa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Zf(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function L$({ tool: e, onChange: a, presentation: t }) {
  const r = k(), l = k(), i = Yf(e, t), c = Zf(t);
  return /* @__PURE__ */ o(c, { className: Vf(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Xf, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${wa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Qf, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(Jf, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const eb = "_strip_1qtlf_2", ab = "_head_1qtlf_10", nb = "_name_1qtlf_16", tb = "_chart_1qtlf_24", rb = "_segment_1qtlf_30", lb = "_detailedChart_1qtlf_36", ob = "_rail_1qtlf_49", ib = "_section_1qtlf_55", cb = "_label_1qtlf_66", sb = "_note_1qtlf_83", Q = {
  strip: eb,
  head: ab,
  name: nb,
  chart: tb,
  segment: rb,
  detailedChart: lb,
  rail: ob,
  section: ib,
  label: cb,
  note: sb
}, db = "No item in flight to preview.", ub = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", hb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Da = [1, 2, 3, 4, 5, 6], _a = 100;
function mb(e, a) {
  return a.has(e) ? Ee(e, "id") : "var(--ward-color-line)";
}
function wb({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: Q.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Da.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: Q.segment,
      x: l * _a,
      y: "0",
      width: _a,
      height: "8",
      fill: mb(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function _b(e) {
  const a = e.slice(0, Da.length);
  for (; a.length < Da.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function vb({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${Q.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * _a),
        y: "0",
        width: String(_a),
        height: "40",
        style: { fill: Ee(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function tt(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ta({ label: e, children: a }) {
  const t = k();
  return /* @__PURE__ */ o("section", { className: Q.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: Q.label, children: e }),
    a
  ] });
}
function fb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: Q.note, children: a ?? db }) : /* @__PURE__ */ n($a, { item: { ...e, streamStep: ga(t.streamStep) }, onOpen: tt(r), feed: null });
}
function bb({ draft: e }) {
  const a = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: Q.head, style: a, children: [
    /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: Q.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
  ] });
}
function pb(e) {
  const a = _b(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: Q.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ta, { label: "Board card", children: /* @__PURE__ */ n(fb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ta, { label: "Streams index row", children: /* @__PURE__ */ n(bb, { draft: t }) }),
    /* @__PURE__ */ o(ta, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(vb, { identities: a }),
      /* @__PURE__ */ n("p", { className: Q.note, children: ub })
    ] }),
    /* @__PURE__ */ n(ta, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: Q.note, children: hb }) })
  ] });
}
function gb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: Q.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: Q.head, children: [
      /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: Q.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n($a, { item: { ...a, streamStep: e.streamStep }, onOpen: tt(r) }),
    /* @__PURE__ */ n(wb, { draft: e, streams: t })
  ] });
}
function A$(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(pb, { ...e }) : /* @__PURE__ */ n(gb, { ...e });
}
const Nb = "_row_ixlg5_6", yb = "_headCell_ixlg5_10", kb = "_cell_ixlg5_11", $b = "_name_ixlg5_23", Cb = "_consequence_ixlg5_29", Sb = "_governed_ixlg5_36", Rb = "_control_ixlg5_42", Tb = "_byRole_ixlg5_48", Eb = "_webControl_ixlg5_59", Lb = "_webConsequence_ixlg5_65", Ab = "_webGoverned_ixlg5_71", O = {
  row: Nb,
  headCell: yb,
  cell: kb,
  name: $b,
  consequence: Cb,
  governed: Sb,
  control: Rb,
  byRole: Tb,
  webControl: Eb,
  webConsequence: Lb,
  webGoverned: Ab
};
function xb({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: O.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: O.control, children: [
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
function Ib({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: O.headCell, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: O.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: O.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(xb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function qb(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Mb({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${O.webControl} ${O.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Oe,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (l) => t == null ? void 0 : t(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${O.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "PILOT" }),
    r
  ] });
}
function Bb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Mb, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webGoverned} ward-cellmeta`, children: qb(e) }) })
  ] });
}
function x$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Bb, { ...e }) : /* @__PURE__ */ n(Ib, { ...e });
}
const Pb = "_row_vv64h_2", Ob = "_cell_vv64h_6", Db = "_name_vv64h_25", Hb = "_note_vv64h_30", Fb = "_webName_vv64h_41", jb = "_webMeta_vv64h_47", G = {
  row: Pb,
  cell: Ob,
  name: Db,
  note: Hb,
  webName: Fb,
  webMeta: jb
}, rt = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Wb(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function zb({ component: e, onRestart: a }) {
  const t = k(), r = rt[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: G.row, children: [
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: G.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: G.cell, "data-mono": "true", children: [
      Z(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { id: t, className: G.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: G.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(_, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Gb({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: Wb(e.state) });
}
function Ub({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: G.row, children: [
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: `${G.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: `${G.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(m, { ...rt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(Gb, { component: e, onRestart: a }) })
  ] });
}
function I$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ub, { ...e }) : /* @__PURE__ */ n(zb, { ...e });
}
const Kb = "_row_1f1gp_7", Vb = "_cell_1f1gp_11", Yb = "_next_1f1gp_28", Xb = "_headCell_1f1gp_38", Jb = "_webId_1f1gp_77", Qb = "_webPurpose_1f1gp_83", Zb = "_webMeta_1f1gp_91", ep = "_webUrgent_1f1gp_97", D = {
  row: Kb,
  cell: Vb,
  next: Yb,
  headCell: Xb,
  webId: Jb,
  webPurpose: Qb,
  webMeta: Zb,
  webUrgent: ep
}, ap = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, np = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, lt = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], tp = Object.fromEntries(lt.map((e) => [e.key, e]));
function je({ column: e, children: a }) {
  const t = tp[e];
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
function q$() {
  return /* @__PURE__ */ n("tr", { children: lt.map((e) => /* @__PURE__ */ n(
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
function rp({ cred: e }) {
  const a = ap[e.state];
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ n(je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(je, { column: "id", children: e.id }),
    /* @__PURE__ */ n(je, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(je, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(je, { column: "next", children: /* @__PURE__ */ n("span", { className: D.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function lp({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ${D.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function op({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(lp, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...np[e.state] }) })
  ] });
}
function M$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(op, { ...e }) : /* @__PURE__ */ n(rp, { ...e });
}
const ip = "_card_17zba_2", cp = "_head_17zba_11", sp = "_env_17zba_18", dp = "_version_17zba_25", up = "_meta_17zba_32", hp = "_webCard_17zba_37", mp = "_webRow_17zba_47", wp = "_webTitle_17zba_55", _p = "_webLine_17zba_65", vp = "_webVersion_17zba_72", fp = "_webMeta_17zba_77", z = {
  card: ip,
  head: cp,
  env: sp,
  version: dp,
  meta: up,
  webCard: hp,
  webRow: mp,
  webTitle: wp,
  webLine: _p,
  webVersion: vp,
  webMeta: fp
}, ot = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function bp({ env: e }) {
  const a = ot[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: z.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ o("div", { className: z.head, children: [
      /* @__PURE__ */ n("span", { className: z.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: z.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: z.meta, children: [
      "deployed ",
      se(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: z.meta, children: t })
  ] });
}
function pp(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [se(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function gp(e) {
  return /* @__PURE__ */ o("article", { className: `${z.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${z.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${z.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...ot[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${z.version} ${z.webVersion} ${z.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${z.meta} ${z.webMeta} ${z.webLine} ward-cellmeta`, children: pp(e) })
  ] });
}
function B$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(gp, { ...e }) : /* @__PURE__ */ n(bp, { ...e });
}
const Np = "_panel_1hmja_2", yp = "_line_1hmja_8", kp = "_actions_1hmja_14", ra = {
  panel: Np,
  line: yp,
  actions: kp
};
function P$(e) {
  return /* @__PURE__ */ o("div", { className: ra.panel, children: [
    /* @__PURE__ */ n("p", { className: ra.line, children: e.status }),
    /* @__PURE__ */ n(L, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ra.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ra.line, children: e.note ?? "" })
  ] });
}
const $p = "_upload_erepj_2", Cp = "_preview_erepj_7", Sp = "_mark_erepj_17", Rp = "_empty_erepj_22", Tp = "_actions_erepj_28", Ep = "_input_erepj_33", Lp = "_reasons_erepj_41", Ap = "_reason_erepj_41", xp = "_accepted_erepj_57", ae = {
  upload: $p,
  preview: Cp,
  mark: Sp,
  empty: Rp,
  actions: Tp,
  input: Ep,
  reasons: Lp,
  reason: Ap,
  accepted: xp
}, it = 1.5, ct = 22, va = "script elements or event handlers", Se = "links or external references", ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${it}px at ${ct}px`], Ip = [ye[1], ye[2], va, Se], qp = /* @__PURE__ */ new Map([
  ["image", ye[1]],
  ["text", ye[2]],
  ["tspan", ye[2]],
  ["textPath", ye[2]],
  ["script", va],
  ["foreignObject", va],
  ["a", Se],
  ["use", Se],
  ["style", Se],
  ["feImage", Se],
  ["set", Se]
]), Mp = "http://www.w3.org/2000/svg", Bp = "http://www.w3.org/2000/xmlns/", Pp = /* @__PURE__ */ new Set([
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
]), Op = /* @__PURE__ */ new Set([
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
]), Dp = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, Hp = /url\s*\(|['"\\]/i;
function Fp() {
  return { ok: !1, reasons: [ye[1]] };
}
function st(e) {
  return e.namespaceURI === Mp || e.namespaceURI === null;
}
function jp(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && st(a) ? a : null;
  } catch {
    return null;
  }
}
function Wp(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [ye[0]] : [];
}
function zp(e) {
  return qp.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function Gp(e) {
  return Hp.test(e.replace(Dp, ""));
}
function Up(e) {
  return /^on/i.test(e.localName) ? va : e.localName === "href" || Gp(e.value) ? Se : void 0;
}
function Kp(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(zp(t));
    for (const r of Array.from(t.attributes)) a.add(Up(r));
  }
  return Ip.filter((t) => a.has(t));
}
function Vp(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? ct / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < it;
  }) ? [ye[3]] : [];
}
function Yp(e) {
  if (e.namespaceURI === Bp) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Op.has(a) || a.startsWith("stroke"));
}
function Xp(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && st(a) && Pp.has(a.localName);
}
function Jp(e, a) {
  Xp(a) ? a.nodeType === Node.ELEMENT_NODE && dt(a) : e.removeChild(a);
}
function dt(e) {
  for (const a of Array.from(e.attributes)) Yp(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) Jp(e, a);
  return e;
}
function O$(e) {
  const a = jp(e);
  if (a === null) return Fp();
  const t = [...Wp(a), ...Kp(a), ...Vp(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(dt(a)) };
}
const Qp = "Mark accepted.";
function Zp({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: ae.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: ae.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: ae.empty }) });
}
function eg(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function ag(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function ng({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: ae.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: ae.result, role: "status", children: /* @__PURE__ */ n("p", { className: ae.accepted, children: Qp }) }) : /* @__PURE__ */ n("div", { className: ae.result, role: "status", children: /* @__PURE__ */ n("ul", { className: ae.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: ae.reason, children: a }, a)) }) });
}
function tg({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(ng, { result: e }) : /* @__PURE__ */ n("p", { className: `${ae.result} ${eg(e, t)}`, role: "status", children: ag(e, t) });
}
function D$({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = p(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ o("div", { className: ae.upload, children: [
    /* @__PURE__ */ n(Zp, { current: e }),
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
            var d;
            return s((d = u.target.files) == null ? void 0 : d[0]);
          }
        }
      ),
      /* @__PURE__ */ n(_, { onClick: () => {
        var u;
        return (u = l.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(_, { variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(tg, { result: i, presentation: r })
  ] });
}
const rg = "_row_1wp9s_7", lg = "_cell_1wp9s_11", og = "_head_1wp9s_28", ig = "_name_1wp9s_34", cg = "_pinned_1wp9s_42", sg = "_headCell_1wp9s_49", dg = "_webName_1wp9s_88", ug = "_webMeta_1wp9s_95", hg = "_webWarn_1wp9s_103", I = {
  row: rg,
  cell: lg,
  head: og,
  name: ig,
  pinned: cg,
  headCell: sg,
  webName: dg,
  webMeta: ug,
  webWarn: hg
}, Ja = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, ut = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], mg = Object.fromEntries(ut.map((e) => [e.key, e]));
function wg(e, a) {
  return `mcp.${e}.${a}`;
}
function _g(e) {
  return Object.keys(Ja).includes(e);
}
function vg(e) {
  return Ja[e !== void 0 && _g(e) ? e : "unknown"];
}
function Ye({ column: e, children: a }) {
  const t = mg[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: I.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function H$() {
  return /* @__PURE__ */ n("tr", { children: ut.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: I.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function fg({ server: e }) {
  const a = Ja[e.connection];
  return /* @__PURE__ */ o("tr", { className: I.row, children: [
    /* @__PURE__ */ o(Ye, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: I.head, children: [
        /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: I.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(Ye, { column: "connection", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ye, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(Ye, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(Ye, { column: "tools", children: e.tools.map((t) => wg(e.name, t)).join(" · ") })
  ] });
}
function bg(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function pg(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function gg({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${I.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${I.webMeta} ward-cellmeta`, children: e });
}
function Ng({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${I.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function yg({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function kg({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: I.row, children: [
    /* @__PURE__ */ o("td", { className: I.cell, children: [
      /* @__PURE__ */ n("span", { className: `${I.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${I.webMeta} ward-cellmeta`, children: bg(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n("span", { className: `${I.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n(m, { ...pg(e) }) }),
    /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n(gg, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n(m, { ...vg(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: I.cell, children: [
      /* @__PURE__ */ n(Ng, { server: e, onRestart: a }),
      /* @__PURE__ */ n(yg, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function F$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(kg, { ...e }) : /* @__PURE__ */ n(fg, { ...e });
}
const $g = "_row_1h9nq_2", Cg = "_headCell_1h9nq_14", Sg = "_cell_1h9nq_15", Rg = "_name_1h9nq_26", Tg = "_consequence_1h9nq_32", Eg = "_reason_1h9nq_38", Lg = "_value_1h9nq_44", Ag = "_webRow_1h9nq_60", xg = "_webSetting_1h9nq_71", Ig = "_webName_1h9nq_79", qg = "_webConsequence_1h9nq_87", Mg = "_webControl_1h9nq_93", Bg = "_webState_1h9nq_106", Pg = "_webChip_1h9nq_111", E = {
  row: $g,
  headCell: Cg,
  cell: Sg,
  name: Rg,
  consequence: Tg,
  reason: Eg,
  value: Lg,
  webRow: Ag,
  webSetting: xg,
  webName: Ig,
  webConsequence: qg,
  webControl: Mg,
  webState: Bg,
  webChip: Pg
}, ht = 104, mt = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Og({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Oe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(xn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: E.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Dg({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = k(), i = mt[t], c = t === "locked";
  return /* @__PURE__ */ o("tr", { className: E.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ n("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: E.cell, children: /* @__PURE__ */ n(Og, { control: a, name: e.name, locked: c, describedBy: c ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: E.cell, style: { width: ht }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function wt(e, a) {
  return String(e ?? a);
}
function Hg(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Fg(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? wt(e.value, "—");
}
function jg({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: E.webControl, children: [
    /* @__PURE__ */ n(Oe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => l == null ? void 0 : l(c) }),
    /* @__PURE__ */ n("span", { className: E.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function Wg(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(jg, { ...e });
  const l = Hg(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(xn, { options: l, value: wt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: Fg(a) });
}
function zg({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const c = k(), s = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: E.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: c, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: E.webControl, children: i(c) }) : /* @__PURE__ */ n(Wg, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${E.webChip} ward-policy-chip`, style: { width: ht }, children: /* @__PURE__ */ n(m, { ...mt[t], size: "tag" }) })
  ] });
}
function j$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(zg, { ...e }) : /* @__PURE__ */ n(Dg, { ...e });
}
const Gg = "_label_1o9za_7", Ug = "_name_1o9za_15", Kg = "_column_1o9za_24", Vg = "_webFrame_1o9za_57", Yg = "_webHead_1o9za_62", Xg = "_webHeadLabel_1o9za_74", Jg = "_webLabel_1o9za_112", Qg = "_webColumns_1o9za_119", Zg = "_webGroup_1o9za_125", eN = "_webPeople_1o9za_126", aN = "_webVia_1o9za_127", nN = "_webMeta_1o9za_156", H = {
  label: Gg,
  name: Ug,
  column: Kg,
  webFrame: Vg,
  webHead: Yg,
  webHeadLabel: Xg,
  webLabel: Jg,
  webColumns: Qg,
  webGroup: Zg,
  webPeople: eN,
  webVia: aN,
  webMeta: nN
}, tN = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, La = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Aa({ column: e, children: a }) {
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
function rN(e) {
  if (!e.matrixRole) return;
  const a = tN[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function lN({ node: e }) {
  const a = rN(e);
  return /* @__PURE__ */ o("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(oN, { role: a, node: e }),
    /* @__PURE__ */ n(Aa, { column: La[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Aa, { column: La[1], children: e.people === void 0 ? "" : Z(e.people) }),
    /* @__PURE__ */ n(Aa, { column: La[2], children: e.requestedVia ?? "" })
  ] });
}
function oN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function iN({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    Bn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(lN, { node: t }),
      children: c
    }
  );
}
function xa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function cN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(xa, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(xa, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(xa, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function sN() {
  return /* @__PURE__ */ o("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function dN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function uN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function hN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(sN, {}),
    /* @__PURE__ */ n(ss, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Bn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(dN, { row: t }),
        detail: /* @__PURE__ */ n(cN, { row: t }),
        expanded: uN(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function W$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(hN, { ...e }) : /* @__PURE__ */ n(iN, { ...e });
}
const mN = "_runbook_b9agc_2", wN = "_list_b9agc_7", _N = "_step_b9agc_15", vN = "_numeral_b9agc_21", fN = "_body_b9agc_28", bN = "_head_b9agc_34", pN = "_title_b9agc_40", gN = "_detail_b9agc_45", NN = "_actions_b9agc_50", yN = "_webList_b9agc_56", kN = "_webStep_b9agc_60", $N = "_webBody_b9agc_66", CN = "_webTitle_b9agc_74", SN = "_webDetail_b9agc_78", R = {
  runbook: mN,
  list: wN,
  step: _N,
  numeral: vN,
  body: fN,
  head: bN,
  title: pN,
  detail: gN,
  actions: NN,
  webList: yN,
  webStep: kN,
  webBody: $N,
  webTitle: CN,
  webDetail: SN
}, _t = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function vt(e) {
  return String(e + 1).padStart(2, "0");
}
function RN({ step: e, index: a, connection: t }) {
  const r = _t[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: R.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: R.numeral, children: vt(a) }),
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
function TN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: R.runbook, children: [
    /* @__PURE__ */ n("ol", { className: R.list, children: e.map((r, l) => /* @__PURE__ */ n(RN, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: R.actions, children: a })
  ] });
}
function EN({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${R.step} ${R.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${R.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: vt(a) }),
    /* @__PURE__ */ o("span", { className: `${R.body} ${R.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${R.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${R.title} ${R.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ..._t[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${R.detail} ${R.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function LN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: R.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${R.list} ${R.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(EN, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${R.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function z$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(LN, { ...e }) : /* @__PURE__ */ n(TN, { ...e });
}
const AN = "_list_1gu6a_2", xN = "_check_1gu6a_10", IN = "_body_1gu6a_16", qN = "_text_1gu6a_23", MN = "_pending_1gu6a_32", BN = "_measured_1gu6a_37", ze = {
  list: AN,
  check: xN,
  body: IN,
  text: qN,
  pending: MN,
  measured: BN
};
function PN(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function ON({ check: e }) {
  const a = PN(e.passed);
  return /* @__PURE__ */ o("li", { className: `${ze.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Ua, { state: a.state, label: a.label }),
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
function G$({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(ON, { check: a }, a.text)) });
}
const DN = "_root_16pdz_2", HN = "_list_16pdz_9", FN = "_line_16pdz_16", jN = "_at_16pdz_43", WN = "_text_16pdz_47", zN = "_foot_16pdz_51", GN = "_idle_16pdz_62", UN = "_caret_16pdz_69", KN = "_jump_16pdz_76", pe = {
  root: DN,
  list: HN,
  line: FN,
  at: jN,
  text: WN,
  foot: zN,
  idle: GN,
  caret: UN,
  jump: KN
}, VN = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Qa(e) {
  return Number.isNaN(Date.parse(e)) ? "" : VN.format(new Date(e));
}
const YN = { warn: "warning", ok: "ok" };
function XN({ kind: e }) {
  const a = YN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function JN({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Qa(e)}` });
}
function QN({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Qa(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${pe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${pe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: pe.idle, children: i }),
    /* @__PURE__ */ n(JN, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function U$({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = p(null), [i, c] = g(0), s = e.at(-1);
  A(() => {
    c(e.length);
  }, [e.length]);
  const u = () => {
    var v;
    const d = l.current;
    if (!d) return;
    d.scrollTop = d.scrollHeight;
    const h = d.querySelectorAll("[data-consline-text]");
    (v = h.item(h.length - 1)) == null || v.focus();
  };
  return /* @__PURE__ */ o("div", { className: pe.root, children: [
    /* @__PURE__ */ n("ol", { className: pe.list, ref: l, "aria-live": "off", "aria-label": r, children: e.map((d, h) => /* @__PURE__ */ o("li", { className: `${pe.line} ward-consline ward-reveal ward-consline--${d.kind}`, "data-kind": d.kind, "data-revealed": h < i, children: [
      /* @__PURE__ */ n("span", { className: pe.at, children: Qa(d.at) }),
      /* @__PURE__ */ n(XN, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: pe.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(QN, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${pe.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const ZN = "_row_11jhe_2", ey = "_head_11jhe_14", ay = "_author_11jhe_20", ny = "_eta_11jhe_25", ty = "_edited_11jhe_26", ry = "_body_11jhe_32", ly = "_reason_11jhe_37", oy = "_actions_11jhe_42", fe = {
  row: ZN,
  head: ey,
  author: ay,
  eta: ny,
  edited: ty,
  body: ry,
  reason: ly,
  actions: oy
}, iy = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function cy(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function sy({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function dy({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: fe.reason, id: a, children: e })
  ] });
}
function uy(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function hy(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(sy, { ...e }) : /* @__PURE__ */ n(dy, { reason: e.unavailable, reasonId: e.unavailableId });
}
function K$(e) {
  const { comment: a } = e;
  uy(e);
  const t = k(), r = `${t}-unavailable`, l = iy[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${fe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: fe.head, children: [
      /* @__PURE__ */ n("span", { className: fe.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: fe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: fe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: fe.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: fe.reason, id: t, children: cy(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: fe.actions, children: /* @__PURE__ */ n(hy, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const my = "_root_c46wj_2", wy = "_attach_c46wj_11", _y = "_actions_c46wj_17", vy = "_reply_c46wj_23", fy = "_replyRow_c46wj_28", by = "_sendsAs_c46wj_42", Ue = {
  root: my,
  attach: wy,
  actions: _y,
  reply: vy,
  replyRow: fy,
  sendsAs: by
};
function py({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = g(""), i = k();
  return /* @__PURE__ */ o("div", { className: Ue.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ue.replyRow, children: [
      /* @__PURE__ */ n(L, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(_, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ue.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function V$(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(py, { ...e }) : /* @__PURE__ */ n(gy, { ...e });
}
function gy({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ o("div", { className: Ue.root, children: [
    /* @__PURE__ */ n(L, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ o("div", { className: Ue.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      En,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Ue.actions, children: [
      /* @__PURE__ */ n(_, { variant: "primary", onClick: () => l(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(_, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const Ny = "_list_1ih9e_2", yy = "_item_1ih9e_6", ky = "_body_1ih9e_22", $y = "_text_1ih9e_28", Cy = "_evidence_1ih9e_37", Sy = "_consequence_1ih9e_49", Ry = "_note_1ih9e_54", Pe = {
  list: Ny,
  item: yy,
  body: ky,
  text: $y,
  evidence: Cy,
  consequence: Sy,
  note: Ry
};
function Ty({ criterion: e }) {
  return /* @__PURE__ */ n(Le, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Nn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Ey(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function Ly({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Pe.body, children: [
    /* @__PURE__ */ n("span", { className: Pe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(Nn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Pe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(Nn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Pe.consequence, children: Ey(e.why) })
    ] })
  ] });
}
function Ay({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Pe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Ty, { criterion: e }),
    /* @__PURE__ */ n(Ly, { criterion: e })
  ] });
}
function Y$({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Ay, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Pe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const xy = "_list_dwhoz_2", Iy = "_rung_dwhoz_6", qy = "_name_dwhoz_18", My = "_actor_dwhoz_32", ia = {
  list: xy,
  rung: Iy,
  name: qy,
  actor: My
}, By = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function Py({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = By[e.state];
  return /* @__PURE__ */ o("li", { className: ia.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ia.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ia.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function X$({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ia.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(Py, { rung: a }, a.name)) });
}
const Oy = "_sheet_1fqco_2", Dy = "_title_1fqco_9", Hy = "_stage_1fqco_15", Fy = "_effects_1fqco_20", jy = "_effect_1fqco_20", Wy = "_numeral_1fqco_31", zy = "_effectText_1fqco_38", Gy = "_refusals_1fqco_43", Uy = "_reasons_1fqco_52", Ky = "_reason_1fqco_52", Vy = "_actions_1fqco_62", ue = {
  sheet: Oy,
  title: Dy,
  stage: Hy,
  effects: Fy,
  effect: jy,
  numeral: Wy,
  effectText: zy,
  refusals: Gy,
  reasons: Uy,
  reason: Ky,
  actions: Vy
};
function Yy({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function J$({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: c }) {
  const s = k(), u = `${s}-refusal`, [d, h] = g(""), v = t.length > 0;
  return /* @__PURE__ */ n(ea, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ue.effects, children: a.map((b, M) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ n("span", { className: ue.numeral, children: String(M + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ue.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      Zi,
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
    v && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((b, M) => /* @__PURE__ */ n("li", { className: ue.reason, id: M === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(Yy, { refused: v, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ n(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const Xy = "_list_1hvqu_2", Jy = "_path_1hvqu_7", Qy = "_head_1hvqu_21", Zy = "_label_1hvqu_28", ek = "_consequence_1hvqu_35", ak = "_ask_1hvqu_36", Ge = {
  list: Xy,
  path: Jy,
  head: Qy,
  label: Zy,
  consequence: ek,
  ask: ak
}, Ha = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function yn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function kn(e) {
  return e ? "primary" : "secondary";
}
function nk({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(_, { variant: kn(a), size: "sm", onClick: () => t(e.kind), children: Ha[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: kn(a), size: "sm", disabled: !0, describedBy: r, children: Ha[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ge.ask, id: r, children: e.askInstead })
  ] });
}
function tk({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ge.path, "data-allowed": e.allowed, "data-role": yn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ge.head, children: [
      /* @__PURE__ */ n("span", { className: Ge.label, children: e.title ?? Ha[e.kind] }),
      /* @__PURE__ */ n(m, { role: yn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ge.consequence, children: e.consequence }),
    /* @__PURE__ */ n(nk, { path: e, primary: a, onChoose: t })
  ] });
}
function Q$({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ge.list, children: e.map((t, r) => /* @__PURE__ */ n(tk, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const rk = "_list_qjv4r_2", lk = "_item_qjv4r_6", ok = "_node_qjv4r_18", ik = "_body_qjv4r_24", ck = "_head_qjv4r_30", sk = "_stage_qjv4r_36", dk = "_version_qjv4r_41", uk = "_sentence_qjv4r_49", hk = "_meta_qjv4r_54", ge = {
  list: rk,
  item: lk,
  node: ok,
  body: ik,
  head: ck,
  stage: sk,
  version: dk,
  sentence: uk,
  meta: hk
}, mk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function wk({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function _k({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(Le, { size: 9, kind: mk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(wk, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${se(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function Z$({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(_k, { entry: a }, a.stage + String(t))) });
}
const vk = "_thread_1kn6s_3", fk = "_turn_1kn6s_8", bk = "_who_1kn6s_27", pk = "_body_1kn6s_32", ca = {
  thread: vk,
  turn: fk,
  who: bk,
  body: pk
}, ft = Ve(!1);
function eC({ children: e, density: a }) {
  return /* @__PURE__ */ n(ft.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ca.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function aC({ turn: e }) {
  if (!Ke(ft)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ca.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ca.who} ward-chat-who`, children: [
      e.author,
      " · ",
      se(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ca.body} ward-chat-body`, children: e.body })
  ] });
}
const gk = "_list_1rt9c_3", Nk = "_row_1rt9c_7", yk = "_label_1rt9c_20", kk = "_n_1rt9c_26", $k = "_cause_1rt9c_33", Qe = {
  list: gk,
  row: Nk,
  label: yk,
  n: kk,
  cause: $k
};
function Ck(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Sk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Rk({ row: e, formatNumber: a }) {
  return Ck(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Le, { size: 8, ...Sk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Tk, { cause: e.cause })
  ] });
}
function Tk({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function nC({ rows: e, formatNumber: a = Z }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(Rk, { row: t, formatNumber: a }, t.label)) });
}
const Ek = "_root_1jxwp_2", Lk = {
  root: Ek
};
function tC({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: Lk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ca, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const Ak = "_row_dhbre_3", xk = "_key_dhbre_13", Ik = "_stack_dhbre_24", qk = "_value_dhbre_32", Mk = "_evidence_dhbre_39", Bk = "_mark_dhbre_47", We = {
  row: Ak,
  key: xk,
  stack: Ik,
  value: qk,
  evidence: Mk,
  mark: Bk
};
function Pk({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ua, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function rC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${We.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${We.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${We.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${We.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${We.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${We.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(Pk, { state: e.state }) })
  ] });
}
const Ok = "_cell_1monp_2", Dk = {
  cell: Ok
}, Hk = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Fk(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function jk(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function Wk(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Fk(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function zk(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function lC({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  jk(e, t);
  const r = zk(e);
  return /* @__PURE__ */ n(
    mc,
    {
      label: "Rejection routing",
      columns: Hk,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: Dk.cell, "data-norerun": l.noRerun ? !0 : void 0, children: Wk(l, i) }),
      empty: a ?? /* @__PURE__ */ n(Gs, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Gk = "_row_ute8v_2", Uk = "_title_ute8v_11", Kk = "_turns_ute8v_20", Vk = "_waiting_ute8v_21", Yk = "_resolved_ute8v_22", Xk = "_activity_ute8v_23", Jk = "_cost_ute8v_29", Qk = "_link_ute8v_30", Zk = "_tableRow_ute8v_47", e1 = "_tableTitle_ute8v_59", a1 = "_tableResolved_ute8v_64", n1 = "_tableLink_ute8v_68", t1 = "_tableMeta_ute8v_83", r1 = "_tableCost_ute8v_90", l1 = "_tableActivity_ute8v_91", o1 = "_tableState_ute8v_101", i1 = "_tableRecord_ute8v_112", P = {
  row: Gk,
  title: Uk,
  turns: Kk,
  waiting: Vk,
  resolved: Yk,
  activity: Xk,
  cost: Jk,
  link: Qk,
  tableRow: Zk,
  tableTitle: e1,
  tableResolved: a1,
  tableLink: n1,
  tableMeta: t1,
  tableCost: r1,
  tableActivity: l1,
  tableState: o1,
  tableRecord: i1
}, bt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function c1(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function s1(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function d1(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const u1 = { duplicate: "CLOSED · DUPLICATE" };
function h1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: P.tableMeta, children: `waiting on ${e}` });
}
function m1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: P.tableCost, children: e === void 0 ? null : ne(e) });
}
function w1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: P.tableRecord, href: F(e.href), children: `→ ${e.key}` });
}
function _1({ session: e, href: a }) {
  const t = bt[e.state];
  return /* @__PURE__ */ o("tr", { className: P.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: P.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: P.tableLink, href: F(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: P.tableMeta, children: s1(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: P.tableResolved, children: [
      d1(e.resolved),
      /* @__PURE__ */ n(h1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(m1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: P.tableActivity, children: c1(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: P.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: u1[e.state] ?? t.label }),
      /* @__PURE__ */ n(w1, { link: e.link })
    ] }) })
  ] });
}
function v1({ session: e }) {
  const a = bt[e.state];
  return /* @__PURE__ */ o("div", { className: P.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: P.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: P.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: P.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: P.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: P.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ne(e.cost) }),
    /* @__PURE__ */ n("span", { className: P.activity, children: se(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: P.link, href: F(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function oC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(_1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(v1, { session: e.session });
}
const f1 = "_block_1yy2v_3", b1 = "_list_1yy2v_9", p1 = "_line_1yy2v_14", Fa = {
  block: f1,
  list: b1,
  line: p1
}, g1 = { warn: "warning", ok: "ok" };
function N1({ kind: e }) {
  const a = g1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function y1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Fa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(N1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function iC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Fa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Fa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(y1, { line: t }, `${r}-${t.text}`)) }) });
}
const k1 = "_band_tt7hp_1", $1 = "_head_tt7hp_8", C1 = "_cell_tt7hp_19", S1 = "_index_tt7hp_35", R1 = "_title_tt7hp_42", T1 = "_note_tt7hp_48", E1 = "_cellTitle_tt7hp_53", L1 = "_cellBody_tt7hp_58", A1 = "_tag_tt7hp_64", ve = {
  band: k1,
  head: $1,
  cell: C1,
  index: S1,
  title: R1,
  note: T1,
  cellTitle: E1,
  cellBody: L1,
  tag: A1
}, $n = 4;
function cC({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== $n)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${$n}-cell grid`);
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
  U$ as ActivityConsole,
  lm as AgentCard,
  z1 as AppShell,
  A$ as AppearanceStrip,
  cC as Band,
  Y1 as BarChart,
  Sd as BoardColumn,
  u$ as BoardFootnote,
  h$ as BoardHeader,
  t$ as BoardScroller,
  _ as Btn,
  H1 as CHIP_ROLES,
  lt as CREDENTIAL_COLUMNS,
  V1 as Callout,
  x$ as CapabilityRow,
  aC as ChatMessage,
  En as Checkbox,
  m as Chip,
  K$ as ClarificationRow,
  y$ as ClauseRuleRow,
  N$ as ClauseRules,
  jn as ColourLadder,
  I$ as ComponentRow,
  V$ as Composer,
  w$ as ConfigRow,
  m$ as ConfigRowHead,
  Ka as ConnectionMark,
  eC as Conversation,
  Zi as CostMeter,
  M$ as CredentialRow,
  q$ as CredentialRowHead,
  Y$ as CriteriaList,
  dl as Crumb,
  nC as DeliveryHealth,
  o$ as DeniedState,
  k$ as DryRunRail,
  Gs as EmptyState,
  B$ as EnvCard,
  L as Field,
  l$ as FilteredEmpty,
  a$ as FormStack,
  Ca as GateChecklist,
  X$ as GateLadder,
  mc as Grid,
  C$ as HandoffRuleRow,
  $$ as HandoffRules,
  _$ as ItemDrawer,
  P$ as KeyPanel,
  Mt as LIVE_EVENT_TYPES,
  Rh as LegacyBoardColumn,
  f$ as LegacyBoardHeader,
  b$ as LegacyConfigRow,
  g$ as LegacyItemDrawer,
  gh as LegacyOverCapNote,
  p$ as LegacyPreviewRail,
  Dn as LegacyWorkCard,
  ke as LiveIndicator,
  i$ as LoadFailed,
  d$ as Loading,
  ut as MCP_SERVER_COLUMNS,
  Ua as Mark,
  D$ as MarkUpload,
  Le as Marker,
  F$ as McpServerRow,
  H$ as McpServerRowHead,
  S$ as NewStreamModal,
  Vs as OverCapNote,
  ea as Overlay,
  Mm as PARTIAL_STEP_REASON,
  ht as POLICY_CHIP_WIDTH,
  Q1 as PageFrame,
  K1 as PageHeader,
  X1 as PlainList,
  j$ as PolicyRow,
  v$ as PreviewRail,
  La as ROLE_MATRIX_COLUMNS,
  et as RULE_ACTIONS,
  qn as Radio,
  tC as ReadyChecklist,
  e$ as RecordSection,
  J$ as RequeueSheet,
  Q$ as ResolveBlock,
  rC as ResolvedFieldRow,
  W$ as RoleMatrixRow,
  lC as RoutingTable,
  R$ as RuleRow,
  z$ as RunbookSteps,
  It as STREAM_STEPS,
  n$ as SectionBand,
  dn as SectionHeader,
  xn as SegmentedControl,
  oC as SessionRow,
  U1 as Sidebar,
  T$ as StageColumn,
  r$ as StageGrid,
  Z$ as StageHistory,
  O_ as StageListEditor,
  c$ as StaleStrip,
  ya as StatStrip,
  E$ as StreamRow,
  Z1 as SubjectRail,
  Oe as Switch,
  G1 as Tabs,
  L$ as ToolRow,
  J1 as TopBar,
  ss as Tree,
  Bn as TreeRow,
  iC as TypedInputBlock,
  Lr as UNSAFE_HREF,
  G$ as ValidationList,
  M1 as VisibilityProvider,
  B1 as Visible,
  D1 as WARD_VERSION,
  $a as WorkCard,
  s$ as WriteUnavailableStrip,
  c1 as agoSince,
  Ct as clock,
  av as colourStatus,
  Z as count,
  ce as duration,
  ja as elapsed,
  O1 as eventSourceTransport,
  ba as isStreamStep,
  pa as isValidatedStreamStep,
  Bm as ladderValidation,
  vg as mcpConnectionChip,
  wg as mcpToolName,
  ne as money,
  me as ms,
  Pn as ordered,
  Sn as ratio,
  Wb as restartLabel,
  F as safeHref,
  se as stamp,
  Tn as stream,
  j1 as streamChip,
  Na as streamChipProps,
  Ee as streamColour,
  Pt as streamHex,
  F1 as streamVars,
  la as useBorderFlash,
  Lt as useFocusTrap,
  W1 as useLiveFeed,
  P1 as useReturnFocus,
  fa as useRovingTabindex,
  Wa as useTicker,
  St as useVisible,
  W as v,
  O$ as validateMark,
  ga as validatedStep,
  qt as validatedStreamSteps
};
