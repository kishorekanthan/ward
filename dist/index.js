import { useCallback as z, useEffect as T, useState as p, useRef as N, useLayoutEffect as Un, useId as $, useContext as sa, createContext as da, Fragment as Vn } from "react";
import { jsxs as l, jsx as n, Fragment as P } from "react/jsx-runtime";
import { createPortal as Yn } from "react-dom";
function Z(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const Oa = (e) => String(e).padStart(2, "0");
function La(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${Oa(a % 60)}s` : `${Math.floor(t / 60)}h ${Oa(t % 60)}m`;
}
const Jn = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ee(e) {
  const a = Jn.formatToParts(new Date(e)), t = (r) => {
    var o;
    return ((o = a.find((i) => i.type === r)) == null ? void 0 : o.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function V(e) {
  return e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function Y(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function cn(e, a) {
  return `${e} / ${a}`;
}
const Xn = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Qn(e) {
  return Xn.format(new Date(e));
}
const Zn = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function et(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function at(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = et(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function nt(e) {
  return { onKeyDown: z(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Zn));
      at(t, e.current, r);
    },
    [e]
  ) };
}
function QN(e, a = !0) {
  T(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const Ha = { ArrowUp: -1, ArrowDown: 1 }, Fa = { ArrowLeft: -1, ArrowRight: 1 }, tt = (e, a, t) => Math.min(t, Math.max(a, e));
function rt(e, a) {
  if (a !== "horizontal" && e in Ha) return Ha[e];
  if (a !== "vertical" && e in Fa) return Fa[e];
}
function ua({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  Un(() => {
    var b;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const m = d[0], _ = o.current;
    o.current = !1, t(m), _ && ((b = r.current.get(m)) == null || b.focus());
  });
  const i = z((d) => t(d), []), c = z((d) => {
    var m;
    t(d), (m = r.current.get(d)) == null || m.focus();
  }, []), s = z(
    (d) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const _ = Math.max(0, m.indexOf(a)), b = rt(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(m[tt(_ + b, 0, m.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(m[0])) : d.key === "End" && (d.preventDefault(), c(m[m.length - 1]));
    },
    [a, c, e]
  ), u = z(
    (d) => ({
      tabIndex: d === a ? 0 : -1,
      ref: (m) => {
        m ? r.current.set(d, m) : (r.current.delete(d), d === a && (o.current = !0));
      },
      onFocus: () => t(d),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: s }, itemProps: u, setActive: i };
}
const ZN = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, ey = "0.2.0", ay = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], lt = [1, 2, 3, 4, 5, 6], ot = [1, 2, 3], it = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], H = {
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
}, ie = {
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
function sn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ke(e) {
  return lt.includes(e);
}
function Aa(e) {
  return ot.includes(e);
}
function ny(e) {
  if (!Ke(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function ct(e) {
  if (!Ke(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
function ja(e) {
  return typeof e != "string" ? null : it.includes(e) ? e : null;
}
function st(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function dt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function ut(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function mt(e, a, t) {
  const r = st(e);
  if (r === null) return null;
  const o = ja(t) ?? ja(r.type);
  return o === null ? null : { ...r, type: o, id: dt(r, a), at: ut(r) };
}
function ht(e, a) {
  return e >= ie.staleAfter ? "stale" : e >= ie.heartbeat && a === "live" ? "reconnecting" : null;
}
function wt(e, a, t) {
  return e >= ie.heartbeat && !a && t !== null;
}
function ty(e, a) {
  const [t, r] = p("reconnecting"), [o, i] = p(null), c = N(/* @__PURE__ */ new Map()), s = N(0), u = N(""), d = N(0), m = N(null), _ = N(0), b = N(0), O = N(!1), J = N("reconnecting"), oe = z((k) => {
    J.current = k, r(k);
  }, []), se = z(() => {
    s.current = Date.now();
  }, []), Ee = z((k) => {
    for (const [F, de] of c.current)
      (de === "*" || k.itemKey === de) && F(k);
  }, []), ae = z(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (k, F, de) => {
        const ke = mt(k, F, de);
        ke !== null && (ke.id && (u.current = ke.id), se(), O.current = !1, oe("live"), i(ke.at), Ee(ke));
      },
      onOpen: () => {
        d.current = 0, O.current = !1, se(), oe("live");
      },
      onError: () => {
        var F;
        (F = m.current) == null || F.close(), m.current = null, O.current = !0, J.current !== "stale" && oe("reconnecting");
        const k = Math.min(ie.reconnectBase * 2 ** d.current, ie.reconnectMax);
        d.current += 1, _.current = window.setTimeout(ae, k);
      }
    });
  }, [Ee, oe, se, a, e]), xe = z((k) => {
    O.current = !0, k.close(), m.current = null, _.current = window.setTimeout(ae, ie.reconnectBase);
  }, [ae]), Ie = z((k, F) => (c.current.set(F, k), () => {
    c.current.delete(F);
  }), []);
  return T(() => (ae(), b.current = window.setInterval(() => {
    const k = Date.now() - s.current, F = ht(k, J.current);
    F && oe(F);
    const de = m.current;
    wt(k, O.current, de) && xe(de);
  }, ie.tick), () => {
    var k;
    window.clearInterval(b.current), window.clearTimeout(_.current), O.current = !1, (k = m.current) == null || k.close(), m.current = null;
  }), [ae, xe, oe]), { connection: t, lastEventAt: o, subscribe: Ie };
}
function Ea(e, a) {
  const t = new Date(e).getTime(), [r, o] = p(() => Date.now());
  return T(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    i();
    const c = window.setInterval(i, ie.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(c), document.removeEventListener("visibilitychange", i);
    };
  }, [a, t]), Math.max(0, r - t);
}
function _t() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Wa(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Xe(e, a) {
  const t = N(0), r = z((o) => {
    const i = o ?? a, c = e.current;
    c !== null && i !== void 0 && (_t() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => Wa(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => Wa(c), ie.flash)));
  }, [a, e]);
  return T(() => () => window.clearTimeout(t.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const vt = "_root_1otpc_2", ft = {
  root: vt
};
function bt(e, a, t, r, o) {
  const i = [La(a)];
  return e || i.push(`as of ${Qn(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = Ea(e, o), c = (a == null ? void 0 : a.at) ?? e, s = bt(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${ft.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      ee(e)
    ] })
  ] });
}
const gt = "_app_lrbcc_1", pt = "_side_lrbcc_18", Nt = "_main_lrbcc_26", yt = "_rail_lrbcc_33", kt = "_page_lrbcc_40", $t = "_root_lrbcc_91", Ct = "_topbar_lrbcc_98", St = "_mark_lrbcc_109", Rt = "_brand_lrbcc_116", Tt = "_tagline_lrbcc_122", Lt = "_identity_lrbcc_128", At = "_tools_lrbcc_129", Et = "_actor_lrbcc_138", xt = "_metadata_lrbcc_139", It = "_detail_lrbcc_155", qt = "_nav_lrbcc_160", Mt = "_content_lrbcc_195", Bt = "_skip_lrbcc_218", q = {
  app: gt,
  side: pt,
  main: Nt,
  rail: yt,
  page: kt,
  root: $t,
  topbar: Ct,
  mark: St,
  brand: Rt,
  tagline: Tt,
  identity: Lt,
  tools: At,
  actor: Et,
  metadata: xt,
  detail: It,
  nav: qt,
  content: Mt,
  skip: Bt
};
function Dt({ sidebar: e, header: a, children: t, rail: r }) {
  const o = r != null;
  return /* @__PURE__ */ l("div", { className: q.app, "data-rail": o ? "true" : "false", children: [
    /* @__PURE__ */ n("div", { className: q.side, children: e }),
    /* @__PURE__ */ l("main", { className: q.main, children: [
      a,
      /* @__PURE__ */ n("div", { className: q.page, children: t })
    ] }),
    o && /* @__PURE__ */ n("div", { className: q.rail, children: r })
  ] });
}
function Pt({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: q.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function aa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Ot({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: q.metadata, children: [
    /* @__PURE__ */ n(aa, { value: e, className: q.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(aa, { value: a, className: q.detail })
  ] });
}
function Ht(e) {
  return /* @__PURE__ */ l("header", { className: q.topbar, children: [
    /* @__PURE__ */ n("span", { className: q.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: q.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(aa, { value: e.tagline, className: q.tagline }),
    /* @__PURE__ */ n(Pt, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: q.identity, children: /* @__PURE__ */ n(Ot, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(aa, { value: e.tools, className: q.tools })
  ] });
}
function Ft(e) {
  const a = $();
  return /* @__PURE__ */ l("div", { className: `${q.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: q.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Ht, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: q.content, children: e.children })
  ] });
}
function jt(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function ry(e) {
  return jt(e) ? /* @__PURE__ */ n(Dt, { ...e }) : /* @__PURE__ */ n(Ft, { ...e });
}
const Wt = "_btn_llheq_2", zt = "_primary_llheq_13", Gt = "_secondary_llheq_23", Kt = "_ghost_llheq_28", Ut = "_overflow_llheq_37", Vt = "_sm_llheq_44", Yt = "_disabled_llheq_48", Ve = {
  btn: Wt,
  primary: zt,
  secondary: Gt,
  ghost: Kt,
  overflow: Ut,
  sm: Vt,
  disabled: Yt
};
function Jt(e, a, t, r) {
  const o = a === "sm" ? [Ve.sm, "ward-btn--sm"] : [], i = t ? [Ve.disabled] : [];
  return [Ve.btn, Ve[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Xt(e) {
  return e === "overflow" ? { "aria-label": "More actions", "aria-haspopup": "menu" } : {};
}
function Qt(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function Zt(e) {
  return e.children ?? e.label;
}
function f(e) {
  Qt(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: Jt(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      ...Xt(a),
      children: Zt(e)
    }
  );
}
function xa(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const er = "_root_o4yib_2", ar = "_row_o4yib_8", nr = "_box_o4yib_14", tr = "_label_o4yib_21", rr = "_lockedNote_o4yib_26", lr = "_consequence_o4yib_34", or = "_sample_o4yib_69", Ce = {
  root: er,
  row: ar,
  box: nr,
  label: tr,
  lockedNote: rr,
  consequence: lr,
  sample: or
};
function ir(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function cr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Ce.consequence} ward-check-consequence`, children: a }) : null;
}
function sr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ce.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function dr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ce.sample, "aria-hidden": "true", children: e }) : null;
}
function dn(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = ir(e);
  return /* @__PURE__ */ l("div", { className: `${Ce.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: Ce.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Ce.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (o) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, o.target.checked));
          },
          "aria-describedby": xa(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: a, className: Ce.label, children: [
        e.label,
        /* @__PURE__ */ n(sr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(dr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(cr, { id: t, text: e.consequence })
  ] });
}
const ur = "_chip_1073r_2", mr = {
  chip: ur
}, hr = {
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
function wr(e, a) {
  if (e === "stream") return _r(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = hr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function _r(e) {
  if (!e || !Aa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = sn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${mr.chip} ward-chip ward-chip--${e}`, style: wr(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
const vr = "_nav_fbsei_2", fr = "_list_fbsei_8", br = "_item_fbsei_15", gr = "_link_fbsei_24", pr = "_current_fbsei_33", Nr = "_chips_fbsei_37", qe = {
  nav: vr,
  list: fr,
  item: br,
  link: gr,
  current: pr,
  chips: Nr
};
function yr({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: qe.nav, children: [
    /* @__PURE__ */ n("ol", { className: qe.list, children: e.map((t, r) => /* @__PURE__ */ n("li", { className: qe.item, children: r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: qe.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: qe.current, "aria-current": "page", children: t.label }) }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${qe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] }) });
}
const kr = "_field_1oadv_2", $r = "_label_1oadv_8", Cr = "_labelHidden_1oadv_15", Sr = "_control_1oadv_25", Rr = "_mono_1oadv_44", Tr = "_area_1oadv_49", Lr = "_invalid_1oadv_56", ye = {
  field: kr,
  label: $r,
  labelHidden: Cr,
  control: Sr,
  mono: Rr,
  area: Tr,
  invalid: Lr
};
function Ar({ controlProps: e, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, ...e });
}
function Er({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function xr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Ir = { input: Ar, select: Er, textarea: xr };
function qr(e, a, t) {
  const r = Ir[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Mr(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": xa(r ? t : void 0, e.describedBy),
    onChange: (o) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, o.target.value);
    }
  };
}
function Br(e) {
  const a = e.mono ? [ye.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [ye.area] : [];
  return [ye.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Dr(e) {
  return e ? `${ye.label} ${ye.labelHidden} ward-field-label` : `${ye.label} ward-field-label`;
}
function M(e) {
  const a = $(), t = `${a}-msg`, r = Mr(e, a, t), o = Br(e);
  return /* @__PURE__ */ l("div", { className: `${ye.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Dr(e.labelHidden), htmlFor: a, children: e.label }),
    qr(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${ye.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Pr = "_strip_rg8pj_2", Or = "_tab_rg8pj_12", Hr = "_count_rg8pj_34", ya = {
  strip: Pr,
  tab: Or,
  count: Hr
}, za = 7;
function Fr(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function jr(e) {
  return `${ya.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function ly({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > za) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${za} — the set is fixed`);
  const i = ua({ orientation: "horizontal" }), c = Fr(e, a);
  return T(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: jr(o),
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
          className: `${ya.tab} ward-tab`,
          "aria-selected": s.id === a,
          "aria-controls": `panel-${s.id}`,
          onClick: () => t(s.id),
          ...i.itemProps(u),
          children: [
            s.label,
            s.count === void 0 ? null : /* @__PURE__ */ l(P, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: ya.count, children: `· ${s.count}` })
            ] })
          ]
        },
        s.id
      ))
    }
  );
}
const Wr = "_root_jem6y_2", zr = "_segment_jem6y_7", Ga = {
  root: Wr,
  segment: zr
};
function un({ options: e, value: a, onChange: t, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = ua({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return T(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${Ga.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Ga.segment,
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
const Gr = "_sidebar_1jywv_3", Kr = "_brand_1jywv_9", Ur = "_mark_1jywv_17", Vr = "_word_1jywv_24", Yr = "_nav_1jywv_30", Jr = "_navItem_1jywv_38", Xr = "_group_1jywv_50", Qr = "_groupName_1jywv_57", Zr = "_agents_1jywv_70", el = "_agent_1jywv_70", al = "_agentTop_1jywv_88", nl = "_dot_1jywv_95", tl = "_agentName_1jywv_107", rl = "_agentMeta_1jywv_120", ll = "_foot_1jywv_126", ol = "_footName_1jywv_132", il = "_footLinks_1jywv_139", cl = "_footLink_1jywv_139", sl = "_root_1jywv_153", dl = "_linkBrand_1jywv_162", ul = "_label_1jywv_183", ml = "_note_1jywv_188", hl = "_footer_1jywv_202", C = {
  sidebar: Gr,
  brand: Kr,
  mark: Ur,
  word: Vr,
  nav: Yr,
  navItem: Jr,
  group: Xr,
  groupName: Qr,
  new: "_new_1jywv_64",
  agents: Zr,
  agent: el,
  agentTop: al,
  dot: nl,
  agentName: tl,
  agentMeta: rl,
  foot: ll,
  footName: ol,
  footLinks: il,
  footLink: cl,
  root: sl,
  linkBrand: dl,
  label: ul,
  note: ml,
  footer: hl
};
function wl({ agent: e }) {
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
              style: { "--dot": sn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function _l({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function vl({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
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
        Y(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: C.new, href: o.href, children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(wl, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(_l, { shared: i })
  ] });
}
function fl(e) {
  return e.destinations ?? e.items ?? [];
}
function bl({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function gl({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function pl({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Nl(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(bl, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: fl(e).map((a) => /* @__PURE__ */ n(pl, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(gl, { children: e.children })
  ] });
}
function yl(e) {
  return "agents" in e;
}
function oy(e) {
  return yl(e) ? /* @__PURE__ */ n(vl, { ...e }) : /* @__PURE__ */ n(Nl, { ...e });
}
const kl = "_mark_wlgi8_3", $l = {
  mark: kl
}, Cl = { met: "✓", unmet: "", failed: "✕" };
function Ia({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: $l.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Cl[e]
    }
  );
}
const Sl = "_marker_br9fi_2", Rl = {
  marker: Sl
}, Tl = {
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
  const r = { "--marker": Tl[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Rl.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Ll = "_root_ti0pq_2", Al = "_chip_ti0pq_11", El = "_noCase_ti0pq_23", Ye = {
  root: Ll,
  chip: Al,
  noCase: El
};
function xl(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function qa({ connection: e, since: a, lastEventAt: t }) {
  const r = xl(a, t), o = Ea(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${Ye.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ae, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${Ye.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: Ye.noCase, children: La(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${Ye.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ee(r)
  ] });
}
const Il = "_root_1dcf1_2", ql = "_context_1dcf1_12", Ml = "_row_1dcf1_1", Bl = "_heading_1dcf1_25", Dl = "_headingWrap_1dcf1_33", Pl = "_chips_1dcf1_38", Ol = "_title_1dcf1_45", Hl = "_consequence_1dcf1_54", Fl = "_actionsWrap_1dcf1_59", jl = "_actions_1dcf1_59", Wl = "_action_1dcf1_59", zl = "_measure_1dcf1_77", X = {
  root: Il,
  context: ql,
  row: Ml,
  heading: Bl,
  headingWrap: Dl,
  chips: Pl,
  title: Ol,
  consequence: Hl,
  actionsWrap: Fl,
  actions: jl,
  action: Wl,
  measure: zl
};
function Gl({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: X.heading, children: [
    /* @__PURE__ */ n("h1", { className: X.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: X.consequence, children: a })
  ] });
}
function Kl({ actions: e, collapsed: a, onOverflow: t }) {
  return a ? /* @__PURE__ */ n(f, { variant: "overflow", onClick: t, children: "···" }) : e.map((r, o) => /* @__PURE__ */ n("span", { className: X.action, "data-action": "", children: r }, o));
}
function Ul({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: X.context, children: [
    /* @__PURE__ */ n(yr, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: X.chips, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] });
}
function Vl(...e) {
  return e.some((a) => a === null);
}
function Yl(e, a, t, r, o) {
  if (o === 0 || Vl(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = Number.parseFloat(getComputedStyle(e).columnGap), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function Jl(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Xl(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = p(!1);
  return T(() => {
    const s = a.current;
    if (!Jl(s)) return;
    const u = () => c(Yl(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function Ql({ connection: e }) {
  return e ? /* @__PURE__ */ n(qa, { connection: e.connection, since: e.since }) : null;
}
function iy({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], connection: i, onOverflow: c, density: s = "page" }) {
  const { rowRef: u, headingRef: d, actionsRef: m, measureRef: _, collapsed: b } = Xl(o);
  return /* @__PURE__ */ l("header", { className: X.root, "data-density": s, children: [
    /* @__PURE__ */ n(Ul, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: X.row, ref: u, children: [
      /* @__PURE__ */ n("div", { ref: d, className: X.headingWrap, children: /* @__PURE__ */ n(Gl, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: X.actionsWrap, children: [
        /* @__PURE__ */ n(Ql, { connection: i }),
        /* @__PURE__ */ n("div", { className: X.actions, ref: m, "data-ward-actions": !0, children: /* @__PURE__ */ n(Kl, { actions: o, collapsed: b, onOverflow: c }) })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: X.measure, ref: _, "aria-hidden": "true", children: o.map((O, J) => /* @__PURE__ */ n("span", { children: O }, J)) })
  ] });
}
function mn(e) {
  const [a, t] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return T(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const o = (c) => t(c.matches);
    return r.addEventListener("change", o), t(r.matches), () => r.removeEventListener("change", o);
  }, [e]), a;
}
const Zl = "_scrim_c7sqj_2", eo = "_drawer_c7sqj_10", ao = "_sheet_c7sqj_14", no = "_modal_c7sqj_18", to = "_panel_c7sqj_23", ro = "_header_c7sqj_51", lo = "_title_c7sqj_59", oo = "_body_c7sqj_63", io = "_close_c7sqj_90", ve = {
  scrim: Zl,
  drawer: eo,
  sheet: ao,
  modal: no,
  panel: to,
  header: ro,
  title: lo,
  body: oo,
  close: io
}, co = da(null), na = [], ta = /* @__PURE__ */ new Map();
function so(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function uo(e, a) {
  let t = ta.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ta.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function mo(e, a) {
  for (const t of Array.from(a.children))
    so(t) || uo(e, t);
}
function ho(e) {
  for (const a of e.claims) {
    const t = ta.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ta.delete(a)));
  }
}
function wo(e, a) {
  const t = { root: e, claims: [] };
  return na.push(t), mo(t, a), t;
}
function _o(e) {
  const a = na.indexOf(e);
  a >= 0 && na.splice(a, 1), ho(e);
}
function Ka(e) {
  return e !== null && na.at(-1) === e;
}
function vo(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, T(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = wo(i, a);
    return r.current = s, () => {
      var d, m;
      const u = Ka(s);
      _o(s), r.current = null, u && ((m = (d = o.current ?? c) == null ? void 0 : d.focus) == null || m.call(d));
    };
  }, [a]), z(() => Ka(r.current), []);
}
function fo(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function bo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function go({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ve.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ n("header", { className: `${ve.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ve.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ve.body} ward-drawer-body`, children: e.children })
  ] });
}
function po(e) {
  return `${ve.scrim} ${ve[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function No(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ve.panel} ${ve[e]} ward-overlay-panel${t}${r}`;
}
function yo(e) {
  const a = sa(co);
  return e ?? a ?? document.body;
}
function Ue(e) {
  const a = N(null), t = N(null), r = $(), o = yo(e.container), i = mn("(min-width: 768px)"), c = fo(e.kind, i), s = bo(e, r), u = nt(t), d = vo(a, o, e.returnFocusTo), m = z(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return T(() => {
    var _, b;
    d() && ((b = (_ = t.current) == null ? void 0 : _.querySelector("button")) == null || b.focus());
  }, [d]), T(() => {
    const _ = (b) => {
      b.key === "Escape" && m();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [m]), Yn(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: po(c),
        "data-ward-overlay-kind": c,
        "data-ward-overlay-root": "",
        onClick: m,
        children: /* @__PURE__ */ l(
          "div",
          {
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": s.labelledBy,
            "aria-label": s.label,
            className: No(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ve.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(go, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const ko = "_root_drrhx_2", $o = "_ticket_drrhx_15", Co = "_body_drrhx_24", va = {
  root: ko,
  ticket: $o,
  body: Co
};
function cy({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${va.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${va.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: va.body, children: t })
  ] });
}
const So = "_root_1bfqw_2", Ro = "_figure_1bfqw_7", To = "_of_1bfqw_13", Lo = "_bar_1bfqw_18", Ao = "_rows_1bfqw_38", Eo = "_row_1bfqw_38", xo = "_label_1bfqw_49", Io = "_amount_1bfqw_54", pe = {
  root: So,
  figure: Ro,
  of: To,
  bar: Lo,
  rows: Ao,
  row: Eo,
  label: xo,
  amount: Io
};
function qo({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${pe.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${pe.figure} ward-stat-value`, children: [
      V(e),
      " ",
      /* @__PURE__ */ l("span", { className: pe.of, children: [
        "of ",
        V(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${pe.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${V(e)} of ${V(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: pe.rows, children: t.map((o) => /* @__PURE__ */ l("li", { className: `${pe.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: pe.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: pe.amount, children: V(o.amount) })
    ] }, o.label)) })
  ] });
}
const Mo = "_frame_mg2jl_2", Bo = "_table_mg2jl_6", Do = "_th_mg2jl_12", Po = "_td_mg2jl_13", Oo = "_sort_mg2jl_47", Ho = "_row_mg2jl_53", Fo = "_empty_mg2jl_61", Ne = {
  frame: Mo,
  table: Bo,
  th: Do,
  td: Po,
  sort: Oo,
  row: Ho,
  empty: Fo
}, jo = { asc: "ascending", desc: "descending" };
function Wo(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return jo[a.direction];
}
function zo(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Ne.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Go(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Ko({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Ne.th,
      style: Go(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Wo(e, a),
      children: zo(e, t)
    }
  );
}
function Uo({ row: e, props: a }) {
  const t = a.rowId(e), r = (a.lockedIds ?? []).includes(t);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: Ne.row,
      "data-selected": t === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((o) => /* @__PURE__ */ n("td", { className: Ne.td, "data-align": o.align, "data-mono": o.mono, "data-drop": o.dropPriority, children: a.renderCell(e, o.key) }, o.key))
    }
  );
}
function Vo({
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
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: Ne.empty, children: d }) : /* @__PURE__ */ n("div", { className: Ne.frame, children: /* @__PURE__ */ l("table", { className: Ne.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Ne.head, children: a.map((m) => /* @__PURE__ */ n(Ko, { column: m, sort: s, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((m) => /* @__PURE__ */ n(Uo, { row: m, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(m))) })
  ] }) });
}
const Yo = "_set_y5zy3_2", Jo = "_legend_y5zy3_7", Xo = "_row_y5zy3_15", Qo = "_control_y5zy3_20", Zo = "_input_y5zy3_26", ei = "_label_y5zy3_31", ai = "_consequence_y5zy3_36", $e = {
  set: Yo,
  legend: Jo,
  row: Xo,
  control: Qo,
  input: Zo,
  label: ei,
  consequence: ai
};
function hn({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
  const u = $(), d = i ?? u;
  return /* @__PURE__ */ l("fieldset", { className: $e.set, "data-variant": s, children: [
    /* @__PURE__ */ n("legend", { className: $e.legend, children: e }),
    a.map((m) => {
      const _ = `${d}-${m.value}`, b = m.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: $e.row, children: [
        /* @__PURE__ */ l("span", { className: $e.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: d,
              className: $e.input,
              value: m.value,
              checked: t === m.value,
              disabled: o,
              "aria-describedby": xa(b, c),
              onChange: () => !o && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: _, className: $e.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ n("p", { id: b, className: `${$e.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const ni = "_root_1h1ot_2", ti = "_head_1h1ot_11", ri = "_index_1h1ot_25", li = "_dot_1h1ot_29", oi = "_note_1h1ot_34", ii = "_counter_1h1ot_40", ci = "_trailing_1h1ot_48", Se = {
  root: ni,
  head: ti,
  index: ri,
  dot: li,
  note: oi,
  counter: ii,
  trailing: ci
};
function si({ index: e }) {
  return e ? /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ n("span", { className: `${Se.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Se.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function di({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Se.counter, "aria-hidden": "true", children: e }) : null;
}
function ui({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Se.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Se.head, children: [
      /* @__PURE__ */ n(si, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Se.note, children: t }),
    /* @__PURE__ */ n(di, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Se.trailing, children: i })
  ] });
}
const mi = "_strip_1qhvo_2", hi = "_cell_1qhvo_7", wi = "_value_1qhvo_12", _i = "_label_1qhvo_27", Je = {
  strip: mi,
  cell: hi,
  value: wi,
  label: _i
};
function vi(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function ma({ cells: e, divided: a = !1 }) {
  return vi(e), /* @__PURE__ */ n("dl", { className: `${Je.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Je.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Je.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Je.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const fi = "_root_xk7sv_2", bi = "_track_xk7sv_8", gi = "_thumb_xk7sv_35", pi = "_labelHidden_xk7sv_53", Ni = "_label_xk7sv_53", yi = "_lockedNote_xk7sv_68", Re = {
  root: fi,
  track: bi,
  thumb: gi,
  labelHidden: pi,
  label: Ni,
  lockedNote: yi
};
function ki(e) {
  return e ? `${Re.label} ${Re.labelHidden}` : Re.label;
}
function Le({ label: e, checked: a, onChange: t, disabled: r, locked: o, describedBy: i, labelHidden: c }) {
  const s = $(), u = o ? !0 : a, d = r || o;
  return /* @__PURE__ */ l("span", { className: `${Re.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": u,
        "aria-label": e,
        "aria-labelledby": s,
        "aria-describedby": i,
        className: `${Re.track} ward-switch`,
        "data-on": u,
        "data-locked": o ? !0 : void 0,
        disabled: d,
        onClick: () => !d && (t == null ? void 0 : t(!u)),
        children: /* @__PURE__ */ n("span", { className: Re.thumb })
      }
    ),
    /* @__PURE__ */ l("span", { id: s, className: ki(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Re.lockedNote, children: "always on" })
    ] })
  ] });
}
const $i = "_bar_1u2kl_2", Ci = "_skip_1u2kl_11", Si = "_mark_1u2kl_22", Ri = "_nav_1u2kl_30", Ti = "_list_1u2kl_34", Li = "_select_1u2kl_40", Ai = "_dest_1u2kl_47", Ei = "_actor_1u2kl_61", xi = "_actorMark_1u2kl_74", Ii = "_actorLabel_1u2kl_79", qi = "_tagline_1u2kl_98", ne = {
  bar: $i,
  skip: Ci,
  mark: Si,
  nav: Ri,
  list: Ti,
  select: Li,
  dest: Ai,
  actor: Ei,
  actorMark: xi,
  actorLabel: Ii,
  tagline: qi
};
function Mi(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Bi(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function sy({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = Bi(r);
  return /* @__PURE__ */ l("header", { className: ne.bar, children: [
    /* @__PURE__ */ n("a", { className: ne.skip, href: `#${c}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: ne.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: ne.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: ne.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: ne.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: ne.dest,
          href: u.href,
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        "select",
        {
          className: ne.select,
          "aria-label": "Destination",
          value: t,
          onChange: (u) => i == null ? void 0 : i(u.target.value),
          children: a.map((u) => /* @__PURE__ */ n("option", { value: u.id, children: u.label }, u.id))
        }
      )
    ] }),
    s && /* @__PURE__ */ l("span", { className: ne.actor, children: [
      /* @__PURE__ */ n("span", { className: ne.actorLabel, children: s }),
      /* @__PURE__ */ n("span", { className: ne.actorMark, "aria-hidden": "true", children: Mi(s) })
    ] })
  ] });
}
const Di = "_tree_1lyby_2", Pi = "_item_1lyby_6", Oi = "_row_1lyby_10", Hi = "_button_1lyby_22", ra = {
  tree: Di,
  item: Pi,
  row: Oi,
  button: Hi
}, wn = da(null);
function Fi({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ua({ orientation: "vertical" });
  return /* @__PURE__ */ n(wn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ra.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const ji = { ArrowRight: !0, ArrowLeft: !1 };
function Ua(e) {
  return e ? !0 : void 0;
}
function Wi(e, a) {
  const t = ji[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function zi(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function Gi(e) {
  const a = [ra.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Ki(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Ui(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Vi(e) {
  return typeof e == "string" ? e : void 0;
}
function Yi({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Ji({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function _n(e) {
  const a = sa(wn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = Ki(e);
  return /* @__PURE__ */ l("li", { className: ra.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Gi(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": Ua(e.unresolved),
        "data-inherited": Ua(e.inherited),
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${ra.button} ward-treeitem-btn`,
            onClick: () => zi(e),
            onKeyDown: (r) => Wi(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Ui(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Vi(e.label), children: e.label }),
              /* @__PURE__ */ n(Yi, { value: e.detail }),
              /* @__PURE__ */ n(Ji, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Xi = "_frame_9lntd_2", Qi = "_subjectRail_9lntd_21", Zi = "_subject_9lntd_21", ec = "_rail_9lntd_41", ac = "_record_9lntd_63", nc = "_recordBody_9lntd_68", tc = "_band_9lntd_111", rc = "_bandBody_9lntd_120", lc = "_bandActions_9lntd_125", oc = "_scroller_9lntd_132", ic = "_lanes_9lntd_150", le = {
  frame: Xi,
  subjectRail: Qi,
  subject: Zi,
  rail: ec,
  record: ac,
  recordBody: nc,
  band: tc,
  bandBody: rc,
  bandActions: lc,
  scroller: oc,
  lanes: ic
};
function dy({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: le.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function Va(e) {
  return e ? "true" : void 0;
}
function uy({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: le.subjectRail, "data-ward-subject-rail": t, "data-ruled": Va(i), children: [
    /* @__PURE__ */ n("div", { className: le.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: le.rail, "data-sticky": Va(o), "aria-label": r, children: a })
  ] });
}
function my({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: le.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(ui, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: le.recordBody, "data-pad": o, children: a })
  ] });
}
function hy({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: le.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: le.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: le.bandActions, children: a })
  ] });
}
const cc = "(max-width: 767.98px)";
function ka({ label: e, children: a }) {
  return /* @__PURE__ */ n("div", { className: le.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", children: a });
}
function sc({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = p(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: le.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(M, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(ka, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function wy({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = mn(cc);
  return t === void 0 ? /* @__PURE__ */ n(ka, { label: a, children: e }) : o ? /* @__PURE__ */ n(sc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(ka, { label: a, children: t.map((i) => /* @__PURE__ */ n(Vn, { children: i.content }, i.id)) });
}
const dc = "_block_1o5o7_2", uc = "_sentence_1o5o7_15", mc = "_meta_1o5o7_20", hc = "_action_1o5o7_25", wc = "_strip_1o5o7_29", _c = "_loading_1o5o7_48", vc = "_label_1o5o7_56", fc = "_counter_1o5o7_63", ce = {
  block: dc,
  sentence: uc,
  meta: mc,
  action: hc,
  strip: wc,
  loading: _c,
  label: vc,
  counter: fc
};
function bc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: ce.action, children: /* @__PURE__ */ n(f, { onClick: e.onClick, children: e.label }) });
}
function ha({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${ce.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: ce.sentence, children: e }),
    t,
    /* @__PURE__ */ n(bc, { action: a })
  ] });
}
function gc(e) {
  return /* @__PURE__ */ n(ha, { ...e });
}
function _y({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ha, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: ce.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function vy(e) {
  return /* @__PURE__ */ n(ha, { ...e });
}
function fy({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ha, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: ce.meta, children: [
    "failed at ",
    ee(a)
  ] }) });
}
function by({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: ce.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ee(e),
    " — showing snapshot from ",
    ee(a)
  ] });
}
function gy({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: ce.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    ee(a)
  ] });
}
function py({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  T(() => {
    const c = window.setTimeout(() => o(!0), ie.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Ea(t.current, r);
  return /* @__PURE__ */ l("div", { className: `${ce.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: ce.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: ce.counter, children: La(i) }) : null
  ] });
}
const pc = "_note_tlubt_2", Nc = {
  note: pc
};
function yc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: Nc.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const kc = "_card_12in3_2", $c = "_hit_12in3_23", Cc = "_head_12in3_30", Sc = "_title_12in3_36", Rc = "_meta_12in3_44", Tc = "_fields_12in3_45", Lc = "_who_12in3_58", Ac = "_sep_12in3_65", Ec = "_mono_12in3_69", xc = "_field_12in3_45", Ic = "_last_12in3_84", qc = "_reason_12in3_96", G = {
  card: kc,
  hit: $c,
  head: Cc,
  title: Sc,
  meta: Rc,
  fields: Tc,
  who: Lc,
  sep: Ac,
  mono: Ec,
  field: xc,
  last: Ic,
  reason: qc
}, Mc = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Bc(e, a, t) {
  const r = Xe(e, "blue"), o = Xe(e, "orange"), i = Xe(e, "green"), c = N(/* @__PURE__ */ new Set());
  T(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = Mc[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const Dc = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : V(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Pc(e, a) {
  return Dc[a](e);
}
function Oc({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: G.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ l("p", { className: G.meta, children: [
    /* @__PURE__ */ l("span", { className: G.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    t,
    /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ l("p", { className: G.meta, children: [
    /* @__PURE__ */ l("span", { className: G.who, children: [
      "waits on ",
      e.waitsOn
    ] }),
    t,
    /* @__PURE__ */ l("span", { className: G.mono, children: [
      Z(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Hc({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: G.head, children: [
    e.flagged && /* @__PURE__ */ n(h, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Fc({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: G.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function jc({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: G.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: G.field, children: Pc(e, t) }, t)) });
}
const $a = (e) => e ? !0 : void 0;
function Wc(e) {
  return { "--stream": `var(--ward-stream-${e.streamStep}-id)` };
}
function zc(e, a, t) {
  e == null || e(a, t);
}
function Gc(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Kc({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: G.last, "data-stale": $a(a), children: t }) : null;
}
function wa(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  Bc(r, t.key, e.feed);
  const o = Gc(e.feed), i = Wc(t);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: G.card,
      style: i,
      "data-selected": $a(e.selected),
      "data-flagged": $a(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: G.hit, onClick: (c) => zc(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Hc, { item: t }),
        /* @__PURE__ */ n("p", { className: G.title, children: t.title }),
        /* @__PURE__ */ n(Oc, { item: t, connection: o }),
        /* @__PURE__ */ n(Fc, { reason: t.blockedReason }),
        /* @__PURE__ */ n(jc, { item: t, fields: a }),
        /* @__PURE__ */ n(Kc, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const Uc = "_column_14784_3", Vc = "_head_14784_24", Yc = "_label_14784_33", Jc = "_count_14784_42", Xc = "_list_14784_56", je = {
  column: Uc,
  head: Vc,
  label: Yc,
  count: Jc,
  list: Xc
};
function vn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Qc({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: je.head, children: [
    /* @__PURE__ */ n("h2", { className: je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Zc(e) {
  return /* @__PURE__ */ n("div", { className: je.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      wa,
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
function es({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = $(), m = e.cap !== void 0 && a.length > e.cap, _ = vn(a, r);
  return /* @__PURE__ */ l("section", { className: je.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(Qc, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(Zc, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    m && /* @__PURE__ */ n(yc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const as = "_foot_8qg4p_2", ns = "_note_8qg4p_13", ts = "_link_8qg4p_19", fa = {
  foot: as,
  note: ns,
  link: ts
};
function Ny({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: fa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: fa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: fa.link, href: e, children: "Configure board" })
  ] });
}
const rs = "_head_1la6p_3", ls = "_identity_1la6p_12", os = "_titleRow_1la6p_18", is = "_title_1la6p_18", cs = "_key_1la6p_35", ss = "_rollup_1la6p_45", ds = "_tools_1la6p_53", us = "_swatch_1la6p_62", ms = "_mark_1la6p_69", he = {
  head: rs,
  identity: ls,
  titleRow: os,
  title: is,
  key: cs,
  rollup: ss,
  tools: ds,
  swatch: us,
  mark: ms
}, Ya = "initials:";
function hs(e) {
  return e === void 0 ? "loaded this week unavailable" : `${Y(e)} loaded this week`;
}
function ws(e) {
  const a = [`${Y(e.inFlight)} in flight`, hs(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${Y(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${Z(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${Z(e.p90)}`), a.join(" · ");
}
function _s(e) {
  return e.startsWith(Ya) ? e.slice(Ya.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function vs({ markRef: e, streamStep: a }) {
  const t = { "--stream": `var(--ward-stream-${a}-id)` };
  return e ? /* @__PURE__ */ n("span", { className: `${he.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: _s(e) }) : /* @__PURE__ */ n("span", { className: he.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function fs({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function yy({
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
  return /* @__PURE__ */ l("div", { className: he.head, children: [
    /* @__PURE__ */ l("div", { className: he.identity, children: [
      /* @__PURE__ */ l("div", { className: he.titleRow, children: [
        /* @__PURE__ */ n(vs, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: he.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: he.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: he.rollup, "aria-live": "polite", children: ws(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: he.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(fs, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(f, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(qa, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const bs = "_head_kabyh_11", gs = "_line_kabyh_12", ps = "_cHandle_kabyh_33", Ns = "_cName_kabyh_38", ys = "_nameLine_kabyh_46", ks = "_cLabel_kabyh_53", $s = "_cCap_kabyh_58", Cs = "_cShown_kabyh_63", Ss = "_name_kabyh_46", Rs = "_noCap_kabyh_85", Ts = "_state_kabyh_99", Ls = "_handle_kabyh_104", As = "_sub_kabyh_118", A = {
  head: bs,
  line: gs,
  cHandle: ps,
  cName: Ns,
  nameLine: ys,
  cLabel: ks,
  cCap: $s,
  cShown: Cs,
  name: Ss,
  noCap: Rs,
  state: Ts,
  handle: Ls,
  sub: As
}, Es = "can't be hidden or collapsed", xs = "terminal · counted, not a column";
function ky() {
  return /* @__PURE__ */ l("div", { className: A.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: A.cHandle }),
    /* @__PURE__ */ n("span", { className: A.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: A.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: A.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: A.cShown, children: "Shown" })
  ] });
}
function Is(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function qs(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Ja(e) {
  return e.gate ? Es : e.terminal ? xs : qs(e.agentsMounted);
}
function Ms(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Bs({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: A.cName, children: [
    /* @__PURE__ */ l("span", { className: A.nameLine, children: [
      /* @__PURE__ */ n("span", { className: A.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    Ja(e) && /* @__PURE__ */ n("span", { className: A.sub, children: Ja(e) })
  ] });
}
function Ds(e) {
  return e === void 0 ? "" : String(e);
}
function Ps(e) {
  return e === "" ? void 0 : Number(e);
}
function Os({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: A.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: A.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Ms(t, a),
      children: "⠿"
    }
  ) });
}
function Hs({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${A.cCap} ${A.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: A.cCap, children: /* @__PURE__ */ n(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Ds(a.cap), onChange: (r) => t({ ...a, cap: Ps(r) }) }) });
}
function Fs({ stage: e, config: a, onChange: t }) {
  const r = Is(e, a.shown);
  return /* @__PURE__ */ l("span", { className: A.cShown, children: [
    /* @__PURE__ */ n(Le, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: A.state, "aria-hidden": "true", children: r.state })
  ] });
}
function js(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function $y({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: A.line, "data-kind": js(e), children: [
    /* @__PURE__ */ n(Os, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Bs, { stage: e }),
    /* @__PURE__ */ n("span", { className: A.cLabel, children: /* @__PURE__ */ n(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(Hs, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Fs, { stage: e, config: a, onChange: t })
  ] });
}
const Ws = "_body_hn6d6_2", zs = "_head_hn6d6_9", Gs = "_summary_hn6d6_19", Ks = "_block_hn6d6_20", Us = "_actionsBlock_hn6d6_21", Vs = "_title_hn6d6_41", Ys = "_note_hn6d6_46", Js = "_k_hn6d6_51", Xs = "_kv_hn6d6_58", Qs = "_row_hn6d6_64", Zs = "_label_hn6d6_75", ed = "_value_hn6d6_84", ad = "_quote_hn6d6_90", nd = "_actions_hn6d6_21", td = "_resolve_hn6d6_103", E = {
  body: Ws,
  head: zs,
  summary: Gs,
  block: Ks,
  actionsBlock: Us,
  title: Vs,
  note: Ys,
  k: Js,
  kv: Xs,
  row: Qs,
  label: Zs,
  value: ed,
  quote: ad,
  actions: nd,
  resolve: td
};
function rd(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function ld(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function od(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(h, { role: "stream", label: `STEP ${e.streamStep}`, streamStep: e.streamStep }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", Z(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...rd(e),
    ...ld(e, a)
  ];
}
function id({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: E.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: E.k, children: a }),
    e
  ] });
}
function cd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: E.head, children: [
    /* @__PURE__ */ n(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function sd({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: E.block, children: [
    /* @__PURE__ */ n("p", { className: E.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: E.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: E.note, children: e.agentMeta })
  ] }) : null;
}
function Cy({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = $(), d = od(e, o);
  return /* @__PURE__ */ n(Ue, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: E.body, children: [
    /* @__PURE__ */ n(cd, { item: e }),
    /* @__PURE__ */ l("div", { className: E.summary, children: [
      /* @__PURE__ */ n("h2", { className: E.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: E.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: E.kv, children: d.map(([m, _]) => /* @__PURE__ */ l("div", { className: E.row, children: [
      /* @__PURE__ */ n("dt", { className: E.label, children: m }),
      /* @__PURE__ */ n("dd", { className: E.value, children: _ })
    ] }, m)) }),
    /* @__PURE__ */ n(sd, { item: e }),
    /* @__PURE__ */ l("div", { className: E.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: E.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: E.note, children: s })
    ] }),
    /* @__PURE__ */ n(id, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const dd = "_root_3azmy_2", ud = "_list_3azmy_7", md = "_item_3azmy_12", hd = "_box_3azmy_18", wd = "_text_3azmy_23", _d = "_note_3azmy_28", Me = {
  root: dd,
  list: ud,
  item: md,
  box: hd,
  text: wd,
  note: _d
};
function _a({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ l("div", { className: Me.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Me.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Me.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Me.box, children: /* @__PURE__ */ n(Ia, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Me.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Me.note} ward-checklist-note`, children: a })
  ] });
}
const vd = "_rail_ke7ch_2", fd = "_k_ke7ch_11", bd = "_head_ke7ch_19", gd = "_section_ke7ch_25", pd = "_card_ke7ch_38", Nd = "_strip_ke7ch_42", yd = "_skeleton_ke7ch_56", kd = "_skeletonLabel_ke7ch_70", $d = "_bar_ke7ch_76", Cd = "_note_ke7ch_85", re = {
  rail: vd,
  k: fd,
  head: bd,
  section: gd,
  card: pd,
  strip: Nd,
  skeleton: yd,
  skeletonLabel: kd,
  bar: $d,
  note: Cd
};
function Sd(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ba({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: re.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: re.k, children: e }),
    a
  ] });
}
function Rd({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: re.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: re.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: re.bar, "aria-hidden": "true" }, r))
  ] });
}
function Td({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(es, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function Ld(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Td, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Rd, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function Sy(e) {
  const a = Sd(e.onOpen), t = vn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: re.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${re.k} ${re.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(ba, { title: "Card", children: /* @__PURE__ */ n("div", { className: re.card, children: t && /* @__PURE__ */ n(wa, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(ba, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: re.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Ld, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: re.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(ba, { title: "Effect of this config", children: /* @__PURE__ */ n(_a, { items: e.effects, density: "compact" }) })
  ] });
}
function Ad(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Ed(e) {
  return Math.ceil(e.length / 2);
}
function xd(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function fn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Id(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = fn(e);
  o !== void 0 && t(o), r(xd(e.type));
}
function qd(e, a, t, r, o) {
  T(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Id(i, t, r, o));
  }, [e, a, t, r, o]);
}
function Md(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Bd(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function Dd(e, a) {
  return a !== void 0 ? Z(e.timeInStage) + " · waits on " + a.agent : Z(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Pd(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + H.height.card + " + " + H.height.cardRow + " * " + String(Ed(a ?? [])) + ")"
  };
}
function Od(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Hd(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(h, { role: "meta", label: V(e.cost) }) : null;
}
function Fd(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(h, { role: "meta", label: e.jiraKey }) : null;
}
function jd(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Wd(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function zd(e, a) {
  return a === void 0 ? e : Ad(e, a.ref);
}
function Gd(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ze(e) {
  return e === !0 ? "true" : void 0;
}
function bn(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = Xe(o), c = N(/* @__PURE__ */ new Set()), [s, u] = p(Md(a));
  qd(e.feed, a.key, c, u, i);
  const d = Bd(a, r), m = Dd(a, t), _ = Pd(a, e.fields), b = Wd(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...Gd(e),
      className: "ward-workcard",
      "data-flagged": ze(a.flagged),
      "data-selected": ze(e.selected),
      style: _,
      ref: zd(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Od(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(h, { role: d.role, label: d.label }),
          Hd(a, e.fields),
          Fd(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          jd(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Kd({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function Ud(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Vd(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Yd(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Kd, { count: e.items.length, cap: e.column.cap });
}
function Jd(e, a) {
  return e.roving ?? a;
}
function Xd(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Qd(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    bn,
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
function Zd(e) {
  const a = $(), t = ua({ orientation: "vertical" }), r = Jd(e, t), o = Ud(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ze(o), "data-gate": ze(e.column.gate), children: [
    Vd(e.column, e.items.length, a),
    Yd(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Xd(e, t), children: Qd(e, r) })
  ] });
}
function eu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + Z(e.p50)), e.p90 !== void 0 && (a += " · p90 " + Z(e.p90)), a;
}
function au(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function nu(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function Ry(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: eu(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      au(e),
      nu(e.onConfigure),
      /* @__PURE__ */ n(qa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function tu(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function ru(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Le, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Le, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function lu(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(P, { children: [
    a > 0 ? /* @__PURE__ */ n(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(h, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function Ty(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": ze(tu(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: ru(e) }),
    /* @__PURE__ */ n(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(dn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    lu(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function Ly(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(bn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Zd, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function ou(e, a) {
  const t = fn(e);
  t !== void 0 && a(t);
}
function iu(e, a, t) {
  T(() => {
    if (e != null)
      return e.subscribe(a, (r) => ou(r, t));
  }, [e, a, t]);
}
function cu(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function su(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", Z(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", V(e.cost)]), a;
}
function du(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function uu(e, a) {
  return /* @__PURE__ */ l(P, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function Ay(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = p((c = a.run) == null ? void 0 : c.lastStep);
  iu(e.feed, a.key, o);
  const i = [...cu(a), ...su(a)];
  return /* @__PURE__ */ l(Ue, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      du(t, r)
    ] }),
    uu(a, e.actions)
  ] });
}
const mu = "_card_pioxl_2", hu = "_head_pioxl_17", wu = "_mark_pioxl_25", _u = "_name_pioxl_37", vu = "_chips_pioxl_48", fu = "_description_pioxl_54", bu = "_run_pioxl_59", gu = "_sep_pioxl_68", fe = {
  card: mu,
  head: hu,
  mark: wu,
  name: _u,
  chips: vu,
  description: fu,
  run: bu,
  sep: gu
}, pu = { live: "done", draft: "running", paused: "meta" };
function Nu(e) {
  return e === void 0 ? fe.card : `${fe.card} ${e}`;
}
function yu({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: fe.chips, children: e.map((a) => /* @__PURE__ */ n(h, { role: pu[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function ku({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.description, children: e });
}
function $u({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: fe.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: fe.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Cu(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Su({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, className: i }) {
  const c = { "--stream": `var(--ward-stream-${e.streamStep}-id)` }, s = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": s,
      className: Nu(i),
      style: c,
      "data-selected": s,
      "data-paused": Cu(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: fe.head, children: [
          /* @__PURE__ */ n("span", { className: fe.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${fe.name} ward-rowlink`, href: a, "aria-current": s, children: e.name })
        ] }),
        /* @__PURE__ */ n(ku, { description: e.description }),
        /* @__PURE__ */ n($u, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(yu, { versions: e.versions })
      ]
    }
  );
}
const Ru = "_ladder_v5484_2", Tu = "_cell_v5484_7", Lu = "_empty_v5484_26", Au = "_name_v5484_34", Eu = "_holder_v5484_40", xu = "_request_v5484_46", Iu = "_swatches_v5484_51", qu = "_swatch_v5484_51", Q = {
  ladder: Ru,
  cell: Tu,
  empty: Lu,
  name: Au,
  holder: Eu,
  request: xu,
  swatches: Iu,
  swatch: qu
}, Mu = "not validated — needs CVD matrix and dark stepping";
function Bu(e) {
  return e.reserved ? "reserved" : Aa(e.step) ? "validated" : "partial";
}
function Du(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Xa(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Pu({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ae, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${Q.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Qa(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Za(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
function Ou({ step: e, value: a, taken: t, onChange: r, swatch: o }) {
  const i = Bu(e), c = Du(i, t), s = c !== "free", u = e.name ?? `Step ${e.step}`, d = () => {
    s || r(e.step);
  }, m = `${u} — ${c}`;
  return o ? /* @__PURE__ */ n("span", { role: "radio", "aria-label": m, title: m, ...Za(s, a === e.step), className: `${Q.swatch} ward-ladder-cell`, "data-validation": i, style: Xa(e, i), onClick: d, onKeyDown: (_) => Qa(_, d) }) : /* @__PURE__ */ l(
    "span",
    {
      role: "radio",
      "aria-label": m,
      ...Za(s, a === e.step),
      className: `${Q.cell} ward-ladder-cell`,
      "data-validation": i,
      style: Xa(e, i),
      onClick: d,
      onKeyDown: (_) => Qa(_, d),
      children: [
        /* @__PURE__ */ n(Pu, { validation: i }),
        /* @__PURE__ */ n("span", { className: `${Q.name} ward-ladder-name`, children: u }),
        /* @__PURE__ */ n("span", { className: `${Q.holder} ward-ladder-holder`, children: c })
      ]
    }
  );
}
function Hu(e) {
  for (const a of e)
    if (!a.reserved && !Ke(a.step)) throw new Error("colour ladder renders token steps only");
}
function Fu() {
  return /* @__PURE__ */ l("div", { className: `${Q.cell} ward-ladder-cell ${Q.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${Q.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${Q.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${Q.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function ju(e) {
  return "presentation" in e && e.presentation === "swatches";
}
function gn(e) {
  const a = e.takenBy ?? {}, t = (o) => {
    var i;
    (i = e.onChange) == null || i.call(e, o);
  };
  Hu(e.steps);
  const r = ju(e);
  return /* @__PURE__ */ l("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${r ? Q.swatches : Q.ladder} ward-ladder`, children: [
    e.steps.map((o) => /* @__PURE__ */ n(Ou, { step: o, value: e.value, taken: a[o.step], onChange: t, swatch: r }, o.step)),
    r ? null : /* @__PURE__ */ n(Fu, {})
  ] });
}
const Wu = "_rail_1el2t_2", zu = "_section_1el2t_12", Gu = "_sectionFlush_1el2t_22", Ku = "_head_1el2t_26", Uu = "_headLabel_1el2t_34", Vu = "_sample_1el2t_42", Yu = "_sampleLabel_1el2t_47", Ju = "_sampleTitle_1el2t_54", Xu = "_sampleMeta_1el2t_59", Qu = "_trace_1el2t_65", Zu = "_traceHead_1el2t_70", em = "_steps_1el2t_78", am = "_step_1el2t_78", nm = "_stepTitle_1el2t_97", tm = "_hollow_1el2t_107", rm = "_stepBody_1el2t_115", lm = "_stepDetail_1el2t_127", om = "_publish_1el2t_132", im = "_reason_1el2t_138", cm = "_note_1el2t_143", sm = "_reveal_1el2t_148", g = {
  rail: Wu,
  section: zu,
  sectionFlush: Gu,
  head: Ku,
  headLabel: Uu,
  sample: Vu,
  sampleLabel: Yu,
  sampleTitle: Ju,
  sampleMeta: Xu,
  trace: Qu,
  traceHead: Zu,
  steps: em,
  step: am,
  stepTitle: nm,
  hollow: tm,
  stepBody: rm,
  stepDetail: lm,
  publish: om,
  reason: im,
  note: cm,
  reveal: sm
}, en = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, dm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, um = { ok: "greenFill", finding: "orangeFill", action: "blue" }, mm = { notSimulated: "not simulated", running: "running" };
function hm(e) {
  return e.presentation === "foundry";
}
function wm(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function _m(e, a) {
  var r;
  const t = dm[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function vm(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function fm(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function bm(e) {
  if (vm(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function gm(e) {
  const [a, t] = p(!1);
  T(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${g.step} ${g.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function pm(e) {
  const a = mm[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: g.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ae, { size: 6, kind: um[e.kind], label: e.kind });
}
function Nm(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: g.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function ym(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function km(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(gm, { kind: a.kind, children: [
    /* @__PURE__ */ n(pm, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: g.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: g.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Nm, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(ym, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function $m(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(Z(a)), t.join(" · ");
}
function pn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${g.trace} ${g.section}`, children: [
    /* @__PURE__ */ n("p", { className: g.traceHead, id: a, children: $m(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: g.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(km, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Cm(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ l("div", { className: `${g.sample} ${g.section}`, children: [
    /* @__PURE__ */ n("p", { className: g.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ l("p", { className: g.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ l("p", { className: g.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Sm(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ee(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${g.sampleMeta} ${g.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Rm(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : V(e.run.cost), label: "Cost" }, { value: e.run.turns ? cn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: g.sectionFlush, children: /* @__PURE__ */ n(ma, { divided: !0, cells: a }) });
}
function Tm(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: V(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: cn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Lm(e) {
  const a = Tm(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: g.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: g.sectionFlush, children: /* @__PURE__ */ n(ma, { divided: !0, cells: a }) });
}
function Nn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ n("p", { className: `${g.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(f, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(f, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Am(e) {
  return /* @__PURE__ */ l("div", { className: `${g.publish} ${g.section}`, children: [
    /* @__PURE__ */ n(Nn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: g.note, children: e.note })
  ] });
}
function Em(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${g.publish} ${g.section}`, children: /* @__PURE__ */ n(Nn, { reason: e.reason, onPublish: e.onPublish }) });
}
function yn(e) {
  return /* @__PURE__ */ l("div", { className: `${g.head} ${g.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: g.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(h, { role: en[e.run.status].role, label: en[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function xm(e, a) {
  const [t, r] = p(e.steps);
  return T(() => r(e.steps), [e.steps]), T(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((i) => {
          var c, s;
          return [...i, { kind: o.type === "run.finding" ? "finding" : "action", title: ((c = o.step) == null ? void 0 : c.label) ?? "step", detail: (s = o.step) == null ? void 0 : s.tool }];
        });
      });
  }, [a, e.status]), t;
}
function Im(e) {
  var t;
  fm(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${g.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(yn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Cm, { sample: e.run.sample }),
    /* @__PURE__ */ n(pn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Rm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: g.section, children: /* @__PURE__ */ n(_a, { items: e.checklist }) }),
    /* @__PURE__ */ n(Am, { reason: wm(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function qm(e) {
  var r;
  const a = xm(e.run, e.feed);
  bm(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${g.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(yn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Sm, { sample: e.run.sample }),
    /* @__PURE__ */ n(pn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Lm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: g.section, children: /* @__PURE__ */ n(_a, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Em, { reason: _m(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Ey(e) {
  return hm(e) ? /* @__PURE__ */ n(qm, { ...e }) : /* @__PURE__ */ n(Im, { ...e });
}
const Mm = "_list_142ip_3", Bm = "_row_142ip_9", Dm = "_condition_142ip_18", Pm = "_action_142ip_24", Qe = {
  list: Mm,
  row: Bm,
  condition: Dm,
  action: Pm
}, kn = da(!1);
function xy({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(kn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Qe.list, "aria-label": a, children: e }) });
}
function Iy({ rule: e }) {
  if (!sa(kn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: Qe.row, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: Qe.condition, children: e.when }),
    /* @__PURE__ */ n(h, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: Qe.action, children: e.then })
  ] });
}
function Ca(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [o] = r.splice(a, 1);
  return r.splice(t, 0, o), r;
}
function $n(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Cn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function an(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Om(e) {
  return e === "up" ? "down" : "up";
}
function Hm(e, a) {
  const t = an(e, a.id, a.direction) ?? an(e, a.id, Om(a.direction));
  t == null || t.focus();
}
function Sn() {
  const e = N(null), [a, t] = p(null), [r, o] = p("");
  return T(() => {
    e.current !== null && a !== null && Hm(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), o(s);
  } };
}
function Rn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function la({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Fm = "_body_1h15q_2", jm = "_title_1h15q_8", Wm = "_section_1h15q_13", zm = "_legend_1h15q_18", Gm = "_stages_1h15q_26", Km = "_stage_1h15q_26", Um = "_stageIndex_1h15q_44", Vm = "_stageName_1h15q_50", Ym = "_footer_1h15q_59", Jm = "_note_1h15q_66", Xm = "_reason_1h15q_71", Qm = "_actions_1h15q_76", Zm = "_webHead_1h15q_83", eh = "_kicker_1h15q_92", ah = "_webTitle_1h15q_99", nh = "_webBody_1h15q_105", th = "_webSection_1h15q_109", rh = "_sectionHead_1h15q_121", lh = "_sectionNote_1h15q_129", oh = "_formLabel_1h15q_134", ih = "_identityRow_1h15q_139", ch = "_nameCell_1h15q_145", sh = "_keyCell_1h15q_150", dh = "_colourCell_1h15q_154", uh = "_colourStatus_1h15q_161", mh = "_webStages_1h15q_166", hh = "_webStageList_1h15q_172", wh = "_webStage_1h15q_166", _h = "_webIndex_1h15q_191", vh = "_webStageName_1h15q_196", fh = "_webMoves_1h15q_201", bh = "_addStage_1h15q_215", gh = "_addStageButton_1h15q_223", ph = "_addStageNote_1h15q_231", Nh = "_webFooter_1h15q_236", yh = "_webFooterNotes_1h15q_244", kh = "_webNote_1h15q_251", w = {
  body: Fm,
  title: jm,
  section: Wm,
  legend: zm,
  stages: Gm,
  stage: Km,
  stageIndex: Um,
  stageName: Vm,
  footer: Ym,
  note: Jm,
  reason: Xm,
  actions: Qm,
  webHead: Zm,
  kicker: eh,
  webTitle: ah,
  webBody: nh,
  webSection: th,
  sectionHead: rh,
  sectionNote: lh,
  formLabel: oh,
  identityRow: ih,
  nameCell: ch,
  keyCell: sh,
  colourCell: dh,
  colourStatus: uh,
  webStages: mh,
  webStageList: hh,
  webStage: wh,
  webIndex: _h,
  webStageName: vh,
  webMoves: fh,
  addStage: bh,
  addStageButton: gh,
  addStageNote: ph,
  webFooter: Nh,
  webFooterNotes: yh,
  webNote: kh
}, $h = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
];
function Tn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Ch(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Sh({ id: e, stage: a, index: t, total: r, onReplace: o, onMove: i }) {
  const c = Tn(a, t), s = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": s ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: `Stage ${t + 1} name`, value: a.name, onChange: (u) => o({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(M, { variant: s ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: $h, onChange: (u) => o({ ...a, kind: u }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(la, { id: e, name: c, direction: "up", onMove: () => i("up") }),
      t < r - 1 && /* @__PURE__ */ n(la, { id: e, name: c, direction: "down", onMove: () => i("down") })
    ] })
  ] });
}
function Rh({ stages: e, onChange: a }) {
  const t = Ch(e.length), r = Sn(), o = (c, s) => {
    const u = $n(c, s);
    t.current = Ca(t.current, c, u), r.moved({ id: t.current[u], direction: s }, Cn(Tn(e[c], c), u, e.length)), a(Ca(e, c, u));
  }, i = (c, s) => a(e.map((u, d) => d === c ? s : u));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: r.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, s) => /* @__PURE__ */ n(Sh, { id: t.current[s], stage: c, index: s, total: e.length, onReplace: (u) => i(s, u), onMove: (u) => o(s, u) }, t.current[s])) }),
    /* @__PURE__ */ n(Rn, { text: r.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Th = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Lh = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Ah = "A new stream starts as a draft. Nothing runs on it until you publish it.", Eh = "Create is disabled: name the stream and give it a key first.", xh = "reorder with the ↑ ↓ buttons · min 2";
function Ma(e, a) {
  return !e.reserved && Aa(e.step) && a[e.step] === void 0;
}
function Ih(e, a) {
  const t = e.find((r) => Ma(r, a));
  return t ? t.step : 1;
}
function qh({ stages: e, onMove: a }) {
  const t = Sn(), r = (o, i) => {
    const c = $n(o, i);
    t.moved({ id: e[o].id, direction: i }, Cn(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: w.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(la, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(la, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Rn, { text: t.announcement })
  ] });
}
function Mh({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: Ah }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(f, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Bh(e, a) {
  return e !== "" && a !== "" ? null : Eh;
}
function Dh(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = Lh, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = $(), [m, _] = p(""), [b, O] = p(""), [J, oe] = p(a[0].value), [se, Ee] = p(() => Ih(t, r)), [ae, xe] = p(e.stages ?? Th), [Ie, k] = p(o[0].value), F = { name: m, key: b, streamStep: se, owner: J, stages: ae, policy: Ie }, de = Bh(m, b);
  return /* @__PURE__ */ n(Ue, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ l("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(M, { kind: "input", label: "Stream name", value: m, onChange: _ }),
      /* @__PURE__ */ n(M, { kind: "input", label: "Key", value: b, onChange: O, mono: !0 }),
      /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: J, onChange: oe, options: a })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(gn, { label: "Stream colour", steps: t, value: se, onChange: Ee, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(qh, { stages: ae, onMove: (ke, Kn) => xe(Ca(ae, ke, Kn)) })
    ] }),
    /* @__PURE__ */ n(hn, { legend: "Loop policy", options: o, value: Ie, onChange: k }),
    /* @__PURE__ */ n(Mh, { reason: de, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const Ln = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Ph = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function Oh(e, a, t, r, o, i) {
  var s;
  const c = ((s = Ln.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function Hh(e, a) {
  return Fh(e) && jh(e, a) && Wh(e);
}
function Fh(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function jh(e, a) {
  return e.colourStep !== null && Ma({ step: e.colourStep }, a);
}
function Wh(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function zh(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${Mu}.` : Ma({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Gh({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Kh({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Gh, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: Ph })
    ] }),
    o && /* @__PURE__ */ n(f, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Uh({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function Vh({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(M, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(M, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function Yh(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [o, i] = p(""), [c, s] = p(""), [u, d] = p(e.owners[0] ?? ""), [m, _] = p(null), [b, O] = p("relay"), [J, oe] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), se = Oh(o, c, u, m, b, J), Ee = Hh(se, r), ae = J.find((k) => k.kind === "agent" && k.name.trim() !== ""), xe = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(gn, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: m, onChange: _, takenBy: r })
  ] }), Ie = /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: zh(m, r) }),
    /* @__PURE__ */ n(M, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map((k) => ({ value: k, label: k })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Ue, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Uh, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(Vh, { name: o, setName: i, streamKey: c, setKey: s, colour: xe, owner: Ie }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: xh })
        ] }),
        /* @__PURE__ */ n(Rh, { stages: J, onChange: oe })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(hn, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: Ln, onChange: O }) }),
      /* @__PURE__ */ n(Kh, { ready: Ee, draft: se, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function qy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Yh, { ...e }) : /* @__PURE__ */ n(Dh, { ...e });
}
const Jh = "_row_bs8hc_2", Xh = "_cell_bs8hc_6", Qh = "_condition_bs8hc_11", Zh = "_action_bs8hc_18", ew = "_contract_bs8hc_24", aw = "_contractCondition_bs8hc_33", nw = "_contractAction_bs8hc_39", K = {
  row: Jh,
  cell: Xh,
  condition: Qh,
  action: Zh,
  contract: ew,
  contractCondition: aw,
  contractAction: nw
}, An = ["advance", "block", "escalate", "requestReview"], nn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function oa(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Ba(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: K.action, children: nn[e.then] }) : /* @__PURE__ */ n(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => a({ ...e, then: o }),
      options: An.map((o) => ({ value: o, label: nn[o] }))
    }
  );
}
function tw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: K.condition, title: oa(e, r), children: oa(e, r) }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: Ba(e, a, t) })
  ] });
}
function rw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ l("td", { className: K.cell, children: [
      /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: K.condition, children: oa(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: K.cell, children: Ba(e, a, t) })
  ] });
}
function lw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: K.contract, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: K.contractCondition, children: oa(e, r) }),
    /* @__PURE__ */ n(h, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: K.contractAction, children: Ba(e, a, t, !0) })
  ] });
}
const ow = { two: rw, four: tw, contract: lw };
function My(e) {
  var t;
  if (!An.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = ow[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const iw = "_column_lurgk_2", cw = "_head_lurgk_17", sw = "_index_lurgk_23", dw = "_name_lurgk_29", uw = "_meta_lurgk_38", mw = "_mono_lurgk_43", hw = "_gate_lurgk_50", ww = "_reviewersLabel_lurgk_57", _w = "_reviewers_lurgk_57", vw = "_reviewer_lurgk_57", fw = "_agents_lurgk_74", bw = "_workflowColumn_lurgk_79", gw = "_workflowHead_lurgk_96", pw = "_stageRow_lurgk_102", Nw = "_stageLabel_lurgk_109", yw = "_workflowTitle_lurgk_116", kw = "_workflowMeta_lurgk_122", $w = "_workflowGate_lurgk_127", Cw = "_gateNote_lurgk_135", Sw = "_cardNote_lurgk_140", Rw = "_reviewerList_lurgk_149", Tw = "_reviewerRow_lurgk_155", Lw = "_reviewerMark_lurgk_161", Aw = "_reviewerName_lurgk_171", Ew = "_terminalCard_lurgk_177", xw = "_terminalCount_lurgk_186", Iw = "_workflowAgents_lurgk_192", qw = "_mount_lurgk_198", y = {
  column: iw,
  head: cw,
  index: sw,
  name: dw,
  meta: uw,
  mono: mw,
  gate: hw,
  reviewersLabel: ww,
  reviewers: _w,
  reviewer: vw,
  agents: fw,
  workflowColumn: bw,
  workflowHead: gw,
  stageRow: pw,
  stageLabel: Nw,
  workflowTitle: yw,
  workflowMeta: kw,
  workflowGate: $w,
  gateNote: Cw,
  cardNote: Sw,
  reviewerList: Rw,
  reviewerRow: Tw,
  reviewerMark: Lw,
  reviewerName: Aw,
  terminalCard: Ew,
  terminalCount: xw,
  workflowAgents: Iw,
  mount: qw
}, Mw = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function En(e) {
  return `${Math.round(e * 100)}%`;
}
function Bw({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ma, { cells: [
      { value: En(e.gateShare), label: "Gate share", accent: "amber" },
      { value: Y(e.count), label: "In stage" }
    ] })
  ] });
}
function Dw({ stage: e }) {
  return /* @__PURE__ */ n(ma, { cells: [
    { value: Y(e.count), label: "In stage" },
    { value: Y(e.closedThisWeek ?? 0), label: "Closed this week" }
  ] });
}
function Pw({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(h, { role: e.kind === "gate" ? "gate" : "soft", label: Mw[e.kind] })
  ] });
}
function Ow({ stage: e }) {
  return /* @__PURE__ */ l("p", { className: y.meta, children: [
    /* @__PURE__ */ l("span", { className: y.mono, children: [
      Y(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ l("span", { className: y.mono, children: [
      Z(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Hw({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Bw, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Dw, { stage: e }) : null;
}
function Fw({ onMount: e }) {
  return e ? /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function jw({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Pw, { stage: e, titleId: o }),
    /* @__PURE__ */ n(Ow, { stage: e }),
    /* @__PURE__ */ n(Hw, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(Su, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(Fw, { onMount: t })
  ] });
}
const Ww = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function zw({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, a.initials)) });
}
function Gw({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(zw, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: En(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Kw({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: e.closedThisWeek ?? 0 }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: "items closed this week" })
  ] });
}
function Uw(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Vw(e) {
  if (e.kind === "terminal") return `${e.closedThisWeek ?? 0} this week`;
  const a = Uw(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Yw({ stage: e, titleId: a }) {
  const t = Ww[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(h, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: Vw(e) })
  ] });
}
function Jw(e) {
  return e === "entry" || e === "agent";
}
function Xw({ stage: e, onMount: a }) {
  return a === void 0 || !Jw(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Qw({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Yw, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Gw, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Kw, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(Xw, { stage: e, onMount: t })
  ] });
}
function Zw(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function By(e) {
  return Zw(e) ? /* @__PURE__ */ n(Qw, { ...e }) : /* @__PURE__ */ n(jw, { ...e });
}
const e_ = "_row_ve78g_6", a_ = "_cell_ve78g_10", n_ = "_name_ve78g_19", t_ = "_chain_ve78g_26", r_ = "_owner_ve78g_32", l_ = "_mono_ve78g_38", o_ = "_compactRow_ve78g_45", i_ = "_compactCell_ve78g_54", c_ = "_stack_ve78g_71", s_ = "_stat_ve78g_78", d_ = "_identityLine_ve78g_85", u_ = "_identity_ve78g_85", m_ = "_compactName_ve78g_103", h_ = "_ownerLine_ve78g_117", w_ = "_link_ve78g_130", __ = "_emptyChain_ve78g_136", v_ = "_arrow_ve78g_142", f_ = "_muted_ve78g_143", b_ = "_define_ve78g_148", g_ = "_statValue_ve78g_155", p_ = "_policyId_ve78g_161", N_ = "_sub_ve78g_166", v = {
  row: e_,
  cell: a_,
  name: n_,
  chain: t_,
  owner: r_,
  mono: l_,
  compactRow: o_,
  compactCell: i_,
  stack: c_,
  stat: s_,
  identityLine: d_,
  identity: u_,
  compactName: m_,
  ownerLine: h_,
  link: w_,
  emptyChain: __,
  arrow: v_,
  muted: f_,
  define: b_,
  statValue: g_,
  policyId: p_,
  sub: N_
};
function y_(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function k_(e) {
  return e === void 0 ? v.compactRow : `${v.compactRow} ${e}`;
}
function $_(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${e.members} members`;
}
function C_(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: /* @__PURE__ */ l("span", { className: v.stack, children: [
    /* @__PURE__ */ l("span", { className: v.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${v.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${v.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(h, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: v.ownerLine, children: $_(e) })
  ] }) });
}
function S_(e) {
  return /* @__PURE__ */ n("span", { className: `${v.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: v.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: v.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(h, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function R_(e, a) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: v.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: v.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: v.define, href: a, children: "Define workflow" })
  ] }) : S_(e) });
}
function tn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: t }) : /* @__PURE__ */ l("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: `${v.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: v.sub, children: a })
  ] }) });
}
function T_(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: v.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: v.sub, children: e.summary })
  ] }) });
}
function L_(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function A_({ stream: e, href: a, presentation: t }) {
  const r = k_(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": `var(--ward-stream-${e.streamStep}-chip)` }, children: [
    C_(e, a),
    R_(e.stages, a),
    tn(L_(e.agents), e.agents === void 0 ? void 0 : y_(e.agents), "—"),
    T_(e.policy),
    tn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function E_(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function Dy(e) {
  if (E_(e)) return A_(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ l("tr", { className: v.row, children: [
    /* @__PURE__ */ l("td", { className: v.cell, children: [
      /* @__PURE__ */ n("a", { className: v.name, href: t, children: a.name }),
      /* @__PURE__ */ n(h, { role: "stream", label: a.key, streamStep: a.streamStep }),
      a.draft && /* @__PURE__ */ n(h, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, children: /* @__PURE__ */ n("span", { className: v.chain, children: a.stages.map((r) => /* @__PURE__ */ n(h, { role: r.gate ? "gate" : "soft", label: r.name }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: v.cell, children: /* @__PURE__ */ l("span", { className: v.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ l("td", { className: v.cell, children: [
      /* @__PURE__ */ n("span", { className: v.owner, children: a.owner }),
      /* @__PURE__ */ l("span", { className: v.mono, children: [
        Y(a.members),
        " members"
      ] })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, children: Y(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, children: a.p50 === void 0 ? "" : Z(a.p50) }) })
  ] });
}
const x_ = "_row_1nbe9_2", I_ = "_name_1nbe9_15", q_ = "_scope_1nbe9_25", ia = {
  row: x_,
  name: I_,
  scope: q_
};
function M_(e) {
  return e === void 0 ? `${ia.row} ward-toolrow` : `${ia.row} ward-toolrow ${e}`;
}
function B_(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function D_({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
function P_({ classification: e }) {
  return /* @__PURE__ */ n(h, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function O_({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${ia.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function H_(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Py({ tool: e, onChange: a, presentation: t }) {
  const r = $(), o = $(), i = B_(e, t), c = H_(t);
  return /* @__PURE__ */ l(c, { className: M_(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(D_, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${ia.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(O_, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(P_, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(h, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const F_ = "_strip_g84q9_2", j_ = "_head_g84q9_10", W_ = "_name_g84q9_16", z_ = "_chart_g84q9_24", G_ = "_segment_g84q9_30", K_ = "_detailedChart_g84q9_36", be = {
  strip: F_,
  head: j_,
  name: W_,
  chart: z_,
  segment: G_,
  detailedChart: K_
}, Sa = [1, 2, 3, 4, 5, 6], ca = 100;
function U_(e, a) {
  return a.has(e) ? `var(--ward-stream-${e}-id, var(--ward-color-line2))` : "var(--ward-color-line)";
}
function V_({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: be.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Sa.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: be.segment,
      x: o * ca,
      y: "0",
      width: ca,
      height: "8",
      fill: U_(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Y_(e) {
  return e !== null && Ke(e) ? ct(e) : H.color.line2;
}
function J_(e) {
  const a = e.slice(0, Sa.length);
  for (; a.length < Sa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function X_({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${be.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ca),
        y: "0",
        width: String(ca),
        height: "40",
        style: { fill: Y_(a.streamStep) }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function xn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Q_(e) {
  const a = J_(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("section", { className: `${be.strip} ward-appearance`, "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(wa, { item: e.sample, onOpen: xn(e.onOpen), feed: null }),
    /* @__PURE__ */ l("p", { className: `${be.head} ward-envrow ward-appearance-head`, children: [
      /* @__PURE__ */ n("span", { className: "ward-identity", "aria-hidden": "true" }),
      t.streamStep !== null && Ke(t.streamStep) ? /* @__PURE__ */ n(h, { role: "stream", label: t.key, streamStep: t.streamStep }) : /* @__PURE__ */ n(h, { role: "meta", label: t.key }),
      /* @__PURE__ */ n("span", { className: `${be.name} ward-rowlink`, children: t.name })
    ] }),
    /* @__PURE__ */ n("p", { className: "ward-checklist-note", children: "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on." }),
    /* @__PURE__ */ n(X_, { identities: a })
  ] });
}
function Z_({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": `var(--ward-stream-${e.streamStep}-id)` };
  return /* @__PURE__ */ l("section", { className: be.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: be.head, children: [
      /* @__PURE__ */ n(Ae, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: be.name, children: e.name }),
      /* @__PURE__ */ n(h, { role: "stream", label: e.key, streamStep: e.streamStep })
    ] }),
    /* @__PURE__ */ n(wa, { item: { ...a, streamStep: e.streamStep }, onOpen: xn(r) }),
    /* @__PURE__ */ n(V_, { draft: e, streams: t })
  ] });
}
function Oy(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Q_, { ...e }) : /* @__PURE__ */ n(Z_, { ...e });
}
const ev = "_row_ixlg5_6", av = "_headCell_ixlg5_10", nv = "_cell_ixlg5_11", tv = "_name_ixlg5_23", rv = "_consequence_ixlg5_29", lv = "_governed_ixlg5_36", ov = "_control_ixlg5_42", iv = "_byRole_ixlg5_48", cv = "_webControl_ixlg5_59", sv = "_webConsequence_ixlg5_65", dv = "_webGoverned_ixlg5_71", I = {
  row: ev,
  headCell: av,
  cell: nv,
  name: tv,
  consequence: rv,
  governed: lv,
  control: ov,
  byRole: iv,
  webControl: cv,
  webConsequence: sv,
  webGoverned: dv
};
function uv({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: I.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: I.control, children: [
    /* @__PURE__ */ n(
      Le,
      {
        label: `${e.name} — ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(h, { role: "running", label: "PILOT" })
  ] });
}
function mv({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: I.row, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: I.consequence, children: e.consequence }),
      /* @__PURE__ */ l("span", { className: I.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n(uv, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function hv(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function wv({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${I.webControl} ${I.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Le,
    {
      label: `${e} — step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (o) => t == null ? void 0 : t(a.streamStep, o ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ l("span", { className: `${I.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(h, { role: "running", label: "PILOT" }),
    r
  ] });
}
function _v({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: I.row, children: [
    /* @__PURE__ */ l("td", { className: I.cell, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${I.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n(wv, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n("span", { className: `${I.webGoverned} ward-cellmeta`, children: hv(e) }) })
  ] });
}
function Hy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(_v, { ...e }) : /* @__PURE__ */ n(mv, { ...e });
}
const vv = "_row_vv64h_2", fv = "_cell_vv64h_6", bv = "_name_vv64h_25", gv = "_note_vv64h_30", pv = "_webName_vv64h_41", Nv = "_webMeta_vv64h_47", W = {
  row: vv,
  cell: fv,
  name: bv,
  note: gv,
  webName: pv,
  webMeta: Nv
}, In = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function yv(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function kv({ component: e, onRestart: a }) {
  const t = $(), r = In[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: W.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: W.cell, "data-mono": "true", children: [
      Y(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { id: t, className: W.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: W.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(f, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function $v({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: yv(e.state) });
}
function Cv({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(h, { ...In[e.state] }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n($v, { component: e, onRestart: a }) })
  ] });
}
function Fy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Cv, { ...e }) : /* @__PURE__ */ n(kv, { ...e });
}
const Sv = "_row_1f1gp_7", Rv = "_cell_1f1gp_11", Tv = "_next_1f1gp_28", Lv = "_headCell_1f1gp_38", Av = "_webId_1f1gp_77", Ev = "_webPurpose_1f1gp_83", xv = "_webMeta_1f1gp_91", Iv = "_webUrgent_1f1gp_97", B = {
  row: Sv,
  cell: Rv,
  next: Tv,
  headCell: Lv,
  webId: Av,
  webPurpose: Ev,
  webMeta: xv,
  webUrgent: Iv
}, qv = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Mv = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, qn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Bv = Object.fromEntries(qn.map((e) => [e.key, e]));
function Be({ column: e, children: a }) {
  const t = Bv[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: B.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function jy() {
  return /* @__PURE__ */ n("tr", { children: qn.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: B.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function Dv({ cred: e }) {
  const a = qv[e.state];
  return /* @__PURE__ */ l("tr", { className: B.row, children: [
    /* @__PURE__ */ n(Be, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Be, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Be, { column: "state", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Be, { column: "cls", children: /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Be, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Be, { column: "next", children: /* @__PURE__ */ n("span", { className: B.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Pv({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${B.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${B.webMeta} ${B.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function Ov({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: B.row, children: [
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n("span", { className: `${B.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n("span", { className: `${B.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n("span", { className: `${B.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n(Pv, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: B.cell, children: /* @__PURE__ */ n(h, { ...Mv[e.state] }) })
  ] });
}
function Wy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ov, { ...e }) : /* @__PURE__ */ n(Dv, { ...e });
}
const Hv = "_card_17zba_2", Fv = "_head_17zba_11", jv = "_env_17zba_18", Wv = "_version_17zba_25", zv = "_meta_17zba_32", Gv = "_webCard_17zba_37", Kv = "_webRow_17zba_47", Uv = "_webTitle_17zba_55", Vv = "_webLine_17zba_65", Yv = "_webVersion_17zba_72", Jv = "_webMeta_17zba_77", j = {
  card: Hv,
  head: Fv,
  env: jv,
  version: Wv,
  meta: zv,
  webCard: Gv,
  webRow: Kv,
  webTitle: Uv,
  webLine: Vv,
  webVersion: Yv,
  webMeta: Jv
}, Mn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Xv({ env: e }) {
  const a = Mn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: j.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ l("div", { className: j.head, children: [
      /* @__PURE__ */ n("span", { className: j.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: j.version, children: e.version }),
    /* @__PURE__ */ l("p", { className: j.meta, children: [
      "deployed ",
      ee(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: j.meta, children: t })
  ] });
}
function Qv(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ee(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Zv(e) {
  return /* @__PURE__ */ l("article", { className: `${j.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${j.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${j.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(h, { ...Mn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${j.version} ${j.webVersion} ${j.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${j.meta} ${j.webMeta} ${j.webLine} ward-cellmeta`, children: Qv(e) })
  ] });
}
function zy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Zv, { ...e }) : /* @__PURE__ */ n(Xv, { ...e });
}
const ef = "_upload_erepj_2", af = "_preview_erepj_7", nf = "_mark_erepj_17", tf = "_empty_erepj_22", rf = "_actions_erepj_28", lf = "_input_erepj_33", of = "_reasons_erepj_41", cf = "_reason_erepj_41", sf = "_accepted_erepj_57", U = {
  upload: ef,
  preview: af,
  mark: nf,
  empty: tf,
  actions: rf,
  input: lf,
  reasons: of,
  reason: cf,
  accepted: sf
}, Bn = 1.5, Dn = 22, Ge = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Bn}px at ${Dn}px`];
function df() {
  return { ok: !1, reasons: [Ge[1]] };
}
function uf(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function mf(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ge[0]] : [];
}
function hf(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ge[1]), e.querySelector("text") !== null && t.push(Ge[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function wf(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? Dn / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Bn;
  }) ? [Ge[3]] : [];
}
function Gy(e) {
  const a = uf(e);
  if (a === null) return df();
  const t = [...mf(a), ...hf(a, e), ...wf(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const _f = "Mark accepted.";
function vf({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: U.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: U.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: U.empty }) });
}
function ff(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function bf(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function gf({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: U.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: U.result, role: "status", children: /* @__PURE__ */ n("p", { className: U.accepted, children: _f }) }) : /* @__PURE__ */ n("div", { className: U.result, role: "status", children: /* @__PURE__ */ n("ul", { className: U.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: U.reason, children: a }, a)) }) });
}
function pf({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(gf, { result: e }) : /* @__PURE__ */ n("p", { className: `${U.result} ${ff(e, t)}`, role: "status", children: bf(e, t) });
}
function Ky({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = p(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: U.upload, children: [
    /* @__PURE__ */ n(vf, { current: e }),
    /* @__PURE__ */ l("div", { className: U.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: o,
          className: U.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          onChange: (u) => {
            var d;
            return s((d = u.target.files) == null ? void 0 : d[0]);
          }
        }
      ),
      /* @__PURE__ */ n(f, { onClick: () => {
        var u;
        return (u = o.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(f, { variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(pf, { result: i, presentation: r })
  ] });
}
const Nf = "_row_1wp9s_7", yf = "_cell_1wp9s_11", kf = "_head_1wp9s_28", $f = "_name_1wp9s_34", Cf = "_pinned_1wp9s_42", Sf = "_headCell_1wp9s_49", Rf = "_webName_1wp9s_88", Tf = "_webMeta_1wp9s_95", Lf = "_webWarn_1wp9s_103", L = {
  row: Nf,
  cell: yf,
  head: kf,
  name: $f,
  pinned: Cf,
  headCell: Sf,
  webName: Rf,
  webMeta: Tf,
  webWarn: Lf
}, Da = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, Pn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Af = Object.fromEntries(Pn.map((e) => [e.key, e]));
function Ef(e, a) {
  return `mcp.${e}.${a}`;
}
function xf(e) {
  return Object.keys(Da).includes(e);
}
function If(e) {
  return Da[e !== void 0 && xf(e) ? e : "unknown"];
}
function Fe({ column: e, children: a }) {
  const t = Af[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: L.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function Uy() {
  return /* @__PURE__ */ n("tr", { children: Pn.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: L.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function qf({ server: e }) {
  const a = Da[e.connection];
  return /* @__PURE__ */ l("tr", { className: L.row, children: [
    /* @__PURE__ */ l(Fe, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: L.head, children: [
        /* @__PURE__ */ n("span", { className: L.name, children: e.name }),
        /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: L.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(Fe, { column: "connection", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Fe, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(Fe, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(Fe, { column: "tools", children: e.tools.map((t) => Ef(e.name, t)).join(" · ") })
  ] });
}
function Mf(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Bf(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Df({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${L.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${L.webMeta} ward-cellmeta`, children: e });
}
function Pf({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${L.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Of({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Hf({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: L.row, children: [
    /* @__PURE__ */ l("td", { className: L.cell, children: [
      /* @__PURE__ */ n("span", { className: `${L.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${L.webMeta} ward-cellmeta`, children: Mf(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n("span", { className: `${L.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(h, { ...Bf(e) }) }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(Df, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(h, { ...If(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: L.cell, children: [
      /* @__PURE__ */ n(Pf, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Of, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function Vy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Hf, { ...e }) : /* @__PURE__ */ n(qf, { ...e });
}
const Ff = "_row_1h9nq_2", jf = "_headCell_1h9nq_14", Wf = "_cell_1h9nq_15", zf = "_name_1h9nq_26", Gf = "_consequence_1h9nq_32", Kf = "_reason_1h9nq_38", Uf = "_value_1h9nq_44", Vf = "_webRow_1h9nq_60", Yf = "_webSetting_1h9nq_71", Jf = "_webName_1h9nq_79", Xf = "_webConsequence_1h9nq_87", Qf = "_webControl_1h9nq_93", Zf = "_webState_1h9nq_106", eb = "_webChip_1h9nq_111", R = {
  row: Ff,
  headCell: jf,
  cell: Wf,
  name: zf,
  consequence: Gf,
  reason: Kf,
  value: Uf,
  webRow: Vf,
  webSetting: Yf,
  webName: Jf,
  webConsequence: Xf,
  webControl: Qf,
  webState: Zf,
  webChip: eb
}, On = 104, Hn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function ab({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Le, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(un, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: R.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function nb({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = $(), i = Hn[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: R.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: R.headCell, children: [
      /* @__PURE__ */ n("span", { className: R.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: R.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: R.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: R.cell, children: /* @__PURE__ */ n(ab, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: R.cell, style: { width: On }, children: /* @__PURE__ */ n(h, { role: i.role, label: i.label }) })
  ] });
}
function Fn(e, a) {
  return String(e ?? a);
}
function tb(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function rb(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Fn(e.value, "—");
}
function lb({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: R.webControl, children: [
    /* @__PURE__ */ n(Le, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: R.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function ob(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(lb, { ...e });
  const o = tb(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: R.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(un, { options: o, value: Fn(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${R.webControl} ${R.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: rb(a) });
}
function ib({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = $(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${R.row} ${R.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: R.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${R.name} ${R.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${R.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: R.webControl, children: i(c) }) : /* @__PURE__ */ n(ob, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${R.webChip} ward-policy-chip`, style: { width: On }, children: /* @__PURE__ */ n(h, { ...Hn[t], size: "tag" }) })
  ] });
}
function Yy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ib, { ...e }) : /* @__PURE__ */ n(nb, { ...e });
}
const cb = "_label_1o9za_7", sb = "_name_1o9za_15", db = "_column_1o9za_24", ub = "_webFrame_1o9za_57", mb = "_webHead_1o9za_62", hb = "_webHeadLabel_1o9za_74", wb = "_webLabel_1o9za_112", _b = "_webColumns_1o9za_119", vb = "_webGroup_1o9za_125", fb = "_webPeople_1o9za_126", bb = "_webVia_1o9za_127", gb = "_webMeta_1o9za_156", D = {
  label: cb,
  name: sb,
  column: db,
  webFrame: ub,
  webHead: mb,
  webHeadLabel: hb,
  webLabel: wb,
  webColumns: _b,
  webGroup: vb,
  webPeople: fb,
  webVia: bb,
  webMeta: gb
}, pb = {
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
function pa({ column: e, children: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: D.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function Nb(e) {
  if (!e.matrixRole) return;
  const a = pb[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function yb({ node: e }) {
  const a = Nb(e);
  return /* @__PURE__ */ l("span", { className: D.label, children: [
    /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
    /* @__PURE__ */ n(kb, { role: a, node: e }),
    /* @__PURE__ */ n(pa, { column: ga[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(pa, { column: ga[1], children: e.people === void 0 ? "" : Y(e.people) }),
    /* @__PURE__ */ n(pa, { column: ga[2], children: e.requestedVia ?? "" })
  ] });
}
function kb({ role: e, node: a }) {
  return /* @__PURE__ */ l(P, { children: [
    e && /* @__PURE__ */ n(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(h, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(h, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function $b({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    _n,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(yb, { node: t }),
      children: c
    }
  );
}
function Na({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Cb({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${D.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Na, { className: `${D.webMeta} ${D.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Na, { className: `${D.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Na, { className: `${D.webMeta} ${D.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Sb() {
  return /* @__PURE__ */ l("div", { className: D.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: D.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: D.webColumns, children: [
      /* @__PURE__ */ n("span", { className: D.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: D.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: D.webVia, children: "Requested via" })
    ] })
  ] });
}
function Rb({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${D.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Tb(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Lb({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: D.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Sb, {}),
    /* @__PURE__ */ n(Fi, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      _n,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Rb, { row: t }),
        detail: /* @__PURE__ */ n(Cb, { row: t }),
        expanded: Tb(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function Jy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Lb, { ...e }) : /* @__PURE__ */ n($b, { ...e });
}
const Ab = "_runbook_b9agc_2", Eb = "_list_b9agc_7", xb = "_step_b9agc_15", Ib = "_numeral_b9agc_21", qb = "_body_b9agc_28", Mb = "_head_b9agc_34", Bb = "_title_b9agc_40", Db = "_detail_b9agc_45", Pb = "_actions_b9agc_50", Ob = "_webList_b9agc_56", Hb = "_webStep_b9agc_60", Fb = "_webBody_b9agc_66", jb = "_webTitle_b9agc_74", Wb = "_webDetail_b9agc_78", S = {
  runbook: Ab,
  list: Eb,
  step: xb,
  numeral: Ib,
  body: qb,
  head: Mb,
  title: Bb,
  detail: Db,
  actions: Pb,
  webList: Ob,
  webStep: Hb,
  webBody: Fb,
  webTitle: jb,
  webDetail: Wb
}, jn = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function Wn(e) {
  return String(e + 1).padStart(2, "0");
}
function zb({ step: e, index: a, connection: t }) {
  const r = jn[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: Wn(a) }),
    /* @__PURE__ */ l("span", { className: S.body, children: [
      /* @__PURE__ */ l("span", { className: S.head, children: [
        /* @__PURE__ */ n("span", { className: S.title, children: e.title }),
        /* @__PURE__ */ n(h, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: S.detail, children: e.detail })
    ] })
  ] });
}
function Gb({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(zb, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function Kb({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Wn(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(h, { ...jn[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function Ub({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(Kb, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function Xy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ub, { ...e }) : /* @__PURE__ */ n(Gb, { ...e });
}
const Vb = "_list_1gu6a_2", Yb = "_check_1gu6a_10", Jb = "_body_1gu6a_16", Xb = "_text_1gu6a_23", Qb = "_pending_1gu6a_32", Zb = "_measured_1gu6a_37", Pe = {
  list: Vb,
  check: Yb,
  body: Jb,
  text: Xb,
  pending: Qb,
  measured: Zb
};
function eg(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function ag({ check: e }) {
  const a = eg(e.passed);
  return /* @__PURE__ */ l("li", { className: `${Pe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Ia, { state: a.state, label: a.label }),
    /* @__PURE__ */ l("span", { className: Pe.body, children: [
      /* @__PURE__ */ n("span", { className: Pe.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ l("span", { className: Pe.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Pe.measured, children: e.measured })
  ] });
}
function Qy({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(ag, { check: a }, a.text)) });
}
const ng = "_root_16pdz_2", tg = "_list_16pdz_9", rg = "_line_16pdz_16", lg = "_at_16pdz_43", og = "_text_16pdz_47", ig = "_foot_16pdz_51", cg = "_idle_16pdz_62", sg = "_caret_16pdz_69", dg = "_jump_16pdz_76", we = {
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
function Pa(e) {
  return Number.isNaN(Date.parse(e)) ? "" : ug.format(new Date(e));
}
const mg = { warn: "warning", ok: "ok" };
function hg({ kind: e }) {
  const a = mg[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function wg({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Pa(e)}` });
}
function _g({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events — as of ${Pa(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${we.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${we.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: we.idle, children: i }),
    /* @__PURE__ */ n(wg, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function Zy({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const o = N(null), [i, c] = p(0), s = e.at(-1);
  T(() => {
    c(e.length);
  }, [e.length]);
  const u = () => {
    var _;
    const d = o.current;
    if (!d) return;
    d.scrollTop = d.scrollHeight;
    const m = d.querySelectorAll("[data-consline-text]");
    (_ = m.item(m.length - 1)) == null || _.focus();
  };
  return /* @__PURE__ */ l("div", { className: we.root, children: [
    /* @__PURE__ */ n("ol", { className: we.list, ref: o, "aria-live": "off", "aria-label": r, children: e.map((d, m) => /* @__PURE__ */ l("li", { className: `${we.line} ward-consline ward-reveal ward-consline--${d.kind}`, "data-kind": d.kind, "data-revealed": m < i, children: [
      /* @__PURE__ */ n("span", { className: we.at, children: Pa(d.at) }),
      /* @__PURE__ */ n(hg, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: we.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${m}`)) }),
    /* @__PURE__ */ n(_g, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${we.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const vg = "_row_11jhe_2", fg = "_head_11jhe_14", bg = "_author_11jhe_20", gg = "_eta_11jhe_25", pg = "_edited_11jhe_26", Ng = "_body_11jhe_32", yg = "_reason_11jhe_37", kg = "_actions_11jhe_42", me = {
  row: vg,
  head: fg,
  author: bg,
  eta: gg,
  edited: pg,
  body: Ng,
  reason: yg,
  actions: kg
}, $g = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
}, Cg = {
  queued: "Still in the outbox — editing replaces the queued row and recomputes req_hash, so Jira receives one comment, not two.",
  delivered: "Already in Jira, so an edit is a Jira edit: it will show as edited by you there, and the original stays in the audit row.",
  retrying: "Edit is unavailable mid-flight: a delivery may already have reached Jira. Cancel first, then edit.",
  failed: "Delivery failed — edit and resend, or cancel the delivery."
};
function Sg({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function Rg({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: me.reason, id: a, children: e })
  ] });
}
function Tg(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Lg(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Sg, { ...e }) : /* @__PURE__ */ n(Rg, { reason: e.unavailable, reasonId: e.unavailableId });
}
function ek(e) {
  const { comment: a } = e;
  Tg(e);
  const t = $(), r = `${t}-unavailable`, o = $g[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${me.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: me.head, children: [
      /* @__PURE__ */ n("span", { className: me.author, children: a.author }),
      /* @__PURE__ */ n(h, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: me.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: me.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: me.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: me.reason, id: t, children: Cg[a.delivery] }),
    /* @__PURE__ */ n("div", { className: me.actions, children: /* @__PURE__ */ n(Lg, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Ag = "_root_c46wj_2", Eg = "_attach_c46wj_11", xg = "_actions_c46wj_17", Ig = "_reply_c46wj_23", qg = "_replyRow_c46wj_28", Mg = "_sendsAs_c46wj_42", He = {
  root: Ag,
  attach: Eg,
  actions: xg,
  reply: Ig,
  replyRow: qg,
  sendsAs: Mg
};
function Bg({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = p(""), i = $();
  return /* @__PURE__ */ l("div", { className: He.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: He.replyRow, children: [
      /* @__PURE__ */ n(M, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(f, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: He.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function ak(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Bg, { ...e }) : /* @__PURE__ */ n(Dg, { ...e });
}
function Dg({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = p("");
  return /* @__PURE__ */ l("div", { className: He.root, children: [
    /* @__PURE__ */ n(M, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ l("div", { className: He.attach, children: [
      /* @__PURE__ */ n(h, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      dn,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ l("div", { className: He.actions, children: [
      /* @__PURE__ */ n(f, { variant: "primary", onClick: () => o(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(f, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const Pg = "_list_1ih9e_2", Og = "_item_1ih9e_6", Hg = "_body_1ih9e_22", Fg = "_text_1ih9e_28", jg = "_evidence_1ih9e_37", Wg = "_consequence_1ih9e_49", zg = "_note_1ih9e_54", Te = {
  list: Pg,
  item: Og,
  body: Hg,
  text: Fg,
  evidence: jg,
  consequence: Wg,
  note: zg
};
function Gg({ criterion: e }) {
  return /* @__PURE__ */ n(Ae, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function rn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Kg(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function Ug({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Te.body, children: [
    /* @__PURE__ */ n("span", { className: Te.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(P, { children: [
      /* @__PURE__ */ n(rn, { text: " — " }),
      /* @__PURE__ */ n("code", { className: Te.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(P, { children: [
      /* @__PURE__ */ n(rn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Te.consequence, children: Kg(e.why) })
    ] })
  ] });
}
function Vg({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Te.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Gg, { criterion: e }),
    /* @__PURE__ */ n(Ug, { criterion: e })
  ] });
}
function nk({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Te.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Vg, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Te.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Yg = "_list_dwhoz_2", Jg = "_rung_dwhoz_6", Xg = "_name_dwhoz_18", Qg = "_actor_dwhoz_32", Ze = {
  list: Yg,
  rung: Jg,
  name: Xg,
  actor: Qg
}, Zg = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function ep({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = Zg[e.state];
  return /* @__PURE__ */ l("li", { className: Ze.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Ze.name, children: e.name }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${Ze.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function tk({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ze.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(ep, { rung: a }, a.name)) });
}
const ap = "_sheet_1fqco_2", np = "_title_1fqco_9", tp = "_stage_1fqco_15", rp = "_effects_1fqco_20", lp = "_effect_1fqco_20", op = "_numeral_1fqco_31", ip = "_effectText_1fqco_38", cp = "_refusals_1fqco_43", sp = "_reasons_1fqco_52", dp = "_reason_1fqco_52", up = "_actions_1fqco_62", te = {
  sheet: ap,
  title: np,
  stage: tp,
  effects: rp,
  effect: lp,
  numeral: op,
  effectText: ip,
  refusals: cp,
  reasons: sp,
  reason: dp,
  actions: up
};
function mp({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function rk({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
  const s = $(), u = `${s}-refusal`, [d, m] = p(""), _ = t.length > 0;
  return /* @__PURE__ */ n(Ue, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ l("div", { className: te.sheet, children: [
    /* @__PURE__ */ l("h2", { className: te.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: te.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: te.effects, children: a.map((b, O) => /* @__PURE__ */ l("li", { className: te.effect, children: [
      /* @__PURE__ */ n("span", { className: te.numeral, children: String(O + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: te.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      qo,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(M, { kind: "textarea", label: "Note for the agent", value: d, onChange: m }),
    _ && /* @__PURE__ */ l("div", { className: te.refusals, children: [
      /* @__PURE__ */ n(h, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: te.reasons, children: t.map((b, O) => /* @__PURE__ */ n("li", { className: te.reason, id: O === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: te.actions, children: [
      /* @__PURE__ */ n(mp, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(f, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const hp = "_list_1hvqu_2", wp = "_path_1hvqu_7", _p = "_head_1hvqu_21", vp = "_label_1hvqu_28", fp = "_consequence_1hvqu_35", bp = "_ask_1hvqu_36", Oe = {
  list: hp,
  path: wp,
  head: _p,
  label: vp,
  consequence: fp,
  ask: bp
}, Ra = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function ln(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function gp({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(f, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: Ra[e.kind] }) : /* @__PURE__ */ l(P, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: Ra[e.kind] }),
    /* @__PURE__ */ n("span", { className: Oe.ask, id: r, children: e.askInstead })
  ] });
}
function pp({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: Oe.path, "data-allowed": e.allowed, "data-role": ln(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: Oe.head, children: [
      /* @__PURE__ */ n("span", { className: Oe.label, children: e.title ?? Ra[e.kind] }),
      /* @__PURE__ */ n(h, { role: ln(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Oe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(gp, { path: e, primary: a, onChoose: t })
  ] });
}
function lk({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Oe.list, children: e.map((t, r) => /* @__PURE__ */ n(pp, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const Np = "_list_qjv4r_2", yp = "_item_qjv4r_6", kp = "_node_qjv4r_18", $p = "_body_qjv4r_24", Cp = "_head_qjv4r_30", Sp = "_stage_qjv4r_36", Rp = "_version_qjv4r_41", Tp = "_sentence_qjv4r_49", Lp = "_meta_qjv4r_54", _e = {
  list: Np,
  item: yp,
  node: kp,
  body: $p,
  head: Cp,
  stage: Sp,
  version: Rp,
  sentence: Tp,
  meta: Lp
}, Ap = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Ep({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: _e.head, children: [
    /* @__PURE__ */ n("span", { className: _e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: _e.version, title: e.version, children: e.version }) : null
  ] });
}
function xp({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${_e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${_e.node} ward-history-node`, children: /* @__PURE__ */ n(Ae, { size: 9, kind: Ap[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${_e.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Ep, { entry: e }),
      /* @__PURE__ */ n("span", { className: _e.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${_e.meta} ward-history-meta`, children: [
        `${ee(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${V(e.cost)}`
      ] })
    ] })
  ] });
}
function ok({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${_e.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(xp, { entry: a }, a.stage + String(t))) });
}
const Ip = "_thread_1kn6s_3", qp = "_turn_1kn6s_8", Mp = "_who_1kn6s_27", Bp = "_body_1kn6s_32", ea = {
  thread: Ip,
  turn: qp,
  who: Mp,
  body: Bp
}, zn = da(!1);
function ik({ children: e, density: a }) {
  return /* @__PURE__ */ n(zn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ea.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function ck({ turn: e }) {
  if (!sa(zn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${ea.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${ea.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ee(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ea.body} ward-chat-body`, children: e.body })
  ] });
}
const Dp = "_list_1rt9c_3", Pp = "_row_1rt9c_7", Op = "_label_1rt9c_20", Hp = "_n_1rt9c_26", Fp = "_cause_1rt9c_33", We = {
  list: Dp,
  row: Pp,
  label: Op,
  n: Hp,
  cause: Fp
};
function jp(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Wp = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function zp({ row: e, formatNumber: a }) {
  return jp(e), /* @__PURE__ */ l("li", { className: `${We.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ae, { size: 8, ...Wp[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: We.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${We.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Gp, { cause: e.cause })
  ] });
}
function Gp({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${We.cause} ward-healthrow-cause`, children: e }) : null;
}
function sk({ rows: e, formatNumber: a = Y }) {
  return /* @__PURE__ */ n("ul", { className: `${We.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(zp, { row: t, formatNumber: a }, t.label)) });
}
const Kp = "_root_1jxwp_2", Up = {
  root: Kp
};
function dk({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: Up.root, "data-density": o, children: [
    /* @__PURE__ */ n(_a, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(f, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const Vp = "_row_dhbre_3", Yp = "_key_dhbre_13", Jp = "_stack_dhbre_24", Xp = "_value_dhbre_32", Qp = "_evidence_dhbre_39", Zp = "_mark_dhbre_47", De = {
  row: Vp,
  key: Yp,
  stack: Jp,
  value: Xp,
  evidence: Qp,
  mark: Zp
};
function eN({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(h, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ia, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function uk({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${De.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${De.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${De.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${De.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${De.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${De.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(eN, { state: e.state }) })
  ] });
}
const aN = "_cell_1monp_2", nN = {
  cell: aN
}, tN = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function rN(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function lN(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function oN(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: rN(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function iN(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function mk({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  lN(e, t);
  const r = iN(e);
  return /* @__PURE__ */ n(
    Vo,
    {
      label: "Rejection routing",
      columns: tN,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: nN.cell, "data-norerun": o.noRerun ? !0 : void 0, children: oN(o, i) }),
      empty: a ?? /* @__PURE__ */ n(gc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const cN = "_row_ute8v_2", sN = "_title_ute8v_11", dN = "_turns_ute8v_20", uN = "_waiting_ute8v_21", mN = "_resolved_ute8v_22", hN = "_activity_ute8v_23", wN = "_cost_ute8v_29", _N = "_link_ute8v_30", vN = "_tableRow_ute8v_47", fN = "_tableTitle_ute8v_59", bN = "_tableResolved_ute8v_64", gN = "_tableLink_ute8v_68", pN = "_tableMeta_ute8v_83", NN = "_tableCost_ute8v_90", yN = "_tableActivity_ute8v_91", kN = "_tableState_ute8v_101", $N = "_tableRecord_ute8v_112", x = {
  row: cN,
  title: sN,
  turns: dN,
  waiting: uN,
  resolved: mN,
  activity: hN,
  cost: wN,
  link: _N,
  tableRow: vN,
  tableTitle: fN,
  tableResolved: bN,
  tableLink: gN,
  tableMeta: pN,
  tableCost: NN,
  tableActivity: yN,
  tableState: kN,
  tableRecord: $N
}, Gn = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function CN(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function SN(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function RN(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const TN = { duplicate: "CLOSED · DUPLICATE" };
function LN({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: x.tableMeta, children: `waiting on ${e}` });
}
function AN({ value: e }) {
  return /* @__PURE__ */ n("td", { className: x.tableCost, children: e === void 0 ? null : V(e) });
}
function EN({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: x.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function xN({ session: e, href: a }) {
  const t = Gn[e.state];
  return /* @__PURE__ */ l("tr", { className: x.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: x.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: x.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: x.tableMeta, children: SN(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: x.tableResolved, children: [
      RN(e.resolved),
      /* @__PURE__ */ n(LN, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(AN, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: x.tableActivity, children: CN(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: x.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(h, { role: t.role, label: TN[e.state] ?? t.label }),
      /* @__PURE__ */ n(EN, { link: e.link })
    ] }) })
  ] });
}
function IN({ session: e }) {
  const a = Gn[e.state];
  return /* @__PURE__ */ l("div", { className: x.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: x.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: x.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: x.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: x.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: x.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : V(e.cost) }),
    /* @__PURE__ */ n("span", { className: x.activity, children: ee(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: x.link, href: e.link.href, children: e.link.key }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function hk(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(xN, { session: e.session, href: e.href }) : /* @__PURE__ */ n(IN, { session: e.session });
}
const qN = "_block_1yy2v_3", MN = "_list_1yy2v_9", BN = "_line_1yy2v_14", Ta = {
  block: qN,
  list: MN,
  line: BN
}, DN = { warn: "warning", ok: "ok" };
function PN({ kind: e }) {
  const a = DN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function ON({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Ta.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(PN, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function wk({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ta.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ta.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(ON, { line: t }, `${r}-${t.text}`)) }) });
}
const HN = "_band_tt7hp_1", FN = "_head_tt7hp_8", jN = "_cell_tt7hp_19", WN = "_index_tt7hp_35", zN = "_title_tt7hp_42", GN = "_note_tt7hp_48", KN = "_cellTitle_tt7hp_53", UN = "_cellBody_tt7hp_58", VN = "_tag_tt7hp_64", ue = {
  band: HN,
  head: FN,
  cell: jN,
  index: WN,
  title: zN,
  note: GN,
  cellTitle: KN,
  cellBody: UN,
  tag: VN
}, on = 4;
function _k({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== on)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${on}-cell grid`);
  return /* @__PURE__ */ l("section", { className: ue.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ l("div", { className: ue.head, children: [
      /* @__PURE__ */ n("span", { className: ue.index, children: e }),
      /* @__PURE__ */ n("span", { className: ue.title, children: a }),
      /* @__PURE__ */ n("span", { className: ue.note, children: t })
    ] }),
    r.map((o) => /* @__PURE__ */ l("div", { className: ue.cell, children: [
      /* @__PURE__ */ n("span", { className: ue.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: ue.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: ue.tag, children: o.tag })
    ] }, o.title))
  ] });
}
export {
  Zy as ActivityConsole,
  Su as AgentCard,
  ry as AppShell,
  Oy as AppearanceStrip,
  _k as Band,
  es as BoardColumn,
  Ny as BoardFootnote,
  yy as BoardHeader,
  wy as BoardScroller,
  f as Btn,
  ay as CHIP_ROLES,
  qn as CREDENTIAL_COLUMNS,
  cy as Callout,
  Hy as CapabilityRow,
  ck as ChatMessage,
  dn as Checkbox,
  h as Chip,
  ek as ClarificationRow,
  gn as ColourLadder,
  Fy as ComponentRow,
  ak as Composer,
  $y as ConfigRow,
  ky as ConfigRowHead,
  qa as ConnectionMark,
  ik as Conversation,
  qo as CostMeter,
  Wy as CredentialRow,
  jy as CredentialRowHead,
  nk as CriteriaList,
  yr as Crumb,
  sk as DeliveryHealth,
  vy as DeniedState,
  Ey as DryRunRail,
  gc as EmptyState,
  zy as EnvCard,
  M as Field,
  _y as FilteredEmpty,
  _a as GateChecklist,
  tk as GateLadder,
  Vo as Grid,
  Iy as HandoffRuleRow,
  xy as HandoffRules,
  Cy as ItemDrawer,
  it as LIVE_EVENT_TYPES,
  Zd as LegacyBoardColumn,
  Ry as LegacyBoardHeader,
  Ty as LegacyConfigRow,
  Ay as LegacyItemDrawer,
  Kd as LegacyOverCapNote,
  Ly as LegacyPreviewRail,
  bn as LegacyWorkCard,
  ge as LiveIndicator,
  fy as LoadFailed,
  py as Loading,
  Pn as MCP_SERVER_COLUMNS,
  Ia as Mark,
  Ky as MarkUpload,
  Ae as Marker,
  Vy as McpServerRow,
  Uy as McpServerRowHead,
  qy as NewStreamModal,
  yc as OverCapNote,
  Ue as Overlay,
  Mu as PARTIAL_STEP_REASON,
  On as POLICY_CHIP_WIDTH,
  dy as PageFrame,
  iy as PageHeader,
  Yy as PolicyRow,
  Sy as PreviewRail,
  ga as ROLE_MATRIX_COLUMNS,
  An as RULE_ACTIONS,
  hn as Radio,
  dk as ReadyChecklist,
  my as RecordSection,
  rk as RequeueSheet,
  lk as ResolveBlock,
  uk as ResolvedFieldRow,
  Jy as RoleMatrixRow,
  mk as RoutingTable,
  My as RuleRow,
  Xy as RunbookSteps,
  lt as STREAM_STEPS,
  hy as SectionBand,
  ui as SectionHeader,
  un as SegmentedControl,
  hk as SessionRow,
  oy as Sidebar,
  By as StageColumn,
  ok as StageHistory,
  Rh as StageListEditor,
  by as StaleStrip,
  ma as StatStrip,
  Dy as StreamRow,
  uy as SubjectRail,
  Le as Switch,
  ly as Tabs,
  Py as ToolRow,
  sy as TopBar,
  Fi as Tree,
  _n as TreeRow,
  wk as TypedInputBlock,
  Qy as ValidationList,
  ey as WARD_VERSION,
  wa as WorkCard,
  gy as WriteUnavailableStrip,
  CN as agoSince,
  Qn as clock,
  zh as colourStatus,
  Y as count,
  Z as duration,
  La as elapsed,
  ZN as eventSourceTransport,
  Ke as isStreamStep,
  Aa as isValidatedStreamStep,
  Bu as ladderValidation,
  If as mcpConnectionChip,
  Ef as mcpToolName,
  V as money,
  ie as ms,
  vn as ordered,
  cn as ratio,
  yv as restartLabel,
  ee as stamp,
  sn as stream,
  ct as streamChip,
  ny as streamVars,
  Xe as useBorderFlash,
  nt as useFocusTrap,
  ty as useLiveFeed,
  QN as useReturnFocus,
  ua as useRovingTabindex,
  Ea as useTicker,
  H as v,
  Gy as validateMark,
  ot as validatedStreamSteps
};
