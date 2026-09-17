import { useCallback as z, useEffect as T, useState as p, useRef as N, useLayoutEffect as Vn, useId as $, useContext as sa, createContext as da, Fragment as Yn } from "react";
import { jsxs as l, jsx as n, Fragment as O } from "react/jsx-runtime";
import { createPortal as Jn } from "react-dom";
function ee(e) {
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
const Xn = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ae(e) {
  const a = Xn.formatToParts(new Date(e)), t = (r) => {
    var o;
    return ((o = a.find((i) => i.type === r)) == null ? void 0 : o.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function Y(e) {
  return e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function J(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function cn(e, a) {
  return `${e} / ${a}`;
}
const Qn = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Zn(e) {
  return Qn.format(new Date(e));
}
const et = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function at(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function nt(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = at(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function tt(e) {
  return { onKeyDown: z(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(et));
      nt(t, e.current, r);
    },
    [e]
  ) };
}
function ty(e, a = !0) {
  T(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const Ha = { ArrowUp: -1, ArrowDown: 1 }, Fa = { ArrowLeft: -1, ArrowRight: 1 }, rt = (e, a, t) => Math.min(t, Math.max(a, e));
function lt(e, a) {
  if (a !== "horizontal" && e in Ha) return Ha[e];
  if (a !== "vertical" && e in Fa) return Fa[e];
}
function ua({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  Vn(() => {
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
      const _ = Math.max(0, m.indexOf(a)), b = lt(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(m[rt(_ + b, 0, m.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(m[0])) : d.key === "End" && (d.preventDefault(), c(m[m.length - 1]));
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
const ry = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, ly = "0.2.0", oy = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], ot = [1, 2, 3, 4, 5, 6], it = [1, 2, 3], ct = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], H = {
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
}, ce = {
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
  return ot.includes(e);
}
function Aa(e) {
  return it.includes(e);
}
function iy(e) {
  if (!Ke(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function st(e) {
  if (!Ke(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
function ja(e) {
  return typeof e != "string" ? null : ct.includes(e) ? e : null;
}
function dt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function ut(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function mt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function ht(e, a, t) {
  const r = dt(e);
  if (r === null) return null;
  const o = ja(t) ?? ja(r.type);
  return o === null ? null : { ...r, type: o, id: ut(r, a), at: mt(r) };
}
function wt(e, a) {
  return e >= ce.staleAfter ? "stale" : e >= ce.heartbeat && a === "live" ? "reconnecting" : null;
}
function _t(e, a, t) {
  return e >= ce.heartbeat && !a && t !== null;
}
function cy(e, a) {
  const [t, r] = p("reconnecting"), [o, i] = p(null), c = N(/* @__PURE__ */ new Map()), s = N(0), u = N(""), d = N(0), m = N(null), _ = N(0), b = N(0), B = N(!1), X = N("reconnecting"), Q = z((k) => {
    X.current = k, r(k);
  }, []), ne = z(() => {
    s.current = Date.now();
  }, []), Ee = z((k) => {
    for (const [F, de] of c.current)
      (de === "*" || k.itemKey === de) && F(k);
  }, []), te = z(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (k, F, de) => {
        const ke = ht(k, F, de);
        ke !== null && (ke.id && (u.current = ke.id), ne(), B.current = !1, Q("live"), i(ke.at), Ee(ke));
      },
      onOpen: () => {
        d.current = 0, B.current = !1, ne(), Q("live");
      },
      onError: () => {
        var F;
        (F = m.current) == null || F.close(), m.current = null, B.current = !0, X.current !== "stale" && Q("reconnecting");
        const k = Math.min(ce.reconnectBase * 2 ** d.current, ce.reconnectMax);
        d.current += 1, _.current = window.setTimeout(te, k);
      }
    });
  }, [Ee, Q, ne, a, e]), xe = z((k) => {
    B.current = !0, k.close(), m.current = null, _.current = window.setTimeout(te, ce.reconnectBase);
  }, [te]), Ie = z((k, F) => (c.current.set(F, k), () => {
    c.current.delete(F);
  }), []);
  return T(() => (te(), b.current = window.setInterval(() => {
    const k = Date.now() - s.current, F = wt(k, X.current);
    F && Q(F);
    const de = m.current;
    _t(k, B.current, de) && xe(de);
  }, ce.tick), () => {
    var k;
    window.clearInterval(b.current), window.clearTimeout(_.current), B.current = !1, (k = m.current) == null || k.close(), m.current = null;
  }), [te, xe, Q]), { connection: t, lastEventAt: o, subscribe: Ie };
}
function Ea(e, a) {
  const t = new Date(e).getTime(), [r, o] = p(() => Date.now());
  return T(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    i();
    const c = window.setInterval(i, ce.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(c), document.removeEventListener("visibilitychange", i);
    };
  }, [a, t]), Math.max(0, r - t);
}
function vt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Wa(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Xe(e, a) {
  const t = N(0), r = z((o) => {
    const i = o ?? a, c = e.current;
    c !== null && i !== void 0 && (vt() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => Wa(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => Wa(c), ce.flash)));
  }, [a, e]);
  return T(() => () => window.clearTimeout(t.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const ft = "_root_1otpc_2", bt = {
  root: ft
};
function gt(e, a, t, r, o) {
  const i = [La(a)];
  return e || i.push(`as of ${Zn(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = Ea(e, o), c = (a == null ? void 0 : a.at) ?? e, s = gt(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${bt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      ae(e)
    ] })
  ] });
}
const pt = "_app_lrbcc_1", Nt = "_side_lrbcc_18", yt = "_main_lrbcc_26", kt = "_rail_lrbcc_33", $t = "_page_lrbcc_40", Ct = "_root_lrbcc_91", St = "_topbar_lrbcc_98", Rt = "_mark_lrbcc_109", Tt = "_brand_lrbcc_116", Lt = "_tagline_lrbcc_122", At = "_identity_lrbcc_128", Et = "_tools_lrbcc_129", xt = "_actor_lrbcc_138", It = "_metadata_lrbcc_139", qt = "_detail_lrbcc_155", Mt = "_nav_lrbcc_160", Bt = "_content_lrbcc_195", Dt = "_skip_lrbcc_218", q = {
  app: pt,
  side: Nt,
  main: yt,
  rail: kt,
  page: $t,
  root: Ct,
  topbar: St,
  mark: Rt,
  brand: Tt,
  tagline: Lt,
  identity: At,
  tools: Et,
  actor: xt,
  metadata: It,
  detail: qt,
  nav: Mt,
  content: Bt,
  skip: Dt
};
function Pt({ sidebar: e, header: a, children: t, rail: r }) {
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
function Ot({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: q.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function aa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Ht({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: q.metadata, children: [
    /* @__PURE__ */ n(aa, { value: e, className: q.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(aa, { value: a, className: q.detail })
  ] });
}
function Ft(e) {
  return /* @__PURE__ */ l("header", { className: q.topbar, children: [
    /* @__PURE__ */ n("span", { className: q.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: q.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(aa, { value: e.tagline, className: q.tagline }),
    /* @__PURE__ */ n(Ot, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: q.identity, children: /* @__PURE__ */ n(Ht, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(aa, { value: e.tools, className: q.tools })
  ] });
}
function jt(e) {
  const a = $();
  return /* @__PURE__ */ l("div", { className: `${q.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: q.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Ft, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: q.content, children: e.children })
  ] });
}
function Wt(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function sy(e) {
  return Wt(e) ? /* @__PURE__ */ n(Pt, { ...e }) : /* @__PURE__ */ n(jt, { ...e });
}
const zt = "_btn_llheq_2", Gt = "_primary_llheq_13", Kt = "_secondary_llheq_23", Ut = "_ghost_llheq_28", Vt = "_overflow_llheq_37", Yt = "_sm_llheq_44", Jt = "_disabled_llheq_48", Ve = {
  btn: zt,
  primary: Gt,
  secondary: Kt,
  ghost: Ut,
  overflow: Vt,
  sm: Yt,
  disabled: Jt
};
function Xt(e, a, t, r) {
  const o = a === "sm" ? [Ve.sm, "ward-btn--sm"] : [], i = t ? [Ve.disabled] : [];
  return [Ve.btn, Ve[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Qt(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Zt(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function er(e) {
  return e.children ?? e.label;
}
function v(e) {
  Zt(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: Xt(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...Qt(a, e.controls),
      children: er(e)
    }
  );
}
function xa(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const ar = "_root_o4yib_2", nr = "_row_o4yib_8", tr = "_box_o4yib_14", rr = "_label_o4yib_21", lr = "_lockedNote_o4yib_26", or = "_consequence_o4yib_34", ir = "_sample_o4yib_69", Ce = {
  root: ar,
  row: nr,
  box: tr,
  label: rr,
  lockedNote: lr,
  consequence: or,
  sample: ir
};
function cr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function sr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Ce.consequence} ward-check-consequence`, children: a }) : null;
}
function dr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ce.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function ur({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ce.sample, "aria-hidden": "true", children: e }) : null;
}
function dn(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = cr(e);
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
        /* @__PURE__ */ n(dr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(ur, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(sr, { id: t, text: e.consequence })
  ] });
}
const mr = "_chip_1073r_2", hr = {
  chip: mr
}, wr = {
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
function _r(e, a) {
  if (e === "stream") return vr(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = wr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function vr(e) {
  if (!e || !Aa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = sn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${hr.chip} ward-chip ward-chip--${e}`, style: _r(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
const fr = "_nav_fbsei_2", br = "_list_fbsei_8", gr = "_item_fbsei_15", pr = "_link_fbsei_24", Nr = "_current_fbsei_33", yr = "_chips_fbsei_37", qe = {
  nav: fr,
  list: br,
  item: gr,
  link: pr,
  current: Nr,
  chips: yr
};
function kr({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: qe.nav, children: [
    /* @__PURE__ */ n("ol", { className: qe.list, children: e.map((t, r) => /* @__PURE__ */ n("li", { className: qe.item, children: r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: qe.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: qe.current, "aria-current": "page", children: t.label }) }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${qe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] }) });
}
const $r = "_field_1oadv_2", Cr = "_label_1oadv_8", Sr = "_labelHidden_1oadv_15", Rr = "_control_1oadv_25", Tr = "_mono_1oadv_44", Lr = "_area_1oadv_49", Ar = "_invalid_1oadv_56", ye = {
  field: $r,
  label: Cr,
  labelHidden: Sr,
  control: Rr,
  mono: Tr,
  area: Lr,
  invalid: Ar
};
function Er({ controlProps: e, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, ...e });
}
function xr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Ir({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const qr = { input: Er, select: xr, textarea: Ir };
function Mr(e, a, t) {
  const r = qr[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Br(e, a, t) {
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
function Dr(e) {
  const a = e.mono ? [ye.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [ye.area] : [];
  return [ye.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Pr(e) {
  return e ? `${ye.label} ${ye.labelHidden} ward-field-label` : `${ye.label} ward-field-label`;
}
function M(e) {
  const a = $(), t = `${a}-msg`, r = Br(e, a, t), o = Dr(e);
  return /* @__PURE__ */ l("div", { className: `${ye.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Pr(e.labelHidden), htmlFor: a, children: e.label }),
    Mr(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${ye.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Or = "_strip_rg8pj_2", Hr = "_tab_rg8pj_12", Fr = "_count_rg8pj_34", ya = {
  strip: Or,
  tab: Hr,
  count: Fr
}, za = 7;
function jr(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Wr(e) {
  return `${ya.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function dy({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > za) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${za} — the set is fixed`);
  const i = ua({ orientation: "horizontal" }), c = jr(e, a);
  return T(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: Wr(o),
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
            s.count === void 0 ? null : /* @__PURE__ */ l(O, { children: [
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
const zr = "_root_jem6y_2", Gr = "_segment_jem6y_7", Ga = {
  root: zr,
  segment: Gr
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
const Kr = "_sidebar_1jywv_3", Ur = "_brand_1jywv_9", Vr = "_mark_1jywv_17", Yr = "_word_1jywv_24", Jr = "_nav_1jywv_30", Xr = "_navItem_1jywv_38", Qr = "_group_1jywv_50", Zr = "_groupName_1jywv_57", el = "_agents_1jywv_70", al = "_agent_1jywv_70", nl = "_agentTop_1jywv_88", tl = "_dot_1jywv_95", rl = "_agentName_1jywv_107", ll = "_agentMeta_1jywv_120", ol = "_foot_1jywv_126", il = "_footName_1jywv_132", cl = "_footLinks_1jywv_139", sl = "_footLink_1jywv_139", dl = "_root_1jywv_153", ul = "_linkBrand_1jywv_162", ml = "_label_1jywv_183", hl = "_note_1jywv_188", wl = "_footer_1jywv_202", C = {
  sidebar: Kr,
  brand: Ur,
  mark: Vr,
  word: Yr,
  nav: Jr,
  navItem: Xr,
  group: Qr,
  groupName: Zr,
  new: "_new_1jywv_64",
  agents: el,
  agent: al,
  agentTop: nl,
  dot: tl,
  agentName: rl,
  agentMeta: ll,
  foot: ol,
  footName: il,
  footLinks: cl,
  footLink: sl,
  root: dl,
  linkBrand: ul,
  label: ml,
  note: hl,
  footer: wl
};
function _l({ agent: e }) {
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
function vl({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function fl({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
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
        J(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: C.new, href: o.href, children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(_l, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(vl, { shared: i })
  ] });
}
function bl(e) {
  return e.destinations ?? e.items ?? [];
}
function gl({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function pl({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function Nl({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function yl(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(gl, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: bl(e).map((a) => /* @__PURE__ */ n(Nl, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(pl, { children: e.children })
  ] });
}
function kl(e) {
  return "agents" in e;
}
function uy(e) {
  return kl(e) ? /* @__PURE__ */ n(fl, { ...e }) : /* @__PURE__ */ n(yl, { ...e });
}
const $l = "_mark_wlgi8_3", Cl = {
  mark: $l
}, Sl = { met: "✓", unmet: "", failed: "✕" };
function Ia({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Cl.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Sl[e]
    }
  );
}
const Rl = "_marker_br9fi_2", Tl = {
  marker: Rl
}, Ll = {
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
  const r = { "--marker": Ll[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Tl.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Al = "_root_ti0pq_2", El = "_chip_ti0pq_11", xl = "_noCase_ti0pq_23", Ye = {
  root: Al,
  chip: El,
  noCase: xl
};
function Il(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function qa({ connection: e, since: a, lastEventAt: t }) {
  const r = Il(a, t), o = Ea(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${Ye.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ae, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${Ye.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: Ye.noCase, children: La(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${Ye.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ae(r)
  ] });
}
const ql = "_root_11rs7_2", Ml = "_context_11rs7_12", Bl = "_row_11rs7_1", Dl = "_heading_11rs7_25", Pl = "_headingWrap_11rs7_33", Ol = "_chips_11rs7_38", Hl = "_title_11rs7_45", Fl = "_consequence_11rs7_54", jl = "_actionsWrap_11rs7_59", Wl = "_actions_11rs7_59", zl = "_action_11rs7_59", Gl = "_overflowPanel_11rs7_78", Kl = "_measure_11rs7_88", U = {
  root: ql,
  context: Ml,
  row: Bl,
  heading: Dl,
  headingWrap: Pl,
  chips: Ol,
  title: Hl,
  consequence: Fl,
  actionsWrap: jl,
  actions: Wl,
  action: zl,
  overflowPanel: Gl,
  measure: Kl
};
function Ul({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: U.heading, children: [
    /* @__PURE__ */ n("h1", { className: U.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: U.consequence, children: a })
  ] });
}
function mn({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: a }, t));
}
function Vl({ actions: e, collapsed: a, onOverflow: t, disclosure: r }) {
  return a ? t ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: t, children: "···" }) : /* @__PURE__ */ n(v, { variant: "overflow", onClick: r.toggle, expanded: r.open, controls: r.panelId, children: "···" }) : /* @__PURE__ */ n(mn, { actions: e });
}
function Yl({ actions: e, disclosure: a, onEscape: t }) {
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(mn, { actions: e }) });
}
function Jl(e, a) {
  const t = $(), [r, o] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function Xl({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: U.context, children: [
    /* @__PURE__ */ n(kr, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: U.chips, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] });
}
function Ql(...e) {
  return e.some((a) => a === null);
}
function Zl(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function eo(e, a, t, r, o) {
  if (o === 0 || Ql(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = Zl(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function ao(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function no(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = p(!1);
  return T(() => {
    const s = a.current;
    if (!ao(s)) return;
    const u = () => c(eo(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function to({ connection: e }) {
  return e ? /* @__PURE__ */ n(qa, { connection: e.connection, since: e.since }) : null;
}
function my({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], connection: i, onOverflow: c, density: s = "page" }) {
  const { rowRef: u, headingRef: d, actionsRef: m, measureRef: _, collapsed: b } = no(o), { disclosure: B, close: X } = Jl(b, m);
  return /* @__PURE__ */ l("header", { className: U.root, "data-density": s, children: [
    /* @__PURE__ */ n(Xl, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: U.row, ref: u, children: [
      /* @__PURE__ */ n("div", { ref: d, className: U.headingWrap, children: /* @__PURE__ */ n(Ul, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(to, { connection: i }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: m, "data-ward-actions": !0, children: /* @__PURE__ */ n(Vl, { actions: o, collapsed: b, onOverflow: c, disclosure: B }) })
      ] })
    ] }),
    b && !c ? /* @__PURE__ */ n(Yl, { actions: o, disclosure: B, onEscape: X }) : null,
    /* @__PURE__ */ n("div", { className: U.measure, ref: _, "aria-hidden": "true", children: o.map((Q, ne) => /* @__PURE__ */ n("span", { children: Q }, ne)) })
  ] });
}
function hn(e) {
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
const ro = "_scrim_c7sqj_2", lo = "_drawer_c7sqj_10", oo = "_sheet_c7sqj_14", io = "_modal_c7sqj_18", co = "_panel_c7sqj_23", so = "_header_c7sqj_51", uo = "_title_c7sqj_59", mo = "_body_c7sqj_63", ho = "_close_c7sqj_90", ve = {
  scrim: ro,
  drawer: lo,
  sheet: oo,
  modal: io,
  panel: co,
  header: so,
  title: uo,
  body: mo,
  close: ho
}, wo = da(null), na = [], ta = /* @__PURE__ */ new Map();
function _o(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function vo(e, a) {
  let t = ta.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ta.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function fo(e, a) {
  for (const t of Array.from(a.children))
    _o(t) || vo(e, t);
}
function bo(e) {
  for (const a of e.claims) {
    const t = ta.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ta.delete(a)));
  }
}
function go(e, a) {
  const t = { root: e, claims: [] };
  return na.push(t), fo(t, a), t;
}
function po(e) {
  const a = na.indexOf(e);
  a >= 0 && na.splice(a, 1), bo(e);
}
function Ka(e) {
  return e !== null && na.at(-1) === e;
}
function No(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, T(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = go(i, a);
    return r.current = s, () => {
      var d, m;
      const u = Ka(s);
      po(s), r.current = null, u && ((m = (d = o.current ?? c) == null ? void 0 : d.focus) == null || m.call(d));
    };
  }, [a]), z(() => Ka(r.current), []);
}
function yo(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function ko(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function $o({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ve.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(O, { children: [
    /* @__PURE__ */ n("header", { className: `${ve.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ve.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ve.body} ward-drawer-body`, children: e.children })
  ] });
}
function Co(e) {
  return `${ve.scrim} ${ve[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function So(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ve.panel} ${ve[e]} ward-overlay-panel${t}${r}`;
}
function Ro(e) {
  const a = sa(wo);
  return e ?? a ?? document.body;
}
function Ue(e) {
  const a = N(null), t = N(null), r = $(), o = Ro(e.container), i = hn("(min-width: 768px)"), c = yo(e.kind, i), s = ko(e, r), u = tt(t), d = No(a, o, e.returnFocusTo), m = z(() => {
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
  }, [m]), Jn(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Co(c),
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
            className: So(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ve.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n($o, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const To = "_root_drrhx_2", Lo = "_ticket_drrhx_15", Ao = "_body_drrhx_24", va = {
  root: To,
  ticket: Lo,
  body: Ao
};
function hy({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${va.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${va.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: va.body, children: t })
  ] });
}
const Eo = "_root_1bfqw_2", xo = "_figure_1bfqw_7", Io = "_of_1bfqw_13", qo = "_bar_1bfqw_18", Mo = "_rows_1bfqw_38", Bo = "_row_1bfqw_38", Do = "_label_1bfqw_49", Po = "_amount_1bfqw_54", pe = {
  root: Eo,
  figure: xo,
  of: Io,
  bar: qo,
  rows: Mo,
  row: Bo,
  label: Do,
  amount: Po
};
function Oo({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${pe.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${pe.figure} ward-stat-value`, children: [
      Y(e),
      " ",
      /* @__PURE__ */ l("span", { className: pe.of, children: [
        "of ",
        Y(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${pe.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${Y(e)} of ${Y(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: pe.rows, children: t.map((o) => /* @__PURE__ */ l("li", { className: `${pe.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: pe.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: pe.amount, children: Y(o.amount) })
    ] }, o.label)) })
  ] });
}
const Ho = "_frame_mg2jl_2", Fo = "_table_mg2jl_6", jo = "_th_mg2jl_12", Wo = "_td_mg2jl_13", zo = "_sort_mg2jl_47", Go = "_row_mg2jl_53", Ko = "_empty_mg2jl_61", Ne = {
  frame: Ho,
  table: Fo,
  th: jo,
  td: Wo,
  sort: zo,
  row: Go,
  empty: Ko
}, Uo = { asc: "ascending", desc: "descending" };
function Vo(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Uo[a.direction];
}
function Yo(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Ne.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Jo(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Xo({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Ne.th,
      style: Jo(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Vo(e, a),
      children: Yo(e, t)
    }
  );
}
function Qo({ row: e, props: a }) {
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
function Zo({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Ne.head, children: a.map((m) => /* @__PURE__ */ n(Xo, { column: m, sort: s, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((m) => /* @__PURE__ */ n(Qo, { row: m, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(m))) })
  ] }) });
}
const ei = "_set_y5zy3_2", ai = "_legend_y5zy3_7", ni = "_row_y5zy3_15", ti = "_control_y5zy3_20", ri = "_input_y5zy3_26", li = "_label_y5zy3_31", oi = "_consequence_y5zy3_36", $e = {
  set: ei,
  legend: ai,
  row: ni,
  control: ti,
  input: ri,
  label: li,
  consequence: oi
};
function wn({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
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
const ii = "_root_1h1ot_2", ci = "_head_1h1ot_11", si = "_index_1h1ot_25", di = "_dot_1h1ot_29", ui = "_note_1h1ot_34", mi = "_counter_1h1ot_40", hi = "_trailing_1h1ot_48", Se = {
  root: ii,
  head: ci,
  index: si,
  dot: di,
  note: ui,
  counter: mi,
  trailing: hi
};
function wi({ index: e }) {
  return e ? /* @__PURE__ */ l(O, { children: [
    /* @__PURE__ */ n("span", { className: `${Se.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Se.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function _i({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Se.counter, "aria-hidden": "true", children: e }) : null;
}
function vi({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Se.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Se.head, children: [
      /* @__PURE__ */ n(wi, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Se.note, children: t }),
    /* @__PURE__ */ n(_i, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Se.trailing, children: i })
  ] });
}
const fi = "_strip_1qhvo_2", bi = "_cell_1qhvo_7", gi = "_value_1qhvo_12", pi = "_label_1qhvo_27", Je = {
  strip: fi,
  cell: bi,
  value: gi,
  label: pi
};
function Ni(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function ma({ cells: e, divided: a = !1 }) {
  return Ni(e), /* @__PURE__ */ n("dl", { className: `${Je.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Je.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Je.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Je.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const yi = "_root_xk7sv_2", ki = "_track_xk7sv_8", $i = "_thumb_xk7sv_35", Ci = "_labelHidden_xk7sv_53", Si = "_label_xk7sv_53", Ri = "_lockedNote_xk7sv_68", Re = {
  root: yi,
  track: ki,
  thumb: $i,
  labelHidden: Ci,
  label: Si,
  lockedNote: Ri
};
function Ti(e) {
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
    /* @__PURE__ */ l("span", { id: s, className: Ti(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Re.lockedNote, children: "always on" })
    ] })
  ] });
}
const Li = "_bar_1u2kl_2", Ai = "_skip_1u2kl_11", Ei = "_mark_1u2kl_22", xi = "_nav_1u2kl_30", Ii = "_list_1u2kl_34", qi = "_select_1u2kl_40", Mi = "_dest_1u2kl_47", Bi = "_actor_1u2kl_61", Di = "_actorMark_1u2kl_74", Pi = "_actorLabel_1u2kl_79", Oi = "_tagline_1u2kl_98", re = {
  bar: Li,
  skip: Ai,
  mark: Ei,
  nav: xi,
  list: Ii,
  select: qi,
  dest: Mi,
  actor: Bi,
  actorMark: Di,
  actorLabel: Pi,
  tagline: Oi
};
function Hi(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Fi(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function wy({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = Fi(r);
  return /* @__PURE__ */ l("header", { className: re.bar, children: [
    /* @__PURE__ */ n("a", { className: re.skip, href: `#${c}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: re.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: re.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: re.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: re.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: re.dest,
          href: u.href,
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        "select",
        {
          className: re.select,
          "aria-label": "Destination",
          value: t,
          onChange: (u) => i == null ? void 0 : i(u.target.value),
          children: a.map((u) => /* @__PURE__ */ n("option", { value: u.id, children: u.label }, u.id))
        }
      )
    ] }),
    s && /* @__PURE__ */ l("span", { className: re.actor, children: [
      /* @__PURE__ */ n("span", { className: re.actorLabel, children: s }),
      /* @__PURE__ */ n("span", { className: re.actorMark, "aria-hidden": "true", children: Hi(s) })
    ] })
  ] });
}
const ji = "_tree_1lyby_2", Wi = "_item_1lyby_6", zi = "_row_1lyby_10", Gi = "_button_1lyby_22", ra = {
  tree: ji,
  item: Wi,
  row: zi,
  button: Gi
}, _n = da(null);
function Ki({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ua({ orientation: "vertical" });
  return /* @__PURE__ */ n(_n.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ra.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const Ui = { ArrowRight: !0, ArrowLeft: !1 };
function Ua(e) {
  return e ? !0 : void 0;
}
function Vi(e, a) {
  const t = Ui[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Yi(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function Ji(e) {
  const a = [ra.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Xi(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Qi(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Zi(e) {
  return typeof e == "string" ? e : void 0;
}
function ec({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function ac({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function vn(e) {
  const a = sa(_n);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = Xi(e);
  return /* @__PURE__ */ l("li", { className: ra.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Ji(e),
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
            onClick: () => Yi(e),
            onKeyDown: (r) => Vi(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Qi(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Zi(e.label), children: e.label }),
              /* @__PURE__ */ n(ec, { value: e.detail }),
              /* @__PURE__ */ n(ac, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const nc = "_frame_9lntd_2", tc = "_subjectRail_9lntd_21", rc = "_subject_9lntd_21", lc = "_rail_9lntd_41", oc = "_record_9lntd_63", ic = "_recordBody_9lntd_68", cc = "_band_9lntd_111", sc = "_bandBody_9lntd_120", dc = "_bandActions_9lntd_125", uc = "_scroller_9lntd_132", mc = "_lanes_9lntd_150", ie = {
  frame: nc,
  subjectRail: tc,
  subject: rc,
  rail: lc,
  record: oc,
  recordBody: ic,
  band: cc,
  bandBody: sc,
  bandActions: dc,
  scroller: uc,
  lanes: mc
};
function _y({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: ie.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function Va(e) {
  return e ? "true" : void 0;
}
function vy({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ie.subjectRail, "data-ward-subject-rail": t, "data-ruled": Va(i), children: [
    /* @__PURE__ */ n("div", { className: ie.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ie.rail, "data-sticky": Va(o), "aria-label": r, children: a })
  ] });
}
function fy({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: ie.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(vi, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: ie.recordBody, "data-pad": o, children: a })
  ] });
}
function by({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: ie.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ie.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: ie.bandActions, children: a })
  ] });
}
const hc = "(max-width: 767.98px)";
function ka({ label: e, children: a }) {
  return /* @__PURE__ */ n("div", { className: ie.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", children: a });
}
function wc({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = p(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: ie.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(M, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(ka, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function gy({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = hn(hc);
  return t === void 0 ? /* @__PURE__ */ n(ka, { label: a, children: e }) : o ? /* @__PURE__ */ n(wc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(ka, { label: a, children: t.map((i) => /* @__PURE__ */ n(Yn, { children: i.content }, i.id)) });
}
const _c = "_block_1o5o7_2", vc = "_sentence_1o5o7_15", fc = "_meta_1o5o7_20", bc = "_action_1o5o7_25", gc = "_strip_1o5o7_29", pc = "_loading_1o5o7_48", Nc = "_label_1o5o7_56", yc = "_counter_1o5o7_63", se = {
  block: _c,
  sentence: vc,
  meta: fc,
  action: bc,
  strip: gc,
  loading: pc,
  label: Nc,
  counter: yc
};
function kc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: se.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function ha({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${se.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: se.sentence, children: e }),
    t,
    /* @__PURE__ */ n(kc, { action: a })
  ] });
}
function $c(e) {
  return /* @__PURE__ */ n(ha, { ...e });
}
function py({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ha, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: se.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function Ny(e) {
  return /* @__PURE__ */ n(ha, { ...e });
}
function yy({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ha, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: se.meta, children: [
    "failed at ",
    ae(a)
  ] }) });
}
function ky({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: se.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ae(e),
    " — showing snapshot from ",
    ae(a)
  ] });
}
function $y({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: se.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    ae(a)
  ] });
}
function Cy({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  T(() => {
    const c = window.setTimeout(() => o(!0), ce.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Ea(t.current, r);
  return /* @__PURE__ */ l("div", { className: `${se.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: se.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: se.counter, children: La(i) }) : null
  ] });
}
const Cc = "_note_tlubt_2", Sc = {
  note: Cc
};
function Rc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: Sc.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const Tc = "_card_12in3_2", Lc = "_hit_12in3_23", Ac = "_head_12in3_30", Ec = "_title_12in3_36", xc = "_meta_12in3_44", Ic = "_fields_12in3_45", qc = "_who_12in3_58", Mc = "_sep_12in3_65", Bc = "_mono_12in3_69", Dc = "_field_12in3_45", Pc = "_last_12in3_84", Oc = "_reason_12in3_96", G = {
  card: Tc,
  hit: Lc,
  head: Ac,
  title: Ec,
  meta: xc,
  fields: Ic,
  who: qc,
  sep: Mc,
  mono: Bc,
  field: Dc,
  last: Pc,
  reason: Oc
}, Hc = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Fc(e, a, t) {
  const r = Xe(e, "blue"), o = Xe(e, "orange"), i = Xe(e, "green"), c = N(/* @__PURE__ */ new Set());
  T(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = Hc[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const jc = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : Y(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Wc(e, a) {
  return jc[a](e);
}
function zc({ item: e, connection: a }) {
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
      ee(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Gc({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: G.head, children: [
    e.flagged && /* @__PURE__ */ n(h, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Kc({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: G.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Uc({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: G.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: G.field, children: Wc(e, t) }, t)) });
}
const $a = (e) => e ? !0 : void 0;
function Vc(e) {
  return { "--stream": `var(--ward-stream-${e.streamStep}-id)` };
}
function Yc(e, a, t) {
  e == null || e(a, t);
}
function Jc(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Xc({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: G.last, "data-stale": $a(a), children: t }) : null;
}
function wa(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  Fc(r, t.key, e.feed);
  const o = Jc(e.feed), i = Vc(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: G.hit, onClick: (c) => Yc(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Gc, { item: t }),
        /* @__PURE__ */ n("p", { className: G.title, children: t.title }),
        /* @__PURE__ */ n(zc, { item: t, connection: o }),
        /* @__PURE__ */ n(Kc, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Uc, { item: t, fields: a }),
        /* @__PURE__ */ n(Xc, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const Qc = "_column_14784_3", Zc = "_head_14784_24", es = "_label_14784_33", as = "_count_14784_42", ns = "_list_14784_56", je = {
  column: Qc,
  head: Zc,
  label: es,
  count: as,
  list: ns
};
function fn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function ts({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: je.head, children: [
    /* @__PURE__ */ n("h2", { className: je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function rs(e) {
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
function ls({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = $(), m = e.cap !== void 0 && a.length > e.cap, _ = fn(a, r);
  return /* @__PURE__ */ l("section", { className: je.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(ts, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(rs, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    m && /* @__PURE__ */ n(Rc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const os = "_foot_8qg4p_2", is = "_note_8qg4p_13", cs = "_link_8qg4p_19", fa = {
  foot: os,
  note: is,
  link: cs
};
function Sy({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: fa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: fa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: fa.link, href: e, children: "Configure board" })
  ] });
}
const ss = "_head_1la6p_3", ds = "_identity_1la6p_12", us = "_titleRow_1la6p_18", ms = "_title_1la6p_18", hs = "_key_1la6p_35", ws = "_rollup_1la6p_45", _s = "_tools_1la6p_53", vs = "_swatch_1la6p_62", fs = "_mark_1la6p_69", he = {
  head: ss,
  identity: ds,
  titleRow: us,
  title: ms,
  key: hs,
  rollup: ws,
  tools: _s,
  swatch: vs,
  mark: fs
}, Ya = "initials:";
function bs(e) {
  return e === void 0 ? "loaded this week unavailable" : `${J(e)} loaded this week`;
}
function gs(e) {
  const a = [`${J(e.inFlight)} in flight`, bs(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${J(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ee(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ee(e.p90)}`), a.join(" · ");
}
function ps(e) {
  return e.startsWith(Ya) ? e.slice(Ya.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Ns({ markRef: e, streamStep: a }) {
  const t = { "--stream": `var(--ward-stream-${a}-id)` };
  return e ? /* @__PURE__ */ n("span", { className: `${he.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: ps(e) }) : /* @__PURE__ */ n("span", { className: he.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function ys({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Ry({
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
        /* @__PURE__ */ n(Ns, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: he.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: he.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: he.rollup, "aria-live": "polite", children: gs(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: he.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(ys, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(qa, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const ks = "_head_kabyh_11", $s = "_line_kabyh_12", Cs = "_cHandle_kabyh_33", Ss = "_cName_kabyh_38", Rs = "_nameLine_kabyh_46", Ts = "_cLabel_kabyh_53", Ls = "_cCap_kabyh_58", As = "_cShown_kabyh_63", Es = "_name_kabyh_46", xs = "_noCap_kabyh_85", Is = "_state_kabyh_99", qs = "_handle_kabyh_104", Ms = "_sub_kabyh_118", A = {
  head: ks,
  line: $s,
  cHandle: Cs,
  cName: Ss,
  nameLine: Rs,
  cLabel: Ts,
  cCap: Ls,
  cShown: As,
  name: Es,
  noCap: xs,
  state: Is,
  handle: qs,
  sub: Ms
}, Bs = "can't be hidden or collapsed", Ds = "terminal · counted, not a column";
function Ty() {
  return /* @__PURE__ */ l("div", { className: A.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: A.cHandle }),
    /* @__PURE__ */ n("span", { className: A.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: A.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: A.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: A.cShown, children: "Shown" })
  ] });
}
function Ps(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Os(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Ja(e) {
  return e.gate ? Bs : e.terminal ? Ds : Os(e.agentsMounted);
}
function Hs(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Fs({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: A.cName, children: [
    /* @__PURE__ */ l("span", { className: A.nameLine, children: [
      /* @__PURE__ */ n("span", { className: A.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    Ja(e) && /* @__PURE__ */ n("span", { className: A.sub, children: Ja(e) })
  ] });
}
function js(e) {
  return e === void 0 ? "" : String(e);
}
function Ws(e) {
  return e === "" ? void 0 : Number(e);
}
function zs({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: A.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: A.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Hs(t, a),
      children: "⠿"
    }
  ) });
}
function Gs({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${A.cCap} ${A.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: A.cCap, children: /* @__PURE__ */ n(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: js(a.cap), onChange: (r) => t({ ...a, cap: Ws(r) }) }) });
}
function Ks({ stage: e, config: a, onChange: t }) {
  const r = Ps(e, a.shown);
  return /* @__PURE__ */ l("span", { className: A.cShown, children: [
    /* @__PURE__ */ n(Le, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: A.state, "aria-hidden": "true", children: r.state })
  ] });
}
function Us(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function Ly({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: A.line, "data-kind": Us(e), children: [
    /* @__PURE__ */ n(zs, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Fs, { stage: e }),
    /* @__PURE__ */ n("span", { className: A.cLabel, children: /* @__PURE__ */ n(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(Gs, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Ks, { stage: e, config: a, onChange: t })
  ] });
}
const Vs = "_body_hn6d6_2", Ys = "_head_hn6d6_9", Js = "_summary_hn6d6_19", Xs = "_block_hn6d6_20", Qs = "_actionsBlock_hn6d6_21", Zs = "_title_hn6d6_41", ed = "_note_hn6d6_46", ad = "_k_hn6d6_51", nd = "_kv_hn6d6_58", td = "_row_hn6d6_64", rd = "_label_hn6d6_75", ld = "_value_hn6d6_84", od = "_quote_hn6d6_90", id = "_actions_hn6d6_21", cd = "_resolve_hn6d6_103", E = {
  body: Vs,
  head: Ys,
  summary: Js,
  block: Xs,
  actionsBlock: Qs,
  title: Zs,
  note: ed,
  k: ad,
  kv: nd,
  row: td,
  label: rd,
  value: ld,
  quote: od,
  actions: id,
  resolve: cd
};
function sd(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function dd(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function ud(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(h, { role: "stream", label: `STEP ${e.streamStep}`, streamStep: e.streamStep }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ee(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...sd(e),
    ...dd(e, a)
  ];
}
function md({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: E.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: E.k, children: a }),
    e
  ] });
}
function hd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: E.head, children: [
    /* @__PURE__ */ n(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function wd({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: E.block, children: [
    /* @__PURE__ */ n("p", { className: E.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: E.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: E.note, children: e.agentMeta })
  ] }) : null;
}
function Ay({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = $(), d = ud(e, o);
  return /* @__PURE__ */ n(Ue, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: E.body, children: [
    /* @__PURE__ */ n(hd, { item: e }),
    /* @__PURE__ */ l("div", { className: E.summary, children: [
      /* @__PURE__ */ n("h2", { className: E.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: E.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: E.kv, children: d.map(([m, _]) => /* @__PURE__ */ l("div", { className: E.row, children: [
      /* @__PURE__ */ n("dt", { className: E.label, children: m }),
      /* @__PURE__ */ n("dd", { className: E.value, children: _ })
    ] }, m)) }),
    /* @__PURE__ */ n(wd, { item: e }),
    /* @__PURE__ */ l("div", { className: E.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: E.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: E.note, children: s })
    ] }),
    /* @__PURE__ */ n(md, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const _d = "_root_3azmy_2", vd = "_list_3azmy_7", fd = "_item_3azmy_12", bd = "_box_3azmy_18", gd = "_text_3azmy_23", pd = "_note_3azmy_28", Me = {
  root: _d,
  list: vd,
  item: fd,
  box: bd,
  text: gd,
  note: pd
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
const Nd = "_rail_ke7ch_2", yd = "_k_ke7ch_11", kd = "_head_ke7ch_19", $d = "_section_ke7ch_25", Cd = "_card_ke7ch_38", Sd = "_strip_ke7ch_42", Rd = "_skeleton_ke7ch_56", Td = "_skeletonLabel_ke7ch_70", Ld = "_bar_ke7ch_76", Ad = "_note_ke7ch_85", oe = {
  rail: Nd,
  k: yd,
  head: kd,
  section: $d,
  card: Cd,
  strip: Sd,
  skeleton: Rd,
  skeletonLabel: Td,
  bar: Ld,
  note: Ad
};
function Ed(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ba({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: oe.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: oe.k, children: e }),
    a
  ] });
}
function xd({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: oe.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: oe.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: oe.bar, "aria-hidden": "true" }, r))
  ] });
}
function Id({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(ls, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function qd(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Id, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(xd, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function Ey(e) {
  const a = Ed(e.onOpen), t = fn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: oe.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${oe.k} ${oe.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(ba, { title: "Card", children: /* @__PURE__ */ n("div", { className: oe.card, children: t && /* @__PURE__ */ n(wa, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(ba, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: oe.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(qd, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: oe.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(ba, { title: "Effect of this config", children: /* @__PURE__ */ n(_a, { items: e.effects, density: "compact" }) })
  ] });
}
function Md(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Bd(e) {
  return Math.ceil(e.length / 2);
}
function Dd(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function bn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Pd(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = bn(e);
  o !== void 0 && t(o), r(Dd(e.type));
}
function Od(e, a, t, r, o) {
  T(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Pd(i, t, r, o));
  }, [e, a, t, r, o]);
}
function Hd(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Fd(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function jd(e, a) {
  return a !== void 0 ? ee(e.timeInStage) + " · waits on " + a.agent : ee(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Wd(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + H.height.card + " + " + H.height.cardRow + " * " + String(Bd(a ?? [])) + ")"
  };
}
function zd(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Gd(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(h, { role: "meta", label: Y(e.cost) }) : null;
}
function Kd(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(h, { role: "meta", label: e.jiraKey }) : null;
}
function Ud(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Vd(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Yd(e, a) {
  return a === void 0 ? e : Md(e, a.ref);
}
function Jd(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ze(e) {
  return e === !0 ? "true" : void 0;
}
function gn(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = Xe(o), c = N(/* @__PURE__ */ new Set()), [s, u] = p(Hd(a));
  Od(e.feed, a.key, c, u, i);
  const d = Fd(a, r), m = jd(a, t), _ = Wd(a, e.fields), b = Vd(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...Jd(e),
      className: "ward-workcard",
      "data-flagged": ze(a.flagged),
      "data-selected": ze(e.selected),
      style: _,
      ref: Yd(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        zd(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(h, { role: d.role, label: d.label }),
          Gd(a, e.fields),
          Kd(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Ud(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Xd({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function Qd(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Zd(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function eu(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Xd, { count: e.items.length, cap: e.column.cap });
}
function au(e, a) {
  return e.roving ?? a;
}
function nu(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function tu(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    gn,
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
function ru(e) {
  const a = $(), t = ua({ orientation: "vertical" }), r = au(e, t), o = Qd(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ze(o), "data-gate": ze(e.column.gate), children: [
    Zd(e.column, e.items.length, a),
    eu(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...nu(e, t), children: tu(e, r) })
  ] });
}
function lu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ee(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ee(e.p90)), a;
}
function ou(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function iu(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function xy(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: lu(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      ou(e),
      iu(e.onConfigure),
      /* @__PURE__ */ n(qa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function cu(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function su(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Le, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Le, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function du(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(O, { children: [
    a > 0 ? /* @__PURE__ */ n(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(h, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function Iy(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": ze(cu(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: su(e) }),
    /* @__PURE__ */ n(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(dn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    du(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function qy(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(gn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(ru, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function uu(e, a) {
  const t = bn(e);
  t !== void 0 && a(t);
}
function mu(e, a, t) {
  T(() => {
    if (e != null)
      return e.subscribe(a, (r) => uu(r, t));
  }, [e, a, t]);
}
function hu(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function wu(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ee(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", Y(e.cost)]), a;
}
function _u(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function vu(e, a) {
  return /* @__PURE__ */ l(O, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function My(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = p((c = a.run) == null ? void 0 : c.lastStep);
  mu(e.feed, a.key, o);
  const i = [...hu(a), ...wu(a)];
  return /* @__PURE__ */ l(Ue, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      _u(t, r)
    ] }),
    vu(a, e.actions)
  ] });
}
const fu = "_card_pioxl_2", bu = "_head_pioxl_17", gu = "_mark_pioxl_25", pu = "_name_pioxl_37", Nu = "_chips_pioxl_48", yu = "_description_pioxl_54", ku = "_run_pioxl_59", $u = "_sep_pioxl_68", fe = {
  card: fu,
  head: bu,
  mark: gu,
  name: pu,
  chips: Nu,
  description: yu,
  run: ku,
  sep: $u
}, Cu = { live: "done", draft: "running", paused: "meta" };
function Su(e) {
  return e === void 0 ? fe.card : `${fe.card} ${e}`;
}
function Ru({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: fe.chips, children: e.map((a) => /* @__PURE__ */ n(h, { role: Cu[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function Tu({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.description, children: e });
}
function Lu({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: fe.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: fe.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Au(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Eu({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, className: i }) {
  const c = { "--stream": `var(--ward-stream-${e.streamStep}-id)` }, s = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": s,
      className: Su(i),
      style: c,
      "data-selected": s,
      "data-paused": Au(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: fe.head, children: [
          /* @__PURE__ */ n("span", { className: fe.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${fe.name} ward-rowlink`, href: a, "aria-current": s, children: e.name })
        ] }),
        /* @__PURE__ */ n(Tu, { description: e.description }),
        /* @__PURE__ */ n(Lu, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Ru, { versions: e.versions })
      ]
    }
  );
}
const xu = "_ladder_v5484_2", Iu = "_cell_v5484_7", qu = "_empty_v5484_26", Mu = "_name_v5484_34", Bu = "_holder_v5484_40", Du = "_request_v5484_46", Pu = "_swatches_v5484_51", Ou = "_swatch_v5484_51", Z = {
  ladder: xu,
  cell: Iu,
  empty: qu,
  name: Mu,
  holder: Bu,
  request: Du,
  swatches: Pu,
  swatch: Ou
}, Hu = "not validated — needs CVD matrix and dark stepping";
function Fu(e) {
  return e.reserved ? "reserved" : Aa(e.step) ? "validated" : "partial";
}
function ju(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Xa(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Wu({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ae, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${Z.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
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
function zu({ step: e, value: a, taken: t, onChange: r, swatch: o }) {
  const i = Fu(e), c = ju(i, t), s = c !== "free", u = e.name ?? `Step ${e.step}`, d = () => {
    s || r(e.step);
  }, m = `${u} — ${c}`;
  return o ? /* @__PURE__ */ n("span", { role: "radio", "aria-label": m, title: m, ...Za(s, a === e.step), className: `${Z.swatch} ward-ladder-cell`, "data-validation": i, style: Xa(e, i), onClick: d, onKeyDown: (_) => Qa(_, d) }) : /* @__PURE__ */ l(
    "span",
    {
      role: "radio",
      "aria-label": m,
      ...Za(s, a === e.step),
      className: `${Z.cell} ward-ladder-cell`,
      "data-validation": i,
      style: Xa(e, i),
      onClick: d,
      onKeyDown: (_) => Qa(_, d),
      children: [
        /* @__PURE__ */ n(Wu, { validation: i }),
        /* @__PURE__ */ n("span", { className: `${Z.name} ward-ladder-name`, children: u }),
        /* @__PURE__ */ n("span", { className: `${Z.holder} ward-ladder-holder`, children: c })
      ]
    }
  );
}
function Gu(e) {
  for (const a of e)
    if (!a.reserved && !Ke(a.step)) throw new Error("colour ladder renders token steps only");
}
function Ku() {
  return /* @__PURE__ */ l("div", { className: `${Z.cell} ward-ladder-cell ${Z.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${Z.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${Z.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${Z.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Uu(e) {
  return "presentation" in e && e.presentation === "swatches";
}
function pn(e) {
  const a = e.takenBy ?? {}, t = (o) => {
    var i;
    (i = e.onChange) == null || i.call(e, o);
  };
  Gu(e.steps);
  const r = Uu(e);
  return /* @__PURE__ */ l("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${r ? Z.swatches : Z.ladder} ward-ladder`, children: [
    e.steps.map((o) => /* @__PURE__ */ n(zu, { step: o, value: e.value, taken: a[o.step], onChange: t, swatch: r }, o.step)),
    r ? null : /* @__PURE__ */ n(Ku, {})
  ] });
}
const Vu = "_rail_1el2t_2", Yu = "_section_1el2t_12", Ju = "_sectionFlush_1el2t_22", Xu = "_head_1el2t_26", Qu = "_headLabel_1el2t_34", Zu = "_sample_1el2t_42", em = "_sampleLabel_1el2t_47", am = "_sampleTitle_1el2t_54", nm = "_sampleMeta_1el2t_59", tm = "_trace_1el2t_65", rm = "_traceHead_1el2t_70", lm = "_steps_1el2t_78", om = "_step_1el2t_78", im = "_stepTitle_1el2t_97", cm = "_hollow_1el2t_107", sm = "_stepBody_1el2t_115", dm = "_stepDetail_1el2t_127", um = "_publish_1el2t_132", mm = "_reason_1el2t_138", hm = "_note_1el2t_143", wm = "_reveal_1el2t_148", g = {
  rail: Vu,
  section: Yu,
  sectionFlush: Ju,
  head: Xu,
  headLabel: Qu,
  sample: Zu,
  sampleLabel: em,
  sampleTitle: am,
  sampleMeta: nm,
  trace: tm,
  traceHead: rm,
  steps: lm,
  step: om,
  stepTitle: im,
  hollow: cm,
  stepBody: sm,
  stepDetail: dm,
  publish: um,
  reason: mm,
  note: hm,
  reveal: wm
}, en = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, _m = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, vm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, fm = { notSimulated: "not simulated", running: "running" };
function bm(e) {
  return e.presentation === "foundry";
}
function gm(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function pm(e, a) {
  var r;
  const t = _m[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function Nm(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function ym(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function km(e) {
  if (Nm(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function $m(e) {
  const [a, t] = p(!1);
  T(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${g.step} ${g.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Cm(e) {
  const a = fm[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: g.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ae, { size: 6, kind: vm[e.kind], label: e.kind });
}
function Sm(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: g.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Rm(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Tm(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l($m, { kind: a.kind, children: [
    /* @__PURE__ */ n(Cm, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: g.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: g.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Sm, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Rm, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Lm(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ee(a)), t.join(" · ");
}
function Nn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${g.trace} ${g.section}`, children: [
    /* @__PURE__ */ n("p", { className: g.traceHead, id: a, children: Lm(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: g.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Tm, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Am(e) {
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
function Em(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ae(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${g.sampleMeta} ${g.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function xm(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : Y(e.run.cost), label: "Cost" }, { value: e.run.turns ? cn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: g.sectionFlush, children: /* @__PURE__ */ n(ma, { divided: !0, cells: a }) });
}
function Im(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: Y(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: cn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function qm(e) {
  const a = Im(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: g.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: g.sectionFlush, children: /* @__PURE__ */ n(ma, { divided: !0, cells: a }) });
}
function yn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ l(O, { children: [
    /* @__PURE__ */ n("p", { className: `${g.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Mm(e) {
  return /* @__PURE__ */ l("div", { className: `${g.publish} ${g.section}`, children: [
    /* @__PURE__ */ n(yn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: g.note, children: e.note })
  ] });
}
function Bm(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${g.publish} ${g.section}`, children: /* @__PURE__ */ n(yn, { reason: e.reason, onPublish: e.onPublish }) });
}
function kn(e) {
  return /* @__PURE__ */ l("div", { className: `${g.head} ${g.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: g.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(h, { role: en[e.run.status].role, label: en[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Dm(e, a) {
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
function Pm(e) {
  var t;
  ym(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${g.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(kn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Am, { sample: e.run.sample }),
    /* @__PURE__ */ n(Nn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(xm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: g.section, children: /* @__PURE__ */ n(_a, { items: e.checklist }) }),
    /* @__PURE__ */ n(Mm, { reason: gm(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Om(e) {
  var r;
  const a = Dm(e.run, e.feed);
  km(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${g.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(kn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Em, { sample: e.run.sample }),
    /* @__PURE__ */ n(Nn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(qm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: g.section, children: /* @__PURE__ */ n(_a, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Bm, { reason: pm(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function By(e) {
  return bm(e) ? /* @__PURE__ */ n(Om, { ...e }) : /* @__PURE__ */ n(Pm, { ...e });
}
const Hm = "_list_142ip_3", Fm = "_row_142ip_9", jm = "_condition_142ip_18", Wm = "_action_142ip_24", Qe = {
  list: Hm,
  row: Fm,
  condition: jm,
  action: Wm
}, $n = da(!1);
function Dy({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n($n.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: Qe.list, "aria-label": a, children: e }) });
}
function Py({ rule: e }) {
  if (!sa($n)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
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
function Cn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Sn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function an(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function zm(e) {
  return e === "up" ? "down" : "up";
}
function Gm(e, a) {
  const t = an(e, a.id, a.direction) ?? an(e, a.id, zm(a.direction));
  t == null || t.focus();
}
function Rn() {
  const e = N(null), [a, t] = p(null), [r, o] = p("");
  return T(() => {
    e.current !== null && a !== null && Gm(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), o(s);
  } };
}
function Tn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function la({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Km = "_body_1h15q_2", Um = "_title_1h15q_8", Vm = "_section_1h15q_13", Ym = "_legend_1h15q_18", Jm = "_stages_1h15q_26", Xm = "_stage_1h15q_26", Qm = "_stageIndex_1h15q_44", Zm = "_stageName_1h15q_50", eh = "_footer_1h15q_59", ah = "_note_1h15q_66", nh = "_reason_1h15q_71", th = "_actions_1h15q_76", rh = "_webHead_1h15q_83", lh = "_kicker_1h15q_92", oh = "_webTitle_1h15q_99", ih = "_webBody_1h15q_105", ch = "_webSection_1h15q_109", sh = "_sectionHead_1h15q_121", dh = "_sectionNote_1h15q_129", uh = "_formLabel_1h15q_134", mh = "_identityRow_1h15q_139", hh = "_nameCell_1h15q_145", wh = "_keyCell_1h15q_150", _h = "_colourCell_1h15q_154", vh = "_colourStatus_1h15q_161", fh = "_webStages_1h15q_166", bh = "_webStageList_1h15q_172", gh = "_webStage_1h15q_166", ph = "_webIndex_1h15q_191", Nh = "_webStageName_1h15q_196", yh = "_webMoves_1h15q_201", kh = "_addStage_1h15q_215", $h = "_addStageButton_1h15q_223", Ch = "_addStageNote_1h15q_231", Sh = "_webFooter_1h15q_236", Rh = "_webFooterNotes_1h15q_244", Th = "_webNote_1h15q_251", w = {
  body: Km,
  title: Um,
  section: Vm,
  legend: Ym,
  stages: Jm,
  stage: Xm,
  stageIndex: Qm,
  stageName: Zm,
  footer: eh,
  note: ah,
  reason: nh,
  actions: th,
  webHead: rh,
  kicker: lh,
  webTitle: oh,
  webBody: ih,
  webSection: ch,
  sectionHead: sh,
  sectionNote: dh,
  formLabel: uh,
  identityRow: mh,
  nameCell: hh,
  keyCell: wh,
  colourCell: _h,
  colourStatus: vh,
  webStages: fh,
  webStageList: bh,
  webStage: gh,
  webIndex: ph,
  webStageName: Nh,
  webMoves: yh,
  addStage: kh,
  addStageButton: $h,
  addStageNote: Ch,
  webFooter: Sh,
  webFooterNotes: Rh,
  webNote: Th
}, Lh = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
];
function Ln(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Ah(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Eh({ id: e, stage: a, index: t, total: r, onReplace: o, onMove: i }) {
  const c = Ln(a, t), s = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": s ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: `Stage ${t + 1} name`, value: a.name, onChange: (u) => o({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(M, { variant: s ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Lh, onChange: (u) => o({ ...a, kind: u }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(la, { id: e, name: c, direction: "up", onMove: () => i("up") }),
      t < r - 1 && /* @__PURE__ */ n(la, { id: e, name: c, direction: "down", onMove: () => i("down") })
    ] })
  ] });
}
function xh({ stages: e, onChange: a }) {
  const t = Ah(e.length), r = Rn(), o = (c, s) => {
    const u = Cn(c, s);
    t.current = Ca(t.current, c, u), r.moved({ id: t.current[u], direction: s }, Sn(Ln(e[c], c), u, e.length)), a(Ca(e, c, u));
  }, i = (c, s) => a(e.map((u, d) => d === c ? s : u));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: r.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, s) => /* @__PURE__ */ n(Eh, { id: t.current[s], stage: c, index: s, total: e.length, onReplace: (u) => i(s, u), onMove: (u) => o(s, u) }, t.current[s])) }),
    /* @__PURE__ */ n(Tn, { text: r.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Ih = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], qh = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Mh = "A new stream starts as a draft. Nothing runs on it until you publish it.", Bh = "Create is disabled: name the stream and give it a key first.", Dh = "reorder with the ↑ ↓ buttons · min 2";
function Ma(e, a) {
  return !e.reserved && Aa(e.step) && a[e.step] === void 0;
}
function Ph(e, a) {
  const t = e.find((r) => Ma(r, a));
  return t ? t.step : 1;
}
function Oh({ stages: e, onMove: a }) {
  const t = Rn(), r = (o, i) => {
    const c = Cn(o, i);
    t.moved({ id: e[o].id, direction: i }, Sn(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(O, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: w.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(la, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(la, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Tn, { text: t.announcement })
  ] });
}
function Hh({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: Mh }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Fh(e, a) {
  return e !== "" && a !== "" ? null : Bh;
}
function jh(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = qh, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = $(), [m, _] = p(""), [b, B] = p(""), [X, Q] = p(a[0].value), [ne, Ee] = p(() => Ph(t, r)), [te, xe] = p(e.stages ?? Ih), [Ie, k] = p(o[0].value), F = { name: m, key: b, streamStep: ne, owner: X, stages: te, policy: Ie }, de = Fh(m, b);
  return /* @__PURE__ */ n(Ue, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ l("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(M, { kind: "input", label: "Stream name", value: m, onChange: _ }),
      /* @__PURE__ */ n(M, { kind: "input", label: "Key", value: b, onChange: B, mono: !0 }),
      /* @__PURE__ */ n(M, { kind: "select", label: "Owner", value: X, onChange: Q, options: a })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(pn, { label: "Stream colour", steps: t, value: ne, onChange: Ee, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(Oh, { stages: te, onMove: (ke, Un) => xe(Ca(te, ke, Un)) })
    ] }),
    /* @__PURE__ */ n(wn, { legend: "Loop policy", options: o, value: Ie, onChange: k }),
    /* @__PURE__ */ n(Hh, { reason: de, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const An = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Wh = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function zh(e, a, t, r, o, i) {
  var s;
  const c = ((s = An.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function Gh(e, a) {
  return Kh(e) && Uh(e, a) && Vh(e);
}
function Kh(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Uh(e, a) {
  return e.colourStep !== null && Ma({ step: e.colourStep }, a);
}
function Vh(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Yh(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${Hu}.` : Ma({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Jh({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Xh({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Jh, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: Wh })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Qh({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function Zh({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
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
function ew(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [o, i] = p(""), [c, s] = p(""), [u, d] = p(e.owners[0] ?? ""), [m, _] = p(null), [b, B] = p("relay"), [X, Q] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), ne = zh(o, c, u, m, b, X), Ee = Gh(ne, r), te = X.find((k) => k.kind === "agent" && k.name.trim() !== ""), xe = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(pn, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: m, onChange: _, takenBy: r })
  ] }), Ie = /* @__PURE__ */ l(O, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: Yh(m, r) }),
    /* @__PURE__ */ n(M, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map((k) => ({ value: k, label: k })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Ue, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Qh, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(Zh, { name: o, setName: i, streamKey: c, setKey: s, colour: xe, owner: Ie }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: Dh })
        ] }),
        /* @__PURE__ */ n(xh, { stages: X, onChange: Q })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(wn, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: An, onChange: B }) }),
      /* @__PURE__ */ n(Xh, { ready: Ee, draft: ne, agentStage: te, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function Oy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ew, { ...e }) : /* @__PURE__ */ n(jh, { ...e });
}
const aw = "_row_bs8hc_2", nw = "_cell_bs8hc_6", tw = "_condition_bs8hc_11", rw = "_action_bs8hc_18", lw = "_contract_bs8hc_24", ow = "_contractCondition_bs8hc_33", iw = "_contractAction_bs8hc_39", K = {
  row: aw,
  cell: nw,
  condition: tw,
  action: rw,
  contract: lw,
  contractCondition: ow,
  contractAction: iw
}, En = ["advance", "block", "escalate", "requestReview"], nn = {
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
      options: En.map((o) => ({ value: o, label: nn[o] }))
    }
  );
}
function cw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: K.condition, title: oa(e, r), children: oa(e, r) }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: Ba(e, a, t) })
  ] });
}
function sw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ l("td", { className: K.cell, children: [
      /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: K.condition, children: oa(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: K.cell, children: Ba(e, a, t) })
  ] });
}
function dw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: K.contract, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: K.contractCondition, children: oa(e, r) }),
    /* @__PURE__ */ n(h, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: K.contractAction, children: Ba(e, a, t, !0) })
  ] });
}
const uw = { two: sw, four: cw, contract: dw };
function Hy(e) {
  var t;
  if (!En.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = uw[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const mw = "_column_lurgk_2", hw = "_head_lurgk_17", ww = "_index_lurgk_23", _w = "_name_lurgk_29", vw = "_meta_lurgk_38", fw = "_mono_lurgk_43", bw = "_gate_lurgk_50", gw = "_reviewersLabel_lurgk_57", pw = "_reviewers_lurgk_57", Nw = "_reviewer_lurgk_57", yw = "_agents_lurgk_74", kw = "_workflowColumn_lurgk_79", $w = "_workflowHead_lurgk_96", Cw = "_stageRow_lurgk_102", Sw = "_stageLabel_lurgk_109", Rw = "_workflowTitle_lurgk_116", Tw = "_workflowMeta_lurgk_122", Lw = "_workflowGate_lurgk_127", Aw = "_gateNote_lurgk_135", Ew = "_cardNote_lurgk_140", xw = "_reviewerList_lurgk_149", Iw = "_reviewerRow_lurgk_155", qw = "_reviewerMark_lurgk_161", Mw = "_reviewerName_lurgk_171", Bw = "_terminalCard_lurgk_177", Dw = "_terminalCount_lurgk_186", Pw = "_workflowAgents_lurgk_192", Ow = "_mount_lurgk_198", y = {
  column: mw,
  head: hw,
  index: ww,
  name: _w,
  meta: vw,
  mono: fw,
  gate: bw,
  reviewersLabel: gw,
  reviewers: pw,
  reviewer: Nw,
  agents: yw,
  workflowColumn: kw,
  workflowHead: $w,
  stageRow: Cw,
  stageLabel: Sw,
  workflowTitle: Rw,
  workflowMeta: Tw,
  workflowGate: Lw,
  gateNote: Aw,
  cardNote: Ew,
  reviewerList: xw,
  reviewerRow: Iw,
  reviewerMark: qw,
  reviewerName: Mw,
  terminalCard: Bw,
  terminalCount: Dw,
  workflowAgents: Pw,
  mount: Ow
}, Hw = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function xn(e) {
  return `${Math.round(e * 100)}%`;
}
function Fw({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ma, { cells: [
      { value: xn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: J(e.count), label: "In stage" }
    ] })
  ] });
}
function jw({ stage: e }) {
  return /* @__PURE__ */ n(ma, { cells: [
    { value: J(e.count), label: "In stage" },
    { value: J(e.closedThisWeek ?? 0), label: "Closed this week" }
  ] });
}
function Ww({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(h, { role: e.kind === "gate" ? "gate" : "soft", label: Hw[e.kind] })
  ] });
}
function zw({ stage: e }) {
  return /* @__PURE__ */ l("p", { className: y.meta, children: [
    /* @__PURE__ */ l("span", { className: y.mono, children: [
      J(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ l("span", { className: y.mono, children: [
      ee(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Gw({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Fw, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(jw, { stage: e }) : null;
}
function Kw({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Uw({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Ww, { stage: e, titleId: o }),
    /* @__PURE__ */ n(zw, { stage: e }),
    /* @__PURE__ */ n(Gw, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(Eu, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(Kw, { onMount: t })
  ] });
}
const Vw = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function Yw({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, a.initials)) });
}
function Jw({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Yw, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: xn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Xw({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: e.closedThisWeek ?? 0 }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: "items closed this week" })
  ] });
}
function Qw(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Zw(e) {
  if (e.kind === "terminal") return `${e.closedThisWeek ?? 0} this week`;
  const a = Qw(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function e_({ stage: e, titleId: a }) {
  const t = Vw[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(h, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: Zw(e) })
  ] });
}
function a_(e) {
  return e === "entry" || e === "agent";
}
function n_({ stage: e, onMount: a }) {
  return a === void 0 || !a_(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function t_({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(e_, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Jw, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Xw, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(n_, { stage: e, onMount: t })
  ] });
}
function r_(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function Fy(e) {
  return r_(e) ? /* @__PURE__ */ n(t_, { ...e }) : /* @__PURE__ */ n(Uw, { ...e });
}
const l_ = "_row_ve78g_6", o_ = "_cell_ve78g_10", i_ = "_name_ve78g_19", c_ = "_chain_ve78g_26", s_ = "_owner_ve78g_32", d_ = "_mono_ve78g_38", u_ = "_compactRow_ve78g_45", m_ = "_compactCell_ve78g_54", h_ = "_stack_ve78g_71", w_ = "_stat_ve78g_78", __ = "_identityLine_ve78g_85", v_ = "_identity_ve78g_85", f_ = "_compactName_ve78g_103", b_ = "_ownerLine_ve78g_117", g_ = "_link_ve78g_130", p_ = "_emptyChain_ve78g_136", N_ = "_arrow_ve78g_142", y_ = "_muted_ve78g_143", k_ = "_define_ve78g_148", $_ = "_statValue_ve78g_155", C_ = "_policyId_ve78g_161", S_ = "_sub_ve78g_166", f = {
  row: l_,
  cell: o_,
  name: i_,
  chain: c_,
  owner: s_,
  mono: d_,
  compactRow: u_,
  compactCell: m_,
  stack: h_,
  stat: w_,
  identityLine: __,
  identity: v_,
  compactName: f_,
  ownerLine: b_,
  link: g_,
  emptyChain: p_,
  arrow: N_,
  muted: y_,
  define: k_,
  statValue: $_,
  policyId: C_,
  sub: S_
};
function R_(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function T_(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function L_(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${e.members} members`;
}
function A_(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(h, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: L_(e) })
  ] }) });
}
function E_(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(h, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function x_(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : E_(e) });
}
function tn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function I_(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function q_(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function M_({ stream: e, href: a, presentation: t }) {
  const r = T_(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": `var(--ward-stream-${e.streamStep}-chip)` }, children: [
    A_(e, a),
    x_(e.stages, a),
    tn(q_(e.agents), e.agents === void 0 ? void 0 : R_(e.agents), "—"),
    I_(e.policy),
    tn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function B_(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function jy(e) {
  if (B_(e)) return M_(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ l("tr", { className: f.row, children: [
    /* @__PURE__ */ l("td", { className: f.cell, children: [
      /* @__PURE__ */ n("a", { className: f.name, href: t, children: a.name }),
      /* @__PURE__ */ n(h, { role: "stream", label: a.key, streamStep: a.streamStep }),
      a.draft && /* @__PURE__ */ n(h, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, children: /* @__PURE__ */ n("span", { className: f.chain, children: a.stages.map((r) => /* @__PURE__ */ n(h, { role: r.gate ? "gate" : "soft", label: r.name }, r.name)) }) }),
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
        J(a.members),
        " members"
      ] })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: J(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : ee(a.p50) }) })
  ] });
}
const D_ = "_row_1nbe9_2", P_ = "_name_1nbe9_15", O_ = "_scope_1nbe9_25", ia = {
  row: D_,
  name: P_,
  scope: O_
};
function H_(e) {
  return e === void 0 ? `${ia.row} ward-toolrow` : `${ia.row} ward-toolrow ${e}`;
}
function F_(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function j_({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
function W_({ classification: e }) {
  return /* @__PURE__ */ n(h, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function z_({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${ia.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function G_(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Wy({ tool: e, onChange: a, presentation: t }) {
  const r = $(), o = $(), i = F_(e, t), c = G_(t);
  return /* @__PURE__ */ l(c, { className: H_(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(j_, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${ia.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(z_, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(W_, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(h, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const K_ = "_strip_g84q9_2", U_ = "_head_g84q9_10", V_ = "_name_g84q9_16", Y_ = "_chart_g84q9_24", J_ = "_segment_g84q9_30", X_ = "_detailedChart_g84q9_36", be = {
  strip: K_,
  head: U_,
  name: V_,
  chart: Y_,
  segment: J_,
  detailedChart: X_
}, Sa = [1, 2, 3, 4, 5, 6], ca = 100;
function Q_(e, a) {
  return a.has(e) ? `var(--ward-stream-${e}-id, var(--ward-color-line2))` : "var(--ward-color-line)";
}
function Z_({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: be.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Sa.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: be.segment,
      x: o * ca,
      y: "0",
      width: ca,
      height: "8",
      fill: Q_(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function ev(e) {
  return e !== null && Ke(e) ? st(e) : H.color.line2;
}
function av(e) {
  const a = e.slice(0, Sa.length);
  for (; a.length < Sa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function nv({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${be.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ca),
        y: "0",
        width: String(ca),
        height: "40",
        style: { fill: ev(a.streamStep) }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function In(e) {
  return (a) => e == null ? void 0 : e(a);
}
function tv(e) {
  const a = av(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("section", { className: `${be.strip} ward-appearance`, "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(wa, { item: e.sample, onOpen: In(e.onOpen), feed: null }),
    /* @__PURE__ */ l("p", { className: `${be.head} ward-envrow ward-appearance-head`, children: [
      /* @__PURE__ */ n("span", { className: "ward-identity", "aria-hidden": "true" }),
      t.streamStep !== null && Ke(t.streamStep) ? /* @__PURE__ */ n(h, { role: "stream", label: t.key, streamStep: t.streamStep }) : /* @__PURE__ */ n(h, { role: "meta", label: t.key }),
      /* @__PURE__ */ n("span", { className: `${be.name} ward-rowlink`, children: t.name })
    ] }),
    /* @__PURE__ */ n("p", { className: "ward-checklist-note", children: "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on." }),
    /* @__PURE__ */ n(nv, { identities: a })
  ] });
}
function rv({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": `var(--ward-stream-${e.streamStep}-id)` };
  return /* @__PURE__ */ l("section", { className: be.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: be.head, children: [
      /* @__PURE__ */ n(Ae, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: be.name, children: e.name }),
      /* @__PURE__ */ n(h, { role: "stream", label: e.key, streamStep: e.streamStep })
    ] }),
    /* @__PURE__ */ n(wa, { item: { ...a, streamStep: e.streamStep }, onOpen: In(r) }),
    /* @__PURE__ */ n(Z_, { draft: e, streams: t })
  ] });
}
function zy(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(tv, { ...e }) : /* @__PURE__ */ n(rv, { ...e });
}
const lv = "_row_ixlg5_6", ov = "_headCell_ixlg5_10", iv = "_cell_ixlg5_11", cv = "_name_ixlg5_23", sv = "_consequence_ixlg5_29", dv = "_governed_ixlg5_36", uv = "_control_ixlg5_42", mv = "_byRole_ixlg5_48", hv = "_webControl_ixlg5_59", wv = "_webConsequence_ixlg5_65", _v = "_webGoverned_ixlg5_71", I = {
  row: lv,
  headCell: ov,
  cell: iv,
  name: cv,
  consequence: sv,
  governed: dv,
  control: uv,
  byRole: mv,
  webControl: hv,
  webConsequence: wv,
  webGoverned: _v
};
function vv({
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
function fv({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n(vv, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function bv(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function gv({ name: e, cell: a, onChange: t }) {
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
function pv({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: I.row, children: [
    /* @__PURE__ */ l("td", { className: I.cell, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${I.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n(gv, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n("span", { className: `${I.webGoverned} ward-cellmeta`, children: bv(e) }) })
  ] });
}
function Gy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(pv, { ...e }) : /* @__PURE__ */ n(fv, { ...e });
}
const Nv = "_row_vv64h_2", yv = "_cell_vv64h_6", kv = "_name_vv64h_25", $v = "_note_vv64h_30", Cv = "_webName_vv64h_41", Sv = "_webMeta_vv64h_47", W = {
  row: Nv,
  cell: yv,
  name: kv,
  note: $v,
  webName: Cv,
  webMeta: Sv
}, qn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Rv(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Tv({ component: e, onRestart: a }) {
  const t = $(), r = qn[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: W.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: W.cell, "data-mono": "true", children: [
      J(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { id: t, className: W.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: W.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(v, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Lv({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: Rv(e.state) });
}
function Av({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(h, { ...qn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(Lv, { component: e, onRestart: a }) })
  ] });
}
function Ky(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Av, { ...e }) : /* @__PURE__ */ n(Tv, { ...e });
}
const Ev = "_row_1f1gp_7", xv = "_cell_1f1gp_11", Iv = "_next_1f1gp_28", qv = "_headCell_1f1gp_38", Mv = "_webId_1f1gp_77", Bv = "_webPurpose_1f1gp_83", Dv = "_webMeta_1f1gp_91", Pv = "_webUrgent_1f1gp_97", D = {
  row: Ev,
  cell: xv,
  next: Iv,
  headCell: qv,
  webId: Mv,
  webPurpose: Bv,
  webMeta: Dv,
  webUrgent: Pv
}, Ov = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Hv = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, Mn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Fv = Object.fromEntries(Mn.map((e) => [e.key, e]));
function Be({ column: e, children: a }) {
  const t = Fv[e];
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
function Uy() {
  return /* @__PURE__ */ n("tr", { children: Mn.map((e) => /* @__PURE__ */ n(
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
function jv({ cred: e }) {
  const a = Ov[e.state];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ n(Be, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Be, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Be, { column: "state", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Be, { column: "cls", children: /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Be, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Be, { column: "next", children: /* @__PURE__ */ n("span", { className: D.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Wv({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ${D.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function zv({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Wv, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(h, { ...Hv[e.state] }) })
  ] });
}
function Vy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(zv, { ...e }) : /* @__PURE__ */ n(jv, { ...e });
}
const Gv = "_card_17zba_2", Kv = "_head_17zba_11", Uv = "_env_17zba_18", Vv = "_version_17zba_25", Yv = "_meta_17zba_32", Jv = "_webCard_17zba_37", Xv = "_webRow_17zba_47", Qv = "_webTitle_17zba_55", Zv = "_webLine_17zba_65", ef = "_webVersion_17zba_72", af = "_webMeta_17zba_77", j = {
  card: Gv,
  head: Kv,
  env: Uv,
  version: Vv,
  meta: Yv,
  webCard: Jv,
  webRow: Xv,
  webTitle: Qv,
  webLine: Zv,
  webVersion: ef,
  webMeta: af
}, Bn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function nf({ env: e }) {
  const a = Bn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: j.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ l("div", { className: j.head, children: [
      /* @__PURE__ */ n("span", { className: j.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: j.version, children: e.version }),
    /* @__PURE__ */ l("p", { className: j.meta, children: [
      "deployed ",
      ae(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: j.meta, children: t })
  ] });
}
function tf(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ae(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function rf(e) {
  return /* @__PURE__ */ l("article", { className: `${j.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${j.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${j.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(h, { ...Bn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${j.version} ${j.webVersion} ${j.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${j.meta} ${j.webMeta} ${j.webLine} ward-cellmeta`, children: tf(e) })
  ] });
}
function Yy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(rf, { ...e }) : /* @__PURE__ */ n(nf, { ...e });
}
const lf = "_upload_erepj_2", of = "_preview_erepj_7", cf = "_mark_erepj_17", sf = "_empty_erepj_22", df = "_actions_erepj_28", uf = "_input_erepj_33", mf = "_reasons_erepj_41", hf = "_reason_erepj_41", wf = "_accepted_erepj_57", V = {
  upload: lf,
  preview: of,
  mark: cf,
  empty: sf,
  actions: df,
  input: uf,
  reasons: mf,
  reason: hf,
  accepted: wf
}, Dn = 1.5, Pn = 22, Ge = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Dn}px at ${Pn}px`];
function _f() {
  return { ok: !1, reasons: [Ge[1]] };
}
function vf(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function ff(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ge[0]] : [];
}
function bf(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ge[1]), e.querySelector("text") !== null && t.push(Ge[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function gf(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? Pn / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Dn;
  }) ? [Ge[3]] : [];
}
function Jy(e) {
  const a = vf(e);
  if (a === null) return _f();
  const t = [...ff(a), ...bf(a, e), ...gf(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const pf = "Mark accepted.";
function Nf({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: V.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: V.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: V.empty }) });
}
function yf(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function kf(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function $f({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: V.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: V.result, role: "status", children: /* @__PURE__ */ n("p", { className: V.accepted, children: pf }) }) : /* @__PURE__ */ n("div", { className: V.result, role: "status", children: /* @__PURE__ */ n("ul", { className: V.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: V.reason, children: a }, a)) }) });
}
function Cf({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n($f, { result: e }) : /* @__PURE__ */ n("p", { className: `${V.result} ${yf(e, t)}`, role: "status", children: kf(e, t) });
}
function Xy({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = p(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: V.upload, children: [
    /* @__PURE__ */ n(Nf, { current: e }),
    /* @__PURE__ */ l("div", { className: V.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: o,
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
        return (u = o.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(v, { variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(Cf, { result: i, presentation: r })
  ] });
}
const Sf = "_row_1wp9s_7", Rf = "_cell_1wp9s_11", Tf = "_head_1wp9s_28", Lf = "_name_1wp9s_34", Af = "_pinned_1wp9s_42", Ef = "_headCell_1wp9s_49", xf = "_webName_1wp9s_88", If = "_webMeta_1wp9s_95", qf = "_webWarn_1wp9s_103", L = {
  row: Sf,
  cell: Rf,
  head: Tf,
  name: Lf,
  pinned: Af,
  headCell: Ef,
  webName: xf,
  webMeta: If,
  webWarn: qf
}, Da = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, On = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Mf = Object.fromEntries(On.map((e) => [e.key, e]));
function Bf(e, a) {
  return `mcp.${e}.${a}`;
}
function Df(e) {
  return Object.keys(Da).includes(e);
}
function Pf(e) {
  return Da[e !== void 0 && Df(e) ? e : "unknown"];
}
function Fe({ column: e, children: a }) {
  const t = Mf[e];
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
function Qy() {
  return /* @__PURE__ */ n("tr", { children: On.map((e) => /* @__PURE__ */ n(
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
function Of({ server: e }) {
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
    /* @__PURE__ */ n(Fe, { column: "tools", children: e.tools.map((t) => Bf(e.name, t)).join(" · ") })
  ] });
}
function Hf(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Ff(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function jf({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${L.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${L.webMeta} ward-cellmeta`, children: e });
}
function Wf({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${L.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function zf({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Gf({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: L.row, children: [
    /* @__PURE__ */ l("td", { className: L.cell, children: [
      /* @__PURE__ */ n("span", { className: `${L.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${L.webMeta} ward-cellmeta`, children: Hf(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n("span", { className: `${L.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(h, { ...Ff(e) }) }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(jf, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(h, { ...Pf(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: L.cell, children: [
      /* @__PURE__ */ n(Wf, { server: e, onRestart: a }),
      /* @__PURE__ */ n(zf, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function Zy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Gf, { ...e }) : /* @__PURE__ */ n(Of, { ...e });
}
const Kf = "_row_1h9nq_2", Uf = "_headCell_1h9nq_14", Vf = "_cell_1h9nq_15", Yf = "_name_1h9nq_26", Jf = "_consequence_1h9nq_32", Xf = "_reason_1h9nq_38", Qf = "_value_1h9nq_44", Zf = "_webRow_1h9nq_60", eb = "_webSetting_1h9nq_71", ab = "_webName_1h9nq_79", nb = "_webConsequence_1h9nq_87", tb = "_webControl_1h9nq_93", rb = "_webState_1h9nq_106", lb = "_webChip_1h9nq_111", R = {
  row: Kf,
  headCell: Uf,
  cell: Vf,
  name: Yf,
  consequence: Jf,
  reason: Xf,
  value: Qf,
  webRow: Zf,
  webSetting: eb,
  webName: ab,
  webConsequence: nb,
  webControl: tb,
  webState: rb,
  webChip: lb
}, Hn = 104, Fn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function ob({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Le, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(un, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: R.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function ib({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = $(), i = Fn[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: R.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: R.headCell, children: [
      /* @__PURE__ */ n("span", { className: R.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: R.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: R.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: R.cell, children: /* @__PURE__ */ n(ob, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: R.cell, style: { width: Hn }, children: /* @__PURE__ */ n(h, { role: i.role, label: i.label }) })
  ] });
}
function jn(e, a) {
  return String(e ?? a);
}
function cb(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function sb(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? jn(e.value, "—");
}
function db({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: R.webControl, children: [
    /* @__PURE__ */ n(Le, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: R.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function ub(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(db, { ...e });
  const o = cb(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: R.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(un, { options: o, value: jn(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${R.webControl} ${R.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: sb(a) });
}
function mb({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = $(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${R.row} ${R.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: R.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${R.name} ${R.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${R.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: R.webControl, children: i(c) }) : /* @__PURE__ */ n(ub, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${R.webChip} ward-policy-chip`, style: { width: Hn }, children: /* @__PURE__ */ n(h, { ...Fn[t], size: "tag" }) })
  ] });
}
function ek(e) {
  return "presentation" in e ? /* @__PURE__ */ n(mb, { ...e }) : /* @__PURE__ */ n(ib, { ...e });
}
const hb = "_label_1o9za_7", wb = "_name_1o9za_15", _b = "_column_1o9za_24", vb = "_webFrame_1o9za_57", fb = "_webHead_1o9za_62", bb = "_webHeadLabel_1o9za_74", gb = "_webLabel_1o9za_112", pb = "_webColumns_1o9za_119", Nb = "_webGroup_1o9za_125", yb = "_webPeople_1o9za_126", kb = "_webVia_1o9za_127", $b = "_webMeta_1o9za_156", P = {
  label: hb,
  name: wb,
  column: _b,
  webFrame: vb,
  webHead: fb,
  webHeadLabel: bb,
  webLabel: gb,
  webColumns: pb,
  webGroup: Nb,
  webPeople: yb,
  webVia: kb,
  webMeta: $b
}, Cb = {
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
      className: P.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function Sb(e) {
  if (!e.matrixRole) return;
  const a = Cb[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Rb({ node: e }) {
  const a = Sb(e);
  return /* @__PURE__ */ l("span", { className: P.label, children: [
    /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
    /* @__PURE__ */ n(Tb, { role: a, node: e }),
    /* @__PURE__ */ n(pa, { column: ga[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(pa, { column: ga[1], children: e.people === void 0 ? "" : J(e.people) }),
    /* @__PURE__ */ n(pa, { column: ga[2], children: e.requestedVia ?? "" })
  ] });
}
function Tb({ role: e, node: a }) {
  return /* @__PURE__ */ l(O, { children: [
    e && /* @__PURE__ */ n(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(h, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(h, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Lb({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    vn,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(Rb, { node: t }),
      children: c
    }
  );
}
function Na({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Ab({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${P.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Na, { className: `${P.webMeta} ${P.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Na, { className: `${P.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Na, { className: `${P.webMeta} ${P.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Eb() {
  return /* @__PURE__ */ l("div", { className: P.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: P.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: P.webColumns, children: [
      /* @__PURE__ */ n("span", { className: P.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: P.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: P.webVia, children: "Requested via" })
    ] })
  ] });
}
function xb({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${P.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Ib(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function qb({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: P.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Eb, {}),
    /* @__PURE__ */ n(Ki, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      vn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(xb, { row: t }),
        detail: /* @__PURE__ */ n(Ab, { row: t }),
        expanded: Ib(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function ak(e) {
  return "presentation" in e ? /* @__PURE__ */ n(qb, { ...e }) : /* @__PURE__ */ n(Lb, { ...e });
}
const Mb = "_runbook_b9agc_2", Bb = "_list_b9agc_7", Db = "_step_b9agc_15", Pb = "_numeral_b9agc_21", Ob = "_body_b9agc_28", Hb = "_head_b9agc_34", Fb = "_title_b9agc_40", jb = "_detail_b9agc_45", Wb = "_actions_b9agc_50", zb = "_webList_b9agc_56", Gb = "_webStep_b9agc_60", Kb = "_webBody_b9agc_66", Ub = "_webTitle_b9agc_74", Vb = "_webDetail_b9agc_78", S = {
  runbook: Mb,
  list: Bb,
  step: Db,
  numeral: Pb,
  body: Ob,
  head: Hb,
  title: Fb,
  detail: jb,
  actions: Wb,
  webList: zb,
  webStep: Gb,
  webBody: Kb,
  webTitle: Ub,
  webDetail: Vb
}, Wn = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function zn(e) {
  return String(e + 1).padStart(2, "0");
}
function Yb({ step: e, index: a, connection: t }) {
  const r = Wn[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: zn(a) }),
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
function Jb({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(Yb, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function Xb({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: zn(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(h, { ...Wn[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function Qb({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(Xb, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function nk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Qb, { ...e }) : /* @__PURE__ */ n(Jb, { ...e });
}
const Zb = "_list_1gu6a_2", eg = "_check_1gu6a_10", ag = "_body_1gu6a_16", ng = "_text_1gu6a_23", tg = "_pending_1gu6a_32", rg = "_measured_1gu6a_37", Pe = {
  list: Zb,
  check: eg,
  body: ag,
  text: ng,
  pending: tg,
  measured: rg
};
function lg(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function og({ check: e }) {
  const a = lg(e.passed);
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
function tk({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(og, { check: a }, a.text)) });
}
const ig = "_root_16pdz_2", cg = "_list_16pdz_9", sg = "_line_16pdz_16", dg = "_at_16pdz_43", ug = "_text_16pdz_47", mg = "_foot_16pdz_51", hg = "_idle_16pdz_62", wg = "_caret_16pdz_69", _g = "_jump_16pdz_76", we = {
  root: ig,
  list: cg,
  line: sg,
  at: dg,
  text: ug,
  foot: mg,
  idle: hg,
  caret: wg,
  jump: _g
}, vg = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Pa(e) {
  return Number.isNaN(Date.parse(e)) ? "" : vg.format(new Date(e));
}
const fg = { warn: "warning", ok: "ok" };
function bg({ kind: e }) {
  const a = fg[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function gg({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Pa(e)}` });
}
function pg({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events — as of ${Pa(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${we.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${we.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: we.idle, children: i }),
    /* @__PURE__ */ n(gg, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function rk({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
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
      /* @__PURE__ */ n(bg, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: we.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${m}`)) }),
    /* @__PURE__ */ n(pg, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${we.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const Ng = "_row_11jhe_2", yg = "_head_11jhe_14", kg = "_author_11jhe_20", $g = "_eta_11jhe_25", Cg = "_edited_11jhe_26", Sg = "_body_11jhe_32", Rg = "_reason_11jhe_37", Tg = "_actions_11jhe_42", me = {
  row: Ng,
  head: yg,
  author: kg,
  eta: $g,
  edited: Cg,
  body: Sg,
  reason: Rg,
  actions: Tg
}, Lg = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
}, Ag = {
  queued: "Still in the outbox — editing replaces the queued row and recomputes req_hash, so Jira receives one comment, not two.",
  delivered: "Already in Jira, so an edit is a Jira edit: it will show as edited by you there, and the original stays in the audit row.",
  retrying: "Edit is unavailable mid-flight: a delivery may already have reached Jira. Cancel first, then edit.",
  failed: "Delivery failed — edit and resend, or cancel the delivery."
};
function Eg({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(O, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(O, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(O, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(O, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function xg({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(O, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: me.reason, id: a, children: e })
  ] });
}
function Ig(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function qg(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Eg, { ...e }) : /* @__PURE__ */ n(xg, { reason: e.unavailable, reasonId: e.unavailableId });
}
function lk(e) {
  const { comment: a } = e;
  Ig(e);
  const t = $(), r = `${t}-unavailable`, o = Lg[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${me.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: me.head, children: [
      /* @__PURE__ */ n("span", { className: me.author, children: a.author }),
      /* @__PURE__ */ n(h, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: me.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: me.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: me.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: me.reason, id: t, children: Ag[a.delivery] }),
    /* @__PURE__ */ n("div", { className: me.actions, children: /* @__PURE__ */ n(qg, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Mg = "_root_c46wj_2", Bg = "_attach_c46wj_11", Dg = "_actions_c46wj_17", Pg = "_reply_c46wj_23", Og = "_replyRow_c46wj_28", Hg = "_sendsAs_c46wj_42", He = {
  root: Mg,
  attach: Bg,
  actions: Dg,
  reply: Pg,
  replyRow: Og,
  sendsAs: Hg
};
function Fg({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = p(""), i = $();
  return /* @__PURE__ */ l("div", { className: He.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: He.replyRow, children: [
      /* @__PURE__ */ n(M, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: He.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function ok(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Fg, { ...e }) : /* @__PURE__ */ n(jg, { ...e });
}
function jg({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = p("");
  return /* @__PURE__ */ l("div", { className: He.root, children: [
    /* @__PURE__ */ n(M, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ l("div", { className: He.attach, children: [
      /* @__PURE__ */ n(h, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
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
      /* @__PURE__ */ n(v, { variant: "primary", onClick: () => o(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(v, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const Wg = "_list_1ih9e_2", zg = "_item_1ih9e_6", Gg = "_body_1ih9e_22", Kg = "_text_1ih9e_28", Ug = "_evidence_1ih9e_37", Vg = "_consequence_1ih9e_49", Yg = "_note_1ih9e_54", Te = {
  list: Wg,
  item: zg,
  body: Gg,
  text: Kg,
  evidence: Ug,
  consequence: Vg,
  note: Yg
};
function Jg({ criterion: e }) {
  return /* @__PURE__ */ n(Ae, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function rn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Xg(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function Qg({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Te.body, children: [
    /* @__PURE__ */ n("span", { className: Te.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(O, { children: [
      /* @__PURE__ */ n(rn, { text: " — " }),
      /* @__PURE__ */ n("code", { className: Te.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(O, { children: [
      /* @__PURE__ */ n(rn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Te.consequence, children: Xg(e.why) })
    ] })
  ] });
}
function Zg({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Te.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Jg, { criterion: e }),
    /* @__PURE__ */ n(Qg, { criterion: e })
  ] });
}
function ik({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Te.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Zg, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Te.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const ep = "_list_dwhoz_2", ap = "_rung_dwhoz_6", np = "_name_dwhoz_18", tp = "_actor_dwhoz_32", Ze = {
  list: ep,
  rung: ap,
  name: np,
  actor: tp
}, rp = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function lp({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = rp[e.state];
  return /* @__PURE__ */ l("li", { className: Ze.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Ze.name, children: e.name }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${Ze.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function ck({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ze.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(lp, { rung: a }, a.name)) });
}
const op = "_sheet_1fqco_2", ip = "_title_1fqco_9", cp = "_stage_1fqco_15", sp = "_effects_1fqco_20", dp = "_effect_1fqco_20", up = "_numeral_1fqco_31", mp = "_effectText_1fqco_38", hp = "_refusals_1fqco_43", wp = "_reasons_1fqco_52", _p = "_reason_1fqco_52", vp = "_actions_1fqco_62", le = {
  sheet: op,
  title: ip,
  stage: cp,
  effects: sp,
  effect: dp,
  numeral: up,
  effectText: mp,
  refusals: hp,
  reasons: wp,
  reason: _p,
  actions: vp
};
function fp({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function sk({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
  const s = $(), u = `${s}-refusal`, [d, m] = p(""), _ = t.length > 0;
  return /* @__PURE__ */ n(Ue, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ l("div", { className: le.sheet, children: [
    /* @__PURE__ */ l("h2", { className: le.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: le.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: le.effects, children: a.map((b, B) => /* @__PURE__ */ l("li", { className: le.effect, children: [
      /* @__PURE__ */ n("span", { className: le.numeral, children: String(B + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: le.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      Oo,
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
    _ && /* @__PURE__ */ l("div", { className: le.refusals, children: [
      /* @__PURE__ */ n(h, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: le.reasons, children: t.map((b, B) => /* @__PURE__ */ n("li", { className: le.reason, id: B === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: le.actions, children: [
      /* @__PURE__ */ n(fp, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const bp = "_list_1hvqu_2", gp = "_path_1hvqu_7", pp = "_head_1hvqu_21", Np = "_label_1hvqu_28", yp = "_consequence_1hvqu_35", kp = "_ask_1hvqu_36", Oe = {
  list: bp,
  path: gp,
  head: pp,
  label: Np,
  consequence: yp,
  ask: kp
}, Ra = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function ln(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function $p({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: Ra[e.kind] }) : /* @__PURE__ */ l(O, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: Ra[e.kind] }),
    /* @__PURE__ */ n("span", { className: Oe.ask, id: r, children: e.askInstead })
  ] });
}
function Cp({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: Oe.path, "data-allowed": e.allowed, "data-role": ln(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: Oe.head, children: [
      /* @__PURE__ */ n("span", { className: Oe.label, children: e.title ?? Ra[e.kind] }),
      /* @__PURE__ */ n(h, { role: ln(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Oe.consequence, children: e.consequence }),
    /* @__PURE__ */ n($p, { path: e, primary: a, onChoose: t })
  ] });
}
function dk({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Oe.list, children: e.map((t, r) => /* @__PURE__ */ n(Cp, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const Sp = "_list_qjv4r_2", Rp = "_item_qjv4r_6", Tp = "_node_qjv4r_18", Lp = "_body_qjv4r_24", Ap = "_head_qjv4r_30", Ep = "_stage_qjv4r_36", xp = "_version_qjv4r_41", Ip = "_sentence_qjv4r_49", qp = "_meta_qjv4r_54", _e = {
  list: Sp,
  item: Rp,
  node: Tp,
  body: Lp,
  head: Ap,
  stage: Ep,
  version: xp,
  sentence: Ip,
  meta: qp
}, Mp = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Bp({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: _e.head, children: [
    /* @__PURE__ */ n("span", { className: _e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: _e.version, title: e.version, children: e.version }) : null
  ] });
}
function Dp({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${_e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${_e.node} ward-history-node`, children: /* @__PURE__ */ n(Ae, { size: 9, kind: Mp[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${_e.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Bp, { entry: e }),
      /* @__PURE__ */ n("span", { className: _e.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${_e.meta} ward-history-meta`, children: [
        `${ae(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${Y(e.cost)}`
      ] })
    ] })
  ] });
}
function uk({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${_e.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Dp, { entry: a }, a.stage + String(t))) });
}
const Pp = "_thread_1kn6s_3", Op = "_turn_1kn6s_8", Hp = "_who_1kn6s_27", Fp = "_body_1kn6s_32", ea = {
  thread: Pp,
  turn: Op,
  who: Hp,
  body: Fp
}, Gn = da(!1);
function mk({ children: e, density: a }) {
  return /* @__PURE__ */ n(Gn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ea.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function hk({ turn: e }) {
  if (!sa(Gn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${ea.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${ea.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ae(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ea.body} ward-chat-body`, children: e.body })
  ] });
}
const jp = "_list_1rt9c_3", Wp = "_row_1rt9c_7", zp = "_label_1rt9c_20", Gp = "_n_1rt9c_26", Kp = "_cause_1rt9c_33", We = {
  list: jp,
  row: Wp,
  label: zp,
  n: Gp,
  cause: Kp
};
function Up(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Vp = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Yp({ row: e, formatNumber: a }) {
  return Up(e), /* @__PURE__ */ l("li", { className: `${We.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ae, { size: 8, ...Vp[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: We.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${We.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Jp, { cause: e.cause })
  ] });
}
function Jp({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${We.cause} ward-healthrow-cause`, children: e }) : null;
}
function wk({ rows: e, formatNumber: a = J }) {
  return /* @__PURE__ */ n("ul", { className: `${We.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(Yp, { row: t, formatNumber: a }, t.label)) });
}
const Xp = "_root_1jxwp_2", Qp = {
  root: Xp
};
function _k({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: Qp.root, "data-density": o, children: [
    /* @__PURE__ */ n(_a, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const Zp = "_row_dhbre_3", eN = "_key_dhbre_13", aN = "_stack_dhbre_24", nN = "_value_dhbre_32", tN = "_evidence_dhbre_39", rN = "_mark_dhbre_47", De = {
  row: Zp,
  key: eN,
  stack: aN,
  value: nN,
  evidence: tN,
  mark: rN
};
function lN({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(h, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ia, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function vk({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${De.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${De.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${De.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${De.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${De.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${De.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(lN, { state: e.state }) })
  ] });
}
const oN = "_cell_1monp_2", iN = {
  cell: oN
}, cN = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function sN(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function dN(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function uN(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: sN(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function mN(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function fk({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  dN(e, t);
  const r = mN(e);
  return /* @__PURE__ */ n(
    Zo,
    {
      label: "Rejection routing",
      columns: cN,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: iN.cell, "data-norerun": o.noRerun ? !0 : void 0, children: uN(o, i) }),
      empty: a ?? /* @__PURE__ */ n($c, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const hN = "_row_ute8v_2", wN = "_title_ute8v_11", _N = "_turns_ute8v_20", vN = "_waiting_ute8v_21", fN = "_resolved_ute8v_22", bN = "_activity_ute8v_23", gN = "_cost_ute8v_29", pN = "_link_ute8v_30", NN = "_tableRow_ute8v_47", yN = "_tableTitle_ute8v_59", kN = "_tableResolved_ute8v_64", $N = "_tableLink_ute8v_68", CN = "_tableMeta_ute8v_83", SN = "_tableCost_ute8v_90", RN = "_tableActivity_ute8v_91", TN = "_tableState_ute8v_101", LN = "_tableRecord_ute8v_112", x = {
  row: hN,
  title: wN,
  turns: _N,
  waiting: vN,
  resolved: fN,
  activity: bN,
  cost: gN,
  link: pN,
  tableRow: NN,
  tableTitle: yN,
  tableResolved: kN,
  tableLink: $N,
  tableMeta: CN,
  tableCost: SN,
  tableActivity: RN,
  tableState: TN,
  tableRecord: LN
}, Kn = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function AN(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function EN(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function xN(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const IN = { duplicate: "CLOSED · DUPLICATE" };
function qN({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: x.tableMeta, children: `waiting on ${e}` });
}
function MN({ value: e }) {
  return /* @__PURE__ */ n("td", { className: x.tableCost, children: e === void 0 ? null : Y(e) });
}
function BN({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: x.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function DN({ session: e, href: a }) {
  const t = Kn[e.state];
  return /* @__PURE__ */ l("tr", { className: x.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: x.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: x.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: x.tableMeta, children: EN(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: x.tableResolved, children: [
      xN(e.resolved),
      /* @__PURE__ */ n(qN, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(MN, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: x.tableActivity, children: AN(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: x.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(h, { role: t.role, label: IN[e.state] ?? t.label }),
      /* @__PURE__ */ n(BN, { link: e.link })
    ] }) })
  ] });
}
function PN({ session: e }) {
  const a = Kn[e.state];
  return /* @__PURE__ */ l("div", { className: x.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: x.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: x.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: x.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: x.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: x.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : Y(e.cost) }),
    /* @__PURE__ */ n("span", { className: x.activity, children: ae(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: x.link, href: e.link.href, children: e.link.key }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function bk(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(DN, { session: e.session, href: e.href }) : /* @__PURE__ */ n(PN, { session: e.session });
}
const ON = "_block_1yy2v_3", HN = "_list_1yy2v_9", FN = "_line_1yy2v_14", Ta = {
  block: ON,
  list: HN,
  line: FN
}, jN = { warn: "warning", ok: "ok" };
function WN({ kind: e }) {
  const a = jN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function zN({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Ta.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(WN, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function gk({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ta.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ta.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(zN, { line: t }, `${r}-${t.text}`)) }) });
}
const GN = "_band_tt7hp_1", KN = "_head_tt7hp_8", UN = "_cell_tt7hp_19", VN = "_index_tt7hp_35", YN = "_title_tt7hp_42", JN = "_note_tt7hp_48", XN = "_cellTitle_tt7hp_53", QN = "_cellBody_tt7hp_58", ZN = "_tag_tt7hp_64", ue = {
  band: GN,
  head: KN,
  cell: UN,
  index: VN,
  title: YN,
  note: JN,
  cellTitle: XN,
  cellBody: QN,
  tag: ZN
}, on = 4;
function pk({ index: e, title: a, note: t, cells: r }) {
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
  rk as ActivityConsole,
  Eu as AgentCard,
  sy as AppShell,
  zy as AppearanceStrip,
  pk as Band,
  ls as BoardColumn,
  Sy as BoardFootnote,
  Ry as BoardHeader,
  gy as BoardScroller,
  v as Btn,
  oy as CHIP_ROLES,
  Mn as CREDENTIAL_COLUMNS,
  hy as Callout,
  Gy as CapabilityRow,
  hk as ChatMessage,
  dn as Checkbox,
  h as Chip,
  lk as ClarificationRow,
  pn as ColourLadder,
  Ky as ComponentRow,
  ok as Composer,
  Ly as ConfigRow,
  Ty as ConfigRowHead,
  qa as ConnectionMark,
  mk as Conversation,
  Oo as CostMeter,
  Vy as CredentialRow,
  Uy as CredentialRowHead,
  ik as CriteriaList,
  kr as Crumb,
  wk as DeliveryHealth,
  Ny as DeniedState,
  By as DryRunRail,
  $c as EmptyState,
  Yy as EnvCard,
  M as Field,
  py as FilteredEmpty,
  _a as GateChecklist,
  ck as GateLadder,
  Zo as Grid,
  Py as HandoffRuleRow,
  Dy as HandoffRules,
  Ay as ItemDrawer,
  ct as LIVE_EVENT_TYPES,
  ru as LegacyBoardColumn,
  xy as LegacyBoardHeader,
  Iy as LegacyConfigRow,
  My as LegacyItemDrawer,
  Xd as LegacyOverCapNote,
  qy as LegacyPreviewRail,
  gn as LegacyWorkCard,
  ge as LiveIndicator,
  yy as LoadFailed,
  Cy as Loading,
  On as MCP_SERVER_COLUMNS,
  Ia as Mark,
  Xy as MarkUpload,
  Ae as Marker,
  Zy as McpServerRow,
  Qy as McpServerRowHead,
  Oy as NewStreamModal,
  Rc as OverCapNote,
  Ue as Overlay,
  Hu as PARTIAL_STEP_REASON,
  Hn as POLICY_CHIP_WIDTH,
  _y as PageFrame,
  my as PageHeader,
  ek as PolicyRow,
  Ey as PreviewRail,
  ga as ROLE_MATRIX_COLUMNS,
  En as RULE_ACTIONS,
  wn as Radio,
  _k as ReadyChecklist,
  fy as RecordSection,
  sk as RequeueSheet,
  dk as ResolveBlock,
  vk as ResolvedFieldRow,
  ak as RoleMatrixRow,
  fk as RoutingTable,
  Hy as RuleRow,
  nk as RunbookSteps,
  ot as STREAM_STEPS,
  by as SectionBand,
  vi as SectionHeader,
  un as SegmentedControl,
  bk as SessionRow,
  uy as Sidebar,
  Fy as StageColumn,
  uk as StageHistory,
  xh as StageListEditor,
  ky as StaleStrip,
  ma as StatStrip,
  jy as StreamRow,
  vy as SubjectRail,
  Le as Switch,
  dy as Tabs,
  Wy as ToolRow,
  wy as TopBar,
  Ki as Tree,
  vn as TreeRow,
  gk as TypedInputBlock,
  tk as ValidationList,
  ly as WARD_VERSION,
  wa as WorkCard,
  $y as WriteUnavailableStrip,
  AN as agoSince,
  Zn as clock,
  Yh as colourStatus,
  J as count,
  ee as duration,
  La as elapsed,
  ry as eventSourceTransport,
  Ke as isStreamStep,
  Aa as isValidatedStreamStep,
  Fu as ladderValidation,
  Pf as mcpConnectionChip,
  Bf as mcpToolName,
  Y as money,
  ce as ms,
  fn as ordered,
  cn as ratio,
  Rv as restartLabel,
  ae as stamp,
  sn as stream,
  st as streamChip,
  iy as streamVars,
  Xe as useBorderFlash,
  tt as useFocusTrap,
  cy as useLiveFeed,
  ty as useReturnFocus,
  ua as useRovingTabindex,
  Ea as useTicker,
  H as v,
  Jy as validateMark,
  it as validatedStreamSteps
};
