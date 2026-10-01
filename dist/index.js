import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as kt, useContext as Ke, createContext as Ve, useCallback as Y, useEffect as A, useState as p, useRef as N, useLayoutEffect as Fa, useId as $, Fragment as $t } from "react";
import { createPortal as Ct } from "react-dom";
function se(e) {
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
const St = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ce(e) {
  const a = St.formatToParts(new Date(e)), t = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function te(e) {
  return e > 0 && e < 5e-3 ? "<$0.01" : e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function ee(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function Sn(e, a) {
  return `${e} / ${a}`;
}
const Rt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Tt(e) {
  return Rt.format(new Date(e));
}
const Rn = Ve(/* @__PURE__ */ new Set());
function V1({ hidden: e, children: a }) {
  const t = kt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Rn.Provider, { value: t, children: a });
}
function Et(e) {
  return !Ke(Rn).has(e);
}
function Y1({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(S, { children: Et(e) ? a : t });
}
const Lt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function xt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function At(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = xt(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function It(e) {
  return { onKeyDown: Y(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Lt));
      At(t, e.current, r);
    },
    [e]
  ) };
}
function X1(e, a = !0) {
  A(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const an = { ArrowUp: -1, ArrowDown: 1 }, nn = { ArrowLeft: -1, ArrowRight: 1 }, Mt = (e, a, t) => Math.min(t, Math.max(a, e));
function qt(e, a) {
  if (a !== "horizontal" && e in an) return an[e];
  if (a !== "vertical" && e in nn) return nn[e];
}
function va({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = N(/* @__PURE__ */ new Map()), l = N(!1);
  Fa(() => {
    var b;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const h = u[0], f = l.current;
    l.current = !1, t(h), f && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = Y((u) => t(u), []), s = Y((u) => {
    var h;
    t(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = Y(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const f = Math.max(0, h.indexOf(a)), b = qt(u.key, e);
      b !== void 0 ? (u.preventDefault(), s(h[Mt(f + b, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [a, s, e]
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
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: i };
}
const J1 = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, Q1 = "0.2.0", Z1 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Bt = [1, 2, 3, 4, 5, 6], Pt = [1, 2, 3], Ot = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
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
}, we = {
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
  return Bt.includes(e);
}
function pa(e) {
  return Pt.includes(e);
}
function e$(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function a$(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Dt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function jt(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return Dt[e];
}
function tn(e) {
  return typeof e != "string" ? null : Ot.includes(e) ? e : null;
}
function Ht(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Ft(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Wt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function zt(e, a, t) {
  const r = Ht(e);
  if (r === null) return null;
  const l = tn(t) ?? tn(r.type);
  return l === null ? null : { ...r, type: l, id: Ft(r, a), at: Wt(r) };
}
function Gt(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Ut(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function n$(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), s = N(/* @__PURE__ */ new Map()), c = N(0), d = N(""), u = N(0), h = N(null), f = N(0), b = N(0), g = N(!1), I = N("reconnecting"), j = Y((C) => {
    I.current = C, r(C);
  }, []), oe = Y(() => {
    c.current = Date.now();
  }, []), $e = Y((C) => {
    for (const [z, fe] of s.current)
      (fe === "*" || C.itemKey === fe) && z(C);
  }, []), ae = Y(() => {
    h.current = a(e, { lastEventId: d.current }, {
      onEvent: (C, z, fe) => {
        const xe = zt(C, z, fe);
        xe !== null && (xe.id && (d.current = xe.id), oe(), g.current = !1, j("live"), i(xe.at), $e(xe));
      },
      onOpen: () => {
        u.current = 0, g.current = !1, oe(), j("live");
      },
      onError: () => {
        var z;
        (z = h.current) == null || z.close(), h.current = null, g.current = !0, I.current !== "stale" && j("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, f.current = window.setTimeout(ae, C);
      }
    });
  }, [$e, j, oe, a, e]), De = Y((C) => {
    g.current = !0, C.close(), h.current = null, f.current = window.setTimeout(ae, we.reconnectBase);
  }, [ae]), je = Y((C, z) => (s.current.set(z, C), () => {
    s.current.delete(z);
  }), []);
  return A(() => (ae(), b.current = window.setInterval(() => {
    const C = Date.now() - c.current, z = Gt(C, I.current);
    z && j(z);
    const fe = h.current;
    Ut(C, g.current, fe) && De(fe);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(f.current), g.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [ae, De, j]), { connection: t, lastEventAt: l, subscribe: je };
}
function za(e, a) {
  const t = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return A(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const s = window.setInterval(i, we.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [a, t]), Math.max(0, r - t);
}
function Kt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function rn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function la(e, a) {
  const t = N(0), r = Y((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Kt() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), s.style.setProperty("--flash", `var(--ward-color-${i})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => rn(s), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => rn(s), we.flash)));
  }, [a, e]);
  return A(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Vt = "_root_1otpc_2", Yt = {
  root: Vt
};
function Xt(e, a, t, r, l) {
  const i = [Wa(a)];
  return e || i.push(`as of ${Tt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function ke({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = za(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Xt(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Yt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ce(e)
    ] })
  ] });
}
const Jt = "_app_lu0b1_1", Qt = "_side_lu0b1_18", Zt = "_main_lu0b1_26", er = "_rail_lu0b1_33", ar = "_page_lu0b1_40", nr = "_root_lu0b1_91", tr = "_topbar_lu0b1_98", rr = "_mark_lu0b1_109", lr = "_brand_lu0b1_116", or = "_tagline_lu0b1_122", ir = "_identity_lu0b1_128", sr = "_tools_lu0b1_129", cr = "_metadata_lu0b1_138", dr = "_actor_lu0b1_153", ur = "_detail_lu0b1_154", hr = "_nav_lu0b1_159", mr = "_content_lu0b1_194", wr = "_toolsPanel_lu0b1_207", _r = "_skip_lu0b1_233", M = {
  app: Jt,
  side: Qt,
  main: Zt,
  rail: er,
  page: ar,
  root: nr,
  topbar: tr,
  mark: rr,
  brand: lr,
  tagline: or,
  identity: ir,
  tools: sr,
  metadata: cr,
  actor: dr,
  detail: ur,
  nav: hr,
  content: mr,
  toolsPanel: wr,
  skip: _r
}, fr = "_btn_j72f1_2", vr = "_primary_j72f1_13", br = "_destructive_j72f1_24", pr = "_secondary_j72f1_34", gr = "_ghost_j72f1_39", Nr = "_overflow_j72f1_48", yr = "_sm_j72f1_55", kr = "_disabled_j72f1_59", aa = {
  btn: fr,
  primary: vr,
  destructive: br,
  secondary: pr,
  ghost: gr,
  overflow: Nr,
  sm: yr,
  disabled: kr
};
function $r(e, a, t, r) {
  const l = a === "sm" ? [aa.sm, "ward-btn--sm"] : [], i = t ? [aa.disabled] : [];
  return [aa.btn, aa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Cr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Sr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Rr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Tr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Er(e, a, t) {
  return Tr(e.describedBy, a && t);
}
function Lr({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function xr(e) {
  return e.children ?? e.label;
}
function _(e) {
  Sr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = Rr(e), i = $();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: $r(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": Er(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Cr(a, e.controls),
        children: xr(e)
      }
    ),
    /* @__PURE__ */ n(Lr, { id: i, reason: l })
  ] });
}
const Ar = /^([a-z][a-z0-9+.-]*):/i, Ir = /* @__PURE__ */ new Set(["http", "https"]), Mr = "#";
function qr(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Ar.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = qr(e);
  return a === void 0 || Ir.has(a) ? e : Mr;
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
    const l = (s) => t(s.matches);
    return r.addEventListener("change", l), t(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function Br({ sidebar: e, header: a, children: t, rail: r }) {
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
function Pr({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: M.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: W(t.href), "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function Ia({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Or({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(Ia, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Ia, { value: a, className: M.detail })
  ] });
}
function Dr() {
  const e = Ga("(max-width: 767.98px)"), a = $(), t = N(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function jr({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: M.tools, children: /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: M.tools, children: e });
}
function Hr({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function Fr(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ n("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Ia, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ n(Pr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(Or, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(jr, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Wr(e) {
  const a = $(), t = Dr();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Fr, { ...e, menu: t }),
    /* @__PURE__ */ n(Hr, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function zr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function t$(e) {
  return zr(e) ? /* @__PURE__ */ n(Br, { ...e }) : /* @__PURE__ */ n(Wr, { ...e });
}
function Ua(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Gr = "_root_o4yib_2", Ur = "_row_o4yib_8", Kr = "_box_o4yib_14", Vr = "_label_o4yib_21", Yr = "_lockedNote_o4yib_26", Xr = "_consequence_o4yib_34", Jr = "_sample_o4yib_69", Me = {
  root: Gr,
  row: Ur,
  box: Kr,
  label: Vr,
  lockedNote: Yr,
  consequence: Xr,
  sample: Jr
};
function Qr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Zr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Me.consequence} ward-check-consequence`, children: a }) : null;
}
function el({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Me.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function al({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Me.sample, "aria-hidden": "true", children: e }) : null;
}
function En(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = Qr(e);
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
        /* @__PURE__ */ n(el, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(al, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Zr, { id: t, text: e.consequence })
  ] });
}
const nl = "_chip_1073r_2", tl = {
  chip: nl
}, rl = {
  gate: G.chip.gate,
  system: G.chip.system,
  write: G.chip.write,
  drift: G.chip.drift,
  done: G.chip.done,
  attention: G.chip.attention,
  failed: G.chip.failed,
  pending: G.chip.pending,
  running: G.chip.running,
  warn: G.chip.warn,
  meta: G.chip.meta,
  soft: G.chip.soft,
  quiet: G.chip.quiet
};
function ll(e, a) {
  if (e === "stream") return ol(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = rl[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function ol(e) {
  if (!e || !pa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Tn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${tl.chip} ward-chip ward-chip--${e}`, style: ll(e, t), "data-ward-chip": e, "data-size": r, children: a });
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
const il = "_nav_j90m2_2", sl = "_list_j90m2_8", cl = "_item_j90m2_15", dl = "_link_j90m2_30", ul = "_sep_j90m2_40", hl = "_current_j90m2_44", ml = "_chips_j90m2_48", Ae = {
  nav: il,
  list: sl,
  item: cl,
  link: dl,
  sep: ul,
  current: hl,
  chips: ml
};
function wl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ae.nav, children: [
    /* @__PURE__ */ n("ol", { className: Ae.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: Ae.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Ae.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${Ae.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Ae.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Ae.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const _l = "_field_fy549_2", fl = "_label_fy549_8", vl = "_labelHidden_fy549_15", bl = "_control_fy549_25", pl = "_mono_fy549_44", gl = "_area_fy549_49", Nl = "_invalid_fy549_56", Te = {
  field: _l,
  label: fl,
  labelHidden: vl,
  control: bl,
  mono: pl,
  area: gl,
  invalid: Nl
}, yl = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function kl({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? yl : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function $l({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Cl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Sl = { input: kl, select: $l, textarea: Cl };
function Rl(e, a, t) {
  const r = Sl[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Tl(e, a, t) {
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
function El(e) {
  const a = e.mono ? [Te.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Te.area] : [];
  return [Te.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Ll(e) {
  return e ? `${Te.label} ${Te.labelHidden} ward-field-label` : `${Te.label} ward-field-label`;
}
function x(e) {
  const a = $(), t = `${a}-msg`, r = Tl(e, a, t), l = El(e);
  return /* @__PURE__ */ o("div", { className: `${Te.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Ll(e.labelHidden), htmlFor: a, children: e.label }),
    Rl(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Te.invalid} ward-field-error`, children: e.invalid })
  ] });
}
function xl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Ln(e) {
  const a = xl(e);
  e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end);
}
function xn(e, a) {
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
const Al = "_strip_tivso_2", Il = "_tab_tivso_26", Ml = "_count_tivso_49", Ma = {
  strip: Al,
  tab: Il,
  count: Ml
}, ln = 7;
function ql(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Bl(e) {
  return `${Ma.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function Pl(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Ol(e, a) {
  Fa(() => {
    const t = e.current, r = t == null ? void 0 : t.querySelectorAll('[role="tab"]')[a];
    if (!t || !r) return;
    const l = Pl(t, r);
    l !== null && (t.scrollLeft = Math.max(0, l)), Ln(t);
  }, [e, a]);
}
function r$({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ln) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ln} — the set is fixed`);
  const i = va({ orientation: "horizontal" }), s = ql(e, a);
  A(() => i.setActive(s), [i.setActive, s]);
  const c = N(null);
  return xn(c, e.length), Ol(c, s), /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      className: Bl(l),
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
const Dl = "_root_jem6y_2", jl = "_segment_jem6y_7", on = {
  root: Dl,
  segment: jl
};
function An({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = va({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return A(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${on.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: on.segment,
      "aria-checked": d.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => t(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Hl = "_sidebar_1jywv_3", Fl = "_brand_1jywv_9", Wl = "_mark_1jywv_17", zl = "_word_1jywv_24", Gl = "_nav_1jywv_30", Ul = "_navItem_1jywv_38", Kl = "_group_1jywv_50", Vl = "_groupName_1jywv_57", Yl = "_agents_1jywv_70", Xl = "_agent_1jywv_70", Jl = "_agentTop_1jywv_88", Ql = "_dot_1jywv_95", Zl = "_agentName_1jywv_107", eo = "_agentMeta_1jywv_120", ao = "_foot_1jywv_126", no = "_footName_1jywv_132", to = "_footLinks_1jywv_139", ro = "_footLink_1jywv_139", lo = "_root_1jywv_153", oo = "_linkBrand_1jywv_162", io = "_label_1jywv_183", so = "_note_1jywv_188", co = "_footer_1jywv_202", R = {
  sidebar: Hl,
  brand: Fl,
  mark: Wl,
  word: zl,
  nav: Gl,
  navItem: Ul,
  group: Kl,
  groupName: Vl,
  new: "_new_1jywv_64",
  agents: Yl,
  agent: Xl,
  agentTop: Jl,
  dot: Ql,
  agentName: Zl,
  agentMeta: eo,
  foot: ao,
  footName: no,
  footLinks: to,
  footLink: ro,
  root: lo,
  linkBrand: oo,
  label: io,
  note: so,
  footer: co
};
function uo({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: R.agent,
      href: W(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: R.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: R.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": Tn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: R.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: R.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function ho({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: R.foot, children: [
    /* @__PURE__ */ n("span", { className: R.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: R.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: R.footLink, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function mo({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: R.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: R.brand, children: [
      /* @__PURE__ */ n("span", { className: R.mark }),
      /* @__PURE__ */ n("span", { className: R.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: R.nav, children: a.map((s) => /* @__PURE__ */ n("a", { className: R.navItem, href: W(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: R.group, children: [
      /* @__PURE__ */ o("span", { className: R.groupName, children: [
        t,
        " · ",
        ee(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: R.new, href: W(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: R.agents, children: r.map((s) => /* @__PURE__ */ n(uo, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(ho, { shared: i })
  ] });
}
function wo(e) {
  return e.destinations ?? e.items ?? [];
}
function _o({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.linkBrand, children: e });
}
function fo({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.footer, children: e });
}
function vo({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: R.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: R.note, children: e.note })
  ] });
}
function bo(e) {
  return /* @__PURE__ */ o("aside", { className: `${R.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(_o, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: wo(e).map((a) => /* @__PURE__ */ n(vo, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(fo, { children: e.children })
  ] });
}
function po(e) {
  return "agents" in e;
}
function l$(e) {
  return po(e) ? /* @__PURE__ */ n(mo, { ...e }) : /* @__PURE__ */ n(bo, { ...e });
}
const go = "_mark_wlgi8_3", No = {
  mark: go
}, yo = { met: "✓", unmet: "", failed: "✕" };
function Ka({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: No.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: yo[e]
    }
  );
}
const ko = "_marker_br9fi_2", $o = {
  marker: ko
}, Co = {
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
function Le({ size: e, kind: a, label: t }) {
  const r = { "--marker": Co[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${$o.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const So = "_root_ti0pq_2", Ro = "_chip_ti0pq_11", To = "_noCase_ti0pq_23", na = {
  root: So,
  chip: Ro,
  noCase: To
};
function Eo(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Va({ connection: e, since: a, lastEventAt: t }) {
  const r = Eo(a, t), l = za(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${na.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Le, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: na.noCase, children: Wa(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ce(r)
  ] });
}
const Lo = "_root_k8vuh_2", xo = "_context_k8vuh_12", Ao = "_row_k8vuh_1", Io = "_heading_k8vuh_25", Mo = "_headingWrap_k8vuh_33", qo = "_chips_k8vuh_38", Bo = "_title_k8vuh_45", Po = "_consequence_k8vuh_54", Oo = "_actionsWrap_k8vuh_59", Do = "_actions_k8vuh_59", jo = "_action_k8vuh_59", Ho = "_overflowPanel_k8vuh_78", Fo = "_measureClip_k8vuh_89", Wo = "_measure_k8vuh_89", Q = {
  root: Lo,
  context: xo,
  row: Ao,
  heading: Io,
  headingWrap: Mo,
  chips: qo,
  title: Bo,
  consequence: Po,
  actionsWrap: Oo,
  actions: Do,
  action: jo,
  overflowPanel: Ho,
  measureClip: Fo,
  measure: Wo
};
function zo({ title: e, consequence: a, consequenceHint: t }) {
  return /* @__PURE__ */ o("div", { className: Q.heading, children: [
    /* @__PURE__ */ n("h1", { className: Q.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: Q.consequence, title: t, children: a })
  ] });
}
function qa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: Q.action, "data-action": "", children: a }, t));
}
function sn({ disclosure: e }) {
  return /* @__PURE__ */ n(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Go({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(sn, { disclosure: l }) : a ? [/* @__PURE__ */ n(sn, { disclosure: l }, "more"), /* @__PURE__ */ n(qa, { actions: e }, "actions")] : /* @__PURE__ */ n(qa, { actions: e });
}
function Uo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Ko({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Q.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(qa, { actions: e }) });
}
function Vo(e, a) {
  const t = $(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Yo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Q.context, children: [
    /* @__PURE__ */ n(wl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Q.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function Xo(...e) {
  return e.some((a) => a === null);
}
function Jo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Qo(e, a, t, r, l) {
  if (l === 0 || Xo(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], d = Jo(e), u = Math.max(0, e.clientWidth - i.offsetWidth - d);
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function Zo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function ei(e) {
  const a = N(null), t = N(null), r = N(null), l = N(null), [i, s] = p(!1);
  return A(() => {
    const c = a.current;
    if (!Zo(c)) return;
    const d = () => s(Qo(c, t.current, r.current, l.current, e.length)), u = new ResizeObserver(d);
    return u.observe(c), d(), () => u.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function ai({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: Q.measureClip, children: /* @__PURE__ */ o("div", { className: Q.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function ni({ connection: e }) {
  return e ? /* @__PURE__ */ n(Va, { connection: e.connection, since: e.since }) : null;
}
function o$({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: h, headingRef: f, actionsRef: b, measureRef: g, collapsed: I } = ei(i), j = s.length > 0, { disclosure: oe, close: $e } = Vo(I || j, b), ae = Uo(s, i, I, d);
  return /* @__PURE__ */ o("header", { className: Q.root, "data-density": u, children: [
    /* @__PURE__ */ n(Yo, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Q.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: f, className: Q.headingWrap, children: /* @__PURE__ */ n(zo, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: Q.actionsWrap, children: [
        /* @__PURE__ */ n(ni, { connection: c }),
        /* @__PURE__ */ n("div", { className: Q.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(Go, { actions: i, hasMore: j, collapsed: I, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Ko, { actions: ae, disclosure: oe, onEscape: $e }),
    /* @__PURE__ */ n(ai, { actions: i, hasMore: j, measureRef: g })
  ] });
}
const ti = "_scrim_c7sqj_2", ri = "_drawer_c7sqj_10", li = "_sheet_c7sqj_14", oi = "_modal_c7sqj_18", ii = "_panel_c7sqj_23", si = "_header_c7sqj_51", ci = "_title_c7sqj_59", di = "_body_c7sqj_63", ui = "_close_c7sqj_90", Ne = {
  scrim: ti,
  drawer: ri,
  sheet: li,
  modal: oi,
  panel: ii,
  header: si,
  title: ci,
  body: di,
  close: ui
}, hi = Ve(null), ca = [], da = /* @__PURE__ */ new Map();
function mi(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function wi(e, a) {
  let t = da.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, da.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function _i(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !mi(r) && wi(e, r);
}
function fi(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (_i(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function vi(e) {
  for (const a of e.claims) {
    const t = da.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), da.delete(a)));
  }
}
function bi(e, a) {
  const t = { root: e, claims: [] };
  return ca.push(t), fi(t, a), t;
}
function pi(e) {
  const a = ca.indexOf(e);
  a >= 0 && ca.splice(a, 1), vi(e);
}
function cn(e) {
  return e !== null && ca.at(-1) === e;
}
function gi(e, a, t) {
  const r = N(null), l = N(t);
  return l.current = t, A(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = bi(i, a);
    return r.current = c, () => {
      var u, h;
      const d = cn(c);
      pi(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [a]), Y(() => cn(r.current), []);
}
function Ni(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function yi(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function ki({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${Ne.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ne.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, children: e.children })
  ] });
}
function $i(e) {
  return `${Ne.scrim} ${Ne[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Ci(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ne.panel} ${Ne[e]} ward-overlay-panel${t}${r}`;
}
function Si(e) {
  const a = Ke(hi);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = N(null), t = N(null), r = $(), l = Si(e.container), i = Ga("(min-width: 768px)"), s = Ni(e.kind, i), c = yi(e, r), d = It(t), u = gi(a, l, e.returnFocusTo), h = Y(() => {
    u() && e.onClose();
  }, [e.onClose, u]);
  return A(() => {
    var f, b;
    u() && ((b = (f = t.current) == null ? void 0 : f.querySelector("button")) == null || b.focus());
  }, [u]), A(() => {
    const f = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [h]), Ct(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: $i(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: h,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c.labelledBy,
            "aria-label": c.label,
            className: Ci(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => u() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ne.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(ki, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Ri = "_root_drrhx_2", Ti = "_ticket_drrhx_15", Ei = "_body_drrhx_24", Sa = {
  root: Ri,
  ticket: Ti,
  body: Ei
};
function i$({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Sa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Sa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Sa.body, children: t })
  ] });
}
const Li = "_root_bf1pc_2", xi = "_table_bf1pc_9", Ai = "_caption_bf1pc_14", Ii = "_series_bf1pc_23", Mi = "_category_bf1pc_31", qi = "_cell_bf1pc_39", Bi = "_track_bf1pc_45", Pi = "_lane_bf1pc_52", Oi = "_bar_bf1pc_56", Di = "_value_bf1pc_63", ji = "_swatch_bf1pc_70", Hi = "_empty_bf1pc_78", V = {
  root: Li,
  table: xi,
  caption: Ai,
  series: Ii,
  category: Mi,
  cell: qi,
  track: Bi,
  lane: Pi,
  bar: Oi,
  value: Di,
  swatch: ji,
  empty: Hi
}, Fi = "—", dn = 6;
function Wi(e, a) {
  if (a.length < 1 || a.length > dn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${dn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function zi(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function In(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Gi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Ui({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Gi(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ o("span", { className: V.track, children: [
    /* @__PURE__ */ n("span", { className: V.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${V.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: V.value, children: e === null ? l : r(e) })
  ] }) });
}
function Ki({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: V.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: V.swatch, "data-step": In(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Vi({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${V.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: V.caption, children: e }),
    /* @__PURE__ */ n("p", { className: V.empty, children: a })
  ] });
}
function Yi({ title: e, categories: a, series: t, top: r, format: l = ee, categoryHead: i = "Category", missing: s = Fi }) {
  return /* @__PURE__ */ n("div", { className: `${V.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: V.table, children: [
    /* @__PURE__ */ n("caption", { className: V.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: V.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Ki, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: V.category, children: c }),
      t.map((u, h) => /* @__PURE__ */ n(Ui, { value: u.values[d], top: r, step: In(h, t.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function s$(e) {
  Wi(e.categories, e.series);
  const a = zi(e.series);
  return a === 0 ? /* @__PURE__ */ n(Vi, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Yi, { ...e, top: a });
}
const Xi = "_root_1bfqw_2", Ji = "_figure_1bfqw_7", Qi = "_of_1bfqw_13", Zi = "_bar_1bfqw_18", es = "_rows_1bfqw_38", as = "_row_1bfqw_38", ns = "_label_1bfqw_49", ts = "_amount_1bfqw_54", Ce = {
  root: Xi,
  figure: Ji,
  of: Qi,
  bar: Zi,
  rows: es,
  row: as,
  label: ns,
  amount: ts
};
function rs({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ce.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ce.figure} ward-stat-value`, children: [
      te(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ce.of, children: [
        "of ",
        te(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Ce.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${te(e)} of ${te(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: Ce.rows, children: t.map((l) => /* @__PURE__ */ o("li", { className: `${Ce.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ce.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Ce.amount, children: te(l.amount) })
    ] }, l.label)) })
  ] });
}
const ls = "_frame_mg2jl_2", os = "_table_mg2jl_6", is = "_th_mg2jl_12", ss = "_td_mg2jl_13", cs = "_sort_mg2jl_47", ds = "_row_mg2jl_53", us = "_empty_mg2jl_61", Re = {
  frame: ls,
  table: os,
  th: is,
  td: ss,
  sort: cs,
  row: ds,
  empty: us
}, hs = { asc: "ascending", desc: "descending" };
function ms(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return hs[a.direction];
}
function ws(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function _s(e) {
  return e === void 0 ? void 0 : { width: e };
}
function fs({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: _s(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ms(e, a),
      children: ws(e, t)
    }
  );
}
function vs({ row: e, props: a }) {
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
function bs({
  label: e,
  columns: a,
  rows: t,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u
}) {
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: Re.empty, children: u }) : /* @__PURE__ */ n("div", { className: Re.frame, children: /* @__PURE__ */ o("table", { className: Re.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(fs, { column: h, sort: c, onSort: d }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(vs, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(h))) })
  ] }) });
}
const ps = "_list_v0s52_2", gs = {
  list: ps
};
function c$({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: gs.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Ns = "_label_1u62a_2", ys = {
  label: Ns
};
function d$({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: ys.label, children: a.header }) }, a.key)) }) });
}
const ks = "_stack_bp6a0_2", $s = {
  stack: ks
};
function u$({ children: e }) {
  return /* @__PURE__ */ n("span", { className: $s.stack, "data-ward-action-stack": "", children: e });
}
const Cs = "_set_y5zy3_2", Ss = "_legend_y5zy3_7", Rs = "_row_y5zy3_15", Ts = "_control_y5zy3_20", Es = "_input_y5zy3_26", Ls = "_label_y5zy3_31", xs = "_consequence_y5zy3_36", Ie = {
  set: Cs,
  legend: Ss,
  row: Rs,
  control: Ts,
  input: Es,
  label: Ls,
  consequence: xs
};
function Mn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = $(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: Ie.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ie.legend, children: e }),
    a.map((h) => {
      const f = `${u}-${h.value}`, b = h.consequence ? `${f}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Ie.row, children: [
        /* @__PURE__ */ o("span", { className: Ie.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: f,
              type: "radio",
              name: u,
              className: Ie.input,
              value: h.value,
              checked: t === h.value,
              disabled: l,
              "aria-describedby": Ua(b, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: f, className: Ie.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Ie.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const As = "_root_1pyf1_2", Is = "_head_1pyf1_11", Ms = "_index_1pyf1_31", qs = "_dot_1pyf1_35", Bs = "_note_1pyf1_40", Ps = "_counter_1pyf1_46", Os = "_trailing_1pyf1_54", qe = {
  root: As,
  head: Is,
  index: Ms,
  dot: qs,
  note: Bs,
  counter: Ps,
  trailing: Os
};
function Ds({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${qe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: qe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function js({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.counter, "aria-hidden": "true", children: e }) : null;
}
function un({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: qe.head, children: [
      /* @__PURE__ */ n(Ds, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: qe.note, children: t }),
    /* @__PURE__ */ n(js, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: qe.trailing, children: i })
  ] });
}
const Hs = "_strip_1cfs3_2", Fs = "_cell_1cfs3_7", Ws = "_value_1cfs3_12", zs = "_link_1cfs3_27", Gs = "_label_1cfs3_39", Xe = {
  strip: Hs,
  cell: Fs,
  value: Ws,
  link: zs,
  label: Gs
};
function Us(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function Ks({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(S, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Xe.link} ward-stat-link`, href: W(e.href), "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function ya({ cells: e, divided: a = !1 }) {
  return Us(e), /* @__PURE__ */ n("dl", { className: `${Xe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Xe.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Xe.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, title: t.hint, children: /* @__PURE__ */ n(Ks, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Xe.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Vs = "_root_xk7sv_2", Ys = "_track_xk7sv_8", Xs = "_thumb_xk7sv_35", Js = "_labelHidden_xk7sv_53", Qs = "_label_xk7sv_53", Zs = "_lockedNote_xk7sv_68", Be = {
  root: Vs,
  track: Ys,
  thumb: Xs,
  labelHidden: Js,
  label: Qs,
  lockedNote: Zs
};
function ec(e) {
  return e ? `${Be.label} ${Be.labelHidden}` : Be.label;
}
function Oe({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = $(), d = l ? !0 : a, u = r || l;
  return /* @__PURE__ */ o("span", { className: `${Be.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": d,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": i,
        className: `${Be.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: u,
        onClick: () => !u && (t == null ? void 0 : t(!d)),
        children: /* @__PURE__ */ n("span", { className: Be.thumb })
      }
    ),
    /* @__PURE__ */ o("span", { id: c, className: ec(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const ac = "_bar_1u2kl_2", nc = "_skip_1u2kl_11", tc = "_mark_1u2kl_22", rc = "_nav_1u2kl_30", lc = "_list_1u2kl_34", oc = "_select_1u2kl_40", ic = "_dest_1u2kl_47", sc = "_actor_1u2kl_61", cc = "_actorMark_1u2kl_74", dc = "_actorLabel_1u2kl_79", uc = "_tagline_1u2kl_98", de = {
  bar: ac,
  skip: nc,
  mark: tc,
  nav: rc,
  list: lc,
  select: oc,
  dest: ic,
  actor: sc,
  actorMark: cc,
  actorLabel: dc,
  tagline: uc
};
function hc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function mc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function h$({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = mc(r);
  return /* @__PURE__ */ o("header", { className: de.bar, children: [
    /* @__PURE__ */ n("a", { className: de.skip, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: de.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: de.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: de.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: de.list, children: a.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: de.dest,
          href: W(d.href),
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
    c && /* @__PURE__ */ o("span", { className: de.actor, children: [
      /* @__PURE__ */ n("span", { className: de.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: de.actorMark, "aria-hidden": "true", children: hc(c) })
    ] })
  ] });
}
const wc = "_tree_1lyby_2", _c = "_item_1lyby_6", fc = "_row_1lyby_10", vc = "_button_1lyby_22", ua = {
  tree: wc,
  item: _c,
  row: fc,
  button: vc
}, qn = Ve(null);
function bc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = va({ orientation: "vertical" });
  return /* @__PURE__ */ n(qn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ua.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const pc = { ArrowRight: !0, ArrowLeft: !1 };
function hn(e) {
  return e ? !0 : void 0;
}
function gc(e, a) {
  const t = pc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Nc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function yc(e) {
  const a = [ua.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function kc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function $c(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Cc(e) {
  return typeof e == "string" ? e : void 0;
}
function Sc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Rc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Bn(e) {
  const a = Ke(qn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = kc(e);
  return /* @__PURE__ */ o("li", { className: ua.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: yc(e),
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
            onClick: () => Nc(e),
            onKeyDown: (r) => gc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: $c(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Cc(e.label), children: e.label }),
              /* @__PURE__ */ n(Sc, { value: e.detail }),
              /* @__PURE__ */ n(Rc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Tc = "_frame_1tok6_2", Ec = "_subjectRail_1tok6_21", Lc = "_subject_1tok6_21", xc = "_rail_1tok6_41", Ac = "_record_1tok6_63", Ic = "_recordBody_1tok6_68", Mc = "_stageGrid_1tok6_117", qc = "_band_1tok6_143", Bc = "_bandBody_1tok6_152", Pc = "_bandActions_1tok6_157", Oc = "_scroller_1tok6_165", Dc = "_lanes_1tok6_183", le = {
  frame: Tc,
  subjectRail: Ec,
  subject: Lc,
  rail: xc,
  record: Ac,
  recordBody: Ic,
  stageGrid: Mc,
  band: qc,
  bandBody: Bc,
  bandActions: Pc,
  scroller: Oc,
  lanes: Dc
};
function m$({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: le.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function mn(e) {
  return e ? "true" : void 0;
}
function w$({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: le.subjectRail, "data-ward-subject-rail": t, "data-ruled": mn(i), children: [
    /* @__PURE__ */ n("div", { className: le.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: le.rail, "data-sticky": mn(l), "aria-label": r, children: a })
  ] });
}
function _$({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: le.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(un, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: le.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(un, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: le.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const jc = "_form_1j8ub_2", Hc = "_fields_1j8ub_9", Fc = "_actions_1j8ub_19", Ra = {
  form: jc,
  fields: Hc,
  actions: Fc
};
function f$({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ra.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ra.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ra.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function v$({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: le.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: le.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: le.bandActions, children: a })
  ] });
}
const Wc = "(max-width: 767.98px)";
function Ba({ label: e, children: a, laneCount: t }) {
  const r = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { className: le.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: r, children: a });
}
function zc({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: le.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(x, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Ba, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function b$({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Ga(Wc);
  return t === void 0 ? /* @__PURE__ */ n(Ba, { label: a, children: e }) : l ? /* @__PURE__ */ n(zc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Ba, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n($t, { children: i.content }, i.id)) });
}
function p$({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = N(null), i = Math.max(e, 1);
  xn(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: le.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const Gc = "_block_1o5o7_2", Uc = "_sentence_1o5o7_15", Kc = "_meta_1o5o7_20", Vc = "_action_1o5o7_25", Yc = "_strip_1o5o7_29", Xc = "_loading_1o5o7_48", Jc = "_label_1o5o7_56", Qc = "_counter_1o5o7_63", _e = {
  block: Gc,
  sentence: Uc,
  meta: Kc,
  action: Vc,
  strip: Yc,
  loading: Xc,
  label: Jc,
  counter: Qc
};
function Zc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(_, { onClick: e.onClick, children: e.label }) });
}
function ka({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: _e.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Zc, { action: a })
  ] });
}
function ed(e) {
  return /* @__PURE__ */ n(ka, { ...e, kind: "ward-emptystate" });
}
function g$({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ka, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function N$(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function y$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ka, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    ce(a)
  ] }) });
}
function k$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ce(e),
    ". Showing snapshot from ",
    ce(a)
  ] });
}
function $$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ce(a)
  ] });
}
function C$({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  A(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = za(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: Wa(i) }) : null
  ] });
}
const ad = "_note_tlubt_2", nd = {
  note: ad
};
function td({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: nd.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const rd = "_card_12in3_2", ld = "_hit_12in3_23", od = "_head_12in3_30", id = "_title_12in3_36", sd = "_meta_12in3_44", cd = "_fields_12in3_45", dd = "_who_12in3_58", ud = "_sep_12in3_65", hd = "_mono_12in3_69", md = "_field_12in3_45", wd = "_last_12in3_84", _d = "_reason_12in3_96", X = {
  card: rd,
  hit: ld,
  head: od,
  title: id,
  meta: sd,
  fields: cd,
  who: dd,
  sep: ud,
  mono: hd,
  field: md,
  last: wd,
  reason: _d
}, fd = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function vd(e, a, t) {
  const r = la(e, "blue"), l = la(e, "orange"), i = la(e, "green"), s = N(/* @__PURE__ */ new Set());
  A(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = fd[d.type];
      u && c[u]();
    });
  }, [r, t, i, a, l]);
}
const bd = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : te(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function pd(e, a) {
  return bd[a](e);
}
function gd({ item: e, connection: a }) {
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
      se(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Nd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: X.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function yd({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: X.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function kd({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: X.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: X.field, children: pd(e, t) }, t)) });
}
const Pa = (e) => e ? !0 : void 0;
function $d(e) {
  return { "--stream": Ee(e.streamStep, "id") };
}
function Cd(e, a, t) {
  e == null || e(a, t);
}
function Sd(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Rd({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: X.last, "data-stale": Pa(a), children: t }) : null;
}
function $a(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  vd(r, t.key, e.feed);
  const l = Sd(e.feed), i = $d(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: X.hit, onClick: (s) => Cd(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Nd, { item: t }),
        /* @__PURE__ */ n("p", { className: X.title, children: t.title }),
        /* @__PURE__ */ n(gd, { item: t, connection: l }),
        /* @__PURE__ */ n(yd, { reason: t.blockedReason }),
        /* @__PURE__ */ n(kd, { item: t, fields: a }),
        /* @__PURE__ */ n(Rd, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const Td = "_column_10sxg_3", Ed = "_head_10sxg_24", Ld = "_label_10sxg_33", xd = "_count_10sxg_42", Ad = "_list_10sxg_56", Je = {
  column: Td,
  head: Ed,
  label: Ld,
  count: xd,
  list: Ad
};
function Pn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Id({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Md(e) {
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
function qd({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = $(), h = e.cap !== void 0 && a.length > e.cap, f = Pn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Id, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ n(Md, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: f }),
    h && /* @__PURE__ */ n(td, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Bd = "_foot_8qg4p_2", Pd = "_note_8qg4p_13", Od = "_link_8qg4p_19", Ta = {
  foot: Bd,
  note: Pd,
  link: Od
};
function S$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ta.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ta.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Ta.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Dd = "_head_1la6p_3", jd = "_identity_1la6p_12", Hd = "_titleRow_1la6p_18", Fd = "_title_1la6p_18", Wd = "_key_1la6p_35", zd = "_rollup_1la6p_45", Gd = "_tools_1la6p_53", Ud = "_swatch_1la6p_62", Kd = "_mark_1la6p_69", pe = {
  head: Dd,
  identity: jd,
  titleRow: Hd,
  title: Fd,
  key: Wd,
  rollup: zd,
  tools: Gd,
  swatch: Ud,
  mark: Kd
}, wn = "initials:";
function Vd(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function Yd(e) {
  const a = [Vd(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function Xd(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Yd(e)
  ] });
}
function Jd(e) {
  return e.startsWith(wn) ? e.slice(wn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Qd({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ee(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${pe.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Jd(e) }) : /* @__PURE__ */ n("span", { className: pe.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Zd({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function R$({
  stream: e,
  rollups: a,
  connection: t,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ o("div", { className: pe.head, children: [
    /* @__PURE__ */ o("div", { className: pe.identity, children: [
      /* @__PURE__ */ o("div", { className: pe.titleRow, children: [
        /* @__PURE__ */ n(Qd, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: pe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: pe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: pe.rollup, "aria-live": "polite", children: Xd(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: pe.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Zd, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(_, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Va, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const eu = "_head_kabyh_11", au = "_line_kabyh_12", nu = "_cHandle_kabyh_33", tu = "_cName_kabyh_38", ru = "_nameLine_kabyh_46", lu = "_cLabel_kabyh_53", ou = "_cCap_kabyh_58", iu = "_cShown_kabyh_63", su = "_name_kabyh_46", cu = "_noCap_kabyh_85", du = "_state_kabyh_99", uu = "_handle_kabyh_104", hu = "_sub_kabyh_118", B = {
  head: eu,
  line: au,
  cHandle: nu,
  cName: tu,
  nameLine: ru,
  cLabel: lu,
  cCap: ou,
  cShown: iu,
  name: su,
  noCap: cu,
  state: du,
  handle: uu,
  sub: hu
}, mu = "can't be hidden or collapsed", wu = "terminal · counted, not a column";
function T$() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: B.cHandle }),
    /* @__PURE__ */ n("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: B.cShown, children: "Shown" })
  ] });
}
function _u(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function fu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function _n(e) {
  return e.gate ? mu : e.terminal ? wu : fu(e.agentsMounted);
}
function vu(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function bu({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ n("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    _n(e) && /* @__PURE__ */ n("span", { className: B.sub, children: _n(e) })
  ] });
}
function pu(e) {
  return e === void 0 ? "" : String(e);
}
function gu(e) {
  return e === "" ? void 0 : Number(e);
}
function Nu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: B.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: B.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => vu(t, a),
      children: "⠿"
    }
  ) });
}
function yu({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: B.cCap, children: /* @__PURE__ */ n(x, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: pu(a.cap), onChange: (r) => t({ ...a, cap: gu(r) }) }) });
}
function ku({ stage: e, config: a, onChange: t }) {
  const r = _u(e, a.shown);
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ n(Oe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: B.state, "aria-hidden": "true", children: r.state })
  ] });
}
function $u(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function E$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": $u(e), children: [
    /* @__PURE__ */ n(Nu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(bu, { stage: e }),
    /* @__PURE__ */ n("span", { className: B.cLabel, children: /* @__PURE__ */ n(x, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(yu, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(ku, { stage: e, config: a, onChange: t })
  ] });
}
const Cu = "_body_hn6d6_2", Su = "_head_hn6d6_9", Ru = "_summary_hn6d6_19", Tu = "_block_hn6d6_20", Eu = "_actionsBlock_hn6d6_21", Lu = "_title_hn6d6_41", xu = "_note_hn6d6_46", Au = "_k_hn6d6_51", Iu = "_kv_hn6d6_58", Mu = "_row_hn6d6_64", qu = "_label_hn6d6_75", Bu = "_value_hn6d6_84", Pu = "_quote_hn6d6_90", Ou = "_actions_hn6d6_21", Du = "_resolve_hn6d6_103", P = {
  body: Cu,
  head: Su,
  summary: Ru,
  block: Tu,
  actionsBlock: Eu,
  title: Lu,
  note: xu,
  k: Au,
  kv: Iu,
  row: Mu,
  label: qu,
  value: Bu,
  quote: Pu,
  actions: Ou,
  resolve: Du
};
function ju(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Hu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Fu(e) {
  const a = ga(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Wu(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Na(Fu(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...ju(e),
    ...Hu(e, a)
  ];
}
function zu({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: P.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: P.k, children: a }),
    e
  ] });
}
function Gu({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: P.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Uu({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: P.block, children: [
    /* @__PURE__ */ n("p", { className: P.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: P.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: P.note, children: e.agentMeta })
  ] }) : null;
}
function L$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const d = $(), u = Wu(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: d, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: P.body, children: [
    /* @__PURE__ */ n(Gu, { item: e }),
    /* @__PURE__ */ o("div", { className: P.summary, children: [
      /* @__PURE__ */ n("h2", { className: P.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: P.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: P.kv, children: u.map(([h, f]) => /* @__PURE__ */ o("div", { className: P.row, children: [
      /* @__PURE__ */ n("dt", { className: P.label, children: h }),
      /* @__PURE__ */ n("dd", { className: P.value, children: f })
    ] }, h)) }),
    /* @__PURE__ */ n(Uu, { item: e }),
    /* @__PURE__ */ o("div", { className: P.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: P.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: P.note, children: c })
    ] }),
    /* @__PURE__ */ n(zu, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Ku = "_root_3azmy_2", Vu = "_list_3azmy_7", Yu = "_item_3azmy_12", Xu = "_box_3azmy_18", Ju = "_text_3azmy_23", Qu = "_note_3azmy_28", He = {
  root: Ku,
  list: Vu,
  item: Yu,
  box: Xu,
  text: Ju,
  note: Qu
};
function Ca({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: He.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${He.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${He.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: He.box, children: /* @__PURE__ */ n(Ka, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: He.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${He.note} ward-checklist-note`, children: a })
  ] });
}
const Zu = "_rail_ke7ch_2", eh = "_k_ke7ch_11", ah = "_head_ke7ch_19", nh = "_section_ke7ch_25", th = "_card_ke7ch_38", rh = "_strip_ke7ch_42", lh = "_skeleton_ke7ch_56", oh = "_skeletonLabel_ke7ch_70", ih = "_bar_ke7ch_76", sh = "_note_ke7ch_85", he = {
  rail: Zu,
  k: eh,
  head: ah,
  section: nh,
  card: th,
  strip: rh,
  skeleton: lh,
  skeletonLabel: oh,
  bar: ih,
  note: sh
};
function ch(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ea({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: he.k, children: e }),
    a
  ] });
}
function dh({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function uh({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(qd, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function hh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(uh, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(dh, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function x$(e) {
  const a = ch(e.onOpen), t = Pn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ea, { title: "Card", children: /* @__PURE__ */ n("div", { className: he.card, children: t && /* @__PURE__ */ n($a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ea, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(hh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ea, { title: "Effect of this config", children: /* @__PURE__ */ n(Ca, { items: e.effects, density: "compact" }) })
  ] });
}
function mh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function wh(e) {
  return Math.ceil(e.length / 2);
}
function _h(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function On(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function fh(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = On(e);
  l !== void 0 && t(l), r(_h(e.type));
}
function vh(e, a, t, r, l) {
  A(() => {
    if (e !== null)
      return e.subscribe(a, (i) => fh(i, t, r, l));
  }, [e, a, t, r, l]);
}
function bh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function ph(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function gh(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Nh(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(wh(a ?? [])) + ")"
  };
}
function yh(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function kh(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: te(e.cost) }) : null;
}
function $h(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Ch(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Sh(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Rh(e, a) {
  return a === void 0 ? e : mh(e, a.ref);
}
function Th(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ze(e) {
  return e === !0 ? "true" : void 0;
}
function Dn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = N(null), i = la(l), s = N(/* @__PURE__ */ new Set()), [c, d] = p(bh(a));
  vh(e.feed, a.key, s, d, i);
  const u = ph(a, r), h = gh(a, t), f = Nh(a, e.fields), b = Sh(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Th(e),
      className: "ward-workcard",
      "data-flagged": Ze(a.flagged),
      "data-selected": Ze(e.selected),
      style: f,
      ref: Rh(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        yh(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          kh(a, e.fields),
          $h(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Ch(t, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Eh({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Lh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function xh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Ah(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Eh, { count: e.items.length, cap: e.column.cap });
}
function Ih(e, a) {
  return e.roving ?? a;
}
function Mh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function qh(e, a) {
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
function Bh(e) {
  const a = $(), t = va({ orientation: "vertical" }), r = Ih(e, t), l = Lh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ze(l), "data-gate": Ze(e.column.gate), children: [
    xh(e.column, e.items.length, a),
    Ah(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Mh(e, t), children: qh(e, r) })
  ] });
}
function Ph(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Oh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Dh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function A$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Ph(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Oh(e),
      Dh(e.onConfigure),
      /* @__PURE__ */ n(Va, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function jh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Hh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Oe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Oe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Fh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function I$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ze(jh(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Hh(e) }),
    /* @__PURE__ */ n(x, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(En, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Fh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function M$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Dn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Bh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Wh(e, a) {
  const t = On(e);
  t !== void 0 && a(t);
}
function zh(e, a, t) {
  A(() => {
    if (e != null)
      return e.subscribe(a, (r) => Wh(r, t));
  }, [e, a, t]);
}
function Gh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Uh(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", te(e.cost)]), a;
}
function Kh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Vh(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function q$(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  zh(e.feed, a.key, l);
  const i = [...Gh(a), ...Uh(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Kh(t, r)
    ] }),
    Vh(a, e.actions)
  ] });
}
const Yh = "_card_d2vbe_2", Xh = "_head_d2vbe_22", Jh = "_mark_d2vbe_30", Qh = "_name_d2vbe_42", Zh = "_chips_d2vbe_63", em = "_description_d2vbe_69", am = "_run_d2vbe_74", nm = "_sep_d2vbe_83", tm = "_facts_d2vbe_88", rm = "_fact_d2vbe_88", lm = "_factLabel_d2vbe_101", om = "_factValue_d2vbe_105", re = {
  card: Yh,
  head: Xh,
  mark: Jh,
  name: Qh,
  chips: Zh,
  description: em,
  run: am,
  sep: nm,
  facts: tm,
  fact: rm,
  factLabel: lm,
  factValue: om
}, im = { live: "done", draft: "running", paused: "meta" };
function sm(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function cm({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: im[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function dm({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: re.description, children: e });
}
function um({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function hm({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ n("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function mm(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function wm({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": Ee(e.streamStep, "id") }, d = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: sm(s),
      style: c,
      "data-selected": d,
      "data-paused": mm(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ n("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${re.name} ward-rowlink ward-target`, href: W(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(dm, { description: e.description }),
        /* @__PURE__ */ n(um, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(cm, { versions: e.versions }),
        /* @__PURE__ */ n(hm, { facts: i })
      ]
    }
  );
}
const _m = "_list_4dcyc_2", fm = "_row_4dcyc_11", vm = "_head_4dcyc_23", bm = "_id_4dcyc_30", pm = "_lock_4dcyc_35", gm = "_reason_4dcyc_41", Nm = "_remove_4dcyc_46", ym = "_clauses_4dcyc_50", km = "_clause_4dcyc_50", $m = "_label_4dcyc_64", Cm = "_cell_4dcyc_71", Sm = "_value_4dcyc_76", ie = {
  list: _m,
  row: fm,
  head: vm,
  id: bm,
  lock: pm,
  reason: gm,
  remove: Nm,
  clauses: ym,
  clause: km,
  label: $m,
  cell: Cm,
  value: Sm
}, jn = Ve(!1);
function B$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(jn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function Rm({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(x, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function Tm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ie.reason, children: e })
  ] });
}
function Em({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ n("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Tm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function fn(e, a) {
  return e.locked ? void 0 : a;
}
function P$({ rule: e, onChange: a, onRemove: t }) {
  if (!Ke(jn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = fn(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Em, { rule: e, onRemove: fn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ n("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ie.cell, children: /* @__PURE__ */ n(Rm, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Lm = "_ladder_wwnch_2", xm = "_cell_wwnch_7", Am = "_empty_wwnch_26", Im = "_name_wwnch_34", Mm = "_holder_wwnch_40", qm = "_request_wwnch_46", Bm = "_swatches_wwnch_51", Pm = "_swatch_wwnch_51", Om = "_tilesFrame_wwnch_78", Dm = "_tiles_wwnch_78", jm = "_tile_wwnch_78", Hm = "_bar_wwnch_117", Fm = "_hex_wwnch_128", Wm = "_note_wwnch_138", E = {
  ladder: Lm,
  cell: xm,
  empty: Am,
  name: Im,
  holder: Mm,
  request: qm,
  swatches: Bm,
  swatch: Pm,
  tilesFrame: Om,
  tiles: Dm,
  tile: jm,
  bar: Hm,
  hex: Fm,
  note: Wm
}, zm = "not validated yet, pending a CVD matrix and dark stepping";
function Gm(e) {
  return e.reserved ? "reserved" : pa(e.step) ? "validated" : "partial";
}
function Hn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Um(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Km({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Le, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Vm(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Ym(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const vn = (e) => String(e).padStart(2, "0");
function Xm(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Hn(e, void 0);
}
function Jm({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${vn(e)}` : jt(e) }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: r ? t : `Step ${vn(e)} · ${t}` })
  ] });
}
function Qm({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = Gm(e), s = Hn(i, t), c = s !== "free", d = a === e.step, u = e.name ?? `Step ${e.step}`, h = () => {
    c || r(e.step);
  }, f = `${u} · ${l === "tiles" && d ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": f, ...Ym(c, d), "data-validation": i, style: Um(e, i), onClick: h, onKeyDown: (g) => Vm(g, h) }, label: f, name: u, holder: s, validation: i, note: Xm(i, t, d), step: e.step };
}
const Zm = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Jm, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Km, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function ew(e) {
  return Zm[e.presentation](Qm(e));
}
function aw(e) {
  for (const a of e)
    if (!a.reserved && !ba(a.step)) throw new Error("colour ladder renders token steps only");
}
function nw() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function tw(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const rw = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function lw() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const ow = { list: nw, swatches: () => null, tiles: lw };
function Fn(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  aw(e.steps);
  const r = tw(e), l = ow[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(ew, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${rw[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: E.tiles, children: i }) : i });
}
const iw = "_rail_1el2t_2", sw = "_section_1el2t_12", cw = "_sectionFlush_1el2t_22", dw = "_head_1el2t_26", uw = "_headLabel_1el2t_34", hw = "_sample_1el2t_42", mw = "_sampleLabel_1el2t_47", ww = "_sampleTitle_1el2t_54", _w = "_sampleMeta_1el2t_59", fw = "_trace_1el2t_65", vw = "_traceHead_1el2t_70", bw = "_steps_1el2t_78", pw = "_step_1el2t_78", gw = "_stepTitle_1el2t_97", Nw = "_hollow_1el2t_107", yw = "_stepBody_1el2t_115", kw = "_stepDetail_1el2t_127", $w = "_publish_1el2t_132", Cw = "_reason_1el2t_138", Sw = "_note_1el2t_143", Rw = "_reveal_1el2t_148", y = {
  rail: iw,
  section: sw,
  sectionFlush: cw,
  head: dw,
  headLabel: uw,
  sample: hw,
  sampleLabel: mw,
  sampleTitle: ww,
  sampleMeta: _w,
  trace: fw,
  traceHead: vw,
  steps: bw,
  step: pw,
  stepTitle: gw,
  hollow: Nw,
  stepBody: yw,
  stepDetail: kw,
  publish: $w,
  reason: Cw,
  note: Sw,
  reveal: Rw
}, bn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Tw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Ew = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Lw = { notSimulated: "not simulated", running: "running" };
function xw(e) {
  return e.presentation === "foundry";
}
function Aw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Iw(e, a) {
  var r;
  const t = Tw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Mw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function qw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Bw(e) {
  if (Mw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Pw(e) {
  const [a, t] = p(!1);
  A(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${y.step} ${y.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Ow(e) {
  const a = Lw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: y.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Le, { size: 6, kind: Ew[e.kind], label: e.kind });
}
function Dw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: y.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function jw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Hw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Pw, { kind: a.kind, children: [
    /* @__PURE__ */ n(Ow, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: y.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: y.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Dw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(jw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Fw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(se(a)), t.join(" · ");
}
function Wn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${y.trace} ${y.section}`, children: [
    /* @__PURE__ */ n("p", { className: y.traceHead, id: a, children: Fw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: y.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Hw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Ww(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${y.sample} ${y.section}`, children: [
    /* @__PURE__ */ n("p", { className: y.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ o("p", { className: y.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ o("p", { className: y.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function zw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ce(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${y.sampleMeta} ${y.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Gw(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : te(e.run.cost), label: "Cost" }, { value: e.run.turns ? Sn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: y.sectionFlush, children: /* @__PURE__ */ n(ya, { divided: !0, cells: a }) });
}
function Uw(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: te(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Sn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Kw(e) {
  const a = Uw(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: y.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: y.sectionFlush, children: /* @__PURE__ */ n(ya, { divided: !0, cells: a }) });
}
function zn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: `${y.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Vw(e) {
  return /* @__PURE__ */ o("div", { className: `${y.publish} ${y.section}`, children: [
    /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: y.note, children: e.note })
  ] });
}
function Yw(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${y.publish} ${y.section}`, children: /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Gn(e) {
  return /* @__PURE__ */ o("div", { className: `${y.head} ${y.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: y.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: bn[e.run.status].role, label: bn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Xw(e, a) {
  const [t, r] = p(e.steps);
  return A(() => r(e.steps), [e.steps]), A(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), t;
}
function Jw(e) {
  var t;
  qw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Ww, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Gw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist }) }),
    /* @__PURE__ */ n(Vw, { reason: Aw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Qw(e) {
  var r;
  const a = Xw(e.run, e.feed);
  Bw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(zw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Kw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Yw, { reason: Iw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function O$(e) {
  return xw(e) ? /* @__PURE__ */ n(Qw, { ...e }) : /* @__PURE__ */ n(Jw, { ...e });
}
const Zw = "_list_142ip_3", e_ = "_row_142ip_9", a_ = "_condition_142ip_18", n_ = "_action_142ip_24", oa = {
  list: Zw,
  row: e_,
  condition: a_,
  action: n_
}, Un = Ve(!1);
function D$({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Un.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oa.list, "aria-label": a, children: e }) });
}
function j$({ rule: e }) {
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
function t_(e) {
  return e === "up" ? "down" : "up";
}
function r_(e, a) {
  const t = pn(e, a.id, a.direction) ?? pn(e, a.id, t_(a.direction));
  t == null || t.focus();
}
function Yn() {
  const e = N(null), [a, t] = p(null), [r, l] = p("");
  return A(() => {
    e.current !== null && a !== null && r_(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    t(s), l(c);
  } };
}
function Xn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ha({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const l_ = "_body_1h15q_2", o_ = "_title_1h15q_8", i_ = "_section_1h15q_13", s_ = "_legend_1h15q_18", c_ = "_stages_1h15q_26", d_ = "_stage_1h15q_26", u_ = "_stageIndex_1h15q_44", h_ = "_stageName_1h15q_50", m_ = "_footer_1h15q_59", w_ = "_note_1h15q_66", __ = "_reason_1h15q_71", f_ = "_actions_1h15q_76", v_ = "_webHead_1h15q_83", b_ = "_kicker_1h15q_92", p_ = "_webTitle_1h15q_99", g_ = "_webBody_1h15q_105", N_ = "_webSection_1h15q_109", y_ = "_sectionHead_1h15q_121", k_ = "_sectionNote_1h15q_129", $_ = "_formLabel_1h15q_134", C_ = "_identityRow_1h15q_139", S_ = "_nameCell_1h15q_145", R_ = "_keyCell_1h15q_150", T_ = "_colourCell_1h15q_154", E_ = "_colourStatus_1h15q_161", L_ = "_webStages_1h15q_166", x_ = "_webStageList_1h15q_172", A_ = "_webStage_1h15q_166", I_ = "_webIndex_1h15q_191", M_ = "_webStageName_1h15q_196", q_ = "_webMoves_1h15q_201", B_ = "_addStage_1h15q_215", P_ = "_addStageButton_1h15q_223", O_ = "_addStageNote_1h15q_231", D_ = "_webFooter_1h15q_236", j_ = "_webFooterNotes_1h15q_244", H_ = "_webNote_1h15q_251", w = {
  body: l_,
  title: o_,
  section: i_,
  legend: s_,
  stages: c_,
  stage: d_,
  stageIndex: u_,
  stageName: h_,
  footer: m_,
  note: w_,
  reason: __,
  actions: f_,
  webHead: v_,
  kicker: b_,
  webTitle: p_,
  webBody: g_,
  webSection: N_,
  sectionHead: y_,
  sectionNote: k_,
  formLabel: $_,
  identityRow: C_,
  nameCell: S_,
  keyCell: R_,
  colourCell: T_,
  colourStatus: E_,
  webStages: L_,
  webStageList: x_,
  webStage: A_,
  webIndex: I_,
  webStageName: M_,
  webMoves: q_,
  addStage: B_,
  addStageButton: P_,
  addStageNote: O_,
  webFooter: D_,
  webFooterNotes: j_,
  webNote: H_
}, F_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Jn = "not in catalogue";
function W_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Jn}` }, ...t];
}
function z_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(x, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Jn}`;
  return /* @__PURE__ */ n(x, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: W_(t, e.name), invalid: i, onChange: r });
}
function Qn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function G_(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function U_({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Qn(a, t), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(z_, { stage: a, index: t, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(x, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: F_, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function K_({ stages: e, onChange: a, catalogue: t }) {
  const r = G_(e.length), l = Yn(), i = (c, d) => {
    const u = Kn(c, d);
    r.current = Oa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Vn(Qn(e[c], c), u, e.length)), a(Oa(e, c, u));
  }, s = (c, d) => a(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(U_, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: t, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Xn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const V_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Y_ = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], X_ = "A new stream starts as a draft. Nothing runs on it until you publish it.", J_ = "Create is disabled: name the stream and give it a key first.", Q_ = "reorder with the ↑ ↓ buttons · min 2";
function Ya(e, a) {
  return !e.reserved && pa(e.step) && a[e.step] === void 0;
}
function Z_(e, a) {
  const t = e.find((r) => Ya(r, a));
  return t ? t.step : 1;
}
function ef({ stages: e, onMove: a }) {
  const t = Yn(), r = (l, i) => {
    const s = Kn(l, i);
    t.moved({ id: e[l].id, direction: i }, Vn(e[l].name, s, e.length)), a(l, s);
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
function af({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: X_ }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(_, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function nf(e, a) {
  return e !== "" && a !== "" ? null : J_;
}
function tf(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = Y_, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = $(), [h, f] = p(""), [b, g] = p(""), [I, j] = p(a[0].value), [oe, $e] = p(() => Z_(t, r)), [ae, De] = p(e.stages ?? V_), [je, C] = p(l[0].value), z = { name: h, key: b, streamStep: oe, owner: I, stages: ae, policy: je }, fe = nf(h, b);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(x, { kind: "input", label: "Stream name", value: h, onChange: f }),
      /* @__PURE__ */ n(x, { kind: "input", label: "Key", value: b, onChange: g, mono: !0 }),
      /* @__PURE__ */ n(x, { kind: "select", label: "Owner", value: I, onChange: j, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Fn, { label: "Stream colour", steps: t, value: oe, onChange: $e, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(ef, { stages: ae, onMove: (xe, yt) => De(Oa(ae, xe, yt)) })
    ] }),
    /* @__PURE__ */ n(Mn, { legend: "Loop policy", options: l, value: je, onChange: C }),
    /* @__PURE__ */ n(af, { reason: fe, onCreate: () => i(z), onDraft: () => s(z) })
  ] }) });
}
const Zn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], rf = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function lf(e, a, t, r, l, i) {
  var c;
  const s = ((c = Zn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function of(e, a) {
  return sf(e) && cf(e, a) && df(e);
}
function sf(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function cf(e, a) {
  return e.colourStep !== null && Ya({ step: e.colourStep }, a);
}
function df(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function uf(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${zm}.` : Ya({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function hf({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function mf({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(hf, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: rf })
    ] }),
    l && /* @__PURE__ */ n(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function wf({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function _f({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(x, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(x, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function ff(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, f] = p(null), [b, g] = p("relay"), [I, j] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = lf(l, s, d, h, b, I), $e = of(oe, r), ae = I.find((C) => C.kind === "agent" && C.name.trim() !== ""), De = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Fn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: f, takenBy: r })
  ] }), je = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: uf(h, r) }),
    /* @__PURE__ */ n(x, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((C) => ({ value: C, label: C })), onChange: u })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(wf, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(_f, { name: l, setName: i, streamKey: s, setKey: c, colour: De, owner: je }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: Q_ })
        ] }),
        /* @__PURE__ */ n(K_, { stages: I, onChange: j })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(Mn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Zn, onChange: g }) }),
      /* @__PURE__ */ n(mf, { ready: $e, draft: oe, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function H$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ff, { ...e }) : /* @__PURE__ */ n(tf, { ...e });
}
const vf = "_row_bs8hc_2", bf = "_cell_bs8hc_6", pf = "_condition_bs8hc_11", gf = "_action_bs8hc_18", Nf = "_contract_bs8hc_24", yf = "_contractCondition_bs8hc_33", kf = "_contractAction_bs8hc_39", J = {
  row: vf,
  cell: bf,
  condition: pf,
  action: gf,
  contract: Nf,
  contractCondition: yf,
  contractAction: kf
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
    x,
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
function $f({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: J.condition, title: ma(e, r), children: ma(e, r) }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: Xa(e, a, t) })
  ] });
}
function Cf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: J.row, children: [
    /* @__PURE__ */ o("td", { className: J.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: J.condition, children: ma(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: J.cell, children: Xa(e, a, t) })
  ] });
}
function Sf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: J.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: J.contractCondition, children: ma(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: J.contractAction, children: Xa(e, a, t, !0) })
  ] });
}
const Rf = { two: Cf, four: $f, contract: Sf };
function F$(e) {
  var t;
  if (!et.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Rf[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Tf = "_column_gxbdk_2", Ef = "_head_gxbdk_17", Lf = "_index_gxbdk_23", xf = "_name_gxbdk_29", Af = "_meta_gxbdk_38", If = "_mono_gxbdk_43", Mf = "_gate_gxbdk_50", qf = "_reviewersLabel_gxbdk_57", Bf = "_reviewers_gxbdk_57", Pf = "_reviewer_gxbdk_57", Of = "_agents_gxbdk_74", Df = "_workflowColumn_gxbdk_79", jf = "_workflowHead_gxbdk_96", Hf = "_stageRow_gxbdk_102", Ff = "_stageLabel_gxbdk_109", Wf = "_workflowTitle_gxbdk_116", zf = "_workflowMeta_gxbdk_122", Gf = "_workflowGate_gxbdk_127", Uf = "_gateNote_gxbdk_135", Kf = "_cardNote_gxbdk_140", Vf = "_reviewerList_gxbdk_149", Yf = "_reviewerRow_gxbdk_155", Xf = "_reviewerMark_gxbdk_161", Jf = "_reviewerName_gxbdk_171", Qf = "_terminalCard_gxbdk_177", Zf = "_terminalCount_gxbdk_186", ev = "_workflowAgents_gxbdk_192", av = "_mount_gxbdk_198", k = {
  column: Tf,
  head: Ef,
  index: Lf,
  name: xf,
  meta: Af,
  mono: If,
  gate: Mf,
  reviewersLabel: qf,
  reviewers: Bf,
  reviewer: Pf,
  agents: Of,
  workflowColumn: Df,
  workflowHead: jf,
  stageRow: Hf,
  stageLabel: Ff,
  workflowTitle: Wf,
  workflowMeta: zf,
  workflowGate: Gf,
  gateNote: Uf,
  cardNote: Kf,
  reviewerList: Vf,
  reviewerRow: Yf,
  reviewerMark: Xf,
  reviewerName: Jf,
  terminalCard: Qf,
  terminalCount: Zf,
  workflowAgents: ev,
  mount: av
}, nv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Ja(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function at(e) {
  return `${Math.round(e * 100)}%`;
}
function tv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: k.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: k.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: k.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ya, { cells: [
      { value: at(e.gateShare), label: "Gate share", accent: "amber" },
      { value: ee(e.count), label: "In stage" }
    ] })
  ] });
}
function rv({ stage: e }) {
  return /* @__PURE__ */ n(ya, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: Ja(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function lv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: k.head, children: [
    /* @__PURE__ */ n("span", { className: k.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: k.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: nv[e.kind] })
  ] });
}
function ov({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: k.meta, children: [
    /* @__PURE__ */ o("span", { className: k.mono, children: [
      ee(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: k.mono, children: [
      se(e.medianWait),
      " median wait"
    ] })
  ] });
}
function iv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(tv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(rv, { stage: e }) : null;
}
function sv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function cv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: k.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(lv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(ov, { stage: e }),
    /* @__PURE__ */ n(iv, { stage: e }),
    /* @__PURE__ */ n("div", { className: k.agents, children: a.map((s) => /* @__PURE__ */ n(wm, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(sv, { onMount: t })
  ] });
}
const dv = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function uv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: k.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: k.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: k.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: k.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function hv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: k.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(uv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: k.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: at(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function mv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function wv({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: k.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: k.terminalCount, children: Ja(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: k.cardNote, children: mv(e.rolledBackThisWeek) })
  ] });
}
function _v(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function fv(e) {
  if (e.kind === "terminal") return `${Ja(e.closedThisWeek)} this week`;
  const a = _v(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function vv({ stage: e, titleId: a }) {
  const t = dv[e.kind];
  return /* @__PURE__ */ o("header", { className: k.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: k.stageRow, children: [
      /* @__PURE__ */ o("span", { className: k.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: k.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: k.workflowMeta, children: fv(e) })
  ] });
}
function bv(e) {
  return e === "entry" || e === "agent";
}
function pv({ stage: e, onMount: a }) {
  return a === void 0 || !bv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: `${k.mount} ward-target`, onClick: () => a(e.index), children: "+ Mount agent" });
}
function gv({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: k.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(vv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(hv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(wv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: k.workflowAgents, children: a }),
    /* @__PURE__ */ n(pv, { stage: e, onMount: t })
  ] });
}
function Nv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function W$(e) {
  return Nv(e) ? /* @__PURE__ */ n(gv, { ...e }) : /* @__PURE__ */ n(cv, { ...e });
}
const yv = "_row_1jw40_6", kv = "_name_1jw40_12", $v = "_compactRow_1jw40_13", Cv = "_compactName_1jw40_13", Sv = "_cell_1jw40_30", Rv = "_chain_1jw40_45", Tv = "_owner_1jw40_51", Ev = "_mono_1jw40_57", Lv = "_compactCell_1jw40_79", xv = "_stack_1jw40_96", Av = "_stat_1jw40_103", Iv = "_identityLine_1jw40_110", Mv = "_identity_1jw40_110", qv = "_ownerLine_1jw40_137", Bv = "_link_1jw40_150", Pv = "_gateMark_1jw40_156", Ov = "_emptyChain_1jw40_161", Dv = "_arrow_1jw40_167", jv = "_muted_1jw40_168", Hv = "_define_1jw40_173", Fv = "_statValue_1jw40_180", Wv = "_policyId_1jw40_186", zv = "_sub_1jw40_191", v = {
  row: yv,
  name: kv,
  compactRow: $v,
  compactName: Cv,
  cell: Sv,
  chain: Rv,
  owner: Tv,
  mono: Ev,
  compactCell: Lv,
  stack: xv,
  stat: Av,
  identityLine: Iv,
  identity: Mv,
  ownerLine: qv,
  link: Bv,
  gateMark: Pv,
  emptyChain: Ov,
  arrow: Dv,
  muted: jv,
  define: Hv,
  statValue: Fv,
  policyId: Wv,
  sub: zv
};
function nt(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function Gv(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Uv(e) {
  return e === void 0 ? v.compactRow : `${v.compactRow} ${e}`;
}
function tt(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function Kv(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${tt(e.members)}`;
}
function Vv(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: /* @__PURE__ */ o("span", { className: v.stack, children: [
    /* @__PURE__ */ o("span", { className: v.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${v.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${v.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: v.ownerLine, children: Kv(e) })
  ] }) });
}
function rt({ name: e, gate: a, size: t }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ n("span", { className: v.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { role: a ? "gate" : "soft", size: t, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Yv(e) {
  return /* @__PURE__ */ n("span", { className: `${v.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: v.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: v.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(rt, { name: a.name, gate: a.gate === !0, size: "tag" })
  ] }, `${a.name}${t}`)) });
}
function Xv(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: v.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: v.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: v.define, children: "Define workflow" })
  ] }) : Yv(e) });
}
function lt(e) {
  return e === void 0 ? void 0 : !0;
}
function Nn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: t }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: `${v.statValue} ward-stat-value`, title: r, "data-raised": lt(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: v.sub, children: a })
  ] }) });
}
function Jv(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: v.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: v.sub, children: e.summary })
  ] }) });
}
function Qv(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Zv({ stream: e, href: a, presentation: t }) {
  const r = Uv(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: nt, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": Ee(e.streamStep, "chip") }, children: [
    Vv(e, a),
    Xv(e.stages),
    Nn(Qv(e.agents), e.agents === void 0 ? void 0 : Gv(e.agents), "—"),
    Jv(e.policy),
    Nn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function eb(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function z$(e) {
  if (eb(e)) return Zv(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: v.row, onClick: nt, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: v.cell, children: [
      /* @__PURE__ */ n("a", { className: `${v.name} ward-target`, href: W(t), children: a.name }),
      /* @__PURE__ */ n(m, { ...Na(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, children: /* @__PURE__ */ n("span", { className: v.chain, children: a.stages.map((r) => /* @__PURE__ */ n("span", { className: v.link, children: /* @__PURE__ */ n(rt, { name: r.name, gate: r.gate }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: v.cell, children: /* @__PURE__ */ o("span", { className: v.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: v.cell, children: [
      /* @__PURE__ */ n("span", { className: v.owner, children: a.owner }),
      /* @__PURE__ */ n("span", { className: v.mono, children: tt(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, title: a.inFlightHint, "data-raised": lt(a.inFlightHint), children: ee(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const ab = "_row_mdce7_2", nb = "_name_mdce7_16", tb = "_scope_mdce7_24", wa = {
  row: ab,
  name: nb,
  scope: tb
};
function rb(e) {
  return e === void 0 ? `${wa.row} ward-toolrow` : `${wa.row} ward-toolrow ${e}`;
}
function lb(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function ob({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function ib({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function sb({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${wa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function cb(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function G$({ tool: e, onChange: a, presentation: t }) {
  const r = $(), l = $(), i = lb(e, t), s = cb(t);
  return /* @__PURE__ */ o(s, { className: rb(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(ob, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${wa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(sb, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(ib, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const db = "_strip_1qtlf_2", ub = "_head_1qtlf_10", hb = "_name_1qtlf_16", mb = "_chart_1qtlf_24", wb = "_segment_1qtlf_30", _b = "_detailedChart_1qtlf_36", fb = "_rail_1qtlf_49", vb = "_section_1qtlf_55", bb = "_label_1qtlf_66", pb = "_note_1qtlf_83", Z = {
  strip: db,
  head: ub,
  name: hb,
  chart: mb,
  segment: wb,
  detailedChart: _b,
  rail: fb,
  section: vb,
  label: bb,
  note: pb
}, gb = "No item in flight to preview.", Nb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", yb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Da = [1, 2, 3, 4, 5, 6], _a = 100;
function kb(e, a) {
  return a.has(e) ? Ee(e, "id") : "var(--ward-color-line)";
}
function $b({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: Z.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Da.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: Z.segment,
      x: l * _a,
      y: "0",
      width: _a,
      height: "8",
      fill: kb(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Cb(e) {
  const a = e.slice(0, Da.length);
  for (; a.length < Da.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Sb({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${Z.detailedChart} ward-appearance-chart`, children: [
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
function ot(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ta({ label: e, children: a }) {
  const t = $();
  return /* @__PURE__ */ o("section", { className: Z.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: Z.label, children: e }),
    a
  ] });
}
function Rb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: Z.note, children: a ?? gb }) : /* @__PURE__ */ n($a, { item: { ...e, streamStep: ga(t.streamStep) }, onOpen: ot(r), feed: null });
}
function Tb({ draft: e }) {
  const a = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: Z.head, style: a, children: [
    /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: Z.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
  ] });
}
function Eb(e) {
  const a = Cb(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: Z.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ta, { label: "Board card", children: /* @__PURE__ */ n(Rb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ta, { label: "Streams index row", children: /* @__PURE__ */ n(Tb, { draft: t }) }),
    /* @__PURE__ */ o(ta, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Sb, { identities: a }),
      /* @__PURE__ */ n("p", { className: Z.note, children: Nb })
    ] }),
    /* @__PURE__ */ n(ta, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: Z.note, children: yb }) })
  ] });
}
function Lb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: Z.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: Z.head, children: [
      /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: Z.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n($a, { item: { ...a, streamStep: e.streamStep }, onOpen: ot(r) }),
    /* @__PURE__ */ n($b, { draft: e, streams: t })
  ] });
}
function U$(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Eb, { ...e }) : /* @__PURE__ */ n(Lb, { ...e });
}
const xb = "_row_ixlg5_6", Ab = "_headCell_ixlg5_10", Ib = "_cell_ixlg5_11", Mb = "_name_ixlg5_23", qb = "_consequence_ixlg5_29", Bb = "_governed_ixlg5_36", Pb = "_control_ixlg5_42", Ob = "_byRole_ixlg5_48", Db = "_webControl_ixlg5_59", jb = "_webConsequence_ixlg5_65", Hb = "_webGoverned_ixlg5_71", D = {
  row: xb,
  headCell: Ab,
  cell: Ib,
  name: Mb,
  consequence: qb,
  governed: Bb,
  control: Pb,
  byRole: Ob,
  webControl: Db,
  webConsequence: jb,
  webGoverned: Hb
};
function Fb({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: D.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: D.control, children: [
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
function Wb({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Fb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function zb(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Gb({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${D.webControl} ${D.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Oe,
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
function Ub({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Gb, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webGoverned} ward-cellmeta`, children: zb(e) }) })
  ] });
}
function K$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ub, { ...e }) : /* @__PURE__ */ n(Wb, { ...e });
}
const Kb = "_row_vv64h_2", Vb = "_cell_vv64h_6", Yb = "_name_vv64h_25", Xb = "_note_vv64h_30", Jb = "_webName_vv64h_41", Qb = "_webMeta_vv64h_47", K = {
  row: Kb,
  cell: Vb,
  name: Yb,
  note: Xb,
  webName: Jb,
  webMeta: Qb
}, it = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Zb(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function ep({ component: e, onRestart: a }) {
  const t = $(), r = it[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: K.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: K.cell, "data-mono": "true", children: [
      ee(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { id: t, className: K.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: K.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(_, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function ap({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: Zb(e.state) });
}
function np({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...it[e.state] }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(ap, { component: e, onRestart: a }) })
  ] });
}
function V$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(np, { ...e }) : /* @__PURE__ */ n(ep, { ...e });
}
const tp = "_row_1f1gp_7", rp = "_cell_1f1gp_11", lp = "_next_1f1gp_28", op = "_headCell_1f1gp_38", ip = "_webId_1f1gp_77", sp = "_webPurpose_1f1gp_83", cp = "_webMeta_1f1gp_91", dp = "_webUrgent_1f1gp_97", H = {
  row: tp,
  cell: rp,
  next: lp,
  headCell: op,
  webId: ip,
  webPurpose: sp,
  webMeta: cp,
  webUrgent: dp
}, up = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, hp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, st = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], mp = Object.fromEntries(st.map((e) => [e.key, e]));
function Fe({ column: e, children: a }) {
  const t = mp[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: H.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function Y$() {
  return /* @__PURE__ */ n("tr", { children: st.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: H.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function wp({ cred: e }) {
  const a = up[e.state];
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n(Fe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Fe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Fe, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Fe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Fe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Fe, { column: "next", children: /* @__PURE__ */ n("span", { className: H.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function _p({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${H.webMeta} ${H.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function fp({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(_p, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { ...hp[e.state] }) })
  ] });
}
function X$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(fp, { ...e }) : /* @__PURE__ */ n(wp, { ...e });
}
const vp = "_card_17zba_2", bp = "_head_17zba_11", pp = "_env_17zba_18", gp = "_version_17zba_25", Np = "_meta_17zba_32", yp = "_webCard_17zba_37", kp = "_webRow_17zba_47", $p = "_webTitle_17zba_55", Cp = "_webLine_17zba_65", Sp = "_webVersion_17zba_72", Rp = "_webMeta_17zba_77", U = {
  card: vp,
  head: bp,
  env: pp,
  version: gp,
  meta: Np,
  webCard: yp,
  webRow: kp,
  webTitle: $p,
  webLine: Cp,
  webVersion: Sp,
  webMeta: Rp
}, ct = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Tp({ env: e }) {
  const a = ct[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: U.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ o("div", { className: U.head, children: [
      /* @__PURE__ */ n("span", { className: U.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: U.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: U.meta, children: [
      "deployed ",
      ce(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: U.meta, children: t })
  ] });
}
function Ep(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ce(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Lp(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...ct[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: Ep(e) })
  ] });
}
function J$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Lp, { ...e }) : /* @__PURE__ */ n(Tp, { ...e });
}
const xp = "_panel_1hmja_2", Ap = "_line_1hmja_8", Ip = "_actions_1hmja_14", ra = {
  panel: xp,
  line: Ap,
  actions: Ip
};
function Q$(e) {
  return /* @__PURE__ */ o("div", { className: ra.panel, children: [
    /* @__PURE__ */ n("p", { className: ra.line, children: e.status }),
    /* @__PURE__ */ n(x, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ra.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ra.line, children: e.note ?? "" })
  ] });
}
const Mp = "_upload_erepj_2", qp = "_preview_erepj_7", Bp = "_mark_erepj_17", Pp = "_empty_erepj_22", Op = "_actions_erepj_28", Dp = "_input_erepj_33", jp = "_reasons_erepj_41", Hp = "_reason_erepj_41", Fp = "_accepted_erepj_57", ne = {
  upload: Mp,
  preview: qp,
  mark: Bp,
  empty: Pp,
  actions: Op,
  input: Dp,
  reasons: jp,
  reason: Hp,
  accepted: Fp
}, dt = 1.5, ut = 22, fa = "script elements or event handlers", Se = "links or external references", ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${dt}px at ${ut}px`], Wp = [ye[1], ye[2], fa, Se], zp = /* @__PURE__ */ new Map([
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
]), Gp = "http://www.w3.org/2000/svg", Up = "http://www.w3.org/2000/xmlns/", Kp = /* @__PURE__ */ new Set([
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
]), Vp = /* @__PURE__ */ new Set([
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
]), Yp = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, Xp = /url\s*\(|['"\\]/i;
function Jp() {
  return { ok: !1, reasons: [ye[1]] };
}
function ht(e) {
  return e.namespaceURI === Gp || e.namespaceURI === null;
}
function Qp(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && ht(a) ? a : null;
  } catch {
    return null;
  }
}
function Zp(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [ye[0]] : [];
}
function eg(e) {
  return zp.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function ag(e) {
  return Xp.test(e.replace(Yp, ""));
}
function ng(e) {
  return /^on/i.test(e.localName) ? fa : e.localName === "href" || ag(e.value) ? Se : void 0;
}
function tg(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(eg(t));
    for (const r of Array.from(t.attributes)) a.add(ng(r));
  }
  return Wp.filter((t) => a.has(t));
}
function rg(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? ut / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < dt;
  }) ? [ye[3]] : [];
}
function lg(e) {
  if (e.namespaceURI === Up) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Vp.has(a) || a.startsWith("stroke"));
}
function og(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && ht(a) && Kp.has(a.localName);
}
function ig(e, a) {
  og(a) ? a.nodeType === Node.ELEMENT_NODE && mt(a) : e.removeChild(a);
}
function mt(e) {
  for (const a of Array.from(e.attributes)) lg(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) ig(e, a);
  return e;
}
function Z$(e) {
  const a = Qp(e);
  if (a === null) return Jp();
  const t = [...Zp(a), ...tg(a), ...rg(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(mt(a)) };
}
const sg = "Mark accepted.";
function cg({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: ne.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: ne.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: ne.empty }) });
}
function dg(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function ug(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function hg({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: ne.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: ne.result, role: "status", children: /* @__PURE__ */ n("p", { className: ne.accepted, children: sg }) }) : /* @__PURE__ */ n("div", { className: ne.result, role: "status", children: /* @__PURE__ */ n("ul", { className: ne.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: ne.reason, children: a }, a)) }) });
}
function mg({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(hg, { result: e }) : /* @__PURE__ */ n("p", { className: `${ne.result} ${dg(e, t)}`, role: "status", children: ug(e, t) });
}
function eC({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = N(null), [i, s] = p(null), c = (d) => {
    if (d === void 0) return;
    const u = a(d);
    u instanceof Promise ? u.then(s) : s(u);
  };
  return /* @__PURE__ */ o("div", { className: ne.upload, children: [
    /* @__PURE__ */ n(cg, { current: e }),
    /* @__PURE__ */ o("div", { className: ne.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: l,
          className: ne.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          onChange: (d) => {
            var u;
            return c((u = d.target.files) == null ? void 0 : u[0]);
          }
        }
      ),
      /* @__PURE__ */ n(_, { onClick: () => {
        var d;
        return (d = l.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(_, { variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(mg, { result: i, presentation: r })
  ] });
}
const wg = "_row_1wp9s_7", _g = "_cell_1wp9s_11", fg = "_head_1wp9s_28", vg = "_name_1wp9s_34", bg = "_pinned_1wp9s_42", pg = "_headCell_1wp9s_49", gg = "_webName_1wp9s_88", Ng = "_webMeta_1wp9s_95", yg = "_webWarn_1wp9s_103", q = {
  row: wg,
  cell: _g,
  head: fg,
  name: vg,
  pinned: bg,
  headCell: pg,
  webName: gg,
  webMeta: Ng,
  webWarn: yg
}, Qa = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, wt = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], kg = Object.fromEntries(wt.map((e) => [e.key, e]));
function $g(e, a) {
  return `mcp.${e}.${a}`;
}
function Cg(e) {
  return Object.keys(Qa).includes(e);
}
function Sg(e) {
  return Qa[e !== void 0 && Cg(e) ? e : "unknown"];
}
function Ye({ column: e, children: a }) {
  const t = kg[e];
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
function aC() {
  return /* @__PURE__ */ n("tr", { children: wt.map((e) => /* @__PURE__ */ n(
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
function Rg({ server: e }) {
  const a = Qa[e.connection];
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
    /* @__PURE__ */ n(Ye, { column: "tools", children: e.tools.map((t) => $g(e.name, t)).join(" · ") })
  ] });
}
function Tg(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Eg(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Lg({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function xg({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Ag({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Ig({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Tg(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Eg(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Lg, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Sg(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n(xg, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Ag, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function nC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ig, { ...e }) : /* @__PURE__ */ n(Rg, { ...e });
}
const Mg = "_row_1h9nq_2", qg = "_headCell_1h9nq_14", Bg = "_cell_1h9nq_15", Pg = "_name_1h9nq_26", Og = "_consequence_1h9nq_32", Dg = "_reason_1h9nq_38", jg = "_value_1h9nq_44", Hg = "_webRow_1h9nq_60", Fg = "_webSetting_1h9nq_71", Wg = "_webName_1h9nq_79", zg = "_webConsequence_1h9nq_87", Gg = "_webControl_1h9nq_93", Ug = "_webState_1h9nq_106", Kg = "_webChip_1h9nq_111", L = {
  row: Mg,
  headCell: qg,
  cell: Bg,
  name: Pg,
  consequence: Og,
  reason: Dg,
  value: jg,
  webRow: Hg,
  webSetting: Fg,
  webName: Wg,
  webConsequence: zg,
  webControl: Gg,
  webState: Ug,
  webChip: Kg
}, _t = 104, ft = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Vg({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Oe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(An, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: L.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Yg({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = ft[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: L.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: L.headCell, children: [
      /* @__PURE__ */ n("span", { className: L.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: L.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: L.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(Vg, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: L.cell, style: { width: _t }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function vt(e, a) {
  return String(e ?? a);
}
function Xg(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Jg(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? vt(e.value, "—");
}
function Qg({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: L.webControl, children: [
    /* @__PURE__ */ n(Oe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: L.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function Zg(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(Qg, { ...e });
  const l = Xg(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: L.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(An, { options: l, value: vt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${L.webControl} ${L.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: Jg(a) });
}
function eN({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = $(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${L.row} ${L.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: L.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${L.name} ${L.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${L.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: L.webControl, children: i(s) }) : /* @__PURE__ */ n(Zg, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${L.webChip} ward-policy-chip`, style: { width: _t }, children: /* @__PURE__ */ n(m, { ...ft[t], size: "tag" }) })
  ] });
}
function tC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(eN, { ...e }) : /* @__PURE__ */ n(Yg, { ...e });
}
const aN = "_label_1o9za_7", nN = "_name_1o9za_15", tN = "_column_1o9za_24", rN = "_webFrame_1o9za_57", lN = "_webHead_1o9za_62", oN = "_webHeadLabel_1o9za_74", iN = "_webLabel_1o9za_112", sN = "_webColumns_1o9za_119", cN = "_webGroup_1o9za_125", dN = "_webPeople_1o9za_126", uN = "_webVia_1o9za_127", hN = "_webMeta_1o9za_156", F = {
  label: aN,
  name: nN,
  column: tN,
  webFrame: rN,
  webHead: lN,
  webHeadLabel: oN,
  webLabel: iN,
  webColumns: sN,
  webGroup: cN,
  webPeople: dN,
  webVia: uN,
  webMeta: hN
}, mN = {
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
function xa({ column: e, children: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: F.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function wN(e) {
  if (!e.matrixRole) return;
  const a = mN[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function _N({ node: e }) {
  const a = wN(e);
  return /* @__PURE__ */ o("span", { className: F.label, children: [
    /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
    /* @__PURE__ */ n(fN, { role: a, node: e }),
    /* @__PURE__ */ n(xa, { column: La[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(xa, { column: La[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ n(xa, { column: La[2], children: e.requestedVia ?? "" })
  ] });
}
function fN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function vN({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ n(_N, { node: t }),
      children: s
    }
  );
}
function Aa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function bN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Aa, { className: `${F.webMeta} ${F.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Aa, { className: `${F.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Aa, { className: `${F.webMeta} ${F.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function pN() {
  return /* @__PURE__ */ o("div", { className: F.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: F.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: F.webColumns, children: [
      /* @__PURE__ */ n("span", { className: F.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: F.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: F.webVia, children: "Requested via" })
    ] })
  ] });
}
function gN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function NN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function yN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: F.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(pN, {}),
    /* @__PURE__ */ n(bc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Bn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(gN, { row: t }),
        detail: /* @__PURE__ */ n(bN, { row: t }),
        expanded: NN(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function rC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(yN, { ...e }) : /* @__PURE__ */ n(vN, { ...e });
}
const kN = "_runbook_b9agc_2", $N = "_list_b9agc_7", CN = "_step_b9agc_15", SN = "_numeral_b9agc_21", RN = "_body_b9agc_28", TN = "_head_b9agc_34", EN = "_title_b9agc_40", LN = "_detail_b9agc_45", xN = "_actions_b9agc_50", AN = "_webList_b9agc_56", IN = "_webStep_b9agc_60", MN = "_webBody_b9agc_66", qN = "_webTitle_b9agc_74", BN = "_webDetail_b9agc_78", T = {
  runbook: kN,
  list: $N,
  step: CN,
  numeral: SN,
  body: RN,
  head: TN,
  title: EN,
  detail: LN,
  actions: xN,
  webList: AN,
  webStep: IN,
  webBody: MN,
  webTitle: qN,
  webDetail: BN
}, bt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function pt(e) {
  return String(e + 1).padStart(2, "0");
}
function PN({ step: e, index: a, connection: t }) {
  const r = bt[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: T.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: T.numeral, children: pt(a) }),
    /* @__PURE__ */ o("span", { className: T.body, children: [
      /* @__PURE__ */ o("span", { className: T.head, children: [
        /* @__PURE__ */ n("span", { className: T.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: T.detail, children: e.detail })
    ] })
  ] });
}
function ON({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: T.list, children: e.map((r, l) => /* @__PURE__ */ n(PN, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: T.actions, children: a })
  ] });
}
function DN({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${T.step} ${T.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${T.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: pt(a) }),
    /* @__PURE__ */ o("span", { className: `${T.body} ${T.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${T.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${T.title} ${T.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...bt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${T.detail} ${T.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function jN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${T.list} ${T.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(DN, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${T.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function lC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(jN, { ...e }) : /* @__PURE__ */ n(ON, { ...e });
}
const HN = "_list_1gu6a_2", FN = "_check_1gu6a_10", WN = "_body_1gu6a_16", zN = "_text_1gu6a_23", GN = "_pending_1gu6a_32", UN = "_measured_1gu6a_37", ze = {
  list: HN,
  check: FN,
  body: WN,
  text: zN,
  pending: GN,
  measured: UN
};
function KN(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function VN({ check: e }) {
  const a = KN(e.passed);
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
function oC({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(VN, { check: a }, a.text)) });
}
const YN = "_root_khinh_2", XN = "_list_khinh_10", JN = "_line_khinh_21", QN = "_at_khinh_48", ZN = "_text_khinh_52", ey = "_foot_khinh_56", ay = "_idle_khinh_68", ny = "_caret_khinh_76", ty = "_jump_khinh_83", me = {
  root: YN,
  list: XN,
  line: JN,
  at: QN,
  text: ZN,
  foot: ey,
  idle: ay,
  caret: ny,
  jump: ty
}, ry = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Za(e) {
  return Number.isNaN(Date.parse(e)) ? "" : ry.format(new Date(e));
}
const ly = { warn: "warning", ok: "ok" };
function oy({ kind: e }) {
  const a = ly[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function iy({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Za(e)}` });
}
function sy({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Za(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: me.idle, children: i }),
    /* @__PURE__ */ n(iy, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const cy = 8;
function dy(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > cy;
}
function uy({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
function iC({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = N(null), [i, s] = p(0), [c, d] = p(!1), [u, h] = p(!1), f = e.at(-1);
  A(() => {
    s(e.length);
  }, [e.length]), Fa(() => {
    const g = l.current;
    g && !u && (g.scrollTop = g.scrollHeight);
  }, [e.length, u]);
  const b = () => {
    var j;
    const g = l.current;
    if (!g) return;
    const I = g.querySelectorAll("[data-consline-text]");
    (j = I.item(I.length - 1)) == null || j.focus(), h(!1);
  };
  return /* @__PURE__ */ o("div", { className: me.root, children: [
    /* @__PURE__ */ n("ol", { className: me.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (g) => h(dy(g.currentTarget)), children: e.map((g, I) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${g.kind}`, "data-kind": g.kind, "data-revealed": I < i, children: [
      /* @__PURE__ */ n("span", { className: me.at, children: Za(g.at) }),
      /* @__PURE__ */ n(oy, { kind: g.kind }),
      /* @__PURE__ */ n("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: g.text })
    ] }, `${g.at}-${I}`)) }),
    /* @__PURE__ */ o(sy, { connection: a, idleSince: t, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ n(uy, { shown: u, onJump: b })
    ] })
  ] });
}
const hy = "_row_11jhe_2", my = "_head_11jhe_14", wy = "_author_11jhe_20", _y = "_eta_11jhe_25", fy = "_edited_11jhe_26", vy = "_body_11jhe_32", by = "_reason_11jhe_37", py = "_actions_11jhe_42", be = {
  row: hy,
  head: my,
  author: wy,
  eta: _y,
  edited: fy,
  body: vy,
  reason: by,
  actions: py
}, gy = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function Ny(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function yy({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function ky({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: be.reason, id: a, children: e })
  ] });
}
function $y(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Cy(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(yy, { ...e }) : /* @__PURE__ */ n(ky, { reason: e.unavailable, reasonId: e.unavailableId });
}
function sC(e) {
  const { comment: a } = e;
  $y(e);
  const t = $(), r = `${t}-unavailable`, l = gy[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${be.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: be.head, children: [
      /* @__PURE__ */ n("span", { className: be.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: be.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: be.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: be.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: be.reason, id: t, children: Ny(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: be.actions, children: /* @__PURE__ */ n(Cy, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Sy = "_root_c46wj_2", Ry = "_attach_c46wj_11", Ty = "_actions_c46wj_17", Ey = "_reply_c46wj_23", Ly = "_replyRow_c46wj_28", xy = "_sendsAs_c46wj_42", Ue = {
  root: Sy,
  attach: Ry,
  actions: Ty,
  reply: Ey,
  replyRow: Ly,
  sendsAs: xy
};
function Ay({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = p(""), i = $();
  return /* @__PURE__ */ o("div", { className: Ue.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ue.replyRow, children: [
      /* @__PURE__ */ n(x, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(_, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ue.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function cC(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Ay, { ...e }) : /* @__PURE__ */ n(Iy, { ...e });
}
function Iy({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [s, c] = p("");
  return /* @__PURE__ */ o("div", { className: Ue.root, children: [
    /* @__PURE__ */ n(x, { kind: "textarea", label: e, value: s, onChange: c }),
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
      /* @__PURE__ */ n(_, { variant: "primary", onClick: () => l(a, s), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(_, { variant: "ghost", onClick: () => i(s), children: "Save draft" })
    ] })
  ] });
}
const My = "_list_1ih9e_2", qy = "_item_1ih9e_6", By = "_body_1ih9e_22", Py = "_text_1ih9e_28", Oy = "_evidence_1ih9e_37", Dy = "_consequence_1ih9e_49", jy = "_note_1ih9e_54", Pe = {
  list: My,
  item: qy,
  body: By,
  text: Py,
  evidence: Oy,
  consequence: Dy,
  note: jy
};
function Hy({ criterion: e }) {
  return /* @__PURE__ */ n(Le, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function yn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Fy(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function Wy({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Pe.body, children: [
    /* @__PURE__ */ n("span", { className: Pe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(yn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Pe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(yn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Pe.consequence, children: Fy(e.why) })
    ] })
  ] });
}
function zy({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Pe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Hy, { criterion: e }),
    /* @__PURE__ */ n(Wy, { criterion: e })
  ] });
}
function dC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(zy, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Pe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Gy = "_list_dwhoz_2", Uy = "_rung_dwhoz_6", Ky = "_name_dwhoz_18", Vy = "_actor_dwhoz_32", ia = {
  list: Gy,
  rung: Uy,
  name: Ky,
  actor: Vy
}, Yy = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function Xy({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = Yy[e.state];
  return /* @__PURE__ */ o("li", { className: ia.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ia.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ia.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function uC({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ia.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(Xy, { rung: a }, a.name)) });
}
const Jy = "_sheet_1fqco_2", Qy = "_title_1fqco_9", Zy = "_stage_1fqco_15", ek = "_effects_1fqco_20", ak = "_effect_1fqco_20", nk = "_numeral_1fqco_31", tk = "_effectText_1fqco_38", rk = "_refusals_1fqco_43", lk = "_reasons_1fqco_52", ok = "_reason_1fqco_52", ik = "_actions_1fqco_62", ue = {
  sheet: Jy,
  title: Qy,
  stage: Zy,
  effects: ek,
  effect: ak,
  numeral: nk,
  effectText: tk,
  refusals: rk,
  reasons: lk,
  reason: ok,
  actions: ik
};
function sk({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function hC({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = $(), d = `${c}-refusal`, [u, h] = p(""), f = t.length > 0;
  return /* @__PURE__ */ n(ea, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ue.effects, children: a.map((b, g) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ n("span", { className: ue.numeral, children: String(g + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ue.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      rs,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(x, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    f && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((b, g) => /* @__PURE__ */ n("li", { className: ue.reason, id: g === 0 ? d : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(sk, { refused: f, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const ck = "_list_1hvqu_2", dk = "_path_1hvqu_7", uk = "_head_1hvqu_21", hk = "_label_1hvqu_28", mk = "_consequence_1hvqu_35", wk = "_ask_1hvqu_36", Ge = {
  list: ck,
  path: dk,
  head: uk,
  label: hk,
  consequence: mk,
  ask: wk
}, ja = {
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
function _k({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(_, { variant: $n(a), size: "sm", onClick: () => t(e.kind), children: ja[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: $n(a), size: "sm", disabled: !0, describedBy: r, children: ja[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ge.ask, id: r, children: e.askInstead })
  ] });
}
function fk({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ge.path, "data-allowed": e.allowed, "data-role": kn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ge.head, children: [
      /* @__PURE__ */ n("span", { className: Ge.label, children: e.title ?? ja[e.kind] }),
      /* @__PURE__ */ n(m, { role: kn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ge.consequence, children: e.consequence }),
    /* @__PURE__ */ n(_k, { path: e, primary: a, onChoose: t })
  ] });
}
function mC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ge.list, children: e.map((t, r) => /* @__PURE__ */ n(fk, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const vk = "_list_1nyt1_2", bk = "_item_1nyt1_6", pk = "_node_1nyt1_18", gk = "_body_1nyt1_24", Nk = "_head_1nyt1_30", yk = "_stage_1nyt1_36", kk = "_version_1nyt1_41", $k = "_sentence_1nyt1_49", Ck = "_meta_1nyt1_54", ge = {
  list: vk,
  item: bk,
  node: pk,
  body: gk,
  head: Nk,
  stage: yk,
  version: kk,
  sentence: $k,
  meta: Ck
}, Sk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Rk({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function Tk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(Le, { size: 9, kind: Sk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Rk, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${ce(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${te(e.cost)}`
      ] })
    ] })
  ] });
}
function wC({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Tk, { entry: a }, a.stage + String(t))) });
}
const Ek = "_thread_1kn6s_3", Lk = "_turn_1kn6s_8", xk = "_who_1kn6s_27", Ak = "_body_1kn6s_32", sa = {
  thread: Ek,
  turn: Lk,
  who: xk,
  body: Ak
}, gt = Ve(!1);
function _C({ children: e, density: a }) {
  return /* @__PURE__ */ n(gt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${sa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function fC({ turn: e }) {
  if (!Ke(gt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${sa.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${sa.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ce(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${sa.body} ward-chat-body`, children: e.body })
  ] });
}
const Ik = "_list_1rt9c_3", Mk = "_row_1rt9c_7", qk = "_label_1rt9c_20", Bk = "_n_1rt9c_26", Pk = "_cause_1rt9c_33", Qe = {
  list: Ik,
  row: Mk,
  label: qk,
  n: Bk,
  cause: Pk
};
function Ok(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Dk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function jk({ row: e, formatNumber: a }) {
  return Ok(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Le, { size: 8, ...Dk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Hk, { cause: e.cause })
  ] });
}
function Hk({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function vC({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(jk, { row: t, formatNumber: a }, t.label)) });
}
const Fk = "_root_1jxwp_2", Wk = {
  root: Fk
};
function bC({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: Wk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ca, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const zk = "_row_dhbre_3", Gk = "_key_dhbre_13", Uk = "_stack_dhbre_24", Kk = "_value_dhbre_32", Vk = "_evidence_dhbre_39", Yk = "_mark_dhbre_47", We = {
  row: zk,
  key: Gk,
  stack: Uk,
  value: Kk,
  evidence: Vk,
  mark: Yk
};
function Xk({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ka, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function pC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${We.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${We.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${We.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${We.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${We.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${We.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(Xk, { state: e.state }) })
  ] });
}
const Jk = "_cell_1monp_2", Qk = {
  cell: Jk
}, Zk = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function e1(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function a1(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function n1(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: e1(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function t1(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function gC({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  a1(e, t);
  const r = t1(e);
  return /* @__PURE__ */ n(
    bs,
    {
      label: "Rejection routing",
      columns: Zk,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: Qk.cell, "data-norerun": l.noRerun ? !0 : void 0, children: n1(l, i) }),
      empty: a ?? /* @__PURE__ */ n(ed, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const r1 = "_row_ute8v_2", l1 = "_title_ute8v_11", o1 = "_turns_ute8v_20", i1 = "_waiting_ute8v_21", s1 = "_resolved_ute8v_22", c1 = "_activity_ute8v_23", d1 = "_cost_ute8v_29", u1 = "_link_ute8v_30", h1 = "_tableRow_ute8v_47", m1 = "_tableTitle_ute8v_59", w1 = "_tableResolved_ute8v_64", _1 = "_tableLink_ute8v_68", f1 = "_tableMeta_ute8v_83", v1 = "_tableCost_ute8v_90", b1 = "_tableActivity_ute8v_91", p1 = "_tableState_ute8v_101", g1 = "_tableRecord_ute8v_112", O = {
  row: r1,
  title: l1,
  turns: o1,
  waiting: i1,
  resolved: s1,
  activity: c1,
  cost: d1,
  link: u1,
  tableRow: h1,
  tableTitle: m1,
  tableResolved: w1,
  tableLink: _1,
  tableMeta: f1,
  tableCost: v1,
  tableActivity: b1,
  tableState: p1,
  tableRecord: g1
}, Nt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function N1(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function y1(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function k1(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const $1 = { duplicate: "CLOSED · DUPLICATE" };
function C1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: O.tableMeta, children: `waiting on ${e}` });
}
function S1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: O.tableCost, children: e === void 0 ? null : te(e) });
}
function R1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${O.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function T1({ session: e, href: a }) {
  const t = Nt[e.state];
  return /* @__PURE__ */ o("tr", { className: O.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: O.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${O.tableLink} ward-target`, href: W(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: O.tableMeta, children: y1(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: O.tableResolved, children: [
      k1(e.resolved),
      /* @__PURE__ */ n(C1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(S1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: O.tableActivity, children: N1(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: O.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: $1[e.state] ?? t.label }),
      /* @__PURE__ */ n(R1, { link: e.link })
    ] }) })
  ] });
}
function E1({ session: e }) {
  const a = Nt[e.state];
  return /* @__PURE__ */ o("div", { className: O.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: O.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: O.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: O.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: O.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: O.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : te(e.cost) }),
    /* @__PURE__ */ n("span", { className: O.activity, children: ce(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: O.link, href: W(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function NC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(T1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(E1, { session: e.session });
}
const L1 = "_block_1yy2v_3", x1 = "_list_1yy2v_9", A1 = "_line_1yy2v_14", Ha = {
  block: L1,
  list: x1,
  line: A1
}, I1 = { warn: "warning", ok: "ok" };
function M1({ kind: e }) {
  const a = I1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function q1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Ha.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(M1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function yC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ha.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ha.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(q1, { line: t }, `${r}-${t.text}`)) }) });
}
const B1 = "_band_tt7hp_1", P1 = "_head_tt7hp_8", O1 = "_cell_tt7hp_19", D1 = "_index_tt7hp_35", j1 = "_title_tt7hp_42", H1 = "_note_tt7hp_48", F1 = "_cellTitle_tt7hp_53", W1 = "_cellBody_tt7hp_58", z1 = "_tag_tt7hp_64", ve = {
  band: B1,
  head: P1,
  cell: O1,
  index: D1,
  title: j1,
  note: H1,
  cellTitle: F1,
  cellBody: W1,
  tag: z1
}, Cn = 4;
function kC({ index: e, title: a, note: t, cells: r }) {
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
  u$ as ActionStack,
  iC as ActivityConsole,
  wm as AgentCard,
  t$ as AppShell,
  U$ as AppearanceStrip,
  kC as Band,
  s$ as BarChart,
  qd as BoardColumn,
  S$ as BoardFootnote,
  R$ as BoardHeader,
  b$ as BoardScroller,
  _ as Btn,
  Z1 as CHIP_ROLES,
  st as CREDENTIAL_COLUMNS,
  i$ as Callout,
  K$ as CapabilityRow,
  fC as ChatMessage,
  En as Checkbox,
  m as Chip,
  sC as ClarificationRow,
  P$ as ClauseRuleRow,
  B$ as ClauseRules,
  Fn as ColourLadder,
  V$ as ComponentRow,
  cC as Composer,
  E$ as ConfigRow,
  T$ as ConfigRowHead,
  Va as ConnectionMark,
  _C as Conversation,
  rs as CostMeter,
  X$ as CredentialRow,
  Y$ as CredentialRowHead,
  dC as CriteriaList,
  wl as Crumb,
  vC as DeliveryHealth,
  N$ as DeniedState,
  O$ as DryRunRail,
  ed as EmptyState,
  J$ as EnvCard,
  x as Field,
  g$ as FilteredEmpty,
  f$ as FormStack,
  Ca as GateChecklist,
  uC as GateLadder,
  bs as Grid,
  j$ as HandoffRuleRow,
  D$ as HandoffRules,
  L$ as ItemDrawer,
  Q$ as KeyPanel,
  Ot as LIVE_EVENT_TYPES,
  Bh as LegacyBoardColumn,
  A$ as LegacyBoardHeader,
  I$ as LegacyConfigRow,
  q$ as LegacyItemDrawer,
  Eh as LegacyOverCapNote,
  M$ as LegacyPreviewRail,
  Dn as LegacyWorkCard,
  ke as LiveIndicator,
  y$ as LoadFailed,
  C$ as Loading,
  wt as MCP_SERVER_COLUMNS,
  Ka as Mark,
  eC as MarkUpload,
  Le as Marker,
  nC as McpServerRow,
  aC as McpServerRowHead,
  H$ as NewStreamModal,
  td as OverCapNote,
  ea as Overlay,
  zm as PARTIAL_STEP_REASON,
  _t as POLICY_CHIP_WIDTH,
  m$ as PageFrame,
  o$ as PageHeader,
  c$ as PlainList,
  tC as PolicyRow,
  x$ as PreviewRail,
  La as ROLE_MATRIX_COLUMNS,
  et as RULE_ACTIONS,
  Mn as Radio,
  bC as ReadyChecklist,
  _$ as RecordSection,
  hC as RequeueSheet,
  mC as ResolveBlock,
  pC as ResolvedFieldRow,
  rC as RoleMatrixRow,
  gC as RoutingTable,
  F$ as RuleRow,
  lC as RunbookSteps,
  Bt as STREAM_STEPS,
  v$ as SectionBand,
  un as SectionHeader,
  An as SegmentedControl,
  NC as SessionRow,
  l$ as Sidebar,
  W$ as StageColumn,
  p$ as StageGrid,
  wC as StageHistory,
  K_ as StageListEditor,
  k$ as StaleStrip,
  ya as StatStrip,
  z$ as StreamRow,
  w$ as SubjectRail,
  Oe as Switch,
  d$ as TableHead,
  r$ as Tabs,
  G$ as ToolRow,
  h$ as TopBar,
  bc as Tree,
  Bn as TreeRow,
  yC as TypedInputBlock,
  Mr as UNSAFE_HREF,
  oC as ValidationList,
  V1 as VisibilityProvider,
  Y1 as Visible,
  Q1 as WARD_VERSION,
  $a as WorkCard,
  $$ as WriteUnavailableStrip,
  N1 as agoSince,
  Tt as clock,
  uf as colourStatus,
  ee as count,
  se as duration,
  Wa as elapsed,
  J1 as eventSourceTransport,
  ba as isStreamStep,
  pa as isValidatedStreamStep,
  Gm as ladderValidation,
  Sg as mcpConnectionChip,
  $g as mcpToolName,
  te as money,
  we as ms,
  Pn as ordered,
  Sn as ratio,
  Zb as restartLabel,
  W as safeHref,
  ce as stamp,
  Tn as stream,
  a$ as streamChip,
  Na as streamChipProps,
  Ee as streamColour,
  jt as streamHex,
  e$ as streamVars,
  la as useBorderFlash,
  It as useFocusTrap,
  n$ as useLiveFeed,
  X1 as useReturnFocus,
  va as useRovingTabindex,
  za as useTicker,
  Et as useVisible,
  G as v,
  Z$ as validateMark,
  ga as validatedStep,
  Pt as validatedStreamSteps
};
