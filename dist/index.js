import { jsx as n, Fragment as M, jsxs as l } from "react/jsx-runtime";
import { useMemo as Yn, useContext as Ke, createContext as Ue, useCallback as z, useEffect as T, useState as p, useRef as N, useLayoutEffect as Jn, useId as $, Fragment as Xn } from "react";
import { createPortal as Qn } from "react-dom";
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
const Zn = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ae(e) {
  const a = Zn.formatToParts(new Date(e)), t = (r) => {
    var o;
    return ((o = a.find((i) => i.type === r)) == null ? void 0 : o.value) ?? "";
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
function cn(e, a) {
  return `${e} / ${a}`;
}
const et = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function at(e) {
  return et.format(new Date(e));
}
const sn = Ue(/* @__PURE__ */ new Set());
function oy({ hidden: e, children: a }) {
  const t = Yn(() => new Set(e), [e]);
  return /* @__PURE__ */ n(sn.Provider, { value: t, children: a });
}
function nt(e) {
  return !Ke(sn).has(e);
}
function iy({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(M, { children: nt(e) ? a : t });
}
const tt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function rt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function lt(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = rt(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function ot(e) {
  return { onKeyDown: z(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(tt));
      lt(t, e.current, r);
    },
    [e]
  ) };
}
function cy(e, a = !0) {
  T(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const Ha = { ArrowUp: -1, ArrowDown: 1 }, Fa = { ArrowLeft: -1, ArrowRight: 1 }, it = (e, a, t) => Math.min(t, Math.max(a, e));
function ct(e, a) {
  if (a !== "horizontal" && e in Ha) return Ha[e];
  if (a !== "vertical" && e in Fa) return Fa[e];
}
function ua({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  Jn(() => {
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
      const _ = Math.max(0, m.indexOf(a)), b = ct(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(m[it(_ + b, 0, m.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(m[0])) : d.key === "End" && (d.preventDefault(), c(m[m.length - 1]));
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
const sy = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, dy = "0.2.0", uy = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], st = [1, 2, 3, 4, 5, 6], dt = [1, 2, 3], ut = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], H = {
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
function dn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ve(e) {
  return st.includes(e);
}
function Aa(e) {
  return dt.includes(e);
}
function my(e) {
  if (!Ve(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function mt(e) {
  if (!Ve(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
function ja(e) {
  return typeof e != "string" ? null : ut.includes(e) ? e : null;
}
function ht(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function wt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function _t(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function vt(e, a, t) {
  const r = ht(e);
  if (r === null) return null;
  const o = ja(t) ?? ja(r.type);
  return o === null ? null : { ...r, type: o, id: wt(r, a), at: _t(r) };
}
function ft(e, a) {
  return e >= ce.staleAfter ? "stale" : e >= ce.heartbeat && a === "live" ? "reconnecting" : null;
}
function bt(e, a, t) {
  return e >= ce.heartbeat && !a && t !== null;
}
function hy(e, a) {
  const [t, r] = p("reconnecting"), [o, i] = p(null), c = N(/* @__PURE__ */ new Map()), s = N(0), u = N(""), d = N(0), m = N(null), _ = N(0), b = N(0), P = N(!1), X = N("reconnecting"), Q = z((k) => {
    X.current = k, r(k);
  }, []), ne = z(() => {
    s.current = Date.now();
  }, []), xe = z((k) => {
    for (const [F, de] of c.current)
      (de === "*" || k.itemKey === de) && F(k);
  }, []), te = z(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (k, F, de) => {
        const ke = vt(k, F, de);
        ke !== null && (ke.id && (u.current = ke.id), ne(), P.current = !1, Q("live"), i(ke.at), xe(ke));
      },
      onOpen: () => {
        d.current = 0, P.current = !1, ne(), Q("live");
      },
      onError: () => {
        var F;
        (F = m.current) == null || F.close(), m.current = null, P.current = !0, X.current !== "stale" && Q("reconnecting");
        const k = Math.min(ce.reconnectBase * 2 ** d.current, ce.reconnectMax);
        d.current += 1, _.current = window.setTimeout(te, k);
      }
    });
  }, [xe, Q, ne, a, e]), Ee = z((k) => {
    P.current = !0, k.close(), m.current = null, _.current = window.setTimeout(te, ce.reconnectBase);
  }, [te]), Ie = z((k, F) => (c.current.set(F, k), () => {
    c.current.delete(F);
  }), []);
  return T(() => (te(), b.current = window.setInterval(() => {
    const k = Date.now() - s.current, F = ft(k, X.current);
    F && Q(F);
    const de = m.current;
    bt(k, P.current, de) && Ee(de);
  }, ce.tick), () => {
    var k;
    window.clearInterval(b.current), window.clearTimeout(_.current), P.current = !1, (k = m.current) == null || k.close(), m.current = null;
  }), [te, Ee, Q]), { connection: t, lastEventAt: o, subscribe: Ie };
}
function xa(e, a) {
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
function gt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Wa(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Ze(e, a) {
  const t = N(0), r = z((o) => {
    const i = o ?? a, c = e.current;
    c !== null && i !== void 0 && (gt() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => Wa(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => Wa(c), ce.flash)));
  }, [a, e]);
  return T(() => () => window.clearTimeout(t.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const pt = "_root_1otpc_2", Nt = {
  root: pt
};
function yt(e, a, t, r, o) {
  const i = [La(a)];
  return e || i.push(`as of ${at(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = xa(e, o), c = (a == null ? void 0 : a.at) ?? e, s = yt(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${Nt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      ae(e)
    ] })
  ] });
}
const kt = "_app_lrbcc_1", $t = "_side_lrbcc_18", Ct = "_main_lrbcc_26", St = "_rail_lrbcc_33", Rt = "_page_lrbcc_40", Tt = "_root_lrbcc_91", Lt = "_topbar_lrbcc_98", At = "_mark_lrbcc_109", xt = "_brand_lrbcc_116", Et = "_tagline_lrbcc_122", It = "_identity_lrbcc_128", qt = "_tools_lrbcc_129", Mt = "_actor_lrbcc_138", Bt = "_metadata_lrbcc_139", Pt = "_detail_lrbcc_155", Dt = "_nav_lrbcc_160", Ot = "_content_lrbcc_195", Ht = "_skip_lrbcc_218", q = {
  app: kt,
  side: $t,
  main: Ct,
  rail: St,
  page: Rt,
  root: Tt,
  topbar: Lt,
  mark: At,
  brand: xt,
  tagline: Et,
  identity: It,
  tools: qt,
  actor: Mt,
  metadata: Bt,
  detail: Pt,
  nav: Dt,
  content: Ot,
  skip: Ht
};
function Ft({ sidebar: e, header: a, children: t, rail: r }) {
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
function jt({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: q.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function ta({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Wt({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: q.metadata, children: [
    /* @__PURE__ */ n(ta, { value: e, className: q.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(ta, { value: a, className: q.detail })
  ] });
}
function zt(e) {
  return /* @__PURE__ */ l("header", { className: q.topbar, children: [
    /* @__PURE__ */ n("span", { className: q.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: q.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(ta, { value: e.tagline, className: q.tagline }),
    /* @__PURE__ */ n(jt, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: q.identity, children: /* @__PURE__ */ n(Wt, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(ta, { value: e.tools, className: q.tools })
  ] });
}
function Gt(e) {
  const a = $();
  return /* @__PURE__ */ l("div", { className: `${q.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: q.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(zt, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: q.content, children: e.children })
  ] });
}
function Kt(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function wy(e) {
  return Kt(e) ? /* @__PURE__ */ n(Ft, { ...e }) : /* @__PURE__ */ n(Gt, { ...e });
}
const Ut = "_btn_llheq_2", Vt = "_primary_llheq_13", Yt = "_secondary_llheq_23", Jt = "_ghost_llheq_28", Xt = "_overflow_llheq_37", Qt = "_sm_llheq_44", Zt = "_disabled_llheq_48", Je = {
  btn: Ut,
  primary: Vt,
  secondary: Yt,
  ghost: Jt,
  overflow: Xt,
  sm: Qt,
  disabled: Zt
};
function er(e, a, t, r) {
  const o = a === "sm" ? [Je.sm, "ward-btn--sm"] : [], i = t ? [Je.disabled] : [];
  return [Je.btn, Je[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function ar(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function nr(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function tr(e) {
  return e.children ?? e.label;
}
function v(e) {
  nr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: er(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...ar(a, e.controls),
      children: tr(e)
    }
  );
}
function Ea(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const rr = "_root_o4yib_2", lr = "_row_o4yib_8", or = "_box_o4yib_14", ir = "_label_o4yib_21", cr = "_lockedNote_o4yib_26", sr = "_consequence_o4yib_34", dr = "_sample_o4yib_69", Ce = {
  root: rr,
  row: lr,
  box: or,
  label: ir,
  lockedNote: cr,
  consequence: sr,
  sample: dr
};
function ur(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function mr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Ce.consequence} ward-check-consequence`, children: a }) : null;
}
function hr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ce.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function wr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ce.sample, "aria-hidden": "true", children: e }) : null;
}
function un(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = ur(e);
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
          "aria-describedby": Ea(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: a, className: Ce.label, children: [
        e.label,
        /* @__PURE__ */ n(hr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(wr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(mr, { id: t, text: e.consequence })
  ] });
}
const _r = "_chip_1073r_2", vr = {
  chip: _r
}, fr = {
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
function br(e, a) {
  if (e === "stream") return gr(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = fr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function gr(e) {
  if (!e || !Aa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = dn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${vr.chip} ward-chip ward-chip--${e}`, style: br(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
const pr = "_nav_fbsei_2", Nr = "_list_fbsei_8", yr = "_item_fbsei_15", kr = "_link_fbsei_24", $r = "_current_fbsei_33", Cr = "_chips_fbsei_37", qe = {
  nav: pr,
  list: Nr,
  item: yr,
  link: kr,
  current: $r,
  chips: Cr
};
function Sr({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: qe.nav, children: [
    /* @__PURE__ */ n("ol", { className: qe.list, children: e.map((t, r) => /* @__PURE__ */ n("li", { className: qe.item, children: r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: qe.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: qe.current, "aria-current": "page", children: t.label }) }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${qe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] }) });
}
const Rr = "_field_1oadv_2", Tr = "_label_1oadv_8", Lr = "_labelHidden_1oadv_15", Ar = "_control_1oadv_25", xr = "_mono_1oadv_44", Er = "_area_1oadv_49", Ir = "_invalid_1oadv_56", ye = {
  field: Rr,
  label: Tr,
  labelHidden: Lr,
  control: Ar,
  mono: xr,
  area: Er,
  invalid: Ir
};
function qr({ controlProps: e, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, ...e });
}
function Mr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Br({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Pr = { input: qr, select: Mr, textarea: Br };
function Dr(e, a, t) {
  const r = Pr[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Or(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ea(r ? t : void 0, e.describedBy),
    onChange: (o) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, o.target.value);
    }
  };
}
function Hr(e) {
  const a = e.mono ? [ye.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [ye.area] : [];
  return [ye.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Fr(e) {
  return e ? `${ye.label} ${ye.labelHidden} ward-field-label` : `${ye.label} ward-field-label`;
}
function B(e) {
  const a = $(), t = `${a}-msg`, r = Or(e, a, t), o = Hr(e);
  return /* @__PURE__ */ l("div", { className: `${ye.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Fr(e.labelHidden), htmlFor: a, children: e.label }),
    Dr(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${ye.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const jr = "_strip_rg8pj_2", Wr = "_tab_rg8pj_12", zr = "_count_rg8pj_34", ya = {
  strip: jr,
  tab: Wr,
  count: zr
}, za = 7;
function Gr(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Kr(e) {
  return `${ya.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function _y({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > za) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${za} — the set is fixed`);
  const i = ua({ orientation: "horizontal" }), c = Gr(e, a);
  return T(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: Kr(o),
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
            s.count === void 0 ? null : /* @__PURE__ */ l(M, { children: [
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
const Ur = "_root_jem6y_2", Vr = "_segment_jem6y_7", Ga = {
  root: Ur,
  segment: Vr
};
function mn({ options: e, value: a, onChange: t, label: r = "Options", disabled: o = !1, describedBy: i }) {
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
const Yr = "_sidebar_1jywv_3", Jr = "_brand_1jywv_9", Xr = "_mark_1jywv_17", Qr = "_word_1jywv_24", Zr = "_nav_1jywv_30", el = "_navItem_1jywv_38", al = "_group_1jywv_50", nl = "_groupName_1jywv_57", tl = "_agents_1jywv_70", rl = "_agent_1jywv_70", ll = "_agentTop_1jywv_88", ol = "_dot_1jywv_95", il = "_agentName_1jywv_107", cl = "_agentMeta_1jywv_120", sl = "_foot_1jywv_126", dl = "_footName_1jywv_132", ul = "_footLinks_1jywv_139", ml = "_footLink_1jywv_139", hl = "_root_1jywv_153", wl = "_linkBrand_1jywv_162", _l = "_label_1jywv_183", vl = "_note_1jywv_188", fl = "_footer_1jywv_202", C = {
  sidebar: Yr,
  brand: Jr,
  mark: Xr,
  word: Qr,
  nav: Zr,
  navItem: el,
  group: al,
  groupName: nl,
  new: "_new_1jywv_64",
  agents: tl,
  agent: rl,
  agentTop: ll,
  dot: ol,
  agentName: il,
  agentMeta: cl,
  foot: sl,
  footName: dl,
  footLinks: ul,
  footLink: ml,
  root: hl,
  linkBrand: wl,
  label: _l,
  note: vl,
  footer: fl
};
function bl({ agent: e }) {
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
              style: { "--dot": dn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function gl({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function pl({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(bl, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(gl, { shared: i })
  ] });
}
function Nl(e) {
  return e.destinations ?? e.items ?? [];
}
function yl({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function kl({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function $l({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Cl(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(yl, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Nl(e).map((a) => /* @__PURE__ */ n($l, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(kl, { children: e.children })
  ] });
}
function Sl(e) {
  return "agents" in e;
}
function vy(e) {
  return Sl(e) ? /* @__PURE__ */ n(pl, { ...e }) : /* @__PURE__ */ n(Cl, { ...e });
}
const Rl = "_mark_wlgi8_3", Tl = {
  mark: Rl
}, Ll = { met: "✓", unmet: "", failed: "✕" };
function Ia({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Tl.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Ll[e]
    }
  );
}
const Al = "_marker_br9fi_2", xl = {
  marker: Al
}, El = {
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
  const r = { "--marker": El[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${xl.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Il = "_root_ti0pq_2", ql = "_chip_ti0pq_11", Ml = "_noCase_ti0pq_23", Xe = {
  root: Il,
  chip: ql,
  noCase: Ml
};
function Bl(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function qa({ connection: e, since: a, lastEventAt: t }) {
  const r = Bl(a, t), o = xa(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${Xe.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ae, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${Xe.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: Xe.noCase, children: La(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${Xe.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ae(r)
  ] });
}
const Pl = "_root_11rs7_2", Dl = "_context_11rs7_12", Ol = "_row_11rs7_1", Hl = "_heading_11rs7_25", Fl = "_headingWrap_11rs7_33", jl = "_chips_11rs7_38", Wl = "_title_11rs7_45", zl = "_consequence_11rs7_54", Gl = "_actionsWrap_11rs7_59", Kl = "_actions_11rs7_59", Ul = "_action_11rs7_59", Vl = "_overflowPanel_11rs7_78", Yl = "_measure_11rs7_88", U = {
  root: Pl,
  context: Dl,
  row: Ol,
  heading: Hl,
  headingWrap: Fl,
  chips: jl,
  title: Wl,
  consequence: zl,
  actionsWrap: Gl,
  actions: Kl,
  action: Ul,
  overflowPanel: Vl,
  measure: Yl
};
function Jl({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: U.heading, children: [
    /* @__PURE__ */ n("h1", { className: U.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: U.consequence, children: a })
  ] });
}
function hn({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: a }, t));
}
function Xl({ actions: e, collapsed: a, onOverflow: t, disclosure: r }) {
  return a ? t ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: t, children: "···" }) : /* @__PURE__ */ n(v, { variant: "overflow", onClick: r.toggle, expanded: r.open, controls: r.panelId, children: "···" }) : /* @__PURE__ */ n(hn, { actions: e });
}
function Ql({ actions: e, disclosure: a, onEscape: t }) {
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(hn, { actions: e }) });
}
function Zl(e, a) {
  const t = $(), [r, o] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function eo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: U.context, children: [
    /* @__PURE__ */ n(Sr, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: U.chips, children: a.map((t) => /* @__PURE__ */ n(h, { ...t }, t.label)) }) : null
  ] });
}
function ao(...e) {
  return e.some((a) => a === null);
}
function no(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function to(e, a, t, r, o) {
  if (o === 0 || ao(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = no(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function ro(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function lo(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = p(!1);
  return T(() => {
    const s = a.current;
    if (!ro(s)) return;
    const u = () => c(to(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function oo({ connection: e }) {
  return e ? /* @__PURE__ */ n(qa, { connection: e.connection, since: e.since }) : null;
}
function fy({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], connection: i, onOverflow: c, density: s = "page" }) {
  const { rowRef: u, headingRef: d, actionsRef: m, measureRef: _, collapsed: b } = lo(o), { disclosure: P, close: X } = Zl(b, m);
  return /* @__PURE__ */ l("header", { className: U.root, "data-density": s, children: [
    /* @__PURE__ */ n(eo, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: U.row, ref: u, children: [
      /* @__PURE__ */ n("div", { ref: d, className: U.headingWrap, children: /* @__PURE__ */ n(Jl, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(oo, { connection: i }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: m, "data-ward-actions": !0, children: /* @__PURE__ */ n(Xl, { actions: o, collapsed: b, onOverflow: c, disclosure: P }) })
      ] })
    ] }),
    b && !c ? /* @__PURE__ */ n(Ql, { actions: o, disclosure: P, onEscape: X }) : null,
    /* @__PURE__ */ n("div", { className: U.measure, ref: _, "aria-hidden": "true", children: o.map((Q, ne) => /* @__PURE__ */ n("span", { children: Q }, ne)) })
  ] });
}
function wn(e) {
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
const io = "_scrim_c7sqj_2", co = "_drawer_c7sqj_10", so = "_sheet_c7sqj_14", uo = "_modal_c7sqj_18", mo = "_panel_c7sqj_23", ho = "_header_c7sqj_51", wo = "_title_c7sqj_59", _o = "_body_c7sqj_63", vo = "_close_c7sqj_90", ve = {
  scrim: io,
  drawer: co,
  sheet: so,
  modal: uo,
  panel: mo,
  header: ho,
  title: wo,
  body: _o,
  close: vo
}, fo = Ue(null), ra = [], la = /* @__PURE__ */ new Map();
function bo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function go(e, a) {
  let t = la.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, la.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function po(e, a) {
  for (const t of Array.from(a.children))
    bo(t) || go(e, t);
}
function No(e) {
  for (const a of e.claims) {
    const t = la.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), la.delete(a)));
  }
}
function yo(e, a) {
  const t = { root: e, claims: [] };
  return ra.push(t), po(t, a), t;
}
function ko(e) {
  const a = ra.indexOf(e);
  a >= 0 && ra.splice(a, 1), No(e);
}
function Ka(e) {
  return e !== null && ra.at(-1) === e;
}
function $o(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, T(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = yo(i, a);
    return r.current = s, () => {
      var d, m;
      const u = Ka(s);
      ko(s), r.current = null, u && ((m = (d = o.current ?? c) == null ? void 0 : d.focus) == null || m.call(d));
    };
  }, [a]), z(() => Ka(r.current), []);
}
function Co(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function So(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ro({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ve.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(M, { children: [
    /* @__PURE__ */ n("header", { className: `${ve.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ve.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ve.body} ward-drawer-body`, children: e.children })
  ] });
}
function To(e) {
  return `${ve.scrim} ${ve[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Lo(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ve.panel} ${ve[e]} ward-overlay-panel${t}${r}`;
}
function Ao(e) {
  const a = Ke(fo);
  return e ?? a ?? document.body;
}
function Ye(e) {
  const a = N(null), t = N(null), r = $(), o = Ao(e.container), i = wn("(min-width: 768px)"), c = Co(e.kind, i), s = So(e, r), u = ot(t), d = $o(a, o, e.returnFocusTo), m = z(() => {
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
  }, [m]), Qn(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: To(c),
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
            className: Lo(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ve.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Ro, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const xo = "_root_drrhx_2", Eo = "_ticket_drrhx_15", Io = "_body_drrhx_24", va = {
  root: xo,
  ticket: Eo,
  body: Io
};
function by({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${va.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${va.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: va.body, children: t })
  ] });
}
const qo = "_root_1bfqw_2", Mo = "_figure_1bfqw_7", Bo = "_of_1bfqw_13", Po = "_bar_1bfqw_18", Do = "_rows_1bfqw_38", Oo = "_row_1bfqw_38", Ho = "_label_1bfqw_49", Fo = "_amount_1bfqw_54", pe = {
  root: qo,
  figure: Mo,
  of: Bo,
  bar: Po,
  rows: Do,
  row: Oo,
  label: Ho,
  amount: Fo
};
function jo({ spent: e, ceiling: a, breakdown: t }) {
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
const Wo = "_frame_mg2jl_2", zo = "_table_mg2jl_6", Go = "_th_mg2jl_12", Ko = "_td_mg2jl_13", Uo = "_sort_mg2jl_47", Vo = "_row_mg2jl_53", Yo = "_empty_mg2jl_61", Ne = {
  frame: Wo,
  table: zo,
  th: Go,
  td: Ko,
  sort: Uo,
  row: Vo,
  empty: Yo
}, Jo = { asc: "ascending", desc: "descending" };
function Xo(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Jo[a.direction];
}
function Qo(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Ne.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Zo(e) {
  return e === void 0 ? void 0 : { width: e };
}
function ei({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Ne.th,
      style: Zo(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Xo(e, a),
      children: Qo(e, t)
    }
  );
}
function ai({ row: e, props: a }) {
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
function ni({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Ne.head, children: a.map((m) => /* @__PURE__ */ n(ei, { column: m, sort: s, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((m) => /* @__PURE__ */ n(ai, { row: m, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(m))) })
  ] }) });
}
const ti = "_set_y5zy3_2", ri = "_legend_y5zy3_7", li = "_row_y5zy3_15", oi = "_control_y5zy3_20", ii = "_input_y5zy3_26", ci = "_label_y5zy3_31", si = "_consequence_y5zy3_36", $e = {
  set: ti,
  legend: ri,
  row: li,
  control: oi,
  input: ii,
  label: ci,
  consequence: si
};
function _n({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
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
              "aria-describedby": Ea(b, c),
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
const di = "_root_1h1ot_2", ui = "_head_1h1ot_11", mi = "_index_1h1ot_25", hi = "_dot_1h1ot_29", wi = "_note_1h1ot_34", _i = "_counter_1h1ot_40", vi = "_trailing_1h1ot_48", Se = {
  root: di,
  head: ui,
  index: mi,
  dot: hi,
  note: wi,
  counter: _i,
  trailing: vi
};
function fi({ index: e }) {
  return e ? /* @__PURE__ */ l(M, { children: [
    /* @__PURE__ */ n("span", { className: `${Se.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Se.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function bi({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Se.counter, "aria-hidden": "true", children: e }) : null;
}
function gi({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Se.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Se.head, children: [
      /* @__PURE__ */ n(fi, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Se.note, children: t }),
    /* @__PURE__ */ n(bi, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Se.trailing, children: i })
  ] });
}
const pi = "_strip_1qhvo_2", Ni = "_cell_1qhvo_7", yi = "_value_1qhvo_12", ki = "_label_1qhvo_27", Qe = {
  strip: pi,
  cell: Ni,
  value: yi,
  label: ki
};
function $i(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function ma({ cells: e, divided: a = !1 }) {
  return $i(e), /* @__PURE__ */ n("dl", { className: `${Qe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Qe.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Qe.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Qe.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Ci = "_root_xk7sv_2", Si = "_track_xk7sv_8", Ri = "_thumb_xk7sv_35", Ti = "_labelHidden_xk7sv_53", Li = "_label_xk7sv_53", Ai = "_lockedNote_xk7sv_68", Re = {
  root: Ci,
  track: Si,
  thumb: Ri,
  labelHidden: Ti,
  label: Li,
  lockedNote: Ai
};
function xi(e) {
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
    /* @__PURE__ */ l("span", { id: s, className: xi(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Re.lockedNote, children: "always on" })
    ] })
  ] });
}
const Ei = "_bar_1u2kl_2", Ii = "_skip_1u2kl_11", qi = "_mark_1u2kl_22", Mi = "_nav_1u2kl_30", Bi = "_list_1u2kl_34", Pi = "_select_1u2kl_40", Di = "_dest_1u2kl_47", Oi = "_actor_1u2kl_61", Hi = "_actorMark_1u2kl_74", Fi = "_actorLabel_1u2kl_79", ji = "_tagline_1u2kl_98", re = {
  bar: Ei,
  skip: Ii,
  mark: qi,
  nav: Mi,
  list: Bi,
  select: Pi,
  dest: Di,
  actor: Oi,
  actorMark: Hi,
  actorLabel: Fi,
  tagline: ji
};
function Wi(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function zi(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function gy({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = zi(r);
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
      /* @__PURE__ */ n("span", { className: re.actorMark, "aria-hidden": "true", children: Wi(s) })
    ] })
  ] });
}
const Gi = "_tree_1lyby_2", Ki = "_item_1lyby_6", Ui = "_row_1lyby_10", Vi = "_button_1lyby_22", oa = {
  tree: Gi,
  item: Ki,
  row: Ui,
  button: Vi
}, vn = Ue(null);
function Yi({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ua({ orientation: "vertical" });
  return /* @__PURE__ */ n(vn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: oa.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const Ji = { ArrowRight: !0, ArrowLeft: !1 };
function Ua(e) {
  return e ? !0 : void 0;
}
function Xi(e, a) {
  const t = Ji[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Qi(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function Zi(e) {
  const a = [oa.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function ec(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function ac(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function nc(e) {
  return typeof e == "string" ? e : void 0;
}
function tc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function rc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function fn(e) {
  const a = Ke(vn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = ec(e);
  return /* @__PURE__ */ l("li", { className: oa.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Zi(e),
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
            className: `${oa.button} ward-treeitem-btn`,
            onClick: () => Qi(e),
            onKeyDown: (r) => Xi(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: ac(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: nc(e.label), children: e.label }),
              /* @__PURE__ */ n(tc, { value: e.detail }),
              /* @__PURE__ */ n(rc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const lc = "_frame_9lntd_2", oc = "_subjectRail_9lntd_21", ic = "_subject_9lntd_21", cc = "_rail_9lntd_41", sc = "_record_9lntd_63", dc = "_recordBody_9lntd_68", uc = "_band_9lntd_111", mc = "_bandBody_9lntd_120", hc = "_bandActions_9lntd_125", wc = "_scroller_9lntd_132", _c = "_lanes_9lntd_150", ie = {
  frame: lc,
  subjectRail: oc,
  subject: ic,
  rail: cc,
  record: sc,
  recordBody: dc,
  band: uc,
  bandBody: mc,
  bandActions: hc,
  scroller: wc,
  lanes: _c
};
function py({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: ie.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function Va(e) {
  return e ? "true" : void 0;
}
function Ny({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ie.subjectRail, "data-ward-subject-rail": t, "data-ruled": Va(i), children: [
    /* @__PURE__ */ n("div", { className: ie.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ie.rail, "data-sticky": Va(o), "aria-label": r, children: a })
  ] });
}
function yy({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: ie.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(gi, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: ie.recordBody, "data-pad": o, children: a })
  ] });
}
function ky({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: ie.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ie.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: ie.bandActions, children: a })
  ] });
}
const vc = "(max-width: 767.98px)";
function ka({ label: e, children: a }) {
  return /* @__PURE__ */ n("div", { className: ie.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", children: a });
}
function fc({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = p(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: ie.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(B, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(ka, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function $y({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = wn(vc);
  return t === void 0 ? /* @__PURE__ */ n(ka, { label: a, children: e }) : o ? /* @__PURE__ */ n(fc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(ka, { label: a, children: t.map((i) => /* @__PURE__ */ n(Xn, { children: i.content }, i.id)) });
}
const bc = "_block_1o5o7_2", gc = "_sentence_1o5o7_15", pc = "_meta_1o5o7_20", Nc = "_action_1o5o7_25", yc = "_strip_1o5o7_29", kc = "_loading_1o5o7_48", $c = "_label_1o5o7_56", Cc = "_counter_1o5o7_63", se = {
  block: bc,
  sentence: gc,
  meta: pc,
  action: Nc,
  strip: yc,
  loading: kc,
  label: $c,
  counter: Cc
};
function Sc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: se.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function ha({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${se.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: se.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Sc, { action: a })
  ] });
}
function Rc(e) {
  return /* @__PURE__ */ n(ha, { ...e });
}
function Cy({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ha, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: se.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function Sy(e) {
  return /* @__PURE__ */ n(ha, { ...e });
}
function Ry({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ha, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: se.meta, children: [
    "failed at ",
    ae(a)
  ] }) });
}
function Ty({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: se.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ae(e),
    " — showing snapshot from ",
    ae(a)
  ] });
}
function Ly({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: se.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    ae(a)
  ] });
}
function Ay({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  T(() => {
    const c = window.setTimeout(() => o(!0), ce.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = xa(t.current, r);
  return /* @__PURE__ */ l("div", { className: `${se.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: se.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: se.counter, children: La(i) }) : null
  ] });
}
const Tc = "_note_tlubt_2", Lc = {
  note: Tc
};
function Ac({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: Lc.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const xc = "_card_12in3_2", Ec = "_hit_12in3_23", Ic = "_head_12in3_30", qc = "_title_12in3_36", Mc = "_meta_12in3_44", Bc = "_fields_12in3_45", Pc = "_who_12in3_58", Dc = "_sep_12in3_65", Oc = "_mono_12in3_69", Hc = "_field_12in3_45", Fc = "_last_12in3_84", jc = "_reason_12in3_96", G = {
  card: xc,
  hit: Ec,
  head: Ic,
  title: qc,
  meta: Mc,
  fields: Bc,
  who: Pc,
  sep: Dc,
  mono: Oc,
  field: Hc,
  last: Fc,
  reason: jc
}, Wc = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function zc(e, a, t) {
  const r = Ze(e, "blue"), o = Ze(e, "orange"), i = Ze(e, "green"), c = N(/* @__PURE__ */ new Set());
  T(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = Wc[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const Gc = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : Y(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Kc(e, a) {
  return Gc[a](e);
}
function Uc({ item: e, connection: a }) {
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
function Vc({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: G.head, children: [
    e.flagged && /* @__PURE__ */ n(h, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function Yc({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: G.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Jc({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: G.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: G.field, children: Kc(e, t) }, t)) });
}
const $a = (e) => e ? !0 : void 0;
function Xc(e) {
  return { "--stream": `var(--ward-stream-${e.streamStep}-id)` };
}
function Qc(e, a, t) {
  e == null || e(a, t);
}
function Zc(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function es({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: G.last, "data-stale": $a(a), children: t }) : null;
}
function wa(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  zc(r, t.key, e.feed);
  const o = Zc(e.feed), i = Xc(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: G.hit, onClick: (c) => Qc(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Vc, { item: t }),
        /* @__PURE__ */ n("p", { className: G.title, children: t.title }),
        /* @__PURE__ */ n(Uc, { item: t, connection: o }),
        /* @__PURE__ */ n(Yc, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Jc, { item: t, fields: a }),
        /* @__PURE__ */ n(es, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const as = "_column_14784_3", ns = "_head_14784_24", ts = "_label_14784_33", rs = "_count_14784_42", ls = "_list_14784_56", je = {
  column: as,
  head: ns,
  label: ts,
  count: rs,
  list: ls
};
function bn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function os({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: je.head, children: [
    /* @__PURE__ */ n("h2", { className: je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function is(e) {
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
function cs({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = $(), m = e.cap !== void 0 && a.length > e.cap, _ = bn(a, r);
  return /* @__PURE__ */ l("section", { className: je.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(os, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(is, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    m && /* @__PURE__ */ n(Ac, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const ss = "_foot_8qg4p_2", ds = "_note_8qg4p_13", us = "_link_8qg4p_19", fa = {
  foot: ss,
  note: ds,
  link: us
};
function xy({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: fa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: fa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: fa.link, href: e, children: "Configure board" })
  ] });
}
const ms = "_head_1la6p_3", hs = "_identity_1la6p_12", ws = "_titleRow_1la6p_18", _s = "_title_1la6p_18", vs = "_key_1la6p_35", fs = "_rollup_1la6p_45", bs = "_tools_1la6p_53", gs = "_swatch_1la6p_62", ps = "_mark_1la6p_69", he = {
  head: ms,
  identity: hs,
  titleRow: ws,
  title: _s,
  key: vs,
  rollup: fs,
  tools: bs,
  swatch: gs,
  mark: ps
}, Ya = "initials:";
function Ns(e) {
  return e === void 0 ? "loaded this week unavailable" : `${J(e)} loaded this week`;
}
function ys(e) {
  const a = [`${J(e.inFlight)} in flight`, Ns(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${J(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ee(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ee(e.p90)}`), a.join(" · ");
}
function ks(e) {
  return e.startsWith(Ya) ? e.slice(Ya.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function $s({ markRef: e, streamStep: a }) {
  const t = { "--stream": `var(--ward-stream-${a}-id)` };
  return e ? /* @__PURE__ */ n("span", { className: `${he.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: ks(e) }) : /* @__PURE__ */ n("span", { className: he.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Cs({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(B, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Ey({
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
        /* @__PURE__ */ n($s, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: he.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: he.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: he.rollup, "aria-live": "polite", children: ys(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: he.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Cs, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(qa, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Ss = "_head_kabyh_11", Rs = "_line_kabyh_12", Ts = "_cHandle_kabyh_33", Ls = "_cName_kabyh_38", As = "_nameLine_kabyh_46", xs = "_cLabel_kabyh_53", Es = "_cCap_kabyh_58", Is = "_cShown_kabyh_63", qs = "_name_kabyh_46", Ms = "_noCap_kabyh_85", Bs = "_state_kabyh_99", Ps = "_handle_kabyh_104", Ds = "_sub_kabyh_118", A = {
  head: Ss,
  line: Rs,
  cHandle: Ts,
  cName: Ls,
  nameLine: As,
  cLabel: xs,
  cCap: Es,
  cShown: Is,
  name: qs,
  noCap: Ms,
  state: Bs,
  handle: Ps,
  sub: Ds
}, Os = "can't be hidden or collapsed", Hs = "terminal · counted, not a column";
function Iy() {
  return /* @__PURE__ */ l("div", { className: A.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: A.cHandle }),
    /* @__PURE__ */ n("span", { className: A.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: A.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: A.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: A.cShown, children: "Shown" })
  ] });
}
function Fs(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function js(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Ja(e) {
  return e.gate ? Os : e.terminal ? Hs : js(e.agentsMounted);
}
function Ws(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function zs({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: A.cName, children: [
    /* @__PURE__ */ l("span", { className: A.nameLine, children: [
      /* @__PURE__ */ n("span", { className: A.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(h, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    Ja(e) && /* @__PURE__ */ n("span", { className: A.sub, children: Ja(e) })
  ] });
}
function Gs(e) {
  return e === void 0 ? "" : String(e);
}
function Ks(e) {
  return e === "" ? void 0 : Number(e);
}
function Us({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: A.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: A.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Ws(t, a),
      children: "⠿"
    }
  ) });
}
function Vs({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${A.cCap} ${A.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: A.cCap, children: /* @__PURE__ */ n(B, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Gs(a.cap), onChange: (r) => t({ ...a, cap: Ks(r) }) }) });
}
function Ys({ stage: e, config: a, onChange: t }) {
  const r = Fs(e, a.shown);
  return /* @__PURE__ */ l("span", { className: A.cShown, children: [
    /* @__PURE__ */ n(Le, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: A.state, "aria-hidden": "true", children: r.state })
  ] });
}
function Js(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function qy({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: A.line, "data-kind": Js(e), children: [
    /* @__PURE__ */ n(Us, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(zs, { stage: e }),
    /* @__PURE__ */ n("span", { className: A.cLabel, children: /* @__PURE__ */ n(B, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(Vs, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Ys, { stage: e, config: a, onChange: t })
  ] });
}
const Xs = "_body_hn6d6_2", Qs = "_head_hn6d6_9", Zs = "_summary_hn6d6_19", ed = "_block_hn6d6_20", ad = "_actionsBlock_hn6d6_21", nd = "_title_hn6d6_41", td = "_note_hn6d6_46", rd = "_k_hn6d6_51", ld = "_kv_hn6d6_58", od = "_row_hn6d6_64", id = "_label_hn6d6_75", cd = "_value_hn6d6_84", sd = "_quote_hn6d6_90", dd = "_actions_hn6d6_21", ud = "_resolve_hn6d6_103", x = {
  body: Xs,
  head: Qs,
  summary: Zs,
  block: ed,
  actionsBlock: ad,
  title: nd,
  note: td,
  k: rd,
  kv: ld,
  row: od,
  label: id,
  value: cd,
  quote: sd,
  actions: dd,
  resolve: ud
};
function md(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function hd(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function wd(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(h, { role: "stream", label: `STEP ${e.streamStep}`, streamStep: e.streamStep }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ee(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...md(e),
    ...hd(e, a)
  ];
}
function _d({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: x.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: x.k, children: a }),
    e
  ] });
}
function vd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: x.head, children: [
    /* @__PURE__ */ n(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function fd({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: x.block, children: [
    /* @__PURE__ */ n("p", { className: x.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: x.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: x.note, children: e.agentMeta })
  ] }) : null;
}
function My({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = $(), d = wd(e, o);
  return /* @__PURE__ */ n(Ye, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: x.body, children: [
    /* @__PURE__ */ n(vd, { item: e }),
    /* @__PURE__ */ l("div", { className: x.summary, children: [
      /* @__PURE__ */ n("h2", { className: x.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: x.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: x.kv, children: d.map(([m, _]) => /* @__PURE__ */ l("div", { className: x.row, children: [
      /* @__PURE__ */ n("dt", { className: x.label, children: m }),
      /* @__PURE__ */ n("dd", { className: x.value, children: _ })
    ] }, m)) }),
    /* @__PURE__ */ n(fd, { item: e }),
    /* @__PURE__ */ l("div", { className: x.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: x.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: x.note, children: s })
    ] }),
    /* @__PURE__ */ n(_d, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const bd = "_root_3azmy_2", gd = "_list_3azmy_7", pd = "_item_3azmy_12", Nd = "_box_3azmy_18", yd = "_text_3azmy_23", kd = "_note_3azmy_28", Me = {
  root: bd,
  list: gd,
  item: pd,
  box: Nd,
  text: yd,
  note: kd
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
const $d = "_rail_ke7ch_2", Cd = "_k_ke7ch_11", Sd = "_head_ke7ch_19", Rd = "_section_ke7ch_25", Td = "_card_ke7ch_38", Ld = "_strip_ke7ch_42", Ad = "_skeleton_ke7ch_56", xd = "_skeletonLabel_ke7ch_70", Ed = "_bar_ke7ch_76", Id = "_note_ke7ch_85", oe = {
  rail: $d,
  k: Cd,
  head: Sd,
  section: Rd,
  card: Td,
  strip: Ld,
  skeleton: Ad,
  skeletonLabel: xd,
  bar: Ed,
  note: Id
};
function qd(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ba({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: oe.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: oe.k, children: e }),
    a
  ] });
}
function Md({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: oe.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: oe.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: oe.bar, "aria-hidden": "true" }, r))
  ] });
}
function Bd({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(cs, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function Pd(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Bd, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Md, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function By(e) {
  const a = qd(e.onOpen), t = bn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: oe.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${oe.k} ${oe.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(ba, { title: "Card", children: /* @__PURE__ */ n("div", { className: oe.card, children: t && /* @__PURE__ */ n(wa, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(ba, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: oe.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Pd, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: oe.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(ba, { title: "Effect of this config", children: /* @__PURE__ */ n(_a, { items: e.effects, density: "compact" }) })
  ] });
}
function Dd(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Od(e) {
  return Math.ceil(e.length / 2);
}
function Hd(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function gn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Fd(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = gn(e);
  o !== void 0 && t(o), r(Hd(e.type));
}
function jd(e, a, t, r, o) {
  T(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Fd(i, t, r, o));
  }, [e, a, t, r, o]);
}
function Wd(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function zd(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function Gd(e, a) {
  return a !== void 0 ? ee(e.timeInStage) + " · waits on " + a.agent : ee(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Kd(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + H.height.card + " + " + H.height.cardRow + " * " + String(Od(a ?? [])) + ")"
  };
}
function Ud(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Vd(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(h, { role: "meta", label: Y(e.cost) }) : null;
}
function Yd(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(h, { role: "meta", label: e.jiraKey }) : null;
}
function Jd(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Xd(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Qd(e, a) {
  return a === void 0 ? e : Dd(e, a.ref);
}
function Zd(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ze(e) {
  return e === !0 ? "true" : void 0;
}
function pn(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = Ze(o), c = N(/* @__PURE__ */ new Set()), [s, u] = p(Wd(a));
  jd(e.feed, a.key, c, u, i);
  const d = zd(a, r), m = Gd(a, t), _ = Kd(a, e.fields), b = Xd(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...Zd(e),
      className: "ward-workcard",
      "data-flagged": ze(a.flagged),
      "data-selected": ze(e.selected),
      style: _,
      ref: Qd(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Ud(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(h, { role: d.role, label: d.label }),
          Vd(a, e.fields),
          Yd(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Jd(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function eu({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function au(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function nu(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function tu(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(eu, { count: e.items.length, cap: e.column.cap });
}
function ru(e, a) {
  return e.roving ?? a;
}
function lu(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function ou(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    pn,
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
function iu(e) {
  const a = $(), t = ua({ orientation: "vertical" }), r = ru(e, t), o = au(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ze(o), "data-gate": ze(e.column.gate), children: [
    nu(e.column, e.items.length, a),
    tu(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...lu(e, t), children: ou(e, r) })
  ] });
}
function cu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ee(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ee(e.p90)), a;
}
function su(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(B, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function du(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function Py(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: cu(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      su(e),
      du(e.onConfigure),
      /* @__PURE__ */ n(qa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function uu(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function mu(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Le, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Le, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function hu(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(M, { children: [
    a > 0 ? /* @__PURE__ */ n(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(h, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function Dy(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": ze(uu(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: mu(e) }),
    /* @__PURE__ */ n(B, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(un, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    hu(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function Oy(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(pn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(iu, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function wu(e, a) {
  const t = gn(e);
  t !== void 0 && a(t);
}
function _u(e, a, t) {
  T(() => {
    if (e != null)
      return e.subscribe(a, (r) => wu(r, t));
  }, [e, a, t]);
}
function vu(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function fu(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ee(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", Y(e.cost)]), a;
}
function bu(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function gu(e, a) {
  return /* @__PURE__ */ l(M, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function Hy(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = p((c = a.run) == null ? void 0 : c.lastStep);
  _u(e.feed, a.key, o);
  const i = [...vu(a), ...fu(a)];
  return /* @__PURE__ */ l(Ye, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      bu(t, r)
    ] }),
    gu(a, e.actions)
  ] });
}
const pu = "_card_pioxl_2", Nu = "_head_pioxl_17", yu = "_mark_pioxl_25", ku = "_name_pioxl_37", $u = "_chips_pioxl_48", Cu = "_description_pioxl_54", Su = "_run_pioxl_59", Ru = "_sep_pioxl_68", fe = {
  card: pu,
  head: Nu,
  mark: yu,
  name: ku,
  chips: $u,
  description: Cu,
  run: Su,
  sep: Ru
}, Tu = { live: "done", draft: "running", paused: "meta" };
function Lu(e) {
  return e === void 0 ? fe.card : `${fe.card} ${e}`;
}
function Au({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: fe.chips, children: e.map((a) => /* @__PURE__ */ n(h, { role: Tu[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function xu({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.description, children: e });
}
function Eu({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: fe.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: fe.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Iu(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function qu({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, className: i }) {
  const c = { "--stream": `var(--ward-stream-${e.streamStep}-id)` }, s = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": s,
      className: Lu(i),
      style: c,
      "data-selected": s,
      "data-paused": Iu(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: fe.head, children: [
          /* @__PURE__ */ n("span", { className: fe.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${fe.name} ward-rowlink`, href: a, "aria-current": s, children: e.name })
        ] }),
        /* @__PURE__ */ n(xu, { description: e.description }),
        /* @__PURE__ */ n(Eu, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Au, { versions: e.versions })
      ]
    }
  );
}
const Mu = "_ladder_v5484_2", Bu = "_cell_v5484_7", Pu = "_empty_v5484_26", Du = "_name_v5484_34", Ou = "_holder_v5484_40", Hu = "_request_v5484_46", Fu = "_swatches_v5484_51", ju = "_swatch_v5484_51", Z = {
  ladder: Mu,
  cell: Bu,
  empty: Pu,
  name: Du,
  holder: Ou,
  request: Hu,
  swatches: Fu,
  swatch: ju
}, Wu = "not validated — needs CVD matrix and dark stepping";
function zu(e) {
  return e.reserved ? "reserved" : Aa(e.step) ? "validated" : "partial";
}
function Gu(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Xa(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Ku({ validation: e }) {
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
function Uu({ step: e, value: a, taken: t, onChange: r, swatch: o }) {
  const i = zu(e), c = Gu(i, t), s = c !== "free", u = e.name ?? `Step ${e.step}`, d = () => {
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
        /* @__PURE__ */ n(Ku, { validation: i }),
        /* @__PURE__ */ n("span", { className: `${Z.name} ward-ladder-name`, children: u }),
        /* @__PURE__ */ n("span", { className: `${Z.holder} ward-ladder-holder`, children: c })
      ]
    }
  );
}
function Vu(e) {
  for (const a of e)
    if (!a.reserved && !Ve(a.step)) throw new Error("colour ladder renders token steps only");
}
function Yu() {
  return /* @__PURE__ */ l("div", { className: `${Z.cell} ward-ladder-cell ${Z.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${Z.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${Z.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${Z.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Ju(e) {
  return "presentation" in e && e.presentation === "swatches";
}
function Nn(e) {
  const a = e.takenBy ?? {}, t = (o) => {
    var i;
    (i = e.onChange) == null || i.call(e, o);
  };
  Vu(e.steps);
  const r = Ju(e);
  return /* @__PURE__ */ l("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${r ? Z.swatches : Z.ladder} ward-ladder`, children: [
    e.steps.map((o) => /* @__PURE__ */ n(Uu, { step: o, value: e.value, taken: a[o.step], onChange: t, swatch: r }, o.step)),
    r ? null : /* @__PURE__ */ n(Yu, {})
  ] });
}
const Xu = "_rail_1el2t_2", Qu = "_section_1el2t_12", Zu = "_sectionFlush_1el2t_22", em = "_head_1el2t_26", am = "_headLabel_1el2t_34", nm = "_sample_1el2t_42", tm = "_sampleLabel_1el2t_47", rm = "_sampleTitle_1el2t_54", lm = "_sampleMeta_1el2t_59", om = "_trace_1el2t_65", im = "_traceHead_1el2t_70", cm = "_steps_1el2t_78", sm = "_step_1el2t_78", dm = "_stepTitle_1el2t_97", um = "_hollow_1el2t_107", mm = "_stepBody_1el2t_115", hm = "_stepDetail_1el2t_127", wm = "_publish_1el2t_132", _m = "_reason_1el2t_138", vm = "_note_1el2t_143", fm = "_reveal_1el2t_148", g = {
  rail: Xu,
  section: Qu,
  sectionFlush: Zu,
  head: em,
  headLabel: am,
  sample: nm,
  sampleLabel: tm,
  sampleTitle: rm,
  sampleMeta: lm,
  trace: om,
  traceHead: im,
  steps: cm,
  step: sm,
  stepTitle: dm,
  hollow: um,
  stepBody: mm,
  stepDetail: hm,
  publish: wm,
  reason: _m,
  note: vm,
  reveal: fm
}, en = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, bm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, gm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, pm = { notSimulated: "not simulated", running: "running" };
function Nm(e) {
  return e.presentation === "foundry";
}
function ym(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function km(e, a) {
  var r;
  const t = bm[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function $m(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Cm(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Sm(e) {
  if ($m(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Rm(e) {
  const [a, t] = p(!1);
  T(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${g.step} ${g.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Tm(e) {
  const a = pm[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: g.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ae, { size: 6, kind: gm[e.kind], label: e.kind });
}
function Lm(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: g.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Am(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function xm(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(Rm, { kind: a.kind, children: [
    /* @__PURE__ */ n(Tm, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: g.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: g.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Lm, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Am, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Em(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ee(a)), t.join(" · ");
}
function yn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${g.trace} ${g.section}`, children: [
    /* @__PURE__ */ n("p", { className: g.traceHead, id: a, children: Em(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: g.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(xm, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Im(e) {
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
function qm(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ae(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${g.sampleMeta} ${g.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Mm(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : Y(e.run.cost), label: "Cost" }, { value: e.run.turns ? cn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: g.sectionFlush, children: /* @__PURE__ */ n(ma, { divided: !0, cells: a }) });
}
function Bm(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: Y(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: cn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Pm(e) {
  const a = Bm(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: g.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: g.sectionFlush, children: /* @__PURE__ */ n(ma, { divided: !0, cells: a }) });
}
function kn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ l(M, { children: [
    /* @__PURE__ */ n("p", { className: `${g.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Dm(e) {
  return /* @__PURE__ */ l("div", { className: `${g.publish} ${g.section}`, children: [
    /* @__PURE__ */ n(kn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: g.note, children: e.note })
  ] });
}
function Om(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${g.publish} ${g.section}`, children: /* @__PURE__ */ n(kn, { reason: e.reason, onPublish: e.onPublish }) });
}
function $n(e) {
  return /* @__PURE__ */ l("div", { className: `${g.head} ${g.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: g.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(h, { role: en[e.run.status].role, label: en[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Hm(e, a) {
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
function Fm(e) {
  var t;
  Cm(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${g.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n($n, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Im, { sample: e.run.sample }),
    /* @__PURE__ */ n(yn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Mm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: g.section, children: /* @__PURE__ */ n(_a, { items: e.checklist }) }),
    /* @__PURE__ */ n(Dm, { reason: ym(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function jm(e) {
  var r;
  const a = Hm(e.run, e.feed);
  Sm(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${g.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n($n, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(qm, { sample: e.run.sample }),
    /* @__PURE__ */ n(yn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Pm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: g.section, children: /* @__PURE__ */ n(_a, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Om, { reason: km(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Fy(e) {
  return Nm(e) ? /* @__PURE__ */ n(jm, { ...e }) : /* @__PURE__ */ n(Fm, { ...e });
}
const Wm = "_list_142ip_3", zm = "_row_142ip_9", Gm = "_condition_142ip_18", Km = "_action_142ip_24", ea = {
  list: Wm,
  row: zm,
  condition: Gm,
  action: Km
}, Cn = Ue(!1);
function jy({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Cn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ea.list, "aria-label": a, children: e }) });
}
function Wy({ rule: e }) {
  if (!Ke(Cn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: ea.row, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: ea.condition, children: e.when }),
    /* @__PURE__ */ n(h, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: ea.action, children: e.then })
  ] });
}
function Ca(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [o] = r.splice(a, 1);
  return r.splice(t, 0, o), r;
}
function Sn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Rn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function an(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Um(e) {
  return e === "up" ? "down" : "up";
}
function Vm(e, a) {
  const t = an(e, a.id, a.direction) ?? an(e, a.id, Um(a.direction));
  t == null || t.focus();
}
function Tn() {
  const e = N(null), [a, t] = p(null), [r, o] = p("");
  return T(() => {
    e.current !== null && a !== null && Vm(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), o(s);
  } };
}
function Ln({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ia({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Ym = "_body_1h15q_2", Jm = "_title_1h15q_8", Xm = "_section_1h15q_13", Qm = "_legend_1h15q_18", Zm = "_stages_1h15q_26", eh = "_stage_1h15q_26", ah = "_stageIndex_1h15q_44", nh = "_stageName_1h15q_50", th = "_footer_1h15q_59", rh = "_note_1h15q_66", lh = "_reason_1h15q_71", oh = "_actions_1h15q_76", ih = "_webHead_1h15q_83", ch = "_kicker_1h15q_92", sh = "_webTitle_1h15q_99", dh = "_webBody_1h15q_105", uh = "_webSection_1h15q_109", mh = "_sectionHead_1h15q_121", hh = "_sectionNote_1h15q_129", wh = "_formLabel_1h15q_134", _h = "_identityRow_1h15q_139", vh = "_nameCell_1h15q_145", fh = "_keyCell_1h15q_150", bh = "_colourCell_1h15q_154", gh = "_colourStatus_1h15q_161", ph = "_webStages_1h15q_166", Nh = "_webStageList_1h15q_172", yh = "_webStage_1h15q_166", kh = "_webIndex_1h15q_191", $h = "_webStageName_1h15q_196", Ch = "_webMoves_1h15q_201", Sh = "_addStage_1h15q_215", Rh = "_addStageButton_1h15q_223", Th = "_addStageNote_1h15q_231", Lh = "_webFooter_1h15q_236", Ah = "_webFooterNotes_1h15q_244", xh = "_webNote_1h15q_251", w = {
  body: Ym,
  title: Jm,
  section: Xm,
  legend: Qm,
  stages: Zm,
  stage: eh,
  stageIndex: ah,
  stageName: nh,
  footer: th,
  note: rh,
  reason: lh,
  actions: oh,
  webHead: ih,
  kicker: ch,
  webTitle: sh,
  webBody: dh,
  webSection: uh,
  sectionHead: mh,
  sectionNote: hh,
  formLabel: wh,
  identityRow: _h,
  nameCell: vh,
  keyCell: fh,
  colourCell: bh,
  colourStatus: gh,
  webStages: ph,
  webStageList: Nh,
  webStage: yh,
  webIndex: kh,
  webStageName: $h,
  webMoves: Ch,
  addStage: Sh,
  addStageButton: Rh,
  addStageNote: Th,
  webFooter: Lh,
  webFooterNotes: Ah,
  webNote: xh
}, Eh = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
];
function An(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Ih(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function qh({ id: e, stage: a, index: t, total: r, onReplace: o, onMove: i }) {
  const c = An(a, t), s = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": s ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(B, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: `Stage ${t + 1} name`, value: a.name, onChange: (u) => o({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(B, { variant: s ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Eh, onChange: (u) => o({ ...a, kind: u }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ia, { id: e, name: c, direction: "up", onMove: () => i("up") }),
      t < r - 1 && /* @__PURE__ */ n(ia, { id: e, name: c, direction: "down", onMove: () => i("down") })
    ] })
  ] });
}
function Mh({ stages: e, onChange: a }) {
  const t = Ih(e.length), r = Tn(), o = (c, s) => {
    const u = Sn(c, s);
    t.current = Ca(t.current, c, u), r.moved({ id: t.current[u], direction: s }, Rn(An(e[c], c), u, e.length)), a(Ca(e, c, u));
  }, i = (c, s) => a(e.map((u, d) => d === c ? s : u));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: r.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, s) => /* @__PURE__ */ n(qh, { id: t.current[s], stage: c, index: s, total: e.length, onReplace: (u) => i(s, u), onMove: (u) => o(s, u) }, t.current[s])) }),
    /* @__PURE__ */ n(Ln, { text: r.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Bh = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Ph = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Dh = "A new stream starts as a draft. Nothing runs on it until you publish it.", Oh = "Create is disabled: name the stream and give it a key first.", Hh = "reorder with the ↑ ↓ buttons · min 2";
function Ma(e, a) {
  return !e.reserved && Aa(e.step) && a[e.step] === void 0;
}
function Fh(e, a) {
  const t = e.find((r) => Ma(r, a));
  return t ? t.step : 1;
}
function jh({ stages: e, onMove: a }) {
  const t = Tn(), r = (o, i) => {
    const c = Sn(o, i);
    t.moved({ id: e[o].id, direction: i }, Rn(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(M, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: w.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(h, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ia, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ia, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Ln, { text: t.announcement })
  ] });
}
function Wh({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: Dh }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function zh(e, a) {
  return e !== "" && a !== "" ? null : Oh;
}
function Gh(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = Ph, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = $(), [m, _] = p(""), [b, P] = p(""), [X, Q] = p(a[0].value), [ne, xe] = p(() => Fh(t, r)), [te, Ee] = p(e.stages ?? Bh), [Ie, k] = p(o[0].value), F = { name: m, key: b, streamStep: ne, owner: X, stages: te, policy: Ie }, de = zh(m, b);
  return /* @__PURE__ */ n(Ye, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ l("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(B, { kind: "input", label: "Stream name", value: m, onChange: _ }),
      /* @__PURE__ */ n(B, { kind: "input", label: "Key", value: b, onChange: P, mono: !0 }),
      /* @__PURE__ */ n(B, { kind: "select", label: "Owner", value: X, onChange: Q, options: a })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Nn, { label: "Stream colour", steps: t, value: ne, onChange: xe, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(jh, { stages: te, onMove: (ke, Vn) => Ee(Ca(te, ke, Vn)) })
    ] }),
    /* @__PURE__ */ n(_n, { legend: "Loop policy", options: o, value: Ie, onChange: k }),
    /* @__PURE__ */ n(Wh, { reason: de, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const xn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Kh = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function Uh(e, a, t, r, o, i) {
  var s;
  const c = ((s = xn.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function Vh(e, a) {
  return Yh(e) && Jh(e, a) && Xh(e);
}
function Yh(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Jh(e, a) {
  return e.colourStep !== null && Ma({ step: e.colourStep }, a);
}
function Xh(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Qh(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${Wu}.` : Ma({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Zh({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function ew({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Zh, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: Kh })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function aw({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function nw({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(B, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(B, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function tw(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [o, i] = p(""), [c, s] = p(""), [u, d] = p(e.owners[0] ?? ""), [m, _] = p(null), [b, P] = p("relay"), [X, Q] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), ne = Uh(o, c, u, m, b, X), xe = Vh(ne, r), te = X.find((k) => k.kind === "agent" && k.name.trim() !== ""), Ee = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Nn, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: m, onChange: _, takenBy: r })
  ] }), Ie = /* @__PURE__ */ l(M, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: Qh(m, r) }),
    /* @__PURE__ */ n(B, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map((k) => ({ value: k, label: k })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Ye, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(aw, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(nw, { name: o, setName: i, streamKey: c, setKey: s, colour: Ee, owner: Ie }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: Hh })
        ] }),
        /* @__PURE__ */ n(Mh, { stages: X, onChange: Q })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(_n, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: xn, onChange: P }) }),
      /* @__PURE__ */ n(ew, { ready: xe, draft: ne, agentStage: te, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function zy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(tw, { ...e }) : /* @__PURE__ */ n(Gh, { ...e });
}
const rw = "_row_bs8hc_2", lw = "_cell_bs8hc_6", ow = "_condition_bs8hc_11", iw = "_action_bs8hc_18", cw = "_contract_bs8hc_24", sw = "_contractCondition_bs8hc_33", dw = "_contractAction_bs8hc_39", K = {
  row: rw,
  cell: lw,
  condition: ow,
  action: iw,
  contract: cw,
  contractCondition: sw,
  contractAction: dw
}, En = ["advance", "block", "escalate", "requestReview"], nn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ca(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Ba(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: K.action, children: nn[e.then] }) : /* @__PURE__ */ n(
    B,
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
function uw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: K.condition, title: ca(e, r), children: ca(e, r) }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(h, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: Ba(e, a, t) })
  ] });
}
function mw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ l("td", { className: K.cell, children: [
      /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: K.condition, children: ca(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: K.cell, children: Ba(e, a, t) })
  ] });
}
function hw({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: K.contract, children: [
    /* @__PURE__ */ n(h, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: K.contractCondition, children: ca(e, r) }),
    /* @__PURE__ */ n(h, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: K.contractAction, children: Ba(e, a, t, !0) })
  ] });
}
const ww = { two: mw, four: uw, contract: hw };
function Gy(e) {
  var t;
  if (!En.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = ww[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const _w = "_column_lurgk_2", vw = "_head_lurgk_17", fw = "_index_lurgk_23", bw = "_name_lurgk_29", gw = "_meta_lurgk_38", pw = "_mono_lurgk_43", Nw = "_gate_lurgk_50", yw = "_reviewersLabel_lurgk_57", kw = "_reviewers_lurgk_57", $w = "_reviewer_lurgk_57", Cw = "_agents_lurgk_74", Sw = "_workflowColumn_lurgk_79", Rw = "_workflowHead_lurgk_96", Tw = "_stageRow_lurgk_102", Lw = "_stageLabel_lurgk_109", Aw = "_workflowTitle_lurgk_116", xw = "_workflowMeta_lurgk_122", Ew = "_workflowGate_lurgk_127", Iw = "_gateNote_lurgk_135", qw = "_cardNote_lurgk_140", Mw = "_reviewerList_lurgk_149", Bw = "_reviewerRow_lurgk_155", Pw = "_reviewerMark_lurgk_161", Dw = "_reviewerName_lurgk_171", Ow = "_terminalCard_lurgk_177", Hw = "_terminalCount_lurgk_186", Fw = "_workflowAgents_lurgk_192", jw = "_mount_lurgk_198", y = {
  column: _w,
  head: vw,
  index: fw,
  name: bw,
  meta: gw,
  mono: pw,
  gate: Nw,
  reviewersLabel: yw,
  reviewers: kw,
  reviewer: $w,
  agents: Cw,
  workflowColumn: Sw,
  workflowHead: Rw,
  stageRow: Tw,
  stageLabel: Lw,
  workflowTitle: Aw,
  workflowMeta: xw,
  workflowGate: Ew,
  gateNote: Iw,
  cardNote: qw,
  reviewerList: Mw,
  reviewerRow: Bw,
  reviewerMark: Pw,
  reviewerName: Dw,
  terminalCard: Ow,
  terminalCount: Hw,
  workflowAgents: Fw,
  mount: jw
}, Ww = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function In(e) {
  return `${Math.round(e * 100)}%`;
}
function zw({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ma, { cells: [
      { value: In(e.gateShare), label: "Gate share", accent: "amber" },
      { value: J(e.count), label: "In stage" }
    ] })
  ] });
}
function Gw({ stage: e }) {
  return /* @__PURE__ */ n(ma, { cells: [
    { value: J(e.count), label: "In stage" },
    { value: J(e.closedThisWeek ?? 0), label: "Closed this week" }
  ] });
}
function Kw({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(h, { role: e.kind === "gate" ? "gate" : "soft", label: Ww[e.kind] })
  ] });
}
function Uw({ stage: e }) {
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
function Vw({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(zw, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Gw, { stage: e }) : null;
}
function Yw({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Jw({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Kw, { stage: e, titleId: o }),
    /* @__PURE__ */ n(Uw, { stage: e }),
    /* @__PURE__ */ n(Vw, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(qu, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(Yw, { onMount: t })
  ] });
}
const Xw = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function Qw({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, a.initials)) });
}
function Zw({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Qw, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: In(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function e_({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: e.closedThisWeek ?? 0 }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: "items closed this week" })
  ] });
}
function a_(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function n_(e) {
  if (e.kind === "terminal") return `${e.closedThisWeek ?? 0} this week`;
  const a = a_(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function t_({ stage: e, titleId: a }) {
  const t = Xw[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(h, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: n_(e) })
  ] });
}
function r_(e) {
  return e === "entry" || e === "agent";
}
function l_({ stage: e, onMount: a }) {
  return a === void 0 || !r_(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function o_({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(t_, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Zw, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(e_, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(l_, { stage: e, onMount: t })
  ] });
}
function i_(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function Ky(e) {
  return i_(e) ? /* @__PURE__ */ n(o_, { ...e }) : /* @__PURE__ */ n(Jw, { ...e });
}
const c_ = "_row_ve78g_6", s_ = "_cell_ve78g_10", d_ = "_name_ve78g_19", u_ = "_chain_ve78g_26", m_ = "_owner_ve78g_32", h_ = "_mono_ve78g_38", w_ = "_compactRow_ve78g_45", __ = "_compactCell_ve78g_54", v_ = "_stack_ve78g_71", f_ = "_stat_ve78g_78", b_ = "_identityLine_ve78g_85", g_ = "_identity_ve78g_85", p_ = "_compactName_ve78g_103", N_ = "_ownerLine_ve78g_117", y_ = "_link_ve78g_130", k_ = "_emptyChain_ve78g_136", $_ = "_arrow_ve78g_142", C_ = "_muted_ve78g_143", S_ = "_define_ve78g_148", R_ = "_statValue_ve78g_155", T_ = "_policyId_ve78g_161", L_ = "_sub_ve78g_166", f = {
  row: c_,
  cell: s_,
  name: d_,
  chain: u_,
  owner: m_,
  mono: h_,
  compactRow: w_,
  compactCell: __,
  stack: v_,
  stat: f_,
  identityLine: b_,
  identity: g_,
  compactName: p_,
  ownerLine: N_,
  link: y_,
  emptyChain: k_,
  arrow: $_,
  muted: C_,
  define: S_,
  statValue: R_,
  policyId: T_,
  sub: L_
};
function A_(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function x_(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function E_(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${e.members} members`;
}
function I_(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(h, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: E_(e) })
  ] }) });
}
function q_(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(h, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function M_(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : q_(e) });
}
function tn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function B_(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function P_(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function D_({ stream: e, href: a, presentation: t }) {
  const r = x_(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": `var(--ward-stream-${e.streamStep}-chip)` }, children: [
    I_(e, a),
    M_(e.stages, a),
    tn(P_(e.agents), e.agents === void 0 ? void 0 : A_(e.agents), "—"),
    B_(e.policy),
    tn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function O_(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function Uy(e) {
  if (O_(e)) return D_(e);
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
const H_ = "_row_1nbe9_2", F_ = "_name_1nbe9_15", j_ = "_scope_1nbe9_25", sa = {
  row: H_,
  name: F_,
  scope: j_
};
function W_(e) {
  return e === void 0 ? `${sa.row} ward-toolrow` : `${sa.row} ward-toolrow ${e}`;
}
function z_(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function G_({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
function K_({ classification: e }) {
  return /* @__PURE__ */ n(h, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function U_({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${sa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function V_(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Vy({ tool: e, onChange: a, presentation: t }) {
  const r = $(), o = $(), i = z_(e, t), c = V_(t);
  return /* @__PURE__ */ l(c, { className: W_(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(G_, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${sa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(U_, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(K_, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(h, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Y_ = "_strip_g84q9_2", J_ = "_head_g84q9_10", X_ = "_name_g84q9_16", Q_ = "_chart_g84q9_24", Z_ = "_segment_g84q9_30", ev = "_detailedChart_g84q9_36", be = {
  strip: Y_,
  head: J_,
  name: X_,
  chart: Q_,
  segment: Z_,
  detailedChart: ev
}, Sa = [1, 2, 3, 4, 5, 6], da = 100;
function av(e, a) {
  return a.has(e) ? `var(--ward-stream-${e}-id, var(--ward-color-line2))` : "var(--ward-color-line)";
}
function nv({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: be.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Sa.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: be.segment,
      x: o * da,
      y: "0",
      width: da,
      height: "8",
      fill: av(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function tv(e) {
  return e !== null && Ve(e) ? mt(e) : H.color.line2;
}
function rv(e) {
  const a = e.slice(0, Sa.length);
  for (; a.length < Sa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function lv({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${be.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * da),
        y: "0",
        width: String(da),
        height: "40",
        style: { fill: tv(a.streamStep) }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function qn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ov(e) {
  const a = rv(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("section", { className: `${be.strip} ward-appearance`, "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(wa, { item: e.sample, onOpen: qn(e.onOpen), feed: null }),
    /* @__PURE__ */ l("p", { className: `${be.head} ward-envrow ward-appearance-head`, children: [
      /* @__PURE__ */ n("span", { className: "ward-identity", "aria-hidden": "true" }),
      t.streamStep !== null && Ve(t.streamStep) ? /* @__PURE__ */ n(h, { role: "stream", label: t.key, streamStep: t.streamStep }) : /* @__PURE__ */ n(h, { role: "meta", label: t.key }),
      /* @__PURE__ */ n("span", { className: `${be.name} ward-rowlink`, children: t.name })
    ] }),
    /* @__PURE__ */ n("p", { className: "ward-checklist-note", children: "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on." }),
    /* @__PURE__ */ n(lv, { identities: a })
  ] });
}
function iv({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": `var(--ward-stream-${e.streamStep}-id)` };
  return /* @__PURE__ */ l("section", { className: be.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: be.head, children: [
      /* @__PURE__ */ n(Ae, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: be.name, children: e.name }),
      /* @__PURE__ */ n(h, { role: "stream", label: e.key, streamStep: e.streamStep })
    ] }),
    /* @__PURE__ */ n(wa, { item: { ...a, streamStep: e.streamStep }, onOpen: qn(r) }),
    /* @__PURE__ */ n(nv, { draft: e, streams: t })
  ] });
}
function Yy(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(ov, { ...e }) : /* @__PURE__ */ n(iv, { ...e });
}
const cv = "_row_ixlg5_6", sv = "_headCell_ixlg5_10", dv = "_cell_ixlg5_11", uv = "_name_ixlg5_23", mv = "_consequence_ixlg5_29", hv = "_governed_ixlg5_36", wv = "_control_ixlg5_42", _v = "_byRole_ixlg5_48", vv = "_webControl_ixlg5_59", fv = "_webConsequence_ixlg5_65", bv = "_webGoverned_ixlg5_71", I = {
  row: cv,
  headCell: sv,
  cell: dv,
  name: uv,
  consequence: mv,
  governed: hv,
  control: wv,
  byRole: _v,
  webControl: vv,
  webConsequence: fv,
  webGoverned: bv
};
function gv({
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
function pv({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n(gv, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Nv(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function yv({ name: e, cell: a, onChange: t }) {
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
function kv({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: I.row, children: [
    /* @__PURE__ */ l("td", { className: I.cell, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${I.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n(yv, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: I.cell, children: /* @__PURE__ */ n("span", { className: `${I.webGoverned} ward-cellmeta`, children: Nv(e) }) })
  ] });
}
function Jy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(kv, { ...e }) : /* @__PURE__ */ n(pv, { ...e });
}
const $v = "_row_vv64h_2", Cv = "_cell_vv64h_6", Sv = "_name_vv64h_25", Rv = "_note_vv64h_30", Tv = "_webName_vv64h_41", Lv = "_webMeta_vv64h_47", W = {
  row: $v,
  cell: Cv,
  name: Sv,
  note: Rv,
  webName: Tv,
  webMeta: Lv
}, Mn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Av(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function xv({ component: e, onRestart: a }) {
  const t = $(), r = Mn[e.state], o = e.state === "drainFirst";
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
function Ev({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: Av(e.state) });
}
function Iv({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(h, { ...Mn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(Ev, { component: e, onRestart: a }) })
  ] });
}
function Xy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Iv, { ...e }) : /* @__PURE__ */ n(xv, { ...e });
}
const qv = "_row_1f1gp_7", Mv = "_cell_1f1gp_11", Bv = "_next_1f1gp_28", Pv = "_headCell_1f1gp_38", Dv = "_webId_1f1gp_77", Ov = "_webPurpose_1f1gp_83", Hv = "_webMeta_1f1gp_91", Fv = "_webUrgent_1f1gp_97", D = {
  row: qv,
  cell: Mv,
  next: Bv,
  headCell: Pv,
  webId: Dv,
  webPurpose: Ov,
  webMeta: Hv,
  webUrgent: Fv
}, jv = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Wv = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, Bn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], zv = Object.fromEntries(Bn.map((e) => [e.key, e]));
function Be({ column: e, children: a }) {
  const t = zv[e];
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
function Qy() {
  return /* @__PURE__ */ n("tr", { children: Bn.map((e) => /* @__PURE__ */ n(
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
function Gv({ cred: e }) {
  const a = jv[e.state];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ n(Be, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Be, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Be, { column: "state", children: /* @__PURE__ */ n(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Be, { column: "cls", children: /* @__PURE__ */ n(h, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Be, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Be, { column: "next", children: /* @__PURE__ */ n("span", { className: D.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Kv({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ${D.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function Uv({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Kv, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(h, { ...Wv[e.state] }) })
  ] });
}
function Zy(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Uv, { ...e }) : /* @__PURE__ */ n(Gv, { ...e });
}
const Vv = "_card_17zba_2", Yv = "_head_17zba_11", Jv = "_env_17zba_18", Xv = "_version_17zba_25", Qv = "_meta_17zba_32", Zv = "_webCard_17zba_37", ef = "_webRow_17zba_47", af = "_webTitle_17zba_55", nf = "_webLine_17zba_65", tf = "_webVersion_17zba_72", rf = "_webMeta_17zba_77", j = {
  card: Vv,
  head: Yv,
  env: Jv,
  version: Xv,
  meta: Qv,
  webCard: Zv,
  webRow: ef,
  webTitle: af,
  webLine: nf,
  webVersion: tf,
  webMeta: rf
}, Pn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function lf({ env: e }) {
  const a = Pn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function of(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ae(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function cf(e) {
  return /* @__PURE__ */ l("article", { className: `${j.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${j.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${j.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(h, { ...Pn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${j.version} ${j.webVersion} ${j.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${j.meta} ${j.webMeta} ${j.webLine} ward-cellmeta`, children: of(e) })
  ] });
}
function ek(e) {
  return "presentation" in e ? /* @__PURE__ */ n(cf, { ...e }) : /* @__PURE__ */ n(lf, { ...e });
}
const sf = "_upload_erepj_2", df = "_preview_erepj_7", uf = "_mark_erepj_17", mf = "_empty_erepj_22", hf = "_actions_erepj_28", wf = "_input_erepj_33", _f = "_reasons_erepj_41", vf = "_reason_erepj_41", ff = "_accepted_erepj_57", V = {
  upload: sf,
  preview: df,
  mark: uf,
  empty: mf,
  actions: hf,
  input: wf,
  reasons: _f,
  reason: vf,
  accepted: ff
}, Dn = 1.5, On = 22, Ge = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Dn}px at ${On}px`];
function bf() {
  return { ok: !1, reasons: [Ge[1]] };
}
function gf(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function pf(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ge[0]] : [];
}
function Nf(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ge[1]), e.querySelector("text") !== null && t.push(Ge[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function yf(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? On / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Dn;
  }) ? [Ge[3]] : [];
}
function ak(e) {
  const a = gf(e);
  if (a === null) return bf();
  const t = [...pf(a), ...Nf(a, e), ...yf(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const kf = "Mark accepted.";
function $f({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: V.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: V.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: V.empty }) });
}
function Cf(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Sf(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Rf({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: V.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: V.result, role: "status", children: /* @__PURE__ */ n("p", { className: V.accepted, children: kf }) }) : /* @__PURE__ */ n("div", { className: V.result, role: "status", children: /* @__PURE__ */ n("ul", { className: V.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: V.reason, children: a }, a)) }) });
}
function Tf({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Rf, { result: e }) : /* @__PURE__ */ n("p", { className: `${V.result} ${Cf(e, t)}`, role: "status", children: Sf(e, t) });
}
function nk({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = p(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: V.upload, children: [
    /* @__PURE__ */ n($f, { current: e }),
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
    /* @__PURE__ */ n(Tf, { result: i, presentation: r })
  ] });
}
const Lf = "_row_1wp9s_7", Af = "_cell_1wp9s_11", xf = "_head_1wp9s_28", Ef = "_name_1wp9s_34", If = "_pinned_1wp9s_42", qf = "_headCell_1wp9s_49", Mf = "_webName_1wp9s_88", Bf = "_webMeta_1wp9s_95", Pf = "_webWarn_1wp9s_103", L = {
  row: Lf,
  cell: Af,
  head: xf,
  name: Ef,
  pinned: If,
  headCell: qf,
  webName: Mf,
  webMeta: Bf,
  webWarn: Pf
}, Pa = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, Hn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Df = Object.fromEntries(Hn.map((e) => [e.key, e]));
function Of(e, a) {
  return `mcp.${e}.${a}`;
}
function Hf(e) {
  return Object.keys(Pa).includes(e);
}
function Ff(e) {
  return Pa[e !== void 0 && Hf(e) ? e : "unknown"];
}
function Fe({ column: e, children: a }) {
  const t = Df[e];
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
function tk() {
  return /* @__PURE__ */ n("tr", { children: Hn.map((e) => /* @__PURE__ */ n(
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
function jf({ server: e }) {
  const a = Pa[e.connection];
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
    /* @__PURE__ */ n(Fe, { column: "tools", children: e.tools.map((t) => Of(e.name, t)).join(" · ") })
  ] });
}
function Wf(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function zf(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Gf({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${L.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${L.webMeta} ward-cellmeta`, children: e });
}
function Kf({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${L.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Uf({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Vf({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: L.row, children: [
    /* @__PURE__ */ l("td", { className: L.cell, children: [
      /* @__PURE__ */ n("span", { className: `${L.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${L.webMeta} ward-cellmeta`, children: Wf(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n("span", { className: `${L.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(h, { ...zf(e) }) }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(Gf, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(h, { ...Ff(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: L.cell, children: [
      /* @__PURE__ */ n(Kf, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Uf, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function rk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Vf, { ...e }) : /* @__PURE__ */ n(jf, { ...e });
}
const Yf = "_row_1h9nq_2", Jf = "_headCell_1h9nq_14", Xf = "_cell_1h9nq_15", Qf = "_name_1h9nq_26", Zf = "_consequence_1h9nq_32", eb = "_reason_1h9nq_38", ab = "_value_1h9nq_44", nb = "_webRow_1h9nq_60", tb = "_webSetting_1h9nq_71", rb = "_webName_1h9nq_79", lb = "_webConsequence_1h9nq_87", ob = "_webControl_1h9nq_93", ib = "_webState_1h9nq_106", cb = "_webChip_1h9nq_111", R = {
  row: Yf,
  headCell: Jf,
  cell: Xf,
  name: Qf,
  consequence: Zf,
  reason: eb,
  value: ab,
  webRow: nb,
  webSetting: tb,
  webName: rb,
  webConsequence: lb,
  webControl: ob,
  webState: ib,
  webChip: cb
}, Fn = 104, jn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function sb({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Le, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(mn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: R.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function db({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = $(), i = jn[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: R.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: R.headCell, children: [
      /* @__PURE__ */ n("span", { className: R.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: R.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: R.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: R.cell, children: /* @__PURE__ */ n(sb, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: R.cell, style: { width: Fn }, children: /* @__PURE__ */ n(h, { role: i.role, label: i.label }) })
  ] });
}
function Wn(e, a) {
  return String(e ?? a);
}
function ub(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function mb(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Wn(e.value, "—");
}
function hb({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: R.webControl, children: [
    /* @__PURE__ */ n(Le, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: R.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function wb(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(hb, { ...e });
  const o = ub(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: R.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(mn, { options: o, value: Wn(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${R.webControl} ${R.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: mb(a) });
}
function _b({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = $(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${R.row} ${R.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: R.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${R.name} ${R.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${R.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: R.webControl, children: i(c) }) : /* @__PURE__ */ n(wb, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${R.webChip} ward-policy-chip`, style: { width: Fn }, children: /* @__PURE__ */ n(h, { ...jn[t], size: "tag" }) })
  ] });
}
function lk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(_b, { ...e }) : /* @__PURE__ */ n(db, { ...e });
}
const vb = "_label_1o9za_7", fb = "_name_1o9za_15", bb = "_column_1o9za_24", gb = "_webFrame_1o9za_57", pb = "_webHead_1o9za_62", Nb = "_webHeadLabel_1o9za_74", yb = "_webLabel_1o9za_112", kb = "_webColumns_1o9za_119", $b = "_webGroup_1o9za_125", Cb = "_webPeople_1o9za_126", Sb = "_webVia_1o9za_127", Rb = "_webMeta_1o9za_156", O = {
  label: vb,
  name: fb,
  column: bb,
  webFrame: gb,
  webHead: pb,
  webHeadLabel: Nb,
  webLabel: yb,
  webColumns: kb,
  webGroup: $b,
  webPeople: Cb,
  webVia: Sb,
  webMeta: Rb
}, Tb = {
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
      className: O.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function Lb(e) {
  if (!e.matrixRole) return;
  const a = Tb[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Ab({ node: e }) {
  const a = Lb(e);
  return /* @__PURE__ */ l("span", { className: O.label, children: [
    /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
    /* @__PURE__ */ n(xb, { role: a, node: e }),
    /* @__PURE__ */ n(pa, { column: ga[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(pa, { column: ga[1], children: e.people === void 0 ? "" : J(e.people) }),
    /* @__PURE__ */ n(pa, { column: ga[2], children: e.requestedVia ?? "" })
  ] });
}
function xb({ role: e, node: a }) {
  return /* @__PURE__ */ l(M, { children: [
    e && /* @__PURE__ */ n(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(h, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(h, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Eb({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    fn,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(Ab, { node: t }),
      children: c
    }
  );
}
function Na({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Ib({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${O.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Na, { className: `${O.webMeta} ${O.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Na, { className: `${O.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Na, { className: `${O.webMeta} ${O.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function qb() {
  return /* @__PURE__ */ l("div", { className: O.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: O.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: O.webColumns, children: [
      /* @__PURE__ */ n("span", { className: O.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: O.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: O.webVia, children: "Requested via" })
    ] })
  ] });
}
function Mb({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${O.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Bb(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Pb({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: O.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(qb, {}),
    /* @__PURE__ */ n(Yi, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      fn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Mb, { row: t }),
        detail: /* @__PURE__ */ n(Ib, { row: t }),
        expanded: Bb(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function ok(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Pb, { ...e }) : /* @__PURE__ */ n(Eb, { ...e });
}
const Db = "_runbook_b9agc_2", Ob = "_list_b9agc_7", Hb = "_step_b9agc_15", Fb = "_numeral_b9agc_21", jb = "_body_b9agc_28", Wb = "_head_b9agc_34", zb = "_title_b9agc_40", Gb = "_detail_b9agc_45", Kb = "_actions_b9agc_50", Ub = "_webList_b9agc_56", Vb = "_webStep_b9agc_60", Yb = "_webBody_b9agc_66", Jb = "_webTitle_b9agc_74", Xb = "_webDetail_b9agc_78", S = {
  runbook: Db,
  list: Ob,
  step: Hb,
  numeral: Fb,
  body: jb,
  head: Wb,
  title: zb,
  detail: Gb,
  actions: Kb,
  webList: Ub,
  webStep: Vb,
  webBody: Yb,
  webTitle: Jb,
  webDetail: Xb
}, zn = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function Gn(e) {
  return String(e + 1).padStart(2, "0");
}
function Qb({ step: e, index: a, connection: t }) {
  const r = zn[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: Gn(a) }),
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
function Zb({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(Qb, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function eg({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Gn(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(h, { ...zn[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function ag({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(eg, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function ik(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ag, { ...e }) : /* @__PURE__ */ n(Zb, { ...e });
}
const ng = "_list_1gu6a_2", tg = "_check_1gu6a_10", rg = "_body_1gu6a_16", lg = "_text_1gu6a_23", og = "_pending_1gu6a_32", ig = "_measured_1gu6a_37", De = {
  list: ng,
  check: tg,
  body: rg,
  text: lg,
  pending: og,
  measured: ig
};
function cg(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function sg({ check: e }) {
  const a = cg(e.passed);
  return /* @__PURE__ */ l("li", { className: `${De.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Ia, { state: a.state, label: a.label }),
    /* @__PURE__ */ l("span", { className: De.body, children: [
      /* @__PURE__ */ n("span", { className: De.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ l("span", { className: De.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: De.measured, children: e.measured })
  ] });
}
function ck({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${De.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(sg, { check: a }, a.text)) });
}
const dg = "_root_16pdz_2", ug = "_list_16pdz_9", mg = "_line_16pdz_16", hg = "_at_16pdz_43", wg = "_text_16pdz_47", _g = "_foot_16pdz_51", vg = "_idle_16pdz_62", fg = "_caret_16pdz_69", bg = "_jump_16pdz_76", we = {
  root: dg,
  list: ug,
  line: mg,
  at: hg,
  text: wg,
  foot: _g,
  idle: vg,
  caret: fg,
  jump: bg
}, gg = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Da(e) {
  return Number.isNaN(Date.parse(e)) ? "" : gg.format(new Date(e));
}
const pg = { warn: "warning", ok: "ok" };
function Ng({ kind: e }) {
  const a = pg[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function yg({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Da(e)}` });
}
function kg({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events — as of ${Da(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${we.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${we.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: we.idle, children: i }),
    /* @__PURE__ */ n(yg, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function sk({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
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
      /* @__PURE__ */ n("span", { className: we.at, children: Da(d.at) }),
      /* @__PURE__ */ n(Ng, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: we.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${m}`)) }),
    /* @__PURE__ */ n(kg, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${we.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const $g = "_row_11jhe_2", Cg = "_head_11jhe_14", Sg = "_author_11jhe_20", Rg = "_eta_11jhe_25", Tg = "_edited_11jhe_26", Lg = "_body_11jhe_32", Ag = "_reason_11jhe_37", xg = "_actions_11jhe_42", me = {
  row: $g,
  head: Cg,
  author: Sg,
  eta: Rg,
  edited: Tg,
  body: Lg,
  reason: Ag,
  actions: xg
}, Eg = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function Ig(e) {
  return {
    queued: `Still in the outbox — editing replaces the queued row and recomputes req_hash, so ${e} receives one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed — edit and resend, or cancel the delivery."
  };
}
function qg({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(M, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(M, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(M, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(M, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function Mg({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(M, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: me.reason, id: a, children: e })
  ] });
}
function Bg(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Pg(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(qg, { ...e }) : /* @__PURE__ */ n(Mg, { reason: e.unavailable, reasonId: e.unavailableId });
}
function dk(e) {
  const { comment: a } = e;
  Bg(e);
  const t = $(), r = `${t}-unavailable`, o = Eg[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${me.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: me.head, children: [
      /* @__PURE__ */ n("span", { className: me.author, children: a.author }),
      /* @__PURE__ */ n(h, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: me.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: me.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: me.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: me.reason, id: t, children: Ig(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: me.actions, children: /* @__PURE__ */ n(Pg, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Dg = "_root_c46wj_2", Og = "_attach_c46wj_11", Hg = "_actions_c46wj_17", Fg = "_reply_c46wj_23", jg = "_replyRow_c46wj_28", Wg = "_sendsAs_c46wj_42", He = {
  root: Dg,
  attach: Og,
  actions: Hg,
  reply: Fg,
  replyRow: jg,
  sendsAs: Wg
};
function zg({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = p(""), i = $();
  return /* @__PURE__ */ l("div", { className: He.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: He.replyRow, children: [
      /* @__PURE__ */ n(B, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: He.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function uk(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(zg, { ...e }) : /* @__PURE__ */ n(Gg, { ...e });
}
function Gg({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = p("");
  return /* @__PURE__ */ l("div", { className: He.root, children: [
    /* @__PURE__ */ n(B, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ l("div", { className: He.attach, children: [
      /* @__PURE__ */ n(h, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      un,
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
const Kg = "_list_1ih9e_2", Ug = "_item_1ih9e_6", Vg = "_body_1ih9e_22", Yg = "_text_1ih9e_28", Jg = "_evidence_1ih9e_37", Xg = "_consequence_1ih9e_49", Qg = "_note_1ih9e_54", Te = {
  list: Kg,
  item: Ug,
  body: Vg,
  text: Yg,
  evidence: Jg,
  consequence: Xg,
  note: Qg
};
function Zg({ criterion: e }) {
  return /* @__PURE__ */ n(Ae, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function rn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function ep(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function ap({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Te.body, children: [
    /* @__PURE__ */ n("span", { className: Te.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(M, { children: [
      /* @__PURE__ */ n(rn, { text: " — " }),
      /* @__PURE__ */ n("code", { className: Te.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(M, { children: [
      /* @__PURE__ */ n(rn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Te.consequence, children: ep(e.why) })
    ] })
  ] });
}
function np({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Te.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Zg, { criterion: e }),
    /* @__PURE__ */ n(ap, { criterion: e })
  ] });
}
function mk({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Te.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(np, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Te.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const tp = "_list_dwhoz_2", rp = "_rung_dwhoz_6", lp = "_name_dwhoz_18", op = "_actor_dwhoz_32", aa = {
  list: tp,
  rung: rp,
  name: lp,
  actor: op
}, ip = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function cp({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = ip[e.state];
  return /* @__PURE__ */ l("li", { className: aa.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: aa.name, children: e.name }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${aa.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function hk({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${aa.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(cp, { rung: a }, a.name)) });
}
const sp = "_sheet_1fqco_2", dp = "_title_1fqco_9", up = "_stage_1fqco_15", mp = "_effects_1fqco_20", hp = "_effect_1fqco_20", wp = "_numeral_1fqco_31", _p = "_effectText_1fqco_38", vp = "_refusals_1fqco_43", fp = "_reasons_1fqco_52", bp = "_reason_1fqco_52", gp = "_actions_1fqco_62", le = {
  sheet: sp,
  title: dp,
  stage: up,
  effects: mp,
  effect: hp,
  numeral: wp,
  effectText: _p,
  refusals: vp,
  reasons: fp,
  reason: bp,
  actions: gp
};
function pp({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function wk({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
  const s = $(), u = `${s}-refusal`, [d, m] = p(""), _ = t.length > 0;
  return /* @__PURE__ */ n(Ye, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ l("div", { className: le.sheet, children: [
    /* @__PURE__ */ l("h2", { className: le.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: le.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: le.effects, children: a.map((b, P) => /* @__PURE__ */ l("li", { className: le.effect, children: [
      /* @__PURE__ */ n("span", { className: le.numeral, children: String(P + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: le.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      jo,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(B, { kind: "textarea", label: "Note for the agent", value: d, onChange: m }),
    _ && /* @__PURE__ */ l("div", { className: le.refusals, children: [
      /* @__PURE__ */ n(h, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: le.reasons, children: t.map((b, P) => /* @__PURE__ */ n("li", { className: le.reason, id: P === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: le.actions, children: [
      /* @__PURE__ */ n(pp, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const Np = "_list_1hvqu_2", yp = "_path_1hvqu_7", kp = "_head_1hvqu_21", $p = "_label_1hvqu_28", Cp = "_consequence_1hvqu_35", Sp = "_ask_1hvqu_36", Oe = {
  list: Np,
  path: yp,
  head: kp,
  label: $p,
  consequence: Cp,
  ask: Sp
}, Ra = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function ln(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Rp({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: Ra[e.kind] }) : /* @__PURE__ */ l(M, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: Ra[e.kind] }),
    /* @__PURE__ */ n("span", { className: Oe.ask, id: r, children: e.askInstead })
  ] });
}
function Tp({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: Oe.path, "data-allowed": e.allowed, "data-role": ln(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: Oe.head, children: [
      /* @__PURE__ */ n("span", { className: Oe.label, children: e.title ?? Ra[e.kind] }),
      /* @__PURE__ */ n(h, { role: ln(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Oe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(Rp, { path: e, primary: a, onChoose: t })
  ] });
}
function _k({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Oe.list, children: e.map((t, r) => /* @__PURE__ */ n(Tp, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const Lp = "_list_qjv4r_2", Ap = "_item_qjv4r_6", xp = "_node_qjv4r_18", Ep = "_body_qjv4r_24", Ip = "_head_qjv4r_30", qp = "_stage_qjv4r_36", Mp = "_version_qjv4r_41", Bp = "_sentence_qjv4r_49", Pp = "_meta_qjv4r_54", _e = {
  list: Lp,
  item: Ap,
  node: xp,
  body: Ep,
  head: Ip,
  stage: qp,
  version: Mp,
  sentence: Bp,
  meta: Pp
}, Dp = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Op({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: _e.head, children: [
    /* @__PURE__ */ n("span", { className: _e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: _e.version, title: e.version, children: e.version }) : null
  ] });
}
function Hp({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${_e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${_e.node} ward-history-node`, children: /* @__PURE__ */ n(Ae, { size: 9, kind: Dp[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${_e.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Op, { entry: e }),
      /* @__PURE__ */ n("span", { className: _e.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${_e.meta} ward-history-meta`, children: [
        `${ae(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${Y(e.cost)}`
      ] })
    ] })
  ] });
}
function vk({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${_e.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Hp, { entry: a }, a.stage + String(t))) });
}
const Fp = "_thread_1kn6s_3", jp = "_turn_1kn6s_8", Wp = "_who_1kn6s_27", zp = "_body_1kn6s_32", na = {
  thread: Fp,
  turn: jp,
  who: Wp,
  body: zp
}, Kn = Ue(!1);
function fk({ children: e, density: a }) {
  return /* @__PURE__ */ n(Kn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${na.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function bk({ turn: e }) {
  if (!Ke(Kn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${na.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${na.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ae(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${na.body} ward-chat-body`, children: e.body })
  ] });
}
const Gp = "_list_1rt9c_3", Kp = "_row_1rt9c_7", Up = "_label_1rt9c_20", Vp = "_n_1rt9c_26", Yp = "_cause_1rt9c_33", We = {
  list: Gp,
  row: Kp,
  label: Up,
  n: Vp,
  cause: Yp
};
function Jp(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Xp = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Qp({ row: e, formatNumber: a }) {
  return Jp(e), /* @__PURE__ */ l("li", { className: `${We.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ae, { size: 8, ...Xp[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: We.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${We.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Zp, { cause: e.cause })
  ] });
}
function Zp({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${We.cause} ward-healthrow-cause`, children: e }) : null;
}
function gk({ rows: e, formatNumber: a = J }) {
  return /* @__PURE__ */ n("ul", { className: `${We.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(Qp, { row: t, formatNumber: a }, t.label)) });
}
const eN = "_root_1jxwp_2", aN = {
  root: eN
};
function pk({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: aN.root, "data-density": o, children: [
    /* @__PURE__ */ n(_a, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const nN = "_row_dhbre_3", tN = "_key_dhbre_13", rN = "_stack_dhbre_24", lN = "_value_dhbre_32", oN = "_evidence_dhbre_39", iN = "_mark_dhbre_47", Pe = {
  row: nN,
  key: tN,
  stack: rN,
  value: lN,
  evidence: oN,
  mark: iN
};
function cN({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(h, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ia, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function Nk({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Pe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Pe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Pe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Pe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Pe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Pe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(cN, { state: e.state }) })
  ] });
}
const sN = "_cell_1monp_2", dN = {
  cell: sN
}, uN = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function mN(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function hN(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function wN(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: mN(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function _N(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function yk({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  hN(e, t);
  const r = _N(e);
  return /* @__PURE__ */ n(
    ni,
    {
      label: "Rejection routing",
      columns: uN,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: dN.cell, "data-norerun": o.noRerun ? !0 : void 0, children: wN(o, i) }),
      empty: a ?? /* @__PURE__ */ n(Rc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const vN = "_row_ute8v_2", fN = "_title_ute8v_11", bN = "_turns_ute8v_20", gN = "_waiting_ute8v_21", pN = "_resolved_ute8v_22", NN = "_activity_ute8v_23", yN = "_cost_ute8v_29", kN = "_link_ute8v_30", $N = "_tableRow_ute8v_47", CN = "_tableTitle_ute8v_59", SN = "_tableResolved_ute8v_64", RN = "_tableLink_ute8v_68", TN = "_tableMeta_ute8v_83", LN = "_tableCost_ute8v_90", AN = "_tableActivity_ute8v_91", xN = "_tableState_ute8v_101", EN = "_tableRecord_ute8v_112", E = {
  row: vN,
  title: fN,
  turns: bN,
  waiting: gN,
  resolved: pN,
  activity: NN,
  cost: yN,
  link: kN,
  tableRow: $N,
  tableTitle: CN,
  tableResolved: SN,
  tableLink: RN,
  tableMeta: TN,
  tableCost: LN,
  tableActivity: AN,
  tableState: xN,
  tableRecord: EN
}, Un = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function IN(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function qN(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function MN(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const BN = { duplicate: "CLOSED · DUPLICATE" };
function PN({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: E.tableMeta, children: `waiting on ${e}` });
}
function DN({ value: e }) {
  return /* @__PURE__ */ n("td", { className: E.tableCost, children: e === void 0 ? null : Y(e) });
}
function ON({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: E.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function HN({ session: e, href: a }) {
  const t = Un[e.state];
  return /* @__PURE__ */ l("tr", { className: E.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: E.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: E.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: E.tableMeta, children: qN(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: E.tableResolved, children: [
      MN(e.resolved),
      /* @__PURE__ */ n(PN, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(DN, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: E.tableActivity, children: IN(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: E.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(h, { role: t.role, label: BN[e.state] ?? t.label }),
      /* @__PURE__ */ n(ON, { link: e.link })
    ] }) })
  ] });
}
function FN({ session: e }) {
  const a = Un[e.state];
  return /* @__PURE__ */ l("div", { className: E.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: E.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: E.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: E.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: E.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: E.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : Y(e.cost) }),
    /* @__PURE__ */ n("span", { className: E.activity, children: ae(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: E.link, href: e.link.href, children: e.link.key }),
    /* @__PURE__ */ n(h, { role: a.role, label: a.label })
  ] });
}
function kk(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(HN, { session: e.session, href: e.href }) : /* @__PURE__ */ n(FN, { session: e.session });
}
const jN = "_block_1yy2v_3", WN = "_list_1yy2v_9", zN = "_line_1yy2v_14", Ta = {
  block: jN,
  list: WN,
  line: zN
}, GN = { warn: "warning", ok: "ok" };
function KN({ kind: e }) {
  const a = GN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function UN({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Ta.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(KN, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function $k({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ta.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ta.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(UN, { line: t }, `${r}-${t.text}`)) }) });
}
const VN = "_band_tt7hp_1", YN = "_head_tt7hp_8", JN = "_cell_tt7hp_19", XN = "_index_tt7hp_35", QN = "_title_tt7hp_42", ZN = "_note_tt7hp_48", ey = "_cellTitle_tt7hp_53", ay = "_cellBody_tt7hp_58", ny = "_tag_tt7hp_64", ue = {
  band: VN,
  head: YN,
  cell: JN,
  index: XN,
  title: QN,
  note: ZN,
  cellTitle: ey,
  cellBody: ay,
  tag: ny
}, on = 4;
function Ck({ index: e, title: a, note: t, cells: r }) {
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
  sk as ActivityConsole,
  qu as AgentCard,
  wy as AppShell,
  Yy as AppearanceStrip,
  Ck as Band,
  cs as BoardColumn,
  xy as BoardFootnote,
  Ey as BoardHeader,
  $y as BoardScroller,
  v as Btn,
  uy as CHIP_ROLES,
  Bn as CREDENTIAL_COLUMNS,
  by as Callout,
  Jy as CapabilityRow,
  bk as ChatMessage,
  un as Checkbox,
  h as Chip,
  dk as ClarificationRow,
  Nn as ColourLadder,
  Xy as ComponentRow,
  uk as Composer,
  qy as ConfigRow,
  Iy as ConfigRowHead,
  qa as ConnectionMark,
  fk as Conversation,
  jo as CostMeter,
  Zy as CredentialRow,
  Qy as CredentialRowHead,
  mk as CriteriaList,
  Sr as Crumb,
  gk as DeliveryHealth,
  Sy as DeniedState,
  Fy as DryRunRail,
  Rc as EmptyState,
  ek as EnvCard,
  B as Field,
  Cy as FilteredEmpty,
  _a as GateChecklist,
  hk as GateLadder,
  ni as Grid,
  Wy as HandoffRuleRow,
  jy as HandoffRules,
  My as ItemDrawer,
  ut as LIVE_EVENT_TYPES,
  iu as LegacyBoardColumn,
  Py as LegacyBoardHeader,
  Dy as LegacyConfigRow,
  Hy as LegacyItemDrawer,
  eu as LegacyOverCapNote,
  Oy as LegacyPreviewRail,
  pn as LegacyWorkCard,
  ge as LiveIndicator,
  Ry as LoadFailed,
  Ay as Loading,
  Hn as MCP_SERVER_COLUMNS,
  Ia as Mark,
  nk as MarkUpload,
  Ae as Marker,
  rk as McpServerRow,
  tk as McpServerRowHead,
  zy as NewStreamModal,
  Ac as OverCapNote,
  Ye as Overlay,
  Wu as PARTIAL_STEP_REASON,
  Fn as POLICY_CHIP_WIDTH,
  py as PageFrame,
  fy as PageHeader,
  lk as PolicyRow,
  By as PreviewRail,
  ga as ROLE_MATRIX_COLUMNS,
  En as RULE_ACTIONS,
  _n as Radio,
  pk as ReadyChecklist,
  yy as RecordSection,
  wk as RequeueSheet,
  _k as ResolveBlock,
  Nk as ResolvedFieldRow,
  ok as RoleMatrixRow,
  yk as RoutingTable,
  Gy as RuleRow,
  ik as RunbookSteps,
  st as STREAM_STEPS,
  ky as SectionBand,
  gi as SectionHeader,
  mn as SegmentedControl,
  kk as SessionRow,
  vy as Sidebar,
  Ky as StageColumn,
  vk as StageHistory,
  Mh as StageListEditor,
  Ty as StaleStrip,
  ma as StatStrip,
  Uy as StreamRow,
  Ny as SubjectRail,
  Le as Switch,
  _y as Tabs,
  Vy as ToolRow,
  gy as TopBar,
  Yi as Tree,
  fn as TreeRow,
  $k as TypedInputBlock,
  ck as ValidationList,
  oy as VisibilityProvider,
  iy as Visible,
  dy as WARD_VERSION,
  wa as WorkCard,
  Ly as WriteUnavailableStrip,
  IN as agoSince,
  at as clock,
  Qh as colourStatus,
  J as count,
  ee as duration,
  La as elapsed,
  sy as eventSourceTransport,
  Ve as isStreamStep,
  Aa as isValidatedStreamStep,
  zu as ladderValidation,
  Ff as mcpConnectionChip,
  Of as mcpToolName,
  Y as money,
  ce as ms,
  bn as ordered,
  cn as ratio,
  Av as restartLabel,
  ae as stamp,
  dn as stream,
  mt as streamChip,
  my as streamVars,
  Ze as useBorderFlash,
  ot as useFocusTrap,
  hy as useLiveFeed,
  cy as useReturnFocus,
  ua as useRovingTabindex,
  xa as useTicker,
  nt as useVisible,
  H as v,
  ak as validateMark,
  dt as validatedStreamSteps
};
