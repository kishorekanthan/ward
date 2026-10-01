import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as Rn, useContext as Oe, createContext as De, useCallback as X, useEffect as x, useState as p, useRef as y, useLayoutEffect as Ha, useId as $, Children as Ct, Fragment as St } from "react";
import { createPortal as Rt } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const an = (e) => String(e).padStart(2, "0");
function Fa(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${an(a % 60)}s` : `${Math.floor(t / 60)}h ${an(t % 60)}m`;
}
const Tt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ce(e) {
  const a = Tt.formatToParts(new Date(e)), t = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function re(e) {
  return e > 0 && e < 5e-3 ? "<$0.01" : e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function ae(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function Tn(e, a) {
  return `${e} / ${a}`;
}
const Et = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Lt(e) {
  return Et.format(new Date(e));
}
const En = De(/* @__PURE__ */ new Set());
function e$({ hidden: e, children: a }) {
  const t = Rn(() => new Set(e), [e]);
  return /* @__PURE__ */ n(En.Provider, { value: t, children: a });
}
function At(e) {
  return !Oe(En).has(e);
}
function a$({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(S, { children: At(e) ? a : t });
}
const xt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function It(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function Mt(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = It(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function qt(e) {
  return { onKeyDown: X(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(xt));
      Mt(t, e.current, r);
    },
    [e]
  ) };
}
function n$(e, a = !0) {
  x(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const nn = { ArrowUp: -1, ArrowDown: 1 }, tn = { ArrowLeft: -1, ArrowRight: 1 }, jt = (e, a, t) => Math.min(t, Math.max(a, e));
function Bt(e, a) {
  if (a !== "horizontal" && e in nn) return nn[e];
  if (a !== "vertical" && e in tn) return tn[e];
}
function va({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = y(/* @__PURE__ */ new Map()), l = y(!1);
  Ha(() => {
    var b;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const h = u[0], f = l.current;
    l.current = !1, t(h), f && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = X((u) => t(u), []), s = X((u) => {
    var h;
    t(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = X(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const f = Math.max(0, h.indexOf(a)), b = Bt(u.key, e);
      b !== void 0 ? (u.preventDefault(), s(h[jt(f + b, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [a, s, e]
  ), d = X(
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
const t$ = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, r$ = "0.2.0", l$ = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Pt = [1, 2, 3, 4, 5, 6], Ot = [1, 2, 3], Dt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
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
function Ln(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function ba(e) {
  return Pt.includes(e);
}
function pa(e) {
  return Ot.includes(e);
}
function o$(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function i$(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Ht = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Ft(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return Ht[e];
}
function rn(e) {
  return typeof e != "string" ? null : Dt.includes(e) ? e : null;
}
function Wt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function zt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Gt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Ut(e, a, t) {
  const r = Wt(e);
  if (r === null) return null;
  const l = rn(t) ?? rn(r.type);
  return l === null ? null : { ...r, type: l, id: zt(r, a), at: Gt(r) };
}
function Kt(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Vt(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function s$(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), s = y(/* @__PURE__ */ new Map()), c = y(0), d = y(""), u = y(0), h = y(null), f = y(0), b = y(0), g = y(!1), I = y("reconnecting"), D = X((C) => {
    I.current = C, r(C);
  }, []), oe = X(() => {
    c.current = Date.now();
  }, []), $e = X((C) => {
    for (const [z, fe] of s.current)
      (fe === "*" || C.itemKey === fe) && z(C);
  }, []), ne = X(() => {
    h.current = a(e, { lastEventId: d.current }, {
      onEvent: (C, z, fe) => {
        const Ae = Ut(C, z, fe);
        Ae !== null && (Ae.id && (d.current = Ae.id), oe(), g.current = !1, D("live"), i(Ae.at), $e(Ae));
      },
      onOpen: () => {
        u.current = 0, g.current = !1, oe(), D("live");
      },
      onError: () => {
        var z;
        (z = h.current) == null || z.close(), h.current = null, g.current = !0, I.current !== "stale" && D("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, f.current = window.setTimeout(ne, C);
      }
    });
  }, [$e, D, oe, a, e]), He = X((C) => {
    g.current = !0, C.close(), h.current = null, f.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), Fe = X((C, z) => (s.current.set(z, C), () => {
    s.current.delete(z);
  }), []);
  return x(() => (ne(), b.current = window.setInterval(() => {
    const C = Date.now() - c.current, z = Kt(C, I.current);
    z && D(z);
    const fe = h.current;
    Vt(C, g.current, fe) && He(fe);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(f.current), g.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [ne, He, D]), { connection: t, lastEventAt: l, subscribe: Fe };
}
function Wa(e, a) {
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
function Yt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ln(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function la(e, a) {
  const t = y(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Yt() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), s.style.setProperty("--flash", `var(--ward-color-${i})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => ln(s), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => ln(s), we.flash)));
  }, [a, e]);
  return x(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Xt = "_root_1otpc_2", Jt = {
  root: Xt
};
function Qt(e, a, t, r, l) {
  const i = [Fa(a)];
  return e || i.push(`as of ${Lt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function ke({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Wa(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Qt(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Jt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ce(e)
    ] })
  ] });
}
const Zt = "_app_1g5ye_1", er = "_side_1g5ye_18", ar = "_main_1g5ye_26", nr = "_rail_1g5ye_33", tr = "_page_1g5ye_40", rr = "_root_1g5ye_91", lr = "_topbar_1g5ye_98", or = "_mark_1g5ye_109", ir = "_brand_1g5ye_116", sr = "_tagline_1g5ye_122", cr = "_identity_1g5ye_128", dr = "_tools_1g5ye_129", ur = "_metadata_1g5ye_138", hr = "_actor_1g5ye_153", mr = "_detail_1g5ye_154", wr = "_nav_1g5ye_159", _r = "_content_1g5ye_194", fr = "_toolsPanel_1g5ye_210", vr = "_skip_1g5ye_236", M = {
  app: Zt,
  side: er,
  main: ar,
  rail: nr,
  page: tr,
  root: rr,
  topbar: lr,
  mark: or,
  brand: ir,
  tagline: sr,
  identity: cr,
  tools: dr,
  metadata: ur,
  actor: hr,
  detail: mr,
  nav: wr,
  content: _r,
  toolsPanel: fr,
  skip: vr
}, br = "_btn_j72f1_2", pr = "_primary_j72f1_13", gr = "_destructive_j72f1_24", yr = "_secondary_j72f1_34", Nr = "_ghost_j72f1_39", kr = "_overflow_j72f1_48", $r = "_sm_j72f1_55", Cr = "_disabled_j72f1_59", aa = {
  btn: br,
  primary: pr,
  destructive: gr,
  secondary: yr,
  ghost: Nr,
  overflow: kr,
  sm: $r,
  disabled: Cr
};
function Sr(e, a, t, r) {
  const l = a === "sm" ? [aa.sm, "ward-btn--sm"] : [], i = t ? [aa.disabled] : [];
  return [aa.btn, aa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Rr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Tr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Er(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Lr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Ar(e, a, t) {
  return Lr(e.describedBy, a && t);
}
function xr({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Ir(e) {
  return e.children ?? e.label;
}
function _(e) {
  Tr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = Er(e), i = $();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Sr(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": Ar(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Rr(a, e.controls),
        children: Ir(e)
      }
    ),
    /* @__PURE__ */ n(xr, { id: i, reason: l })
  ] });
}
const Mr = /^([a-z][a-z0-9+.-]*):/i, qr = /* @__PURE__ */ new Set(["http", "https"]), jr = "#";
function Br(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Mr.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = Br(e);
  return a === void 0 || qr.has(a) ? e : jr;
}
function za(e) {
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
function Pr({ sidebar: e, header: a, children: t, rail: r }) {
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
function Or({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: M.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: W(t.href), "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function Ia({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Dr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(Ia, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Ia, { value: a, className: M.detail })
  ] });
}
function Hr() {
  const e = za("(max-width: 767.98px)"), a = $(), t = y(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Fr({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: M.tools, children: /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: M.tools, children: e });
}
function Wr({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function zr(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ n("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Ia, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ n(Or, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(Dr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Fr, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Gr(e) {
  const a = $(), t = Hr();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(zr, { ...e, menu: t }),
    /* @__PURE__ */ n(Wr, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function Ur(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function c$(e) {
  return Ur(e) ? /* @__PURE__ */ n(Pr, { ...e }) : /* @__PURE__ */ n(Gr, { ...e });
}
function Ga(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Kr = "_root_o4yib_2", Vr = "_row_o4yib_8", Yr = "_box_o4yib_14", Xr = "_label_o4yib_21", Jr = "_lockedNote_o4yib_26", Qr = "_consequence_o4yib_34", Zr = "_sample_o4yib_69", Me = {
  root: Kr,
  row: Vr,
  box: Yr,
  label: Xr,
  lockedNote: Jr,
  consequence: Qr,
  sample: Zr
};
function el(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function al({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Me.consequence} ward-check-consequence`, children: a }) : null;
}
function nl({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Me.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function tl({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Me.sample, "aria-hidden": "true", children: e }) : null;
}
function An(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = el(e);
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
          "aria-describedby": Ga(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: Me.label, children: [
        e.label,
        /* @__PURE__ */ n(nl, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(tl, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(al, { id: t, text: e.consequence })
  ] });
}
const rl = "_chip_1073r_2", ll = {
  chip: rl
}, ol = {
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
function il(e, a) {
  if (e === "stream") return sl(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = ol[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function sl(e) {
  if (!e || !pa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Ln(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${ll.chip} ward-chip ward-chip--${e}`, style: il(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function ga(e) {
  return typeof e == "number" && pa(e) ? e : null;
}
function Ee(e, a) {
  const t = ga(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function ya(e, a) {
  const t = ga(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const cl = "_nav_j90m2_2", dl = "_list_j90m2_8", ul = "_item_j90m2_15", hl = "_link_j90m2_30", ml = "_sep_j90m2_40", wl = "_current_j90m2_44", _l = "_chips_j90m2_48", xe = {
  nav: cl,
  list: dl,
  item: ul,
  link: hl,
  sep: ml,
  current: wl,
  chips: _l
};
function fl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: xe.nav, children: [
    /* @__PURE__ */ n("ol", { className: xe.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: xe.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: xe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${xe.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: xe.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${xe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const vl = "_field_fy549_2", bl = "_label_fy549_8", pl = "_labelHidden_fy549_15", gl = "_control_fy549_25", yl = "_mono_fy549_44", Nl = "_area_fy549_49", kl = "_invalid_fy549_56", Te = {
  field: vl,
  label: bl,
  labelHidden: pl,
  control: gl,
  mono: yl,
  area: Nl,
  invalid: kl
}, $l = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function Cl({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? $l : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function Sl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Rl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Tl = { input: Cl, select: Sl, textarea: Rl };
function El(e, a, t) {
  const r = Tl[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Ll(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ga(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function Al(e) {
  const a = e.mono ? [Te.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Te.area] : [];
  return [Te.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function xl(e) {
  return e ? `${Te.label} ${Te.labelHidden} ward-field-label` : `${Te.label} ward-field-label`;
}
function A(e) {
  const a = $(), t = `${a}-msg`, r = Ll(e, a, t), l = Al(e);
  return /* @__PURE__ */ o("div", { className: `${Te.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: xl(e.labelHidden), htmlFor: a, children: e.label }),
    El(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Te.invalid} ward-field-error`, children: e.invalid })
  ] });
}
function Il(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function xn(e) {
  const a = Il(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function Ua(e, a, t) {
  x(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const s = xn(r);
      t == null || t(s.start || s.end);
    };
    r.addEventListener("scroll", l, { passive: !0 });
    const i = typeof ResizeObserver > "u" ? null : new ResizeObserver(l);
    for (const s of [r, ...r.children]) i == null || i.observe(s);
    return l(), () => {
      r.removeEventListener("scroll", l), i == null || i.disconnect();
    };
  }, [e, a, t]);
}
const Ml = "_strip_tivso_2", ql = "_tab_tivso_26", jl = "_count_tivso_49", Ma = {
  strip: Ml,
  tab: ql,
  count: jl
}, on = 7;
function Bl(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Pl(e) {
  return `${Ma.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function Ol(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Dl(e, a) {
  Ha(() => {
    const t = e.current, r = t == null ? void 0 : t.querySelectorAll('[role="tab"]')[a];
    if (!t || !r) return;
    const l = Ol(t, r);
    l !== null && (t.scrollLeft = Math.max(0, l)), xn(t);
  }, [e, a]);
}
function d$({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > on) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${on} — the set is fixed`);
  const i = va({ orientation: "horizontal" }), s = Bl(e, a);
  x(() => i.setActive(s), [i.setActive, s]);
  const c = y(null);
  return Ua(c, e.length), Dl(c, s), /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      className: Pl(l),
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
const Hl = "_root_jem6y_2", Fl = "_segment_jem6y_7", sn = {
  root: Hl,
  segment: Fl
};
function In({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = va({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return x(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${sn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: sn.segment,
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
const Wl = "_sidebar_1jywv_3", zl = "_brand_1jywv_9", Gl = "_mark_1jywv_17", Ul = "_word_1jywv_24", Kl = "_nav_1jywv_30", Vl = "_navItem_1jywv_38", Yl = "_group_1jywv_50", Xl = "_groupName_1jywv_57", Jl = "_agents_1jywv_70", Ql = "_agent_1jywv_70", Zl = "_agentTop_1jywv_88", eo = "_dot_1jywv_95", ao = "_agentName_1jywv_107", no = "_agentMeta_1jywv_120", to = "_foot_1jywv_126", ro = "_footName_1jywv_132", lo = "_footLinks_1jywv_139", oo = "_footLink_1jywv_139", io = "_root_1jywv_153", so = "_linkBrand_1jywv_162", co = "_label_1jywv_183", uo = "_note_1jywv_188", ho = "_footer_1jywv_202", R = {
  sidebar: Wl,
  brand: zl,
  mark: Gl,
  word: Ul,
  nav: Kl,
  navItem: Vl,
  group: Yl,
  groupName: Xl,
  new: "_new_1jywv_64",
  agents: Jl,
  agent: Ql,
  agentTop: Zl,
  dot: eo,
  agentName: ao,
  agentMeta: no,
  foot: to,
  footName: ro,
  footLinks: lo,
  footLink: oo,
  root: io,
  linkBrand: so,
  label: co,
  note: uo,
  footer: ho
};
function mo({ agent: e }) {
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
              style: { "--dot": Ln(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: R.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: R.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function wo({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: R.foot, children: [
    /* @__PURE__ */ n("span", { className: R.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: R.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: R.footLink, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function _o({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
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
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: R.new, href: W(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: R.agents, children: r.map((s) => /* @__PURE__ */ n(mo, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(wo, { shared: i })
  ] });
}
function fo(e) {
  return e.destinations ?? e.items ?? [];
}
function vo({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.linkBrand, children: e });
}
function bo({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.footer, children: e });
}
function po({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: R.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: R.note, children: e.note })
  ] });
}
function go(e) {
  return /* @__PURE__ */ o("aside", { className: `${R.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(vo, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: fo(e).map((a) => /* @__PURE__ */ n(po, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(bo, { children: e.children })
  ] });
}
function yo(e) {
  return "agents" in e;
}
function u$(e) {
  return yo(e) ? /* @__PURE__ */ n(_o, { ...e }) : /* @__PURE__ */ n(go, { ...e });
}
const No = "_mark_wlgi8_3", ko = {
  mark: No
}, $o = { met: "✓", unmet: "", failed: "✕" };
function Ka({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: ko.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: $o[e]
    }
  );
}
const Co = "_marker_br9fi_2", So = {
  marker: Co
}, Ro = {
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
  const r = { "--marker": Ro[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${So.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const To = "_root_ti0pq_2", Eo = "_chip_ti0pq_11", Lo = "_noCase_ti0pq_23", na = {
  root: To,
  chip: Eo,
  noCase: Lo
};
function Ao(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Va({ connection: e, since: a, lastEventAt: t }) {
  const r = Ao(a, t), l = Wa(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${na.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Le, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: na.noCase, children: Fa(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ce(r)
  ] });
}
const xo = "_root_k8vuh_2", Io = "_context_k8vuh_12", Mo = "_row_k8vuh_1", qo = "_heading_k8vuh_25", jo = "_headingWrap_k8vuh_33", Bo = "_chips_k8vuh_38", Po = "_title_k8vuh_45", Oo = "_consequence_k8vuh_54", Do = "_actionsWrap_k8vuh_59", Ho = "_actions_k8vuh_59", Fo = "_action_k8vuh_59", Wo = "_overflowPanel_k8vuh_78", zo = "_measureClip_k8vuh_89", Go = "_measure_k8vuh_89", Z = {
  root: xo,
  context: Io,
  row: Mo,
  heading: qo,
  headingWrap: jo,
  chips: Bo,
  title: Po,
  consequence: Oo,
  actionsWrap: Do,
  actions: Ho,
  action: Fo,
  overflowPanel: Wo,
  measureClip: zo,
  measure: Go
};
function Uo({ title: e, consequence: a, consequenceHint: t }) {
  return /* @__PURE__ */ o("div", { className: Z.heading, children: [
    /* @__PURE__ */ n("h1", { className: Z.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: Z.consequence, title: t, children: a })
  ] });
}
function qa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: Z.action, "data-action": "", children: a }, t));
}
function cn({ disclosure: e }) {
  return /* @__PURE__ */ n(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Ko({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(cn, { disclosure: l }) : a ? [/* @__PURE__ */ n(cn, { disclosure: l }, "more"), /* @__PURE__ */ n(qa, { actions: e }, "actions")] : /* @__PURE__ */ n(qa, { actions: e });
}
function Vo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Yo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(qa, { actions: e }) });
}
function Xo(e, a) {
  const t = $(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Jo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Z.context, children: [
    /* @__PURE__ */ n(fl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Z.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function Qo(...e) {
  return e.some((a) => a === null);
}
function Zo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function ei(e, a, t, r, l) {
  if (l === 0 || Qo(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], d = Zo(e), u = Math.max(0, e.clientWidth - i.offsetWidth - d);
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function ai(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function ni(e) {
  const a = y(null), t = y(null), r = y(null), l = y(null), [i, s] = p(!1);
  return x(() => {
    const c = a.current;
    if (!ai(c)) return;
    const d = () => s(ei(c, t.current, r.current, l.current, e.length)), u = new ResizeObserver(d);
    return u.observe(c), d(), () => u.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function ti({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: Z.measureClip, children: /* @__PURE__ */ o("div", { className: Z.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function ri({ connection: e }) {
  return e ? /* @__PURE__ */ n(Va, { connection: e.connection, since: e.since }) : null;
}
function h$({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: h, headingRef: f, actionsRef: b, measureRef: g, collapsed: I } = ni(i), D = s.length > 0, { disclosure: oe, close: $e } = Xo(I || D, b), ne = Vo(s, i, I, d);
  return /* @__PURE__ */ o("header", { className: Z.root, "data-density": u, children: [
    /* @__PURE__ */ n(Jo, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Z.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: f, className: Z.headingWrap, children: /* @__PURE__ */ n(Uo, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ n(ri, { connection: c }),
        /* @__PURE__ */ n("div", { className: Z.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(Ko, { actions: i, hasMore: D, collapsed: I, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Yo, { actions: ne, disclosure: oe, onEscape: $e }),
    /* @__PURE__ */ n(ti, { actions: i, hasMore: D, measureRef: g })
  ] });
}
const li = "_scrim_c7sqj_2", oi = "_drawer_c7sqj_10", ii = "_sheet_c7sqj_14", si = "_modal_c7sqj_18", ci = "_panel_c7sqj_23", di = "_header_c7sqj_51", ui = "_title_c7sqj_59", hi = "_body_c7sqj_63", mi = "_close_c7sqj_90", ye = {
  scrim: li,
  drawer: oi,
  sheet: ii,
  modal: si,
  panel: ci,
  header: di,
  title: ui,
  body: hi,
  close: mi
}, wi = De(null), ca = [], da = /* @__PURE__ */ new Map();
function _i(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function fi(e, a) {
  let t = da.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, da.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function vi(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !_i(r) && fi(e, r);
}
function bi(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (vi(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function pi(e) {
  for (const a of e.claims) {
    const t = da.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), da.delete(a)));
  }
}
function gi(e, a) {
  const t = { root: e, claims: [] };
  return ca.push(t), bi(t, a), t;
}
function yi(e) {
  const a = ca.indexOf(e);
  a >= 0 && ca.splice(a, 1), pi(e);
}
function dn(e) {
  return e !== null && ca.at(-1) === e;
}
function Ni(e, a, t) {
  const r = y(null), l = y(t);
  return l.current = t, x(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = gi(i, a);
    return r.current = c, () => {
      var u, h;
      const d = dn(c);
      yi(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [a]), X(() => dn(r.current), []);
}
function ki(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function $i(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ci({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ye.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${ye.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ye.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ye.body} ward-drawer-body`, children: e.children })
  ] });
}
function Si(e) {
  return `${ye.scrim} ${ye[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Ri(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ye.panel} ${ye[e]} ward-overlay-panel${t}${r}`;
}
function Ti(e) {
  const a = Oe(wi);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = y(null), t = y(null), r = $(), l = Ti(e.container), i = za("(min-width: 768px)"), s = ki(e.kind, i), c = $i(e, r), d = qt(t), u = Ni(a, l, e.returnFocusTo), h = X(() => {
    u() && e.onClose();
  }, [e.onClose, u]);
  return x(() => {
    var f, b;
    u() && ((b = (f = t.current) == null ? void 0 : f.querySelector("button")) == null || b.focus());
  }, [u]), x(() => {
    const f = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [h]), Rt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Si(s),
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
            className: Ri(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => u() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ye.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Ci, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Ei = "_root_drrhx_2", Li = "_ticket_drrhx_15", Ai = "_body_drrhx_24", Sa = {
  root: Ei,
  ticket: Li,
  body: Ai
};
function m$({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Sa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Sa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Sa.body, children: t })
  ] });
}
const xi = "_root_bf1pc_2", Ii = "_table_bf1pc_9", Mi = "_caption_bf1pc_14", qi = "_series_bf1pc_23", ji = "_category_bf1pc_31", Bi = "_cell_bf1pc_39", Pi = "_track_bf1pc_45", Oi = "_lane_bf1pc_52", Di = "_bar_bf1pc_56", Hi = "_value_bf1pc_63", Fi = "_swatch_bf1pc_70", Wi = "_empty_bf1pc_78", V = {
  root: xi,
  table: Ii,
  caption: Mi,
  series: qi,
  category: ji,
  cell: Bi,
  track: Pi,
  lane: Oi,
  bar: Di,
  value: Hi,
  swatch: Fi,
  empty: Wi
}, zi = "—", un = 6;
function Gi(e, a) {
  if (a.length < 1 || a.length > un)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${un}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Ui(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function Mn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Ki(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Vi({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Ki(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ o("span", { className: V.track, children: [
    /* @__PURE__ */ n("span", { className: V.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${V.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: V.value, children: e === null ? l : r(e) })
  ] }) });
}
function Yi({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: V.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: V.swatch, "data-step": Mn(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Xi({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${V.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: V.caption, children: e }),
    /* @__PURE__ */ n("p", { className: V.empty, children: a })
  ] });
}
function Ji({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: s = zi }) {
  return /* @__PURE__ */ n("div", { className: `${V.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: V.table, children: [
    /* @__PURE__ */ n("caption", { className: V.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: V.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Yi, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: V.category, children: c }),
      t.map((u, h) => /* @__PURE__ */ n(Vi, { value: u.values[d], top: r, step: Mn(h, t.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function w$(e) {
  Gi(e.categories, e.series);
  const a = Ui(e.series);
  return a === 0 ? /* @__PURE__ */ n(Xi, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Ji, { ...e, top: a });
}
const Qi = "_root_1bfqw_2", Zi = "_figure_1bfqw_7", es = "_of_1bfqw_13", as = "_bar_1bfqw_18", ns = "_rows_1bfqw_38", ts = "_row_1bfqw_38", rs = "_label_1bfqw_49", ls = "_amount_1bfqw_54", Ce = {
  root: Qi,
  figure: Zi,
  of: es,
  bar: as,
  rows: ns,
  row: ts,
  label: rs,
  amount: ls
};
function os({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ce.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ce.figure} ward-stat-value`, children: [
      re(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ce.of, children: [
        "of ",
        re(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Ce.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${re(e)} of ${re(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: Ce.rows, children: t.map((l) => /* @__PURE__ */ o("li", { className: `${Ce.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ce.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Ce.amount, children: re(l.amount) })
    ] }, l.label)) })
  ] });
}
const is = "_frame_mg2jl_2", ss = "_table_mg2jl_6", cs = "_th_mg2jl_12", ds = "_td_mg2jl_13", us = "_sort_mg2jl_47", hs = "_row_mg2jl_53", ms = "_empty_mg2jl_61", Re = {
  frame: is,
  table: ss,
  th: cs,
  td: ds,
  sort: us,
  row: hs,
  empty: ms
}, ws = { asc: "ascending", desc: "descending" };
function _s(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ws[a.direction];
}
function fs(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function vs(e) {
  return e === void 0 ? void 0 : { width: e };
}
function bs({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: vs(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": _s(e, a),
      children: fs(e, t)
    }
  );
}
function ps({ row: e, props: a }) {
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
function gs({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(bs, { column: h, sort: c, onSort: d }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(ps, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(h))) })
  ] }) });
}
const ys = "_list_v0s52_2", Ns = {
  list: ys
};
function _$({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Ns.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const ks = "_label_1u62a_2", $s = {
  label: ks
};
function f$({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: $s.label, children: a.header }) }, a.key)) }) });
}
const Cs = "_stack_bp6a0_2", Ss = {
  stack: Cs
};
function v$({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Ss.stack, "data-ward-action-stack": "", children: e });
}
const Rs = "_set_y5zy3_2", Ts = "_legend_y5zy3_7", Es = "_row_y5zy3_15", Ls = "_control_y5zy3_20", As = "_input_y5zy3_26", xs = "_label_y5zy3_31", Is = "_consequence_y5zy3_36", Ie = {
  set: Rs,
  legend: Ts,
  row: Es,
  control: Ls,
  input: As,
  label: xs,
  consequence: Is
};
function qn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
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
              "aria-describedby": Ga(b, s),
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
const Ms = "_root_1pyf1_2", qs = "_head_1pyf1_11", js = "_index_1pyf1_31", Bs = "_dot_1pyf1_35", Ps = "_note_1pyf1_40", Os = "_counter_1pyf1_46", Ds = "_trailing_1pyf1_54", qe = {
  root: Ms,
  head: qs,
  index: js,
  dot: Bs,
  note: Ps,
  counter: Os,
  trailing: Ds
};
function Hs({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${qe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: qe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Fs({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.counter, "aria-hidden": "true", children: e }) : null;
}
function hn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: qe.head, children: [
      /* @__PURE__ */ n(Hs, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: qe.note, children: t }),
    /* @__PURE__ */ n(Fs, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: qe.trailing, children: i })
  ] });
}
const Ws = "_strip_1cfs3_2", zs = "_cell_1cfs3_7", Gs = "_value_1cfs3_12", Us = "_link_1cfs3_27", Ks = "_label_1cfs3_39", Xe = {
  strip: Ws,
  cell: zs,
  value: Gs,
  link: Us,
  label: Ks
};
function Vs(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function Ys({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(S, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Xe.link} ward-stat-link`, href: W(e.href), "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function Na({ cells: e, divided: a = !1 }) {
  return Vs(e), /* @__PURE__ */ n("dl", { className: `${Xe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Xe.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Xe.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, title: t.hint, children: /* @__PURE__ */ n(Ys, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Xe.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Xs = "_root_xk7sv_2", Js = "_track_xk7sv_8", Qs = "_thumb_xk7sv_35", Zs = "_labelHidden_xk7sv_53", ec = "_label_xk7sv_53", ac = "_lockedNote_xk7sv_68", je = {
  root: Xs,
  track: Js,
  thumb: Qs,
  labelHidden: Zs,
  label: ec,
  lockedNote: ac
};
function nc(e) {
  return e ? `${je.label} ${je.labelHidden}` : je.label;
}
function Pe({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = $(), d = l ? !0 : a, u = r || l;
  return /* @__PURE__ */ o("span", { className: `${je.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": d,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": i,
        className: `${je.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: u,
        onClick: () => !u && (t == null ? void 0 : t(!d)),
        children: /* @__PURE__ */ n("span", { className: je.thumb })
      }
    ),
    /* @__PURE__ */ o("span", { id: c, className: nc(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: je.lockedNote, children: "always on" })
    ] })
  ] });
}
const tc = "_bar_1u2kl_2", rc = "_skip_1u2kl_11", lc = "_mark_1u2kl_22", oc = "_nav_1u2kl_30", ic = "_list_1u2kl_34", sc = "_select_1u2kl_40", cc = "_dest_1u2kl_47", dc = "_actor_1u2kl_61", uc = "_actorMark_1u2kl_74", hc = "_actorLabel_1u2kl_79", mc = "_tagline_1u2kl_98", de = {
  bar: tc,
  skip: rc,
  mark: lc,
  nav: oc,
  list: ic,
  select: sc,
  dest: cc,
  actor: dc,
  actorMark: uc,
  actorLabel: hc,
  tagline: mc
};
function wc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function _c(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function b$({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = _c(r);
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
      /* @__PURE__ */ n("span", { className: de.actorMark, "aria-hidden": "true", children: wc(c) })
    ] })
  ] });
}
const fc = "_tree_1lyby_2", vc = "_item_1lyby_6", bc = "_row_1lyby_10", pc = "_button_1lyby_22", ua = {
  tree: fc,
  item: vc,
  row: bc,
  button: pc
}, jn = De(null);
function gc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = va({ orientation: "vertical" });
  return /* @__PURE__ */ n(jn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ua.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const yc = { ArrowRight: !0, ArrowLeft: !1 };
function mn(e) {
  return e ? !0 : void 0;
}
function Nc(e, a) {
  const t = yc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function kc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function $c(e) {
  const a = [ua.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Cc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Sc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Rc(e) {
  return typeof e == "string" ? e : void 0;
}
function Tc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Ec({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Bn(e) {
  const a = Oe(jn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = Cc(e);
  return /* @__PURE__ */ o("li", { className: ua.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: $c(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": mn(e.unresolved),
        "data-inherited": mn(e.inherited),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${ua.button} ward-treeitem-btn`,
            onClick: () => kc(e),
            onKeyDown: (r) => Nc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Sc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Rc(e.label), children: e.label }),
              /* @__PURE__ */ n(Tc, { value: e.detail }),
              /* @__PURE__ */ n(Ec, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Lc = "_frame_1fj9j_2", Ac = "_subjectRail_1fj9j_22", xc = "_subject_1fj9j_22", Ic = "_rail_1fj9j_42", Mc = "_record_1fj9j_64", qc = "_recordBody_1fj9j_69", jc = "_stageGrid_1fj9j_118", Bc = "_band_1fj9j_144", Pc = "_bandBody_1fj9j_153", Oc = "_bandActions_1fj9j_158", Dc = "_scroller_1fj9j_166", Hc = "_board_1fj9j_192", Fc = "_laneCount_1fj9j_200", Wc = "_lanes_1fj9j_210", Y = {
  frame: Lc,
  subjectRail: Ac,
  subject: xc,
  rail: Ic,
  record: Mc,
  recordBody: qc,
  stageGrid: jc,
  band: Bc,
  bandBody: Pc,
  bandActions: Oc,
  scroller: Dc,
  board: Hc,
  laneCount: Fc,
  lanes: Wc
};
function p$({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function wn(e) {
  return e ? "true" : void 0;
}
function g$({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": t, "data-ruled": wn(i), children: [
    /* @__PURE__ */ n("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: Y.rail, "data-sticky": wn(l), "aria-label": r, children: a })
  ] });
}
function y$({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(hn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(hn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: Y.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const zc = "_form_1j8ub_2", Gc = "_fields_1j8ub_9", Uc = "_actions_1j8ub_19", Ra = {
  form: zc,
  fields: Gc,
  actions: Uc
};
function N$({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ra.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ra.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ra.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function k$({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: Y.bandActions, children: a })
  ] });
}
const Kc = "(max-width: 767.98px)";
function Ya({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = y(null);
  Ua(l, t ?? Ct.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function Vc({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(A, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Ya, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Yc({ lanes: e, label: a }) {
  const [t, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(Ya, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(St, { children: l.content }, l.id)) })
  ] });
}
function $$({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = za(Kc);
  return t === void 0 ? /* @__PURE__ */ n(Ya, { label: a, children: e }) : l ? /* @__PURE__ */ n(Vc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Yc, { lanes: t, label: a });
}
function C$({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = y(null), i = Math.max(e, 1);
  Ua(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const Xc = "_block_1o5o7_2", Jc = "_sentence_1o5o7_15", Qc = "_meta_1o5o7_20", Zc = "_action_1o5o7_25", ed = "_strip_1o5o7_29", ad = "_loading_1o5o7_48", nd = "_label_1o5o7_56", td = "_counter_1o5o7_63", _e = {
  block: Xc,
  sentence: Jc,
  meta: Qc,
  action: Zc,
  strip: ed,
  loading: ad,
  label: nd,
  counter: td
};
function rd({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(_, { onClick: e.onClick, children: e.label }) });
}
function ka({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: _e.sentence, children: e }),
    t,
    /* @__PURE__ */ n(rd, { action: a })
  ] });
}
function ld(e) {
  return /* @__PURE__ */ n(ka, { ...e, kind: "ward-emptystate" });
}
function S$({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ka, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function R$(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function T$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ka, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    ce(a)
  ] }) });
}
function E$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ce(e),
    ". Showing snapshot from ",
    ce(a)
  ] });
}
function L$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ce(a)
  ] });
}
function A$({ label: e, startedAt: a }) {
  const t = y(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  x(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = Wa(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: Fa(i) }) : null
  ] });
}
const od = "_note_tlubt_2", id = {
  note: od
};
function sd({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: id.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const cd = "_card_12in3_2", dd = "_hit_12in3_23", ud = "_head_12in3_30", hd = "_title_12in3_36", md = "_meta_12in3_44", wd = "_fields_12in3_45", _d = "_who_12in3_58", fd = "_sep_12in3_65", vd = "_mono_12in3_69", bd = "_field_12in3_45", pd = "_last_12in3_84", gd = "_reason_12in3_96", J = {
  card: cd,
  hit: dd,
  head: ud,
  title: hd,
  meta: md,
  fields: wd,
  who: _d,
  sep: fd,
  mono: vd,
  field: bd,
  last: pd,
  reason: gd
}, yd = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Nd(e, a, t) {
  const r = la(e, "blue"), l = la(e, "orange"), i = la(e, "green"), s = y(/* @__PURE__ */ new Set());
  x(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = yd[d.type];
      u && c[u]();
    });
  }, [r, t, i, a, l]);
}
const kd = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function $d(e, a) {
  return kd[a](e);
}
function Cd({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: J.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: J.meta, children: [
    /* @__PURE__ */ o("span", { className: J.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    t,
    /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: J.meta, children: [
    /* @__PURE__ */ o("span", { className: J.who, children: [
      "waits on ",
      e.waitsOn
    ] }),
    t,
    /* @__PURE__ */ o("span", { className: J.mono, children: [
      se(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Sd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: J.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Rd({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: J.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Td({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: J.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: J.field, children: $d(e, t) }, t)) });
}
const ja = (e) => e ? !0 : void 0;
function Ed(e) {
  return { "--stream": Ee(e.streamStep, "id") };
}
function Ld(e, a, t) {
  e == null || e(a, t);
}
function Ad(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function xd({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: J.last, "data-stale": ja(a), children: t }) : null;
}
function $a(e) {
  const a = e.fields ?? [], t = e.item, r = y(null);
  Nd(r, t.key, e.feed);
  const l = Ad(e.feed), i = Ed(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: J.card,
      style: i,
      "data-selected": ja(e.selected),
      "data-flagged": ja(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: J.hit, onClick: (s) => Ld(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Sd, { item: t }),
        /* @__PURE__ */ n("p", { className: J.title, children: t.title }),
        /* @__PURE__ */ n(Cd, { item: t, connection: l }),
        /* @__PURE__ */ n(Rd, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Td, { item: t, fields: a }),
        /* @__PURE__ */ n(xd, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const Id = "_column_10sxg_3", Md = "_head_10sxg_24", qd = "_label_10sxg_33", jd = "_count_10sxg_42", Bd = "_list_10sxg_56", Je = {
  column: Id,
  head: Md,
  label: qd,
  count: jd,
  list: Bd
};
function Pn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Pd({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Od(e) {
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
function Dd({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = $(), h = e.cap !== void 0 && a.length > e.cap, f = Pn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Pd, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ n(Od, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: f }),
    h && /* @__PURE__ */ n(sd, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Hd = "_foot_8qg4p_2", Fd = "_note_8qg4p_13", Wd = "_link_8qg4p_19", Ta = {
  foot: Hd,
  note: Fd,
  link: Wd
};
function x$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ta.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ta.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Ta.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const zd = "_head_1la6p_3", Gd = "_identity_1la6p_12", Ud = "_titleRow_1la6p_18", Kd = "_title_1la6p_18", Vd = "_key_1la6p_35", Yd = "_rollup_1la6p_45", Xd = "_tools_1la6p_53", Jd = "_swatch_1la6p_62", Qd = "_mark_1la6p_69", pe = {
  head: zd,
  identity: Gd,
  titleRow: Ud,
  title: Kd,
  key: Vd,
  rollup: Yd,
  tools: Xd,
  swatch: Jd,
  mark: Qd
}, _n = "initials:";
function Zd(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function eu(e) {
  const a = [Zd(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function au(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    eu(e)
  ] });
}
function nu(e) {
  return e.startsWith(_n) ? e.slice(_n.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function tu({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ee(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${pe.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: nu(e) }) : /* @__PURE__ */ n("span", { className: pe.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function ru({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function I$({
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
        /* @__PURE__ */ n(tu, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: pe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: pe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: pe.rollup, "aria-live": "polite", children: au(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: pe.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(ru, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(_, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Va, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const lu = "_head_kabyh_11", ou = "_line_kabyh_12", iu = "_cHandle_kabyh_33", su = "_cName_kabyh_38", cu = "_nameLine_kabyh_46", du = "_cLabel_kabyh_53", uu = "_cCap_kabyh_58", hu = "_cShown_kabyh_63", mu = "_name_kabyh_46", wu = "_noCap_kabyh_85", _u = "_state_kabyh_99", fu = "_handle_kabyh_104", vu = "_sub_kabyh_118", j = {
  head: lu,
  line: ou,
  cHandle: iu,
  cName: su,
  nameLine: cu,
  cLabel: du,
  cCap: uu,
  cShown: hu,
  name: mu,
  noCap: wu,
  state: _u,
  handle: fu,
  sub: vu
}, bu = "can't be hidden or collapsed", pu = "terminal · counted, not a column";
function M$() {
  return /* @__PURE__ */ o("div", { className: j.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: j.cHandle }),
    /* @__PURE__ */ n("span", { className: j.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: j.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: j.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: j.cShown, children: "Shown" })
  ] });
}
function gu(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function yu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function fn(e) {
  return e.gate ? bu : e.terminal ? pu : yu(e.agentsMounted);
}
function Nu(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function ku({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: j.cName, children: [
    /* @__PURE__ */ o("span", { className: j.nameLine, children: [
      /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    fn(e) && /* @__PURE__ */ n("span", { className: j.sub, children: fn(e) })
  ] });
}
function $u(e) {
  return e === void 0 ? "" : String(e);
}
function Cu(e) {
  return e === "" ? void 0 : Number(e);
}
function Su({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: j.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: j.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Nu(t, a),
      children: "⠿"
    }
  ) });
}
function Ru({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${j.cCap} ${j.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: j.cCap, children: /* @__PURE__ */ n(A, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: $u(a.cap), onChange: (r) => t({ ...a, cap: Cu(r) }) }) });
}
function Tu({ stage: e, config: a, onChange: t }) {
  const r = gu(e, a.shown);
  return /* @__PURE__ */ o("span", { className: j.cShown, children: [
    /* @__PURE__ */ n(Pe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: j.state, "aria-hidden": "true", children: r.state })
  ] });
}
function Eu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function q$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: j.line, "data-kind": Eu(e), children: [
    /* @__PURE__ */ n(Su, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(ku, { stage: e }),
    /* @__PURE__ */ n("span", { className: j.cLabel, children: /* @__PURE__ */ n(A, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(Ru, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Tu, { stage: e, config: a, onChange: t })
  ] });
}
const Lu = "_body_hn6d6_2", Au = "_head_hn6d6_9", xu = "_summary_hn6d6_19", Iu = "_block_hn6d6_20", Mu = "_actionsBlock_hn6d6_21", qu = "_title_hn6d6_41", ju = "_note_hn6d6_46", Bu = "_k_hn6d6_51", Pu = "_kv_hn6d6_58", Ou = "_row_hn6d6_64", Du = "_label_hn6d6_75", Hu = "_value_hn6d6_84", Fu = "_quote_hn6d6_90", Wu = "_actions_hn6d6_21", zu = "_resolve_hn6d6_103", B = {
  body: Lu,
  head: Au,
  summary: xu,
  block: Iu,
  actionsBlock: Mu,
  title: qu,
  note: ju,
  k: Bu,
  kv: Pu,
  row: Ou,
  label: Du,
  value: Hu,
  quote: Fu,
  actions: Wu,
  resolve: zu
};
function Gu(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Uu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Ku(e) {
  const a = ga(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Vu(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...ya(Ku(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Gu(e),
    ...Uu(e, a)
  ];
}
function Yu({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: B.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: B.k, children: a }),
    e
  ] });
}
function Xu({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: B.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Ju({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: B.block, children: [
    /* @__PURE__ */ n("p", { className: B.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: B.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: B.note, children: e.agentMeta })
  ] }) : null;
}
function j$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const d = $(), u = Vu(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: d, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: B.body, children: [
    /* @__PURE__ */ n(Xu, { item: e }),
    /* @__PURE__ */ o("div", { className: B.summary, children: [
      /* @__PURE__ */ n("h2", { className: B.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: B.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: B.kv, children: u.map(([h, f]) => /* @__PURE__ */ o("div", { className: B.row, children: [
      /* @__PURE__ */ n("dt", { className: B.label, children: h }),
      /* @__PURE__ */ n("dd", { className: B.value, children: f })
    ] }, h)) }),
    /* @__PURE__ */ n(Ju, { item: e }),
    /* @__PURE__ */ o("div", { className: B.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: B.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: B.note, children: c })
    ] }),
    /* @__PURE__ */ n(Yu, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Qu = "_root_3azmy_2", Zu = "_list_3azmy_7", eh = "_item_3azmy_12", ah = "_box_3azmy_18", nh = "_text_3azmy_23", th = "_note_3azmy_28", We = {
  root: Qu,
  list: Zu,
  item: eh,
  box: ah,
  text: nh,
  note: th
};
function Ca({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: We.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${We.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${We.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: We.box, children: /* @__PURE__ */ n(Ka, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: We.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${We.note} ward-checklist-note`, children: a })
  ] });
}
const rh = "_rail_ke7ch_2", lh = "_k_ke7ch_11", oh = "_head_ke7ch_19", ih = "_section_ke7ch_25", sh = "_card_ke7ch_38", ch = "_strip_ke7ch_42", dh = "_skeleton_ke7ch_56", uh = "_skeletonLabel_ke7ch_70", hh = "_bar_ke7ch_76", mh = "_note_ke7ch_85", he = {
  rail: rh,
  k: lh,
  head: oh,
  section: ih,
  card: sh,
  strip: ch,
  skeleton: dh,
  skeletonLabel: uh,
  bar: hh,
  note: mh
};
function wh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ea({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: he.k, children: e }),
    a
  ] });
}
function _h({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function fh({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Dd, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function vh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(fh, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(_h, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function B$(e) {
  const a = wh(e.onOpen), t = Pn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ea, { title: "Card", children: /* @__PURE__ */ n("div", { className: he.card, children: t && /* @__PURE__ */ n($a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ea, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(vh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ea, { title: "Effect of this config", children: /* @__PURE__ */ n(Ca, { items: e.effects, density: "compact" }) })
  ] });
}
function bh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function ph(e) {
  return Math.ceil(e.length / 2);
}
function gh(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function On(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function yh(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = On(e);
  l !== void 0 && t(l), r(gh(e.type));
}
function Nh(e, a, t, r, l) {
  x(() => {
    if (e !== null)
      return e.subscribe(a, (i) => yh(i, t, r, l));
  }, [e, a, t, r, l]);
}
function kh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function $h(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function Ch(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Sh(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(ph(a ?? [])) + ")"
  };
}
function Rh(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Th(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: re(e.cost) }) : null;
}
function Eh(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Lh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Ah(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function xh(e, a) {
  return a === void 0 ? e : bh(e, a.ref);
}
function Ih(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ze(e) {
  return e === !0 ? "true" : void 0;
}
function Dn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = y(null), i = la(l), s = y(/* @__PURE__ */ new Set()), [c, d] = p(kh(a));
  Nh(e.feed, a.key, s, d, i);
  const u = $h(a, r), h = Ch(a, t), f = Sh(a, e.fields), b = Ah(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Ih(e),
      className: "ward-workcard",
      "data-flagged": Ze(a.flagged),
      "data-selected": Ze(e.selected),
      style: f,
      ref: xh(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Rh(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Th(a, e.fields),
          Eh(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Lh(t, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Mh({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function qh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function jh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Bh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Mh, { count: e.items.length, cap: e.column.cap });
}
function Ph(e, a) {
  return e.roving ?? a;
}
function Oh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Dh(e, a) {
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
function Hh(e) {
  const a = $(), t = va({ orientation: "vertical" }), r = Ph(e, t), l = qh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ze(l), "data-gate": Ze(e.column.gate), children: [
    jh(e.column, e.items.length, a),
    Bh(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Oh(e, t), children: Dh(e, r) })
  ] });
}
function Fh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Wh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function zh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function P$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Fh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Wh(e),
      zh(e.onConfigure),
      /* @__PURE__ */ n(Va, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Gh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Uh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Pe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Pe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Kh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function O$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ze(Gh(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Uh(e) }),
    /* @__PURE__ */ n(A, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(An, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Kh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function D$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Dn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Hh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Vh(e, a) {
  const t = On(e);
  t !== void 0 && a(t);
}
function Yh(e, a, t) {
  x(() => {
    if (e != null)
      return e.subscribe(a, (r) => Vh(r, t));
  }, [e, a, t]);
}
function Xh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Jh(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function Qh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Zh(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function H$(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  Yh(e.feed, a.key, l);
  const i = [...Xh(a), ...Jh(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Qh(t, r)
    ] }),
    Zh(a, e.actions)
  ] });
}
const em = "_card_d2vbe_2", am = "_head_d2vbe_22", nm = "_mark_d2vbe_30", tm = "_name_d2vbe_42", rm = "_chips_d2vbe_63", lm = "_description_d2vbe_69", om = "_run_d2vbe_74", im = "_sep_d2vbe_83", sm = "_facts_d2vbe_88", cm = "_fact_d2vbe_88", dm = "_factLabel_d2vbe_101", um = "_factValue_d2vbe_105", le = {
  card: em,
  head: am,
  mark: nm,
  name: tm,
  chips: rm,
  description: lm,
  run: om,
  sep: im,
  facts: sm,
  fact: cm,
  factLabel: dm,
  factValue: um
}, hm = { live: "done", draft: "running", paused: "meta" };
function mm(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function wm({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: hm[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function _m({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function fm({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function vm({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function bm(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function pm({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": Ee(e.streamStep, "id") }, d = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: mm(s),
      style: c,
      "data-selected": d,
      "data-paused": bm(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(_m, { description: e.description }),
        /* @__PURE__ */ n(fm, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(wm, { versions: e.versions }),
        /* @__PURE__ */ n(vm, { facts: i })
      ]
    }
  );
}
const gm = "_list_4dcyc_2", ym = "_row_4dcyc_11", Nm = "_head_4dcyc_23", km = "_id_4dcyc_30", $m = "_lock_4dcyc_35", Cm = "_reason_4dcyc_41", Sm = "_remove_4dcyc_46", Rm = "_clauses_4dcyc_50", Tm = "_clause_4dcyc_50", Em = "_label_4dcyc_64", Lm = "_cell_4dcyc_71", Am = "_value_4dcyc_76", ie = {
  list: gm,
  row: ym,
  head: Nm,
  id: km,
  lock: $m,
  reason: Cm,
  remove: Sm,
  clauses: Rm,
  clause: Tm,
  label: Em,
  cell: Lm,
  value: Am
}, Hn = De(!1);
function F$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Hn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function xm({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(A, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function Im({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ie.reason, children: e })
  ] });
}
function Mm({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ n("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Im, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function vn(e, a) {
  return e.locked ? void 0 : a;
}
function W$({ rule: e, onChange: a, onRemove: t }) {
  if (!Oe(Hn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = vn(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Mm, { rule: e, onRemove: vn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ n("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ie.cell, children: /* @__PURE__ */ n(xm, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const qm = "_ladder_wwnch_2", jm = "_cell_wwnch_7", Bm = "_empty_wwnch_26", Pm = "_name_wwnch_34", Om = "_holder_wwnch_40", Dm = "_request_wwnch_46", Hm = "_swatches_wwnch_51", Fm = "_swatch_wwnch_51", Wm = "_tilesFrame_wwnch_78", zm = "_tiles_wwnch_78", Gm = "_tile_wwnch_78", Um = "_bar_wwnch_117", Km = "_hex_wwnch_128", Vm = "_note_wwnch_138", E = {
  ladder: qm,
  cell: jm,
  empty: Bm,
  name: Pm,
  holder: Om,
  request: Dm,
  swatches: Hm,
  swatch: Fm,
  tilesFrame: Wm,
  tiles: zm,
  tile: Gm,
  bar: Um,
  hex: Km,
  note: Vm
}, Ym = "not validated yet, pending a CVD matrix and dark stepping";
function Xm(e) {
  return e.reserved ? "reserved" : pa(e.step) ? "validated" : "partial";
}
function Fn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Jm(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Qm({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Le, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Zm(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function ew(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const bn = (e) => String(e).padStart(2, "0");
function aw(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Fn(e, void 0);
}
function nw({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${bn(e)}` : Ft(e) }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: r ? t : `Step ${bn(e)} · ${t}` })
  ] });
}
function tw({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = Xm(e), s = Fn(i, t), c = s !== "free", d = a === e.step, u = e.name ?? `Step ${e.step}`, h = () => {
    c || r(e.step);
  }, f = `${u} · ${l === "tiles" && d ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": f, ...ew(c, d), "data-validation": i, style: Jm(e, i), onClick: h, onKeyDown: (g) => Zm(g, h) }, label: f, name: u, holder: s, validation: i, note: aw(i, t, d), step: e.step };
}
const rw = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(nw, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Qm, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function lw(e) {
  return rw[e.presentation](tw(e));
}
function ow(e) {
  for (const a of e)
    if (!a.reserved && !ba(a.step)) throw new Error("colour ladder renders token steps only");
}
function iw() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function sw(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const cw = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function dw() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const uw = { list: iw, swatches: () => null, tiles: dw };
function Wn(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  ow(e.steps);
  const r = sw(e), l = uw[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(lw, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${cw[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: E.tiles, children: i }) : i });
}
const hw = "_rail_1el2t_2", mw = "_section_1el2t_12", ww = "_sectionFlush_1el2t_22", _w = "_head_1el2t_26", fw = "_headLabel_1el2t_34", vw = "_sample_1el2t_42", bw = "_sampleLabel_1el2t_47", pw = "_sampleTitle_1el2t_54", gw = "_sampleMeta_1el2t_59", yw = "_trace_1el2t_65", Nw = "_traceHead_1el2t_70", kw = "_steps_1el2t_78", $w = "_step_1el2t_78", Cw = "_stepTitle_1el2t_97", Sw = "_hollow_1el2t_107", Rw = "_stepBody_1el2t_115", Tw = "_stepDetail_1el2t_127", Ew = "_publish_1el2t_132", Lw = "_reason_1el2t_138", Aw = "_note_1el2t_143", xw = "_reveal_1el2t_148", N = {
  rail: hw,
  section: mw,
  sectionFlush: ww,
  head: _w,
  headLabel: fw,
  sample: vw,
  sampleLabel: bw,
  sampleTitle: pw,
  sampleMeta: gw,
  trace: yw,
  traceHead: Nw,
  steps: kw,
  step: $w,
  stepTitle: Cw,
  hollow: Sw,
  stepBody: Rw,
  stepDetail: Tw,
  publish: Ew,
  reason: Lw,
  note: Aw,
  reveal: xw
}, pn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Iw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Mw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, qw = { notSimulated: "not simulated", running: "running" };
function jw(e) {
  return e.presentation === "foundry";
}
function Bw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Pw(e, a) {
  var r;
  const t = Iw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Ow(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Dw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Hw(e) {
  if (Ow(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Fw(e) {
  const [a, t] = p(!1);
  x(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${N.step} ${N.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Ww(e) {
  const a = qw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: N.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Le, { size: 6, kind: Mw[e.kind], label: e.kind });
}
function zw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: N.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Gw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Uw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Fw, { kind: a.kind, children: [
    /* @__PURE__ */ n(Ww, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: N.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: N.stepTitle, children: a.title }),
      /* @__PURE__ */ n(zw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Gw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Kw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(se(a)), t.join(" · ");
}
function zn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${N.trace} ${N.section}`, children: [
    /* @__PURE__ */ n("p", { className: N.traceHead, id: a, children: Kw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: N.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Uw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Vw(e) {
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
function Yw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ce(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${N.sampleMeta} ${N.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Xw(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Tn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(Na, { divided: !0, cells: a }) });
}
function Jw(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Tn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Qw(e) {
  const a = Jw(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: N.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(Na, { divided: !0, cells: a }) });
}
function Gn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: `${N.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Zw(e) {
  return /* @__PURE__ */ o("div", { className: `${N.publish} ${N.section}`, children: [
    /* @__PURE__ */ n(Gn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: N.note, children: e.note })
  ] });
}
function e_(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${N.publish} ${N.section}`, children: /* @__PURE__ */ n(Gn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Un(e) {
  return /* @__PURE__ */ o("div", { className: `${N.head} ${N.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: N.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: pn[e.run.status].role, label: pn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function a_(e, a) {
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
function n_(e) {
  var t;
  Dw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Un, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Vw, { sample: e.run.sample }),
    /* @__PURE__ */ n(zn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Xw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist }) }),
    /* @__PURE__ */ n(Zw, { reason: Bw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function t_(e) {
  var r;
  const a = a_(e.run, e.feed);
  Hw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Un, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Yw, { sample: e.run.sample }),
    /* @__PURE__ */ n(zn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Qw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(e_, { reason: Pw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function z$(e) {
  return jw(e) ? /* @__PURE__ */ n(t_, { ...e }) : /* @__PURE__ */ n(n_, { ...e });
}
const r_ = "_list_142ip_3", l_ = "_row_142ip_9", o_ = "_condition_142ip_18", i_ = "_action_142ip_24", oa = {
  list: r_,
  row: l_,
  condition: o_,
  action: i_
}, Kn = De(!1);
function G$({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Kn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oa.list, "aria-label": a, children: e }) });
}
function U$({ rule: e }) {
  if (!Oe(Kn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: oa.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: oa.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: oa.action, children: e.then })
  ] });
}
function Ba(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(t, 0, l), r;
}
function Vn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Yn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function gn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function s_(e) {
  return e === "up" ? "down" : "up";
}
function c_(e, a) {
  const t = gn(e, a.id, a.direction) ?? gn(e, a.id, s_(a.direction));
  t == null || t.focus();
}
function Xn() {
  const e = y(null), [a, t] = p(null), [r, l] = p("");
  return x(() => {
    e.current !== null && a !== null && c_(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    t(s), l(c);
  } };
}
function Jn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ha({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const d_ = "_body_1h15q_2", u_ = "_title_1h15q_8", h_ = "_section_1h15q_13", m_ = "_legend_1h15q_18", w_ = "_stages_1h15q_26", __ = "_stage_1h15q_26", f_ = "_stageIndex_1h15q_44", v_ = "_stageName_1h15q_50", b_ = "_footer_1h15q_59", p_ = "_note_1h15q_66", g_ = "_reason_1h15q_71", y_ = "_actions_1h15q_76", N_ = "_webHead_1h15q_83", k_ = "_kicker_1h15q_92", $_ = "_webTitle_1h15q_99", C_ = "_webBody_1h15q_105", S_ = "_webSection_1h15q_109", R_ = "_sectionHead_1h15q_121", T_ = "_sectionNote_1h15q_129", E_ = "_formLabel_1h15q_134", L_ = "_identityRow_1h15q_139", A_ = "_nameCell_1h15q_145", x_ = "_keyCell_1h15q_150", I_ = "_colourCell_1h15q_154", M_ = "_colourStatus_1h15q_161", q_ = "_webStages_1h15q_166", j_ = "_webStageList_1h15q_172", B_ = "_webStage_1h15q_166", P_ = "_webIndex_1h15q_191", O_ = "_webStageName_1h15q_196", D_ = "_webMoves_1h15q_201", H_ = "_addStage_1h15q_215", F_ = "_addStageButton_1h15q_223", W_ = "_addStageNote_1h15q_231", z_ = "_webFooter_1h15q_236", G_ = "_webFooterNotes_1h15q_244", U_ = "_webNote_1h15q_251", w = {
  body: d_,
  title: u_,
  section: h_,
  legend: m_,
  stages: w_,
  stage: __,
  stageIndex: f_,
  stageName: v_,
  footer: b_,
  note: p_,
  reason: g_,
  actions: y_,
  webHead: N_,
  kicker: k_,
  webTitle: $_,
  webBody: C_,
  webSection: S_,
  sectionHead: R_,
  sectionNote: T_,
  formLabel: E_,
  identityRow: L_,
  nameCell: A_,
  keyCell: x_,
  colourCell: I_,
  colourStatus: M_,
  webStages: q_,
  webStageList: j_,
  webStage: B_,
  webIndex: P_,
  webStageName: O_,
  webMoves: D_,
  addStage: H_,
  addStageButton: F_,
  addStageNote: W_,
  webFooter: z_,
  webFooterNotes: G_,
  webNote: U_
}, K_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Qn = "not in catalogue";
function V_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Qn}` }, ...t];
}
function Y_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(A, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Qn}`;
  return /* @__PURE__ */ n(A, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: V_(t, e.name), invalid: i, onChange: r });
}
function Zn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function X_(e) {
  const a = y([]), t = y(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function J_({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Zn(a, t), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(Y_, { stage: a, index: t, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(A, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: K_, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Q_({ stages: e, onChange: a, catalogue: t }) {
  const r = X_(e.length), l = Xn(), i = (c, d) => {
    const u = Vn(c, d);
    r.current = Ba(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Yn(Zn(e[c], c), u, e.length)), a(Ba(e, c, u));
  }, s = (c, d) => a(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(J_, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: t, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Jn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Z_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], ef = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], af = "A new stream starts as a draft. Nothing runs on it until you publish it.", nf = "Create is disabled: name the stream and give it a key first.", tf = "reorder with the ↑ ↓ buttons · min 2";
function Xa(e, a) {
  return !e.reserved && pa(e.step) && a[e.step] === void 0;
}
function rf(e, a) {
  const t = e.find((r) => Xa(r, a));
  return t ? t.step : 1;
}
function lf({ stages: e, onMove: a }) {
  const t = Xn(), r = (l, i) => {
    const s = Vn(l, i);
    t.moved({ id: e[l].id, direction: i }, Yn(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ha, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ha, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Jn, { text: t.announcement })
  ] });
}
function of({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: af }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(_, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function sf(e, a) {
  return e !== "" && a !== "" ? null : nf;
}
function cf(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = ef, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = $(), [h, f] = p(""), [b, g] = p(""), [I, D] = p(a[0].value), [oe, $e] = p(() => rf(t, r)), [ne, He] = p(e.stages ?? Z_), [Fe, C] = p(l[0].value), z = { name: h, key: b, streamStep: oe, owner: I, stages: ne, policy: Fe }, fe = sf(h, b);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Stream name", value: h, onChange: f }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Key", value: b, onChange: g, mono: !0 }),
      /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: I, onChange: D, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Wn, { label: "Stream colour", steps: t, value: oe, onChange: $e, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(lf, { stages: ne, onMove: (Ae, $t) => He(Ba(ne, Ae, $t)) })
    ] }),
    /* @__PURE__ */ n(qn, { legend: "Loop policy", options: l, value: Fe, onChange: C }),
    /* @__PURE__ */ n(of, { reason: fe, onCreate: () => i(z), onDraft: () => s(z) })
  ] }) });
}
const et = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], df = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function uf(e, a, t, r, l, i) {
  var c;
  const s = ((c = et.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function hf(e, a) {
  return mf(e) && wf(e, a) && _f(e);
}
function mf(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function wf(e, a) {
  return e.colourStep !== null && Xa({ step: e.colourStep }, a);
}
function _f(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function ff(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${Ym}.` : Xa({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function vf({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function bf({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(vf, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: df })
    ] }),
    l && /* @__PURE__ */ n(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function pf({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function gf({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function yf(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, f] = p(null), [b, g] = p("relay"), [I, D] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = uf(l, s, d, h, b, I), $e = hf(oe, r), ne = I.find((C) => C.kind === "agent" && C.name.trim() !== ""), He = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Wn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: f, takenBy: r })
  ] }), Fe = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: ff(h, r) }),
    /* @__PURE__ */ n(A, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((C) => ({ value: C, label: C })), onChange: u })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(pf, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(gf, { name: l, setName: i, streamKey: s, setKey: c, colour: He, owner: Fe }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: tf })
        ] }),
        /* @__PURE__ */ n(Q_, { stages: I, onChange: D })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(qn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: et, onChange: g }) }),
      /* @__PURE__ */ n(bf, { ready: $e, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function K$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(yf, { ...e }) : /* @__PURE__ */ n(cf, { ...e });
}
const Nf = "_row_bs8hc_2", kf = "_cell_bs8hc_6", $f = "_condition_bs8hc_11", Cf = "_action_bs8hc_18", Sf = "_contract_bs8hc_24", Rf = "_contractCondition_bs8hc_33", Tf = "_contractAction_bs8hc_39", Q = {
  row: Nf,
  cell: kf,
  condition: $f,
  action: Cf,
  contract: Sf,
  contractCondition: Rf,
  contractAction: Tf
}, at = ["advance", "block", "escalate", "requestReview"], yn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ma(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Ja(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: Q.action, children: yn[e.then] }) : /* @__PURE__ */ n(
    A,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: at.map((l) => ({ value: l, label: yn[l] }))
    }
  );
}
function Ef({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: Q.condition, title: ma(e, r), children: ma(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Ja(e, a, t) })
  ] });
}
function Lf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: Q.condition, children: ma(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Ja(e, a, t) })
  ] });
}
function Af({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractCondition, children: ma(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractAction, children: Ja(e, a, t, !0) })
  ] });
}
const xf = { two: Lf, four: Ef, contract: Af };
function V$(e) {
  var t;
  if (!at.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = xf[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const If = "_column_k4nls_2", Mf = "_head_k4nls_17", qf = "_index_k4nls_23", jf = "_name_k4nls_29", Bf = "_meta_k4nls_38", Pf = "_mono_k4nls_43", Of = "_gate_k4nls_50", Df = "_reviewersLabel_k4nls_57", Hf = "_reviewers_k4nls_57", Ff = "_reviewer_k4nls_57", Wf = "_agents_k4nls_74", zf = "_workflowColumn_k4nls_79", Gf = "_workflowHead_k4nls_96", Uf = "_stageRow_k4nls_102", Kf = "_stageLabel_k4nls_109", Vf = "_workflowTitle_k4nls_116", Yf = "_workflowMeta_k4nls_122", Xf = "_workflowGate_k4nls_127", Jf = "_gateNote_k4nls_135", Qf = "_cardNote_k4nls_140", Zf = "_reviewerList_k4nls_145", ev = "_reviewerRow_k4nls_151", av = "_reviewerMark_k4nls_157", nv = "_reviewerName_k4nls_167", tv = "_terminalCard_k4nls_173", rv = "_terminalCount_k4nls_182", lv = "_workflowAgents_k4nls_188", ov = "_mount_k4nls_194", k = {
  column: If,
  head: Mf,
  index: qf,
  name: jf,
  meta: Bf,
  mono: Pf,
  gate: Of,
  reviewersLabel: Df,
  reviewers: Hf,
  reviewer: Ff,
  agents: Wf,
  workflowColumn: zf,
  workflowHead: Gf,
  stageRow: Uf,
  stageLabel: Kf,
  workflowTitle: Vf,
  workflowMeta: Yf,
  workflowGate: Xf,
  gateNote: Jf,
  cardNote: Qf,
  reviewerList: Zf,
  reviewerRow: ev,
  reviewerMark: av,
  reviewerName: nv,
  terminalCard: tv,
  terminalCount: rv,
  workflowAgents: lv,
  mount: ov
}, iv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Qa(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function nt(e) {
  return `${Math.round(e * 100)}%`;
}
function sv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: k.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: k.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: k.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Na, { cells: [
      { value: nt(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function cv({ stage: e }) {
  return /* @__PURE__ */ n(Na, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Qa(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function dv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: k.head, children: [
    /* @__PURE__ */ n("span", { className: k.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: k.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: iv[e.kind] })
  ] });
}
function uv({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: k.meta, children: [
    /* @__PURE__ */ o("span", { className: k.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: k.mono, children: [
      se(e.medianWait),
      " median wait"
    ] })
  ] });
}
function hv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(sv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(cv, { stage: e }) : null;
}
function mv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function wv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: k.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(dv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(uv, { stage: e }),
    /* @__PURE__ */ n(hv, { stage: e }),
    /* @__PURE__ */ n("div", { className: k.agents, children: a.map((s) => /* @__PURE__ */ n(pm, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(mv, { onMount: t })
  ] });
}
const _v = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function fv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: k.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: k.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: k.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: k.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function vv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: k.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(fv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: k.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: nt(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function bv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function pv({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: k.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: k.terminalCount, children: Qa(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: k.cardNote, children: bv(e.rolledBackThisWeek) })
  ] });
}
function gv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function yv(e) {
  if (e.kind === "terminal") return `${Qa(e.closedThisWeek)} this week`;
  const a = gv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Nv({ stage: e, titleId: a }) {
  const t = _v[e.kind];
  return /* @__PURE__ */ o("header", { className: k.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: k.stageRow, children: [
      /* @__PURE__ */ o("span", { className: k.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: k.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: k.workflowMeta, children: yv(e) })
  ] });
}
function kv(e) {
  return e === "entry" || e === "agent";
}
function $v({ stage: e, onMount: a }) {
  return a === void 0 || !kv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: `${k.mount} ward-target`, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Cv({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: k.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Nv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(vv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(pv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: k.workflowAgents, children: a }),
    /* @__PURE__ */ n($v, { stage: e, onMount: t })
  ] });
}
function Sv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function Y$(e) {
  return Sv(e) ? /* @__PURE__ */ n(Cv, { ...e }) : /* @__PURE__ */ n(wv, { ...e });
}
const Rv = "_row_1jw40_6", Tv = "_name_1jw40_12", Ev = "_compactRow_1jw40_13", Lv = "_compactName_1jw40_13", Av = "_cell_1jw40_30", xv = "_chain_1jw40_45", Iv = "_owner_1jw40_51", Mv = "_mono_1jw40_57", qv = "_compactCell_1jw40_79", jv = "_stack_1jw40_96", Bv = "_stat_1jw40_103", Pv = "_identityLine_1jw40_110", Ov = "_identity_1jw40_110", Dv = "_ownerLine_1jw40_137", Hv = "_link_1jw40_150", Fv = "_gateMark_1jw40_156", Wv = "_emptyChain_1jw40_161", zv = "_arrow_1jw40_167", Gv = "_muted_1jw40_168", Uv = "_define_1jw40_173", Kv = "_statValue_1jw40_180", Vv = "_policyId_1jw40_186", Yv = "_sub_1jw40_191", v = {
  row: Rv,
  name: Tv,
  compactRow: Ev,
  compactName: Lv,
  cell: Av,
  chain: xv,
  owner: Iv,
  mono: Mv,
  compactCell: qv,
  stack: jv,
  stat: Bv,
  identityLine: Pv,
  identity: Ov,
  ownerLine: Dv,
  link: Hv,
  gateMark: Fv,
  emptyChain: Wv,
  arrow: zv,
  muted: Gv,
  define: Uv,
  statValue: Kv,
  policyId: Vv,
  sub: Yv
};
function tt(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function Xv(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Jv(e) {
  return e === void 0 ? v.compactRow : `${v.compactRow} ${e}`;
}
function rt(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Qv(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${rt(e.members)}`;
}
function Zv(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: /* @__PURE__ */ o("span", { className: v.stack, children: [
    /* @__PURE__ */ o("span", { className: v.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${v.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${v.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: v.ownerLine, children: Qv(e) })
  ] }) });
}
function lt({ name: e, gate: a, size: t }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ n("span", { className: v.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { role: a ? "gate" : "soft", size: t, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function eb(e) {
  return /* @__PURE__ */ n("span", { className: `${v.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: v.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: v.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(lt, { name: a.name, gate: a.gate === !0, size: "tag" })
  ] }, `${a.name}${t}`)) });
}
function ab(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: v.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: v.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: v.define, children: "Define workflow" })
  ] }) : eb(e) });
}
function ot(e) {
  return e === void 0 ? void 0 : !0;
}
function Nn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: t }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: `${v.statValue} ward-stat-value`, title: r, "data-raised": ot(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: v.sub, children: a })
  ] }) });
}
function nb(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: v.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: v.sub, children: e.summary })
  ] }) });
}
function tb(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function rb({ stream: e, href: a, presentation: t }) {
  const r = Jv(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: tt, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": Ee(e.streamStep, "chip") }, children: [
    Zv(e, a),
    ab(e.stages),
    Nn(tb(e.agents), e.agents === void 0 ? void 0 : Xv(e.agents), "—"),
    nb(e.policy),
    Nn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function lb(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function X$(e) {
  if (lb(e)) return rb(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: v.row, onClick: tt, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: v.cell, children: [
      /* @__PURE__ */ n("a", { className: `${v.name} ward-target`, href: W(t), children: a.name }),
      /* @__PURE__ */ n(m, { ...ya(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, children: /* @__PURE__ */ n("span", { className: v.chain, children: a.stages.map((r) => /* @__PURE__ */ n("span", { className: v.link, children: /* @__PURE__ */ n(lt, { name: r.name, gate: r.gate }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: v.mono, children: rt(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, title: a.inFlightHint, "data-raised": ot(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const ob = "_row_mdce7_2", ib = "_name_mdce7_16", sb = "_scope_mdce7_24", wa = {
  row: ob,
  name: ib,
  scope: sb
};
function cb(e) {
  return e === void 0 ? `${wa.row} ward-toolrow` : `${wa.row} ward-toolrow ${e}`;
}
function db(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function ub({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function hb({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function mb({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${wa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function wb(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function J$({ tool: e, onChange: a, presentation: t }) {
  const r = $(), l = $(), i = db(e, t), s = wb(t);
  return /* @__PURE__ */ o(s, { className: cb(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(ub, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${wa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(mb, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(hb, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const _b = "_strip_1qtlf_2", fb = "_head_1qtlf_10", vb = "_name_1qtlf_16", bb = "_chart_1qtlf_24", pb = "_segment_1qtlf_30", gb = "_detailedChart_1qtlf_36", yb = "_rail_1qtlf_49", Nb = "_section_1qtlf_55", kb = "_label_1qtlf_66", $b = "_note_1qtlf_83", ee = {
  strip: _b,
  head: fb,
  name: vb,
  chart: bb,
  segment: pb,
  detailedChart: gb,
  rail: yb,
  section: Nb,
  label: kb,
  note: $b
}, Cb = "No item in flight to preview.", Sb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Rb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Pa = [1, 2, 3, 4, 5, 6], _a = 100;
function Tb(e, a) {
  return a.has(e) ? Ee(e, "id") : "var(--ward-color-line)";
}
function Eb({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Pa.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: ee.segment,
      x: l * _a,
      y: "0",
      width: _a,
      height: "8",
      fill: Tb(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Lb(e) {
  const a = e.slice(0, Pa.length);
  for (; a.length < Pa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Ab({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${ee.detailedChart} ward-appearance-chart`, children: [
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
function it(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ta({ label: e, children: a }) {
  const t = $();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: ee.label, children: e }),
    a
  ] });
}
function xb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: ee.note, children: a ?? Cb }) : /* @__PURE__ */ n($a, { item: { ...e, streamStep: ga(t.streamStep) }, onOpen: it(r), feed: null });
}
function Ib({ draft: e }) {
  const a = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...ya(e.key, e.streamStep) })
  ] });
}
function Mb(e) {
  const a = Lb(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ta, { label: "Board card", children: /* @__PURE__ */ n(xb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ta, { label: "Streams index row", children: /* @__PURE__ */ n(Ib, { draft: t }) }),
    /* @__PURE__ */ o(ta, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Ab, { identities: a }),
      /* @__PURE__ */ n("p", { className: ee.note, children: Sb })
    ] }),
    /* @__PURE__ */ n(ta, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: ee.note, children: Rb }) })
  ] });
}
function qb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...ya(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n($a, { item: { ...a, streamStep: e.streamStep }, onOpen: it(r) }),
    /* @__PURE__ */ n(Eb, { draft: e, streams: t })
  ] });
}
function Q$(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Mb, { ...e }) : /* @__PURE__ */ n(qb, { ...e });
}
const jb = "_row_ixlg5_6", Bb = "_headCell_ixlg5_10", Pb = "_cell_ixlg5_11", Ob = "_name_ixlg5_23", Db = "_consequence_ixlg5_29", Hb = "_governed_ixlg5_36", Fb = "_control_ixlg5_42", Wb = "_byRole_ixlg5_48", zb = "_webControl_ixlg5_59", Gb = "_webConsequence_ixlg5_65", Ub = "_webGoverned_ixlg5_71", O = {
  row: jb,
  headCell: Bb,
  cell: Pb,
  name: Ob,
  consequence: Db,
  governed: Hb,
  control: Fb,
  byRole: Wb,
  webControl: zb,
  webConsequence: Gb,
  webGoverned: Ub
};
function Kb({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: O.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: O.control, children: [
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
function Vb({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Kb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Yb(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Xb({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${O.webControl} ${O.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Pe,
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
function Jb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Xb, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webGoverned} ward-cellmeta`, children: Yb(e) }) })
  ] });
}
function Z$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Jb, { ...e }) : /* @__PURE__ */ n(Vb, { ...e });
}
const Qb = "_row_vv64h_2", Zb = "_cell_vv64h_6", ep = "_name_vv64h_25", ap = "_note_vv64h_30", np = "_webName_vv64h_41", tp = "_webMeta_vv64h_47", K = {
  row: Qb,
  cell: Zb,
  name: ep,
  note: ap,
  webName: np,
  webMeta: tp
}, st = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function rp(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function lp({ component: e, onRestart: a }) {
  const t = $(), r = st[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: K.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: K.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { id: t, className: K.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: K.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(_, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function op({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: rp(e.state) });
}
function ip({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...st[e.state] }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(op, { component: e, onRestart: a }) })
  ] });
}
function eC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ip, { ...e }) : /* @__PURE__ */ n(lp, { ...e });
}
const sp = "_row_1f1gp_7", cp = "_cell_1f1gp_11", dp = "_next_1f1gp_28", up = "_headCell_1f1gp_38", hp = "_webId_1f1gp_77", mp = "_webPurpose_1f1gp_83", wp = "_webMeta_1f1gp_91", _p = "_webUrgent_1f1gp_97", H = {
  row: sp,
  cell: cp,
  next: dp,
  headCell: up,
  webId: hp,
  webPurpose: mp,
  webMeta: wp,
  webUrgent: _p
}, fp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, vp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, ct = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], bp = Object.fromEntries(ct.map((e) => [e.key, e]));
function ze({ column: e, children: a }) {
  const t = bp[e];
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
function aC() {
  return /* @__PURE__ */ n("tr", { children: ct.map((e) => /* @__PURE__ */ n(
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
function pp({ cred: e }) {
  const a = fp[e.state];
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n(ze, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(ze, { column: "id", children: e.id }),
    /* @__PURE__ */ n(ze, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(ze, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(ze, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(ze, { column: "next", children: /* @__PURE__ */ n("span", { className: H.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function gp({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${H.webMeta} ${H.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function yp({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(gp, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { ...vp[e.state] }) })
  ] });
}
function nC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(yp, { ...e }) : /* @__PURE__ */ n(pp, { ...e });
}
const Np = "_card_17zba_2", kp = "_head_17zba_11", $p = "_env_17zba_18", Cp = "_version_17zba_25", Sp = "_meta_17zba_32", Rp = "_webCard_17zba_37", Tp = "_webRow_17zba_47", Ep = "_webTitle_17zba_55", Lp = "_webLine_17zba_65", Ap = "_webVersion_17zba_72", xp = "_webMeta_17zba_77", U = {
  card: Np,
  head: kp,
  env: $p,
  version: Cp,
  meta: Sp,
  webCard: Rp,
  webRow: Tp,
  webTitle: Ep,
  webLine: Lp,
  webVersion: Ap,
  webMeta: xp
}, dt = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Ip({ env: e }) {
  const a = dt[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function Mp(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ce(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function qp(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...dt[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: Mp(e) })
  ] });
}
function tC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(qp, { ...e }) : /* @__PURE__ */ n(Ip, { ...e });
}
const jp = "_panel_1hmja_2", Bp = "_line_1hmja_8", Pp = "_actions_1hmja_14", ra = {
  panel: jp,
  line: Bp,
  actions: Pp
};
function rC(e) {
  return /* @__PURE__ */ o("div", { className: ra.panel, children: [
    /* @__PURE__ */ n("p", { className: ra.line, children: e.status }),
    /* @__PURE__ */ n(A, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ra.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ra.line, children: e.note ?? "" })
  ] });
}
const Op = "_upload_erepj_2", Dp = "_preview_erepj_7", Hp = "_mark_erepj_17", Fp = "_empty_erepj_22", Wp = "_actions_erepj_28", zp = "_input_erepj_33", Gp = "_reasons_erepj_41", Up = "_reason_erepj_41", Kp = "_accepted_erepj_57", te = {
  upload: Op,
  preview: Dp,
  mark: Hp,
  empty: Fp,
  actions: Wp,
  input: zp,
  reasons: Gp,
  reason: Up,
  accepted: Kp
}, ut = 1.5, ht = 22, fa = "script elements or event handlers", Se = "links or external references", Ne = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${ut}px at ${ht}px`], Vp = [Ne[1], Ne[2], fa, Se], Yp = /* @__PURE__ */ new Map([
  ["image", Ne[1]],
  ["text", Ne[2]],
  ["tspan", Ne[2]],
  ["textPath", Ne[2]],
  ["script", fa],
  ["foreignObject", fa],
  ["a", Se],
  ["use", Se],
  ["style", Se],
  ["feImage", Se],
  ["set", Se]
]), Xp = "http://www.w3.org/2000/svg", Jp = "http://www.w3.org/2000/xmlns/", Qp = /* @__PURE__ */ new Set([
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
]), Zp = /* @__PURE__ */ new Set([
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
]), eg = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, ag = /url\s*\(|['"\\]/i;
function ng() {
  return { ok: !1, reasons: [Ne[1]] };
}
function mt(e) {
  return e.namespaceURI === Xp || e.namespaceURI === null;
}
function tg(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && mt(a) ? a : null;
  } catch {
    return null;
  }
}
function rg(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ne[0]] : [];
}
function lg(e) {
  return Yp.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function og(e) {
  return ag.test(e.replace(eg, ""));
}
function ig(e) {
  return /^on/i.test(e.localName) ? fa : e.localName === "href" || og(e.value) ? Se : void 0;
}
function sg(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(lg(t));
    for (const r of Array.from(t.attributes)) a.add(ig(r));
  }
  return Vp.filter((t) => a.has(t));
}
function cg(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? ht / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < ut;
  }) ? [Ne[3]] : [];
}
function dg(e) {
  if (e.namespaceURI === Jp) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Zp.has(a) || a.startsWith("stroke"));
}
function ug(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && mt(a) && Qp.has(a.localName);
}
function hg(e, a) {
  ug(a) ? a.nodeType === Node.ELEMENT_NODE && wt(a) : e.removeChild(a);
}
function wt(e) {
  for (const a of Array.from(e.attributes)) dg(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) hg(e, a);
  return e;
}
function lC(e) {
  const a = tg(e);
  if (a === null) return ng();
  const t = [...rg(a), ...sg(a), ...cg(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(wt(a)) };
}
const mg = "Mark accepted.";
function wg({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function _g(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function fg(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function vg({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: mg }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function bg({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(vg, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${_g(e, t)}`, role: "status", children: fg(e, t) });
}
function oC({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = y(null), [i, s] = p(null), c = (d) => {
    if (d === void 0) return;
    const u = a(d);
    u instanceof Promise ? u.then(s) : s(u);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(wg, { current: e }),
    /* @__PURE__ */ o("div", { className: te.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: l,
          className: te.input,
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
    /* @__PURE__ */ n(bg, { result: i, presentation: r })
  ] });
}
const pg = "_row_1wp9s_7", gg = "_cell_1wp9s_11", yg = "_head_1wp9s_28", Ng = "_name_1wp9s_34", kg = "_pinned_1wp9s_42", $g = "_headCell_1wp9s_49", Cg = "_webName_1wp9s_88", Sg = "_webMeta_1wp9s_95", Rg = "_webWarn_1wp9s_103", q = {
  row: pg,
  cell: gg,
  head: yg,
  name: Ng,
  pinned: kg,
  headCell: $g,
  webName: Cg,
  webMeta: Sg,
  webWarn: Rg
}, Za = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, _t = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Tg = Object.fromEntries(_t.map((e) => [e.key, e]));
function Eg(e, a) {
  return `mcp.${e}.${a}`;
}
function Lg(e) {
  return Object.keys(Za).includes(e);
}
function Ag(e) {
  return Za[e !== void 0 && Lg(e) ? e : "unknown"];
}
function Ye({ column: e, children: a }) {
  const t = Tg[e];
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
function iC() {
  return /* @__PURE__ */ n("tr", { children: _t.map((e) => /* @__PURE__ */ n(
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
function xg({ server: e }) {
  const a = Za[e.connection];
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
    /* @__PURE__ */ n(Ye, { column: "tools", children: e.tools.map((t) => Eg(e.name, t)).join(" · ") })
  ] });
}
function Ig(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Mg(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function qg({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function jg({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Bg({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Pg({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Ig(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Mg(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(qg, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Ag(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n(jg, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Bg, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function sC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Pg, { ...e }) : /* @__PURE__ */ n(xg, { ...e });
}
const Og = "_row_1h9nq_2", Dg = "_headCell_1h9nq_14", Hg = "_cell_1h9nq_15", Fg = "_name_1h9nq_26", Wg = "_consequence_1h9nq_32", zg = "_reason_1h9nq_38", Gg = "_value_1h9nq_44", Ug = "_webRow_1h9nq_60", Kg = "_webSetting_1h9nq_71", Vg = "_webName_1h9nq_79", Yg = "_webConsequence_1h9nq_87", Xg = "_webControl_1h9nq_93", Jg = "_webState_1h9nq_106", Qg = "_webChip_1h9nq_111", L = {
  row: Og,
  headCell: Dg,
  cell: Hg,
  name: Fg,
  consequence: Wg,
  reason: zg,
  value: Gg,
  webRow: Ug,
  webSetting: Kg,
  webName: Vg,
  webConsequence: Yg,
  webControl: Xg,
  webState: Jg,
  webChip: Qg
}, ft = 104, vt = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Zg({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Pe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(In, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: L.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function ey({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = vt[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: L.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: L.headCell, children: [
      /* @__PURE__ */ n("span", { className: L.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: L.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: L.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(Zg, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: L.cell, style: { width: ft }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function bt(e, a) {
  return String(e ?? a);
}
function ay(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function ny(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? bt(e.value, "—");
}
function ty({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: L.webControl, children: [
    /* @__PURE__ */ n(Pe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: L.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function ry(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(ty, { ...e });
  const l = ay(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: L.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(In, { options: l, value: bt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${L.webControl} ${L.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: ny(a) });
}
function ly({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = $(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${L.row} ${L.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: L.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${L.name} ${L.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${L.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: L.webControl, children: i(s) }) : /* @__PURE__ */ n(ry, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${L.webChip} ward-policy-chip`, style: { width: ft }, children: /* @__PURE__ */ n(m, { ...vt[t], size: "tag" }) })
  ] });
}
function cC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ly, { ...e }) : /* @__PURE__ */ n(ey, { ...e });
}
const oy = "_label_1o9za_7", iy = "_name_1o9za_15", sy = "_column_1o9za_24", cy = "_webFrame_1o9za_57", dy = "_webHead_1o9za_62", uy = "_webHeadLabel_1o9za_74", hy = "_webLabel_1o9za_112", my = "_webColumns_1o9za_119", wy = "_webGroup_1o9za_125", _y = "_webPeople_1o9za_126", fy = "_webVia_1o9za_127", vy = "_webMeta_1o9za_156", F = {
  label: oy,
  name: iy,
  column: sy,
  webFrame: cy,
  webHead: dy,
  webHeadLabel: uy,
  webLabel: hy,
  webColumns: my,
  webGroup: wy,
  webPeople: _y,
  webVia: fy,
  webMeta: vy
}, by = {
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
      className: F.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function py(e) {
  if (!e.matrixRole) return;
  const a = by[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function gy({ node: e }) {
  const a = py(e);
  return /* @__PURE__ */ o("span", { className: F.label, children: [
    /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
    /* @__PURE__ */ n(yy, { role: a, node: e }),
    /* @__PURE__ */ n(Aa, { column: La[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Aa, { column: La[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Aa, { column: La[2], children: e.requestedVia ?? "" })
  ] });
}
function yy({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Ny({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ n(gy, { node: t }),
      children: s
    }
  );
}
function xa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function ky({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(xa, { className: `${F.webMeta} ${F.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(xa, { className: `${F.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(xa, { className: `${F.webMeta} ${F.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function $y() {
  return /* @__PURE__ */ o("div", { className: F.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: F.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: F.webColumns, children: [
      /* @__PURE__ */ n("span", { className: F.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: F.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: F.webVia, children: "Requested via" })
    ] })
  ] });
}
function Cy({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Sy(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Ry({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: F.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n($y, {}),
    /* @__PURE__ */ n(gc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Bn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Cy, { row: t }),
        detail: /* @__PURE__ */ n(ky, { row: t }),
        expanded: Sy(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function dC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ry, { ...e }) : /* @__PURE__ */ n(Ny, { ...e });
}
const Ty = "_runbook_b9agc_2", Ey = "_list_b9agc_7", Ly = "_step_b9agc_15", Ay = "_numeral_b9agc_21", xy = "_body_b9agc_28", Iy = "_head_b9agc_34", My = "_title_b9agc_40", qy = "_detail_b9agc_45", jy = "_actions_b9agc_50", By = "_webList_b9agc_56", Py = "_webStep_b9agc_60", Oy = "_webBody_b9agc_66", Dy = "_webTitle_b9agc_74", Hy = "_webDetail_b9agc_78", T = {
  runbook: Ty,
  list: Ey,
  step: Ly,
  numeral: Ay,
  body: xy,
  head: Iy,
  title: My,
  detail: qy,
  actions: jy,
  webList: By,
  webStep: Py,
  webBody: Oy,
  webTitle: Dy,
  webDetail: Hy
}, pt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function gt(e) {
  return String(e + 1).padStart(2, "0");
}
function Fy({ step: e, index: a, connection: t }) {
  const r = pt[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: T.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: T.numeral, children: gt(a) }),
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
function Wy({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: T.list, children: e.map((r, l) => /* @__PURE__ */ n(Fy, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: T.actions, children: a })
  ] });
}
function zy({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${T.step} ${T.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${T.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: gt(a) }),
    /* @__PURE__ */ o("span", { className: `${T.body} ${T.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${T.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${T.title} ${T.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...pt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${T.detail} ${T.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function Gy({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${T.list} ${T.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(zy, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${T.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function uC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Gy, { ...e }) : /* @__PURE__ */ n(Wy, { ...e });
}
const Uy = "_list_1gu6a_2", Ky = "_check_1gu6a_10", Vy = "_body_1gu6a_16", Yy = "_text_1gu6a_23", Xy = "_pending_1gu6a_32", Jy = "_measured_1gu6a_37", Ue = {
  list: Uy,
  check: Ky,
  body: Vy,
  text: Yy,
  pending: Xy,
  measured: Jy
};
function Qy(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Zy({ check: e }) {
  const a = Qy(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Ue.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Ka, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Ue.body, children: [
      /* @__PURE__ */ n("span", { className: Ue.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Ue.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Ue.measured, children: e.measured })
  ] });
}
function hC({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Zy, { check: a }, a.text)) });
}
const eN = "_root_khinh_2", aN = "_list_khinh_10", nN = "_line_khinh_21", tN = "_at_khinh_48", rN = "_text_khinh_52", lN = "_foot_khinh_56", oN = "_idle_khinh_68", iN = "_caret_khinh_76", sN = "_jump_khinh_83", me = {
  root: eN,
  list: aN,
  line: nN,
  at: tN,
  text: rN,
  foot: lN,
  idle: oN,
  caret: iN,
  jump: sN
}, cN = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function en(e) {
  return Number.isNaN(Date.parse(e)) ? "" : cN.format(new Date(e));
}
const dN = { warn: "warning", ok: "ok" };
function uN({ kind: e }) {
  const a = dN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function hN({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${en(e)}` });
}
function mN({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${en(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: me.idle, children: i }),
    /* @__PURE__ */ n(hN, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const wN = 8;
function _N(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > wN;
}
function fN({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const yt = De(null);
function mC({ announce: e, onAnnounceChange: a, children: t }) {
  const [r, l] = p(!1), i = Rn(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ n(yt.Provider, { value: i, children: t });
}
function vN() {
  const e = Oe(yt), [a, t] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, t];
}
function wC({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = y(null), [i, s] = p(0), [c, d] = vN(), [u, h] = p(!1), f = e.at(-1);
  x(() => {
    s(e.length);
  }, [e.length]), Ha(() => {
    const g = l.current;
    g && !u && (g.scrollTop = g.scrollHeight);
  }, [e.length, u]);
  const b = () => {
    var D;
    const g = l.current;
    if (!g) return;
    const I = g.querySelectorAll("[data-consline-text]");
    (D = I.item(I.length - 1)) == null || D.focus(), h(!1);
  };
  return /* @__PURE__ */ o("div", { className: me.root, children: [
    /* @__PURE__ */ n("ol", { className: me.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (g) => h(_N(g.currentTarget)), children: e.map((g, I) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${g.kind}`, "data-kind": g.kind, "data-revealed": I < i, children: [
      /* @__PURE__ */ n("span", { className: me.at, children: en(g.at) }),
      /* @__PURE__ */ n(uN, { kind: g.kind }),
      /* @__PURE__ */ n("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: g.text })
    ] }, `${g.at}-${I}`)) }),
    /* @__PURE__ */ o(mN, { connection: a, idleSince: t, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ n(fN, { shown: u, onJump: b })
    ] })
  ] });
}
const bN = "_row_11jhe_2", pN = "_head_11jhe_14", gN = "_author_11jhe_20", yN = "_eta_11jhe_25", NN = "_edited_11jhe_26", kN = "_body_11jhe_32", $N = "_reason_11jhe_37", CN = "_actions_11jhe_42", be = {
  row: bN,
  head: pN,
  author: gN,
  eta: yN,
  edited: NN,
  body: kN,
  reason: $N,
  actions: CN
}, SN = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function RN(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function TN({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function EN({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: be.reason, id: a, children: e })
  ] });
}
function LN(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function AN(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(TN, { ...e }) : /* @__PURE__ */ n(EN, { reason: e.unavailable, reasonId: e.unavailableId });
}
function _C(e) {
  const { comment: a } = e;
  LN(e);
  const t = $(), r = `${t}-unavailable`, l = SN[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${be.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: be.head, children: [
      /* @__PURE__ */ n("span", { className: be.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: be.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: be.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: be.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: be.reason, id: t, children: RN(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: be.actions, children: /* @__PURE__ */ n(AN, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const xN = "_root_c46wj_2", IN = "_attach_c46wj_11", MN = "_actions_c46wj_17", qN = "_reply_c46wj_23", jN = "_replyRow_c46wj_28", BN = "_sendsAs_c46wj_42", Ve = {
  root: xN,
  attach: IN,
  actions: MN,
  reply: qN,
  replyRow: jN,
  sendsAs: BN
};
function PN({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = p(""), i = $();
  return /* @__PURE__ */ o("div", { className: Ve.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ve.replyRow, children: [
      /* @__PURE__ */ n(A, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(_, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ve.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function fC(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(PN, { ...e }) : /* @__PURE__ */ n(ON, { ...e });
}
function ON({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [s, c] = p("");
  return /* @__PURE__ */ o("div", { className: Ve.root, children: [
    /* @__PURE__ */ n(A, { kind: "textarea", label: e, value: s, onChange: c }),
    t && /* @__PURE__ */ o("div", { className: Ve.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      An,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Ve.actions, children: [
      /* @__PURE__ */ n(_, { variant: "primary", onClick: () => l(a, s), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(_, { variant: "ghost", onClick: () => i(s), children: "Save draft" })
    ] })
  ] });
}
const DN = "_list_1ih9e_2", HN = "_item_1ih9e_6", FN = "_body_1ih9e_22", WN = "_text_1ih9e_28", zN = "_evidence_1ih9e_37", GN = "_consequence_1ih9e_49", UN = "_note_1ih9e_54", Be = {
  list: DN,
  item: HN,
  body: FN,
  text: WN,
  evidence: zN,
  consequence: GN,
  note: UN
};
function KN({ criterion: e }) {
  return /* @__PURE__ */ n(Le, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function kn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function VN(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function YN({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Be.body, children: [
    /* @__PURE__ */ n("span", { className: Be.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(kn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Be.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(kn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Be.consequence, children: VN(e.why) })
    ] })
  ] });
}
function XN({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Be.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(KN, { criterion: e }),
    /* @__PURE__ */ n(YN, { criterion: e })
  ] });
}
function vC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Be.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(XN, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Be.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const JN = "_list_dwhoz_2", QN = "_rung_dwhoz_6", ZN = "_name_dwhoz_18", ek = "_actor_dwhoz_32", ia = {
  list: JN,
  rung: QN,
  name: ZN,
  actor: ek
}, ak = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function nk({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = ak[e.state];
  return /* @__PURE__ */ o("li", { className: ia.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ia.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ia.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function bC({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ia.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(nk, { rung: a }, a.name)) });
}
const tk = "_sheet_1fqco_2", rk = "_title_1fqco_9", lk = "_stage_1fqco_15", ok = "_effects_1fqco_20", ik = "_effect_1fqco_20", sk = "_numeral_1fqco_31", ck = "_effectText_1fqco_38", dk = "_refusals_1fqco_43", uk = "_reasons_1fqco_52", hk = "_reason_1fqco_52", mk = "_actions_1fqco_62", ue = {
  sheet: tk,
  title: rk,
  stage: lk,
  effects: ok,
  effect: ik,
  numeral: sk,
  effectText: ck,
  refusals: dk,
  reasons: uk,
  reason: hk,
  actions: mk
};
function wk({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function pC({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      os,
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
    f && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((b, g) => /* @__PURE__ */ n("li", { className: ue.reason, id: g === 0 ? d : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(wk, { refused: f, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const _k = "_list_1hvqu_2", fk = "_path_1hvqu_7", vk = "_head_1hvqu_21", bk = "_label_1hvqu_28", pk = "_consequence_1hvqu_35", gk = "_ask_1hvqu_36", Ke = {
  list: _k,
  path: fk,
  head: vk,
  label: bk,
  consequence: pk,
  ask: gk
}, Oa = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function $n(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Cn(e) {
  return e ? "primary" : "secondary";
}
function yk({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(_, { variant: Cn(a), size: "sm", onClick: () => t(e.kind), children: Oa[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: Cn(a), size: "sm", disabled: !0, describedBy: r, children: Oa[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ke.ask, id: r, children: e.askInstead })
  ] });
}
function Nk({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ke.path, "data-allowed": e.allowed, "data-role": $n(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ke.head, children: [
      /* @__PURE__ */ n("span", { className: Ke.label, children: e.title ?? Oa[e.kind] }),
      /* @__PURE__ */ n(m, { role: $n(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ke.consequence, children: e.consequence }),
    /* @__PURE__ */ n(yk, { path: e, primary: a, onChoose: t })
  ] });
}
function gC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ke.list, children: e.map((t, r) => /* @__PURE__ */ n(Nk, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const kk = "_list_1nyt1_2", $k = "_item_1nyt1_6", Ck = "_node_1nyt1_18", Sk = "_body_1nyt1_24", Rk = "_head_1nyt1_30", Tk = "_stage_1nyt1_36", Ek = "_version_1nyt1_41", Lk = "_sentence_1nyt1_49", Ak = "_meta_1nyt1_54", ge = {
  list: kk,
  item: $k,
  node: Ck,
  body: Sk,
  head: Rk,
  stage: Tk,
  version: Ek,
  sentence: Lk,
  meta: Ak
}, xk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Ik({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function Mk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(Le, { size: 9, kind: xk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Ik, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${ce(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function yC({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Mk, { entry: a }, a.stage + String(t))) });
}
const qk = "_thread_1kn6s_3", jk = "_turn_1kn6s_8", Bk = "_who_1kn6s_27", Pk = "_body_1kn6s_32", sa = {
  thread: qk,
  turn: jk,
  who: Bk,
  body: Pk
}, Nt = De(!1);
function NC({ children: e, density: a }) {
  return /* @__PURE__ */ n(Nt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${sa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function kC({ turn: e }) {
  if (!Oe(Nt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${sa.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${sa.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ce(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${sa.body} ward-chat-body`, children: e.body })
  ] });
}
const Ok = "_list_1rt9c_3", Dk = "_row_1rt9c_7", Hk = "_label_1rt9c_20", Fk = "_n_1rt9c_26", Wk = "_cause_1rt9c_33", Qe = {
  list: Ok,
  row: Dk,
  label: Hk,
  n: Fk,
  cause: Wk
};
function zk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Gk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Uk({ row: e, formatNumber: a }) {
  return zk(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Le, { size: 8, ...Gk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Kk, { cause: e.cause })
  ] });
}
function Kk({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function $C({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(Uk, { row: t, formatNumber: a }, t.label)) });
}
const Vk = "_root_1jxwp_2", Yk = {
  root: Vk
};
function CC({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: Yk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ca, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const Xk = "_row_dhbre_3", Jk = "_key_dhbre_13", Qk = "_stack_dhbre_24", Zk = "_value_dhbre_32", e1 = "_evidence_dhbre_39", a1 = "_mark_dhbre_47", Ge = {
  row: Xk,
  key: Jk,
  stack: Qk,
  value: Zk,
  evidence: e1,
  mark: a1
};
function n1({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ka, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function SC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ge.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Ge.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ge.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Ge.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Ge.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Ge.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(n1, { state: e.state }) })
  ] });
}
const t1 = "_cell_1monp_2", r1 = {
  cell: t1
}, l1 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function o1(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function i1(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function s1(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: o1(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function c1(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function RC({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  i1(e, t);
  const r = c1(e);
  return /* @__PURE__ */ n(
    gs,
    {
      label: "Rejection routing",
      columns: l1,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: r1.cell, "data-norerun": l.noRerun ? !0 : void 0, children: s1(l, i) }),
      empty: a ?? /* @__PURE__ */ n(ld, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const d1 = "_row_ute8v_2", u1 = "_title_ute8v_11", h1 = "_turns_ute8v_20", m1 = "_waiting_ute8v_21", w1 = "_resolved_ute8v_22", _1 = "_activity_ute8v_23", f1 = "_cost_ute8v_29", v1 = "_link_ute8v_30", b1 = "_tableRow_ute8v_47", p1 = "_tableTitle_ute8v_59", g1 = "_tableResolved_ute8v_64", y1 = "_tableLink_ute8v_68", N1 = "_tableMeta_ute8v_83", k1 = "_tableCost_ute8v_90", $1 = "_tableActivity_ute8v_91", C1 = "_tableState_ute8v_101", S1 = "_tableRecord_ute8v_112", P = {
  row: d1,
  title: u1,
  turns: h1,
  waiting: m1,
  resolved: w1,
  activity: _1,
  cost: f1,
  link: v1,
  tableRow: b1,
  tableTitle: p1,
  tableResolved: g1,
  tableLink: y1,
  tableMeta: N1,
  tableCost: k1,
  tableActivity: $1,
  tableState: C1,
  tableRecord: S1
}, kt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function R1(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function T1(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function E1(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const L1 = { duplicate: "CLOSED · DUPLICATE" };
function A1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: P.tableMeta, children: `waiting on ${e}` });
}
function x1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: P.tableCost, children: e === void 0 ? null : re(e) });
}
function I1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${P.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function M1({ session: e, href: a }) {
  const t = kt[e.state];
  return /* @__PURE__ */ o("tr", { className: P.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: P.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${P.tableLink} ward-target`, href: W(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: P.tableMeta, children: T1(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: P.tableResolved, children: [
      E1(e.resolved),
      /* @__PURE__ */ n(A1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(x1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: P.tableActivity, children: R1(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: P.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: L1[e.state] ?? t.label }),
      /* @__PURE__ */ n(I1, { link: e.link })
    ] }) })
  ] });
}
function q1({ session: e }) {
  const a = kt[e.state];
  return /* @__PURE__ */ o("div", { className: P.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: P.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: P.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: P.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: P.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: P.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ n("span", { className: P.activity, children: ce(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: P.link, href: W(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function TC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(M1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(q1, { session: e.session });
}
const j1 = "_block_1yy2v_3", B1 = "_list_1yy2v_9", P1 = "_line_1yy2v_14", Da = {
  block: j1,
  list: B1,
  line: P1
}, O1 = { warn: "warning", ok: "ok" };
function D1({ kind: e }) {
  const a = O1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function H1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Da.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(D1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function EC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Da.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Da.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(H1, { line: t }, `${r}-${t.text}`)) }) });
}
const F1 = "_band_tt7hp_1", W1 = "_head_tt7hp_8", z1 = "_cell_tt7hp_19", G1 = "_index_tt7hp_35", U1 = "_title_tt7hp_42", K1 = "_note_tt7hp_48", V1 = "_cellTitle_tt7hp_53", Y1 = "_cellBody_tt7hp_58", X1 = "_tag_tt7hp_64", ve = {
  band: F1,
  head: W1,
  cell: z1,
  index: G1,
  title: U1,
  note: K1,
  cellTitle: V1,
  cellBody: Y1,
  tag: X1
}, Sn = 4;
function LC({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== Sn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Sn}-cell grid`);
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
  v$ as ActionStack,
  wC as ActivityConsole,
  pm as AgentCard,
  c$ as AppShell,
  Q$ as AppearanceStrip,
  LC as Band,
  w$ as BarChart,
  Dd as BoardColumn,
  x$ as BoardFootnote,
  I$ as BoardHeader,
  $$ as BoardScroller,
  _ as Btn,
  l$ as CHIP_ROLES,
  ct as CREDENTIAL_COLUMNS,
  m$ as Callout,
  Z$ as CapabilityRow,
  kC as ChatMessage,
  An as Checkbox,
  m as Chip,
  _C as ClarificationRow,
  W$ as ClauseRuleRow,
  F$ as ClauseRules,
  Wn as ColourLadder,
  eC as ComponentRow,
  fC as Composer,
  q$ as ConfigRow,
  M$ as ConfigRowHead,
  Va as ConnectionMark,
  mC as ConsoleAnnounceProvider,
  NC as Conversation,
  os as CostMeter,
  nC as CredentialRow,
  aC as CredentialRowHead,
  vC as CriteriaList,
  fl as Crumb,
  $C as DeliveryHealth,
  R$ as DeniedState,
  z$ as DryRunRail,
  ld as EmptyState,
  tC as EnvCard,
  A as Field,
  S$ as FilteredEmpty,
  N$ as FormStack,
  Ca as GateChecklist,
  bC as GateLadder,
  gs as Grid,
  U$ as HandoffRuleRow,
  G$ as HandoffRules,
  j$ as ItemDrawer,
  rC as KeyPanel,
  Dt as LIVE_EVENT_TYPES,
  Hh as LegacyBoardColumn,
  P$ as LegacyBoardHeader,
  O$ as LegacyConfigRow,
  H$ as LegacyItemDrawer,
  Mh as LegacyOverCapNote,
  D$ as LegacyPreviewRail,
  Dn as LegacyWorkCard,
  ke as LiveIndicator,
  T$ as LoadFailed,
  A$ as Loading,
  _t as MCP_SERVER_COLUMNS,
  Ka as Mark,
  oC as MarkUpload,
  Le as Marker,
  sC as McpServerRow,
  iC as McpServerRowHead,
  K$ as NewStreamModal,
  sd as OverCapNote,
  ea as Overlay,
  Ym as PARTIAL_STEP_REASON,
  ft as POLICY_CHIP_WIDTH,
  p$ as PageFrame,
  h$ as PageHeader,
  _$ as PlainList,
  cC as PolicyRow,
  B$ as PreviewRail,
  La as ROLE_MATRIX_COLUMNS,
  at as RULE_ACTIONS,
  qn as Radio,
  CC as ReadyChecklist,
  y$ as RecordSection,
  pC as RequeueSheet,
  gC as ResolveBlock,
  SC as ResolvedFieldRow,
  dC as RoleMatrixRow,
  RC as RoutingTable,
  V$ as RuleRow,
  uC as RunbookSteps,
  Pt as STREAM_STEPS,
  k$ as SectionBand,
  hn as SectionHeader,
  In as SegmentedControl,
  TC as SessionRow,
  u$ as Sidebar,
  Y$ as StageColumn,
  C$ as StageGrid,
  yC as StageHistory,
  Q_ as StageListEditor,
  E$ as StaleStrip,
  Na as StatStrip,
  X$ as StreamRow,
  g$ as SubjectRail,
  Pe as Switch,
  f$ as TableHead,
  d$ as Tabs,
  J$ as ToolRow,
  b$ as TopBar,
  gc as Tree,
  Bn as TreeRow,
  EC as TypedInputBlock,
  jr as UNSAFE_HREF,
  hC as ValidationList,
  e$ as VisibilityProvider,
  a$ as Visible,
  r$ as WARD_VERSION,
  $a as WorkCard,
  L$ as WriteUnavailableStrip,
  R1 as agoSince,
  Lt as clock,
  ff as colourStatus,
  ae as count,
  se as duration,
  Fa as elapsed,
  t$ as eventSourceTransport,
  ba as isStreamStep,
  pa as isValidatedStreamStep,
  Xm as ladderValidation,
  Ag as mcpConnectionChip,
  Eg as mcpToolName,
  re as money,
  we as ms,
  Pn as ordered,
  Tn as ratio,
  rp as restartLabel,
  W as safeHref,
  ce as stamp,
  Ln as stream,
  i$ as streamChip,
  ya as streamChipProps,
  Ee as streamColour,
  Ft as streamHex,
  o$ as streamVars,
  la as useBorderFlash,
  qt as useFocusTrap,
  s$ as useLiveFeed,
  n$ as useReturnFocus,
  va as useRovingTabindex,
  Wa as useTicker,
  At as useVisible,
  G as v,
  lC as validateMark,
  ga as validatedStep,
  Ot as validatedStreamSteps
};
