import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as Nt, useContext as Ke, createContext as Ve, useCallback as Y, useEffect as A, useState as p, useRef as N, useLayoutEffect as ja, useId as $, Fragment as yt } from "react";
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
function F1({ hidden: e, children: a }) {
  const t = Nt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Rn.Provider, { value: t, children: a });
}
function Rt(e) {
  return !Ke(Rn).has(e);
}
function j1({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(S, { children: Rt(e) ? a : t });
}
const Tt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Et(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function xt(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Et(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Lt(e) {
  return { onKeyDown: Y(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Tt));
      xt(t, e.current, r);
    },
    [e]
  ) };
}
function W1(e, a = !0) {
  A(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const an = { ArrowUp: -1, ArrowDown: 1 }, nn = { ArrowLeft: -1, ArrowRight: 1 }, At = (e, a, t) => Math.min(t, Math.max(a, e));
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
      b !== void 0 ? (u.preventDefault(), s(h[At(v + b, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const z1 = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, G1 = "0.2.0", U1 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Mt = [1, 2, 3, 4, 5, 6], qt = [1, 2, 3], Bt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
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
function K1(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function V1(e) {
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
function Y1(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), s = N(/* @__PURE__ */ new Map()), c = N(0), d = N(""), u = N(0), h = N(null), v = N(0), b = N(0), g = N(!1), I = N("reconnecting"), H = Y((C) => {
    I.current = C, r(C);
  }, []), oe = Y(() => {
    c.current = Date.now();
  }, []), $e = Y((C) => {
    for (const [z, ve] of s.current)
      (ve === "*" || C.itemKey === ve) && z(C);
  }, []), ee = Y(() => {
    h.current = a(e, { lastEventId: d.current }, {
      onEvent: (C, z, ve) => {
        const Le = jt(C, z, ve);
        Le !== null && (Le.id && (d.current = Le.id), oe(), g.current = !1, H("live"), i(Le.at), $e(Le));
      },
      onOpen: () => {
        u.current = 0, g.current = !1, oe(), H("live");
      },
      onError: () => {
        var z;
        (z = h.current) == null || z.close(), h.current = null, g.current = !0, I.current !== "stale" && H("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, v.current = window.setTimeout(ee, C);
      }
    });
  }, [$e, H, oe, a, e]), De = Y((C) => {
    g.current = !0, C.close(), h.current = null, v.current = window.setTimeout(ee, we.reconnectBase);
  }, [ee]), He = Y((C, z) => (s.current.set(z, C), () => {
    s.current.delete(z);
  }), []);
  return A(() => (ee(), b.current = window.setInterval(() => {
    const C = Date.now() - c.current, z = Wt(C, I.current);
    z && H(z);
    const ve = h.current;
    zt(C, g.current, ve) && De(ve);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(v.current), g.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [ee, De, H]), { connection: t, lastEventAt: l, subscribe: He };
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
  return A(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
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
const xr = /^([a-z][a-z0-9+.-]*):/i, Lr = /* @__PURE__ */ new Set(["http", "https"]), Ar = "#";
function Ir(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = xr.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = Ir(e);
  return a === void 0 || Lr.has(a) ? e : Ar;
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
function X1(e) {
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
const ll = "_nav_j90m2_2", ol = "_list_j90m2_8", il = "_item_j90m2_15", sl = "_link_j90m2_30", cl = "_sep_j90m2_40", dl = "_current_j90m2_44", ul = "_chips_j90m2_48", Ae = {
  nav: ll,
  list: ol,
  item: il,
  link: sl,
  sep: cl,
  current: dl,
  chips: ul
};
function hl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ae.nav, children: [
    /* @__PURE__ */ n("ol", { className: Ae.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: Ae.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Ae.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${Ae.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Ae.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Ae.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
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
function L(e) {
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
function xn(e) {
  const a = El(e);
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
const xl = "_strip_tivso_2", Ll = "_tab_tivso_26", Al = "_count_tivso_49", Ma = {
  strip: xl,
  tab: Ll,
  count: Al
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
    l !== null && (t.scrollLeft = Math.max(0, l)), xn(t);
  }, [e, a]);
}
function J1({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ln) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ln} — the set is fixed`);
  const i = fa({ orientation: "horizontal" }), s = Il(e, a);
  A(() => i.setActive(s), [i.setActive, s]);
  const c = N(null);
  return Ln(c, e.length), Bl(c, s), /* @__PURE__ */ n(
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
function An({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = fa({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
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
        Z(r.length)
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
function Q1(e) {
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
function xe({ size: e, kind: a, label: t }) {
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
    /* @__PURE__ */ n(xe, { size: 6, kind: "green" }),
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
const To = "_root_114od_2", Eo = "_context_114od_12", xo = "_row_114od_1", Lo = "_heading_114od_25", Ao = "_headingWrap_114od_33", Io = "_chips_114od_38", Mo = "_title_114od_45", qo = "_consequence_114od_54", Bo = "_actionsWrap_114od_59", Po = "_actions_114od_59", Oo = "_action_114od_59", Do = "_overflowPanel_114od_78", Ho = "_measure_114od_88", te = {
  root: To,
  context: Eo,
  row: xo,
  heading: Lo,
  headingWrap: Ao,
  chips: Io,
  title: Mo,
  consequence: qo,
  actionsWrap: Bo,
  actions: Po,
  action: Oo,
  overflowPanel: Do,
  measure: Ho
};
function Fo({ title: e, consequence: a, consequenceHint: t }) {
  return /* @__PURE__ */ o("div", { className: te.heading, children: [
    /* @__PURE__ */ n("h1", { className: te.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: te.consequence, title: t, children: a })
  ] });
}
function qa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: te.action, "data-action": "", children: a }, t));
}
function sn({ disclosure: e }) {
  return /* @__PURE__ */ n(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function jo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(sn, { disclosure: l }) : a ? [/* @__PURE__ */ n(sn, { disclosure: l }, "more"), /* @__PURE__ */ n(qa, { actions: e }, "actions")] : /* @__PURE__ */ n(qa, { actions: e });
}
function Wo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function zo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: te.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(qa, { actions: e }) });
}
function Go(e, a) {
  const t = $(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Uo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: te.context, children: [
    /* @__PURE__ */ n(hl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: te.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function Ko(...e) {
  return e.some((a) => a === null);
}
function Vo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Yo(e, a, t, r, l) {
  if (l === 0 || Ko(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], d = Vo(e), u = Math.max(0, e.clientWidth - i.offsetWidth - d);
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function Xo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Jo(e) {
  const a = N(null), t = N(null), r = N(null), l = N(null), [i, s] = p(!1);
  return A(() => {
    const c = a.current;
    if (!Xo(c)) return;
    const d = () => s(Yo(c, t.current, r.current, l.current, e.length)), u = new ResizeObserver(d);
    return u.observe(c), d(), () => u.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function Qo({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ o("div", { className: te.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] });
}
function Zo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Va, { connection: e.connection, since: e.since }) : null;
}
function Z1({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: h, headingRef: v, actionsRef: b, measureRef: g, collapsed: I } = Jo(i), H = s.length > 0, { disclosure: oe, close: $e } = Go(I || H, b), ee = Wo(s, i, I, d);
  return /* @__PURE__ */ o("header", { className: te.root, "data-density": u, children: [
    /* @__PURE__ */ n(Uo, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: te.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: v, className: te.headingWrap, children: /* @__PURE__ */ n(Fo, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: te.actionsWrap, children: [
        /* @__PURE__ */ n(Zo, { connection: c }),
        /* @__PURE__ */ n("div", { className: te.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(jo, { actions: i, hasMore: H, collapsed: I, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(zo, { actions: ee, disclosure: oe, onEscape: $e }),
    /* @__PURE__ */ n(Qo, { actions: i, hasMore: H, measureRef: g })
  ] });
}
const ei = "_scrim_c7sqj_2", ai = "_drawer_c7sqj_10", ni = "_sheet_c7sqj_14", ti = "_modal_c7sqj_18", ri = "_panel_c7sqj_23", li = "_header_c7sqj_51", oi = "_title_c7sqj_59", ii = "_body_c7sqj_63", si = "_close_c7sqj_90", Ne = {
  scrim: ei,
  drawer: ai,
  sheet: ni,
  modal: ti,
  panel: ri,
  header: li,
  title: oi,
  body: ii,
  close: si
}, ci = Ve(null), ca = [], da = /* @__PURE__ */ new Map();
function di(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function ui(e, a) {
  let t = da.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, da.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function hi(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !di(r) && ui(e, r);
}
function mi(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (hi(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function wi(e) {
  for (const a of e.claims) {
    const t = da.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), da.delete(a)));
  }
}
function _i(e, a) {
  const t = { root: e, claims: [] };
  return ca.push(t), mi(t, a), t;
}
function vi(e) {
  const a = ca.indexOf(e);
  a >= 0 && ca.splice(a, 1), wi(e);
}
function cn(e) {
  return e !== null && ca.at(-1) === e;
}
function fi(e, a, t) {
  const r = N(null), l = N(t);
  return l.current = t, A(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = _i(i, a);
    return r.current = c, () => {
      var u, h;
      const d = cn(c);
      vi(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [a]), Y(() => cn(r.current), []);
}
function bi(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function pi(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function gi({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${Ne.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ne.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, children: e.children })
  ] });
}
function Ni(e) {
  return `${Ne.scrim} ${Ne[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function yi(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ne.panel} ${Ne[e]} ward-overlay-panel${t}${r}`;
}
function ki(e) {
  const a = Ke(ci);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = N(null), t = N(null), r = $(), l = ki(e.container), i = Ga("(min-width: 768px)"), s = bi(e.kind, i), c = pi(e, r), d = Lt(t), u = fi(a, l, e.returnFocusTo), h = Y(() => {
    u() && e.onClose();
  }, [e.onClose, u]);
  return A(() => {
    var v, b;
    u() && ((b = (v = t.current) == null ? void 0 : v.querySelector("button")) == null || b.focus());
  }, [u]), A(() => {
    const v = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [h]), kt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Ni(s),
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
            className: yi(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (v) => v.stopPropagation(),
            onKeyDown: (v) => u() && d.onKeyDown(v),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ne.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(gi, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const $i = "_root_drrhx_2", Ci = "_ticket_drrhx_15", Si = "_body_drrhx_24", Sa = {
  root: $i,
  ticket: Ci,
  body: Si
};
function e$({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Sa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Sa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Sa.body, children: t })
  ] });
}
const Ri = "_root_bf1pc_2", Ti = "_table_bf1pc_9", Ei = "_caption_bf1pc_14", xi = "_series_bf1pc_23", Li = "_category_bf1pc_31", Ai = "_cell_bf1pc_39", Ii = "_track_bf1pc_45", Mi = "_lane_bf1pc_52", qi = "_bar_bf1pc_56", Bi = "_value_bf1pc_63", Pi = "_swatch_bf1pc_70", Oi = "_empty_bf1pc_78", V = {
  root: Ri,
  table: Ti,
  caption: Ei,
  series: xi,
  category: Li,
  cell: Ai,
  track: Ii,
  lane: Mi,
  bar: qi,
  value: Bi,
  swatch: Pi,
  empty: Oi
}, Di = "—", dn = 6;
function Hi(e, a) {
  if (a.length < 1 || a.length > dn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${dn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Fi(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function In(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function ji(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Wi({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = ji(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ o("span", { className: V.track, children: [
    /* @__PURE__ */ n("span", { className: V.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${V.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: V.value, children: e === null ? l : r(e) })
  ] }) });
}
function zi({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: V.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: V.swatch, "data-step": In(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Gi({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${V.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: V.caption, children: e }),
    /* @__PURE__ */ n("p", { className: V.empty, children: a })
  ] });
}
function Ui({ title: e, categories: a, series: t, top: r, format: l = Z, categoryHead: i = "Category", missing: s = Di }) {
  return /* @__PURE__ */ n("div", { className: `${V.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: V.table, children: [
    /* @__PURE__ */ n("caption", { className: V.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: V.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(zi, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: V.category, children: c }),
      t.map((u, h) => /* @__PURE__ */ n(Wi, { value: u.values[d], top: r, step: In(h, t.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function a$(e) {
  Hi(e.categories, e.series);
  const a = Fi(e.series);
  return a === 0 ? /* @__PURE__ */ n(Gi, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Ui, { ...e, top: a });
}
const Ki = "_root_1bfqw_2", Vi = "_figure_1bfqw_7", Yi = "_of_1bfqw_13", Xi = "_bar_1bfqw_18", Ji = "_rows_1bfqw_38", Qi = "_row_1bfqw_38", Zi = "_label_1bfqw_49", es = "_amount_1bfqw_54", Ce = {
  root: Ki,
  figure: Vi,
  of: Yi,
  bar: Xi,
  rows: Ji,
  row: Qi,
  label: Zi,
  amount: es
};
function as({ spent: e, ceiling: a, breakdown: t }) {
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
const ns = "_frame_mg2jl_2", ts = "_table_mg2jl_6", rs = "_th_mg2jl_12", ls = "_td_mg2jl_13", os = "_sort_mg2jl_47", is = "_row_mg2jl_53", ss = "_empty_mg2jl_61", Re = {
  frame: ns,
  table: ts,
  th: rs,
  td: ls,
  sort: os,
  row: is,
  empty: ss
}, cs = { asc: "ascending", desc: "descending" };
function ds(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return cs[a.direction];
}
function us(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function hs(e) {
  return e === void 0 ? void 0 : { width: e };
}
function ms({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: hs(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ds(e, a),
      children: us(e, t)
    }
  );
}
function ws({ row: e, props: a }) {
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
function _s({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(ms, { column: h, sort: c, onSort: d }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(ws, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(h))) })
  ] }) });
}
const vs = "_list_v0s52_2", fs = {
  list: vs
};
function n$({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: fs.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const bs = "_set_y5zy3_2", ps = "_legend_y5zy3_7", gs = "_row_y5zy3_15", Ns = "_control_y5zy3_20", ys = "_input_y5zy3_26", ks = "_label_y5zy3_31", $s = "_consequence_y5zy3_36", Ie = {
  set: bs,
  legend: ps,
  row: gs,
  control: Ns,
  input: ys,
  label: ks,
  consequence: $s
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
const Cs = "_root_iycnv_2", Ss = "_head_iycnv_11", Rs = "_index_iycnv_27", Ts = "_dot_iycnv_31", Es = "_note_iycnv_36", xs = "_counter_iycnv_42", Ls = "_trailing_iycnv_50", qe = {
  root: Cs,
  head: Ss,
  index: Rs,
  dot: Ts,
  note: Es,
  counter: xs,
  trailing: Ls
};
function As({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${qe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: qe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Is({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.counter, "aria-hidden": "true", children: e }) : null;
}
function un({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: qe.head, children: [
      /* @__PURE__ */ n(As, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: qe.note, children: t }),
    /* @__PURE__ */ n(Is, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: qe.trailing, children: i })
  ] });
}
const Ms = "_strip_1cfs3_2", qs = "_cell_1cfs3_7", Bs = "_value_1cfs3_12", Ps = "_link_1cfs3_27", Os = "_label_1cfs3_39", Xe = {
  strip: Ms,
  cell: qs,
  value: Bs,
  link: Ps,
  label: Os
};
function Ds(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function Hs({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(S, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Xe.link} ward-stat-link`, href: W(e.href), "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function ya({ cells: e, divided: a = !1 }) {
  return Ds(e), /* @__PURE__ */ n("dl", { className: `${Xe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Xe.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Xe.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, title: t.hint, children: /* @__PURE__ */ n(Hs, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Xe.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Fs = "_root_xk7sv_2", js = "_track_xk7sv_8", Ws = "_thumb_xk7sv_35", zs = "_labelHidden_xk7sv_53", Gs = "_label_xk7sv_53", Us = "_lockedNote_xk7sv_68", Be = {
  root: Fs,
  track: js,
  thumb: Ws,
  labelHidden: zs,
  label: Gs,
  lockedNote: Us
};
function Ks(e) {
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
    /* @__PURE__ */ o("span", { id: c, className: Ks(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const Vs = "_bar_1u2kl_2", Ys = "_skip_1u2kl_11", Xs = "_mark_1u2kl_22", Js = "_nav_1u2kl_30", Qs = "_list_1u2kl_34", Zs = "_select_1u2kl_40", ec = "_dest_1u2kl_47", ac = "_actor_1u2kl_61", nc = "_actorMark_1u2kl_74", tc = "_actorLabel_1u2kl_79", rc = "_tagline_1u2kl_98", de = {
  bar: Vs,
  skip: Ys,
  mark: Xs,
  nav: Js,
  list: Qs,
  select: Zs,
  dest: ec,
  actor: ac,
  actorMark: nc,
  actorLabel: tc,
  tagline: rc
};
function lc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function oc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function t$({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = oc(r);
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
      /* @__PURE__ */ n("span", { className: de.actorMark, "aria-hidden": "true", children: lc(c) })
    ] })
  ] });
}
const ic = "_tree_1lyby_2", sc = "_item_1lyby_6", cc = "_row_1lyby_10", dc = "_button_1lyby_22", ua = {
  tree: ic,
  item: sc,
  row: cc,
  button: dc
}, qn = Ve(null);
function uc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = fa({ orientation: "vertical" });
  return /* @__PURE__ */ n(qn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ua.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const hc = { ArrowRight: !0, ArrowLeft: !1 };
function hn(e) {
  return e ? !0 : void 0;
}
function mc(e, a) {
  const t = hc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function wc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function _c(e) {
  const a = [ua.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function vc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function fc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function bc(e) {
  return typeof e == "string" ? e : void 0;
}
function pc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function gc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Bn(e) {
  const a = Ke(qn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = vc(e);
  return /* @__PURE__ */ o("li", { className: ua.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: _c(e),
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
            onClick: () => wc(e),
            onKeyDown: (r) => mc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: fc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: bc(e.label), children: e.label }),
              /* @__PURE__ */ n(pc, { value: e.detail }),
              /* @__PURE__ */ n(gc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Nc = "_frame_1tok6_2", yc = "_subjectRail_1tok6_21", kc = "_subject_1tok6_21", $c = "_rail_1tok6_41", Cc = "_record_1tok6_63", Sc = "_recordBody_1tok6_68", Rc = "_stageGrid_1tok6_117", Tc = "_band_1tok6_143", Ec = "_bandBody_1tok6_152", xc = "_bandActions_1tok6_157", Lc = "_scroller_1tok6_165", Ac = "_lanes_1tok6_183", le = {
  frame: Nc,
  subjectRail: yc,
  subject: kc,
  rail: $c,
  record: Cc,
  recordBody: Sc,
  stageGrid: Rc,
  band: Tc,
  bandBody: Ec,
  bandActions: xc,
  scroller: Lc,
  lanes: Ac
};
function r$({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: le.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function mn(e) {
  return e ? "true" : void 0;
}
function l$({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: le.subjectRail, "data-ward-subject-rail": t, "data-ruled": mn(i), children: [
    /* @__PURE__ */ n("div", { className: le.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: le.rail, "data-sticky": mn(l), "aria-label": r, children: a })
  ] });
}
function o$({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: le.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(un, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: le.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(un, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: le.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Ic = "_form_1j8ub_2", Mc = "_fields_1j8ub_9", qc = "_actions_1j8ub_19", Ra = {
  form: Ic,
  fields: Mc,
  actions: qc
};
function i$({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ra.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ra.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ra.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function s$({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: le.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: le.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: le.bandActions, children: a })
  ] });
}
const Bc = "(max-width: 767.98px)";
function Ba({ label: e, children: a, laneCount: t }) {
  const r = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { className: le.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: r, children: a });
}
function Pc({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: le.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(L, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Ba, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function c$({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Ga(Bc);
  return t === void 0 ? /* @__PURE__ */ n(Ba, { label: a, children: e }) : l ? /* @__PURE__ */ n(Pc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Ba, { label: a, laneCount: t.length, children: t.map((i) => /* @__PURE__ */ n(yt, { children: i.content }, i.id)) });
}
function d$({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = N(null), i = Math.max(e, 1);
  Ln(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: le.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const Oc = "_block_1o5o7_2", Dc = "_sentence_1o5o7_15", Hc = "_meta_1o5o7_20", Fc = "_action_1o5o7_25", jc = "_strip_1o5o7_29", Wc = "_loading_1o5o7_48", zc = "_label_1o5o7_56", Gc = "_counter_1o5o7_63", _e = {
  block: Oc,
  sentence: Dc,
  meta: Hc,
  action: Fc,
  strip: jc,
  loading: Wc,
  label: zc,
  counter: Gc
};
function Uc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(_, { onClick: e.onClick, children: e.label }) });
}
function ka({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: _e.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Uc, { action: a })
  ] });
}
function Kc(e) {
  return /* @__PURE__ */ n(ka, { ...e, kind: "ward-emptystate" });
}
function u$({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ka, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function h$(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function m$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ka, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    ce(a)
  ] }) });
}
function w$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ce(e),
    ". Showing snapshot from ",
    ce(a)
  ] });
}
function _$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ce(a)
  ] });
}
function v$({ label: e, startedAt: a }) {
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
const Vc = "_note_tlubt_2", Yc = {
  note: Vc
};
function Xc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: Yc.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const Jc = "_card_12in3_2", Qc = "_hit_12in3_23", Zc = "_head_12in3_30", ed = "_title_12in3_36", ad = "_meta_12in3_44", nd = "_fields_12in3_45", td = "_who_12in3_58", rd = "_sep_12in3_65", ld = "_mono_12in3_69", od = "_field_12in3_45", id = "_last_12in3_84", sd = "_reason_12in3_96", X = {
  card: Jc,
  hit: Qc,
  head: Zc,
  title: ed,
  meta: ad,
  fields: nd,
  who: td,
  sep: rd,
  mono: ld,
  field: od,
  last: id,
  reason: sd
}, cd = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function dd(e, a, t) {
  const r = la(e, "blue"), l = la(e, "orange"), i = la(e, "green"), s = N(/* @__PURE__ */ new Set());
  A(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = cd[d.type];
      u && c[u]();
    });
  }, [r, t, i, a, l]);
}
const ud = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function hd(e, a) {
  return ud[a](e);
}
function md({ item: e, connection: a }) {
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
function wd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: X.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function _d({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: X.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function vd({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: X.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: X.field, children: hd(e, t) }, t)) });
}
const Pa = (e) => e ? !0 : void 0;
function fd(e) {
  return { "--stream": Ee(e.streamStep, "id") };
}
function bd(e, a, t) {
  e == null || e(a, t);
}
function pd(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function gd({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: X.last, "data-stale": Pa(a), children: t }) : null;
}
function $a(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  dd(r, t.key, e.feed);
  const l = pd(e.feed), i = fd(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: X.hit, onClick: (s) => bd(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(wd, { item: t }),
        /* @__PURE__ */ n("p", { className: X.title, children: t.title }),
        /* @__PURE__ */ n(md, { item: t, connection: l }),
        /* @__PURE__ */ n(_d, { reason: t.blockedReason }),
        /* @__PURE__ */ n(vd, { item: t, fields: a }),
        /* @__PURE__ */ n(gd, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const Nd = "_column_10sxg_3", yd = "_head_10sxg_24", kd = "_label_10sxg_33", $d = "_count_10sxg_42", Cd = "_list_10sxg_56", Je = {
  column: Nd,
  head: yd,
  label: kd,
  count: $d,
  list: Cd
};
function Pn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Sd({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Rd(e) {
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
function Td({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = $(), h = e.cap !== void 0 && a.length > e.cap, v = Pn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Sd, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ n(Rd, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: v }),
    h && /* @__PURE__ */ n(Xc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Ed = "_foot_8qg4p_2", xd = "_note_8qg4p_13", Ld = "_link_8qg4p_19", Ta = {
  foot: Ed,
  note: xd,
  link: Ld
};
function f$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ta.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ta.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Ta.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Ad = "_head_1la6p_3", Id = "_identity_1la6p_12", Md = "_titleRow_1la6p_18", qd = "_title_1la6p_18", Bd = "_key_1la6p_35", Pd = "_rollup_1la6p_45", Od = "_tools_1la6p_53", Dd = "_swatch_1la6p_62", Hd = "_mark_1la6p_69", pe = {
  head: Ad,
  identity: Id,
  titleRow: Md,
  title: qd,
  key: Bd,
  rollup: Pd,
  tools: Od,
  swatch: Dd,
  mark: Hd
}, wn = "initials:";
function Fd(e) {
  return e === void 0 ? "loaded this week unavailable" : `${Z(e)} loaded this week`;
}
function jd(e) {
  const a = [Fd(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${Z(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function Wd(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      Z(e.inFlight),
      " in flight"
    ] }),
    " · ",
    jd(e)
  ] });
}
function zd(e) {
  return e.startsWith(wn) ? e.slice(wn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Gd({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ee(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${pe.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: zd(e) }) : /* @__PURE__ */ n("span", { className: pe.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Ud({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function b$({
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
        /* @__PURE__ */ n(Gd, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: pe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: pe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: pe.rollup, "aria-live": "polite", children: Wd(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: pe.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Ud, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(_, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Va, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Kd = "_head_kabyh_11", Vd = "_line_kabyh_12", Yd = "_cHandle_kabyh_33", Xd = "_cName_kabyh_38", Jd = "_nameLine_kabyh_46", Qd = "_cLabel_kabyh_53", Zd = "_cCap_kabyh_58", eu = "_cShown_kabyh_63", au = "_name_kabyh_46", nu = "_noCap_kabyh_85", tu = "_state_kabyh_99", ru = "_handle_kabyh_104", lu = "_sub_kabyh_118", B = {
  head: Kd,
  line: Vd,
  cHandle: Yd,
  cName: Xd,
  nameLine: Jd,
  cLabel: Qd,
  cCap: Zd,
  cShown: eu,
  name: au,
  noCap: nu,
  state: tu,
  handle: ru,
  sub: lu
}, ou = "can't be hidden or collapsed", iu = "terminal · counted, not a column";
function p$() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: B.cHandle }),
    /* @__PURE__ */ n("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: B.cShown, children: "Shown" })
  ] });
}
function su(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function cu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function _n(e) {
  return e.gate ? ou : e.terminal ? iu : cu(e.agentsMounted);
}
function du(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function uu({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ n("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    _n(e) && /* @__PURE__ */ n("span", { className: B.sub, children: _n(e) })
  ] });
}
function hu(e) {
  return e === void 0 ? "" : String(e);
}
function mu(e) {
  return e === "" ? void 0 : Number(e);
}
function wu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: B.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: B.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => du(t, a),
      children: "⠿"
    }
  ) });
}
function _u({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: B.cCap, children: /* @__PURE__ */ n(L, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: hu(a.cap), onChange: (r) => t({ ...a, cap: mu(r) }) }) });
}
function vu({ stage: e, config: a, onChange: t }) {
  const r = su(e, a.shown);
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ n(Oe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: B.state, "aria-hidden": "true", children: r.state })
  ] });
}
function fu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function g$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": fu(e), children: [
    /* @__PURE__ */ n(wu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(uu, { stage: e }),
    /* @__PURE__ */ n("span", { className: B.cLabel, children: /* @__PURE__ */ n(L, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(_u, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(vu, { stage: e, config: a, onChange: t })
  ] });
}
const bu = "_body_hn6d6_2", pu = "_head_hn6d6_9", gu = "_summary_hn6d6_19", Nu = "_block_hn6d6_20", yu = "_actionsBlock_hn6d6_21", ku = "_title_hn6d6_41", $u = "_note_hn6d6_46", Cu = "_k_hn6d6_51", Su = "_kv_hn6d6_58", Ru = "_row_hn6d6_64", Tu = "_label_hn6d6_75", Eu = "_value_hn6d6_84", xu = "_quote_hn6d6_90", Lu = "_actions_hn6d6_21", Au = "_resolve_hn6d6_103", P = {
  body: bu,
  head: pu,
  summary: gu,
  block: Nu,
  actionsBlock: yu,
  title: ku,
  note: $u,
  k: Cu,
  kv: Su,
  row: Ru,
  label: Tu,
  value: Eu,
  quote: xu,
  actions: Lu,
  resolve: Au
};
function Iu(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Mu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function qu(e) {
  const a = ga(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Bu(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Na(qu(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Iu(e),
    ...Mu(e, a)
  ];
}
function Pu({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: P.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: P.k, children: a }),
    e
  ] });
}
function Ou({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: P.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Du({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: P.block, children: [
    /* @__PURE__ */ n("p", { className: P.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: P.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: P.note, children: e.agentMeta })
  ] }) : null;
}
function N$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const d = $(), u = Bu(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: d, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: P.body, children: [
    /* @__PURE__ */ n(Ou, { item: e }),
    /* @__PURE__ */ o("div", { className: P.summary, children: [
      /* @__PURE__ */ n("h2", { className: P.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: P.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: P.kv, children: u.map(([h, v]) => /* @__PURE__ */ o("div", { className: P.row, children: [
      /* @__PURE__ */ n("dt", { className: P.label, children: h }),
      /* @__PURE__ */ n("dd", { className: P.value, children: v })
    ] }, h)) }),
    /* @__PURE__ */ n(Du, { item: e }),
    /* @__PURE__ */ o("div", { className: P.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: P.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: P.note, children: c })
    ] }),
    /* @__PURE__ */ n(Pu, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Hu = "_root_3azmy_2", Fu = "_list_3azmy_7", ju = "_item_3azmy_12", Wu = "_box_3azmy_18", zu = "_text_3azmy_23", Gu = "_note_3azmy_28", Fe = {
  root: Hu,
  list: Fu,
  item: ju,
  box: Wu,
  text: zu,
  note: Gu
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
const Uu = "_rail_ke7ch_2", Ku = "_k_ke7ch_11", Vu = "_head_ke7ch_19", Yu = "_section_ke7ch_25", Xu = "_card_ke7ch_38", Ju = "_strip_ke7ch_42", Qu = "_skeleton_ke7ch_56", Zu = "_skeletonLabel_ke7ch_70", eh = "_bar_ke7ch_76", ah = "_note_ke7ch_85", he = {
  rail: Uu,
  k: Ku,
  head: Vu,
  section: Yu,
  card: Xu,
  strip: Ju,
  skeleton: Qu,
  skeletonLabel: Zu,
  bar: eh,
  note: ah
};
function nh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ea({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: he.k, children: e }),
    a
  ] });
}
function th({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function rh({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Td, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function lh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(rh, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(th, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function y$(e) {
  const a = nh(e.onOpen), t = Pn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ea, { title: "Card", children: /* @__PURE__ */ n("div", { className: he.card, children: t && /* @__PURE__ */ n($a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ea, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(lh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ea, { title: "Effect of this config", children: /* @__PURE__ */ n(Ca, { items: e.effects, density: "compact" }) })
  ] });
}
function oh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function ih(e) {
  return Math.ceil(e.length / 2);
}
function sh(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function On(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function ch(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = On(e);
  l !== void 0 && t(l), r(sh(e.type));
}
function dh(e, a, t, r, l) {
  A(() => {
    if (e !== null)
      return e.subscribe(a, (i) => ch(i, t, r, l));
  }, [e, a, t, r, l]);
}
function uh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function hh(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function mh(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function wh(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(ih(a ?? [])) + ")"
  };
}
function _h(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function vh(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: ne(e.cost) }) : null;
}
function fh(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function bh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function ph(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function gh(e, a) {
  return a === void 0 ? e : oh(e, a.ref);
}
function Nh(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ze(e) {
  return e === !0 ? "true" : void 0;
}
function Dn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = N(null), i = la(l), s = N(/* @__PURE__ */ new Set()), [c, d] = p(uh(a));
  dh(e.feed, a.key, s, d, i);
  const u = hh(a, r), h = mh(a, t), v = wh(a, e.fields), b = ph(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Nh(e),
      className: "ward-workcard",
      "data-flagged": Ze(a.flagged),
      "data-selected": Ze(e.selected),
      style: v,
      ref: gh(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        _h(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          vh(a, e.fields),
          fh(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          bh(t, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function yh({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function kh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function $h(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Ch(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(yh, { count: e.items.length, cap: e.column.cap });
}
function Sh(e, a) {
  return e.roving ?? a;
}
function Rh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Th(e, a) {
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
function Eh(e) {
  const a = $(), t = fa({ orientation: "vertical" }), r = Sh(e, t), l = kh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ze(l), "data-gate": Ze(e.column.gate), children: [
    $h(e.column, e.items.length, a),
    Ch(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Rh(e, t), children: Th(e, r) })
  ] });
}
function xh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Lh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Ah(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function k$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: xh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Lh(e),
      Ah(e.onConfigure),
      /* @__PURE__ */ n(Va, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Ih(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Mh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Oe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Oe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function qh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function $$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ze(Ih(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Mh(e) }),
    /* @__PURE__ */ n(L, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(En, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    qh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function C$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Dn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Eh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Bh(e, a) {
  const t = On(e);
  t !== void 0 && a(t);
}
function Ph(e, a, t) {
  A(() => {
    if (e != null)
      return e.subscribe(a, (r) => Bh(r, t));
  }, [e, a, t]);
}
function Oh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Dh(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function Hh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Fh(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function S$(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  Ph(e.feed, a.key, l);
  const i = [...Oh(a), ...Dh(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Hh(t, r)
    ] }),
    Fh(a, e.actions)
  ] });
}
const jh = "_card_hvxp7_2", Wh = "_head_hvxp7_17", zh = "_mark_hvxp7_25", Gh = "_name_hvxp7_37", Uh = "_chips_hvxp7_48", Kh = "_description_hvxp7_54", Vh = "_run_hvxp7_59", Yh = "_sep_hvxp7_68", Xh = "_facts_hvxp7_73", Jh = "_fact_hvxp7_73", Qh = "_factLabel_hvxp7_86", Zh = "_factValue_hvxp7_90", re = {
  card: jh,
  head: Wh,
  mark: zh,
  name: Gh,
  chips: Uh,
  description: Kh,
  run: Vh,
  sep: Yh,
  facts: Xh,
  fact: Jh,
  factLabel: Qh,
  factValue: Zh
}, em = { live: "done", draft: "running", paused: "meta" };
function am(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function nm({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: em[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function tm({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: re.description, children: e });
}
function rm({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function lm({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ n("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function om(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function im({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": Ee(e.streamStep, "id") }, d = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: am(s),
      style: c,
      "data-selected": d,
      "data-paused": om(e.versions),
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ n("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${re.name} ward-rowlink ward-target`, href: W(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(tm, { description: e.description }),
        /* @__PURE__ */ n(rm, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(nm, { versions: e.versions }),
        /* @__PURE__ */ n(lm, { facts: i })
      ]
    }
  );
}
const sm = "_list_4dcyc_2", cm = "_row_4dcyc_11", dm = "_head_4dcyc_23", um = "_id_4dcyc_30", hm = "_lock_4dcyc_35", mm = "_reason_4dcyc_41", wm = "_remove_4dcyc_46", _m = "_clauses_4dcyc_50", vm = "_clause_4dcyc_50", fm = "_label_4dcyc_64", bm = "_cell_4dcyc_71", pm = "_value_4dcyc_76", ie = {
  list: sm,
  row: cm,
  head: dm,
  id: um,
  lock: hm,
  reason: mm,
  remove: wm,
  clauses: _m,
  clause: vm,
  label: fm,
  cell: bm,
  value: pm
}, Hn = Ve(!1);
function R$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Hn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function gm({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(L, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function Nm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ie.reason, children: e })
  ] });
}
function ym({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ n("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Nm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function vn(e, a) {
  return e.locked ? void 0 : a;
}
function T$({ rule: e, onChange: a, onRemove: t }) {
  if (!Ke(Hn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = vn(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(ym, { rule: e, onRemove: vn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ n("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ie.cell, children: /* @__PURE__ */ n(gm, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const km = "_ladder_wwnch_2", $m = "_cell_wwnch_7", Cm = "_empty_wwnch_26", Sm = "_name_wwnch_34", Rm = "_holder_wwnch_40", Tm = "_request_wwnch_46", Em = "_swatches_wwnch_51", xm = "_swatch_wwnch_51", Lm = "_tilesFrame_wwnch_78", Am = "_tiles_wwnch_78", Im = "_tile_wwnch_78", Mm = "_bar_wwnch_117", qm = "_hex_wwnch_128", Bm = "_note_wwnch_138", E = {
  ladder: km,
  cell: $m,
  empty: Cm,
  name: Sm,
  holder: Rm,
  request: Tm,
  swatches: Em,
  swatch: xm,
  tilesFrame: Lm,
  tiles: Am,
  tile: Im,
  bar: Mm,
  hex: qm,
  note: Bm
}, Pm = "not validated yet, pending a CVD matrix and dark stepping";
function Om(e) {
  return e.reserved ? "reserved" : pa(e.step) ? "validated" : "partial";
}
function Fn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Dm(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Hm({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(xe, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Fm(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function jm(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const fn = (e) => String(e).padStart(2, "0");
function Wm(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Fn(e, void 0);
}
function zm({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${fn(e)}` : Ot(e) }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: r ? t : `Step ${fn(e)} · ${t}` })
  ] });
}
function Gm({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = Om(e), s = Fn(i, t), c = s !== "free", d = a === e.step, u = e.name ?? `Step ${e.step}`, h = () => {
    c || r(e.step);
  }, v = `${u} · ${l === "tiles" && d ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": v, ...jm(c, d), "data-validation": i, style: Dm(e, i), onClick: h, onKeyDown: (g) => Fm(g, h) }, label: v, name: u, holder: s, validation: i, note: Wm(i, t, d), step: e.step };
}
const Um = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(zm, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Hm, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Km(e) {
  return Um[e.presentation](Gm(e));
}
function Vm(e) {
  for (const a of e)
    if (!a.reserved && !ba(a.step)) throw new Error("colour ladder renders token steps only");
}
function Ym() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Xm(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Jm = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function Qm() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Zm = { list: Ym, swatches: () => null, tiles: Qm };
function jn(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Vm(e.steps);
  const r = Xm(e), l = Zm[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(Km, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${Jm[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: E.tiles, children: i }) : i });
}
const ew = "_rail_1el2t_2", aw = "_section_1el2t_12", nw = "_sectionFlush_1el2t_22", tw = "_head_1el2t_26", rw = "_headLabel_1el2t_34", lw = "_sample_1el2t_42", ow = "_sampleLabel_1el2t_47", iw = "_sampleTitle_1el2t_54", sw = "_sampleMeta_1el2t_59", cw = "_trace_1el2t_65", dw = "_traceHead_1el2t_70", uw = "_steps_1el2t_78", hw = "_step_1el2t_78", mw = "_stepTitle_1el2t_97", ww = "_hollow_1el2t_107", _w = "_stepBody_1el2t_115", vw = "_stepDetail_1el2t_127", fw = "_publish_1el2t_132", bw = "_reason_1el2t_138", pw = "_note_1el2t_143", gw = "_reveal_1el2t_148", y = {
  rail: ew,
  section: aw,
  sectionFlush: nw,
  head: tw,
  headLabel: rw,
  sample: lw,
  sampleLabel: ow,
  sampleTitle: iw,
  sampleMeta: sw,
  trace: cw,
  traceHead: dw,
  steps: uw,
  step: hw,
  stepTitle: mw,
  hollow: ww,
  stepBody: _w,
  stepDetail: vw,
  publish: fw,
  reason: bw,
  note: pw,
  reveal: gw
}, bn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Nw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, yw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, kw = { notSimulated: "not simulated", running: "running" };
function $w(e) {
  return e.presentation === "foundry";
}
function Cw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Sw(e, a) {
  var r;
  const t = Nw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Rw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Tw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Ew(e) {
  if (Rw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function xw(e) {
  const [a, t] = p(!1);
  A(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${y.step} ${y.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Lw(e) {
  const a = kw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: y.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(xe, { size: 6, kind: yw[e.kind], label: e.kind });
}
function Aw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: y.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Iw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Mw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(xw, { kind: a.kind, children: [
    /* @__PURE__ */ n(Lw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: y.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: y.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Aw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Iw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function qw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(se(a)), t.join(" · ");
}
function Wn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${y.trace} ${y.section}`, children: [
    /* @__PURE__ */ n("p", { className: y.traceHead, id: a, children: qw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: y.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Mw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Bw(e) {
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
function Pw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ce(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${y.sampleMeta} ${y.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Ow(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Sn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: y.sectionFlush, children: /* @__PURE__ */ n(ya, { divided: !0, cells: a }) });
}
function Dw(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Sn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Hw(e) {
  const a = Dw(e.run);
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
function Fw(e) {
  return /* @__PURE__ */ o("div", { className: `${y.publish} ${y.section}`, children: [
    /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: y.note, children: e.note })
  ] });
}
function jw(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${y.publish} ${y.section}`, children: /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Gn(e) {
  return /* @__PURE__ */ o("div", { className: `${y.head} ${y.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: y.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: bn[e.run.status].role, label: bn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Ww(e, a) {
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
function zw(e) {
  var t;
  Tw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Bw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Ow, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist }) }),
    /* @__PURE__ */ n(Fw, { reason: Cw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Gw(e) {
  var r;
  const a = Ww(e.run, e.feed);
  Ew(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Pw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Hw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(jw, { reason: Sw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function E$(e) {
  return $w(e) ? /* @__PURE__ */ n(Gw, { ...e }) : /* @__PURE__ */ n(zw, { ...e });
}
const Uw = "_list_142ip_3", Kw = "_row_142ip_9", Vw = "_condition_142ip_18", Yw = "_action_142ip_24", oa = {
  list: Uw,
  row: Kw,
  condition: Vw,
  action: Yw
}, Un = Ve(!1);
function x$({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Un.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oa.list, "aria-label": a, children: e }) });
}
function L$({ rule: e }) {
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
function Xw(e) {
  return e === "up" ? "down" : "up";
}
function Jw(e, a) {
  const t = pn(e, a.id, a.direction) ?? pn(e, a.id, Xw(a.direction));
  t == null || t.focus();
}
function Yn() {
  const e = N(null), [a, t] = p(null), [r, l] = p("");
  return A(() => {
    e.current !== null && a !== null && Jw(e.current, a);
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
const Qw = "_body_1h15q_2", Zw = "_title_1h15q_8", e_ = "_section_1h15q_13", a_ = "_legend_1h15q_18", n_ = "_stages_1h15q_26", t_ = "_stage_1h15q_26", r_ = "_stageIndex_1h15q_44", l_ = "_stageName_1h15q_50", o_ = "_footer_1h15q_59", i_ = "_note_1h15q_66", s_ = "_reason_1h15q_71", c_ = "_actions_1h15q_76", d_ = "_webHead_1h15q_83", u_ = "_kicker_1h15q_92", h_ = "_webTitle_1h15q_99", m_ = "_webBody_1h15q_105", w_ = "_webSection_1h15q_109", __ = "_sectionHead_1h15q_121", v_ = "_sectionNote_1h15q_129", f_ = "_formLabel_1h15q_134", b_ = "_identityRow_1h15q_139", p_ = "_nameCell_1h15q_145", g_ = "_keyCell_1h15q_150", N_ = "_colourCell_1h15q_154", y_ = "_colourStatus_1h15q_161", k_ = "_webStages_1h15q_166", $_ = "_webStageList_1h15q_172", C_ = "_webStage_1h15q_166", S_ = "_webIndex_1h15q_191", R_ = "_webStageName_1h15q_196", T_ = "_webMoves_1h15q_201", E_ = "_addStage_1h15q_215", x_ = "_addStageButton_1h15q_223", L_ = "_addStageNote_1h15q_231", A_ = "_webFooter_1h15q_236", I_ = "_webFooterNotes_1h15q_244", M_ = "_webNote_1h15q_251", w = {
  body: Qw,
  title: Zw,
  section: e_,
  legend: a_,
  stages: n_,
  stage: t_,
  stageIndex: r_,
  stageName: l_,
  footer: o_,
  note: i_,
  reason: s_,
  actions: c_,
  webHead: d_,
  kicker: u_,
  webTitle: h_,
  webBody: m_,
  webSection: w_,
  sectionHead: __,
  sectionNote: v_,
  formLabel: f_,
  identityRow: b_,
  nameCell: p_,
  keyCell: g_,
  colourCell: N_,
  colourStatus: y_,
  webStages: k_,
  webStageList: $_,
  webStage: C_,
  webIndex: S_,
  webStageName: R_,
  webMoves: T_,
  addStage: E_,
  addStageButton: x_,
  addStageNote: L_,
  webFooter: A_,
  webFooterNotes: I_,
  webNote: M_
}, q_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Jn = "not in catalogue";
function B_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Jn}` }, ...t];
}
function P_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(L, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Jn}`;
  return /* @__PURE__ */ n(L, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: B_(t, e.name), invalid: i, onChange: r });
}
function Qn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function O_(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function D_({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Qn(a, t), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(P_, { stage: a, index: t, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(L, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: q_, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function H_({ stages: e, onChange: a, catalogue: t }) {
  const r = O_(e.length), l = Yn(), i = (c, d) => {
    const u = Kn(c, d);
    r.current = Oa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Vn(Qn(e[c], c), u, e.length)), a(Oa(e, c, u));
  }, s = (c, d) => a(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(D_, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: t, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Xn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const F_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], j_ = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], W_ = "A new stream starts as a draft. Nothing runs on it until you publish it.", z_ = "Create is disabled: name the stream and give it a key first.", G_ = "reorder with the ↑ ↓ buttons · min 2";
function Ya(e, a) {
  return !e.reserved && pa(e.step) && a[e.step] === void 0;
}
function U_(e, a) {
  const t = e.find((r) => Ya(r, a));
  return t ? t.step : 1;
}
function K_({ stages: e, onMove: a }) {
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
function V_({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: W_ }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(_, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Y_(e, a) {
  return e !== "" && a !== "" ? null : z_;
}
function X_(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = j_, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = $(), [h, v] = p(""), [b, g] = p(""), [I, H] = p(a[0].value), [oe, $e] = p(() => U_(t, r)), [ee, De] = p(e.stages ?? F_), [He, C] = p(l[0].value), z = { name: h, key: b, streamStep: oe, owner: I, stages: ee, policy: He }, ve = Y_(h, b);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Stream name", value: h, onChange: v }),
      /* @__PURE__ */ n(L, { kind: "input", label: "Key", value: b, onChange: g, mono: !0 }),
      /* @__PURE__ */ n(L, { kind: "select", label: "Owner", value: I, onChange: H, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(jn, { label: "Stream colour", steps: t, value: oe, onChange: $e, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(K_, { stages: ee, onMove: (Le, gt) => De(Oa(ee, Le, gt)) })
    ] }),
    /* @__PURE__ */ n(Mn, { legend: "Loop policy", options: l, value: He, onChange: C }),
    /* @__PURE__ */ n(V_, { reason: ve, onCreate: () => i(z), onDraft: () => s(z) })
  ] }) });
}
const Zn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], J_ = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function Q_(e, a, t, r, l, i) {
  var c;
  const s = ((c = Zn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function Z_(e, a) {
  return ev(e) && av(e, a) && nv(e);
}
function ev(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function av(e, a) {
  return e.colourStep !== null && Ya({ step: e.colourStep }, a);
}
function nv(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function tv(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${Pm}.` : Ya({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function rv({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function lv({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(rv, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: J_ })
    ] }),
    l && /* @__PURE__ */ n(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function ov({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function iv({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function sv(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, v] = p(null), [b, g] = p("relay"), [I, H] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = Q_(l, s, d, h, b, I), $e = Z_(oe, r), ee = I.find((C) => C.kind === "agent" && C.name.trim() !== ""), De = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(jn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: v, takenBy: r })
  ] }), He = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: tv(h, r) }),
    /* @__PURE__ */ n(L, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((C) => ({ value: C, label: C })), onChange: u })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(ov, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(iv, { name: l, setName: i, streamKey: s, setKey: c, colour: De, owner: He }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: G_ })
        ] }),
        /* @__PURE__ */ n(H_, { stages: I, onChange: H })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(Mn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Zn, onChange: g }) }),
      /* @__PURE__ */ n(lv, { ready: $e, draft: oe, agentStage: ee, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function A$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(sv, { ...e }) : /* @__PURE__ */ n(X_, { ...e });
}
const cv = "_row_bs8hc_2", dv = "_cell_bs8hc_6", uv = "_condition_bs8hc_11", hv = "_action_bs8hc_18", mv = "_contract_bs8hc_24", wv = "_contractCondition_bs8hc_33", _v = "_contractAction_bs8hc_39", J = {
  row: cv,
  cell: dv,
  condition: uv,
  action: hv,
  contract: mv,
  contractCondition: wv,
  contractAction: _v
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
function vv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: J.condition, title: ma(e, r), children: ma(e, r) }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: Xa(e, a, t) })
  ] });
}
function fv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: J.row, children: [
    /* @__PURE__ */ o("td", { className: J.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: J.condition, children: ma(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: J.cell, children: Xa(e, a, t) })
  ] });
}
function bv({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: J.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: J.contractCondition, children: ma(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: J.contractAction, children: Xa(e, a, t, !0) })
  ] });
}
const pv = { two: fv, four: vv, contract: bv };
function I$(e) {
  var t;
  if (!et.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = pv[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const gv = "_column_gxbdk_2", Nv = "_head_gxbdk_17", yv = "_index_gxbdk_23", kv = "_name_gxbdk_29", $v = "_meta_gxbdk_38", Cv = "_mono_gxbdk_43", Sv = "_gate_gxbdk_50", Rv = "_reviewersLabel_gxbdk_57", Tv = "_reviewers_gxbdk_57", Ev = "_reviewer_gxbdk_57", xv = "_agents_gxbdk_74", Lv = "_workflowColumn_gxbdk_79", Av = "_workflowHead_gxbdk_96", Iv = "_stageRow_gxbdk_102", Mv = "_stageLabel_gxbdk_109", qv = "_workflowTitle_gxbdk_116", Bv = "_workflowMeta_gxbdk_122", Pv = "_workflowGate_gxbdk_127", Ov = "_gateNote_gxbdk_135", Dv = "_cardNote_gxbdk_140", Hv = "_reviewerList_gxbdk_149", Fv = "_reviewerRow_gxbdk_155", jv = "_reviewerMark_gxbdk_161", Wv = "_reviewerName_gxbdk_171", zv = "_terminalCard_gxbdk_177", Gv = "_terminalCount_gxbdk_186", Uv = "_workflowAgents_gxbdk_192", Kv = "_mount_gxbdk_198", k = {
  column: gv,
  head: Nv,
  index: yv,
  name: kv,
  meta: $v,
  mono: Cv,
  gate: Sv,
  reviewersLabel: Rv,
  reviewers: Tv,
  reviewer: Ev,
  agents: xv,
  workflowColumn: Lv,
  workflowHead: Av,
  stageRow: Iv,
  stageLabel: Mv,
  workflowTitle: qv,
  workflowMeta: Bv,
  workflowGate: Pv,
  gateNote: Ov,
  cardNote: Dv,
  reviewerList: Hv,
  reviewerRow: Fv,
  reviewerMark: jv,
  reviewerName: Wv,
  terminalCard: zv,
  terminalCount: Gv,
  workflowAgents: Uv,
  mount: Kv
}, Vv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Ja(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function at(e) {
  return `${Math.round(e * 100)}%`;
}
function Yv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: k.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: k.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: k.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ya, { cells: [
      { value: at(e.gateShare), label: "Gate share", accent: "amber" },
      { value: Z(e.count), label: "In stage" }
    ] })
  ] });
}
function Xv({ stage: e }) {
  return /* @__PURE__ */ n(ya, { cells: [
    { value: Z(e.count), label: "In stage" },
    { value: Ja(e.closedThisWeek, Z), label: "Closed this week" }
  ] });
}
function Jv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: k.head, children: [
    /* @__PURE__ */ n("span", { className: k.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: k.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: Vv[e.kind] })
  ] });
}
function Qv({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: k.meta, children: [
    /* @__PURE__ */ o("span", { className: k.mono, children: [
      Z(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: k.mono, children: [
      se(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Zv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(Yv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(Xv, { stage: e }) : null;
}
function ef({ onMount: e }) {
  return e ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function af({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: k.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Jv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(Qv, { stage: e }),
    /* @__PURE__ */ n(Zv, { stage: e }),
    /* @__PURE__ */ n("div", { className: k.agents, children: a.map((s) => /* @__PURE__ */ n(im, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(ef, { onMount: t })
  ] });
}
const nf = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function tf({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: k.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: k.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: k.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: k.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function rf({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: k.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(tf, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: k.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: at(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function lf(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function of({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: k.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: k.terminalCount, children: Ja(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: k.cardNote, children: lf(e.rolledBackThisWeek) })
  ] });
}
function sf(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function cf(e) {
  if (e.kind === "terminal") return `${Ja(e.closedThisWeek)} this week`;
  const a = sf(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function df({ stage: e, titleId: a }) {
  const t = nf[e.kind];
  return /* @__PURE__ */ o("header", { className: k.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: k.stageRow, children: [
      /* @__PURE__ */ o("span", { className: k.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: k.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: k.workflowMeta, children: cf(e) })
  ] });
}
function uf(e) {
  return e === "entry" || e === "agent";
}
function hf({ stage: e, onMount: a }) {
  return a === void 0 || !uf(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: `${k.mount} ward-target`, onClick: () => a(e.index), children: "+ Mount agent" });
}
function mf({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: k.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(df, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(rf, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(of, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: k.workflowAgents, children: a }),
    /* @__PURE__ */ n(hf, { stage: e, onMount: t })
  ] });
}
function wf(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function M$(e) {
  return wf(e) ? /* @__PURE__ */ n(mf, { ...e }) : /* @__PURE__ */ n(af, { ...e });
}
const _f = "_row_9esh9_6", vf = "_cell_9esh9_10", ff = "_name_9esh9_19", bf = "_chain_9esh9_26", pf = "_owner_9esh9_32", gf = "_mono_9esh9_38", Nf = "_compactRow_9esh9_45", yf = "_compactCell_9esh9_54", kf = "_stack_9esh9_71", $f = "_stat_9esh9_78", Cf = "_identityLine_9esh9_85", Sf = "_identity_9esh9_85", Rf = "_compactName_9esh9_103", Tf = "_ownerLine_9esh9_117", Ef = "_link_9esh9_130", xf = "_gateMark_9esh9_136", Lf = "_emptyChain_9esh9_141", Af = "_arrow_9esh9_147", If = "_muted_9esh9_148", Mf = "_define_9esh9_153", qf = "_statValue_9esh9_160", Bf = "_policyId_9esh9_166", Pf = "_sub_9esh9_171", f = {
  row: _f,
  cell: vf,
  name: ff,
  chain: bf,
  owner: pf,
  mono: gf,
  compactRow: Nf,
  compactCell: yf,
  stack: kf,
  stat: $f,
  identityLine: Cf,
  identity: Sf,
  compactName: Rf,
  ownerLine: Tf,
  link: Ef,
  gateMark: xf,
  emptyChain: Lf,
  arrow: Af,
  muted: If,
  define: Mf,
  statValue: qf,
  policyId: Bf,
  sub: Pf
};
function Of(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Df(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function nt(e) {
  return `${Z(e)} ${e === 1 ? "member" : "members"}`;
}
function Hf(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${nt(e.members)}`;
}
function Ff(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ o("span", { className: f.stack, children: [
    /* @__PURE__ */ o("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Hf(e) })
  ] }) });
}
function tt({ name: e, gate: a, size: t }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ n("span", { className: f.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { role: a ? "gate" : "soft", size: t, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function jf(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(tt, { name: a.name, gate: a.gate === !0, size: "tag" })
  ] }, `${a.name}${t}`)) });
}
function Wf(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: `${f.define} ward-target`, href: W(a), children: "Define workflow" })
  ] }) : jf(e) });
}
function Nn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, title: r, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function zf(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function Gf(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Uf({ stream: e, href: a, presentation: t }) {
  const r = Df(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ee(e.streamStep, "chip") }, children: [
    Ff(e, a),
    Wf(e.stages, a),
    Nn(Gf(e.agents), e.agents === void 0 ? void 0 : Of(e.agents), "—"),
    zf(e.policy),
    Nn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Kf(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function q$(e) {
  if (Kf(e)) return Uf(e);
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
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, title: a.inFlightHint, children: Z(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const Vf = "_row_mdce7_2", Yf = "_name_mdce7_16", Xf = "_scope_mdce7_24", wa = {
  row: Vf,
  name: Yf,
  scope: Xf
};
function Jf(e) {
  return e === void 0 ? `${wa.row} ward-toolrow` : `${wa.row} ward-toolrow ${e}`;
}
function Qf(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Zf({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function eb({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function ab({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${wa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function nb(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function B$({ tool: e, onChange: a, presentation: t }) {
  const r = $(), l = $(), i = Qf(e, t), s = nb(t);
  return /* @__PURE__ */ o(s, { className: Jf(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Zf, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${wa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(ab, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(eb, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const tb = "_strip_1qtlf_2", rb = "_head_1qtlf_10", lb = "_name_1qtlf_16", ob = "_chart_1qtlf_24", ib = "_segment_1qtlf_30", sb = "_detailedChart_1qtlf_36", cb = "_rail_1qtlf_49", db = "_section_1qtlf_55", ub = "_label_1qtlf_66", hb = "_note_1qtlf_83", Q = {
  strip: tb,
  head: rb,
  name: lb,
  chart: ob,
  segment: ib,
  detailedChart: sb,
  rail: cb,
  section: db,
  label: ub,
  note: hb
}, mb = "No item in flight to preview.", wb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", _b = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Da = [1, 2, 3, 4, 5, 6], _a = 100;
function vb(e, a) {
  return a.has(e) ? Ee(e, "id") : "var(--ward-color-line)";
}
function fb({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: Q.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Da.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: Q.segment,
      x: l * _a,
      y: "0",
      width: _a,
      height: "8",
      fill: vb(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function bb(e) {
  const a = e.slice(0, Da.length);
  for (; a.length < Da.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function pb({ identities: e }) {
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
function rt(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ta({ label: e, children: a }) {
  const t = $();
  return /* @__PURE__ */ o("section", { className: Q.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: Q.label, children: e }),
    a
  ] });
}
function gb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: Q.note, children: a ?? mb }) : /* @__PURE__ */ n($a, { item: { ...e, streamStep: ga(t.streamStep) }, onOpen: rt(r), feed: null });
}
function Nb({ draft: e }) {
  const a = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: Q.head, style: a, children: [
    /* @__PURE__ */ n(xe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: Q.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
  ] });
}
function yb(e) {
  const a = bb(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: Q.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ta, { label: "Board card", children: /* @__PURE__ */ n(gb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ta, { label: "Streams index row", children: /* @__PURE__ */ n(Nb, { draft: t }) }),
    /* @__PURE__ */ o(ta, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(pb, { identities: a }),
      /* @__PURE__ */ n("p", { className: Q.note, children: wb })
    ] }),
    /* @__PURE__ */ n(ta, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: Q.note, children: _b }) })
  ] });
}
function kb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: Q.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: Q.head, children: [
      /* @__PURE__ */ n(xe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: Q.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n($a, { item: { ...a, streamStep: e.streamStep }, onOpen: rt(r) }),
    /* @__PURE__ */ n(fb, { draft: e, streams: t })
  ] });
}
function P$(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(yb, { ...e }) : /* @__PURE__ */ n(kb, { ...e });
}
const $b = "_row_ixlg5_6", Cb = "_headCell_ixlg5_10", Sb = "_cell_ixlg5_11", Rb = "_name_ixlg5_23", Tb = "_consequence_ixlg5_29", Eb = "_governed_ixlg5_36", xb = "_control_ixlg5_42", Lb = "_byRole_ixlg5_48", Ab = "_webControl_ixlg5_59", Ib = "_webConsequence_ixlg5_65", Mb = "_webGoverned_ixlg5_71", D = {
  row: $b,
  headCell: Cb,
  cell: Sb,
  name: Rb,
  consequence: Tb,
  governed: Eb,
  control: xb,
  byRole: Lb,
  webControl: Ab,
  webConsequence: Ib,
  webGoverned: Mb
};
function qb({
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
function Bb({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(qb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Pb(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Ob({ name: e, cell: a, onChange: t }) {
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
function Db({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Ob, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webGoverned} ward-cellmeta`, children: Pb(e) }) })
  ] });
}
function O$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Db, { ...e }) : /* @__PURE__ */ n(Bb, { ...e });
}
const Hb = "_row_vv64h_2", Fb = "_cell_vv64h_6", jb = "_name_vv64h_25", Wb = "_note_vv64h_30", zb = "_webName_vv64h_41", Gb = "_webMeta_vv64h_47", K = {
  row: Hb,
  cell: Fb,
  name: jb,
  note: Wb,
  webName: zb,
  webMeta: Gb
}, lt = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Ub(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Kb({ component: e, onRestart: a }) {
  const t = $(), r = lt[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: K.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: K.cell, "data-mono": "true", children: [
      Z(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { id: t, className: K.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: K.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(_, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Vb({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: Ub(e.state) });
}
function Yb({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...lt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(Vb, { component: e, onRestart: a }) })
  ] });
}
function D$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Yb, { ...e }) : /* @__PURE__ */ n(Kb, { ...e });
}
const Xb = "_row_1f1gp_7", Jb = "_cell_1f1gp_11", Qb = "_next_1f1gp_28", Zb = "_headCell_1f1gp_38", ep = "_webId_1f1gp_77", ap = "_webPurpose_1f1gp_83", np = "_webMeta_1f1gp_91", tp = "_webUrgent_1f1gp_97", F = {
  row: Xb,
  cell: Jb,
  next: Qb,
  headCell: Zb,
  webId: ep,
  webPurpose: ap,
  webMeta: np,
  webUrgent: tp
}, rp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, lp = {
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
], op = Object.fromEntries(ot.map((e) => [e.key, e]));
function je({ column: e, children: a }) {
  const t = op[e];
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
function H$() {
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
function ip({ cred: e }) {
  const a = rp[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ n(je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(je, { column: "id", children: e.id }),
    /* @__PURE__ */ n(je, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(je, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(je, { column: "next", children: /* @__PURE__ */ n("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function sp({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function cp({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(sp, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { ...lp[e.state] }) })
  ] });
}
function F$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(cp, { ...e }) : /* @__PURE__ */ n(ip, { ...e });
}
const dp = "_card_17zba_2", up = "_head_17zba_11", hp = "_env_17zba_18", mp = "_version_17zba_25", wp = "_meta_17zba_32", _p = "_webCard_17zba_37", vp = "_webRow_17zba_47", fp = "_webTitle_17zba_55", bp = "_webLine_17zba_65", pp = "_webVersion_17zba_72", gp = "_webMeta_17zba_77", U = {
  card: dp,
  head: up,
  env: hp,
  version: mp,
  meta: wp,
  webCard: _p,
  webRow: vp,
  webTitle: fp,
  webLine: bp,
  webVersion: pp,
  webMeta: gp
}, it = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Np({ env: e }) {
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
function yp(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ce(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function kp(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...it[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: yp(e) })
  ] });
}
function j$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(kp, { ...e }) : /* @__PURE__ */ n(Np, { ...e });
}
const $p = "_panel_1hmja_2", Cp = "_line_1hmja_8", Sp = "_actions_1hmja_14", ra = {
  panel: $p,
  line: Cp,
  actions: Sp
};
function W$(e) {
  return /* @__PURE__ */ o("div", { className: ra.panel, children: [
    /* @__PURE__ */ n("p", { className: ra.line, children: e.status }),
    /* @__PURE__ */ n(L, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ra.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ra.line, children: e.note ?? "" })
  ] });
}
const Rp = "_upload_erepj_2", Tp = "_preview_erepj_7", Ep = "_mark_erepj_17", xp = "_empty_erepj_22", Lp = "_actions_erepj_28", Ap = "_input_erepj_33", Ip = "_reasons_erepj_41", Mp = "_reason_erepj_41", qp = "_accepted_erepj_57", ae = {
  upload: Rp,
  preview: Tp,
  mark: Ep,
  empty: xp,
  actions: Lp,
  input: Ap,
  reasons: Ip,
  reason: Mp,
  accepted: qp
}, st = 1.5, ct = 22, va = "script elements or event handlers", Se = "links or external references", ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${st}px at ${ct}px`], Bp = [ye[1], ye[2], va, Se], Pp = /* @__PURE__ */ new Map([
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
]), Op = "http://www.w3.org/2000/svg", Dp = "http://www.w3.org/2000/xmlns/", Hp = /* @__PURE__ */ new Set([
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
]), Fp = /* @__PURE__ */ new Set([
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
]), jp = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, Wp = /url\s*\(|['"\\]/i;
function zp() {
  return { ok: !1, reasons: [ye[1]] };
}
function dt(e) {
  return e.namespaceURI === Op || e.namespaceURI === null;
}
function Gp(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && dt(a) ? a : null;
  } catch {
    return null;
  }
}
function Up(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [ye[0]] : [];
}
function Kp(e) {
  return Pp.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function Vp(e) {
  return Wp.test(e.replace(jp, ""));
}
function Yp(e) {
  return /^on/i.test(e.localName) ? va : e.localName === "href" || Vp(e.value) ? Se : void 0;
}
function Xp(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(Kp(t));
    for (const r of Array.from(t.attributes)) a.add(Yp(r));
  }
  return Bp.filter((t) => a.has(t));
}
function Jp(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? ct / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < st;
  }) ? [ye[3]] : [];
}
function Qp(e) {
  if (e.namespaceURI === Dp) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Fp.has(a) || a.startsWith("stroke"));
}
function Zp(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && dt(a) && Hp.has(a.localName);
}
function eg(e, a) {
  Zp(a) ? a.nodeType === Node.ELEMENT_NODE && ut(a) : e.removeChild(a);
}
function ut(e) {
  for (const a of Array.from(e.attributes)) Qp(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) eg(e, a);
  return e;
}
function z$(e) {
  const a = Gp(e);
  if (a === null) return zp();
  const t = [...Up(a), ...Xp(a), ...Jp(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(ut(a)) };
}
const ag = "Mark accepted.";
function ng({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: ae.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: ae.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: ae.empty }) });
}
function tg(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function rg(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function lg({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: ae.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: ae.result, role: "status", children: /* @__PURE__ */ n("p", { className: ae.accepted, children: ag }) }) : /* @__PURE__ */ n("div", { className: ae.result, role: "status", children: /* @__PURE__ */ n("ul", { className: ae.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: ae.reason, children: a }, a)) }) });
}
function og({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(lg, { result: e }) : /* @__PURE__ */ n("p", { className: `${ae.result} ${tg(e, t)}`, role: "status", children: rg(e, t) });
}
function G$({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = N(null), [i, s] = p(null), c = (d) => {
    if (d === void 0) return;
    const u = a(d);
    u instanceof Promise ? u.then(s) : s(u);
  };
  return /* @__PURE__ */ o("div", { className: ae.upload, children: [
    /* @__PURE__ */ n(ng, { current: e }),
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
    /* @__PURE__ */ n(og, { result: i, presentation: r })
  ] });
}
const ig = "_row_1wp9s_7", sg = "_cell_1wp9s_11", cg = "_head_1wp9s_28", dg = "_name_1wp9s_34", ug = "_pinned_1wp9s_42", hg = "_headCell_1wp9s_49", mg = "_webName_1wp9s_88", wg = "_webMeta_1wp9s_95", _g = "_webWarn_1wp9s_103", q = {
  row: ig,
  cell: sg,
  head: cg,
  name: dg,
  pinned: ug,
  headCell: hg,
  webName: mg,
  webMeta: wg,
  webWarn: _g
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
], vg = Object.fromEntries(ht.map((e) => [e.key, e]));
function fg(e, a) {
  return `mcp.${e}.${a}`;
}
function bg(e) {
  return Object.keys(Qa).includes(e);
}
function pg(e) {
  return Qa[e !== void 0 && bg(e) ? e : "unknown"];
}
function Ye({ column: e, children: a }) {
  const t = vg[e];
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
function U$() {
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
function gg({ server: e }) {
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
    /* @__PURE__ */ n(Ye, { column: "tools", children: e.tools.map((t) => fg(e.name, t)).join(" · ") })
  ] });
}
function Ng(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function yg(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function kg({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function $g({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Cg({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Sg({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Ng(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...yg(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(kg, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...pg(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n($g, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Cg, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function K$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Sg, { ...e }) : /* @__PURE__ */ n(gg, { ...e });
}
const Rg = "_row_1h9nq_2", Tg = "_headCell_1h9nq_14", Eg = "_cell_1h9nq_15", xg = "_name_1h9nq_26", Lg = "_consequence_1h9nq_32", Ag = "_reason_1h9nq_38", Ig = "_value_1h9nq_44", Mg = "_webRow_1h9nq_60", qg = "_webSetting_1h9nq_71", Bg = "_webName_1h9nq_79", Pg = "_webConsequence_1h9nq_87", Og = "_webControl_1h9nq_93", Dg = "_webState_1h9nq_106", Hg = "_webChip_1h9nq_111", x = {
  row: Rg,
  headCell: Tg,
  cell: Eg,
  name: xg,
  consequence: Lg,
  reason: Ag,
  value: Ig,
  webRow: Mg,
  webSetting: qg,
  webName: Bg,
  webConsequence: Pg,
  webControl: Og,
  webState: Dg,
  webChip: Hg
}, mt = 104, wt = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Fg({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Oe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(An, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: x.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function jg({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = wt[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: x.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: x.headCell, children: [
      /* @__PURE__ */ n("span", { className: x.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: x.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: x.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: x.cell, children: /* @__PURE__ */ n(Fg, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: x.cell, style: { width: mt }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function _t(e, a) {
  return String(e ?? a);
}
function Wg(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function zg(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? _t(e.value, "—");
}
function Gg({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: x.webControl, children: [
    /* @__PURE__ */ n(Oe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: x.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function Ug(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(Gg, { ...e });
  const l = Wg(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: x.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(An, { options: l, value: _t(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${x.webControl} ${x.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: zg(a) });
}
function Kg({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = $(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${x.row} ${x.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: x.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${x.name} ${x.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${x.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: x.webControl, children: i(s) }) : /* @__PURE__ */ n(Ug, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${x.webChip} ward-policy-chip`, style: { width: mt }, children: /* @__PURE__ */ n(m, { ...wt[t], size: "tag" }) })
  ] });
}
function V$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Kg, { ...e }) : /* @__PURE__ */ n(jg, { ...e });
}
const Vg = "_label_1o9za_7", Yg = "_name_1o9za_15", Xg = "_column_1o9za_24", Jg = "_webFrame_1o9za_57", Qg = "_webHead_1o9za_62", Zg = "_webHeadLabel_1o9za_74", eN = "_webLabel_1o9za_112", aN = "_webColumns_1o9za_119", nN = "_webGroup_1o9za_125", tN = "_webPeople_1o9za_126", rN = "_webVia_1o9za_127", lN = "_webMeta_1o9za_156", j = {
  label: Vg,
  name: Yg,
  column: Xg,
  webFrame: Jg,
  webHead: Qg,
  webHeadLabel: Zg,
  webLabel: eN,
  webColumns: aN,
  webGroup: nN,
  webPeople: tN,
  webVia: rN,
  webMeta: lN
}, oN = {
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
      className: j.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function iN(e) {
  if (!e.matrixRole) return;
  const a = oN[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function sN({ node: e }) {
  const a = iN(e);
  return /* @__PURE__ */ o("span", { className: j.label, children: [
    /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
    /* @__PURE__ */ n(cN, { role: a, node: e }),
    /* @__PURE__ */ n(La, { column: xa[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(La, { column: xa[1], children: e.people === void 0 ? "" : Z(e.people) }),
    /* @__PURE__ */ n(La, { column: xa[2], children: e.requestedVia ?? "" })
  ] });
}
function cN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function dN({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ n(sN, { node: t }),
      children: s
    }
  );
}
function Aa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function uN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${j.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Aa, { className: `${j.webMeta} ${j.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Aa, { className: `${j.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Aa, { className: `${j.webMeta} ${j.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function hN() {
  return /* @__PURE__ */ o("div", { className: j.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: j.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: j.webColumns, children: [
      /* @__PURE__ */ n("span", { className: j.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: j.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: j.webVia, children: "Requested via" })
    ] })
  ] });
}
function mN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${j.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function wN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function _N({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: j.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(hN, {}),
    /* @__PURE__ */ n(uc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Bn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(mN, { row: t }),
        detail: /* @__PURE__ */ n(uN, { row: t }),
        expanded: wN(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function Y$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(_N, { ...e }) : /* @__PURE__ */ n(dN, { ...e });
}
const vN = "_runbook_b9agc_2", fN = "_list_b9agc_7", bN = "_step_b9agc_15", pN = "_numeral_b9agc_21", gN = "_body_b9agc_28", NN = "_head_b9agc_34", yN = "_title_b9agc_40", kN = "_detail_b9agc_45", $N = "_actions_b9agc_50", CN = "_webList_b9agc_56", SN = "_webStep_b9agc_60", RN = "_webBody_b9agc_66", TN = "_webTitle_b9agc_74", EN = "_webDetail_b9agc_78", T = {
  runbook: vN,
  list: fN,
  step: bN,
  numeral: pN,
  body: gN,
  head: NN,
  title: yN,
  detail: kN,
  actions: $N,
  webList: CN,
  webStep: SN,
  webBody: RN,
  webTitle: TN,
  webDetail: EN
}, vt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function ft(e) {
  return String(e + 1).padStart(2, "0");
}
function xN({ step: e, index: a, connection: t }) {
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
function LN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: T.list, children: e.map((r, l) => /* @__PURE__ */ n(xN, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: T.actions, children: a })
  ] });
}
function AN({ step: e, index: a, connection: t }) {
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
function IN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${T.list} ${T.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(AN, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${T.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function X$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(IN, { ...e }) : /* @__PURE__ */ n(LN, { ...e });
}
const MN = "_list_1gu6a_2", qN = "_check_1gu6a_10", BN = "_body_1gu6a_16", PN = "_text_1gu6a_23", ON = "_pending_1gu6a_32", DN = "_measured_1gu6a_37", ze = {
  list: MN,
  check: qN,
  body: BN,
  text: PN,
  pending: ON,
  measured: DN
};
function HN(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function FN({ check: e }) {
  const a = HN(e.passed);
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
function J$({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(FN, { check: a }, a.text)) });
}
const jN = "_root_khinh_2", WN = "_list_khinh_10", zN = "_line_khinh_21", GN = "_at_khinh_48", UN = "_text_khinh_52", KN = "_foot_khinh_56", VN = "_idle_khinh_68", YN = "_caret_khinh_76", XN = "_jump_khinh_83", me = {
  root: jN,
  list: WN,
  line: zN,
  at: GN,
  text: UN,
  foot: KN,
  idle: VN,
  caret: YN,
  jump: XN
}, JN = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Za(e) {
  return Number.isNaN(Date.parse(e)) ? "" : JN.format(new Date(e));
}
const QN = { warn: "warning", ok: "ok" };
function ZN({ kind: e }) {
  const a = QN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function ey({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Za(e)}` });
}
function ay({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Za(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: me.idle, children: i }),
    /* @__PURE__ */ n(ey, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const ny = 8;
function ty(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > ny;
}
function ry({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
function Q$({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = N(null), [i, s] = p(0), [c, d] = p(!1), [u, h] = p(!1), v = e.at(-1);
  A(() => {
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
    /* @__PURE__ */ n("ol", { className: me.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (g) => h(ty(g.currentTarget)), children: e.map((g, I) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${g.kind}`, "data-kind": g.kind, "data-revealed": I < i, children: [
      /* @__PURE__ */ n("span", { className: me.at, children: Za(g.at) }),
      /* @__PURE__ */ n(ZN, { kind: g.kind }),
      /* @__PURE__ */ n("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: g.text })
    ] }, `${g.at}-${I}`)) }),
    /* @__PURE__ */ o(ay, { connection: a, idleSince: t, last: v, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ n(ry, { shown: u, onJump: b })
    ] })
  ] });
}
const ly = "_row_11jhe_2", oy = "_head_11jhe_14", iy = "_author_11jhe_20", sy = "_eta_11jhe_25", cy = "_edited_11jhe_26", dy = "_body_11jhe_32", uy = "_reason_11jhe_37", hy = "_actions_11jhe_42", be = {
  row: ly,
  head: oy,
  author: iy,
  eta: sy,
  edited: cy,
  body: dy,
  reason: uy,
  actions: hy
}, my = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function wy(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function _y({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function vy({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: be.reason, id: a, children: e })
  ] });
}
function fy(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function by(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(_y, { ...e }) : /* @__PURE__ */ n(vy, { reason: e.unavailable, reasonId: e.unavailableId });
}
function Z$(e) {
  const { comment: a } = e;
  fy(e);
  const t = $(), r = `${t}-unavailable`, l = my[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${be.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: be.head, children: [
      /* @__PURE__ */ n("span", { className: be.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: be.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: be.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: be.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: be.reason, id: t, children: wy(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: be.actions, children: /* @__PURE__ */ n(by, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const py = "_root_c46wj_2", gy = "_attach_c46wj_11", Ny = "_actions_c46wj_17", yy = "_reply_c46wj_23", ky = "_replyRow_c46wj_28", $y = "_sendsAs_c46wj_42", Ue = {
  root: py,
  attach: gy,
  actions: Ny,
  reply: yy,
  replyRow: ky,
  sendsAs: $y
};
function Cy({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = p(""), i = $();
  return /* @__PURE__ */ o("div", { className: Ue.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ue.replyRow, children: [
      /* @__PURE__ */ n(L, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(_, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ue.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function eC(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Cy, { ...e }) : /* @__PURE__ */ n(Sy, { ...e });
}
function Sy({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [s, c] = p("");
  return /* @__PURE__ */ o("div", { className: Ue.root, children: [
    /* @__PURE__ */ n(L, { kind: "textarea", label: e, value: s, onChange: c }),
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
const Ry = "_list_1ih9e_2", Ty = "_item_1ih9e_6", Ey = "_body_1ih9e_22", xy = "_text_1ih9e_28", Ly = "_evidence_1ih9e_37", Ay = "_consequence_1ih9e_49", Iy = "_note_1ih9e_54", Pe = {
  list: Ry,
  item: Ty,
  body: Ey,
  text: xy,
  evidence: Ly,
  consequence: Ay,
  note: Iy
};
function My({ criterion: e }) {
  return /* @__PURE__ */ n(xe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function yn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function qy(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function By({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Pe.body, children: [
    /* @__PURE__ */ n("span", { className: Pe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(yn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Pe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(yn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Pe.consequence, children: qy(e.why) })
    ] })
  ] });
}
function Py({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Pe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(My, { criterion: e }),
    /* @__PURE__ */ n(By, { criterion: e })
  ] });
}
function aC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Py, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Pe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Oy = "_list_dwhoz_2", Dy = "_rung_dwhoz_6", Hy = "_name_dwhoz_18", Fy = "_actor_dwhoz_32", ia = {
  list: Oy,
  rung: Dy,
  name: Hy,
  actor: Fy
}, jy = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function Wy({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = jy[e.state];
  return /* @__PURE__ */ o("li", { className: ia.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ia.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ia.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function nC({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ia.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(Wy, { rung: a }, a.name)) });
}
const zy = "_sheet_1fqco_2", Gy = "_title_1fqco_9", Uy = "_stage_1fqco_15", Ky = "_effects_1fqco_20", Vy = "_effect_1fqco_20", Yy = "_numeral_1fqco_31", Xy = "_effectText_1fqco_38", Jy = "_refusals_1fqco_43", Qy = "_reasons_1fqco_52", Zy = "_reason_1fqco_52", ek = "_actions_1fqco_62", ue = {
  sheet: zy,
  title: Gy,
  stage: Uy,
  effects: Ky,
  effect: Vy,
  numeral: Yy,
  effectText: Xy,
  refusals: Jy,
  reasons: Qy,
  reason: Zy,
  actions: ek
};
function ak({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function tC({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      as,
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
    v && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((b, g) => /* @__PURE__ */ n("li", { className: ue.reason, id: g === 0 ? d : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(ak, { refused: v, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const nk = "_list_1hvqu_2", tk = "_path_1hvqu_7", rk = "_head_1hvqu_21", lk = "_label_1hvqu_28", ok = "_consequence_1hvqu_35", ik = "_ask_1hvqu_36", Ge = {
  list: nk,
  path: tk,
  head: rk,
  label: lk,
  consequence: ok,
  ask: ik
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
function sk({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(_, { variant: $n(a), size: "sm", onClick: () => t(e.kind), children: Ha[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: $n(a), size: "sm", disabled: !0, describedBy: r, children: Ha[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ge.ask, id: r, children: e.askInstead })
  ] });
}
function ck({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ge.path, "data-allowed": e.allowed, "data-role": kn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ge.head, children: [
      /* @__PURE__ */ n("span", { className: Ge.label, children: e.title ?? Ha[e.kind] }),
      /* @__PURE__ */ n(m, { role: kn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ge.consequence, children: e.consequence }),
    /* @__PURE__ */ n(sk, { path: e, primary: a, onChoose: t })
  ] });
}
function rC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ge.list, children: e.map((t, r) => /* @__PURE__ */ n(ck, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const dk = "_list_1nyt1_2", uk = "_item_1nyt1_6", hk = "_node_1nyt1_18", mk = "_body_1nyt1_24", wk = "_head_1nyt1_30", _k = "_stage_1nyt1_36", vk = "_version_1nyt1_41", fk = "_sentence_1nyt1_49", bk = "_meta_1nyt1_54", ge = {
  list: dk,
  item: uk,
  node: hk,
  body: mk,
  head: wk,
  stage: _k,
  version: vk,
  sentence: fk,
  meta: bk
}, pk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function gk({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function Nk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(xe, { size: 9, kind: pk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(gk, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${ce(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function lC({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Nk, { entry: a }, a.stage + String(t))) });
}
const yk = "_thread_1kn6s_3", kk = "_turn_1kn6s_8", $k = "_who_1kn6s_27", Ck = "_body_1kn6s_32", sa = {
  thread: yk,
  turn: kk,
  who: $k,
  body: Ck
}, bt = Ve(!1);
function oC({ children: e, density: a }) {
  return /* @__PURE__ */ n(bt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${sa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function iC({ turn: e }) {
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
const Sk = "_list_1rt9c_3", Rk = "_row_1rt9c_7", Tk = "_label_1rt9c_20", Ek = "_n_1rt9c_26", xk = "_cause_1rt9c_33", Qe = {
  list: Sk,
  row: Rk,
  label: Tk,
  n: Ek,
  cause: xk
};
function Lk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Ak = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Ik({ row: e, formatNumber: a }) {
  return Lk(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(xe, { size: 8, ...Ak[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Mk, { cause: e.cause })
  ] });
}
function Mk({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function sC({ rows: e, formatNumber: a = Z }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(Ik, { row: t, formatNumber: a }, t.label)) });
}
const qk = "_root_1jxwp_2", Bk = {
  root: qk
};
function cC({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: Bk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ca, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const Pk = "_row_dhbre_3", Ok = "_key_dhbre_13", Dk = "_stack_dhbre_24", Hk = "_value_dhbre_32", Fk = "_evidence_dhbre_39", jk = "_mark_dhbre_47", We = {
  row: Pk,
  key: Ok,
  stack: Dk,
  value: Hk,
  evidence: Fk,
  mark: jk
};
function Wk({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ka, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function dC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${We.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${We.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${We.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${We.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${We.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${We.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(Wk, { state: e.state }) })
  ] });
}
const zk = "_cell_1monp_2", Gk = {
  cell: zk
}, Uk = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Kk(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function Vk(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function Yk(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Kk(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function Xk(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function uC({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  Vk(e, t);
  const r = Xk(e);
  return /* @__PURE__ */ n(
    _s,
    {
      label: "Rejection routing",
      columns: Uk,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: Gk.cell, "data-norerun": l.noRerun ? !0 : void 0, children: Yk(l, i) }),
      empty: a ?? /* @__PURE__ */ n(Kc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Jk = "_row_ute8v_2", Qk = "_title_ute8v_11", Zk = "_turns_ute8v_20", e1 = "_waiting_ute8v_21", a1 = "_resolved_ute8v_22", n1 = "_activity_ute8v_23", t1 = "_cost_ute8v_29", r1 = "_link_ute8v_30", l1 = "_tableRow_ute8v_47", o1 = "_tableTitle_ute8v_59", i1 = "_tableResolved_ute8v_64", s1 = "_tableLink_ute8v_68", c1 = "_tableMeta_ute8v_83", d1 = "_tableCost_ute8v_90", u1 = "_tableActivity_ute8v_91", h1 = "_tableState_ute8v_101", m1 = "_tableRecord_ute8v_112", O = {
  row: Jk,
  title: Qk,
  turns: Zk,
  waiting: e1,
  resolved: a1,
  activity: n1,
  cost: t1,
  link: r1,
  tableRow: l1,
  tableTitle: o1,
  tableResolved: i1,
  tableLink: s1,
  tableMeta: c1,
  tableCost: d1,
  tableActivity: u1,
  tableState: h1,
  tableRecord: m1
}, pt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function w1(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function _1(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function v1(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const f1 = { duplicate: "CLOSED · DUPLICATE" };
function b1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: O.tableMeta, children: `waiting on ${e}` });
}
function p1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: O.tableCost, children: e === void 0 ? null : ne(e) });
}
function g1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${O.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function N1({ session: e, href: a }) {
  const t = pt[e.state];
  return /* @__PURE__ */ o("tr", { className: O.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: O.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${O.tableLink} ward-target`, href: W(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: O.tableMeta, children: _1(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: O.tableResolved, children: [
      v1(e.resolved),
      /* @__PURE__ */ n(b1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(p1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: O.tableActivity, children: w1(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: O.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: f1[e.state] ?? t.label }),
      /* @__PURE__ */ n(g1, { link: e.link })
    ] }) })
  ] });
}
function y1({ session: e }) {
  const a = pt[e.state];
  return /* @__PURE__ */ o("div", { className: O.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: O.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: O.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: O.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: O.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: O.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ne(e.cost) }),
    /* @__PURE__ */ n("span", { className: O.activity, children: ce(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: O.link, href: W(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function hC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(N1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(y1, { session: e.session });
}
const k1 = "_block_1yy2v_3", $1 = "_list_1yy2v_9", C1 = "_line_1yy2v_14", Fa = {
  block: k1,
  list: $1,
  line: C1
}, S1 = { warn: "warning", ok: "ok" };
function R1({ kind: e }) {
  const a = S1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function T1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Fa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(R1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function mC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Fa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Fa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(T1, { line: t }, `${r}-${t.text}`)) }) });
}
const E1 = "_band_tt7hp_1", x1 = "_head_tt7hp_8", L1 = "_cell_tt7hp_19", A1 = "_index_tt7hp_35", I1 = "_title_tt7hp_42", M1 = "_note_tt7hp_48", q1 = "_cellTitle_tt7hp_53", B1 = "_cellBody_tt7hp_58", P1 = "_tag_tt7hp_64", fe = {
  band: E1,
  head: x1,
  cell: L1,
  index: A1,
  title: I1,
  note: M1,
  cellTitle: q1,
  cellBody: B1,
  tag: P1
}, Cn = 4;
function wC({ index: e, title: a, note: t, cells: r }) {
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
  Q$ as ActivityConsole,
  im as AgentCard,
  X1 as AppShell,
  P$ as AppearanceStrip,
  wC as Band,
  a$ as BarChart,
  Td as BoardColumn,
  f$ as BoardFootnote,
  b$ as BoardHeader,
  c$ as BoardScroller,
  _ as Btn,
  U1 as CHIP_ROLES,
  ot as CREDENTIAL_COLUMNS,
  e$ as Callout,
  O$ as CapabilityRow,
  iC as ChatMessage,
  En as Checkbox,
  m as Chip,
  Z$ as ClarificationRow,
  T$ as ClauseRuleRow,
  R$ as ClauseRules,
  jn as ColourLadder,
  D$ as ComponentRow,
  eC as Composer,
  g$ as ConfigRow,
  p$ as ConfigRowHead,
  Va as ConnectionMark,
  oC as Conversation,
  as as CostMeter,
  F$ as CredentialRow,
  H$ as CredentialRowHead,
  aC as CriteriaList,
  hl as Crumb,
  sC as DeliveryHealth,
  h$ as DeniedState,
  E$ as DryRunRail,
  Kc as EmptyState,
  j$ as EnvCard,
  L as Field,
  u$ as FilteredEmpty,
  i$ as FormStack,
  Ca as GateChecklist,
  nC as GateLadder,
  _s as Grid,
  L$ as HandoffRuleRow,
  x$ as HandoffRules,
  N$ as ItemDrawer,
  W$ as KeyPanel,
  Bt as LIVE_EVENT_TYPES,
  Eh as LegacyBoardColumn,
  k$ as LegacyBoardHeader,
  $$ as LegacyConfigRow,
  S$ as LegacyItemDrawer,
  yh as LegacyOverCapNote,
  C$ as LegacyPreviewRail,
  Dn as LegacyWorkCard,
  ke as LiveIndicator,
  m$ as LoadFailed,
  v$ as Loading,
  ht as MCP_SERVER_COLUMNS,
  Ka as Mark,
  G$ as MarkUpload,
  xe as Marker,
  K$ as McpServerRow,
  U$ as McpServerRowHead,
  A$ as NewStreamModal,
  Xc as OverCapNote,
  ea as Overlay,
  Pm as PARTIAL_STEP_REASON,
  mt as POLICY_CHIP_WIDTH,
  r$ as PageFrame,
  Z1 as PageHeader,
  n$ as PlainList,
  V$ as PolicyRow,
  y$ as PreviewRail,
  xa as ROLE_MATRIX_COLUMNS,
  et as RULE_ACTIONS,
  Mn as Radio,
  cC as ReadyChecklist,
  o$ as RecordSection,
  tC as RequeueSheet,
  rC as ResolveBlock,
  dC as ResolvedFieldRow,
  Y$ as RoleMatrixRow,
  uC as RoutingTable,
  I$ as RuleRow,
  X$ as RunbookSteps,
  Mt as STREAM_STEPS,
  s$ as SectionBand,
  un as SectionHeader,
  An as SegmentedControl,
  hC as SessionRow,
  Q1 as Sidebar,
  M$ as StageColumn,
  d$ as StageGrid,
  lC as StageHistory,
  H_ as StageListEditor,
  w$ as StaleStrip,
  ya as StatStrip,
  q$ as StreamRow,
  l$ as SubjectRail,
  Oe as Switch,
  J1 as Tabs,
  B$ as ToolRow,
  t$ as TopBar,
  uc as Tree,
  Bn as TreeRow,
  mC as TypedInputBlock,
  Ar as UNSAFE_HREF,
  J$ as ValidationList,
  F1 as VisibilityProvider,
  j1 as Visible,
  G1 as WARD_VERSION,
  $a as WorkCard,
  _$ as WriteUnavailableStrip,
  w1 as agoSince,
  St as clock,
  tv as colourStatus,
  Z as count,
  se as duration,
  Wa as elapsed,
  z1 as eventSourceTransport,
  ba as isStreamStep,
  pa as isValidatedStreamStep,
  Om as ladderValidation,
  pg as mcpConnectionChip,
  fg as mcpToolName,
  ne as money,
  we as ms,
  Pn as ordered,
  Sn as ratio,
  Ub as restartLabel,
  W as safeHref,
  ce as stamp,
  Tn as stream,
  V1 as streamChip,
  Na as streamChipProps,
  Ee as streamColour,
  Ot as streamHex,
  K1 as streamVars,
  la as useBorderFlash,
  Lt as useFocusTrap,
  Y1 as useLiveFeed,
  W1 as useReturnFocus,
  fa as useRovingTabindex,
  za as useTicker,
  Rt as useVisible,
  G as v,
  z$ as validateMark,
  ga as validatedStep,
  qt as validatedStreamSteps
};
