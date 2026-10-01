import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as gt, useContext as Ke, createContext as Ve, useCallback as Y, useEffect as A, useState as p, useRef as g, useLayoutEffect as ja, useId as k, Fragment as Nt } from "react";
import { createPortal as yt } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const en = (e) => String(e).padStart(2, "0");
function Wa(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${en(a % 60)}s` : `${Math.floor(t / 60)}h ${en(t % 60)}m`;
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
function D1({ hidden: e, children: a }) {
  const t = gt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Rn.Provider, { value: t, children: a });
}
function St(e) {
  return !Ke(Rn).has(e);
}
function H1({ id: e, children: a, fallback: t = null }) {
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
function xt(e) {
  return { onKeyDown: Y(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Rt));
      Et(t, e.current, r);
    },
    [e]
  ) };
}
function F1(e, a = !0) {
  A(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const an = { ArrowUp: -1, ArrowDown: 1 }, nn = { ArrowLeft: -1, ArrowRight: 1 }, Lt = (e, a, t) => Math.min(t, Math.max(a, e));
function At(e, a) {
  if (a !== "horizontal" && e in an) return an[e];
  if (a !== "vertical" && e in nn) return nn[e];
}
function fa({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = g(/* @__PURE__ */ new Map()), l = g(!1);
  ja(() => {
    var v;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const h = u[0], w = l.current;
    l.current = !1, t(h), w && ((v = r.current.get(h)) == null || v.focus());
  });
  const i = Y((u) => t(u), []), c = Y((u) => {
    var h;
    t(u), (h = r.current.get(u)) == null || h.focus();
  }, []), s = Y(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(a)), v = At(u.key, e);
      v !== void 0 ? (u.preventDefault(), c(h[Lt(w + v, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), c(h[0])) : u.key === "End" && (u.preventDefault(), c(h[h.length - 1]));
    },
    [a, c, e]
  ), d = Y(
    (u) => ({
      tabIndex: u === a ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(u, h) : (r.current.delete(u), u === a && (l.current = !0));
      },
      onFocus: () => t(u),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: s }, itemProps: d, setActive: i };
}
const j1 = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, W1 = "0.2.0", z1 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], It = [1, 2, 3, 4, 5, 6], Mt = [1, 2, 3], qt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], W = {
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
    warning: "var(--ward-color-warning)",
    destructive: "var(--ward-color-destructive)",
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
    skeletonBar: "var(--ward-height-skeletonBar)",
    target: "var(--ward-height-target)"
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
  focusOffset: "var(--ward-focus-offset)",
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
  return Mt.includes(e);
}
function G1(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function U1(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Bt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Pt(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return Bt[e];
}
function tn(e) {
  return typeof e != "string" ? null : qt.includes(e) ? e : null;
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
  const l = tn(t) ?? tn(r.type);
  return l === null ? null : { ...r, type: l, id: Dt(r, a), at: Ht(r) };
}
function jt(e, a) {
  return e >= me.staleAfter ? "stale" : e >= me.heartbeat && a === "live" ? "reconnecting" : null;
}
function Wt(e, a, t) {
  return e >= me.heartbeat && !a && t !== null;
}
function K1(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), c = g(/* @__PURE__ */ new Map()), s = g(0), d = g(""), u = g(0), h = g(null), w = g(0), v = g(0), E = g(!1), K = g("reconnecting"), V = Y(($) => {
    K.current = $, r($);
  }, []), oe = Y(() => {
    s.current = Date.now();
  }, []), $e = Y(($) => {
    for (const [j, _e] of c.current)
      (_e === "*" || $.itemKey === _e) && j($);
  }, []), ee = Y(() => {
    h.current = a(e, { lastEventId: d.current }, {
      onEvent: ($, j, _e) => {
        const Le = Ft($, j, _e);
        Le !== null && (Le.id && (d.current = Le.id), oe(), E.current = !1, V("live"), i(Le.at), $e(Le));
      },
      onOpen: () => {
        u.current = 0, E.current = !1, oe(), V("live");
      },
      onError: () => {
        var j;
        (j = h.current) == null || j.close(), h.current = null, E.current = !0, K.current !== "stale" && V("reconnecting");
        const $ = Math.min(me.reconnectBase * 2 ** u.current, me.reconnectMax);
        u.current += 1, w.current = window.setTimeout(ee, $);
      }
    });
  }, [$e, V, oe, a, e]), De = Y(($) => {
    E.current = !0, $.close(), h.current = null, w.current = window.setTimeout(ee, me.reconnectBase);
  }, [ee]), He = Y(($, j) => (c.current.set(j, $), () => {
    c.current.delete(j);
  }), []);
  return A(() => (ee(), v.current = window.setInterval(() => {
    const $ = Date.now() - s.current, j = jt($, K.current);
    j && V(j);
    const _e = h.current;
    Wt($, E.current, _e) && De(_e);
  }, me.tick), () => {
    var $;
    window.clearInterval(v.current), window.clearTimeout(w.current), E.current = !1, ($ = h.current) == null || $.close(), h.current = null;
  }), [ee, De, V]), { connection: t, lastEventAt: l, subscribe: He };
}
function za(e, a) {
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
function zt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function rn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function la(e, a) {
  const t = g(0), r = Y((l) => {
    const i = l ?? a, c = e.current;
    c !== null && i !== void 0 && (zt() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => rn(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => rn(c), me.flash)));
  }, [a, e]);
  return A(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Gt = "_root_1otpc_2", Ut = {
  root: Gt
};
function Kt(e, a, t, r, l) {
  const i = [Wa(a)];
  return e || i.push(`as of ${Ct(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function ke({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = za(e, l), c = (a == null ? void 0 : a.at) ?? e, s = Kt(l, i, c, r, a);
  return /* @__PURE__ */ o("span", { className: `${Ut.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      se(e)
    ] })
  ] });
}
const Vt = "_app_lu0b1_1", Yt = "_side_lu0b1_18", Xt = "_main_lu0b1_26", Jt = "_rail_lu0b1_33", Qt = "_page_lu0b1_40", Zt = "_root_lu0b1_91", er = "_topbar_lu0b1_98", ar = "_mark_lu0b1_109", nr = "_brand_lu0b1_116", tr = "_tagline_lu0b1_122", rr = "_identity_lu0b1_128", lr = "_tools_lu0b1_129", or = "_metadata_lu0b1_138", ir = "_actor_lu0b1_153", cr = "_detail_lu0b1_154", sr = "_nav_lu0b1_159", dr = "_content_lu0b1_194", ur = "_toolsPanel_lu0b1_207", hr = "_skip_lu0b1_233", I = {
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
}, mr = "_btn_j72f1_2", wr = "_primary_j72f1_13", _r = "_destructive_j72f1_24", vr = "_secondary_j72f1_34", fr = "_ghost_j72f1_39", br = "_overflow_j72f1_48", pr = "_sm_j72f1_55", gr = "_disabled_j72f1_59", aa = {
  btn: mr,
  primary: wr,
  destructive: _r,
  secondary: vr,
  ghost: fr,
  overflow: br,
  sm: pr,
  disabled: gr
};
function Nr(e, a, t, r) {
  const l = a === "sm" ? [aa.sm, "ward-btn--sm"] : [], i = t ? [aa.disabled] : [];
  return [aa.btn, aa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function yr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function kr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function $r(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Cr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Sr(e, a, t) {
  return Cr(e.describedBy, a && t);
}
function Rr({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Tr(e) {
  return e.children ?? e.label;
}
function f(e) {
  kr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = $r(e), i = k();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Nr(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": Sr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...yr(a, e.controls),
        children: Tr(e)
      }
    ),
    /* @__PURE__ */ n(Rr, { id: i, reason: l })
  ] });
}
const Er = /^([a-z][a-z0-9+.-]*):/i, xr = /* @__PURE__ */ new Set(["http", "https"]), Lr = "#";
function Ar(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Er.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function F(e) {
  const a = Ar(e);
  return a === void 0 || xr.has(a) ? e : Lr;
}
function Ga(e) {
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
function Ir({ sidebar: e, header: a, children: t, rail: r }) {
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
function Mr({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: I.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: F(t.href), "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function Ia({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function qr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: I.metadata, children: [
    /* @__PURE__ */ n(Ia, { value: e, className: I.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Ia, { value: a, className: I.detail })
  ] });
}
function Br() {
  const e = Ga("(max-width: 767.98px)"), a = k(), t = g(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var c, s;
    l(!1), (s = (c = t.current) == null ? void 0 : c.querySelector("button")) == null || s.focus();
  } };
}
function Pr({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: I.tools, children: /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: I.tools, children: e });
}
function Or({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: I.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function Dr(e) {
  return /* @__PURE__ */ o("header", { className: I.topbar, children: [
    /* @__PURE__ */ n("span", { className: I.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: I.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Ia, { value: e.tagline, className: I.tagline }),
    /* @__PURE__ */ n(Mr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: I.identity, children: /* @__PURE__ */ n(qr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Pr, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Hr(e) {
  const a = k(), t = Br();
  return /* @__PURE__ */ o("div", { className: `${I.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: I.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Dr, { ...e, menu: t }),
    /* @__PURE__ */ n(Or, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: I.content, children: e.children })
  ] });
}
function Fr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function V1(e) {
  return Fr(e) ? /* @__PURE__ */ n(Ir, { ...e }) : /* @__PURE__ */ n(Hr, { ...e });
}
function Ua(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const jr = "_root_o4yib_2", Wr = "_row_o4yib_8", zr = "_box_o4yib_14", Gr = "_label_o4yib_21", Ur = "_lockedNote_o4yib_26", Kr = "_consequence_o4yib_34", Vr = "_sample_o4yib_69", Me = {
  root: jr,
  row: Wr,
  box: zr,
  label: Gr,
  lockedNote: Ur,
  consequence: Kr,
  sample: Vr
};
function Yr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Xr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Me.consequence} ward-check-consequence`, children: a }) : null;
}
function Jr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Me.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Qr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Me.sample, "aria-hidden": "true", children: e }) : null;
}
function En(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = Yr(e);
  return /* @__PURE__ */ o("div", { className: `${Me.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: Me.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Me.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, l.target.checked));
          },
          "aria-describedby": Ua(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: Me.label, children: [
        e.label,
        /* @__PURE__ */ n(Jr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Qr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Xr, { id: t, text: e.consequence })
  ] });
}
const Zr = "_chip_1073r_2", el = {
  chip: Zr
}, al = {
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
function nl(e, a) {
  if (e === "stream") return tl(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = al[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function tl(e) {
  if (!e || !pa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Tn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${el.chip} ward-chip ward-chip--${e}`, style: nl(e, t), "data-ward-chip": e, "data-size": r, children: a });
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
const rl = "_nav_j90m2_2", ll = "_list_j90m2_8", ol = "_item_j90m2_15", il = "_link_j90m2_30", cl = "_sep_j90m2_40", sl = "_current_j90m2_44", dl = "_chips_j90m2_48", Ae = {
  nav: rl,
  list: ll,
  item: ol,
  link: il,
  sep: cl,
  current: sl,
  chips: dl
};
function ul({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ae.nav, children: [
    /* @__PURE__ */ n("ol", { className: Ae.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: Ae.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Ae.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${Ae.link} ward-target`, href: F(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Ae.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Ae.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const hl = "_field_fy549_2", ml = "_label_fy549_8", wl = "_labelHidden_fy549_15", _l = "_control_fy549_25", vl = "_mono_fy549_44", fl = "_area_fy549_49", bl = "_invalid_fy549_56", Te = {
  field: hl,
  label: ml,
  labelHidden: wl,
  control: _l,
  mono: vl,
  area: fl,
  invalid: bl
}, pl = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function gl({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? pl : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function Nl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function yl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const kl = { input: gl, select: Nl, textarea: yl };
function $l(e, a, t) {
  const r = kl[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Cl(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ua(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function Sl(e) {
  const a = e.mono ? [Te.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Te.area] : [];
  return [Te.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Rl(e) {
  return e ? `${Te.label} ${Te.labelHidden} ward-field-label` : `${Te.label} ward-field-label`;
}
function L(e) {
  const a = k(), t = `${a}-msg`, r = Cl(e, a, t), l = Sl(e);
  return /* @__PURE__ */ o("div", { className: `${Te.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Rl(e.labelHidden), htmlFor: a, children: e.label }),
    $l(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Te.invalid} ward-field-error`, children: e.invalid })
  ] });
}
function Tl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function xn(e) {
  const a = Tl(e);
  e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end);
}
function Ln(e, a) {
  A(() => {
    const t = e.current;
    if (!t) return;
    const r = () => xn(t);
    t.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [t, ...t.children]) l == null || l.observe(i);
    return r(), () => {
      t.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, a]);
}
const El = "_strip_tivso_2", xl = "_tab_tivso_26", Ll = "_count_tivso_49", Ma = {
  strip: El,
  tab: xl,
  count: Ll
}, ln = 7;
function Al(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Il(e) {
  return `${Ma.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function Ml(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function ql(e, a) {
  ja(() => {
    const t = e.current, r = t == null ? void 0 : t.querySelectorAll('[role="tab"]')[a];
    if (!t || !r) return;
    const l = Ml(t, r);
    l !== null && (t.scrollLeft = Math.max(0, l)), xn(t);
  }, [e, a]);
}
function Y1({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ln) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ln} — the set is fixed`);
  const i = fa({ orientation: "horizontal" }), c = Al(e, a);
  A(() => i.setActive(c), [i.setActive, c]);
  const s = g(null);
  return Ln(s, e.length), ql(s, c), /* @__PURE__ */ n(
    "div",
    {
      ref: s,
      className: Il(l),
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
          className: `${Ma.tab} ward-tab`,
          "aria-selected": d.id === a,
          "aria-controls": `panel-${d.id}`,
          onClick: () => t(d.id),
          ...i.itemProps(u),
          children: [
            d.label,
            d.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: Ma.count, children: `· ${d.count}` })
            ] })
          ]
        },
        d.id
      ))
    }
  );
}
const Bl = "_root_jem6y_2", Pl = "_segment_jem6y_7", on = {
  root: Bl,
  segment: Pl
};
function An({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = fa({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((d) => d.value === a));
  return A(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${on.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: on.segment,
      "aria-checked": d.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => t(d.value),
      ...c.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Ol = "_sidebar_1jywv_3", Dl = "_brand_1jywv_9", Hl = "_mark_1jywv_17", Fl = "_word_1jywv_24", jl = "_nav_1jywv_30", Wl = "_navItem_1jywv_38", zl = "_group_1jywv_50", Gl = "_groupName_1jywv_57", Ul = "_agents_1jywv_70", Kl = "_agent_1jywv_70", Vl = "_agentTop_1jywv_88", Yl = "_dot_1jywv_95", Xl = "_agentName_1jywv_107", Jl = "_agentMeta_1jywv_120", Ql = "_foot_1jywv_126", Zl = "_footName_1jywv_132", eo = "_footLinks_1jywv_139", ao = "_footLink_1jywv_139", no = "_root_1jywv_153", to = "_linkBrand_1jywv_162", ro = "_label_1jywv_183", lo = "_note_1jywv_188", oo = "_footer_1jywv_202", C = {
  sidebar: Ol,
  brand: Dl,
  mark: Hl,
  word: Fl,
  nav: jl,
  navItem: Wl,
  group: zl,
  groupName: Gl,
  new: "_new_1jywv_64",
  agents: Ul,
  agent: Kl,
  agentTop: Vl,
  dot: Yl,
  agentName: Xl,
  agentMeta: Jl,
  foot: Ql,
  footName: Zl,
  footLinks: eo,
  footLink: ao,
  root: no,
  linkBrand: to,
  label: ro,
  note: lo,
  footer: oo
};
function io({ agent: e }) {
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
function co({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: F(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function so({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(io, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(co, { shared: i })
  ] });
}
function uo(e) {
  return e.destinations ?? e.items ?? [];
}
function ho({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function mo({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function wo({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: F(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function _o(e) {
  return /* @__PURE__ */ o("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(ho, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: uo(e).map((a) => /* @__PURE__ */ n(wo, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(mo, { children: e.children })
  ] });
}
function vo(e) {
  return "agents" in e;
}
function X1(e) {
  return vo(e) ? /* @__PURE__ */ n(so, { ...e }) : /* @__PURE__ */ n(_o, { ...e });
}
const fo = "_mark_wlgi8_3", bo = {
  mark: fo
}, po = { met: "✓", unmet: "", failed: "✕" };
function Ka({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: bo.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: po[e]
    }
  );
}
const go = "_marker_br9fi_2", No = {
  marker: go
}, yo = {
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
  attention: "var(--ward-color-warning)",
  tick: "var(--ward-color-green)",
  box: "var(--ward-color-line2)"
};
function xe({ size: e, kind: a, label: t }) {
  const r = { "--marker": yo[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${No.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const ko = "_root_ti0pq_2", $o = "_chip_ti0pq_11", Co = "_noCase_ti0pq_23", na = {
  root: ko,
  chip: $o,
  noCase: Co
};
function So(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Va({ connection: e, since: a, lastEventAt: t }) {
  const r = So(a, t), l = za(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${na.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(xe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: na.noCase, children: Wa(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    se(r)
  ] });
}
const Ro = "_root_114od_2", To = "_context_114od_12", Eo = "_row_114od_1", xo = "_heading_114od_25", Lo = "_headingWrap_114od_33", Ao = "_chips_114od_38", Io = "_title_114od_45", Mo = "_consequence_114od_54", qo = "_actionsWrap_114od_59", Bo = "_actions_114od_59", Po = "_action_114od_59", Oo = "_overflowPanel_114od_78", Do = "_measure_114od_88", te = {
  root: Ro,
  context: To,
  row: Eo,
  heading: xo,
  headingWrap: Lo,
  chips: Ao,
  title: Io,
  consequence: Mo,
  actionsWrap: qo,
  actions: Bo,
  action: Po,
  overflowPanel: Oo,
  measure: Do
};
function Ho({ title: e, consequence: a, consequenceHint: t }) {
  return /* @__PURE__ */ o("div", { className: te.heading, children: [
    /* @__PURE__ */ n("h1", { className: te.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: te.consequence, title: t, children: a })
  ] });
}
function qa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: te.action, "data-action": "", children: a }, t));
}
function cn({ disclosure: e }) {
  return /* @__PURE__ */ n(f, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Fo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(f, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(cn, { disclosure: l }) : a ? [/* @__PURE__ */ n(cn, { disclosure: l }, "more"), /* @__PURE__ */ n(qa, { actions: e }, "actions")] : /* @__PURE__ */ n(qa, { actions: e });
}
function jo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Wo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: te.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(qa, { actions: e }) });
}
function zo(e, a) {
  const t = k(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Go({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: te.context, children: [
    /* @__PURE__ */ n(ul, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: te.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function Uo(...e) {
  return e.some((a) => a === null);
}
function Ko(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Vo(e, a, t, r, l) {
  if (l === 0 || Uo(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], d = Ko(e), u = Math.max(0, e.clientWidth - i.offsetWidth - d);
  return s.offsetWidth > u || c.scrollWidth > c.clientWidth + 1;
}
function Yo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Xo(e) {
  const a = g(null), t = g(null), r = g(null), l = g(null), [i, c] = p(!1);
  return A(() => {
    const s = a.current;
    if (!Yo(s)) return;
    const d = () => c(Vo(s, t.current, r.current, l.current, e.length)), u = new ResizeObserver(d);
    return u.observe(s), d(), () => u.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function Jo({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ o("div", { className: te.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(f, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] });
}
function Qo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Va, { connection: e.connection, since: e.since }) : null;
}
function J1({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: c = [], connection: s, onOverflow: d, density: u = "page" }) {
  const { rowRef: h, headingRef: w, actionsRef: v, measureRef: E, collapsed: K } = Xo(i), V = c.length > 0, { disclosure: oe, close: $e } = zo(K || V, v), ee = jo(c, i, K, d);
  return /* @__PURE__ */ o("header", { className: te.root, "data-density": u, children: [
    /* @__PURE__ */ n(Go, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: te.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: w, className: te.headingWrap, children: /* @__PURE__ */ n(Ho, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: te.actionsWrap, children: [
        /* @__PURE__ */ n(Qo, { connection: s }),
        /* @__PURE__ */ n("div", { className: te.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ n(Fo, { actions: i, hasMore: V, collapsed: K, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Wo, { actions: ee, disclosure: oe, onEscape: $e }),
    /* @__PURE__ */ n(Jo, { actions: i, hasMore: V, measureRef: E })
  ] });
}
const Zo = "_scrim_c7sqj_2", ei = "_drawer_c7sqj_10", ai = "_sheet_c7sqj_14", ni = "_modal_c7sqj_18", ti = "_panel_c7sqj_23", ri = "_header_c7sqj_51", li = "_title_c7sqj_59", oi = "_body_c7sqj_63", ii = "_close_c7sqj_90", Ne = {
  scrim: Zo,
  drawer: ei,
  sheet: ai,
  modal: ni,
  panel: ti,
  header: ri,
  title: li,
  body: oi,
  close: ii
}, ci = Ve(null), sa = [], da = /* @__PURE__ */ new Map();
function si(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function di(e, a) {
  let t = da.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, da.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function ui(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !si(r) && di(e, r);
}
function hi(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (ui(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function mi(e) {
  for (const a of e.claims) {
    const t = da.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), da.delete(a)));
  }
}
function wi(e, a) {
  const t = { root: e, claims: [] };
  return sa.push(t), hi(t, a), t;
}
function _i(e) {
  const a = sa.indexOf(e);
  a >= 0 && sa.splice(a, 1), mi(e);
}
function sn(e) {
  return e !== null && sa.at(-1) === e;
}
function vi(e, a, t) {
  const r = g(null), l = g(t);
  return l.current = t, A(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = wi(i, a);
    return r.current = s, () => {
      var u, h;
      const d = sn(s);
      _i(s), r.current = null, d && ((h = (u = l.current ?? c) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [a]), Y(() => sn(r.current), []);
}
function fi(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function bi(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function pi({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${Ne.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ne.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, children: e.children })
  ] });
}
function gi(e) {
  return `${Ne.scrim} ${Ne[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Ni(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ne.panel} ${Ne[e]} ward-overlay-panel${t}${r}`;
}
function yi(e) {
  const a = Ke(ci);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = g(null), t = g(null), r = k(), l = yi(e.container), i = Ga("(min-width: 768px)"), c = fi(e.kind, i), s = bi(e, r), d = xt(t), u = vi(a, l, e.returnFocusTo), h = Y(() => {
    u() && e.onClose();
  }, [e.onClose, u]);
  return A(() => {
    var w, v;
    u() && ((v = (w = t.current) == null ? void 0 : w.querySelector("button")) == null || v.focus());
  }, [u]), A(() => {
    const w = (v) => {
      v.key === "Escape" && h();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [h]), yt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: gi(c),
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
            className: Ni(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (w) => w.stopPropagation(),
            onKeyDown: (w) => u() && d.onKeyDown(w),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ne.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(pi, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const ki = "_root_drrhx_2", $i = "_ticket_drrhx_15", Ci = "_body_drrhx_24", Sa = {
  root: ki,
  ticket: $i,
  body: Ci
};
function Q1({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Sa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Sa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Sa.body, children: t })
  ] });
}
const Si = "_root_bf1pc_2", Ri = "_table_bf1pc_9", Ti = "_caption_bf1pc_14", Ei = "_series_bf1pc_23", xi = "_category_bf1pc_31", Li = "_cell_bf1pc_39", Ai = "_track_bf1pc_45", Ii = "_lane_bf1pc_52", Mi = "_bar_bf1pc_56", qi = "_value_bf1pc_63", Bi = "_swatch_bf1pc_70", Pi = "_empty_bf1pc_78", U = {
  root: Si,
  table: Ri,
  caption: Ti,
  series: Ei,
  category: xi,
  cell: Li,
  track: Ai,
  lane: Ii,
  bar: Mi,
  value: qi,
  swatch: Bi,
  empty: Pi
}, Oi = "—", dn = 6;
function Di(e, a) {
  if (a.length < 1 || a.length > dn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${dn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Hi(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function In(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Fi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function ji({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Fi(e, a), c = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ o("span", { className: U.track, children: [
    /* @__PURE__ */ n("span", { className: U.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${U.bar} ward-barchart-bar`, "data-step": t, style: c, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: U.value, children: e === null ? l : r(e) })
  ] }) });
}
function Wi({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: U.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: U.swatch, "data-step": In(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function zi({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${U.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: U.caption, children: e }),
    /* @__PURE__ */ n("p", { className: U.empty, children: a })
  ] });
}
function Gi({ title: e, categories: a, series: t, top: r, format: l = Z, categoryHead: i = "Category", missing: c = Oi }) {
  return /* @__PURE__ */ n("div", { className: `${U.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: U.table, children: [
    /* @__PURE__ */ n("caption", { className: U.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: U.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Wi, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((s, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: U.category, children: s }),
      t.map((u, h) => /* @__PURE__ */ n(ji, { value: u.values[d], top: r, step: In(h, t.length), format: l, missing: c }, u.name))
    ] }, s)) })
  ] }) });
}
function Z1(e) {
  Di(e.categories, e.series);
  const a = Hi(e.series);
  return a === 0 ? /* @__PURE__ */ n(zi, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Gi, { ...e, top: a });
}
const Ui = "_root_1bfqw_2", Ki = "_figure_1bfqw_7", Vi = "_of_1bfqw_13", Yi = "_bar_1bfqw_18", Xi = "_rows_1bfqw_38", Ji = "_row_1bfqw_38", Qi = "_label_1bfqw_49", Zi = "_amount_1bfqw_54", Ce = {
  root: Ui,
  figure: Ki,
  of: Vi,
  bar: Yi,
  rows: Xi,
  row: Ji,
  label: Qi,
  amount: Zi
};
function ec({ spent: e, ceiling: a, breakdown: t }) {
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
const ac = "_frame_mg2jl_2", nc = "_table_mg2jl_6", tc = "_th_mg2jl_12", rc = "_td_mg2jl_13", lc = "_sort_mg2jl_47", oc = "_row_mg2jl_53", ic = "_empty_mg2jl_61", Re = {
  frame: ac,
  table: nc,
  th: tc,
  td: rc,
  sort: lc,
  row: oc,
  empty: ic
}, cc = { asc: "ascending", desc: "descending" };
function sc(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return cc[a.direction];
}
function dc(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function uc(e) {
  return e === void 0 ? void 0 : { width: e };
}
function hc({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: uc(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": sc(e, a),
      children: dc(e, t)
    }
  );
}
function mc({ row: e, props: a }) {
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
function wc({
  label: e,
  columns: a,
  rows: t,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: c = [],
  sort: s,
  onSort: d,
  empty: u
}) {
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: Re.empty, children: u }) : /* @__PURE__ */ n("div", { className: Re.frame, children: /* @__PURE__ */ o("table", { className: Re.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(hc, { column: h, sort: s, onSort: d }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(mc, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: c, sort: s, onSort: d, empty: u } }, r(h))) })
  ] }) });
}
const _c = "_list_v0s52_2", vc = {
  list: _c
};
function e$({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: vc.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const fc = "_set_y5zy3_2", bc = "_legend_y5zy3_7", pc = "_row_y5zy3_15", gc = "_control_y5zy3_20", Nc = "_input_y5zy3_26", yc = "_label_y5zy3_31", kc = "_consequence_y5zy3_36", Ie = {
  set: fc,
  legend: bc,
  row: pc,
  control: gc,
  input: Nc,
  label: yc,
  consequence: kc
};
function Mn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: c, variant: s }) {
  const d = k(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: Ie.set, "data-variant": s, children: [
    /* @__PURE__ */ n("legend", { className: Ie.legend, children: e }),
    a.map((h) => {
      const w = `${u}-${h.value}`, v = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Ie.row, children: [
        /* @__PURE__ */ o("span", { className: Ie.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: Ie.input,
              value: h.value,
              checked: t === h.value,
              disabled: l,
              "aria-describedby": Ua(v, c),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: Ie.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: v, className: `${Ie.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const $c = "_root_iycnv_2", Cc = "_head_iycnv_11", Sc = "_index_iycnv_27", Rc = "_dot_iycnv_31", Tc = "_note_iycnv_36", Ec = "_counter_iycnv_42", xc = "_trailing_iycnv_50", qe = {
  root: $c,
  head: Cc,
  index: Sc,
  dot: Rc,
  note: Tc,
  counter: Ec,
  trailing: xc
};
function Lc({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${qe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: qe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ac({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.counter, "aria-hidden": "true", children: e }) : null;
}
function un({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: qe.head, children: [
      /* @__PURE__ */ n(Lc, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: qe.note, children: t }),
    /* @__PURE__ */ n(Ac, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: qe.trailing, children: i })
  ] });
}
const Ic = "_strip_1cfs3_2", Mc = "_cell_1cfs3_7", qc = "_value_1cfs3_12", Bc = "_link_1cfs3_27", Pc = "_label_1cfs3_39", Xe = {
  strip: Ic,
  cell: Mc,
  value: qc,
  link: Bc,
  label: Pc
};
function Oc(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function Dc({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(S, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Xe.link} ward-stat-link`, href: F(e.href), "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function ya({ cells: e, divided: a = !1 }) {
  return Oc(e), /* @__PURE__ */ n("dl", { className: `${Xe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Xe.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Xe.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, title: t.hint, children: /* @__PURE__ */ n(Dc, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Xe.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Hc = "_root_xk7sv_2", Fc = "_track_xk7sv_8", jc = "_thumb_xk7sv_35", Wc = "_labelHidden_xk7sv_53", zc = "_label_xk7sv_53", Gc = "_lockedNote_xk7sv_68", Be = {
  root: Hc,
  track: Fc,
  thumb: jc,
  labelHidden: Wc,
  label: zc,
  lockedNote: Gc
};
function Uc(e) {
  return e ? `${Be.label} ${Be.labelHidden}` : Be.label;
}
function Oe({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: c }) {
  const s = k(), d = l ? !0 : a, u = r || l;
  return /* @__PURE__ */ o("span", { className: `${Be.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": d,
        "aria-label": e,
        "aria-labelledby": s,
        "aria-describedby": i,
        className: `${Be.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: u,
        onClick: () => !u && (t == null ? void 0 : t(!d)),
        children: /* @__PURE__ */ n("span", { className: Be.thumb })
      }
    ),
    /* @__PURE__ */ o("span", { id: s, className: Uc(c), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const Kc = "_bar_1u2kl_2", Vc = "_skip_1u2kl_11", Yc = "_mark_1u2kl_22", Xc = "_nav_1u2kl_30", Jc = "_list_1u2kl_34", Qc = "_select_1u2kl_40", Zc = "_dest_1u2kl_47", es = "_actor_1u2kl_61", as = "_actorMark_1u2kl_74", ns = "_actorLabel_1u2kl_79", ts = "_tagline_1u2kl_98", de = {
  bar: Kc,
  skip: Vc,
  mark: Yc,
  nav: Xc,
  list: Jc,
  select: Qc,
  dest: Zc,
  actor: es,
  actorMark: as,
  actorLabel: ns,
  tagline: ts
};
function rs(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function ls(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function a$({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: c = "main" }) {
  const s = ls(r);
  return /* @__PURE__ */ o("header", { className: de.bar, children: [
    /* @__PURE__ */ n("a", { className: de.skip, href: `#${c}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: de.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: de.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: de.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: de.list, children: a.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: de.dest,
          href: F(d.href),
          "aria-current": d.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        "select",
        {
          className: de.select,
          "aria-label": "Destination",
          value: t,
          onChange: (d) => i == null ? void 0 : i(d.target.value),
          children: a.map((d) => /* @__PURE__ */ n("option", { value: d.id, children: d.label }, d.id))
        }
      )
    ] }),
    s && /* @__PURE__ */ o("span", { className: de.actor, children: [
      /* @__PURE__ */ n("span", { className: de.actorLabel, children: s }),
      /* @__PURE__ */ n("span", { className: de.actorMark, "aria-hidden": "true", children: rs(s) })
    ] })
  ] });
}
const os = "_tree_1lyby_2", is = "_item_1lyby_6", cs = "_row_1lyby_10", ss = "_button_1lyby_22", ua = {
  tree: os,
  item: is,
  row: cs,
  button: ss
}, qn = Ve(null);
function ds({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = fa({ orientation: "vertical" });
  return /* @__PURE__ */ n(qn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ua.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const us = { ArrowRight: !0, ArrowLeft: !1 };
function hn(e) {
  return e ? !0 : void 0;
}
function hs(e, a) {
  const t = us[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function ms(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function ws(e) {
  const a = [ua.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function _s(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function vs(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function fs(e) {
  return typeof e == "string" ? e : void 0;
}
function bs({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function ps({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Bn(e) {
  const a = Ke(qn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = _s(e);
  return /* @__PURE__ */ o("li", { className: ua.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: ws(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": hn(e.unresolved),
        "data-inherited": hn(e.inherited),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${ua.button} ward-treeitem-btn`,
            onClick: () => ms(e),
            onKeyDown: (r) => hs(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: vs(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: fs(e.label), children: e.label }),
              /* @__PURE__ */ n(bs, { value: e.detail }),
              /* @__PURE__ */ n(ps, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const gs = "_frame_1tok6_2", Ns = "_subjectRail_1tok6_21", ys = "_subject_1tok6_21", ks = "_rail_1tok6_41", $s = "_record_1tok6_63", Cs = "_recordBody_1tok6_68", Ss = "_stageGrid_1tok6_117", Rs = "_band_1tok6_143", Ts = "_bandBody_1tok6_152", Es = "_bandActions_1tok6_157", xs = "_scroller_1tok6_165", Ls = "_lanes_1tok6_183", le = {
  frame: gs,
  subjectRail: Ns,
  subject: ys,
  rail: ks,
  record: $s,
  recordBody: Cs,
  stageGrid: Ss,
  band: Rs,
  bandBody: Ts,
  bandActions: Es,
  scroller: xs,
  lanes: Ls
};
function n$({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: le.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function mn(e) {
  return e ? "true" : void 0;
}
function t$({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: le.subjectRail, "data-ward-subject-rail": t, "data-ruled": mn(i), children: [
    /* @__PURE__ */ n("div", { className: le.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: le.rail, "data-sticky": mn(l), "aria-label": r, children: a })
  ] });
}
function r$({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: c, measure: s }) {
  return c === "inline" ? /* @__PURE__ */ n("section", { className: le.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(un, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: le.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(un, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: le.recordBody, "data-pad": l, "data-measure": s, children: a })
  ] });
}
const As = "_form_1j8ub_2", Is = "_fields_1j8ub_9", Ms = "_actions_1j8ub_19", Ra = {
  form: As,
  fields: Is,
  actions: Ms
};
function l$({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ra.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ra.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ra.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function o$({ children: e, actions: a, label: t }) {
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
function Bs({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ o("div", { className: le.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(L, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: l }),
    /* @__PURE__ */ n(Ba, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function i$({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Ga(qs);
  return t === void 0 ? /* @__PURE__ */ n(Ba, { label: a, children: e }) : l ? /* @__PURE__ */ n(Bs, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Ba, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n(Nt, { children: i.content }, i.id)) });
}
function c$({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = g(null), i = Math.max(e, 1);
  Ln(l, i);
  const c = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: le.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: c, children: a });
}
const Ps = "_block_1o5o7_2", Os = "_sentence_1o5o7_15", Ds = "_meta_1o5o7_20", Hs = "_action_1o5o7_25", Fs = "_strip_1o5o7_29", js = "_loading_1o5o7_48", Ws = "_label_1o5o7_56", zs = "_counter_1o5o7_63", we = {
  block: Ps,
  sentence: Os,
  meta: Ds,
  action: Hs,
  strip: Fs,
  loading: js,
  label: Ws,
  counter: zs
};
function Gs({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: we.action, children: /* @__PURE__ */ n(f, { onClick: e.onClick, children: e.label }) });
}
function ka({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${we.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: we.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Gs, { action: a })
  ] });
}
function Us(e) {
  return /* @__PURE__ */ n(ka, { ...e, kind: "ward-emptystate" });
}
function s$({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ka, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function d$(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function u$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ka, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: we.meta, children: [
    "failed at ",
    se(a)
  ] }) });
}
function h$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    se(e),
    ". Showing snapshot from ",
    se(a)
  ] });
}
function m$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: we.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    se(a)
  ] });
}
function w$({ label: e, startedAt: a }) {
  const t = g(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  A(() => {
    const c = window.setTimeout(() => l(!0), me.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = za(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${we.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: we.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: we.counter, children: Wa(i) }) : null
  ] });
}
const Ks = "_note_tlubt_2", Vs = {
  note: Ks
};
function Ys({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: Vs.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const Xs = "_card_12in3_2", Js = "_hit_12in3_23", Qs = "_head_12in3_30", Zs = "_title_12in3_36", ed = "_meta_12in3_44", ad = "_fields_12in3_45", nd = "_who_12in3_58", td = "_sep_12in3_65", rd = "_mono_12in3_69", ld = "_field_12in3_45", od = "_last_12in3_84", id = "_reason_12in3_96", X = {
  card: Xs,
  hit: Js,
  head: Qs,
  title: Zs,
  meta: ed,
  fields: ad,
  who: nd,
  sep: td,
  mono: rd,
  field: ld,
  last: od,
  reason: id
}, cd = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function sd(e, a, t) {
  const r = la(e, "blue"), l = la(e, "orange"), i = la(e, "green"), c = g(/* @__PURE__ */ new Set());
  A(() => {
    if (!t) return;
    const s = { blue: r, orange: l, green: i };
    return t.subscribe(a, (d) => {
      if (c.current.has(d.id)) return;
      c.current.add(d.id);
      const u = cd[d.type];
      u && s[u]();
    });
  }, [r, t, i, a, l]);
}
const dd = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function ud(e, a) {
  return dd[a](e);
}
function hd({ item: e, connection: a }) {
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
function md({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: X.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function wd({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: X.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function _d({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: X.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: X.field, children: ud(e, t) }, t)) });
}
const Pa = (e) => e ? !0 : void 0;
function vd(e) {
  return { "--stream": Ee(e.streamStep, "id") };
}
function fd(e, a, t) {
  e == null || e(a, t);
}
function bd(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function pd({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: X.last, "data-stale": Pa(a), children: t }) : null;
}
function $a(e) {
  const a = e.fields ?? [], t = e.item, r = g(null);
  sd(r, t.key, e.feed);
  const l = bd(e.feed), i = vd(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: X.hit, onClick: (c) => fd(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(md, { item: t }),
        /* @__PURE__ */ n("p", { className: X.title, children: t.title }),
        /* @__PURE__ */ n(hd, { item: t, connection: l }),
        /* @__PURE__ */ n(wd, { reason: t.blockedReason }),
        /* @__PURE__ */ n(_d, { item: t, fields: a }),
        /* @__PURE__ */ n(pd, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const gd = "_column_10sxg_3", Nd = "_head_10sxg_24", yd = "_label_10sxg_33", kd = "_count_10sxg_42", $d = "_list_10sxg_56", Je = {
  column: gd,
  head: Nd,
  label: yd,
  count: kd,
  list: $d
};
function Pn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Cd({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Sd(e) {
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
function Rd({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, onKeyDown: d }) {
  const u = k(), h = e.cap !== void 0 && a.length > e.cap, w = Pn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Cd, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ n(Sd, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, rows: w }),
    h && /* @__PURE__ */ n(Ys, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Td = "_foot_8qg4p_2", Ed = "_note_8qg4p_13", xd = "_link_8qg4p_19", Ta = {
  foot: Td,
  note: Ed,
  link: xd
};
function _$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ta.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ta.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Ta.link} ward-target`, href: F(e), children: "Configure board" })
  ] });
}
const Ld = "_head_1la6p_3", Ad = "_identity_1la6p_12", Id = "_titleRow_1la6p_18", Md = "_title_1la6p_18", qd = "_key_1la6p_35", Bd = "_rollup_1la6p_45", Pd = "_tools_1la6p_53", Od = "_swatch_1la6p_62", Dd = "_mark_1la6p_69", be = {
  head: Ld,
  identity: Ad,
  titleRow: Id,
  title: Md,
  key: qd,
  rollup: Bd,
  tools: Pd,
  swatch: Od,
  mark: Dd
}, wn = "initials:";
function Hd(e) {
  return e === void 0 ? "loaded this week unavailable" : `${Z(e)} loaded this week`;
}
function Fd(e) {
  const a = [Hd(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${Z(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function jd(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      Z(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Fd(e)
  ] });
}
function Wd(e) {
  return e.startsWith(wn) ? e.slice(wn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function zd({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ee(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${be.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Wd(e) }) : /* @__PURE__ */ n("span", { className: be.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Gd({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function v$({
  stream: e,
  rollups: a,
  connection: t,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: c,
  onConfigure: s,
  actions: d
}) {
  return /* @__PURE__ */ o("div", { className: be.head, children: [
    /* @__PURE__ */ o("div", { className: be.identity, children: [
      /* @__PURE__ */ o("div", { className: be.titleRow, children: [
        /* @__PURE__ */ n(zd, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: be.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: be.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: be.rollup, "aria-live": "polite", children: jd(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: be.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Gd, { owners: l, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(f, { onClick: s, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Va, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Ud = "_head_kabyh_11", Kd = "_line_kabyh_12", Vd = "_cHandle_kabyh_33", Yd = "_cName_kabyh_38", Xd = "_nameLine_kabyh_46", Jd = "_cLabel_kabyh_53", Qd = "_cCap_kabyh_58", Zd = "_cShown_kabyh_63", eu = "_name_kabyh_46", au = "_noCap_kabyh_85", nu = "_state_kabyh_99", tu = "_handle_kabyh_104", ru = "_sub_kabyh_118", q = {
  head: Ud,
  line: Kd,
  cHandle: Vd,
  cName: Yd,
  nameLine: Xd,
  cLabel: Jd,
  cCap: Qd,
  cShown: Zd,
  name: eu,
  noCap: au,
  state: nu,
  handle: tu,
  sub: ru
}, lu = "can't be hidden or collapsed", ou = "terminal · counted, not a column";
function f$() {
  return /* @__PURE__ */ o("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: q.cHandle }),
    /* @__PURE__ */ n("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: q.cShown, children: "Shown" })
  ] });
}
function iu(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function cu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function _n(e) {
  return e.gate ? lu : e.terminal ? ou : cu(e.agentsMounted);
}
function su(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function du({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: q.cName, children: [
    /* @__PURE__ */ o("span", { className: q.nameLine, children: [
      /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    _n(e) && /* @__PURE__ */ n("span", { className: q.sub, children: _n(e) })
  ] });
}
function uu(e) {
  return e === void 0 ? "" : String(e);
}
function hu(e) {
  return e === "" ? void 0 : Number(e);
}
function mu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: q.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => su(t, a),
      children: "⠿"
    }
  ) });
}
function wu({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: q.cCap, children: /* @__PURE__ */ n(L, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: uu(a.cap), onChange: (r) => t({ ...a, cap: hu(r) }) }) });
}
function _u({ stage: e, config: a, onChange: t }) {
  const r = iu(e, a.shown);
  return /* @__PURE__ */ o("span", { className: q.cShown, children: [
    /* @__PURE__ */ n(Oe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: q.state, "aria-hidden": "true", children: r.state })
  ] });
}
function vu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function b$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: q.line, "data-kind": vu(e), children: [
    /* @__PURE__ */ n(mu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(du, { stage: e }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: /* @__PURE__ */ n(L, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(wu, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(_u, { stage: e, config: a, onChange: t })
  ] });
}
const fu = "_body_hn6d6_2", bu = "_head_hn6d6_9", pu = "_summary_hn6d6_19", gu = "_block_hn6d6_20", Nu = "_actionsBlock_hn6d6_21", yu = "_title_hn6d6_41", ku = "_note_hn6d6_46", $u = "_k_hn6d6_51", Cu = "_kv_hn6d6_58", Su = "_row_hn6d6_64", Ru = "_label_hn6d6_75", Tu = "_value_hn6d6_84", Eu = "_quote_hn6d6_90", xu = "_actions_hn6d6_21", Lu = "_resolve_hn6d6_103", B = {
  body: fu,
  head: bu,
  summary: pu,
  block: gu,
  actionsBlock: Nu,
  title: yu,
  note: ku,
  k: $u,
  kv: Cu,
  row: Su,
  label: Ru,
  value: Tu,
  quote: Eu,
  actions: xu,
  resolve: Lu
};
function Au(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Iu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Mu(e) {
  const a = ga(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function qu(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Na(Mu(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Au(e),
    ...Iu(e, a)
  ];
}
function Bu({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: B.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: B.k, children: a }),
    e
  ] });
}
function Pu({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: B.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Ou({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: B.block, children: [
    /* @__PURE__ */ n("p", { className: B.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: B.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: B.note, children: e.agentMeta })
  ] }) : null;
}
function p$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: c, actionsNote: s }) {
  const d = k(), u = qu(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: d, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: B.body, children: [
    /* @__PURE__ */ n(Pu, { item: e }),
    /* @__PURE__ */ o("div", { className: B.summary, children: [
      /* @__PURE__ */ n("h2", { className: B.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: B.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: B.kv, children: u.map(([h, w]) => /* @__PURE__ */ o("div", { className: B.row, children: [
      /* @__PURE__ */ n("dt", { className: B.label, children: h }),
      /* @__PURE__ */ n("dd", { className: B.value, children: w })
    ] }, h)) }),
    /* @__PURE__ */ n(Ou, { item: e }),
    /* @__PURE__ */ o("div", { className: B.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: B.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: B.note, children: s })
    ] }),
    /* @__PURE__ */ n(Bu, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Du = "_root_3azmy_2", Hu = "_list_3azmy_7", Fu = "_item_3azmy_12", ju = "_box_3azmy_18", Wu = "_text_3azmy_23", zu = "_note_3azmy_28", Fe = {
  root: Du,
  list: Hu,
  item: Fu,
  box: ju,
  text: Wu,
  note: zu
};
function Ca({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: Fe.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Fe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Fe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Fe.box, children: /* @__PURE__ */ n(Ka, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Fe.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Fe.note} ward-checklist-note`, children: a })
  ] });
}
const Gu = "_rail_ke7ch_2", Uu = "_k_ke7ch_11", Ku = "_head_ke7ch_19", Vu = "_section_ke7ch_25", Yu = "_card_ke7ch_38", Xu = "_strip_ke7ch_42", Ju = "_skeleton_ke7ch_56", Qu = "_skeletonLabel_ke7ch_70", Zu = "_bar_ke7ch_76", eh = "_note_ke7ch_85", he = {
  rail: Gu,
  k: Uu,
  head: Ku,
  section: Vu,
  card: Yu,
  strip: Xu,
  skeleton: Ju,
  skeletonLabel: Qu,
  bar: Zu,
  note: eh
};
function ah(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ea({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: he.k, children: e }),
    a
  ] });
}
function nh({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function th({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Rd, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function rh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(th, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(nh, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function g$(e) {
  const a = ah(e.onOpen), t = Pn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ea, { title: "Card", children: /* @__PURE__ */ n("div", { className: he.card, children: t && /* @__PURE__ */ n($a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ea, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(rh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ea, { title: "Effect of this config", children: /* @__PURE__ */ n(Ca, { items: e.effects, density: "compact" }) })
  ] });
}
function lh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function oh(e) {
  return Math.ceil(e.length / 2);
}
function ih(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function On(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function ch(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = On(e);
  l !== void 0 && t(l), r(ih(e.type));
}
function sh(e, a, t, r, l) {
  A(() => {
    if (e !== null)
      return e.subscribe(a, (i) => ch(i, t, r, l));
  }, [e, a, t, r, l]);
}
function dh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function uh(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function hh(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function mh(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(oh(a ?? [])) + ")"
  };
}
function wh(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function _h(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: ne(e.cost) }) : null;
}
function vh(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function fh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function bh(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function ph(e, a) {
  return a === void 0 ? e : lh(e, a.ref);
}
function gh(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ze(e) {
  return e === !0 ? "true" : void 0;
}
function Dn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = g(null), i = la(l), c = g(/* @__PURE__ */ new Set()), [s, d] = p(dh(a));
  sh(e.feed, a.key, c, d, i);
  const u = uh(a, r), h = hh(a, t), w = mh(a, e.fields), v = bh(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...gh(e),
      className: "ward-workcard",
      "data-flagged": Ze(a.flagged),
      "data-selected": Ze(e.selected),
      style: w,
      ref: ph(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        wh(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          _h(a, e.fields),
          vh(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          fh(t, s, e.connection, a.changedAt),
          v !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: v, children: v }) : null
        ] })
      ]
    }
  ) });
}
function Nh({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function yh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function kh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function $h(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Nh, { count: e.items.length, cap: e.column.cap });
}
function Ch(e, a) {
  return e.roving ?? a;
}
function Sh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Rh(e, a) {
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
function Th(e) {
  const a = k(), t = fa({ orientation: "vertical" }), r = Ch(e, t), l = yh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ze(l), "data-gate": Ze(e.column.gate), children: [
    kh(e.column, e.items.length, a),
    $h(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Sh(e, t), children: Rh(e, r) })
  ] });
}
function Eh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function xh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Lh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function N$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Eh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      xh(e),
      Lh(e.onConfigure),
      /* @__PURE__ */ n(Va, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Ah(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Ih(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Oe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Oe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Mh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function y$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ze(Ah(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Ih(e) }),
    /* @__PURE__ */ n(L, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(En, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Mh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function k$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Dn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Th, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
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
function Bh(e, a, t) {
  A(() => {
    if (e != null)
      return e.subscribe(a, (r) => qh(r, t));
  }, [e, a, t]);
}
function Ph(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Oh(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function Dh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Hh(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function $$(e) {
  var c;
  const a = e.item, t = a.run, [r, l] = p((c = a.run) == null ? void 0 : c.lastStep);
  Bh(e.feed, a.key, l);
  const i = [...Ph(a), ...Oh(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Dh(t, r)
    ] }),
    Hh(a, e.actions)
  ] });
}
const Fh = "_card_hvxp7_2", jh = "_head_hvxp7_17", Wh = "_mark_hvxp7_25", zh = "_name_hvxp7_37", Gh = "_chips_hvxp7_48", Uh = "_description_hvxp7_54", Kh = "_run_hvxp7_59", Vh = "_sep_hvxp7_68", Yh = "_facts_hvxp7_73", Xh = "_fact_hvxp7_73", Jh = "_factLabel_hvxp7_86", Qh = "_factValue_hvxp7_90", re = {
  card: Fh,
  head: jh,
  mark: Wh,
  name: zh,
  chips: Gh,
  description: Uh,
  run: Kh,
  sep: Vh,
  facts: Yh,
  fact: Xh,
  factLabel: Jh,
  factValue: Qh
}, Zh = { live: "done", draft: "running", paused: "meta" };
function em(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function am({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Zh[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function nm({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: re.description, children: e });
}
function tm({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function rm({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ n("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function lm(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function om({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: c }) {
  const s = { "--stream": Ee(e.streamStep, "id") }, d = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: em(c),
      style: s,
      "data-selected": d,
      "data-paused": lm(e.versions),
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ n("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${re.name} ward-rowlink ward-target`, href: F(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(nm, { description: e.description }),
        /* @__PURE__ */ n(tm, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(am, { versions: e.versions }),
        /* @__PURE__ */ n(rm, { facts: i })
      ]
    }
  );
}
const im = "_list_4dcyc_2", cm = "_row_4dcyc_11", sm = "_head_4dcyc_23", dm = "_id_4dcyc_30", um = "_lock_4dcyc_35", hm = "_reason_4dcyc_41", mm = "_remove_4dcyc_46", wm = "_clauses_4dcyc_50", _m = "_clause_4dcyc_50", vm = "_label_4dcyc_64", fm = "_cell_4dcyc_71", bm = "_value_4dcyc_76", ie = {
  list: im,
  row: cm,
  head: sm,
  id: dm,
  lock: um,
  reason: hm,
  remove: mm,
  clauses: wm,
  clause: _m,
  label: vm,
  cell: fm,
  value: bm
}, Hn = Ve(!1);
function C$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Hn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function pm({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(L, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function gm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ie.reason, children: e })
  ] });
}
function Nm({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ n("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(gm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ie.remove, children: /* @__PURE__ */ o(f, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function vn(e, a) {
  return e.locked ? void 0 : a;
}
function S$({ rule: e, onChange: a, onRemove: t }) {
  if (!Ke(Hn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = vn(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Nm, { rule: e, onRemove: vn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ n("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ie.cell, children: /* @__PURE__ */ n(pm, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const ym = "_ladder_wwnch_2", km = "_cell_wwnch_7", $m = "_empty_wwnch_26", Cm = "_name_wwnch_34", Sm = "_holder_wwnch_40", Rm = "_request_wwnch_46", Tm = "_swatches_wwnch_51", Em = "_swatch_wwnch_51", xm = "_tilesFrame_wwnch_78", Lm = "_tiles_wwnch_78", Am = "_tile_wwnch_78", Im = "_bar_wwnch_117", Mm = "_hex_wwnch_128", qm = "_note_wwnch_138", T = {
  ladder: ym,
  cell: km,
  empty: $m,
  name: Cm,
  holder: Sm,
  request: Rm,
  swatches: Tm,
  swatch: Em,
  tilesFrame: xm,
  tiles: Lm,
  tile: Am,
  bar: Im,
  hex: Mm,
  note: qm
}, Bm = "not validated yet, pending a CVD matrix and dark stepping";
function Pm(e) {
  return e.reserved ? "reserved" : pa(e.step) ? "validated" : "partial";
}
function Fn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Om(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Dm({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(xe, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${T.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Hm(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Fm(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const fn = (e) => String(e).padStart(2, "0");
function jm(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Fn(e, void 0);
}
function Wm({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${T.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${T.hex} ward-ladder-hex`, children: r ? `step ${fn(e)}` : Pt(e) }),
    /* @__PURE__ */ n("span", { className: `${T.note} ward-ladder-note`, children: r ? t : `Step ${fn(e)} · ${t}` })
  ] });
}
function zm({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = Pm(e), c = Fn(i, t), s = c !== "free", d = a === e.step, u = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, w = `${u} · ${l === "tiles" && d ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": w, ...Fm(s, d), "data-validation": i, style: Om(e, i), onClick: h, onKeyDown: (E) => Hm(E, h) }, label: w, name: u, holder: c, validation: i, note: jm(i, t, d), step: e.step };
}
const Gm = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${T.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${T.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Wm, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${T.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Dm, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${T.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${T.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Um(e) {
  return Gm[e.presentation](zm(e));
}
function Km(e) {
  for (const a of e)
    if (!a.reserved && !ba(a.step)) throw new Error("colour ladder renders token steps only");
}
function Vm() {
  return /* @__PURE__ */ o("div", { className: `${T.cell} ward-ladder-cell ${T.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${T.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${T.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${T.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Ym(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Xm = { list: T.ladder, swatches: T.swatches, tiles: T.tilesFrame };
function Jm() {
  return /* @__PURE__ */ o("div", { className: `${T.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${T.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${T.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${T.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Qm = { list: Vm, swatches: () => null, tiles: Jm };
function jn(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  Km(e.steps);
  const r = Ym(e), l = Qm[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(Um, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${Xm[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: T.tiles, children: i }) : i });
}
const Zm = "_rail_1el2t_2", ew = "_section_1el2t_12", aw = "_sectionFlush_1el2t_22", nw = "_head_1el2t_26", tw = "_headLabel_1el2t_34", rw = "_sample_1el2t_42", lw = "_sampleLabel_1el2t_47", ow = "_sampleTitle_1el2t_54", iw = "_sampleMeta_1el2t_59", cw = "_trace_1el2t_65", sw = "_traceHead_1el2t_70", dw = "_steps_1el2t_78", uw = "_step_1el2t_78", hw = "_stepTitle_1el2t_97", mw = "_hollow_1el2t_107", ww = "_stepBody_1el2t_115", _w = "_stepDetail_1el2t_127", vw = "_publish_1el2t_132", fw = "_reason_1el2t_138", bw = "_note_1el2t_143", pw = "_reveal_1el2t_148", N = {
  rail: Zm,
  section: ew,
  sectionFlush: aw,
  head: nw,
  headLabel: tw,
  sample: rw,
  sampleLabel: lw,
  sampleTitle: ow,
  sampleMeta: iw,
  trace: cw,
  traceHead: sw,
  steps: dw,
  step: uw,
  stepTitle: hw,
  hollow: mw,
  stepBody: ww,
  stepDetail: _w,
  publish: vw,
  reason: fw,
  note: bw,
  reveal: pw
}, bn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, gw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Nw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, yw = { notSimulated: "not simulated", running: "running" };
function kw(e) {
  return e.presentation === "foundry";
}
function $w(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Cw(e, a) {
  var r;
  const t = gw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Sw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Rw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Tw(e) {
  if (Sw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Ew(e) {
  const [a, t] = p(!1);
  A(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${N.step} ${N.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function xw(e) {
  const a = yw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: N.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(xe, { size: 6, kind: Nw[e.kind], label: e.kind });
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
function Iw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Ew, { kind: a.kind, children: [
    /* @__PURE__ */ n(xw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: N.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: N.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Lw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Aw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Mw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(ce(a)), t.join(" · ");
}
function Wn(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${N.trace} ${N.section}`, children: [
    /* @__PURE__ */ n("p", { className: N.traceHead, id: a, children: Mw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: N.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Iw, { ...e, step: t }, t.title + String(r))) })
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
function Bw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + se(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${N.sampleMeta} ${N.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Pw(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Sn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(ya, { divided: !0, cells: a }) });
}
function Ow(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Sn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Dw(e) {
  const a = Ow(e.run);
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
    /* @__PURE__ */ n(f, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(f, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Hw(e) {
  return /* @__PURE__ */ o("div", { className: `${N.publish} ${N.section}`, children: [
    /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: N.note, children: e.note })
  ] });
}
function Fw(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${N.publish} ${N.section}`, children: /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Gn(e) {
  return /* @__PURE__ */ o("div", { className: `${N.head} ${N.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: N.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: bn[e.run.status].role, label: bn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function jw(e, a) {
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
function Ww(e) {
  var t;
  Rw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(qw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Pw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist }) }),
    /* @__PURE__ */ n(Hw, { reason: $w(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function zw(e) {
  var r;
  const a = jw(e.run, e.feed);
  Tw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Bw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Dw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Fw, { reason: Cw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function R$(e) {
  return kw(e) ? /* @__PURE__ */ n(zw, { ...e }) : /* @__PURE__ */ n(Ww, { ...e });
}
const Gw = "_list_142ip_3", Uw = "_row_142ip_9", Kw = "_condition_142ip_18", Vw = "_action_142ip_24", oa = {
  list: Gw,
  row: Uw,
  condition: Kw,
  action: Vw
}, Un = Ve(!1);
function T$({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Un.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oa.list, "aria-label": a, children: e }) });
}
function E$({ rule: e }) {
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
function pn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Yw(e) {
  return e === "up" ? "down" : "up";
}
function Xw(e, a) {
  const t = pn(e, a.id, a.direction) ?? pn(e, a.id, Yw(a.direction));
  t == null || t.focus();
}
function Yn() {
  const e = g(null), [a, t] = p(null), [r, l] = p("");
  return A(() => {
    e.current !== null && a !== null && Xw(e.current, a);
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
const Jw = "_body_1h15q_2", Qw = "_title_1h15q_8", Zw = "_section_1h15q_13", e_ = "_legend_1h15q_18", a_ = "_stages_1h15q_26", n_ = "_stage_1h15q_26", t_ = "_stageIndex_1h15q_44", r_ = "_stageName_1h15q_50", l_ = "_footer_1h15q_59", o_ = "_note_1h15q_66", i_ = "_reason_1h15q_71", c_ = "_actions_1h15q_76", s_ = "_webHead_1h15q_83", d_ = "_kicker_1h15q_92", u_ = "_webTitle_1h15q_99", h_ = "_webBody_1h15q_105", m_ = "_webSection_1h15q_109", w_ = "_sectionHead_1h15q_121", __ = "_sectionNote_1h15q_129", v_ = "_formLabel_1h15q_134", f_ = "_identityRow_1h15q_139", b_ = "_nameCell_1h15q_145", p_ = "_keyCell_1h15q_150", g_ = "_colourCell_1h15q_154", N_ = "_colourStatus_1h15q_161", y_ = "_webStages_1h15q_166", k_ = "_webStageList_1h15q_172", $_ = "_webStage_1h15q_166", C_ = "_webIndex_1h15q_191", S_ = "_webStageName_1h15q_196", R_ = "_webMoves_1h15q_201", T_ = "_addStage_1h15q_215", E_ = "_addStageButton_1h15q_223", x_ = "_addStageNote_1h15q_231", L_ = "_webFooter_1h15q_236", A_ = "_webFooterNotes_1h15q_244", I_ = "_webNote_1h15q_251", _ = {
  body: Jw,
  title: Qw,
  section: Zw,
  legend: e_,
  stages: a_,
  stage: n_,
  stageIndex: t_,
  stageName: r_,
  footer: l_,
  note: o_,
  reason: i_,
  actions: c_,
  webHead: s_,
  kicker: d_,
  webTitle: u_,
  webBody: h_,
  webSection: m_,
  sectionHead: w_,
  sectionNote: __,
  formLabel: v_,
  identityRow: f_,
  nameCell: b_,
  keyCell: p_,
  colourCell: g_,
  colourStatus: N_,
  webStages: y_,
  webStageList: k_,
  webStage: $_,
  webIndex: C_,
  webStageName: S_,
  webMoves: R_,
  addStage: T_,
  addStageButton: E_,
  addStageNote: x_,
  webFooter: L_,
  webFooterNotes: A_,
  webNote: I_
}, M_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Jn = "not in catalogue";
function q_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Jn}` }, ...t];
}
function B_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(L, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Jn}`;
  return /* @__PURE__ */ n(L, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: q_(t, e.name), invalid: i, onChange: r });
}
function Qn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function P_(e) {
  const a = g([]), t = g(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function O_({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: c }) {
  const s = Qn(a, t), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: _.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: _.webStageName, children: /* @__PURE__ */ n(B_, { stage: a, index: t, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(L, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: M_, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ha, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(ha, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function D_({ stages: e, onChange: a, catalogue: t }) {
  const r = P_(e.length), l = Yn(), i = (s, d) => {
    const u = Kn(s, d);
    r.current = Oa(r.current, s, u), l.moved({ id: r.current[u], direction: d }, Vn(Qn(e[s], s), u, e.length)), a(Oa(e, s, u));
  }, c = (s, d) => a(e.map((u, h) => h === s ? d : u));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, d) => /* @__PURE__ */ n(O_, { id: r.current[d], stage: s, index: d, total: e.length, catalogue: t, onReplace: (u) => c(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Xn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const H_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], F_ = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], j_ = "A new stream starts as a draft. Nothing runs on it until you publish it.", W_ = "Create is disabled: name the stream and give it a key first.", z_ = "reorder with the ↑ ↓ buttons · min 2";
function Ya(e, a) {
  return !e.reserved && pa(e.step) && a[e.step] === void 0;
}
function G_(e, a) {
  const t = e.find((r) => Ya(r, a));
  return t ? t.step : 1;
}
function U_({ stages: e, onMove: a }) {
  const t = Yn(), r = (l, i) => {
    const c = Kn(l, i);
    t.moved({ id: e[l].id, direction: i }, Vn(e[l].name, c, e.length)), a(l, c);
  };
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: _.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: _.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: _.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: _.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ha, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ha, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Xn, { text: t.announcement })
  ] });
}
function K_({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ n("p", { className: _.note, children: j_ }),
    e && /* @__PURE__ */ n("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ n(f, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function V_(e, a) {
  return e !== "" && a !== "" ? null : W_;
}
function Y_(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = F_, onCreate: i, onDraft: c, onClose: s, returnFocusTo: d } = e, u = k(), [h, w] = p(""), [v, E] = p(""), [K, V] = p(a[0].value), [oe, $e] = p(() => G_(t, r)), [ee, De] = p(e.stages ?? H_), [He, $] = p(l[0].value), j = { name: h, key: v, streamStep: oe, owner: K, stages: ee, policy: He }, _e = V_(h, v);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: u, onClose: s, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: _.body, children: [
    /* @__PURE__ */ n("h2", { className: _.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Identity" }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Key", value: v, onChange: E, mono: !0 }),
      /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: K, onChange: V, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Colour" }),
      /* @__PURE__ */ n(jn, { label: "Stream colour", steps: t, value: oe, onChange: $e, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ n("legend", { className: _.legend, children: "Stages" }),
      /* @__PURE__ */ n(U_, { stages: ee, onMove: (Le, pt) => De(Oa(ee, Le, pt)) })
    ] }),
    /* @__PURE__ */ n(Mn, { legend: "Loop policy", options: l, value: He, onChange: $ }),
    /* @__PURE__ */ n(K_, { reason: _e, onCreate: () => i(j), onDraft: () => c(j) })
  ] }) });
}
const Zn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], X_ = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function J_(e, a, t, r, l, i) {
  var s;
  const c = ((s = Zn.find((d) => d.value === l)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function Q_(e, a) {
  return Z_(e) && ev(e, a) && av(e);
}
function Z_(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function ev(e, a) {
  return e.colourStep !== null && Ya({ step: e.colourStep }, a);
}
function av(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function nv(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${Bm}.` : Ya({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function tv({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function rv({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ n(tv, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: _.reason, children: X_ })
    ] }),
    l && /* @__PURE__ */ n(f, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function lv({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ n("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function ov({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: _.webSection, children: [
    /* @__PURE__ */ n("h3", { className: _.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: _.identityRow, children: [
      /* @__PURE__ */ n("div", { className: _.nameCell, children: /* @__PURE__ */ n(L, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: _.keyCell, children: /* @__PURE__ */ n(L, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function iv(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [l, i] = p(""), [c, s] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [v, E] = p("relay"), [K, V] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = J_(l, c, d, h, v, K), $e = Q_(oe, r), ee = K.find(($) => $.kind === "agent" && $.name.trim() !== ""), De = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ n("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(jn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), He = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: _.colourStatus, "data-colour-status": "", children: nv(h, r) }),
    /* @__PURE__ */ n(L, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: u })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(lv, { titleId: t }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ n(ov, { name: l, setName: i, streamKey: c, setKey: s, colour: De, owner: He }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: _.sectionNote, children: z_ })
        ] }),
        /* @__PURE__ */ n(D_, { stages: K, onChange: V })
      ] }),
      /* @__PURE__ */ n("section", { className: _.webSection, children: /* @__PURE__ */ n(Mn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: v, options: Zn, onChange: E }) }),
      /* @__PURE__ */ n(rv, { ready: $e, draft: oe, agentStage: ee, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function x$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(iv, { ...e }) : /* @__PURE__ */ n(Y_, { ...e });
}
const cv = "_row_bs8hc_2", sv = "_cell_bs8hc_6", dv = "_condition_bs8hc_11", uv = "_action_bs8hc_18", hv = "_contract_bs8hc_24", mv = "_contractCondition_bs8hc_33", wv = "_contractAction_bs8hc_39", J = {
  row: cv,
  cell: sv,
  condition: dv,
  action: uv,
  contract: hv,
  contractCondition: mv,
  contractAction: wv
}, et = ["advance", "block", "escalate", "requestReview"], gn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ma(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Xa(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: J.action, children: gn[e.then] }) : /* @__PURE__ */ n(
    L,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: et.map((l) => ({ value: l, label: gn[l] }))
    }
  );
}
function _v({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: J.condition, title: ma(e, r), children: ma(e, r) }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: Xa(e, a, t) })
  ] });
}
function vv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: J.row, children: [
    /* @__PURE__ */ o("td", { className: J.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: J.condition, children: ma(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: J.cell, children: Xa(e, a, t) })
  ] });
}
function fv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: J.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: J.contractCondition, children: ma(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: J.contractAction, children: Xa(e, a, t, !0) })
  ] });
}
const bv = { two: vv, four: _v, contract: fv };
function L$(e) {
  var t;
  if (!et.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = bv[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const pv = "_column_gxbdk_2", gv = "_head_gxbdk_17", Nv = "_index_gxbdk_23", yv = "_name_gxbdk_29", kv = "_meta_gxbdk_38", $v = "_mono_gxbdk_43", Cv = "_gate_gxbdk_50", Sv = "_reviewersLabel_gxbdk_57", Rv = "_reviewers_gxbdk_57", Tv = "_reviewer_gxbdk_57", Ev = "_agents_gxbdk_74", xv = "_workflowColumn_gxbdk_79", Lv = "_workflowHead_gxbdk_96", Av = "_stageRow_gxbdk_102", Iv = "_stageLabel_gxbdk_109", Mv = "_workflowTitle_gxbdk_116", qv = "_workflowMeta_gxbdk_122", Bv = "_workflowGate_gxbdk_127", Pv = "_gateNote_gxbdk_135", Ov = "_cardNote_gxbdk_140", Dv = "_reviewerList_gxbdk_149", Hv = "_reviewerRow_gxbdk_155", Fv = "_reviewerMark_gxbdk_161", jv = "_reviewerName_gxbdk_171", Wv = "_terminalCard_gxbdk_177", zv = "_terminalCount_gxbdk_186", Gv = "_workflowAgents_gxbdk_192", Uv = "_mount_gxbdk_198", y = {
  column: pv,
  head: gv,
  index: Nv,
  name: yv,
  meta: kv,
  mono: $v,
  gate: Cv,
  reviewersLabel: Sv,
  reviewers: Rv,
  reviewer: Tv,
  agents: Ev,
  workflowColumn: xv,
  workflowHead: Lv,
  stageRow: Av,
  stageLabel: Iv,
  workflowTitle: Mv,
  workflowMeta: qv,
  workflowGate: Bv,
  gateNote: Pv,
  cardNote: Ov,
  reviewerList: Dv,
  reviewerRow: Hv,
  reviewerMark: Fv,
  reviewerName: jv,
  terminalCard: Wv,
  terminalCount: zv,
  workflowAgents: Gv,
  mount: Uv
}, Kv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Ja(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function at(e) {
  return `${Math.round(e * 100)}%`;
}
function Vv({ stage: e }) {
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
function Yv({ stage: e }) {
  return /* @__PURE__ */ n(ya, { cells: [
    { value: Z(e.count), label: "In stage" },
    { value: Ja(e.closedThisWeek, Z), label: "Closed this week" }
  ] });
}
function Xv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: Kv[e.kind] })
  ] });
}
function Jv({ stage: e }) {
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
function Qv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Vv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Yv, { stage: e }) : null;
}
function Zv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function ef({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: y.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Xv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(Jv, { stage: e }),
    /* @__PURE__ */ n(Qv, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(om, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(Zv, { onMount: t })
  ] });
}
const af = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function nf({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function tf({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(nf, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: at(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function rf(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function lf({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: Ja(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: rf(e.rolledBackThisWeek) })
  ] });
}
function of(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function cf(e) {
  if (e.kind === "terminal") return `${Ja(e.closedThisWeek)} this week`;
  const a = of(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function sf({ stage: e, titleId: a }) {
  const t = af[e.kind];
  return /* @__PURE__ */ o("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: y.stageRow, children: [
      /* @__PURE__ */ o("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: cf(e) })
  ] });
}
function df(e) {
  return e === "entry" || e === "agent";
}
function uf({ stage: e, onMount: a }) {
  return a === void 0 || !df(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: `${y.mount} ward-target`, onClick: () => a(e.index), children: "+ Mount agent" });
}
function hf({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ o("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(sf, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(tf, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(lf, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(uf, { stage: e, onMount: t })
  ] });
}
function mf(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function A$(e) {
  return mf(e) ? /* @__PURE__ */ n(hf, { ...e }) : /* @__PURE__ */ n(ef, { ...e });
}
const wf = "_row_ve78g_6", _f = "_cell_ve78g_10", vf = "_name_ve78g_19", ff = "_chain_ve78g_26", bf = "_owner_ve78g_32", pf = "_mono_ve78g_38", gf = "_compactRow_ve78g_45", Nf = "_compactCell_ve78g_54", yf = "_stack_ve78g_71", kf = "_stat_ve78g_78", $f = "_identityLine_ve78g_85", Cf = "_identity_ve78g_85", Sf = "_compactName_ve78g_103", Rf = "_ownerLine_ve78g_117", Tf = "_link_ve78g_130", Ef = "_emptyChain_ve78g_136", xf = "_arrow_ve78g_142", Lf = "_muted_ve78g_143", Af = "_define_ve78g_148", If = "_statValue_ve78g_155", Mf = "_policyId_ve78g_161", qf = "_sub_ve78g_166", b = {
  row: wf,
  cell: _f,
  name: vf,
  chain: ff,
  owner: bf,
  mono: pf,
  compactRow: gf,
  compactCell: Nf,
  stack: yf,
  stat: kf,
  identityLine: $f,
  identity: Cf,
  compactName: Sf,
  ownerLine: Rf,
  link: Tf,
  emptyChain: Ef,
  arrow: xf,
  muted: Lf,
  define: Af,
  statValue: If,
  policyId: Mf,
  sub: qf
};
function Bf(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Pf(e) {
  return e === void 0 ? b.compactRow : `${b.compactRow} ${e}`;
}
function nt(e) {
  return `${Z(e)} ${e === 1 ? "member" : "members"}`;
}
function Of(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${nt(e.members)}`;
}
function Df(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: b.compactCell, children: /* @__PURE__ */ o("span", { className: b.stack, children: [
    /* @__PURE__ */ o("span", { className: b.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${b.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${b.compactName} ward-rowlink ward-target`, href: F(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: b.ownerLine, children: Of(e) })
  ] }) });
}
function Hf(e) {
  return /* @__PURE__ */ n("span", { className: `${b.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: b.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: b.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function Ff(e, a) {
  return /* @__PURE__ */ n("td", { className: b.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: b.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: b.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: `${b.define} ward-target`, href: F(a), children: "Define workflow" })
  ] }) : Hf(e) });
}
function Nn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: b.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: b.muted, children: t }) : /* @__PURE__ */ o("span", { className: b.stat, children: [
    /* @__PURE__ */ n("span", { className: `${b.statValue} ward-stat-value`, title: r, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: b.sub, children: a })
  ] }) });
}
function jf(e) {
  return /* @__PURE__ */ n("td", { className: b.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: b.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: b.stat, children: [
    /* @__PURE__ */ n("span", { className: b.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: b.sub, children: e.summary })
  ] }) });
}
function Wf(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function zf({ stream: e, href: a, presentation: t }) {
  const r = Pf(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ee(e.streamStep, "chip") }, children: [
    Df(e, a),
    Ff(e.stages, a),
    Nn(Wf(e.agents), e.agents === void 0 ? void 0 : Bf(e.agents), "—"),
    jf(e.policy),
    Nn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Gf(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function I$(e) {
  if (Gf(e)) return zf(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: b.row, children: [
    /* @__PURE__ */ o("td", { className: b.cell, children: [
      /* @__PURE__ */ n("a", { className: `${b.name} ward-target`, href: F(t), children: a.name }),
      /* @__PURE__ */ n(m, { ...Na(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: b.cell, children: /* @__PURE__ */ n("span", { className: b.chain, children: a.stages.map((r) => /* @__PURE__ */ n(m, { role: r.gate ? "gate" : "soft", label: r.name }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: b.cell, children: /* @__PURE__ */ o("span", { className: b.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: b.cell, children: [
      /* @__PURE__ */ n("span", { className: b.owner, children: a.owner }),
      /* @__PURE__ */ n("span", { className: b.mono, children: nt(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: b.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: b.mono, title: a.inFlightHint, children: Z(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: b.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: b.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const Uf = "_row_mdce7_2", Kf = "_name_mdce7_16", Vf = "_scope_mdce7_24", wa = {
  row: Uf,
  name: Kf,
  scope: Vf
};
function Yf(e) {
  return e === void 0 ? `${wa.row} ward-toolrow` : `${wa.row} ward-toolrow ${e}`;
}
function Xf(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Jf({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function Qf({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Zf({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${wa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function eb(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function M$({ tool: e, onChange: a, presentation: t }) {
  const r = k(), l = k(), i = Xf(e, t), c = eb(t);
  return /* @__PURE__ */ o(c, { className: Yf(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Jf, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${wa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Zf, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(Qf, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const ab = "_strip_1qtlf_2", nb = "_head_1qtlf_10", tb = "_name_1qtlf_16", rb = "_chart_1qtlf_24", lb = "_segment_1qtlf_30", ob = "_detailedChart_1qtlf_36", ib = "_rail_1qtlf_49", cb = "_section_1qtlf_55", sb = "_label_1qtlf_66", db = "_note_1qtlf_83", Q = {
  strip: ab,
  head: nb,
  name: tb,
  chart: rb,
  segment: lb,
  detailedChart: ob,
  rail: ib,
  section: cb,
  label: sb,
  note: db
}, ub = "No item in flight to preview.", hb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", mb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Da = [1, 2, 3, 4, 5, 6], _a = 100;
function wb(e, a) {
  return a.has(e) ? Ee(e, "id") : "var(--ward-color-line)";
}
function _b({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: Q.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Da.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: Q.segment,
      x: l * _a,
      y: "0",
      width: _a,
      height: "8",
      fill: wb(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function vb(e) {
  const a = e.slice(0, Da.length);
  for (; a.length < Da.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function fb({ identities: e }) {
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
function bb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: Q.note, children: a ?? ub }) : /* @__PURE__ */ n($a, { item: { ...e, streamStep: ga(t.streamStep) }, onOpen: tt(r), feed: null });
}
function pb({ draft: e }) {
  const a = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: Q.head, style: a, children: [
    /* @__PURE__ */ n(xe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: Q.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
  ] });
}
function gb(e) {
  const a = vb(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: Q.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ta, { label: "Board card", children: /* @__PURE__ */ n(bb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ta, { label: "Streams index row", children: /* @__PURE__ */ n(pb, { draft: t }) }),
    /* @__PURE__ */ o(ta, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(fb, { identities: a }),
      /* @__PURE__ */ n("p", { className: Q.note, children: hb })
    ] }),
    /* @__PURE__ */ n(ta, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: Q.note, children: mb }) })
  ] });
}
function Nb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: Q.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: Q.head, children: [
      /* @__PURE__ */ n(xe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: Q.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n($a, { item: { ...a, streamStep: e.streamStep }, onOpen: tt(r) }),
    /* @__PURE__ */ n(_b, { draft: e, streams: t })
  ] });
}
function q$(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(gb, { ...e }) : /* @__PURE__ */ n(Nb, { ...e });
}
const yb = "_row_ixlg5_6", kb = "_headCell_ixlg5_10", $b = "_cell_ixlg5_11", Cb = "_name_ixlg5_23", Sb = "_consequence_ixlg5_29", Rb = "_governed_ixlg5_36", Tb = "_control_ixlg5_42", Eb = "_byRole_ixlg5_48", xb = "_webControl_ixlg5_59", Lb = "_webConsequence_ixlg5_65", Ab = "_webGoverned_ixlg5_71", O = {
  row: yb,
  headCell: kb,
  cell: $b,
  name: Cb,
  consequence: Sb,
  governed: Rb,
  control: Tb,
  byRole: Eb,
  webControl: xb,
  webConsequence: Lb,
  webGoverned: Ab
};
function Ib({
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
function Mb({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Ib, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function qb(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Bb({ name: e, cell: a, onChange: t }) {
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
function Pb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Bb, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webGoverned} ward-cellmeta`, children: qb(e) }) })
  ] });
}
function B$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Pb, { ...e }) : /* @__PURE__ */ n(Mb, { ...e });
}
const Ob = "_row_vv64h_2", Db = "_cell_vv64h_6", Hb = "_name_vv64h_25", Fb = "_note_vv64h_30", jb = "_webName_vv64h_41", Wb = "_webMeta_vv64h_47", G = {
  row: Ob,
  cell: Db,
  name: Hb,
  note: Fb,
  webName: jb,
  webMeta: Wb
}, rt = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function zb(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Gb({ component: e, onRestart: a }) {
  const t = k(), r = rt[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: G.row, children: [
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: G.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: G.cell, "data-mono": "true", children: [
      Z(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { id: t, className: G.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: G.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(f, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Ub({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: zb(e.state) });
}
function Kb({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: G.row, children: [
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: `${G.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n("span", { className: `${G.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(m, { ...rt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: G.cell, children: /* @__PURE__ */ n(Ub, { component: e, onRestart: a }) })
  ] });
}
function P$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Kb, { ...e }) : /* @__PURE__ */ n(Gb, { ...e });
}
const Vb = "_row_1f1gp_7", Yb = "_cell_1f1gp_11", Xb = "_next_1f1gp_28", Jb = "_headCell_1f1gp_38", Qb = "_webId_1f1gp_77", Zb = "_webPurpose_1f1gp_83", ep = "_webMeta_1f1gp_91", ap = "_webUrgent_1f1gp_97", D = {
  row: Vb,
  cell: Yb,
  next: Xb,
  headCell: Jb,
  webId: Qb,
  webPurpose: Zb,
  webMeta: ep,
  webUrgent: ap
}, np = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, tp = {
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
], rp = Object.fromEntries(lt.map((e) => [e.key, e]));
function je({ column: e, children: a }) {
  const t = rp[e];
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
function O$() {
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
function lp({ cred: e }) {
  const a = np[e.state];
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ n(je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(je, { column: "id", children: e.id }),
    /* @__PURE__ */ n(je, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(je, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(je, { column: "next", children: /* @__PURE__ */ n("span", { className: D.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function op({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ${D.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function ip({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(op, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...tp[e.state] }) })
  ] });
}
function D$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ip, { ...e }) : /* @__PURE__ */ n(lp, { ...e });
}
const cp = "_card_17zba_2", sp = "_head_17zba_11", dp = "_env_17zba_18", up = "_version_17zba_25", hp = "_meta_17zba_32", mp = "_webCard_17zba_37", wp = "_webRow_17zba_47", _p = "_webTitle_17zba_55", vp = "_webLine_17zba_65", fp = "_webVersion_17zba_72", bp = "_webMeta_17zba_77", z = {
  card: cp,
  head: sp,
  env: dp,
  version: up,
  meta: hp,
  webCard: mp,
  webRow: wp,
  webTitle: _p,
  webLine: vp,
  webVersion: fp,
  webMeta: bp
}, ot = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function pp({ env: e }) {
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
function gp(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [se(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Np(e) {
  return /* @__PURE__ */ o("article", { className: `${z.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${z.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${z.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...ot[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${z.version} ${z.webVersion} ${z.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${z.meta} ${z.webMeta} ${z.webLine} ward-cellmeta`, children: gp(e) })
  ] });
}
function H$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Np, { ...e }) : /* @__PURE__ */ n(pp, { ...e });
}
const yp = "_panel_1hmja_2", kp = "_line_1hmja_8", $p = "_actions_1hmja_14", ra = {
  panel: yp,
  line: kp,
  actions: $p
};
function F$(e) {
  return /* @__PURE__ */ o("div", { className: ra.panel, children: [
    /* @__PURE__ */ n("p", { className: ra.line, children: e.status }),
    /* @__PURE__ */ n(L, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ra.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ra.line, children: e.note ?? "" })
  ] });
}
const Cp = "_upload_erepj_2", Sp = "_preview_erepj_7", Rp = "_mark_erepj_17", Tp = "_empty_erepj_22", Ep = "_actions_erepj_28", xp = "_input_erepj_33", Lp = "_reasons_erepj_41", Ap = "_reason_erepj_41", Ip = "_accepted_erepj_57", ae = {
  upload: Cp,
  preview: Sp,
  mark: Rp,
  empty: Tp,
  actions: Ep,
  input: xp,
  reasons: Lp,
  reason: Ap,
  accepted: Ip
}, it = 1.5, ct = 22, va = "script elements or event handlers", Se = "links or external references", ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${it}px at ${ct}px`], Mp = [ye[1], ye[2], va, Se], qp = /* @__PURE__ */ new Map([
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
]), Bp = "http://www.w3.org/2000/svg", Pp = "http://www.w3.org/2000/xmlns/", Op = /* @__PURE__ */ new Set([
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
]), Dp = /* @__PURE__ */ new Set([
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
]), Hp = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, Fp = /url\s*\(|['"\\]/i;
function jp() {
  return { ok: !1, reasons: [ye[1]] };
}
function st(e) {
  return e.namespaceURI === Bp || e.namespaceURI === null;
}
function Wp(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && st(a) ? a : null;
  } catch {
    return null;
  }
}
function zp(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [ye[0]] : [];
}
function Gp(e) {
  return qp.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function Up(e) {
  return Fp.test(e.replace(Hp, ""));
}
function Kp(e) {
  return /^on/i.test(e.localName) ? va : e.localName === "href" || Up(e.value) ? Se : void 0;
}
function Vp(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(Gp(t));
    for (const r of Array.from(t.attributes)) a.add(Kp(r));
  }
  return Mp.filter((t) => a.has(t));
}
function Yp(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? ct / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < it;
  }) ? [ye[3]] : [];
}
function Xp(e) {
  if (e.namespaceURI === Pp) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Dp.has(a) || a.startsWith("stroke"));
}
function Jp(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && st(a) && Op.has(a.localName);
}
function Qp(e, a) {
  Jp(a) ? a.nodeType === Node.ELEMENT_NODE && dt(a) : e.removeChild(a);
}
function dt(e) {
  for (const a of Array.from(e.attributes)) Xp(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) Qp(e, a);
  return e;
}
function j$(e) {
  const a = Wp(e);
  if (a === null) return jp();
  const t = [...zp(a), ...Vp(a), ...Yp(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(dt(a)) };
}
const Zp = "Mark accepted.";
function eg({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: ae.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: ae.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: ae.empty }) });
}
function ag(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function ng(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function tg({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: ae.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: ae.result, role: "status", children: /* @__PURE__ */ n("p", { className: ae.accepted, children: Zp }) }) : /* @__PURE__ */ n("div", { className: ae.result, role: "status", children: /* @__PURE__ */ n("ul", { className: ae.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: ae.reason, children: a }, a)) }) });
}
function rg({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(tg, { result: e }) : /* @__PURE__ */ n("p", { className: `${ae.result} ${ag(e, t)}`, role: "status", children: ng(e, t) });
}
function W$({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = g(null), [i, c] = p(null), s = (d) => {
    if (d === void 0) return;
    const u = a(d);
    u instanceof Promise ? u.then(c) : c(u);
  };
  return /* @__PURE__ */ o("div", { className: ae.upload, children: [
    /* @__PURE__ */ n(eg, { current: e }),
    /* @__PURE__ */ o("div", { className: ae.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: l,
          className: ae.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          onChange: (d) => {
            var u;
            return s((u = d.target.files) == null ? void 0 : u[0]);
          }
        }
      ),
      /* @__PURE__ */ n(f, { onClick: () => {
        var d;
        return (d = l.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(f, { variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(rg, { result: i, presentation: r })
  ] });
}
const lg = "_row_1wp9s_7", og = "_cell_1wp9s_11", ig = "_head_1wp9s_28", cg = "_name_1wp9s_34", sg = "_pinned_1wp9s_42", dg = "_headCell_1wp9s_49", ug = "_webName_1wp9s_88", hg = "_webMeta_1wp9s_95", mg = "_webWarn_1wp9s_103", M = {
  row: lg,
  cell: og,
  head: ig,
  name: cg,
  pinned: sg,
  headCell: dg,
  webName: ug,
  webMeta: hg,
  webWarn: mg
}, Qa = {
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
], wg = Object.fromEntries(ut.map((e) => [e.key, e]));
function _g(e, a) {
  return `mcp.${e}.${a}`;
}
function vg(e) {
  return Object.keys(Qa).includes(e);
}
function fg(e) {
  return Qa[e !== void 0 && vg(e) ? e : "unknown"];
}
function Ye({ column: e, children: a }) {
  const t = wg[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: M.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function z$() {
  return /* @__PURE__ */ n("tr", { children: ut.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: M.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function bg({ server: e }) {
  const a = Qa[e.connection];
  return /* @__PURE__ */ o("tr", { className: M.row, children: [
    /* @__PURE__ */ o(Ye, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: M.head, children: [
        /* @__PURE__ */ n("span", { className: M.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: M.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(Ye, { column: "connection", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ye, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(Ye, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(Ye, { column: "tools", children: e.tools.map((t) => _g(e.name, t)).join(" · ") })
  ] });
}
function pg(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function gg(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Ng({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${M.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${M.webMeta} ward-cellmeta`, children: e });
}
function yg({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${M.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(f, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function kg({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(f, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function $g({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: M.row, children: [
    /* @__PURE__ */ o("td", { className: M.cell, children: [
      /* @__PURE__ */ n("span", { className: `${M.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${M.webMeta} ward-cellmeta`, children: pg(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: M.cell, children: /* @__PURE__ */ n("span", { className: `${M.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: M.cell, children: /* @__PURE__ */ n(m, { ...gg(e) }) }),
    /* @__PURE__ */ n("td", { className: M.cell, children: /* @__PURE__ */ n(Ng, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: M.cell, children: /* @__PURE__ */ n(m, { ...fg(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: M.cell, children: [
      /* @__PURE__ */ n(yg, { server: e, onRestart: a }),
      /* @__PURE__ */ n(kg, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function G$(e) {
  return "presentation" in e ? /* @__PURE__ */ n($g, { ...e }) : /* @__PURE__ */ n(bg, { ...e });
}
const Cg = "_row_1h9nq_2", Sg = "_headCell_1h9nq_14", Rg = "_cell_1h9nq_15", Tg = "_name_1h9nq_26", Eg = "_consequence_1h9nq_32", xg = "_reason_1h9nq_38", Lg = "_value_1h9nq_44", Ag = "_webRow_1h9nq_60", Ig = "_webSetting_1h9nq_71", Mg = "_webName_1h9nq_79", qg = "_webConsequence_1h9nq_87", Bg = "_webControl_1h9nq_93", Pg = "_webState_1h9nq_106", Og = "_webChip_1h9nq_111", x = {
  row: Cg,
  headCell: Sg,
  cell: Rg,
  name: Tg,
  consequence: Eg,
  reason: xg,
  value: Lg,
  webRow: Ag,
  webSetting: Ig,
  webName: Mg,
  webConsequence: qg,
  webControl: Bg,
  webState: Pg,
  webChip: Og
}, ht = 104, mt = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Dg({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Oe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(An, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: x.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Hg({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = k(), i = mt[t], c = t === "locked";
  return /* @__PURE__ */ o("tr", { className: x.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: x.headCell, children: [
      /* @__PURE__ */ n("span", { className: x.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: x.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: x.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: x.cell, children: /* @__PURE__ */ n(Dg, { control: a, name: e.name, locked: c, describedBy: c ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: x.cell, style: { width: ht }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function wt(e, a) {
  return String(e ?? a);
}
function Fg(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function jg(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? wt(e.value, "—");
}
function Wg({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: x.webControl, children: [
    /* @__PURE__ */ n(Oe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => l == null ? void 0 : l(c) }),
    /* @__PURE__ */ n("span", { className: x.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function zg(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(Wg, { ...e });
  const l = Fg(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: x.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(An, { options: l, value: wt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${x.webControl} ${x.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: jg(a) });
}
function Gg({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const c = k(), s = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${x.row} ${x.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: x.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${x.name} ${x.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: c, className: `${x.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: x.webControl, children: i(c) }) : /* @__PURE__ */ n(zg, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${x.webChip} ward-policy-chip`, style: { width: ht }, children: /* @__PURE__ */ n(m, { ...mt[t], size: "tag" }) })
  ] });
}
function U$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Gg, { ...e }) : /* @__PURE__ */ n(Hg, { ...e });
}
const Ug = "_label_1o9za_7", Kg = "_name_1o9za_15", Vg = "_column_1o9za_24", Yg = "_webFrame_1o9za_57", Xg = "_webHead_1o9za_62", Jg = "_webHeadLabel_1o9za_74", Qg = "_webLabel_1o9za_112", Zg = "_webColumns_1o9za_119", eN = "_webGroup_1o9za_125", aN = "_webPeople_1o9za_126", nN = "_webVia_1o9za_127", tN = "_webMeta_1o9za_156", H = {
  label: Ug,
  name: Kg,
  column: Vg,
  webFrame: Yg,
  webHead: Xg,
  webHeadLabel: Jg,
  webLabel: Qg,
  webColumns: Zg,
  webGroup: eN,
  webPeople: aN,
  webVia: nN,
  webMeta: tN
}, rN = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, xa = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function La({ column: e, children: a }) {
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
function lN(e) {
  if (!e.matrixRole) return;
  const a = rN[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function oN({ node: e }) {
  const a = lN(e);
  return /* @__PURE__ */ o("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(iN, { role: a, node: e }),
    /* @__PURE__ */ n(La, { column: xa[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(La, { column: xa[1], children: e.people === void 0 ? "" : Z(e.people) }),
    /* @__PURE__ */ n(La, { column: xa[2], children: e.requestedVia ?? "" })
  ] });
}
function iN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function cN({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: c }) {
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
      label: /* @__PURE__ */ n(oN, { node: t }),
      children: c
    }
  );
}
function Aa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function sN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Aa, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Aa, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Aa, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function dN() {
  return /* @__PURE__ */ o("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function uN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function hN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function mN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(dN, {}),
    /* @__PURE__ */ n(ds, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Bn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(uN, { row: t }),
        detail: /* @__PURE__ */ n(sN, { row: t }),
        expanded: hN(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function K$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(mN, { ...e }) : /* @__PURE__ */ n(cN, { ...e });
}
const wN = "_runbook_b9agc_2", _N = "_list_b9agc_7", vN = "_step_b9agc_15", fN = "_numeral_b9agc_21", bN = "_body_b9agc_28", pN = "_head_b9agc_34", gN = "_title_b9agc_40", NN = "_detail_b9agc_45", yN = "_actions_b9agc_50", kN = "_webList_b9agc_56", $N = "_webStep_b9agc_60", CN = "_webBody_b9agc_66", SN = "_webTitle_b9agc_74", RN = "_webDetail_b9agc_78", R = {
  runbook: wN,
  list: _N,
  step: vN,
  numeral: fN,
  body: bN,
  head: pN,
  title: gN,
  detail: NN,
  actions: yN,
  webList: kN,
  webStep: $N,
  webBody: CN,
  webTitle: SN,
  webDetail: RN
}, _t = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function vt(e) {
  return String(e + 1).padStart(2, "0");
}
function TN({ step: e, index: a, connection: t }) {
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
function EN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: R.runbook, children: [
    /* @__PURE__ */ n("ol", { className: R.list, children: e.map((r, l) => /* @__PURE__ */ n(TN, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: R.actions, children: a })
  ] });
}
function xN({ step: e, index: a, connection: t }) {
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
    /* @__PURE__ */ n("ol", { className: `${R.list} ${R.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(xN, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${R.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function V$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(LN, { ...e }) : /* @__PURE__ */ n(EN, { ...e });
}
const AN = "_list_1gu6a_2", IN = "_check_1gu6a_10", MN = "_body_1gu6a_16", qN = "_text_1gu6a_23", BN = "_pending_1gu6a_32", PN = "_measured_1gu6a_37", ze = {
  list: AN,
  check: IN,
  body: MN,
  text: qN,
  pending: BN,
  measured: PN
};
function ON(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function DN({ check: e }) {
  const a = ON(e.passed);
  return /* @__PURE__ */ o("li", { className: `${ze.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Ka, { state: a.state, label: a.label }),
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
function Y$({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(DN, { check: a }, a.text)) });
}
const HN = "_root_1b3dm_2", FN = "_list_1b3dm_10", jN = "_line_1b3dm_21", WN = "_at_1b3dm_48", zN = "_text_1b3dm_52", GN = "_foot_1b3dm_56", UN = "_idle_1b3dm_67", KN = "_caret_1b3dm_74", VN = "_jump_1b3dm_81", pe = {
  root: HN,
  list: FN,
  line: jN,
  at: WN,
  text: zN,
  foot: GN,
  idle: UN,
  caret: KN,
  jump: VN
}, YN = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Za(e) {
  return Number.isNaN(Date.parse(e)) ? "" : YN.format(new Date(e));
}
const XN = { warn: "warning", ok: "ok" };
function JN({ kind: e }) {
  const a = XN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function QN({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Za(e)}` });
}
function ZN({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Za(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${pe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${pe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: pe.idle, children: i }),
    /* @__PURE__ */ n(QN, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const ey = 8;
function ay(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > ey;
}
function ny({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${pe.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
function X$({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = g(null), [i, c] = p(0), [s, d] = p(!1), u = e.at(-1);
  A(() => {
    c(e.length);
  }, [e.length]), ja(() => {
    const w = l.current;
    w && !s && (w.scrollTop = w.scrollHeight);
  }, [e.length, s]);
  const h = () => {
    var E;
    const w = l.current;
    if (!w) return;
    const v = w.querySelectorAll("[data-consline-text]");
    (E = v.item(v.length - 1)) == null || E.focus(), d(!1);
  };
  return /* @__PURE__ */ o("div", { className: pe.root, children: [
    /* @__PURE__ */ n("ol", { className: pe.list, ref: l, "aria-live": "off", "aria-label": r, onScroll: (w) => d(ay(w.currentTarget)), children: e.map((w, v) => /* @__PURE__ */ o("li", { className: `${pe.line} ward-consline ward-reveal ward-consline--${w.kind}`, "data-kind": w.kind, "data-revealed": v < i, children: [
      /* @__PURE__ */ n("span", { className: pe.at, children: Za(w.at) }),
      /* @__PURE__ */ n(JN, { kind: w.kind }),
      /* @__PURE__ */ n("span", { className: pe.text, "data-consline-text": !0, tabIndex: -1, children: w.text })
    ] }, `${w.at}-${v}`)) }),
    /* @__PURE__ */ n(ZN, { connection: a, idleSince: t, last: u, children: /* @__PURE__ */ n(ny, { shown: s, onJump: h }) })
  ] });
}
const ty = "_row_11jhe_2", ry = "_head_11jhe_14", ly = "_author_11jhe_20", oy = "_eta_11jhe_25", iy = "_edited_11jhe_26", cy = "_body_11jhe_32", sy = "_reason_11jhe_37", dy = "_actions_11jhe_42", fe = {
  row: ty,
  head: ry,
  author: ly,
  eta: oy,
  edited: iy,
  body: cy,
  reason: sy,
  actions: dy
}, uy = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function hy(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function my({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(f, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function wy({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(f, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: fe.reason, id: a, children: e })
  ] });
}
function _y(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function vy(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(my, { ...e }) : /* @__PURE__ */ n(wy, { reason: e.unavailable, reasonId: e.unavailableId });
}
function J$(e) {
  const { comment: a } = e;
  _y(e);
  const t = k(), r = `${t}-unavailable`, l = uy[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${fe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: fe.head, children: [
      /* @__PURE__ */ n("span", { className: fe.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: fe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: fe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: fe.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: fe.reason, id: t, children: hy(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: fe.actions, children: /* @__PURE__ */ n(vy, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const fy = "_root_c46wj_2", by = "_attach_c46wj_11", py = "_actions_c46wj_17", gy = "_reply_c46wj_23", Ny = "_replyRow_c46wj_28", yy = "_sendsAs_c46wj_42", Ue = {
  root: fy,
  attach: by,
  actions: py,
  reply: gy,
  replyRow: Ny,
  sendsAs: yy
};
function ky({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = p(""), i = k();
  return /* @__PURE__ */ o("div", { className: Ue.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ue.replyRow, children: [
      /* @__PURE__ */ n(L, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(f, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ue.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function Q$(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(ky, { ...e }) : /* @__PURE__ */ n($y, { ...e });
}
function $y({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [c, s] = p("");
  return /* @__PURE__ */ o("div", { className: Ue.root, children: [
    /* @__PURE__ */ n(L, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ o("div", { className: Ue.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(f, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
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
      /* @__PURE__ */ n(f, { variant: "primary", onClick: () => l(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(f, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const Cy = "_list_1ih9e_2", Sy = "_item_1ih9e_6", Ry = "_body_1ih9e_22", Ty = "_text_1ih9e_28", Ey = "_evidence_1ih9e_37", xy = "_consequence_1ih9e_49", Ly = "_note_1ih9e_54", Pe = {
  list: Cy,
  item: Sy,
  body: Ry,
  text: Ty,
  evidence: Ey,
  consequence: xy,
  note: Ly
};
function Ay({ criterion: e }) {
  return /* @__PURE__ */ n(xe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function yn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Iy(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function My({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Pe.body, children: [
    /* @__PURE__ */ n("span", { className: Pe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(yn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Pe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(yn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Pe.consequence, children: Iy(e.why) })
    ] })
  ] });
}
function qy({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Pe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Ay, { criterion: e }),
    /* @__PURE__ */ n(My, { criterion: e })
  ] });
}
function Z$({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(qy, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Pe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const By = "_list_dwhoz_2", Py = "_rung_dwhoz_6", Oy = "_name_dwhoz_18", Dy = "_actor_dwhoz_32", ia = {
  list: By,
  rung: Py,
  name: Oy,
  actor: Dy
}, Hy = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function Fy({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = Hy[e.state];
  return /* @__PURE__ */ o("li", { className: ia.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ia.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ia.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function eC({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ia.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(Fy, { rung: a }, a.name)) });
}
const jy = "_sheet_1fqco_2", Wy = "_title_1fqco_9", zy = "_stage_1fqco_15", Gy = "_effects_1fqco_20", Uy = "_effect_1fqco_20", Ky = "_numeral_1fqco_31", Vy = "_effectText_1fqco_38", Yy = "_refusals_1fqco_43", Xy = "_reasons_1fqco_52", Jy = "_reason_1fqco_52", Qy = "_actions_1fqco_62", ue = {
  sheet: jy,
  title: Wy,
  stage: zy,
  effects: Gy,
  effect: Uy,
  numeral: Ky,
  effectText: Vy,
  refusals: Yy,
  reasons: Xy,
  reason: Jy,
  actions: Qy
};
function Zy({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(f, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(f, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function aC({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: c }) {
  const s = k(), d = `${s}-refusal`, [u, h] = p(""), w = t.length > 0;
  return /* @__PURE__ */ n(ea, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ue.effects, children: a.map((v, E) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ n("span", { className: ue.numeral, children: String(E + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ue.effectText, children: v })
    ] }, v)) }),
    /* @__PURE__ */ n(
      ec,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(L, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    w && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((v, E) => /* @__PURE__ */ n("li", { className: ue.reason, id: E === 0 ? d : void 0, children: v.reason }, v.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(Zy, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(f, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const ek = "_list_1hvqu_2", ak = "_path_1hvqu_7", nk = "_head_1hvqu_21", tk = "_label_1hvqu_28", rk = "_consequence_1hvqu_35", lk = "_ask_1hvqu_36", Ge = {
  list: ek,
  path: ak,
  head: nk,
  label: tk,
  consequence: rk,
  ask: lk
}, Ha = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function kn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function $n(e) {
  return e ? "primary" : "secondary";
}
function ok({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(f, { variant: $n(a), size: "sm", onClick: () => t(e.kind), children: Ha[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(f, { variant: $n(a), size: "sm", disabled: !0, describedBy: r, children: Ha[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ge.ask, id: r, children: e.askInstead })
  ] });
}
function ik({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ge.path, "data-allowed": e.allowed, "data-role": kn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ge.head, children: [
      /* @__PURE__ */ n("span", { className: Ge.label, children: e.title ?? Ha[e.kind] }),
      /* @__PURE__ */ n(m, { role: kn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ge.consequence, children: e.consequence }),
    /* @__PURE__ */ n(ok, { path: e, primary: a, onChoose: t })
  ] });
}
function nC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ge.list, children: e.map((t, r) => /* @__PURE__ */ n(ik, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const ck = "_list_1nyt1_2", sk = "_item_1nyt1_6", dk = "_node_1nyt1_18", uk = "_body_1nyt1_24", hk = "_head_1nyt1_30", mk = "_stage_1nyt1_36", wk = "_version_1nyt1_41", _k = "_sentence_1nyt1_49", vk = "_meta_1nyt1_54", ge = {
  list: ck,
  item: sk,
  node: dk,
  body: uk,
  head: hk,
  stage: mk,
  version: wk,
  sentence: _k,
  meta: vk
}, fk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function bk({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function pk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(xe, { size: 9, kind: fk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(bk, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${se(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function tC({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(pk, { entry: a }, a.stage + String(t))) });
}
const gk = "_thread_1kn6s_3", Nk = "_turn_1kn6s_8", yk = "_who_1kn6s_27", kk = "_body_1kn6s_32", ca = {
  thread: gk,
  turn: Nk,
  who: yk,
  body: kk
}, ft = Ve(!1);
function rC({ children: e, density: a }) {
  return /* @__PURE__ */ n(ft.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ca.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function lC({ turn: e }) {
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
const $k = "_list_1rt9c_3", Ck = "_row_1rt9c_7", Sk = "_label_1rt9c_20", Rk = "_n_1rt9c_26", Tk = "_cause_1rt9c_33", Qe = {
  list: $k,
  row: Ck,
  label: Sk,
  n: Rk,
  cause: Tk
};
function Ek(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const xk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Lk({ row: e, formatNumber: a }) {
  return Ek(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(xe, { size: 8, ...xk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Ak, { cause: e.cause })
  ] });
}
function Ak({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function oC({ rows: e, formatNumber: a = Z }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(Lk, { row: t, formatNumber: a }, t.label)) });
}
const Ik = "_root_1jxwp_2", Mk = {
  root: Ik
};
function iC({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: Mk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ca, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(f, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const qk = "_row_dhbre_3", Bk = "_key_dhbre_13", Pk = "_stack_dhbre_24", Ok = "_value_dhbre_32", Dk = "_evidence_dhbre_39", Hk = "_mark_dhbre_47", We = {
  row: qk,
  key: Bk,
  stack: Pk,
  value: Ok,
  evidence: Dk,
  mark: Hk
};
function Fk({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ka, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function cC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${We.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${We.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${We.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${We.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${We.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${We.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(Fk, { state: e.state }) })
  ] });
}
const jk = "_cell_1monp_2", Wk = {
  cell: jk
}, zk = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Gk(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function Uk(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function Kk(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Gk(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function Vk(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function sC({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  Uk(e, t);
  const r = Vk(e);
  return /* @__PURE__ */ n(
    wc,
    {
      label: "Rejection routing",
      columns: zk,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: Wk.cell, "data-norerun": l.noRerun ? !0 : void 0, children: Kk(l, i) }),
      empty: a ?? /* @__PURE__ */ n(Us, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Yk = "_row_ute8v_2", Xk = "_title_ute8v_11", Jk = "_turns_ute8v_20", Qk = "_waiting_ute8v_21", Zk = "_resolved_ute8v_22", e1 = "_activity_ute8v_23", a1 = "_cost_ute8v_29", n1 = "_link_ute8v_30", t1 = "_tableRow_ute8v_47", r1 = "_tableTitle_ute8v_59", l1 = "_tableResolved_ute8v_64", o1 = "_tableLink_ute8v_68", i1 = "_tableMeta_ute8v_83", c1 = "_tableCost_ute8v_90", s1 = "_tableActivity_ute8v_91", d1 = "_tableState_ute8v_101", u1 = "_tableRecord_ute8v_112", P = {
  row: Yk,
  title: Xk,
  turns: Jk,
  waiting: Qk,
  resolved: Zk,
  activity: e1,
  cost: a1,
  link: n1,
  tableRow: t1,
  tableTitle: r1,
  tableResolved: l1,
  tableLink: o1,
  tableMeta: i1,
  tableCost: c1,
  tableActivity: s1,
  tableState: d1,
  tableRecord: u1
}, bt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function h1(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function m1(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function w1(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const _1 = { duplicate: "CLOSED · DUPLICATE" };
function v1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: P.tableMeta, children: `waiting on ${e}` });
}
function f1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: P.tableCost, children: e === void 0 ? null : ne(e) });
}
function b1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${P.tableRecord} ward-target`, href: F(e.href), children: `→ ${e.key}` });
}
function p1({ session: e, href: a }) {
  const t = bt[e.state];
  return /* @__PURE__ */ o("tr", { className: P.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: P.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${P.tableLink} ward-target`, href: F(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: P.tableMeta, children: m1(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: P.tableResolved, children: [
      w1(e.resolved),
      /* @__PURE__ */ n(v1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(f1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: P.tableActivity, children: h1(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: P.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: _1[e.state] ?? t.label }),
      /* @__PURE__ */ n(b1, { link: e.link })
    ] }) })
  ] });
}
function g1({ session: e }) {
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
function dC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(p1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(g1, { session: e.session });
}
const N1 = "_block_1yy2v_3", y1 = "_list_1yy2v_9", k1 = "_line_1yy2v_14", Fa = {
  block: N1,
  list: y1,
  line: k1
}, $1 = { warn: "warning", ok: "ok" };
function C1({ kind: e }) {
  const a = $1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function S1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Fa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(C1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function uC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Fa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Fa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(S1, { line: t }, `${r}-${t.text}`)) }) });
}
const R1 = "_band_tt7hp_1", T1 = "_head_tt7hp_8", E1 = "_cell_tt7hp_19", x1 = "_index_tt7hp_35", L1 = "_title_tt7hp_42", A1 = "_note_tt7hp_48", I1 = "_cellTitle_tt7hp_53", M1 = "_cellBody_tt7hp_58", q1 = "_tag_tt7hp_64", ve = {
  band: R1,
  head: T1,
  cell: E1,
  index: x1,
  title: L1,
  note: A1,
  cellTitle: I1,
  cellBody: M1,
  tag: q1
}, Cn = 4;
function hC({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== Cn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Cn}-cell grid`);
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
  X$ as ActivityConsole,
  om as AgentCard,
  V1 as AppShell,
  q$ as AppearanceStrip,
  hC as Band,
  Z1 as BarChart,
  Rd as BoardColumn,
  _$ as BoardFootnote,
  v$ as BoardHeader,
  i$ as BoardScroller,
  f as Btn,
  z1 as CHIP_ROLES,
  lt as CREDENTIAL_COLUMNS,
  Q1 as Callout,
  B$ as CapabilityRow,
  lC as ChatMessage,
  En as Checkbox,
  m as Chip,
  J$ as ClarificationRow,
  S$ as ClauseRuleRow,
  C$ as ClauseRules,
  jn as ColourLadder,
  P$ as ComponentRow,
  Q$ as Composer,
  b$ as ConfigRow,
  f$ as ConfigRowHead,
  Va as ConnectionMark,
  rC as Conversation,
  ec as CostMeter,
  D$ as CredentialRow,
  O$ as CredentialRowHead,
  Z$ as CriteriaList,
  ul as Crumb,
  oC as DeliveryHealth,
  d$ as DeniedState,
  R$ as DryRunRail,
  Us as EmptyState,
  H$ as EnvCard,
  L as Field,
  s$ as FilteredEmpty,
  l$ as FormStack,
  Ca as GateChecklist,
  eC as GateLadder,
  wc as Grid,
  E$ as HandoffRuleRow,
  T$ as HandoffRules,
  p$ as ItemDrawer,
  F$ as KeyPanel,
  qt as LIVE_EVENT_TYPES,
  Th as LegacyBoardColumn,
  N$ as LegacyBoardHeader,
  y$ as LegacyConfigRow,
  $$ as LegacyItemDrawer,
  Nh as LegacyOverCapNote,
  k$ as LegacyPreviewRail,
  Dn as LegacyWorkCard,
  ke as LiveIndicator,
  u$ as LoadFailed,
  w$ as Loading,
  ut as MCP_SERVER_COLUMNS,
  Ka as Mark,
  W$ as MarkUpload,
  xe as Marker,
  G$ as McpServerRow,
  z$ as McpServerRowHead,
  x$ as NewStreamModal,
  Ys as OverCapNote,
  ea as Overlay,
  Bm as PARTIAL_STEP_REASON,
  ht as POLICY_CHIP_WIDTH,
  n$ as PageFrame,
  J1 as PageHeader,
  e$ as PlainList,
  U$ as PolicyRow,
  g$ as PreviewRail,
  xa as ROLE_MATRIX_COLUMNS,
  et as RULE_ACTIONS,
  Mn as Radio,
  iC as ReadyChecklist,
  r$ as RecordSection,
  aC as RequeueSheet,
  nC as ResolveBlock,
  cC as ResolvedFieldRow,
  K$ as RoleMatrixRow,
  sC as RoutingTable,
  L$ as RuleRow,
  V$ as RunbookSteps,
  It as STREAM_STEPS,
  o$ as SectionBand,
  un as SectionHeader,
  An as SegmentedControl,
  dC as SessionRow,
  X1 as Sidebar,
  A$ as StageColumn,
  c$ as StageGrid,
  tC as StageHistory,
  D_ as StageListEditor,
  h$ as StaleStrip,
  ya as StatStrip,
  I$ as StreamRow,
  t$ as SubjectRail,
  Oe as Switch,
  Y1 as Tabs,
  M$ as ToolRow,
  a$ as TopBar,
  ds as Tree,
  Bn as TreeRow,
  uC as TypedInputBlock,
  Lr as UNSAFE_HREF,
  Y$ as ValidationList,
  D1 as VisibilityProvider,
  H1 as Visible,
  W1 as WARD_VERSION,
  $a as WorkCard,
  m$ as WriteUnavailableStrip,
  h1 as agoSince,
  Ct as clock,
  nv as colourStatus,
  Z as count,
  ce as duration,
  Wa as elapsed,
  j1 as eventSourceTransport,
  ba as isStreamStep,
  pa as isValidatedStreamStep,
  Pm as ladderValidation,
  fg as mcpConnectionChip,
  _g as mcpToolName,
  ne as money,
  me as ms,
  Pn as ordered,
  Sn as ratio,
  zb as restartLabel,
  F as safeHref,
  se as stamp,
  Tn as stream,
  U1 as streamChip,
  Na as streamChipProps,
  Ee as streamColour,
  Pt as streamHex,
  G1 as streamVars,
  la as useBorderFlash,
  xt as useFocusTrap,
  K1 as useLiveFeed,
  F1 as useReturnFocus,
  fa as useRovingTabindex,
  za as useTicker,
  St as useVisible,
  W as v,
  j$ as validateMark,
  ga as validatedStep,
  Mt as validatedStreamSteps
};
