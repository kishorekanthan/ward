import { jsx as n, Fragment as T, jsxs as l } from "react/jsx-runtime";
import { useMemo as _t, useContext as Ue, createContext as Ke, useCallback as K, useEffect as x, useState as g, useRef as N, useLayoutEffect as vt, useId as k, Fragment as ft } from "react";
import { createPortal as bt } from "react-dom";
function re(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const Ja = (e) => String(e).padStart(2, "0");
function Fa(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${Ja(a % 60)}s` : `${Math.floor(t / 60)}h ${Ja(t % 60)}m`;
}
const pt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function le(e) {
  const a = pt.formatToParts(new Date(e)), t = (r) => {
    var o;
    return ((o = a.find((i) => i.type === r)) == null ? void 0 : o.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function ee(e) {
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
function yn(e, a) {
  return `${e} / ${a}`;
}
const gt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Nt(e) {
  return gt.format(new Date(e));
}
const kn = Ke(/* @__PURE__ */ new Set());
function h1({ hidden: e, children: a }) {
  const t = _t(() => new Set(e), [e]);
  return /* @__PURE__ */ n(kn.Provider, { value: t, children: a });
}
function yt(e) {
  return !Ue(kn).has(e);
}
function m1({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(T, { children: yt(e) ? a : t });
}
const kt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function $t(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function Ct(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = $t(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function St(e) {
  return { onKeyDown: K(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(kt));
      Ct(t, e.current, r);
    },
    [e]
  ) };
}
function w1(e, a = !0) {
  x(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const Qa = { ArrowUp: -1, ArrowDown: 1 }, Za = { ArrowLeft: -1, ArrowRight: 1 }, Rt = (e, a, t) => Math.min(t, Math.max(a, e));
function Tt(e, a) {
  if (a !== "horizontal" && e in Qa) return Qa[e];
  if (a !== "vertical" && e in Za) return Za[e];
}
function fa({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  vt(() => {
    var b;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const h = d[0], _ = o.current;
    o.current = !1, t(h), _ && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = K((d) => t(d), []), c = K((d) => {
    var h;
    t(d), (h = r.current.get(d)) == null || h.focus();
  }, []), s = K(
    (d) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const _ = Math.max(0, h.indexOf(a)), b = Tt(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[Rt(_ + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
    },
    [a, c, e]
  ), u = K(
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
const _1 = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, v1 = "0.2.0", f1 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Et = [1, 2, 3, 4, 5, 6], Lt = [1, 2, 3], At = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], j = {
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
}, he = {
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
function $n(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function ba(e) {
  return Et.includes(e);
}
function pa(e) {
  return Lt.includes(e);
}
function b1(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function p1(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const xt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function qt(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return xt[e];
}
function en(e) {
  return typeof e != "string" ? null : At.includes(e) ? e : null;
}
function It(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Mt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Bt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Pt(e, a, t) {
  const r = It(e);
  if (r === null) return null;
  const o = en(t) ?? en(r.type);
  return o === null ? null : { ...r, type: o, id: Mt(r, a), at: Bt(r) };
}
function Dt(e, a) {
  return e >= he.staleAfter ? "stale" : e >= he.heartbeat && a === "live" ? "reconnecting" : null;
}
function Ot(e, a, t) {
  return e >= he.heartbeat && !a && t !== null;
}
function g1(e, a) {
  const [t, r] = g("reconnecting"), [o, i] = g(null), c = N(/* @__PURE__ */ new Map()), s = N(0), u = N(""), d = N(0), h = N(null), _ = N(0), b = N(0), A = N(!1), U = N("reconnecting"), Q = K(($) => {
    U.current = $, r($);
  }, []), oe = K(() => {
    s.current = Date.now();
  }, []), ke = K(($) => {
    for (const [F, we] of c.current)
      (we === "*" || $.itemKey === we) && F($);
  }, []), ie = K(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: ($, F, we) => {
        const Le = Pt($, F, we);
        Le !== null && (Le.id && (u.current = Le.id), oe(), A.current = !1, Q("live"), i(Le.at), ke(Le));
      },
      onOpen: () => {
        d.current = 0, A.current = !1, oe(), Q("live");
      },
      onError: () => {
        var F;
        (F = h.current) == null || F.close(), h.current = null, A.current = !0, U.current !== "stale" && Q("reconnecting");
        const $ = Math.min(he.reconnectBase * 2 ** d.current, he.reconnectMax);
        d.current += 1, _.current = window.setTimeout(ie, $);
      }
    });
  }, [ke, Q, oe, a, e]), De = K(($) => {
    A.current = !0, $.close(), h.current = null, _.current = window.setTimeout(ie, he.reconnectBase);
  }, [ie]), Oe = K(($, F) => (c.current.set(F, $), () => {
    c.current.delete(F);
  }), []);
  return x(() => (ie(), b.current = window.setInterval(() => {
    const $ = Date.now() - s.current, F = Dt($, U.current);
    F && Q(F);
    const we = h.current;
    Ot($, A.current, we) && De(we);
  }, he.tick), () => {
    var $;
    window.clearInterval(b.current), window.clearTimeout(_.current), A.current = !1, ($ = h.current) == null || $.close(), h.current = null;
  }), [ie, De, Q]), { connection: t, lastEventAt: o, subscribe: Oe };
}
function ja(e, a) {
  const t = new Date(e).getTime(), [r, o] = g(() => Date.now());
  return x(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    i();
    const c = window.setInterval(i, he.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(c), document.removeEventListener("visibilitychange", i);
    };
  }, [a, t]), Math.max(0, r - t);
}
function Ht() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function an(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ra(e, a) {
  const t = N(0), r = K((o) => {
    const i = o ?? a, c = e.current;
    c !== null && i !== void 0 && (Ht() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => an(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => an(c), he.flash)));
  }, [a, e]);
  return x(() => () => window.clearTimeout(t.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const Ft = "_root_1otpc_2", jt = {
  root: Ft
};
function Wt(e, a, t, r, o) {
  const i = [Fa(a)];
  return e || i.push(`as of ${Nt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function ye({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = ja(e, o), c = (a == null ? void 0 : a.at) ?? e, s = Wt(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${jt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      le(e)
    ] })
  ] });
}
const zt = "_app_bcfqb_1", Gt = "_side_bcfqb_18", Ut = "_main_bcfqb_26", Kt = "_rail_bcfqb_33", Vt = "_page_bcfqb_40", Yt = "_root_bcfqb_91", Xt = "_topbar_bcfqb_98", Jt = "_mark_bcfqb_109", Qt = "_brand_bcfqb_116", Zt = "_tagline_bcfqb_122", er = "_identity_bcfqb_128", ar = "_tools_bcfqb_129", nr = "_metadata_bcfqb_138", tr = "_actor_bcfqb_153", rr = "_detail_bcfqb_154", lr = "_nav_bcfqb_159", or = "_content_bcfqb_194", ir = "_skip_bcfqb_217", D = {
  app: zt,
  side: Gt,
  main: Ut,
  rail: Kt,
  page: Vt,
  root: Yt,
  topbar: Xt,
  mark: Jt,
  brand: Qt,
  tagline: Zt,
  identity: er,
  tools: ar,
  metadata: nr,
  actor: tr,
  detail: rr,
  nav: lr,
  content: or,
  skip: ir
};
function cr({ sidebar: e, header: a, children: t, rail: r }) {
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
function sr({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: D.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function ca({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function dr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: D.metadata, children: [
    /* @__PURE__ */ n(ca, { value: e, className: D.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(ca, { value: a, className: D.detail })
  ] });
}
function ur(e) {
  return /* @__PURE__ */ l("header", { className: D.topbar, children: [
    /* @__PURE__ */ n("span", { className: D.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: D.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(ca, { value: e.tagline, className: D.tagline }),
    /* @__PURE__ */ n(sr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: D.identity, children: /* @__PURE__ */ n(dr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(ca, { value: e.tools, className: D.tools })
  ] });
}
function hr(e) {
  const a = k();
  return /* @__PURE__ */ l("div", { className: `${D.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: D.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(ur, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: D.content, children: e.children })
  ] });
}
function mr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function N1(e) {
  return mr(e) ? /* @__PURE__ */ n(cr, { ...e }) : /* @__PURE__ */ n(hr, { ...e });
}
const wr = "_btn_llheq_2", _r = "_primary_llheq_13", vr = "_secondary_llheq_23", fr = "_ghost_llheq_28", br = "_overflow_llheq_37", pr = "_sm_llheq_44", gr = "_disabled_llheq_48", ea = {
  btn: wr,
  primary: _r,
  secondary: vr,
  ghost: fr,
  overflow: br,
  sm: pr,
  disabled: gr
};
function Nr(e, a, t, r) {
  const o = a === "sm" ? [ea.sm, "ward-btn--sm"] : [], i = t ? [ea.disabled] : [];
  return [ea.btn, ea[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function yr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function kr(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function $r(e) {
  return e.children ?? e.label;
}
function v(e) {
  kr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: Nr(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...yr(a, e.controls),
      children: $r(e)
    }
  );
}
function Wa(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Cr = "_root_o4yib_2", Sr = "_row_o4yib_8", Rr = "_box_o4yib_14", Tr = "_label_o4yib_21", Er = "_lockedNote_o4yib_26", Lr = "_consequence_o4yib_34", Ar = "_sample_o4yib_69", qe = {
  root: Cr,
  row: Sr,
  box: Rr,
  label: Tr,
  lockedNote: Er,
  consequence: Lr,
  sample: Ar
};
function xr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function qr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${qe.consequence} ward-check-consequence`, children: a }) : null;
}
function Ir({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${qe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Mr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.sample, "aria-hidden": "true", children: e }) : null;
}
function Cn(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = xr(e);
  return /* @__PURE__ */ l("div", { className: `${qe.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: qe.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${qe.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (o) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, o.target.checked));
          },
          "aria-describedby": Wa(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: a, className: qe.label, children: [
        e.label,
        /* @__PURE__ */ n(Ir, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Mr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(qr, { id: t, text: e.consequence })
  ] });
}
const Br = "_chip_1073r_2", Pr = {
  chip: Br
}, Dr = {
  gate: j.chip.gate,
  system: j.chip.system,
  write: j.chip.write,
  drift: j.chip.drift,
  done: j.chip.done,
  attention: j.chip.attention,
  failed: j.chip.failed,
  pending: j.chip.pending,
  running: j.chip.running,
  warn: j.chip.warn,
  meta: j.chip.meta,
  soft: j.chip.soft,
  quiet: j.chip.quiet
};
function Or(e, a) {
  if (e === "stream") return Hr(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Dr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Hr(e) {
  if (!e || !pa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = $n(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Pr.chip} ward-chip ward-chip--${e}`, style: Or(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function ga(e) {
  return typeof e == "number" && pa(e) ? e : null;
}
function Te(e, a) {
  const t = ga(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function Na(e, a) {
  const t = ga(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const Fr = "_nav_1mnou_2", jr = "_list_1mnou_8", Wr = "_item_1mnou_15", zr = "_link_1mnou_25", Gr = "_sep_1mnou_35", Ur = "_current_1mnou_39", Kr = "_chips_1mnou_43", Ae = {
  nav: Fr,
  list: jr,
  item: Wr,
  link: zr,
  sep: Gr,
  current: Ur,
  chips: Kr
};
function Vr({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Ae.nav, children: [
    /* @__PURE__ */ n("ol", { className: Ae.list, children: e.map((t, r) => /* @__PURE__ */ l("li", { className: Ae.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Ae.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Ae.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Ae.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Ae.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const Yr = "_field_fy549_2", Xr = "_label_fy549_8", Jr = "_labelHidden_fy549_15", Qr = "_control_fy549_25", Zr = "_mono_fy549_44", el = "_area_fy549_49", al = "_invalid_fy549_56", Re = {
  field: Yr,
  label: Xr,
  labelHidden: Jr,
  control: Qr,
  mono: Zr,
  area: el,
  invalid: al
}, nl = { type: "password", autoComplete: "off", spellCheck: !1 };
function tl({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? nl : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function rl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function ll({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const ol = { input: tl, select: rl, textarea: ll };
function il(e, a, t) {
  const r = ol[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function cl(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Wa(r ? t : void 0, e.describedBy),
    onChange: (o) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, o.target.value);
    }
  };
}
function sl(e) {
  const a = e.mono ? [Re.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Re.area] : [];
  return [Re.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function dl(e) {
  return e ? `${Re.label} ${Re.labelHidden} ward-field-label` : `${Re.label} ward-field-label`;
}
function L(e) {
  const a = k(), t = `${a}-msg`, r = cl(e, a, t), o = sl(e);
  return /* @__PURE__ */ l("div", { className: `${Re.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: dl(e.labelHidden), htmlFor: a, children: e.label }),
    il(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Re.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const ul = "_strip_jwrf5_2", hl = "_tab_jwrf5_12", ml = "_count_jwrf5_35", qa = {
  strip: ul,
  tab: hl,
  count: ml
}, nn = 7;
function wl(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function _l(e) {
  return `${qa.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function y1({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > nn) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${nn} — the set is fixed`);
  const i = fa({ orientation: "horizontal" }), c = wl(e, a);
  return x(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: _l(o),
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
          className: `${qa.tab} ward-tab`,
          "aria-selected": s.id === a,
          "aria-controls": `panel-${s.id}`,
          onClick: () => t(s.id),
          ...i.itemProps(u),
          children: [
            s.label,
            s.count === void 0 ? null : /* @__PURE__ */ l(T, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: qa.count, children: `· ${s.count}` })
            ] })
          ]
        },
        s.id
      ))
    }
  );
}
const vl = "_root_jem6y_2", fl = "_segment_jem6y_7", tn = {
  root: vl,
  segment: fl
};
function Sn({ options: e, value: a, onChange: t, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = fa({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return x(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${tn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: tn.segment,
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
const bl = "_sidebar_1jywv_3", pl = "_brand_1jywv_9", gl = "_mark_1jywv_17", Nl = "_word_1jywv_24", yl = "_nav_1jywv_30", kl = "_navItem_1jywv_38", $l = "_group_1jywv_50", Cl = "_groupName_1jywv_57", Sl = "_agents_1jywv_70", Rl = "_agent_1jywv_70", Tl = "_agentTop_1jywv_88", El = "_dot_1jywv_95", Ll = "_agentName_1jywv_107", Al = "_agentMeta_1jywv_120", xl = "_foot_1jywv_126", ql = "_footName_1jywv_132", Il = "_footLinks_1jywv_139", Ml = "_footLink_1jywv_139", Bl = "_root_1jywv_153", Pl = "_linkBrand_1jywv_162", Dl = "_label_1jywv_183", Ol = "_note_1jywv_188", Hl = "_footer_1jywv_202", C = {
  sidebar: bl,
  brand: pl,
  mark: gl,
  word: Nl,
  nav: yl,
  navItem: kl,
  group: $l,
  groupName: Cl,
  new: "_new_1jywv_64",
  agents: Sl,
  agent: Rl,
  agentTop: Tl,
  dot: El,
  agentName: Ll,
  agentMeta: Al,
  foot: xl,
  footName: ql,
  footLinks: Il,
  footLink: Ml,
  root: Bl,
  linkBrand: Pl,
  label: Dl,
  note: Ol,
  footer: Hl
};
function Fl({ agent: e }) {
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
              style: { "--dot": $n(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function jl({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function Wl({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(Fl, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(jl, { shared: i })
  ] });
}
function zl(e) {
  return e.destinations ?? e.items ?? [];
}
function Gl({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function Ul({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function Kl({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Vl(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Gl, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: zl(e).map((a) => /* @__PURE__ */ n(Kl, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(Ul, { children: e.children })
  ] });
}
function Yl(e) {
  return "agents" in e;
}
function k1(e) {
  return Yl(e) ? /* @__PURE__ */ n(Wl, { ...e }) : /* @__PURE__ */ n(Vl, { ...e });
}
const Xl = "_mark_wlgi8_3", Jl = {
  mark: Xl
}, Ql = { met: "✓", unmet: "", failed: "✕" };
function za({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Jl.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Ql[e]
    }
  );
}
const Zl = "_marker_br9fi_2", eo = {
  marker: Zl
}, ao = {
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
  const r = { "--marker": ao[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${eo.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const no = "_root_ti0pq_2", to = "_chip_ti0pq_11", ro = "_noCase_ti0pq_23", aa = {
  root: no,
  chip: to,
  noCase: ro
};
function lo(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Ga({ connection: e, since: a, lastEventAt: t }) {
  const r = lo(a, t), o = ja(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${aa.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ee, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${aa.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: aa.noCase, children: Fa(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${aa.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    le(r)
  ] });
}
const oo = "_root_11rs7_2", io = "_context_11rs7_12", co = "_row_11rs7_1", so = "_heading_11rs7_25", uo = "_headingWrap_11rs7_33", ho = "_chips_11rs7_38", mo = "_title_11rs7_45", wo = "_consequence_11rs7_54", _o = "_actionsWrap_11rs7_59", vo = "_actions_11rs7_59", fo = "_action_11rs7_59", bo = "_overflowPanel_11rs7_78", po = "_measure_11rs7_88", ae = {
  root: oo,
  context: io,
  row: co,
  heading: so,
  headingWrap: uo,
  chips: ho,
  title: mo,
  consequence: wo,
  actionsWrap: _o,
  actions: vo,
  action: fo,
  overflowPanel: bo,
  measure: po
};
function go({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: ae.heading, children: [
    /* @__PURE__ */ n("h1", { className: ae.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: ae.consequence, children: a })
  ] });
}
function Ia({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: ae.action, "data-action": "", children: a }, t));
}
function rn({ disclosure: e }) {
  return /* @__PURE__ */ n(v, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function No({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: o }) {
  return t ? r ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(rn, { disclosure: o }) : a ? [/* @__PURE__ */ n(rn, { disclosure: o }, "more"), /* @__PURE__ */ n(Ia, { actions: e }, "actions")] : /* @__PURE__ */ n(Ia, { actions: e });
}
function yo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function ko({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: ae.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Ia, { actions: e }) });
}
function $o(e, a) {
  const t = k(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function Co({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: ae.context, children: [
    /* @__PURE__ */ n(Vr, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: ae.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function So(...e) {
  return e.some((a) => a === null);
}
function Ro(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function To(e, a, t, r, o) {
  if (o === 0 || So(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = Ro(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function Eo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Lo(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = g(!1);
  return x(() => {
    const s = a.current;
    if (!Eo(s)) return;
    const u = () => c(To(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function Ao({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ l("div", { className: ae.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(v, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] });
}
function xo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Ga, { connection: e.connection, since: e.since }) : null;
}
function $1({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], more: i = [], connection: c, onOverflow: s, density: u = "page" }) {
  const { rowRef: d, headingRef: h, actionsRef: _, measureRef: b, collapsed: A } = Lo(o), U = i.length > 0, { disclosure: Q, close: oe } = $o(A || U, _), ke = yo(i, o, A, s);
  return /* @__PURE__ */ l("header", { className: ae.root, "data-density": u, children: [
    /* @__PURE__ */ n(Co, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: ae.row, ref: d, children: [
      /* @__PURE__ */ n("div", { ref: h, className: ae.headingWrap, children: /* @__PURE__ */ n(go, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: ae.actionsWrap, children: [
        /* @__PURE__ */ n(xo, { connection: c }),
        /* @__PURE__ */ n("div", { className: ae.actions, ref: _, "data-ward-actions": !0, children: /* @__PURE__ */ n(No, { actions: o, hasMore: U, collapsed: A, onOverflow: s, disclosure: Q }) })
      ] })
    ] }),
    /* @__PURE__ */ n(ko, { actions: ke, disclosure: Q, onEscape: oe }),
    /* @__PURE__ */ n(Ao, { actions: o, hasMore: U, measureRef: b })
  ] });
}
function Rn(e) {
  const [a, t] = g(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return x(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const o = (c) => t(c.matches);
    return r.addEventListener("change", o), t(r.matches), () => r.removeEventListener("change", o);
  }, [e]), a;
}
const qo = "_scrim_c7sqj_2", Io = "_drawer_c7sqj_10", Mo = "_sheet_c7sqj_14", Bo = "_modal_c7sqj_18", Po = "_panel_c7sqj_23", Do = "_header_c7sqj_51", Oo = "_title_c7sqj_59", Ho = "_body_c7sqj_63", Fo = "_close_c7sqj_90", ge = {
  scrim: qo,
  drawer: Io,
  sheet: Mo,
  modal: Bo,
  panel: Po,
  header: Do,
  title: Oo,
  body: Ho,
  close: Fo
}, jo = Ke(null), sa = [], da = /* @__PURE__ */ new Map();
function Wo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function zo(e, a) {
  let t = da.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, da.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Go(e, a) {
  for (const t of Array.from(a.children))
    Wo(t) || zo(e, t);
}
function Uo(e) {
  for (const a of e.claims) {
    const t = da.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), da.delete(a)));
  }
}
function Ko(e, a) {
  const t = { root: e, claims: [] };
  return sa.push(t), Go(t, a), t;
}
function Vo(e) {
  const a = sa.indexOf(e);
  a >= 0 && sa.splice(a, 1), Uo(e);
}
function ln(e) {
  return e !== null && sa.at(-1) === e;
}
function Yo(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, x(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = Ko(i, a);
    return r.current = s, () => {
      var d, h;
      const u = ln(s);
      Vo(s), r.current = null, u && ((h = (d = o.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), K(() => ln(r.current), []);
}
function Xo(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Jo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Qo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ge.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("header", { className: `${ge.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ge.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ge.body} ward-drawer-body`, children: e.children })
  ] });
}
function Zo(e) {
  return `${ge.scrim} ${ge[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ei(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ge.panel} ${ge[e]} ward-overlay-panel${t}${r}`;
}
function ai(e) {
  const a = Ue(jo);
  return e ?? a ?? document.body;
}
function Ze(e) {
  const a = N(null), t = N(null), r = k(), o = ai(e.container), i = Rn("(min-width: 768px)"), c = Xo(e.kind, i), s = Jo(e, r), u = St(t), d = Yo(a, o, e.returnFocusTo), h = K(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return x(() => {
    var _, b;
    d() && ((b = (_ = t.current) == null ? void 0 : _.querySelector("button")) == null || b.focus());
  }, [d]), x(() => {
    const _ = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [h]), bt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Zo(c),
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
            className: ei(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ge.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Qo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const ni = "_root_drrhx_2", ti = "_ticket_drrhx_15", ri = "_body_drrhx_24", Sa = {
  root: ni,
  ticket: ti,
  body: ri
};
function C1({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${Sa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Sa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Sa.body, children: t })
  ] });
}
const li = "_root_bf1pc_2", oi = "_table_bf1pc_9", ii = "_caption_bf1pc_14", ci = "_series_bf1pc_23", si = "_category_bf1pc_31", di = "_cell_bf1pc_39", ui = "_track_bf1pc_45", hi = "_lane_bf1pc_52", mi = "_bar_bf1pc_56", wi = "_value_bf1pc_63", _i = "_swatch_bf1pc_70", vi = "_empty_bf1pc_78", G = {
  root: li,
  table: oi,
  caption: ii,
  series: ci,
  category: si,
  cell: di,
  track: ui,
  lane: hi,
  bar: mi,
  value: wi,
  swatch: _i,
  empty: vi
}, fi = "—", on = 6;
function bi(e, a) {
  if (a.length < 1 || a.length > on)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${on}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function pi(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function Tn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function gi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Ni({ value: e, top: a, step: t, format: r, missing: o }) {
  const i = gi(e, a), c = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ l("span", { className: G.track, children: [
    /* @__PURE__ */ n("span", { className: G.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${G.bar} ward-barchart-bar`, "data-step": t, style: c, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: G.value, children: e === null ? o : r(e) })
  ] }) });
}
function yi({ series: e }) {
  return /* @__PURE__ */ n(T, { children: e.map((a, t) => /* @__PURE__ */ l("th", { scope: "col", className: G.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: G.swatch, "data-step": Tn(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function ki({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${G.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: G.caption, children: e }),
    /* @__PURE__ */ n("p", { className: G.empty, children: a })
  ] });
}
function $i({ title: e, categories: a, series: t, top: r, format: o = J, categoryHead: i = "Category", missing: c = fi }) {
  return /* @__PURE__ */ n("div", { className: `${G.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: G.table, children: [
    /* @__PURE__ */ n("caption", { className: G.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: G.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(yi, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((s, u) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: G.category, children: s }),
      t.map((d, h) => /* @__PURE__ */ n(Ni, { value: d.values[u], top: r, step: Tn(h, t.length), format: o, missing: c }, d.name))
    ] }, s)) })
  ] }) });
}
function S1(e) {
  bi(e.categories, e.series);
  const a = pi(e.series);
  return a === 0 ? /* @__PURE__ */ n(ki, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n($i, { ...e, top: a });
}
const Ci = "_root_1bfqw_2", Si = "_figure_1bfqw_7", Ri = "_of_1bfqw_13", Ti = "_bar_1bfqw_18", Ei = "_rows_1bfqw_38", Li = "_row_1bfqw_38", Ai = "_label_1bfqw_49", xi = "_amount_1bfqw_54", $e = {
  root: Ci,
  figure: Si,
  of: Ri,
  bar: Ti,
  rows: Ei,
  row: Li,
  label: Ai,
  amount: xi
};
function qi({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${$e.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${$e.figure} ward-stat-value`, children: [
      ee(e),
      " ",
      /* @__PURE__ */ l("span", { className: $e.of, children: [
        "of ",
        ee(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${$e.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${ee(e)} of ${ee(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: $e.rows, children: t.map((o) => /* @__PURE__ */ l("li", { className: `${$e.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: $e.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: $e.amount, children: ee(o.amount) })
    ] }, o.label)) })
  ] });
}
const Ii = "_frame_mg2jl_2", Mi = "_table_mg2jl_6", Bi = "_th_mg2jl_12", Pi = "_td_mg2jl_13", Di = "_sort_mg2jl_47", Oi = "_row_mg2jl_53", Hi = "_empty_mg2jl_61", Se = {
  frame: Ii,
  table: Mi,
  th: Bi,
  td: Pi,
  sort: Di,
  row: Oi,
  empty: Hi
}, Fi = { asc: "ascending", desc: "descending" };
function ji(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Fi[a.direction];
}
function Wi(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Se.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function zi(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Gi({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Se.th,
      style: zi(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ji(e, a),
      children: Wi(e, t)
    }
  );
}
function Ui({ row: e, props: a }) {
  const t = a.rowId(e), r = (a.lockedIds ?? []).includes(t);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: Se.row,
      "data-selected": t === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((o) => /* @__PURE__ */ n("td", { className: Se.td, "data-align": o.align, "data-mono": o.mono, "data-drop": o.dropPriority, children: a.renderCell(e, o.key) }, o.key))
    }
  );
}
function Ki({
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
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: Se.empty, children: d }) : /* @__PURE__ */ n("div", { className: Se.frame, children: /* @__PURE__ */ l("table", { className: Se.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Se.head, children: a.map((h) => /* @__PURE__ */ n(Gi, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(Ui, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const Vi = "_set_y5zy3_2", Yi = "_legend_y5zy3_7", Xi = "_row_y5zy3_15", Ji = "_control_y5zy3_20", Qi = "_input_y5zy3_26", Zi = "_label_y5zy3_31", ec = "_consequence_y5zy3_36", xe = {
  set: Vi,
  legend: Yi,
  row: Xi,
  control: Ji,
  input: Qi,
  label: Zi,
  consequence: ec
};
function En({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
  const u = k(), d = i ?? u;
  return /* @__PURE__ */ l("fieldset", { className: xe.set, "data-variant": s, children: [
    /* @__PURE__ */ n("legend", { className: xe.legend, children: e }),
    a.map((h) => {
      const _ = `${d}-${h.value}`, b = h.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: xe.row, children: [
        /* @__PURE__ */ l("span", { className: xe.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: d,
              className: xe.input,
              value: h.value,
              checked: t === h.value,
              disabled: o,
              "aria-describedby": Wa(b, c),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: _, className: xe.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${xe.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const ac = "_root_1h1ot_2", nc = "_head_1h1ot_11", tc = "_index_1h1ot_25", rc = "_dot_1h1ot_29", lc = "_note_1h1ot_34", oc = "_counter_1h1ot_40", ic = "_trailing_1h1ot_48", Ie = {
  root: ac,
  head: nc,
  index: tc,
  dot: rc,
  note: lc,
  counter: oc,
  trailing: ic
};
function cc({ index: e }) {
  return e ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("span", { className: `${Ie.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ie.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function sc({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ie.counter, "aria-hidden": "true", children: e }) : null;
}
function dc({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ie.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ie.head, children: [
      /* @__PURE__ */ n(cc, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Ie.note, children: t }),
    /* @__PURE__ */ n(sc, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ie.trailing, children: i })
  ] });
}
const uc = "_strip_70eyc_2", hc = "_cell_70eyc_7", mc = "_value_70eyc_12", wc = "_link_70eyc_27", _c = "_label_70eyc_39", Ye = {
  strip: uc,
  cell: hc,
  value: mc,
  link: wc,
  label: _c
};
function vc(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function fc({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(T, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Ye.link} ward-stat-link`, href: e.href, "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function ya({ cells: e, divided: a = !1 }) {
  return vc(e), /* @__PURE__ */ n("dl", { className: `${Ye.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Ye.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ye.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: /* @__PURE__ */ n(fc, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Ye.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const bc = "_root_xk7sv_2", pc = "_track_xk7sv_8", gc = "_thumb_xk7sv_35", Nc = "_labelHidden_xk7sv_53", yc = "_label_xk7sv_53", kc = "_lockedNote_xk7sv_68", Me = {
  root: bc,
  track: pc,
  thumb: gc,
  labelHidden: Nc,
  label: yc,
  lockedNote: kc
};
function $c(e) {
  return e ? `${Me.label} ${Me.labelHidden}` : Me.label;
}
function Pe({ label: e, checked: a, onChange: t, disabled: r, locked: o, describedBy: i, labelHidden: c }) {
  const s = k(), u = o ? !0 : a, d = r || o;
  return /* @__PURE__ */ l("span", { className: `${Me.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": u,
        "aria-label": e,
        "aria-labelledby": s,
        "aria-describedby": i,
        className: `${Me.track} ward-switch`,
        "data-on": u,
        "data-locked": o ? !0 : void 0,
        disabled: d,
        onClick: () => !d && (t == null ? void 0 : t(!u)),
        children: /* @__PURE__ */ n("span", { className: Me.thumb })
      }
    ),
    /* @__PURE__ */ l("span", { id: s, className: $c(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Me.lockedNote, children: "always on" })
    ] })
  ] });
}
const Cc = "_bar_1u2kl_2", Sc = "_skip_1u2kl_11", Rc = "_mark_1u2kl_22", Tc = "_nav_1u2kl_30", Ec = "_list_1u2kl_34", Lc = "_select_1u2kl_40", Ac = "_dest_1u2kl_47", xc = "_actor_1u2kl_61", qc = "_actorMark_1u2kl_74", Ic = "_actorLabel_1u2kl_79", Mc = "_tagline_1u2kl_98", ce = {
  bar: Cc,
  skip: Sc,
  mark: Rc,
  nav: Tc,
  list: Ec,
  select: Lc,
  dest: Ac,
  actor: xc,
  actorMark: qc,
  actorLabel: Ic,
  tagline: Mc
};
function Bc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Pc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function R1({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = Pc(r);
  return /* @__PURE__ */ l("header", { className: ce.bar, children: [
    /* @__PURE__ */ n("a", { className: ce.skip, href: `#${c}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: ce.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: ce.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: ce.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: ce.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: ce.dest,
          href: u.href,
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        "select",
        {
          className: ce.select,
          "aria-label": "Destination",
          value: t,
          onChange: (u) => i == null ? void 0 : i(u.target.value),
          children: a.map((u) => /* @__PURE__ */ n("option", { value: u.id, children: u.label }, u.id))
        }
      )
    ] }),
    s && /* @__PURE__ */ l("span", { className: ce.actor, children: [
      /* @__PURE__ */ n("span", { className: ce.actorLabel, children: s }),
      /* @__PURE__ */ n("span", { className: ce.actorMark, "aria-hidden": "true", children: Bc(s) })
    ] })
  ] });
}
const Dc = "_tree_1lyby_2", Oc = "_item_1lyby_6", Hc = "_row_1lyby_10", Fc = "_button_1lyby_22", ua = {
  tree: Dc,
  item: Oc,
  row: Hc,
  button: Fc
}, Ln = Ke(null);
function jc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = fa({ orientation: "vertical" });
  return /* @__PURE__ */ n(Ln.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ua.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const Wc = { ArrowRight: !0, ArrowLeft: !1 };
function cn(e) {
  return e ? !0 : void 0;
}
function zc(e, a) {
  const t = Wc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Gc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function Uc(e) {
  const a = [ua.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Kc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Vc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Yc(e) {
  return typeof e == "string" ? e : void 0;
}
function Xc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Jc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function An(e) {
  const a = Ue(Ln);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = Kc(e);
  return /* @__PURE__ */ l("li", { className: ua.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Uc(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": cn(e.unresolved),
        "data-inherited": cn(e.inherited),
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${ua.button} ward-treeitem-btn`,
            onClick: () => Gc(e),
            onKeyDown: (r) => zc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Vc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Yc(e.label), children: e.label }),
              /* @__PURE__ */ n(Xc, { value: e.detail }),
              /* @__PURE__ */ n(Jc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Qc = "_frame_fdzvs_2", Zc = "_subjectRail_fdzvs_21", es = "_subject_fdzvs_21", as = "_rail_fdzvs_41", ns = "_record_fdzvs_63", ts = "_recordBody_fdzvs_68", rs = "_band_fdzvs_111", ls = "_bandBody_fdzvs_120", os = "_bandActions_fdzvs_125", is = "_scroller_fdzvs_133", cs = "_lanes_fdzvs_151", ue = {
  frame: Qc,
  subjectRail: Zc,
  subject: es,
  rail: as,
  record: ns,
  recordBody: ts,
  band: rs,
  bandBody: ls,
  bandActions: os,
  scroller: is,
  lanes: cs
};
function T1({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: ue.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function sn(e) {
  return e ? "true" : void 0;
}
function E1({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ue.subjectRail, "data-ward-subject-rail": t, "data-ruled": sn(i), children: [
    /* @__PURE__ */ n("div", { className: ue.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ue.rail, "data-sticky": sn(o), "aria-label": r, children: a })
  ] });
}
function L1({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: ue.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(dc, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: ue.recordBody, "data-pad": o, children: a })
  ] });
}
const ss = "_form_1j8ub_2", ds = "_fields_1j8ub_9", us = "_actions_1j8ub_19", Ra = {
  form: ss,
  fields: ds,
  actions: us
};
function A1({ label: e, children: a, actions: t, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Ra.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ra.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ra.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function x1({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: ue.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ue.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: ue.bandActions, children: a })
  ] });
}
const hs = "(max-width: 767.98px)";
function Ma({ label: e, children: a, laneCount: t }) {
  const r = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { className: ue.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: r, children: a });
}
function ms({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: ue.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(L, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(Ma, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function q1({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = Rn(hs);
  return t === void 0 ? /* @__PURE__ */ n(Ma, { label: a, children: e }) : o ? /* @__PURE__ */ n(ms, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Ma, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n(ft, { children: i.content }, i.id)) });
}
const ws = "_block_1o5o7_2", _s = "_sentence_1o5o7_15", vs = "_meta_1o5o7_20", fs = "_action_1o5o7_25", bs = "_strip_1o5o7_29", ps = "_loading_1o5o7_48", gs = "_label_1o5o7_56", Ns = "_counter_1o5o7_63", me = {
  block: ws,
  sentence: _s,
  meta: vs,
  action: fs,
  strip: bs,
  loading: ps,
  label: gs,
  counter: Ns
};
function ys({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: me.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function ka({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${me.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: me.sentence, children: e }),
    t,
    /* @__PURE__ */ n(ys, { action: a })
  ] });
}
function ks(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function I1({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ka, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: me.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function M1(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function B1({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ka, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: me.meta, children: [
    "failed at ",
    le(a)
  ] }) });
}
function P1({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: me.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    le(e),
    ". Showing snapshot from ",
    le(a)
  ] });
}
function D1({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: me.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    le(a)
  ] });
}
function O1({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = g(!1);
  x(() => {
    const c = window.setTimeout(() => o(!0), he.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = ja(t.current, r);
  return /* @__PURE__ */ l("div", { className: `${me.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: me.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: me.counter, children: Fa(i) }) : null
  ] });
}
const $s = "_note_tlubt_2", Cs = {
  note: $s
};
function Ss({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: Cs.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const Rs = "_card_12in3_2", Ts = "_hit_12in3_23", Es = "_head_12in3_30", Ls = "_title_12in3_36", As = "_meta_12in3_44", xs = "_fields_12in3_45", qs = "_who_12in3_58", Is = "_sep_12in3_65", Ms = "_mono_12in3_69", Bs = "_field_12in3_45", Ps = "_last_12in3_84", Ds = "_reason_12in3_96", V = {
  card: Rs,
  hit: Ts,
  head: Es,
  title: Ls,
  meta: As,
  fields: xs,
  who: qs,
  sep: Is,
  mono: Ms,
  field: Bs,
  last: Ps,
  reason: Ds
}, Os = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Hs(e, a, t) {
  const r = ra(e, "blue"), o = ra(e, "orange"), i = ra(e, "green"), c = N(/* @__PURE__ */ new Set());
  x(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = Os[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const Fs = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ee(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function js(e, a) {
  return Fs[a](e);
}
function Ws({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: V.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ l("p", { className: V.meta, children: [
    /* @__PURE__ */ l("span", { className: V.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    t,
    /* @__PURE__ */ n(ye, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ l("p", { className: V.meta, children: [
    /* @__PURE__ */ l("span", { className: V.who, children: [
      "waits on ",
      e.waitsOn
    ] }),
    t,
    /* @__PURE__ */ l("span", { className: V.mono, children: [
      re(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function zs({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: V.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Gs({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: V.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Us({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: V.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: V.field, children: js(e, t) }, t)) });
}
const Ba = (e) => e ? !0 : void 0;
function Ks(e) {
  return { "--stream": Te(e.streamStep, "id") };
}
function Vs(e, a, t) {
  e == null || e(a, t);
}
function Ys(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Xs({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: V.last, "data-stale": Ba(a), children: t }) : null;
}
function $a(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  Hs(r, t.key, e.feed);
  const o = Ys(e.feed), i = Ks(t);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: V.card,
      style: i,
      "data-selected": Ba(e.selected),
      "data-flagged": Ba(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: V.hit, onClick: (c) => Vs(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(zs, { item: t }),
        /* @__PURE__ */ n("p", { className: V.title, children: t.title }),
        /* @__PURE__ */ n(Ws, { item: t, connection: o }),
        /* @__PURE__ */ n(Gs, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Us, { item: t, fields: a }),
        /* @__PURE__ */ n(Xs, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const Js = "_column_10sxg_3", Qs = "_head_10sxg_24", Zs = "_label_10sxg_33", ed = "_count_10sxg_42", ad = "_list_10sxg_56", Xe = {
  column: Js,
  head: Qs,
  label: Zs,
  count: ed,
  list: ad
};
function xn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function nd({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: Xe.head, children: [
    /* @__PURE__ */ n("h2", { className: Xe.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: Xe.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function td(e) {
  return /* @__PURE__ */ n("div", { className: Xe.list, role: "list", children: e.rows.map((a, t) => {
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
function rd({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, _ = xn(a, r);
  return /* @__PURE__ */ l("section", { className: Xe.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(nd, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(td, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    h && /* @__PURE__ */ n(Ss, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const ld = "_foot_8qg4p_2", od = "_note_8qg4p_13", id = "_link_8qg4p_19", Ta = {
  foot: ld,
  note: od,
  link: id
};
function H1({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Ta.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ta.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: Ta.link, href: e, children: "Configure board" })
  ] });
}
const cd = "_head_1la6p_3", sd = "_identity_1la6p_12", dd = "_titleRow_1la6p_18", ud = "_title_1la6p_18", hd = "_key_1la6p_35", md = "_rollup_1la6p_45", wd = "_tools_1la6p_53", _d = "_swatch_1la6p_62", vd = "_mark_1la6p_69", fe = {
  head: cd,
  identity: sd,
  titleRow: dd,
  title: ud,
  key: hd,
  rollup: md,
  tools: wd,
  swatch: _d,
  mark: vd
}, dn = "initials:";
function fd(e) {
  return e === void 0 ? "loaded this week unavailable" : `${J(e)} loaded this week`;
}
function bd(e) {
  const a = [`${J(e.inFlight)} in flight`, fd(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${J(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${re(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${re(e.p90)}`), a.join(" · ");
}
function pd(e) {
  return e.startsWith(dn) ? e.slice(dn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function gd({ markRef: e, streamStep: a }) {
  const t = { "--stream": Te(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${fe.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: pd(e) }) : /* @__PURE__ */ n("span", { className: fe.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Nd({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function F1({
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
  return /* @__PURE__ */ l("div", { className: fe.head, children: [
    /* @__PURE__ */ l("div", { className: fe.identity, children: [
      /* @__PURE__ */ l("div", { className: fe.titleRow, children: [
        /* @__PURE__ */ n(gd, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: fe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: fe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: fe.rollup, "aria-live": "polite", children: bd(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: fe.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Nd, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Ga, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const yd = "_head_kabyh_11", kd = "_line_kabyh_12", $d = "_cHandle_kabyh_33", Cd = "_cName_kabyh_38", Sd = "_nameLine_kabyh_46", Rd = "_cLabel_kabyh_53", Td = "_cCap_kabyh_58", Ed = "_cShown_kabyh_63", Ld = "_name_kabyh_46", Ad = "_noCap_kabyh_85", xd = "_state_kabyh_99", qd = "_handle_kabyh_104", Id = "_sub_kabyh_118", I = {
  head: yd,
  line: kd,
  cHandle: $d,
  cName: Cd,
  nameLine: Sd,
  cLabel: Rd,
  cCap: Td,
  cShown: Ed,
  name: Ld,
  noCap: Ad,
  state: xd,
  handle: qd,
  sub: Id
}, Md = "can't be hidden or collapsed", Bd = "terminal · counted, not a column";
function j1() {
  return /* @__PURE__ */ l("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function Pd(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Dd(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function un(e) {
  return e.gate ? Md : e.terminal ? Bd : Dd(e.agentsMounted);
}
function Od(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Hd({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: I.cName, children: [
    /* @__PURE__ */ l("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    un(e) && /* @__PURE__ */ n("span", { className: I.sub, children: un(e) })
  ] });
}
function Fd(e) {
  return e === void 0 ? "" : String(e);
}
function jd(e) {
  return e === "" ? void 0 : Number(e);
}
function Wd({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Od(t, a),
      children: "⠿"
    }
  ) });
}
function zd({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(L, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Fd(a.cap), onChange: (r) => t({ ...a, cap: jd(r) }) }) });
}
function Gd({ stage: e, config: a, onChange: t }) {
  const r = Pd(e, a.shown);
  return /* @__PURE__ */ l("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(Pe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function Ud(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function W1({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: I.line, "data-kind": Ud(e), children: [
    /* @__PURE__ */ n(Wd, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Hd, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(L, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(zd, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Gd, { stage: e, config: a, onChange: t })
  ] });
}
const Kd = "_body_hn6d6_2", Vd = "_head_hn6d6_9", Yd = "_summary_hn6d6_19", Xd = "_block_hn6d6_20", Jd = "_actionsBlock_hn6d6_21", Qd = "_title_hn6d6_41", Zd = "_note_hn6d6_46", eu = "_k_hn6d6_51", au = "_kv_hn6d6_58", nu = "_row_hn6d6_64", tu = "_label_hn6d6_75", ru = "_value_hn6d6_84", lu = "_quote_hn6d6_90", ou = "_actions_hn6d6_21", iu = "_resolve_hn6d6_103", M = {
  body: Kd,
  head: Vd,
  summary: Yd,
  block: Xd,
  actionsBlock: Jd,
  title: Qd,
  note: Zd,
  k: eu,
  kv: au,
  row: nu,
  label: tu,
  value: ru,
  quote: lu,
  actions: ou,
  resolve: iu
};
function cu(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function su(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ye, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function du(e) {
  const a = ga(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function uu(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Na(du(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", re(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...cu(e),
    ...su(e, a)
  ];
}
function hu({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function mu({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: M.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function wu({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: M.block, children: [
    /* @__PURE__ */ n("p", { className: M.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: M.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: M.note, children: e.agentMeta })
  ] }) : null;
}
function z1({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = uu(e, o);
  return /* @__PURE__ */ n(Ze, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: M.body, children: [
    /* @__PURE__ */ n(mu, { item: e }),
    /* @__PURE__ */ l("div", { className: M.summary, children: [
      /* @__PURE__ */ n("h2", { className: M.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: M.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: M.kv, children: d.map(([h, _]) => /* @__PURE__ */ l("div", { className: M.row, children: [
      /* @__PURE__ */ n("dt", { className: M.label, children: h }),
      /* @__PURE__ */ n("dd", { className: M.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(wu, { item: e }),
    /* @__PURE__ */ l("div", { className: M.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: M.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: M.note, children: s })
    ] }),
    /* @__PURE__ */ n(hu, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const _u = "_root_3azmy_2", vu = "_list_3azmy_7", fu = "_item_3azmy_12", bu = "_box_3azmy_18", pu = "_text_3azmy_23", gu = "_note_3azmy_28", He = {
  root: _u,
  list: vu,
  item: fu,
  box: bu,
  text: pu,
  note: gu
};
function Ca({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ l("div", { className: He.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${He.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${He.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: He.box, children: /* @__PURE__ */ n(za, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: He.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${He.note} ward-checklist-note`, children: a })
  ] });
}
const Nu = "_rail_ke7ch_2", yu = "_k_ke7ch_11", ku = "_head_ke7ch_19", $u = "_section_ke7ch_25", Cu = "_card_ke7ch_38", Su = "_strip_ke7ch_42", Ru = "_skeleton_ke7ch_56", Tu = "_skeletonLabel_ke7ch_70", Eu = "_bar_ke7ch_76", Lu = "_note_ke7ch_85", de = {
  rail: Nu,
  k: yu,
  head: ku,
  section: $u,
  card: Cu,
  strip: Su,
  skeleton: Ru,
  skeletonLabel: Tu,
  bar: Eu,
  note: Lu
};
function Au(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ea({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: de.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: de.k, children: e }),
    a
  ] });
}
function xu({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: de.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: de.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: de.bar, "aria-hidden": "true" }, r))
  ] });
}
function qu({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(rd, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function Iu(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(qu, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(xu, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function G1(e) {
  const a = Au(e.onOpen), t = xn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: de.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${de.k} ${de.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ea, { title: "Card", children: /* @__PURE__ */ n("div", { className: de.card, children: t && /* @__PURE__ */ n($a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Ea, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: de.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Iu, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: de.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ea, { title: "Effect of this config", children: /* @__PURE__ */ n(Ca, { items: e.effects, density: "compact" }) })
  ] });
}
function Mu(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Bu(e) {
  return Math.ceil(e.length / 2);
}
function Pu(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function qn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Du(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = qn(e);
  o !== void 0 && t(o), r(Pu(e.type));
}
function Ou(e, a, t, r, o) {
  x(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Du(i, t, r, o));
  }, [e, a, t, r, o]);
}
function Hu(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Fu(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function ju(e, a) {
  return a !== void 0 ? re(e.timeInStage) + " · waits on " + a.agent : re(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Wu(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(Bu(a ?? [])) + ")"
  };
}
function zu(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Gu(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: ee(e.cost) }) : null;
}
function Uu(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Ku(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ye, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Vu(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Yu(e, a) {
  return a === void 0 ? e : Mu(e, a.ref);
}
function Xu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Qe(e) {
  return e === !0 ? "true" : void 0;
}
function In(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = ra(o), c = N(/* @__PURE__ */ new Set()), [s, u] = g(Hu(a));
  Ou(e.feed, a.key, c, u, i);
  const d = Fu(a, r), h = ju(a, t), _ = Wu(a, e.fields), b = Vu(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...Xu(e),
      className: "ward-workcard",
      "data-flagged": Qe(a.flagged),
      "data-selected": Qe(e.selected),
      style: _,
      ref: Yu(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        zu(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          Gu(a, e.fields),
          Uu(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Ku(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Ju({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Qu(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Zu(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function eh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Ju, { count: e.items.length, cap: e.column.cap });
}
function ah(e, a) {
  return e.roving ?? a;
}
function nh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function th(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    In,
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
function rh(e) {
  const a = k(), t = fa({ orientation: "vertical" }), r = ah(e, t), o = Qu(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Qe(o), "data-gate": Qe(e.column.gate), children: [
    Zu(e.column, e.items.length, a),
    eh(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...nh(e, t), children: th(e, r) })
  ] });
}
function lh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + re(e.p50)), e.p90 !== void 0 && (a += " · p90 " + re(e.p90)), a;
}
function oh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function ih(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function U1(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: lh(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      oh(e),
      ih(e.onConfigure),
      /* @__PURE__ */ n(Ga, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function ch(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function sh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Pe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Pe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function dh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(T, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function K1(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": Qe(ch(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: sh(e) }),
    /* @__PURE__ */ n(L, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Cn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    dh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function V1(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(In, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(rh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function uh(e, a) {
  const t = qn(e);
  t !== void 0 && a(t);
}
function hh(e, a, t) {
  x(() => {
    if (e != null)
      return e.subscribe(a, (r) => uh(r, t));
  }, [e, a, t]);
}
function mh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function wh(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", re(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ee(e.cost)]), a;
}
function _h(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ye, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function vh(e, a) {
  return /* @__PURE__ */ l(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function Y1(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = g((c = a.run) == null ? void 0 : c.lastStep);
  hh(e.feed, a.key, o);
  const i = [...mh(a), ...wh(a)];
  return /* @__PURE__ */ l(Ze, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      _h(t, r)
    ] }),
    vh(a, e.actions)
  ] });
}
const fh = "_card_hvxp7_2", bh = "_head_hvxp7_17", ph = "_mark_hvxp7_25", gh = "_name_hvxp7_37", Nh = "_chips_hvxp7_48", yh = "_description_hvxp7_54", kh = "_run_hvxp7_59", $h = "_sep_hvxp7_68", Ch = "_facts_hvxp7_73", Sh = "_fact_hvxp7_73", Rh = "_factLabel_hvxp7_86", Th = "_factValue_hvxp7_90", ne = {
  card: fh,
  head: bh,
  mark: ph,
  name: gh,
  chips: Nh,
  description: yh,
  run: kh,
  sep: $h,
  facts: Ch,
  fact: Sh,
  factLabel: Rh,
  factValue: Th
}, Eh = { live: "done", draft: "running", paused: "meta" };
function Lh(e) {
  return e === void 0 ? ne.card : `${ne.card} ${e}`;
}
function Ah({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ne.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Eh[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function xh({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ne.description, children: e });
}
function qh({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ne.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ne.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ye, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Ih({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ne.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: ne.fact, children: [
    /* @__PURE__ */ n("dt", { className: ne.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: ne.factValue, children: a.value })
  ] }, a.label)) });
}
function Mh(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Bh({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, facts: i, className: c }) {
  const s = { "--stream": Te(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": u,
      className: Lh(c),
      style: s,
      "data-selected": u,
      "data-paused": Mh(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: ne.head, children: [
          /* @__PURE__ */ n("span", { className: ne.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ne.name} ward-rowlink`, href: a, "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(xh, { description: e.description }),
        /* @__PURE__ */ n(qh, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Ah, { versions: e.versions }),
        /* @__PURE__ */ n(Ih, { facts: i })
      ]
    }
  );
}
const Ph = "_list_4dcyc_2", Dh = "_row_4dcyc_11", Oh = "_head_4dcyc_23", Hh = "_id_4dcyc_30", Fh = "_lock_4dcyc_35", jh = "_reason_4dcyc_41", Wh = "_remove_4dcyc_46", zh = "_clauses_4dcyc_50", Gh = "_clause_4dcyc_50", Uh = "_label_4dcyc_64", Kh = "_cell_4dcyc_71", Vh = "_value_4dcyc_76", te = {
  list: Ph,
  row: Dh,
  head: Oh,
  id: Hh,
  lock: Fh,
  reason: jh,
  remove: Wh,
  clauses: zh,
  clause: Gh,
  label: Uh,
  cell: Kh,
  value: Vh
}, Mn = Ke(!1);
function X1({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Mn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: te.list, "aria-label": a, children: e }) });
}
function Yh({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: te.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(L, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => t(e.key, o) });
}
function Xh({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: te.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: te.reason, children: e })
  ] });
}
function Jh({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: te.head, children: [
    /* @__PURE__ */ n("span", { className: te.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Xh, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: te.remove, children: /* @__PURE__ */ l(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function hn(e, a) {
  return e.locked ? void 0 : a;
}
function J1({ rule: e, onChange: a, onRemove: t }) {
  if (!Ue(Mn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = hn(e, a);
  return /* @__PURE__ */ l("li", { className: te.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Jh, { rule: e, onRemove: hn(e, t) }),
    /* @__PURE__ */ n("dl", { className: te.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: te.clause, children: [
      /* @__PURE__ */ n("dt", { className: te.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: te.cell, children: /* @__PURE__ */ n(Yh, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const Qh = "_ladder_wwnch_2", Zh = "_cell_wwnch_7", em = "_empty_wwnch_26", am = "_name_wwnch_34", nm = "_holder_wwnch_40", tm = "_request_wwnch_46", rm = "_swatches_wwnch_51", lm = "_swatch_wwnch_51", om = "_tilesFrame_wwnch_78", im = "_tiles_wwnch_78", cm = "_tile_wwnch_78", sm = "_bar_wwnch_117", dm = "_hex_wwnch_128", um = "_note_wwnch_138", R = {
  ladder: Qh,
  cell: Zh,
  empty: em,
  name: am,
  holder: nm,
  request: tm,
  swatches: rm,
  swatch: lm,
  tilesFrame: om,
  tiles: im,
  tile: cm,
  bar: sm,
  hex: dm,
  note: um
}, hm = "not validated yet, pending a CVD matrix and dark stepping";
function mm(e) {
  return e.reserved ? "reserved" : pa(e.step) ? "validated" : "partial";
}
function Bn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function wm(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function _m({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ee, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function vm(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function fm(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const mn = (e) => String(e).padStart(2, "0");
function bm(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Bn(e, void 0);
}
function pm({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: r ? `step ${mn(e)}` : qt(e) }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: r ? t : `Step ${mn(e)} · ${t}` })
  ] });
}
function gm({ step: e, value: a, taken: t, onChange: r, presentation: o }) {
  const i = mm(e), c = Bn(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, _ = `${d} · ${o === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...fm(s, u), "data-validation": i, style: wm(e, i), onClick: h, onKeyDown: (A) => vm(A, h) }, label: _, name: d, holder: c, validation: i, note: bm(i, t, u), step: e.step };
}
const Nm = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${R.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${R.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(pm, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${R.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(_m, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function ym(e) {
  return Nm[e.presentation](gm(e));
}
function km(e) {
  for (const a of e)
    if (!a.reserved && !ba(a.step)) throw new Error("colour ladder renders token steps only");
}
function $m() {
  return /* @__PURE__ */ l("div", { className: `${R.cell} ward-ladder-cell ${R.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Cm(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Sm = { list: R.ladder, swatches: R.swatches, tiles: R.tilesFrame };
function Rm() {
  return /* @__PURE__ */ l("div", { className: `${R.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Tm = { list: $m, swatches: () => null, tiles: Rm };
function Pn(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  km(e.steps);
  const r = Cm(e), o = Tm[r], i = /* @__PURE__ */ l(T, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(ym, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${Sm[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: R.tiles, children: i }) : i });
}
const Em = "_rail_1el2t_2", Lm = "_section_1el2t_12", Am = "_sectionFlush_1el2t_22", xm = "_head_1el2t_26", qm = "_headLabel_1el2t_34", Im = "_sample_1el2t_42", Mm = "_sampleLabel_1el2t_47", Bm = "_sampleTitle_1el2t_54", Pm = "_sampleMeta_1el2t_59", Dm = "_trace_1el2t_65", Om = "_traceHead_1el2t_70", Hm = "_steps_1el2t_78", Fm = "_step_1el2t_78", jm = "_stepTitle_1el2t_97", Wm = "_hollow_1el2t_107", zm = "_stepBody_1el2t_115", Gm = "_stepDetail_1el2t_127", Um = "_publish_1el2t_132", Km = "_reason_1el2t_138", Vm = "_note_1el2t_143", Ym = "_reveal_1el2t_148", p = {
  rail: Em,
  section: Lm,
  sectionFlush: Am,
  head: xm,
  headLabel: qm,
  sample: Im,
  sampleLabel: Mm,
  sampleTitle: Bm,
  sampleMeta: Pm,
  trace: Dm,
  traceHead: Om,
  steps: Hm,
  step: Fm,
  stepTitle: jm,
  hollow: Wm,
  stepBody: zm,
  stepDetail: Gm,
  publish: Um,
  reason: Km,
  note: Vm,
  reveal: Ym
}, wn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Xm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Jm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Qm = { notSimulated: "not simulated", running: "running" };
function Zm(e) {
  return e.presentation === "foundry";
}
function ew(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function aw(e, a) {
  var r;
  const t = Xm[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function nw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function tw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function rw(e) {
  if (nw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function lw(e) {
  const [a, t] = g(!1);
  x(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function ow(e) {
  const a = Qm[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ee, { size: 6, kind: Jm[e.kind], label: e.kind });
}
function iw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function cw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ye, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function sw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(lw, { kind: a.kind, children: [
    /* @__PURE__ */ n(ow, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(iw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(cw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function dw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(re(a)), t.join(" · ");
}
function Dn(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: dw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(sw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function uw(e) {
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
function hw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + le(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function mw(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ee(e.run.cost), label: "Cost" }, { value: e.run.turns ? yn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ya, { divided: !0, cells: a }) });
}
function ww(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ee(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: yn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function _w(e) {
  const a = ww(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ya, { divided: !0, cells: a }) });
}
function On(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function vw(e) {
  return /* @__PURE__ */ l("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(On, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function fw(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(On, { reason: e.reason, onPublish: e.onPublish }) });
}
function Hn(e) {
  return /* @__PURE__ */ l("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: wn[e.run.status].role, label: wn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ye, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function bw(e, a) {
  const [t, r] = g(e.steps);
  return x(() => r(e.steps), [e.steps]), x(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((i) => {
          var c, s;
          return [...i, { kind: o.type === "run.finding" ? "finding" : "action", title: ((c = o.step) == null ? void 0 : c.label) ?? "step", detail: (s = o.step) == null ? void 0 : s.tool }];
        });
      });
  }, [a, e.status]), t;
}
function pw(e) {
  var t;
  tw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Hn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(uw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Dn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(mw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist }) }),
    /* @__PURE__ */ n(vw, { reason: ew(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function gw(e) {
  var r;
  const a = bw(e.run, e.feed);
  rw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Hn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(hw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Dn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(_w, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(fw, { reason: aw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Q1(e) {
  return Zm(e) ? /* @__PURE__ */ n(gw, { ...e }) : /* @__PURE__ */ n(pw, { ...e });
}
const Nw = "_list_142ip_3", yw = "_row_142ip_9", kw = "_condition_142ip_18", $w = "_action_142ip_24", la = {
  list: Nw,
  row: yw,
  condition: kw,
  action: $w
}, Fn = Ke(!1);
function Z1({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Fn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: la.list, "aria-label": a, children: e }) });
}
function e$({ rule: e }) {
  if (!Ue(Fn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: la.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: la.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: la.action, children: e.then })
  ] });
}
function Pa(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [o] = r.splice(a, 1);
  return r.splice(t, 0, o), r;
}
function jn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Wn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function _n(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Cw(e) {
  return e === "up" ? "down" : "up";
}
function Sw(e, a) {
  const t = _n(e, a.id, a.direction) ?? _n(e, a.id, Cw(a.direction));
  t == null || t.focus();
}
function zn() {
  const e = N(null), [a, t] = g(null), [r, o] = g("");
  return x(() => {
    e.current !== null && a !== null && Sw(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), o(s);
  } };
}
function Gn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ha({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Rw = "_body_1h15q_2", Tw = "_title_1h15q_8", Ew = "_section_1h15q_13", Lw = "_legend_1h15q_18", Aw = "_stages_1h15q_26", xw = "_stage_1h15q_26", qw = "_stageIndex_1h15q_44", Iw = "_stageName_1h15q_50", Mw = "_footer_1h15q_59", Bw = "_note_1h15q_66", Pw = "_reason_1h15q_71", Dw = "_actions_1h15q_76", Ow = "_webHead_1h15q_83", Hw = "_kicker_1h15q_92", Fw = "_webTitle_1h15q_99", jw = "_webBody_1h15q_105", Ww = "_webSection_1h15q_109", zw = "_sectionHead_1h15q_121", Gw = "_sectionNote_1h15q_129", Uw = "_formLabel_1h15q_134", Kw = "_identityRow_1h15q_139", Vw = "_nameCell_1h15q_145", Yw = "_keyCell_1h15q_150", Xw = "_colourCell_1h15q_154", Jw = "_colourStatus_1h15q_161", Qw = "_webStages_1h15q_166", Zw = "_webStageList_1h15q_172", e_ = "_webStage_1h15q_166", a_ = "_webIndex_1h15q_191", n_ = "_webStageName_1h15q_196", t_ = "_webMoves_1h15q_201", r_ = "_addStage_1h15q_215", l_ = "_addStageButton_1h15q_223", o_ = "_addStageNote_1h15q_231", i_ = "_webFooter_1h15q_236", c_ = "_webFooterNotes_1h15q_244", s_ = "_webNote_1h15q_251", w = {
  body: Rw,
  title: Tw,
  section: Ew,
  legend: Lw,
  stages: Aw,
  stage: xw,
  stageIndex: qw,
  stageName: Iw,
  footer: Mw,
  note: Bw,
  reason: Pw,
  actions: Dw,
  webHead: Ow,
  kicker: Hw,
  webTitle: Fw,
  webBody: jw,
  webSection: Ww,
  sectionHead: zw,
  sectionNote: Gw,
  formLabel: Uw,
  identityRow: Kw,
  nameCell: Vw,
  keyCell: Yw,
  colourCell: Xw,
  colourStatus: Jw,
  webStages: Qw,
  webStageList: Zw,
  webStage: e_,
  webIndex: a_,
  webStageName: n_,
  webMoves: t_,
  addStage: r_,
  addStageButton: l_,
  addStageNote: o_,
  webFooter: i_,
  webFooterNotes: c_,
  webNote: s_
}, d_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Un = "not in catalogue";
function u_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Un}` }, ...t];
}
function h_({ stage: e, index: a, catalogue: t, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(L, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Un}`;
  return /* @__PURE__ */ n(L, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: u_(t, e.name), invalid: i, onChange: r });
}
function Kn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function m_(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function w_({ id: e, stage: a, index: t, total: r, catalogue: o, onReplace: i, onMove: c }) {
  const s = Kn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(h_, { stage: a, index: t, catalogue: o, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(L, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: d_, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ha, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ha, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function __({ stages: e, onChange: a, catalogue: t }) {
  const r = m_(e.length), o = zn(), i = (s, u) => {
    const d = jn(s, u);
    r.current = Pa(r.current, s, d), o.moved({ id: r.current[d], direction: u }, Wn(Kn(e[s], s), d, e.length)), a(Pa(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(w_, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Gn, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const v_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], f_ = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], b_ = "A new stream starts as a draft. Nothing runs on it until you publish it.", p_ = "Create is disabled: name the stream and give it a key first.", g_ = "reorder with the ↑ ↓ buttons · min 2";
function Ua(e, a) {
  return !e.reserved && pa(e.step) && a[e.step] === void 0;
}
function N_(e, a) {
  const t = e.find((r) => Ua(r, a));
  return t ? t.step : 1;
}
function y_({ stages: e, onMove: a }) {
  const t = zn(), r = (o, i) => {
    const c = jn(o, i);
    t.moved({ id: e[o].id, direction: i }, Wn(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: w.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ha, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ha, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Gn, { text: t.announcement })
  ] });
}
function k_({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: b_ }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function $_(e, a) {
  return e !== "" && a !== "" ? null : p_;
}
function C_(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = f_, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [h, _] = g(""), [b, A] = g(""), [U, Q] = g(a[0].value), [oe, ke] = g(() => N_(t, r)), [ie, De] = g(e.stages ?? v_), [Oe, $] = g(o[0].value), F = { name: h, key: b, streamStep: oe, owner: U, stages: ie, policy: Oe }, we = $_(h, b);
  return /* @__PURE__ */ n(Ze, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ l("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Stream name", value: h, onChange: _ }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Key", value: b, onChange: A, mono: !0 }),
      /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: U, onChange: Q, options: a })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Pn, { label: "Stream colour", steps: t, value: oe, onChange: ke, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(y_, { stages: ie, onMove: (Le, wt) => De(Pa(ie, Le, wt)) })
    ] }),
    /* @__PURE__ */ n(En, { legend: "Loop policy", options: o, value: Oe, onChange: $ }),
    /* @__PURE__ */ n(k_, { reason: we, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const Vn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], S_ = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function R_(e, a, t, r, o, i) {
  var s;
  const c = ((s = Vn.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function T_(e, a) {
  return E_(e) && L_(e, a) && A_(e);
}
function E_(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function L_(e, a) {
  return e.colourStep !== null && Ua({ step: e.colourStep }, a);
}
function A_(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function x_(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${hm}.` : Ua({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function q_({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function I_({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(q_, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: S_ })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function M_({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function B_({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(L, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(L, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function P_(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [o, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, A] = g("relay"), [U, Q] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = R_(o, c, u, h, b, U), ke = T_(oe, r), ie = U.find(($) => $.kind === "agent" && $.name.trim() !== ""), De = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Pn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), Oe = /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: x_(h, r) }),
    /* @__PURE__ */ n(L, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Ze, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(M_, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(B_, { name: o, setName: i, streamKey: c, setKey: s, colour: De, owner: Oe }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: g_ })
        ] }),
        /* @__PURE__ */ n(__, { stages: U, onChange: Q })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(En, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Vn, onChange: A }) }),
      /* @__PURE__ */ n(I_, { ready: ke, draft: oe, agentStage: ie, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function a$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(P_, { ...e }) : /* @__PURE__ */ n(C_, { ...e });
}
const D_ = "_row_bs8hc_2", O_ = "_cell_bs8hc_6", H_ = "_condition_bs8hc_11", F_ = "_action_bs8hc_18", j_ = "_contract_bs8hc_24", W_ = "_contractCondition_bs8hc_33", z_ = "_contractAction_bs8hc_39", Y = {
  row: D_,
  cell: O_,
  condition: H_,
  action: F_,
  contract: j_,
  contractCondition: W_,
  contractAction: z_
}, Yn = ["advance", "block", "escalate", "requestReview"], vn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ma(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Ka(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: Y.action, children: vn[e.then] }) : /* @__PURE__ */ n(
    L,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => a({ ...e, then: o }),
      options: Yn.map((o) => ({ value: o, label: vn[o] }))
    }
  );
}
function G_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: Y.row, children: [
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n("span", { className: Y.condition, title: ma(e, r), children: ma(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: Ka(e, a, t) })
  ] });
}
function U_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: Y.row, children: [
    /* @__PURE__ */ l("td", { className: Y.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: Y.condition, children: ma(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Y.cell, children: Ka(e, a, t) })
  ] });
}
function K_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: Y.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: Y.contractCondition, children: ma(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: Y.contractAction, children: Ka(e, a, t, !0) })
  ] });
}
const V_ = { two: U_, four: G_, contract: K_ };
function n$(e) {
  var t;
  if (!Yn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = V_[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Y_ = "_column_lurgk_2", X_ = "_head_lurgk_17", J_ = "_index_lurgk_23", Q_ = "_name_lurgk_29", Z_ = "_meta_lurgk_38", ev = "_mono_lurgk_43", av = "_gate_lurgk_50", nv = "_reviewersLabel_lurgk_57", tv = "_reviewers_lurgk_57", rv = "_reviewer_lurgk_57", lv = "_agents_lurgk_74", ov = "_workflowColumn_lurgk_79", iv = "_workflowHead_lurgk_96", cv = "_stageRow_lurgk_102", sv = "_stageLabel_lurgk_109", dv = "_workflowTitle_lurgk_116", uv = "_workflowMeta_lurgk_122", hv = "_workflowGate_lurgk_127", mv = "_gateNote_lurgk_135", wv = "_cardNote_lurgk_140", _v = "_reviewerList_lurgk_149", vv = "_reviewerRow_lurgk_155", fv = "_reviewerMark_lurgk_161", bv = "_reviewerName_lurgk_171", pv = "_terminalCard_lurgk_177", gv = "_terminalCount_lurgk_186", Nv = "_workflowAgents_lurgk_192", yv = "_mount_lurgk_198", y = {
  column: Y_,
  head: X_,
  index: J_,
  name: Q_,
  meta: Z_,
  mono: ev,
  gate: av,
  reviewersLabel: nv,
  reviewers: tv,
  reviewer: rv,
  agents: lv,
  workflowColumn: ov,
  workflowHead: iv,
  stageRow: cv,
  stageLabel: sv,
  workflowTitle: dv,
  workflowMeta: uv,
  workflowGate: hv,
  gateNote: mv,
  cardNote: wv,
  reviewerList: _v,
  reviewerRow: vv,
  reviewerMark: fv,
  reviewerName: bv,
  terminalCard: pv,
  terminalCount: gv,
  workflowAgents: Nv,
  mount: yv
}, kv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Va(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Xn(e) {
  return `${Math.round(e * 100)}%`;
}
function $v({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ya, { cells: [
      { value: Xn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: J(e.count), label: "In stage" }
    ] })
  ] });
}
function Cv({ stage: e }) {
  return /* @__PURE__ */ n(ya, { cells: [
    { value: J(e.count), label: "In stage" },
    { value: Va(e.closedThisWeek, J), label: "Closed this week" }
  ] });
}
function Sv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: kv[e.kind] })
  ] });
}
function Rv({ stage: e }) {
  return /* @__PURE__ */ l("p", { className: y.meta, children: [
    /* @__PURE__ */ l("span", { className: y.mono, children: [
      J(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ l("span", { className: y.mono, children: [
      re(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Tv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n($v, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Cv, { stage: e }) : null;
}
function Ev({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Lv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Sv, { stage: e, titleId: o }),
    /* @__PURE__ */ n(Rv, { stage: e }),
    /* @__PURE__ */ n(Tv, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(Bh, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(Ev, { onMount: t })
  ] });
}
const Av = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function xv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function qv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(xv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Xn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Iv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Mv({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: Va(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: Iv(e.rolledBackThisWeek) })
  ] });
}
function Bv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Pv(e) {
  if (e.kind === "terminal") return `${Va(e.closedThisWeek)} this week`;
  const a = Bv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Dv({ stage: e, titleId: a }) {
  const t = Av[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: Pv(e) })
  ] });
}
function Ov(e) {
  return e === "entry" || e === "agent";
}
function Hv({ stage: e, onMount: a }) {
  return a === void 0 || !Ov(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Fv({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Dv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(qv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Mv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(Hv, { stage: e, onMount: t })
  ] });
}
function jv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function t$(e) {
  return jv(e) ? /* @__PURE__ */ n(Fv, { ...e }) : /* @__PURE__ */ n(Lv, { ...e });
}
const Wv = "_row_ve78g_6", zv = "_cell_ve78g_10", Gv = "_name_ve78g_19", Uv = "_chain_ve78g_26", Kv = "_owner_ve78g_32", Vv = "_mono_ve78g_38", Yv = "_compactRow_ve78g_45", Xv = "_compactCell_ve78g_54", Jv = "_stack_ve78g_71", Qv = "_stat_ve78g_78", Zv = "_identityLine_ve78g_85", ef = "_identity_ve78g_85", af = "_compactName_ve78g_103", nf = "_ownerLine_ve78g_117", tf = "_link_ve78g_130", rf = "_emptyChain_ve78g_136", lf = "_arrow_ve78g_142", of = "_muted_ve78g_143", cf = "_define_ve78g_148", sf = "_statValue_ve78g_155", df = "_policyId_ve78g_161", uf = "_sub_ve78g_166", f = {
  row: Wv,
  cell: zv,
  name: Gv,
  chain: Uv,
  owner: Kv,
  mono: Vv,
  compactRow: Yv,
  compactCell: Xv,
  stack: Jv,
  stat: Qv,
  identityLine: Zv,
  identity: ef,
  compactName: af,
  ownerLine: nf,
  link: tf,
  emptyChain: rf,
  arrow: lf,
  muted: of,
  define: cf,
  statValue: sf,
  policyId: df,
  sub: uf
};
function hf(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function mf(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function Jn(e) {
  return `${J(e)} ${e === 1 ? "member" : "members"}`;
}
function wf(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Jn(e.members)}`;
}
function _f(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: wf(e) })
  ] }) });
}
function vf(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function ff(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : vf(e) });
}
function fn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function bf(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function pf(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function gf({ stream: e, href: a, presentation: t }) {
  const r = mf(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Te(e.streamStep, "chip") }, children: [
    _f(e, a),
    ff(e.stages, a),
    fn(pf(e.agents), e.agents === void 0 ? void 0 : hf(e.agents), "—"),
    bf(e.policy),
    fn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function Nf(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function r$(e) {
  if (Nf(e)) return gf(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ l("tr", { className: f.row, children: [
    /* @__PURE__ */ l("td", { className: f.cell, children: [
      /* @__PURE__ */ n("a", { className: f.name, href: t, children: a.name }),
      /* @__PURE__ */ n(m, { ...Na(a.key, a.streamStep) }),
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
      /* @__PURE__ */ n("span", { className: f.mono, children: Jn(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: J(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : re(a.p50) }) })
  ] });
}
const yf = "_row_mdce7_2", kf = "_name_mdce7_16", $f = "_scope_mdce7_24", wa = {
  row: yf,
  name: kf,
  scope: $f
};
function Cf(e) {
  return e === void 0 ? `${wa.row} ward-toolrow` : `${wa.row} ward-toolrow ${e}`;
}
function Sf(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Rf({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
function Tf({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Ef({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${wa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Lf(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function l$({ tool: e, onChange: a, presentation: t }) {
  const r = k(), o = k(), i = Sf(e, t), c = Lf(t);
  return /* @__PURE__ */ l(c, { className: Cf(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Rf, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${wa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Ef, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(Tf, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Af = "_strip_1qtlf_2", xf = "_head_1qtlf_10", qf = "_name_1qtlf_16", If = "_chart_1qtlf_24", Mf = "_segment_1qtlf_30", Bf = "_detailedChart_1qtlf_36", Pf = "_rail_1qtlf_49", Df = "_section_1qtlf_55", Of = "_label_1qtlf_66", Hf = "_note_1qtlf_83", X = {
  strip: Af,
  head: xf,
  name: qf,
  chart: If,
  segment: Mf,
  detailedChart: Bf,
  rail: Pf,
  section: Df,
  label: Of,
  note: Hf
}, Ff = "No item in flight to preview.", jf = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Wf = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Da = [1, 2, 3, 4, 5, 6], _a = 100;
function zf(e, a) {
  return a.has(e) ? Te(e, "id") : "var(--ward-color-line)";
}
function Gf({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: X.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Da.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: X.segment,
      x: o * _a,
      y: "0",
      width: _a,
      height: "8",
      fill: zf(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Uf(e) {
  const a = e.slice(0, Da.length);
  for (; a.length < Da.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Kf({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${X.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * _a),
        y: "0",
        width: String(_a),
        height: "40",
        style: { fill: Te(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function Qn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function na({ label: e, children: a }) {
  const t = k();
  return /* @__PURE__ */ l("section", { className: X.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: X.label, children: e }),
    a
  ] });
}
function Vf({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: X.note, children: a ?? Ff }) : /* @__PURE__ */ n($a, { item: { ...e, streamStep: ga(t.streamStep) }, onOpen: Qn(r), feed: null });
}
function Yf({ draft: e }) {
  const a = { "--stream": Te(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: X.head, style: a, children: [
    /* @__PURE__ */ n(Ee, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: X.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
  ] });
}
function Xf(e) {
  const a = Uf(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("div", { className: X.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(na, { label: "Board card", children: /* @__PURE__ */ n(Vf, { ...e, draft: t }) }),
    /* @__PURE__ */ n(na, { label: "Streams index row", children: /* @__PURE__ */ n(Yf, { draft: t }) }),
    /* @__PURE__ */ l(na, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Kf, { identities: a }),
      /* @__PURE__ */ n("p", { className: X.note, children: jf })
    ] }),
    /* @__PURE__ */ n(na, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: X.note, children: Wf }) })
  ] });
}
function Jf({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": Te(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: X.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: X.head, children: [
      /* @__PURE__ */ n(Ee, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: X.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n($a, { item: { ...a, streamStep: e.streamStep }, onOpen: Qn(r) }),
    /* @__PURE__ */ n(Gf, { draft: e, streams: t })
  ] });
}
function o$(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Xf, { ...e }) : /* @__PURE__ */ n(Jf, { ...e });
}
const Qf = "_row_ixlg5_6", Zf = "_headCell_ixlg5_10", eb = "_cell_ixlg5_11", ab = "_name_ixlg5_23", nb = "_consequence_ixlg5_29", tb = "_governed_ixlg5_36", rb = "_control_ixlg5_42", lb = "_byRole_ixlg5_48", ob = "_webControl_ixlg5_59", ib = "_webConsequence_ixlg5_65", cb = "_webGoverned_ixlg5_71", P = {
  row: Qf,
  headCell: Zf,
  cell: eb,
  name: ab,
  consequence: nb,
  governed: tb,
  control: rb,
  byRole: lb,
  webControl: ob,
  webConsequence: ib,
  webGoverned: cb
};
function sb({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: P.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: P.control, children: [
    /* @__PURE__ */ n(
      Pe,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "PILOT" })
  ] });
}
function db({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(sb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function ub(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function hb({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Pe,
    {
      label: `${e} · step ${a.streamStep}`,
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
function mb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(hb, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: ub(e) }) })
  ] });
}
function i$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(mb, { ...e }) : /* @__PURE__ */ n(db, { ...e });
}
const wb = "_row_vv64h_2", _b = "_cell_vv64h_6", vb = "_name_vv64h_25", fb = "_note_vv64h_30", bb = "_webName_vv64h_41", pb = "_webMeta_vv64h_47", z = {
  row: wb,
  cell: _b,
  name: vb,
  note: fb,
  webName: bb,
  webMeta: pb
}, Zn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function gb(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Nb({ component: e, onRestart: a }) {
  const t = k(), r = Zn[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: z.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: z.cell, "data-mono": "true", children: [
      J(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { id: t, className: z.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: z.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(v, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function yb({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: gb(e.state) });
}
function kb({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { ...Zn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(yb, { component: e, onRestart: a }) })
  ] });
}
function c$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(kb, { ...e }) : /* @__PURE__ */ n(Nb, { ...e });
}
const $b = "_row_1f1gp_7", Cb = "_cell_1f1gp_11", Sb = "_next_1f1gp_28", Rb = "_headCell_1f1gp_38", Tb = "_webId_1f1gp_77", Eb = "_webPurpose_1f1gp_83", Lb = "_webMeta_1f1gp_91", Ab = "_webUrgent_1f1gp_97", O = {
  row: $b,
  cell: Cb,
  next: Sb,
  headCell: Rb,
  webId: Tb,
  webPurpose: Eb,
  webMeta: Lb,
  webUrgent: Ab
}, xb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, qb = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, et = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Ib = Object.fromEntries(et.map((e) => [e.key, e]));
function Fe({ column: e, children: a }) {
  const t = Ib[e];
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
function s$() {
  return /* @__PURE__ */ n("tr", { children: et.map((e) => /* @__PURE__ */ n(
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
function Mb({ cred: e }) {
  const a = xb[e.state];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n(Fe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Fe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Fe, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Fe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Fe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Fe, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Bb({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function Pb({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Bb, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...qb[e.state] }) })
  ] });
}
function d$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Pb, { ...e }) : /* @__PURE__ */ n(Mb, { ...e });
}
const Db = "_card_17zba_2", Ob = "_head_17zba_11", Hb = "_env_17zba_18", Fb = "_version_17zba_25", jb = "_meta_17zba_32", Wb = "_webCard_17zba_37", zb = "_webRow_17zba_47", Gb = "_webTitle_17zba_55", Ub = "_webLine_17zba_65", Kb = "_webVersion_17zba_72", Vb = "_webMeta_17zba_77", W = {
  card: Db,
  head: Ob,
  env: Hb,
  version: Fb,
  meta: jb,
  webCard: Wb,
  webRow: zb,
  webTitle: Gb,
  webLine: Ub,
  webVersion: Kb,
  webMeta: Vb
}, at = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Yb({ env: e }) {
  const a = at[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: W.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ l("div", { className: W.head, children: [
      /* @__PURE__ */ n("span", { className: W.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: W.version, children: e.version }),
    /* @__PURE__ */ l("p", { className: W.meta, children: [
      "deployed ",
      le(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: W.meta, children: t })
  ] });
}
function Xb(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [le(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Jb(e) {
  return /* @__PURE__ */ l("article", { className: `${W.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${W.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${W.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...at[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${W.version} ${W.webVersion} ${W.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${W.meta} ${W.webMeta} ${W.webLine} ward-cellmeta`, children: Xb(e) })
  ] });
}
function u$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Jb, { ...e }) : /* @__PURE__ */ n(Yb, { ...e });
}
const Qb = "_panel_1hmja_2", Zb = "_line_1hmja_8", ep = "_actions_1hmja_14", ta = {
  panel: Qb,
  line: Zb,
  actions: ep
};
function h$(e) {
  return /* @__PURE__ */ l("div", { className: ta.panel, children: [
    /* @__PURE__ */ n("p", { className: ta.line, children: e.status }),
    /* @__PURE__ */ n(L, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ta.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ta.line, children: e.note ?? "" })
  ] });
}
const ap = "_upload_erepj_2", np = "_preview_erepj_7", tp = "_mark_erepj_17", rp = "_empty_erepj_22", lp = "_actions_erepj_28", op = "_input_erepj_33", ip = "_reasons_erepj_41", cp = "_reason_erepj_41", sp = "_accepted_erepj_57", Z = {
  upload: ap,
  preview: np,
  mark: tp,
  empty: rp,
  actions: lp,
  input: op,
  reasons: ip,
  reason: cp,
  accepted: sp
}, nt = 1.5, tt = 22, va = "script elements or event handlers", Ce = "links or external references", Ne = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${nt}px at ${tt}px`], dp = [Ne[1], Ne[2], va, Ce], up = /* @__PURE__ */ new Map([
  ["image", Ne[1]],
  ["text", Ne[2]],
  ["tspan", Ne[2]],
  ["textPath", Ne[2]],
  ["script", va],
  ["foreignObject", va],
  ["a", Ce],
  ["use", Ce],
  ["style", Ce],
  ["feImage", Ce],
  ["set", Ce]
]), hp = "http://www.w3.org/2000/svg", mp = "http://www.w3.org/2000/xmlns/", wp = /* @__PURE__ */ new Set([
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
]), _p = /* @__PURE__ */ new Set([
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
]), vp = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, fp = /url\s*\(|['"\\]/i;
function bp() {
  return { ok: !1, reasons: [Ne[1]] };
}
function rt(e) {
  return e.namespaceURI === hp || e.namespaceURI === null;
}
function pp(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && rt(a) ? a : null;
  } catch {
    return null;
  }
}
function gp(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ne[0]] : [];
}
function Np(e) {
  return up.get(e.localName) ?? (e.localName.startsWith("animate") ? Ce : void 0);
}
function yp(e) {
  return fp.test(e.replace(vp, ""));
}
function kp(e) {
  return /^on/i.test(e.localName) ? va : e.localName === "href" || yp(e.value) ? Ce : void 0;
}
function $p(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(Np(t));
    for (const r of Array.from(t.attributes)) a.add(kp(r));
  }
  return dp.filter((t) => a.has(t));
}
function Cp(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? tt / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < nt;
  }) ? [Ne[3]] : [];
}
function Sp(e) {
  if (e.namespaceURI === mp) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (_p.has(a) || a.startsWith("stroke"));
}
function Rp(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && rt(a) && wp.has(a.localName);
}
function Tp(e, a) {
  Rp(a) ? a.nodeType === Node.ELEMENT_NODE && lt(a) : e.removeChild(a);
}
function lt(e) {
  for (const a of Array.from(e.attributes)) Sp(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) Tp(e, a);
  return e;
}
function m$(e) {
  const a = pp(e);
  if (a === null) return bp();
  const t = [...gp(a), ...$p(a), ...Cp(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(lt(a)) };
}
const Ep = "Mark accepted.";
function Lp({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: Z.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: Z.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: Z.empty }) });
}
function Ap(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function xp(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function qp({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: Z.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: Z.result, role: "status", children: /* @__PURE__ */ n("p", { className: Z.accepted, children: Ep }) }) : /* @__PURE__ */ n("div", { className: Z.result, role: "status", children: /* @__PURE__ */ n("ul", { className: Z.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: Z.reason, children: a }, a)) }) });
}
function Ip({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(qp, { result: e }) : /* @__PURE__ */ n("p", { className: `${Z.result} ${Ap(e, t)}`, role: "status", children: xp(e, t) });
}
function w$({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: Z.upload, children: [
    /* @__PURE__ */ n(Lp, { current: e }),
    /* @__PURE__ */ l("div", { className: Z.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: o,
          className: Z.input,
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
    /* @__PURE__ */ n(Ip, { result: i, presentation: r })
  ] });
}
const Mp = "_row_1wp9s_7", Bp = "_cell_1wp9s_11", Pp = "_head_1wp9s_28", Dp = "_name_1wp9s_34", Op = "_pinned_1wp9s_42", Hp = "_headCell_1wp9s_49", Fp = "_webName_1wp9s_88", jp = "_webMeta_1wp9s_95", Wp = "_webWarn_1wp9s_103", q = {
  row: Mp,
  cell: Bp,
  head: Pp,
  name: Dp,
  pinned: Op,
  headCell: Hp,
  webName: Fp,
  webMeta: jp,
  webWarn: Wp
}, Ya = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, ot = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], zp = Object.fromEntries(ot.map((e) => [e.key, e]));
function Gp(e, a) {
  return `mcp.${e}.${a}`;
}
function Up(e) {
  return Object.keys(Ya).includes(e);
}
function Kp(e) {
  return Ya[e !== void 0 && Up(e) ? e : "unknown"];
}
function Ve({ column: e, children: a }) {
  const t = zp[e];
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
function _$() {
  return /* @__PURE__ */ n("tr", { children: ot.map((e) => /* @__PURE__ */ n(
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
function Vp({ server: e }) {
  const a = Ya[e.connection];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l(Ve, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: q.head, children: [
        /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: q.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(Ve, { column: "connection", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ve, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(Ve, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(Ve, { column: "tools", children: e.tools.map((t) => Gp(e.name, t)).join(" · ") })
  ] });
}
function Yp(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Xp(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Jp({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Qp({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Zp({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function eg({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Yp(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Xp(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Jp, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Kp(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n(Qp, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Zp, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function v$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(eg, { ...e }) : /* @__PURE__ */ n(Vp, { ...e });
}
const ag = "_row_1h9nq_2", ng = "_headCell_1h9nq_14", tg = "_cell_1h9nq_15", rg = "_name_1h9nq_26", lg = "_consequence_1h9nq_32", og = "_reason_1h9nq_38", ig = "_value_1h9nq_44", cg = "_webRow_1h9nq_60", sg = "_webSetting_1h9nq_71", dg = "_webName_1h9nq_79", ug = "_webConsequence_1h9nq_87", hg = "_webControl_1h9nq_93", mg = "_webState_1h9nq_106", wg = "_webChip_1h9nq_111", E = {
  row: ag,
  headCell: ng,
  cell: tg,
  name: rg,
  consequence: lg,
  reason: og,
  value: ig,
  webRow: cg,
  webSetting: sg,
  webName: dg,
  webConsequence: ug,
  webControl: hg,
  webState: mg,
  webChip: wg
}, it = 104, ct = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function _g({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Pe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Sn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: E.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function vg({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), i = ct[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: E.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ n("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: E.cell, children: /* @__PURE__ */ n(_g, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: E.cell, style: { width: it }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function st(e, a) {
  return String(e ?? a);
}
function fg(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function bg(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? st(e.value, "—");
}
function pg({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: E.webControl, children: [
    /* @__PURE__ */ n(Pe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: E.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function gg(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(pg, { ...e });
  const o = fg(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Sn, { options: o, value: st(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: bg(a) });
}
function Ng({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = k(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: E.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: E.webControl, children: i(c) }) : /* @__PURE__ */ n(gg, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${E.webChip} ward-policy-chip`, style: { width: it }, children: /* @__PURE__ */ n(m, { ...ct[t], size: "tag" }) })
  ] });
}
function f$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ng, { ...e }) : /* @__PURE__ */ n(vg, { ...e });
}
const yg = "_label_1o9za_7", kg = "_name_1o9za_15", $g = "_column_1o9za_24", Cg = "_webFrame_1o9za_57", Sg = "_webHead_1o9za_62", Rg = "_webHeadLabel_1o9za_74", Tg = "_webLabel_1o9za_112", Eg = "_webColumns_1o9za_119", Lg = "_webGroup_1o9za_125", Ag = "_webPeople_1o9za_126", xg = "_webVia_1o9za_127", qg = "_webMeta_1o9za_156", H = {
  label: yg,
  name: kg,
  column: $g,
  webFrame: Cg,
  webHead: Sg,
  webHeadLabel: Rg,
  webLabel: Tg,
  webColumns: Eg,
  webGroup: Lg,
  webPeople: Ag,
  webVia: xg,
  webMeta: qg
}, Ig = {
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
function Mg(e) {
  if (!e.matrixRole) return;
  const a = Ig[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Bg({ node: e }) {
  const a = Mg(e);
  return /* @__PURE__ */ l("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(Pg, { role: a, node: e }),
    /* @__PURE__ */ n(Aa, { column: La[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Aa, { column: La[1], children: e.people === void 0 ? "" : J(e.people) }),
    /* @__PURE__ */ n(Aa, { column: La[2], children: e.requestedVia ?? "" })
  ] });
}
function Pg({ role: e, node: a }) {
  return /* @__PURE__ */ l(T, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Dg({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    An,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(Bg, { node: t }),
      children: c
    }
  );
}
function xa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Og({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(xa, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(xa, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(xa, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Hg() {
  return /* @__PURE__ */ l("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function Fg({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function jg(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Wg({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Hg, {}),
    /* @__PURE__ */ n(jc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      An,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Fg, { row: t }),
        detail: /* @__PURE__ */ n(Og, { row: t }),
        expanded: jg(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function b$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Wg, { ...e }) : /* @__PURE__ */ n(Dg, { ...e });
}
const zg = "_runbook_b9agc_2", Gg = "_list_b9agc_7", Ug = "_step_b9agc_15", Kg = "_numeral_b9agc_21", Vg = "_body_b9agc_28", Yg = "_head_b9agc_34", Xg = "_title_b9agc_40", Jg = "_detail_b9agc_45", Qg = "_actions_b9agc_50", Zg = "_webList_b9agc_56", eN = "_webStep_b9agc_60", aN = "_webBody_b9agc_66", nN = "_webTitle_b9agc_74", tN = "_webDetail_b9agc_78", S = {
  runbook: zg,
  list: Gg,
  step: Ug,
  numeral: Kg,
  body: Vg,
  head: Yg,
  title: Xg,
  detail: Jg,
  actions: Qg,
  webList: Zg,
  webStep: eN,
  webBody: aN,
  webTitle: nN,
  webDetail: tN
}, dt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function ut(e) {
  return String(e + 1).padStart(2, "0");
}
function rN({ step: e, index: a, connection: t }) {
  const r = dt[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: ut(a) }),
    /* @__PURE__ */ l("span", { className: S.body, children: [
      /* @__PURE__ */ l("span", { className: S.head, children: [
        /* @__PURE__ */ n("span", { className: S.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(ye, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: S.detail, children: e.detail })
    ] })
  ] });
}
function lN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(rN, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function oN({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: ut(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...dt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ye, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function iN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(oN, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function p$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(iN, { ...e }) : /* @__PURE__ */ n(lN, { ...e });
}
const cN = "_list_1gu6a_2", sN = "_check_1gu6a_10", dN = "_body_1gu6a_16", uN = "_text_1gu6a_23", hN = "_pending_1gu6a_32", mN = "_measured_1gu6a_37", We = {
  list: cN,
  check: sN,
  body: dN,
  text: uN,
  pending: hN,
  measured: mN
};
function wN(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function _N({ check: e }) {
  const a = wN(e.passed);
  return /* @__PURE__ */ l("li", { className: `${We.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(za, { state: a.state, label: a.label }),
    /* @__PURE__ */ l("span", { className: We.body, children: [
      /* @__PURE__ */ n("span", { className: We.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ l("span", { className: We.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: We.measured, children: e.measured })
  ] });
}
function g$({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${We.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(_N, { check: a }, a.text)) });
}
const vN = "_root_16pdz_2", fN = "_list_16pdz_9", bN = "_line_16pdz_16", pN = "_at_16pdz_43", gN = "_text_16pdz_47", NN = "_foot_16pdz_51", yN = "_idle_16pdz_62", kN = "_caret_16pdz_69", $N = "_jump_16pdz_76", be = {
  root: vN,
  list: fN,
  line: bN,
  at: pN,
  text: gN,
  foot: NN,
  idle: yN,
  caret: kN,
  jump: $N
}, CN = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Xa(e) {
  return Number.isNaN(Date.parse(e)) ? "" : CN.format(new Date(e));
}
const SN = { warn: "warning", ok: "ok" };
function RN({ kind: e }) {
  const a = SN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function TN({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Xa(e)}` });
}
function EN({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Xa(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${be.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${be.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: be.idle, children: i }),
    /* @__PURE__ */ n(TN, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function N$({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const o = N(null), [i, c] = g(0), s = e.at(-1);
  x(() => {
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
  return /* @__PURE__ */ l("div", { className: be.root, children: [
    /* @__PURE__ */ n("ol", { className: be.list, ref: o, "aria-live": "off", "aria-label": r, children: e.map((d, h) => /* @__PURE__ */ l("li", { className: `${be.line} ward-consline ward-reveal ward-consline--${d.kind}`, "data-kind": d.kind, "data-revealed": h < i, children: [
      /* @__PURE__ */ n("span", { className: be.at, children: Xa(d.at) }),
      /* @__PURE__ */ n(RN, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: be.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(EN, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${be.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const LN = "_row_11jhe_2", AN = "_head_11jhe_14", xN = "_author_11jhe_20", qN = "_eta_11jhe_25", IN = "_edited_11jhe_26", MN = "_body_11jhe_32", BN = "_reason_11jhe_37", PN = "_actions_11jhe_42", ve = {
  row: LN,
  head: AN,
  author: xN,
  eta: qN,
  edited: IN,
  body: MN,
  reason: BN,
  actions: PN
}, DN = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function ON(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function HN({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function FN({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: ve.reason, id: a, children: e })
  ] });
}
function jN(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function WN(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(HN, { ...e }) : /* @__PURE__ */ n(FN, { reason: e.unavailable, reasonId: e.unavailableId });
}
function y$(e) {
  const { comment: a } = e;
  jN(e);
  const t = k(), r = `${t}-unavailable`, o = DN[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${ve.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: ve.head, children: [
      /* @__PURE__ */ n("span", { className: ve.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: ve.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: ve.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: ve.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: ve.reason, id: t, children: ON(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: ve.actions, children: /* @__PURE__ */ n(WN, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const zN = "_root_c46wj_2", GN = "_attach_c46wj_11", UN = "_actions_c46wj_17", KN = "_reply_c46wj_23", VN = "_replyRow_c46wj_28", YN = "_sendsAs_c46wj_42", Ge = {
  root: zN,
  attach: GN,
  actions: UN,
  reply: KN,
  replyRow: VN,
  sendsAs: YN
};
function XN({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = g(""), i = k();
  return /* @__PURE__ */ l("div", { className: Ge.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: Ge.replyRow, children: [
      /* @__PURE__ */ n(L, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ge.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function k$(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(XN, { ...e }) : /* @__PURE__ */ n(JN, { ...e });
}
function JN({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ l("div", { className: Ge.root, children: [
    /* @__PURE__ */ n(L, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ l("div", { className: Ge.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      Cn,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ l("div", { className: Ge.actions, children: [
      /* @__PURE__ */ n(v, { variant: "primary", onClick: () => o(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(v, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const QN = "_list_1ih9e_2", ZN = "_item_1ih9e_6", ey = "_body_1ih9e_22", ay = "_text_1ih9e_28", ny = "_evidence_1ih9e_37", ty = "_consequence_1ih9e_49", ry = "_note_1ih9e_54", Be = {
  list: QN,
  item: ZN,
  body: ey,
  text: ay,
  evidence: ny,
  consequence: ty,
  note: ry
};
function ly({ criterion: e }) {
  return /* @__PURE__ */ n(Ee, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function bn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function oy(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function iy({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Be.body, children: [
    /* @__PURE__ */ n("span", { className: Be.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(T, { children: [
      /* @__PURE__ */ n(bn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Be.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(T, { children: [
      /* @__PURE__ */ n(bn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Be.consequence, children: oy(e.why) })
    ] })
  ] });
}
function cy({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Be.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(ly, { criterion: e }),
    /* @__PURE__ */ n(iy, { criterion: e })
  ] });
}
function $$({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Be.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(cy, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Be.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const sy = "_list_dwhoz_2", dy = "_rung_dwhoz_6", uy = "_name_dwhoz_18", hy = "_actor_dwhoz_32", oa = {
  list: sy,
  rung: dy,
  name: uy,
  actor: hy
}, my = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function wy({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = my[e.state];
  return /* @__PURE__ */ l("li", { className: oa.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: oa.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${oa.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function C$({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${oa.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(wy, { rung: a }, a.name)) });
}
const _y = "_sheet_1fqco_2", vy = "_title_1fqco_9", fy = "_stage_1fqco_15", by = "_effects_1fqco_20", py = "_effect_1fqco_20", gy = "_numeral_1fqco_31", Ny = "_effectText_1fqco_38", yy = "_refusals_1fqco_43", ky = "_reasons_1fqco_52", $y = "_reason_1fqco_52", Cy = "_actions_1fqco_62", se = {
  sheet: _y,
  title: vy,
  stage: fy,
  effects: by,
  effect: py,
  numeral: gy,
  effectText: Ny,
  refusals: yy,
  reasons: ky,
  reason: $y,
  actions: Cy
};
function Sy({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function S$({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
  const s = k(), u = `${s}-refusal`, [d, h] = g(""), _ = t.length > 0;
  return /* @__PURE__ */ n(Ze, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ l("div", { className: se.sheet, children: [
    /* @__PURE__ */ l("h2", { className: se.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: se.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: se.effects, children: a.map((b, A) => /* @__PURE__ */ l("li", { className: se.effect, children: [
      /* @__PURE__ */ n("span", { className: se.numeral, children: String(A + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: se.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      qi,
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
    _ && /* @__PURE__ */ l("div", { className: se.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: se.reasons, children: t.map((b, A) => /* @__PURE__ */ n("li", { className: se.reason, id: A === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: se.actions, children: [
      /* @__PURE__ */ n(Sy, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const Ry = "_list_1hvqu_2", Ty = "_path_1hvqu_7", Ey = "_head_1hvqu_21", Ly = "_label_1hvqu_28", Ay = "_consequence_1hvqu_35", xy = "_ask_1hvqu_36", ze = {
  list: Ry,
  path: Ty,
  head: Ey,
  label: Ly,
  consequence: Ay,
  ask: xy
}, Oa = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function pn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function gn(e) {
  return e ? "primary" : "secondary";
}
function qy({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: gn(a), size: "sm", onClick: () => t(e.kind), children: Oa[e.kind] }) : /* @__PURE__ */ l(T, { children: [
    /* @__PURE__ */ n(v, { variant: gn(a), size: "sm", disabled: !0, describedBy: r, children: Oa[e.kind] }),
    /* @__PURE__ */ n("span", { className: ze.ask, id: r, children: e.askInstead })
  ] });
}
function Iy({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: ze.path, "data-allowed": e.allowed, "data-role": pn(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: ze.head, children: [
      /* @__PURE__ */ n("span", { className: ze.label, children: e.title ?? Oa[e.kind] }),
      /* @__PURE__ */ n(m, { role: pn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: ze.consequence, children: e.consequence }),
    /* @__PURE__ */ n(qy, { path: e, primary: a, onChoose: t })
  ] });
}
function R$({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: ze.list, children: e.map((t, r) => /* @__PURE__ */ n(Iy, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const My = "_list_qjv4r_2", By = "_item_qjv4r_6", Py = "_node_qjv4r_18", Dy = "_body_qjv4r_24", Oy = "_head_qjv4r_30", Hy = "_stage_qjv4r_36", Fy = "_version_qjv4r_41", jy = "_sentence_qjv4r_49", Wy = "_meta_qjv4r_54", pe = {
  list: My,
  item: By,
  node: Py,
  body: Dy,
  head: Oy,
  stage: Hy,
  version: Fy,
  sentence: jy,
  meta: Wy
}, zy = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Gy({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: pe.head, children: [
    /* @__PURE__ */ n("span", { className: pe.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: pe.version, title: e.version, children: e.version }) : null
  ] });
}
function Uy({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${pe.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${pe.node} ward-history-node`, children: /* @__PURE__ */ n(Ee, { size: 9, kind: zy[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${pe.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Gy, { entry: e }),
      /* @__PURE__ */ n("span", { className: pe.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${pe.meta} ward-history-meta`, children: [
        `${le(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ee(e.cost)}`
      ] })
    ] })
  ] });
}
function T$({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${pe.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Uy, { entry: a }, a.stage + String(t))) });
}
const Ky = "_thread_1kn6s_3", Vy = "_turn_1kn6s_8", Yy = "_who_1kn6s_27", Xy = "_body_1kn6s_32", ia = {
  thread: Ky,
  turn: Vy,
  who: Yy,
  body: Xy
}, ht = Ke(!1);
function E$({ children: e, density: a }) {
  return /* @__PURE__ */ n(ht.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ia.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function L$({ turn: e }) {
  if (!Ue(ht)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${ia.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${ia.who} ward-chat-who`, children: [
      e.author,
      " · ",
      le(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ia.body} ward-chat-body`, children: e.body })
  ] });
}
const Jy = "_list_1rt9c_3", Qy = "_row_1rt9c_7", Zy = "_label_1rt9c_20", ek = "_n_1rt9c_26", ak = "_cause_1rt9c_33", Je = {
  list: Jy,
  row: Qy,
  label: Zy,
  n: ek,
  cause: ak
};
function nk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const tk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function rk({ row: e, formatNumber: a }) {
  return nk(e), /* @__PURE__ */ l("li", { className: `${Je.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ee, { size: 8, ...tk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Je.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Je.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(lk, { cause: e.cause })
  ] });
}
function lk({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Je.cause} ward-healthrow-cause`, children: e }) : null;
}
function A$({ rows: e, formatNumber: a = J }) {
  return /* @__PURE__ */ n("ul", { className: `${Je.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(rk, { row: t, formatNumber: a }, t.label)) });
}
const ok = "_root_1jxwp_2", ik = {
  root: ok
};
function x$({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: ik.root, "data-density": o, children: [
    /* @__PURE__ */ n(Ca, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const ck = "_row_dhbre_3", sk = "_key_dhbre_13", dk = "_stack_dhbre_24", uk = "_value_dhbre_32", hk = "_evidence_dhbre_39", mk = "_mark_dhbre_47", je = {
  row: ck,
  key: sk,
  stack: dk,
  value: uk,
  evidence: hk,
  mark: mk
};
function wk({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(za, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function q$({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${je.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${je.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${je.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${je.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${je.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${je.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(wk, { state: e.state }) })
  ] });
}
const _k = "_cell_1monp_2", vk = {
  cell: _k
}, fk = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function bk(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function pk(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function gk(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: bk(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function Nk(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function I$({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  pk(e, t);
  const r = Nk(e);
  return /* @__PURE__ */ n(
    Ki,
    {
      label: "Rejection routing",
      columns: fk,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: vk.cell, "data-norerun": o.noRerun ? !0 : void 0, children: gk(o, i) }),
      empty: a ?? /* @__PURE__ */ n(ks, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const yk = "_row_ute8v_2", kk = "_title_ute8v_11", $k = "_turns_ute8v_20", Ck = "_waiting_ute8v_21", Sk = "_resolved_ute8v_22", Rk = "_activity_ute8v_23", Tk = "_cost_ute8v_29", Ek = "_link_ute8v_30", Lk = "_tableRow_ute8v_47", Ak = "_tableTitle_ute8v_59", xk = "_tableResolved_ute8v_64", qk = "_tableLink_ute8v_68", Ik = "_tableMeta_ute8v_83", Mk = "_tableCost_ute8v_90", Bk = "_tableActivity_ute8v_91", Pk = "_tableState_ute8v_101", Dk = "_tableRecord_ute8v_112", B = {
  row: yk,
  title: kk,
  turns: $k,
  waiting: Ck,
  resolved: Sk,
  activity: Rk,
  cost: Tk,
  link: Ek,
  tableRow: Lk,
  tableTitle: Ak,
  tableResolved: xk,
  tableLink: qk,
  tableMeta: Ik,
  tableCost: Mk,
  tableActivity: Bk,
  tableState: Pk,
  tableRecord: Dk
}, mt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function Ok(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function Hk(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Fk(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const jk = { duplicate: "CLOSED · DUPLICATE" };
function Wk({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function zk({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : ee(e) });
}
function Gk({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function Uk({ session: e, href: a }) {
  const t = mt[e.state];
  return /* @__PURE__ */ l("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: Hk(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: B.tableResolved, children: [
      Fk(e.resolved),
      /* @__PURE__ */ n(Wk, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(zk, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: Ok(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: jk[e.state] ?? t.label }),
      /* @__PURE__ */ n(Gk, { link: e.link })
    ] }) })
  ] });
}
function Kk({ session: e }) {
  const a = mt[e.state];
  return /* @__PURE__ */ l("div", { className: B.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: B.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: B.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: B.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: B.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: B.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ee(e.cost) }),
    /* @__PURE__ */ n("span", { className: B.activity, children: le(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: B.link, href: e.link.href, children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function M$(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(Uk, { session: e.session, href: e.href }) : /* @__PURE__ */ n(Kk, { session: e.session });
}
const Vk = "_block_1yy2v_3", Yk = "_list_1yy2v_9", Xk = "_line_1yy2v_14", Ha = {
  block: Vk,
  list: Yk,
  line: Xk
}, Jk = { warn: "warning", ok: "ok" };
function Qk({ kind: e }) {
  const a = Jk[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Zk({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Ha.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(Qk, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function B$({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ha.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ha.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(Zk, { line: t }, `${r}-${t.text}`)) }) });
}
const e1 = "_band_tt7hp_1", a1 = "_head_tt7hp_8", n1 = "_cell_tt7hp_19", t1 = "_index_tt7hp_35", r1 = "_title_tt7hp_42", l1 = "_note_tt7hp_48", o1 = "_cellTitle_tt7hp_53", i1 = "_cellBody_tt7hp_58", c1 = "_tag_tt7hp_64", _e = {
  band: e1,
  head: a1,
  cell: n1,
  index: t1,
  title: r1,
  note: l1,
  cellTitle: o1,
  cellBody: i1,
  tag: c1
}, Nn = 4;
function P$({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== Nn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Nn}-cell grid`);
  return /* @__PURE__ */ l("section", { className: _e.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ l("div", { className: _e.head, children: [
      /* @__PURE__ */ n("span", { className: _e.index, children: e }),
      /* @__PURE__ */ n("span", { className: _e.title, children: a }),
      /* @__PURE__ */ n("span", { className: _e.note, children: t })
    ] }),
    r.map((o) => /* @__PURE__ */ l("div", { className: _e.cell, children: [
      /* @__PURE__ */ n("span", { className: _e.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: _e.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: _e.tag, children: o.tag })
    ] }, o.title))
  ] });
}
export {
  N$ as ActivityConsole,
  Bh as AgentCard,
  N1 as AppShell,
  o$ as AppearanceStrip,
  P$ as Band,
  S1 as BarChart,
  rd as BoardColumn,
  H1 as BoardFootnote,
  F1 as BoardHeader,
  q1 as BoardScroller,
  v as Btn,
  f1 as CHIP_ROLES,
  et as CREDENTIAL_COLUMNS,
  C1 as Callout,
  i$ as CapabilityRow,
  L$ as ChatMessage,
  Cn as Checkbox,
  m as Chip,
  y$ as ClarificationRow,
  J1 as ClauseRuleRow,
  X1 as ClauseRules,
  Pn as ColourLadder,
  c$ as ComponentRow,
  k$ as Composer,
  W1 as ConfigRow,
  j1 as ConfigRowHead,
  Ga as ConnectionMark,
  E$ as Conversation,
  qi as CostMeter,
  d$ as CredentialRow,
  s$ as CredentialRowHead,
  $$ as CriteriaList,
  Vr as Crumb,
  A$ as DeliveryHealth,
  M1 as DeniedState,
  Q1 as DryRunRail,
  ks as EmptyState,
  u$ as EnvCard,
  L as Field,
  I1 as FilteredEmpty,
  A1 as FormStack,
  Ca as GateChecklist,
  C$ as GateLadder,
  Ki as Grid,
  e$ as HandoffRuleRow,
  Z1 as HandoffRules,
  z1 as ItemDrawer,
  h$ as KeyPanel,
  At as LIVE_EVENT_TYPES,
  rh as LegacyBoardColumn,
  U1 as LegacyBoardHeader,
  K1 as LegacyConfigRow,
  Y1 as LegacyItemDrawer,
  Ju as LegacyOverCapNote,
  V1 as LegacyPreviewRail,
  In as LegacyWorkCard,
  ye as LiveIndicator,
  B1 as LoadFailed,
  O1 as Loading,
  ot as MCP_SERVER_COLUMNS,
  za as Mark,
  w$ as MarkUpload,
  Ee as Marker,
  v$ as McpServerRow,
  _$ as McpServerRowHead,
  a$ as NewStreamModal,
  Ss as OverCapNote,
  Ze as Overlay,
  hm as PARTIAL_STEP_REASON,
  it as POLICY_CHIP_WIDTH,
  T1 as PageFrame,
  $1 as PageHeader,
  f$ as PolicyRow,
  G1 as PreviewRail,
  La as ROLE_MATRIX_COLUMNS,
  Yn as RULE_ACTIONS,
  En as Radio,
  x$ as ReadyChecklist,
  L1 as RecordSection,
  S$ as RequeueSheet,
  R$ as ResolveBlock,
  q$ as ResolvedFieldRow,
  b$ as RoleMatrixRow,
  I$ as RoutingTable,
  n$ as RuleRow,
  p$ as RunbookSteps,
  Et as STREAM_STEPS,
  x1 as SectionBand,
  dc as SectionHeader,
  Sn as SegmentedControl,
  M$ as SessionRow,
  k1 as Sidebar,
  t$ as StageColumn,
  T$ as StageHistory,
  __ as StageListEditor,
  P1 as StaleStrip,
  ya as StatStrip,
  r$ as StreamRow,
  E1 as SubjectRail,
  Pe as Switch,
  y1 as Tabs,
  l$ as ToolRow,
  R1 as TopBar,
  jc as Tree,
  An as TreeRow,
  B$ as TypedInputBlock,
  g$ as ValidationList,
  h1 as VisibilityProvider,
  m1 as Visible,
  v1 as WARD_VERSION,
  $a as WorkCard,
  D1 as WriteUnavailableStrip,
  Ok as agoSince,
  Nt as clock,
  x_ as colourStatus,
  J as count,
  re as duration,
  Fa as elapsed,
  _1 as eventSourceTransport,
  ba as isStreamStep,
  pa as isValidatedStreamStep,
  mm as ladderValidation,
  Kp as mcpConnectionChip,
  Gp as mcpToolName,
  ee as money,
  he as ms,
  xn as ordered,
  yn as ratio,
  gb as restartLabel,
  le as stamp,
  $n as stream,
  p1 as streamChip,
  Na as streamChipProps,
  Te as streamColour,
  qt as streamHex,
  b1 as streamVars,
  ra as useBorderFlash,
  St as useFocusTrap,
  g1 as useLiveFeed,
  w1 as useReturnFocus,
  fa as useRovingTabindex,
  ja as useTicker,
  yt as useVisible,
  j as v,
  m$ as validateMark,
  ga as validatedStep,
  Lt as validatedStreamSteps
};
