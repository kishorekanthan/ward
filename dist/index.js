import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as Nt, useContext as Ke, createContext as Ve, useCallback as Y, useEffect as x, useState as p, useRef as N, useLayoutEffect as ja, useId as $, Fragment as yt } from "react";
import { createPortal as kt } from "react-dom";
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
const $t = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ce(e) {
  const a = $t.formatToParts(new Date(e)), t = (r) => {
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
const Ct = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function St(e) {
  return Ct.format(new Date(e));
}
const Rn = Ve(/* @__PURE__ */ new Set());
function U1({ hidden: e, children: a }) {
  const t = Nt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Rn.Provider, { value: t, children: a });
}
function Rt(e) {
  return !Ke(Rn).has(e);
}
function K1({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(S, { children: Rt(e) ? a : t });
}
const Tt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Et(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function Lt(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Et(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function At(e) {
  return { onKeyDown: Y(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Tt));
      Lt(t, e.current, r);
    },
    [e]
  ) };
}
function V1(e, a = !0) {
  x(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const an = { ArrowUp: -1, ArrowDown: 1 }, nn = { ArrowLeft: -1, ArrowRight: 1 }, xt = (e, a, t) => Math.min(t, Math.max(a, e));
function It(e, a) {
  if (a !== "horizontal" && e in an) return an[e];
  if (a !== "vertical" && e in nn) return nn[e];
}
function fa({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = N(/* @__PURE__ */ new Map()), l = N(!1);
  ja(() => {
    var b;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const h = u[0], v = l.current;
    l.current = !1, t(h), v && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = Y((u) => t(u), []), s = Y((u) => {
    var h;
    t(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = Y(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const v = Math.max(0, h.indexOf(a)), b = It(u.key, e);
      b !== void 0 ? (u.preventDefault(), s(h[xt(v + b, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const Y1 = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, X1 = "0.2.0", J1 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Mt = [1, 2, 3, 4, 5, 6], qt = [1, 2, 3], Bt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
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
  return Mt.includes(e);
}
function pa(e) {
  return qt.includes(e);
}
function Q1(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function Z1(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Pt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Ot(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return Pt[e];
}
function tn(e) {
  return typeof e != "string" ? null : Bt.includes(e) ? e : null;
}
function Dt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Ht(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Ft(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function jt(e, a, t) {
  const r = Dt(e);
  if (r === null) return null;
  const l = tn(t) ?? tn(r.type);
  return l === null ? null : { ...r, type: l, id: Ht(r, a), at: Ft(r) };
}
function Wt(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function zt(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function e$(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), s = N(/* @__PURE__ */ new Map()), c = N(0), d = N(""), u = N(0), h = N(null), v = N(0), b = N(0), g = N(!1), I = N("reconnecting"), H = Y((C) => {
    I.current = C, r(C);
  }, []), oe = Y(() => {
    c.current = Date.now();
  }, []), $e = Y((C) => {
    for (const [z, ve] of s.current)
      (ve === "*" || C.itemKey === ve) && z(C);
  }, []), ae = Y(() => {
    h.current = a(e, { lastEventId: d.current }, {
      onEvent: (C, z, ve) => {
        const Ae = jt(C, z, ve);
        Ae !== null && (Ae.id && (d.current = Ae.id), oe(), g.current = !1, H("live"), i(Ae.at), $e(Ae));
      },
      onOpen: () => {
        u.current = 0, g.current = !1, oe(), H("live");
      },
      onError: () => {
        var z;
        (z = h.current) == null || z.close(), h.current = null, g.current = !0, I.current !== "stale" && H("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, v.current = window.setTimeout(ae, C);
      }
    });
  }, [$e, H, oe, a, e]), De = Y((C) => {
    g.current = !0, C.close(), h.current = null, v.current = window.setTimeout(ae, we.reconnectBase);
  }, [ae]), He = Y((C, z) => (s.current.set(z, C), () => {
    s.current.delete(z);
  }), []);
  return x(() => (ae(), b.current = window.setInterval(() => {
    const C = Date.now() - c.current, z = Wt(C, I.current);
    z && H(z);
    const ve = h.current;
    zt(C, g.current, ve) && De(ve);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(v.current), g.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [ae, De, H]), { connection: t, lastEventAt: l, subscribe: He };
}
function za(e, a) {
  const t = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return x(() => {
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
function Gt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function rn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function la(e, a) {
  const t = N(0), r = Y((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Gt() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), s.style.setProperty("--flash", `var(--ward-color-${i})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => rn(s), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => rn(s), we.flash)));
  }, [a, e]);
  return x(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Ut = "_root_1otpc_2", Kt = {
  root: Ut
};
function Vt(e, a, t, r, l) {
  const i = [Wa(a)];
  return e || i.push(`as of ${St(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function ke({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = za(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Vt(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Kt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ce(e)
    ] })
  ] });
}
const Yt = "_app_lu0b1_1", Xt = "_side_lu0b1_18", Jt = "_main_lu0b1_26", Qt = "_rail_lu0b1_33", Zt = "_page_lu0b1_40", er = "_root_lu0b1_91", ar = "_topbar_lu0b1_98", nr = "_mark_lu0b1_109", tr = "_brand_lu0b1_116", rr = "_tagline_lu0b1_122", lr = "_identity_lu0b1_128", or = "_tools_lu0b1_129", ir = "_metadata_lu0b1_138", sr = "_actor_lu0b1_153", cr = "_detail_lu0b1_154", dr = "_nav_lu0b1_159", ur = "_content_lu0b1_194", hr = "_toolsPanel_lu0b1_207", mr = "_skip_lu0b1_233", M = {
  app: Yt,
  side: Xt,
  main: Jt,
  rail: Qt,
  page: Zt,
  root: er,
  topbar: ar,
  mark: nr,
  brand: tr,
  tagline: rr,
  identity: lr,
  tools: or,
  metadata: ir,
  actor: sr,
  detail: cr,
  nav: dr,
  content: ur,
  toolsPanel: hr,
  skip: mr
}, wr = "_btn_j72f1_2", _r = "_primary_j72f1_13", vr = "_destructive_j72f1_24", fr = "_secondary_j72f1_34", br = "_ghost_j72f1_39", pr = "_overflow_j72f1_48", gr = "_sm_j72f1_55", Nr = "_disabled_j72f1_59", aa = {
  btn: wr,
  primary: _r,
  destructive: vr,
  secondary: fr,
  ghost: br,
  overflow: pr,
  sm: gr,
  disabled: Nr
};
function yr(e, a, t, r) {
  const l = a === "sm" ? [aa.sm, "ward-btn--sm"] : [], i = t ? [aa.disabled] : [];
  return [aa.btn, aa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function kr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function $r(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Cr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Sr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Rr(e, a, t) {
  return Sr(e.describedBy, a && t);
}
function Tr({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Er(e) {
  return e.children ?? e.label;
}
function _(e) {
  $r(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = Cr(e), i = $();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: yr(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": Rr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...kr(a, e.controls),
        children: Er(e)
      }
    ),
    /* @__PURE__ */ n(Tr, { id: i, reason: l })
  ] });
}
const Lr = /^([a-z][a-z0-9+.-]*):/i, Ar = /* @__PURE__ */ new Set(["http", "https"]), xr = "#";
function Ir(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Lr.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = Ir(e);
  return a === void 0 || Ar.has(a) ? e : xr;
}
function Ga(e) {
  const [a, t] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return x(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => t(s.matches);
    return r.addEventListener("change", l), t(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function Mr({ sidebar: e, header: a, children: t, rail: r }) {
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
function qr({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: M.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: W(t.href), "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function Ia({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Br({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(Ia, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Ia, { value: a, className: M.detail })
  ] });
}
function Pr() {
  const e = Ga("(max-width: 767.98px)"), a = $(), t = N(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Or({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: M.tools, children: /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: M.tools, children: e });
}
function Dr({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function Hr(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ n("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Ia, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ n(qr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(Br, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Or, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Fr(e) {
  const a = $(), t = Pr();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Hr, { ...e, menu: t }),
    /* @__PURE__ */ n(Dr, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function jr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function a$(e) {
  return jr(e) ? /* @__PURE__ */ n(Mr, { ...e }) : /* @__PURE__ */ n(Fr, { ...e });
}
function Ua(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Wr = "_root_o4yib_2", zr = "_row_o4yib_8", Gr = "_box_o4yib_14", Ur = "_label_o4yib_21", Kr = "_lockedNote_o4yib_26", Vr = "_consequence_o4yib_34", Yr = "_sample_o4yib_69", Me = {
  root: Wr,
  row: zr,
  box: Gr,
  label: Ur,
  lockedNote: Kr,
  consequence: Vr,
  sample: Yr
};
function Xr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Jr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Me.consequence} ward-check-consequence`, children: a }) : null;
}
function Qr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Me.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Zr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Me.sample, "aria-hidden": "true", children: e }) : null;
}
function En(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = Xr(e);
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
        /* @__PURE__ */ n(Qr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Zr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Jr, { id: t, text: e.consequence })
  ] });
}
const el = "_chip_1073r_2", al = {
  chip: el
}, nl = {
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
function tl(e, a) {
  if (e === "stream") return rl(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = nl[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function rl(e) {
  if (!e || !pa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Tn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${al.chip} ward-chip ward-chip--${e}`, style: tl(e, t), "data-ward-chip": e, "data-size": r, children: a });
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
const ll = "_nav_j90m2_2", ol = "_list_j90m2_8", il = "_item_j90m2_15", sl = "_link_j90m2_30", cl = "_sep_j90m2_40", dl = "_current_j90m2_44", ul = "_chips_j90m2_48", xe = {
  nav: ll,
  list: ol,
  item: il,
  link: sl,
  sep: cl,
  current: dl,
  chips: ul
};
function hl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: xe.nav, children: [
    /* @__PURE__ */ n("ol", { className: xe.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: xe.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: xe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${xe.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: xe.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${xe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const ml = "_field_fy549_2", wl = "_label_fy549_8", _l = "_labelHidden_fy549_15", vl = "_control_fy549_25", fl = "_mono_fy549_44", bl = "_area_fy549_49", pl = "_invalid_fy549_56", Te = {
  field: ml,
  label: wl,
  labelHidden: _l,
  control: vl,
  mono: fl,
  area: bl,
  invalid: pl
}, gl = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function Nl({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? gl : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function yl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function kl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const $l = { input: Nl, select: yl, textarea: kl };
function Cl(e, a, t) {
  const r = $l[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Sl(e, a, t) {
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
function Rl(e) {
  const a = e.mono ? [Te.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Te.area] : [];
  return [Te.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Tl(e) {
  return e ? `${Te.label} ${Te.labelHidden} ward-field-label` : `${Te.label} ward-field-label`;
}
function A(e) {
  const a = $(), t = `${a}-msg`, r = Sl(e, a, t), l = Rl(e);
  return /* @__PURE__ */ o("div", { className: `${Te.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Tl(e.labelHidden), htmlFor: a, children: e.label }),
    Cl(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Te.invalid} ward-field-error`, children: e.invalid })
  ] });
}
function El(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Ln(e) {
  const a = El(e);
  e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end);
}
function An(e, a) {
  x(() => {
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
const Ll = "_strip_tivso_2", Al = "_tab_tivso_26", xl = "_count_tivso_49", Ma = {
  strip: Ll,
  tab: Al,
  count: xl
}, ln = 7;
function Il(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Ml(e) {
  return `${Ma.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function ql(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Bl(e, a) {
  ja(() => {
    const t = e.current, r = t == null ? void 0 : t.querySelectorAll('[role="tab"]')[a];
    if (!t || !r) return;
    const l = ql(t, r);
    l !== null && (t.scrollLeft = Math.max(0, l)), Ln(t);
  }, [e, a]);
}
function n$({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ln) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ln} — the set is fixed`);
  const i = fa({ orientation: "horizontal" }), s = Il(e, a);
  x(() => i.setActive(s), [i.setActive, s]);
  const c = N(null);
  return An(c, e.length), Bl(c, s), /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      className: Ml(l),
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
const Pl = "_root_jem6y_2", Ol = "_segment_jem6y_7", on = {
  root: Pl,
  segment: Ol
};
function xn({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = fa({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return x(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${on.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
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
const Dl = "_sidebar_1jywv_3", Hl = "_brand_1jywv_9", Fl = "_mark_1jywv_17", jl = "_word_1jywv_24", Wl = "_nav_1jywv_30", zl = "_navItem_1jywv_38", Gl = "_group_1jywv_50", Ul = "_groupName_1jywv_57", Kl = "_agents_1jywv_70", Vl = "_agent_1jywv_70", Yl = "_agentTop_1jywv_88", Xl = "_dot_1jywv_95", Jl = "_agentName_1jywv_107", Ql = "_agentMeta_1jywv_120", Zl = "_foot_1jywv_126", eo = "_footName_1jywv_132", ao = "_footLinks_1jywv_139", no = "_footLink_1jywv_139", to = "_root_1jywv_153", ro = "_linkBrand_1jywv_162", lo = "_label_1jywv_183", oo = "_note_1jywv_188", io = "_footer_1jywv_202", R = {
  sidebar: Dl,
  brand: Hl,
  mark: Fl,
  word: jl,
  nav: Wl,
  navItem: zl,
  group: Gl,
  groupName: Ul,
  new: "_new_1jywv_64",
  agents: Kl,
  agent: Vl,
  agentTop: Yl,
  dot: Xl,
  agentName: Jl,
  agentMeta: Ql,
  foot: Zl,
  footName: eo,
  footLinks: ao,
  footLink: no,
  root: to,
  linkBrand: ro,
  label: lo,
  note: oo,
  footer: io
};
function so({ agent: e }) {
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
function co({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: R.foot, children: [
    /* @__PURE__ */ n("span", { className: R.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: R.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: R.footLink, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function uo({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: R.agents, children: r.map((s) => /* @__PURE__ */ n(so, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(co, { shared: i })
  ] });
}
function ho(e) {
  return e.destinations ?? e.items ?? [];
}
function mo({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.linkBrand, children: e });
}
function wo({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.footer, children: e });
}
function _o({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: R.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: R.note, children: e.note })
  ] });
}
function vo(e) {
  return /* @__PURE__ */ o("aside", { className: `${R.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(mo, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: ho(e).map((a) => /* @__PURE__ */ n(_o, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(wo, { children: e.children })
  ] });
}
function fo(e) {
  return "agents" in e;
}
function t$(e) {
  return fo(e) ? /* @__PURE__ */ n(uo, { ...e }) : /* @__PURE__ */ n(vo, { ...e });
}
const bo = "_mark_wlgi8_3", po = {
  mark: bo
}, go = { met: "✓", unmet: "", failed: "✕" };
function Ka({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: po.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: go[e]
    }
  );
}
const No = "_marker_br9fi_2", yo = {
  marker: No
}, ko = {
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
  const r = { "--marker": ko[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${yo.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const $o = "_root_ti0pq_2", Co = "_chip_ti0pq_11", So = "_noCase_ti0pq_23", na = {
  root: $o,
  chip: Co,
  noCase: So
};
function Ro(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Va({ connection: e, since: a, lastEventAt: t }) {
  const r = Ro(a, t), l = za(r, e === "reconnecting");
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
const To = "_root_k8vuh_2", Eo = "_context_k8vuh_12", Lo = "_row_k8vuh_1", Ao = "_heading_k8vuh_25", xo = "_headingWrap_k8vuh_33", Io = "_chips_k8vuh_38", Mo = "_title_k8vuh_45", qo = "_consequence_k8vuh_54", Bo = "_actionsWrap_k8vuh_59", Po = "_actions_k8vuh_59", Oo = "_action_k8vuh_59", Do = "_overflowPanel_k8vuh_78", Ho = "_measureClip_k8vuh_89", Fo = "_measure_k8vuh_89", Q = {
  root: To,
  context: Eo,
  row: Lo,
  heading: Ao,
  headingWrap: xo,
  chips: Io,
  title: Mo,
  consequence: qo,
  actionsWrap: Bo,
  actions: Po,
  action: Oo,
  overflowPanel: Do,
  measureClip: Ho,
  measure: Fo
};
function jo({ title: e, consequence: a, consequenceHint: t }) {
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
function Wo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(sn, { disclosure: l }) : a ? [/* @__PURE__ */ n(sn, { disclosure: l }, "more"), /* @__PURE__ */ n(qa, { actions: e }, "actions")] : /* @__PURE__ */ n(qa, { actions: e });
}
function zo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Go({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Q.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(qa, { actions: e }) });
}
function Uo(e, a) {
  const t = $(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Ko({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Q.context, children: [
    /* @__PURE__ */ n(hl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Q.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function Vo(...e) {
  return e.some((a) => a === null);
}
function Yo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Xo(e, a, t, r, l) {
  if (l === 0 || Vo(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], d = Yo(e), u = Math.max(0, e.clientWidth - i.offsetWidth - d);
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function Jo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Qo(e) {
  const a = N(null), t = N(null), r = N(null), l = N(null), [i, s] = p(!1);
  return x(() => {
    const c = a.current;
    if (!Jo(c)) return;
    const d = () => s(Xo(c, t.current, r.current, l.current, e.length)), u = new ResizeObserver(d);
    return u.observe(c), d(), () => u.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function Zo({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: Q.measureClip, children: /* @__PURE__ */ o("div", { className: Q.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function ei({ connection: e }) {
  return e ? /* @__PURE__ */ n(Va, { connection: e.connection, since: e.since }) : null;
}
function r$({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: h, headingRef: v, actionsRef: b, measureRef: g, collapsed: I } = Qo(i), H = s.length > 0, { disclosure: oe, close: $e } = Uo(I || H, b), ae = zo(s, i, I, d);
  return /* @__PURE__ */ o("header", { className: Q.root, "data-density": u, children: [
    /* @__PURE__ */ n(Ko, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Q.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: v, className: Q.headingWrap, children: /* @__PURE__ */ n(jo, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: Q.actionsWrap, children: [
        /* @__PURE__ */ n(ei, { connection: c }),
        /* @__PURE__ */ n("div", { className: Q.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(Wo, { actions: i, hasMore: H, collapsed: I, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Go, { actions: ae, disclosure: oe, onEscape: $e }),
    /* @__PURE__ */ n(Zo, { actions: i, hasMore: H, measureRef: g })
  ] });
}
const ai = "_scrim_c7sqj_2", ni = "_drawer_c7sqj_10", ti = "_sheet_c7sqj_14", ri = "_modal_c7sqj_18", li = "_panel_c7sqj_23", oi = "_header_c7sqj_51", ii = "_title_c7sqj_59", si = "_body_c7sqj_63", ci = "_close_c7sqj_90", Ne = {
  scrim: ai,
  drawer: ni,
  sheet: ti,
  modal: ri,
  panel: li,
  header: oi,
  title: ii,
  body: si,
  close: ci
}, di = Ve(null), ca = [], da = /* @__PURE__ */ new Map();
function ui(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function hi(e, a) {
  let t = da.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, da.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function mi(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !ui(r) && hi(e, r);
}
function wi(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (mi(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function _i(e) {
  for (const a of e.claims) {
    const t = da.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), da.delete(a)));
  }
}
function vi(e, a) {
  const t = { root: e, claims: [] };
  return ca.push(t), wi(t, a), t;
}
function fi(e) {
  const a = ca.indexOf(e);
  a >= 0 && ca.splice(a, 1), _i(e);
}
function cn(e) {
  return e !== null && ca.at(-1) === e;
}
function bi(e, a, t) {
  const r = N(null), l = N(t);
  return l.current = t, x(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = vi(i, a);
    return r.current = c, () => {
      var u, h;
      const d = cn(c);
      fi(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [a]), Y(() => cn(r.current), []);
}
function pi(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function gi(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ni({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${Ne.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ne.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, children: e.children })
  ] });
}
function yi(e) {
  return `${Ne.scrim} ${Ne[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ki(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ne.panel} ${Ne[e]} ward-overlay-panel${t}${r}`;
}
function $i(e) {
  const a = Ke(di);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = N(null), t = N(null), r = $(), l = $i(e.container), i = Ga("(min-width: 768px)"), s = pi(e.kind, i), c = gi(e, r), d = At(t), u = bi(a, l, e.returnFocusTo), h = Y(() => {
    u() && e.onClose();
  }, [e.onClose, u]);
  return x(() => {
    var v, b;
    u() && ((b = (v = t.current) == null ? void 0 : v.querySelector("button")) == null || b.focus());
  }, [u]), x(() => {
    const v = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [h]), kt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: yi(s),
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
            className: ki(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (v) => v.stopPropagation(),
            onKeyDown: (v) => u() && d.onKeyDown(v),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ne.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Ni, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Ci = "_root_drrhx_2", Si = "_ticket_drrhx_15", Ri = "_body_drrhx_24", Sa = {
  root: Ci,
  ticket: Si,
  body: Ri
};
function l$({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Sa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Sa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Sa.body, children: t })
  ] });
}
const Ti = "_root_bf1pc_2", Ei = "_table_bf1pc_9", Li = "_caption_bf1pc_14", Ai = "_series_bf1pc_23", xi = "_category_bf1pc_31", Ii = "_cell_bf1pc_39", Mi = "_track_bf1pc_45", qi = "_lane_bf1pc_52", Bi = "_bar_bf1pc_56", Pi = "_value_bf1pc_63", Oi = "_swatch_bf1pc_70", Di = "_empty_bf1pc_78", V = {
  root: Ti,
  table: Ei,
  caption: Li,
  series: Ai,
  category: xi,
  cell: Ii,
  track: Mi,
  lane: qi,
  bar: Bi,
  value: Pi,
  swatch: Oi,
  empty: Di
}, Hi = "—", dn = 6;
function Fi(e, a) {
  if (a.length < 1 || a.length > dn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${dn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function ji(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function In(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Wi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function zi({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Wi(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ o("span", { className: V.track, children: [
    /* @__PURE__ */ n("span", { className: V.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${V.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: V.value, children: e === null ? l : r(e) })
  ] }) });
}
function Gi({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: V.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: V.swatch, "data-step": In(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Ui({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${V.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: V.caption, children: e }),
    /* @__PURE__ */ n("p", { className: V.empty, children: a })
  ] });
}
function Ki({ title: e, categories: a, series: t, top: r, format: l = ee, categoryHead: i = "Category", missing: s = Hi }) {
  return /* @__PURE__ */ n("div", { className: `${V.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: V.table, children: [
    /* @__PURE__ */ n("caption", { className: V.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: V.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Gi, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: V.category, children: c }),
      t.map((u, h) => /* @__PURE__ */ n(zi, { value: u.values[d], top: r, step: In(h, t.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function o$(e) {
  Fi(e.categories, e.series);
  const a = ji(e.series);
  return a === 0 ? /* @__PURE__ */ n(Ui, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Ki, { ...e, top: a });
}
const Vi = "_root_1bfqw_2", Yi = "_figure_1bfqw_7", Xi = "_of_1bfqw_13", Ji = "_bar_1bfqw_18", Qi = "_rows_1bfqw_38", Zi = "_row_1bfqw_38", es = "_label_1bfqw_49", as = "_amount_1bfqw_54", Ce = {
  root: Vi,
  figure: Yi,
  of: Xi,
  bar: Ji,
  rows: Qi,
  row: Zi,
  label: es,
  amount: as
};
function ns({ spent: e, ceiling: a, breakdown: t }) {
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
const ts = "_frame_mg2jl_2", rs = "_table_mg2jl_6", ls = "_th_mg2jl_12", os = "_td_mg2jl_13", is = "_sort_mg2jl_47", ss = "_row_mg2jl_53", cs = "_empty_mg2jl_61", Re = {
  frame: ts,
  table: rs,
  th: ls,
  td: os,
  sort: is,
  row: ss,
  empty: cs
}, ds = { asc: "ascending", desc: "descending" };
function us(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ds[a.direction];
}
function hs(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function ms(e) {
  return e === void 0 ? void 0 : { width: e };
}
function ws({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: ms(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": us(e, a),
      children: hs(e, t)
    }
  );
}
function _s({ row: e, props: a }) {
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
function vs({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(ws, { column: h, sort: c, onSort: d }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(_s, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(h))) })
  ] }) });
}
const fs = "_list_v0s52_2", bs = {
  list: fs
};
function i$({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: bs.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const ps = "_label_1u62a_2", gs = {
  label: ps
};
function s$({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: gs.label, children: a.header }) }, a.key)) }) });
}
const Ns = "_stack_bp6a0_2", ys = {
  stack: Ns
};
function c$({ children: e }) {
  return /* @__PURE__ */ n("span", { className: ys.stack, "data-ward-action-stack": "", children: e });
}
const ks = "_set_y5zy3_2", $s = "_legend_y5zy3_7", Cs = "_row_y5zy3_15", Ss = "_control_y5zy3_20", Rs = "_input_y5zy3_26", Ts = "_label_y5zy3_31", Es = "_consequence_y5zy3_36", Ie = {
  set: ks,
  legend: $s,
  row: Cs,
  control: Ss,
  input: Rs,
  label: Ts,
  consequence: Es
};
function Mn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = $(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: Ie.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ie.legend, children: e }),
    a.map((h) => {
      const v = `${u}-${h.value}`, b = h.consequence ? `${v}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Ie.row, children: [
        /* @__PURE__ */ o("span", { className: Ie.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: v,
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
          /* @__PURE__ */ n("label", { htmlFor: v, className: Ie.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Ie.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Ls = "_root_1pyf1_2", As = "_head_1pyf1_11", xs = "_index_1pyf1_31", Is = "_dot_1pyf1_35", Ms = "_note_1pyf1_40", qs = "_counter_1pyf1_46", Bs = "_trailing_1pyf1_54", qe = {
  root: Ls,
  head: As,
  index: xs,
  dot: Is,
  note: Ms,
  counter: qs,
  trailing: Bs
};
function Ps({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${qe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: qe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Os({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.counter, "aria-hidden": "true", children: e }) : null;
}
function un({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: qe.head, children: [
      /* @__PURE__ */ n(Ps, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: qe.note, children: t }),
    /* @__PURE__ */ n(Os, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: qe.trailing, children: i })
  ] });
}
const Ds = "_strip_1cfs3_2", Hs = "_cell_1cfs3_7", Fs = "_value_1cfs3_12", js = "_link_1cfs3_27", Ws = "_label_1cfs3_39", Xe = {
  strip: Ds,
  cell: Hs,
  value: Fs,
  link: js,
  label: Ws
};
function zs(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function Gs({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(S, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Xe.link} ward-stat-link`, href: W(e.href), "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function ya({ cells: e, divided: a = !1 }) {
  return zs(e), /* @__PURE__ */ n("dl", { className: `${Xe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Xe.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Xe.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, title: t.hint, children: /* @__PURE__ */ n(Gs, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Xe.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Us = "_root_xk7sv_2", Ks = "_track_xk7sv_8", Vs = "_thumb_xk7sv_35", Ys = "_labelHidden_xk7sv_53", Xs = "_label_xk7sv_53", Js = "_lockedNote_xk7sv_68", Be = {
  root: Us,
  track: Ks,
  thumb: Vs,
  labelHidden: Ys,
  label: Xs,
  lockedNote: Js
};
function Qs(e) {
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
    /* @__PURE__ */ o("span", { id: c, className: Qs(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const Zs = "_bar_1u2kl_2", ec = "_skip_1u2kl_11", ac = "_mark_1u2kl_22", nc = "_nav_1u2kl_30", tc = "_list_1u2kl_34", rc = "_select_1u2kl_40", lc = "_dest_1u2kl_47", oc = "_actor_1u2kl_61", ic = "_actorMark_1u2kl_74", sc = "_actorLabel_1u2kl_79", cc = "_tagline_1u2kl_98", de = {
  bar: Zs,
  skip: ec,
  mark: ac,
  nav: nc,
  list: tc,
  select: rc,
  dest: lc,
  actor: oc,
  actorMark: ic,
  actorLabel: sc,
  tagline: cc
};
function dc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function uc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function d$({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = uc(r);
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
      /* @__PURE__ */ n("span", { className: de.actorMark, "aria-hidden": "true", children: dc(c) })
    ] })
  ] });
}
const hc = "_tree_1lyby_2", mc = "_item_1lyby_6", wc = "_row_1lyby_10", _c = "_button_1lyby_22", ua = {
  tree: hc,
  item: mc,
  row: wc,
  button: _c
}, qn = Ve(null);
function vc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = fa({ orientation: "vertical" });
  return /* @__PURE__ */ n(qn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ua.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const fc = { ArrowRight: !0, ArrowLeft: !1 };
function hn(e) {
  return e ? !0 : void 0;
}
function bc(e, a) {
  const t = fc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function pc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function gc(e) {
  const a = [ua.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Nc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function yc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function kc(e) {
  return typeof e == "string" ? e : void 0;
}
function $c({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Cc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Bn(e) {
  const a = Ke(qn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = Nc(e);
  return /* @__PURE__ */ o("li", { className: ua.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: gc(e),
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
            onClick: () => pc(e),
            onKeyDown: (r) => bc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: yc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: kc(e.label), children: e.label }),
              /* @__PURE__ */ n($c, { value: e.detail }),
              /* @__PURE__ */ n(Cc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Sc = "_frame_1tok6_2", Rc = "_subjectRail_1tok6_21", Tc = "_subject_1tok6_21", Ec = "_rail_1tok6_41", Lc = "_record_1tok6_63", Ac = "_recordBody_1tok6_68", xc = "_stageGrid_1tok6_117", Ic = "_band_1tok6_143", Mc = "_bandBody_1tok6_152", qc = "_bandActions_1tok6_157", Bc = "_scroller_1tok6_165", Pc = "_lanes_1tok6_183", le = {
  frame: Sc,
  subjectRail: Rc,
  subject: Tc,
  rail: Ec,
  record: Lc,
  recordBody: Ac,
  stageGrid: xc,
  band: Ic,
  bandBody: Mc,
  bandActions: qc,
  scroller: Bc,
  lanes: Pc
};
function u$({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: le.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function mn(e) {
  return e ? "true" : void 0;
}
function h$({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: le.subjectRail, "data-ward-subject-rail": t, "data-ruled": mn(i), children: [
    /* @__PURE__ */ n("div", { className: le.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: le.rail, "data-sticky": mn(l), "aria-label": r, children: a })
  ] });
}
function m$({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: le.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(un, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: le.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(un, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: le.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Oc = "_form_1j8ub_2", Dc = "_fields_1j8ub_9", Hc = "_actions_1j8ub_19", Ra = {
  form: Oc,
  fields: Dc,
  actions: Hc
};
function w$({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ra.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ra.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ra.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function _$({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: le.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: le.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: le.bandActions, children: a })
  ] });
}
const Fc = "(max-width: 767.98px)";
function Ba({ label: e, children: a, laneCount: t }) {
  const r = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { className: le.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: r, children: a });
}
function jc({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: le.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(A, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Ba, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function v$({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Ga(Fc);
  return t === void 0 ? /* @__PURE__ */ n(Ba, { label: a, children: e }) : l ? /* @__PURE__ */ n(jc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Ba, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n(yt, { children: i.content }, i.id)) });
}
function f$({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = N(null), i = Math.max(e, 1);
  An(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: le.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const Wc = "_block_1o5o7_2", zc = "_sentence_1o5o7_15", Gc = "_meta_1o5o7_20", Uc = "_action_1o5o7_25", Kc = "_strip_1o5o7_29", Vc = "_loading_1o5o7_48", Yc = "_label_1o5o7_56", Xc = "_counter_1o5o7_63", _e = {
  block: Wc,
  sentence: zc,
  meta: Gc,
  action: Uc,
  strip: Kc,
  loading: Vc,
  label: Yc,
  counter: Xc
};
function Jc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(_, { onClick: e.onClick, children: e.label }) });
}
function ka({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: _e.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Jc, { action: a })
  ] });
}
function Qc(e) {
  return /* @__PURE__ */ n(ka, { ...e, kind: "ward-emptystate" });
}
function b$({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ka, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function p$(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function g$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ka, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    ce(a)
  ] }) });
}
function N$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ce(e),
    ". Showing snapshot from ",
    ce(a)
  ] });
}
function y$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ce(a)
  ] });
}
function k$({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  x(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = za(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: Wa(i) }) : null
  ] });
}
const Zc = "_note_tlubt_2", ed = {
  note: Zc
};
function ad({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: ed.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const nd = "_card_12in3_2", td = "_hit_12in3_23", rd = "_head_12in3_30", ld = "_title_12in3_36", od = "_meta_12in3_44", id = "_fields_12in3_45", sd = "_who_12in3_58", cd = "_sep_12in3_65", dd = "_mono_12in3_69", ud = "_field_12in3_45", hd = "_last_12in3_84", md = "_reason_12in3_96", X = {
  card: nd,
  hit: td,
  head: rd,
  title: ld,
  meta: od,
  fields: id,
  who: sd,
  sep: cd,
  mono: dd,
  field: ud,
  last: hd,
  reason: md
}, wd = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function _d(e, a, t) {
  const r = la(e, "blue"), l = la(e, "orange"), i = la(e, "green"), s = N(/* @__PURE__ */ new Set());
  x(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = wd[d.type];
      u && c[u]();
    });
  }, [r, t, i, a, l]);
}
const vd = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : te(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function fd(e, a) {
  return vd[a](e);
}
function bd({ item: e, connection: a }) {
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
function pd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: X.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function gd({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: X.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Nd({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: X.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: X.field, children: fd(e, t) }, t)) });
}
const Pa = (e) => e ? !0 : void 0;
function yd(e) {
  return { "--stream": Ee(e.streamStep, "id") };
}
function kd(e, a, t) {
  e == null || e(a, t);
}
function $d(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Cd({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: X.last, "data-stale": Pa(a), children: t }) : null;
}
function $a(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  _d(r, t.key, e.feed);
  const l = $d(e.feed), i = yd(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: X.hit, onClick: (s) => kd(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(pd, { item: t }),
        /* @__PURE__ */ n("p", { className: X.title, children: t.title }),
        /* @__PURE__ */ n(bd, { item: t, connection: l }),
        /* @__PURE__ */ n(gd, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Nd, { item: t, fields: a }),
        /* @__PURE__ */ n(Cd, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const Sd = "_column_10sxg_3", Rd = "_head_10sxg_24", Td = "_label_10sxg_33", Ed = "_count_10sxg_42", Ld = "_list_10sxg_56", Je = {
  column: Sd,
  head: Rd,
  label: Td,
  count: Ed,
  list: Ld
};
function Pn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Ad({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function xd(e) {
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
function Id({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = $(), h = e.cap !== void 0 && a.length > e.cap, v = Pn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Ad, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ n(xd, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: v }),
    h && /* @__PURE__ */ n(ad, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Md = "_foot_8qg4p_2", qd = "_note_8qg4p_13", Bd = "_link_8qg4p_19", Ta = {
  foot: Md,
  note: qd,
  link: Bd
};
function $$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ta.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ta.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Ta.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Pd = "_head_1la6p_3", Od = "_identity_1la6p_12", Dd = "_titleRow_1la6p_18", Hd = "_title_1la6p_18", Fd = "_key_1la6p_35", jd = "_rollup_1la6p_45", Wd = "_tools_1la6p_53", zd = "_swatch_1la6p_62", Gd = "_mark_1la6p_69", pe = {
  head: Pd,
  identity: Od,
  titleRow: Dd,
  title: Hd,
  key: Fd,
  rollup: jd,
  tools: Wd,
  swatch: zd,
  mark: Gd
}, wn = "initials:";
function Ud(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function Kd(e) {
  const a = [Ud(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function Vd(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Kd(e)
  ] });
}
function Yd(e) {
  return e.startsWith(wn) ? e.slice(wn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Xd({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ee(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${pe.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Yd(e) }) : /* @__PURE__ */ n("span", { className: pe.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Jd({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function C$({
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
        /* @__PURE__ */ n(Xd, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: pe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: pe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: pe.rollup, "aria-live": "polite", children: Vd(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: pe.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Jd, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(_, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Va, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Qd = "_head_kabyh_11", Zd = "_line_kabyh_12", eu = "_cHandle_kabyh_33", au = "_cName_kabyh_38", nu = "_nameLine_kabyh_46", tu = "_cLabel_kabyh_53", ru = "_cCap_kabyh_58", lu = "_cShown_kabyh_63", ou = "_name_kabyh_46", iu = "_noCap_kabyh_85", su = "_state_kabyh_99", cu = "_handle_kabyh_104", du = "_sub_kabyh_118", B = {
  head: Qd,
  line: Zd,
  cHandle: eu,
  cName: au,
  nameLine: nu,
  cLabel: tu,
  cCap: ru,
  cShown: lu,
  name: ou,
  noCap: iu,
  state: su,
  handle: cu,
  sub: du
}, uu = "can't be hidden or collapsed", hu = "terminal · counted, not a column";
function S$() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: B.cHandle }),
    /* @__PURE__ */ n("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: B.cShown, children: "Shown" })
  ] });
}
function mu(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function wu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function _n(e) {
  return e.gate ? uu : e.terminal ? hu : wu(e.agentsMounted);
}
function _u(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function vu({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ n("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    _n(e) && /* @__PURE__ */ n("span", { className: B.sub, children: _n(e) })
  ] });
}
function fu(e) {
  return e === void 0 ? "" : String(e);
}
function bu(e) {
  return e === "" ? void 0 : Number(e);
}
function pu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: B.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: B.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => _u(t, a),
      children: "⠿"
    }
  ) });
}
function gu({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: B.cCap, children: /* @__PURE__ */ n(A, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: fu(a.cap), onChange: (r) => t({ ...a, cap: bu(r) }) }) });
}
function Nu({ stage: e, config: a, onChange: t }) {
  const r = mu(e, a.shown);
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ n(Oe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: B.state, "aria-hidden": "true", children: r.state })
  ] });
}
function yu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function R$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": yu(e), children: [
    /* @__PURE__ */ n(pu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(vu, { stage: e }),
    /* @__PURE__ */ n("span", { className: B.cLabel, children: /* @__PURE__ */ n(A, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(gu, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Nu, { stage: e, config: a, onChange: t })
  ] });
}
const ku = "_body_hn6d6_2", $u = "_head_hn6d6_9", Cu = "_summary_hn6d6_19", Su = "_block_hn6d6_20", Ru = "_actionsBlock_hn6d6_21", Tu = "_title_hn6d6_41", Eu = "_note_hn6d6_46", Lu = "_k_hn6d6_51", Au = "_kv_hn6d6_58", xu = "_row_hn6d6_64", Iu = "_label_hn6d6_75", Mu = "_value_hn6d6_84", qu = "_quote_hn6d6_90", Bu = "_actions_hn6d6_21", Pu = "_resolve_hn6d6_103", P = {
  body: ku,
  head: $u,
  summary: Cu,
  block: Su,
  actionsBlock: Ru,
  title: Tu,
  note: Eu,
  k: Lu,
  kv: Au,
  row: xu,
  label: Iu,
  value: Mu,
  quote: qu,
  actions: Bu,
  resolve: Pu
};
function Ou(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Du(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Hu(e) {
  const a = ga(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Fu(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Na(Hu(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Ou(e),
    ...Du(e, a)
  ];
}
function ju({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: P.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: P.k, children: a }),
    e
  ] });
}
function Wu({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: P.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function zu({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: P.block, children: [
    /* @__PURE__ */ n("p", { className: P.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: P.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: P.note, children: e.agentMeta })
  ] }) : null;
}
function T$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const d = $(), u = Fu(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: d, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: P.body, children: [
    /* @__PURE__ */ n(Wu, { item: e }),
    /* @__PURE__ */ o("div", { className: P.summary, children: [
      /* @__PURE__ */ n("h2", { className: P.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: P.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: P.kv, children: u.map(([h, v]) => /* @__PURE__ */ o("div", { className: P.row, children: [
      /* @__PURE__ */ n("dt", { className: P.label, children: h }),
      /* @__PURE__ */ n("dd", { className: P.value, children: v })
    ] }, h)) }),
    /* @__PURE__ */ n(zu, { item: e }),
    /* @__PURE__ */ o("div", { className: P.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: P.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: P.note, children: c })
    ] }),
    /* @__PURE__ */ n(ju, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Gu = "_root_3azmy_2", Uu = "_list_3azmy_7", Ku = "_item_3azmy_12", Vu = "_box_3azmy_18", Yu = "_text_3azmy_23", Xu = "_note_3azmy_28", Fe = {
  root: Gu,
  list: Uu,
  item: Ku,
  box: Vu,
  text: Yu,
  note: Xu
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
const Ju = "_rail_ke7ch_2", Qu = "_k_ke7ch_11", Zu = "_head_ke7ch_19", eh = "_section_ke7ch_25", ah = "_card_ke7ch_38", nh = "_strip_ke7ch_42", th = "_skeleton_ke7ch_56", rh = "_skeletonLabel_ke7ch_70", lh = "_bar_ke7ch_76", oh = "_note_ke7ch_85", he = {
  rail: Ju,
  k: Qu,
  head: Zu,
  section: eh,
  card: ah,
  strip: nh,
  skeleton: th,
  skeletonLabel: rh,
  bar: lh,
  note: oh
};
function ih(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ea({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: he.k, children: e }),
    a
  ] });
}
function sh({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function ch({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Id, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function dh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(ch, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(sh, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function E$(e) {
  const a = ih(e.onOpen), t = Pn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ea, { title: "Card", children: /* @__PURE__ */ n("div", { className: he.card, children: t && /* @__PURE__ */ n($a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ea, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(dh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ea, { title: "Effect of this config", children: /* @__PURE__ */ n(Ca, { items: e.effects, density: "compact" }) })
  ] });
}
function uh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function hh(e) {
  return Math.ceil(e.length / 2);
}
function mh(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function On(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function wh(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = On(e);
  l !== void 0 && t(l), r(mh(e.type));
}
function _h(e, a, t, r, l) {
  x(() => {
    if (e !== null)
      return e.subscribe(a, (i) => wh(i, t, r, l));
  }, [e, a, t, r, l]);
}
function vh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function fh(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function bh(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function ph(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(hh(a ?? [])) + ")"
  };
}
function gh(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Nh(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: te(e.cost) }) : null;
}
function yh(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function kh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function $h(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Ch(e, a) {
  return a === void 0 ? e : uh(e, a.ref);
}
function Sh(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ze(e) {
  return e === !0 ? "true" : void 0;
}
function Dn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = N(null), i = la(l), s = N(/* @__PURE__ */ new Set()), [c, d] = p(vh(a));
  _h(e.feed, a.key, s, d, i);
  const u = fh(a, r), h = bh(a, t), v = ph(a, e.fields), b = $h(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Sh(e),
      className: "ward-workcard",
      "data-flagged": Ze(a.flagged),
      "data-selected": Ze(e.selected),
      style: v,
      ref: Ch(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        gh(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Nh(a, e.fields),
          yh(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          kh(t, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Rh({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Th(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Eh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Lh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Rh, { count: e.items.length, cap: e.column.cap });
}
function Ah(e, a) {
  return e.roving ?? a;
}
function xh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Ih(e, a) {
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
function Mh(e) {
  const a = $(), t = fa({ orientation: "vertical" }), r = Ah(e, t), l = Th(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ze(l), "data-gate": Ze(e.column.gate), children: [
    Eh(e.column, e.items.length, a),
    Lh(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...xh(e, t), children: Ih(e, r) })
  ] });
}
function qh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Bh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Ph(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function L$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: qh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Bh(e),
      Ph(e.onConfigure),
      /* @__PURE__ */ n(Va, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Oh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Dh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Oe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Oe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Hh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function A$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ze(Oh(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Dh(e) }),
    /* @__PURE__ */ n(A, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(En, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Hh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function x$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Dn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Mh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Fh(e, a) {
  const t = On(e);
  t !== void 0 && a(t);
}
function jh(e, a, t) {
  x(() => {
    if (e != null)
      return e.subscribe(a, (r) => Fh(r, t));
  }, [e, a, t]);
}
function Wh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function zh(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", te(e.cost)]), a;
}
function Gh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Uh(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function I$(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  jh(e.feed, a.key, l);
  const i = [...Wh(a), ...zh(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Gh(t, r)
    ] }),
    Uh(a, e.actions)
  ] });
}
const Kh = "_card_hvxp7_2", Vh = "_head_hvxp7_17", Yh = "_mark_hvxp7_25", Xh = "_name_hvxp7_37", Jh = "_chips_hvxp7_48", Qh = "_description_hvxp7_54", Zh = "_run_hvxp7_59", em = "_sep_hvxp7_68", am = "_facts_hvxp7_73", nm = "_fact_hvxp7_73", tm = "_factLabel_hvxp7_86", rm = "_factValue_hvxp7_90", re = {
  card: Kh,
  head: Vh,
  mark: Yh,
  name: Xh,
  chips: Jh,
  description: Qh,
  run: Zh,
  sep: em,
  facts: am,
  fact: nm,
  factLabel: tm,
  factValue: rm
}, lm = { live: "done", draft: "running", paused: "meta" };
function om(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function im({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: lm[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function sm({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: re.description, children: e });
}
function cm({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function dm({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ n("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function um(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function hm({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": Ee(e.streamStep, "id") }, d = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: om(s),
      style: c,
      "data-selected": d,
      "data-paused": um(e.versions),
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ n("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${re.name} ward-rowlink ward-target`, href: W(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(sm, { description: e.description }),
        /* @__PURE__ */ n(cm, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(im, { versions: e.versions }),
        /* @__PURE__ */ n(dm, { facts: i })
      ]
    }
  );
}
const mm = "_list_4dcyc_2", wm = "_row_4dcyc_11", _m = "_head_4dcyc_23", vm = "_id_4dcyc_30", fm = "_lock_4dcyc_35", bm = "_reason_4dcyc_41", pm = "_remove_4dcyc_46", gm = "_clauses_4dcyc_50", Nm = "_clause_4dcyc_50", ym = "_label_4dcyc_64", km = "_cell_4dcyc_71", $m = "_value_4dcyc_76", ie = {
  list: mm,
  row: wm,
  head: _m,
  id: vm,
  lock: fm,
  reason: bm,
  remove: pm,
  clauses: gm,
  clause: Nm,
  label: ym,
  cell: km,
  value: $m
}, Hn = Ve(!1);
function M$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Hn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function Cm({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(A, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function Sm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ie.reason, children: e })
  ] });
}
function Rm({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ n("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Sm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function vn(e, a) {
  return e.locked ? void 0 : a;
}
function q$({ rule: e, onChange: a, onRemove: t }) {
  if (!Ke(Hn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = vn(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Rm, { rule: e, onRemove: vn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ n("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ie.cell, children: /* @__PURE__ */ n(Cm, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Tm = "_ladder_wwnch_2", Em = "_cell_wwnch_7", Lm = "_empty_wwnch_26", Am = "_name_wwnch_34", xm = "_holder_wwnch_40", Im = "_request_wwnch_46", Mm = "_swatches_wwnch_51", qm = "_swatch_wwnch_51", Bm = "_tilesFrame_wwnch_78", Pm = "_tiles_wwnch_78", Om = "_tile_wwnch_78", Dm = "_bar_wwnch_117", Hm = "_hex_wwnch_128", Fm = "_note_wwnch_138", E = {
  ladder: Tm,
  cell: Em,
  empty: Lm,
  name: Am,
  holder: xm,
  request: Im,
  swatches: Mm,
  swatch: qm,
  tilesFrame: Bm,
  tiles: Pm,
  tile: Om,
  bar: Dm,
  hex: Hm,
  note: Fm
}, jm = "not validated yet, pending a CVD matrix and dark stepping";
function Wm(e) {
  return e.reserved ? "reserved" : pa(e.step) ? "validated" : "partial";
}
function Fn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function zm(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Gm({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Le, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Um(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Km(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const fn = (e) => String(e).padStart(2, "0");
function Vm(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Fn(e, void 0);
}
function Ym({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${fn(e)}` : Ot(e) }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: r ? t : `Step ${fn(e)} · ${t}` })
  ] });
}
function Xm({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = Wm(e), s = Fn(i, t), c = s !== "free", d = a === e.step, u = e.name ?? `Step ${e.step}`, h = () => {
    c || r(e.step);
  }, v = `${u} · ${l === "tiles" && d ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": v, ...Km(c, d), "data-validation": i, style: zm(e, i), onClick: h, onKeyDown: (g) => Um(g, h) }, label: v, name: u, holder: s, validation: i, note: Vm(i, t, d), step: e.step };
}
const Jm = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Ym, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Gm, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Qm(e) {
  return Jm[e.presentation](Xm(e));
}
function Zm(e) {
  for (const a of e)
    if (!a.reserved && !ba(a.step)) throw new Error("colour ladder renders token steps only");
}
function ew() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function aw(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const nw = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function tw() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const rw = { list: ew, swatches: () => null, tiles: tw };
function jn(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Zm(e.steps);
  const r = aw(e), l = rw[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(Qm, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${nw[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: E.tiles, children: i }) : i });
}
const lw = "_rail_1el2t_2", ow = "_section_1el2t_12", iw = "_sectionFlush_1el2t_22", sw = "_head_1el2t_26", cw = "_headLabel_1el2t_34", dw = "_sample_1el2t_42", uw = "_sampleLabel_1el2t_47", hw = "_sampleTitle_1el2t_54", mw = "_sampleMeta_1el2t_59", ww = "_trace_1el2t_65", _w = "_traceHead_1el2t_70", vw = "_steps_1el2t_78", fw = "_step_1el2t_78", bw = "_stepTitle_1el2t_97", pw = "_hollow_1el2t_107", gw = "_stepBody_1el2t_115", Nw = "_stepDetail_1el2t_127", yw = "_publish_1el2t_132", kw = "_reason_1el2t_138", $w = "_note_1el2t_143", Cw = "_reveal_1el2t_148", y = {
  rail: lw,
  section: ow,
  sectionFlush: iw,
  head: sw,
  headLabel: cw,
  sample: dw,
  sampleLabel: uw,
  sampleTitle: hw,
  sampleMeta: mw,
  trace: ww,
  traceHead: _w,
  steps: vw,
  step: fw,
  stepTitle: bw,
  hollow: pw,
  stepBody: gw,
  stepDetail: Nw,
  publish: yw,
  reason: kw,
  note: $w,
  reveal: Cw
}, bn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Sw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Rw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Tw = { notSimulated: "not simulated", running: "running" };
function Ew(e) {
  return e.presentation === "foundry";
}
function Lw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Aw(e, a) {
  var r;
  const t = Sw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function xw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Iw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Mw(e) {
  if (xw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function qw(e) {
  const [a, t] = p(!1);
  x(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${y.step} ${y.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Bw(e) {
  const a = Tw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: y.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Le, { size: 6, kind: Rw[e.kind], label: e.kind });
}
function Pw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: y.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Ow(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Dw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(qw, { kind: a.kind, children: [
    /* @__PURE__ */ n(Bw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: y.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: y.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Pw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Ow, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Hw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(se(a)), t.join(" · ");
}
function Wn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${y.trace} ${y.section}`, children: [
    /* @__PURE__ */ n("p", { className: y.traceHead, id: a, children: Hw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: y.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Dw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Fw(e) {
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
function jw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ce(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${y.sampleMeta} ${y.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Ww(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : te(e.run.cost), label: "Cost" }, { value: e.run.turns ? Sn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: y.sectionFlush, children: /* @__PURE__ */ n(ya, { divided: !0, cells: a }) });
}
function zw(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: te(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Sn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Gw(e) {
  const a = zw(e.run);
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
function Uw(e) {
  return /* @__PURE__ */ o("div", { className: `${y.publish} ${y.section}`, children: [
    /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: y.note, children: e.note })
  ] });
}
function Kw(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${y.publish} ${y.section}`, children: /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Gn(e) {
  return /* @__PURE__ */ o("div", { className: `${y.head} ${y.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: y.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: bn[e.run.status].role, label: bn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Vw(e, a) {
  const [t, r] = p(e.steps);
  return x(() => r(e.steps), [e.steps]), x(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), t;
}
function Yw(e) {
  var t;
  Iw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Fw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Ww, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist }) }),
    /* @__PURE__ */ n(Uw, { reason: Lw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Xw(e) {
  var r;
  const a = Vw(e.run, e.feed);
  Mw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(jw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Gw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Kw, { reason: Aw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function B$(e) {
  return Ew(e) ? /* @__PURE__ */ n(Xw, { ...e }) : /* @__PURE__ */ n(Yw, { ...e });
}
const Jw = "_list_142ip_3", Qw = "_row_142ip_9", Zw = "_condition_142ip_18", e_ = "_action_142ip_24", oa = {
  list: Jw,
  row: Qw,
  condition: Zw,
  action: e_
}, Un = Ve(!1);
function P$({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Un.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oa.list, "aria-label": a, children: e }) });
}
function O$({ rule: e }) {
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
function a_(e) {
  return e === "up" ? "down" : "up";
}
function n_(e, a) {
  const t = pn(e, a.id, a.direction) ?? pn(e, a.id, a_(a.direction));
  t == null || t.focus();
}
function Yn() {
  const e = N(null), [a, t] = p(null), [r, l] = p("");
  return x(() => {
    e.current !== null && a !== null && n_(e.current, a);
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
const t_ = "_body_1h15q_2", r_ = "_title_1h15q_8", l_ = "_section_1h15q_13", o_ = "_legend_1h15q_18", i_ = "_stages_1h15q_26", s_ = "_stage_1h15q_26", c_ = "_stageIndex_1h15q_44", d_ = "_stageName_1h15q_50", u_ = "_footer_1h15q_59", h_ = "_note_1h15q_66", m_ = "_reason_1h15q_71", w_ = "_actions_1h15q_76", __ = "_webHead_1h15q_83", v_ = "_kicker_1h15q_92", f_ = "_webTitle_1h15q_99", b_ = "_webBody_1h15q_105", p_ = "_webSection_1h15q_109", g_ = "_sectionHead_1h15q_121", N_ = "_sectionNote_1h15q_129", y_ = "_formLabel_1h15q_134", k_ = "_identityRow_1h15q_139", $_ = "_nameCell_1h15q_145", C_ = "_keyCell_1h15q_150", S_ = "_colourCell_1h15q_154", R_ = "_colourStatus_1h15q_161", T_ = "_webStages_1h15q_166", E_ = "_webStageList_1h15q_172", L_ = "_webStage_1h15q_166", A_ = "_webIndex_1h15q_191", x_ = "_webStageName_1h15q_196", I_ = "_webMoves_1h15q_201", M_ = "_addStage_1h15q_215", q_ = "_addStageButton_1h15q_223", B_ = "_addStageNote_1h15q_231", P_ = "_webFooter_1h15q_236", O_ = "_webFooterNotes_1h15q_244", D_ = "_webNote_1h15q_251", w = {
  body: t_,
  title: r_,
  section: l_,
  legend: o_,
  stages: i_,
  stage: s_,
  stageIndex: c_,
  stageName: d_,
  footer: u_,
  note: h_,
  reason: m_,
  actions: w_,
  webHead: __,
  kicker: v_,
  webTitle: f_,
  webBody: b_,
  webSection: p_,
  sectionHead: g_,
  sectionNote: N_,
  formLabel: y_,
  identityRow: k_,
  nameCell: $_,
  keyCell: C_,
  colourCell: S_,
  colourStatus: R_,
  webStages: T_,
  webStageList: E_,
  webStage: L_,
  webIndex: A_,
  webStageName: x_,
  webMoves: I_,
  addStage: M_,
  addStageButton: q_,
  addStageNote: B_,
  webFooter: P_,
  webFooterNotes: O_,
  webNote: D_
}, H_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Jn = "not in catalogue";
function F_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Jn}` }, ...t];
}
function j_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(A, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Jn}`;
  return /* @__PURE__ */ n(A, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: F_(t, e.name), invalid: i, onChange: r });
}
function Qn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function W_(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function z_({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Qn(a, t), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(j_, { stage: a, index: t, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(A, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: H_, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function G_({ stages: e, onChange: a, catalogue: t }) {
  const r = W_(e.length), l = Yn(), i = (c, d) => {
    const u = Kn(c, d);
    r.current = Oa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Vn(Qn(e[c], c), u, e.length)), a(Oa(e, c, u));
  }, s = (c, d) => a(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(z_, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: t, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Xn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const U_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], K_ = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], V_ = "A new stream starts as a draft. Nothing runs on it until you publish it.", Y_ = "Create is disabled: name the stream and give it a key first.", X_ = "reorder with the ↑ ↓ buttons · min 2";
function Ya(e, a) {
  return !e.reserved && pa(e.step) && a[e.step] === void 0;
}
function J_(e, a) {
  const t = e.find((r) => Ya(r, a));
  return t ? t.step : 1;
}
function Q_({ stages: e, onMove: a }) {
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
function Z_({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: V_ }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(_, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function ev(e, a) {
  return e !== "" && a !== "" ? null : Y_;
}
function av(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = K_, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = $(), [h, v] = p(""), [b, g] = p(""), [I, H] = p(a[0].value), [oe, $e] = p(() => J_(t, r)), [ae, De] = p(e.stages ?? U_), [He, C] = p(l[0].value), z = { name: h, key: b, streamStep: oe, owner: I, stages: ae, policy: He }, ve = ev(h, b);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Stream name", value: h, onChange: v }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Key", value: b, onChange: g, mono: !0 }),
      /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: I, onChange: H, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(jn, { label: "Stream colour", steps: t, value: oe, onChange: $e, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(Q_, { stages: ae, onMove: (Ae, gt) => De(Oa(ae, Ae, gt)) })
    ] }),
    /* @__PURE__ */ n(Mn, { legend: "Loop policy", options: l, value: He, onChange: C }),
    /* @__PURE__ */ n(Z_, { reason: ve, onCreate: () => i(z), onDraft: () => s(z) })
  ] }) });
}
const Zn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], nv = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function tv(e, a, t, r, l, i) {
  var c;
  const s = ((c = Zn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function rv(e, a) {
  return lv(e) && ov(e, a) && iv(e);
}
function lv(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function ov(e, a) {
  return e.colourStep !== null && Ya({ step: e.colourStep }, a);
}
function iv(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function sv(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${jm}.` : Ya({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function cv({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function dv({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(cv, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: nv })
    ] }),
    l && /* @__PURE__ */ n(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function uv({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function hv({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(A, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(A, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function mv(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, v] = p(null), [b, g] = p("relay"), [I, H] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = tv(l, s, d, h, b, I), $e = rv(oe, r), ae = I.find((C) => C.kind === "agent" && C.name.trim() !== ""), De = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(jn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: v, takenBy: r })
  ] }), He = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: sv(h, r) }),
    /* @__PURE__ */ n(A, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((C) => ({ value: C, label: C })), onChange: u })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(uv, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(hv, { name: l, setName: i, streamKey: s, setKey: c, colour: De, owner: He }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: X_ })
        ] }),
        /* @__PURE__ */ n(G_, { stages: I, onChange: H })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(Mn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Zn, onChange: g }) }),
      /* @__PURE__ */ n(dv, { ready: $e, draft: oe, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function D$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(mv, { ...e }) : /* @__PURE__ */ n(av, { ...e });
}
const wv = "_row_bs8hc_2", _v = "_cell_bs8hc_6", vv = "_condition_bs8hc_11", fv = "_action_bs8hc_18", bv = "_contract_bs8hc_24", pv = "_contractCondition_bs8hc_33", gv = "_contractAction_bs8hc_39", J = {
  row: wv,
  cell: _v,
  condition: vv,
  action: fv,
  contract: bv,
  contractCondition: pv,
  contractAction: gv
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
    A,
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
function Nv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: J.condition, title: ma(e, r), children: ma(e, r) }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: Xa(e, a, t) })
  ] });
}
function yv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: J.row, children: [
    /* @__PURE__ */ o("td", { className: J.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: J.condition, children: ma(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: J.cell, children: Xa(e, a, t) })
  ] });
}
function kv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: J.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: J.contractCondition, children: ma(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: J.contractAction, children: Xa(e, a, t, !0) })
  ] });
}
const $v = { two: yv, four: Nv, contract: kv };
function H$(e) {
  var t;
  if (!et.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = $v[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Cv = "_column_k4nls_2", Sv = "_head_k4nls_17", Rv = "_index_k4nls_23", Tv = "_name_k4nls_29", Ev = "_meta_k4nls_38", Lv = "_mono_k4nls_43", Av = "_gate_k4nls_50", xv = "_reviewersLabel_k4nls_57", Iv = "_reviewers_k4nls_57", Mv = "_reviewer_k4nls_57", qv = "_agents_k4nls_74", Bv = "_workflowColumn_k4nls_79", Pv = "_workflowHead_k4nls_96", Ov = "_stageRow_k4nls_102", Dv = "_stageLabel_k4nls_109", Hv = "_workflowTitle_k4nls_116", Fv = "_workflowMeta_k4nls_122", jv = "_workflowGate_k4nls_127", Wv = "_gateNote_k4nls_135", zv = "_cardNote_k4nls_140", Gv = "_reviewerList_k4nls_145", Uv = "_reviewerRow_k4nls_151", Kv = "_reviewerMark_k4nls_157", Vv = "_reviewerName_k4nls_167", Yv = "_terminalCard_k4nls_173", Xv = "_terminalCount_k4nls_182", Jv = "_workflowAgents_k4nls_188", Qv = "_mount_k4nls_194", k = {
  column: Cv,
  head: Sv,
  index: Rv,
  name: Tv,
  meta: Ev,
  mono: Lv,
  gate: Av,
  reviewersLabel: xv,
  reviewers: Iv,
  reviewer: Mv,
  agents: qv,
  workflowColumn: Bv,
  workflowHead: Pv,
  stageRow: Ov,
  stageLabel: Dv,
  workflowTitle: Hv,
  workflowMeta: Fv,
  workflowGate: jv,
  gateNote: Wv,
  cardNote: zv,
  reviewerList: Gv,
  reviewerRow: Uv,
  reviewerMark: Kv,
  reviewerName: Vv,
  terminalCard: Yv,
  terminalCount: Xv,
  workflowAgents: Jv,
  mount: Qv
}, Zv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Ja(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function at(e) {
  return `${Math.round(e * 100)}%`;
}
function ef({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: k.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: k.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: k.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ya, { cells: [
      { value: at(e.gateShare), label: "Gate share" },
      { value: ee(e.count), label: "In stage" }
    ] })
  ] });
}
function af({ stage: e }) {
  return /* @__PURE__ */ n(ya, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: Ja(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function nf({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: k.head, children: [
    /* @__PURE__ */ n("span", { className: k.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: k.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: Zv[e.kind] })
  ] });
}
function tf({ stage: e }) {
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
function rf({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(ef, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(af, { stage: e }) : null;
}
function lf({ onMount: e }) {
  return e ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function of({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: k.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(nf, { stage: e, titleId: l }),
    /* @__PURE__ */ n(tf, { stage: e }),
    /* @__PURE__ */ n(rf, { stage: e }),
    /* @__PURE__ */ n("div", { className: k.agents, children: a.map((s) => /* @__PURE__ */ n(hm, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(lf, { onMount: t })
  ] });
}
const sf = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function cf({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: k.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: k.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: k.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: k.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function df({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: k.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(cf, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: k.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: at(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function uf(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function hf({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: k.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: k.terminalCount, children: Ja(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: k.cardNote, children: uf(e.rolledBackThisWeek) })
  ] });
}
function mf(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function wf(e) {
  if (e.kind === "terminal") return `${Ja(e.closedThisWeek)} this week`;
  const a = mf(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function _f({ stage: e, titleId: a }) {
  const t = sf[e.kind];
  return /* @__PURE__ */ o("header", { className: k.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: k.stageRow, children: [
      /* @__PURE__ */ o("span", { className: k.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: k.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: k.workflowMeta, children: wf(e) })
  ] });
}
function vf(e) {
  return e === "entry" || e === "agent";
}
function ff({ stage: e, onMount: a }) {
  return a === void 0 || !vf(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: `${k.mount} ward-target`, onClick: () => a(e.index), children: "+ Mount agent" });
}
function bf({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: k.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(_f, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(df, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(hf, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: k.workflowAgents, children: a }),
    /* @__PURE__ */ n(ff, { stage: e, onMount: t })
  ] });
}
function pf(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function F$(e) {
  return pf(e) ? /* @__PURE__ */ n(bf, { ...e }) : /* @__PURE__ */ n(of, { ...e });
}
const gf = "_row_9esh9_6", Nf = "_cell_9esh9_10", yf = "_name_9esh9_19", kf = "_chain_9esh9_26", $f = "_owner_9esh9_32", Cf = "_mono_9esh9_38", Sf = "_compactRow_9esh9_45", Rf = "_compactCell_9esh9_54", Tf = "_stack_9esh9_71", Ef = "_stat_9esh9_78", Lf = "_identityLine_9esh9_85", Af = "_identity_9esh9_85", xf = "_compactName_9esh9_103", If = "_ownerLine_9esh9_117", Mf = "_link_9esh9_130", qf = "_gateMark_9esh9_136", Bf = "_emptyChain_9esh9_141", Pf = "_arrow_9esh9_147", Of = "_muted_9esh9_148", Df = "_define_9esh9_153", Hf = "_statValue_9esh9_160", Ff = "_policyId_9esh9_166", jf = "_sub_9esh9_171", f = {
  row: gf,
  cell: Nf,
  name: yf,
  chain: kf,
  owner: $f,
  mono: Cf,
  compactRow: Sf,
  compactCell: Rf,
  stack: Tf,
  stat: Ef,
  identityLine: Lf,
  identity: Af,
  compactName: xf,
  ownerLine: If,
  link: Mf,
  gateMark: qf,
  emptyChain: Bf,
  arrow: Pf,
  muted: Of,
  define: Df,
  statValue: Hf,
  policyId: Ff,
  sub: jf
};
function Wf(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function zf(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function nt(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function Gf(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${nt(e.members)}`;
}
function Uf(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ o("span", { className: f.stack, children: [
    /* @__PURE__ */ o("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Gf(e) })
  ] }) });
}
function tt({ name: e, gate: a, size: t }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ n("span", { className: f.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { role: a ? "gate" : "soft", size: t, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Kf(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(tt, { name: a.name, gate: a.gate === !0, size: "tag" })
  ] }, `${a.name}${t}`)) });
}
function Vf(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: `${f.define} ward-target`, href: W(a), children: "Define workflow" })
  ] }) : Kf(e) });
}
function Nn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, title: r, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function Yf(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function Xf(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Jf({ stream: e, href: a, presentation: t }) {
  const r = zf(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ee(e.streamStep, "chip") }, children: [
    Uf(e, a),
    Vf(e.stages, a),
    Nn(Xf(e.agents), e.agents === void 0 ? void 0 : Wf(e.agents), "—"),
    Yf(e.policy),
    Nn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Qf(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function j$(e) {
  if (Qf(e)) return Jf(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: f.row, children: [
    /* @__PURE__ */ o("td", { className: f.cell, children: [
      /* @__PURE__ */ n("a", { className: `${f.name} ward-target`, href: W(t), children: a.name }),
      /* @__PURE__ */ n(m, { ...Na(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, children: /* @__PURE__ */ n("span", { className: f.chain, children: a.stages.map((r) => /* @__PURE__ */ n("span", { className: f.link, children: /* @__PURE__ */ n(tt, { name: r.name, gate: r.gate }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: f.mono, children: nt(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, title: a.inFlightHint, children: ee(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const Zf = "_row_mdce7_2", eb = "_name_mdce7_16", ab = "_scope_mdce7_24", wa = {
  row: Zf,
  name: eb,
  scope: ab
};
function nb(e) {
  return e === void 0 ? `${wa.row} ward-toolrow` : `${wa.row} ward-toolrow ${e}`;
}
function tb(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function rb({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function lb({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function ob({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${wa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function ib(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function W$({ tool: e, onChange: a, presentation: t }) {
  const r = $(), l = $(), i = tb(e, t), s = ib(t);
  return /* @__PURE__ */ o(s, { className: nb(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(rb, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${wa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(ob, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(lb, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const sb = "_strip_1qtlf_2", cb = "_head_1qtlf_10", db = "_name_1qtlf_16", ub = "_chart_1qtlf_24", hb = "_segment_1qtlf_30", mb = "_detailedChart_1qtlf_36", wb = "_rail_1qtlf_49", _b = "_section_1qtlf_55", vb = "_label_1qtlf_66", fb = "_note_1qtlf_83", Z = {
  strip: sb,
  head: cb,
  name: db,
  chart: ub,
  segment: hb,
  detailedChart: mb,
  rail: wb,
  section: _b,
  label: vb,
  note: fb
}, bb = "No item in flight to preview.", pb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", gb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Da = [1, 2, 3, 4, 5, 6], _a = 100;
function Nb(e, a) {
  return a.has(e) ? Ee(e, "id") : "var(--ward-color-line)";
}
function yb({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: Z.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Da.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: Z.segment,
      x: l * _a,
      y: "0",
      width: _a,
      height: "8",
      fill: Nb(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function kb(e) {
  const a = e.slice(0, Da.length);
  for (; a.length < Da.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function $b({ identities: e }) {
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
function rt(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ta({ label: e, children: a }) {
  const t = $();
  return /* @__PURE__ */ o("section", { className: Z.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: Z.label, children: e }),
    a
  ] });
}
function Cb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: Z.note, children: a ?? bb }) : /* @__PURE__ */ n($a, { item: { ...e, streamStep: ga(t.streamStep) }, onOpen: rt(r), feed: null });
}
function Sb({ draft: e }) {
  const a = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: Z.head, style: a, children: [
    /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: Z.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
  ] });
}
function Rb(e) {
  const a = kb(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: Z.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ta, { label: "Board card", children: /* @__PURE__ */ n(Cb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ta, { label: "Streams index row", children: /* @__PURE__ */ n(Sb, { draft: t }) }),
    /* @__PURE__ */ o(ta, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n($b, { identities: a }),
      /* @__PURE__ */ n("p", { className: Z.note, children: pb })
    ] }),
    /* @__PURE__ */ n(ta, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: Z.note, children: gb }) })
  ] });
}
function Tb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: Z.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: Z.head, children: [
      /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: Z.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n($a, { item: { ...a, streamStep: e.streamStep }, onOpen: rt(r) }),
    /* @__PURE__ */ n(yb, { draft: e, streams: t })
  ] });
}
function z$(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Rb, { ...e }) : /* @__PURE__ */ n(Tb, { ...e });
}
const Eb = "_row_ixlg5_6", Lb = "_headCell_ixlg5_10", Ab = "_cell_ixlg5_11", xb = "_name_ixlg5_23", Ib = "_consequence_ixlg5_29", Mb = "_governed_ixlg5_36", qb = "_control_ixlg5_42", Bb = "_byRole_ixlg5_48", Pb = "_webControl_ixlg5_59", Ob = "_webConsequence_ixlg5_65", Db = "_webGoverned_ixlg5_71", D = {
  row: Eb,
  headCell: Lb,
  cell: Ab,
  name: xb,
  consequence: Ib,
  governed: Mb,
  control: qb,
  byRole: Bb,
  webControl: Pb,
  webConsequence: Ob,
  webGoverned: Db
};
function Hb({
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
function Fb({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Hb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function jb(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Wb({ name: e, cell: a, onChange: t }) {
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
function zb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Wb, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webGoverned} ward-cellmeta`, children: jb(e) }) })
  ] });
}
function G$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(zb, { ...e }) : /* @__PURE__ */ n(Fb, { ...e });
}
const Gb = "_row_vv64h_2", Ub = "_cell_vv64h_6", Kb = "_name_vv64h_25", Vb = "_note_vv64h_30", Yb = "_webName_vv64h_41", Xb = "_webMeta_vv64h_47", K = {
  row: Gb,
  cell: Ub,
  name: Kb,
  note: Vb,
  webName: Yb,
  webMeta: Xb
}, lt = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Jb(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Qb({ component: e, onRestart: a }) {
  const t = $(), r = lt[e.state], l = e.state === "drainFirst";
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
function Zb({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: Jb(e.state) });
}
function ep({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...lt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(Zb, { component: e, onRestart: a }) })
  ] });
}
function U$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ep, { ...e }) : /* @__PURE__ */ n(Qb, { ...e });
}
const ap = "_row_1f1gp_7", np = "_cell_1f1gp_11", tp = "_next_1f1gp_28", rp = "_headCell_1f1gp_38", lp = "_webId_1f1gp_77", op = "_webPurpose_1f1gp_83", ip = "_webMeta_1f1gp_91", sp = "_webUrgent_1f1gp_97", F = {
  row: ap,
  cell: np,
  next: tp,
  headCell: rp,
  webId: lp,
  webPurpose: op,
  webMeta: ip,
  webUrgent: sp
}, cp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, dp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, ot = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], up = Object.fromEntries(ot.map((e) => [e.key, e]));
function je({ column: e, children: a }) {
  const t = up[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: F.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function K$() {
  return /* @__PURE__ */ n("tr", { children: ot.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: F.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function hp({ cred: e }) {
  const a = cp[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ n(je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(je, { column: "id", children: e.id }),
    /* @__PURE__ */ n(je, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(je, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(je, { column: "next", children: /* @__PURE__ */ n("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function mp({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function wp({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(mp, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { ...dp[e.state] }) })
  ] });
}
function V$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(wp, { ...e }) : /* @__PURE__ */ n(hp, { ...e });
}
const _p = "_card_17zba_2", vp = "_head_17zba_11", fp = "_env_17zba_18", bp = "_version_17zba_25", pp = "_meta_17zba_32", gp = "_webCard_17zba_37", Np = "_webRow_17zba_47", yp = "_webTitle_17zba_55", kp = "_webLine_17zba_65", $p = "_webVersion_17zba_72", Cp = "_webMeta_17zba_77", U = {
  card: _p,
  head: vp,
  env: fp,
  version: bp,
  meta: pp,
  webCard: gp,
  webRow: Np,
  webTitle: yp,
  webLine: kp,
  webVersion: $p,
  webMeta: Cp
}, it = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Sp({ env: e }) {
  const a = it[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function Rp(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ce(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Tp(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...it[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: Rp(e) })
  ] });
}
function Y$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Tp, { ...e }) : /* @__PURE__ */ n(Sp, { ...e });
}
const Ep = "_panel_1hmja_2", Lp = "_line_1hmja_8", Ap = "_actions_1hmja_14", ra = {
  panel: Ep,
  line: Lp,
  actions: Ap
};
function X$(e) {
  return /* @__PURE__ */ o("div", { className: ra.panel, children: [
    /* @__PURE__ */ n("p", { className: ra.line, children: e.status }),
    /* @__PURE__ */ n(A, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ra.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ra.line, children: e.note ?? "" })
  ] });
}
const xp = "_upload_erepj_2", Ip = "_preview_erepj_7", Mp = "_mark_erepj_17", qp = "_empty_erepj_22", Bp = "_actions_erepj_28", Pp = "_input_erepj_33", Op = "_reasons_erepj_41", Dp = "_reason_erepj_41", Hp = "_accepted_erepj_57", ne = {
  upload: xp,
  preview: Ip,
  mark: Mp,
  empty: qp,
  actions: Bp,
  input: Pp,
  reasons: Op,
  reason: Dp,
  accepted: Hp
}, st = 1.5, ct = 22, va = "script elements or event handlers", Se = "links or external references", ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${st}px at ${ct}px`], Fp = [ye[1], ye[2], va, Se], jp = /* @__PURE__ */ new Map([
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
]), Wp = "http://www.w3.org/2000/svg", zp = "http://www.w3.org/2000/xmlns/", Gp = /* @__PURE__ */ new Set([
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
]), Up = /* @__PURE__ */ new Set([
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
]), Kp = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, Vp = /url\s*\(|['"\\]/i;
function Yp() {
  return { ok: !1, reasons: [ye[1]] };
}
function dt(e) {
  return e.namespaceURI === Wp || e.namespaceURI === null;
}
function Xp(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && dt(a) ? a : null;
  } catch {
    return null;
  }
}
function Jp(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [ye[0]] : [];
}
function Qp(e) {
  return jp.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function Zp(e) {
  return Vp.test(e.replace(Kp, ""));
}
function eg(e) {
  return /^on/i.test(e.localName) ? va : e.localName === "href" || Zp(e.value) ? Se : void 0;
}
function ag(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(Qp(t));
    for (const r of Array.from(t.attributes)) a.add(eg(r));
  }
  return Fp.filter((t) => a.has(t));
}
function ng(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? ct / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < st;
  }) ? [ye[3]] : [];
}
function tg(e) {
  if (e.namespaceURI === zp) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Up.has(a) || a.startsWith("stroke"));
}
function rg(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && dt(a) && Gp.has(a.localName);
}
function lg(e, a) {
  rg(a) ? a.nodeType === Node.ELEMENT_NODE && ut(a) : e.removeChild(a);
}
function ut(e) {
  for (const a of Array.from(e.attributes)) tg(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) lg(e, a);
  return e;
}
function J$(e) {
  const a = Xp(e);
  if (a === null) return Yp();
  const t = [...Jp(a), ...ag(a), ...ng(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(ut(a)) };
}
const og = "Mark accepted.";
function ig({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: ne.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: ne.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: ne.empty }) });
}
function sg(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function cg(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function dg({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: ne.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: ne.result, role: "status", children: /* @__PURE__ */ n("p", { className: ne.accepted, children: og }) }) : /* @__PURE__ */ n("div", { className: ne.result, role: "status", children: /* @__PURE__ */ n("ul", { className: ne.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: ne.reason, children: a }, a)) }) });
}
function ug({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(dg, { result: e }) : /* @__PURE__ */ n("p", { className: `${ne.result} ${sg(e, t)}`, role: "status", children: cg(e, t) });
}
function Q$({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = N(null), [i, s] = p(null), c = (d) => {
    if (d === void 0) return;
    const u = a(d);
    u instanceof Promise ? u.then(s) : s(u);
  };
  return /* @__PURE__ */ o("div", { className: ne.upload, children: [
    /* @__PURE__ */ n(ig, { current: e }),
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
    /* @__PURE__ */ n(ug, { result: i, presentation: r })
  ] });
}
const hg = "_row_1wp9s_7", mg = "_cell_1wp9s_11", wg = "_head_1wp9s_28", _g = "_name_1wp9s_34", vg = "_pinned_1wp9s_42", fg = "_headCell_1wp9s_49", bg = "_webName_1wp9s_88", pg = "_webMeta_1wp9s_95", gg = "_webWarn_1wp9s_103", q = {
  row: hg,
  cell: mg,
  head: wg,
  name: _g,
  pinned: vg,
  headCell: fg,
  webName: bg,
  webMeta: pg,
  webWarn: gg
}, Qa = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, ht = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Ng = Object.fromEntries(ht.map((e) => [e.key, e]));
function yg(e, a) {
  return `mcp.${e}.${a}`;
}
function kg(e) {
  return Object.keys(Qa).includes(e);
}
function $g(e) {
  return Qa[e !== void 0 && kg(e) ? e : "unknown"];
}
function Ye({ column: e, children: a }) {
  const t = Ng[e];
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
function Z$() {
  return /* @__PURE__ */ n("tr", { children: ht.map((e) => /* @__PURE__ */ n(
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
function Cg({ server: e }) {
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
    /* @__PURE__ */ n(Ye, { column: "tools", children: e.tools.map((t) => yg(e.name, t)).join(" · ") })
  ] });
}
function Sg(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Rg(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Tg({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Eg({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Lg({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Ag({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Sg(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Rg(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Tg, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...$g(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n(Eg, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Lg, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function eC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ag, { ...e }) : /* @__PURE__ */ n(Cg, { ...e });
}
const xg = "_row_1h9nq_2", Ig = "_headCell_1h9nq_14", Mg = "_cell_1h9nq_15", qg = "_name_1h9nq_26", Bg = "_consequence_1h9nq_32", Pg = "_reason_1h9nq_38", Og = "_value_1h9nq_44", Dg = "_webRow_1h9nq_60", Hg = "_webSetting_1h9nq_71", Fg = "_webName_1h9nq_79", jg = "_webConsequence_1h9nq_87", Wg = "_webControl_1h9nq_93", zg = "_webState_1h9nq_106", Gg = "_webChip_1h9nq_111", L = {
  row: xg,
  headCell: Ig,
  cell: Mg,
  name: qg,
  consequence: Bg,
  reason: Pg,
  value: Og,
  webRow: Dg,
  webSetting: Hg,
  webName: Fg,
  webConsequence: jg,
  webControl: Wg,
  webState: zg,
  webChip: Gg
}, mt = 104, wt = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Ug({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Oe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(xn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: L.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Kg({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = wt[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: L.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: L.headCell, children: [
      /* @__PURE__ */ n("span", { className: L.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: L.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: L.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(Ug, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: L.cell, style: { width: mt }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function _t(e, a) {
  return String(e ?? a);
}
function Vg(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Yg(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? _t(e.value, "—");
}
function Xg({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: L.webControl, children: [
    /* @__PURE__ */ n(Oe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: L.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function Jg(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(Xg, { ...e });
  const l = Vg(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: L.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(xn, { options: l, value: _t(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${L.webControl} ${L.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: Yg(a) });
}
function Qg({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = $(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${L.row} ${L.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: L.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${L.name} ${L.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${L.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: L.webControl, children: i(s) }) : /* @__PURE__ */ n(Jg, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${L.webChip} ward-policy-chip`, style: { width: mt }, children: /* @__PURE__ */ n(m, { ...wt[t], size: "tag" }) })
  ] });
}
function aC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Qg, { ...e }) : /* @__PURE__ */ n(Kg, { ...e });
}
const Zg = "_label_1o9za_7", eN = "_name_1o9za_15", aN = "_column_1o9za_24", nN = "_webFrame_1o9za_57", tN = "_webHead_1o9za_62", rN = "_webHeadLabel_1o9za_74", lN = "_webLabel_1o9za_112", oN = "_webColumns_1o9za_119", iN = "_webGroup_1o9za_125", sN = "_webPeople_1o9za_126", cN = "_webVia_1o9za_127", dN = "_webMeta_1o9za_156", j = {
  label: Zg,
  name: eN,
  column: aN,
  webFrame: nN,
  webHead: tN,
  webHeadLabel: rN,
  webLabel: lN,
  webColumns: oN,
  webGroup: iN,
  webPeople: sN,
  webVia: cN,
  webMeta: dN
}, uN = {
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
      className: j.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function hN(e) {
  if (!e.matrixRole) return;
  const a = uN[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function mN({ node: e }) {
  const a = hN(e);
  return /* @__PURE__ */ o("span", { className: j.label, children: [
    /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
    /* @__PURE__ */ n(wN, { role: a, node: e }),
    /* @__PURE__ */ n(Aa, { column: La[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Aa, { column: La[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ n(Aa, { column: La[2], children: e.requestedVia ?? "" })
  ] });
}
function wN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function _N({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ n(mN, { node: t }),
      children: s
    }
  );
}
function xa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function vN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${j.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(xa, { className: `${j.webMeta} ${j.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(xa, { className: `${j.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(xa, { className: `${j.webMeta} ${j.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function fN() {
  return /* @__PURE__ */ o("div", { className: j.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: j.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: j.webColumns, children: [
      /* @__PURE__ */ n("span", { className: j.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: j.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: j.webVia, children: "Requested via" })
    ] })
  ] });
}
function bN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${j.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function pN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function gN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: j.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(fN, {}),
    /* @__PURE__ */ n(vc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Bn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(bN, { row: t }),
        detail: /* @__PURE__ */ n(vN, { row: t }),
        expanded: pN(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function nC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(gN, { ...e }) : /* @__PURE__ */ n(_N, { ...e });
}
const NN = "_runbook_b9agc_2", yN = "_list_b9agc_7", kN = "_step_b9agc_15", $N = "_numeral_b9agc_21", CN = "_body_b9agc_28", SN = "_head_b9agc_34", RN = "_title_b9agc_40", TN = "_detail_b9agc_45", EN = "_actions_b9agc_50", LN = "_webList_b9agc_56", AN = "_webStep_b9agc_60", xN = "_webBody_b9agc_66", IN = "_webTitle_b9agc_74", MN = "_webDetail_b9agc_78", T = {
  runbook: NN,
  list: yN,
  step: kN,
  numeral: $N,
  body: CN,
  head: SN,
  title: RN,
  detail: TN,
  actions: EN,
  webList: LN,
  webStep: AN,
  webBody: xN,
  webTitle: IN,
  webDetail: MN
}, vt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function ft(e) {
  return String(e + 1).padStart(2, "0");
}
function qN({ step: e, index: a, connection: t }) {
  const r = vt[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: T.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: T.numeral, children: ft(a) }),
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
function BN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: T.list, children: e.map((r, l) => /* @__PURE__ */ n(qN, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: T.actions, children: a })
  ] });
}
function PN({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${T.step} ${T.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${T.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: ft(a) }),
    /* @__PURE__ */ o("span", { className: `${T.body} ${T.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${T.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${T.title} ${T.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...vt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${T.detail} ${T.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function ON({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${T.list} ${T.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(PN, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${T.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function tC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ON, { ...e }) : /* @__PURE__ */ n(BN, { ...e });
}
const DN = "_list_1gu6a_2", HN = "_check_1gu6a_10", FN = "_body_1gu6a_16", jN = "_text_1gu6a_23", WN = "_pending_1gu6a_32", zN = "_measured_1gu6a_37", ze = {
  list: DN,
  check: HN,
  body: FN,
  text: jN,
  pending: WN,
  measured: zN
};
function GN(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function UN({ check: e }) {
  const a = GN(e.passed);
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
function rC({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(UN, { check: a }, a.text)) });
}
const KN = "_root_khinh_2", VN = "_list_khinh_10", YN = "_line_khinh_21", XN = "_at_khinh_48", JN = "_text_khinh_52", QN = "_foot_khinh_56", ZN = "_idle_khinh_68", ey = "_caret_khinh_76", ay = "_jump_khinh_83", me = {
  root: KN,
  list: VN,
  line: YN,
  at: XN,
  text: JN,
  foot: QN,
  idle: ZN,
  caret: ey,
  jump: ay
}, ny = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Za(e) {
  return Number.isNaN(Date.parse(e)) ? "" : ny.format(new Date(e));
}
const ty = { warn: "warning", ok: "ok" };
function ry({ kind: e }) {
  const a = ty[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function ly({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Za(e)}` });
}
function oy({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Za(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: me.idle, children: i }),
    /* @__PURE__ */ n(ly, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const iy = 8;
function sy(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > iy;
}
function cy({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
function lC({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = N(null), [i, s] = p(0), [c, d] = p(!1), [u, h] = p(!1), v = e.at(-1);
  x(() => {
    s(e.length);
  }, [e.length]), ja(() => {
    const g = l.current;
    g && !u && (g.scrollTop = g.scrollHeight);
  }, [e.length, u]);
  const b = () => {
    var H;
    const g = l.current;
    if (!g) return;
    const I = g.querySelectorAll("[data-consline-text]");
    (H = I.item(I.length - 1)) == null || H.focus(), h(!1);
  };
  return /* @__PURE__ */ o("div", { className: me.root, children: [
    /* @__PURE__ */ n("ol", { className: me.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (g) => h(sy(g.currentTarget)), children: e.map((g, I) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${g.kind}`, "data-kind": g.kind, "data-revealed": I < i, children: [
      /* @__PURE__ */ n("span", { className: me.at, children: Za(g.at) }),
      /* @__PURE__ */ n(ry, { kind: g.kind }),
      /* @__PURE__ */ n("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: g.text })
    ] }, `${g.at}-${I}`)) }),
    /* @__PURE__ */ o(oy, { connection: a, idleSince: t, last: v, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ n(cy, { shown: u, onJump: b })
    ] })
  ] });
}
const dy = "_row_11jhe_2", uy = "_head_11jhe_14", hy = "_author_11jhe_20", my = "_eta_11jhe_25", wy = "_edited_11jhe_26", _y = "_body_11jhe_32", vy = "_reason_11jhe_37", fy = "_actions_11jhe_42", be = {
  row: dy,
  head: uy,
  author: hy,
  eta: my,
  edited: wy,
  body: _y,
  reason: vy,
  actions: fy
}, by = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function py(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function gy({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function Ny({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: be.reason, id: a, children: e })
  ] });
}
function yy(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function ky(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(gy, { ...e }) : /* @__PURE__ */ n(Ny, { reason: e.unavailable, reasonId: e.unavailableId });
}
function oC(e) {
  const { comment: a } = e;
  yy(e);
  const t = $(), r = `${t}-unavailable`, l = by[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${be.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: be.head, children: [
      /* @__PURE__ */ n("span", { className: be.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: be.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: be.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: be.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: be.reason, id: t, children: py(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: be.actions, children: /* @__PURE__ */ n(ky, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const $y = "_root_c46wj_2", Cy = "_attach_c46wj_11", Sy = "_actions_c46wj_17", Ry = "_reply_c46wj_23", Ty = "_replyRow_c46wj_28", Ey = "_sendsAs_c46wj_42", Ue = {
  root: $y,
  attach: Cy,
  actions: Sy,
  reply: Ry,
  replyRow: Ty,
  sendsAs: Ey
};
function Ly({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = p(""), i = $();
  return /* @__PURE__ */ o("div", { className: Ue.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ue.replyRow, children: [
      /* @__PURE__ */ n(A, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(_, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ue.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function iC(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Ly, { ...e }) : /* @__PURE__ */ n(Ay, { ...e });
}
function Ay({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [s, c] = p("");
  return /* @__PURE__ */ o("div", { className: Ue.root, children: [
    /* @__PURE__ */ n(A, { kind: "textarea", label: e, value: s, onChange: c }),
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
const xy = "_list_1ih9e_2", Iy = "_item_1ih9e_6", My = "_body_1ih9e_22", qy = "_text_1ih9e_28", By = "_evidence_1ih9e_37", Py = "_consequence_1ih9e_49", Oy = "_note_1ih9e_54", Pe = {
  list: xy,
  item: Iy,
  body: My,
  text: qy,
  evidence: By,
  consequence: Py,
  note: Oy
};
function Dy({ criterion: e }) {
  return /* @__PURE__ */ n(Le, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function yn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function Hy(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function Fy({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Pe.body, children: [
    /* @__PURE__ */ n("span", { className: Pe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(yn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Pe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(yn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Pe.consequence, children: Hy(e.why) })
    ] })
  ] });
}
function jy({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Pe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Dy, { criterion: e }),
    /* @__PURE__ */ n(Fy, { criterion: e })
  ] });
}
function sC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(jy, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Pe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Wy = "_list_dwhoz_2", zy = "_rung_dwhoz_6", Gy = "_name_dwhoz_18", Uy = "_actor_dwhoz_32", ia = {
  list: Wy,
  rung: zy,
  name: Gy,
  actor: Uy
}, Ky = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function Vy({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = Ky[e.state];
  return /* @__PURE__ */ o("li", { className: ia.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ia.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ia.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function cC({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ia.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(Vy, { rung: a }, a.name)) });
}
const Yy = "_sheet_1fqco_2", Xy = "_title_1fqco_9", Jy = "_stage_1fqco_15", Qy = "_effects_1fqco_20", Zy = "_effect_1fqco_20", ek = "_numeral_1fqco_31", ak = "_effectText_1fqco_38", nk = "_refusals_1fqco_43", tk = "_reasons_1fqco_52", rk = "_reason_1fqco_52", lk = "_actions_1fqco_62", ue = {
  sheet: Yy,
  title: Xy,
  stage: Jy,
  effects: Qy,
  effect: Zy,
  numeral: ek,
  effectText: ak,
  refusals: nk,
  reasons: tk,
  reason: rk,
  actions: lk
};
function ok({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function dC({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = $(), d = `${c}-refusal`, [u, h] = p(""), v = t.length > 0;
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
      ns,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(A, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    v && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((b, g) => /* @__PURE__ */ n("li", { className: ue.reason, id: g === 0 ? d : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(ok, { refused: v, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const ik = "_list_1hvqu_2", sk = "_path_1hvqu_7", ck = "_head_1hvqu_21", dk = "_label_1hvqu_28", uk = "_consequence_1hvqu_35", hk = "_ask_1hvqu_36", Ge = {
  list: ik,
  path: sk,
  head: ck,
  label: dk,
  consequence: uk,
  ask: hk
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
function mk({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(_, { variant: $n(a), size: "sm", onClick: () => t(e.kind), children: Ha[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: $n(a), size: "sm", disabled: !0, describedBy: r, children: Ha[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ge.ask, id: r, children: e.askInstead })
  ] });
}
function wk({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ge.path, "data-allowed": e.allowed, "data-role": kn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ge.head, children: [
      /* @__PURE__ */ n("span", { className: Ge.label, children: e.title ?? Ha[e.kind] }),
      /* @__PURE__ */ n(m, { role: kn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ge.consequence, children: e.consequence }),
    /* @__PURE__ */ n(mk, { path: e, primary: a, onChoose: t })
  ] });
}
function uC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ge.list, children: e.map((t, r) => /* @__PURE__ */ n(wk, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const _k = "_list_1nyt1_2", vk = "_item_1nyt1_6", fk = "_node_1nyt1_18", bk = "_body_1nyt1_24", pk = "_head_1nyt1_30", gk = "_stage_1nyt1_36", Nk = "_version_1nyt1_41", yk = "_sentence_1nyt1_49", kk = "_meta_1nyt1_54", ge = {
  list: _k,
  item: vk,
  node: fk,
  body: bk,
  head: pk,
  stage: gk,
  version: Nk,
  sentence: yk,
  meta: kk
}, $k = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Ck({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function Sk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(Le, { size: 9, kind: $k[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Ck, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${ce(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${te(e.cost)}`
      ] })
    ] })
  ] });
}
function hC({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Sk, { entry: a }, a.stage + String(t))) });
}
const Rk = "_thread_1kn6s_3", Tk = "_turn_1kn6s_8", Ek = "_who_1kn6s_27", Lk = "_body_1kn6s_32", sa = {
  thread: Rk,
  turn: Tk,
  who: Ek,
  body: Lk
}, bt = Ve(!1);
function mC({ children: e, density: a }) {
  return /* @__PURE__ */ n(bt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${sa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function wC({ turn: e }) {
  if (!Ke(bt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${sa.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${sa.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ce(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${sa.body} ward-chat-body`, children: e.body })
  ] });
}
const Ak = "_list_1rt9c_3", xk = "_row_1rt9c_7", Ik = "_label_1rt9c_20", Mk = "_n_1rt9c_26", qk = "_cause_1rt9c_33", Qe = {
  list: Ak,
  row: xk,
  label: Ik,
  n: Mk,
  cause: qk
};
function Bk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Pk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Ok({ row: e, formatNumber: a }) {
  return Bk(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Le, { size: 8, ...Pk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Dk, { cause: e.cause })
  ] });
}
function Dk({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function _C({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(Ok, { row: t, formatNumber: a }, t.label)) });
}
const Hk = "_root_1jxwp_2", Fk = {
  root: Hk
};
function vC({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: Fk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ca, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const jk = "_row_dhbre_3", Wk = "_key_dhbre_13", zk = "_stack_dhbre_24", Gk = "_value_dhbre_32", Uk = "_evidence_dhbre_39", Kk = "_mark_dhbre_47", We = {
  row: jk,
  key: Wk,
  stack: zk,
  value: Gk,
  evidence: Uk,
  mark: Kk
};
function Vk({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ka, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function fC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${We.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${We.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${We.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${We.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${We.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${We.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(Vk, { state: e.state }) })
  ] });
}
const Yk = "_cell_1monp_2", Xk = {
  cell: Yk
}, Jk = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Qk(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function Zk(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function e1(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Qk(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function a1(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function bC({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  Zk(e, t);
  const r = a1(e);
  return /* @__PURE__ */ n(
    vs,
    {
      label: "Rejection routing",
      columns: Jk,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: Xk.cell, "data-norerun": l.noRerun ? !0 : void 0, children: e1(l, i) }),
      empty: a ?? /* @__PURE__ */ n(Qc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const n1 = "_row_ute8v_2", t1 = "_title_ute8v_11", r1 = "_turns_ute8v_20", l1 = "_waiting_ute8v_21", o1 = "_resolved_ute8v_22", i1 = "_activity_ute8v_23", s1 = "_cost_ute8v_29", c1 = "_link_ute8v_30", d1 = "_tableRow_ute8v_47", u1 = "_tableTitle_ute8v_59", h1 = "_tableResolved_ute8v_64", m1 = "_tableLink_ute8v_68", w1 = "_tableMeta_ute8v_83", _1 = "_tableCost_ute8v_90", v1 = "_tableActivity_ute8v_91", f1 = "_tableState_ute8v_101", b1 = "_tableRecord_ute8v_112", O = {
  row: n1,
  title: t1,
  turns: r1,
  waiting: l1,
  resolved: o1,
  activity: i1,
  cost: s1,
  link: c1,
  tableRow: d1,
  tableTitle: u1,
  tableResolved: h1,
  tableLink: m1,
  tableMeta: w1,
  tableCost: _1,
  tableActivity: v1,
  tableState: f1,
  tableRecord: b1
}, pt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function p1(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function g1(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function N1(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const y1 = { duplicate: "CLOSED · DUPLICATE" };
function k1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: O.tableMeta, children: `waiting on ${e}` });
}
function $1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: O.tableCost, children: e === void 0 ? null : te(e) });
}
function C1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${O.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function S1({ session: e, href: a }) {
  const t = pt[e.state];
  return /* @__PURE__ */ o("tr", { className: O.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: O.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${O.tableLink} ward-target`, href: W(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: O.tableMeta, children: g1(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: O.tableResolved, children: [
      N1(e.resolved),
      /* @__PURE__ */ n(k1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n($1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: O.tableActivity, children: p1(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: O.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: y1[e.state] ?? t.label }),
      /* @__PURE__ */ n(C1, { link: e.link })
    ] }) })
  ] });
}
function R1({ session: e }) {
  const a = pt[e.state];
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
function pC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(S1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(R1, { session: e.session });
}
const T1 = "_block_1yy2v_3", E1 = "_list_1yy2v_9", L1 = "_line_1yy2v_14", Fa = {
  block: T1,
  list: E1,
  line: L1
}, A1 = { warn: "warning", ok: "ok" };
function x1({ kind: e }) {
  const a = A1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function I1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Fa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(x1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function gC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Fa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Fa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(I1, { line: t }, `${r}-${t.text}`)) }) });
}
const M1 = "_band_tt7hp_1", q1 = "_head_tt7hp_8", B1 = "_cell_tt7hp_19", P1 = "_index_tt7hp_35", O1 = "_title_tt7hp_42", D1 = "_note_tt7hp_48", H1 = "_cellTitle_tt7hp_53", F1 = "_cellBody_tt7hp_58", j1 = "_tag_tt7hp_64", fe = {
  band: M1,
  head: q1,
  cell: B1,
  index: P1,
  title: O1,
  note: D1,
  cellTitle: H1,
  cellBody: F1,
  tag: j1
}, Cn = 4;
function NC({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== Cn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Cn}-cell grid`);
  return /* @__PURE__ */ o("section", { className: fe.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: fe.head, children: [
      /* @__PURE__ */ n("span", { className: fe.index, children: e }),
      /* @__PURE__ */ n("span", { className: fe.title, children: a }),
      /* @__PURE__ */ n("span", { className: fe.note, children: t })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: fe.cell, children: [
      /* @__PURE__ */ n("span", { className: fe.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: fe.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: fe.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  c$ as ActionStack,
  lC as ActivityConsole,
  hm as AgentCard,
  a$ as AppShell,
  z$ as AppearanceStrip,
  NC as Band,
  o$ as BarChart,
  Id as BoardColumn,
  $$ as BoardFootnote,
  C$ as BoardHeader,
  v$ as BoardScroller,
  _ as Btn,
  J1 as CHIP_ROLES,
  ot as CREDENTIAL_COLUMNS,
  l$ as Callout,
  G$ as CapabilityRow,
  wC as ChatMessage,
  En as Checkbox,
  m as Chip,
  oC as ClarificationRow,
  q$ as ClauseRuleRow,
  M$ as ClauseRules,
  jn as ColourLadder,
  U$ as ComponentRow,
  iC as Composer,
  R$ as ConfigRow,
  S$ as ConfigRowHead,
  Va as ConnectionMark,
  mC as Conversation,
  ns as CostMeter,
  V$ as CredentialRow,
  K$ as CredentialRowHead,
  sC as CriteriaList,
  hl as Crumb,
  _C as DeliveryHealth,
  p$ as DeniedState,
  B$ as DryRunRail,
  Qc as EmptyState,
  Y$ as EnvCard,
  A as Field,
  b$ as FilteredEmpty,
  w$ as FormStack,
  Ca as GateChecklist,
  cC as GateLadder,
  vs as Grid,
  O$ as HandoffRuleRow,
  P$ as HandoffRules,
  T$ as ItemDrawer,
  X$ as KeyPanel,
  Bt as LIVE_EVENT_TYPES,
  Mh as LegacyBoardColumn,
  L$ as LegacyBoardHeader,
  A$ as LegacyConfigRow,
  I$ as LegacyItemDrawer,
  Rh as LegacyOverCapNote,
  x$ as LegacyPreviewRail,
  Dn as LegacyWorkCard,
  ke as LiveIndicator,
  g$ as LoadFailed,
  k$ as Loading,
  ht as MCP_SERVER_COLUMNS,
  Ka as Mark,
  Q$ as MarkUpload,
  Le as Marker,
  eC as McpServerRow,
  Z$ as McpServerRowHead,
  D$ as NewStreamModal,
  ad as OverCapNote,
  ea as Overlay,
  jm as PARTIAL_STEP_REASON,
  mt as POLICY_CHIP_WIDTH,
  u$ as PageFrame,
  r$ as PageHeader,
  i$ as PlainList,
  aC as PolicyRow,
  E$ as PreviewRail,
  La as ROLE_MATRIX_COLUMNS,
  et as RULE_ACTIONS,
  Mn as Radio,
  vC as ReadyChecklist,
  m$ as RecordSection,
  dC as RequeueSheet,
  uC as ResolveBlock,
  fC as ResolvedFieldRow,
  nC as RoleMatrixRow,
  bC as RoutingTable,
  H$ as RuleRow,
  tC as RunbookSteps,
  Mt as STREAM_STEPS,
  _$ as SectionBand,
  un as SectionHeader,
  xn as SegmentedControl,
  pC as SessionRow,
  t$ as Sidebar,
  F$ as StageColumn,
  f$ as StageGrid,
  hC as StageHistory,
  G_ as StageListEditor,
  N$ as StaleStrip,
  ya as StatStrip,
  j$ as StreamRow,
  h$ as SubjectRail,
  Oe as Switch,
  s$ as TableHead,
  n$ as Tabs,
  W$ as ToolRow,
  d$ as TopBar,
  vc as Tree,
  Bn as TreeRow,
  gC as TypedInputBlock,
  xr as UNSAFE_HREF,
  rC as ValidationList,
  U1 as VisibilityProvider,
  K1 as Visible,
  X1 as WARD_VERSION,
  $a as WorkCard,
  y$ as WriteUnavailableStrip,
  p1 as agoSince,
  St as clock,
  sv as colourStatus,
  ee as count,
  se as duration,
  Wa as elapsed,
  Y1 as eventSourceTransport,
  ba as isStreamStep,
  pa as isValidatedStreamStep,
  Wm as ladderValidation,
  $g as mcpConnectionChip,
  yg as mcpToolName,
  te as money,
  we as ms,
  Pn as ordered,
  Sn as ratio,
  Jb as restartLabel,
  W as safeHref,
  ce as stamp,
  Tn as stream,
  Z1 as streamChip,
  Na as streamChipProps,
  Ee as streamColour,
  Ot as streamHex,
  Q1 as streamVars,
  la as useBorderFlash,
  At as useFocusTrap,
  e$ as useLiveFeed,
  V1 as useReturnFocus,
  fa as useRovingTabindex,
  za as useTicker,
  Rt as useVisible,
  G as v,
  J$ as validateMark,
  ga as validatedStep,
  qt as validatedStreamSteps
};
