import { jsx as n, Fragment as B, jsxs as o } from "react/jsx-runtime";
import { useMemo as Zn, useContext as je, createContext as We, useCallback as z, useEffect as L, useState as g, useRef as N, useLayoutEffect as et, useId as $, Fragment as at } from "react";
import { createPortal as nt } from "react-dom";
function ae(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const Ha = (e) => String(e).padStart(2, "0");
function Aa(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${Ha(a % 60)}s` : `${Math.floor(t / 60)}h ${Ha(t % 60)}m`;
}
const tt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ne(e) {
  const a = tt.formatToParts(new Date(e)), t = (r) => {
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
function J(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function dn(e, a) {
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
const un = We(/* @__PURE__ */ new Set());
function Ry({ hidden: e, children: a }) {
  const t = Zn(() => new Set(e), [e]);
  return /* @__PURE__ */ n(un.Provider, { value: t, children: a });
}
function ot(e) {
  return !je(un).has(e);
}
function Ty({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(B, { children: ot(e) ? a : t });
}
const it = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function ct(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function st(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = ct(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function dt(e) {
  return { onKeyDown: z(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(it));
      st(t, e.current, r);
    },
    [e]
  ) };
}
function Ly(e, a = !0) {
  L(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const Fa = { ArrowUp: -1, ArrowDown: 1 }, ja = { ArrowLeft: -1, ArrowRight: 1 }, ut = (e, a, t) => Math.min(t, Math.max(a, e));
function mt(e, a) {
  if (a !== "horizontal" && e in Fa) return Fa[e];
  if (a !== "vertical" && e in ja) return ja[e];
}
function ma({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), l = N(!1);
  et(() => {
    var b;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const m = d[0], _ = l.current;
    l.current = !1, t(m), _ && ((b = r.current.get(m)) == null || b.focus());
  });
  const i = z((d) => t(d), []), c = z((d) => {
    var m;
    t(d), (m = r.current.get(d)) == null || m.focus();
  }, []), s = z(
    (d) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const _ = Math.max(0, m.indexOf(a)), b = mt(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(m[ut(_ + b, 0, m.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(m[0])) : d.key === "End" && (d.preventDefault(), c(m[m.length - 1]));
    },
    [a, c, e]
  ), u = z(
    (d) => ({
      tabIndex: d === a ? 0 : -1,
      ref: (m) => {
        m ? r.current.set(d, m) : (r.current.delete(d), d === a && (l.current = !0));
      },
      onFocus: () => t(d),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: s }, itemProps: u, setActive: i };
}
const Ay = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, Ey = "0.2.0", xy = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], ht = [1, 2, 3, 4, 5, 6], wt = [1, 2, 3], _t = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], H = {
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
}, se = {
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
function mn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ye(e) {
  return ht.includes(e);
}
function Ea(e) {
  return wt.includes(e);
}
function Iy(e) {
  if (!Ye(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function vt(e) {
  if (!Ye(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
function Wa(e) {
  return typeof e != "string" ? null : _t.includes(e) ? e : null;
}
function ft(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function bt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function pt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function gt(e, a, t) {
  const r = ft(e);
  if (r === null) return null;
  const l = Wa(t) ?? Wa(r.type);
  return l === null ? null : { ...r, type: l, id: bt(r, a), at: pt(r) };
}
function Nt(e, a) {
  return e >= se.staleAfter ? "stale" : e >= se.heartbeat && a === "live" ? "reconnecting" : null;
}
function yt(e, a, t) {
  return e >= se.heartbeat && !a && t !== null;
}
function qy(e, a) {
  const [t, r] = g("reconnecting"), [l, i] = g(null), c = N(/* @__PURE__ */ new Map()), s = N(0), u = N(""), d = N(0), m = N(null), _ = N(0), b = N(0), P = N(!1), X = N("reconnecting"), Q = z((k) => {
    X.current = k, r(k);
  }, []), te = z(() => {
    s.current = Date.now();
  }, []), xe = z((k) => {
    for (const [F, ue] of c.current)
      (ue === "*" || k.itemKey === ue) && F(k);
  }, []), re = z(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (k, F, ue) => {
        const $e = gt(k, F, ue);
        $e !== null && ($e.id && (u.current = $e.id), te(), P.current = !1, Q("live"), i($e.at), xe($e));
      },
      onOpen: () => {
        d.current = 0, P.current = !1, te(), Q("live");
      },
      onError: () => {
        var F;
        (F = m.current) == null || F.close(), m.current = null, P.current = !0, X.current !== "stale" && Q("reconnecting");
        const k = Math.min(se.reconnectBase * 2 ** d.current, se.reconnectMax);
        d.current += 1, _.current = window.setTimeout(re, k);
      }
    });
  }, [xe, Q, te, a, e]), Ie = z((k) => {
    P.current = !0, k.close(), m.current = null, _.current = window.setTimeout(re, se.reconnectBase);
  }, [re]), qe = z((k, F) => (c.current.set(F, k), () => {
    c.current.delete(F);
  }), []);
  return L(() => (re(), b.current = window.setInterval(() => {
    const k = Date.now() - s.current, F = Nt(k, X.current);
    F && Q(F);
    const ue = m.current;
    yt(k, P.current, ue) && Ie(ue);
  }, se.tick), () => {
    var k;
    window.clearInterval(b.current), window.clearTimeout(_.current), P.current = !1, (k = m.current) == null || k.close(), m.current = null;
  }), [re, Ie, Q]), { connection: t, lastEventAt: l, subscribe: qe };
}
function xa(e, a) {
  const t = new Date(e).getTime(), [r, l] = g(() => Date.now());
  return L(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const c = window.setInterval(i, se.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(c), document.removeEventListener("visibilitychange", i);
    };
  }, [a, t]), Math.max(0, r - t);
}
function kt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function za(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ea(e, a) {
  const t = N(0), r = z((l) => {
    const i = l ?? a, c = e.current;
    c !== null && i !== void 0 && (kt() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => za(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => za(c), se.flash)));
  }, [a, e]);
  return L(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const $t = "_root_1otpc_2", Ct = {
  root: $t
};
function St(e, a, t, r, l) {
  const i = [Aa(a)];
  return e || i.push(`as of ${lt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = xa(e, l), c = (a == null ? void 0 : a.at) ?? e, s = St(l, i, c, r, a);
  return /* @__PURE__ */ o("span", { className: `${Ct.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ne(e)
    ] })
  ] });
}
const Rt = "_app_lrbcc_1", Tt = "_side_lrbcc_18", Lt = "_main_lrbcc_26", At = "_rail_lrbcc_33", Et = "_page_lrbcc_40", xt = "_root_lrbcc_91", It = "_topbar_lrbcc_98", qt = "_mark_lrbcc_109", Mt = "_brand_lrbcc_116", Bt = "_tagline_lrbcc_122", Pt = "_identity_lrbcc_128", Dt = "_tools_lrbcc_129", Ot = "_actor_lrbcc_138", Ht = "_metadata_lrbcc_139", Ft = "_detail_lrbcc_155", jt = "_nav_lrbcc_160", Wt = "_content_lrbcc_195", zt = "_skip_lrbcc_218", M = {
  app: Rt,
  side: Tt,
  main: Lt,
  rail: At,
  page: Et,
  root: xt,
  topbar: It,
  mark: qt,
  brand: Mt,
  tagline: Bt,
  identity: Pt,
  tools: Dt,
  actor: Ot,
  metadata: Ht,
  detail: Ft,
  nav: jt,
  content: Wt,
  skip: zt
};
function Gt({ sidebar: e, header: a, children: t, rail: r }) {
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
function Kt({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: M.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function ra({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Ut({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(ra, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(ra, { value: a, className: M.detail })
  ] });
}
function Vt(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ n("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(ra, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ n(Kt, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(Ut, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(ra, { value: e.tools, className: M.tools })
  ] });
}
function Yt(e) {
  const a = $();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Vt, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function Jt(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function My(e) {
  return Jt(e) ? /* @__PURE__ */ n(Gt, { ...e }) : /* @__PURE__ */ n(Yt, { ...e });
}
const Xt = "_btn_llheq_2", Qt = "_primary_llheq_13", Zt = "_secondary_llheq_23", er = "_ghost_llheq_28", ar = "_overflow_llheq_37", nr = "_sm_llheq_44", tr = "_disabled_llheq_48", Xe = {
  btn: Xt,
  primary: Qt,
  secondary: Zt,
  ghost: er,
  overflow: ar,
  sm: nr,
  disabled: tr
};
function rr(e, a, t, r) {
  const l = a === "sm" ? [Xe.sm, "ward-btn--sm"] : [], i = t ? [Xe.disabled] : [];
  return [Xe.btn, Xe[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function lr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function or(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function ir(e) {
  return e.children ?? e.label;
}
function v(e) {
  or(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: rr(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...lr(a, e.controls),
      children: ir(e)
    }
  );
}
function Ia(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const cr = "_root_o4yib_2", sr = "_row_o4yib_8", dr = "_box_o4yib_14", ur = "_label_o4yib_21", mr = "_lockedNote_o4yib_26", hr = "_consequence_o4yib_34", wr = "_sample_o4yib_69", Se = {
  root: cr,
  row: sr,
  box: dr,
  label: ur,
  lockedNote: mr,
  consequence: hr,
  sample: wr
};
function _r(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function vr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Se.consequence} ward-check-consequence`, children: a }) : null;
}
function fr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Se.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function br({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Se.sample, "aria-hidden": "true", children: e }) : null;
}
function hn(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = _r(e);
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
          "aria-describedby": Ia(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: Se.label, children: [
        e.label,
        /* @__PURE__ */ n(fr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(br, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(vr, { id: t, text: e.consequence })
  ] });
}
const pr = "_chip_1073r_2", gr = {
  chip: pr
}, Nr = {
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
function yr(e, a) {
  if (e === "stream") return kr(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Nr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function kr(e) {
  if (!e || !Ea(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = mn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${gr.chip} ward-chip ward-chip--${e}`, style: yr(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
const $r = "_nav_fbsei_2", Cr = "_list_fbsei_8", Sr = "_item_fbsei_15", Rr = "_link_fbsei_24", Tr = "_current_fbsei_33", Lr = "_chips_fbsei_37", Me = {
  nav: $r,
  list: Cr,
  item: Sr,
  link: Rr,
  current: Tr,
  chips: Lr
};
function Ar({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((t, r) => /* @__PURE__ */ n("li", { className: Me.item, children: r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Me.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", children: t.label }) }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Me.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] }) });
}
const Er = "_field_1oadv_2", xr = "_label_1oadv_8", Ir = "_labelHidden_1oadv_15", qr = "_control_1oadv_25", Mr = "_mono_1oadv_44", Br = "_area_1oadv_49", Pr = "_invalid_1oadv_56", ke = {
  field: Er,
  label: xr,
  labelHidden: Ir,
  control: qr,
  mono: Mr,
  area: Br,
  invalid: Pr
};
function Dr({ controlProps: e, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, ...e });
}
function Or({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Hr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Fr = { input: Dr, select: Or, textarea: Hr };
function jr(e, a, t) {
  const r = Fr[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Wr(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ia(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function zr(e) {
  const a = e.mono ? [ke.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [ke.area] : [];
  return [ke.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Gr(e) {
  return e ? `${ke.label} ${ke.labelHidden} ward-field-label` : `${ke.label} ward-field-label`;
}
function T(e) {
  const a = $(), t = `${a}-msg`, r = Wr(e, a, t), l = zr(e);
  return /* @__PURE__ */ o("div", { className: `${ke.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Gr(e.labelHidden), htmlFor: a, children: e.label }),
    jr(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${ke.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Kr = "_strip_rg8pj_2", Ur = "_tab_rg8pj_12", Vr = "_count_rg8pj_34", ka = {
  strip: Kr,
  tab: Ur,
  count: Vr
}, Ga = 7;
function Yr(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Jr(e) {
  return `${ka.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function By({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > Ga) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Ga} — the set is fixed`);
  const i = ma({ orientation: "horizontal" }), c = Yr(e, a);
  return L(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: Jr(l),
      role: "tablist",
      "aria-label": r,
      "data-level": l,
      ...i.containerProps,
      children: e.map((s, u) => /* @__PURE__ */ o(
        "button",
        {
          id: `tab-${s.id}`,
          type: "button",
          role: "tab",
          className: `${ka.tab} ward-tab`,
          "aria-selected": s.id === a,
          "aria-controls": `panel-${s.id}`,
          onClick: () => t(s.id),
          ...i.itemProps(u),
          children: [
            s.label,
            s.count === void 0 ? null : /* @__PURE__ */ o(B, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: ka.count, children: `· ${s.count}` })
            ] })
          ]
        },
        s.id
      ))
    }
  );
}
const Xr = "_root_jem6y_2", Qr = "_segment_jem6y_7", Ka = {
  root: Xr,
  segment: Qr
};
function wn({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = ma({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return L(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${Ka.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Ka.segment,
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
const Zr = "_sidebar_1jywv_3", el = "_brand_1jywv_9", al = "_mark_1jywv_17", nl = "_word_1jywv_24", tl = "_nav_1jywv_30", rl = "_navItem_1jywv_38", ll = "_group_1jywv_50", ol = "_groupName_1jywv_57", il = "_agents_1jywv_70", cl = "_agent_1jywv_70", sl = "_agentTop_1jywv_88", dl = "_dot_1jywv_95", ul = "_agentName_1jywv_107", ml = "_agentMeta_1jywv_120", hl = "_foot_1jywv_126", wl = "_footName_1jywv_132", _l = "_footLinks_1jywv_139", vl = "_footLink_1jywv_139", fl = "_root_1jywv_153", bl = "_linkBrand_1jywv_162", pl = "_label_1jywv_183", gl = "_note_1jywv_188", Nl = "_footer_1jywv_202", C = {
  sidebar: Zr,
  brand: el,
  mark: al,
  word: nl,
  nav: tl,
  navItem: rl,
  group: ll,
  groupName: ol,
  new: "_new_1jywv_64",
  agents: il,
  agent: cl,
  agentTop: sl,
  dot: dl,
  agentName: ul,
  agentMeta: ml,
  foot: hl,
  footName: wl,
  footLinks: _l,
  footLink: vl,
  root: fl,
  linkBrand: bl,
  label: pl,
  note: gl,
  footer: Nl
};
function yl({ agent: e }) {
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
              style: { "--dot": mn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function kl({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function $l({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
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
        J(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: C.new, href: l.href, children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(yl, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(kl, { shared: i })
  ] });
}
function Cl(e) {
  return e.destinations ?? e.items ?? [];
}
function Sl({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function Rl({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function Tl({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Ll(e) {
  return /* @__PURE__ */ o("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Sl, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Cl(e).map((a) => /* @__PURE__ */ n(Tl, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(Rl, { children: e.children })
  ] });
}
function Al(e) {
  return "agents" in e;
}
function Py(e) {
  return Al(e) ? /* @__PURE__ */ n($l, { ...e }) : /* @__PURE__ */ n(Ll, { ...e });
}
const El = "_mark_wlgi8_3", xl = {
  mark: El
}, Il = { met: "✓", unmet: "", failed: "✕" };
function qa({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: xl.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Il[e]
    }
  );
}
const ql = "_marker_br9fi_2", Ml = {
  marker: ql
}, Bl = {
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
  const r = { "--marker": Bl[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Ml.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Pl = "_root_ti0pq_2", Dl = "_chip_ti0pq_11", Ol = "_noCase_ti0pq_23", Qe = {
  root: Pl,
  chip: Dl,
  noCase: Ol
};
function Hl(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Ma({ connection: e, since: a, lastEventAt: t }) {
  const r = Hl(a, t), l = xa(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${Qe.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ee, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: Qe.noCase, children: Aa(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ne(r)
  ] });
}
const Fl = "_root_11rs7_2", jl = "_context_11rs7_12", Wl = "_row_11rs7_1", zl = "_heading_11rs7_25", Gl = "_headingWrap_11rs7_33", Kl = "_chips_11rs7_38", Ul = "_title_11rs7_45", Vl = "_consequence_11rs7_54", Yl = "_actionsWrap_11rs7_59", Jl = "_actions_11rs7_59", Xl = "_action_11rs7_59", Ql = "_overflowPanel_11rs7_78", Zl = "_measure_11rs7_88", U = {
  root: Fl,
  context: jl,
  row: Wl,
  heading: zl,
  headingWrap: Gl,
  chips: Kl,
  title: Ul,
  consequence: Vl,
  actionsWrap: Yl,
  actions: Jl,
  action: Xl,
  overflowPanel: Ql,
  measure: Zl
};
function eo({ title: e, consequence: a }) {
  return /* @__PURE__ */ o("div", { className: U.heading, children: [
    /* @__PURE__ */ n("h1", { className: U.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: U.consequence, children: a })
  ] });
}
function _n({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: a }, t));
}
function ao({ actions: e, collapsed: a, onOverflow: t, disclosure: r }) {
  return a ? t ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: t, children: "···" }) : /* @__PURE__ */ n(v, { variant: "overflow", onClick: r.toggle, expanded: r.open, controls: r.panelId, children: "···" }) : /* @__PURE__ */ n(_n, { actions: e });
}
function no({ actions: e, disclosure: a, onEscape: t }) {
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(_n, { actions: e }) });
}
function to(e, a) {
  const t = $(), [r, l] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function ro({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: U.context, children: [
    /* @__PURE__ */ n(Ar, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: U.chips, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] });
}
function lo(...e) {
  return e.some((a) => a === null);
}
function oo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function io(e, a, t, r, l) {
  if (l === 0 || lo(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = oo(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function co(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function so(e) {
  const a = N(null), t = N(null), r = N(null), l = N(null), [i, c] = g(!1);
  return L(() => {
    const s = a.current;
    if (!co(s)) return;
    const u = () => c(io(s, t.current, r.current, l.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function uo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Ma, { connection: e.connection, since: e.since }) : null;
}
function Dy({ crumb: e, chips: a, title: t, consequence: r, actions: l = [], connection: i, onOverflow: c, density: s = "page" }) {
  const { rowRef: u, headingRef: d, actionsRef: m, measureRef: _, collapsed: b } = so(l), { disclosure: P, close: X } = to(b, m);
  return /* @__PURE__ */ o("header", { className: U.root, "data-density": s, children: [
    /* @__PURE__ */ n(ro, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: U.row, ref: u, children: [
      /* @__PURE__ */ n("div", { ref: d, className: U.headingWrap, children: /* @__PURE__ */ n(eo, { title: t, consequence: r }) }),
      /* @__PURE__ */ o("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(uo, { connection: i }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: m, "data-ward-actions": !0, children: /* @__PURE__ */ n(ao, { actions: l, collapsed: b, onOverflow: c, disclosure: P }) })
      ] })
    ] }),
    b && !c ? /* @__PURE__ */ n(no, { actions: l, disclosure: P, onEscape: X }) : null,
    /* @__PURE__ */ n("div", { className: U.measure, ref: _, "aria-hidden": "true", children: l.map((Q, te) => /* @__PURE__ */ n("span", { children: Q }, te)) })
  ] });
}
function vn(e) {
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
const mo = "_scrim_c7sqj_2", ho = "_drawer_c7sqj_10", wo = "_sheet_c7sqj_14", _o = "_modal_c7sqj_18", vo = "_panel_c7sqj_23", fo = "_header_c7sqj_51", bo = "_title_c7sqj_59", po = "_body_c7sqj_63", go = "_close_c7sqj_90", fe = {
  scrim: mo,
  drawer: ho,
  sheet: wo,
  modal: _o,
  panel: vo,
  header: fo,
  title: bo,
  body: po,
  close: go
}, No = We(null), la = [], oa = /* @__PURE__ */ new Map();
function yo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function ko(e, a) {
  let t = oa.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, oa.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function $o(e, a) {
  for (const t of Array.from(a.children))
    yo(t) || ko(e, t);
}
function Co(e) {
  for (const a of e.claims) {
    const t = oa.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), oa.delete(a)));
  }
}
function So(e, a) {
  const t = { root: e, claims: [] };
  return la.push(t), $o(t, a), t;
}
function Ro(e) {
  const a = la.indexOf(e);
  a >= 0 && la.splice(a, 1), Co(e);
}
function Ua(e) {
  return e !== null && la.at(-1) === e;
}
function To(e, a, t) {
  const r = N(null), l = N(t);
  return l.current = t, L(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = So(i, a);
    return r.current = s, () => {
      var d, m;
      const u = Ua(s);
      Ro(s), r.current = null, u && ((m = (d = l.current ?? c) == null ? void 0 : d.focus) == null || m.call(d));
    };
  }, [a]), z(() => Ua(r.current), []);
}
function Lo(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Ao(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Eo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${fe.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n("header", { className: `${fe.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${fe.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${fe.body} ward-drawer-body`, children: e.children })
  ] });
}
function xo(e) {
  return `${fe.scrim} ${fe[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Io(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${fe.panel} ${fe[e]} ward-overlay-panel${t}${r}`;
}
function qo(e) {
  const a = je(No);
  return e ?? a ?? document.body;
}
function Je(e) {
  const a = N(null), t = N(null), r = $(), l = qo(e.container), i = vn("(min-width: 768px)"), c = Lo(e.kind, i), s = Ao(e, r), u = dt(t), d = To(a, l, e.returnFocusTo), m = z(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return L(() => {
    var _, b;
    d() && ((b = (_ = t.current) == null ? void 0 : _.querySelector("button")) == null || b.focus());
  }, [d]), L(() => {
    const _ = (b) => {
      b.key === "Escape" && m();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [m]), nt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: xo(c),
        "data-ward-overlay-kind": c,
        "data-ward-overlay-root": "",
        onClick: m,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": s.labelledBy,
            "aria-label": s.label,
            className: Io(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${fe.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Eo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Mo = "_root_drrhx_2", Bo = "_ticket_drrhx_15", Po = "_body_drrhx_24", fa = {
  root: Mo,
  ticket: Bo,
  body: Po
};
function Oy({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${fa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${fa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: fa.body, children: t })
  ] });
}
const Do = "_root_1bfqw_2", Oo = "_figure_1bfqw_7", Ho = "_of_1bfqw_13", Fo = "_bar_1bfqw_18", jo = "_rows_1bfqw_38", Wo = "_row_1bfqw_38", zo = "_label_1bfqw_49", Go = "_amount_1bfqw_54", Ne = {
  root: Do,
  figure: Oo,
  of: Ho,
  bar: Fo,
  rows: jo,
  row: Wo,
  label: zo,
  amount: Go
};
function Ko({ spent: e, ceiling: a, breakdown: t }) {
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
const Uo = "_frame_mg2jl_2", Vo = "_table_mg2jl_6", Yo = "_th_mg2jl_12", Jo = "_td_mg2jl_13", Xo = "_sort_mg2jl_47", Qo = "_row_mg2jl_53", Zo = "_empty_mg2jl_61", ye = {
  frame: Uo,
  table: Vo,
  th: Yo,
  td: Jo,
  sort: Xo,
  row: Qo,
  empty: Zo
}, ei = { asc: "ascending", desc: "descending" };
function ai(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ei[a.direction];
}
function ni(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: ye.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function ti(e) {
  return e === void 0 ? void 0 : { width: e };
}
function ri({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ye.th,
      style: ti(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ai(e, a),
      children: ni(e, t)
    }
  );
}
function li({ row: e, props: a }) {
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
function oi({
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
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: ye.empty, children: d }) : /* @__PURE__ */ n("div", { className: ye.frame, children: /* @__PURE__ */ o("table", { className: ye.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ye.head, children: a.map((m) => /* @__PURE__ */ n(ri, { column: m, sort: s, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((m) => /* @__PURE__ */ n(li, { row: m, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(m))) })
  ] }) });
}
const ii = "_set_y5zy3_2", ci = "_legend_y5zy3_7", si = "_row_y5zy3_15", di = "_control_y5zy3_20", ui = "_input_y5zy3_26", mi = "_label_y5zy3_31", hi = "_consequence_y5zy3_36", Ce = {
  set: ii,
  legend: ci,
  row: si,
  control: di,
  input: ui,
  label: mi,
  consequence: hi
};
function fn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: c, variant: s }) {
  const u = $(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: Ce.set, "data-variant": s, children: [
    /* @__PURE__ */ n("legend", { className: Ce.legend, children: e }),
    a.map((m) => {
      const _ = `${d}-${m.value}`, b = m.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Ce.row, children: [
        /* @__PURE__ */ o("span", { className: Ce.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: d,
              className: Ce.input,
              value: m.value,
              checked: t === m.value,
              disabled: l,
              "aria-describedby": Ia(b, c),
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
const wi = "_root_1h1ot_2", _i = "_head_1h1ot_11", vi = "_index_1h1ot_25", fi = "_dot_1h1ot_29", bi = "_note_1h1ot_34", pi = "_counter_1h1ot_40", gi = "_trailing_1h1ot_48", Re = {
  root: wi,
  head: _i,
  index: vi,
  dot: fi,
  note: bi,
  counter: pi,
  trailing: gi
};
function Ni({ index: e }) {
  return e ? /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n("span", { className: `${Re.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Re.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function yi({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Re.counter, "aria-hidden": "true", children: e }) : null;
}
function ki({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Re.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Re.head, children: [
      /* @__PURE__ */ n(Ni, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Re.note, children: t }),
    /* @__PURE__ */ n(yi, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Re.trailing, children: i })
  ] });
}
const $i = "_strip_1qhvo_2", Ci = "_cell_1qhvo_7", Si = "_value_1qhvo_12", Ri = "_label_1qhvo_27", Ze = {
  strip: $i,
  cell: Ci,
  value: Si,
  label: Ri
};
function Ti(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function ha({ cells: e, divided: a = !1 }) {
  return Ti(e), /* @__PURE__ */ n("dl", { className: `${Ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Ze.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ze.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Ze.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Li = "_root_xk7sv_2", Ai = "_track_xk7sv_8", Ei = "_thumb_xk7sv_35", xi = "_labelHidden_xk7sv_53", Ii = "_label_xk7sv_53", qi = "_lockedNote_xk7sv_68", Te = {
  root: Li,
  track: Ai,
  thumb: Ei,
  labelHidden: xi,
  label: Ii,
  lockedNote: qi
};
function Mi(e) {
  return e ? `${Te.label} ${Te.labelHidden}` : Te.label;
}
function Ae({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: c }) {
  const s = $(), u = l ? !0 : a, d = r || l;
  return /* @__PURE__ */ o("span", { className: `${Te.root} ward-switchrow`, children: [
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
        "data-locked": l ? !0 : void 0,
        disabled: d,
        onClick: () => !d && (t == null ? void 0 : t(!u)),
        children: /* @__PURE__ */ n("span", { className: Te.thumb })
      }
    ),
    /* @__PURE__ */ o("span", { id: s, className: Mi(c), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Te.lockedNote, children: "always on" })
    ] })
  ] });
}
const Bi = "_bar_1u2kl_2", Pi = "_skip_1u2kl_11", Di = "_mark_1u2kl_22", Oi = "_nav_1u2kl_30", Hi = "_list_1u2kl_34", Fi = "_select_1u2kl_40", ji = "_dest_1u2kl_47", Wi = "_actor_1u2kl_61", zi = "_actorMark_1u2kl_74", Gi = "_actorLabel_1u2kl_79", Ki = "_tagline_1u2kl_98", le = {
  bar: Bi,
  skip: Pi,
  mark: Di,
  nav: Oi,
  list: Hi,
  select: Fi,
  dest: ji,
  actor: Wi,
  actorMark: zi,
  actorLabel: Gi,
  tagline: Ki
};
function Ui(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Vi(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function Hy({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: c = "main" }) {
  const s = Vi(r);
  return /* @__PURE__ */ o("header", { className: le.bar, children: [
    /* @__PURE__ */ n("a", { className: le.skip, href: `#${c}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: le.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: le.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: le.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: le.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: le.dest,
          href: u.href,
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        "select",
        {
          className: le.select,
          "aria-label": "Destination",
          value: t,
          onChange: (u) => i == null ? void 0 : i(u.target.value),
          children: a.map((u) => /* @__PURE__ */ n("option", { value: u.id, children: u.label }, u.id))
        }
      )
    ] }),
    s && /* @__PURE__ */ o("span", { className: le.actor, children: [
      /* @__PURE__ */ n("span", { className: le.actorLabel, children: s }),
      /* @__PURE__ */ n("span", { className: le.actorMark, "aria-hidden": "true", children: Ui(s) })
    ] })
  ] });
}
const Yi = "_tree_1lyby_2", Ji = "_item_1lyby_6", Xi = "_row_1lyby_10", Qi = "_button_1lyby_22", ia = {
  tree: Yi,
  item: Ji,
  row: Xi,
  button: Qi
}, bn = We(null);
function Zi({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ma({ orientation: "vertical" });
  return /* @__PURE__ */ n(bn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ia.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const ec = { ArrowRight: !0, ArrowLeft: !1 };
function Va(e) {
  return e ? !0 : void 0;
}
function ac(e, a) {
  const t = ec[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function nc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function tc(e) {
  const a = [ia.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function rc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function lc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function oc(e) {
  return typeof e == "string" ? e : void 0;
}
function ic({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function cc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function pn(e) {
  const a = je(bn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = rc(e);
  return /* @__PURE__ */ o("li", { className: ia.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: tc(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": Va(e.unresolved),
        "data-inherited": Va(e.inherited),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${ia.button} ward-treeitem-btn`,
            onClick: () => nc(e),
            onKeyDown: (r) => ac(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: lc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: oc(e.label), children: e.label }),
              /* @__PURE__ */ n(ic, { value: e.detail }),
              /* @__PURE__ */ n(cc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const sc = "_frame_9lntd_2", dc = "_subjectRail_9lntd_21", uc = "_subject_9lntd_21", mc = "_rail_9lntd_41", hc = "_record_9lntd_63", wc = "_recordBody_9lntd_68", _c = "_band_9lntd_111", vc = "_bandBody_9lntd_120", fc = "_bandActions_9lntd_125", bc = "_scroller_9lntd_132", pc = "_lanes_9lntd_150", ce = {
  frame: sc,
  subjectRail: dc,
  subject: uc,
  rail: mc,
  record: hc,
  recordBody: wc,
  band: _c,
  bandBody: vc,
  bandActions: fc,
  scroller: bc,
  lanes: pc
};
function Fy({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: ce.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function Ya(e) {
  return e ? "true" : void 0;
}
function jy({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: ce.subjectRail, "data-ward-subject-rail": t, "data-ruled": Ya(i), children: [
    /* @__PURE__ */ n("div", { className: ce.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ce.rail, "data-sticky": Ya(l), "aria-label": r, children: a })
  ] });
}
function Wy({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i }) {
  return /* @__PURE__ */ o("section", { className: ce.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(ki, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: ce.recordBody, "data-pad": l, children: a })
  ] });
}
function zy({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: ce.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ce.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: ce.bandActions, children: a })
  ] });
}
const gc = "(max-width: 767.98px)";
function $a({ label: e, children: a }) {
  return /* @__PURE__ */ n("div", { className: ce.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", children: a });
}
function Nc({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ o("div", { className: ce.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(T, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: l }),
    /* @__PURE__ */ n($a, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Gy({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = vn(gc);
  return t === void 0 ? /* @__PURE__ */ n($a, { label: a, children: e }) : l ? /* @__PURE__ */ n(Nc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n($a, { label: a, children: t.map((i) => /* @__PURE__ */ n(at, { children: i.content }, i.id)) });
}
const yc = "_block_1o5o7_2", kc = "_sentence_1o5o7_15", $c = "_meta_1o5o7_20", Cc = "_action_1o5o7_25", Sc = "_strip_1o5o7_29", Rc = "_loading_1o5o7_48", Tc = "_label_1o5o7_56", Lc = "_counter_1o5o7_63", de = {
  block: yc,
  sentence: kc,
  meta: $c,
  action: Cc,
  strip: Sc,
  loading: Rc,
  label: Tc,
  counter: Lc
};
function Ac({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: de.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function wa({ sentence: e, action: a, children: t, role: r = "status", tone: l }) {
  return /* @__PURE__ */ o("div", { className: `${de.block} ward-state`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: de.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Ac, { action: a })
  ] });
}
function Ec(e) {
  return /* @__PURE__ */ n(wa, { ...e });
}
function Ky({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(wa, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: de.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function Uy(e) {
  return /* @__PURE__ */ n(wa, { ...e });
}
function Vy({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(wa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: de.meta, children: [
    "failed at ",
    ne(a)
  ] }) });
}
function Yy({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: de.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ne(e),
    " — showing snapshot from ",
    ne(a)
  ] });
}
function Jy({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: de.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    ne(a)
  ] });
}
function Xy({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = g(!1);
  L(() => {
    const c = window.setTimeout(() => l(!0), se.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = xa(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${de.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: de.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: de.counter, children: Aa(i) }) : null
  ] });
}
const xc = "_note_tlubt_2", Ic = {
  note: xc
};
function qc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: Ic.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const Mc = "_card_12in3_2", Bc = "_hit_12in3_23", Pc = "_head_12in3_30", Dc = "_title_12in3_36", Oc = "_meta_12in3_44", Hc = "_fields_12in3_45", Fc = "_who_12in3_58", jc = "_sep_12in3_65", Wc = "_mono_12in3_69", zc = "_field_12in3_45", Gc = "_last_12in3_84", Kc = "_reason_12in3_96", G = {
  card: Mc,
  hit: Bc,
  head: Pc,
  title: Dc,
  meta: Oc,
  fields: Hc,
  who: Fc,
  sep: jc,
  mono: Wc,
  field: zc,
  last: Gc,
  reason: Kc
}, Uc = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Vc(e, a, t) {
  const r = ea(e, "blue"), l = ea(e, "orange"), i = ea(e, "green"), c = N(/* @__PURE__ */ new Set());
  L(() => {
    if (!t) return;
    const s = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = Uc[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, l]);
}
const Yc = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : Y(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Jc(e, a) {
  return Yc[a](e);
}
function Xc({ item: e, connection: a }) {
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
      ae(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Qc({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: G.head, children: [
    e.flagged && /* @__PURE__ */ n(h, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Zc({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: G.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function es({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: G.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: G.field, children: Jc(e, t) }, t)) });
}
const Ca = (e) => e ? !0 : void 0;
function as(e) {
  return { "--stream": `var(--ward-stream-${e.streamStep}-id)` };
}
function ns(e, a, t) {
  e == null || e(a, t);
}
function ts(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function rs({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: G.last, "data-stale": Ca(a), children: t }) : null;
}
function _a(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  Vc(r, t.key, e.feed);
  const l = ts(e.feed), i = as(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: G.card,
      style: i,
      "data-selected": Ca(e.selected),
      "data-flagged": Ca(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: G.hit, onClick: (c) => ns(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Qc, { item: t }),
        /* @__PURE__ */ n("p", { className: G.title, children: t.title }),
        /* @__PURE__ */ n(Xc, { item: t, connection: l }),
        /* @__PURE__ */ n(Zc, { reason: t.blockedReason }),
        /* @__PURE__ */ n(es, { item: t, fields: a }),
        /* @__PURE__ */ n(rs, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const ls = "_column_14784_3", os = "_head_14784_24", is = "_label_14784_33", cs = "_count_14784_42", ss = "_list_14784_56", Ge = {
  column: ls,
  head: os,
  label: is,
  count: cs,
  list: ss
};
function gn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function ds({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Ge.head, children: [
    /* @__PURE__ */ n("h2", { className: Ge.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Ge.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function us(e) {
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
function ms({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = $(), m = e.cap !== void 0 && a.length > e.cap, _ = gn(a, r);
  return /* @__PURE__ */ o("section", { className: Ge.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(ds, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(us, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, rows: _ }),
    m && /* @__PURE__ */ n(qc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const hs = "_foot_8qg4p_2", ws = "_note_8qg4p_13", _s = "_link_8qg4p_19", ba = {
  foot: hs,
  note: ws,
  link: _s
};
function Qy({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: ba.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: ba.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: ba.link, href: e, children: "Configure board" })
  ] });
}
const vs = "_head_1la6p_3", fs = "_identity_1la6p_12", bs = "_titleRow_1la6p_18", ps = "_title_1la6p_18", gs = "_key_1la6p_35", Ns = "_rollup_1la6p_45", ys = "_tools_1la6p_53", ks = "_swatch_1la6p_62", $s = "_mark_1la6p_69", we = {
  head: vs,
  identity: fs,
  titleRow: bs,
  title: ps,
  key: gs,
  rollup: Ns,
  tools: ys,
  swatch: ks,
  mark: $s
}, Ja = "initials:";
function Cs(e) {
  return e === void 0 ? "loaded this week unavailable" : `${J(e)} loaded this week`;
}
function Ss(e) {
  const a = [`${J(e.inFlight)} in flight`, Cs(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${J(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ae(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ae(e.p90)}`), a.join(" · ");
}
function Rs(e) {
  return e.startsWith(Ja) ? e.slice(Ja.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Ts({ markRef: e, streamStep: a }) {
  const t = { "--stream": `var(--ward-stream-${a}-id)` };
  return e ? /* @__PURE__ */ n("span", { className: `${we.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Rs(e) }) : /* @__PURE__ */ n("span", { className: we.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Ls({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(T, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Zy({
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
  return /* @__PURE__ */ o("div", { className: we.head, children: [
    /* @__PURE__ */ o("div", { className: we.identity, children: [
      /* @__PURE__ */ o("div", { className: we.titleRow, children: [
        /* @__PURE__ */ n(Ts, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: we.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: we.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: we.rollup, "aria-live": "polite", children: Ss(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: we.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Ls, { owners: l, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Ma, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const As = "_head_kabyh_11", Es = "_line_kabyh_12", xs = "_cHandle_kabyh_33", Is = "_cName_kabyh_38", qs = "_nameLine_kabyh_46", Ms = "_cLabel_kabyh_53", Bs = "_cCap_kabyh_58", Ps = "_cShown_kabyh_63", Ds = "_name_kabyh_46", Os = "_noCap_kabyh_85", Hs = "_state_kabyh_99", Fs = "_handle_kabyh_104", js = "_sub_kabyh_118", E = {
  head: As,
  line: Es,
  cHandle: xs,
  cName: Is,
  nameLine: qs,
  cLabel: Ms,
  cCap: Bs,
  cShown: Ps,
  name: Ds,
  noCap: Os,
  state: Hs,
  handle: Fs,
  sub: js
}, Ws = "can't be hidden or collapsed", zs = "terminal · counted, not a column";
function ek() {
  return /* @__PURE__ */ o("div", { className: E.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: E.cHandle }),
    /* @__PURE__ */ n("span", { className: E.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: E.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: E.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: E.cShown, children: "Shown" })
  ] });
}
function Gs(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Ks(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Xa(e) {
  return e.gate ? Ws : e.terminal ? zs : Ks(e.agentsMounted);
}
function Us(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Vs({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: E.cName, children: [
    /* @__PURE__ */ o("span", { className: E.nameLine, children: [
      /* @__PURE__ */ n("span", { className: E.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    Xa(e) && /* @__PURE__ */ n("span", { className: E.sub, children: Xa(e) })
  ] });
}
function Ys(e) {
  return e === void 0 ? "" : String(e);
}
function Js(e) {
  return e === "" ? void 0 : Number(e);
}
function Xs({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: E.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: E.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Us(t, a),
      children: "⠿"
    }
  ) });
}
function Qs({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${E.cCap} ${E.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: E.cCap, children: /* @__PURE__ */ n(T, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Ys(a.cap), onChange: (r) => t({ ...a, cap: Js(r) }) }) });
}
function Zs({ stage: e, config: a, onChange: t }) {
  const r = Gs(e, a.shown);
  return /* @__PURE__ */ o("span", { className: E.cShown, children: [
    /* @__PURE__ */ n(Ae, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: E.state, "aria-hidden": "true", children: r.state })
  ] });
}
function ed(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function ak({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: E.line, "data-kind": ed(e), children: [
    /* @__PURE__ */ n(Xs, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Vs, { stage: e }),
    /* @__PURE__ */ n("span", { className: E.cLabel, children: /* @__PURE__ */ n(T, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(Qs, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Zs, { stage: e, config: a, onChange: t })
  ] });
}
const ad = "_body_hn6d6_2", nd = "_head_hn6d6_9", td = "_summary_hn6d6_19", rd = "_block_hn6d6_20", ld = "_actionsBlock_hn6d6_21", od = "_title_hn6d6_41", id = "_note_hn6d6_46", cd = "_k_hn6d6_51", sd = "_kv_hn6d6_58", dd = "_row_hn6d6_64", ud = "_label_hn6d6_75", md = "_value_hn6d6_84", hd = "_quote_hn6d6_90", wd = "_actions_hn6d6_21", _d = "_resolve_hn6d6_103", x = {
  body: ad,
  head: nd,
  summary: td,
  block: rd,
  actionsBlock: ld,
  title: od,
  note: id,
  k: cd,
  kv: sd,
  row: dd,
  label: ud,
  value: md,
  quote: hd,
  actions: wd,
  resolve: _d
};
function vd(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function fd(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function bd(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(h, { role: "stream", label: `STEP ${e.streamStep}`, streamStep: e.streamStep }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ae(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...vd(e),
    ...fd(e, a)
  ];
}
function pd({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: x.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: x.k, children: a }),
    e
  ] });
}
function gd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: x.head, children: [
    /* @__PURE__ */ n(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Nd({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: x.block, children: [
    /* @__PURE__ */ n("p", { className: x.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: x.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: x.note, children: e.agentMeta })
  ] }) : null;
}
function nk({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = $(), d = bd(e, l);
  return /* @__PURE__ */ n(Je, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: x.body, children: [
    /* @__PURE__ */ n(gd, { item: e }),
    /* @__PURE__ */ o("div", { className: x.summary, children: [
      /* @__PURE__ */ n("h2", { className: x.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: x.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: x.kv, children: d.map(([m, _]) => /* @__PURE__ */ o("div", { className: x.row, children: [
      /* @__PURE__ */ n("dt", { className: x.label, children: m }),
      /* @__PURE__ */ n("dd", { className: x.value, children: _ })
    ] }, m)) }),
    /* @__PURE__ */ n(Nd, { item: e }),
    /* @__PURE__ */ o("div", { className: x.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: x.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: x.note, children: s })
    ] }),
    /* @__PURE__ */ n(pd, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const yd = "_root_3azmy_2", kd = "_list_3azmy_7", $d = "_item_3azmy_12", Cd = "_box_3azmy_18", Sd = "_text_3azmy_23", Rd = "_note_3azmy_28", Be = {
  root: yd,
  list: kd,
  item: $d,
  box: Cd,
  text: Sd,
  note: Rd
};
function va({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: Be.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Be.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Be.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Be.box, children: /* @__PURE__ */ n(qa, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Be.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Be.note} ward-checklist-note`, children: a })
  ] });
}
const Td = "_rail_ke7ch_2", Ld = "_k_ke7ch_11", Ad = "_head_ke7ch_19", Ed = "_section_ke7ch_25", xd = "_card_ke7ch_38", Id = "_strip_ke7ch_42", qd = "_skeleton_ke7ch_56", Md = "_skeletonLabel_ke7ch_70", Bd = "_bar_ke7ch_76", Pd = "_note_ke7ch_85", ie = {
  rail: Td,
  k: Ld,
  head: Ad,
  section: Ed,
  card: xd,
  strip: Id,
  skeleton: qd,
  skeletonLabel: Md,
  bar: Bd,
  note: Pd
};
function Dd(e) {
  return (a) => e == null ? void 0 : e(a);
}
function pa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: ie.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: ie.k, children: e }),
    a
  ] });
}
function Od({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: ie.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: ie.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: ie.bar, "aria-hidden": "true" }, r))
  ] });
}
function Hd({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(ms, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function Fd(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Hd, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Od, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function tk(e) {
  const a = Dd(e.onOpen), t = gn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: ie.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${ie.k} ${ie.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(pa, { title: "Card", children: /* @__PURE__ */ n("div", { className: ie.card, children: t && /* @__PURE__ */ n(_a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(pa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: ie.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Fd, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(pa, { title: "Effect of this config", children: /* @__PURE__ */ n(va, { items: e.effects, density: "compact" }) })
  ] });
}
function jd(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Wd(e) {
  return Math.ceil(e.length / 2);
}
function zd(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Nn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Gd(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Nn(e);
  l !== void 0 && t(l), r(zd(e.type));
}
function Kd(e, a, t, r, l) {
  L(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Gd(i, t, r, l));
  }, [e, a, t, r, l]);
}
function Ud(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Vd(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function Yd(e, a) {
  return a !== void 0 ? ae(e.timeInStage) + " · waits on " + a.agent : ae(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Jd(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + H.height.card + " + " + H.height.cardRow + " * " + String(Wd(a ?? [])) + ")"
  };
}
function Xd(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Qd(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(h, { role: "meta", label: Y(e.cost) }) : null;
}
function Zd(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(h, { role: "meta", label: e.jiraKey }) : null;
}
function eu(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function au(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function nu(e, a) {
  return a === void 0 ? e : jd(e, a.ref);
}
function tu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ue(e) {
  return e === !0 ? "true" : void 0;
}
function yn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = N(null), i = ea(l), c = N(/* @__PURE__ */ new Set()), [s, u] = g(Ud(a));
  Kd(e.feed, a.key, c, u, i);
  const d = Vd(a, r), m = Yd(a, t), _ = Jd(a, e.fields), b = au(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...tu(e),
      className: "ward-workcard",
      "data-flagged": Ue(a.flagged),
      "data-selected": Ue(e.selected),
      style: _,
      ref: nu(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Xd(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(h, { role: d.role, label: d.label }),
          Qd(a, e.fields),
          Zd(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          eu(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function ru({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function lu(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function ou(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function iu(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(ru, { count: e.items.length, cap: e.column.cap });
}
function cu(e, a) {
  return e.roving ?? a;
}
function su(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function du(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    yn,
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
function uu(e) {
  const a = $(), t = ma({ orientation: "vertical" }), r = cu(e, t), l = lu(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ue(l), "data-gate": Ue(e.column.gate), children: [
    ou(e.column, e.items.length, a),
    iu(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...su(e, t), children: du(e, r) })
  ] });
}
function mu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ae(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ae(e.p90)), a;
}
function hu(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(T, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function wu(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function rk(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: mu(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      hu(e),
      wu(e.onConfigure),
      /* @__PURE__ */ n(Ma, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function _u(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function vu(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ae, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ae, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function fu(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(B, { children: [
    a > 0 ? /* @__PURE__ */ n(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(h, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function lk(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ue(_u(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: vu(e) }),
    /* @__PURE__ */ n(T, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(hn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    fu(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function ok(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(yn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(uu, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function bu(e, a) {
  const t = Nn(e);
  t !== void 0 && a(t);
}
function pu(e, a, t) {
  L(() => {
    if (e != null)
      return e.subscribe(a, (r) => bu(r, t));
  }, [e, a, t]);
}
function gu(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Nu(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ae(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", Y(e.cost)]), a;
}
function yu(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function ku(e, a) {
  return /* @__PURE__ */ o(B, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function ik(e) {
  var c;
  const a = e.item, t = a.run, [r, l] = g((c = a.run) == null ? void 0 : c.lastStep);
  pu(e.feed, a.key, l);
  const i = [...gu(a), ...Nu(a)];
  return /* @__PURE__ */ o(Je, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      yu(t, r)
    ] }),
    ku(a, e.actions)
  ] });
}
const $u = "_card_pioxl_2", Cu = "_head_pioxl_17", Su = "_mark_pioxl_25", Ru = "_name_pioxl_37", Tu = "_chips_pioxl_48", Lu = "_description_pioxl_54", Au = "_run_pioxl_59", Eu = "_sep_pioxl_68", be = {
  card: $u,
  head: Cu,
  mark: Su,
  name: Ru,
  chips: Tu,
  description: Lu,
  run: Au,
  sep: Eu
}, xu = { live: "done", draft: "running", paused: "meta" };
function Iu(e) {
  return e === void 0 ? be.card : `${be.card} ${e}`;
}
function qu({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: be.chips, children: e.map((a) => /* @__PURE__ */ n(h, { role: xu[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function Mu({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: be.description, children: e });
}
function Bu({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: be.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: be.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Pu(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Du({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, className: i }) {
  const c = { "--stream": `var(--ward-stream-${e.streamStep}-id)` }, s = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": s,
      className: Iu(i),
      style: c,
      "data-selected": s,
      "data-paused": Pu(e.versions),
      children: [
        /* @__PURE__ */ o("h3", { className: be.head, children: [
          /* @__PURE__ */ n("span", { className: be.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${be.name} ward-rowlink`, href: a, "aria-current": s, children: e.name })
        ] }),
        /* @__PURE__ */ n(Mu, { description: e.description }),
        /* @__PURE__ */ n(Bu, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(qu, { versions: e.versions })
      ]
    }
  );
}
const Ou = "_list_4dcyc_2", Hu = "_row_4dcyc_11", Fu = "_head_4dcyc_23", ju = "_id_4dcyc_30", Wu = "_lock_4dcyc_35", zu = "_reason_4dcyc_41", Gu = "_remove_4dcyc_46", Ku = "_clauses_4dcyc_50", Uu = "_clause_4dcyc_50", Vu = "_label_4dcyc_64", Yu = "_cell_4dcyc_71", Ju = "_value_4dcyc_76", Z = {
  list: Ou,
  row: Hu,
  head: Fu,
  id: ju,
  lock: Wu,
  reason: zu,
  remove: Gu,
  clauses: Ku,
  clause: Uu,
  label: Vu,
  cell: Yu,
  value: Ju
}, kn = We(!1);
function ck({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(kn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Z.list, "aria-label": a, children: e }) });
}
function Xu({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: Z.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(T, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function Qu({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: Z.lock, children: [
    /* @__PURE__ */ n(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: Z.reason, children: e })
  ] });
}
function Zu({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: Z.head, children: [
    /* @__PURE__ */ n("span", { className: Z.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Qu, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: Z.remove, children: /* @__PURE__ */ o(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Qa(e, a) {
  return e.locked ? void 0 : a;
}
function sk({ rule: e, onChange: a, onRemove: t }) {
  if (!je(kn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Qa(e, a);
  return /* @__PURE__ */ o("li", { className: Z.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Zu, { rule: e, onRemove: Qa(e, t) }),
    /* @__PURE__ */ n("dl", { className: Z.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: Z.clause, children: [
      /* @__PURE__ */ n("dt", { className: Z.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: Z.cell, children: /* @__PURE__ */ n(Xu, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const em = "_ladder_v5484_2", am = "_cell_v5484_7", nm = "_empty_v5484_26", tm = "_name_v5484_34", rm = "_holder_v5484_40", lm = "_request_v5484_46", om = "_swatches_v5484_51", im = "_swatch_v5484_51", ee = {
  ladder: em,
  cell: am,
  empty: nm,
  name: tm,
  holder: rm,
  request: lm,
  swatches: om,
  swatch: im
}, cm = "not validated — needs CVD matrix and dark stepping";
function sm(e) {
  return e.reserved ? "reserved" : Ea(e.step) ? "validated" : "partial";
}
function dm(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Za(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function um({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ee, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${ee.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function en(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function an(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
function mm({ step: e, value: a, taken: t, onChange: r, swatch: l }) {
  const i = sm(e), c = dm(i, t), s = c !== "free", u = e.name ?? `Step ${e.step}`, d = () => {
    s || r(e.step);
  }, m = `${u} — ${c}`;
  return l ? /* @__PURE__ */ n("span", { role: "radio", "aria-label": m, title: m, ...an(s, a === e.step), className: `${ee.swatch} ward-ladder-cell`, "data-validation": i, style: Za(e, i), onClick: d, onKeyDown: (_) => en(_, d) }) : /* @__PURE__ */ o(
    "span",
    {
      role: "radio",
      "aria-label": m,
      ...an(s, a === e.step),
      className: `${ee.cell} ward-ladder-cell`,
      "data-validation": i,
      style: Za(e, i),
      onClick: d,
      onKeyDown: (_) => en(_, d),
      children: [
        /* @__PURE__ */ n(um, { validation: i }),
        /* @__PURE__ */ n("span", { className: `${ee.name} ward-ladder-name`, children: u }),
        /* @__PURE__ */ n("span", { className: `${ee.holder} ward-ladder-holder`, children: c })
      ]
    }
  );
}
function hm(e) {
  for (const a of e)
    if (!a.reserved && !Ye(a.step)) throw new Error("colour ladder renders token steps only");
}
function wm() {
  return /* @__PURE__ */ o("div", { className: `${ee.cell} ward-ladder-cell ${ee.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${ee.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${ee.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${ee.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function _m(e) {
  return "presentation" in e && e.presentation === "swatches";
}
function $n(e) {
  const a = e.takenBy ?? {}, t = (l) => {
    var i;
    (i = e.onChange) == null || i.call(e, l);
  };
  hm(e.steps);
  const r = _m(e);
  return /* @__PURE__ */ o("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${r ? ee.swatches : ee.ladder} ward-ladder`, children: [
    e.steps.map((l) => /* @__PURE__ */ n(mm, { step: l, value: e.value, taken: a[l.step], onChange: t, swatch: r }, l.step)),
    r ? null : /* @__PURE__ */ n(wm, {})
  ] });
}
const vm = "_rail_1el2t_2", fm = "_section_1el2t_12", bm = "_sectionFlush_1el2t_22", pm = "_head_1el2t_26", gm = "_headLabel_1el2t_34", Nm = "_sample_1el2t_42", ym = "_sampleLabel_1el2t_47", km = "_sampleTitle_1el2t_54", $m = "_sampleMeta_1el2t_59", Cm = "_trace_1el2t_65", Sm = "_traceHead_1el2t_70", Rm = "_steps_1el2t_78", Tm = "_step_1el2t_78", Lm = "_stepTitle_1el2t_97", Am = "_hollow_1el2t_107", Em = "_stepBody_1el2t_115", xm = "_stepDetail_1el2t_127", Im = "_publish_1el2t_132", qm = "_reason_1el2t_138", Mm = "_note_1el2t_143", Bm = "_reveal_1el2t_148", p = {
  rail: vm,
  section: fm,
  sectionFlush: bm,
  head: pm,
  headLabel: gm,
  sample: Nm,
  sampleLabel: ym,
  sampleTitle: km,
  sampleMeta: $m,
  trace: Cm,
  traceHead: Sm,
  steps: Rm,
  step: Tm,
  stepTitle: Lm,
  hollow: Am,
  stepBody: Em,
  stepDetail: xm,
  publish: Im,
  reason: qm,
  note: Mm,
  reveal: Bm
}, nn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Pm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Dm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Om = { notSimulated: "not simulated", running: "running" };
function Hm(e) {
  return e.presentation === "foundry";
}
function Fm(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function jm(e, a) {
  var r;
  const t = Pm[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Wm(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function zm(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Gm(e) {
  if (Wm(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Km(e) {
  const [a, t] = g(!1);
  L(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Um(e) {
  const a = Om[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ee, { size: 6, kind: Dm[e.kind], label: e.kind });
}
function Vm(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Ym(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Jm(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Km, { kind: a.kind, children: [
    /* @__PURE__ */ n(Um, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Vm, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Ym, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Xm(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ae(a)), t.join(" · ");
}
function Cn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: Xm(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Jm, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Qm(e) {
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
function Zm(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ne(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function eh(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : Y(e.run.cost), label: "Cost" }, { value: e.run.turns ? dn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ha, { divided: !0, cells: a }) });
}
function ah(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: Y(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: dn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function nh(e) {
  const a = ah(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ha, { divided: !0, cells: a }) });
}
function Sn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function th(e) {
  return /* @__PURE__ */ o("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(Sn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function rh(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(Sn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Rn(e) {
  return /* @__PURE__ */ o("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(h, { role: nn[e.run.status].role, label: nn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function lh(e, a) {
  const [t, r] = g(e.steps);
  return L(() => r(e.steps), [e.steps]), L(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var c, s;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((c = l.step) == null ? void 0 : c.label) ?? "step", detail: (s = l.step) == null ? void 0 : s.tool }];
        });
      });
  }, [a, e.status]), t;
}
function oh(e) {
  var t;
  zm(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Rn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Qm, { sample: e.run.sample }),
    /* @__PURE__ */ n(Cn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(eh, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(va, { items: e.checklist }) }),
    /* @__PURE__ */ n(th, { reason: Fm(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function ih(e) {
  var r;
  const a = lh(e.run, e.feed);
  Gm(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Rn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Zm, { sample: e.run.sample }),
    /* @__PURE__ */ n(Cn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(nh, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(va, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(rh, { reason: jm(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function dk(e) {
  return Hm(e) ? /* @__PURE__ */ n(ih, { ...e }) : /* @__PURE__ */ n(oh, { ...e });
}
const ch = "_list_142ip_3", sh = "_row_142ip_9", dh = "_condition_142ip_18", uh = "_action_142ip_24", aa = {
  list: ch,
  row: sh,
  condition: dh,
  action: uh
}, Tn = We(!1);
function uk({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Tn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: aa.list, "aria-label": a, children: e }) });
}
function mk({ rule: e }) {
  if (!je(Tn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: aa.row, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: aa.condition, children: e.when }),
    /* @__PURE__ */ n(h, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: aa.action, children: e.then })
  ] });
}
function Sa(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(t, 0, l), r;
}
function Ln(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function An(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function tn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function mh(e) {
  return e === "up" ? "down" : "up";
}
function hh(e, a) {
  const t = tn(e, a.id, a.direction) ?? tn(e, a.id, mh(a.direction));
  t == null || t.focus();
}
function En() {
  const e = N(null), [a, t] = g(null), [r, l] = g("");
  return L(() => {
    e.current !== null && a !== null && hh(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), l(s);
  } };
}
function xn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ca({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const wh = "_body_1h15q_2", _h = "_title_1h15q_8", vh = "_section_1h15q_13", fh = "_legend_1h15q_18", bh = "_stages_1h15q_26", ph = "_stage_1h15q_26", gh = "_stageIndex_1h15q_44", Nh = "_stageName_1h15q_50", yh = "_footer_1h15q_59", kh = "_note_1h15q_66", $h = "_reason_1h15q_71", Ch = "_actions_1h15q_76", Sh = "_webHead_1h15q_83", Rh = "_kicker_1h15q_92", Th = "_webTitle_1h15q_99", Lh = "_webBody_1h15q_105", Ah = "_webSection_1h15q_109", Eh = "_sectionHead_1h15q_121", xh = "_sectionNote_1h15q_129", Ih = "_formLabel_1h15q_134", qh = "_identityRow_1h15q_139", Mh = "_nameCell_1h15q_145", Bh = "_keyCell_1h15q_150", Ph = "_colourCell_1h15q_154", Dh = "_colourStatus_1h15q_161", Oh = "_webStages_1h15q_166", Hh = "_webStageList_1h15q_172", Fh = "_webStage_1h15q_166", jh = "_webIndex_1h15q_191", Wh = "_webStageName_1h15q_196", zh = "_webMoves_1h15q_201", Gh = "_addStage_1h15q_215", Kh = "_addStageButton_1h15q_223", Uh = "_addStageNote_1h15q_231", Vh = "_webFooter_1h15q_236", Yh = "_webFooterNotes_1h15q_244", Jh = "_webNote_1h15q_251", w = {
  body: wh,
  title: _h,
  section: vh,
  legend: fh,
  stages: bh,
  stage: ph,
  stageIndex: gh,
  stageName: Nh,
  footer: yh,
  note: kh,
  reason: $h,
  actions: Ch,
  webHead: Sh,
  kicker: Rh,
  webTitle: Th,
  webBody: Lh,
  webSection: Ah,
  sectionHead: Eh,
  sectionNote: xh,
  formLabel: Ih,
  identityRow: qh,
  nameCell: Mh,
  keyCell: Bh,
  colourCell: Ph,
  colourStatus: Dh,
  webStages: Oh,
  webStageList: Hh,
  webStage: Fh,
  webIndex: jh,
  webStageName: Wh,
  webMoves: zh,
  addStage: Gh,
  addStageButton: Kh,
  addStageNote: Uh,
  webFooter: Vh,
  webFooterNotes: Yh,
  webNote: Jh
}, Xh = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], In = "not in catalogue";
function Qh(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} — ${In}` }, ...t];
}
function Zh({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(T, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${In}`;
  return /* @__PURE__ */ n(T, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Qh(t, e.name), invalid: i, onChange: r });
}
function qn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function ew(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function aw({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: c }) {
  const s = qn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(Zh, { stage: a, index: t, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(T, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Xh, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ca, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ca, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function nw({ stages: e, onChange: a, catalogue: t }) {
  const r = ew(e.length), l = En(), i = (s, u) => {
    const d = Ln(s, u);
    r.current = Sa(r.current, s, d), l.moved({ id: r.current[d], direction: u }, An(qn(e[s], s), d, e.length)), a(Sa(e, s, d));
  }, c = (s, u) => a(e.map((d, m) => m === s ? u : d));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(aw, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(xn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const tw = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], rw = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], lw = "A new stream starts as a draft. Nothing runs on it until you publish it.", ow = "Create is disabled: name the stream and give it a key first.", iw = "reorder with the ↑ ↓ buttons · min 2";
function Ba(e, a) {
  return !e.reserved && Ea(e.step) && a[e.step] === void 0;
}
function cw(e, a) {
  const t = e.find((r) => Ba(r, a));
  return t ? t.step : 1;
}
function sw({ stages: e, onMove: a }) {
  const t = En(), r = (l, i) => {
    const c = Ln(l, i);
    t.moved({ id: e[l].id, direction: i }, An(e[l].name, c, e.length)), a(l, c);
  };
  return /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ca, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ca, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(xn, { text: t.announcement })
  ] });
}
function dw({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: lw }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function uw(e, a) {
  return e !== "" && a !== "" ? null : ow;
}
function mw(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = rw, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = $(), [m, _] = g(""), [b, P] = g(""), [X, Q] = g(a[0].value), [te, xe] = g(() => cw(t, r)), [re, Ie] = g(e.stages ?? tw), [qe, k] = g(l[0].value), F = { name: m, key: b, streamStep: te, owner: X, stages: re, policy: qe }, ue = uw(m, b);
  return /* @__PURE__ */ n(Je, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(T, { kind: "input", label: "Stream name", value: m, onChange: _ }),
      /* @__PURE__ */ n(T, { kind: "input", label: "Key", value: b, onChange: P, mono: !0 }),
      /* @__PURE__ */ n(T, { kind: "select", label: "Owner", value: X, onChange: Q, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n($n, { label: "Stream colour", steps: t, value: te, onChange: xe, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(sw, { stages: re, onMove: ($e, Qn) => Ie(Sa(re, $e, Qn)) })
    ] }),
    /* @__PURE__ */ n(fn, { legend: "Loop policy", options: l, value: qe, onChange: k }),
    /* @__PURE__ */ n(dw, { reason: ue, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const Mn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], hw = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function ww(e, a, t, r, l, i) {
  var s;
  const c = ((s = Mn.find((u) => u.value === l)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function _w(e, a) {
  return vw(e) && fw(e, a) && bw(e);
}
function vw(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function fw(e, a) {
  return e.colourStep !== null && Ba({ step: e.colourStep }, a);
}
function bw(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function pw(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${cm}.` : Ba({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function gw({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Nw({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(gw, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: hw })
    ] }),
    l && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function yw({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function kw({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function $w(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [l, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [m, _] = g(null), [b, P] = g("relay"), [X, Q] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), te = ww(l, c, u, m, b, X), xe = _w(te, r), re = X.find((k) => k.kind === "agent" && k.name.trim() !== ""), Ie = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n($n, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: m, onChange: _, takenBy: r })
  ] }), qe = /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: pw(m, r) }),
    /* @__PURE__ */ n(T, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map((k) => ({ value: k, label: k })), onChange: d })
  ] });
  return /* @__PURE__ */ o(Je, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(yw, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(kw, { name: l, setName: i, streamKey: c, setKey: s, colour: Ie, owner: qe }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: iw })
        ] }),
        /* @__PURE__ */ n(nw, { stages: X, onChange: Q })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(fn, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: Mn, onChange: P }) }),
      /* @__PURE__ */ n(Nw, { ready: xe, draft: te, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function hk(e) {
  return "presentation" in e ? /* @__PURE__ */ n($w, { ...e }) : /* @__PURE__ */ n(mw, { ...e });
}
const Cw = "_row_bs8hc_2", Sw = "_cell_bs8hc_6", Rw = "_condition_bs8hc_11", Tw = "_action_bs8hc_18", Lw = "_contract_bs8hc_24", Aw = "_contractCondition_bs8hc_33", Ew = "_contractAction_bs8hc_39", K = {
  row: Cw,
  cell: Sw,
  condition: Rw,
  action: Tw,
  contract: Lw,
  contractCondition: Aw,
  contractAction: Ew
}, Bn = ["advance", "block", "escalate", "requestReview"], rn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function sa(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Pa(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: K.action, children: rn[e.then] }) : /* @__PURE__ */ n(
    T,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: Bn.map((l) => ({ value: l, label: rn[l] }))
    }
  );
}
function xw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: K.condition, title: sa(e, r), children: sa(e, r) }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: Pa(e, a, t) })
  ] });
}
function Iw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ o("td", { className: K.cell, children: [
      /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: K.condition, children: sa(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: K.cell, children: Pa(e, a, t) })
  ] });
}
function qw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: K.contract, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: K.contractCondition, children: sa(e, r) }),
    /* @__PURE__ */ n(h, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: K.contractAction, children: Pa(e, a, t, !0) })
  ] });
}
const Mw = { two: Iw, four: xw, contract: qw };
function wk(e) {
  var t;
  if (!Bn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Mw[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Bw = "_column_lurgk_2", Pw = "_head_lurgk_17", Dw = "_index_lurgk_23", Ow = "_name_lurgk_29", Hw = "_meta_lurgk_38", Fw = "_mono_lurgk_43", jw = "_gate_lurgk_50", Ww = "_reviewersLabel_lurgk_57", zw = "_reviewers_lurgk_57", Gw = "_reviewer_lurgk_57", Kw = "_agents_lurgk_74", Uw = "_workflowColumn_lurgk_79", Vw = "_workflowHead_lurgk_96", Yw = "_stageRow_lurgk_102", Jw = "_stageLabel_lurgk_109", Xw = "_workflowTitle_lurgk_116", Qw = "_workflowMeta_lurgk_122", Zw = "_workflowGate_lurgk_127", e_ = "_gateNote_lurgk_135", a_ = "_cardNote_lurgk_140", n_ = "_reviewerList_lurgk_149", t_ = "_reviewerRow_lurgk_155", r_ = "_reviewerMark_lurgk_161", l_ = "_reviewerName_lurgk_171", o_ = "_terminalCard_lurgk_177", i_ = "_terminalCount_lurgk_186", c_ = "_workflowAgents_lurgk_192", s_ = "_mount_lurgk_198", y = {
  column: Bw,
  head: Pw,
  index: Dw,
  name: Ow,
  meta: Hw,
  mono: Fw,
  gate: jw,
  reviewersLabel: Ww,
  reviewers: zw,
  reviewer: Gw,
  agents: Kw,
  workflowColumn: Uw,
  workflowHead: Vw,
  stageRow: Yw,
  stageLabel: Jw,
  workflowTitle: Xw,
  workflowMeta: Qw,
  workflowGate: Zw,
  gateNote: e_,
  cardNote: a_,
  reviewerList: n_,
  reviewerRow: t_,
  reviewerMark: r_,
  reviewerName: l_,
  terminalCard: o_,
  terminalCount: i_,
  workflowAgents: c_,
  mount: s_
}, d_ = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Pn(e) {
  return `${Math.round(e * 100)}%`;
}
function u_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ha, { cells: [
      { value: Pn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: J(e.count), label: "In stage" }
    ] })
  ] });
}
function m_({ stage: e }) {
  return /* @__PURE__ */ n(ha, { cells: [
    { value: J(e.count), label: "In stage" },
    { value: J(e.closedThisWeek ?? 0), label: "Closed this week" }
  ] });
}
function h_({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(h, { role: e.kind === "gate" ? "gate" : "soft", label: d_[e.kind] })
  ] });
}
function w_({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: y.meta, children: [
    /* @__PURE__ */ o("span", { className: y.mono, children: [
      J(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: y.mono, children: [
      ae(e.medianWait),
      " median wait"
    ] })
  ] });
}
function __({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(u_, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(m_, { stage: e }) : null;
}
function v_({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function f_({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: y.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(h_, { stage: e, titleId: l }),
    /* @__PURE__ */ n(w_, { stage: e }),
    /* @__PURE__ */ n(__, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(Du, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(v_, { onMount: t })
  ] });
}
const b_ = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function p_({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a) => /* @__PURE__ */ o("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, a.initials)) });
}
function g_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(p_, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Pn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function N_({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: e.closedThisWeek ?? 0 }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: "items closed this week" })
  ] });
}
function y_(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function k_(e) {
  if (e.kind === "terminal") return `${e.closedThisWeek ?? 0} this week`;
  const a = y_(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function $_({ stage: e, titleId: a }) {
  const t = b_[e.kind];
  return /* @__PURE__ */ o("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: y.stageRow, children: [
      /* @__PURE__ */ o("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(h, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: k_(e) })
  ] });
}
function C_(e) {
  return e === "entry" || e === "agent";
}
function S_({ stage: e, onMount: a }) {
  return a === void 0 || !C_(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function R_({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n($_, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(g_, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(N_, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(S_, { stage: e, onMount: t })
  ] });
}
function T_(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function _k(e) {
  return T_(e) ? /* @__PURE__ */ n(R_, { ...e }) : /* @__PURE__ */ n(f_, { ...e });
}
const L_ = "_row_ve78g_6", A_ = "_cell_ve78g_10", E_ = "_name_ve78g_19", x_ = "_chain_ve78g_26", I_ = "_owner_ve78g_32", q_ = "_mono_ve78g_38", M_ = "_compactRow_ve78g_45", B_ = "_compactCell_ve78g_54", P_ = "_stack_ve78g_71", D_ = "_stat_ve78g_78", O_ = "_identityLine_ve78g_85", H_ = "_identity_ve78g_85", F_ = "_compactName_ve78g_103", j_ = "_ownerLine_ve78g_117", W_ = "_link_ve78g_130", z_ = "_emptyChain_ve78g_136", G_ = "_arrow_ve78g_142", K_ = "_muted_ve78g_143", U_ = "_define_ve78g_148", V_ = "_statValue_ve78g_155", Y_ = "_policyId_ve78g_161", J_ = "_sub_ve78g_166", f = {
  row: L_,
  cell: A_,
  name: E_,
  chain: x_,
  owner: I_,
  mono: q_,
  compactRow: M_,
  compactCell: B_,
  stack: P_,
  stat: D_,
  identityLine: O_,
  identity: H_,
  compactName: F_,
  ownerLine: j_,
  link: W_,
  emptyChain: z_,
  arrow: G_,
  muted: K_,
  define: U_,
  statValue: V_,
  policyId: Y_,
  sub: J_
};
function X_(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Q_(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function Z_(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${e.members} members`;
}
function ev(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ o("span", { className: f.stack, children: [
    /* @__PURE__ */ o("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(h, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Z_(e) })
  ] }) });
}
function av(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(h, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function nv(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : av(e) });
}
function ln(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function tv(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function rv(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function lv({ stream: e, href: a, presentation: t }) {
  const r = Q_(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": `var(--ward-stream-${e.streamStep}-chip)` }, children: [
    ev(e, a),
    nv(e.stages, a),
    ln(rv(e.agents), e.agents === void 0 ? void 0 : X_(e.agents), "—"),
    tv(e.policy),
    ln(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function ov(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function vk(e) {
  if (ov(e)) return lv(e);
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
        J(a.members),
        " members"
      ] })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: J(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : ae(a.p50) }) })
  ] });
}
const iv = "_row_1nbe9_2", cv = "_name_1nbe9_15", sv = "_scope_1nbe9_25", da = {
  row: iv,
  name: cv,
  scope: sv
};
function dv(e) {
  return e === void 0 ? `${da.row} ward-toolrow` : `${da.row} ward-toolrow ${e}`;
}
function uv(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function mv({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function hv({ classification: e }) {
  return /* @__PURE__ */ n(h, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function wv({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${da.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function _v(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function fk({ tool: e, onChange: a, presentation: t }) {
  const r = $(), l = $(), i = uv(e, t), c = _v(t);
  return /* @__PURE__ */ o(c, { className: dv(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(mv, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${da.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(wv, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(hv, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(h, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const vv = "_strip_g84q9_2", fv = "_head_g84q9_10", bv = "_name_g84q9_16", pv = "_chart_g84q9_24", gv = "_segment_g84q9_30", Nv = "_detailedChart_g84q9_36", pe = {
  strip: vv,
  head: fv,
  name: bv,
  chart: pv,
  segment: gv,
  detailedChart: Nv
}, Ra = [1, 2, 3, 4, 5, 6], ua = 100;
function yv(e, a) {
  return a.has(e) ? `var(--ward-stream-${e}-id, var(--ward-color-line2))` : "var(--ward-color-line)";
}
function kv({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: pe.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ra.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: pe.segment,
      x: l * ua,
      y: "0",
      width: ua,
      height: "8",
      fill: yv(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function $v(e) {
  return e !== null && Ye(e) ? vt(e) : H.color.line2;
}
function Cv(e) {
  const a = e.slice(0, Ra.length);
  for (; a.length < Ra.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Sv({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${pe.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ua),
        y: "0",
        width: String(ua),
        height: "40",
        style: { fill: $v(a.streamStep) }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function Dn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Rv(e) {
  const a = Cv(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("section", { className: `${pe.strip} ward-appearance`, "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(_a, { item: e.sample, onOpen: Dn(e.onOpen), feed: null }),
    /* @__PURE__ */ o("p", { className: `${pe.head} ward-envrow ward-appearance-head`, children: [
      /* @__PURE__ */ n("span", { className: "ward-identity", "aria-hidden": "true" }),
      t.streamStep !== null && Ye(t.streamStep) ? /* @__PURE__ */ n(h, { role: "stream", label: t.key, streamStep: t.streamStep }) : /* @__PURE__ */ n(h, { role: "meta", label: t.key }),
      /* @__PURE__ */ n("span", { className: `${pe.name} ward-rowlink`, children: t.name })
    ] }),
    /* @__PURE__ */ n("p", { className: "ward-checklist-note", children: "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on." }),
    /* @__PURE__ */ n(Sv, { identities: a })
  ] });
}
function Tv({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": `var(--ward-stream-${e.streamStep}-id)` };
  return /* @__PURE__ */ o("section", { className: pe.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ n(Ee, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: pe.name, children: e.name }),
      /* @__PURE__ */ n(h, { role: "stream", label: e.key, streamStep: e.streamStep })
    ] }),
    /* @__PURE__ */ n(_a, { item: { ...a, streamStep: e.streamStep }, onOpen: Dn(r) }),
    /* @__PURE__ */ n(kv, { draft: e, streams: t })
  ] });
}
function bk(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Rv, { ...e }) : /* @__PURE__ */ n(Tv, { ...e });
}
const Lv = "_row_ixlg5_6", Av = "_headCell_ixlg5_10", Ev = "_cell_ixlg5_11", xv = "_name_ixlg5_23", Iv = "_consequence_ixlg5_29", qv = "_governed_ixlg5_36", Mv = "_control_ixlg5_42", Bv = "_byRole_ixlg5_48", Pv = "_webControl_ixlg5_59", Dv = "_webConsequence_ixlg5_65", Ov = "_webGoverned_ixlg5_71", q = {
  row: Lv,
  headCell: Av,
  cell: Ev,
  name: xv,
  consequence: Iv,
  governed: qv,
  control: Mv,
  byRole: Bv,
  webControl: Pv,
  webConsequence: Dv,
  webGoverned: Ov
};
function Hv({
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
function Fv({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Hv, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function jv(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Wv({ name: e, cell: a, onChange: t }) {
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
function zv({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${q.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Wv, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webGoverned} ward-cellmeta`, children: jv(e) }) })
  ] });
}
function pk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(zv, { ...e }) : /* @__PURE__ */ n(Fv, { ...e });
}
const Gv = "_row_vv64h_2", Kv = "_cell_vv64h_6", Uv = "_name_vv64h_25", Vv = "_note_vv64h_30", Yv = "_webName_vv64h_41", Jv = "_webMeta_vv64h_47", W = {
  row: Gv,
  cell: Kv,
  name: Uv,
  note: Vv,
  webName: Yv,
  webMeta: Jv
}, On = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Xv(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Qv({ component: e, onRestart: a }) {
  const t = $(), r = On[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: W.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: W.cell, "data-mono": "true", children: [
      J(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { id: t, className: W.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: W.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(v, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Zv({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: Xv(e.state) });
}
function ef({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(h, { ...On[e.state] }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(Zv, { component: e, onRestart: a }) })
  ] });
}
function gk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ef, { ...e }) : /* @__PURE__ */ n(Qv, { ...e });
}
const af = "_row_1f1gp_7", nf = "_cell_1f1gp_11", tf = "_next_1f1gp_28", rf = "_headCell_1f1gp_38", lf = "_webId_1f1gp_77", of = "_webPurpose_1f1gp_83", cf = "_webMeta_1f1gp_91", sf = "_webUrgent_1f1gp_97", D = {
  row: af,
  cell: nf,
  next: tf,
  headCell: rf,
  webId: lf,
  webPurpose: of,
  webMeta: cf,
  webUrgent: sf
}, df = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, uf = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, Hn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], mf = Object.fromEntries(Hn.map((e) => [e.key, e]));
function Pe({ column: e, children: a }) {
  const t = mf[e];
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
function Nk() {
  return /* @__PURE__ */ n("tr", { children: Hn.map((e) => /* @__PURE__ */ n(
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
function hf({ cred: e }) {
  const a = df[e.state];
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ n(Pe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Pe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Pe, { column: "state", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Pe, { column: "cls", children: /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Pe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Pe, { column: "next", children: /* @__PURE__ */ n("span", { className: D.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function wf({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ${D.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function _f({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(wf, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(h, { ...uf[e.state] }) })
  ] });
}
function yk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(_f, { ...e }) : /* @__PURE__ */ n(hf, { ...e });
}
const vf = "_card_17zba_2", ff = "_head_17zba_11", bf = "_env_17zba_18", pf = "_version_17zba_25", gf = "_meta_17zba_32", Nf = "_webCard_17zba_37", yf = "_webRow_17zba_47", kf = "_webTitle_17zba_55", $f = "_webLine_17zba_65", Cf = "_webVersion_17zba_72", Sf = "_webMeta_17zba_77", j = {
  card: vf,
  head: ff,
  env: bf,
  version: pf,
  meta: gf,
  webCard: Nf,
  webRow: yf,
  webTitle: kf,
  webLine: $f,
  webVersion: Cf,
  webMeta: Sf
}, Fn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Rf({ env: e }) {
  const a = Fn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: j.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ o("div", { className: j.head, children: [
      /* @__PURE__ */ n("span", { className: j.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: j.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: j.meta, children: [
      "deployed ",
      ne(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: j.meta, children: t })
  ] });
}
function Tf(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ne(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Lf(e) {
  return /* @__PURE__ */ o("article", { className: `${j.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${j.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${j.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(h, { ...Fn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${j.version} ${j.webVersion} ${j.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${j.meta} ${j.webMeta} ${j.webLine} ward-cellmeta`, children: Tf(e) })
  ] });
}
function kk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Lf, { ...e }) : /* @__PURE__ */ n(Rf, { ...e });
}
const Af = "_upload_erepj_2", Ef = "_preview_erepj_7", xf = "_mark_erepj_17", If = "_empty_erepj_22", qf = "_actions_erepj_28", Mf = "_input_erepj_33", Bf = "_reasons_erepj_41", Pf = "_reason_erepj_41", Df = "_accepted_erepj_57", V = {
  upload: Af,
  preview: Ef,
  mark: xf,
  empty: If,
  actions: qf,
  input: Mf,
  reasons: Bf,
  reason: Pf,
  accepted: Df
}, jn = 1.5, Wn = 22, Ve = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${jn}px at ${Wn}px`];
function Of() {
  return { ok: !1, reasons: [Ve[1]] };
}
function Hf(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function Ff(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ve[0]] : [];
}
function jf(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ve[1]), e.querySelector("text") !== null && t.push(Ve[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function Wf(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? Wn / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < jn;
  }) ? [Ve[3]] : [];
}
function $k(e) {
  const a = Hf(e);
  if (a === null) return Of();
  const t = [...Ff(a), ...jf(a, e), ...Wf(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const zf = "Mark accepted.";
function Gf({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: V.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: V.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: V.empty }) });
}
function Kf(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Uf(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Vf({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: V.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: V.result, role: "status", children: /* @__PURE__ */ n("p", { className: V.accepted, children: zf }) }) : /* @__PURE__ */ n("div", { className: V.result, role: "status", children: /* @__PURE__ */ n("ul", { className: V.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: V.reason, children: a }, a)) }) });
}
function Yf({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Vf, { result: e }) : /* @__PURE__ */ n("p", { className: `${V.result} ${Kf(e, t)}`, role: "status", children: Uf(e, t) });
}
function Ck({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = N(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ o("div", { className: V.upload, children: [
    /* @__PURE__ */ n(Gf, { current: e }),
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
    /* @__PURE__ */ n(Yf, { result: i, presentation: r })
  ] });
}
const Jf = "_row_1wp9s_7", Xf = "_cell_1wp9s_11", Qf = "_head_1wp9s_28", Zf = "_name_1wp9s_34", eb = "_pinned_1wp9s_42", ab = "_headCell_1wp9s_49", nb = "_webName_1wp9s_88", tb = "_webMeta_1wp9s_95", rb = "_webWarn_1wp9s_103", A = {
  row: Jf,
  cell: Xf,
  head: Qf,
  name: Zf,
  pinned: eb,
  headCell: ab,
  webName: nb,
  webMeta: tb,
  webWarn: rb
}, Da = {
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
], lb = Object.fromEntries(zn.map((e) => [e.key, e]));
function ob(e, a) {
  return `mcp.${e}.${a}`;
}
function ib(e) {
  return Object.keys(Da).includes(e);
}
function cb(e) {
  return Da[e !== void 0 && ib(e) ? e : "unknown"];
}
function ze({ column: e, children: a }) {
  const t = lb[e];
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
function Sk() {
  return /* @__PURE__ */ n("tr", { children: zn.map((e) => /* @__PURE__ */ n(
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
function sb({ server: e }) {
  const a = Da[e.connection];
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
    /* @__PURE__ */ n(ze, { column: "tools", children: e.tools.map((t) => ob(e.name, t)).join(" · ") })
  ] });
}
function db(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function ub(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function mb({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${A.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${A.webMeta} ward-cellmeta`, children: e });
}
function hb({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${A.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function wb({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function _b({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: A.row, children: [
    /* @__PURE__ */ o("td", { className: A.cell, children: [
      /* @__PURE__ */ n("span", { className: `${A.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${A.webMeta} ward-cellmeta`, children: db(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: A.cell, children: /* @__PURE__ */ n("span", { className: `${A.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: A.cell, children: /* @__PURE__ */ n(h, { ...ub(e) }) }),
    /* @__PURE__ */ n("td", { className: A.cell, children: /* @__PURE__ */ n(mb, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: A.cell, children: /* @__PURE__ */ n(h, { ...cb(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: A.cell, children: [
      /* @__PURE__ */ n(hb, { server: e, onRestart: a }),
      /* @__PURE__ */ n(wb, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function Rk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(_b, { ...e }) : /* @__PURE__ */ n(sb, { ...e });
}
const vb = "_row_1h9nq_2", fb = "_headCell_1h9nq_14", bb = "_cell_1h9nq_15", pb = "_name_1h9nq_26", gb = "_consequence_1h9nq_32", Nb = "_reason_1h9nq_38", yb = "_value_1h9nq_44", kb = "_webRow_1h9nq_60", $b = "_webSetting_1h9nq_71", Cb = "_webName_1h9nq_79", Sb = "_webConsequence_1h9nq_87", Rb = "_webControl_1h9nq_93", Tb = "_webState_1h9nq_106", Lb = "_webChip_1h9nq_111", R = {
  row: vb,
  headCell: fb,
  cell: bb,
  name: pb,
  consequence: gb,
  reason: Nb,
  value: yb,
  webRow: kb,
  webSetting: $b,
  webName: Cb,
  webConsequence: Sb,
  webControl: Rb,
  webState: Tb,
  webChip: Lb
}, Gn = 104, Kn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Ab({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ae, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(wn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: R.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Eb({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = Kn[t], c = t === "locked";
  return /* @__PURE__ */ o("tr", { className: R.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: R.headCell, children: [
      /* @__PURE__ */ n("span", { className: R.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: R.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: R.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: R.cell, children: /* @__PURE__ */ n(Ab, { control: a, name: e.name, locked: c, describedBy: c ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: R.cell, style: { width: Gn }, children: /* @__PURE__ */ n(h, { role: i.role, label: i.label }) })
  ] });
}
function Un(e, a) {
  return String(e ?? a);
}
function xb(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Ib(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Un(e.value, "—");
}
function qb({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: R.webControl, children: [
    /* @__PURE__ */ n(Ae, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => l == null ? void 0 : l(c) }),
    /* @__PURE__ */ n("span", { className: R.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function Mb(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(qb, { ...e });
  const l = xb(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: R.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(wn, { options: l, value: Un(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${R.webControl} ${R.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: Ib(a) });
}
function Bb({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const c = $(), s = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${R.row} ${R.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: R.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${R.name} ${R.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: c, className: `${R.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: R.webControl, children: i(c) }) : /* @__PURE__ */ n(Mb, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${R.webChip} ward-policy-chip`, style: { width: Gn }, children: /* @__PURE__ */ n(h, { ...Kn[t], size: "tag" }) })
  ] });
}
function Tk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Bb, { ...e }) : /* @__PURE__ */ n(Eb, { ...e });
}
const Pb = "_label_1o9za_7", Db = "_name_1o9za_15", Ob = "_column_1o9za_24", Hb = "_webFrame_1o9za_57", Fb = "_webHead_1o9za_62", jb = "_webHeadLabel_1o9za_74", Wb = "_webLabel_1o9za_112", zb = "_webColumns_1o9za_119", Gb = "_webGroup_1o9za_125", Kb = "_webPeople_1o9za_126", Ub = "_webVia_1o9za_127", Vb = "_webMeta_1o9za_156", O = {
  label: Pb,
  name: Db,
  column: Ob,
  webFrame: Hb,
  webHead: Fb,
  webHeadLabel: jb,
  webLabel: Wb,
  webColumns: zb,
  webGroup: Gb,
  webPeople: Kb,
  webVia: Ub,
  webMeta: Vb
}, Yb = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, ga = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Na({ column: e, children: a }) {
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
function Jb(e) {
  if (!e.matrixRole) return;
  const a = Yb[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Xb({ node: e }) {
  const a = Jb(e);
  return /* @__PURE__ */ o("span", { className: O.label, children: [
    /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
    /* @__PURE__ */ n(Qb, { role: a, node: e }),
    /* @__PURE__ */ n(Na, { column: ga[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Na, { column: ga[1], children: e.people === void 0 ? "" : J(e.people) }),
    /* @__PURE__ */ n(Na, { column: ga[2], children: e.requestedVia ?? "" })
  ] });
}
function Qb({ role: e, node: a }) {
  return /* @__PURE__ */ o(B, { children: [
    e && /* @__PURE__ */ n(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(h, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(h, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Zb({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    pn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(Xb, { node: t }),
      children: c
    }
  );
}
function ya({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function ep({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${O.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(ya, { className: `${O.webMeta} ${O.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(ya, { className: `${O.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(ya, { className: `${O.webMeta} ${O.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function ap() {
  return /* @__PURE__ */ o("div", { className: O.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: O.webColumns, children: [
      /* @__PURE__ */ n("span", { className: O.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: O.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: O.webVia, children: "Requested via" })
    ] })
  ] });
}
function np({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${O.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function tp(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function rp({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: O.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(ap, {}),
    /* @__PURE__ */ n(Zi, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      pn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(np, { row: t }),
        detail: /* @__PURE__ */ n(ep, { row: t }),
        expanded: tp(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function Lk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(rp, { ...e }) : /* @__PURE__ */ n(Zb, { ...e });
}
const lp = "_runbook_b9agc_2", op = "_list_b9agc_7", ip = "_step_b9agc_15", cp = "_numeral_b9agc_21", sp = "_body_b9agc_28", dp = "_head_b9agc_34", up = "_title_b9agc_40", mp = "_detail_b9agc_45", hp = "_actions_b9agc_50", wp = "_webList_b9agc_56", _p = "_webStep_b9agc_60", vp = "_webBody_b9agc_66", fp = "_webTitle_b9agc_74", bp = "_webDetail_b9agc_78", S = {
  runbook: lp,
  list: op,
  step: ip,
  numeral: cp,
  body: sp,
  head: dp,
  title: up,
  detail: mp,
  actions: hp,
  webList: wp,
  webStep: _p,
  webBody: vp,
  webTitle: fp,
  webDetail: bp
}, Vn = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function Yn(e) {
  return String(e + 1).padStart(2, "0");
}
function pp({ step: e, index: a, connection: t }) {
  const r = Vn[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: S.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: Yn(a) }),
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
function gp({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, l) => /* @__PURE__ */ n(pp, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function Np({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Yn(a) }),
    /* @__PURE__ */ o("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(h, { ...Vn[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function yp({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(Np, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function Ak(e) {
  return "presentation" in e ? /* @__PURE__ */ n(yp, { ...e }) : /* @__PURE__ */ n(gp, { ...e });
}
const kp = "_list_1gu6a_2", $p = "_check_1gu6a_10", Cp = "_body_1gu6a_16", Sp = "_text_1gu6a_23", Rp = "_pending_1gu6a_32", Tp = "_measured_1gu6a_37", Oe = {
  list: kp,
  check: $p,
  body: Cp,
  text: Sp,
  pending: Rp,
  measured: Tp
};
function Lp(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Ap({ check: e }) {
  const a = Lp(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Oe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(qa, { state: a.state, label: a.label }),
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
function Ek({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Oe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Ap, { check: a }, a.text)) });
}
const Ep = "_root_16pdz_2", xp = "_list_16pdz_9", Ip = "_line_16pdz_16", qp = "_at_16pdz_43", Mp = "_text_16pdz_47", Bp = "_foot_16pdz_51", Pp = "_idle_16pdz_62", Dp = "_caret_16pdz_69", Op = "_jump_16pdz_76", _e = {
  root: Ep,
  list: xp,
  line: Ip,
  at: qp,
  text: Mp,
  foot: Bp,
  idle: Pp,
  caret: Dp,
  jump: Op
}, Hp = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Oa(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Hp.format(new Date(e));
}
const Fp = { warn: "warning", ok: "ok" };
function jp({ kind: e }) {
  const a = Fp[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Wp({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Oa(e)}` });
}
function zp({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events — as of ${Oa(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${_e.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${_e.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: _e.idle, children: i }),
    /* @__PURE__ */ n(Wp, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function xk({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = N(null), [i, c] = g(0), s = e.at(-1);
  L(() => {
    c(e.length);
  }, [e.length]);
  const u = () => {
    var _;
    const d = l.current;
    if (!d) return;
    d.scrollTop = d.scrollHeight;
    const m = d.querySelectorAll("[data-consline-text]");
    (_ = m.item(m.length - 1)) == null || _.focus();
  };
  return /* @__PURE__ */ o("div", { className: _e.root, children: [
    /* @__PURE__ */ n("ol", { className: _e.list, ref: l, "aria-live": "off", "aria-label": r, children: e.map((d, m) => /* @__PURE__ */ o("li", { className: `${_e.line} ward-consline ward-reveal ward-consline--${d.kind}`, "data-kind": d.kind, "data-revealed": m < i, children: [
      /* @__PURE__ */ n("span", { className: _e.at, children: Oa(d.at) }),
      /* @__PURE__ */ n(jp, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: _e.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${m}`)) }),
    /* @__PURE__ */ n(zp, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${_e.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const Gp = "_row_11jhe_2", Kp = "_head_11jhe_14", Up = "_author_11jhe_20", Vp = "_eta_11jhe_25", Yp = "_edited_11jhe_26", Jp = "_body_11jhe_32", Xp = "_reason_11jhe_37", Qp = "_actions_11jhe_42", he = {
  row: Gp,
  head: Kp,
  author: Up,
  eta: Vp,
  edited: Yp,
  body: Jp,
  reason: Xp,
  actions: Qp
}, Zp = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function eg(e) {
  return {
    queued: `Still in the outbox — editing replaces the queued row and recomputes req_hash, so ${e} receives one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed — edit and resend, or cancel the delivery."
  };
}
function ag({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function ng({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: he.reason, id: a, children: e })
  ] });
}
function tg(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function rg(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(ag, { ...e }) : /* @__PURE__ */ n(ng, { reason: e.unavailable, reasonId: e.unavailableId });
}
function Ik(e) {
  const { comment: a } = e;
  tg(e);
  const t = $(), r = `${t}-unavailable`, l = Zp[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${he.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: he.head, children: [
      /* @__PURE__ */ n("span", { className: he.author, children: a.author }),
      /* @__PURE__ */ n(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: he.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: he.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: he.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: he.reason, id: t, children: eg(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: he.actions, children: /* @__PURE__ */ n(rg, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const lg = "_root_c46wj_2", og = "_attach_c46wj_11", ig = "_actions_c46wj_17", cg = "_reply_c46wj_23", sg = "_replyRow_c46wj_28", dg = "_sendsAs_c46wj_42", Fe = {
  root: lg,
  attach: og,
  actions: ig,
  reply: cg,
  replyRow: sg,
  sendsAs: dg
};
function ug({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = g(""), i = $();
  return /* @__PURE__ */ o("div", { className: Fe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Fe.replyRow, children: [
      /* @__PURE__ */ n(T, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Fe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function qk(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(ug, { ...e }) : /* @__PURE__ */ n(mg, { ...e });
}
function mg({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ o("div", { className: Fe.root, children: [
    /* @__PURE__ */ n(T, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ o("div", { className: Fe.attach, children: [
      /* @__PURE__ */ n(h, { role: "soft", label: t.label }),
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
    /* @__PURE__ */ o("div", { className: Fe.actions, children: [
      /* @__PURE__ */ n(v, { variant: "primary", onClick: () => l(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(v, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const hg = "_list_1ih9e_2", wg = "_item_1ih9e_6", _g = "_body_1ih9e_22", vg = "_text_1ih9e_28", fg = "_evidence_1ih9e_37", bg = "_consequence_1ih9e_49", pg = "_note_1ih9e_54", Le = {
  list: hg,
  item: wg,
  body: _g,
  text: vg,
  evidence: fg,
  consequence: bg,
  note: pg
};
function gg({ criterion: e }) {
  return /* @__PURE__ */ n(Ee, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function on({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Ng(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function yg({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Le.body, children: [
    /* @__PURE__ */ n("span", { className: Le.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(B, { children: [
      /* @__PURE__ */ n(on, { text: " — " }),
      /* @__PURE__ */ n("code", { className: Le.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(B, { children: [
      /* @__PURE__ */ n(on, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Le.consequence, children: Ng(e.why) })
    ] })
  ] });
}
function kg({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Le.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(gg, { criterion: e }),
    /* @__PURE__ */ n(yg, { criterion: e })
  ] });
}
function Mk({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Le.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(kg, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Le.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const $g = "_list_dwhoz_2", Cg = "_rung_dwhoz_6", Sg = "_name_dwhoz_18", Rg = "_actor_dwhoz_32", na = {
  list: $g,
  rung: Cg,
  name: Sg,
  actor: Rg
}, Tg = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function Lg({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = Tg[e.state];
  return /* @__PURE__ */ o("li", { className: na.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: na.name, children: e.name }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${na.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function Bk({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${na.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(Lg, { rung: a }, a.name)) });
}
const Ag = "_sheet_1fqco_2", Eg = "_title_1fqco_9", xg = "_stage_1fqco_15", Ig = "_effects_1fqco_20", qg = "_effect_1fqco_20", Mg = "_numeral_1fqco_31", Bg = "_effectText_1fqco_38", Pg = "_refusals_1fqco_43", Dg = "_reasons_1fqco_52", Og = "_reason_1fqco_52", Hg = "_actions_1fqco_62", oe = {
  sheet: Ag,
  title: Eg,
  stage: xg,
  effects: Ig,
  effect: qg,
  numeral: Mg,
  effectText: Bg,
  refusals: Pg,
  reasons: Dg,
  reason: Og,
  actions: Hg
};
function Fg({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function Pk({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: c }) {
  const s = $(), u = `${s}-refusal`, [d, m] = g(""), _ = t.length > 0;
  return /* @__PURE__ */ n(Je, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ o("div", { className: oe.sheet, children: [
    /* @__PURE__ */ o("h2", { className: oe.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: oe.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: oe.effects, children: a.map((b, P) => /* @__PURE__ */ o("li", { className: oe.effect, children: [
      /* @__PURE__ */ n("span", { className: oe.numeral, children: String(P + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: oe.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      Ko,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(T, { kind: "textarea", label: "Note for the agent", value: d, onChange: m }),
    _ && /* @__PURE__ */ o("div", { className: oe.refusals, children: [
      /* @__PURE__ */ n(h, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: oe.reasons, children: t.map((b, P) => /* @__PURE__ */ n("li", { className: oe.reason, id: P === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: oe.actions, children: [
      /* @__PURE__ */ n(Fg, { refused: _, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const jg = "_list_1hvqu_2", Wg = "_path_1hvqu_7", zg = "_head_1hvqu_21", Gg = "_label_1hvqu_28", Kg = "_consequence_1hvqu_35", Ug = "_ask_1hvqu_36", He = {
  list: jg,
  path: Wg,
  head: zg,
  label: Gg,
  consequence: Kg,
  ask: Ug
}, Ta = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function cn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Vg({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: Ta[e.kind] }) : /* @__PURE__ */ o(B, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: Ta[e.kind] }),
    /* @__PURE__ */ n("span", { className: He.ask, id: r, children: e.askInstead })
  ] });
}
function Yg({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: He.path, "data-allowed": e.allowed, "data-role": cn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: He.head, children: [
      /* @__PURE__ */ n("span", { className: He.label, children: e.title ?? Ta[e.kind] }),
      /* @__PURE__ */ n(h, { role: cn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: He.consequence, children: e.consequence }),
    /* @__PURE__ */ n(Vg, { path: e, primary: a, onChoose: t })
  ] });
}
function Dk({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: He.list, children: e.map((t, r) => /* @__PURE__ */ n(Yg, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const Jg = "_list_qjv4r_2", Xg = "_item_qjv4r_6", Qg = "_node_qjv4r_18", Zg = "_body_qjv4r_24", eN = "_head_qjv4r_30", aN = "_stage_qjv4r_36", nN = "_version_qjv4r_41", tN = "_sentence_qjv4r_49", rN = "_meta_qjv4r_54", ve = {
  list: Jg,
  item: Xg,
  node: Qg,
  body: Zg,
  head: eN,
  stage: aN,
  version: nN,
  sentence: tN,
  meta: rN
}, lN = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function oN({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ve.head, children: [
    /* @__PURE__ */ n("span", { className: ve.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ve.version, title: e.version, children: e.version }) : null
  ] });
}
function iN({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ve.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ve.node} ward-history-node`, children: /* @__PURE__ */ n(Ee, { size: 9, kind: lN[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ve.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(oN, { entry: e }),
      /* @__PURE__ */ n("span", { className: ve.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ve.meta} ward-history-meta`, children: [
        `${ne(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${Y(e.cost)}`
      ] })
    ] })
  ] });
}
function Ok({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ve.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(iN, { entry: a }, a.stage + String(t))) });
}
const cN = "_thread_1kn6s_3", sN = "_turn_1kn6s_8", dN = "_who_1kn6s_27", uN = "_body_1kn6s_32", ta = {
  thread: cN,
  turn: sN,
  who: dN,
  body: uN
}, Jn = We(!1);
function Hk({ children: e, density: a }) {
  return /* @__PURE__ */ n(Jn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ta.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function Fk({ turn: e }) {
  if (!je(Jn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ta.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ta.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ne(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ta.body} ward-chat-body`, children: e.body })
  ] });
}
const mN = "_list_1rt9c_3", hN = "_row_1rt9c_7", wN = "_label_1rt9c_20", _N = "_n_1rt9c_26", vN = "_cause_1rt9c_33", Ke = {
  list: mN,
  row: hN,
  label: wN,
  n: _N,
  cause: vN
};
function fN(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const bN = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function pN({ row: e, formatNumber: a }) {
  return fN(e), /* @__PURE__ */ o("li", { className: `${Ke.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ee, { size: 8, ...bN[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Ke.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Ke.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(gN, { cause: e.cause })
  ] });
}
function gN({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ke.cause} ward-healthrow-cause`, children: e }) : null;
}
function jk({ rows: e, formatNumber: a = J }) {
  return /* @__PURE__ */ n("ul", { className: `${Ke.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(pN, { row: t, formatNumber: a }, t.label)) });
}
const NN = "_root_1jxwp_2", yN = {
  root: NN
};
function Wk({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: yN.root, "data-density": l, children: [
    /* @__PURE__ */ n(va, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(v, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const kN = "_row_dhbre_3", $N = "_key_dhbre_13", CN = "_stack_dhbre_24", SN = "_value_dhbre_32", RN = "_evidence_dhbre_39", TN = "_mark_dhbre_47", De = {
  row: kN,
  key: $N,
  stack: CN,
  value: SN,
  evidence: RN,
  mark: TN
};
function LN({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(h, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(qa, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function zk({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${De.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${De.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${De.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${De.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${De.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${De.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(LN, { state: e.state }) })
  ] });
}
const AN = "_cell_1monp_2", EN = {
  cell: AN
}, xN = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function IN(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function qN(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function MN(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: IN(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function BN(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function Gk({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  qN(e, t);
  const r = BN(e);
  return /* @__PURE__ */ n(
    oi,
    {
      label: "Rejection routing",
      columns: xN,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: EN.cell, "data-norerun": l.noRerun ? !0 : void 0, children: MN(l, i) }),
      empty: a ?? /* @__PURE__ */ n(Ec, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const PN = "_row_ute8v_2", DN = "_title_ute8v_11", ON = "_turns_ute8v_20", HN = "_waiting_ute8v_21", FN = "_resolved_ute8v_22", jN = "_activity_ute8v_23", WN = "_cost_ute8v_29", zN = "_link_ute8v_30", GN = "_tableRow_ute8v_47", KN = "_tableTitle_ute8v_59", UN = "_tableResolved_ute8v_64", VN = "_tableLink_ute8v_68", YN = "_tableMeta_ute8v_83", JN = "_tableCost_ute8v_90", XN = "_tableActivity_ute8v_91", QN = "_tableState_ute8v_101", ZN = "_tableRecord_ute8v_112", I = {
  row: PN,
  title: DN,
  turns: ON,
  waiting: HN,
  resolved: FN,
  activity: jN,
  cost: WN,
  link: zN,
  tableRow: GN,
  tableTitle: KN,
  tableResolved: UN,
  tableLink: VN,
  tableMeta: YN,
  tableCost: JN,
  tableActivity: XN,
  tableState: QN,
  tableRecord: ZN
}, Xn = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function ey(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function ay(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function ny(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const ty = { duplicate: "CLOSED · DUPLICATE" };
function ry({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: I.tableMeta, children: `waiting on ${e}` });
}
function ly({ value: e }) {
  return /* @__PURE__ */ n("td", { className: I.tableCost, children: e === void 0 ? null : Y(e) });
}
function oy({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: I.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function iy({ session: e, href: a }) {
  const t = Xn[e.state];
  return /* @__PURE__ */ o("tr", { className: I.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: I.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: I.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: I.tableMeta, children: ay(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: I.tableResolved, children: [
      ny(e.resolved),
      /* @__PURE__ */ n(ry, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(ly, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: I.tableActivity, children: ey(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: I.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(h, { role: t.role, label: ty[e.state] ?? t.label }),
      /* @__PURE__ */ n(oy, { link: e.link })
    ] }) })
  ] });
}
function cy({ session: e }) {
  const a = Xn[e.state];
  return /* @__PURE__ */ o("div", { className: I.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: I.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: I.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: I.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: I.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: I.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : Y(e.cost) }),
    /* @__PURE__ */ n("span", { className: I.activity, children: ne(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: I.link, href: e.link.href, children: e.link.key }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Kk(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(iy, { session: e.session, href: e.href }) : /* @__PURE__ */ n(cy, { session: e.session });
}
const sy = "_block_1yy2v_3", dy = "_list_1yy2v_9", uy = "_line_1yy2v_14", La = {
  block: sy,
  list: dy,
  line: uy
}, my = { warn: "warning", ok: "ok" };
function hy({ kind: e }) {
  const a = my[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function wy({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${La.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(hy, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function Uk({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${La.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: La.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(wy, { line: t }, `${r}-${t.text}`)) }) });
}
const _y = "_band_tt7hp_1", vy = "_head_tt7hp_8", fy = "_cell_tt7hp_19", by = "_index_tt7hp_35", py = "_title_tt7hp_42", gy = "_note_tt7hp_48", Ny = "_cellTitle_tt7hp_53", yy = "_cellBody_tt7hp_58", ky = "_tag_tt7hp_64", me = {
  band: _y,
  head: vy,
  cell: fy,
  index: by,
  title: py,
  note: gy,
  cellTitle: Ny,
  cellBody: yy,
  tag: ky
}, sn = 4;
function Vk({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== sn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${sn}-cell grid`);
  return /* @__PURE__ */ o("section", { className: me.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: me.head, children: [
      /* @__PURE__ */ n("span", { className: me.index, children: e }),
      /* @__PURE__ */ n("span", { className: me.title, children: a }),
      /* @__PURE__ */ n("span", { className: me.note, children: t })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: me.cell, children: [
      /* @__PURE__ */ n("span", { className: me.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: me.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: me.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  xk as ActivityConsole,
  Du as AgentCard,
  My as AppShell,
  bk as AppearanceStrip,
  Vk as Band,
  ms as BoardColumn,
  Qy as BoardFootnote,
  Zy as BoardHeader,
  Gy as BoardScroller,
  v as Btn,
  xy as CHIP_ROLES,
  Hn as CREDENTIAL_COLUMNS,
  Oy as Callout,
  pk as CapabilityRow,
  Fk as ChatMessage,
  hn as Checkbox,
  h as Chip,
  Ik as ClarificationRow,
  sk as ClauseRuleRow,
  ck as ClauseRules,
  $n as ColourLadder,
  gk as ComponentRow,
  qk as Composer,
  ak as ConfigRow,
  ek as ConfigRowHead,
  Ma as ConnectionMark,
  Hk as Conversation,
  Ko as CostMeter,
  yk as CredentialRow,
  Nk as CredentialRowHead,
  Mk as CriteriaList,
  Ar as Crumb,
  jk as DeliveryHealth,
  Uy as DeniedState,
  dk as DryRunRail,
  Ec as EmptyState,
  kk as EnvCard,
  T as Field,
  Ky as FilteredEmpty,
  va as GateChecklist,
  Bk as GateLadder,
  oi as Grid,
  mk as HandoffRuleRow,
  uk as HandoffRules,
  nk as ItemDrawer,
  _t as LIVE_EVENT_TYPES,
  uu as LegacyBoardColumn,
  rk as LegacyBoardHeader,
  lk as LegacyConfigRow,
  ik as LegacyItemDrawer,
  ru as LegacyOverCapNote,
  ok as LegacyPreviewRail,
  yn as LegacyWorkCard,
  ge as LiveIndicator,
  Vy as LoadFailed,
  Xy as Loading,
  zn as MCP_SERVER_COLUMNS,
  qa as Mark,
  Ck as MarkUpload,
  Ee as Marker,
  Rk as McpServerRow,
  Sk as McpServerRowHead,
  hk as NewStreamModal,
  qc as OverCapNote,
  Je as Overlay,
  cm as PARTIAL_STEP_REASON,
  Gn as POLICY_CHIP_WIDTH,
  Fy as PageFrame,
  Dy as PageHeader,
  Tk as PolicyRow,
  tk as PreviewRail,
  ga as ROLE_MATRIX_COLUMNS,
  Bn as RULE_ACTIONS,
  fn as Radio,
  Wk as ReadyChecklist,
  Wy as RecordSection,
  Pk as RequeueSheet,
  Dk as ResolveBlock,
  zk as ResolvedFieldRow,
  Lk as RoleMatrixRow,
  Gk as RoutingTable,
  wk as RuleRow,
  Ak as RunbookSteps,
  ht as STREAM_STEPS,
  zy as SectionBand,
  ki as SectionHeader,
  wn as SegmentedControl,
  Kk as SessionRow,
  Py as Sidebar,
  _k as StageColumn,
  Ok as StageHistory,
  nw as StageListEditor,
  Yy as StaleStrip,
  ha as StatStrip,
  vk as StreamRow,
  jy as SubjectRail,
  Ae as Switch,
  By as Tabs,
  fk as ToolRow,
  Hy as TopBar,
  Zi as Tree,
  pn as TreeRow,
  Uk as TypedInputBlock,
  Ek as ValidationList,
  Ry as VisibilityProvider,
  Ty as Visible,
  Ey as WARD_VERSION,
  _a as WorkCard,
  Jy as WriteUnavailableStrip,
  ey as agoSince,
  lt as clock,
  pw as colourStatus,
  J as count,
  ae as duration,
  Aa as elapsed,
  Ay as eventSourceTransport,
  Ye as isStreamStep,
  Ea as isValidatedStreamStep,
  sm as ladderValidation,
  cb as mcpConnectionChip,
  ob as mcpToolName,
  Y as money,
  se as ms,
  gn as ordered,
  dn as ratio,
  Xv as restartLabel,
  ne as stamp,
  mn as stream,
  vt as streamChip,
  Iy as streamVars,
  ea as useBorderFlash,
  dt as useFocusTrap,
  qy as useLiveFeed,
  Ly as useReturnFocus,
  ma as useRovingTabindex,
  xa as useTicker,
  ot as useVisible,
  H as v,
  $k as validateMark,
  wt as validatedStreamSteps
};
