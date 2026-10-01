import { jsx as n, Fragment as R, jsxs as o } from "react/jsx-runtime";
import { useMemo as bt, useContext as Ke, createContext as Ve, useCallback as V, useEffect as A, useState as p, useRef as N, useLayoutEffect as $n, useId as k, Fragment as pt } from "react";
import { createPortal as gt } from "react-dom";
function le(e) {
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
const Nt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function oe(e) {
  const a = Nt.formatToParts(new Date(e)), t = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function ae(e) {
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
function Cn(e, a) {
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
const Sn = Ve(/* @__PURE__ */ new Set());
function A1({ hidden: e, children: a }) {
  const t = bt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Sn.Provider, { value: t, children: a });
}
function $t(e) {
  return !Ke(Sn).has(e);
}
function x1({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(R, { children: $t(e) ? a : t });
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
  return { onKeyDown: V(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Ct));
      Rt(t, e.current, r);
    },
    [e]
  ) };
}
function I1(e, a = !0) {
  A(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const en = { ArrowUp: -1, ArrowDown: 1 }, an = { ArrowLeft: -1, ArrowRight: 1 }, Et = (e, a, t) => Math.min(t, Math.max(a, e));
function Lt(e, a) {
  if (a !== "horizontal" && e in en) return en[e];
  if (a !== "vertical" && e in an) return an[e];
}
function fa({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = N(/* @__PURE__ */ new Map()), l = N(!1);
  $n(() => {
    var b;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const h = d[0], _ = l.current;
    l.current = !1, t(h), _ && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = V((d) => t(d), []), c = V((d) => {
    var h;
    t(d), (h = r.current.get(d)) == null || h.focus();
  }, []), s = V(
    (d) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const _ = Math.max(0, h.indexOf(a)), b = Lt(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[Et(_ + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
    },
    [a, c, e]
  ), u = V(
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
const q1 = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, M1 = "0.2.0", B1 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], At = [1, 2, 3, 4, 5, 6], xt = [1, 2, 3], It = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], W = {
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
function Rn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function ba(e) {
  return At.includes(e);
}
function pa(e) {
  return xt.includes(e);
}
function P1(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function D1(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const qt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Mt(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return qt[e];
}
function nn(e) {
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
function Dt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Ot(e, a, t) {
  const r = Bt(e);
  if (r === null) return null;
  const l = nn(t) ?? nn(r.type);
  return l === null ? null : { ...r, type: l, id: Pt(r, a), at: Dt(r) };
}
function Ht(e, a) {
  return e >= me.staleAfter ? "stale" : e >= me.heartbeat && a === "live" ? "reconnecting" : null;
}
function Ft(e, a, t) {
  return e >= me.heartbeat && !a && t !== null;
}
function O1(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), c = N(/* @__PURE__ */ new Map()), s = N(0), u = N(""), d = N(0), h = N(null), _ = N(0), b = N(0), x = N(!1), K = N("reconnecting"), Z = V(($) => {
    K.current = $, r($);
  }, []), ie = V(() => {
    s.current = Date.now();
  }, []), $e = V(($) => {
    for (const [j, _e] of c.current)
      (_e === "*" || $.itemKey === _e) && j($);
  }, []), ce = V(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: ($, j, _e) => {
        const Ae = Ot($, j, _e);
        Ae !== null && (Ae.id && (u.current = Ae.id), ie(), x.current = !1, Z("live"), i(Ae.at), $e(Ae));
      },
      onOpen: () => {
        d.current = 0, x.current = !1, ie(), Z("live");
      },
      onError: () => {
        var j;
        (j = h.current) == null || j.close(), h.current = null, x.current = !0, K.current !== "stale" && Z("reconnecting");
        const $ = Math.min(me.reconnectBase * 2 ** d.current, me.reconnectMax);
        d.current += 1, _.current = window.setTimeout(ce, $);
      }
    });
  }, [$e, Z, ie, a, e]), Oe = V(($) => {
    x.current = !0, $.close(), h.current = null, _.current = window.setTimeout(ce, me.reconnectBase);
  }, [ce]), He = V(($, j) => (c.current.set(j, $), () => {
    c.current.delete(j);
  }), []);
  return A(() => (ce(), b.current = window.setInterval(() => {
    const $ = Date.now() - s.current, j = Ht($, K.current);
    j && Z(j);
    const _e = h.current;
    Ft($, x.current, _e) && Oe(_e);
  }, me.tick), () => {
    var $;
    window.clearInterval(b.current), window.clearTimeout(_.current), x.current = !1, ($ = h.current) == null || $.close(), h.current = null;
  }), [ce, Oe, Z]), { connection: t, lastEventAt: l, subscribe: He };
}
function Wa(e, a) {
  const t = new Date(e).getTime(), [r, l] = p(() => Date.now());
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
function tn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function la(e, a) {
  const t = N(0), r = V((l) => {
    const i = l ?? a, c = e.current;
    c !== null && i !== void 0 && (jt() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => tn(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => tn(c), me.flash)));
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
  const l = t !== "stale", i = Wa(e, l), c = (a == null ? void 0 : a.at) ?? e, s = Gt(l, i, c, r, a);
  return /* @__PURE__ */ o("span", { className: `${zt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      oe(e)
    ] })
  ] });
}
const Ut = "_app_lu0b1_1", Kt = "_side_lu0b1_18", Vt = "_main_lu0b1_26", Yt = "_rail_lu0b1_33", Xt = "_page_lu0b1_40", Jt = "_root_lu0b1_91", Qt = "_topbar_lu0b1_98", Zt = "_mark_lu0b1_109", er = "_brand_lu0b1_116", ar = "_tagline_lu0b1_122", nr = "_identity_lu0b1_128", tr = "_tools_lu0b1_129", rr = "_metadata_lu0b1_138", lr = "_actor_lu0b1_153", or = "_detail_lu0b1_154", ir = "_nav_lu0b1_159", cr = "_content_lu0b1_194", sr = "_toolsPanel_lu0b1_207", dr = "_skip_lu0b1_233", I = {
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
  toolsPanel: sr,
  skip: dr
}, ur = "_btn_llheq_2", hr = "_primary_llheq_13", mr = "_secondary_llheq_23", wr = "_ghost_llheq_28", _r = "_overflow_llheq_37", vr = "_sm_llheq_44", fr = "_disabled_llheq_48", aa = {
  btn: ur,
  primary: hr,
  secondary: mr,
  ghost: wr,
  overflow: _r,
  sm: vr,
  disabled: fr
};
function br(e, a, t, r) {
  const l = a === "sm" ? [aa.sm, "ward-btn--sm"] : [], i = t ? [aa.disabled] : [];
  return [aa.btn, aa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function pr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function gr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Nr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function yr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function kr(e, a, t) {
  return yr(e.describedBy, a && t);
}
function $r({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Cr(e) {
  return e.children ?? e.label;
}
function v(e) {
  gr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = Nr(e), i = k();
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: br(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": kr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...pr(a, e.controls),
        children: Cr(e)
      }
    ),
    /* @__PURE__ */ n($r, { id: i, reason: l })
  ] });
}
const Sr = /^([a-z][a-z0-9+.-]*):/i, Rr = /* @__PURE__ */ new Set(["http", "https"]), Tr = "#";
function Er(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Sr.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function F(e) {
  const a = Er(e);
  return a === void 0 || Rr.has(a) ? e : Tr;
}
function za(e) {
  const [a, t] = p(() => {
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
function Lr({ sidebar: e, header: a, children: t, rail: r }) {
  const l = r != null;
  return /* @__PURE__ */ o("div", { className: I.app, "data-rail": l ? "true" : "false", children: [
    /* @__PURE__ */ n("div", { className: I.side, children: e }),
    /* @__PURE__ */ o("main", { className: I.main, children: [
      a,
      /* @__PURE__ */ n("div", { className: I.page, children: t })
    ] }),
    l && /* @__PURE__ */ n("div", { className: I.rail, children: r })
  ] });
}
function Ar({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: I.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: F(t.href), "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function Ia({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function xr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: I.metadata, children: [
    /* @__PURE__ */ n(Ia, { value: e, className: I.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Ia, { value: a, className: I.detail })
  ] });
}
function Ir() {
  const e = za("(max-width: 767.98px)"), a = k(), t = N(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var c, s;
    l(!1), (s = (c = t.current) == null ? void 0 : c.querySelector("button")) == null || s.focus();
  } };
}
function qr({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: I.tools, children: /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: I.tools, children: e });
}
function Mr({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: I.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function Br(e) {
  return /* @__PURE__ */ o("header", { className: I.topbar, children: [
    /* @__PURE__ */ n("span", { className: I.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: I.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Ia, { value: e.tagline, className: I.tagline }),
    /* @__PURE__ */ n(Ar, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: I.identity, children: /* @__PURE__ */ n(xr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(qr, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Pr(e) {
  const a = k(), t = Ir();
  return /* @__PURE__ */ o("div", { className: `${I.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: I.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Br, { ...e, menu: t }),
    /* @__PURE__ */ n(Mr, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: I.content, children: e.children })
  ] });
}
function Dr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function H1(e) {
  return Dr(e) ? /* @__PURE__ */ n(Lr, { ...e }) : /* @__PURE__ */ n(Pr, { ...e });
}
function Ga(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Or = "_root_o4yib_2", Hr = "_row_o4yib_8", Fr = "_box_o4yib_14", jr = "_label_o4yib_21", Wr = "_lockedNote_o4yib_26", zr = "_consequence_o4yib_34", Gr = "_sample_o4yib_69", qe = {
  root: Or,
  row: Hr,
  box: Fr,
  label: jr,
  lockedNote: Wr,
  consequence: zr,
  sample: Gr
};
function Ur(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Kr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${qe.consequence} ward-check-consequence`, children: a }) : null;
}
function Vr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${qe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Yr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.sample, "aria-hidden": "true", children: e }) : null;
}
function Tn(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = Ur(e);
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
        /* @__PURE__ */ n(Vr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Yr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Kr, { id: t, text: e.consequence })
  ] });
}
const Xr = "_chip_1073r_2", Jr = {
  chip: Xr
}, Qr = {
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
function Zr(e, a) {
  if (e === "stream") return el(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Qr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function el(e) {
  if (!e || !pa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Rn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Jr.chip} ward-chip ward-chip--${e}`, style: Zr(e, t), "data-ward-chip": e, "data-size": r, children: a });
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
const al = "_nav_1mnou_2", nl = "_list_1mnou_8", tl = "_item_1mnou_15", rl = "_link_1mnou_25", ll = "_sep_1mnou_35", ol = "_current_1mnou_39", il = "_chips_1mnou_43", xe = {
  nav: al,
  list: nl,
  item: tl,
  link: rl,
  sep: ll,
  current: ol,
  chips: il
};
function cl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: xe.nav, children: [
    /* @__PURE__ */ n("ol", { className: xe.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: xe.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: xe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: xe.link, href: F(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: xe.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${xe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const sl = "_field_fy549_2", dl = "_label_fy549_8", ul = "_labelHidden_fy549_15", hl = "_control_fy549_25", ml = "_mono_fy549_44", wl = "_area_fy549_49", _l = "_invalid_fy549_56", Te = {
  field: sl,
  label: dl,
  labelHidden: ul,
  control: hl,
  mono: ml,
  area: wl,
  invalid: _l
}, vl = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function fl({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? vl : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function bl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function pl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const gl = { input: fl, select: bl, textarea: pl };
function Nl(e, a, t) {
  const r = gl[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function yl(e, a, t) {
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
function kl(e) {
  const a = e.mono ? [Te.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Te.area] : [];
  return [Te.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function $l(e) {
  return e ? `${Te.label} ${Te.labelHidden} ward-field-label` : `${Te.label} ward-field-label`;
}
function L(e) {
  const a = k(), t = `${a}-msg`, r = yl(e, a, t), l = kl(e);
  return /* @__PURE__ */ o("div", { className: `${Te.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: $l(e.labelHidden), htmlFor: a, children: e.label }),
    Nl(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Te.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Cl = "_strip_tivso_2", Sl = "_tab_tivso_26", Rl = "_count_tivso_49", qa = {
  strip: Cl,
  tab: Sl,
  count: Rl
}, rn = 7;
function Tl(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function El(e) {
  return `${qa.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function Ll(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function En(e) {
  const a = Ll(e);
  e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end);
}
function Al(e, a) {
  A(() => {
    const t = e.current;
    if (!t) return;
    const r = () => En(t);
    t.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [t, ...t.children]) l == null || l.observe(i);
    return r(), () => {
      t.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, a]);
}
function xl(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Il(e, a) {
  $n(() => {
    const t = e.current, r = t == null ? void 0 : t.querySelectorAll('[role="tab"]')[a];
    if (!t || !r) return;
    const l = xl(t, r);
    l !== null && (t.scrollLeft = Math.max(0, l)), En(t);
  }, [e, a]);
}
function F1({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > rn) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${rn} — the set is fixed`);
  const i = fa({ orientation: "horizontal" }), c = Tl(e, a);
  A(() => i.setActive(c), [i.setActive, c]);
  const s = N(null);
  return Al(s, e.length), Il(s, c), /* @__PURE__ */ n(
    "div",
    {
      ref: s,
      className: El(l),
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
            u.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
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
const ql = "_root_jem6y_2", Ml = "_segment_jem6y_7", ln = {
  root: ql,
  segment: Ml
};
function Ln({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
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
const Bl = "_sidebar_1jywv_3", Pl = "_brand_1jywv_9", Dl = "_mark_1jywv_17", Ol = "_word_1jywv_24", Hl = "_nav_1jywv_30", Fl = "_navItem_1jywv_38", jl = "_group_1jywv_50", Wl = "_groupName_1jywv_57", zl = "_agents_1jywv_70", Gl = "_agent_1jywv_70", Ul = "_agentTop_1jywv_88", Kl = "_dot_1jywv_95", Vl = "_agentName_1jywv_107", Yl = "_agentMeta_1jywv_120", Xl = "_foot_1jywv_126", Jl = "_footName_1jywv_132", Ql = "_footLinks_1jywv_139", Zl = "_footLink_1jywv_139", eo = "_root_1jywv_153", ao = "_linkBrand_1jywv_162", no = "_label_1jywv_183", to = "_note_1jywv_188", ro = "_footer_1jywv_202", C = {
  sidebar: Bl,
  brand: Pl,
  mark: Dl,
  word: Ol,
  nav: Hl,
  navItem: Fl,
  group: jl,
  groupName: Wl,
  new: "_new_1jywv_64",
  agents: zl,
  agent: Gl,
  agentTop: Ul,
  dot: Kl,
  agentName: Vl,
  agentMeta: Yl,
  foot: Xl,
  footName: Jl,
  footLinks: Ql,
  footLink: Zl,
  root: eo,
  linkBrand: ao,
  label: no,
  note: to,
  footer: ro
};
function lo({ agent: e }) {
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
              style: { "--dot": Rn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function oo({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: F(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function io({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
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
        Q(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: C.new, href: F(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(lo, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(oo, { shared: i })
  ] });
}
function co(e) {
  return e.destinations ?? e.items ?? [];
}
function so({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function uo({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function ho({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: F(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function mo(e) {
  return /* @__PURE__ */ o("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(so, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: co(e).map((a) => /* @__PURE__ */ n(ho, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(uo, { children: e.children })
  ] });
}
function wo(e) {
  return "agents" in e;
}
function j1(e) {
  return wo(e) ? /* @__PURE__ */ n(io, { ...e }) : /* @__PURE__ */ n(mo, { ...e });
}
const _o = "_mark_wlgi8_3", vo = {
  mark: _o
}, fo = { met: "✓", unmet: "", failed: "✕" };
function Ua({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: vo.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: fo[e]
    }
  );
}
const bo = "_marker_br9fi_2", po = {
  marker: bo
}, go = {
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
  const r = { "--marker": go[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${po.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const No = "_root_ti0pq_2", yo = "_chip_ti0pq_11", ko = "_noCase_ti0pq_23", na = {
  root: No,
  chip: yo,
  noCase: ko
};
function $o(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Ka({ connection: e, since: a, lastEventAt: t }) {
  const r = $o(a, t), l = Wa(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${na.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Le, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: na.noCase, children: ja(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    oe(r)
  ] });
}
const Co = "_root_114od_2", So = "_context_114od_12", Ro = "_row_114od_1", To = "_heading_114od_25", Eo = "_headingWrap_114od_33", Lo = "_chips_114od_38", Ao = "_title_114od_45", xo = "_consequence_114od_54", Io = "_actionsWrap_114od_59", qo = "_actions_114od_59", Mo = "_action_114od_59", Bo = "_overflowPanel_114od_78", Po = "_measure_114od_88", ne = {
  root: Co,
  context: So,
  row: Ro,
  heading: To,
  headingWrap: Eo,
  chips: Lo,
  title: Ao,
  consequence: xo,
  actionsWrap: Io,
  actions: qo,
  action: Mo,
  overflowPanel: Bo,
  measure: Po
};
function Do({ title: e, consequence: a }) {
  return /* @__PURE__ */ o("div", { className: ne.heading, children: [
    /* @__PURE__ */ n("h1", { className: ne.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: ne.consequence, children: a })
  ] });
}
function Ma({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: ne.action, "data-action": "", children: a }, t));
}
function on({ disclosure: e }) {
  return /* @__PURE__ */ n(v, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Oo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(on, { disclosure: l }) : a ? [/* @__PURE__ */ n(on, { disclosure: l }, "more"), /* @__PURE__ */ n(Ma, { actions: e }, "actions")] : /* @__PURE__ */ n(Ma, { actions: e });
}
function Ho(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Fo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: ne.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Ma, { actions: e }) });
}
function jo(e, a) {
  const t = k(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function Wo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: ne.context, children: [
    /* @__PURE__ */ n(cl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: ne.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function zo(...e) {
  return e.some((a) => a === null);
}
function Go(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Uo(e, a, t, r, l) {
  if (l === 0 || zo(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = Go(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function Ko(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Vo(e) {
  const a = N(null), t = N(null), r = N(null), l = N(null), [i, c] = p(!1);
  return A(() => {
    const s = a.current;
    if (!Ko(s)) return;
    const u = () => c(Uo(s, t.current, r.current, l.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function Yo({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ o("div", { className: ne.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(v, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] });
}
function Xo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Ka, { connection: e.connection, since: e.since }) : null;
}
function W1({ crumb: e, chips: a, title: t, consequence: r, actions: l = [], more: i = [], connection: c, onOverflow: s, density: u = "page" }) {
  const { rowRef: d, headingRef: h, actionsRef: _, measureRef: b, collapsed: x } = Vo(l), K = i.length > 0, { disclosure: Z, close: ie } = jo(x || K, _), $e = Ho(i, l, x, s);
  return /* @__PURE__ */ o("header", { className: ne.root, "data-density": u, children: [
    /* @__PURE__ */ n(Wo, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: ne.row, ref: d, children: [
      /* @__PURE__ */ n("div", { ref: h, className: ne.headingWrap, children: /* @__PURE__ */ n(Do, { title: t, consequence: r }) }),
      /* @__PURE__ */ o("div", { className: ne.actionsWrap, children: [
        /* @__PURE__ */ n(Xo, { connection: c }),
        /* @__PURE__ */ n("div", { className: ne.actions, ref: _, "data-ward-actions": !0, children: /* @__PURE__ */ n(Oo, { actions: l, hasMore: K, collapsed: x, onOverflow: s, disclosure: Z }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Fo, { actions: $e, disclosure: Z, onEscape: ie }),
    /* @__PURE__ */ n(Yo, { actions: l, hasMore: K, measureRef: b })
  ] });
}
const Jo = "_scrim_c7sqj_2", Qo = "_drawer_c7sqj_10", Zo = "_sheet_c7sqj_14", ei = "_modal_c7sqj_18", ai = "_panel_c7sqj_23", ni = "_header_c7sqj_51", ti = "_title_c7sqj_59", ri = "_body_c7sqj_63", li = "_close_c7sqj_90", Ne = {
  scrim: Jo,
  drawer: Qo,
  sheet: Zo,
  modal: ei,
  panel: ai,
  header: ni,
  title: ti,
  body: ri,
  close: li
}, oi = Ve(null), sa = [], da = /* @__PURE__ */ new Map();
function ii(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function ci(e, a) {
  let t = da.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, da.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function si(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !ii(r) && ci(e, r);
}
function di(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (si(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function ui(e) {
  for (const a of e.claims) {
    const t = da.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), da.delete(a)));
  }
}
function hi(e, a) {
  const t = { root: e, claims: [] };
  return sa.push(t), di(t, a), t;
}
function mi(e) {
  const a = sa.indexOf(e);
  a >= 0 && sa.splice(a, 1), ui(e);
}
function cn(e) {
  return e !== null && sa.at(-1) === e;
}
function wi(e, a, t) {
  const r = N(null), l = N(t);
  return l.current = t, A(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = hi(i, a);
    return r.current = s, () => {
      var d, h;
      const u = cn(s);
      mi(s), r.current = null, u && ((h = (d = l.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), V(() => cn(r.current), []);
}
function _i(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function vi(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function fi({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("header", { className: `${Ne.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ne.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, children: e.children })
  ] });
}
function bi(e) {
  return `${Ne.scrim} ${Ne[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function pi(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ne.panel} ${Ne[e]} ward-overlay-panel${t}${r}`;
}
function gi(e) {
  const a = Ke(oi);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = N(null), t = N(null), r = k(), l = gi(e.container), i = za("(min-width: 768px)"), c = _i(e.kind, i), s = vi(e, r), u = Tt(t), d = wi(a, l, e.returnFocusTo), h = V(() => {
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
  }, [h]), gt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: bi(c),
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
            className: pi(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ne.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(fi, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Ni = "_root_drrhx_2", yi = "_ticket_drrhx_15", ki = "_body_drrhx_24", Sa = {
  root: Ni,
  ticket: yi,
  body: ki
};
function z1({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Sa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Sa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Sa.body, children: t })
  ] });
}
const $i = "_root_bf1pc_2", Ci = "_table_bf1pc_9", Si = "_caption_bf1pc_14", Ri = "_series_bf1pc_23", Ti = "_category_bf1pc_31", Ei = "_cell_bf1pc_39", Li = "_track_bf1pc_45", Ai = "_lane_bf1pc_52", xi = "_bar_bf1pc_56", Ii = "_value_bf1pc_63", qi = "_swatch_bf1pc_70", Mi = "_empty_bf1pc_78", U = {
  root: $i,
  table: Ci,
  caption: Si,
  series: Ri,
  category: Ti,
  cell: Ei,
  track: Li,
  lane: Ai,
  bar: xi,
  value: Ii,
  swatch: qi,
  empty: Mi
}, Bi = "—", sn = 6;
function Pi(e, a) {
  if (a.length < 1 || a.length > sn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${sn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Di(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function An(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Oi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Hi({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Oi(e, a), c = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ o("span", { className: U.track, children: [
    /* @__PURE__ */ n("span", { className: U.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${U.bar} ward-barchart-bar`, "data-step": t, style: c, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: U.value, children: e === null ? l : r(e) })
  ] }) });
}
function Fi({ series: e }) {
  return /* @__PURE__ */ n(R, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: U.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: U.swatch, "data-step": An(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function ji({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${U.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: U.caption, children: e }),
    /* @__PURE__ */ n("p", { className: U.empty, children: a })
  ] });
}
function Wi({ title: e, categories: a, series: t, top: r, format: l = Q, categoryHead: i = "Category", missing: c = Bi }) {
  return /* @__PURE__ */ n("div", { className: `${U.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: U.table, children: [
    /* @__PURE__ */ n("caption", { className: U.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: U.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Fi, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((s, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: U.category, children: s }),
      t.map((d, h) => /* @__PURE__ */ n(Hi, { value: d.values[u], top: r, step: An(h, t.length), format: l, missing: c }, d.name))
    ] }, s)) })
  ] }) });
}
function G1(e) {
  Pi(e.categories, e.series);
  const a = Di(e.series);
  return a === 0 ? /* @__PURE__ */ n(ji, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Wi, { ...e, top: a });
}
const zi = "_root_1bfqw_2", Gi = "_figure_1bfqw_7", Ui = "_of_1bfqw_13", Ki = "_bar_1bfqw_18", Vi = "_rows_1bfqw_38", Yi = "_row_1bfqw_38", Xi = "_label_1bfqw_49", Ji = "_amount_1bfqw_54", Ce = {
  root: zi,
  figure: Gi,
  of: Ui,
  bar: Ki,
  rows: Vi,
  row: Yi,
  label: Xi,
  amount: Ji
};
function Qi({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ce.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ce.figure} ward-stat-value`, children: [
      ae(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ce.of, children: [
        "of ",
        ae(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Ce.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${ae(e)} of ${ae(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: Ce.rows, children: t.map((l) => /* @__PURE__ */ o("li", { className: `${Ce.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ce.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Ce.amount, children: ae(l.amount) })
    ] }, l.label)) })
  ] });
}
const Zi = "_frame_mg2jl_2", ec = "_table_mg2jl_6", ac = "_th_mg2jl_12", nc = "_td_mg2jl_13", tc = "_sort_mg2jl_47", rc = "_row_mg2jl_53", lc = "_empty_mg2jl_61", Re = {
  frame: Zi,
  table: ec,
  th: ac,
  td: nc,
  sort: tc,
  row: rc,
  empty: lc
}, oc = { asc: "ascending", desc: "descending" };
function ic(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return oc[a.direction];
}
function cc(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function sc(e) {
  return e === void 0 ? void 0 : { width: e };
}
function dc({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: sc(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ic(e, a),
      children: cc(e, t)
    }
  );
}
function uc({ row: e, props: a }) {
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
function hc({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(dc, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(uc, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const mc = "_set_y5zy3_2", wc = "_legend_y5zy3_7", _c = "_row_y5zy3_15", vc = "_control_y5zy3_20", fc = "_input_y5zy3_26", bc = "_label_y5zy3_31", pc = "_consequence_y5zy3_36", Ie = {
  set: mc,
  legend: wc,
  row: _c,
  control: vc,
  input: fc,
  label: bc,
  consequence: pc
};
function xn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: c, variant: s }) {
  const u = k(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: Ie.set, "data-variant": s, children: [
    /* @__PURE__ */ n("legend", { className: Ie.legend, children: e }),
    a.map((h) => {
      const _ = `${d}-${h.value}`, b = h.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Ie.row, children: [
        /* @__PURE__ */ o("span", { className: Ie.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
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
          /* @__PURE__ */ n("label", { htmlFor: _, className: Ie.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Ie.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const gc = "_root_1h1ot_2", Nc = "_head_1h1ot_11", yc = "_index_1h1ot_25", kc = "_dot_1h1ot_29", $c = "_note_1h1ot_34", Cc = "_counter_1h1ot_40", Sc = "_trailing_1h1ot_48", Me = {
  root: gc,
  head: Nc,
  index: yc,
  dot: kc,
  note: $c,
  counter: Cc,
  trailing: Sc
};
function Rc({ index: e }) {
  return e ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("span", { className: `${Me.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Me.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Tc({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Me.counter, "aria-hidden": "true", children: e }) : null;
}
function Ec({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Me.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Me.head, children: [
      /* @__PURE__ */ n(Rc, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Me.note, children: t }),
    /* @__PURE__ */ n(Tc, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Me.trailing, children: i })
  ] });
}
const Lc = "_strip_1cfs3_2", Ac = "_cell_1cfs3_7", xc = "_value_1cfs3_12", Ic = "_link_1cfs3_27", qc = "_label_1cfs3_39", Xe = {
  strip: Lc,
  cell: Ac,
  value: xc,
  link: Ic,
  label: qc
};
function Mc(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function Bc({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(R, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Xe.link} ward-stat-link`, href: F(e.href), "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function ya({ cells: e, divided: a = !1 }) {
  return Mc(e), /* @__PURE__ */ n("dl", { className: `${Xe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Xe.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Xe.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: /* @__PURE__ */ n(Bc, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Xe.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Pc = "_root_xk7sv_2", Dc = "_track_xk7sv_8", Oc = "_thumb_xk7sv_35", Hc = "_labelHidden_xk7sv_53", Fc = "_label_xk7sv_53", jc = "_lockedNote_xk7sv_68", Be = {
  root: Pc,
  track: Dc,
  thumb: Oc,
  labelHidden: Hc,
  label: Fc,
  lockedNote: jc
};
function Wc(e) {
  return e ? `${Be.label} ${Be.labelHidden}` : Be.label;
}
function De({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: c }) {
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
    /* @__PURE__ */ o("span", { id: s, className: Wc(c), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const zc = "_bar_1u2kl_2", Gc = "_skip_1u2kl_11", Uc = "_mark_1u2kl_22", Kc = "_nav_1u2kl_30", Vc = "_list_1u2kl_34", Yc = "_select_1u2kl_40", Xc = "_dest_1u2kl_47", Jc = "_actor_1u2kl_61", Qc = "_actorMark_1u2kl_74", Zc = "_actorLabel_1u2kl_79", es = "_tagline_1u2kl_98", se = {
  bar: zc,
  skip: Gc,
  mark: Uc,
  nav: Kc,
  list: Vc,
  select: Yc,
  dest: Xc,
  actor: Jc,
  actorMark: Qc,
  actorLabel: Zc,
  tagline: es
};
function as(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function ns(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function U1({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: c = "main" }) {
  const s = ns(r);
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
    s && /* @__PURE__ */ o("span", { className: se.actor, children: [
      /* @__PURE__ */ n("span", { className: se.actorLabel, children: s }),
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: as(s) })
    ] })
  ] });
}
const ts = "_tree_1lyby_2", rs = "_item_1lyby_6", ls = "_row_1lyby_10", os = "_button_1lyby_22", ua = {
  tree: ts,
  item: rs,
  row: ls,
  button: os
}, In = Ve(null);
function is({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = fa({ orientation: "vertical" });
  return /* @__PURE__ */ n(In.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ua.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const cs = { ArrowRight: !0, ArrowLeft: !1 };
function dn(e) {
  return e ? !0 : void 0;
}
function ss(e, a) {
  const t = cs[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function ds(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function us(e) {
  const a = [ua.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function hs(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function ms(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function ws(e) {
  return typeof e == "string" ? e : void 0;
}
function _s({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function vs({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function qn(e) {
  const a = Ke(In);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = hs(e);
  return /* @__PURE__ */ o("li", { className: ua.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: us(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": dn(e.unresolved),
        "data-inherited": dn(e.inherited),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${ua.button} ward-treeitem-btn`,
            onClick: () => ds(e),
            onKeyDown: (r) => ss(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: ms(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: ws(e.label), children: e.label }),
              /* @__PURE__ */ n(_s, { value: e.detail }),
              /* @__PURE__ */ n(vs, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const fs = "_frame_fdzvs_2", bs = "_subjectRail_fdzvs_21", ps = "_subject_fdzvs_21", gs = "_rail_fdzvs_41", Ns = "_record_fdzvs_63", ys = "_recordBody_fdzvs_68", ks = "_band_fdzvs_111", $s = "_bandBody_fdzvs_120", Cs = "_bandActions_fdzvs_125", Ss = "_scroller_fdzvs_133", Rs = "_lanes_fdzvs_151", he = {
  frame: fs,
  subjectRail: bs,
  subject: ps,
  rail: gs,
  record: Ns,
  recordBody: ys,
  band: ks,
  bandBody: $s,
  bandActions: Cs,
  scroller: Ss,
  lanes: Rs
};
function K1({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: he.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function un(e) {
  return e ? "true" : void 0;
}
function V1({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: he.subjectRail, "data-ward-subject-rail": t, "data-ruled": un(i), children: [
    /* @__PURE__ */ n("div", { className: he.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: he.rail, "data-sticky": un(l), "aria-label": r, children: a })
  ] });
}
function Y1({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i }) {
  return /* @__PURE__ */ o("section", { className: he.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Ec, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: he.recordBody, "data-pad": l, children: a })
  ] });
}
const Ts = "_form_1j8ub_2", Es = "_fields_1j8ub_9", Ls = "_actions_1j8ub_19", Ra = {
  form: Ts,
  fields: Es,
  actions: Ls
};
function X1({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ra.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ra.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ra.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function J1({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: he.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: he.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: he.bandActions, children: a })
  ] });
}
const As = "(max-width: 767.98px)";
function Ba({ label: e, children: a, laneCount: t }) {
  const r = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { className: he.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: r, children: a });
}
function xs({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ o("div", { className: he.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(L, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: l }),
    /* @__PURE__ */ n(Ba, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Q1({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = za(As);
  return t === void 0 ? /* @__PURE__ */ n(Ba, { label: a, children: e }) : l ? /* @__PURE__ */ n(xs, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Ba, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n(pt, { children: i.content }, i.id)) });
}
const Is = "_block_1o5o7_2", qs = "_sentence_1o5o7_15", Ms = "_meta_1o5o7_20", Bs = "_action_1o5o7_25", Ps = "_strip_1o5o7_29", Ds = "_loading_1o5o7_48", Os = "_label_1o5o7_56", Hs = "_counter_1o5o7_63", we = {
  block: Is,
  sentence: qs,
  meta: Ms,
  action: Bs,
  strip: Ps,
  loading: Ds,
  label: Os,
  counter: Hs
};
function Fs({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: we.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function ka({ sentence: e, action: a, children: t, role: r = "status", tone: l }) {
  return /* @__PURE__ */ o("div", { className: `${we.block} ward-state`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: we.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Fs, { action: a })
  ] });
}
function js(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function Z1({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ka, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function e$(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function a$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ka, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "failed at ",
    oe(a)
  ] }) });
}
function n$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    oe(e),
    ". Showing snapshot from ",
    oe(a)
  ] });
}
function t$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    oe(a)
  ] });
}
function r$({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
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
const Ws = "_note_tlubt_2", zs = {
  note: Ws
};
function Gs({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: zs.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const Us = "_card_12in3_2", Ks = "_hit_12in3_23", Vs = "_head_12in3_30", Ys = "_title_12in3_36", Xs = "_meta_12in3_44", Js = "_fields_12in3_45", Qs = "_who_12in3_58", Zs = "_sep_12in3_65", ed = "_mono_12in3_69", ad = "_field_12in3_45", nd = "_last_12in3_84", td = "_reason_12in3_96", Y = {
  card: Us,
  hit: Ks,
  head: Vs,
  title: Ys,
  meta: Xs,
  fields: Js,
  who: Qs,
  sep: Zs,
  mono: ed,
  field: ad,
  last: nd,
  reason: td
}, rd = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function ld(e, a, t) {
  const r = la(e, "blue"), l = la(e, "orange"), i = la(e, "green"), c = N(/* @__PURE__ */ new Set());
  A(() => {
    if (!t) return;
    const s = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = rd[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, l]);
}
const od = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ae(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function id(e, a) {
  return od[a](e);
}
function cd({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: Y.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: Y.meta, children: [
    /* @__PURE__ */ o("span", { className: Y.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    t,
    /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: Y.meta, children: [
    /* @__PURE__ */ o("span", { className: Y.who, children: [
      "waits on ",
      e.waitsOn
    ] }),
    t,
    /* @__PURE__ */ o("span", { className: Y.mono, children: [
      le(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function sd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: Y.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function dd({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Y.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function ud({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: Y.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: Y.field, children: id(e, t) }, t)) });
}
const Pa = (e) => e ? !0 : void 0;
function hd(e) {
  return { "--stream": Ee(e.streamStep, "id") };
}
function md(e, a, t) {
  e == null || e(a, t);
}
function wd(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function _d({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: Y.last, "data-stale": Pa(a), children: t }) : null;
}
function $a(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  ld(r, t.key, e.feed);
  const l = wd(e.feed), i = hd(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: Y.card,
      style: i,
      "data-selected": Pa(e.selected),
      "data-flagged": Pa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: Y.hit, onClick: (c) => md(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(sd, { item: t }),
        /* @__PURE__ */ n("p", { className: Y.title, children: t.title }),
        /* @__PURE__ */ n(cd, { item: t, connection: l }),
        /* @__PURE__ */ n(dd, { reason: t.blockedReason }),
        /* @__PURE__ */ n(ud, { item: t, fields: a }),
        /* @__PURE__ */ n(_d, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const vd = "_column_10sxg_3", fd = "_head_10sxg_24", bd = "_label_10sxg_33", pd = "_count_10sxg_42", gd = "_list_10sxg_56", Je = {
  column: vd,
  head: fd,
  label: bd,
  count: pd,
  list: gd
};
function Mn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Nd({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function yd(e) {
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
function kd({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, _ = Mn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(Nd, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(yd, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, rows: _ }),
    h && /* @__PURE__ */ n(Gs, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const $d = "_foot_8qg4p_2", Cd = "_note_8qg4p_13", Sd = "_link_8qg4p_19", Ta = {
  foot: $d,
  note: Cd,
  link: Sd
};
function l$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ta.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ta.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: Ta.link, href: F(e), children: "Configure board" })
  ] });
}
const Rd = "_head_1la6p_3", Td = "_identity_1la6p_12", Ed = "_titleRow_1la6p_18", Ld = "_title_1la6p_18", Ad = "_key_1la6p_35", xd = "_rollup_1la6p_45", Id = "_tools_1la6p_53", qd = "_swatch_1la6p_62", Md = "_mark_1la6p_69", be = {
  head: Rd,
  identity: Td,
  titleRow: Ed,
  title: Ld,
  key: Ad,
  rollup: xd,
  tools: Id,
  swatch: qd,
  mark: Md
}, hn = "initials:";
function Bd(e) {
  return e === void 0 ? "loaded this week unavailable" : `${Q(e)} loaded this week`;
}
function Pd(e) {
  const a = [`${Q(e.inFlight)} in flight`, Bd(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${Q(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${le(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${le(e.p90)}`), a.join(" · ");
}
function Dd(e) {
  return e.startsWith(hn) ? e.slice(hn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Od({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ee(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${be.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Dd(e) }) : /* @__PURE__ */ n("span", { className: be.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Hd({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function o$({
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
        /* @__PURE__ */ n(Od, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: be.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: be.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: be.rollup, "aria-live": "polite", children: Pd(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: be.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Hd, { owners: l, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Ka, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Fd = "_head_kabyh_11", jd = "_line_kabyh_12", Wd = "_cHandle_kabyh_33", zd = "_cName_kabyh_38", Gd = "_nameLine_kabyh_46", Ud = "_cLabel_kabyh_53", Kd = "_cCap_kabyh_58", Vd = "_cShown_kabyh_63", Yd = "_name_kabyh_46", Xd = "_noCap_kabyh_85", Jd = "_state_kabyh_99", Qd = "_handle_kabyh_104", Zd = "_sub_kabyh_118", M = {
  head: Fd,
  line: jd,
  cHandle: Wd,
  cName: zd,
  nameLine: Gd,
  cLabel: Ud,
  cCap: Kd,
  cShown: Vd,
  name: Yd,
  noCap: Xd,
  state: Jd,
  handle: Qd,
  sub: Zd
}, eu = "can't be hidden or collapsed", au = "terminal · counted, not a column";
function i$() {
  return /* @__PURE__ */ o("div", { className: M.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: M.cHandle }),
    /* @__PURE__ */ n("span", { className: M.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: M.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: M.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: M.cShown, children: "Shown" })
  ] });
}
function nu(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function tu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function mn(e) {
  return e.gate ? eu : e.terminal ? au : tu(e.agentsMounted);
}
function ru(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function lu({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: M.cName, children: [
    /* @__PURE__ */ o("span", { className: M.nameLine, children: [
      /* @__PURE__ */ n("span", { className: M.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    mn(e) && /* @__PURE__ */ n("span", { className: M.sub, children: mn(e) })
  ] });
}
function ou(e) {
  return e === void 0 ? "" : String(e);
}
function iu(e) {
  return e === "" ? void 0 : Number(e);
}
function cu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: M.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: M.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => ru(t, a),
      children: "⠿"
    }
  ) });
}
function su({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${M.cCap} ${M.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: M.cCap, children: /* @__PURE__ */ n(L, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: ou(a.cap), onChange: (r) => t({ ...a, cap: iu(r) }) }) });
}
function du({ stage: e, config: a, onChange: t }) {
  const r = nu(e, a.shown);
  return /* @__PURE__ */ o("span", { className: M.cShown, children: [
    /* @__PURE__ */ n(De, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: M.state, "aria-hidden": "true", children: r.state })
  ] });
}
function uu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function c$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: M.line, "data-kind": uu(e), children: [
    /* @__PURE__ */ n(cu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(lu, { stage: e }),
    /* @__PURE__ */ n("span", { className: M.cLabel, children: /* @__PURE__ */ n(L, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(su, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(du, { stage: e, config: a, onChange: t })
  ] });
}
const hu = "_body_hn6d6_2", mu = "_head_hn6d6_9", wu = "_summary_hn6d6_19", _u = "_block_hn6d6_20", vu = "_actionsBlock_hn6d6_21", fu = "_title_hn6d6_41", bu = "_note_hn6d6_46", pu = "_k_hn6d6_51", gu = "_kv_hn6d6_58", Nu = "_row_hn6d6_64", yu = "_label_hn6d6_75", ku = "_value_hn6d6_84", $u = "_quote_hn6d6_90", Cu = "_actions_hn6d6_21", Su = "_resolve_hn6d6_103", B = {
  body: hu,
  head: mu,
  summary: wu,
  block: _u,
  actionsBlock: vu,
  title: fu,
  note: bu,
  k: pu,
  kv: gu,
  row: Nu,
  label: yu,
  value: ku,
  quote: $u,
  actions: Cu,
  resolve: Su
};
function Ru(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Tu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Eu(e) {
  const a = ga(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Lu(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Na(Eu(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", le(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Ru(e),
    ...Tu(e, a)
  ];
}
function Au({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: B.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: B.k, children: a }),
    e
  ] });
}
function xu({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: B.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Iu({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: B.block, children: [
    /* @__PURE__ */ n("p", { className: B.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: B.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: B.note, children: e.agentMeta })
  ] }) : null;
}
function s$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = Lu(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: B.body, children: [
    /* @__PURE__ */ n(xu, { item: e }),
    /* @__PURE__ */ o("div", { className: B.summary, children: [
      /* @__PURE__ */ n("h2", { className: B.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: B.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: B.kv, children: d.map(([h, _]) => /* @__PURE__ */ o("div", { className: B.row, children: [
      /* @__PURE__ */ n("dt", { className: B.label, children: h }),
      /* @__PURE__ */ n("dd", { className: B.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(Iu, { item: e }),
    /* @__PURE__ */ o("div", { className: B.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: B.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: B.note, children: s })
    ] }),
    /* @__PURE__ */ n(Au, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const qu = "_root_3azmy_2", Mu = "_list_3azmy_7", Bu = "_item_3azmy_12", Pu = "_box_3azmy_18", Du = "_text_3azmy_23", Ou = "_note_3azmy_28", Fe = {
  root: qu,
  list: Mu,
  item: Bu,
  box: Pu,
  text: Du,
  note: Ou
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
const Hu = "_rail_ke7ch_2", Fu = "_k_ke7ch_11", ju = "_head_ke7ch_19", Wu = "_section_ke7ch_25", zu = "_card_ke7ch_38", Gu = "_strip_ke7ch_42", Uu = "_skeleton_ke7ch_56", Ku = "_skeletonLabel_ke7ch_70", Vu = "_bar_ke7ch_76", Yu = "_note_ke7ch_85", ue = {
  rail: Hu,
  k: Fu,
  head: ju,
  section: Wu,
  card: zu,
  strip: Gu,
  skeleton: Uu,
  skeletonLabel: Ku,
  bar: Vu,
  note: Yu
};
function Xu(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ea({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: ue.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: ue.k, children: e }),
    a
  ] });
}
function Ju({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: ue.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: ue.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: ue.bar, "aria-hidden": "true" }, r))
  ] });
}
function Qu({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(kd, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function Zu(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Qu, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Ju, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function d$(e) {
  const a = Xu(e.onOpen), t = Mn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: ue.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${ue.k} ${ue.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ea, { title: "Card", children: /* @__PURE__ */ n("div", { className: ue.card, children: t && /* @__PURE__ */ n($a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ea, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: ue.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Zu, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: ue.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ea, { title: "Effect of this config", children: /* @__PURE__ */ n(Ca, { items: e.effects, density: "compact" }) })
  ] });
}
function eh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function ah(e) {
  return Math.ceil(e.length / 2);
}
function nh(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Bn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function th(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Bn(e);
  l !== void 0 && t(l), r(nh(e.type));
}
function rh(e, a, t, r, l) {
  A(() => {
    if (e !== null)
      return e.subscribe(a, (i) => th(i, t, r, l));
  }, [e, a, t, r, l]);
}
function lh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function oh(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function ih(e, a) {
  return a !== void 0 ? le(e.timeInStage) + " · waits on " + a.agent : le(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function ch(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(ah(a ?? [])) + ")"
  };
}
function sh(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function dh(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: ae(e.cost) }) : null;
}
function uh(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function hh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function mh(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function wh(e, a) {
  return a === void 0 ? e : eh(e, a.ref);
}
function _h(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ze(e) {
  return e === !0 ? "true" : void 0;
}
function Pn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = N(null), i = la(l), c = N(/* @__PURE__ */ new Set()), [s, u] = p(lh(a));
  rh(e.feed, a.key, c, u, i);
  const d = oh(a, r), h = ih(a, t), _ = ch(a, e.fields), b = mh(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ..._h(e),
      className: "ward-workcard",
      "data-flagged": Ze(a.flagged),
      "data-selected": Ze(e.selected),
      style: _,
      ref: wh(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        sh(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          dh(a, e.fields),
          uh(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          hh(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function vh({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function fh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function bh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function ph(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(vh, { count: e.items.length, cap: e.column.cap });
}
function gh(e, a) {
  return e.roving ?? a;
}
function Nh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function yh(e, a) {
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
function kh(e) {
  const a = k(), t = fa({ orientation: "vertical" }), r = gh(e, t), l = fh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ze(l), "data-gate": Ze(e.column.gate), children: [
    bh(e.column, e.items.length, a),
    ph(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Nh(e, t), children: yh(e, r) })
  ] });
}
function $h(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + le(e.p50)), e.p90 !== void 0 && (a += " · p90 " + le(e.p90)), a;
}
function Ch(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Sh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function u$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: $h(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Ch(e),
      Sh(e.onConfigure),
      /* @__PURE__ */ n(Ka, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Rh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Th(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(De, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(De, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Eh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(R, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function h$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ze(Rh(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Th(e) }),
    /* @__PURE__ */ n(L, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Tn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Eh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function m$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Pn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(kh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Lh(e, a) {
  const t = Bn(e);
  t !== void 0 && a(t);
}
function Ah(e, a, t) {
  A(() => {
    if (e != null)
      return e.subscribe(a, (r) => Lh(r, t));
  }, [e, a, t]);
}
function xh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Ih(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", le(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ae(e.cost)]), a;
}
function qh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Mh(e, a) {
  return /* @__PURE__ */ o(R, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function w$(e) {
  var c;
  const a = e.item, t = a.run, [r, l] = p((c = a.run) == null ? void 0 : c.lastStep);
  Ah(e.feed, a.key, l);
  const i = [...xh(a), ...Ih(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      qh(t, r)
    ] }),
    Mh(a, e.actions)
  ] });
}
const Bh = "_card_hvxp7_2", Ph = "_head_hvxp7_17", Dh = "_mark_hvxp7_25", Oh = "_name_hvxp7_37", Hh = "_chips_hvxp7_48", Fh = "_description_hvxp7_54", jh = "_run_hvxp7_59", Wh = "_sep_hvxp7_68", zh = "_facts_hvxp7_73", Gh = "_fact_hvxp7_73", Uh = "_factLabel_hvxp7_86", Kh = "_factValue_hvxp7_90", te = {
  card: Bh,
  head: Ph,
  mark: Dh,
  name: Oh,
  chips: Hh,
  description: Fh,
  run: jh,
  sep: Wh,
  facts: zh,
  fact: Gh,
  factLabel: Uh,
  factValue: Kh
}, Vh = { live: "done", draft: "running", paused: "meta" };
function Yh(e) {
  return e === void 0 ? te.card : `${te.card} ${e}`;
}
function Xh({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: te.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Vh[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function Jh({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: te.description, children: e });
}
function Qh({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: te.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: te.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Zh({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: te.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: te.fact, children: [
    /* @__PURE__ */ n("dt", { className: te.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: te.factValue, children: a.value })
  ] }, a.label)) });
}
function em(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function am({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: c }) {
  const s = { "--stream": Ee(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: Yh(c),
      style: s,
      "data-selected": u,
      "data-paused": em(e.versions),
      children: [
        /* @__PURE__ */ o("h3", { className: te.head, children: [
          /* @__PURE__ */ n("span", { className: te.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${te.name} ward-rowlink`, href: F(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(Jh, { description: e.description }),
        /* @__PURE__ */ n(Qh, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(Xh, { versions: e.versions }),
        /* @__PURE__ */ n(Zh, { facts: i })
      ]
    }
  );
}
const nm = "_list_4dcyc_2", tm = "_row_4dcyc_11", rm = "_head_4dcyc_23", lm = "_id_4dcyc_30", om = "_lock_4dcyc_35", im = "_reason_4dcyc_41", cm = "_remove_4dcyc_46", sm = "_clauses_4dcyc_50", dm = "_clause_4dcyc_50", um = "_label_4dcyc_64", hm = "_cell_4dcyc_71", mm = "_value_4dcyc_76", re = {
  list: nm,
  row: tm,
  head: rm,
  id: lm,
  lock: om,
  reason: im,
  remove: cm,
  clauses: sm,
  clause: dm,
  label: um,
  cell: hm,
  value: mm
}, Dn = Ve(!1);
function _$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Dn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: re.list, "aria-label": a, children: e }) });
}
function wm({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: re.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(L, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function _m({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: re.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: re.reason, children: e })
  ] });
}
function vm({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: re.head, children: [
    /* @__PURE__ */ n("span", { className: re.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(_m, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: re.remove, children: /* @__PURE__ */ o(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function wn(e, a) {
  return e.locked ? void 0 : a;
}
function v$({ rule: e, onChange: a, onRemove: t }) {
  if (!Ke(Dn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = wn(e, a);
  return /* @__PURE__ */ o("li", { className: re.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(vm, { rule: e, onRemove: wn(e, t) }),
    /* @__PURE__ */ n("dl", { className: re.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: re.clause, children: [
      /* @__PURE__ */ n("dt", { className: re.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: re.cell, children: /* @__PURE__ */ n(wm, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const fm = "_ladder_wwnch_2", bm = "_cell_wwnch_7", pm = "_empty_wwnch_26", gm = "_name_wwnch_34", Nm = "_holder_wwnch_40", ym = "_request_wwnch_46", km = "_swatches_wwnch_51", $m = "_swatch_wwnch_51", Cm = "_tilesFrame_wwnch_78", Sm = "_tiles_wwnch_78", Rm = "_tile_wwnch_78", Tm = "_bar_wwnch_117", Em = "_hex_wwnch_128", Lm = "_note_wwnch_138", T = {
  ladder: fm,
  cell: bm,
  empty: pm,
  name: gm,
  holder: Nm,
  request: ym,
  swatches: km,
  swatch: $m,
  tilesFrame: Cm,
  tiles: Sm,
  tile: Rm,
  bar: Tm,
  hex: Em,
  note: Lm
}, Am = "not validated yet, pending a CVD matrix and dark stepping";
function xm(e) {
  return e.reserved ? "reserved" : pa(e.step) ? "validated" : "partial";
}
function On(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Im(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function qm({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Le, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${T.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Mm(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Bm(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const _n = (e) => String(e).padStart(2, "0");
function Pm(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? On(e, void 0);
}
function Dm({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("span", { className: `${T.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${T.hex} ward-ladder-hex`, children: r ? `step ${_n(e)}` : Mt(e) }),
    /* @__PURE__ */ n("span", { className: `${T.note} ward-ladder-note`, children: r ? t : `Step ${_n(e)} · ${t}` })
  ] });
}
function Om({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = xm(e), c = On(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, _ = `${d} · ${l === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...Bm(s, u), "data-validation": i, style: Im(e, i), onClick: h, onKeyDown: (x) => Mm(x, h) }, label: _, name: d, holder: c, validation: i, note: Pm(i, t, u), step: e.step };
}
const Hm = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${T.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${T.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Dm, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${T.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(qm, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${T.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${T.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Fm(e) {
  return Hm[e.presentation](Om(e));
}
function jm(e) {
  for (const a of e)
    if (!a.reserved && !ba(a.step)) throw new Error("colour ladder renders token steps only");
}
function Wm() {
  return /* @__PURE__ */ o("div", { className: `${T.cell} ward-ladder-cell ${T.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${T.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${T.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${T.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function zm(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Gm = { list: T.ladder, swatches: T.swatches, tiles: T.tilesFrame };
function Um() {
  return /* @__PURE__ */ o("div", { className: `${T.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${T.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${T.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${T.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Km = { list: Wm, swatches: () => null, tiles: Um };
function Hn(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  jm(e.steps);
  const r = zm(e), l = Km[r], i = /* @__PURE__ */ o(R, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(Fm, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${Gm[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: T.tiles, children: i }) : i });
}
const Vm = "_rail_1el2t_2", Ym = "_section_1el2t_12", Xm = "_sectionFlush_1el2t_22", Jm = "_head_1el2t_26", Qm = "_headLabel_1el2t_34", Zm = "_sample_1el2t_42", ew = "_sampleLabel_1el2t_47", aw = "_sampleTitle_1el2t_54", nw = "_sampleMeta_1el2t_59", tw = "_trace_1el2t_65", rw = "_traceHead_1el2t_70", lw = "_steps_1el2t_78", ow = "_step_1el2t_78", iw = "_stepTitle_1el2t_97", cw = "_hollow_1el2t_107", sw = "_stepBody_1el2t_115", dw = "_stepDetail_1el2t_127", uw = "_publish_1el2t_132", hw = "_reason_1el2t_138", mw = "_note_1el2t_143", ww = "_reveal_1el2t_148", g = {
  rail: Vm,
  section: Ym,
  sectionFlush: Xm,
  head: Jm,
  headLabel: Qm,
  sample: Zm,
  sampleLabel: ew,
  sampleTitle: aw,
  sampleMeta: nw,
  trace: tw,
  traceHead: rw,
  steps: lw,
  step: ow,
  stepTitle: iw,
  hollow: cw,
  stepBody: sw,
  stepDetail: dw,
  publish: uw,
  reason: hw,
  note: mw,
  reveal: ww
}, vn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, _w = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, vw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, fw = { notSimulated: "not simulated", running: "running" };
function bw(e) {
  return e.presentation === "foundry";
}
function pw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function gw(e, a) {
  var r;
  const t = _w[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Nw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function yw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function kw(e) {
  if (Nw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function $w(e) {
  const [a, t] = p(!1);
  A(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${g.step} ${g.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Cw(e) {
  const a = fw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: g.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Le, { size: 6, kind: vw[e.kind], label: e.kind });
}
function Sw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: g.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Rw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Tw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o($w, { kind: a.kind, children: [
    /* @__PURE__ */ n(Cw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: g.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: g.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Sw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Rw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Ew(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(le(a)), t.join(" · ");
}
function Fn(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${g.trace} ${g.section}`, children: [
    /* @__PURE__ */ n("p", { className: g.traceHead, id: a, children: Ew(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: g.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Tw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Lw(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${g.sample} ${g.section}`, children: [
    /* @__PURE__ */ n("p", { className: g.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ o("p", { className: g.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ o("p", { className: g.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Aw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + oe(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${g.sampleMeta} ${g.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function xw(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ae(e.run.cost), label: "Cost" }, { value: e.run.turns ? Cn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: g.sectionFlush, children: /* @__PURE__ */ n(ya, { divided: !0, cells: a }) });
}
function Iw(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ae(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Cn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function qw(e) {
  const a = Iw(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: g.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: g.sectionFlush, children: /* @__PURE__ */ n(ya, { divided: !0, cells: a }) });
}
function jn(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("p", { className: `${g.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Mw(e) {
  return /* @__PURE__ */ o("div", { className: `${g.publish} ${g.section}`, children: [
    /* @__PURE__ */ n(jn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: g.note, children: e.note })
  ] });
}
function Bw(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${g.publish} ${g.section}`, children: /* @__PURE__ */ n(jn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Wn(e) {
  return /* @__PURE__ */ o("div", { className: `${g.head} ${g.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: g.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: vn[e.run.status].role, label: vn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Pw(e, a) {
  const [t, r] = p(e.steps);
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
function Dw(e) {
  var t;
  yw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${g.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Wn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Lw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Fn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(xw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: g.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist }) }),
    /* @__PURE__ */ n(Mw, { reason: pw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Ow(e) {
  var r;
  const a = Pw(e.run, e.feed);
  kw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${g.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Wn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Aw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Fn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(qw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: g.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Bw, { reason: gw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function f$(e) {
  return bw(e) ? /* @__PURE__ */ n(Ow, { ...e }) : /* @__PURE__ */ n(Dw, { ...e });
}
const Hw = "_list_142ip_3", Fw = "_row_142ip_9", jw = "_condition_142ip_18", Ww = "_action_142ip_24", oa = {
  list: Hw,
  row: Fw,
  condition: jw,
  action: Ww
}, zn = Ve(!1);
function b$({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(zn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oa.list, "aria-label": a, children: e }) });
}
function p$({ rule: e }) {
  if (!Ke(zn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: oa.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: oa.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: oa.action, children: e.then })
  ] });
}
function Da(e, a, t) {
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
function fn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function zw(e) {
  return e === "up" ? "down" : "up";
}
function Gw(e, a) {
  const t = fn(e, a.id, a.direction) ?? fn(e, a.id, zw(a.direction));
  t == null || t.focus();
}
function Kn() {
  const e = N(null), [a, t] = p(null), [r, l] = p("");
  return A(() => {
    e.current !== null && a !== null && Gw(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), l(s);
  } };
}
function Vn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ha({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Uw = "_body_1h15q_2", Kw = "_title_1h15q_8", Vw = "_section_1h15q_13", Yw = "_legend_1h15q_18", Xw = "_stages_1h15q_26", Jw = "_stage_1h15q_26", Qw = "_stageIndex_1h15q_44", Zw = "_stageName_1h15q_50", e_ = "_footer_1h15q_59", a_ = "_note_1h15q_66", n_ = "_reason_1h15q_71", t_ = "_actions_1h15q_76", r_ = "_webHead_1h15q_83", l_ = "_kicker_1h15q_92", o_ = "_webTitle_1h15q_99", i_ = "_webBody_1h15q_105", c_ = "_webSection_1h15q_109", s_ = "_sectionHead_1h15q_121", d_ = "_sectionNote_1h15q_129", u_ = "_formLabel_1h15q_134", h_ = "_identityRow_1h15q_139", m_ = "_nameCell_1h15q_145", w_ = "_keyCell_1h15q_150", __ = "_colourCell_1h15q_154", v_ = "_colourStatus_1h15q_161", f_ = "_webStages_1h15q_166", b_ = "_webStageList_1h15q_172", p_ = "_webStage_1h15q_166", g_ = "_webIndex_1h15q_191", N_ = "_webStageName_1h15q_196", y_ = "_webMoves_1h15q_201", k_ = "_addStage_1h15q_215", $_ = "_addStageButton_1h15q_223", C_ = "_addStageNote_1h15q_231", S_ = "_webFooter_1h15q_236", R_ = "_webFooterNotes_1h15q_244", T_ = "_webNote_1h15q_251", w = {
  body: Uw,
  title: Kw,
  section: Vw,
  legend: Yw,
  stages: Xw,
  stage: Jw,
  stageIndex: Qw,
  stageName: Zw,
  footer: e_,
  note: a_,
  reason: n_,
  actions: t_,
  webHead: r_,
  kicker: l_,
  webTitle: o_,
  webBody: i_,
  webSection: c_,
  sectionHead: s_,
  sectionNote: d_,
  formLabel: u_,
  identityRow: h_,
  nameCell: m_,
  keyCell: w_,
  colourCell: __,
  colourStatus: v_,
  webStages: f_,
  webStageList: b_,
  webStage: p_,
  webIndex: g_,
  webStageName: N_,
  webMoves: y_,
  addStage: k_,
  addStageButton: $_,
  addStageNote: C_,
  webFooter: S_,
  webFooterNotes: R_,
  webNote: T_
}, E_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Yn = "not in catalogue";
function L_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Yn}` }, ...t];
}
function A_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(L, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Yn}`;
  return /* @__PURE__ */ n(L, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: L_(t, e.name), invalid: i, onChange: r });
}
function Xn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function x_(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function I_({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: c }) {
  const s = Xn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(A_, { stage: a, index: t, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(L, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: E_, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ha, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ha, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function q_({ stages: e, onChange: a, catalogue: t }) {
  const r = x_(e.length), l = Kn(), i = (s, u) => {
    const d = Gn(s, u);
    r.current = Da(r.current, s, d), l.moved({ id: r.current[d], direction: u }, Un(Xn(e[s], s), d, e.length)), a(Da(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(I_, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Vn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const M_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], B_ = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], P_ = "A new stream starts as a draft. Nothing runs on it until you publish it.", D_ = "Create is disabled: name the stream and give it a key first.", O_ = "reorder with the ↑ ↓ buttons · min 2";
function Va(e, a) {
  return !e.reserved && pa(e.step) && a[e.step] === void 0;
}
function H_(e, a) {
  const t = e.find((r) => Va(r, a));
  return t ? t.step : 1;
}
function F_({ stages: e, onMove: a }) {
  const t = Kn(), r = (l, i) => {
    const c = Gn(l, i);
    t.moved({ id: e[l].id, direction: i }, Un(e[l].name, c, e.length)), a(l, c);
  };
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ha, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ha, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Vn, { text: t.announcement })
  ] });
}
function j_({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: P_ }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function W_(e, a) {
  return e !== "" && a !== "" ? null : D_;
}
function z_(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = B_, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [h, _] = p(""), [b, x] = p(""), [K, Z] = p(a[0].value), [ie, $e] = p(() => H_(t, r)), [ce, Oe] = p(e.stages ?? M_), [He, $] = p(l[0].value), j = { name: h, key: b, streamStep: ie, owner: K, stages: ce, policy: He }, _e = W_(h, b);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Stream name", value: h, onChange: _ }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Key", value: b, onChange: x, mono: !0 }),
      /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: K, onChange: Z, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Hn, { label: "Stream colour", steps: t, value: ie, onChange: $e, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(F_, { stages: ce, onMove: (Ae, ft) => Oe(Da(ce, Ae, ft)) })
    ] }),
    /* @__PURE__ */ n(xn, { legend: "Loop policy", options: l, value: He, onChange: $ }),
    /* @__PURE__ */ n(j_, { reason: _e, onCreate: () => i(j), onDraft: () => c(j) })
  ] }) });
}
const Jn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], G_ = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function U_(e, a, t, r, l, i) {
  var s;
  const c = ((s = Jn.find((u) => u.value === l)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function K_(e, a) {
  return V_(e) && Y_(e, a) && X_(e);
}
function V_(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Y_(e, a) {
  return e.colourStep !== null && Va({ step: e.colourStep }, a);
}
function X_(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function J_(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${Am}.` : Va({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Q_({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Z_({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Q_, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: G_ })
    ] }),
    l && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function ev({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function av({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function nv(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [l, i] = p(""), [c, s] = p(""), [u, d] = p(e.owners[0] ?? ""), [h, _] = p(null), [b, x] = p("relay"), [K, Z] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), ie = U_(l, c, u, h, b, K), $e = K_(ie, r), ce = K.find(($) => $.kind === "agent" && $.name.trim() !== ""), Oe = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Hn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), He = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: J_(h, r) }),
    /* @__PURE__ */ n(L, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: d })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(ev, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(av, { name: l, setName: i, streamKey: c, setKey: s, colour: Oe, owner: He }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: O_ })
        ] }),
        /* @__PURE__ */ n(q_, { stages: K, onChange: Z })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(xn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Jn, onChange: x }) }),
      /* @__PURE__ */ n(Z_, { ready: $e, draft: ie, agentStage: ce, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function g$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(nv, { ...e }) : /* @__PURE__ */ n(z_, { ...e });
}
const tv = "_row_bs8hc_2", rv = "_cell_bs8hc_6", lv = "_condition_bs8hc_11", ov = "_action_bs8hc_18", iv = "_contract_bs8hc_24", cv = "_contractCondition_bs8hc_33", sv = "_contractAction_bs8hc_39", X = {
  row: tv,
  cell: rv,
  condition: lv,
  action: ov,
  contract: iv,
  contractCondition: cv,
  contractAction: sv
}, Qn = ["advance", "block", "escalate", "requestReview"], bn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ma(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Ya(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: X.action, children: bn[e.then] }) : /* @__PURE__ */ n(
    L,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: Qn.map((l) => ({ value: l, label: bn[l] }))
    }
  );
}
function dv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: X.condition, title: ma(e, r), children: ma(e, r) }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: Ya(e, a, t) })
  ] });
}
function uv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: X.row, children: [
    /* @__PURE__ */ o("td", { className: X.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: X.condition, children: ma(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: X.cell, children: Ya(e, a, t) })
  ] });
}
function hv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: X.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: X.contractCondition, children: ma(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: X.contractAction, children: Ya(e, a, t, !0) })
  ] });
}
const mv = { two: uv, four: dv, contract: hv };
function N$(e) {
  var t;
  if (!Qn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = mv[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const wv = "_column_lurgk_2", _v = "_head_lurgk_17", vv = "_index_lurgk_23", fv = "_name_lurgk_29", bv = "_meta_lurgk_38", pv = "_mono_lurgk_43", gv = "_gate_lurgk_50", Nv = "_reviewersLabel_lurgk_57", yv = "_reviewers_lurgk_57", kv = "_reviewer_lurgk_57", $v = "_agents_lurgk_74", Cv = "_workflowColumn_lurgk_79", Sv = "_workflowHead_lurgk_96", Rv = "_stageRow_lurgk_102", Tv = "_stageLabel_lurgk_109", Ev = "_workflowTitle_lurgk_116", Lv = "_workflowMeta_lurgk_122", Av = "_workflowGate_lurgk_127", xv = "_gateNote_lurgk_135", Iv = "_cardNote_lurgk_140", qv = "_reviewerList_lurgk_149", Mv = "_reviewerRow_lurgk_155", Bv = "_reviewerMark_lurgk_161", Pv = "_reviewerName_lurgk_171", Dv = "_terminalCard_lurgk_177", Ov = "_terminalCount_lurgk_186", Hv = "_workflowAgents_lurgk_192", Fv = "_mount_lurgk_198", y = {
  column: wv,
  head: _v,
  index: vv,
  name: fv,
  meta: bv,
  mono: pv,
  gate: gv,
  reviewersLabel: Nv,
  reviewers: yv,
  reviewer: kv,
  agents: $v,
  workflowColumn: Cv,
  workflowHead: Sv,
  stageRow: Rv,
  stageLabel: Tv,
  workflowTitle: Ev,
  workflowMeta: Lv,
  workflowGate: Av,
  gateNote: xv,
  cardNote: Iv,
  reviewerList: qv,
  reviewerRow: Mv,
  reviewerMark: Bv,
  reviewerName: Pv,
  terminalCard: Dv,
  terminalCount: Ov,
  workflowAgents: Hv,
  mount: Fv
}, jv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Xa(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Zn(e) {
  return `${Math.round(e * 100)}%`;
}
function Wv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ya, { cells: [
      { value: Zn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: Q(e.count), label: "In stage" }
    ] })
  ] });
}
function zv({ stage: e }) {
  return /* @__PURE__ */ n(ya, { cells: [
    { value: Q(e.count), label: "In stage" },
    { value: Xa(e.closedThisWeek, Q), label: "Closed this week" }
  ] });
}
function Gv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: jv[e.kind] })
  ] });
}
function Uv({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: y.meta, children: [
    /* @__PURE__ */ o("span", { className: y.mono, children: [
      Q(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: y.mono, children: [
      le(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Kv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Wv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(zv, { stage: e }) : null;
}
function Vv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Yv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: y.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Gv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(Uv, { stage: e }),
    /* @__PURE__ */ n(Kv, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(am, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(Vv, { onMount: t })
  ] });
}
const Xv = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function Jv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function Qv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Jv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Zn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Zv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function ef({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: Xa(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: Zv(e.rolledBackThisWeek) })
  ] });
}
function af(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function nf(e) {
  if (e.kind === "terminal") return `${Xa(e.closedThisWeek)} this week`;
  const a = af(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function tf({ stage: e, titleId: a }) {
  const t = Xv[e.kind];
  return /* @__PURE__ */ o("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: y.stageRow, children: [
      /* @__PURE__ */ o("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: nf(e) })
  ] });
}
function rf(e) {
  return e === "entry" || e === "agent";
}
function lf({ stage: e, onMount: a }) {
  return a === void 0 || !rf(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function of({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ o("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(tf, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Qv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(ef, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(lf, { stage: e, onMount: t })
  ] });
}
function cf(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function y$(e) {
  return cf(e) ? /* @__PURE__ */ n(of, { ...e }) : /* @__PURE__ */ n(Yv, { ...e });
}
const sf = "_row_ve78g_6", df = "_cell_ve78g_10", uf = "_name_ve78g_19", hf = "_chain_ve78g_26", mf = "_owner_ve78g_32", wf = "_mono_ve78g_38", _f = "_compactRow_ve78g_45", vf = "_compactCell_ve78g_54", ff = "_stack_ve78g_71", bf = "_stat_ve78g_78", pf = "_identityLine_ve78g_85", gf = "_identity_ve78g_85", Nf = "_compactName_ve78g_103", yf = "_ownerLine_ve78g_117", kf = "_link_ve78g_130", $f = "_emptyChain_ve78g_136", Cf = "_arrow_ve78g_142", Sf = "_muted_ve78g_143", Rf = "_define_ve78g_148", Tf = "_statValue_ve78g_155", Ef = "_policyId_ve78g_161", Lf = "_sub_ve78g_166", f = {
  row: sf,
  cell: df,
  name: uf,
  chain: hf,
  owner: mf,
  mono: wf,
  compactRow: _f,
  compactCell: vf,
  stack: ff,
  stat: bf,
  identityLine: pf,
  identity: gf,
  compactName: Nf,
  ownerLine: yf,
  link: kf,
  emptyChain: $f,
  arrow: Cf,
  muted: Sf,
  define: Rf,
  statValue: Tf,
  policyId: Ef,
  sub: Lf
};
function Af(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function xf(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function et(e) {
  return `${Q(e)} ${e === 1 ? "member" : "members"}`;
}
function If(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${et(e.members)}`;
}
function qf(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ o("span", { className: f.stack, children: [
    /* @__PURE__ */ o("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: F(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: If(e) })
  ] }) });
}
function Mf(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function Bf(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: F(a), children: "Define workflow" })
  ] }) : Mf(e) });
}
function pn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function Pf(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function Df(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Of({ stream: e, href: a, presentation: t }) {
  const r = xf(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ee(e.streamStep, "chip") }, children: [
    qf(e, a),
    Bf(e.stages, a),
    pn(Df(e.agents), e.agents === void 0 ? void 0 : Af(e.agents), "—"),
    Pf(e.policy),
    pn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function Hf(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function k$(e) {
  if (Hf(e)) return Of(e);
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
      /* @__PURE__ */ n("span", { className: f.mono, children: et(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: Q(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : le(a.p50) }) })
  ] });
}
const Ff = "_row_mdce7_2", jf = "_name_mdce7_16", Wf = "_scope_mdce7_24", wa = {
  row: Ff,
  name: jf,
  scope: Wf
};
function zf(e) {
  return e === void 0 ? `${wa.row} ward-toolrow` : `${wa.row} ward-toolrow ${e}`;
}
function Gf(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Uf({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function Kf({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Vf({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${wa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Yf(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function $$({ tool: e, onChange: a, presentation: t }) {
  const r = k(), l = k(), i = Gf(e, t), c = Yf(t);
  return /* @__PURE__ */ o(c, { className: zf(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Uf, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${wa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Vf, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(Kf, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Xf = "_strip_1qtlf_2", Jf = "_head_1qtlf_10", Qf = "_name_1qtlf_16", Zf = "_chart_1qtlf_24", eb = "_segment_1qtlf_30", ab = "_detailedChart_1qtlf_36", nb = "_rail_1qtlf_49", tb = "_section_1qtlf_55", rb = "_label_1qtlf_66", lb = "_note_1qtlf_83", J = {
  strip: Xf,
  head: Jf,
  name: Qf,
  chart: Zf,
  segment: eb,
  detailedChart: ab,
  rail: nb,
  section: tb,
  label: rb,
  note: lb
}, ob = "No item in flight to preview.", ib = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", cb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Oa = [1, 2, 3, 4, 5, 6], _a = 100;
function sb(e, a) {
  return a.has(e) ? Ee(e, "id") : "var(--ward-color-line)";
}
function db({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: J.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Oa.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: J.segment,
      x: l * _a,
      y: "0",
      width: _a,
      height: "8",
      fill: sb(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function ub(e) {
  const a = e.slice(0, Oa.length);
  for (; a.length < Oa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function hb({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${J.detailedChart} ward-appearance-chart`, children: [
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
function at(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ta({ label: e, children: a }) {
  const t = k();
  return /* @__PURE__ */ o("section", { className: J.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: J.label, children: e }),
    a
  ] });
}
function mb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: J.note, children: a ?? ob }) : /* @__PURE__ */ n($a, { item: { ...e, streamStep: ga(t.streamStep) }, onOpen: at(r), feed: null });
}
function wb({ draft: e }) {
  const a = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: J.head, style: a, children: [
    /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: J.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
  ] });
}
function _b(e) {
  const a = ub(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: J.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ta, { label: "Board card", children: /* @__PURE__ */ n(mb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ta, { label: "Streams index row", children: /* @__PURE__ */ n(wb, { draft: t }) }),
    /* @__PURE__ */ o(ta, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(hb, { identities: a }),
      /* @__PURE__ */ n("p", { className: J.note, children: ib })
    ] }),
    /* @__PURE__ */ n(ta, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: J.note, children: cb }) })
  ] });
}
function vb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: J.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: J.head, children: [
      /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: J.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n($a, { item: { ...a, streamStep: e.streamStep }, onOpen: at(r) }),
    /* @__PURE__ */ n(db, { draft: e, streams: t })
  ] });
}
function C$(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(_b, { ...e }) : /* @__PURE__ */ n(vb, { ...e });
}
const fb = "_row_ixlg5_6", bb = "_headCell_ixlg5_10", pb = "_cell_ixlg5_11", gb = "_name_ixlg5_23", Nb = "_consequence_ixlg5_29", yb = "_governed_ixlg5_36", kb = "_control_ixlg5_42", $b = "_byRole_ixlg5_48", Cb = "_webControl_ixlg5_59", Sb = "_webConsequence_ixlg5_65", Rb = "_webGoverned_ixlg5_71", D = {
  row: fb,
  headCell: bb,
  cell: pb,
  name: gb,
  consequence: Nb,
  governed: yb,
  control: kb,
  byRole: $b,
  webControl: Cb,
  webConsequence: Sb,
  webGoverned: Rb
};
function Tb({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: D.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: D.control, children: [
    /* @__PURE__ */ n(
      De,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "PILOT" })
  ] });
}
function Eb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: D.headCell, children: [
      /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: D.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: D.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Tb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Lb(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Ab({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${D.webControl} ${D.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    De,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (l) => t == null ? void 0 : t(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${D.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "PILOT" }),
    r
  ] });
}
function xb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Ab, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webGoverned} ward-cellmeta`, children: Lb(e) }) })
  ] });
}
function S$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(xb, { ...e }) : /* @__PURE__ */ n(Eb, { ...e });
}
const Ib = "_row_vv64h_2", qb = "_cell_vv64h_6", Mb = "_name_vv64h_25", Bb = "_note_vv64h_30", Pb = "_webName_vv64h_41", Db = "_webMeta_vv64h_47", G = {
  row: Ib,
  cell: qb,
  name: Mb,
  note: Bb,
  webName: Pb,
  webMeta: Db
}, nt = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Ob(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Hb({ component: e, onRestart: a }) {
  const t = k(), r = nt[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: G.row, children: [
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: G.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: G.cell, "data-mono": "true", children: [
      Q(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { id: t, className: G.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: G.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(v, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Fb({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: Ob(e.state) });
}
function jb({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: G.row, children: [
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: `${G.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: `${G.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(m, { ...nt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(Fb, { component: e, onRestart: a }) })
  ] });
}
function R$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(jb, { ...e }) : /* @__PURE__ */ n(Hb, { ...e });
}
const Wb = "_row_1f1gp_7", zb = "_cell_1f1gp_11", Gb = "_next_1f1gp_28", Ub = "_headCell_1f1gp_38", Kb = "_webId_1f1gp_77", Vb = "_webPurpose_1f1gp_83", Yb = "_webMeta_1f1gp_91", Xb = "_webUrgent_1f1gp_97", O = {
  row: Wb,
  cell: zb,
  next: Gb,
  headCell: Ub,
  webId: Kb,
  webPurpose: Vb,
  webMeta: Yb,
  webUrgent: Xb
}, Jb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Qb = {
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
], Zb = Object.fromEntries(tt.map((e) => [e.key, e]));
function je({ column: e, children: a }) {
  const t = Zb[e];
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
function T$() {
  return /* @__PURE__ */ n("tr", { children: tt.map((e) => /* @__PURE__ */ n(
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
function ep({ cred: e }) {
  const a = Jb[e.state];
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ n(je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(je, { column: "id", children: e.id }),
    /* @__PURE__ */ n(je, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(je, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(je, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function ap({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function np({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(ap, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...Qb[e.state] }) })
  ] });
}
function E$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(np, { ...e }) : /* @__PURE__ */ n(ep, { ...e });
}
const tp = "_card_17zba_2", rp = "_head_17zba_11", lp = "_env_17zba_18", op = "_version_17zba_25", ip = "_meta_17zba_32", cp = "_webCard_17zba_37", sp = "_webRow_17zba_47", dp = "_webTitle_17zba_55", up = "_webLine_17zba_65", hp = "_webVersion_17zba_72", mp = "_webMeta_17zba_77", z = {
  card: tp,
  head: rp,
  env: lp,
  version: op,
  meta: ip,
  webCard: cp,
  webRow: sp,
  webTitle: dp,
  webLine: up,
  webVersion: hp,
  webMeta: mp
}, rt = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function wp({ env: e }) {
  const a = rt[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: z.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ o("div", { className: z.head, children: [
      /* @__PURE__ */ n("span", { className: z.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: z.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: z.meta, children: [
      "deployed ",
      oe(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: z.meta, children: t })
  ] });
}
function _p(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [oe(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function vp(e) {
  return /* @__PURE__ */ o("article", { className: `${z.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${z.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${z.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...rt[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${z.version} ${z.webVersion} ${z.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${z.meta} ${z.webMeta} ${z.webLine} ward-cellmeta`, children: _p(e) })
  ] });
}
function L$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(vp, { ...e }) : /* @__PURE__ */ n(wp, { ...e });
}
const fp = "_panel_1hmja_2", bp = "_line_1hmja_8", pp = "_actions_1hmja_14", ra = {
  panel: fp,
  line: bp,
  actions: pp
};
function A$(e) {
  return /* @__PURE__ */ o("div", { className: ra.panel, children: [
    /* @__PURE__ */ n("p", { className: ra.line, children: e.status }),
    /* @__PURE__ */ n(L, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ra.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ra.line, children: e.note ?? "" })
  ] });
}
const gp = "_upload_erepj_2", Np = "_preview_erepj_7", yp = "_mark_erepj_17", kp = "_empty_erepj_22", $p = "_actions_erepj_28", Cp = "_input_erepj_33", Sp = "_reasons_erepj_41", Rp = "_reason_erepj_41", Tp = "_accepted_erepj_57", ee = {
  upload: gp,
  preview: Np,
  mark: yp,
  empty: kp,
  actions: $p,
  input: Cp,
  reasons: Sp,
  reason: Rp,
  accepted: Tp
}, lt = 1.5, ot = 22, va = "script elements or event handlers", Se = "links or external references", ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${lt}px at ${ot}px`], Ep = [ye[1], ye[2], va, Se], Lp = /* @__PURE__ */ new Map([
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
]), Ap = "http://www.w3.org/2000/svg", xp = "http://www.w3.org/2000/xmlns/", Ip = /* @__PURE__ */ new Set([
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
]), qp = /* @__PURE__ */ new Set([
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
]), Mp = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, Bp = /url\s*\(|['"\\]/i;
function Pp() {
  return { ok: !1, reasons: [ye[1]] };
}
function it(e) {
  return e.namespaceURI === Ap || e.namespaceURI === null;
}
function Dp(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && it(a) ? a : null;
  } catch {
    return null;
  }
}
function Op(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [ye[0]] : [];
}
function Hp(e) {
  return Lp.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function Fp(e) {
  return Bp.test(e.replace(Mp, ""));
}
function jp(e) {
  return /^on/i.test(e.localName) ? va : e.localName === "href" || Fp(e.value) ? Se : void 0;
}
function Wp(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(Hp(t));
    for (const r of Array.from(t.attributes)) a.add(jp(r));
  }
  return Ep.filter((t) => a.has(t));
}
function zp(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? ot / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < lt;
  }) ? [ye[3]] : [];
}
function Gp(e) {
  if (e.namespaceURI === xp) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (qp.has(a) || a.startsWith("stroke"));
}
function Up(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && it(a) && Ip.has(a.localName);
}
function Kp(e, a) {
  Up(a) ? a.nodeType === Node.ELEMENT_NODE && ct(a) : e.removeChild(a);
}
function ct(e) {
  for (const a of Array.from(e.attributes)) Gp(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) Kp(e, a);
  return e;
}
function x$(e) {
  const a = Dp(e);
  if (a === null) return Pp();
  const t = [...Op(a), ...Wp(a), ...zp(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(ct(a)) };
}
const Vp = "Mark accepted.";
function Yp({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: ee.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: ee.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: ee.empty }) });
}
function Xp(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Jp(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Qp({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: ee.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: ee.result, role: "status", children: /* @__PURE__ */ n("p", { className: ee.accepted, children: Vp }) }) : /* @__PURE__ */ n("div", { className: ee.result, role: "status", children: /* @__PURE__ */ n("ul", { className: ee.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: ee.reason, children: a }, a)) }) });
}
function Zp({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Qp, { result: e }) : /* @__PURE__ */ n("p", { className: `${ee.result} ${Xp(e, t)}`, role: "status", children: Jp(e, t) });
}
function I$({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = N(null), [i, c] = p(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ o("div", { className: ee.upload, children: [
    /* @__PURE__ */ n(Yp, { current: e }),
    /* @__PURE__ */ o("div", { className: ee.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: l,
          className: ee.input,
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
        return (u = l.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(v, { variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(Zp, { result: i, presentation: r })
  ] });
}
const eg = "_row_1wp9s_7", ag = "_cell_1wp9s_11", ng = "_head_1wp9s_28", tg = "_name_1wp9s_34", rg = "_pinned_1wp9s_42", lg = "_headCell_1wp9s_49", og = "_webName_1wp9s_88", ig = "_webMeta_1wp9s_95", cg = "_webWarn_1wp9s_103", q = {
  row: eg,
  cell: ag,
  head: ng,
  name: tg,
  pinned: rg,
  headCell: lg,
  webName: og,
  webMeta: ig,
  webWarn: cg
}, Ja = {
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
], sg = Object.fromEntries(st.map((e) => [e.key, e]));
function dg(e, a) {
  return `mcp.${e}.${a}`;
}
function ug(e) {
  return Object.keys(Ja).includes(e);
}
function hg(e) {
  return Ja[e !== void 0 && ug(e) ? e : "unknown"];
}
function Ye({ column: e, children: a }) {
  const t = sg[e];
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
function q$() {
  return /* @__PURE__ */ n("tr", { children: st.map((e) => /* @__PURE__ */ n(
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
function mg({ server: e }) {
  const a = Ja[e.connection];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o(Ye, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: q.head, children: [
        /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: q.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(Ye, { column: "connection", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ye, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(Ye, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(Ye, { column: "tools", children: e.tools.map((t) => dg(e.name, t)).join(" · ") })
  ] });
}
function wg(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function _g(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function vg({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function fg({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function bg({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function pg({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: wg(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ..._g(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(vg, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...hg(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n(fg, { server: e, onRestart: a }),
      /* @__PURE__ */ n(bg, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function M$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(pg, { ...e }) : /* @__PURE__ */ n(mg, { ...e });
}
const gg = "_row_1h9nq_2", Ng = "_headCell_1h9nq_14", yg = "_cell_1h9nq_15", kg = "_name_1h9nq_26", $g = "_consequence_1h9nq_32", Cg = "_reason_1h9nq_38", Sg = "_value_1h9nq_44", Rg = "_webRow_1h9nq_60", Tg = "_webSetting_1h9nq_71", Eg = "_webName_1h9nq_79", Lg = "_webConsequence_1h9nq_87", Ag = "_webControl_1h9nq_93", xg = "_webState_1h9nq_106", Ig = "_webChip_1h9nq_111", E = {
  row: gg,
  headCell: Ng,
  cell: yg,
  name: kg,
  consequence: $g,
  reason: Cg,
  value: Sg,
  webRow: Rg,
  webSetting: Tg,
  webName: Eg,
  webConsequence: Lg,
  webControl: Ag,
  webState: xg,
  webChip: Ig
}, dt = 104, ut = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function qg({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(De, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Ln, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: E.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Mg({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = k(), i = ut[t], c = t === "locked";
  return /* @__PURE__ */ o("tr", { className: E.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ n("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: E.cell, children: /* @__PURE__ */ n(qg, { control: a, name: e.name, locked: c, describedBy: c ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: E.cell, style: { width: dt }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function ht(e, a) {
  return String(e ?? a);
}
function Bg(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Pg(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? ht(e.value, "—");
}
function Dg({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: E.webControl, children: [
    /* @__PURE__ */ n(De, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => l == null ? void 0 : l(c) }),
    /* @__PURE__ */ n("span", { className: E.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function Og(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(Dg, { ...e });
  const l = Bg(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Ln, { options: l, value: ht(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: Pg(a) });
}
function Hg({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const c = k(), s = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: E.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: c, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: E.webControl, children: i(c) }) : /* @__PURE__ */ n(Og, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${E.webChip} ward-policy-chip`, style: { width: dt }, children: /* @__PURE__ */ n(m, { ...ut[t], size: "tag" }) })
  ] });
}
function B$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Hg, { ...e }) : /* @__PURE__ */ n(Mg, { ...e });
}
const Fg = "_label_1o9za_7", jg = "_name_1o9za_15", Wg = "_column_1o9za_24", zg = "_webFrame_1o9za_57", Gg = "_webHead_1o9za_62", Ug = "_webHeadLabel_1o9za_74", Kg = "_webLabel_1o9za_112", Vg = "_webColumns_1o9za_119", Yg = "_webGroup_1o9za_125", Xg = "_webPeople_1o9za_126", Jg = "_webVia_1o9za_127", Qg = "_webMeta_1o9za_156", H = {
  label: Fg,
  name: jg,
  column: Wg,
  webFrame: zg,
  webHead: Gg,
  webHeadLabel: Ug,
  webLabel: Kg,
  webColumns: Vg,
  webGroup: Yg,
  webPeople: Xg,
  webVia: Jg,
  webMeta: Qg
}, Zg = {
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
function eN(e) {
  if (!e.matrixRole) return;
  const a = Zg[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function aN({ node: e }) {
  const a = eN(e);
  return /* @__PURE__ */ o("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(nN, { role: a, node: e }),
    /* @__PURE__ */ n(Aa, { column: La[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Aa, { column: La[1], children: e.people === void 0 ? "" : Q(e.people) }),
    /* @__PURE__ */ n(Aa, { column: La[2], children: e.requestedVia ?? "" })
  ] });
}
function nN({ role: e, node: a }) {
  return /* @__PURE__ */ o(R, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function tN({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: c }) {
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
      label: /* @__PURE__ */ n(aN, { node: t }),
      children: c
    }
  );
}
function xa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function rN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(xa, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(xa, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(xa, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function lN() {
  return /* @__PURE__ */ o("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function oN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function iN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function cN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(lN, {}),
    /* @__PURE__ */ n(is, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      qn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(oN, { row: t }),
        detail: /* @__PURE__ */ n(rN, { row: t }),
        expanded: iN(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function P$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(cN, { ...e }) : /* @__PURE__ */ n(tN, { ...e });
}
const sN = "_runbook_b9agc_2", dN = "_list_b9agc_7", uN = "_step_b9agc_15", hN = "_numeral_b9agc_21", mN = "_body_b9agc_28", wN = "_head_b9agc_34", _N = "_title_b9agc_40", vN = "_detail_b9agc_45", fN = "_actions_b9agc_50", bN = "_webList_b9agc_56", pN = "_webStep_b9agc_60", gN = "_webBody_b9agc_66", NN = "_webTitle_b9agc_74", yN = "_webDetail_b9agc_78", S = {
  runbook: sN,
  list: dN,
  step: uN,
  numeral: hN,
  body: mN,
  head: wN,
  title: _N,
  detail: vN,
  actions: fN,
  webList: bN,
  webStep: pN,
  webBody: gN,
  webTitle: NN,
  webDetail: yN
}, mt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function wt(e) {
  return String(e + 1).padStart(2, "0");
}
function kN({ step: e, index: a, connection: t }) {
  const r = mt[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: S.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: wt(a) }),
    /* @__PURE__ */ o("span", { className: S.body, children: [
      /* @__PURE__ */ o("span", { className: S.head, children: [
        /* @__PURE__ */ n("span", { className: S.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: S.detail, children: e.detail })
    ] })
  ] });
}
function $N({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, l) => /* @__PURE__ */ n(kN, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function CN({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: wt(a) }),
    /* @__PURE__ */ o("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...mt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function SN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(CN, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function D$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(SN, { ...e }) : /* @__PURE__ */ n($N, { ...e });
}
const RN = "_list_1gu6a_2", TN = "_check_1gu6a_10", EN = "_body_1gu6a_16", LN = "_text_1gu6a_23", AN = "_pending_1gu6a_32", xN = "_measured_1gu6a_37", ze = {
  list: RN,
  check: TN,
  body: EN,
  text: LN,
  pending: AN,
  measured: xN
};
function IN(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function qN({ check: e }) {
  const a = IN(e.passed);
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
function O$({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(qN, { check: a }, a.text)) });
}
const MN = "_root_16pdz_2", BN = "_list_16pdz_9", PN = "_line_16pdz_16", DN = "_at_16pdz_43", ON = "_text_16pdz_47", HN = "_foot_16pdz_51", FN = "_idle_16pdz_62", jN = "_caret_16pdz_69", WN = "_jump_16pdz_76", pe = {
  root: MN,
  list: BN,
  line: PN,
  at: DN,
  text: ON,
  foot: HN,
  idle: FN,
  caret: jN,
  jump: WN
}, zN = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Qa(e) {
  return Number.isNaN(Date.parse(e)) ? "" : zN.format(new Date(e));
}
const GN = { warn: "warning", ok: "ok" };
function UN({ kind: e }) {
  const a = GN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function KN({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Qa(e)}` });
}
function VN({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Qa(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${pe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${pe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: pe.idle, children: i }),
    /* @__PURE__ */ n(KN, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function H$({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = N(null), [i, c] = p(0), s = e.at(-1);
  A(() => {
    c(e.length);
  }, [e.length]);
  const u = () => {
    var _;
    const d = l.current;
    if (!d) return;
    d.scrollTop = d.scrollHeight;
    const h = d.querySelectorAll("[data-consline-text]");
    (_ = h.item(h.length - 1)) == null || _.focus();
  };
  return /* @__PURE__ */ o("div", { className: pe.root, children: [
    /* @__PURE__ */ n("ol", { className: pe.list, ref: l, "aria-live": "off", "aria-label": r, children: e.map((d, h) => /* @__PURE__ */ o("li", { className: `${pe.line} ward-consline ward-reveal ward-consline--${d.kind}`, "data-kind": d.kind, "data-revealed": h < i, children: [
      /* @__PURE__ */ n("span", { className: pe.at, children: Qa(d.at) }),
      /* @__PURE__ */ n(UN, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: pe.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(VN, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${pe.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const YN = "_row_11jhe_2", XN = "_head_11jhe_14", JN = "_author_11jhe_20", QN = "_eta_11jhe_25", ZN = "_edited_11jhe_26", ey = "_body_11jhe_32", ay = "_reason_11jhe_37", ny = "_actions_11jhe_42", fe = {
  row: YN,
  head: XN,
  author: JN,
  eta: QN,
  edited: ZN,
  body: ey,
  reason: ay,
  actions: ny
}, ty = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function ry(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function ly({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function oy({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: fe.reason, id: a, children: e })
  ] });
}
function iy(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function cy(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(ly, { ...e }) : /* @__PURE__ */ n(oy, { reason: e.unavailable, reasonId: e.unavailableId });
}
function F$(e) {
  const { comment: a } = e;
  iy(e);
  const t = k(), r = `${t}-unavailable`, l = ty[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${fe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: fe.head, children: [
      /* @__PURE__ */ n("span", { className: fe.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: fe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: fe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: fe.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: fe.reason, id: t, children: ry(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: fe.actions, children: /* @__PURE__ */ n(cy, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const sy = "_root_c46wj_2", dy = "_attach_c46wj_11", uy = "_actions_c46wj_17", hy = "_reply_c46wj_23", my = "_replyRow_c46wj_28", wy = "_sendsAs_c46wj_42", Ue = {
  root: sy,
  attach: dy,
  actions: uy,
  reply: hy,
  replyRow: my,
  sendsAs: wy
};
function _y({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = p(""), i = k();
  return /* @__PURE__ */ o("div", { className: Ue.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ue.replyRow, children: [
      /* @__PURE__ */ n(L, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ue.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function j$(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(_y, { ...e }) : /* @__PURE__ */ n(vy, { ...e });
}
function vy({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [c, s] = p("");
  return /* @__PURE__ */ o("div", { className: Ue.root, children: [
    /* @__PURE__ */ n(L, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ o("div", { className: Ue.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      Tn,
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
const fy = "_list_1ih9e_2", by = "_item_1ih9e_6", py = "_body_1ih9e_22", gy = "_text_1ih9e_28", Ny = "_evidence_1ih9e_37", yy = "_consequence_1ih9e_49", ky = "_note_1ih9e_54", Pe = {
  list: fy,
  item: by,
  body: py,
  text: gy,
  evidence: Ny,
  consequence: yy,
  note: ky
};
function $y({ criterion: e }) {
  return /* @__PURE__ */ n(Le, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function gn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Cy(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function Sy({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Pe.body, children: [
    /* @__PURE__ */ n("span", { className: Pe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ n(gn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Pe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ n(gn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Pe.consequence, children: Cy(e.why) })
    ] })
  ] });
}
function Ry({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Pe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n($y, { criterion: e }),
    /* @__PURE__ */ n(Sy, { criterion: e })
  ] });
}
function W$({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Ry, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Pe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Ty = "_list_dwhoz_2", Ey = "_rung_dwhoz_6", Ly = "_name_dwhoz_18", Ay = "_actor_dwhoz_32", ia = {
  list: Ty,
  rung: Ey,
  name: Ly,
  actor: Ay
}, xy = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function Iy({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = xy[e.state];
  return /* @__PURE__ */ o("li", { className: ia.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ia.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ia.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function z$({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ia.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(Iy, { rung: a }, a.name)) });
}
const qy = "_sheet_1fqco_2", My = "_title_1fqco_9", By = "_stage_1fqco_15", Py = "_effects_1fqco_20", Dy = "_effect_1fqco_20", Oy = "_numeral_1fqco_31", Hy = "_effectText_1fqco_38", Fy = "_refusals_1fqco_43", jy = "_reasons_1fqco_52", Wy = "_reason_1fqco_52", zy = "_actions_1fqco_62", de = {
  sheet: qy,
  title: My,
  stage: By,
  effects: Py,
  effect: Dy,
  numeral: Oy,
  effectText: Hy,
  refusals: Fy,
  reasons: jy,
  reason: Wy,
  actions: zy
};
function Gy({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function G$({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: c }) {
  const s = k(), u = `${s}-refusal`, [d, h] = p(""), _ = t.length > 0;
  return /* @__PURE__ */ n(ea, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ o("div", { className: de.sheet, children: [
    /* @__PURE__ */ o("h2", { className: de.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: de.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: de.effects, children: a.map((b, x) => /* @__PURE__ */ o("li", { className: de.effect, children: [
      /* @__PURE__ */ n("span", { className: de.numeral, children: String(x + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: de.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      Qi,
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
    _ && /* @__PURE__ */ o("div", { className: de.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: de.reasons, children: t.map((b, x) => /* @__PURE__ */ n("li", { className: de.reason, id: x === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: de.actions, children: [
      /* @__PURE__ */ n(Gy, { refused: _, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const Uy = "_list_1hvqu_2", Ky = "_path_1hvqu_7", Vy = "_head_1hvqu_21", Yy = "_label_1hvqu_28", Xy = "_consequence_1hvqu_35", Jy = "_ask_1hvqu_36", Ge = {
  list: Uy,
  path: Ky,
  head: Vy,
  label: Yy,
  consequence: Xy,
  ask: Jy
}, Ha = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Nn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function yn(e) {
  return e ? "primary" : "secondary";
}
function Qy({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: yn(a), size: "sm", onClick: () => t(e.kind), children: Ha[e.kind] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(v, { variant: yn(a), size: "sm", disabled: !0, describedBy: r, children: Ha[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ge.ask, id: r, children: e.askInstead })
  ] });
}
function Zy({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ge.path, "data-allowed": e.allowed, "data-role": Nn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ge.head, children: [
      /* @__PURE__ */ n("span", { className: Ge.label, children: e.title ?? Ha[e.kind] }),
      /* @__PURE__ */ n(m, { role: Nn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ge.consequence, children: e.consequence }),
    /* @__PURE__ */ n(Qy, { path: e, primary: a, onChoose: t })
  ] });
}
function U$({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ge.list, children: e.map((t, r) => /* @__PURE__ */ n(Zy, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const ek = "_list_qjv4r_2", ak = "_item_qjv4r_6", nk = "_node_qjv4r_18", tk = "_body_qjv4r_24", rk = "_head_qjv4r_30", lk = "_stage_qjv4r_36", ok = "_version_qjv4r_41", ik = "_sentence_qjv4r_49", ck = "_meta_qjv4r_54", ge = {
  list: ek,
  item: ak,
  node: nk,
  body: tk,
  head: rk,
  stage: lk,
  version: ok,
  sentence: ik,
  meta: ck
}, sk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function dk({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function uk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(Le, { size: 9, kind: sk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(dk, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${oe(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ae(e.cost)}`
      ] })
    ] })
  ] });
}
function K$({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(uk, { entry: a }, a.stage + String(t))) });
}
const hk = "_thread_1kn6s_3", mk = "_turn_1kn6s_8", wk = "_who_1kn6s_27", _k = "_body_1kn6s_32", ca = {
  thread: hk,
  turn: mk,
  who: wk,
  body: _k
}, _t = Ve(!1);
function V$({ children: e, density: a }) {
  return /* @__PURE__ */ n(_t.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ca.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function Y$({ turn: e }) {
  if (!Ke(_t)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ca.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ca.who} ward-chat-who`, children: [
      e.author,
      " · ",
      oe(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ca.body} ward-chat-body`, children: e.body })
  ] });
}
const vk = "_list_1rt9c_3", fk = "_row_1rt9c_7", bk = "_label_1rt9c_20", pk = "_n_1rt9c_26", gk = "_cause_1rt9c_33", Qe = {
  list: vk,
  row: fk,
  label: bk,
  n: pk,
  cause: gk
};
function Nk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const yk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function kk({ row: e, formatNumber: a }) {
  return Nk(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Le, { size: 8, ...yk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n($k, { cause: e.cause })
  ] });
}
function $k({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function X$({ rows: e, formatNumber: a = Q }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(kk, { row: t, formatNumber: a }, t.label)) });
}
const Ck = "_root_1jxwp_2", Sk = {
  root: Ck
};
function J$({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: Sk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ca, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(v, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const Rk = "_row_dhbre_3", Tk = "_key_dhbre_13", Ek = "_stack_dhbre_24", Lk = "_value_dhbre_32", Ak = "_evidence_dhbre_39", xk = "_mark_dhbre_47", We = {
  row: Rk,
  key: Tk,
  stack: Ek,
  value: Lk,
  evidence: Ak,
  mark: xk
};
function Ik({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ua, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function Q$({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${We.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${We.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${We.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${We.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${We.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${We.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(Ik, { state: e.state }) })
  ] });
}
const qk = "_cell_1monp_2", Mk = {
  cell: qk
}, Bk = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Pk(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function Dk(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function Ok(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Pk(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function Hk(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function Z$({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  Dk(e, t);
  const r = Hk(e);
  return /* @__PURE__ */ n(
    hc,
    {
      label: "Rejection routing",
      columns: Bk,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: Mk.cell, "data-norerun": l.noRerun ? !0 : void 0, children: Ok(l, i) }),
      empty: a ?? /* @__PURE__ */ n(js, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Fk = "_row_ute8v_2", jk = "_title_ute8v_11", Wk = "_turns_ute8v_20", zk = "_waiting_ute8v_21", Gk = "_resolved_ute8v_22", Uk = "_activity_ute8v_23", Kk = "_cost_ute8v_29", Vk = "_link_ute8v_30", Yk = "_tableRow_ute8v_47", Xk = "_tableTitle_ute8v_59", Jk = "_tableResolved_ute8v_64", Qk = "_tableLink_ute8v_68", Zk = "_tableMeta_ute8v_83", e1 = "_tableCost_ute8v_90", a1 = "_tableActivity_ute8v_91", n1 = "_tableState_ute8v_101", t1 = "_tableRecord_ute8v_112", P = {
  row: Fk,
  title: jk,
  turns: Wk,
  waiting: zk,
  resolved: Gk,
  activity: Uk,
  cost: Kk,
  link: Vk,
  tableRow: Yk,
  tableTitle: Xk,
  tableResolved: Jk,
  tableLink: Qk,
  tableMeta: Zk,
  tableCost: e1,
  tableActivity: a1,
  tableState: n1,
  tableRecord: t1
}, vt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function r1(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function l1(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function o1(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const i1 = { duplicate: "CLOSED · DUPLICATE" };
function c1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: P.tableMeta, children: `waiting on ${e}` });
}
function s1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: P.tableCost, children: e === void 0 ? null : ae(e) });
}
function d1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: P.tableRecord, href: F(e.href), children: `→ ${e.key}` });
}
function u1({ session: e, href: a }) {
  const t = vt[e.state];
  return /* @__PURE__ */ o("tr", { className: P.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: P.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: P.tableLink, href: F(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: P.tableMeta, children: l1(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: P.tableResolved, children: [
      o1(e.resolved),
      /* @__PURE__ */ n(c1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(s1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: P.tableActivity, children: r1(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: P.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: i1[e.state] ?? t.label }),
      /* @__PURE__ */ n(d1, { link: e.link })
    ] }) })
  ] });
}
function h1({ session: e }) {
  const a = vt[e.state];
  return /* @__PURE__ */ o("div", { className: P.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: P.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: P.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: P.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: P.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: P.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ae(e.cost) }),
    /* @__PURE__ */ n("span", { className: P.activity, children: oe(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: P.link, href: F(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function eC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(u1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(h1, { session: e.session });
}
const m1 = "_block_1yy2v_3", w1 = "_list_1yy2v_9", _1 = "_line_1yy2v_14", Fa = {
  block: m1,
  list: w1,
  line: _1
}, v1 = { warn: "warning", ok: "ok" };
function f1({ kind: e }) {
  const a = v1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function b1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Fa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(f1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function aC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Fa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Fa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(b1, { line: t }, `${r}-${t.text}`)) }) });
}
const p1 = "_band_tt7hp_1", g1 = "_head_tt7hp_8", N1 = "_cell_tt7hp_19", y1 = "_index_tt7hp_35", k1 = "_title_tt7hp_42", $1 = "_note_tt7hp_48", C1 = "_cellTitle_tt7hp_53", S1 = "_cellBody_tt7hp_58", R1 = "_tag_tt7hp_64", ve = {
  band: p1,
  head: g1,
  cell: N1,
  index: y1,
  title: k1,
  note: $1,
  cellTitle: C1,
  cellBody: S1,
  tag: R1
}, kn = 4;
function nC({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== kn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${kn}-cell grid`);
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
  H$ as ActivityConsole,
  am as AgentCard,
  H1 as AppShell,
  C$ as AppearanceStrip,
  nC as Band,
  G1 as BarChart,
  kd as BoardColumn,
  l$ as BoardFootnote,
  o$ as BoardHeader,
  Q1 as BoardScroller,
  v as Btn,
  B1 as CHIP_ROLES,
  tt as CREDENTIAL_COLUMNS,
  z1 as Callout,
  S$ as CapabilityRow,
  Y$ as ChatMessage,
  Tn as Checkbox,
  m as Chip,
  F$ as ClarificationRow,
  v$ as ClauseRuleRow,
  _$ as ClauseRules,
  Hn as ColourLadder,
  R$ as ComponentRow,
  j$ as Composer,
  c$ as ConfigRow,
  i$ as ConfigRowHead,
  Ka as ConnectionMark,
  V$ as Conversation,
  Qi as CostMeter,
  E$ as CredentialRow,
  T$ as CredentialRowHead,
  W$ as CriteriaList,
  cl as Crumb,
  X$ as DeliveryHealth,
  e$ as DeniedState,
  f$ as DryRunRail,
  js as EmptyState,
  L$ as EnvCard,
  L as Field,
  Z1 as FilteredEmpty,
  X1 as FormStack,
  Ca as GateChecklist,
  z$ as GateLadder,
  hc as Grid,
  p$ as HandoffRuleRow,
  b$ as HandoffRules,
  s$ as ItemDrawer,
  A$ as KeyPanel,
  It as LIVE_EVENT_TYPES,
  kh as LegacyBoardColumn,
  u$ as LegacyBoardHeader,
  h$ as LegacyConfigRow,
  w$ as LegacyItemDrawer,
  vh as LegacyOverCapNote,
  m$ as LegacyPreviewRail,
  Pn as LegacyWorkCard,
  ke as LiveIndicator,
  a$ as LoadFailed,
  r$ as Loading,
  st as MCP_SERVER_COLUMNS,
  Ua as Mark,
  I$ as MarkUpload,
  Le as Marker,
  M$ as McpServerRow,
  q$ as McpServerRowHead,
  g$ as NewStreamModal,
  Gs as OverCapNote,
  ea as Overlay,
  Am as PARTIAL_STEP_REASON,
  dt as POLICY_CHIP_WIDTH,
  K1 as PageFrame,
  W1 as PageHeader,
  B$ as PolicyRow,
  d$ as PreviewRail,
  La as ROLE_MATRIX_COLUMNS,
  Qn as RULE_ACTIONS,
  xn as Radio,
  J$ as ReadyChecklist,
  Y1 as RecordSection,
  G$ as RequeueSheet,
  U$ as ResolveBlock,
  Q$ as ResolvedFieldRow,
  P$ as RoleMatrixRow,
  Z$ as RoutingTable,
  N$ as RuleRow,
  D$ as RunbookSteps,
  At as STREAM_STEPS,
  J1 as SectionBand,
  Ec as SectionHeader,
  Ln as SegmentedControl,
  eC as SessionRow,
  j1 as Sidebar,
  y$ as StageColumn,
  K$ as StageHistory,
  q_ as StageListEditor,
  n$ as StaleStrip,
  ya as StatStrip,
  k$ as StreamRow,
  V1 as SubjectRail,
  De as Switch,
  F1 as Tabs,
  $$ as ToolRow,
  U1 as TopBar,
  is as Tree,
  qn as TreeRow,
  aC as TypedInputBlock,
  Tr as UNSAFE_HREF,
  O$ as ValidationList,
  A1 as VisibilityProvider,
  x1 as Visible,
  M1 as WARD_VERSION,
  $a as WorkCard,
  t$ as WriteUnavailableStrip,
  r1 as agoSince,
  kt as clock,
  J_ as colourStatus,
  Q as count,
  le as duration,
  ja as elapsed,
  q1 as eventSourceTransport,
  ba as isStreamStep,
  pa as isValidatedStreamStep,
  xm as ladderValidation,
  hg as mcpConnectionChip,
  dg as mcpToolName,
  ae as money,
  me as ms,
  Mn as ordered,
  Cn as ratio,
  Ob as restartLabel,
  F as safeHref,
  oe as stamp,
  Rn as stream,
  D1 as streamChip,
  Na as streamChipProps,
  Ee as streamColour,
  Mt as streamHex,
  P1 as streamVars,
  la as useBorderFlash,
  Tt as useFocusTrap,
  O1 as useLiveFeed,
  I1 as useReturnFocus,
  fa as useRovingTabindex,
  Wa as useTicker,
  $t as useVisible,
  W as v,
  x$ as validateMark,
  ga as validatedStep,
  xt as validatedStreamSteps
};
