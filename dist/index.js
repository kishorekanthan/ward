import { jsx as n, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as bt, useContext as Ke, createContext as Ve, useCallback as V, useEffect as A, useState as g, useRef as N, useLayoutEffect as kn, useId as k, Fragment as pt } from "react";
import { createPortal as gt } from "react-dom";
function le(e) {
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
function k1({ hidden: e, children: a }) {
  const t = bt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Cn.Provider, { value: t, children: a });
}
function $t(e) {
  return !Ke(Cn).has(e);
}
function $1({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(T, { children: $t(e) ? a : t });
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
function C1(e, a = !0) {
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
  const i = V((s) => t(s), []), c = V((s) => {
    var h;
    t(s), (h = r.current.get(s)) == null || h.focus();
  }, []), d = V(
    (s) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const _ = Math.max(0, h.indexOf(a)), b = Lt(s.key, e);
      b !== void 0 ? (s.preventDefault(), c(h[Et(_ + b, 0, h.length - 1)])) : s.key === "Home" ? (s.preventDefault(), c(h[0])) : s.key === "End" && (s.preventDefault(), c(h[h.length - 1]));
    },
    [a, c, e]
  ), u = V(
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
const S1 = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, R1 = "0.2.0", T1 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], At = [1, 2, 3, 4, 5, 6], xt = [1, 2, 3], qt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], W = {
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
function E1(e) {
  if (!pa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function L1(e) {
  if (!pa(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const It = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Mt(e) {
  if (!pa(e)) throw new Error("unvalidated stream step");
  return It[e];
}
function an(e) {
  return typeof e != "string" ? null : qt.includes(e) ? e : null;
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
  const l = an(t) ?? an(r.type);
  return l === null ? null : { ...r, type: l, id: Pt(r, a), at: Dt(r) };
}
function Ht(e, a) {
  return e >= me.staleAfter ? "stale" : e >= me.heartbeat && a === "live" ? "reconnecting" : null;
}
function Ft(e, a, t) {
  return e >= me.heartbeat && !a && t !== null;
}
function A1(e, a) {
  const [t, r] = g("reconnecting"), [l, i] = g(null), c = N(/* @__PURE__ */ new Map()), d = N(0), u = N(""), s = N(0), h = N(null), _ = N(0), b = N(0), x = N(!1), K = N("reconnecting"), Z = V(($) => {
    K.current = $, r($);
  }, []), ie = V(() => {
    d.current = Date.now();
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
        s.current = 0, x.current = !1, ie(), Z("live");
      },
      onError: () => {
        var j;
        (j = h.current) == null || j.close(), h.current = null, x.current = !0, K.current !== "stale" && Z("reconnecting");
        const $ = Math.min(me.reconnectBase * 2 ** s.current, me.reconnectMax);
        s.current += 1, _.current = window.setTimeout(ce, $);
      }
    });
  }, [$e, Z, ie, a, e]), Oe = V(($) => {
    x.current = !0, $.close(), h.current = null, _.current = window.setTimeout(ce, me.reconnectBase);
  }, [ce]), He = V(($, j) => (c.current.set(j, $), () => {
    c.current.delete(j);
  }), []);
  return A(() => (ce(), b.current = window.setInterval(() => {
    const $ = Date.now() - d.current, j = Ht($, K.current);
    j && Z(j);
    const _e = h.current;
    Ft($, x.current, _e) && Oe(_e);
  }, me.tick), () => {
    var $;
    window.clearInterval(b.current), window.clearTimeout(_.current), x.current = !1, ($ = h.current) == null || $.close(), h.current = null;
  }), [ce, Oe, Z]), { connection: t, lastEventAt: l, subscribe: He };
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
  const t = N(0), r = V((l) => {
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
      oe(e)
    ] })
  ] });
}
const Ut = "_app_bcfqb_1", Kt = "_side_bcfqb_18", Vt = "_main_bcfqb_26", Yt = "_rail_bcfqb_33", Xt = "_page_bcfqb_40", Jt = "_root_bcfqb_91", Qt = "_topbar_bcfqb_98", Zt = "_mark_bcfqb_109", er = "_brand_bcfqb_116", ar = "_tagline_bcfqb_122", nr = "_identity_bcfqb_128", tr = "_tools_bcfqb_129", rr = "_metadata_bcfqb_138", lr = "_actor_bcfqb_153", or = "_detail_bcfqb_154", ir = "_nav_bcfqb_159", cr = "_content_bcfqb_194", sr = "_skip_bcfqb_217", D = {
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
  return /* @__PURE__ */ o("div", { className: D.app, "data-rail": l ? "true" : "false", children: [
    /* @__PURE__ */ n("div", { className: D.side, children: e }),
    /* @__PURE__ */ o("main", { className: D.main, children: [
      a,
      /* @__PURE__ */ n("div", { className: D.page, children: t })
    ] }),
    l && /* @__PURE__ */ n("div", { className: D.rail, children: r })
  ] });
}
function _r({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: D.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: F(t.href), "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function sa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function vr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: D.metadata, children: [
    /* @__PURE__ */ n(sa, { value: e, className: D.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(sa, { value: a, className: D.detail })
  ] });
}
function fr(e) {
  return /* @__PURE__ */ o("header", { className: D.topbar, children: [
    /* @__PURE__ */ n("span", { className: D.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: D.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(sa, { value: e.tagline, className: D.tagline }),
    /* @__PURE__ */ n(_r, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: D.identity, children: /* @__PURE__ */ n(vr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(sa, { value: e.tools, className: D.tools })
  ] });
}
function br(e) {
  const a = k();
  return /* @__PURE__ */ o("div", { className: `${D.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: D.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(fr, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: D.content, children: e.children })
  ] });
}
function pr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function x1(e) {
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
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function Lr(e) {
  return e.children ?? e.label;
}
function v(e) {
  Er(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: Rr(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...Tr(a, e.controls),
      children: Lr(e)
    }
  );
}
function za(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Ar = "_root_o4yib_2", xr = "_row_o4yib_8", qr = "_box_o4yib_14", Ir = "_label_o4yib_21", Mr = "_lockedNote_o4yib_26", Br = "_consequence_o4yib_34", Pr = "_sample_o4yib_69", Ie = {
  root: Ar,
  row: xr,
  box: qr,
  label: Ir,
  lockedNote: Mr,
  consequence: Br,
  sample: Pr
};
function Dr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Or({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Ie.consequence} ward-check-consequence`, children: a }) : null;
}
function Hr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ie.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Fr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ie.sample, "aria-hidden": "true", children: e }) : null;
}
function Rn(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = Dr(e);
  return /* @__PURE__ */ o("div", { className: `${Ie.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: Ie.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Ie.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, l.target.checked));
          },
          "aria-describedby": za(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: Ie.label, children: [
        e.label,
        /* @__PURE__ */ n(Hr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Fr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Or, { id: t, text: e.consequence })
  ] });
}
const jr = "_chip_1073r_2", Wr = {
  chip: jr
}, zr = {
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
function Gr(e, a) {
  if (e === "stream") return Ur(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = zr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Ur(e) {
  if (!e || !ga(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Sn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Wr.chip} ward-chip ward-chip--${e}`, style: Gr(e, t), "data-ward-chip": e, "data-size": r, children: a });
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
const Kr = "_nav_1mnou_2", Vr = "_list_1mnou_8", Yr = "_item_1mnou_15", Xr = "_link_1mnou_25", Jr = "_sep_1mnou_35", Qr = "_current_1mnou_39", Zr = "_chips_1mnou_43", xe = {
  nav: Kr,
  list: Vr,
  item: Yr,
  link: Xr,
  sep: Jr,
  current: Qr,
  chips: Zr
};
function el({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: xe.nav, children: [
    /* @__PURE__ */ n("ol", { className: xe.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: xe.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: xe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: xe.link, href: F(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: xe.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${xe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const al = "_field_fy549_2", nl = "_label_fy549_8", tl = "_labelHidden_fy549_15", rl = "_control_fy549_25", ll = "_mono_fy549_44", ol = "_area_fy549_49", il = "_invalid_fy549_56", Te = {
  field: al,
  label: nl,
  labelHidden: tl,
  control: rl,
  mono: ll,
  area: ol,
  invalid: il
}, cl = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function sl({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? cl : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function dl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function ul({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const hl = { input: sl, select: dl, textarea: ul };
function ml(e, a, t) {
  const r = hl[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function wl(e, a, t) {
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
function _l(e) {
  const a = e.mono ? [Te.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Te.area] : [];
  return [Te.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function vl(e) {
  return e ? `${Te.label} ${Te.labelHidden} ward-field-label` : `${Te.label} ward-field-label`;
}
function L(e) {
  const a = k(), t = `${a}-msg`, r = wl(e, a, t), l = _l(e);
  return /* @__PURE__ */ o("div", { className: `${Te.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: vl(e.labelHidden), htmlFor: a, children: e.label }),
    ml(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Te.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const fl = "_strip_tivso_2", bl = "_tab_tivso_26", pl = "_count_tivso_49", Ia = {
  strip: fl,
  tab: bl,
  count: pl
}, tn = 7;
function gl(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Nl(e) {
  return `${Ia.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function yl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Tn(e) {
  const a = yl(e);
  e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end);
}
function kl(e) {
  A(() => {
    const a = e.current;
    if (!a) return;
    const t = () => Tn(a);
    a.addEventListener("scroll", t, { passive: !0 });
    const r = typeof ResizeObserver > "u" ? null : new ResizeObserver(t);
    return r == null || r.observe(a), t(), () => {
      a.removeEventListener("scroll", t), r == null || r.disconnect();
    };
  }, [e]);
}
function $l(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Cl(e, a) {
  kn(() => {
    const t = e.current, r = t == null ? void 0 : t.querySelectorAll('[role="tab"]')[a];
    if (!t || !r) return;
    const l = $l(t, r);
    l !== null && (t.scrollLeft = Math.max(0, l)), Tn(t);
  }, [e, a]);
}
function q1({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > tn) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${tn} — the set is fixed`);
  const i = ba({ orientation: "horizontal" }), c = gl(e, a);
  A(() => i.setActive(c), [i.setActive, c]);
  const d = N(null);
  return kl(d), Cl(d, c), /* @__PURE__ */ n(
    "div",
    {
      ref: d,
      className: Nl(l),
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
          className: `${Ia.tab} ward-tab`,
          "aria-selected": u.id === a,
          "aria-controls": `panel-${u.id}`,
          onClick: () => t(u.id),
          ...i.itemProps(s),
          children: [
            u.label,
            u.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: Ia.count, children: `· ${u.count}` })
            ] })
          ]
        },
        u.id
      ))
    }
  );
}
const Sl = "_root_jem6y_2", Rl = "_segment_jem6y_7", rn = {
  root: Sl,
  segment: Rl
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
const Tl = "_sidebar_1jywv_3", El = "_brand_1jywv_9", Ll = "_mark_1jywv_17", Al = "_word_1jywv_24", xl = "_nav_1jywv_30", ql = "_navItem_1jywv_38", Il = "_group_1jywv_50", Ml = "_groupName_1jywv_57", Bl = "_agents_1jywv_70", Pl = "_agent_1jywv_70", Dl = "_agentTop_1jywv_88", Ol = "_dot_1jywv_95", Hl = "_agentName_1jywv_107", Fl = "_agentMeta_1jywv_120", jl = "_foot_1jywv_126", Wl = "_footName_1jywv_132", zl = "_footLinks_1jywv_139", Gl = "_footLink_1jywv_139", Ul = "_root_1jywv_153", Kl = "_linkBrand_1jywv_162", Vl = "_label_1jywv_183", Yl = "_note_1jywv_188", Xl = "_footer_1jywv_202", C = {
  sidebar: Tl,
  brand: El,
  mark: Ll,
  word: Al,
  nav: xl,
  navItem: ql,
  group: Il,
  groupName: Ml,
  new: "_new_1jywv_64",
  agents: Bl,
  agent: Pl,
  agentTop: Dl,
  dot: Ol,
  agentName: Hl,
  agentMeta: Fl,
  foot: jl,
  footName: Wl,
  footLinks: zl,
  footLink: Gl,
  root: Ul,
  linkBrand: Kl,
  label: Vl,
  note: Yl,
  footer: Xl
};
function Jl({ agent: e }) {
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
function Ql({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: F(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function Zl({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(Jl, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(Ql, { shared: i })
  ] });
}
function eo(e) {
  return e.destinations ?? e.items ?? [];
}
function ao({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function no({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function to({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: F(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function ro(e) {
  return /* @__PURE__ */ o("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(ao, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: eo(e).map((a) => /* @__PURE__ */ n(to, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(no, { children: e.children })
  ] });
}
function lo(e) {
  return "agents" in e;
}
function I1(e) {
  return lo(e) ? /* @__PURE__ */ n(Zl, { ...e }) : /* @__PURE__ */ n(ro, { ...e });
}
const oo = "_mark_wlgi8_3", io = {
  mark: oo
}, co = { met: "✓", unmet: "", failed: "✕" };
function Ga({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: io.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: co[e]
    }
  );
}
const so = "_marker_br9fi_2", uo = {
  marker: so
}, ho = {
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
  const r = { "--marker": ho[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${uo.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const mo = "_root_ti0pq_2", wo = "_chip_ti0pq_11", _o = "_noCase_ti0pq_23", na = {
  root: mo,
  chip: wo,
  noCase: _o
};
function vo(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Ua({ connection: e, since: a, lastEventAt: t }) {
  const r = vo(a, t), l = Wa(r, e === "reconnecting");
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
const fo = "_root_114od_2", bo = "_context_114od_12", po = "_row_114od_1", go = "_heading_114od_25", No = "_headingWrap_114od_33", yo = "_chips_114od_38", ko = "_title_114od_45", $o = "_consequence_114od_54", Co = "_actionsWrap_114od_59", So = "_actions_114od_59", Ro = "_action_114od_59", To = "_overflowPanel_114od_78", Eo = "_measure_114od_88", ne = {
  root: fo,
  context: bo,
  row: po,
  heading: go,
  headingWrap: No,
  chips: yo,
  title: ko,
  consequence: $o,
  actionsWrap: Co,
  actions: So,
  action: Ro,
  overflowPanel: To,
  measure: Eo
};
function Lo({ title: e, consequence: a }) {
  return /* @__PURE__ */ o("div", { className: ne.heading, children: [
    /* @__PURE__ */ n("h1", { className: ne.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: ne.consequence, children: a })
  ] });
}
function Ma({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: ne.action, "data-action": "", children: a }, t));
}
function ln({ disclosure: e }) {
  return /* @__PURE__ */ n(v, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Ao({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(ln, { disclosure: l }) : a ? [/* @__PURE__ */ n(ln, { disclosure: l }, "more"), /* @__PURE__ */ n(Ma, { actions: e }, "actions")] : /* @__PURE__ */ n(Ma, { actions: e });
}
function xo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function qo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: ne.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Ma, { actions: e }) });
}
function Io(e, a) {
  const t = k(), [r, l] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, s;
    l(!1), (s = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || s.focus();
  } };
}
function Mo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: ne.context, children: [
    /* @__PURE__ */ n(el, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: ne.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function Bo(...e) {
  return e.some((a) => a === null);
}
function Po(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Do(e, a, t, r, l) {
  if (l === 0 || Bo(a, t, r)) return !1;
  const [i, c, d] = [a, t, r], u = Po(e), s = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return d.offsetWidth > s || c.scrollWidth > c.clientWidth + 1;
}
function Oo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Ho(e) {
  const a = N(null), t = N(null), r = N(null), l = N(null), [i, c] = g(!1);
  return A(() => {
    const d = a.current;
    if (!Oo(d)) return;
    const u = () => c(Do(d, t.current, r.current, l.current, e.length)), s = new ResizeObserver(u);
    return s.observe(d), u(), () => s.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function Fo({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ o("div", { className: ne.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(v, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] });
}
function jo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Ua, { connection: e.connection, since: e.since }) : null;
}
function M1({ crumb: e, chips: a, title: t, consequence: r, actions: l = [], more: i = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: s, headingRef: h, actionsRef: _, measureRef: b, collapsed: x } = Ho(l), K = i.length > 0, { disclosure: Z, close: ie } = Io(x || K, _), $e = xo(i, l, x, d);
  return /* @__PURE__ */ o("header", { className: ne.root, "data-density": u, children: [
    /* @__PURE__ */ n(Mo, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: ne.row, ref: s, children: [
      /* @__PURE__ */ n("div", { ref: h, className: ne.headingWrap, children: /* @__PURE__ */ n(Lo, { title: t, consequence: r }) }),
      /* @__PURE__ */ o("div", { className: ne.actionsWrap, children: [
        /* @__PURE__ */ n(jo, { connection: c }),
        /* @__PURE__ */ n("div", { className: ne.actions, ref: _, "data-ward-actions": !0, children: /* @__PURE__ */ n(Ao, { actions: l, hasMore: K, collapsed: x, onOverflow: d, disclosure: Z }) })
      ] })
    ] }),
    /* @__PURE__ */ n(qo, { actions: $e, disclosure: Z, onEscape: ie }),
    /* @__PURE__ */ n(Fo, { actions: l, hasMore: K, measureRef: b })
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
const Wo = "_scrim_c7sqj_2", zo = "_drawer_c7sqj_10", Go = "_sheet_c7sqj_14", Uo = "_modal_c7sqj_18", Ko = "_panel_c7sqj_23", Vo = "_header_c7sqj_51", Yo = "_title_c7sqj_59", Xo = "_body_c7sqj_63", Jo = "_close_c7sqj_90", Ne = {
  scrim: Wo,
  drawer: zo,
  sheet: Go,
  modal: Uo,
  panel: Ko,
  header: Vo,
  title: Yo,
  body: Xo,
  close: Jo
}, Qo = Ve(null), da = [], ua = /* @__PURE__ */ new Map();
function Zo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function ei(e, a) {
  let t = ua.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ua.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function ai(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !Zo(r) && ei(e, r);
}
function ni(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (ai(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function ti(e) {
  for (const a of e.claims) {
    const t = ua.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ua.delete(a)));
  }
}
function ri(e, a) {
  const t = { root: e, claims: [] };
  return da.push(t), ni(t, a), t;
}
function li(e) {
  const a = da.indexOf(e);
  a >= 0 && da.splice(a, 1), ti(e);
}
function on(e) {
  return e !== null && da.at(-1) === e;
}
function oi(e, a, t) {
  const r = N(null), l = N(t);
  return l.current = t, A(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, d = ri(i, a);
    return r.current = d, () => {
      var s, h;
      const u = on(d);
      li(d), r.current = null, u && ((h = (s = l.current ?? c) == null ? void 0 : s.focus) == null || h.call(s));
    };
  }, [a]), V(() => on(r.current), []);
}
function ii(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function ci(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function si({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("header", { className: `${Ne.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ne.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, children: e.children })
  ] });
}
function di(e) {
  return `${Ne.scrim} ${Ne[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ui(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ne.panel} ${Ne[e]} ward-overlay-panel${t}${r}`;
}
function hi(e) {
  const a = Ke(Qo);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = N(null), t = N(null), r = k(), l = hi(e.container), i = Ln("(min-width: 768px)"), c = ii(e.kind, i), d = ci(e, r), u = Tt(t), s = oi(a, l, e.returnFocusTo), h = V(() => {
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
        className: di(c),
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
            className: ui(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => s() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ne.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(si, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const mi = "_root_drrhx_2", wi = "_ticket_drrhx_15", _i = "_body_drrhx_24", Ra = {
  root: mi,
  ticket: wi,
  body: _i
};
function B1({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Ra.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Ra.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Ra.body, children: t })
  ] });
}
const vi = "_root_bf1pc_2", fi = "_table_bf1pc_9", bi = "_caption_bf1pc_14", pi = "_series_bf1pc_23", gi = "_category_bf1pc_31", Ni = "_cell_bf1pc_39", yi = "_track_bf1pc_45", ki = "_lane_bf1pc_52", $i = "_bar_bf1pc_56", Ci = "_value_bf1pc_63", Si = "_swatch_bf1pc_70", Ri = "_empty_bf1pc_78", U = {
  root: vi,
  table: fi,
  caption: bi,
  series: pi,
  category: gi,
  cell: Ni,
  track: yi,
  lane: ki,
  bar: $i,
  value: Ci,
  swatch: Si,
  empty: Ri
}, Ti = "—", cn = 6;
function Ei(e, a) {
  if (a.length < 1 || a.length > cn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${cn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Li(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function An(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Ai(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function xi({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Ai(e, a), c = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ o("span", { className: U.track, children: [
    /* @__PURE__ */ n("span", { className: U.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${U.bar} ward-barchart-bar`, "data-step": t, style: c, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: U.value, children: e === null ? l : r(e) })
  ] }) });
}
function qi({ series: e }) {
  return /* @__PURE__ */ n(T, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: U.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: U.swatch, "data-step": An(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Ii({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${U.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: U.caption, children: e }),
    /* @__PURE__ */ n("p", { className: U.empty, children: a })
  ] });
}
function Mi({ title: e, categories: a, series: t, top: r, format: l = Q, categoryHead: i = "Category", missing: c = Ti }) {
  return /* @__PURE__ */ n("div", { className: `${U.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: U.table, children: [
    /* @__PURE__ */ n("caption", { className: U.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: U.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(qi, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((d, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: U.category, children: d }),
      t.map((s, h) => /* @__PURE__ */ n(xi, { value: s.values[u], top: r, step: An(h, t.length), format: l, missing: c }, s.name))
    ] }, d)) })
  ] }) });
}
function P1(e) {
  Ei(e.categories, e.series);
  const a = Li(e.series);
  return a === 0 ? /* @__PURE__ */ n(Ii, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Mi, { ...e, top: a });
}
const Bi = "_root_1bfqw_2", Pi = "_figure_1bfqw_7", Di = "_of_1bfqw_13", Oi = "_bar_1bfqw_18", Hi = "_rows_1bfqw_38", Fi = "_row_1bfqw_38", ji = "_label_1bfqw_49", Wi = "_amount_1bfqw_54", Ce = {
  root: Bi,
  figure: Pi,
  of: Di,
  bar: Oi,
  rows: Hi,
  row: Fi,
  label: ji,
  amount: Wi
};
function zi({ spent: e, ceiling: a, breakdown: t }) {
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
const Gi = "_frame_mg2jl_2", Ui = "_table_mg2jl_6", Ki = "_th_mg2jl_12", Vi = "_td_mg2jl_13", Yi = "_sort_mg2jl_47", Xi = "_row_mg2jl_53", Ji = "_empty_mg2jl_61", Re = {
  frame: Gi,
  table: Ui,
  th: Ki,
  td: Vi,
  sort: Yi,
  row: Xi,
  empty: Ji
}, Qi = { asc: "ascending", desc: "descending" };
function Zi(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Qi[a.direction];
}
function ec(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function ac(e) {
  return e === void 0 ? void 0 : { width: e };
}
function nc({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: ac(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Zi(e, a),
      children: ec(e, t)
    }
  );
}
function tc({ row: e, props: a }) {
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
function rc({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(nc, { column: h, sort: d, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(tc, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: c, sort: d, onSort: u, empty: s } }, r(h))) })
  ] }) });
}
const lc = "_set_y5zy3_2", oc = "_legend_y5zy3_7", ic = "_row_y5zy3_15", cc = "_control_y5zy3_20", sc = "_input_y5zy3_26", dc = "_label_y5zy3_31", uc = "_consequence_y5zy3_36", qe = {
  set: lc,
  legend: oc,
  row: ic,
  control: cc,
  input: sc,
  label: dc,
  consequence: uc
};
function xn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: c, variant: d }) {
  const u = k(), s = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: qe.set, "data-variant": d, children: [
    /* @__PURE__ */ n("legend", { className: qe.legend, children: e }),
    a.map((h) => {
      const _ = `${s}-${h.value}`, b = h.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: qe.row, children: [
        /* @__PURE__ */ o("span", { className: qe.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: s,
              className: qe.input,
              value: h.value,
              checked: t === h.value,
              disabled: l,
              "aria-describedby": za(b, c),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: _, className: qe.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${qe.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const hc = "_root_1h1ot_2", mc = "_head_1h1ot_11", wc = "_index_1h1ot_25", _c = "_dot_1h1ot_29", vc = "_note_1h1ot_34", fc = "_counter_1h1ot_40", bc = "_trailing_1h1ot_48", Me = {
  root: hc,
  head: mc,
  index: wc,
  dot: _c,
  note: vc,
  counter: fc,
  trailing: bc
};
function pc({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("span", { className: `${Me.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Me.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function gc({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Me.counter, "aria-hidden": "true", children: e }) : null;
}
function Nc({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Me.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Me.head, children: [
      /* @__PURE__ */ n(pc, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Me.note, children: t }),
    /* @__PURE__ */ n(gc, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Me.trailing, children: i })
  ] });
}
const yc = "_strip_1cfs3_2", kc = "_cell_1cfs3_7", $c = "_value_1cfs3_12", Cc = "_link_1cfs3_27", Sc = "_label_1cfs3_39", Xe = {
  strip: yc,
  cell: kc,
  value: $c,
  link: Cc,
  label: Sc
};
function Rc(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function Tc({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(T, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Xe.link} ward-stat-link`, href: F(e.href), "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function ka({ cells: e, divided: a = !1 }) {
  return Rc(e), /* @__PURE__ */ n("dl", { className: `${Xe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Xe.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Xe.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: /* @__PURE__ */ n(Tc, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Xe.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Ec = "_root_xk7sv_2", Lc = "_track_xk7sv_8", Ac = "_thumb_xk7sv_35", xc = "_labelHidden_xk7sv_53", qc = "_label_xk7sv_53", Ic = "_lockedNote_xk7sv_68", Be = {
  root: Ec,
  track: Lc,
  thumb: Ac,
  labelHidden: xc,
  label: qc,
  lockedNote: Ic
};
function Mc(e) {
  return e ? `${Be.label} ${Be.labelHidden}` : Be.label;
}
function De({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: c }) {
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
    /* @__PURE__ */ o("span", { id: d, className: Mc(c), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const Bc = "_bar_1u2kl_2", Pc = "_skip_1u2kl_11", Dc = "_mark_1u2kl_22", Oc = "_nav_1u2kl_30", Hc = "_list_1u2kl_34", Fc = "_select_1u2kl_40", jc = "_dest_1u2kl_47", Wc = "_actor_1u2kl_61", zc = "_actorMark_1u2kl_74", Gc = "_actorLabel_1u2kl_79", Uc = "_tagline_1u2kl_98", se = {
  bar: Bc,
  skip: Pc,
  mark: Dc,
  nav: Oc,
  list: Hc,
  select: Fc,
  dest: jc,
  actor: Wc,
  actorMark: zc,
  actorLabel: Gc,
  tagline: Uc
};
function Kc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Vc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function D1({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: c = "main" }) {
  const d = Vc(r);
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
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: Kc(d) })
    ] })
  ] });
}
const Yc = "_tree_1lyby_2", Xc = "_item_1lyby_6", Jc = "_row_1lyby_10", Qc = "_button_1lyby_22", ha = {
  tree: Yc,
  item: Xc,
  row: Jc,
  button: Qc
}, qn = Ve(null);
function Zc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ba({ orientation: "vertical" });
  return /* @__PURE__ */ n(qn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ha.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const es = { ArrowRight: !0, ArrowLeft: !1 };
function sn(e) {
  return e ? !0 : void 0;
}
function as(e, a) {
  const t = es[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function ns(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function ts(e) {
  const a = [ha.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function rs(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function ls(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function os(e) {
  return typeof e == "string" ? e : void 0;
}
function is({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function cs({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function In(e) {
  const a = Ke(qn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = rs(e);
  return /* @__PURE__ */ o("li", { className: ha.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: ts(e),
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
            onClick: () => ns(e),
            onKeyDown: (r) => as(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: ls(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: os(e.label), children: e.label }),
              /* @__PURE__ */ n(is, { value: e.detail }),
              /* @__PURE__ */ n(cs, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const ss = "_frame_fdzvs_2", ds = "_subjectRail_fdzvs_21", us = "_subject_fdzvs_21", hs = "_rail_fdzvs_41", ms = "_record_fdzvs_63", ws = "_recordBody_fdzvs_68", _s = "_band_fdzvs_111", vs = "_bandBody_fdzvs_120", fs = "_bandActions_fdzvs_125", bs = "_scroller_fdzvs_133", ps = "_lanes_fdzvs_151", he = {
  frame: ss,
  subjectRail: ds,
  subject: us,
  rail: hs,
  record: ms,
  recordBody: ws,
  band: _s,
  bandBody: vs,
  bandActions: fs,
  scroller: bs,
  lanes: ps
};
function O1({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: he.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function dn(e) {
  return e ? "true" : void 0;
}
function H1({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: he.subjectRail, "data-ward-subject-rail": t, "data-ruled": dn(i), children: [
    /* @__PURE__ */ n("div", { className: he.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: he.rail, "data-sticky": dn(l), "aria-label": r, children: a })
  ] });
}
function F1({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i }) {
  return /* @__PURE__ */ o("section", { className: he.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Nc, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: he.recordBody, "data-pad": l, children: a })
  ] });
}
const gs = "_form_1j8ub_2", Ns = "_fields_1j8ub_9", ys = "_actions_1j8ub_19", Ta = {
  form: gs,
  fields: Ns,
  actions: ys
};
function j1({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ta.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ta.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ta.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function W1({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: he.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: he.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: he.bandActions, children: a })
  ] });
}
const ks = "(max-width: 767.98px)";
function Ba({ label: e, children: a, laneCount: t }) {
  const r = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { className: he.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: r, children: a });
}
function $s({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = g(null), i = e.find((d) => d.id === r) ?? e[0], c = e.map((d) => ({ value: d.id, label: `${d.label} · ${d.count}` }));
  return /* @__PURE__ */ o("div", { className: he.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(L, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: l }),
    /* @__PURE__ */ n(Ba, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function z1({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Ln(ks);
  return t === void 0 ? /* @__PURE__ */ n(Ba, { label: a, children: e }) : l ? /* @__PURE__ */ n($s, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Ba, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n(pt, { children: i.content }, i.id)) });
}
const Cs = "_block_1o5o7_2", Ss = "_sentence_1o5o7_15", Rs = "_meta_1o5o7_20", Ts = "_action_1o5o7_25", Es = "_strip_1o5o7_29", Ls = "_loading_1o5o7_48", As = "_label_1o5o7_56", xs = "_counter_1o5o7_63", we = {
  block: Cs,
  sentence: Ss,
  meta: Rs,
  action: Ts,
  strip: Es,
  loading: Ls,
  label: As,
  counter: xs
};
function qs({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: we.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function $a({ sentence: e, action: a, children: t, role: r = "status", tone: l }) {
  return /* @__PURE__ */ o("div", { className: `${we.block} ward-state`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: we.sentence, children: e }),
    t,
    /* @__PURE__ */ n(qs, { action: a })
  ] });
}
function Is(e) {
  return /* @__PURE__ */ n($a, { ...e });
}
function G1({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n($a, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function U1(e) {
  return /* @__PURE__ */ n($a, { ...e });
}
function K1({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n($a, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "failed at ",
    oe(a)
  ] }) });
}
function V1({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    oe(e),
    ". Showing snapshot from ",
    oe(a)
  ] });
}
function Y1({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    oe(a)
  ] });
}
function X1({ label: e, startedAt: a }) {
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
const Ms = "_note_tlubt_2", Bs = {
  note: Ms
};
function Ps({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: Bs.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const Ds = "_card_12in3_2", Os = "_hit_12in3_23", Hs = "_head_12in3_30", Fs = "_title_12in3_36", js = "_meta_12in3_44", Ws = "_fields_12in3_45", zs = "_who_12in3_58", Gs = "_sep_12in3_65", Us = "_mono_12in3_69", Ks = "_field_12in3_45", Vs = "_last_12in3_84", Ys = "_reason_12in3_96", Y = {
  card: Ds,
  hit: Os,
  head: Hs,
  title: Fs,
  meta: js,
  fields: Ws,
  who: zs,
  sep: Gs,
  mono: Us,
  field: Ks,
  last: Vs,
  reason: Ys
}, Xs = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Js(e, a, t) {
  const r = la(e, "blue"), l = la(e, "orange"), i = la(e, "green"), c = N(/* @__PURE__ */ new Set());
  A(() => {
    if (!t) return;
    const d = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const s = Xs[u.type];
      s && d[s]();
    });
  }, [r, t, i, a, l]);
}
const Qs = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ae(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Zs(e, a) {
  return Qs[a](e);
}
function ed({ item: e, connection: a }) {
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
function ad({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: Y.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function nd({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Y.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function td({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: Y.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: Y.field, children: Zs(e, t) }, t)) });
}
const Pa = (e) => e ? !0 : void 0;
function rd(e) {
  return { "--stream": Ee(e.streamStep, "id") };
}
function ld(e, a, t) {
  e == null || e(a, t);
}
function od(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function id({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: Y.last, "data-stale": Pa(a), children: t }) : null;
}
function Ca(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  Js(r, t.key, e.feed);
  const l = od(e.feed), i = rd(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: Y.hit, onClick: (c) => ld(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(ad, { item: t }),
        /* @__PURE__ */ n("p", { className: Y.title, children: t.title }),
        /* @__PURE__ */ n(ed, { item: t, connection: l }),
        /* @__PURE__ */ n(nd, { reason: t.blockedReason }),
        /* @__PURE__ */ n(td, { item: t, fields: a }),
        /* @__PURE__ */ n(id, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const cd = "_column_10sxg_3", sd = "_head_10sxg_24", dd = "_label_10sxg_33", ud = "_count_10sxg_42", hd = "_list_10sxg_56", Je = {
  column: cd,
  head: sd,
  label: dd,
  count: ud,
  list: hd
};
function Mn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function md({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function wd(e) {
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
function _d({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: d, onKeyDown: u }) {
  const s = k(), h = e.cap !== void 0 && a.length > e.cap, _ = Mn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": s, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(md, { column: e, count: a.length, id: s }),
    /* @__PURE__ */ n(wd, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: d, rows: _ }),
    h && /* @__PURE__ */ n(Ps, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const vd = "_foot_8qg4p_2", fd = "_note_8qg4p_13", bd = "_link_8qg4p_19", Ea = {
  foot: vd,
  note: fd,
  link: bd
};
function J1({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ea.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ea.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: Ea.link, href: F(e), children: "Configure board" })
  ] });
}
const pd = "_head_1la6p_3", gd = "_identity_1la6p_12", Nd = "_titleRow_1la6p_18", yd = "_title_1la6p_18", kd = "_key_1la6p_35", $d = "_rollup_1la6p_45", Cd = "_tools_1la6p_53", Sd = "_swatch_1la6p_62", Rd = "_mark_1la6p_69", be = {
  head: pd,
  identity: gd,
  titleRow: Nd,
  title: yd,
  key: kd,
  rollup: $d,
  tools: Cd,
  swatch: Sd,
  mark: Rd
}, un = "initials:";
function Td(e) {
  return e === void 0 ? "loaded this week unavailable" : `${Q(e)} loaded this week`;
}
function Ed(e) {
  const a = [`${Q(e.inFlight)} in flight`, Td(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${Q(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${le(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${le(e.p90)}`), a.join(" · ");
}
function Ld(e) {
  return e.startsWith(un) ? e.slice(un.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Ad({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ee(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${be.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Ld(e) }) : /* @__PURE__ */ n("span", { className: be.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function xd({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Q1({
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
        /* @__PURE__ */ n(Ad, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: be.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: be.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: be.rollup, "aria-live": "polite", children: Ed(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: be.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(xd, { owners: l, owner: i, onOwnerChange: c }),
      d === void 0 ? null : /* @__PURE__ */ n(v, { onClick: d, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Ua, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const qd = "_head_kabyh_11", Id = "_line_kabyh_12", Md = "_cHandle_kabyh_33", Bd = "_cName_kabyh_38", Pd = "_nameLine_kabyh_46", Dd = "_cLabel_kabyh_53", Od = "_cCap_kabyh_58", Hd = "_cShown_kabyh_63", Fd = "_name_kabyh_46", jd = "_noCap_kabyh_85", Wd = "_state_kabyh_99", zd = "_handle_kabyh_104", Gd = "_sub_kabyh_118", I = {
  head: qd,
  line: Id,
  cHandle: Md,
  cName: Bd,
  nameLine: Pd,
  cLabel: Dd,
  cCap: Od,
  cShown: Hd,
  name: Fd,
  noCap: jd,
  state: Wd,
  handle: zd,
  sub: Gd
}, Ud = "can't be hidden or collapsed", Kd = "terminal · counted, not a column";
function Z1() {
  return /* @__PURE__ */ o("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function Vd(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Yd(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function hn(e) {
  return e.gate ? Ud : e.terminal ? Kd : Yd(e.agentsMounted);
}
function Xd(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Jd({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: I.cName, children: [
    /* @__PURE__ */ o("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    hn(e) && /* @__PURE__ */ n("span", { className: I.sub, children: hn(e) })
  ] });
}
function Qd(e) {
  return e === void 0 ? "" : String(e);
}
function Zd(e) {
  return e === "" ? void 0 : Number(e);
}
function eu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Xd(t, a),
      children: "⠿"
    }
  ) });
}
function au({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(L, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Qd(a.cap), onChange: (r) => t({ ...a, cap: Zd(r) }) }) });
}
function nu({ stage: e, config: a, onChange: t }) {
  const r = Vd(e, a.shown);
  return /* @__PURE__ */ o("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(De, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function tu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function e$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: I.line, "data-kind": tu(e), children: [
    /* @__PURE__ */ n(eu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Jd, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(L, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(au, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(nu, { stage: e, config: a, onChange: t })
  ] });
}
const ru = "_body_hn6d6_2", lu = "_head_hn6d6_9", ou = "_summary_hn6d6_19", iu = "_block_hn6d6_20", cu = "_actionsBlock_hn6d6_21", su = "_title_hn6d6_41", du = "_note_hn6d6_46", uu = "_k_hn6d6_51", hu = "_kv_hn6d6_58", mu = "_row_hn6d6_64", wu = "_label_hn6d6_75", _u = "_value_hn6d6_84", vu = "_quote_hn6d6_90", fu = "_actions_hn6d6_21", bu = "_resolve_hn6d6_103", M = {
  body: ru,
  head: lu,
  summary: ou,
  block: iu,
  actionsBlock: cu,
  title: su,
  note: du,
  k: uu,
  kv: hu,
  row: mu,
  label: wu,
  value: _u,
  quote: vu,
  actions: fu,
  resolve: bu
};
function pu(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function gu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Nu(e) {
  const a = Na(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function yu(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...ya(Nu(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", le(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...pu(e),
    ...gu(e, a)
  ];
}
function ku({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function $u({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: M.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Cu({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: M.block, children: [
    /* @__PURE__ */ n("p", { className: M.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: M.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: M.note, children: e.agentMeta })
  ] }) : null;
}
function a$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: c, actionsNote: d }) {
  const u = k(), s = yu(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: M.body, children: [
    /* @__PURE__ */ n($u, { item: e }),
    /* @__PURE__ */ o("div", { className: M.summary, children: [
      /* @__PURE__ */ n("h2", { className: M.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: M.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: M.kv, children: s.map(([h, _]) => /* @__PURE__ */ o("div", { className: M.row, children: [
      /* @__PURE__ */ n("dt", { className: M.label, children: h }),
      /* @__PURE__ */ n("dd", { className: M.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(Cu, { item: e }),
    /* @__PURE__ */ o("div", { className: M.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: M.actions, children: a }),
      d && /* @__PURE__ */ n("p", { className: M.note, children: d })
    ] }),
    /* @__PURE__ */ n(ku, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Su = "_root_3azmy_2", Ru = "_list_3azmy_7", Tu = "_item_3azmy_12", Eu = "_box_3azmy_18", Lu = "_text_3azmy_23", Au = "_note_3azmy_28", Fe = {
  root: Su,
  list: Ru,
  item: Tu,
  box: Eu,
  text: Lu,
  note: Au
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
const xu = "_rail_ke7ch_2", qu = "_k_ke7ch_11", Iu = "_head_ke7ch_19", Mu = "_section_ke7ch_25", Bu = "_card_ke7ch_38", Pu = "_strip_ke7ch_42", Du = "_skeleton_ke7ch_56", Ou = "_skeletonLabel_ke7ch_70", Hu = "_bar_ke7ch_76", Fu = "_note_ke7ch_85", ue = {
  rail: xu,
  k: qu,
  head: Iu,
  section: Mu,
  card: Bu,
  strip: Pu,
  skeleton: Du,
  skeletonLabel: Ou,
  bar: Hu,
  note: Fu
};
function ju(e) {
  return (a) => e == null ? void 0 : e(a);
}
function La({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: ue.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: ue.k, children: e }),
    a
  ] });
}
function Wu({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: ue.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: ue.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: ue.bar, "aria-hidden": "true" }, r))
  ] });
}
function zu({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(_d, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function Gu(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(zu, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Wu, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function n$(e) {
  const a = ju(e.onOpen), t = Mn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: ue.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${ue.k} ${ue.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(La, { title: "Card", children: /* @__PURE__ */ n("div", { className: ue.card, children: t && /* @__PURE__ */ n(Ca, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(La, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: ue.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Gu, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: ue.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(La, { title: "Effect of this config", children: /* @__PURE__ */ n(Sa, { items: e.effects, density: "compact" }) })
  ] });
}
function Uu(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Ku(e) {
  return Math.ceil(e.length / 2);
}
function Vu(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Bn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Yu(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Bn(e);
  l !== void 0 && t(l), r(Vu(e.type));
}
function Xu(e, a, t, r, l) {
  A(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Yu(i, t, r, l));
  }, [e, a, t, r, l]);
}
function Ju(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Qu(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function Zu(e, a) {
  return a !== void 0 ? le(e.timeInStage) + " · waits on " + a.agent : le(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function eh(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(Ku(a ?? [])) + ")"
  };
}
function ah(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function nh(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: ae(e.cost) }) : null;
}
function th(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function rh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function lh(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function oh(e, a) {
  return a === void 0 ? e : Uu(e, a.ref);
}
function ih(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ze(e) {
  return e === !0 ? "true" : void 0;
}
function Pn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = N(null), i = la(l), c = N(/* @__PURE__ */ new Set()), [d, u] = g(Ju(a));
  Xu(e.feed, a.key, c, u, i);
  const s = Qu(a, r), h = Zu(a, t), _ = eh(a, e.fields), b = lh(a, t, d);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...ih(e),
      className: "ward-workcard",
      "data-flagged": Ze(a.flagged),
      "data-selected": Ze(e.selected),
      style: _,
      ref: oh(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        ah(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: s.role, label: s.label }),
          nh(a, e.fields),
          th(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          rh(t, d, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function ch({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function sh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function dh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function uh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(ch, { count: e.items.length, cap: e.column.cap });
}
function hh(e, a) {
  return e.roving ?? a;
}
function mh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function wh(e, a) {
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
function _h(e) {
  const a = k(), t = ba({ orientation: "vertical" }), r = hh(e, t), l = sh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ze(l), "data-gate": Ze(e.column.gate), children: [
    dh(e.column, e.items.length, a),
    uh(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...mh(e, t), children: wh(e, r) })
  ] });
}
function vh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + le(e.p50)), e.p90 !== void 0 && (a += " · p90 " + le(e.p90)), a;
}
function fh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function bh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function t$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: vh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      fh(e),
      bh(e.onConfigure),
      /* @__PURE__ */ n(Ua, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function ph(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function gh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(De, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(De, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Nh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function r$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ze(ph(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: gh(e) }),
    /* @__PURE__ */ n(L, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Rn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Nh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function l$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Pn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(_h, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function yh(e, a) {
  const t = Bn(e);
  t !== void 0 && a(t);
}
function kh(e, a, t) {
  A(() => {
    if (e != null)
      return e.subscribe(a, (r) => yh(r, t));
  }, [e, a, t]);
}
function $h(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Ch(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", le(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ae(e.cost)]), a;
}
function Sh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Rh(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function o$(e) {
  var c;
  const a = e.item, t = a.run, [r, l] = g((c = a.run) == null ? void 0 : c.lastStep);
  kh(e.feed, a.key, l);
  const i = [...$h(a), ...Ch(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((d) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: d[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(d[1]), children: d[1] })
      ] }, d[0])),
      Sh(t, r)
    ] }),
    Rh(a, e.actions)
  ] });
}
const Th = "_card_hvxp7_2", Eh = "_head_hvxp7_17", Lh = "_mark_hvxp7_25", Ah = "_name_hvxp7_37", xh = "_chips_hvxp7_48", qh = "_description_hvxp7_54", Ih = "_run_hvxp7_59", Mh = "_sep_hvxp7_68", Bh = "_facts_hvxp7_73", Ph = "_fact_hvxp7_73", Dh = "_factLabel_hvxp7_86", Oh = "_factValue_hvxp7_90", te = {
  card: Th,
  head: Eh,
  mark: Lh,
  name: Ah,
  chips: xh,
  description: qh,
  run: Ih,
  sep: Mh,
  facts: Bh,
  fact: Ph,
  factLabel: Dh,
  factValue: Oh
}, Hh = { live: "done", draft: "running", paused: "meta" };
function Fh(e) {
  return e === void 0 ? te.card : `${te.card} ${e}`;
}
function jh({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: te.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Hh[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function Wh({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: te.description, children: e });
}
function zh({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: te.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: te.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Gh({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: te.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: te.fact, children: [
    /* @__PURE__ */ n("dt", { className: te.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: te.factValue, children: a.value })
  ] }, a.label)) });
}
function Uh(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Kh({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: c }) {
  const d = { "--stream": Ee(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: Fh(c),
      style: d,
      "data-selected": u,
      "data-paused": Uh(e.versions),
      children: [
        /* @__PURE__ */ o("h3", { className: te.head, children: [
          /* @__PURE__ */ n("span", { className: te.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${te.name} ward-rowlink`, href: F(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(Wh, { description: e.description }),
        /* @__PURE__ */ n(zh, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(jh, { versions: e.versions }),
        /* @__PURE__ */ n(Gh, { facts: i })
      ]
    }
  );
}
const Vh = "_list_4dcyc_2", Yh = "_row_4dcyc_11", Xh = "_head_4dcyc_23", Jh = "_id_4dcyc_30", Qh = "_lock_4dcyc_35", Zh = "_reason_4dcyc_41", em = "_remove_4dcyc_46", am = "_clauses_4dcyc_50", nm = "_clause_4dcyc_50", tm = "_label_4dcyc_64", rm = "_cell_4dcyc_71", lm = "_value_4dcyc_76", re = {
  list: Vh,
  row: Yh,
  head: Xh,
  id: Jh,
  lock: Qh,
  reason: Zh,
  remove: em,
  clauses: am,
  clause: nm,
  label: tm,
  cell: rm,
  value: lm
}, Dn = Ve(!1);
function i$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Dn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: re.list, "aria-label": a, children: e }) });
}
function om({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: re.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(L, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function im({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: re.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: re.reason, children: e })
  ] });
}
function cm({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: re.head, children: [
    /* @__PURE__ */ n("span", { className: re.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(im, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: re.remove, children: /* @__PURE__ */ o(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function mn(e, a) {
  return e.locked ? void 0 : a;
}
function c$({ rule: e, onChange: a, onRemove: t }) {
  if (!Ke(Dn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = mn(e, a);
  return /* @__PURE__ */ o("li", { className: re.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(cm, { rule: e, onRemove: mn(e, t) }),
    /* @__PURE__ */ n("dl", { className: re.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: re.clause, children: [
      /* @__PURE__ */ n("dt", { className: re.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: re.cell, children: /* @__PURE__ */ n(om, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const sm = "_ladder_wwnch_2", dm = "_cell_wwnch_7", um = "_empty_wwnch_26", hm = "_name_wwnch_34", mm = "_holder_wwnch_40", wm = "_request_wwnch_46", _m = "_swatches_wwnch_51", vm = "_swatch_wwnch_51", fm = "_tilesFrame_wwnch_78", bm = "_tiles_wwnch_78", pm = "_tile_wwnch_78", gm = "_bar_wwnch_117", Nm = "_hex_wwnch_128", ym = "_note_wwnch_138", R = {
  ladder: sm,
  cell: dm,
  empty: um,
  name: hm,
  holder: mm,
  request: wm,
  swatches: _m,
  swatch: vm,
  tilesFrame: fm,
  tiles: bm,
  tile: pm,
  bar: gm,
  hex: Nm,
  note: ym
}, km = "not validated yet, pending a CVD matrix and dark stepping";
function $m(e) {
  return e.reserved ? "reserved" : ga(e.step) ? "validated" : "partial";
}
function On(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Cm(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Sm({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Le, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Rm(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Tm(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const wn = (e) => String(e).padStart(2, "0");
function Em(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? On(e, void 0);
}
function Lm({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: r ? `step ${wn(e)}` : Mt(e) }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: r ? t : `Step ${wn(e)} · ${t}` })
  ] });
}
function Am({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = $m(e), c = On(i, t), d = c !== "free", u = a === e.step, s = e.name ?? `Step ${e.step}`, h = () => {
    d || r(e.step);
  }, _ = `${s} · ${l === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...Tm(d, u), "data-validation": i, style: Cm(e, i), onClick: h, onKeyDown: (x) => Rm(x, h) }, label: _, name: s, holder: c, validation: i, note: Em(i, t, u), step: e.step };
}
const xm = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${R.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${R.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Lm, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${R.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Sm, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function qm(e) {
  return xm[e.presentation](Am(e));
}
function Im(e) {
  for (const a of e)
    if (!a.reserved && !pa(a.step)) throw new Error("colour ladder renders token steps only");
}
function Mm() {
  return /* @__PURE__ */ o("div", { className: `${R.cell} ward-ladder-cell ${R.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Bm(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Pm = { list: R.ladder, swatches: R.swatches, tiles: R.tilesFrame };
function Dm() {
  return /* @__PURE__ */ o("div", { className: `${R.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Om = { list: Mm, swatches: () => null, tiles: Dm };
function Hn(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var d;
    (d = e.onChange) == null || d.call(e, c);
  };
  Im(e.steps);
  const r = Bm(e), l = Om[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(qm, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${Pm[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: R.tiles, children: i }) : i });
}
const Hm = "_rail_1el2t_2", Fm = "_section_1el2t_12", jm = "_sectionFlush_1el2t_22", Wm = "_head_1el2t_26", zm = "_headLabel_1el2t_34", Gm = "_sample_1el2t_42", Um = "_sampleLabel_1el2t_47", Km = "_sampleTitle_1el2t_54", Vm = "_sampleMeta_1el2t_59", Ym = "_trace_1el2t_65", Xm = "_traceHead_1el2t_70", Jm = "_steps_1el2t_78", Qm = "_step_1el2t_78", Zm = "_stepTitle_1el2t_97", ew = "_hollow_1el2t_107", aw = "_stepBody_1el2t_115", nw = "_stepDetail_1el2t_127", tw = "_publish_1el2t_132", rw = "_reason_1el2t_138", lw = "_note_1el2t_143", ow = "_reveal_1el2t_148", p = {
  rail: Hm,
  section: Fm,
  sectionFlush: jm,
  head: Wm,
  headLabel: zm,
  sample: Gm,
  sampleLabel: Um,
  sampleTitle: Km,
  sampleMeta: Vm,
  trace: Ym,
  traceHead: Xm,
  steps: Jm,
  step: Qm,
  stepTitle: Zm,
  hollow: ew,
  stepBody: aw,
  stepDetail: nw,
  publish: tw,
  reason: rw,
  note: lw,
  reveal: ow
}, _n = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, iw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, cw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, sw = { notSimulated: "not simulated", running: "running" };
function dw(e) {
  return e.presentation === "foundry";
}
function uw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function hw(e, a) {
  var r;
  const t = iw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function mw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function ww(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function _w(e) {
  if (mw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function vw(e) {
  const [a, t] = g(!1);
  A(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function fw(e) {
  const a = sw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Le, { size: 6, kind: cw[e.kind], label: e.kind });
}
function bw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function pw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function gw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(vw, { kind: a.kind, children: [
    /* @__PURE__ */ n(fw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(bw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(pw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Nw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(le(a)), t.join(" · ");
}
function Fn(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: Nw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(gw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function yw(e) {
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
function kw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + oe(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function $w(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ae(e.run.cost), label: "Cost" }, { value: e.run.turns ? $n(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ka, { divided: !0, cells: a }) });
}
function Cw(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ae(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: $n(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Sw(e) {
  const a = Cw(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ka, { divided: !0, cells: a }) });
}
function jn(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Rw(e) {
  return /* @__PURE__ */ o("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(jn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function Tw(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(jn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Wn(e) {
  return /* @__PURE__ */ o("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: _n[e.run.status].role, label: _n[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Ew(e, a) {
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
function Lw(e) {
  var t;
  ww(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Wn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(yw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Fn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n($w, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Sa, { items: e.checklist }) }),
    /* @__PURE__ */ n(Rw, { reason: uw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Aw(e) {
  var r;
  const a = Ew(e.run, e.feed);
  _w(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Wn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(kw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Fn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Sw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Sa, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Tw, { reason: hw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function s$(e) {
  return dw(e) ? /* @__PURE__ */ n(Aw, { ...e }) : /* @__PURE__ */ n(Lw, { ...e });
}
const xw = "_list_142ip_3", qw = "_row_142ip_9", Iw = "_condition_142ip_18", Mw = "_action_142ip_24", oa = {
  list: xw,
  row: qw,
  condition: Iw,
  action: Mw
}, zn = Ve(!1);
function d$({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(zn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oa.list, "aria-label": a, children: e }) });
}
function u$({ rule: e }) {
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
function vn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Bw(e) {
  return e === "up" ? "down" : "up";
}
function Pw(e, a) {
  const t = vn(e, a.id, a.direction) ?? vn(e, a.id, Bw(a.direction));
  t == null || t.focus();
}
function Kn() {
  const e = N(null), [a, t] = g(null), [r, l] = g("");
  return A(() => {
    e.current !== null && a !== null && Pw(e.current, a);
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
const Dw = "_body_1h15q_2", Ow = "_title_1h15q_8", Hw = "_section_1h15q_13", Fw = "_legend_1h15q_18", jw = "_stages_1h15q_26", Ww = "_stage_1h15q_26", zw = "_stageIndex_1h15q_44", Gw = "_stageName_1h15q_50", Uw = "_footer_1h15q_59", Kw = "_note_1h15q_66", Vw = "_reason_1h15q_71", Yw = "_actions_1h15q_76", Xw = "_webHead_1h15q_83", Jw = "_kicker_1h15q_92", Qw = "_webTitle_1h15q_99", Zw = "_webBody_1h15q_105", e_ = "_webSection_1h15q_109", a_ = "_sectionHead_1h15q_121", n_ = "_sectionNote_1h15q_129", t_ = "_formLabel_1h15q_134", r_ = "_identityRow_1h15q_139", l_ = "_nameCell_1h15q_145", o_ = "_keyCell_1h15q_150", i_ = "_colourCell_1h15q_154", c_ = "_colourStatus_1h15q_161", s_ = "_webStages_1h15q_166", d_ = "_webStageList_1h15q_172", u_ = "_webStage_1h15q_166", h_ = "_webIndex_1h15q_191", m_ = "_webStageName_1h15q_196", w_ = "_webMoves_1h15q_201", __ = "_addStage_1h15q_215", v_ = "_addStageButton_1h15q_223", f_ = "_addStageNote_1h15q_231", b_ = "_webFooter_1h15q_236", p_ = "_webFooterNotes_1h15q_244", g_ = "_webNote_1h15q_251", w = {
  body: Dw,
  title: Ow,
  section: Hw,
  legend: Fw,
  stages: jw,
  stage: Ww,
  stageIndex: zw,
  stageName: Gw,
  footer: Uw,
  note: Kw,
  reason: Vw,
  actions: Yw,
  webHead: Xw,
  kicker: Jw,
  webTitle: Qw,
  webBody: Zw,
  webSection: e_,
  sectionHead: a_,
  sectionNote: n_,
  formLabel: t_,
  identityRow: r_,
  nameCell: l_,
  keyCell: o_,
  colourCell: i_,
  colourStatus: c_,
  webStages: s_,
  webStageList: d_,
  webStage: u_,
  webIndex: h_,
  webStageName: m_,
  webMoves: w_,
  addStage: __,
  addStageButton: v_,
  addStageNote: f_,
  webFooter: b_,
  webFooterNotes: p_,
  webNote: g_
}, N_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Yn = "not in catalogue";
function y_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Yn}` }, ...t];
}
function k_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(L, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Yn}`;
  return /* @__PURE__ */ n(L, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: y_(t, e.name), invalid: i, onChange: r });
}
function Xn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function $_(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function C_({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: c }) {
  const d = Xn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(k_, { stage: a, index: t, catalogue: l, onName: (s) => i({ ...a, name: s }) }) }),
    /* @__PURE__ */ n(L, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: N_, onChange: (s) => i({ ...a, kind: s }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ma, { id: e, name: d, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ma, { id: e, name: d, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function S_({ stages: e, onChange: a, catalogue: t }) {
  const r = $_(e.length), l = Kn(), i = (d, u) => {
    const s = Gn(d, u);
    r.current = Da(r.current, d, s), l.moved({ id: r.current[s], direction: u }, Un(Xn(e[d], d), s, e.length)), a(Da(e, d, s));
  }, c = (d, u) => a(e.map((s, h) => h === d ? u : s));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((d, u) => /* @__PURE__ */ n(C_, { id: r.current[u], stage: d, index: u, total: e.length, catalogue: t, onReplace: (s) => c(u, s), onMove: (s) => i(u, s) }, r.current[u])) }),
    /* @__PURE__ */ n(Vn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const R_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], T_ = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], E_ = "A new stream starts as a draft. Nothing runs on it until you publish it.", L_ = "Create is disabled: name the stream and give it a key first.", A_ = "reorder with the ↑ ↓ buttons · min 2";
function Ka(e, a) {
  return !e.reserved && ga(e.step) && a[e.step] === void 0;
}
function x_(e, a) {
  const t = e.find((r) => Ka(r, a));
  return t ? t.step : 1;
}
function q_({ stages: e, onMove: a }) {
  const t = Kn(), r = (l, i) => {
    const c = Gn(l, i);
    t.moved({ id: e[l].id, direction: i }, Un(e[l].name, c, e.length)), a(l, c);
  };
  return /* @__PURE__ */ o(T, { children: [
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
function I_({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: E_ }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function M_(e, a) {
  return e !== "" && a !== "" ? null : L_;
}
function B_(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = T_, onCreate: i, onDraft: c, onClose: d, returnFocusTo: u } = e, s = k(), [h, _] = g(""), [b, x] = g(""), [K, Z] = g(a[0].value), [ie, $e] = g(() => x_(t, r)), [ce, Oe] = g(e.stages ?? R_), [He, $] = g(l[0].value), j = { name: h, key: b, streamStep: ie, owner: K, stages: ce, policy: He }, _e = M_(h, b);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: s, onClose: d, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: s, children: "New stream" }),
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
      /* @__PURE__ */ n(q_, { stages: ce, onMove: (Ae, ft) => Oe(Da(ce, Ae, ft)) })
    ] }),
    /* @__PURE__ */ n(xn, { legend: "Loop policy", options: l, value: He, onChange: $ }),
    /* @__PURE__ */ n(I_, { reason: _e, onCreate: () => i(j), onDraft: () => c(j) })
  ] }) });
}
const Jn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], P_ = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function D_(e, a, t, r, l, i) {
  var d;
  const c = ((d = Jn.find((u) => u.value === l)) == null ? void 0 : d.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function O_(e, a) {
  return H_(e) && F_(e, a) && j_(e);
}
function H_(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function F_(e, a) {
  return e.colourStep !== null && Ka({ step: e.colourStep }, a);
}
function j_(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function W_(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${km}.` : Ka({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function z_({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function G_({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(z_, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: P_ })
    ] }),
    l && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function U_({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function K_({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function V_(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [l, i] = g(""), [c, d] = g(""), [u, s] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, x] = g("relay"), [K, Z] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), ie = D_(l, c, u, h, b, K), $e = O_(ie, r), ce = K.find(($) => $.kind === "agent" && $.name.trim() !== ""), Oe = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Hn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), He = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: W_(h, r) }),
    /* @__PURE__ */ n(L, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: s })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(U_, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(K_, { name: l, setName: i, streamKey: c, setKey: d, colour: Oe, owner: He }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: A_ })
        ] }),
        /* @__PURE__ */ n(S_, { stages: K, onChange: Z })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(xn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Jn, onChange: x }) }),
      /* @__PURE__ */ n(G_, { ready: $e, draft: ie, agentStage: ce, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function h$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(V_, { ...e }) : /* @__PURE__ */ n(B_, { ...e });
}
const Y_ = "_row_bs8hc_2", X_ = "_cell_bs8hc_6", J_ = "_condition_bs8hc_11", Q_ = "_action_bs8hc_18", Z_ = "_contract_bs8hc_24", ev = "_contractCondition_bs8hc_33", av = "_contractAction_bs8hc_39", X = {
  row: Y_,
  cell: X_,
  condition: J_,
  action: Q_,
  contract: Z_,
  contractCondition: ev,
  contractAction: av
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
  return t || !a ? /* @__PURE__ */ n("span", { className: X.action, children: fn[e.then] }) : /* @__PURE__ */ n(
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
function nv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: X.condition, title: wa(e, r), children: wa(e, r) }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: Va(e, a, t) })
  ] });
}
function tv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: X.row, children: [
    /* @__PURE__ */ o("td", { className: X.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: X.condition, children: wa(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: X.cell, children: Va(e, a, t) })
  ] });
}
function rv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: X.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: X.contractCondition, children: wa(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: X.contractAction, children: Va(e, a, t, !0) })
  ] });
}
const lv = { two: tv, four: nv, contract: rv };
function m$(e) {
  var t;
  if (!Qn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = lv[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const ov = "_column_lurgk_2", iv = "_head_lurgk_17", cv = "_index_lurgk_23", sv = "_name_lurgk_29", dv = "_meta_lurgk_38", uv = "_mono_lurgk_43", hv = "_gate_lurgk_50", mv = "_reviewersLabel_lurgk_57", wv = "_reviewers_lurgk_57", _v = "_reviewer_lurgk_57", vv = "_agents_lurgk_74", fv = "_workflowColumn_lurgk_79", bv = "_workflowHead_lurgk_96", pv = "_stageRow_lurgk_102", gv = "_stageLabel_lurgk_109", Nv = "_workflowTitle_lurgk_116", yv = "_workflowMeta_lurgk_122", kv = "_workflowGate_lurgk_127", $v = "_gateNote_lurgk_135", Cv = "_cardNote_lurgk_140", Sv = "_reviewerList_lurgk_149", Rv = "_reviewerRow_lurgk_155", Tv = "_reviewerMark_lurgk_161", Ev = "_reviewerName_lurgk_171", Lv = "_terminalCard_lurgk_177", Av = "_terminalCount_lurgk_186", xv = "_workflowAgents_lurgk_192", qv = "_mount_lurgk_198", y = {
  column: ov,
  head: iv,
  index: cv,
  name: sv,
  meta: dv,
  mono: uv,
  gate: hv,
  reviewersLabel: mv,
  reviewers: wv,
  reviewer: _v,
  agents: vv,
  workflowColumn: fv,
  workflowHead: bv,
  stageRow: pv,
  stageLabel: gv,
  workflowTitle: Nv,
  workflowMeta: yv,
  workflowGate: kv,
  gateNote: $v,
  cardNote: Cv,
  reviewerList: Sv,
  reviewerRow: Rv,
  reviewerMark: Tv,
  reviewerName: Ev,
  terminalCard: Lv,
  terminalCount: Av,
  workflowAgents: xv,
  mount: qv
}, Iv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Ya(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Zn(e) {
  return `${Math.round(e * 100)}%`;
}
function Mv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ka, { cells: [
      { value: Zn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: Q(e.count), label: "In stage" }
    ] })
  ] });
}
function Bv({ stage: e }) {
  return /* @__PURE__ */ n(ka, { cells: [
    { value: Q(e.count), label: "In stage" },
    { value: Ya(e.closedThisWeek, Q), label: "Closed this week" }
  ] });
}
function Pv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: Iv[e.kind] })
  ] });
}
function Dv({ stage: e }) {
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
function Ov({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Mv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Bv, { stage: e }) : null;
}
function Hv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Fv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: y.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Pv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(Dv, { stage: e }),
    /* @__PURE__ */ n(Ov, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(Kh, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(Hv, { onMount: t })
  ] });
}
const jv = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function Wv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function zv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Wv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Zn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Gv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Uv({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: Ya(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: Gv(e.rolledBackThisWeek) })
  ] });
}
function Kv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Vv(e) {
  if (e.kind === "terminal") return `${Ya(e.closedThisWeek)} this week`;
  const a = Kv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Yv({ stage: e, titleId: a }) {
  const t = jv[e.kind];
  return /* @__PURE__ */ o("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: y.stageRow, children: [
      /* @__PURE__ */ o("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: Vv(e) })
  ] });
}
function Xv(e) {
  return e === "entry" || e === "agent";
}
function Jv({ stage: e, onMount: a }) {
  return a === void 0 || !Xv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Qv({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ o("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Yv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(zv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Uv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(Jv, { stage: e, onMount: t })
  ] });
}
function Zv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function w$(e) {
  return Zv(e) ? /* @__PURE__ */ n(Qv, { ...e }) : /* @__PURE__ */ n(Fv, { ...e });
}
const ef = "_row_ve78g_6", af = "_cell_ve78g_10", nf = "_name_ve78g_19", tf = "_chain_ve78g_26", rf = "_owner_ve78g_32", lf = "_mono_ve78g_38", of = "_compactRow_ve78g_45", cf = "_compactCell_ve78g_54", sf = "_stack_ve78g_71", df = "_stat_ve78g_78", uf = "_identityLine_ve78g_85", hf = "_identity_ve78g_85", mf = "_compactName_ve78g_103", wf = "_ownerLine_ve78g_117", _f = "_link_ve78g_130", vf = "_emptyChain_ve78g_136", ff = "_arrow_ve78g_142", bf = "_muted_ve78g_143", pf = "_define_ve78g_148", gf = "_statValue_ve78g_155", Nf = "_policyId_ve78g_161", yf = "_sub_ve78g_166", f = {
  row: ef,
  cell: af,
  name: nf,
  chain: tf,
  owner: rf,
  mono: lf,
  compactRow: of,
  compactCell: cf,
  stack: sf,
  stat: df,
  identityLine: uf,
  identity: hf,
  compactName: mf,
  ownerLine: wf,
  link: _f,
  emptyChain: vf,
  arrow: ff,
  muted: bf,
  define: pf,
  statValue: gf,
  policyId: Nf,
  sub: yf
};
function kf(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function $f(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function et(e) {
  return `${Q(e)} ${e === 1 ? "member" : "members"}`;
}
function Cf(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${et(e.members)}`;
}
function Sf(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ o("span", { className: f.stack, children: [
    /* @__PURE__ */ o("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: F(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Cf(e) })
  ] }) });
}
function Rf(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function Tf(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: F(a), children: "Define workflow" })
  ] }) : Rf(e) });
}
function bn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function Ef(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function Lf(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Af({ stream: e, href: a, presentation: t }) {
  const r = $f(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ee(e.streamStep, "chip") }, children: [
    Sf(e, a),
    Tf(e.stages, a),
    bn(Lf(e.agents), e.agents === void 0 ? void 0 : kf(e.agents), "—"),
    Ef(e.policy),
    bn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function xf(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function _$(e) {
  if (xf(e)) return Af(e);
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
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: Q(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : le(a.p50) }) })
  ] });
}
const qf = "_row_mdce7_2", If = "_name_mdce7_16", Mf = "_scope_mdce7_24", _a = {
  row: qf,
  name: If,
  scope: Mf
};
function Bf(e) {
  return e === void 0 ? `${_a.row} ward-toolrow` : `${_a.row} ward-toolrow ${e}`;
}
function Pf(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Df({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function Of({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Hf({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${_a.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Ff(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function v$({ tool: e, onChange: a, presentation: t }) {
  const r = k(), l = k(), i = Pf(e, t), c = Ff(t);
  return /* @__PURE__ */ o(c, { className: Bf(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Df, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${_a.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Hf, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(Of, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const jf = "_strip_1qtlf_2", Wf = "_head_1qtlf_10", zf = "_name_1qtlf_16", Gf = "_chart_1qtlf_24", Uf = "_segment_1qtlf_30", Kf = "_detailedChart_1qtlf_36", Vf = "_rail_1qtlf_49", Yf = "_section_1qtlf_55", Xf = "_label_1qtlf_66", Jf = "_note_1qtlf_83", J = {
  strip: jf,
  head: Wf,
  name: zf,
  chart: Gf,
  segment: Uf,
  detailedChart: Kf,
  rail: Vf,
  section: Yf,
  label: Xf,
  note: Jf
}, Qf = "No item in flight to preview.", Zf = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", eb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Oa = [1, 2, 3, 4, 5, 6], va = 100;
function ab(e, a) {
  return a.has(e) ? Ee(e, "id") : "var(--ward-color-line)";
}
function nb({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: J.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Oa.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: J.segment,
      x: l * va,
      y: "0",
      width: va,
      height: "8",
      fill: ab(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function tb(e) {
  const a = e.slice(0, Oa.length);
  for (; a.length < Oa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function rb({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${J.detailedChart} ward-appearance-chart`, children: [
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
  return /* @__PURE__ */ o("section", { className: J.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: J.label, children: e }),
    a
  ] });
}
function lb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: J.note, children: a ?? Qf }) : /* @__PURE__ */ n(Ca, { item: { ...e, streamStep: Na(t.streamStep) }, onOpen: at(r), feed: null });
}
function ob({ draft: e }) {
  const a = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: J.head, style: a, children: [
    /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: J.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...ya(e.key, e.streamStep) })
  ] });
}
function ib(e) {
  const a = tb(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: J.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ta, { label: "Board card", children: /* @__PURE__ */ n(lb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ta, { label: "Streams index row", children: /* @__PURE__ */ n(ob, { draft: t }) }),
    /* @__PURE__ */ o(ta, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(rb, { identities: a }),
      /* @__PURE__ */ n("p", { className: J.note, children: Zf })
    ] }),
    /* @__PURE__ */ n(ta, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: J.note, children: eb }) })
  ] });
}
function cb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: J.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: J.head, children: [
      /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: J.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...ya(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(Ca, { item: { ...a, streamStep: e.streamStep }, onOpen: at(r) }),
    /* @__PURE__ */ n(nb, { draft: e, streams: t })
  ] });
}
function f$(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(ib, { ...e }) : /* @__PURE__ */ n(cb, { ...e });
}
const sb = "_row_ixlg5_6", db = "_headCell_ixlg5_10", ub = "_cell_ixlg5_11", hb = "_name_ixlg5_23", mb = "_consequence_ixlg5_29", wb = "_governed_ixlg5_36", _b = "_control_ixlg5_42", vb = "_byRole_ixlg5_48", fb = "_webControl_ixlg5_59", bb = "_webConsequence_ixlg5_65", pb = "_webGoverned_ixlg5_71", P = {
  row: sb,
  headCell: db,
  cell: ub,
  name: hb,
  consequence: mb,
  governed: wb,
  control: _b,
  byRole: vb,
  webControl: fb,
  webConsequence: bb,
  webGoverned: pb
};
function gb({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: P.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: P.control, children: [
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
function Nb({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(gb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function yb(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function kb({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    De,
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
function $b({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(kb, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: yb(e) }) })
  ] });
}
function b$(e) {
  return "presentation" in e ? /* @__PURE__ */ n($b, { ...e }) : /* @__PURE__ */ n(Nb, { ...e });
}
const Cb = "_row_vv64h_2", Sb = "_cell_vv64h_6", Rb = "_name_vv64h_25", Tb = "_note_vv64h_30", Eb = "_webName_vv64h_41", Lb = "_webMeta_vv64h_47", G = {
  row: Cb,
  cell: Sb,
  name: Rb,
  note: Tb,
  webName: Eb,
  webMeta: Lb
}, nt = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Ab(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function xb({ component: e, onRestart: a }) {
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
function qb({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: Ab(e.state) });
}
function Ib({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: G.row, children: [
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: `${G.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: `${G.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(m, { ...nt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(qb, { component: e, onRestart: a }) })
  ] });
}
function p$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ib, { ...e }) : /* @__PURE__ */ n(xb, { ...e });
}
const Mb = "_row_1f1gp_7", Bb = "_cell_1f1gp_11", Pb = "_next_1f1gp_28", Db = "_headCell_1f1gp_38", Ob = "_webId_1f1gp_77", Hb = "_webPurpose_1f1gp_83", Fb = "_webMeta_1f1gp_91", jb = "_webUrgent_1f1gp_97", O = {
  row: Mb,
  cell: Bb,
  next: Pb,
  headCell: Db,
  webId: Ob,
  webPurpose: Hb,
  webMeta: Fb,
  webUrgent: jb
}, Wb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, zb = {
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
], Gb = Object.fromEntries(tt.map((e) => [e.key, e]));
function je({ column: e, children: a }) {
  const t = Gb[e];
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
function g$() {
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
function Ub({ cred: e }) {
  const a = Wb[e.state];
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ n(je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(je, { column: "id", children: e.id }),
    /* @__PURE__ */ n(je, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(je, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(je, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Kb({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function Vb({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Kb, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...zb[e.state] }) })
  ] });
}
function N$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Vb, { ...e }) : /* @__PURE__ */ n(Ub, { ...e });
}
const Yb = "_card_17zba_2", Xb = "_head_17zba_11", Jb = "_env_17zba_18", Qb = "_version_17zba_25", Zb = "_meta_17zba_32", ep = "_webCard_17zba_37", ap = "_webRow_17zba_47", np = "_webTitle_17zba_55", tp = "_webLine_17zba_65", rp = "_webVersion_17zba_72", lp = "_webMeta_17zba_77", z = {
  card: Yb,
  head: Xb,
  env: Jb,
  version: Qb,
  meta: Zb,
  webCard: ep,
  webRow: ap,
  webTitle: np,
  webLine: tp,
  webVersion: rp,
  webMeta: lp
}, rt = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function op({ env: e }) {
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
function ip(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [oe(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function cp(e) {
  return /* @__PURE__ */ o("article", { className: `${z.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${z.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${z.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...rt[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${z.version} ${z.webVersion} ${z.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${z.meta} ${z.webMeta} ${z.webLine} ward-cellmeta`, children: ip(e) })
  ] });
}
function y$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(cp, { ...e }) : /* @__PURE__ */ n(op, { ...e });
}
const sp = "_panel_1hmja_2", dp = "_line_1hmja_8", up = "_actions_1hmja_14", ra = {
  panel: sp,
  line: dp,
  actions: up
};
function k$(e) {
  return /* @__PURE__ */ o("div", { className: ra.panel, children: [
    /* @__PURE__ */ n("p", { className: ra.line, children: e.status }),
    /* @__PURE__ */ n(L, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ra.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ra.line, children: e.note ?? "" })
  ] });
}
const hp = "_upload_erepj_2", mp = "_preview_erepj_7", wp = "_mark_erepj_17", _p = "_empty_erepj_22", vp = "_actions_erepj_28", fp = "_input_erepj_33", bp = "_reasons_erepj_41", pp = "_reason_erepj_41", gp = "_accepted_erepj_57", ee = {
  upload: hp,
  preview: mp,
  mark: wp,
  empty: _p,
  actions: vp,
  input: fp,
  reasons: bp,
  reason: pp,
  accepted: gp
}, lt = 1.5, ot = 22, fa = "script elements or event handlers", Se = "links or external references", ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${lt}px at ${ot}px`], Np = [ye[1], ye[2], fa, Se], yp = /* @__PURE__ */ new Map([
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
]), kp = "http://www.w3.org/2000/svg", $p = "http://www.w3.org/2000/xmlns/", Cp = /* @__PURE__ */ new Set([
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
]), Sp = /* @__PURE__ */ new Set([
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
]), Rp = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, Tp = /url\s*\(|['"\\]/i;
function Ep() {
  return { ok: !1, reasons: [ye[1]] };
}
function it(e) {
  return e.namespaceURI === kp || e.namespaceURI === null;
}
function Lp(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && it(a) ? a : null;
  } catch {
    return null;
  }
}
function Ap(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [ye[0]] : [];
}
function xp(e) {
  return yp.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function qp(e) {
  return Tp.test(e.replace(Rp, ""));
}
function Ip(e) {
  return /^on/i.test(e.localName) ? fa : e.localName === "href" || qp(e.value) ? Se : void 0;
}
function Mp(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(xp(t));
    for (const r of Array.from(t.attributes)) a.add(Ip(r));
  }
  return Np.filter((t) => a.has(t));
}
function Bp(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? ot / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < lt;
  }) ? [ye[3]] : [];
}
function Pp(e) {
  if (e.namespaceURI === $p) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Sp.has(a) || a.startsWith("stroke"));
}
function Dp(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && it(a) && Cp.has(a.localName);
}
function Op(e, a) {
  Dp(a) ? a.nodeType === Node.ELEMENT_NODE && ct(a) : e.removeChild(a);
}
function ct(e) {
  for (const a of Array.from(e.attributes)) Pp(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) Op(e, a);
  return e;
}
function $$(e) {
  const a = Lp(e);
  if (a === null) return Ep();
  const t = [...Ap(a), ...Mp(a), ...Bp(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(ct(a)) };
}
const Hp = "Mark accepted.";
function Fp({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: ee.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: ee.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: ee.empty }) });
}
function jp(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Wp(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function zp({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: ee.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: ee.result, role: "status", children: /* @__PURE__ */ n("p", { className: ee.accepted, children: Hp }) }) : /* @__PURE__ */ n("div", { className: ee.result, role: "status", children: /* @__PURE__ */ n("ul", { className: ee.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: ee.reason, children: a }, a)) }) });
}
function Gp({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(zp, { result: e }) : /* @__PURE__ */ n("p", { className: `${ee.result} ${jp(e, t)}`, role: "status", children: Wp(e, t) });
}
function C$({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = N(null), [i, c] = g(null), d = (u) => {
    if (u === void 0) return;
    const s = a(u);
    s instanceof Promise ? s.then(c) : c(s);
  };
  return /* @__PURE__ */ o("div", { className: ee.upload, children: [
    /* @__PURE__ */ n(Fp, { current: e }),
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
    /* @__PURE__ */ n(Gp, { result: i, presentation: r })
  ] });
}
const Up = "_row_1wp9s_7", Kp = "_cell_1wp9s_11", Vp = "_head_1wp9s_28", Yp = "_name_1wp9s_34", Xp = "_pinned_1wp9s_42", Jp = "_headCell_1wp9s_49", Qp = "_webName_1wp9s_88", Zp = "_webMeta_1wp9s_95", eg = "_webWarn_1wp9s_103", q = {
  row: Up,
  cell: Kp,
  head: Vp,
  name: Yp,
  pinned: Xp,
  headCell: Jp,
  webName: Qp,
  webMeta: Zp,
  webWarn: eg
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
], ag = Object.fromEntries(st.map((e) => [e.key, e]));
function ng(e, a) {
  return `mcp.${e}.${a}`;
}
function tg(e) {
  return Object.keys(Xa).includes(e);
}
function rg(e) {
  return Xa[e !== void 0 && tg(e) ? e : "unknown"];
}
function Ye({ column: e, children: a }) {
  const t = ag[e];
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
function S$() {
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
function lg({ server: e }) {
  const a = Xa[e.connection];
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
    /* @__PURE__ */ n(Ye, { column: "tools", children: e.tools.map((t) => ng(e.name, t)).join(" · ") })
  ] });
}
function og(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function ig(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function cg({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function sg({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function dg({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function ug({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: og(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...ig(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(cg, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...rg(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n(sg, { server: e, onRestart: a }),
      /* @__PURE__ */ n(dg, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function R$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ug, { ...e }) : /* @__PURE__ */ n(lg, { ...e });
}
const hg = "_row_1h9nq_2", mg = "_headCell_1h9nq_14", wg = "_cell_1h9nq_15", _g = "_name_1h9nq_26", vg = "_consequence_1h9nq_32", fg = "_reason_1h9nq_38", bg = "_value_1h9nq_44", pg = "_webRow_1h9nq_60", gg = "_webSetting_1h9nq_71", Ng = "_webName_1h9nq_79", yg = "_webConsequence_1h9nq_87", kg = "_webControl_1h9nq_93", $g = "_webState_1h9nq_106", Cg = "_webChip_1h9nq_111", E = {
  row: hg,
  headCell: mg,
  cell: wg,
  name: _g,
  consequence: vg,
  reason: fg,
  value: bg,
  webRow: pg,
  webSetting: gg,
  webName: Ng,
  webConsequence: yg,
  webControl: kg,
  webState: $g,
  webChip: Cg
}, dt = 104, ut = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Sg({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(De, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(En, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: E.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Rg({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = k(), i = ut[t], c = t === "locked";
  return /* @__PURE__ */ o("tr", { className: E.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ n("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: E.cell, children: /* @__PURE__ */ n(Sg, { control: a, name: e.name, locked: c, describedBy: c ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: E.cell, style: { width: dt }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function ht(e, a) {
  return String(e ?? a);
}
function Tg(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Eg(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? ht(e.value, "—");
}
function Lg({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: E.webControl, children: [
    /* @__PURE__ */ n(De, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => l == null ? void 0 : l(c) }),
    /* @__PURE__ */ n("span", { className: E.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function Ag(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(Lg, { ...e });
  const l = Tg(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(En, { options: l, value: ht(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: Eg(a) });
}
function xg({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const c = k(), d = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: E.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: c, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: E.webControl, children: i(c) }) : /* @__PURE__ */ n(Ag, { control: a, name: e.name, locked: d, describedBy: d ? c : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${E.webChip} ward-policy-chip`, style: { width: dt }, children: /* @__PURE__ */ n(m, { ...ut[t], size: "tag" }) })
  ] });
}
function T$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(xg, { ...e }) : /* @__PURE__ */ n(Rg, { ...e });
}
const qg = "_label_1o9za_7", Ig = "_name_1o9za_15", Mg = "_column_1o9za_24", Bg = "_webFrame_1o9za_57", Pg = "_webHead_1o9za_62", Dg = "_webHeadLabel_1o9za_74", Og = "_webLabel_1o9za_112", Hg = "_webColumns_1o9za_119", Fg = "_webGroup_1o9za_125", jg = "_webPeople_1o9za_126", Wg = "_webVia_1o9za_127", zg = "_webMeta_1o9za_156", H = {
  label: qg,
  name: Ig,
  column: Mg,
  webFrame: Bg,
  webHead: Pg,
  webHeadLabel: Dg,
  webLabel: Og,
  webColumns: Hg,
  webGroup: Fg,
  webPeople: jg,
  webVia: Wg,
  webMeta: zg
}, Gg = {
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
function Ug(e) {
  if (!e.matrixRole) return;
  const a = Gg[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Kg({ node: e }) {
  const a = Ug(e);
  return /* @__PURE__ */ o("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(Vg, { role: a, node: e }),
    /* @__PURE__ */ n(xa, { column: Aa[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(xa, { column: Aa[1], children: e.people === void 0 ? "" : Q(e.people) }),
    /* @__PURE__ */ n(xa, { column: Aa[2], children: e.requestedVia ?? "" })
  ] });
}
function Vg({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Yg({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    In,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(Kg, { node: t }),
      children: c
    }
  );
}
function qa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Xg({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(qa, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(qa, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(qa, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Jg() {
  return /* @__PURE__ */ o("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function Qg({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Zg(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function eN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Jg, {}),
    /* @__PURE__ */ n(Zc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      In,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Qg, { row: t }),
        detail: /* @__PURE__ */ n(Xg, { row: t }),
        expanded: Zg(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function E$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(eN, { ...e }) : /* @__PURE__ */ n(Yg, { ...e });
}
const aN = "_runbook_b9agc_2", nN = "_list_b9agc_7", tN = "_step_b9agc_15", rN = "_numeral_b9agc_21", lN = "_body_b9agc_28", oN = "_head_b9agc_34", iN = "_title_b9agc_40", cN = "_detail_b9agc_45", sN = "_actions_b9agc_50", dN = "_webList_b9agc_56", uN = "_webStep_b9agc_60", hN = "_webBody_b9agc_66", mN = "_webTitle_b9agc_74", wN = "_webDetail_b9agc_78", S = {
  runbook: aN,
  list: nN,
  step: tN,
  numeral: rN,
  body: lN,
  head: oN,
  title: iN,
  detail: cN,
  actions: sN,
  webList: dN,
  webStep: uN,
  webBody: hN,
  webTitle: mN,
  webDetail: wN
}, mt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function wt(e) {
  return String(e + 1).padStart(2, "0");
}
function _N({ step: e, index: a, connection: t }) {
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
function vN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, l) => /* @__PURE__ */ n(_N, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function fN({ step: e, index: a, connection: t }) {
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
function bN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(fN, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function L$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(bN, { ...e }) : /* @__PURE__ */ n(vN, { ...e });
}
const pN = "_list_1gu6a_2", gN = "_check_1gu6a_10", NN = "_body_1gu6a_16", yN = "_text_1gu6a_23", kN = "_pending_1gu6a_32", $N = "_measured_1gu6a_37", ze = {
  list: pN,
  check: gN,
  body: NN,
  text: yN,
  pending: kN,
  measured: $N
};
function CN(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function SN({ check: e }) {
  const a = CN(e.passed);
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
function A$({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(SN, { check: a }, a.text)) });
}
const RN = "_root_16pdz_2", TN = "_list_16pdz_9", EN = "_line_16pdz_16", LN = "_at_16pdz_43", AN = "_text_16pdz_47", xN = "_foot_16pdz_51", qN = "_idle_16pdz_62", IN = "_caret_16pdz_69", MN = "_jump_16pdz_76", pe = {
  root: RN,
  list: TN,
  line: EN,
  at: LN,
  text: AN,
  foot: xN,
  idle: qN,
  caret: IN,
  jump: MN
}, BN = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Ja(e) {
  return Number.isNaN(Date.parse(e)) ? "" : BN.format(new Date(e));
}
const PN = { warn: "warning", ok: "ok" };
function DN({ kind: e }) {
  const a = PN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function ON({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Ja(e)}` });
}
function HN({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Ja(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${pe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${pe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: pe.idle, children: i }),
    /* @__PURE__ */ n(ON, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function x$({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
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
      /* @__PURE__ */ n(DN, { kind: s.kind }),
      /* @__PURE__ */ n("span", { className: pe.text, "data-consline-text": !0, tabIndex: -1, children: s.text })
    ] }, `${s.at}-${h}`)) }),
    /* @__PURE__ */ n(HN, { connection: a, idleSince: t, last: d, children: /* @__PURE__ */ n("button", { type: "button", className: `${pe.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const FN = "_row_11jhe_2", jN = "_head_11jhe_14", WN = "_author_11jhe_20", zN = "_eta_11jhe_25", GN = "_edited_11jhe_26", UN = "_body_11jhe_32", KN = "_reason_11jhe_37", VN = "_actions_11jhe_42", fe = {
  row: FN,
  head: jN,
  author: WN,
  eta: zN,
  edited: GN,
  body: UN,
  reason: KN,
  actions: VN
}, YN = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function XN(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function JN({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function QN({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: fe.reason, id: a, children: e })
  ] });
}
function ZN(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function ey(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(JN, { ...e }) : /* @__PURE__ */ n(QN, { reason: e.unavailable, reasonId: e.unavailableId });
}
function q$(e) {
  const { comment: a } = e;
  ZN(e);
  const t = k(), r = `${t}-unavailable`, l = YN[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${fe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: fe.head, children: [
      /* @__PURE__ */ n("span", { className: fe.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: fe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: fe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: fe.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: fe.reason, id: t, children: XN(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: fe.actions, children: /* @__PURE__ */ n(ey, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const ay = "_root_c46wj_2", ny = "_attach_c46wj_11", ty = "_actions_c46wj_17", ry = "_reply_c46wj_23", ly = "_replyRow_c46wj_28", oy = "_sendsAs_c46wj_42", Ue = {
  root: ay,
  attach: ny,
  actions: ty,
  reply: ry,
  replyRow: ly,
  sendsAs: oy
};
function iy({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = g(""), i = k();
  return /* @__PURE__ */ o("div", { className: Ue.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ue.replyRow, children: [
      /* @__PURE__ */ n(L, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ue.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function I$(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(iy, { ...e }) : /* @__PURE__ */ n(cy, { ...e });
}
function cy({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
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
const sy = "_list_1ih9e_2", dy = "_item_1ih9e_6", uy = "_body_1ih9e_22", hy = "_text_1ih9e_28", my = "_evidence_1ih9e_37", wy = "_consequence_1ih9e_49", _y = "_note_1ih9e_54", Pe = {
  list: sy,
  item: dy,
  body: uy,
  text: hy,
  evidence: my,
  consequence: wy,
  note: _y
};
function vy({ criterion: e }) {
  return /* @__PURE__ */ n(Le, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function pn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function fy(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function by({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Pe.body, children: [
    /* @__PURE__ */ n("span", { className: Pe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ n(pn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Pe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ n(pn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Pe.consequence, children: fy(e.why) })
    ] })
  ] });
}
function py({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Pe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(vy, { criterion: e }),
    /* @__PURE__ */ n(by, { criterion: e })
  ] });
}
function M$({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(py, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Pe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const gy = "_list_dwhoz_2", Ny = "_rung_dwhoz_6", yy = "_name_dwhoz_18", ky = "_actor_dwhoz_32", ia = {
  list: gy,
  rung: Ny,
  name: yy,
  actor: ky
}, $y = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function Cy({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = $y[e.state];
  return /* @__PURE__ */ o("li", { className: ia.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ia.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ia.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function B$({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ia.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(Cy, { rung: a }, a.name)) });
}
const Sy = "_sheet_1fqco_2", Ry = "_title_1fqco_9", Ty = "_stage_1fqco_15", Ey = "_effects_1fqco_20", Ly = "_effect_1fqco_20", Ay = "_numeral_1fqco_31", xy = "_effectText_1fqco_38", qy = "_refusals_1fqco_43", Iy = "_reasons_1fqco_52", My = "_reason_1fqco_52", By = "_actions_1fqco_62", de = {
  sheet: Sy,
  title: Ry,
  stage: Ty,
  effects: Ey,
  effect: Ly,
  numeral: Ay,
  effectText: xy,
  refusals: qy,
  reasons: Iy,
  reason: My,
  actions: By
};
function Py({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function P$({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: c }) {
  const d = k(), u = `${d}-refusal`, [s, h] = g(""), _ = t.length > 0;
  return /* @__PURE__ */ n(ea, { kind: "sheet", labelledBy: d, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ o("div", { className: de.sheet, children: [
    /* @__PURE__ */ o("h2", { className: de.title, id: d, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: de.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: de.effects, children: a.map((b, x) => /* @__PURE__ */ o("li", { className: de.effect, children: [
      /* @__PURE__ */ n("span", { className: de.numeral, children: String(x + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: de.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      zi,
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
      /* @__PURE__ */ n("ul", { className: de.reasons, children: t.map((b, x) => /* @__PURE__ */ n("li", { className: de.reason, id: x === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: de.actions, children: [
      /* @__PURE__ */ n(Py, { refused: _, reasonId: u, note: s, onRequeue: l }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const Dy = "_list_1hvqu_2", Oy = "_path_1hvqu_7", Hy = "_head_1hvqu_21", Fy = "_label_1hvqu_28", jy = "_consequence_1hvqu_35", Wy = "_ask_1hvqu_36", Ge = {
  list: Dy,
  path: Oy,
  head: Hy,
  label: Fy,
  consequence: jy,
  ask: Wy
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
function zy({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: Nn(a), size: "sm", onClick: () => t(e.kind), children: Ha[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ n(v, { variant: Nn(a), size: "sm", disabled: !0, describedBy: r, children: Ha[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ge.ask, id: r, children: e.askInstead })
  ] });
}
function Gy({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ge.path, "data-allowed": e.allowed, "data-role": gn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ge.head, children: [
      /* @__PURE__ */ n("span", { className: Ge.label, children: e.title ?? Ha[e.kind] }),
      /* @__PURE__ */ n(m, { role: gn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ge.consequence, children: e.consequence }),
    /* @__PURE__ */ n(zy, { path: e, primary: a, onChoose: t })
  ] });
}
function D$({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ge.list, children: e.map((t, r) => /* @__PURE__ */ n(Gy, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const Uy = "_list_qjv4r_2", Ky = "_item_qjv4r_6", Vy = "_node_qjv4r_18", Yy = "_body_qjv4r_24", Xy = "_head_qjv4r_30", Jy = "_stage_qjv4r_36", Qy = "_version_qjv4r_41", Zy = "_sentence_qjv4r_49", ek = "_meta_qjv4r_54", ge = {
  list: Uy,
  item: Ky,
  node: Vy,
  body: Yy,
  head: Xy,
  stage: Jy,
  version: Qy,
  sentence: Zy,
  meta: ek
}, ak = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function nk({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function tk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(Le, { size: 9, kind: ak[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(nk, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${oe(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ae(e.cost)}`
      ] })
    ] })
  ] });
}
function O$({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(tk, { entry: a }, a.stage + String(t))) });
}
const rk = "_thread_1kn6s_3", lk = "_turn_1kn6s_8", ok = "_who_1kn6s_27", ik = "_body_1kn6s_32", ca = {
  thread: rk,
  turn: lk,
  who: ok,
  body: ik
}, _t = Ve(!1);
function H$({ children: e, density: a }) {
  return /* @__PURE__ */ n(_t.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ca.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function F$({ turn: e }) {
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
const ck = "_list_1rt9c_3", sk = "_row_1rt9c_7", dk = "_label_1rt9c_20", uk = "_n_1rt9c_26", hk = "_cause_1rt9c_33", Qe = {
  list: ck,
  row: sk,
  label: dk,
  n: uk,
  cause: hk
};
function mk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const wk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function _k({ row: e, formatNumber: a }) {
  return mk(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Le, { size: 8, ...wk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(vk, { cause: e.cause })
  ] });
}
function vk({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function j$({ rows: e, formatNumber: a = Q }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(_k, { row: t, formatNumber: a }, t.label)) });
}
const fk = "_root_1jxwp_2", bk = {
  root: fk
};
function W$({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: bk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Sa, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(v, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const pk = "_row_dhbre_3", gk = "_key_dhbre_13", Nk = "_stack_dhbre_24", yk = "_value_dhbre_32", kk = "_evidence_dhbre_39", $k = "_mark_dhbre_47", We = {
  row: pk,
  key: gk,
  stack: Nk,
  value: yk,
  evidence: kk,
  mark: $k
};
function Ck({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ga, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function z$({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${We.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${We.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${We.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${We.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${We.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${We.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(Ck, { state: e.state }) })
  ] });
}
const Sk = "_cell_1monp_2", Rk = {
  cell: Sk
}, Tk = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Ek(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function Lk(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function Ak(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Ek(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function xk(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function G$({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  Lk(e, t);
  const r = xk(e);
  return /* @__PURE__ */ n(
    rc,
    {
      label: "Rejection routing",
      columns: Tk,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: Rk.cell, "data-norerun": l.noRerun ? !0 : void 0, children: Ak(l, i) }),
      empty: a ?? /* @__PURE__ */ n(Is, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const qk = "_row_ute8v_2", Ik = "_title_ute8v_11", Mk = "_turns_ute8v_20", Bk = "_waiting_ute8v_21", Pk = "_resolved_ute8v_22", Dk = "_activity_ute8v_23", Ok = "_cost_ute8v_29", Hk = "_link_ute8v_30", Fk = "_tableRow_ute8v_47", jk = "_tableTitle_ute8v_59", Wk = "_tableResolved_ute8v_64", zk = "_tableLink_ute8v_68", Gk = "_tableMeta_ute8v_83", Uk = "_tableCost_ute8v_90", Kk = "_tableActivity_ute8v_91", Vk = "_tableState_ute8v_101", Yk = "_tableRecord_ute8v_112", B = {
  row: qk,
  title: Ik,
  turns: Mk,
  waiting: Bk,
  resolved: Pk,
  activity: Dk,
  cost: Ok,
  link: Hk,
  tableRow: Fk,
  tableTitle: jk,
  tableResolved: Wk,
  tableLink: zk,
  tableMeta: Gk,
  tableCost: Uk,
  tableActivity: Kk,
  tableState: Vk,
  tableRecord: Yk
}, vt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function Xk(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function Jk(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Qk(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const Zk = { duplicate: "CLOSED · DUPLICATE" };
function e1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function a1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : ae(e) });
}
function n1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: F(e.href), children: `→ ${e.key}` });
}
function t1({ session: e, href: a }) {
  const t = vt[e.state];
  return /* @__PURE__ */ o("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: F(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: Jk(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: B.tableResolved, children: [
      Qk(e.resolved),
      /* @__PURE__ */ n(e1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(a1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: Xk(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: Zk[e.state] ?? t.label }),
      /* @__PURE__ */ n(n1, { link: e.link })
    ] }) })
  ] });
}
function r1({ session: e }) {
  const a = vt[e.state];
  return /* @__PURE__ */ o("div", { className: B.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: B.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: B.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: B.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: B.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: B.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ae(e.cost) }),
    /* @__PURE__ */ n("span", { className: B.activity, children: oe(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: B.link, href: F(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function U$(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(t1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(r1, { session: e.session });
}
const l1 = "_block_1yy2v_3", o1 = "_list_1yy2v_9", i1 = "_line_1yy2v_14", Fa = {
  block: l1,
  list: o1,
  line: i1
}, c1 = { warn: "warning", ok: "ok" };
function s1({ kind: e }) {
  const a = c1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function d1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Fa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(s1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function K$({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Fa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Fa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(d1, { line: t }, `${r}-${t.text}`)) }) });
}
const u1 = "_band_tt7hp_1", h1 = "_head_tt7hp_8", m1 = "_cell_tt7hp_19", w1 = "_index_tt7hp_35", _1 = "_title_tt7hp_42", v1 = "_note_tt7hp_48", f1 = "_cellTitle_tt7hp_53", b1 = "_cellBody_tt7hp_58", p1 = "_tag_tt7hp_64", ve = {
  band: u1,
  head: h1,
  cell: m1,
  index: w1,
  title: _1,
  note: v1,
  cellTitle: f1,
  cellBody: b1,
  tag: p1
}, yn = 4;
function V$({ index: e, title: a, note: t, cells: r }) {
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
  x$ as ActivityConsole,
  Kh as AgentCard,
  x1 as AppShell,
  f$ as AppearanceStrip,
  V$ as Band,
  P1 as BarChart,
  _d as BoardColumn,
  J1 as BoardFootnote,
  Q1 as BoardHeader,
  z1 as BoardScroller,
  v as Btn,
  T1 as CHIP_ROLES,
  tt as CREDENTIAL_COLUMNS,
  B1 as Callout,
  b$ as CapabilityRow,
  F$ as ChatMessage,
  Rn as Checkbox,
  m as Chip,
  q$ as ClarificationRow,
  c$ as ClauseRuleRow,
  i$ as ClauseRules,
  Hn as ColourLadder,
  p$ as ComponentRow,
  I$ as Composer,
  e$ as ConfigRow,
  Z1 as ConfigRowHead,
  Ua as ConnectionMark,
  H$ as Conversation,
  zi as CostMeter,
  N$ as CredentialRow,
  g$ as CredentialRowHead,
  M$ as CriteriaList,
  el as Crumb,
  j$ as DeliveryHealth,
  U1 as DeniedState,
  s$ as DryRunRail,
  Is as EmptyState,
  y$ as EnvCard,
  L as Field,
  G1 as FilteredEmpty,
  j1 as FormStack,
  Sa as GateChecklist,
  B$ as GateLadder,
  rc as Grid,
  u$ as HandoffRuleRow,
  d$ as HandoffRules,
  a$ as ItemDrawer,
  k$ as KeyPanel,
  qt as LIVE_EVENT_TYPES,
  _h as LegacyBoardColumn,
  t$ as LegacyBoardHeader,
  r$ as LegacyConfigRow,
  o$ as LegacyItemDrawer,
  ch as LegacyOverCapNote,
  l$ as LegacyPreviewRail,
  Pn as LegacyWorkCard,
  ke as LiveIndicator,
  K1 as LoadFailed,
  X1 as Loading,
  st as MCP_SERVER_COLUMNS,
  Ga as Mark,
  C$ as MarkUpload,
  Le as Marker,
  R$ as McpServerRow,
  S$ as McpServerRowHead,
  h$ as NewStreamModal,
  Ps as OverCapNote,
  ea as Overlay,
  km as PARTIAL_STEP_REASON,
  dt as POLICY_CHIP_WIDTH,
  O1 as PageFrame,
  M1 as PageHeader,
  T$ as PolicyRow,
  n$ as PreviewRail,
  Aa as ROLE_MATRIX_COLUMNS,
  Qn as RULE_ACTIONS,
  xn as Radio,
  W$ as ReadyChecklist,
  F1 as RecordSection,
  P$ as RequeueSheet,
  D$ as ResolveBlock,
  z$ as ResolvedFieldRow,
  E$ as RoleMatrixRow,
  G$ as RoutingTable,
  m$ as RuleRow,
  L$ as RunbookSteps,
  At as STREAM_STEPS,
  W1 as SectionBand,
  Nc as SectionHeader,
  En as SegmentedControl,
  U$ as SessionRow,
  I1 as Sidebar,
  w$ as StageColumn,
  O$ as StageHistory,
  S_ as StageListEditor,
  V1 as StaleStrip,
  ka as StatStrip,
  _$ as StreamRow,
  H1 as SubjectRail,
  De as Switch,
  q1 as Tabs,
  v$ as ToolRow,
  D1 as TopBar,
  Zc as Tree,
  In as TreeRow,
  K$ as TypedInputBlock,
  hr as UNSAFE_HREF,
  A$ as ValidationList,
  k1 as VisibilityProvider,
  $1 as Visible,
  R1 as WARD_VERSION,
  Ca as WorkCard,
  Y1 as WriteUnavailableStrip,
  Xk as agoSince,
  kt as clock,
  W_ as colourStatus,
  Q as count,
  le as duration,
  ja as elapsed,
  S1 as eventSourceTransport,
  pa as isStreamStep,
  ga as isValidatedStreamStep,
  $m as ladderValidation,
  rg as mcpConnectionChip,
  ng as mcpToolName,
  ae as money,
  me as ms,
  Mn as ordered,
  $n as ratio,
  Ab as restartLabel,
  F as safeHref,
  oe as stamp,
  Sn as stream,
  L1 as streamChip,
  ya as streamChipProps,
  Ee as streamColour,
  Mt as streamHex,
  E1 as streamVars,
  la as useBorderFlash,
  Tt as useFocusTrap,
  A1 as useLiveFeed,
  C1 as useReturnFocus,
  ba as useRovingTabindex,
  Wa as useTicker,
  $t as useVisible,
  W as v,
  $$ as validateMark,
  Na as validatedStep,
  xt as validatedStreamSteps
};
