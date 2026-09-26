import { jsx as n, Fragment as B, jsxs as o } from "react/jsx-runtime";
import { useMemo as et, useContext as je, createContext as We, useCallback as z, useEffect as L, useState as g, useRef as N, useLayoutEffect as at, useId as $, Fragment as nt } from "react";
import { createPortal as tt } from "react-dom";
function ne(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const Fa = (e) => String(e).padStart(2, "0");
function xa(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${Fa(a % 60)}s` : `${Math.floor(t / 60)}h ${Fa(t % 60)}m`;
}
const rt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function te(e) {
  const a = rt.formatToParts(new Date(e)), t = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function Y(e) {
  return e > 0 && e < 5e-3 ? "<$0.01" : e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function X(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function un(e, a) {
  return `${e} / ${a}`;
}
const lt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function ot(e) {
  return lt.format(new Date(e));
}
const mn = We(/* @__PURE__ */ new Set());
function By({ hidden: e, children: a }) {
  const t = et(() => new Set(e), [e]);
  return /* @__PURE__ */ n(mn.Provider, { value: t, children: a });
}
function it(e) {
  return !je(mn).has(e);
}
function Dy({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(B, { children: it(e) ? a : t });
}
const ct = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function st(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function dt(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = st(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function ut(e) {
  return { onKeyDown: z(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(ct));
      dt(t, e.current, r);
    },
    [e]
  ) };
}
function Py(e, a = !0) {
  L(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const ja = { ArrowUp: -1, ArrowDown: 1 }, Wa = { ArrowLeft: -1, ArrowRight: 1 }, mt = (e, a, t) => Math.min(t, Math.max(a, e));
function ht(e, a) {
  if (a !== "horizontal" && e in ja) return ja[e];
  if (a !== "vertical" && e in Wa) return Wa[e];
}
function ma({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), l = N(!1);
  at(() => {
    var b;
    const s = Array.from(r.current.keys());
    if (s.length === 0 || s.includes(a)) return;
    const m = s[0], _ = l.current;
    l.current = !1, t(m), _ && ((b = r.current.get(m)) == null || b.focus());
  });
  const i = z((s) => t(s), []), c = z((s) => {
    var m;
    t(s), (m = r.current.get(s)) == null || m.focus();
  }, []), d = z(
    (s) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const _ = Math.max(0, m.indexOf(a)), b = ht(s.key, e);
      b !== void 0 ? (s.preventDefault(), c(m[mt(_ + b, 0, m.length - 1)])) : s.key === "Home" ? (s.preventDefault(), c(m[0])) : s.key === "End" && (s.preventDefault(), c(m[m.length - 1]));
    },
    [a, c, e]
  ), u = z(
    (s) => ({
      tabIndex: s === a ? 0 : -1,
      ref: (m) => {
        m ? r.current.set(s, m) : (r.current.delete(s), s === a && (l.current = !0));
      },
      onFocus: () => t(s),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: d }, itemProps: u, setActive: i };
}
const Oy = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, Hy = "0.2.0", Fy = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], wt = [1, 2, 3, 4, 5, 6], _t = [1, 2, 3], vt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], H = {
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
function hn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ye(e) {
  return wt.includes(e);
}
function Ea(e) {
  return _t.includes(e);
}
function jy(e) {
  if (!Ye(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function ft(e) {
  if (!Ye(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
function za(e) {
  return typeof e != "string" ? null : vt.includes(e) ? e : null;
}
function bt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function pt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function gt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Nt(e, a, t) {
  const r = bt(e);
  if (r === null) return null;
  const l = za(t) ?? za(r.type);
  return l === null ? null : { ...r, type: l, id: pt(r, a), at: gt(r) };
}
function yt(e, a) {
  return e >= de.staleAfter ? "stale" : e >= de.heartbeat && a === "live" ? "reconnecting" : null;
}
function kt(e, a, t) {
  return e >= de.heartbeat && !a && t !== null;
}
function Wy(e, a) {
  const [t, r] = g("reconnecting"), [l, i] = g(null), c = N(/* @__PURE__ */ new Map()), d = N(0), u = N(""), s = N(0), m = N(null), _ = N(0), b = N(0), D = N(!1), Q = N("reconnecting"), Z = z((k) => {
    Q.current = k, r(k);
  }, []), re = z(() => {
    d.current = Date.now();
  }, []), Ee = z((k) => {
    for (const [F, me] of c.current)
      (me === "*" || k.itemKey === me) && F(k);
  }, []), le = z(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (k, F, me) => {
        const $e = Nt(k, F, me);
        $e !== null && ($e.id && (u.current = $e.id), re(), D.current = !1, Z("live"), i($e.at), Ee($e));
      },
      onOpen: () => {
        s.current = 0, D.current = !1, re(), Z("live");
      },
      onError: () => {
        var F;
        (F = m.current) == null || F.close(), m.current = null, D.current = !0, Q.current !== "stale" && Z("reconnecting");
        const k = Math.min(de.reconnectBase * 2 ** s.current, de.reconnectMax);
        s.current += 1, _.current = window.setTimeout(le, k);
      }
    });
  }, [Ee, Z, re, a, e]), Ie = z((k) => {
    D.current = !0, k.close(), m.current = null, _.current = window.setTimeout(le, de.reconnectBase);
  }, [le]), qe = z((k, F) => (c.current.set(F, k), () => {
    c.current.delete(F);
  }), []);
  return L(() => (le(), b.current = window.setInterval(() => {
    const k = Date.now() - d.current, F = yt(k, Q.current);
    F && Z(F);
    const me = m.current;
    kt(k, D.current, me) && Ie(me);
  }, de.tick), () => {
    var k;
    window.clearInterval(b.current), window.clearTimeout(_.current), D.current = !1, (k = m.current) == null || k.close(), m.current = null;
  }), [le, Ie, Z]), { connection: t, lastEventAt: l, subscribe: qe };
}
function Ia(e, a) {
  const t = new Date(e).getTime(), [r, l] = g(() => Date.now());
  return L(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const c = window.setInterval(i, de.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(c), document.removeEventListener("visibilitychange", i);
    };
  }, [a, t]), Math.max(0, r - t);
}
function $t() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ga(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ea(e, a) {
  const t = N(0), r = z((l) => {
    const i = l ?? a, c = e.current;
    c !== null && i !== void 0 && ($t() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => Ga(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => Ga(c), de.flash)));
  }, [a, e]);
  return L(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Ct = "_root_1otpc_2", St = {
  root: Ct
};
function Rt(e, a, t, r, l) {
  const i = [xa(a)];
  return e || i.push(`as of ${ot(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Ia(e, l), c = (a == null ? void 0 : a.at) ?? e, d = Rt(l, i, c, r, a);
  return /* @__PURE__ */ o("span", { className: `${St.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: d.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      te(e)
    ] })
  ] });
}
const Tt = "_app_lrbcc_1", Lt = "_side_lrbcc_18", At = "_main_lrbcc_26", xt = "_rail_lrbcc_33", Et = "_page_lrbcc_40", It = "_root_lrbcc_91", qt = "_topbar_lrbcc_98", Mt = "_mark_lrbcc_109", Bt = "_brand_lrbcc_116", Dt = "_tagline_lrbcc_122", Pt = "_identity_lrbcc_128", Ot = "_tools_lrbcc_129", Ht = "_actor_lrbcc_138", Ft = "_metadata_lrbcc_139", jt = "_detail_lrbcc_155", Wt = "_nav_lrbcc_160", zt = "_content_lrbcc_195", Gt = "_skip_lrbcc_218", M = {
  app: Tt,
  side: Lt,
  main: At,
  rail: xt,
  page: Et,
  root: It,
  topbar: qt,
  mark: Mt,
  brand: Bt,
  tagline: Dt,
  identity: Pt,
  tools: Ot,
  actor: Ht,
  metadata: Ft,
  detail: jt,
  nav: Wt,
  content: zt,
  skip: Gt
};
function Kt({ sidebar: e, header: a, children: t, rail: r }) {
  const l = r != null;
  return /* @__PURE__ */ o("div", { className: M.app, "data-rail": l ? "true" : "false", children: [
    /* @__PURE__ */ n("div", { className: M.side, children: e }),
    /* @__PURE__ */ o("main", { className: M.main, children: [
      a,
      /* @__PURE__ */ n("div", { className: M.page, children: t })
    ] }),
    l && /* @__PURE__ */ n("div", { className: M.rail, children: r })
  ] });
}
function Ut({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: M.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function ra({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Vt({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(ra, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(ra, { value: a, className: M.detail })
  ] });
}
function Yt(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ n("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(ra, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ n(Ut, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(Vt, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(ra, { value: e.tools, className: M.tools })
  ] });
}
function Jt(e) {
  const a = $();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Yt, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function Xt(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function zy(e) {
  return Xt(e) ? /* @__PURE__ */ n(Kt, { ...e }) : /* @__PURE__ */ n(Jt, { ...e });
}
const Qt = "_btn_llheq_2", Zt = "_primary_llheq_13", er = "_secondary_llheq_23", ar = "_ghost_llheq_28", nr = "_overflow_llheq_37", tr = "_sm_llheq_44", rr = "_disabled_llheq_48", Xe = {
  btn: Qt,
  primary: Zt,
  secondary: er,
  ghost: ar,
  overflow: nr,
  sm: tr,
  disabled: rr
};
function lr(e, a, t, r) {
  const l = a === "sm" ? [Xe.sm, "ward-btn--sm"] : [], i = t ? [Xe.disabled] : [];
  return [Xe.btn, Xe[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function or(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function ir(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function cr(e) {
  return e.children ?? e.label;
}
function v(e) {
  ir(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: lr(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...or(a, e.controls),
      children: cr(e)
    }
  );
}
function qa(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const sr = "_root_o4yib_2", dr = "_row_o4yib_8", ur = "_box_o4yib_14", mr = "_label_o4yib_21", hr = "_lockedNote_o4yib_26", wr = "_consequence_o4yib_34", _r = "_sample_o4yib_69", Se = {
  root: sr,
  row: dr,
  box: ur,
  label: mr,
  lockedNote: hr,
  consequence: wr,
  sample: _r
};
function vr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function fr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Se.consequence} ward-check-consequence`, children: a }) : null;
}
function br({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Se.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function pr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Se.sample, "aria-hidden": "true", children: e }) : null;
}
function wn(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = vr(e);
  return /* @__PURE__ */ o("div", { className: `${Se.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: Se.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Se.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, l.target.checked));
          },
          "aria-describedby": qa(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: Se.label, children: [
        e.label,
        /* @__PURE__ */ n(br, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(pr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(fr, { id: t, text: e.consequence })
  ] });
}
const gr = "_chip_1073r_2", Nr = {
  chip: gr
}, yr = {
  gate: H.chip.gate,
  system: H.chip.system,
  write: H.chip.write,
  drift: H.chip.drift,
  done: H.chip.done,
  attention: H.chip.attention,
  failed: H.chip.failed,
  pending: H.chip.pending,
  running: H.chip.running,
  warn: H.chip.warn,
  meta: H.chip.meta,
  soft: H.chip.soft,
  quiet: H.chip.quiet
};
function kr(e, a) {
  if (e === "stream") return $r(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = yr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function $r(e) {
  if (!e || !Ea(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = hn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Nr.chip} ward-chip ward-chip--${e}`, style: kr(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
const Cr = "_nav_fbsei_2", Sr = "_list_fbsei_8", Rr = "_item_fbsei_15", Tr = "_link_fbsei_24", Lr = "_current_fbsei_33", Ar = "_chips_fbsei_37", Me = {
  nav: Cr,
  list: Sr,
  item: Rr,
  link: Tr,
  current: Lr,
  chips: Ar
};
function xr({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((t, r) => /* @__PURE__ */ n("li", { className: Me.item, children: r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Me.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", children: t.label }) }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Me.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] }) });
}
const Er = "_field_1oadv_2", Ir = "_label_1oadv_8", qr = "_labelHidden_1oadv_15", Mr = "_control_1oadv_25", Br = "_mono_1oadv_44", Dr = "_area_1oadv_49", Pr = "_invalid_1oadv_56", ke = {
  field: Er,
  label: Ir,
  labelHidden: qr,
  control: Mr,
  mono: Br,
  area: Dr,
  invalid: Pr
};
function Or({ controlProps: e, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, ...e });
}
function Hr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Fr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const jr = { input: Or, select: Hr, textarea: Fr };
function Wr(e, a, t) {
  const r = jr[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function zr(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": qa(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function Gr(e) {
  const a = e.mono ? [ke.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [ke.area] : [];
  return [ke.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Kr(e) {
  return e ? `${ke.label} ${ke.labelHidden} ward-field-label` : `${ke.label} ward-field-label`;
}
function T(e) {
  const a = $(), t = `${a}-msg`, r = zr(e, a, t), l = Gr(e);
  return /* @__PURE__ */ o("div", { className: `${ke.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Kr(e.labelHidden), htmlFor: a, children: e.label }),
    Wr(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${ke.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Ur = "_strip_rg8pj_2", Vr = "_tab_rg8pj_12", Yr = "_count_rg8pj_34", $a = {
  strip: Ur,
  tab: Vr,
  count: Yr
}, Ka = 7;
function Jr(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Xr(e) {
  return `${$a.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function Gy({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > Ka) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Ka} — the set is fixed`);
  const i = ma({ orientation: "horizontal" }), c = Jr(e, a);
  return L(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: Xr(l),
      role: "tablist",
      "aria-label": r,
      "data-level": l,
      ...i.containerProps,
      children: e.map((d, u) => /* @__PURE__ */ o(
        "button",
        {
          id: `tab-${d.id}`,
          type: "button",
          role: "tab",
          className: `${$a.tab} ward-tab`,
          "aria-selected": d.id === a,
          "aria-controls": `panel-${d.id}`,
          onClick: () => t(d.id),
          ...i.itemProps(u),
          children: [
            d.label,
            d.count === void 0 ? null : /* @__PURE__ */ o(B, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: $a.count, children: `· ${d.count}` })
            ] })
          ]
        },
        d.id
      ))
    }
  );
}
const Qr = "_root_jem6y_2", Zr = "_segment_jem6y_7", Ua = {
  root: Qr,
  segment: Zr
};
function _n({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = ma({ orientation: "horizontal" }), d = Math.max(0, e.findIndex((u) => u.value === a));
  return L(() => c.setActive(d), [c.setActive, d]), /* @__PURE__ */ n("div", { className: `${Ua.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, s) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Ua.segment,
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
const el = "_sidebar_1jywv_3", al = "_brand_1jywv_9", nl = "_mark_1jywv_17", tl = "_word_1jywv_24", rl = "_nav_1jywv_30", ll = "_navItem_1jywv_38", ol = "_group_1jywv_50", il = "_groupName_1jywv_57", cl = "_agents_1jywv_70", sl = "_agent_1jywv_70", dl = "_agentTop_1jywv_88", ul = "_dot_1jywv_95", ml = "_agentName_1jywv_107", hl = "_agentMeta_1jywv_120", wl = "_foot_1jywv_126", _l = "_footName_1jywv_132", vl = "_footLinks_1jywv_139", fl = "_footLink_1jywv_139", bl = "_root_1jywv_153", pl = "_linkBrand_1jywv_162", gl = "_label_1jywv_183", Nl = "_note_1jywv_188", yl = "_footer_1jywv_202", C = {
  sidebar: el,
  brand: al,
  mark: nl,
  word: tl,
  nav: rl,
  navItem: ll,
  group: ol,
  groupName: il,
  new: "_new_1jywv_64",
  agents: cl,
  agent: sl,
  agentTop: dl,
  dot: ul,
  agentName: ml,
  agentMeta: hl,
  foot: wl,
  footName: _l,
  footLinks: vl,
  footLink: fl,
  root: bl,
  linkBrand: pl,
  label: gl,
  note: Nl,
  footer: yl
};
function kl({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: C.agent,
      href: e.href,
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: C.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: C.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": hn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function $l({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function Cl({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: C.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: C.brand, children: [
      /* @__PURE__ */ n("span", { className: C.mark }),
      /* @__PURE__ */ n("span", { className: C.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: C.nav, children: a.map((c) => /* @__PURE__ */ n("a", { className: C.navItem, href: c.href, "aria-current": c.current === !0 ? "page" : void 0, children: c.label }, c.href)) }),
    /* @__PURE__ */ o("div", { className: C.group, children: [
      /* @__PURE__ */ o("span", { className: C.groupName, children: [
        t,
        " · ",
        X(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: C.new, href: l.href, children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(kl, { agent: c }, c.href)) }),
    /* @__PURE__ */ n($l, { shared: i })
  ] });
}
function Sl(e) {
  return e.destinations ?? e.items ?? [];
}
function Rl({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function Tl({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function Ll({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Al(e) {
  return /* @__PURE__ */ o("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Rl, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Sl(e).map((a) => /* @__PURE__ */ n(Ll, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(Tl, { children: e.children })
  ] });
}
function xl(e) {
  return "agents" in e;
}
function Ky(e) {
  return xl(e) ? /* @__PURE__ */ n(Cl, { ...e }) : /* @__PURE__ */ n(Al, { ...e });
}
const El = "_mark_wlgi8_3", Il = {
  mark: El
}, ql = { met: "✓", unmet: "", failed: "✕" };
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
      children: ql[e]
    }
  );
}
const Ml = "_marker_br9fi_2", Bl = {
  marker: Ml
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
function xe({ size: e, kind: a, label: t }) {
  const r = { "--marker": Dl[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Bl.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Pl = "_root_ti0pq_2", Ol = "_chip_ti0pq_11", Hl = "_noCase_ti0pq_23", Qe = {
  root: Pl,
  chip: Ol,
  noCase: Hl
};
function Fl(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Ba({ connection: e, since: a, lastEventAt: t }) {
  const r = Fl(a, t), l = Ia(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${Qe.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(xe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: Qe.noCase, children: xa(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    te(r)
  ] });
}
const jl = "_root_11rs7_2", Wl = "_context_11rs7_12", zl = "_row_11rs7_1", Gl = "_heading_11rs7_25", Kl = "_headingWrap_11rs7_33", Ul = "_chips_11rs7_38", Vl = "_title_11rs7_45", Yl = "_consequence_11rs7_54", Jl = "_actionsWrap_11rs7_59", Xl = "_actions_11rs7_59", Ql = "_action_11rs7_59", Zl = "_overflowPanel_11rs7_78", eo = "_measure_11rs7_88", U = {
  root: jl,
  context: Wl,
  row: zl,
  heading: Gl,
  headingWrap: Kl,
  chips: Ul,
  title: Vl,
  consequence: Yl,
  actionsWrap: Jl,
  actions: Xl,
  action: Ql,
  overflowPanel: Zl,
  measure: eo
};
function ao({ title: e, consequence: a }) {
  return /* @__PURE__ */ o("div", { className: U.heading, children: [
    /* @__PURE__ */ n("h1", { className: U.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: U.consequence, children: a })
  ] });
}
function vn({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: a }, t));
}
function no({ actions: e, collapsed: a, onOverflow: t, disclosure: r }) {
  return a ? t ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: t, children: "···" }) : /* @__PURE__ */ n(v, { variant: "overflow", onClick: r.toggle, expanded: r.open, controls: r.panelId, children: "···" }) : /* @__PURE__ */ n(vn, { actions: e });
}
function to({ actions: e, disclosure: a, onEscape: t }) {
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(vn, { actions: e }) });
}
function ro(e, a) {
  const t = $(), [r, l] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, s;
    l(!1), (s = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || s.focus();
  } };
}
function lo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: U.context, children: [
    /* @__PURE__ */ n(xr, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: U.chips, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] });
}
function oo(...e) {
  return e.some((a) => a === null);
}
function io(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function co(e, a, t, r, l) {
  if (l === 0 || oo(a, t, r)) return !1;
  const [i, c, d] = [a, t, r], u = io(e), s = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return d.offsetWidth > s || c.scrollWidth > c.clientWidth + 1;
}
function so(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function uo(e) {
  const a = N(null), t = N(null), r = N(null), l = N(null), [i, c] = g(!1);
  return L(() => {
    const d = a.current;
    if (!so(d)) return;
    const u = () => c(co(d, t.current, r.current, l.current, e.length)), s = new ResizeObserver(u);
    return s.observe(d), u(), () => s.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function mo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Ba, { connection: e.connection, since: e.since }) : null;
}
function Uy({ crumb: e, chips: a, title: t, consequence: r, actions: l = [], connection: i, onOverflow: c, density: d = "page" }) {
  const { rowRef: u, headingRef: s, actionsRef: m, measureRef: _, collapsed: b } = uo(l), { disclosure: D, close: Q } = ro(b, m);
  return /* @__PURE__ */ o("header", { className: U.root, "data-density": d, children: [
    /* @__PURE__ */ n(lo, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: U.row, ref: u, children: [
      /* @__PURE__ */ n("div", { ref: s, className: U.headingWrap, children: /* @__PURE__ */ n(ao, { title: t, consequence: r }) }),
      /* @__PURE__ */ o("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(mo, { connection: i }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: m, "data-ward-actions": !0, children: /* @__PURE__ */ n(no, { actions: l, collapsed: b, onOverflow: c, disclosure: D }) })
      ] })
    ] }),
    b && !c ? /* @__PURE__ */ n(to, { actions: l, disclosure: D, onEscape: Q }) : null,
    /* @__PURE__ */ n("div", { className: U.measure, ref: _, "aria-hidden": "true", children: l.map((Z, re) => /* @__PURE__ */ n("span", { children: Z }, re)) })
  ] });
}
function fn(e) {
  const [a, t] = g(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return L(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (c) => t(c.matches);
    return r.addEventListener("change", l), t(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
const ho = "_scrim_c7sqj_2", wo = "_drawer_c7sqj_10", _o = "_sheet_c7sqj_14", vo = "_modal_c7sqj_18", fo = "_panel_c7sqj_23", bo = "_header_c7sqj_51", po = "_title_c7sqj_59", go = "_body_c7sqj_63", No = "_close_c7sqj_90", be = {
  scrim: ho,
  drawer: wo,
  sheet: _o,
  modal: vo,
  panel: fo,
  header: bo,
  title: po,
  body: go,
  close: No
}, yo = We(null), la = [], oa = /* @__PURE__ */ new Map();
function ko(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function $o(e, a) {
  let t = oa.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, oa.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Co(e, a) {
  for (const t of Array.from(a.children))
    ko(t) || $o(e, t);
}
function So(e) {
  for (const a of e.claims) {
    const t = oa.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), oa.delete(a)));
  }
}
function Ro(e, a) {
  const t = { root: e, claims: [] };
  return la.push(t), Co(t, a), t;
}
function To(e) {
  const a = la.indexOf(e);
  a >= 0 && la.splice(a, 1), So(e);
}
function Va(e) {
  return e !== null && la.at(-1) === e;
}
function Lo(e, a, t) {
  const r = N(null), l = N(t);
  return l.current = t, L(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, d = Ro(i, a);
    return r.current = d, () => {
      var s, m;
      const u = Va(d);
      To(d), r.current = null, u && ((m = (s = l.current ?? c) == null ? void 0 : s.focus) == null || m.call(s));
    };
  }, [a]), z(() => Va(r.current), []);
}
function Ao(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function xo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Eo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${be.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n("header", { className: `${be.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${be.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${be.body} ward-drawer-body`, children: e.children })
  ] });
}
function Io(e) {
  return `${be.scrim} ${be[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function qo(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${be.panel} ${be[e]} ward-overlay-panel${t}${r}`;
}
function Mo(e) {
  const a = je(yo);
  return e ?? a ?? document.body;
}
function Je(e) {
  const a = N(null), t = N(null), r = $(), l = Mo(e.container), i = fn("(min-width: 768px)"), c = Ao(e.kind, i), d = xo(e, r), u = ut(t), s = Lo(a, l, e.returnFocusTo), m = z(() => {
    s() && e.onClose();
  }, [e.onClose, s]);
  return L(() => {
    var _, b;
    s() && ((b = (_ = t.current) == null ? void 0 : _.querySelector("button")) == null || b.focus());
  }, [s]), L(() => {
    const _ = (b) => {
      b.key === "Escape" && m();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [m]), tt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Io(c),
        "data-ward-overlay-kind": c,
        "data-ward-overlay-root": "",
        onClick: m,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": d.labelledBy,
            "aria-label": d.label,
            className: qo(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => s() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${be.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Eo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Bo = "_root_drrhx_2", Do = "_ticket_drrhx_15", Po = "_body_drrhx_24", fa = {
  root: Bo,
  ticket: Do,
  body: Po
};
function Vy({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${fa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${fa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: fa.body, children: t })
  ] });
}
const Oo = "_root_1bfqw_2", Ho = "_figure_1bfqw_7", Fo = "_of_1bfqw_13", jo = "_bar_1bfqw_18", Wo = "_rows_1bfqw_38", zo = "_row_1bfqw_38", Go = "_label_1bfqw_49", Ko = "_amount_1bfqw_54", Ne = {
  root: Oo,
  figure: Ho,
  of: Fo,
  bar: jo,
  rows: Wo,
  row: zo,
  label: Go,
  amount: Ko
};
function Uo({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ne.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ne.figure} ward-stat-value`, children: [
      Y(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ne.of, children: [
        "of ",
        Y(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Ne.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${Y(e)} of ${Y(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: Ne.rows, children: t.map((l) => /* @__PURE__ */ o("li", { className: `${Ne.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ne.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Ne.amount, children: Y(l.amount) })
    ] }, l.label)) })
  ] });
}
const Vo = "_frame_mg2jl_2", Yo = "_table_mg2jl_6", Jo = "_th_mg2jl_12", Xo = "_td_mg2jl_13", Qo = "_sort_mg2jl_47", Zo = "_row_mg2jl_53", ei = "_empty_mg2jl_61", ye = {
  frame: Vo,
  table: Yo,
  th: Jo,
  td: Xo,
  sort: Qo,
  row: Zo,
  empty: ei
}, ai = { asc: "ascending", desc: "descending" };
function ni(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ai[a.direction];
}
function ti(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: ye.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function ri(e) {
  return e === void 0 ? void 0 : { width: e };
}
function li({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ye.th,
      style: ri(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ni(e, a),
      children: ti(e, t)
    }
  );
}
function oi({ row: e, props: a }) {
  const t = a.rowId(e), r = (a.lockedIds ?? []).includes(t);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: ye.row,
      "data-selected": t === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ n("td", { className: ye.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function ii({
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
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: ye.empty, children: s }) : /* @__PURE__ */ n("div", { className: ye.frame, children: /* @__PURE__ */ o("table", { className: ye.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ye.head, children: a.map((m) => /* @__PURE__ */ n(li, { column: m, sort: d, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((m) => /* @__PURE__ */ n(oi, { row: m, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: c, sort: d, onSort: u, empty: s } }, r(m))) })
  ] }) });
}
const ci = "_set_y5zy3_2", si = "_legend_y5zy3_7", di = "_row_y5zy3_15", ui = "_control_y5zy3_20", mi = "_input_y5zy3_26", hi = "_label_y5zy3_31", wi = "_consequence_y5zy3_36", Ce = {
  set: ci,
  legend: si,
  row: di,
  control: ui,
  input: mi,
  label: hi,
  consequence: wi
};
function bn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: c, variant: d }) {
  const u = $(), s = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: Ce.set, "data-variant": d, children: [
    /* @__PURE__ */ n("legend", { className: Ce.legend, children: e }),
    a.map((m) => {
      const _ = `${s}-${m.value}`, b = m.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Ce.row, children: [
        /* @__PURE__ */ o("span", { className: Ce.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: s,
              className: Ce.input,
              value: m.value,
              checked: t === m.value,
              disabled: l,
              "aria-describedby": qa(b, c),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: _, className: Ce.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Ce.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const _i = "_root_1h1ot_2", vi = "_head_1h1ot_11", fi = "_index_1h1ot_25", bi = "_dot_1h1ot_29", pi = "_note_1h1ot_34", gi = "_counter_1h1ot_40", Ni = "_trailing_1h1ot_48", Re = {
  root: _i,
  head: vi,
  index: fi,
  dot: bi,
  note: pi,
  counter: gi,
  trailing: Ni
};
function yi({ index: e }) {
  return e ? /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n("span", { className: `${Re.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Re.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function ki({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Re.counter, "aria-hidden": "true", children: e }) : null;
}
function $i({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Re.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Re.head, children: [
      /* @__PURE__ */ n(yi, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Re.note, children: t }),
    /* @__PURE__ */ n(ki, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Re.trailing, children: i })
  ] });
}
const Ci = "_strip_1qhvo_2", Si = "_cell_1qhvo_7", Ri = "_value_1qhvo_12", Ti = "_label_1qhvo_27", Ze = {
  strip: Ci,
  cell: Si,
  value: Ri,
  label: Ti
};
function Li(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function ha({ cells: e, divided: a = !1 }) {
  return Li(e), /* @__PURE__ */ n("dl", { className: `${Ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Ze.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ze.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Ze.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Ai = "_root_xk7sv_2", xi = "_track_xk7sv_8", Ei = "_thumb_xk7sv_35", Ii = "_labelHidden_xk7sv_53", qi = "_label_xk7sv_53", Mi = "_lockedNote_xk7sv_68", Te = {
  root: Ai,
  track: xi,
  thumb: Ei,
  labelHidden: Ii,
  label: qi,
  lockedNote: Mi
};
function Bi(e) {
  return e ? `${Te.label} ${Te.labelHidden}` : Te.label;
}
function Ae({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: c }) {
  const d = $(), u = l ? !0 : a, s = r || l;
  return /* @__PURE__ */ o("span", { className: `${Te.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": u,
        "aria-label": e,
        "aria-labelledby": d,
        "aria-describedby": i,
        className: `${Te.track} ward-switch`,
        "data-on": u,
        "data-locked": l ? !0 : void 0,
        disabled: s,
        onClick: () => !s && (t == null ? void 0 : t(!u)),
        children: /* @__PURE__ */ n("span", { className: Te.thumb })
      }
    ),
    /* @__PURE__ */ o("span", { id: d, className: Bi(c), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Te.lockedNote, children: "always on" })
    ] })
  ] });
}
const Di = "_bar_1u2kl_2", Pi = "_skip_1u2kl_11", Oi = "_mark_1u2kl_22", Hi = "_nav_1u2kl_30", Fi = "_list_1u2kl_34", ji = "_select_1u2kl_40", Wi = "_dest_1u2kl_47", zi = "_actor_1u2kl_61", Gi = "_actorMark_1u2kl_74", Ki = "_actorLabel_1u2kl_79", Ui = "_tagline_1u2kl_98", oe = {
  bar: Di,
  skip: Pi,
  mark: Oi,
  nav: Hi,
  list: Fi,
  select: ji,
  dest: Wi,
  actor: zi,
  actorMark: Gi,
  actorLabel: Ki,
  tagline: Ui
};
function Vi(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Yi(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function Yy({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: c = "main" }) {
  const d = Yi(r);
  return /* @__PURE__ */ o("header", { className: oe.bar, children: [
    /* @__PURE__ */ n("a", { className: oe.skip, href: `#${c}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: oe.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: oe.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: oe.nav, "aria-label": "Primary", children: [
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
    d && /* @__PURE__ */ o("span", { className: oe.actor, children: [
      /* @__PURE__ */ n("span", { className: oe.actorLabel, children: d }),
      /* @__PURE__ */ n("span", { className: oe.actorMark, "aria-hidden": "true", children: Vi(d) })
    ] })
  ] });
}
const Ji = "_tree_1lyby_2", Xi = "_item_1lyby_6", Qi = "_row_1lyby_10", Zi = "_button_1lyby_22", ia = {
  tree: Ji,
  item: Xi,
  row: Qi,
  button: Zi
}, pn = We(null);
function ec({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ma({ orientation: "vertical" });
  return /* @__PURE__ */ n(pn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ia.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const ac = { ArrowRight: !0, ArrowLeft: !1 };
function Ya(e) {
  return e ? !0 : void 0;
}
function nc(e, a) {
  const t = ac[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function tc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function rc(e) {
  const a = [ia.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function lc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function oc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function ic(e) {
  return typeof e == "string" ? e : void 0;
}
function cc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function sc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function gn(e) {
  const a = je(pn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = lc(e);
  return /* @__PURE__ */ o("li", { className: ia.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: rc(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": Ya(e.unresolved),
        "data-inherited": Ya(e.inherited),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${ia.button} ward-treeitem-btn`,
            onClick: () => tc(e),
            onKeyDown: (r) => nc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: oc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: ic(e.label), children: e.label }),
              /* @__PURE__ */ n(cc, { value: e.detail }),
              /* @__PURE__ */ n(sc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const dc = "_frame_9lntd_2", uc = "_subjectRail_9lntd_21", mc = "_subject_9lntd_21", hc = "_rail_9lntd_41", wc = "_record_9lntd_63", _c = "_recordBody_9lntd_68", vc = "_band_9lntd_111", fc = "_bandBody_9lntd_120", bc = "_bandActions_9lntd_125", pc = "_scroller_9lntd_132", gc = "_lanes_9lntd_150", se = {
  frame: dc,
  subjectRail: uc,
  subject: mc,
  rail: hc,
  record: wc,
  recordBody: _c,
  band: vc,
  bandBody: fc,
  bandActions: bc,
  scroller: pc,
  lanes: gc
};
function Jy({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: se.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function Ja(e) {
  return e ? "true" : void 0;
}
function Xy({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: se.subjectRail, "data-ward-subject-rail": t, "data-ruled": Ja(i), children: [
    /* @__PURE__ */ n("div", { className: se.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: se.rail, "data-sticky": Ja(l), "aria-label": r, children: a })
  ] });
}
function Qy({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i }) {
  return /* @__PURE__ */ o("section", { className: se.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n($i, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: se.recordBody, "data-pad": l, children: a })
  ] });
}
const Nc = "_form_1j8ub_2", yc = "_fields_1j8ub_9", kc = "_actions_1j8ub_19", ba = {
  form: Nc,
  fields: yc,
  actions: kc
};
function Zy({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: ba.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: ba.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: ba.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function ek({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: se.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: se.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: se.bandActions, children: a })
  ] });
}
const $c = "(max-width: 767.98px)";
function Ca({ label: e, children: a }) {
  return /* @__PURE__ */ n("div", { className: se.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", children: a });
}
function Cc({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = g(null), i = e.find((d) => d.id === r) ?? e[0], c = e.map((d) => ({ value: d.id, label: `${d.label} · ${d.count}` }));
  return /* @__PURE__ */ o("div", { className: se.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(T, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: l }),
    /* @__PURE__ */ n(Ca, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function ak({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = fn($c);
  return t === void 0 ? /* @__PURE__ */ n(Ca, { label: a, children: e }) : l ? /* @__PURE__ */ n(Cc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Ca, { label: a, children: t.map((i) => /* @__PURE__ */ n(nt, { children: i.content }, i.id)) });
}
const Sc = "_block_1o5o7_2", Rc = "_sentence_1o5o7_15", Tc = "_meta_1o5o7_20", Lc = "_action_1o5o7_25", Ac = "_strip_1o5o7_29", xc = "_loading_1o5o7_48", Ec = "_label_1o5o7_56", Ic = "_counter_1o5o7_63", ue = {
  block: Sc,
  sentence: Rc,
  meta: Tc,
  action: Lc,
  strip: Ac,
  loading: xc,
  label: Ec,
  counter: Ic
};
function qc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: ue.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function wa({ sentence: e, action: a, children: t, role: r = "status", tone: l }) {
  return /* @__PURE__ */ o("div", { className: `${ue.block} ward-state`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: ue.sentence, children: e }),
    t,
    /* @__PURE__ */ n(qc, { action: a })
  ] });
}
function Mc(e) {
  return /* @__PURE__ */ n(wa, { ...e });
}
function nk({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(wa, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: ue.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function tk(e) {
  return /* @__PURE__ */ n(wa, { ...e });
}
function rk({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(wa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: ue.meta, children: [
    "failed at ",
    te(a)
  ] }) });
}
function lk({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: ue.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    te(e),
    " — showing snapshot from ",
    te(a)
  ] });
}
function ok({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: ue.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    te(a)
  ] });
}
function ik({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = g(!1);
  L(() => {
    const c = window.setTimeout(() => l(!0), de.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Ia(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${ue.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: ue.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: ue.counter, children: xa(i) }) : null
  ] });
}
const Bc = "_note_tlubt_2", Dc = {
  note: Bc
};
function Pc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: Dc.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const Oc = "_card_12in3_2", Hc = "_hit_12in3_23", Fc = "_head_12in3_30", jc = "_title_12in3_36", Wc = "_meta_12in3_44", zc = "_fields_12in3_45", Gc = "_who_12in3_58", Kc = "_sep_12in3_65", Uc = "_mono_12in3_69", Vc = "_field_12in3_45", Yc = "_last_12in3_84", Jc = "_reason_12in3_96", G = {
  card: Oc,
  hit: Hc,
  head: Fc,
  title: jc,
  meta: Wc,
  fields: zc,
  who: Gc,
  sep: Kc,
  mono: Uc,
  field: Vc,
  last: Yc,
  reason: Jc
}, Xc = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Qc(e, a, t) {
  const r = ea(e, "blue"), l = ea(e, "orange"), i = ea(e, "green"), c = N(/* @__PURE__ */ new Set());
  L(() => {
    if (!t) return;
    const d = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const s = Xc[u.type];
      s && d[s]();
    });
  }, [r, t, i, a, l]);
}
const Zc = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : Y(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function es(e, a) {
  return Zc[a](e);
}
function as({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: G.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: G.meta, children: [
    /* @__PURE__ */ o("span", { className: G.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    t,
    /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: G.meta, children: [
    /* @__PURE__ */ o("span", { className: G.who, children: [
      "waits on ",
      e.waitsOn
    ] }),
    t,
    /* @__PURE__ */ o("span", { className: G.mono, children: [
      ne(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function ns({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: G.head, children: [
    e.flagged && /* @__PURE__ */ n(h, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function ts({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: G.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function rs({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: G.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: G.field, children: es(e, t) }, t)) });
}
const Sa = (e) => e ? !0 : void 0;
function ls(e) {
  return { "--stream": `var(--ward-stream-${e.streamStep}-id)` };
}
function os(e, a, t) {
  e == null || e(a, t);
}
function is(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function cs({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: G.last, "data-stale": Sa(a), children: t }) : null;
}
function _a(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  Qc(r, t.key, e.feed);
  const l = is(e.feed), i = ls(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: G.card,
      style: i,
      "data-selected": Sa(e.selected),
      "data-flagged": Sa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: G.hit, onClick: (c) => os(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(ns, { item: t }),
        /* @__PURE__ */ n("p", { className: G.title, children: t.title }),
        /* @__PURE__ */ n(as, { item: t, connection: l }),
        /* @__PURE__ */ n(ts, { reason: t.blockedReason }),
        /* @__PURE__ */ n(rs, { item: t, fields: a }),
        /* @__PURE__ */ n(cs, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const ss = "_column_14784_3", ds = "_head_14784_24", us = "_label_14784_33", ms = "_count_14784_42", hs = "_list_14784_56", Ge = {
  column: ss,
  head: ds,
  label: us,
  count: ms,
  list: hs
};
function Nn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function ws({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Ge.head, children: [
    /* @__PURE__ */ n("h2", { className: Ge.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Ge.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function _s(e) {
  return /* @__PURE__ */ n("div", { className: Ge.list, role: "list", children: e.rows.map((a, t) => {
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
function vs({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: d, onKeyDown: u }) {
  const s = $(), m = e.cap !== void 0 && a.length > e.cap, _ = Nn(a, r);
  return /* @__PURE__ */ o("section", { className: Ge.column, "aria-labelledby": s, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(ws, { column: e, count: a.length, id: s }),
    /* @__PURE__ */ n(_s, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: d, rows: _ }),
    m && /* @__PURE__ */ n(Pc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const fs = "_foot_8qg4p_2", bs = "_note_8qg4p_13", ps = "_link_8qg4p_19", pa = {
  foot: fs,
  note: bs,
  link: ps
};
function ck({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: pa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: pa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: pa.link, href: e, children: "Configure board" })
  ] });
}
const gs = "_head_1la6p_3", Ns = "_identity_1la6p_12", ys = "_titleRow_1la6p_18", ks = "_title_1la6p_18", $s = "_key_1la6p_35", Cs = "_rollup_1la6p_45", Ss = "_tools_1la6p_53", Rs = "_swatch_1la6p_62", Ts = "_mark_1la6p_69", _e = {
  head: gs,
  identity: Ns,
  titleRow: ys,
  title: ks,
  key: $s,
  rollup: Cs,
  tools: Ss,
  swatch: Rs,
  mark: Ts
}, Xa = "initials:";
function Ls(e) {
  return e === void 0 ? "loaded this week unavailable" : `${X(e)} loaded this week`;
}
function As(e) {
  const a = [`${X(e.inFlight)} in flight`, Ls(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${X(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ne(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ne(e.p90)}`), a.join(" · ");
}
function xs(e) {
  return e.startsWith(Xa) ? e.slice(Xa.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Es({ markRef: e, streamStep: a }) {
  const t = { "--stream": `var(--ward-stream-${a}-id)` };
  return e ? /* @__PURE__ */ n("span", { className: `${_e.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: xs(e) }) : /* @__PURE__ */ n("span", { className: _e.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Is({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(T, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function sk({
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
  return /* @__PURE__ */ o("div", { className: _e.head, children: [
    /* @__PURE__ */ o("div", { className: _e.identity, children: [
      /* @__PURE__ */ o("div", { className: _e.titleRow, children: [
        /* @__PURE__ */ n(Es, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: _e.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: _e.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: _e.rollup, "aria-live": "polite", children: As(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: _e.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Is, { owners: l, owner: i, onOwnerChange: c }),
      d === void 0 ? null : /* @__PURE__ */ n(v, { onClick: d, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Ba, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const qs = "_head_kabyh_11", Ms = "_line_kabyh_12", Bs = "_cHandle_kabyh_33", Ds = "_cName_kabyh_38", Ps = "_nameLine_kabyh_46", Os = "_cLabel_kabyh_53", Hs = "_cCap_kabyh_58", Fs = "_cShown_kabyh_63", js = "_name_kabyh_46", Ws = "_noCap_kabyh_85", zs = "_state_kabyh_99", Gs = "_handle_kabyh_104", Ks = "_sub_kabyh_118", x = {
  head: qs,
  line: Ms,
  cHandle: Bs,
  cName: Ds,
  nameLine: Ps,
  cLabel: Os,
  cCap: Hs,
  cShown: Fs,
  name: js,
  noCap: Ws,
  state: zs,
  handle: Gs,
  sub: Ks
}, Us = "can't be hidden or collapsed", Vs = "terminal · counted, not a column";
function dk() {
  return /* @__PURE__ */ o("div", { className: x.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: x.cHandle }),
    /* @__PURE__ */ n("span", { className: x.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: x.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: x.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: x.cShown, children: "Shown" })
  ] });
}
function Ys(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Js(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Qa(e) {
  return e.gate ? Us : e.terminal ? Vs : Js(e.agentsMounted);
}
function Xs(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Qs({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: x.cName, children: [
    /* @__PURE__ */ o("span", { className: x.nameLine, children: [
      /* @__PURE__ */ n("span", { className: x.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    Qa(e) && /* @__PURE__ */ n("span", { className: x.sub, children: Qa(e) })
  ] });
}
function Zs(e) {
  return e === void 0 ? "" : String(e);
}
function ed(e) {
  return e === "" ? void 0 : Number(e);
}
function ad({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: x.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: x.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Xs(t, a),
      children: "⠿"
    }
  ) });
}
function nd({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${x.cCap} ${x.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: x.cCap, children: /* @__PURE__ */ n(T, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Zs(a.cap), onChange: (r) => t({ ...a, cap: ed(r) }) }) });
}
function td({ stage: e, config: a, onChange: t }) {
  const r = Ys(e, a.shown);
  return /* @__PURE__ */ o("span", { className: x.cShown, children: [
    /* @__PURE__ */ n(Ae, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: x.state, "aria-hidden": "true", children: r.state })
  ] });
}
function rd(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function uk({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: x.line, "data-kind": rd(e), children: [
    /* @__PURE__ */ n(ad, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Qs, { stage: e }),
    /* @__PURE__ */ n("span", { className: x.cLabel, children: /* @__PURE__ */ n(T, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(nd, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(td, { stage: e, config: a, onChange: t })
  ] });
}
const ld = "_body_hn6d6_2", od = "_head_hn6d6_9", id = "_summary_hn6d6_19", cd = "_block_hn6d6_20", sd = "_actionsBlock_hn6d6_21", dd = "_title_hn6d6_41", ud = "_note_hn6d6_46", md = "_k_hn6d6_51", hd = "_kv_hn6d6_58", wd = "_row_hn6d6_64", _d = "_label_hn6d6_75", vd = "_value_hn6d6_84", fd = "_quote_hn6d6_90", bd = "_actions_hn6d6_21", pd = "_resolve_hn6d6_103", E = {
  body: ld,
  head: od,
  summary: id,
  block: cd,
  actionsBlock: sd,
  title: dd,
  note: ud,
  k: md,
  kv: hd,
  row: wd,
  label: _d,
  value: vd,
  quote: fd,
  actions: bd,
  resolve: pd
};
function gd(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Nd(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function yd(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(h, { role: "stream", label: `STEP ${e.streamStep}`, streamStep: e.streamStep }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ne(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...gd(e),
    ...Nd(e, a)
  ];
}
function kd({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: E.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: E.k, children: a }),
    e
  ] });
}
function $d({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: E.head, children: [
    /* @__PURE__ */ n(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Cd({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: E.block, children: [
    /* @__PURE__ */ n("p", { className: E.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: E.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: E.note, children: e.agentMeta })
  ] }) : null;
}
function mk({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: c, actionsNote: d }) {
  const u = $(), s = yd(e, l);
  return /* @__PURE__ */ n(Je, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: E.body, children: [
    /* @__PURE__ */ n($d, { item: e }),
    /* @__PURE__ */ o("div", { className: E.summary, children: [
      /* @__PURE__ */ n("h2", { className: E.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: E.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: E.kv, children: s.map(([m, _]) => /* @__PURE__ */ o("div", { className: E.row, children: [
      /* @__PURE__ */ n("dt", { className: E.label, children: m }),
      /* @__PURE__ */ n("dd", { className: E.value, children: _ })
    ] }, m)) }),
    /* @__PURE__ */ n(Cd, { item: e }),
    /* @__PURE__ */ o("div", { className: E.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: E.actions, children: a }),
      d && /* @__PURE__ */ n("p", { className: E.note, children: d })
    ] }),
    /* @__PURE__ */ n(kd, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Sd = "_root_3azmy_2", Rd = "_list_3azmy_7", Td = "_item_3azmy_12", Ld = "_box_3azmy_18", Ad = "_text_3azmy_23", xd = "_note_3azmy_28", Be = {
  root: Sd,
  list: Rd,
  item: Td,
  box: Ld,
  text: Ad,
  note: xd
};
function va({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: Be.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Be.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Be.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Be.box, children: /* @__PURE__ */ n(Ma, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Be.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Be.note} ward-checklist-note`, children: a })
  ] });
}
const Ed = "_rail_ke7ch_2", Id = "_k_ke7ch_11", qd = "_head_ke7ch_19", Md = "_section_ke7ch_25", Bd = "_card_ke7ch_38", Dd = "_strip_ke7ch_42", Pd = "_skeleton_ke7ch_56", Od = "_skeletonLabel_ke7ch_70", Hd = "_bar_ke7ch_76", Fd = "_note_ke7ch_85", ce = {
  rail: Ed,
  k: Id,
  head: qd,
  section: Md,
  card: Bd,
  strip: Dd,
  skeleton: Pd,
  skeletonLabel: Od,
  bar: Hd,
  note: Fd
};
function jd(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ga({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: ce.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: ce.k, children: e }),
    a
  ] });
}
function Wd({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: ce.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: ce.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: ce.bar, "aria-hidden": "true" }, r))
  ] });
}
function zd({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(vs, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function Gd(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(zd, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Wd, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function hk(e) {
  const a = jd(e.onOpen), t = Nn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: ce.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${ce.k} ${ce.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(ga, { title: "Card", children: /* @__PURE__ */ n("div", { className: ce.card, children: t && /* @__PURE__ */ n(_a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(ga, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: ce.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Gd, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: ce.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(ga, { title: "Effect of this config", children: /* @__PURE__ */ n(va, { items: e.effects, density: "compact" }) })
  ] });
}
function Kd(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Ud(e) {
  return Math.ceil(e.length / 2);
}
function Vd(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function yn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Yd(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = yn(e);
  l !== void 0 && t(l), r(Vd(e.type));
}
function Jd(e, a, t, r, l) {
  L(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Yd(i, t, r, l));
  }, [e, a, t, r, l]);
}
function Xd(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Qd(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function Zd(e, a) {
  return a !== void 0 ? ne(e.timeInStage) + " · waits on " + a.agent : ne(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function eu(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + H.height.card + " + " + H.height.cardRow + " * " + String(Ud(a ?? [])) + ")"
  };
}
function au(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function nu(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(h, { role: "meta", label: Y(e.cost) }) : null;
}
function tu(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(h, { role: "meta", label: e.jiraKey }) : null;
}
function ru(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function lu(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function ou(e, a) {
  return a === void 0 ? e : Kd(e, a.ref);
}
function iu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ue(e) {
  return e === !0 ? "true" : void 0;
}
function kn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = N(null), i = ea(l), c = N(/* @__PURE__ */ new Set()), [d, u] = g(Xd(a));
  Jd(e.feed, a.key, c, u, i);
  const s = Qd(a, r), m = Zd(a, t), _ = eu(a, e.fields), b = lu(a, t, d);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...iu(e),
      className: "ward-workcard",
      "data-flagged": Ue(a.flagged),
      "data-selected": Ue(e.selected),
      style: _,
      ref: ou(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        au(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(h, { role: s.role, label: s.label }),
          nu(a, e.fields),
          tu(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          ru(t, d, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function cu({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function su(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function du(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function uu(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(cu, { count: e.items.length, cap: e.column.cap });
}
function mu(e, a) {
  return e.roving ?? a;
}
function hu(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function wu(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    kn,
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
function _u(e) {
  const a = $(), t = ma({ orientation: "vertical" }), r = mu(e, t), l = su(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ue(l), "data-gate": Ue(e.column.gate), children: [
    du(e.column, e.items.length, a),
    uu(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...hu(e, t), children: wu(e, r) })
  ] });
}
function vu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ne(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ne(e.p90)), a;
}
function fu(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(T, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function bu(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function wk(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: vu(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      fu(e),
      bu(e.onConfigure),
      /* @__PURE__ */ n(Ba, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function pu(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function gu(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ae, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ae, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Nu(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(B, { children: [
    a > 0 ? /* @__PURE__ */ n(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(h, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function _k(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ue(pu(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: gu(e) }),
    /* @__PURE__ */ n(T, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(wn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Nu(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function vk(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(kn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(_u, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function yu(e, a) {
  const t = yn(e);
  t !== void 0 && a(t);
}
function ku(e, a, t) {
  L(() => {
    if (e != null)
      return e.subscribe(a, (r) => yu(r, t));
  }, [e, a, t]);
}
function $u(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Cu(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ne(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", Y(e.cost)]), a;
}
function Su(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Ru(e, a) {
  return /* @__PURE__ */ o(B, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function fk(e) {
  var c;
  const a = e.item, t = a.run, [r, l] = g((c = a.run) == null ? void 0 : c.lastStep);
  ku(e.feed, a.key, l);
  const i = [...$u(a), ...Cu(a)];
  return /* @__PURE__ */ o(Je, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((d) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: d[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(d[1]), children: d[1] })
      ] }, d[0])),
      Su(t, r)
    ] }),
    Ru(a, e.actions)
  ] });
}
const Tu = "_card_hvxp7_2", Lu = "_head_hvxp7_17", Au = "_mark_hvxp7_25", xu = "_name_hvxp7_37", Eu = "_chips_hvxp7_48", Iu = "_description_hvxp7_54", qu = "_run_hvxp7_59", Mu = "_sep_hvxp7_68", Bu = "_facts_hvxp7_73", Du = "_fact_hvxp7_73", Pu = "_factLabel_hvxp7_86", Ou = "_factValue_hvxp7_90", J = {
  card: Tu,
  head: Lu,
  mark: Au,
  name: xu,
  chips: Eu,
  description: Iu,
  run: qu,
  sep: Mu,
  facts: Bu,
  fact: Du,
  factLabel: Pu,
  factValue: Ou
}, Hu = { live: "done", draft: "running", paused: "meta" };
function Fu(e) {
  return e === void 0 ? J.card : `${J.card} ${e}`;
}
function ju({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: J.chips, children: e.map((a) => /* @__PURE__ */ n(h, { role: Hu[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function Wu({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: J.description, children: e });
}
function zu({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: J.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: J.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Gu({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: J.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: J.fact, children: [
    /* @__PURE__ */ n("dt", { className: J.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: J.factValue, children: a.value })
  ] }, a.label)) });
}
function Ku(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Uu({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: c }) {
  const d = { "--stream": `var(--ward-stream-${e.streamStep}-id)` }, u = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: Fu(c),
      style: d,
      "data-selected": u,
      "data-paused": Ku(e.versions),
      children: [
        /* @__PURE__ */ o("h3", { className: J.head, children: [
          /* @__PURE__ */ n("span", { className: J.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${J.name} ward-rowlink`, href: a, "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(Wu, { description: e.description }),
        /* @__PURE__ */ n(zu, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(ju, { versions: e.versions }),
        /* @__PURE__ */ n(Gu, { facts: i })
      ]
    }
  );
}
const Vu = "_list_4dcyc_2", Yu = "_row_4dcyc_11", Ju = "_head_4dcyc_23", Xu = "_id_4dcyc_30", Qu = "_lock_4dcyc_35", Zu = "_reason_4dcyc_41", em = "_remove_4dcyc_46", am = "_clauses_4dcyc_50", nm = "_clause_4dcyc_50", tm = "_label_4dcyc_64", rm = "_cell_4dcyc_71", lm = "_value_4dcyc_76", ee = {
  list: Vu,
  row: Yu,
  head: Ju,
  id: Xu,
  lock: Qu,
  reason: Zu,
  remove: em,
  clauses: am,
  clause: nm,
  label: tm,
  cell: rm,
  value: lm
}, $n = We(!1);
function bk({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n($n.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ee.list, "aria-label": a, children: e }) });
}
function om({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ee.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(T, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function im({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ee.lock, children: [
    /* @__PURE__ */ n(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ee.reason, children: e })
  ] });
}
function cm({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ee.head, children: [
    /* @__PURE__ */ n("span", { className: ee.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(im, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ee.remove, children: /* @__PURE__ */ o(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Za(e, a) {
  return e.locked ? void 0 : a;
}
function pk({ rule: e, onChange: a, onRemove: t }) {
  if (!je($n)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Za(e, a);
  return /* @__PURE__ */ o("li", { className: ee.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(cm, { rule: e, onRemove: Za(e, t) }),
    /* @__PURE__ */ n("dl", { className: ee.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ee.clause, children: [
      /* @__PURE__ */ n("dt", { className: ee.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ee.cell, children: /* @__PURE__ */ n(om, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const sm = "_ladder_v5484_2", dm = "_cell_v5484_7", um = "_empty_v5484_26", mm = "_name_v5484_34", hm = "_holder_v5484_40", wm = "_request_v5484_46", _m = "_swatches_v5484_51", vm = "_swatch_v5484_51", ae = {
  ladder: sm,
  cell: dm,
  empty: um,
  name: mm,
  holder: hm,
  request: wm,
  swatches: _m,
  swatch: vm
}, fm = "not validated — needs CVD matrix and dark stepping";
function bm(e) {
  return e.reserved ? "reserved" : Ea(e.step) ? "validated" : "partial";
}
function pm(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function en(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function gm({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(xe, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${ae.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function an(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function nn(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
function Nm({ step: e, value: a, taken: t, onChange: r, swatch: l }) {
  const i = bm(e), c = pm(i, t), d = c !== "free", u = e.name ?? `Step ${e.step}`, s = () => {
    d || r(e.step);
  }, m = `${u} — ${c}`;
  return l ? /* @__PURE__ */ n("span", { role: "radio", "aria-label": m, title: m, ...nn(d, a === e.step), className: `${ae.swatch} ward-ladder-cell`, "data-validation": i, style: en(e, i), onClick: s, onKeyDown: (_) => an(_, s) }) : /* @__PURE__ */ o(
    "span",
    {
      role: "radio",
      "aria-label": m,
      ...nn(d, a === e.step),
      className: `${ae.cell} ward-ladder-cell`,
      "data-validation": i,
      style: en(e, i),
      onClick: s,
      onKeyDown: (_) => an(_, s),
      children: [
        /* @__PURE__ */ n(gm, { validation: i }),
        /* @__PURE__ */ n("span", { className: `${ae.name} ward-ladder-name`, children: u }),
        /* @__PURE__ */ n("span", { className: `${ae.holder} ward-ladder-holder`, children: c })
      ]
    }
  );
}
function ym(e) {
  for (const a of e)
    if (!a.reserved && !Ye(a.step)) throw new Error("colour ladder renders token steps only");
}
function km() {
  return /* @__PURE__ */ o("div", { className: `${ae.cell} ward-ladder-cell ${ae.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${ae.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${ae.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${ae.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function $m(e) {
  return "presentation" in e && e.presentation === "swatches";
}
function Cn(e) {
  const a = e.takenBy ?? {}, t = (l) => {
    var i;
    (i = e.onChange) == null || i.call(e, l);
  };
  ym(e.steps);
  const r = $m(e);
  return /* @__PURE__ */ o("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${r ? ae.swatches : ae.ladder} ward-ladder`, children: [
    e.steps.map((l) => /* @__PURE__ */ n(Nm, { step: l, value: e.value, taken: a[l.step], onChange: t, swatch: r }, l.step)),
    r ? null : /* @__PURE__ */ n(km, {})
  ] });
}
const Cm = "_rail_1el2t_2", Sm = "_section_1el2t_12", Rm = "_sectionFlush_1el2t_22", Tm = "_head_1el2t_26", Lm = "_headLabel_1el2t_34", Am = "_sample_1el2t_42", xm = "_sampleLabel_1el2t_47", Em = "_sampleTitle_1el2t_54", Im = "_sampleMeta_1el2t_59", qm = "_trace_1el2t_65", Mm = "_traceHead_1el2t_70", Bm = "_steps_1el2t_78", Dm = "_step_1el2t_78", Pm = "_stepTitle_1el2t_97", Om = "_hollow_1el2t_107", Hm = "_stepBody_1el2t_115", Fm = "_stepDetail_1el2t_127", jm = "_publish_1el2t_132", Wm = "_reason_1el2t_138", zm = "_note_1el2t_143", Gm = "_reveal_1el2t_148", p = {
  rail: Cm,
  section: Sm,
  sectionFlush: Rm,
  head: Tm,
  headLabel: Lm,
  sample: Am,
  sampleLabel: xm,
  sampleTitle: Em,
  sampleMeta: Im,
  trace: qm,
  traceHead: Mm,
  steps: Bm,
  step: Dm,
  stepTitle: Pm,
  hollow: Om,
  stepBody: Hm,
  stepDetail: Fm,
  publish: jm,
  reason: Wm,
  note: zm,
  reveal: Gm
}, tn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Km = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Um = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Vm = { notSimulated: "not simulated", running: "running" };
function Ym(e) {
  return e.presentation === "foundry";
}
function Jm(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Xm(e, a) {
  var r;
  const t = Km[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Qm(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Zm(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function eh(e) {
  if (Qm(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function ah(e) {
  const [a, t] = g(!1);
  L(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function nh(e) {
  const a = Vm[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(xe, { size: 6, kind: Um[e.kind], label: e.kind });
}
function th(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function rh(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function lh(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(ah, { kind: a.kind, children: [
    /* @__PURE__ */ n(nh, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(th, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(rh, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function oh(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ne(a)), t.join(" · ");
}
function Sn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: oh(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(lh, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function ih(e) {
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
function ch(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + te(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function sh(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : Y(e.run.cost), label: "Cost" }, { value: e.run.turns ? un(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ha, { divided: !0, cells: a }) });
}
function dh(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: Y(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: un(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function uh(e) {
  const a = dh(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ha, { divided: !0, cells: a }) });
}
function Rn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function mh(e) {
  return /* @__PURE__ */ o("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(Rn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function hh(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(Rn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Tn(e) {
  return /* @__PURE__ */ o("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(h, { role: tn[e.run.status].role, label: tn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function wh(e, a) {
  const [t, r] = g(e.steps);
  return L(() => r(e.steps), [e.steps]), L(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var c, d;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((c = l.step) == null ? void 0 : c.label) ?? "step", detail: (d = l.step) == null ? void 0 : d.tool }];
        });
      });
  }, [a, e.status]), t;
}
function _h(e) {
  var t;
  Zm(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Tn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(ih, { sample: e.run.sample }),
    /* @__PURE__ */ n(Sn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(sh, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(va, { items: e.checklist }) }),
    /* @__PURE__ */ n(mh, { reason: Jm(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function vh(e) {
  var r;
  const a = wh(e.run, e.feed);
  eh(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Tn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(ch, { sample: e.run.sample }),
    /* @__PURE__ */ n(Sn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(uh, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(va, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(hh, { reason: Xm(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function gk(e) {
  return Ym(e) ? /* @__PURE__ */ n(vh, { ...e }) : /* @__PURE__ */ n(_h, { ...e });
}
const fh = "_list_142ip_3", bh = "_row_142ip_9", ph = "_condition_142ip_18", gh = "_action_142ip_24", aa = {
  list: fh,
  row: bh,
  condition: ph,
  action: gh
}, Ln = We(!1);
function Nk({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Ln.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: aa.list, "aria-label": a, children: e }) });
}
function yk({ rule: e }) {
  if (!je(Ln)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: aa.row, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: aa.condition, children: e.when }),
    /* @__PURE__ */ n(h, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: aa.action, children: e.then })
  ] });
}
function Ra(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(t, 0, l), r;
}
function An(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function xn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function rn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Nh(e) {
  return e === "up" ? "down" : "up";
}
function yh(e, a) {
  const t = rn(e, a.id, a.direction) ?? rn(e, a.id, Nh(a.direction));
  t == null || t.focus();
}
function En() {
  const e = N(null), [a, t] = g(null), [r, l] = g("");
  return L(() => {
    e.current !== null && a !== null && yh(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, d) => {
    t(c), l(d);
  } };
}
function In({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ca({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const kh = "_body_1h15q_2", $h = "_title_1h15q_8", Ch = "_section_1h15q_13", Sh = "_legend_1h15q_18", Rh = "_stages_1h15q_26", Th = "_stage_1h15q_26", Lh = "_stageIndex_1h15q_44", Ah = "_stageName_1h15q_50", xh = "_footer_1h15q_59", Eh = "_note_1h15q_66", Ih = "_reason_1h15q_71", qh = "_actions_1h15q_76", Mh = "_webHead_1h15q_83", Bh = "_kicker_1h15q_92", Dh = "_webTitle_1h15q_99", Ph = "_webBody_1h15q_105", Oh = "_webSection_1h15q_109", Hh = "_sectionHead_1h15q_121", Fh = "_sectionNote_1h15q_129", jh = "_formLabel_1h15q_134", Wh = "_identityRow_1h15q_139", zh = "_nameCell_1h15q_145", Gh = "_keyCell_1h15q_150", Kh = "_colourCell_1h15q_154", Uh = "_colourStatus_1h15q_161", Vh = "_webStages_1h15q_166", Yh = "_webStageList_1h15q_172", Jh = "_webStage_1h15q_166", Xh = "_webIndex_1h15q_191", Qh = "_webStageName_1h15q_196", Zh = "_webMoves_1h15q_201", ew = "_addStage_1h15q_215", aw = "_addStageButton_1h15q_223", nw = "_addStageNote_1h15q_231", tw = "_webFooter_1h15q_236", rw = "_webFooterNotes_1h15q_244", lw = "_webNote_1h15q_251", w = {
  body: kh,
  title: $h,
  section: Ch,
  legend: Sh,
  stages: Rh,
  stage: Th,
  stageIndex: Lh,
  stageName: Ah,
  footer: xh,
  note: Eh,
  reason: Ih,
  actions: qh,
  webHead: Mh,
  kicker: Bh,
  webTitle: Dh,
  webBody: Ph,
  webSection: Oh,
  sectionHead: Hh,
  sectionNote: Fh,
  formLabel: jh,
  identityRow: Wh,
  nameCell: zh,
  keyCell: Gh,
  colourCell: Kh,
  colourStatus: Uh,
  webStages: Vh,
  webStageList: Yh,
  webStage: Jh,
  webIndex: Xh,
  webStageName: Qh,
  webMoves: Zh,
  addStage: ew,
  addStageButton: aw,
  addStageNote: nw,
  webFooter: tw,
  webFooterNotes: rw,
  webNote: lw
}, ow = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], qn = "not in catalogue";
function iw(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} — ${qn}` }, ...t];
}
function cw({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(T, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${qn}`;
  return /* @__PURE__ */ n(T, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: iw(t, e.name), invalid: i, onChange: r });
}
function Mn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function sw(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function dw({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: c }) {
  const d = Mn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(cw, { stage: a, index: t, catalogue: l, onName: (s) => i({ ...a, name: s }) }) }),
    /* @__PURE__ */ n(T, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: ow, onChange: (s) => i({ ...a, kind: s }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ca, { id: e, name: d, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ca, { id: e, name: d, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function uw({ stages: e, onChange: a, catalogue: t }) {
  const r = sw(e.length), l = En(), i = (d, u) => {
    const s = An(d, u);
    r.current = Ra(r.current, d, s), l.moved({ id: r.current[s], direction: u }, xn(Mn(e[d], d), s, e.length)), a(Ra(e, d, s));
  }, c = (d, u) => a(e.map((s, m) => m === d ? u : s));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((d, u) => /* @__PURE__ */ n(dw, { id: r.current[u], stage: d, index: u, total: e.length, catalogue: t, onReplace: (s) => c(u, s), onMove: (s) => i(u, s) }, r.current[u])) }),
    /* @__PURE__ */ n(In, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const mw = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], hw = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], ww = "A new stream starts as a draft. Nothing runs on it until you publish it.", _w = "Create is disabled: name the stream and give it a key first.", vw = "reorder with the ↑ ↓ buttons · min 2";
function Da(e, a) {
  return !e.reserved && Ea(e.step) && a[e.step] === void 0;
}
function fw(e, a) {
  const t = e.find((r) => Da(r, a));
  return t ? t.step : 1;
}
function bw({ stages: e, onMove: a }) {
  const t = En(), r = (l, i) => {
    const c = An(l, i);
    t.moved({ id: e[l].id, direction: i }, xn(e[l].name, c, e.length)), a(l, c);
  };
  return /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ca, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ca, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(In, { text: t.announcement })
  ] });
}
function pw({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: ww }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function gw(e, a) {
  return e !== "" && a !== "" ? null : _w;
}
function Nw(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = hw, onCreate: i, onDraft: c, onClose: d, returnFocusTo: u } = e, s = $(), [m, _] = g(""), [b, D] = g(""), [Q, Z] = g(a[0].value), [re, Ee] = g(() => fw(t, r)), [le, Ie] = g(e.stages ?? mw), [qe, k] = g(l[0].value), F = { name: m, key: b, streamStep: re, owner: Q, stages: le, policy: qe }, me = gw(m, b);
  return /* @__PURE__ */ n(Je, { kind: "modal", labelledBy: s, onClose: d, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: s, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(T, { kind: "input", label: "Stream name", value: m, onChange: _ }),
      /* @__PURE__ */ n(T, { kind: "input", label: "Key", value: b, onChange: D, mono: !0 }),
      /* @__PURE__ */ n(T, { kind: "select", label: "Owner", value: Q, onChange: Z, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Cn, { label: "Stream colour", steps: t, value: re, onChange: Ee, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(bw, { stages: le, onMove: ($e, Zn) => Ie(Ra(le, $e, Zn)) })
    ] }),
    /* @__PURE__ */ n(bn, { legend: "Loop policy", options: l, value: qe, onChange: k }),
    /* @__PURE__ */ n(pw, { reason: me, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const Bn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], yw = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function kw(e, a, t, r, l, i) {
  var d;
  const c = ((d = Bn.find((u) => u.value === l)) == null ? void 0 : d.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function $w(e, a) {
  return Cw(e) && Sw(e, a) && Rw(e);
}
function Cw(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Sw(e, a) {
  return e.colourStep !== null && Da({ step: e.colourStep }, a);
}
function Rw(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Tw(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${fm}.` : Da({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Lw({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Aw({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Lw, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: yw })
    ] }),
    l && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function xw({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function Ew({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(T, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(T, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function Iw(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [l, i] = g(""), [c, d] = g(""), [u, s] = g(e.owners[0] ?? ""), [m, _] = g(null), [b, D] = g("relay"), [Q, Z] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), re = kw(l, c, u, m, b, Q), Ee = $w(re, r), le = Q.find((k) => k.kind === "agent" && k.name.trim() !== ""), Ie = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Cn, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: m, onChange: _, takenBy: r })
  ] }), qe = /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: Tw(m, r) }),
    /* @__PURE__ */ n(T, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map((k) => ({ value: k, label: k })), onChange: s })
  ] });
  return /* @__PURE__ */ o(Je, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(xw, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(Ew, { name: l, setName: i, streamKey: c, setKey: d, colour: Ie, owner: qe }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: vw })
        ] }),
        /* @__PURE__ */ n(uw, { stages: Q, onChange: Z })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(bn, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: Bn, onChange: D }) }),
      /* @__PURE__ */ n(Aw, { ready: Ee, draft: re, agentStage: le, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function kk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Iw, { ...e }) : /* @__PURE__ */ n(Nw, { ...e });
}
const qw = "_row_bs8hc_2", Mw = "_cell_bs8hc_6", Bw = "_condition_bs8hc_11", Dw = "_action_bs8hc_18", Pw = "_contract_bs8hc_24", Ow = "_contractCondition_bs8hc_33", Hw = "_contractAction_bs8hc_39", K = {
  row: qw,
  cell: Mw,
  condition: Bw,
  action: Dw,
  contract: Pw,
  contractCondition: Ow,
  contractAction: Hw
}, Dn = ["advance", "block", "escalate", "requestReview"], ln = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function sa(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Pa(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: K.action, children: ln[e.then] }) : /* @__PURE__ */ n(
    T,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: Dn.map((l) => ({ value: l, label: ln[l] }))
    }
  );
}
function Fw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: K.condition, title: sa(e, r), children: sa(e, r) }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: Pa(e, a, t) })
  ] });
}
function jw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ o("td", { className: K.cell, children: [
      /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: K.condition, children: sa(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: K.cell, children: Pa(e, a, t) })
  ] });
}
function Ww({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: K.contract, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: K.contractCondition, children: sa(e, r) }),
    /* @__PURE__ */ n(h, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: K.contractAction, children: Pa(e, a, t, !0) })
  ] });
}
const zw = { two: jw, four: Fw, contract: Ww };
function $k(e) {
  var t;
  if (!Dn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = zw[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Gw = "_column_lurgk_2", Kw = "_head_lurgk_17", Uw = "_index_lurgk_23", Vw = "_name_lurgk_29", Yw = "_meta_lurgk_38", Jw = "_mono_lurgk_43", Xw = "_gate_lurgk_50", Qw = "_reviewersLabel_lurgk_57", Zw = "_reviewers_lurgk_57", e_ = "_reviewer_lurgk_57", a_ = "_agents_lurgk_74", n_ = "_workflowColumn_lurgk_79", t_ = "_workflowHead_lurgk_96", r_ = "_stageRow_lurgk_102", l_ = "_stageLabel_lurgk_109", o_ = "_workflowTitle_lurgk_116", i_ = "_workflowMeta_lurgk_122", c_ = "_workflowGate_lurgk_127", s_ = "_gateNote_lurgk_135", d_ = "_cardNote_lurgk_140", u_ = "_reviewerList_lurgk_149", m_ = "_reviewerRow_lurgk_155", h_ = "_reviewerMark_lurgk_161", w_ = "_reviewerName_lurgk_171", __ = "_terminalCard_lurgk_177", v_ = "_terminalCount_lurgk_186", f_ = "_workflowAgents_lurgk_192", b_ = "_mount_lurgk_198", y = {
  column: Gw,
  head: Kw,
  index: Uw,
  name: Vw,
  meta: Yw,
  mono: Jw,
  gate: Xw,
  reviewersLabel: Qw,
  reviewers: Zw,
  reviewer: e_,
  agents: a_,
  workflowColumn: n_,
  workflowHead: t_,
  stageRow: r_,
  stageLabel: l_,
  workflowTitle: o_,
  workflowMeta: i_,
  workflowGate: c_,
  gateNote: s_,
  cardNote: d_,
  reviewerList: u_,
  reviewerRow: m_,
  reviewerMark: h_,
  reviewerName: w_,
  terminalCard: __,
  terminalCount: v_,
  workflowAgents: f_,
  mount: b_
}, p_ = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Pn(e) {
  return `${Math.round(e * 100)}%`;
}
function g_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ha, { cells: [
      { value: Pn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: X(e.count), label: "In stage" }
    ] })
  ] });
}
function N_({ stage: e }) {
  return /* @__PURE__ */ n(ha, { cells: [
    { value: X(e.count), label: "In stage" },
    { value: X(e.closedThisWeek ?? 0), label: "Closed this week" }
  ] });
}
function y_({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(h, { role: e.kind === "gate" ? "gate" : "soft", label: p_[e.kind] })
  ] });
}
function k_({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: y.meta, children: [
    /* @__PURE__ */ o("span", { className: y.mono, children: [
      X(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: y.mono, children: [
      ne(e.medianWait),
      " median wait"
    ] })
  ] });
}
function $_({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(g_, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(N_, { stage: e }) : null;
}
function C_({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function S_({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: y.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(y_, { stage: e, titleId: l }),
    /* @__PURE__ */ n(k_, { stage: e }),
    /* @__PURE__ */ n($_, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(Uu, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(C_, { onMount: t })
  ] });
}
const R_ = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function T_({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a) => /* @__PURE__ */ o("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, a.initials)) });
}
function L_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(T_, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Pn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function A_({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: e.closedThisWeek ?? 0 }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: "items closed this week" })
  ] });
}
function x_(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function E_(e) {
  if (e.kind === "terminal") return `${e.closedThisWeek ?? 0} this week`;
  const a = x_(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function I_({ stage: e, titleId: a }) {
  const t = R_[e.kind];
  return /* @__PURE__ */ o("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: y.stageRow, children: [
      /* @__PURE__ */ o("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(h, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: E_(e) })
  ] });
}
function q_(e) {
  return e === "entry" || e === "agent";
}
function M_({ stage: e, onMount: a }) {
  return a === void 0 || !q_(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function B_({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(I_, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(L_, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(A_, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(M_, { stage: e, onMount: t })
  ] });
}
function D_(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function Ck(e) {
  return D_(e) ? /* @__PURE__ */ n(B_, { ...e }) : /* @__PURE__ */ n(S_, { ...e });
}
const P_ = "_row_ve78g_6", O_ = "_cell_ve78g_10", H_ = "_name_ve78g_19", F_ = "_chain_ve78g_26", j_ = "_owner_ve78g_32", W_ = "_mono_ve78g_38", z_ = "_compactRow_ve78g_45", G_ = "_compactCell_ve78g_54", K_ = "_stack_ve78g_71", U_ = "_stat_ve78g_78", V_ = "_identityLine_ve78g_85", Y_ = "_identity_ve78g_85", J_ = "_compactName_ve78g_103", X_ = "_ownerLine_ve78g_117", Q_ = "_link_ve78g_130", Z_ = "_emptyChain_ve78g_136", ev = "_arrow_ve78g_142", av = "_muted_ve78g_143", nv = "_define_ve78g_148", tv = "_statValue_ve78g_155", rv = "_policyId_ve78g_161", lv = "_sub_ve78g_166", f = {
  row: P_,
  cell: O_,
  name: H_,
  chain: F_,
  owner: j_,
  mono: W_,
  compactRow: z_,
  compactCell: G_,
  stack: K_,
  stat: U_,
  identityLine: V_,
  identity: Y_,
  compactName: J_,
  ownerLine: X_,
  link: Q_,
  emptyChain: Z_,
  arrow: ev,
  muted: av,
  define: nv,
  statValue: tv,
  policyId: rv,
  sub: lv
};
function ov(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function iv(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function cv(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${e.members} members`;
}
function sv(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ o("span", { className: f.stack, children: [
    /* @__PURE__ */ o("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(h, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: cv(e) })
  ] }) });
}
function dv(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(h, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function uv(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : dv(e) });
}
function on(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function mv(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function hv(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function wv({ stream: e, href: a, presentation: t }) {
  const r = iv(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": `var(--ward-stream-${e.streamStep}-chip)` }, children: [
    sv(e, a),
    uv(e.stages, a),
    on(hv(e.agents), e.agents === void 0 ? void 0 : ov(e.agents), "—"),
    mv(e.policy),
    on(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function _v(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function Sk(e) {
  if (_v(e)) return wv(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: f.row, children: [
    /* @__PURE__ */ o("td", { className: f.cell, children: [
      /* @__PURE__ */ n("a", { className: f.name, href: t, children: a.name }),
      /* @__PURE__ */ n(h, { role: "stream", label: a.key, streamStep: a.streamStep }),
      a.draft && /* @__PURE__ */ n(h, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, children: /* @__PURE__ */ n("span", { className: f.chain, children: a.stages.map((r) => /* @__PURE__ */ n(h, { role: r.gate ? "gate" : "soft", label: r.name }, r.name)) }) }),
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
      /* @__PURE__ */ o("span", { className: f.mono, children: [
        X(a.members),
        " members"
      ] })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: X(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : ne(a.p50) }) })
  ] });
}
const vv = "_row_1nbe9_2", fv = "_name_1nbe9_15", bv = "_scope_1nbe9_25", da = {
  row: vv,
  name: fv,
  scope: bv
};
function pv(e) {
  return e === void 0 ? `${da.row} ward-toolrow` : `${da.row} ward-toolrow ${e}`;
}
function gv(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Nv({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function yv({ classification: e }) {
  return /* @__PURE__ */ n(h, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function kv({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${da.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function $v(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Rk({ tool: e, onChange: a, presentation: t }) {
  const r = $(), l = $(), i = gv(e, t), c = $v(t);
  return /* @__PURE__ */ o(c, { className: pv(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Nv, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${da.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(kv, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(yv, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(h, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Cv = "_strip_g84q9_2", Sv = "_head_g84q9_10", Rv = "_name_g84q9_16", Tv = "_chart_g84q9_24", Lv = "_segment_g84q9_30", Av = "_detailedChart_g84q9_36", pe = {
  strip: Cv,
  head: Sv,
  name: Rv,
  chart: Tv,
  segment: Lv,
  detailedChart: Av
}, Ta = [1, 2, 3, 4, 5, 6], ua = 100;
function xv(e, a) {
  return a.has(e) ? `var(--ward-stream-${e}-id, var(--ward-color-line2))` : "var(--ward-color-line)";
}
function Ev({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: pe.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ta.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: pe.segment,
      x: l * ua,
      y: "0",
      width: ua,
      height: "8",
      fill: xv(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Iv(e) {
  return e !== null && Ye(e) ? ft(e) : H.color.line2;
}
function qv(e) {
  const a = e.slice(0, Ta.length);
  for (; a.length < Ta.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Mv({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${pe.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ua),
        y: "0",
        width: String(ua),
        height: "40",
        style: { fill: Iv(a.streamStep) }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function On(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Bv(e) {
  const a = qv(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("section", { className: `${pe.strip} ward-appearance`, "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(_a, { item: e.sample, onOpen: On(e.onOpen), feed: null }),
    /* @__PURE__ */ o("p", { className: `${pe.head} ward-envrow ward-appearance-head`, children: [
      /* @__PURE__ */ n("span", { className: "ward-identity", "aria-hidden": "true" }),
      t.streamStep !== null && Ye(t.streamStep) ? /* @__PURE__ */ n(h, { role: "stream", label: t.key, streamStep: t.streamStep }) : /* @__PURE__ */ n(h, { role: "meta", label: t.key }),
      /* @__PURE__ */ n("span", { className: `${pe.name} ward-rowlink`, children: t.name })
    ] }),
    /* @__PURE__ */ n("p", { className: "ward-checklist-note", children: "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on." }),
    /* @__PURE__ */ n(Mv, { identities: a })
  ] });
}
function Dv({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": `var(--ward-stream-${e.streamStep}-id)` };
  return /* @__PURE__ */ o("section", { className: pe.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ n(xe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: pe.name, children: e.name }),
      /* @__PURE__ */ n(h, { role: "stream", label: e.key, streamStep: e.streamStep })
    ] }),
    /* @__PURE__ */ n(_a, { item: { ...a, streamStep: e.streamStep }, onOpen: On(r) }),
    /* @__PURE__ */ n(Ev, { draft: e, streams: t })
  ] });
}
function Tk(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Bv, { ...e }) : /* @__PURE__ */ n(Dv, { ...e });
}
const Pv = "_row_ixlg5_6", Ov = "_headCell_ixlg5_10", Hv = "_cell_ixlg5_11", Fv = "_name_ixlg5_23", jv = "_consequence_ixlg5_29", Wv = "_governed_ixlg5_36", zv = "_control_ixlg5_42", Gv = "_byRole_ixlg5_48", Kv = "_webControl_ixlg5_59", Uv = "_webConsequence_ixlg5_65", Vv = "_webGoverned_ixlg5_71", q = {
  row: Pv,
  headCell: Ov,
  cell: Hv,
  name: Fv,
  consequence: jv,
  governed: Wv,
  control: zv,
  byRole: Gv,
  webControl: Kv,
  webConsequence: Uv,
  webGoverned: Vv
};
function Yv({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: q.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: q.control, children: [
    /* @__PURE__ */ n(
      Ae,
      {
        label: `${e.name} — ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(h, { role: "running", label: "PILOT" })
  ] });
}
function Jv({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: q.headCell, children: [
      /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: q.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: q.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Yv, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Xv(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Qv({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${q.webControl} ${q.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Ae,
    {
      label: `${e} — step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (l) => t == null ? void 0 : t(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${q.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(h, { role: "running", label: "PILOT" }),
    r
  ] });
}
function Zv({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${q.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Qv, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webGoverned} ward-cellmeta`, children: Xv(e) }) })
  ] });
}
function Lk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Zv, { ...e }) : /* @__PURE__ */ n(Jv, { ...e });
}
const ef = "_row_vv64h_2", af = "_cell_vv64h_6", nf = "_name_vv64h_25", tf = "_note_vv64h_30", rf = "_webName_vv64h_41", lf = "_webMeta_vv64h_47", W = {
  row: ef,
  cell: af,
  name: nf,
  note: tf,
  webName: rf,
  webMeta: lf
}, Hn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function of(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function cf({ component: e, onRestart: a }) {
  const t = $(), r = Hn[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: W.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: W.cell, "data-mono": "true", children: [
      X(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { id: t, className: W.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: W.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(v, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function sf({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: of(e.state) });
}
function df({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(h, { ...Hn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(sf, { component: e, onRestart: a }) })
  ] });
}
function Ak(e) {
  return "presentation" in e ? /* @__PURE__ */ n(df, { ...e }) : /* @__PURE__ */ n(cf, { ...e });
}
const uf = "_row_1f1gp_7", mf = "_cell_1f1gp_11", hf = "_next_1f1gp_28", wf = "_headCell_1f1gp_38", _f = "_webId_1f1gp_77", vf = "_webPurpose_1f1gp_83", ff = "_webMeta_1f1gp_91", bf = "_webUrgent_1f1gp_97", P = {
  row: uf,
  cell: mf,
  next: hf,
  headCell: wf,
  webId: _f,
  webPurpose: vf,
  webMeta: ff,
  webUrgent: bf
}, pf = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, gf = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, Fn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Nf = Object.fromEntries(Fn.map((e) => [e.key, e]));
function De({ column: e, children: a }) {
  const t = Nf[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: P.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function xk() {
  return /* @__PURE__ */ n("tr", { children: Fn.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: P.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function yf({ cred: e }) {
  const a = pf[e.state];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ n(De, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(De, { column: "id", children: e.id }),
    /* @__PURE__ */ n(De, { column: "state", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(De, { column: "cls", children: /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(De, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(De, { column: "next", children: /* @__PURE__ */ n("span", { className: P.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function kf({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${P.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${P.webMeta} ${P.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function $f({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(kf, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(h, { ...gf[e.state] }) })
  ] });
}
function Ek(e) {
  return "presentation" in e ? /* @__PURE__ */ n($f, { ...e }) : /* @__PURE__ */ n(yf, { ...e });
}
const Cf = "_card_17zba_2", Sf = "_head_17zba_11", Rf = "_env_17zba_18", Tf = "_version_17zba_25", Lf = "_meta_17zba_32", Af = "_webCard_17zba_37", xf = "_webRow_17zba_47", Ef = "_webTitle_17zba_55", If = "_webLine_17zba_65", qf = "_webVersion_17zba_72", Mf = "_webMeta_17zba_77", j = {
  card: Cf,
  head: Sf,
  env: Rf,
  version: Tf,
  meta: Lf,
  webCard: Af,
  webRow: xf,
  webTitle: Ef,
  webLine: If,
  webVersion: qf,
  webMeta: Mf
}, jn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Bf({ env: e }) {
  const a = jn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: j.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ o("div", { className: j.head, children: [
      /* @__PURE__ */ n("span", { className: j.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: j.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: j.meta, children: [
      "deployed ",
      te(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: j.meta, children: t })
  ] });
}
function Df(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [te(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Pf(e) {
  return /* @__PURE__ */ o("article", { className: `${j.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${j.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${j.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(h, { ...jn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${j.version} ${j.webVersion} ${j.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${j.meta} ${j.webMeta} ${j.webLine} ward-cellmeta`, children: Df(e) })
  ] });
}
function Ik(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Pf, { ...e }) : /* @__PURE__ */ n(Bf, { ...e });
}
const Of = "_upload_erepj_2", Hf = "_preview_erepj_7", Ff = "_mark_erepj_17", jf = "_empty_erepj_22", Wf = "_actions_erepj_28", zf = "_input_erepj_33", Gf = "_reasons_erepj_41", Kf = "_reason_erepj_41", Uf = "_accepted_erepj_57", V = {
  upload: Of,
  preview: Hf,
  mark: Ff,
  empty: jf,
  actions: Wf,
  input: zf,
  reasons: Gf,
  reason: Kf,
  accepted: Uf
}, Wn = 1.5, zn = 22, Ve = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Wn}px at ${zn}px`];
function Vf() {
  return { ok: !1, reasons: [Ve[1]] };
}
function Yf(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function Jf(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ve[0]] : [];
}
function Xf(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ve[1]), e.querySelector("text") !== null && t.push(Ve[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function Qf(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? zn / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Wn;
  }) ? [Ve[3]] : [];
}
function qk(e) {
  const a = Yf(e);
  if (a === null) return Vf();
  const t = [...Jf(a), ...Xf(a, e), ...Qf(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const Zf = "Mark accepted.";
function eb({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: V.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: V.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: V.empty }) });
}
function ab(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function nb(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function tb({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: V.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: V.result, role: "status", children: /* @__PURE__ */ n("p", { className: V.accepted, children: Zf }) }) : /* @__PURE__ */ n("div", { className: V.result, role: "status", children: /* @__PURE__ */ n("ul", { className: V.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: V.reason, children: a }, a)) }) });
}
function rb({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(tb, { result: e }) : /* @__PURE__ */ n("p", { className: `${V.result} ${ab(e, t)}`, role: "status", children: nb(e, t) });
}
function Mk({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = N(null), [i, c] = g(null), d = (u) => {
    if (u === void 0) return;
    const s = a(u);
    s instanceof Promise ? s.then(c) : c(s);
  };
  return /* @__PURE__ */ o("div", { className: V.upload, children: [
    /* @__PURE__ */ n(eb, { current: e }),
    /* @__PURE__ */ o("div", { className: V.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: l,
          className: V.input,
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
    /* @__PURE__ */ n(rb, { result: i, presentation: r })
  ] });
}
const lb = "_row_1wp9s_7", ob = "_cell_1wp9s_11", ib = "_head_1wp9s_28", cb = "_name_1wp9s_34", sb = "_pinned_1wp9s_42", db = "_headCell_1wp9s_49", ub = "_webName_1wp9s_88", mb = "_webMeta_1wp9s_95", hb = "_webWarn_1wp9s_103", A = {
  row: lb,
  cell: ob,
  head: ib,
  name: cb,
  pinned: sb,
  headCell: db,
  webName: ub,
  webMeta: mb,
  webWarn: hb
}, Oa = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, Gn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], wb = Object.fromEntries(Gn.map((e) => [e.key, e]));
function _b(e, a) {
  return `mcp.${e}.${a}`;
}
function vb(e) {
  return Object.keys(Oa).includes(e);
}
function fb(e) {
  return Oa[e !== void 0 && vb(e) ? e : "unknown"];
}
function ze({ column: e, children: a }) {
  const t = wb[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: A.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function Bk() {
  return /* @__PURE__ */ n("tr", { children: Gn.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: A.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function bb({ server: e }) {
  const a = Oa[e.connection];
  return /* @__PURE__ */ o("tr", { className: A.row, children: [
    /* @__PURE__ */ o(ze, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: A.head, children: [
        /* @__PURE__ */ n("span", { className: A.name, children: e.name }),
        /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: A.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(ze, { column: "connection", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(ze, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(ze, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(ze, { column: "tools", children: e.tools.map((t) => _b(e.name, t)).join(" · ") })
  ] });
}
function pb(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function gb(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Nb({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${A.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${A.webMeta} ward-cellmeta`, children: e });
}
function yb({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${A.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function kb({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function $b({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: A.row, children: [
    /* @__PURE__ */ o("td", { className: A.cell, children: [
      /* @__PURE__ */ n("span", { className: `${A.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${A.webMeta} ward-cellmeta`, children: pb(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: A.cell, children: /* @__PURE__ */ n("span", { className: `${A.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: A.cell, children: /* @__PURE__ */ n(h, { ...gb(e) }) }),
    /* @__PURE__ */ n("td", { className: A.cell, children: /* @__PURE__ */ n(Nb, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: A.cell, children: /* @__PURE__ */ n(h, { ...fb(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: A.cell, children: [
      /* @__PURE__ */ n(yb, { server: e, onRestart: a }),
      /* @__PURE__ */ n(kb, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function Dk(e) {
  return "presentation" in e ? /* @__PURE__ */ n($b, { ...e }) : /* @__PURE__ */ n(bb, { ...e });
}
const Cb = "_row_1h9nq_2", Sb = "_headCell_1h9nq_14", Rb = "_cell_1h9nq_15", Tb = "_name_1h9nq_26", Lb = "_consequence_1h9nq_32", Ab = "_reason_1h9nq_38", xb = "_value_1h9nq_44", Eb = "_webRow_1h9nq_60", Ib = "_webSetting_1h9nq_71", qb = "_webName_1h9nq_79", Mb = "_webConsequence_1h9nq_87", Bb = "_webControl_1h9nq_93", Db = "_webState_1h9nq_106", Pb = "_webChip_1h9nq_111", R = {
  row: Cb,
  headCell: Sb,
  cell: Rb,
  name: Tb,
  consequence: Lb,
  reason: Ab,
  value: xb,
  webRow: Eb,
  webSetting: Ib,
  webName: qb,
  webConsequence: Mb,
  webControl: Bb,
  webState: Db,
  webChip: Pb
}, Kn = 104, Un = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Ob({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ae, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(_n, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: R.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Hb({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = Un[t], c = t === "locked";
  return /* @__PURE__ */ o("tr", { className: R.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: R.headCell, children: [
      /* @__PURE__ */ n("span", { className: R.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: R.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: R.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: R.cell, children: /* @__PURE__ */ n(Ob, { control: a, name: e.name, locked: c, describedBy: c ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: R.cell, style: { width: Kn }, children: /* @__PURE__ */ n(h, { role: i.role, label: i.label }) })
  ] });
}
function Vn(e, a) {
  return String(e ?? a);
}
function Fb(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function jb(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Vn(e.value, "—");
}
function Wb({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: R.webControl, children: [
    /* @__PURE__ */ n(Ae, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => l == null ? void 0 : l(c) }),
    /* @__PURE__ */ n("span", { className: R.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function zb(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(Wb, { ...e });
  const l = Fb(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: R.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(_n, { options: l, value: Vn(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${R.webControl} ${R.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: jb(a) });
}
function Gb({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const c = $(), d = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${R.row} ${R.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: R.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${R.name} ${R.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: c, className: `${R.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: R.webControl, children: i(c) }) : /* @__PURE__ */ n(zb, { control: a, name: e.name, locked: d, describedBy: d ? c : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${R.webChip} ward-policy-chip`, style: { width: Kn }, children: /* @__PURE__ */ n(h, { ...Un[t], size: "tag" }) })
  ] });
}
function Pk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Gb, { ...e }) : /* @__PURE__ */ n(Hb, { ...e });
}
const Kb = "_label_1o9za_7", Ub = "_name_1o9za_15", Vb = "_column_1o9za_24", Yb = "_webFrame_1o9za_57", Jb = "_webHead_1o9za_62", Xb = "_webHeadLabel_1o9za_74", Qb = "_webLabel_1o9za_112", Zb = "_webColumns_1o9za_119", ep = "_webGroup_1o9za_125", ap = "_webPeople_1o9za_126", np = "_webVia_1o9za_127", tp = "_webMeta_1o9za_156", O = {
  label: Kb,
  name: Ub,
  column: Vb,
  webFrame: Yb,
  webHead: Jb,
  webHeadLabel: Xb,
  webLabel: Qb,
  webColumns: Zb,
  webGroup: ep,
  webPeople: ap,
  webVia: np,
  webMeta: tp
}, rp = {
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
function lp(e) {
  if (!e.matrixRole) return;
  const a = rp[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function op({ node: e }) {
  const a = lp(e);
  return /* @__PURE__ */ o("span", { className: O.label, children: [
    /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
    /* @__PURE__ */ n(ip, { role: a, node: e }),
    /* @__PURE__ */ n(ya, { column: Na[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(ya, { column: Na[1], children: e.people === void 0 ? "" : X(e.people) }),
    /* @__PURE__ */ n(ya, { column: Na[2], children: e.requestedVia ?? "" })
  ] });
}
function ip({ role: e, node: a }) {
  return /* @__PURE__ */ o(B, { children: [
    e && /* @__PURE__ */ n(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(h, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(h, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function cp({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    gn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(op, { node: t }),
      children: c
    }
  );
}
function ka({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function sp({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${O.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(ka, { className: `${O.webMeta} ${O.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(ka, { className: `${O.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(ka, { className: `${O.webMeta} ${O.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function dp() {
  return /* @__PURE__ */ o("div", { className: O.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: O.webColumns, children: [
      /* @__PURE__ */ n("span", { className: O.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: O.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: O.webVia, children: "Requested via" })
    ] })
  ] });
}
function up({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${O.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function mp(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function hp({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: O.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(dp, {}),
    /* @__PURE__ */ n(ec, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      gn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(up, { row: t }),
        detail: /* @__PURE__ */ n(sp, { row: t }),
        expanded: mp(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function Ok(e) {
  return "presentation" in e ? /* @__PURE__ */ n(hp, { ...e }) : /* @__PURE__ */ n(cp, { ...e });
}
const wp = "_runbook_b9agc_2", _p = "_list_b9agc_7", vp = "_step_b9agc_15", fp = "_numeral_b9agc_21", bp = "_body_b9agc_28", pp = "_head_b9agc_34", gp = "_title_b9agc_40", Np = "_detail_b9agc_45", yp = "_actions_b9agc_50", kp = "_webList_b9agc_56", $p = "_webStep_b9agc_60", Cp = "_webBody_b9agc_66", Sp = "_webTitle_b9agc_74", Rp = "_webDetail_b9agc_78", S = {
  runbook: wp,
  list: _p,
  step: vp,
  numeral: fp,
  body: bp,
  head: pp,
  title: gp,
  detail: Np,
  actions: yp,
  webList: kp,
  webStep: $p,
  webBody: Cp,
  webTitle: Sp,
  webDetail: Rp
}, Yn = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function Jn(e) {
  return String(e + 1).padStart(2, "0");
}
function Tp({ step: e, index: a, connection: t }) {
  const r = Yn[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: S.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: Jn(a) }),
    /* @__PURE__ */ o("span", { className: S.body, children: [
      /* @__PURE__ */ o("span", { className: S.head, children: [
        /* @__PURE__ */ n("span", { className: S.title, children: e.title }),
        /* @__PURE__ */ n(h, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: S.detail, children: e.detail })
    ] })
  ] });
}
function Lp({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, l) => /* @__PURE__ */ n(Tp, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function Ap({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Jn(a) }),
    /* @__PURE__ */ o("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(h, { ...Yn[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function xp({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(Ap, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function Hk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(xp, { ...e }) : /* @__PURE__ */ n(Lp, { ...e });
}
const Ep = "_list_1gu6a_2", Ip = "_check_1gu6a_10", qp = "_body_1gu6a_16", Mp = "_text_1gu6a_23", Bp = "_pending_1gu6a_32", Dp = "_measured_1gu6a_37", Oe = {
  list: Ep,
  check: Ip,
  body: qp,
  text: Mp,
  pending: Bp,
  measured: Dp
};
function Pp(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Op({ check: e }) {
  const a = Pp(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Oe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Ma, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Oe.body, children: [
      /* @__PURE__ */ n("span", { className: Oe.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Oe.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Oe.measured, children: e.measured })
  ] });
}
function Fk({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Oe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Op, { check: a }, a.text)) });
}
const Hp = "_root_16pdz_2", Fp = "_list_16pdz_9", jp = "_line_16pdz_16", Wp = "_at_16pdz_43", zp = "_text_16pdz_47", Gp = "_foot_16pdz_51", Kp = "_idle_16pdz_62", Up = "_caret_16pdz_69", Vp = "_jump_16pdz_76", ve = {
  root: Hp,
  list: Fp,
  line: jp,
  at: Wp,
  text: zp,
  foot: Gp,
  idle: Kp,
  caret: Up,
  jump: Vp
}, Yp = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Ha(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Yp.format(new Date(e));
}
const Jp = { warn: "warning", ok: "ok" };
function Xp({ kind: e }) {
  const a = Jp[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Qp({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Ha(e)}` });
}
function Zp({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events — as of ${Ha(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(Qp, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function jk({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = N(null), [i, c] = g(0), d = e.at(-1);
  L(() => {
    c(e.length);
  }, [e.length]);
  const u = () => {
    var _;
    const s = l.current;
    if (!s) return;
    s.scrollTop = s.scrollHeight;
    const m = s.querySelectorAll("[data-consline-text]");
    (_ = m.item(m.length - 1)) == null || _.focus();
  };
  return /* @__PURE__ */ o("div", { className: ve.root, children: [
    /* @__PURE__ */ n("ol", { className: ve.list, ref: l, "aria-live": "off", "aria-label": r, children: e.map((s, m) => /* @__PURE__ */ o("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${s.kind}`, "data-kind": s.kind, "data-revealed": m < i, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: Ha(s.at) }),
      /* @__PURE__ */ n(Xp, { kind: s.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: s.text })
    ] }, `${s.at}-${m}`)) }),
    /* @__PURE__ */ n(Zp, { connection: a, idleSince: t, last: d, children: /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const eg = "_row_11jhe_2", ag = "_head_11jhe_14", ng = "_author_11jhe_20", tg = "_eta_11jhe_25", rg = "_edited_11jhe_26", lg = "_body_11jhe_32", og = "_reason_11jhe_37", ig = "_actions_11jhe_42", we = {
  row: eg,
  head: ag,
  author: ng,
  eta: tg,
  edited: rg,
  body: lg,
  reason: og,
  actions: ig
}, cg = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function sg(e) {
  return {
    queued: `Still in the outbox — editing replaces the queued row and recomputes req_hash, so ${e} receives one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed — edit and resend, or cancel the delivery."
  };
}
function dg({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function ug({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: we.reason, id: a, children: e })
  ] });
}
function mg(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function hg(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(dg, { ...e }) : /* @__PURE__ */ n(ug, { reason: e.unavailable, reasonId: e.unavailableId });
}
function Wk(e) {
  const { comment: a } = e;
  mg(e);
  const t = $(), r = `${t}-unavailable`, l = cg[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${we.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: we.head, children: [
      /* @__PURE__ */ n("span", { className: we.author, children: a.author }),
      /* @__PURE__ */ n(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: we.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: we.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: we.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: we.reason, id: t, children: sg(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: we.actions, children: /* @__PURE__ */ n(hg, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const wg = "_root_c46wj_2", _g = "_attach_c46wj_11", vg = "_actions_c46wj_17", fg = "_reply_c46wj_23", bg = "_replyRow_c46wj_28", pg = "_sendsAs_c46wj_42", Fe = {
  root: wg,
  attach: _g,
  actions: vg,
  reply: fg,
  replyRow: bg,
  sendsAs: pg
};
function gg({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = g(""), i = $();
  return /* @__PURE__ */ o("div", { className: Fe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Fe.replyRow, children: [
      /* @__PURE__ */ n(T, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Fe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function zk(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(gg, { ...e }) : /* @__PURE__ */ n(Ng, { ...e });
}
function Ng({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [c, d] = g("");
  return /* @__PURE__ */ o("div", { className: Fe.root, children: [
    /* @__PURE__ */ n(T, { kind: "textarea", label: e, value: c, onChange: d }),
    t && /* @__PURE__ */ o("div", { className: Fe.attach, children: [
      /* @__PURE__ */ n(h, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      wn,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Fe.actions, children: [
      /* @__PURE__ */ n(v, { variant: "primary", onClick: () => l(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(v, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const yg = "_list_1ih9e_2", kg = "_item_1ih9e_6", $g = "_body_1ih9e_22", Cg = "_text_1ih9e_28", Sg = "_evidence_1ih9e_37", Rg = "_consequence_1ih9e_49", Tg = "_note_1ih9e_54", Le = {
  list: yg,
  item: kg,
  body: $g,
  text: Cg,
  evidence: Sg,
  consequence: Rg,
  note: Tg
};
function Lg({ criterion: e }) {
  return /* @__PURE__ */ n(xe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function cn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Ag(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function xg({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Le.body, children: [
    /* @__PURE__ */ n("span", { className: Le.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(B, { children: [
      /* @__PURE__ */ n(cn, { text: " — " }),
      /* @__PURE__ */ n("code", { className: Le.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(B, { children: [
      /* @__PURE__ */ n(cn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Le.consequence, children: Ag(e.why) })
    ] })
  ] });
}
function Eg({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Le.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Lg, { criterion: e }),
    /* @__PURE__ */ n(xg, { criterion: e })
  ] });
}
function Gk({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Le.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Eg, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Le.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Ig = "_list_dwhoz_2", qg = "_rung_dwhoz_6", Mg = "_name_dwhoz_18", Bg = "_actor_dwhoz_32", na = {
  list: Ig,
  rung: qg,
  name: Mg,
  actor: Bg
}, Dg = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function Pg({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = Dg[e.state];
  return /* @__PURE__ */ o("li", { className: na.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: na.name, children: e.name }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${na.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function Kk({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${na.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(Pg, { rung: a }, a.name)) });
}
const Og = "_sheet_1fqco_2", Hg = "_title_1fqco_9", Fg = "_stage_1fqco_15", jg = "_effects_1fqco_20", Wg = "_effect_1fqco_20", zg = "_numeral_1fqco_31", Gg = "_effectText_1fqco_38", Kg = "_refusals_1fqco_43", Ug = "_reasons_1fqco_52", Vg = "_reason_1fqco_52", Yg = "_actions_1fqco_62", ie = {
  sheet: Og,
  title: Hg,
  stage: Fg,
  effects: jg,
  effect: Wg,
  numeral: zg,
  effectText: Gg,
  refusals: Kg,
  reasons: Ug,
  reason: Vg,
  actions: Yg
};
function Jg({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function Uk({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: c }) {
  const d = $(), u = `${d}-refusal`, [s, m] = g(""), _ = t.length > 0;
  return /* @__PURE__ */ n(Je, { kind: "sheet", labelledBy: d, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ o("div", { className: ie.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ie.title, id: d, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ie.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ie.effects, children: a.map((b, D) => /* @__PURE__ */ o("li", { className: ie.effect, children: [
      /* @__PURE__ */ n("span", { className: ie.numeral, children: String(D + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ie.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      Uo,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(T, { kind: "textarea", label: "Note for the agent", value: s, onChange: m }),
    _ && /* @__PURE__ */ o("div", { className: ie.refusals, children: [
      /* @__PURE__ */ n(h, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ie.reasons, children: t.map((b, D) => /* @__PURE__ */ n("li", { className: ie.reason, id: D === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ie.actions, children: [
      /* @__PURE__ */ n(Jg, { refused: _, reasonId: u, note: s, onRequeue: l }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const Xg = "_list_1hvqu_2", Qg = "_path_1hvqu_7", Zg = "_head_1hvqu_21", eN = "_label_1hvqu_28", aN = "_consequence_1hvqu_35", nN = "_ask_1hvqu_36", He = {
  list: Xg,
  path: Qg,
  head: Zg,
  label: eN,
  consequence: aN,
  ask: nN
}, La = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function sn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function tN({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: La[e.kind] }) : /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: La[e.kind] }),
    /* @__PURE__ */ n("span", { className: He.ask, id: r, children: e.askInstead })
  ] });
}
function rN({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: He.path, "data-allowed": e.allowed, "data-role": sn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: He.head, children: [
      /* @__PURE__ */ n("span", { className: He.label, children: e.title ?? La[e.kind] }),
      /* @__PURE__ */ n(h, { role: sn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: He.consequence, children: e.consequence }),
    /* @__PURE__ */ n(tN, { path: e, primary: a, onChoose: t })
  ] });
}
function Vk({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: He.list, children: e.map((t, r) => /* @__PURE__ */ n(rN, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const lN = "_list_qjv4r_2", oN = "_item_qjv4r_6", iN = "_node_qjv4r_18", cN = "_body_qjv4r_24", sN = "_head_qjv4r_30", dN = "_stage_qjv4r_36", uN = "_version_qjv4r_41", mN = "_sentence_qjv4r_49", hN = "_meta_qjv4r_54", fe = {
  list: lN,
  item: oN,
  node: iN,
  body: cN,
  head: sN,
  stage: dN,
  version: uN,
  sentence: mN,
  meta: hN
}, wN = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function _N({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: fe.head, children: [
    /* @__PURE__ */ n("span", { className: fe.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: fe.version, title: e.version, children: e.version }) : null
  ] });
}
function vN({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${fe.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${fe.node} ward-history-node`, children: /* @__PURE__ */ n(xe, { size: 9, kind: wN[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${fe.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(_N, { entry: e }),
      /* @__PURE__ */ n("span", { className: fe.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${fe.meta} ward-history-meta`, children: [
        `${te(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${Y(e.cost)}`
      ] })
    ] })
  ] });
}
function Yk({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${fe.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(vN, { entry: a }, a.stage + String(t))) });
}
const fN = "_thread_1kn6s_3", bN = "_turn_1kn6s_8", pN = "_who_1kn6s_27", gN = "_body_1kn6s_32", ta = {
  thread: fN,
  turn: bN,
  who: pN,
  body: gN
}, Xn = We(!1);
function Jk({ children: e, density: a }) {
  return /* @__PURE__ */ n(Xn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ta.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function Xk({ turn: e }) {
  if (!je(Xn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ta.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ta.who} ward-chat-who`, children: [
      e.author,
      " · ",
      te(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ta.body} ward-chat-body`, children: e.body })
  ] });
}
const NN = "_list_1rt9c_3", yN = "_row_1rt9c_7", kN = "_label_1rt9c_20", $N = "_n_1rt9c_26", CN = "_cause_1rt9c_33", Ke = {
  list: NN,
  row: yN,
  label: kN,
  n: $N,
  cause: CN
};
function SN(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const RN = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function TN({ row: e, formatNumber: a }) {
  return SN(e), /* @__PURE__ */ o("li", { className: `${Ke.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(xe, { size: 8, ...RN[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Ke.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Ke.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(LN, { cause: e.cause })
  ] });
}
function LN({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ke.cause} ward-healthrow-cause`, children: e }) : null;
}
function Qk({ rows: e, formatNumber: a = X }) {
  return /* @__PURE__ */ n("ul", { className: `${Ke.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(TN, { row: t, formatNumber: a }, t.label)) });
}
const AN = "_root_1jxwp_2", xN = {
  root: AN
};
function Zk({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: xN.root, "data-density": l, children: [
    /* @__PURE__ */ n(va, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(v, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const EN = "_row_dhbre_3", IN = "_key_dhbre_13", qN = "_stack_dhbre_24", MN = "_value_dhbre_32", BN = "_evidence_dhbre_39", DN = "_mark_dhbre_47", Pe = {
  row: EN,
  key: IN,
  stack: qN,
  value: MN,
  evidence: BN,
  mark: DN
};
function PN({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(h, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ma, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function e1({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Pe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Pe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Pe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Pe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Pe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Pe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(PN, { state: e.state }) })
  ] });
}
const ON = "_cell_1monp_2", HN = {
  cell: ON
}, FN = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function jN(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function WN(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function zN(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: jN(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function GN(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function a1({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  WN(e, t);
  const r = GN(e);
  return /* @__PURE__ */ n(
    ii,
    {
      label: "Rejection routing",
      columns: FN,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: HN.cell, "data-norerun": l.noRerun ? !0 : void 0, children: zN(l, i) }),
      empty: a ?? /* @__PURE__ */ n(Mc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const KN = "_row_ute8v_2", UN = "_title_ute8v_11", VN = "_turns_ute8v_20", YN = "_waiting_ute8v_21", JN = "_resolved_ute8v_22", XN = "_activity_ute8v_23", QN = "_cost_ute8v_29", ZN = "_link_ute8v_30", ey = "_tableRow_ute8v_47", ay = "_tableTitle_ute8v_59", ny = "_tableResolved_ute8v_64", ty = "_tableLink_ute8v_68", ry = "_tableMeta_ute8v_83", ly = "_tableCost_ute8v_90", oy = "_tableActivity_ute8v_91", iy = "_tableState_ute8v_101", cy = "_tableRecord_ute8v_112", I = {
  row: KN,
  title: UN,
  turns: VN,
  waiting: YN,
  resolved: JN,
  activity: XN,
  cost: QN,
  link: ZN,
  tableRow: ey,
  tableTitle: ay,
  tableResolved: ny,
  tableLink: ty,
  tableMeta: ry,
  tableCost: ly,
  tableActivity: oy,
  tableState: iy,
  tableRecord: cy
}, Qn = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function sy(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function dy(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function uy(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const my = { duplicate: "CLOSED · DUPLICATE" };
function hy({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: I.tableMeta, children: `waiting on ${e}` });
}
function wy({ value: e }) {
  return /* @__PURE__ */ n("td", { className: I.tableCost, children: e === void 0 ? null : Y(e) });
}
function _y({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: I.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function vy({ session: e, href: a }) {
  const t = Qn[e.state];
  return /* @__PURE__ */ o("tr", { className: I.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: I.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: I.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: I.tableMeta, children: dy(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: I.tableResolved, children: [
      uy(e.resolved),
      /* @__PURE__ */ n(hy, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(wy, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: I.tableActivity, children: sy(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: I.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(h, { role: t.role, label: my[e.state] ?? t.label }),
      /* @__PURE__ */ n(_y, { link: e.link })
    ] }) })
  ] });
}
function fy({ session: e }) {
  const a = Qn[e.state];
  return /* @__PURE__ */ o("div", { className: I.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: I.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: I.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: I.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: I.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: I.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : Y(e.cost) }),
    /* @__PURE__ */ n("span", { className: I.activity, children: te(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: I.link, href: e.link.href, children: e.link.key }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function n1(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(vy, { session: e.session, href: e.href }) : /* @__PURE__ */ n(fy, { session: e.session });
}
const by = "_block_1yy2v_3", py = "_list_1yy2v_9", gy = "_line_1yy2v_14", Aa = {
  block: by,
  list: py,
  line: gy
}, Ny = { warn: "warning", ok: "ok" };
function yy({ kind: e }) {
  const a = Ny[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function ky({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Aa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(yy, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function t1({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Aa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Aa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(ky, { line: t }, `${r}-${t.text}`)) }) });
}
const $y = "_band_tt7hp_1", Cy = "_head_tt7hp_8", Sy = "_cell_tt7hp_19", Ry = "_index_tt7hp_35", Ty = "_title_tt7hp_42", Ly = "_note_tt7hp_48", Ay = "_cellTitle_tt7hp_53", xy = "_cellBody_tt7hp_58", Ey = "_tag_tt7hp_64", he = {
  band: $y,
  head: Cy,
  cell: Sy,
  index: Ry,
  title: Ty,
  note: Ly,
  cellTitle: Ay,
  cellBody: xy,
  tag: Ey
}, dn = 4;
function r1({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== dn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${dn}-cell grid`);
  return /* @__PURE__ */ o("section", { className: he.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: he.head, children: [
      /* @__PURE__ */ n("span", { className: he.index, children: e }),
      /* @__PURE__ */ n("span", { className: he.title, children: a }),
      /* @__PURE__ */ n("span", { className: he.note, children: t })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: he.cell, children: [
      /* @__PURE__ */ n("span", { className: he.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: he.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: he.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  jk as ActivityConsole,
  Uu as AgentCard,
  zy as AppShell,
  Tk as AppearanceStrip,
  r1 as Band,
  vs as BoardColumn,
  ck as BoardFootnote,
  sk as BoardHeader,
  ak as BoardScroller,
  v as Btn,
  Fy as CHIP_ROLES,
  Fn as CREDENTIAL_COLUMNS,
  Vy as Callout,
  Lk as CapabilityRow,
  Xk as ChatMessage,
  wn as Checkbox,
  h as Chip,
  Wk as ClarificationRow,
  pk as ClauseRuleRow,
  bk as ClauseRules,
  Cn as ColourLadder,
  Ak as ComponentRow,
  zk as Composer,
  uk as ConfigRow,
  dk as ConfigRowHead,
  Ba as ConnectionMark,
  Jk as Conversation,
  Uo as CostMeter,
  Ek as CredentialRow,
  xk as CredentialRowHead,
  Gk as CriteriaList,
  xr as Crumb,
  Qk as DeliveryHealth,
  tk as DeniedState,
  gk as DryRunRail,
  Mc as EmptyState,
  Ik as EnvCard,
  T as Field,
  nk as FilteredEmpty,
  Zy as FormStack,
  va as GateChecklist,
  Kk as GateLadder,
  ii as Grid,
  yk as HandoffRuleRow,
  Nk as HandoffRules,
  mk as ItemDrawer,
  vt as LIVE_EVENT_TYPES,
  _u as LegacyBoardColumn,
  wk as LegacyBoardHeader,
  _k as LegacyConfigRow,
  fk as LegacyItemDrawer,
  cu as LegacyOverCapNote,
  vk as LegacyPreviewRail,
  kn as LegacyWorkCard,
  ge as LiveIndicator,
  rk as LoadFailed,
  ik as Loading,
  Gn as MCP_SERVER_COLUMNS,
  Ma as Mark,
  Mk as MarkUpload,
  xe as Marker,
  Dk as McpServerRow,
  Bk as McpServerRowHead,
  kk as NewStreamModal,
  Pc as OverCapNote,
  Je as Overlay,
  fm as PARTIAL_STEP_REASON,
  Kn as POLICY_CHIP_WIDTH,
  Jy as PageFrame,
  Uy as PageHeader,
  Pk as PolicyRow,
  hk as PreviewRail,
  Na as ROLE_MATRIX_COLUMNS,
  Dn as RULE_ACTIONS,
  bn as Radio,
  Zk as ReadyChecklist,
  Qy as RecordSection,
  Uk as RequeueSheet,
  Vk as ResolveBlock,
  e1 as ResolvedFieldRow,
  Ok as RoleMatrixRow,
  a1 as RoutingTable,
  $k as RuleRow,
  Hk as RunbookSteps,
  wt as STREAM_STEPS,
  ek as SectionBand,
  $i as SectionHeader,
  _n as SegmentedControl,
  n1 as SessionRow,
  Ky as Sidebar,
  Ck as StageColumn,
  Yk as StageHistory,
  uw as StageListEditor,
  lk as StaleStrip,
  ha as StatStrip,
  Sk as StreamRow,
  Xy as SubjectRail,
  Ae as Switch,
  Gy as Tabs,
  Rk as ToolRow,
  Yy as TopBar,
  ec as Tree,
  gn as TreeRow,
  t1 as TypedInputBlock,
  Fk as ValidationList,
  By as VisibilityProvider,
  Dy as Visible,
  Hy as WARD_VERSION,
  _a as WorkCard,
  ok as WriteUnavailableStrip,
  sy as agoSince,
  ot as clock,
  Tw as colourStatus,
  X as count,
  ne as duration,
  xa as elapsed,
  Oy as eventSourceTransport,
  Ye as isStreamStep,
  Ea as isValidatedStreamStep,
  bm as ladderValidation,
  fb as mcpConnectionChip,
  _b as mcpToolName,
  Y as money,
  de as ms,
  Nn as ordered,
  un as ratio,
  of as restartLabel,
  te as stamp,
  hn as stream,
  ft as streamChip,
  jy as streamVars,
  ea as useBorderFlash,
  ut as useFocusTrap,
  Wy as useLiveFeed,
  Py as useReturnFocus,
  ma as useRovingTabindex,
  Ia as useTicker,
  it as useVisible,
  H as v,
  qk as validateMark,
  _t as validatedStreamSteps
};
