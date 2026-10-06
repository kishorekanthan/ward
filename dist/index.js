import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as En, useContext as je, createContext as He, useCallback as X, useEffect as I, useState as g, useRef as p, useLayoutEffect as Wa, useId as $, isValidElement as xt, Children as At, Fragment as It } from "react";
import { createPortal as Mt } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const rn = (e) => String(e).padStart(2, "0");
function za(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${rn(a % 60)}s` : `${Math.floor(t / 60)}h ${rn(t % 60)}m`;
}
const qt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ce(e) {
  const a = qt.formatToParts(new Date(e)), t = (r) => {
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
function xn(e, a) {
  return `${e} / ${a}`;
}
const Pt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Bt(e) {
  return Pt.format(new Date(e));
}
const An = He(/* @__PURE__ */ new Set());
function f$({ hidden: e, children: a }) {
  const t = En(() => new Set(e), [e]);
  return /* @__PURE__ */ n(An.Provider, { value: t, children: a });
}
function Ot(e) {
  return !je(An).has(e);
}
function v$({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(S, { children: Ot(e) ? a : t });
}
const Dt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function jt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function Ht(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = jt(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Ft(e) {
  return { onKeyDown: X(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Dt));
      Ht(t, e.current, r);
    },
    [e]
  ) };
}
function b$(e, a = !0) {
  I(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const ln = { ArrowUp: -1, ArrowDown: 1 }, on = { ArrowLeft: -1, ArrowRight: 1 }, Wt = (e, a, t) => Math.min(t, Math.max(a, e));
function zt(e, a) {
  if (a !== "horizontal" && e in ln) return ln[e];
  if (a !== "vertical" && e in on) return on[e];
}
function Na({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = p(/* @__PURE__ */ new Map()), l = p(!1);
  Wa(() => {
    var v;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const h = d[0], f = l.current;
    l.current = !1, t(h), f && ((v = r.current.get(h)) == null || v.focus());
  });
  const i = X((d) => t(d), []), s = X((d) => {
    var h;
    t(d), (h = r.current.get(d)) == null || h.focus();
  }, []), c = X(
    (d) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const f = Math.max(0, h.indexOf(a)), v = zt(d.key, e);
      v !== void 0 ? (d.preventDefault(), s(h[Wt(f + v, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), s(h[0])) : d.key === "End" && (d.preventDefault(), s(h[h.length - 1]));
    },
    [a, s, e]
  ), u = X(
    (d) => ({
      tabIndex: d === a ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(d, h) : (r.current.delete(d), d === a && (l.current = !0));
      },
      onFocus: () => t(d),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: c }, itemProps: u, setActive: i };
}
const g$ = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, p$ = "0.2.0", N$ = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Gt = [1, 2, 3, 4, 5, 6], In = [1, 2, 3], Ut = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
  color: {
    bg: "var(--ward-color-bg)",
    surface: "var(--ward-color-surface)",
    surface2: "var(--ward-color-surface2)",
    line: "var(--ward-color-line)",
    line2: "var(--ward-color-line2)",
    edge: "var(--ward-color-edge)",
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
function Mn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function ya(e) {
  return Gt.includes(e);
}
function ka(e) {
  return In.includes(e);
}
function y$(e) {
  if (!ya(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function k$(e) {
  if (!ya(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Kt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Vt(e) {
  if (!ya(e)) throw new Error("unvalidated stream step");
  return Kt[e];
}
function sn(e) {
  return typeof e != "string" ? null : Ut.includes(e) ? e : null;
}
function Yt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Xt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Jt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Qt(e, a, t) {
  const r = Yt(e);
  if (r === null) return null;
  const l = sn(t) ?? sn(r.type);
  return l === null ? null : { ...r, type: l, id: Xt(r, a), at: Jt(r) };
}
function Zt(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function er(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function $$(e, a) {
  const [t, r] = g("reconnecting"), [l, i] = g(null), s = p(/* @__PURE__ */ new Map()), c = p(0), u = p(""), d = p(0), h = p(null), f = p(0), v = p(0), N = p(!1), E = p("reconnecting"), q = X((C) => {
    E.current = C, r(C);
  }, []), oe = X(() => {
    c.current = Date.now();
  }, []), Ce = X((C) => {
    for (const [z, ve] of s.current)
      (ve === "*" || C.itemKey === ve) && z(C);
  }, []), ne = X(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: (C, z, ve) => {
        const Ae = Qt(C, z, ve);
        Ae !== null && (Ae.id && (u.current = Ae.id), oe(), N.current = !1, q("live"), i(Ae.at), Ce(Ae));
      },
      onOpen: () => {
        d.current = 0, N.current = !1, oe(), q("live");
      },
      onError: () => {
        var z;
        (z = h.current) == null || z.close(), h.current = null, N.current = !0, E.current !== "stale" && q("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** d.current, we.reconnectMax);
        d.current += 1, f.current = window.setTimeout(ne, C);
      }
    });
  }, [Ce, q, oe, a, e]), Fe = X((C) => {
    N.current = !0, C.close(), h.current = null, f.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), We = X((C, z) => (s.current.set(z, C), () => {
    s.current.delete(z);
  }), []);
  return I(() => (ne(), v.current = window.setInterval(() => {
    const C = Date.now() - c.current, z = Zt(C, E.current);
    z && q(z);
    const ve = h.current;
    er(C, N.current, ve) && Fe(ve);
  }, we.tick), () => {
    var C;
    window.clearInterval(v.current), window.clearTimeout(f.current), N.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [ne, Fe, q]), { connection: t, lastEventAt: l, subscribe: We };
}
function Ga(e, a) {
  const t = new Date(e).getTime(), [r, l] = g(() => Date.now());
  return I(() => {
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
function ar() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function cn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function sa(e, a) {
  const t = p(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (ar() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), s.style.setProperty("--flash", `var(--ward-color-${i})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => cn(s), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => cn(s), we.flash)));
  }, [a, e]);
  return I(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const nr = "_root_1otpc_2", tr = {
  root: nr
};
function rr(e, a, t, r, l) {
  const i = [za(a)];
  return e || i.push(`as of ${Bt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function $e({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Ga(e, l), s = (a == null ? void 0 : a.at) ?? e, c = rr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${tr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ce(e)
    ] })
  ] });
}
const lr = "_app_40mlx_1", or = "_side_40mlx_18", ir = "_main_40mlx_26", sr = "_rail_40mlx_33", cr = "_page_40mlx_40", dr = "_root_40mlx_91", ur = "_topbar_40mlx_98", hr = "_mark_40mlx_109", mr = "_brand_40mlx_116", wr = "_tagline_40mlx_122", _r = "_identity_40mlx_128", fr = "_tools_40mlx_129", vr = "_metadata_40mlx_138", br = "_actor_40mlx_153", gr = "_detail_40mlx_154", pr = "_nav_40mlx_159", Nr = "_content_40mlx_208", yr = "_toolsPanel_40mlx_224", kr = "_skip_40mlx_250", M = {
  app: lr,
  side: or,
  main: ir,
  rail: sr,
  page: cr,
  root: dr,
  topbar: ur,
  mark: hr,
  brand: mr,
  tagline: wr,
  identity: _r,
  tools: fr,
  metadata: vr,
  actor: br,
  detail: gr,
  nav: pr,
  content: Nr,
  toolsPanel: yr,
  skip: kr
}, $r = "_btn_10gi7_2", Cr = "_primary_10gi7_13", Sr = "_destructive_10gi7_24", Rr = "_secondary_10gi7_34", Tr = "_ghost_10gi7_39", Lr = "_overflow_10gi7_48", Er = "_sm_10gi7_55", xr = "_disabled_10gi7_59", ra = {
  btn: $r,
  primary: Cr,
  destructive: Sr,
  secondary: Rr,
  ghost: Tr,
  overflow: Lr,
  sm: Er,
  disabled: xr
};
function Ar(e, a, t, r) {
  const l = a === "sm" ? [ra.sm, "ward-btn--sm"] : [], i = t ? [ra.disabled] : [];
  return [ra.btn, ra[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Ir(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Mr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function qr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Pr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Br(e, a, t) {
  return Pr(e.describedBy, a && t);
}
function Or({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Dr(e) {
  return e.children ?? e.label;
}
function _(e) {
  Mr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = qr(e), i = $();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Ar(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": Br(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Ir(a, e.controls),
        children: Dr(e)
      }
    ),
    /* @__PURE__ */ n(Or, { id: i, reason: l })
  ] });
}
const jr = /^([a-z][a-z0-9+.-]*):/i, Hr = /* @__PURE__ */ new Set(["http", "https"]), Fr = "#";
function Wr(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = jr.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = Wr(e);
  return a === void 0 || Hr.has(a) ? e : Fr;
}
function zr(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function qn(e) {
  const a = zr(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function aa(e, a, t) {
  I(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const s = qn(r);
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
function Gr(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Ua(e, a, t) {
  Wa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(t)[a];
    if (!r || !l) return;
    const i = Gr(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), qn(r);
  }, [e, a, t]);
}
function Ka(e) {
  const [a, t] = g(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return I(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => t(s.matches);
    return r.addEventListener("change", l), t(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function Ur({ sidebar: e, header: a, children: t, rail: r }) {
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
function Kr({ destinations: e, active: a }) {
  const t = p(null);
  return aa(t, e.length), Ua(t, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ n("nav", { ref: t, className: M.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ n("a", { href: W(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Pa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Vr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(Pa, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Pa, { value: a, className: M.detail })
  ] });
}
function Yr() {
  const e = Ka("(max-width: 767.98px)"), a = $(), t = p(null), [r, l] = g(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Xr({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: M.tools, children: /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: M.tools, children: e });
}
function Jr({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function Qr(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ n("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Pa, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ n(Kr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(Vr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Xr, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Zr(e) {
  const a = $(), t = Yr();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Qr, { ...e, menu: t }),
    /* @__PURE__ */ n(Jr, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function el(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function C$(e) {
  return el(e) ? /* @__PURE__ */ n(Ur, { ...e }) : /* @__PURE__ */ n(Zr, { ...e });
}
function Va(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const al = "_root_o4yib_2", nl = "_row_o4yib_8", tl = "_box_o4yib_14", rl = "_label_o4yib_21", ll = "_lockedNote_o4yib_26", ol = "_consequence_o4yib_34", il = "_sample_o4yib_69", qe = {
  root: al,
  row: nl,
  box: tl,
  label: rl,
  lockedNote: ll,
  consequence: ol,
  sample: il
};
function sl(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function cl({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${qe.consequence} ward-check-consequence`, children: a }) : null;
}
function dl({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${qe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function ul({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.sample, "aria-hidden": "true", children: e }) : null;
}
function Pn(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = sl(e);
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: qe.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${qe.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, l.target.checked));
          },
          "aria-describedby": Va(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: qe.label, children: [
        e.label,
        /* @__PURE__ */ n(dl, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(ul, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(cl, { id: t, text: e.consequence })
  ] });
}
const hl = "_chip_1073r_2", ml = {
  chip: hl
}, wl = {
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
function _l(e, a) {
  if (e === "stream") return fl(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = wl[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function fl(e) {
  if (!e || !ka(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Mn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${ml.chip} ward-chip ward-chip--${e}`, style: _l(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function na(e) {
  return typeof e == "number" && ka(e) ? e : null;
}
function fe(e, a) {
  const t = na(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function $a(e, a) {
  const t = na(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const vl = "_nav_j90m2_2", bl = "_list_j90m2_8", gl = "_item_j90m2_15", pl = "_link_j90m2_30", Nl = "_sep_j90m2_40", yl = "_current_j90m2_44", kl = "_chips_j90m2_48", Ie = {
  nav: vl,
  list: bl,
  item: gl,
  link: pl,
  sep: Nl,
  current: yl,
  chips: kl
};
function $l({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ie.nav, children: [
    /* @__PURE__ */ n("ol", { className: Ie.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: Ie.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Ie.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${Ie.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Ie.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Ie.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const Cl = "_field_1rrfu_2", Sl = "_label_1rrfu_8", Rl = "_labelHidden_1rrfu_15", Tl = "_control_1rrfu_25", Ll = "_mono_1rrfu_44", El = "_area_1rrfu_49", xl = "_invalid_1rrfu_56", Ee = {
  field: Cl,
  label: Sl,
  labelHidden: Rl,
  control: Tl,
  mono: Ll,
  area: El,
  invalid: xl
}, Al = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function Il({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? Al : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function Ml({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function ql({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Pl = { input: Il, select: Ml, textarea: ql };
function Bl(e, a, t) {
  const r = Pl[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Ol(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Va(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function Dl(e) {
  const a = e.mono ? [Ee.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Ee.area] : [];
  return [Ee.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function jl(e) {
  return e ? `${Ee.label} ${Ee.labelHidden} ward-field-label` : `${Ee.label} ward-field-label`;
}
function A(e) {
  const a = $(), t = `${a}-msg`, r = Ol(e, a, t), l = Dl(e);
  return /* @__PURE__ */ o("div", { className: `${Ee.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: jl(e.labelHidden), htmlFor: a, children: e.label }),
    Bl(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Ee.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Hl = "_strip_kancu_2", Fl = "_tab_kancu_32", Wl = "_count_kancu_75", Ze = {
  strip: Hl,
  tab: Fl,
  count: Wl
}, ha = 7;
function zl(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Bn(e) {
  return `${Ze.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function S$({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ha) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ha} — the set is fixed`);
  const i = Na({ orientation: "horizontal" }), s = zl(e, a);
  I(() => i.setActive(s), [i.setActive, s]);
  const c = p(null);
  return aa(c, e.length), Ua(c, s, '[role="tab"]'), /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      className: Bn(l),
      role: "tablist",
      "aria-label": r,
      "data-level": l,
      ...i.containerProps,
      children: e.map((u, d) => /* @__PURE__ */ o(
        "button",
        {
          id: `tab-${u.id}`,
          type: "button",
          role: "tab",
          className: `${Ze.tab} ward-tab`,
          "aria-selected": u.id === a,
          "aria-controls": `panel-${u.id}`,
          onClick: () => t(u.id),
          ...i.itemProps(d),
          children: [
            u.label,
            u.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: Ze.count, children: `· ${u.count}` })
            ] })
          ]
        },
        u.id
      ))
    }
  );
}
function R$({ links: e, active: a, label: t, level: r = 1 }) {
  if (e.length > ha) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ha} — the set is fixed`);
  const l = p(null);
  return aa(l, e.length), Ua(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ n("nav", { ref: l, className: Bn(r), "aria-label": t, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${Ze.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Ze.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Gl = "_root_t3lk3_2", Ul = "_segment_t3lk3_7", dn = {
  root: Gl,
  segment: Ul
};
function On({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Na({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((u) => u.value === a));
  return I(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${dn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: dn.segment,
      "aria-checked": u.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => t(u.value),
      ...s.itemProps(d),
      children: u.label
    },
    u.value
  )) });
}
const Kl = "_sidebar_1g24y_3", Vl = "_brand_1g24y_9", Yl = "_mark_1g24y_17", Xl = "_word_1g24y_24", Jl = "_nav_1g24y_30", Ql = "_navItem_1g24y_38", Zl = "_group_1g24y_50", eo = "_groupName_1g24y_57", ao = "_agents_1g24y_70", no = "_agent_1g24y_70", to = "_agentTop_1g24y_88", ro = "_dot_1g24y_95", lo = "_agentName_1g24y_107", oo = "_agentMeta_1g24y_120", io = "_foot_1g24y_126", so = "_footName_1g24y_132", co = "_footLinks_1g24y_139", uo = "_footLink_1g24y_139", ho = "_root_1g24y_153", mo = "_linkBrand_1g24y_162", wo = "_label_1g24y_183", _o = "_note_1g24y_188", fo = "_footer_1g24y_202", R = {
  sidebar: Kl,
  brand: Vl,
  mark: Yl,
  word: Xl,
  nav: Jl,
  navItem: Ql,
  group: Zl,
  groupName: eo,
  new: "_new_1g24y_64",
  agents: ao,
  agent: no,
  agentTop: to,
  dot: ro,
  agentName: lo,
  agentMeta: oo,
  foot: io,
  footName: so,
  footLinks: co,
  footLink: uo,
  root: ho,
  linkBrand: mo,
  label: wo,
  note: _o,
  footer: fo
};
function vo({ agent: e }) {
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
              style: { "--dot": Mn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: R.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: R.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function bo({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: R.foot, children: [
    /* @__PURE__ */ n("span", { className: R.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: R.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: `${R.footLink} ward-target`, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function go({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: R.agents, children: r.map((s) => /* @__PURE__ */ n(vo, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(bo, { shared: i })
  ] });
}
function po(e) {
  return e.destinations ?? e.items ?? [];
}
function No({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.linkBrand, children: e });
}
function yo({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.footer, children: e });
}
function ko({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: R.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: R.note, children: e.note })
  ] });
}
function $o(e) {
  return /* @__PURE__ */ o("aside", { className: `${R.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(No, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: po(e).map((a) => /* @__PURE__ */ n(ko, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(yo, { children: e.children })
  ] });
}
function Co(e) {
  return "agents" in e;
}
function T$(e) {
  return Co(e) ? /* @__PURE__ */ n(go, { ...e }) : /* @__PURE__ */ n($o, { ...e });
}
const So = "_mark_wlgi8_3", Ro = {
  mark: So
}, To = { met: "✓", unmet: "", failed: "✕" };
function Ya({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Ro.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: To[e]
    }
  );
}
const Lo = "_marker_br9fi_2", Eo = {
  marker: Lo
}, xo = {
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
  const r = { "--marker": xo[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Eo.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Ao = "_root_ti0pq_2", Io = "_chip_ti0pq_11", Mo = "_noCase_ti0pq_23", la = {
  root: Ao,
  chip: Io,
  noCase: Mo
};
function qo(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Xa({ connection: e, since: a, lastEventAt: t }) {
  const r = qo(a, t), l = Ga(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${la.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(xe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${la.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: la.noCase, children: za(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${la.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ce(r)
  ] });
}
const Po = "_root_16ud8_2", Bo = "_context_16ud8_12", Oo = "_row_16ud8_1", Do = "_heading_16ud8_25", jo = "_headingWrap_16ud8_33", Ho = "_chips_16ud8_38", Fo = "_title_16ud8_45", Wo = "_consequence_16ud8_54", zo = "_actionsWrap_16ud8_59", Go = "_actions_16ud8_59", Uo = "_action_16ud8_59", Ko = "_overflowPanel_16ud8_85", Vo = "_measureClip_16ud8_96", Yo = "_measure_16ud8_96", Z = {
  root: Po,
  context: Bo,
  row: Oo,
  heading: Do,
  headingWrap: jo,
  chips: Ho,
  title: Fo,
  consequence: Wo,
  actionsWrap: zo,
  actions: Go,
  action: Uo,
  overflowPanel: Ko,
  measureClip: Vo,
  measure: Yo
};
function Xo({ title: e, consequence: a, consequenceHint: t }) {
  return /* @__PURE__ */ o("div", { className: Z.heading, children: [
    /* @__PURE__ */ n("h1", { className: Z.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: Z.consequence, title: t, children: a })
  ] });
}
function Ba({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: Z.action, "data-action": "", children: a }, t));
}
function un({ disclosure: e }) {
  return /* @__PURE__ */ n(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Jo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(un, { disclosure: l }) : a ? [/* @__PURE__ */ n(un, { disclosure: l }, "more"), /* @__PURE__ */ n(Ba, { actions: e }, "actions")] : /* @__PURE__ */ n(Ba, { actions: e });
}
function Qo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Zo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Ba, { actions: e }) });
}
function ei(e, a) {
  const t = $(), [r, l] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function ai({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Z.context, children: [
    /* @__PURE__ */ n($l, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Z.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function ni(...e) {
  return e.some((a) => a === null);
}
function ti(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function ri(e, a, t, r, l) {
  if (l === 0 || ni(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], u = ti(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function li(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function oi(e) {
  return xt(e) && (e.type === "a" || typeof e.props.href == "string");
}
function ii(e, a) {
  return a.length === 0 && e.length === 1 && oi(e[0]);
}
function si(e, a) {
  const t = p(null), r = p(null), l = p(null), i = p(null), [s, c] = g(!1);
  return I(() => {
    const u = t.current;
    if (!li(u)) return;
    const d = () => c(ri(u, r.current, l.current, i.current, e.length)), h = new ResizeObserver(d);
    return h.observe(u), d(), () => h.disconnect();
  }, [e]), { rowRef: t, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function ci({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: Z.measureClip, children: /* @__PURE__ */ o("div", { className: Z.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function di({ connection: e }) {
  return e ? /* @__PURE__ */ n(Xa, { connection: e.connection, since: e.since }) : null;
}
function L$({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: u, density: d = "page" }) {
  const { rowRef: h, headingRef: f, actionsRef: v, measureRef: N, collapsed: E } = si(i, ii(i, s)), q = s.length > 0, { disclosure: oe, close: Ce } = ei(E || q, v), ne = Qo(s, i, E, u);
  return /* @__PURE__ */ o("header", { className: Z.root, "data-density": d, children: [
    /* @__PURE__ */ n(ai, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Z.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: f, className: Z.headingWrap, children: /* @__PURE__ */ n(Xo, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ n(di, { connection: c }),
        /* @__PURE__ */ n("div", { className: Z.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ n(Jo, { actions: i, hasMore: q, collapsed: E, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Zo, { actions: ne, disclosure: oe, onEscape: Ce }),
    /* @__PURE__ */ n(ci, { actions: i, hasMore: q, measureRef: N })
  ] });
}
const ui = "_scrim_c7sqj_2", hi = "_drawer_c7sqj_10", mi = "_sheet_c7sqj_14", wi = "_modal_c7sqj_18", _i = "_panel_c7sqj_23", fi = "_header_c7sqj_51", vi = "_title_c7sqj_59", bi = "_body_c7sqj_63", gi = "_close_c7sqj_90", ye = {
  scrim: ui,
  drawer: hi,
  sheet: mi,
  modal: wi,
  panel: _i,
  header: fi,
  title: vi,
  body: bi,
  close: gi
}, pi = He(null), ma = [], wa = /* @__PURE__ */ new Map();
function Ni(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function yi(e, a) {
  let t = wa.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, wa.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function ki(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !Ni(r) && yi(e, r);
}
function $i(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (ki(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function Ci(e) {
  for (const a of e.claims) {
    const t = wa.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), wa.delete(a)));
  }
}
function Si(e, a) {
  const t = { root: e, claims: [] };
  return ma.push(t), $i(t, a), t;
}
function Ri(e) {
  const a = ma.indexOf(e);
  a >= 0 && ma.splice(a, 1), Ci(e);
}
function hn(e) {
  return e !== null && ma.at(-1) === e;
}
function Ti(e, a, t) {
  const r = p(null), l = p(t);
  return l.current = t, I(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Si(i, a);
    return r.current = c, () => {
      var d, h;
      const u = hn(c);
      Ri(c), r.current = null, u && ((h = (d = l.current ?? s) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), X(() => hn(r.current), []);
}
function Li(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Ei(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function xi({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ye.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${ye.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ye.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ye.body} ward-drawer-body`, children: e.children })
  ] });
}
function Ai(e) {
  return `${ye.scrim} ${ye[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Ii(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ye.panel} ${ye[e]} ward-overlay-panel${t}${r}`;
}
function Mi(e) {
  const a = je(pi);
  return e ?? a ?? document.body;
}
function ta(e) {
  const a = p(null), t = p(null), r = $(), l = Mi(e.container), i = Ka("(min-width: 768px)"), s = Li(e.kind, i), c = Ei(e, r), u = Ft(t), d = Ti(a, l, e.returnFocusTo), h = X(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return I(() => {
    var f, v;
    d() && ((v = (f = t.current) == null ? void 0 : f.querySelector("button")) == null || v.focus());
  }, [d]), I(() => {
    const f = (v) => {
      v.key === "Escape" && h();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [h]), Mt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Ai(s),
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
            className: Ii(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => d() && u.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ye.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(xi, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const qi = "_root_drrhx_2", Pi = "_ticket_drrhx_15", Bi = "_body_drrhx_24", La = {
  root: qi,
  ticket: Pi,
  body: Bi
};
function E$({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${La.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${La.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: La.body, children: t })
  ] });
}
const Oi = "_root_bf1pc_2", Di = "_table_bf1pc_9", ji = "_caption_bf1pc_14", Hi = "_series_bf1pc_23", Fi = "_category_bf1pc_31", Wi = "_cell_bf1pc_39", zi = "_track_bf1pc_45", Gi = "_lane_bf1pc_52", Ui = "_bar_bf1pc_56", Ki = "_value_bf1pc_63", Vi = "_swatch_bf1pc_70", Yi = "_empty_bf1pc_78", V = {
  root: Oi,
  table: Di,
  caption: ji,
  series: Hi,
  category: Fi,
  cell: Wi,
  track: zi,
  lane: Gi,
  bar: Ui,
  value: Ki,
  swatch: Vi,
  empty: Yi
}, Xi = "—", mn = 6;
function Ji(e, a) {
  if (a.length < 1 || a.length > mn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${mn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Qi(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function Dn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Zi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function es({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Zi(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ o("span", { className: V.track, children: [
    /* @__PURE__ */ n("span", { className: V.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${V.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: V.value, children: e === null ? l : r(e) })
  ] }) });
}
function as({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: V.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: V.swatch, "data-step": Dn(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function ns({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${V.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: V.caption, children: e }),
    /* @__PURE__ */ n("p", { className: V.empty, children: a })
  ] });
}
function ts({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: s = Xi }) {
  return /* @__PURE__ */ n("div", { className: `${V.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: V.table, children: [
    /* @__PURE__ */ n("caption", { className: V.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: V.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(as, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: V.category, children: c }),
      t.map((d, h) => /* @__PURE__ */ n(es, { value: d.values[u], top: r, step: Dn(h, t.length), format: l, missing: s }, d.name))
    ] }, c)) })
  ] }) });
}
function x$(e) {
  Ji(e.categories, e.series);
  const a = Qi(e.series);
  return a === 0 ? /* @__PURE__ */ n(ns, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(ts, { ...e, top: a });
}
const rs = "_root_1bfqw_2", ls = "_figure_1bfqw_7", os = "_of_1bfqw_13", is = "_bar_1bfqw_18", ss = "_rows_1bfqw_38", cs = "_row_1bfqw_38", ds = "_label_1bfqw_49", us = "_amount_1bfqw_54", Se = {
  root: rs,
  figure: ls,
  of: os,
  bar: is,
  rows: ss,
  row: cs,
  label: ds,
  amount: us
};
function hs({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Se.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Se.figure} ward-stat-value`, children: [
      re(e),
      " ",
      /* @__PURE__ */ o("span", { className: Se.of, children: [
        "of ",
        re(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Se.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${re(e)} of ${re(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: Se.rows, children: t.map((l) => /* @__PURE__ */ o("li", { className: `${Se.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Se.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Se.amount, children: re(l.amount) })
    ] }, l.label)) })
  ] });
}
const ms = "_frame_mg2jl_2", ws = "_table_mg2jl_6", _s = "_th_mg2jl_12", fs = "_td_mg2jl_13", vs = "_sort_mg2jl_47", bs = "_row_mg2jl_53", gs = "_empty_mg2jl_61", Te = {
  frame: ms,
  table: ws,
  th: _s,
  td: fs,
  sort: vs,
  row: bs,
  empty: gs
}, ps = { asc: "ascending", desc: "descending" };
function Ns(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ps[a.direction];
}
function ys(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Te.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function ks(e) {
  return e === void 0 ? void 0 : { width: e };
}
function $s({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Te.th,
      style: ks(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Ns(e, a),
      children: ys(e, t)
    }
  );
}
function Cs({ row: e, props: a }) {
  const t = a.rowId(e), r = (a.lockedIds ?? []).includes(t);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: Te.row,
      "data-selected": t === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ n("td", { className: Te.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function Ss({
  label: e,
  columns: a,
  rows: t,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: u,
  empty: d
}) {
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: Te.empty, children: d }) : /* @__PURE__ */ n("div", { className: Te.frame, children: /* @__PURE__ */ o("table", { className: Te.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Te.head, children: a.map((h) => /* @__PURE__ */ n($s, { column: h, sort: c, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(Cs, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const Rs = "_list_v0s52_2", Ts = {
  list: Rs
};
function A$({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Ts.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Ls = "_label_1u62a_2", Es = {
  label: Ls
};
function I$({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: Es.label, children: a.header }) }, a.key)) }) });
}
const xs = "_stack_bp6a0_2", As = {
  stack: xs
};
function M$({ children: e }) {
  return /* @__PURE__ */ n("span", { className: As.stack, "data-ward-action-stack": "", children: e });
}
const Is = "_set_y5zy3_2", Ms = "_legend_y5zy3_7", qs = "_row_y5zy3_15", Ps = "_control_y5zy3_20", Bs = "_input_y5zy3_26", Os = "_label_y5zy3_31", Ds = "_consequence_y5zy3_36", Me = {
  set: Is,
  legend: Ms,
  row: qs,
  control: Ps,
  input: Bs,
  label: Os,
  consequence: Ds
};
function jn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const u = $(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: Me.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Me.legend, children: e }),
    a.map((h) => {
      const f = `${d}-${h.value}`, v = h.consequence ? `${f}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Me.row, children: [
        /* @__PURE__ */ o("span", { className: Me.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: f,
              type: "radio",
              name: d,
              className: Me.input,
              value: h.value,
              checked: t === h.value,
              disabled: l,
              "aria-describedby": Va(v, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: f, className: Me.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: v, className: `${Me.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const js = "_root_1lu1e_2", Hs = "_head_1lu1e_11", Fs = "_note_1lu1e_30", Ws = "_index_1lu1e_35", zs = "_dot_1lu1e_39", Gs = "_counter_1lu1e_50", Us = "_trailing_1lu1e_58", Pe = {
  root: js,
  head: Hs,
  note: Fs,
  index: Ws,
  dot: zs,
  counter: Gs,
  trailing: Us
};
function Ks({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${Pe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Pe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Vs({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Pe.counter, "aria-hidden": "true", children: e }) : null;
}
function wn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Pe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Pe.head, children: [
      /* @__PURE__ */ n(Ks, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Pe.note, children: t }),
    /* @__PURE__ */ n(Vs, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Pe.trailing, children: i })
  ] });
}
const Ys = "_strip_1cw2w_2", Xs = "_cell_1cw2w_7", Js = "_value_1cw2w_12", Qs = "_link_1cw2w_28", Zs = "_linkValue_1cw2w_37", ec = "_label_1cw2w_48", Le = {
  strip: Ys,
  cell: Xs,
  value: Js,
  link: Qs,
  linkValue: Zs,
  label: ec
};
function ac(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Hn = (e) => `${Le.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function nc({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Le.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Hn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${Le.label} ward-stat-label`, children: e.label })
  ] });
}
function tc({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Le.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Hn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Le.link} ward-stat-link`, href: W(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { className: Le.linkValue, children: e.value }),
      /* @__PURE__ */ n("span", { className: `${Le.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ca({ cells: e, divided: a = !1 }) {
  return ac(e), /* @__PURE__ */ n("dl", { className: `${Le.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => t.href === void 0 ? /* @__PURE__ */ n(nc, { cell: t }, t.label) : /* @__PURE__ */ n(tc, { cell: t, href: t.href }, t.label)) });
}
const rc = "_root_5jkzr_2", lc = "_track_5jkzr_8", oc = "_thumb_5jkzr_46", ic = "_labelHidden_5jkzr_64", sc = "_label_5jkzr_64", cc = "_lockedNote_5jkzr_84", Be = {
  root: rc,
  track: lc,
  thumb: oc,
  labelHidden: ic,
  label: sc,
  lockedNote: cc
};
function dc(e) {
  return e ? `${Be.label} ${Be.labelHidden}` : Be.label;
}
function De({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = $(), u = `${c}switch`, d = l ? !0 : a, h = r || l;
  return /* @__PURE__ */ o("span", { className: `${Be.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": d,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": i,
        className: `${Be.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: h,
        onClick: () => !h && (t == null ? void 0 : t(!d)),
        children: /* @__PURE__ */ n("span", { className: Be.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: u, className: dc(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const uc = "_bar_wr7qx_2", hc = "_skip_wr7qx_11", mc = "_mark_wr7qx_22", wc = "_nav_wr7qx_30", _c = "_list_wr7qx_34", fc = "_select_wr7qx_40", vc = "_dest_wr7qx_48", bc = "_actor_wr7qx_76", gc = "_actorMark_wr7qx_89", pc = "_actorLabel_wr7qx_94", Nc = "_tagline_wr7qx_113", de = {
  bar: uc,
  skip: hc,
  mark: mc,
  nav: wc,
  list: _c,
  select: fc,
  dest: vc,
  actor: bc,
  actorMark: gc,
  actorLabel: pc,
  tagline: Nc
};
function yc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function kc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function q$({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = kc(r);
  return /* @__PURE__ */ o("header", { className: de.bar, children: [
    /* @__PURE__ */ n("a", { className: `${de.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: de.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: de.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: de.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: de.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${de.dest} ward-target`,
          href: W(u.href),
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        "select",
        {
          className: de.select,
          "aria-label": "Destination",
          value: t,
          onChange: (u) => i == null ? void 0 : i(u.target.value),
          children: a.map((u) => /* @__PURE__ */ n("option", { value: u.id, children: u.label }, u.id))
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: de.actor, children: [
      /* @__PURE__ */ n("span", { className: de.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: de.actorMark, "aria-hidden": "true", children: yc(c) })
    ] })
  ] });
}
const $c = "_tree_1lyby_2", Cc = "_item_1lyby_6", Sc = "_row_1lyby_10", Rc = "_button_1lyby_22", _a = {
  tree: $c,
  item: Cc,
  row: Sc,
  button: Rc
}, Fn = He(null);
function Tc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = Na({ orientation: "vertical" });
  return /* @__PURE__ */ n(Fn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: _a.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const Lc = { ArrowRight: !0, ArrowLeft: !1 };
function _n(e) {
  return e ? !0 : void 0;
}
function Ec(e, a) {
  const t = Lc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function xc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function Ac(e) {
  const a = [_a.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Ic(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Mc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function qc(e) {
  return typeof e == "string" ? e : void 0;
}
function Pc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Bc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Wn(e) {
  const a = je(Fn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = Ic(e);
  return /* @__PURE__ */ o("li", { className: _a.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Ac(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": _n(e.unresolved),
        "data-inherited": _n(e.inherited),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${_a.button} ward-treeitem-btn`,
            onClick: () => xc(e),
            onKeyDown: (r) => Ec(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Mc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: qc(e.label), children: e.label }),
              /* @__PURE__ */ n(Pc, { value: e.detail }),
              /* @__PURE__ */ n(Bc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Oc = "_frame_1fj9j_2", Dc = "_subjectRail_1fj9j_22", jc = "_subject_1fj9j_22", Hc = "_rail_1fj9j_42", Fc = "_record_1fj9j_64", Wc = "_recordBody_1fj9j_69", zc = "_stageGrid_1fj9j_118", Gc = "_band_1fj9j_144", Uc = "_bandBody_1fj9j_153", Kc = "_bandActions_1fj9j_158", Vc = "_scroller_1fj9j_166", Yc = "_board_1fj9j_192", Xc = "_laneCount_1fj9j_200", Jc = "_lanes_1fj9j_210", Y = {
  frame: Oc,
  subjectRail: Dc,
  subject: jc,
  rail: Hc,
  record: Fc,
  recordBody: Wc,
  stageGrid: zc,
  band: Gc,
  bandBody: Uc,
  bandActions: Kc,
  scroller: Vc,
  board: Yc,
  laneCount: Xc,
  lanes: Jc
};
function P$({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function fn(e) {
  return e ? "true" : void 0;
}
function B$({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": t, "data-ruled": fn(i), children: [
    /* @__PURE__ */ n("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: Y.rail, "data-sticky": fn(l), "aria-label": r, children: a })
  ] });
}
function O$({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(wn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(wn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: Y.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Qc = "_form_1j8ub_2", Zc = "_fields_1j8ub_9", ed = "_actions_1j8ub_19", Ea = {
  form: Qc,
  fields: Zc,
  actions: ed
};
function D$({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ea.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ea.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ea.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function j$({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: Y.bandActions, children: a })
  ] });
}
const ad = "(max-width: 767.98px)";
function Ja({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = p(null);
  aa(l, t ?? At.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function nd({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = g(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(A, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Ja, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function td({ lanes: e, label: a }) {
  const [t, r] = g(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(Ja, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(It, { children: l.content }, l.id)) })
  ] });
}
function H$({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Ka(ad);
  return t === void 0 ? /* @__PURE__ */ n(Ja, { label: a, children: e }) : l ? /* @__PURE__ */ n(nd, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(td, { lanes: t, label: a });
}
function F$({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = p(null), i = Math.max(e, 1);
  aa(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const rd = "_block_1o5o7_2", ld = "_sentence_1o5o7_15", od = "_meta_1o5o7_20", id = "_action_1o5o7_25", sd = "_strip_1o5o7_29", cd = "_loading_1o5o7_48", dd = "_label_1o5o7_56", ud = "_counter_1o5o7_63", _e = {
  block: rd,
  sentence: ld,
  meta: od,
  action: id,
  strip: sd,
  loading: cd,
  label: dd,
  counter: ud
};
function hd({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(_, { onClick: e.onClick, children: e.label }) });
}
function Sa({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: _e.sentence, children: e }),
    t,
    /* @__PURE__ */ n(hd, { action: a })
  ] });
}
function md(e) {
  return /* @__PURE__ */ n(Sa, { ...e, kind: "ward-emptystate" });
}
function W$({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(Sa, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function z$(e) {
  return /* @__PURE__ */ n(Sa, { ...e });
}
function G$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(Sa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    ce(a)
  ] }) });
}
function U$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ce(e),
    ". Showing snapshot from ",
    ce(a)
  ] });
}
function K$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ce(a)
  ] });
}
function V$({ label: e, startedAt: a }) {
  const t = p(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = g(!1);
  I(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = Ga(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: za(i) }) : null
  ] });
}
const wd = "_note_tlubt_2", _d = {
  note: wd
};
function fd({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: _d.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const vd = "_card_12in3_2", bd = "_hit_12in3_23", gd = "_head_12in3_30", pd = "_title_12in3_36", Nd = "_meta_12in3_44", yd = "_fields_12in3_45", kd = "_who_12in3_58", $d = "_sep_12in3_65", Cd = "_mono_12in3_69", Sd = "_field_12in3_45", Rd = "_last_12in3_84", Td = "_reason_12in3_96", J = {
  card: vd,
  hit: bd,
  head: gd,
  title: pd,
  meta: Nd,
  fields: yd,
  who: kd,
  sep: $d,
  mono: Cd,
  field: Sd,
  last: Rd,
  reason: Td
}, Ld = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Ed(e, a, t) {
  const r = sa(e, "blue"), l = sa(e, "orange"), i = sa(e, "green"), s = p(/* @__PURE__ */ new Set());
  I(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (u) => {
      if (s.current.has(u.id)) return;
      s.current.add(u.id);
      const d = Ld[u.type];
      d && c[d]();
    });
  }, [r, t, i, a, l]);
}
const xd = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Ad(e, a) {
  return xd[a](e);
}
function Id({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: J.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: J.meta, children: [
    /* @__PURE__ */ o("span", { className: J.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    t,
    /* @__PURE__ */ n($e, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
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
function Md({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: J.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function qd({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: J.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Pd({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: J.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: J.field, children: Ad(e, t) }, t)) });
}
const Oa = (e) => e ? !0 : void 0;
function Bd(e) {
  return { "--stream": fe(e.streamStep, "id") };
}
function Od(e, a, t) {
  e == null || e(a, t);
}
function Dd(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function jd({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: J.last, "data-stale": Oa(a), children: t }) : null;
}
function Ra(e) {
  const a = e.fields ?? [], t = e.item, r = p(null);
  Ed(r, t.key, e.feed);
  const l = Dd(e.feed), i = Bd(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: J.card,
      style: i,
      "data-selected": Oa(e.selected),
      "data-flagged": Oa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: J.hit, onClick: (s) => Od(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Md, { item: t }),
        /* @__PURE__ */ n("p", { className: J.title, children: t.title }),
        /* @__PURE__ */ n(Id, { item: t, connection: l }),
        /* @__PURE__ */ n(qd, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Pd, { item: t, fields: a }),
        /* @__PURE__ */ n(jd, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const Hd = "_column_10sxg_3", Fd = "_head_10sxg_24", Wd = "_label_10sxg_33", zd = "_count_10sxg_42", Gd = "_list_10sxg_56", Je = {
  column: Hd,
  head: Fd,
  label: Wd,
  count: zd,
  list: Gd
};
function zn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Ud({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Kd(e) {
  return /* @__PURE__ */ n("div", { className: Je.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      Ra,
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
function Vd({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: u }) {
  const d = $(), h = e.cap !== void 0 && a.length > e.cap, f = zn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(Ud, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(Kd, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: f }),
    h && /* @__PURE__ */ n(fd, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Yd = "_foot_8qg4p_2", Xd = "_note_8qg4p_13", Jd = "_link_8qg4p_19", xa = {
  foot: Yd,
  note: Xd,
  link: Jd
};
function Y$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: xa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: xa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${xa.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Qd = "_head_1la6p_3", Zd = "_identity_1la6p_12", eu = "_titleRow_1la6p_18", au = "_title_1la6p_18", nu = "_key_1la6p_35", tu = "_rollup_1la6p_45", ru = "_tools_1la6p_53", lu = "_swatch_1la6p_62", ou = "_mark_1la6p_69", pe = {
  head: Qd,
  identity: Zd,
  titleRow: eu,
  title: au,
  key: nu,
  rollup: tu,
  tools: ru,
  swatch: lu,
  mark: ou
}, vn = "initials:";
function iu(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function su(e) {
  const a = [iu(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function cu(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    su(e)
  ] });
}
function du(e) {
  return e.startsWith(vn) ? e.slice(vn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function uu({ markRef: e, streamStep: a }) {
  const t = { "--stream": fe(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${pe.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: du(e) }) : /* @__PURE__ */ n("span", { className: pe.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function hu({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function X$({
  stream: e,
  rollups: a,
  connection: t,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: u
}) {
  return /* @__PURE__ */ o("div", { className: pe.head, children: [
    /* @__PURE__ */ o("div", { className: pe.identity, children: [
      /* @__PURE__ */ o("div", { className: pe.titleRow, children: [
        /* @__PURE__ */ n(uu, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: pe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: pe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: pe.rollup, "aria-live": "polite", children: cu(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: pe.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(hu, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(_, { onClick: c, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Xa, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const mu = "_head_589hw_11", wu = "_line_589hw_12", _u = "_cHandle_589hw_33", fu = "_cName_589hw_38", vu = "_nameLine_589hw_46", bu = "_cLabel_589hw_53", gu = "_cCap_589hw_58", pu = "_cShown_589hw_63", Nu = "_name_589hw_46", yu = "_noCap_589hw_85", ku = "_state_589hw_99", $u = "_handle_589hw_108", Cu = "_sub_589hw_134", B = {
  head: mu,
  line: wu,
  cHandle: _u,
  cName: fu,
  nameLine: vu,
  cLabel: bu,
  cCap: gu,
  cShown: pu,
  name: Nu,
  noCap: yu,
  state: ku,
  handle: $u,
  sub: Cu
}, Su = "can't be hidden or collapsed", Ru = "terminal · counted, not a column";
function J$() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: B.cHandle }),
    /* @__PURE__ */ n("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: B.cShown, children: "Shown" })
  ] });
}
function Tu(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Lu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function bn(e) {
  return e.gate ? Su : e.terminal ? Ru : Lu(e.agentsMounted);
}
function Eu(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function xu({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ n("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    bn(e) && /* @__PURE__ */ n("span", { className: B.sub, children: bn(e) })
  ] });
}
function Au(e) {
  return e === void 0 ? "" : String(e);
}
function Iu(e) {
  return e === "" ? void 0 : Number(e);
}
function Mu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: B.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: B.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Eu(t, a),
      children: "⠿"
    }
  ) });
}
function qu({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: B.cCap, children: /* @__PURE__ */ n(A, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Au(a.cap), onChange: (r) => t({ ...a, cap: Iu(r) }) }) });
}
function Pu({ stage: e, config: a, onChange: t }) {
  const r = Tu(e, a.shown), l = e.gate || e.terminal, i = (s) => t({ ...a, shown: s });
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ n(De, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ n("span", { className: B.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function Bu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function Q$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": Bu(e), children: [
    /* @__PURE__ */ n(Mu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(xu, { stage: e }),
    /* @__PURE__ */ n("span", { className: B.cLabel, children: /* @__PURE__ */ n(A, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(qu, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Pu, { stage: e, config: a, onChange: t })
  ] });
}
const Ou = "_body_hn6d6_2", Du = "_head_hn6d6_9", ju = "_summary_hn6d6_19", Hu = "_block_hn6d6_20", Fu = "_actionsBlock_hn6d6_21", Wu = "_title_hn6d6_41", zu = "_note_hn6d6_46", Gu = "_k_hn6d6_51", Uu = "_kv_hn6d6_58", Ku = "_row_hn6d6_64", Vu = "_label_hn6d6_75", Yu = "_value_hn6d6_84", Xu = "_quote_hn6d6_90", Ju = "_actions_hn6d6_21", Qu = "_resolve_hn6d6_103", O = {
  body: Ou,
  head: Du,
  summary: ju,
  block: Hu,
  actionsBlock: Fu,
  title: Wu,
  note: zu,
  k: Gu,
  kv: Uu,
  row: Ku,
  label: Vu,
  value: Yu,
  quote: Xu,
  actions: Ju,
  resolve: Qu
};
function Zu(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function eh(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n($e, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function ah(e) {
  const a = na(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function nh(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...$a(ah(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Zu(e),
    ...eh(e, a)
  ];
}
function th({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: O.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: O.k, children: a }),
    e
  ] });
}
function rh({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: O.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function lh({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: O.block, children: [
    /* @__PURE__ */ n("p", { className: O.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: O.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: O.note, children: e.agentMeta })
  ] }) : null;
}
function Z$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const u = $(), d = nh(e, l);
  return /* @__PURE__ */ n(ta, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: O.body, children: [
    /* @__PURE__ */ n(rh, { item: e }),
    /* @__PURE__ */ o("div", { className: O.summary, children: [
      /* @__PURE__ */ n("h2", { className: O.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: O.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: O.kv, children: d.map(([h, f]) => /* @__PURE__ */ o("div", { className: O.row, children: [
      /* @__PURE__ */ n("dt", { className: O.label, children: h }),
      /* @__PURE__ */ n("dd", { className: O.value, children: f })
    ] }, h)) }),
    /* @__PURE__ */ n(lh, { item: e }),
    /* @__PURE__ */ o("div", { className: O.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: O.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: O.note, children: c })
    ] }),
    /* @__PURE__ */ n(th, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const oh = "_root_3azmy_2", ih = "_list_3azmy_7", sh = "_item_3azmy_12", ch = "_box_3azmy_18", dh = "_text_3azmy_23", uh = "_note_3azmy_28", ze = {
  root: oh,
  list: ih,
  item: sh,
  box: ch,
  text: dh,
  note: uh
};
function Ta({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: ze.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${ze.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: ze.box, children: /* @__PURE__ */ n(Ya, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: ze.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${ze.note} ward-checklist-note`, children: a })
  ] });
}
const hh = "_rail_ke7ch_2", mh = "_k_ke7ch_11", wh = "_head_ke7ch_19", _h = "_section_ke7ch_25", fh = "_card_ke7ch_38", vh = "_strip_ke7ch_42", bh = "_skeleton_ke7ch_56", gh = "_skeletonLabel_ke7ch_70", ph = "_bar_ke7ch_76", Nh = "_note_ke7ch_85", he = {
  rail: hh,
  k: mh,
  head: wh,
  section: _h,
  card: fh,
  strip: vh,
  skeleton: bh,
  skeletonLabel: gh,
  bar: ph,
  note: Nh
};
function yh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Aa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: he.k, children: e }),
    a
  ] });
}
function kh({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function $h({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Vd, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function Ch(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n($h, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(kh, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function eC(e) {
  const a = yh(e.onOpen), t = zn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Aa, { title: "Card", children: /* @__PURE__ */ n("div", { className: he.card, children: t && /* @__PURE__ */ n(Ra, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Aa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Ch, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Aa, { title: "Effect of this config", children: /* @__PURE__ */ n(Ta, { items: e.effects, density: "compact" }) })
  ] });
}
function Sh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Rh(e) {
  return Math.ceil(e.length / 2);
}
function Th(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Gn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Lh(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Gn(e);
  l !== void 0 && t(l), r(Th(e.type));
}
function Eh(e, a, t, r, l) {
  I(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Lh(i, t, r, l));
  }, [e, a, t, r, l]);
}
function xh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Ah(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function Ih(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Mh(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(Rh(a ?? [])) + ")"
  };
}
function qh(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Ph(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: re(e.cost) }) : null;
}
function Bh(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Oh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n($e, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Dh(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function jh(e, a) {
  return a === void 0 ? e : Sh(e, a.ref);
}
function Hh(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ea(e) {
  return e === !0 ? "true" : void 0;
}
function Un(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = p(null), i = sa(l), s = p(/* @__PURE__ */ new Set()), [c, u] = g(xh(a));
  Eh(e.feed, a.key, s, u, i);
  const d = Ah(a, r), h = Ih(a, t), f = Mh(a, e.fields), v = Dh(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Hh(e),
      className: "ward-workcard",
      "data-flagged": ea(a.flagged),
      "data-selected": ea(e.selected),
      style: f,
      ref: jh(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        qh(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          Ph(a, e.fields),
          Bh(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Oh(t, c, e.connection, a.changedAt),
          v !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: v, children: v }) : null
        ] })
      ]
    }
  ) });
}
function Fh({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Wh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function zh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Gh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Fh, { count: e.items.length, cap: e.column.cap });
}
function Uh(e, a) {
  return e.roving ?? a;
}
function Kh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Vh(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    Un,
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
function Yh(e) {
  const a = $(), t = Na({ orientation: "vertical" }), r = Uh(e, t), l = Wh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ea(l), "data-gate": ea(e.column.gate), children: [
    zh(e.column, e.items.length, a),
    Gh(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Kh(e, t), children: Vh(e, r) })
  ] });
}
function Xh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Jh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Qh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function aC(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Xh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Jh(e),
      Qh(e.onConfigure),
      /* @__PURE__ */ n(Xa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Zh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function em(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(De, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(De, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function am(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function nC(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ea(Zh(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: em(e) }),
    /* @__PURE__ */ n(A, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Pn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    am(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function tC(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Un, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Yh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function nm(e, a) {
  const t = Gn(e);
  t !== void 0 && a(t);
}
function tm(e, a, t) {
  I(() => {
    if (e != null)
      return e.subscribe(a, (r) => nm(r, t));
  }, [e, a, t]);
}
function rm(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function lm(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function om(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n($e, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function im(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function rC(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = g((s = a.run) == null ? void 0 : s.lastStep);
  tm(e.feed, a.key, l);
  const i = [...rm(a), ...lm(a)];
  return /* @__PURE__ */ o(ta, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      om(t, r)
    ] }),
    im(a, e.actions)
  ] });
}
const sm = "_card_d2vbe_2", cm = "_head_d2vbe_22", dm = "_mark_d2vbe_30", um = "_name_d2vbe_42", hm = "_chips_d2vbe_63", mm = "_description_d2vbe_69", wm = "_run_d2vbe_74", _m = "_sep_d2vbe_83", fm = "_facts_d2vbe_88", vm = "_fact_d2vbe_88", bm = "_factLabel_d2vbe_101", gm = "_factValue_d2vbe_105", le = {
  card: sm,
  head: cm,
  mark: dm,
  name: um,
  chips: hm,
  description: mm,
  run: wm,
  sep: _m,
  facts: fm,
  fact: vm,
  factLabel: bm,
  factValue: gm
}, pm = { live: "done", draft: "running", paused: "meta" };
function Nm(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function ym({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: pm[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function km({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function $m({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n($e, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Cm({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function Sm(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Rm({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": fe(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: Nm(s),
      style: c,
      "data-selected": u,
      "data-paused": Sm(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(km, { description: e.description }),
        /* @__PURE__ */ n($m, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(ym, { versions: e.versions }),
        /* @__PURE__ */ n(Cm, { facts: i })
      ]
    }
  );
}
const Tm = "_list_4dcyc_2", Lm = "_row_4dcyc_11", Em = "_head_4dcyc_23", xm = "_id_4dcyc_30", Am = "_lock_4dcyc_35", Im = "_reason_4dcyc_41", Mm = "_remove_4dcyc_46", qm = "_clauses_4dcyc_50", Pm = "_clause_4dcyc_50", Bm = "_label_4dcyc_64", Om = "_cell_4dcyc_71", Dm = "_value_4dcyc_76", ie = {
  list: Tm,
  row: Lm,
  head: Em,
  id: xm,
  lock: Am,
  reason: Im,
  remove: Mm,
  clauses: qm,
  clause: Pm,
  label: Bm,
  cell: Om,
  value: Dm
}, Kn = He(!1);
function lC({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Kn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function jm({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(A, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function Hm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ie.reason, children: e })
  ] });
}
function Fm({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ n("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Hm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function gn(e, a) {
  return e.locked ? void 0 : a;
}
function oC({ rule: e, onChange: a, onRemove: t }) {
  if (!je(Kn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = gn(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Fm, { rule: e, onRemove: gn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ n("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ie.cell, children: /* @__PURE__ */ n(jm, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Wm = "_ladder_j98f1_2", zm = "_cell_j98f1_7", Gm = "_empty_j98f1_26", Um = "_name_j98f1_34", Km = "_holder_j98f1_40", Vm = "_request_j98f1_46", Ym = "_swatches_j98f1_51", Xm = "_swatch_j98f1_51", Jm = "_tilesFrame_j98f1_78", Qm = "_tiles_j98f1_78", Zm = "_tile_j98f1_78", ew = "_bar_j98f1_117", aw = "_hex_j98f1_128", nw = "_note_j98f1_138", L = {
  ladder: Wm,
  cell: zm,
  empty: Gm,
  name: Um,
  holder: Km,
  request: Vm,
  swatches: Ym,
  swatch: Xm,
  tilesFrame: Jm,
  tiles: Qm,
  tile: Zm,
  bar: ew,
  hex: aw,
  note: nw
}, iC = "not validated yet, pending a CVD matrix and dark stepping";
function tw(e) {
  return e.reserved ? "reserved" : ka(e.step) ? "validated" : "partial";
}
function Vn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function rw(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function lw({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(xe, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function ow(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function iw(e, a, t) {
  return {
    "aria-checked": a,
    "aria-disabled": t || void 0,
    tabIndex: t ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const pn = (e) => String(e).padStart(2, "0");
function sw(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Vn(e, void 0);
}
function cw({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.hex} ward-ladder-hex`, children: r ? `step ${pn(e)}` : Vt(e) }),
    /* @__PURE__ */ n("span", { className: `${L.note} ward-ladder-note`, children: r ? t : `Step ${pn(e)} · ${t}` })
  ] });
}
function dw({ step: e, value: a, taken: t, onChange: r, presentation: l, disabled: i }) {
  const s = tw(e), c = Vn(s, t), u = c !== "free", d = u || i, h = a === e.step, f = e.name ?? `Step ${e.step}`, v = () => {
    d || r(e.step);
  }, N = `${f} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...iw(u, h, d), "data-validation": s, style: rw(e, s), onClick: v, onKeyDown: (q) => ow(q, v) }, label: N, name: f, holder: c, validation: s, note: sw(s, t, h), step: e.step };
}
const uw = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${L.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${L.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(cw, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${L.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(lw, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${L.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${L.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function hw(e) {
  return uw[e.presentation](dw(e));
}
function mw(e) {
  for (const a of e)
    if (!a.reserved && !ya(a.step)) throw new Error("colour ladder renders token steps only");
}
function ww() {
  return /* @__PURE__ */ o("div", { className: `${L.cell} ward-ladder-cell ${L.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${L.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function _w(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const fw = { list: L.ladder, swatches: L.swatches, tiles: L.tilesFrame };
function vw() {
  return /* @__PURE__ */ o("div", { className: `${L.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${L.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const bw = { list: ww, swatches: () => null, tiles: vw };
function gw(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Yn(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  mw(e.steps);
  const r = _w(e), l = bw[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(hw, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...gw(e.disabled === !0), className: `${fw[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: L.tiles, children: i }) : i });
}
const pw = "_rail_1el2t_2", Nw = "_section_1el2t_12", yw = "_sectionFlush_1el2t_22", kw = "_head_1el2t_26", $w = "_headLabel_1el2t_34", Cw = "_sample_1el2t_42", Sw = "_sampleLabel_1el2t_47", Rw = "_sampleTitle_1el2t_54", Tw = "_sampleMeta_1el2t_59", Lw = "_trace_1el2t_65", Ew = "_traceHead_1el2t_70", xw = "_steps_1el2t_78", Aw = "_step_1el2t_78", Iw = "_stepTitle_1el2t_97", Mw = "_hollow_1el2t_107", qw = "_stepBody_1el2t_115", Pw = "_stepDetail_1el2t_127", Bw = "_publish_1el2t_132", Ow = "_reason_1el2t_138", Dw = "_note_1el2t_143", jw = "_reveal_1el2t_148", y = {
  rail: pw,
  section: Nw,
  sectionFlush: yw,
  head: kw,
  headLabel: $w,
  sample: Cw,
  sampleLabel: Sw,
  sampleTitle: Rw,
  sampleMeta: Tw,
  trace: Lw,
  traceHead: Ew,
  steps: xw,
  step: Aw,
  stepTitle: Iw,
  hollow: Mw,
  stepBody: qw,
  stepDetail: Pw,
  publish: Bw,
  reason: Ow,
  note: Dw,
  reveal: jw
}, Nn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Hw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Fw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Ww = { notSimulated: "not simulated", running: "running" };
function zw(e) {
  return e.presentation === "foundry";
}
function Gw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Uw(e, a) {
  var r;
  const t = Hw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Kw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Vw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Yw(e) {
  if (Kw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Xw(e) {
  const [a, t] = g(!1);
  I(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${y.step} ${y.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Jw(e) {
  const a = Ww[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: y.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(xe, { size: 6, kind: Fw[e.kind], label: e.kind });
}
function Qw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: y.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Zw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n($e, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function e_(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Xw, { kind: a.kind, children: [
    /* @__PURE__ */ n(Jw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: y.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: y.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Qw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Zw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function a_(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(se(a)), t.join(" · ");
}
function Xn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${y.trace} ${y.section}`, children: [
    /* @__PURE__ */ n("p", { className: y.traceHead, id: a, children: a_(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: y.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(e_, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function n_(e) {
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
function t_(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ce(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${y.sampleMeta} ${y.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function r_(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? xn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: y.sectionFlush, children: /* @__PURE__ */ n(Ca, { divided: !0, cells: a }) });
}
function l_(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: xn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function o_(e) {
  const a = l_(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: y.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: y.sectionFlush, children: /* @__PURE__ */ n(Ca, { divided: !0, cells: a }) });
}
function Jn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: `${y.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function i_(e) {
  return /* @__PURE__ */ o("div", { className: `${y.publish} ${y.section}`, children: [
    /* @__PURE__ */ n(Jn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: y.note, children: e.note })
  ] });
}
function s_(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${y.publish} ${y.section}`, children: /* @__PURE__ */ n(Jn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Qn(e) {
  return /* @__PURE__ */ o("div", { className: `${y.head} ${y.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: y.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: Nn[e.run.status].role, label: Nn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n($e, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function c_(e, a) {
  const [t, r] = g(e.steps);
  return I(() => r(e.steps), [e.steps]), I(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), t;
}
function d_(e) {
  var t;
  Vw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Qn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(n_, { sample: e.run.sample }),
    /* @__PURE__ */ n(Xn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(r_, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ta, { items: e.checklist }) }),
    /* @__PURE__ */ n(i_, { reason: Gw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function u_(e) {
  var r;
  const a = c_(e.run, e.feed);
  Yw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Qn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(t_, { sample: e.run.sample }),
    /* @__PURE__ */ n(Xn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(o_, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ta, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(s_, { reason: Uw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function sC(e) {
  return zw(e) ? /* @__PURE__ */ n(u_, { ...e }) : /* @__PURE__ */ n(d_, { ...e });
}
const h_ = "_list_142ip_3", m_ = "_row_142ip_9", w_ = "_condition_142ip_18", __ = "_action_142ip_24", ca = {
  list: h_,
  row: m_,
  condition: w_,
  action: __
}, Zn = He(!1);
function cC({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Zn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ca.list, "aria-label": a, children: e }) });
}
function dC({ rule: e }) {
  if (!je(Zn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ca.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: ca.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: ca.action, children: e.then })
  ] });
}
function Da(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(t, 0, l), r;
}
function et(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function at(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function yn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function f_(e) {
  return e === "up" ? "down" : "up";
}
function v_(e, a) {
  const t = yn(e, a.id, a.direction) ?? yn(e, a.id, f_(a.direction));
  t == null || t.focus();
}
function nt() {
  const e = p(null), [a, t] = g(null), [r, l] = g("");
  return I(() => {
    e.current !== null && a !== null && v_(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    t(s), l(c);
  } };
}
function tt({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function fa({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const b_ = "_body_1h15q_2", g_ = "_title_1h15q_8", p_ = "_section_1h15q_13", N_ = "_legend_1h15q_18", y_ = "_stages_1h15q_26", k_ = "_stage_1h15q_26", $_ = "_stageIndex_1h15q_44", C_ = "_stageName_1h15q_50", S_ = "_footer_1h15q_59", R_ = "_note_1h15q_66", T_ = "_reason_1h15q_71", L_ = "_actions_1h15q_76", E_ = "_webHead_1h15q_83", x_ = "_kicker_1h15q_92", A_ = "_webTitle_1h15q_99", I_ = "_webBody_1h15q_105", M_ = "_webSection_1h15q_109", q_ = "_sectionHead_1h15q_121", P_ = "_sectionNote_1h15q_129", B_ = "_formLabel_1h15q_134", O_ = "_identityRow_1h15q_139", D_ = "_nameCell_1h15q_145", j_ = "_keyCell_1h15q_150", H_ = "_colourCell_1h15q_154", F_ = "_colourStatus_1h15q_161", W_ = "_webStages_1h15q_166", z_ = "_webStageList_1h15q_172", G_ = "_webStage_1h15q_166", U_ = "_webIndex_1h15q_191", K_ = "_webStageName_1h15q_196", V_ = "_webMoves_1h15q_201", Y_ = "_addStage_1h15q_215", X_ = "_addStageButton_1h15q_223", J_ = "_addStageNote_1h15q_231", Q_ = "_webFooter_1h15q_236", Z_ = "_webFooterNotes_1h15q_244", ef = "_webNote_1h15q_251", w = {
  body: b_,
  title: g_,
  section: p_,
  legend: N_,
  stages: y_,
  stage: k_,
  stageIndex: $_,
  stageName: C_,
  footer: S_,
  note: R_,
  reason: T_,
  actions: L_,
  webHead: E_,
  kicker: x_,
  webTitle: A_,
  webBody: I_,
  webSection: M_,
  sectionHead: q_,
  sectionNote: P_,
  formLabel: B_,
  identityRow: O_,
  nameCell: D_,
  keyCell: j_,
  colourCell: H_,
  colourStatus: F_,
  webStages: W_,
  webStageList: z_,
  webStage: G_,
  webIndex: U_,
  webStageName: K_,
  webMoves: V_,
  addStage: Y_,
  addStageButton: X_,
  addStageNote: J_,
  webFooter: Q_,
  webFooterNotes: Z_,
  webNote: ef
}, af = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], rt = "not in catalogue";
function nf(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${rt}` }, ...t];
}
function tf({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(A, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${rt}`;
  return /* @__PURE__ */ n(A, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: nf(t, e.name), invalid: i, onChange: r });
}
function lt(e, a) {
  return e.name || `stage ${a + 1}`;
}
function rf(e) {
  const a = p([]), t = p(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function lf({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = lt(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(tf, { stage: a, index: t, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(A, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: af, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(fa, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(fa, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function of({ stages: e, onChange: a, catalogue: t }) {
  const r = rf(e.length), l = nt(), i = (c, u) => {
    const d = et(c, u);
    r.current = Da(r.current, c, d), l.moved({ id: r.current[d], direction: u }, at(lt(e[c], c), d, e.length)), a(Da(e, c, d));
  }, s = (c, u) => a(e.map((d, h) => h === c ? u : d));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, u) => /* @__PURE__ */ n(lf, { id: r.current[u], stage: c, index: u, total: e.length, catalogue: t, onReplace: (d) => s(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(tt, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const sf = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], cf = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], df = "A new stream starts as a draft. Nothing runs on it until you publish it.", uf = "Create is disabled: name the stream and give it a key first.", hf = "reorder with the ↑ ↓ buttons · min 2";
function Qa(e, a) {
  return !e.reserved && ka(e.step) && a[e.step] === void 0;
}
function mf(e, a) {
  const t = e.find((r) => Qa(r, a));
  return t ? t.step : 1;
}
function wf({ stages: e, onMove: a }) {
  const t = nt(), r = (l, i) => {
    const s = et(l, i);
    t.moved({ id: e[l].id, direction: i }, at(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(fa, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(fa, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(tt, { text: t.announcement })
  ] });
}
function _f({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: df }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(_, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function ff(e, a) {
  return e !== "" && a !== "" ? null : uf;
}
function vf(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = cf, onCreate: i, onDraft: s, onClose: c, returnFocusTo: u } = e, d = $(), [h, f] = g(""), [v, N] = g(""), [E, q] = g(a[0].value), [oe, Ce] = g(() => mf(t, r)), [ne, Fe] = g(e.stages ?? sf), [We, C] = g(l[0].value), z = { name: h, key: v, streamStep: oe, owner: E, stages: ne, policy: We }, ve = ff(h, v);
  return /* @__PURE__ */ n(ta, { kind: "modal", labelledBy: d, onClose: c, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Stream name", value: h, onChange: f }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Key", value: v, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: E, onChange: q, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Yn, { label: "Stream colour", steps: t, value: oe, onChange: Ce, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(wf, { stages: ne, onMove: (Ae, Et) => Fe(Da(ne, Ae, Et)) })
    ] }),
    /* @__PURE__ */ n(jn, { legend: "Loop policy", options: l, value: We, onChange: C }),
    /* @__PURE__ */ n(_f, { reason: ve, onCreate: () => i(z), onDraft: () => s(z) })
  ] }) });
}
const ot = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], bf = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function gf(e, a, t, r, l, i) {
  var c;
  const s = ((c = ot.find((u) => u.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function pf(e, a) {
  return Nf(e) && yf(e, a) && kf(e);
}
function Nf(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function yf(e, a) {
  return e.colourStep === null || Qa({ step: e.colourStep }, a);
}
function kf(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function $f(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : Qa({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Cf({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Sf({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Cf, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: bf })
    ] }),
    l && /* @__PURE__ */ n(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Rf({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function Tf({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function Lf(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [l, i] = g(""), [s, c] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, f] = g(null), [v, N] = g("relay"), [E, q] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = gf(l, s, u, h, v, E), Ce = pf(oe, r), ne = E.find((C) => C.kind === "agent" && C.name.trim() !== ""), Fe = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Yn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: f, takenBy: r })
  ] }), We = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: $f(h, r) }),
    /* @__PURE__ */ n(A, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((C) => ({ value: C, label: C })), onChange: d })
  ] });
  return /* @__PURE__ */ o(ta, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Rf, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(Tf, { name: l, setName: i, streamKey: s, setKey: c, colour: Fe, owner: We }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: hf })
        ] }),
        /* @__PURE__ */ n(of, { stages: E, onChange: q })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(jn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: v, options: ot, onChange: N }) }),
      /* @__PURE__ */ n(Sf, { ready: Ce, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function uC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Lf, { ...e }) : /* @__PURE__ */ n(vf, { ...e });
}
const Ef = "_row_bs8hc_2", xf = "_cell_bs8hc_6", Af = "_condition_bs8hc_11", If = "_action_bs8hc_18", Mf = "_contract_bs8hc_24", qf = "_contractCondition_bs8hc_33", Pf = "_contractAction_bs8hc_39", Q = {
  row: Ef,
  cell: xf,
  condition: Af,
  action: If,
  contract: Mf,
  contractCondition: qf,
  contractAction: Pf
}, it = ["advance", "block", "escalate", "requestReview"], kn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function va(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Za(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: Q.action, children: kn[e.then] }) : /* @__PURE__ */ n(
    A,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: it.map((l) => ({ value: l, label: kn[l] }))
    }
  );
}
function Bf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: Q.condition, title: va(e, r), children: va(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Za(e, a, t) })
  ] });
}
function Of({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: Q.condition, children: va(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Za(e, a, t) })
  ] });
}
function Df({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractCondition, children: va(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractAction, children: Za(e, a, t, !0) })
  ] });
}
const jf = { two: Of, four: Bf, contract: Df };
function hC(e) {
  var t;
  if (!it.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = jf[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Hf = "_column_1tf9e_2", Ff = "_head_1tf9e_17", Wf = "_index_1tf9e_23", zf = "_name_1tf9e_29", Gf = "_meta_1tf9e_38", Uf = "_mono_1tf9e_43", Kf = "_gate_1tf9e_50", Vf = "_reviewersLabel_1tf9e_57", Yf = "_reviewers_1tf9e_57", Xf = "_reviewer_1tf9e_57", Jf = "_agents_1tf9e_74", Qf = "_workflowColumn_1tf9e_79", Zf = "_workflowHead_1tf9e_96", ev = "_stageRow_1tf9e_102", av = "_stageLabel_1tf9e_109", nv = "_workflowTitle_1tf9e_116", tv = "_workflowMeta_1tf9e_122", rv = "_workflowGate_1tf9e_127", lv = "_gateNote_1tf9e_135", ov = "_cardNote_1tf9e_140", iv = "_reviewerList_1tf9e_145", sv = "_reviewerRow_1tf9e_151", cv = "_reviewerMark_1tf9e_157", dv = "_reviewerName_1tf9e_167", uv = "_terminalCard_1tf9e_173", hv = "_terminalCount_1tf9e_182", mv = "_workflowAgents_1tf9e_188", wv = "_mount_1tf9e_194", k = {
  column: Hf,
  head: Ff,
  index: Wf,
  name: zf,
  meta: Gf,
  mono: Uf,
  gate: Kf,
  reviewersLabel: Vf,
  reviewers: Yf,
  reviewer: Xf,
  agents: Jf,
  workflowColumn: Qf,
  workflowHead: Zf,
  stageRow: ev,
  stageLabel: av,
  workflowTitle: nv,
  workflowMeta: tv,
  workflowGate: rv,
  gateNote: lv,
  cardNote: ov,
  reviewerList: iv,
  reviewerRow: sv,
  reviewerMark: cv,
  reviewerName: dv,
  terminalCard: uv,
  terminalCount: hv,
  workflowAgents: mv,
  mount: wv
}, _v = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function en(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function st(e) {
  return `${Math.round(e * 100)}%`;
}
function fv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: k.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: k.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: k.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Ca, { cells: [
      { value: st(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function vv({ stage: e }) {
  return /* @__PURE__ */ n(Ca, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: en(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function bv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: k.head, children: [
    /* @__PURE__ */ n("span", { className: k.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: k.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: _v[e.kind] })
  ] });
}
function gv({ stage: e }) {
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
function pv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(fv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(vv, { stage: e }) : null;
}
function Nv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function yv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: k.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(bv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(gv, { stage: e }),
    /* @__PURE__ */ n(pv, { stage: e }),
    /* @__PURE__ */ n("div", { className: k.agents, children: a.map((s) => /* @__PURE__ */ n(Rm, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(Nv, { onMount: t })
  ] });
}
const kv = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function $v({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: k.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: k.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: k.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: k.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function Cv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: k.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n($v, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: k.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: st(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Sv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Rv({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: k.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: k.terminalCount, children: en(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: k.cardNote, children: Sv(e.rolledBackThisWeek) })
  ] });
}
function Tv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Lv(e) {
  if (e.kind === "terminal") return `${en(e.closedThisWeek)} this week`;
  const a = Tv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Ev({ stage: e, titleId: a }) {
  const t = kv[e.kind];
  return /* @__PURE__ */ o("header", { className: k.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: k.stageRow, children: [
      /* @__PURE__ */ o("span", { className: k.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: k.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: k.workflowMeta, children: Lv(e) })
  ] });
}
function xv(e) {
  return e === "entry" || e === "agent";
}
function Av({ stage: e, onMount: a }) {
  return a === void 0 || !xv(e.kind) ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", className: k.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Iv({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: k.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Ev, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Cv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Rv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: k.workflowAgents, children: a }),
    /* @__PURE__ */ n(Av, { stage: e, onMount: t })
  ] });
}
function Mv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function mC(e) {
  return Mv(e) ? /* @__PURE__ */ n(Iv, { ...e }) : /* @__PURE__ */ n(yv, { ...e });
}
const qv = "_row_1jw40_6", Pv = "_name_1jw40_12", Bv = "_compactRow_1jw40_13", Ov = "_compactName_1jw40_13", Dv = "_cell_1jw40_30", jv = "_chain_1jw40_45", Hv = "_owner_1jw40_51", Fv = "_mono_1jw40_57", Wv = "_compactCell_1jw40_79", zv = "_stack_1jw40_96", Gv = "_stat_1jw40_103", Uv = "_identityLine_1jw40_110", Kv = "_identity_1jw40_110", Vv = "_ownerLine_1jw40_137", Yv = "_link_1jw40_150", Xv = "_gateMark_1jw40_156", Jv = "_emptyChain_1jw40_161", Qv = "_arrow_1jw40_167", Zv = "_muted_1jw40_168", eb = "_define_1jw40_173", ab = "_statValue_1jw40_180", nb = "_policyId_1jw40_186", tb = "_sub_1jw40_191", b = {
  row: qv,
  name: Pv,
  compactRow: Bv,
  compactName: Ov,
  cell: Dv,
  chain: jv,
  owner: Hv,
  mono: Fv,
  compactCell: Wv,
  stack: zv,
  stat: Gv,
  identityLine: Uv,
  identity: Kv,
  ownerLine: Vv,
  link: Yv,
  gateMark: Xv,
  emptyChain: Jv,
  arrow: Qv,
  muted: Zv,
  define: eb,
  statValue: ab,
  policyId: nb,
  sub: tb
};
function ct(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function rb(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function lb(e) {
  return e === void 0 ? b.compactRow : `${b.compactRow} ${e}`;
}
function dt(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function ob(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${dt(e.members)}`;
}
function ib(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: b.compactCell, children: /* @__PURE__ */ o("span", { className: b.stack, children: [
    /* @__PURE__ */ o("span", { className: b.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${b.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${b.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: b.ownerLine, children: ob(e) })
  ] }) });
}
function ut({ name: e, gate: a, look: t, size: r }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ n("span", { className: b.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...t, size: r, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function sb(e, a, t) {
  if (e !== a) return { role: "soft" };
  const r = na(t);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function cb({ stages: e, streamStep: a }) {
  const t = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ n("span", { className: `${b.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: b.link, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: b.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(ut, { name: r.name, gate: r.gate === !0, look: sb(l, t, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function db(e) {
  return /* @__PURE__ */ n("td", { className: b.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: b.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: b.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: b.define, children: "Define workflow" })
  ] }) : cb(e) });
}
function ht(e) {
  return e === void 0 ? void 0 : !0;
}
function $n(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: b.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: b.muted, children: t }) : /* @__PURE__ */ o("span", { className: b.stat, children: [
    /* @__PURE__ */ n("span", { className: `${b.statValue} ward-stat-value`, title: r, "data-raised": ht(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: b.sub, children: a })
  ] }) });
}
function ub(e) {
  return /* @__PURE__ */ n("td", { className: b.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: b.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: b.stat, children: [
    /* @__PURE__ */ n("span", { className: b.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: b.sub, children: e.summary })
  ] }) });
}
function hb(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function mb({ stream: e, href: a, presentation: t }) {
  const r = lb(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: ct, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": fe(e.streamStep, "chip") }, children: [
    ib(e, a),
    db(e),
    $n(hb(e.agents), e.agents === void 0 ? void 0 : rb(e.agents), "—"),
    ub(e.policy),
    $n(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function wb(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function wC(e) {
  if (wb(e)) return mb(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: b.row, onClick: ct, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: b.cell, children: [
      /* @__PURE__ */ n("a", { className: `${b.name} ward-target`, href: W(t), children: a.name }),
      /* @__PURE__ */ n(m, { ...$a(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: b.cell, children: /* @__PURE__ */ n("span", { className: b.chain, children: a.stages.map((r) => /* @__PURE__ */ n("span", { className: b.link, children: /* @__PURE__ */ n(ut, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: b.mono, children: dt(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: b.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: b.mono, title: a.inFlightHint, "data-raised": ht(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: b.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: b.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const _b = "_row_mdce7_2", fb = "_name_mdce7_16", vb = "_scope_mdce7_24", ba = {
  row: _b,
  name: fb,
  scope: vb
};
function bb(e) {
  return e === void 0 ? `${ba.row} ward-toolrow` : `${ba.row} ward-toolrow ${e}`;
}
function gb(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function pb({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function Nb({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function yb({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${ba.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function kb(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function _C({ tool: e, onChange: a, presentation: t }) {
  const r = $(), l = $(), i = gb(e, t), s = kb(t);
  return /* @__PURE__ */ o(s, { className: bb(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(pb, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${ba.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(yb, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(Nb, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const $b = "_strip_1qtlf_2", Cb = "_head_1qtlf_10", Sb = "_name_1qtlf_16", Rb = "_chart_1qtlf_24", Tb = "_segment_1qtlf_30", Lb = "_detailedChart_1qtlf_36", Eb = "_rail_1qtlf_49", xb = "_section_1qtlf_55", Ab = "_label_1qtlf_66", Ib = "_note_1qtlf_83", ee = {
  strip: $b,
  head: Cb,
  name: Sb,
  chart: Rb,
  segment: Tb,
  detailedChart: Lb,
  rail: Eb,
  section: xb,
  label: Ab,
  note: Ib
}, Mb = "No item in flight to preview.", qb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Pb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", ja = [1, 2, 3, 4, 5, 6], ga = 100;
function Bb(e, a) {
  return a.has(e) ? fe(e, "id") : "var(--ward-color-line)";
}
function Ob({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: ja.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: ee.segment,
      x: l * ga,
      y: "0",
      width: ga,
      height: "8",
      fill: Bb(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Db(e) {
  const a = e.slice(0, ja.length);
  for (; a.length < ja.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function jb({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${ee.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ga),
        y: "0",
        width: String(ga),
        height: "40",
        style: { fill: fe(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function mt(e) {
  return (a) => e == null ? void 0 : e(a);
}
function oa({ label: e, children: a }) {
  const t = $();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: ee.label, children: e }),
    a
  ] });
}
function Hb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: ee.note, children: a ?? Mb }) : /* @__PURE__ */ n(Ra, { item: { ...e, streamStep: na(t.streamStep) }, onOpen: mt(r), feed: null });
}
function Fb({ draft: e }) {
  const a = { "--stream": fe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ n(xe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...$a(e.key, e.streamStep) })
  ] });
}
function Wb(e) {
  const a = Db(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(oa, { label: "Board card", children: /* @__PURE__ */ n(Hb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(oa, { label: "Streams index row", children: /* @__PURE__ */ n(Fb, { draft: t }) }),
    /* @__PURE__ */ o(oa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(jb, { identities: a }),
      /* @__PURE__ */ n("p", { className: ee.note, children: qb })
    ] }),
    /* @__PURE__ */ n(oa, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: ee.note, children: Pb }) })
  ] });
}
function zb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": fe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ n(xe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...$a(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(Ra, { item: { ...a, streamStep: e.streamStep }, onOpen: mt(r) }),
    /* @__PURE__ */ n(Ob, { draft: e, streams: t })
  ] });
}
function fC(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Wb, { ...e }) : /* @__PURE__ */ n(zb, { ...e });
}
const Gb = "_row_ixlg5_6", Ub = "_headCell_ixlg5_10", Kb = "_cell_ixlg5_11", Vb = "_name_ixlg5_23", Yb = "_consequence_ixlg5_29", Xb = "_governed_ixlg5_36", Jb = "_control_ixlg5_42", Qb = "_byRole_ixlg5_48", Zb = "_webControl_ixlg5_59", eg = "_webConsequence_ixlg5_65", ag = "_webGoverned_ixlg5_71", j = {
  row: Gb,
  headCell: Ub,
  cell: Kb,
  name: Vb,
  consequence: Yb,
  governed: Xb,
  control: Jb,
  byRole: Qb,
  webControl: Zb,
  webConsequence: eg,
  webGoverned: ag
};
function ng({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: j.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: j.control, children: [
    /* @__PURE__ */ n(
      De,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "PILOT" })
  ] });
}
function tg({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: j.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: j.headCell, children: [
      /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: j.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: j.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(ng, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function rg(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function lg({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${j.webControl} ${j.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    De,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (l) => t == null ? void 0 : t(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${j.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "PILOT" }),
    r
  ] });
}
function og({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: j.row, children: [
    /* @__PURE__ */ o("td", { className: j.cell, children: [
      /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${j.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(lg, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n("span", { className: `${j.webGoverned} ward-cellmeta`, children: rg(e) }) })
  ] });
}
function vC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(og, { ...e }) : /* @__PURE__ */ n(tg, { ...e });
}
const ig = "_row_vv64h_2", sg = "_cell_vv64h_6", cg = "_name_vv64h_25", dg = "_note_vv64h_30", ug = "_webName_vv64h_41", hg = "_webMeta_vv64h_47", K = {
  row: ig,
  cell: sg,
  name: cg,
  note: dg,
  webName: ug,
  webMeta: hg
}, wt = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function mg(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function wg({ component: e, onRestart: a }) {
  const t = $(), r = wt[e.state], l = e.state === "drainFirst";
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
function _g({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: mg(e.state) });
}
function fg({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...wt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(_g, { component: e, onRestart: a }) })
  ] });
}
function bC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(fg, { ...e }) : /* @__PURE__ */ n(wg, { ...e });
}
const vg = "_row_1f1gp_7", bg = "_cell_1f1gp_11", gg = "_next_1f1gp_28", pg = "_headCell_1f1gp_38", Ng = "_webId_1f1gp_77", yg = "_webPurpose_1f1gp_83", kg = "_webMeta_1f1gp_91", $g = "_webUrgent_1f1gp_97", H = {
  row: vg,
  cell: bg,
  next: gg,
  headCell: pg,
  webId: Ng,
  webPurpose: yg,
  webMeta: kg,
  webUrgent: $g
}, Cg = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Sg = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, _t = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Rg = Object.fromEntries(_t.map((e) => [e.key, e]));
function Ge({ column: e, children: a }) {
  const t = Rg[e];
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
function gC() {
  return /* @__PURE__ */ n("tr", { children: _t.map((e) => /* @__PURE__ */ n(
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
function Tg({ cred: e }) {
  const a = Cg[e.state];
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n(Ge, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ge, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ge, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ge, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Ge, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ge, { column: "next", children: /* @__PURE__ */ n("span", { className: H.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Lg({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${H.webMeta} ${H.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function Eg({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(Lg, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { ...Sg[e.state] }) })
  ] });
}
function pC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Eg, { ...e }) : /* @__PURE__ */ n(Tg, { ...e });
}
const xg = "_card_17zba_2", Ag = "_head_17zba_11", Ig = "_env_17zba_18", Mg = "_version_17zba_25", qg = "_meta_17zba_32", Pg = "_webCard_17zba_37", Bg = "_webRow_17zba_47", Og = "_webTitle_17zba_55", Dg = "_webLine_17zba_65", jg = "_webVersion_17zba_72", Hg = "_webMeta_17zba_77", U = {
  card: xg,
  head: Ag,
  env: Ig,
  version: Mg,
  meta: qg,
  webCard: Pg,
  webRow: Bg,
  webTitle: Og,
  webLine: Dg,
  webVersion: jg,
  webMeta: Hg
}, ft = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Fg({ env: e }) {
  const a = ft[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function Wg(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ce(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function zg(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...ft[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: Wg(e) })
  ] });
}
function NC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(zg, { ...e }) : /* @__PURE__ */ n(Fg, { ...e });
}
const Gg = "_panel_1hmja_2", Ug = "_line_1hmja_8", Kg = "_actions_1hmja_14", ia = {
  panel: Gg,
  line: Ug,
  actions: Kg
};
function yC(e) {
  return /* @__PURE__ */ o("div", { className: ia.panel, children: [
    /* @__PURE__ */ n("p", { className: ia.line, children: e.status }),
    /* @__PURE__ */ n(A, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ia.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ia.line, children: e.note ?? "" })
  ] });
}
const Vg = "_upload_1vgt7_2", Yg = "_preview_1vgt7_7", Xg = "_mark_1vgt7_17", Jg = "_empty_1vgt7_22", Qg = "_actions_1vgt7_28", Zg = "_input_1vgt7_33", ep = "_reasons_1vgt7_41", ap = "_reason_1vgt7_41", np = "_accepted_1vgt7_57", te = {
  upload: Vg,
  preview: Yg,
  mark: Xg,
  empty: Jg,
  actions: Qg,
  input: Zg,
  reasons: ep,
  reason: ap,
  accepted: np
}, vt = 1.5, bt = 22, pa = "script elements or event handlers", Re = "links or external references", ke = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${vt}px at ${bt}px`], tp = [ke[1], ke[2], pa, Re], rp = /* @__PURE__ */ new Map([
  ["image", ke[1]],
  ["text", ke[2]],
  ["tspan", ke[2]],
  ["textPath", ke[2]],
  ["script", pa],
  ["foreignObject", pa],
  ["a", Re],
  ["use", Re],
  ["style", Re],
  ["feImage", Re],
  ["set", Re]
]), lp = "http://www.w3.org/2000/svg", op = "http://www.w3.org/2000/xmlns/", ip = /* @__PURE__ */ new Set([
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
]), sp = /* @__PURE__ */ new Set([
  "viewBox",
  "width",
  "height",
  "preserveAspectRatio",
  "version",
  "id",
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
]), an = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, cp = /url\s*\(|['"\\]/i;
function dp() {
  return { ok: !1, reasons: [ke[1]] };
}
function gt(e) {
  return e.namespaceURI === lp;
}
function up(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && gt(a) ? a : null;
  } catch {
    return null;
  }
}
function hp(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [ke[0]] : [];
}
function mp(e) {
  return rp.get(e.localName) ?? (e.localName.startsWith("animate") ? Re : void 0);
}
function wp(e) {
  return cp.test(e.replace(an, ""));
}
function _p(e) {
  return /^on/i.test(e.localName) ? pa : e.localName === "href" || wp(e.value) ? Re : void 0;
}
function fp(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(mp(t));
    for (const r of Array.from(t.attributes)) a.add(_p(r));
  }
  return tp.filter((t) => a.has(t));
}
function vp(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? bt / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < vt;
  }) ? [ke[3]] : [];
}
function bp(e) {
  if (e.namespaceURI === op) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (sp.has(a) || a.startsWith("stroke"));
}
function gp(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && gt(a) && ip.has(a.localName);
}
function pp(e, a) {
  gp(a) ? a.nodeType === Node.ELEMENT_NODE && pt(a) : e.removeChild(a);
}
function pt(e) {
  for (const a of Array.from(e.attributes)) bp(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) pp(e, a);
  return e;
}
function Np(e) {
  return Array.from(e.matchAll(an), (a) => a[2]).filter((a) => a !== "");
}
function yp(e) {
  let a = 2166136261;
  for (let t = 0; t < e.length; t += 1) a = Math.imul(a ^ e.charCodeAt(t), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function kp(e, a) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of Np(l.value)) t.has(i) || t.set(i, `${a}-${t.size}`);
  return t;
}
function $p(e, a) {
  for (const t of Array.from(e.attributes))
    t.value = t.value.replace(an, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function Cp(e, a) {
  const t = [e, ...Array.from(e.querySelectorAll("*"))], r = kp(t, a);
  for (const l of t) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), $p(l, r);
  }
  return e;
}
function kC(e) {
  const a = up(e);
  if (a === null) return dp();
  const t = [...hp(a), ...fp(a), ...vp(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(Cp(pt(a), yp(e))) };
}
const Sp = "Mark accepted.", Rp = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Tp = new Set(In.flatMap((e) => [fe(e, "id"), fe(e, "chip")]));
function Lp(e) {
  return e !== void 0 && (Rp.test(e) || Tp.has(e)) ? e : void 0;
}
function Ep({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": Lp(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function xp(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Ap(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Ip({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: Sp }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function Mp({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Ip, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${xp(e, t)}`, role: "status", children: Ap(e, t) });
}
function Cn(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function $C({ current: e, onUpload: a, onUseInitials: t, presentation: r, disabledReason: l }) {
  const i = p(null), [s, c] = g(null), u = (d) => {
    if (d === void 0) return;
    const h = a(d);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(Ep, { current: e }),
    /* @__PURE__ */ o("div", { className: te.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: i,
          className: te.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          disabled: l !== void 0,
          onChange: (d) => {
            var h;
            return u((h = d.target.files) == null ? void 0 : h[0]);
          }
        }
      ),
      /* @__PURE__ */ n(_, { ...Cn(l), onClick: () => {
        var d;
        return (d = i.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(_, { ...Cn(l), variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(Mp, { result: s, presentation: r })
  ] });
}
const qp = "_row_1wp9s_7", Pp = "_cell_1wp9s_11", Bp = "_head_1wp9s_28", Op = "_name_1wp9s_34", Dp = "_pinned_1wp9s_42", jp = "_headCell_1wp9s_49", Hp = "_webName_1wp9s_88", Fp = "_webMeta_1wp9s_95", Wp = "_webWarn_1wp9s_103", P = {
  row: qp,
  cell: Pp,
  head: Bp,
  name: Op,
  pinned: Dp,
  headCell: jp,
  webName: Hp,
  webMeta: Fp,
  webWarn: Wp
}, nn = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, Nt = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], zp = Object.fromEntries(Nt.map((e) => [e.key, e]));
function Gp(e, a) {
  return `mcp.${e}.${a}`;
}
function Up(e) {
  return Object.keys(nn).includes(e);
}
function Kp(e) {
  return nn[e !== void 0 && Up(e) ? e : "unknown"];
}
function Xe({ column: e, children: a }) {
  const t = zp[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: P.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function CC() {
  return /* @__PURE__ */ n("tr", { children: Nt.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: P.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function Vp({ server: e }) {
  const a = nn[e.connection];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o(Xe, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: P.head, children: [
        /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: P.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(Xe, { column: "connection", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Xe, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(Xe, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(Xe, { column: "tools", children: e.tools.map((t) => Gp(e.name, t)).join(" · ") })
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
  return e === null ? /* @__PURE__ */ n("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function Qp({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Zp({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function eN({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${P.webMeta} ward-cellmeta`, children: Yp(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(m, { ...Xp(e) }) }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(Jp, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(m, { ...Kp(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ n(Qp, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Zp, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function SC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(eN, { ...e }) : /* @__PURE__ */ n(Vp, { ...e });
}
const aN = "_row_1h9nq_2", nN = "_headCell_1h9nq_14", tN = "_cell_1h9nq_15", rN = "_name_1h9nq_26", lN = "_consequence_1h9nq_32", oN = "_reason_1h9nq_38", iN = "_value_1h9nq_44", sN = "_webRow_1h9nq_60", cN = "_webSetting_1h9nq_71", dN = "_webName_1h9nq_79", uN = "_webConsequence_1h9nq_87", hN = "_webControl_1h9nq_93", mN = "_webState_1h9nq_106", wN = "_webChip_1h9nq_111", x = {
  row: aN,
  headCell: nN,
  cell: tN,
  name: rN,
  consequence: lN,
  reason: oN,
  value: iN,
  webRow: sN,
  webSetting: cN,
  webName: dN,
  webConsequence: uN,
  webControl: hN,
  webState: mN,
  webChip: wN
}, yt = 104, kt = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function _N({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(De, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(On, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: x.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function fN({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = kt[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: x.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: x.headCell, children: [
      /* @__PURE__ */ n("span", { className: x.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: x.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: x.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: x.cell, children: /* @__PURE__ */ n(_N, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: x.cell, style: { width: yt }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function $t(e, a) {
  return String(e ?? a);
}
function vN(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function bN(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? $t(e.value, "—");
}
function gN({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: x.webControl, children: [
    /* @__PURE__ */ n(De, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: x.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function pN(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(gN, { ...e });
  const l = vN(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: x.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(On, { options: l, value: $t(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${x.webControl} ${x.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: bN(a) });
}
function NN({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = $(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${x.row} ${x.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: x.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${x.name} ${x.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${x.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: x.webControl, children: i(s) }) : /* @__PURE__ */ n(pN, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${x.webChip} ward-policy-chip`, style: { width: yt }, children: /* @__PURE__ */ n(m, { ...kt[t], size: "tag" }) })
  ] });
}
function RC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(NN, { ...e }) : /* @__PURE__ */ n(fN, { ...e });
}
const yN = "_label_1o9za_7", kN = "_name_1o9za_15", $N = "_column_1o9za_24", CN = "_webFrame_1o9za_57", SN = "_webHead_1o9za_62", RN = "_webHeadLabel_1o9za_74", TN = "_webLabel_1o9za_112", LN = "_webColumns_1o9za_119", EN = "_webGroup_1o9za_125", xN = "_webPeople_1o9za_126", AN = "_webVia_1o9za_127", IN = "_webMeta_1o9za_156", F = {
  label: yN,
  name: kN,
  column: $N,
  webFrame: CN,
  webHead: SN,
  webHeadLabel: RN,
  webLabel: TN,
  webColumns: LN,
  webGroup: EN,
  webPeople: xN,
  webVia: AN,
  webMeta: IN
}, MN = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, Ia = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Ma({ column: e, children: a }) {
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
function qN(e) {
  if (!e.matrixRole) return;
  const a = MN[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function PN({ node: e }) {
  const a = qN(e);
  return /* @__PURE__ */ o("span", { className: F.label, children: [
    /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
    /* @__PURE__ */ n(BN, { role: a, node: e }),
    /* @__PURE__ */ n(Ma, { column: Ia[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Ma, { column: Ia[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Ma, { column: Ia[2], children: e.requestedVia ?? "" })
  ] });
}
function BN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function ON({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    Wn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(PN, { node: t }),
      children: s
    }
  );
}
function qa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function DN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(qa, { className: `${F.webMeta} ${F.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(qa, { className: `${F.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(qa, { className: `${F.webMeta} ${F.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function jN() {
  return /* @__PURE__ */ o("div", { className: F.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: F.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: F.webColumns, children: [
      /* @__PURE__ */ n("span", { className: F.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: F.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: F.webVia, children: "Requested via" })
    ] })
  ] });
}
function HN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function FN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function WN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: F.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(jN, {}),
    /* @__PURE__ */ n(Tc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Wn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(HN, { row: t }),
        detail: /* @__PURE__ */ n(DN, { row: t }),
        expanded: FN(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function TC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(WN, { ...e }) : /* @__PURE__ */ n(ON, { ...e });
}
const zN = "_runbook_b9agc_2", GN = "_list_b9agc_7", UN = "_step_b9agc_15", KN = "_numeral_b9agc_21", VN = "_body_b9agc_28", YN = "_head_b9agc_34", XN = "_title_b9agc_40", JN = "_detail_b9agc_45", QN = "_actions_b9agc_50", ZN = "_webList_b9agc_56", ey = "_webStep_b9agc_60", ay = "_webBody_b9agc_66", ny = "_webTitle_b9agc_74", ty = "_webDetail_b9agc_78", T = {
  runbook: zN,
  list: GN,
  step: UN,
  numeral: KN,
  body: VN,
  head: YN,
  title: XN,
  detail: JN,
  actions: QN,
  webList: ZN,
  webStep: ey,
  webBody: ay,
  webTitle: ny,
  webDetail: ty
}, Ct = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function St(e) {
  return String(e + 1).padStart(2, "0");
}
function ry({ step: e, index: a, connection: t }) {
  const r = Ct[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: T.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: T.numeral, children: St(a) }),
    /* @__PURE__ */ o("span", { className: T.body, children: [
      /* @__PURE__ */ o("span", { className: T.head, children: [
        /* @__PURE__ */ n("span", { className: T.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n($e, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: T.detail, children: e.detail })
    ] })
  ] });
}
function ly({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: T.list, children: e.map((r, l) => /* @__PURE__ */ n(ry, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: T.actions, children: a })
  ] });
}
function oy({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${T.step} ${T.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${T.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: St(a) }),
    /* @__PURE__ */ o("span", { className: `${T.body} ${T.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${T.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${T.title} ${T.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Ct[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n($e, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${T.detail} ${T.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function iy({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${T.list} ${T.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(oy, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${T.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function LC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(iy, { ...e }) : /* @__PURE__ */ n(ly, { ...e });
}
const sy = "_list_1gu6a_2", cy = "_check_1gu6a_10", dy = "_body_1gu6a_16", uy = "_text_1gu6a_23", hy = "_pending_1gu6a_32", my = "_measured_1gu6a_37", Ke = {
  list: sy,
  check: cy,
  body: dy,
  text: uy,
  pending: hy,
  measured: my
};
function wy(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function _y({ check: e }) {
  const a = wy(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Ke.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Ya, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Ke.body, children: [
      /* @__PURE__ */ n("span", { className: Ke.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Ke.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Ke.measured, children: e.measured })
  ] });
}
function EC({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ke.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(_y, { check: a }, a.text)) });
}
const fy = "_root_khinh_2", vy = "_list_khinh_10", by = "_line_khinh_21", gy = "_at_khinh_48", py = "_text_khinh_52", Ny = "_foot_khinh_56", yy = "_idle_khinh_68", ky = "_caret_khinh_76", $y = "_jump_khinh_83", me = {
  root: fy,
  list: vy,
  line: by,
  at: gy,
  text: py,
  foot: Ny,
  idle: yy,
  caret: ky,
  jump: $y
}, Cy = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function tn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Cy.format(new Date(e));
}
const Sy = { warn: "warning", ok: "ok" };
function Ry({ kind: e }) {
  const a = Sy[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Ty({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${tn(e)}` });
}
function Ly({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${tn(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: me.idle, children: i }),
    /* @__PURE__ */ n(Ty, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const Ey = 8;
function xy(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > Ey;
}
function Ay({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Rt = He(null);
function xC({ announce: e, onAnnounceChange: a, children: t }) {
  const [r, l] = g(!1), i = En(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ n(Rt.Provider, { value: i, children: t });
}
function Iy() {
  const e = je(Rt), [a, t] = g(!1);
  return e ? [e.announce, e.setAnnounce] : [a, t];
}
function AC({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = p(null), [i, s] = g(0), [c, u] = Iy(), [d, h] = g(!1), f = e.at(-1);
  I(() => {
    s(e.length);
  }, [e.length]), Wa(() => {
    const N = l.current;
    N && !d && (N.scrollTop = N.scrollHeight);
  }, [e.length, d]);
  const v = () => {
    var q;
    const N = l.current;
    if (!N) return;
    const E = N.querySelectorAll("[data-consline-text]");
    (q = E.item(E.length - 1)) == null || q.focus(), h(!1);
  };
  return /* @__PURE__ */ o("div", { className: me.root, children: [
    /* @__PURE__ */ n("ol", { className: me.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (N) => h(xy(N.currentTarget)), children: e.map((N, E) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${N.kind}`, "data-kind": N.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ n("span", { className: me.at, children: tn(N.at) }),
      /* @__PURE__ */ n(Ry, { kind: N.kind }),
      /* @__PURE__ */ n("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: N.text })
    ] }, `${N.at}-${E}`)) }),
    /* @__PURE__ */ o(Ly, { connection: a, idleSince: t, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": c, onClick: () => u(!c), children: "Read new events" }),
      /* @__PURE__ */ n(Ay, { shown: d, onJump: v })
    ] })
  ] });
}
const My = "_row_11jhe_2", qy = "_head_11jhe_14", Py = "_author_11jhe_20", By = "_eta_11jhe_25", Oy = "_edited_11jhe_26", Dy = "_body_11jhe_32", jy = "_reason_11jhe_37", Hy = "_actions_11jhe_42", ge = {
  row: My,
  head: qy,
  author: Py,
  eta: By,
  edited: Oy,
  body: Dy,
  reason: jy,
  actions: Hy
}, Fy = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function Wy(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function zy({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function Gy({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: ge.reason, id: a, children: e })
  ] });
}
function Uy(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Ky(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(zy, { ...e }) : /* @__PURE__ */ n(Gy, { reason: e.unavailable, reasonId: e.unavailableId });
}
function IC(e) {
  const { comment: a } = e;
  Uy(e);
  const t = $(), r = `${t}-unavailable`, l = Fy[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${ge.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: ge.head, children: [
      /* @__PURE__ */ n("span", { className: ge.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: ge.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: ge.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: ge.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: ge.reason, id: t, children: Wy(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: ge.actions, children: /* @__PURE__ */ n(Ky, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Vy = "_root_c46wj_2", Yy = "_attach_c46wj_11", Xy = "_actions_c46wj_17", Jy = "_reply_c46wj_23", Qy = "_replyRow_c46wj_28", Zy = "_sendsAs_c46wj_42", Ye = {
  root: Vy,
  attach: Yy,
  actions: Xy,
  reply: Jy,
  replyRow: Qy,
  sendsAs: Zy
};
function e1({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = g(""), i = $();
  return /* @__PURE__ */ o("div", { className: Ye.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ye.replyRow, children: [
      /* @__PURE__ */ n(A, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(_, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ye.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function MC(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(e1, { ...e }) : /* @__PURE__ */ n(a1, { ...e });
}
function a1({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [s, c] = g("");
  return /* @__PURE__ */ o("div", { className: Ye.root, children: [
    /* @__PURE__ */ n(A, { kind: "textarea", label: e, value: s, onChange: c }),
    t && /* @__PURE__ */ o("div", { className: Ye.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      Pn,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Ye.actions, children: [
      /* @__PURE__ */ n(_, { variant: "primary", onClick: () => l(a, s), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(_, { variant: "ghost", onClick: () => i(s), children: "Save draft" })
    ] })
  ] });
}
const n1 = "_list_1ih9e_2", t1 = "_item_1ih9e_6", r1 = "_body_1ih9e_22", l1 = "_text_1ih9e_28", o1 = "_evidence_1ih9e_37", i1 = "_consequence_1ih9e_49", s1 = "_note_1ih9e_54", Oe = {
  list: n1,
  item: t1,
  body: r1,
  text: l1,
  evidence: o1,
  consequence: i1,
  note: s1
};
function c1({ criterion: e }) {
  return /* @__PURE__ */ n(xe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Sn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function d1(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function u1({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Oe.body, children: [
    /* @__PURE__ */ n("span", { className: Oe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(Sn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Oe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(Sn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Oe.consequence, children: d1(e.why) })
    ] })
  ] });
}
function h1({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Oe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(c1, { criterion: e }),
    /* @__PURE__ */ n(u1, { criterion: e })
  ] });
}
function qC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Oe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(h1, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Oe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const m1 = "_list_dwhoz_2", w1 = "_rung_dwhoz_6", _1 = "_name_dwhoz_18", f1 = "_actor_dwhoz_32", da = {
  list: m1,
  rung: w1,
  name: _1,
  actor: f1
}, v1 = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function b1({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = v1[e.state];
  return /* @__PURE__ */ o("li", { className: da.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: da.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${da.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function PC({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${da.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(b1, { rung: a }, a.name)) });
}
const g1 = "_sheet_1fqco_2", p1 = "_title_1fqco_9", N1 = "_stage_1fqco_15", y1 = "_effects_1fqco_20", k1 = "_effect_1fqco_20", $1 = "_numeral_1fqco_31", C1 = "_effectText_1fqco_38", S1 = "_refusals_1fqco_43", R1 = "_reasons_1fqco_52", T1 = "_reason_1fqco_52", L1 = "_actions_1fqco_62", ue = {
  sheet: g1,
  title: p1,
  stage: N1,
  effects: y1,
  effect: k1,
  numeral: $1,
  effectText: C1,
  refusals: S1,
  reasons: R1,
  reason: T1,
  actions: L1
};
function E1({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function BC({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = $(), u = `${c}-refusal`, [d, h] = g(""), f = t.length > 0;
  return /* @__PURE__ */ n(ta, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ue.effects, children: a.map((v, N) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ n("span", { className: ue.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ue.effectText, children: v })
    ] }, v)) }),
    /* @__PURE__ */ n(
      hs,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(A, { kind: "textarea", label: "Note for the agent", value: d, onChange: h }),
    f && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((v, N) => /* @__PURE__ */ n("li", { className: ue.reason, id: N === 0 ? u : void 0, children: v.reason }, v.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(E1, { refused: f, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ n(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const x1 = "_list_1hvqu_2", A1 = "_path_1hvqu_7", I1 = "_head_1hvqu_21", M1 = "_label_1hvqu_28", q1 = "_consequence_1hvqu_35", P1 = "_ask_1hvqu_36", Ve = {
  list: x1,
  path: A1,
  head: I1,
  label: M1,
  consequence: q1,
  ask: P1
}, Ha = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Rn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Tn(e) {
  return e ? "primary" : "secondary";
}
function B1({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(_, { variant: Tn(a), size: "sm", onClick: () => t(e.kind), children: Ha[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: Tn(a), size: "sm", disabled: !0, describedBy: r, children: Ha[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ve.ask, id: r, children: e.askInstead })
  ] });
}
function O1({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ve.path, "data-allowed": e.allowed, "data-role": Rn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ve.head, children: [
      /* @__PURE__ */ n("span", { className: Ve.label, children: e.title ?? Ha[e.kind] }),
      /* @__PURE__ */ n(m, { role: Rn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ve.consequence, children: e.consequence }),
    /* @__PURE__ */ n(B1, { path: e, primary: a, onChoose: t })
  ] });
}
function OC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ve.list, children: e.map((t, r) => /* @__PURE__ */ n(O1, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const D1 = "_list_1nyt1_2", j1 = "_item_1nyt1_6", H1 = "_node_1nyt1_18", F1 = "_body_1nyt1_24", W1 = "_head_1nyt1_30", z1 = "_stage_1nyt1_36", G1 = "_version_1nyt1_41", U1 = "_sentence_1nyt1_49", K1 = "_meta_1nyt1_54", Ne = {
  list: D1,
  item: j1,
  node: H1,
  body: F1,
  head: W1,
  stage: z1,
  version: G1,
  sentence: U1,
  meta: K1
}, V1 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Y1({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ n("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function X1({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ n(xe, { size: 9, kind: V1[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Y1, { entry: e }),
      /* @__PURE__ */ n("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${ce(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function DC({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ne.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(X1, { entry: a }, a.stage + String(t))) });
}
const J1 = "_thread_1kn6s_3", Q1 = "_turn_1kn6s_8", Z1 = "_who_1kn6s_27", ek = "_body_1kn6s_32", ua = {
  thread: J1,
  turn: Q1,
  who: Z1,
  body: ek
}, Tt = He(!1);
function jC({ children: e, density: a }) {
  return /* @__PURE__ */ n(Tt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ua.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function HC({ turn: e }) {
  if (!je(Tt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ua.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ua.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ce(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ua.body} ward-chat-body`, children: e.body })
  ] });
}
const ak = "_list_1rt9c_3", nk = "_row_1rt9c_7", tk = "_label_1rt9c_20", rk = "_n_1rt9c_26", lk = "_cause_1rt9c_33", Qe = {
  list: ak,
  row: nk,
  label: tk,
  n: rk,
  cause: lk
};
function ok(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const ik = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function sk({ row: e, formatNumber: a }) {
  return ok(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(xe, { size: 8, ...ik[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(ck, { cause: e.cause })
  ] });
}
function ck({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function FC({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(sk, { row: t, formatNumber: a }, t.label)) });
}
const dk = "_root_1jxwp_2", uk = {
  root: dk
};
function WC({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: uk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ta, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const hk = "_row_dhbre_3", mk = "_key_dhbre_13", wk = "_stack_dhbre_24", _k = "_value_dhbre_32", fk = "_evidence_dhbre_39", vk = "_mark_dhbre_47", Ue = {
  row: hk,
  key: mk,
  stack: wk,
  value: _k,
  evidence: fk,
  mark: vk
};
function bk({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ya, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function zC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ue.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Ue.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ue.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Ue.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Ue.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Ue.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(bk, { state: e.state }) })
  ] });
}
const gk = "_cell_1monp_2", pk = {
  cell: gk
}, Nk = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function yk(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function kk(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function $k(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: yk(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function Ck(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function GC({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  kk(e, t);
  const r = Ck(e);
  return /* @__PURE__ */ n(
    Ss,
    {
      label: "Rejection routing",
      columns: Nk,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: pk.cell, "data-norerun": l.noRerun ? !0 : void 0, children: $k(l, i) }),
      empty: a ?? /* @__PURE__ */ n(md, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Sk = "_row_ute8v_2", Rk = "_title_ute8v_11", Tk = "_turns_ute8v_20", Lk = "_waiting_ute8v_21", Ek = "_resolved_ute8v_22", xk = "_activity_ute8v_23", Ak = "_cost_ute8v_29", Ik = "_link_ute8v_30", Mk = "_tableRow_ute8v_47", qk = "_tableTitle_ute8v_59", Pk = "_tableResolved_ute8v_64", Bk = "_tableLink_ute8v_68", Ok = "_tableMeta_ute8v_83", Dk = "_tableCost_ute8v_90", jk = "_tableActivity_ute8v_91", Hk = "_tableState_ute8v_101", Fk = "_tableRecord_ute8v_112", D = {
  row: Sk,
  title: Rk,
  turns: Tk,
  waiting: Lk,
  resolved: Ek,
  activity: xk,
  cost: Ak,
  link: Ik,
  tableRow: Mk,
  tableTitle: qk,
  tableResolved: Pk,
  tableLink: Bk,
  tableMeta: Ok,
  tableCost: Dk,
  tableActivity: jk,
  tableState: Hk,
  tableRecord: Fk
}, Lt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function Wk(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function zk(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Gk(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const Uk = { duplicate: "CLOSED · DUPLICATE" };
function Kk({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: D.tableMeta, children: `waiting on ${e}` });
}
function Vk({ value: e }) {
  return /* @__PURE__ */ n("td", { className: D.tableCost, children: e === void 0 ? null : re(e) });
}
function Yk({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${D.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function Xk({ session: e, href: a }) {
  const t = Lt[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${D.tableLink} ward-target`, href: W(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: D.tableMeta, children: zk(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      Gk(e.resolved),
      /* @__PURE__ */ n(Kk, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(Vk, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: D.tableActivity, children: Wk(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: Uk[e.state] ?? t.label }),
      /* @__PURE__ */ n(Yk, { link: e.link })
    ] }) })
  ] });
}
function Jk({ session: e }) {
  const a = Lt[e.state];
  return /* @__PURE__ */ o("div", { className: D.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: D.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: D.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: D.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: D.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: D.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ n("span", { className: D.activity, children: ce(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: D.link, href: W(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function UC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(Xk, { session: e.session, href: e.href }) : /* @__PURE__ */ n(Jk, { session: e.session });
}
const Qk = "_block_1yy2v_3", Zk = "_list_1yy2v_9", e$ = "_line_1yy2v_14", Fa = {
  block: Qk,
  list: Zk,
  line: e$
}, a$ = { warn: "warning", ok: "ok" };
function n$({ kind: e }) {
  const a = a$[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function t$({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Fa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(n$, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function KC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Fa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Fa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(t$, { line: t }, `${r}-${t.text}`)) }) });
}
const r$ = "_band_tt7hp_1", l$ = "_head_tt7hp_8", o$ = "_cell_tt7hp_19", i$ = "_index_tt7hp_35", s$ = "_title_tt7hp_42", c$ = "_note_tt7hp_48", d$ = "_cellTitle_tt7hp_53", u$ = "_cellBody_tt7hp_58", h$ = "_tag_tt7hp_64", be = {
  band: r$,
  head: l$,
  cell: o$,
  index: i$,
  title: s$,
  note: c$,
  cellTitle: d$,
  cellBody: u$,
  tag: h$
}, Ln = 4;
function VC({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== Ln)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Ln}-cell grid`);
  return /* @__PURE__ */ o("section", { className: be.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: be.head, children: [
      /* @__PURE__ */ n("span", { className: be.index, children: e }),
      /* @__PURE__ */ n("span", { className: be.title, children: a }),
      /* @__PURE__ */ n("span", { className: be.note, children: t })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: be.cell, children: [
      /* @__PURE__ */ n("span", { className: be.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: be.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: be.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  M$ as ActionStack,
  AC as ActivityConsole,
  Rm as AgentCard,
  C$ as AppShell,
  fC as AppearanceStrip,
  VC as Band,
  x$ as BarChart,
  Vd as BoardColumn,
  Y$ as BoardFootnote,
  X$ as BoardHeader,
  H$ as BoardScroller,
  _ as Btn,
  N$ as CHIP_ROLES,
  _t as CREDENTIAL_COLUMNS,
  E$ as Callout,
  vC as CapabilityRow,
  HC as ChatMessage,
  Pn as Checkbox,
  m as Chip,
  IC as ClarificationRow,
  oC as ClauseRuleRow,
  lC as ClauseRules,
  Yn as ColourLadder,
  bC as ComponentRow,
  MC as Composer,
  Q$ as ConfigRow,
  J$ as ConfigRowHead,
  Xa as ConnectionMark,
  xC as ConsoleAnnounceProvider,
  jC as Conversation,
  hs as CostMeter,
  pC as CredentialRow,
  gC as CredentialRowHead,
  qC as CriteriaList,
  $l as Crumb,
  FC as DeliveryHealth,
  z$ as DeniedState,
  sC as DryRunRail,
  md as EmptyState,
  NC as EnvCard,
  A as Field,
  W$ as FilteredEmpty,
  D$ as FormStack,
  Ta as GateChecklist,
  PC as GateLadder,
  Ss as Grid,
  dC as HandoffRuleRow,
  cC as HandoffRules,
  Z$ as ItemDrawer,
  yC as KeyPanel,
  Ut as LIVE_EVENT_TYPES,
  Yh as LegacyBoardColumn,
  aC as LegacyBoardHeader,
  nC as LegacyConfigRow,
  rC as LegacyItemDrawer,
  Fh as LegacyOverCapNote,
  tC as LegacyPreviewRail,
  Un as LegacyWorkCard,
  $e as LiveIndicator,
  G$ as LoadFailed,
  V$ as Loading,
  Nt as MCP_SERVER_COLUMNS,
  Ya as Mark,
  $C as MarkUpload,
  xe as Marker,
  SC as McpServerRow,
  CC as McpServerRowHead,
  uC as NewStreamModal,
  fd as OverCapNote,
  ta as Overlay,
  iC as PARTIAL_STEP_REASON,
  yt as POLICY_CHIP_WIDTH,
  P$ as PageFrame,
  L$ as PageHeader,
  A$ as PlainList,
  RC as PolicyRow,
  eC as PreviewRail,
  Ia as ROLE_MATRIX_COLUMNS,
  it as RULE_ACTIONS,
  jn as Radio,
  WC as ReadyChecklist,
  O$ as RecordSection,
  BC as RequeueSheet,
  OC as ResolveBlock,
  zC as ResolvedFieldRow,
  TC as RoleMatrixRow,
  GC as RoutingTable,
  hC as RuleRow,
  LC as RunbookSteps,
  Gt as STREAM_STEPS,
  j$ as SectionBand,
  wn as SectionHeader,
  On as SegmentedControl,
  UC as SessionRow,
  T$ as Sidebar,
  mC as StageColumn,
  F$ as StageGrid,
  DC as StageHistory,
  of as StageListEditor,
  U$ as StaleStrip,
  Ca as StatStrip,
  wC as StreamRow,
  B$ as SubjectRail,
  De as Switch,
  R$ as TabLinks,
  I$ as TableHead,
  S$ as Tabs,
  _C as ToolRow,
  q$ as TopBar,
  Tc as Tree,
  Wn as TreeRow,
  KC as TypedInputBlock,
  Fr as UNSAFE_HREF,
  EC as ValidationList,
  f$ as VisibilityProvider,
  v$ as Visible,
  p$ as WARD_VERSION,
  Ra as WorkCard,
  K$ as WriteUnavailableStrip,
  Wk as agoSince,
  Bt as clock,
  $f as colourStatus,
  ae as count,
  se as duration,
  za as elapsed,
  g$ as eventSourceTransport,
  ya as isStreamStep,
  ka as isValidatedStreamStep,
  tw as ladderValidation,
  Kp as mcpConnectionChip,
  Gp as mcpToolName,
  re as money,
  we as ms,
  zn as ordered,
  xn as ratio,
  mg as restartLabel,
  W as safeHref,
  ce as stamp,
  Mn as stream,
  k$ as streamChip,
  $a as streamChipProps,
  fe as streamColour,
  Vt as streamHex,
  y$ as streamVars,
  sa as useBorderFlash,
  Ft as useFocusTrap,
  $$ as useLiveFeed,
  b$ as useReturnFocus,
  Na as useRovingTabindex,
  Ga as useTicker,
  Ot as useVisible,
  G as v,
  kC as validateMark,
  na as validatedStep,
  In as validatedStreamSteps
};
