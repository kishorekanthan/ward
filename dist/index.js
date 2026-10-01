import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as kt, useContext as Ke, createContext as Ve, useCallback as X, useEffect as x, useState as p, useRef as y, useLayoutEffect as Ha, useId as $, Children as $t, Fragment as Ct } from "react";
import { createPortal as St } from "react-dom";
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
const Rt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ce(e) {
  const a = Rt.formatToParts(new Date(e)), t = (r) => {
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
function Rn(e, a) {
  return `${e} / ${a}`;
}
const Tt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Et(e) {
  return Tt.format(new Date(e));
}
const Tn = Ve(/* @__PURE__ */ new Set());
function Q1({ hidden: e, children: a }) {
  const t = kt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Tn.Provider, { value: t, children: a });
}
function Lt(e) {
  return !Ke(Tn).has(e);
}
function Z1({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(S, { children: Lt(e) ? a : t });
}
const At = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function xt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function It(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = xt(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Mt(e) {
  return { onKeyDown: X(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(At));
      It(t, e.current, r);
    },
    [e]
  ) };
}
function e$(e, a = !0) {
  x(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const nn = { ArrowUp: -1, ArrowDown: 1 }, tn = { ArrowLeft: -1, ArrowRight: 1 }, qt = (e, a, t) => Math.min(t, Math.max(a, e));
function jt(e, a) {
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
      const f = Math.max(0, h.indexOf(a)), b = jt(u.key, e);
      b !== void 0 ? (u.preventDefault(), s(h[qt(f + b, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const a$ = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, n$ = "0.2.0", t$ = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Bt = [1, 2, 3, 4, 5, 6], Pt = [1, 2, 3], Ot = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
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
function En(e) {
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
function r$(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function l$(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Dt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Ht(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return Dt[e];
}
function rn(e) {
  return typeof e != "string" ? null : Ot.includes(e) ? e : null;
}
function Ft(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Wt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function zt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Gt(e, a, t) {
  const r = Ft(e);
  if (r === null) return null;
  const l = rn(t) ?? rn(r.type);
  return l === null ? null : { ...r, type: l, id: Wt(r, a), at: zt(r) };
}
function Ut(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Kt(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function o$(e, a) {
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
        const Ae = Gt(C, z, fe);
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
  }, [$e, D, oe, a, e]), Oe = X((C) => {
    g.current = !0, C.close(), h.current = null, f.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), De = X((C, z) => (s.current.set(z, C), () => {
    s.current.delete(z);
  }), []);
  return x(() => (ne(), b.current = window.setInterval(() => {
    const C = Date.now() - c.current, z = Ut(C, I.current);
    z && D(z);
    const fe = h.current;
    Kt(C, g.current, fe) && Oe(fe);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(f.current), g.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [ne, Oe, D]), { connection: t, lastEventAt: l, subscribe: De };
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
function Vt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ln(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function la(e, a) {
  const t = y(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Vt() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), s.style.setProperty("--flash", `var(--ward-color-${i})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => ln(s), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => ln(s), we.flash)));
  }, [a, e]);
  return x(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Yt = "_root_1otpc_2", Xt = {
  root: Yt
};
function Jt(e, a, t, r, l) {
  const i = [Fa(a)];
  return e || i.push(`as of ${Et(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function ke({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Wa(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Jt(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Xt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ce(e)
    ] })
  ] });
}
const Qt = "_app_1g5ye_1", Zt = "_side_1g5ye_18", er = "_main_1g5ye_26", ar = "_rail_1g5ye_33", nr = "_page_1g5ye_40", tr = "_root_1g5ye_91", rr = "_topbar_1g5ye_98", lr = "_mark_1g5ye_109", or = "_brand_1g5ye_116", ir = "_tagline_1g5ye_122", sr = "_identity_1g5ye_128", cr = "_tools_1g5ye_129", dr = "_metadata_1g5ye_138", ur = "_actor_1g5ye_153", hr = "_detail_1g5ye_154", mr = "_nav_1g5ye_159", wr = "_content_1g5ye_194", _r = "_toolsPanel_1g5ye_210", fr = "_skip_1g5ye_236", M = {
  app: Qt,
  side: Zt,
  main: er,
  rail: ar,
  page: nr,
  root: tr,
  topbar: rr,
  mark: lr,
  brand: or,
  tagline: ir,
  identity: sr,
  tools: cr,
  metadata: dr,
  actor: ur,
  detail: hr,
  nav: mr,
  content: wr,
  toolsPanel: _r,
  skip: fr
}, vr = "_btn_j72f1_2", br = "_primary_j72f1_13", pr = "_destructive_j72f1_24", gr = "_secondary_j72f1_34", yr = "_ghost_j72f1_39", Nr = "_overflow_j72f1_48", kr = "_sm_j72f1_55", $r = "_disabled_j72f1_59", aa = {
  btn: vr,
  primary: br,
  destructive: pr,
  secondary: gr,
  ghost: yr,
  overflow: Nr,
  sm: kr,
  disabled: $r
};
function Cr(e, a, t, r) {
  const l = a === "sm" ? [aa.sm, "ward-btn--sm"] : [], i = t ? [aa.disabled] : [];
  return [aa.btn, aa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Sr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Rr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Tr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Er(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Lr(e, a, t) {
  return Er(e.describedBy, a && t);
}
function Ar({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function xr(e) {
  return e.children ?? e.label;
}
function _(e) {
  Rr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = Tr(e), i = $();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Cr(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": Lr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Sr(a, e.controls),
        children: xr(e)
      }
    ),
    /* @__PURE__ */ n(Ar, { id: i, reason: l })
  ] });
}
const Ir = /^([a-z][a-z0-9+.-]*):/i, Mr = /* @__PURE__ */ new Set(["http", "https"]), qr = "#";
function jr(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Ir.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = jr(e);
  return a === void 0 || Mr.has(a) ? e : qr;
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
  const e = za("(max-width: 767.98px)"), a = $(), t = y(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Hr({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: M.tools, children: /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: M.tools, children: e });
}
function Fr({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function Wr(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ n("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Ia, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ n(Pr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(Or, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Hr, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function zr(e) {
  const a = $(), t = Dr();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Wr, { ...e, menu: t }),
    /* @__PURE__ */ n(Fr, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function Gr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function i$(e) {
  return Gr(e) ? /* @__PURE__ */ n(Br, { ...e }) : /* @__PURE__ */ n(zr, { ...e });
}
function Ga(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Ur = "_root_o4yib_2", Kr = "_row_o4yib_8", Vr = "_box_o4yib_14", Yr = "_label_o4yib_21", Xr = "_lockedNote_o4yib_26", Jr = "_consequence_o4yib_34", Qr = "_sample_o4yib_69", Me = {
  root: Ur,
  row: Kr,
  box: Vr,
  label: Yr,
  lockedNote: Xr,
  consequence: Jr,
  sample: Qr
};
function Zr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function el({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Me.consequence} ward-check-consequence`, children: a }) : null;
}
function al({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Me.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function nl({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Me.sample, "aria-hidden": "true", children: e }) : null;
}
function Ln(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = Zr(e);
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
        /* @__PURE__ */ n(al, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(nl, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(el, { id: t, text: e.consequence })
  ] });
}
const tl = "_chip_1073r_2", rl = {
  chip: tl
}, ll = {
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
function ol(e, a) {
  if (e === "stream") return il(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = ll[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function il(e) {
  if (!e || !pa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = En(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${rl.chip} ward-chip ward-chip--${e}`, style: ol(e, t), "data-ward-chip": e, "data-size": r, children: a });
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
const sl = "_nav_j90m2_2", cl = "_list_j90m2_8", dl = "_item_j90m2_15", ul = "_link_j90m2_30", hl = "_sep_j90m2_40", ml = "_current_j90m2_44", wl = "_chips_j90m2_48", xe = {
  nav: sl,
  list: cl,
  item: dl,
  link: ul,
  sep: hl,
  current: ml,
  chips: wl
};
function _l({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: xe.nav, children: [
    /* @__PURE__ */ n("ol", { className: xe.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: xe.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: xe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${xe.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: xe.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${xe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const fl = "_field_fy549_2", vl = "_label_fy549_8", bl = "_labelHidden_fy549_15", pl = "_control_fy549_25", gl = "_mono_fy549_44", yl = "_area_fy549_49", Nl = "_invalid_fy549_56", Te = {
  field: fl,
  label: vl,
  labelHidden: bl,
  control: pl,
  mono: gl,
  area: yl,
  invalid: Nl
}, kl = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function $l({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? kl : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function Cl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Sl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Rl = { input: $l, select: Cl, textarea: Sl };
function Tl(e, a, t) {
  const r = Rl[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function El(e, a, t) {
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
function Ll(e) {
  const a = e.mono ? [Te.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Te.area] : [];
  return [Te.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Al(e) {
  return e ? `${Te.label} ${Te.labelHidden} ward-field-label` : `${Te.label} ward-field-label`;
}
function A(e) {
  const a = $(), t = `${a}-msg`, r = El(e, a, t), l = Ll(e);
  return /* @__PURE__ */ o("div", { className: `${Te.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Al(e.labelHidden), htmlFor: a, children: e.label }),
    Tl(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Te.invalid} ward-field-error`, children: e.invalid })
  ] });
}
function xl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function An(e) {
  const a = xl(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function Ua(e, a, t) {
  x(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const s = An(r);
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
const Il = "_strip_tivso_2", Ml = "_tab_tivso_26", ql = "_count_tivso_49", Ma = {
  strip: Il,
  tab: Ml,
  count: ql
}, on = 7;
function jl(e, a) {
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
  Ha(() => {
    const t = e.current, r = t == null ? void 0 : t.querySelectorAll('[role="tab"]')[a];
    if (!t || !r) return;
    const l = Pl(t, r);
    l !== null && (t.scrollLeft = Math.max(0, l)), An(t);
  }, [e, a]);
}
function s$({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > on) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${on} — the set is fixed`);
  const i = va({ orientation: "horizontal" }), s = jl(e, a);
  x(() => i.setActive(s), [i.setActive, s]);
  const c = y(null);
  return Ua(c, e.length), Ol(c, s), /* @__PURE__ */ n(
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
const Dl = "_root_jem6y_2", Hl = "_segment_jem6y_7", sn = {
  root: Dl,
  segment: Hl
};
function xn({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
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
const Fl = "_sidebar_1jywv_3", Wl = "_brand_1jywv_9", zl = "_mark_1jywv_17", Gl = "_word_1jywv_24", Ul = "_nav_1jywv_30", Kl = "_navItem_1jywv_38", Vl = "_group_1jywv_50", Yl = "_groupName_1jywv_57", Xl = "_agents_1jywv_70", Jl = "_agent_1jywv_70", Ql = "_agentTop_1jywv_88", Zl = "_dot_1jywv_95", eo = "_agentName_1jywv_107", ao = "_agentMeta_1jywv_120", no = "_foot_1jywv_126", to = "_footName_1jywv_132", ro = "_footLinks_1jywv_139", lo = "_footLink_1jywv_139", oo = "_root_1jywv_153", io = "_linkBrand_1jywv_162", so = "_label_1jywv_183", co = "_note_1jywv_188", uo = "_footer_1jywv_202", R = {
  sidebar: Fl,
  brand: Wl,
  mark: zl,
  word: Gl,
  nav: Ul,
  navItem: Kl,
  group: Vl,
  groupName: Yl,
  new: "_new_1jywv_64",
  agents: Xl,
  agent: Jl,
  agentTop: Ql,
  dot: Zl,
  agentName: eo,
  agentMeta: ao,
  foot: no,
  footName: to,
  footLinks: ro,
  footLink: lo,
  root: oo,
  linkBrand: io,
  label: so,
  note: co,
  footer: uo
};
function ho({ agent: e }) {
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
              style: { "--dot": En(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: R.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: R.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function mo({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: R.foot, children: [
    /* @__PURE__ */ n("span", { className: R.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: R.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: `${R.footLink} ward-target`, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function wo({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: R.agents, children: r.map((s) => /* @__PURE__ */ n(ho, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(mo, { shared: i })
  ] });
}
function _o(e) {
  return e.destinations ?? e.items ?? [];
}
function fo({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.linkBrand, children: e });
}
function vo({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.footer, children: e });
}
function bo({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: R.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: R.note, children: e.note })
  ] });
}
function po(e) {
  return /* @__PURE__ */ o("aside", { className: `${R.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(fo, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: _o(e).map((a) => /* @__PURE__ */ n(bo, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(vo, { children: e.children })
  ] });
}
function go(e) {
  return "agents" in e;
}
function c$(e) {
  return go(e) ? /* @__PURE__ */ n(wo, { ...e }) : /* @__PURE__ */ n(po, { ...e });
}
const yo = "_mark_wlgi8_3", No = {
  mark: yo
}, ko = { met: "✓", unmet: "", failed: "✕" };
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
      children: ko[e]
    }
  );
}
const $o = "_marker_br9fi_2", Co = {
  marker: $o
}, So = {
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
  const r = { "--marker": So[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Co.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Ro = "_root_ti0pq_2", To = "_chip_ti0pq_11", Eo = "_noCase_ti0pq_23", na = {
  root: Ro,
  chip: To,
  noCase: Eo
};
function Lo(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Va({ connection: e, since: a, lastEventAt: t }) {
  const r = Lo(a, t), l = Wa(r, e === "reconnecting");
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
const Ao = "_root_k8vuh_2", xo = "_context_k8vuh_12", Io = "_row_k8vuh_1", Mo = "_heading_k8vuh_25", qo = "_headingWrap_k8vuh_33", jo = "_chips_k8vuh_38", Bo = "_title_k8vuh_45", Po = "_consequence_k8vuh_54", Oo = "_actionsWrap_k8vuh_59", Do = "_actions_k8vuh_59", Ho = "_action_k8vuh_59", Fo = "_overflowPanel_k8vuh_78", Wo = "_measureClip_k8vuh_89", zo = "_measure_k8vuh_89", Z = {
  root: Ao,
  context: xo,
  row: Io,
  heading: Mo,
  headingWrap: qo,
  chips: jo,
  title: Bo,
  consequence: Po,
  actionsWrap: Oo,
  actions: Do,
  action: Ho,
  overflowPanel: Fo,
  measureClip: Wo,
  measure: zo
};
function Go({ title: e, consequence: a, consequenceHint: t }) {
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
function Uo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(cn, { disclosure: l }) : a ? [/* @__PURE__ */ n(cn, { disclosure: l }, "more"), /* @__PURE__ */ n(qa, { actions: e }, "actions")] : /* @__PURE__ */ n(qa, { actions: e });
}
function Ko(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Vo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(qa, { actions: e }) });
}
function Yo(e, a) {
  const t = $(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Xo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Z.context, children: [
    /* @__PURE__ */ n(_l, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Z.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function Jo(...e) {
  return e.some((a) => a === null);
}
function Qo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Zo(e, a, t, r, l) {
  if (l === 0 || Jo(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], d = Qo(e), u = Math.max(0, e.clientWidth - i.offsetWidth - d);
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function ei(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function ai(e) {
  const a = y(null), t = y(null), r = y(null), l = y(null), [i, s] = p(!1);
  return x(() => {
    const c = a.current;
    if (!ei(c)) return;
    const d = () => s(Zo(c, t.current, r.current, l.current, e.length)), u = new ResizeObserver(d);
    return u.observe(c), d(), () => u.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function ni({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: Z.measureClip, children: /* @__PURE__ */ o("div", { className: Z.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function ti({ connection: e }) {
  return e ? /* @__PURE__ */ n(Va, { connection: e.connection, since: e.since }) : null;
}
function d$({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: h, headingRef: f, actionsRef: b, measureRef: g, collapsed: I } = ai(i), D = s.length > 0, { disclosure: oe, close: $e } = Yo(I || D, b), ne = Ko(s, i, I, d);
  return /* @__PURE__ */ o("header", { className: Z.root, "data-density": u, children: [
    /* @__PURE__ */ n(Xo, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Z.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: f, className: Z.headingWrap, children: /* @__PURE__ */ n(Go, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ n(ti, { connection: c }),
        /* @__PURE__ */ n("div", { className: Z.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(Uo, { actions: i, hasMore: D, collapsed: I, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Vo, { actions: ne, disclosure: oe, onEscape: $e }),
    /* @__PURE__ */ n(ni, { actions: i, hasMore: D, measureRef: g })
  ] });
}
const ri = "_scrim_c7sqj_2", li = "_drawer_c7sqj_10", oi = "_sheet_c7sqj_14", ii = "_modal_c7sqj_18", si = "_panel_c7sqj_23", ci = "_header_c7sqj_51", di = "_title_c7sqj_59", ui = "_body_c7sqj_63", hi = "_close_c7sqj_90", ye = {
  scrim: ri,
  drawer: li,
  sheet: oi,
  modal: ii,
  panel: si,
  header: ci,
  title: di,
  body: ui,
  close: hi
}, mi = Ve(null), ca = [], da = /* @__PURE__ */ new Map();
function wi(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function _i(e, a) {
  let t = da.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, da.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function fi(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !wi(r) && _i(e, r);
}
function vi(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (fi(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function bi(e) {
  for (const a of e.claims) {
    const t = da.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), da.delete(a)));
  }
}
function pi(e, a) {
  const t = { root: e, claims: [] };
  return ca.push(t), vi(t, a), t;
}
function gi(e) {
  const a = ca.indexOf(e);
  a >= 0 && ca.splice(a, 1), bi(e);
}
function dn(e) {
  return e !== null && ca.at(-1) === e;
}
function yi(e, a, t) {
  const r = y(null), l = y(t);
  return l.current = t, x(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = pi(i, a);
    return r.current = c, () => {
      var u, h;
      const d = dn(c);
      gi(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [a]), X(() => dn(r.current), []);
}
function Ni(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function ki(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function $i({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ye.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${ye.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ye.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ye.body} ward-drawer-body`, children: e.children })
  ] });
}
function Ci(e) {
  return `${ye.scrim} ${ye[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Si(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ye.panel} ${ye[e]} ward-overlay-panel${t}${r}`;
}
function Ri(e) {
  const a = Ke(mi);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = y(null), t = y(null), r = $(), l = Ri(e.container), i = za("(min-width: 768px)"), s = Ni(e.kind, i), c = ki(e, r), d = Mt(t), u = yi(a, l, e.returnFocusTo), h = X(() => {
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
  }, [h]), St(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Ci(s),
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
            className: Si(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => u() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ye.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n($i, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Ti = "_root_drrhx_2", Ei = "_ticket_drrhx_15", Li = "_body_drrhx_24", Sa = {
  root: Ti,
  ticket: Ei,
  body: Li
};
function u$({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Sa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Sa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Sa.body, children: t })
  ] });
}
const Ai = "_root_bf1pc_2", xi = "_table_bf1pc_9", Ii = "_caption_bf1pc_14", Mi = "_series_bf1pc_23", qi = "_category_bf1pc_31", ji = "_cell_bf1pc_39", Bi = "_track_bf1pc_45", Pi = "_lane_bf1pc_52", Oi = "_bar_bf1pc_56", Di = "_value_bf1pc_63", Hi = "_swatch_bf1pc_70", Fi = "_empty_bf1pc_78", V = {
  root: Ai,
  table: xi,
  caption: Ii,
  series: Mi,
  category: qi,
  cell: ji,
  track: Bi,
  lane: Pi,
  bar: Oi,
  value: Di,
  swatch: Hi,
  empty: Fi
}, Wi = "—", un = 6;
function zi(e, a) {
  if (a.length < 1 || a.length > un)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${un}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Gi(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function In(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Ui(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Ki({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Ui(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ o("span", { className: V.track, children: [
    /* @__PURE__ */ n("span", { className: V.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${V.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: V.value, children: e === null ? l : r(e) })
  ] }) });
}
function Vi({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: V.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: V.swatch, "data-step": In(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Yi({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${V.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: V.caption, children: e }),
    /* @__PURE__ */ n("p", { className: V.empty, children: a })
  ] });
}
function Xi({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: s = Wi }) {
  return /* @__PURE__ */ n("div", { className: `${V.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: V.table, children: [
    /* @__PURE__ */ n("caption", { className: V.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: V.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Vi, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: V.category, children: c }),
      t.map((u, h) => /* @__PURE__ */ n(Ki, { value: u.values[d], top: r, step: In(h, t.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function h$(e) {
  zi(e.categories, e.series);
  const a = Gi(e.series);
  return a === 0 ? /* @__PURE__ */ n(Yi, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Xi, { ...e, top: a });
}
const Ji = "_root_1bfqw_2", Qi = "_figure_1bfqw_7", Zi = "_of_1bfqw_13", es = "_bar_1bfqw_18", as = "_rows_1bfqw_38", ns = "_row_1bfqw_38", ts = "_label_1bfqw_49", rs = "_amount_1bfqw_54", Ce = {
  root: Ji,
  figure: Qi,
  of: Zi,
  bar: es,
  rows: as,
  row: ns,
  label: ts,
  amount: rs
};
function ls({ spent: e, ceiling: a, breakdown: t }) {
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
const os = "_frame_mg2jl_2", is = "_table_mg2jl_6", ss = "_th_mg2jl_12", cs = "_td_mg2jl_13", ds = "_sort_mg2jl_47", us = "_row_mg2jl_53", hs = "_empty_mg2jl_61", Re = {
  frame: os,
  table: is,
  th: ss,
  td: cs,
  sort: ds,
  row: us,
  empty: hs
}, ms = { asc: "ascending", desc: "descending" };
function ws(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ms[a.direction];
}
function _s(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function fs(e) {
  return e === void 0 ? void 0 : { width: e };
}
function vs({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: fs(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ws(e, a),
      children: _s(e, t)
    }
  );
}
function bs({ row: e, props: a }) {
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
function ps({
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(vs, { column: h, sort: c, onSort: d }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(bs, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(h))) })
  ] }) });
}
const gs = "_list_v0s52_2", ys = {
  list: gs
};
function m$({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: ys.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Ns = "_label_1u62a_2", ks = {
  label: Ns
};
function w$({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: ks.label, children: a.header }) }, a.key)) }) });
}
const $s = "_stack_bp6a0_2", Cs = {
  stack: $s
};
function _$({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Cs.stack, "data-ward-action-stack": "", children: e });
}
const Ss = "_set_y5zy3_2", Rs = "_legend_y5zy3_7", Ts = "_row_y5zy3_15", Es = "_control_y5zy3_20", Ls = "_input_y5zy3_26", As = "_label_y5zy3_31", xs = "_consequence_y5zy3_36", Ie = {
  set: Ss,
  legend: Rs,
  row: Ts,
  control: Es,
  input: Ls,
  label: As,
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
const Is = "_root_1pyf1_2", Ms = "_head_1pyf1_11", qs = "_index_1pyf1_31", js = "_dot_1pyf1_35", Bs = "_note_1pyf1_40", Ps = "_counter_1pyf1_46", Os = "_trailing_1pyf1_54", qe = {
  root: Is,
  head: Ms,
  index: qs,
  dot: js,
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
function Hs({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.counter, "aria-hidden": "true", children: e }) : null;
}
function hn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
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
    /* @__PURE__ */ n(Hs, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: qe.trailing, children: i })
  ] });
}
const Fs = "_strip_1cfs3_2", Ws = "_cell_1cfs3_7", zs = "_value_1cfs3_12", Gs = "_link_1cfs3_27", Us = "_label_1cfs3_39", Xe = {
  strip: Fs,
  cell: Ws,
  value: zs,
  link: Gs,
  label: Us
};
function Ks(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function Vs({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(S, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Xe.link} ward-stat-link ward-target`, href: W(e.href), "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function Na({ cells: e, divided: a = !1 }) {
  return Ks(e), /* @__PURE__ */ n("dl", { className: `${Xe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Xe.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Xe.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, title: t.hint, children: /* @__PURE__ */ n(Vs, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Xe.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Ys = "_root_xk7sv_2", Xs = "_track_xk7sv_8", Js = "_thumb_xk7sv_35", Qs = "_labelHidden_xk7sv_53", Zs = "_label_xk7sv_53", ec = "_lockedNote_xk7sv_68", je = {
  root: Ys,
  track: Xs,
  thumb: Js,
  labelHidden: Qs,
  label: Zs,
  lockedNote: ec
};
function ac(e) {
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
    /* @__PURE__ */ o("span", { id: c, className: ac(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: je.lockedNote, children: "always on" })
    ] })
  ] });
}
const nc = "_bar_1yrcg_2", tc = "_skip_1yrcg_11", rc = "_mark_1yrcg_22", lc = "_nav_1yrcg_30", oc = "_list_1yrcg_34", ic = "_select_1yrcg_40", sc = "_dest_1yrcg_47", cc = "_actor_1yrcg_75", dc = "_actorMark_1yrcg_88", uc = "_actorLabel_1yrcg_93", hc = "_tagline_1yrcg_112", de = {
  bar: nc,
  skip: tc,
  mark: rc,
  nav: lc,
  list: oc,
  select: ic,
  dest: sc,
  actor: cc,
  actorMark: dc,
  actorLabel: uc,
  tagline: hc
};
function mc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function wc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function f$({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = wc(r);
  return /* @__PURE__ */ o("header", { className: de.bar, children: [
    /* @__PURE__ */ n("a", { className: `${de.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: de.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: de.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: de.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: de.list, children: a.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${de.dest} ward-target`,
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
      /* @__PURE__ */ n("span", { className: de.actorMark, "aria-hidden": "true", children: mc(c) })
    ] })
  ] });
}
const _c = "_tree_1lyby_2", fc = "_item_1lyby_6", vc = "_row_1lyby_10", bc = "_button_1lyby_22", ua = {
  tree: _c,
  item: fc,
  row: vc,
  button: bc
}, qn = Ve(null);
function pc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = va({ orientation: "vertical" });
  return /* @__PURE__ */ n(qn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ua.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const gc = { ArrowRight: !0, ArrowLeft: !1 };
function mn(e) {
  return e ? !0 : void 0;
}
function yc(e, a) {
  const t = gc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Nc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function kc(e) {
  const a = [ua.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function $c(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Cc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Sc(e) {
  return typeof e == "string" ? e : void 0;
}
function Rc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Tc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function jn(e) {
  const a = Ke(qn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = $c(e);
  return /* @__PURE__ */ o("li", { className: ua.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: kc(e),
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
            onClick: () => Nc(e),
            onKeyDown: (r) => yc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Cc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Sc(e.label), children: e.label }),
              /* @__PURE__ */ n(Rc, { value: e.detail }),
              /* @__PURE__ */ n(Tc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Ec = "_frame_1fj9j_2", Lc = "_subjectRail_1fj9j_22", Ac = "_subject_1fj9j_22", xc = "_rail_1fj9j_42", Ic = "_record_1fj9j_64", Mc = "_recordBody_1fj9j_69", qc = "_stageGrid_1fj9j_118", jc = "_band_1fj9j_144", Bc = "_bandBody_1fj9j_153", Pc = "_bandActions_1fj9j_158", Oc = "_scroller_1fj9j_166", Dc = "_board_1fj9j_192", Hc = "_laneCount_1fj9j_200", Fc = "_lanes_1fj9j_210", Y = {
  frame: Ec,
  subjectRail: Lc,
  subject: Ac,
  rail: xc,
  record: Ic,
  recordBody: Mc,
  stageGrid: qc,
  band: jc,
  bandBody: Bc,
  bandActions: Pc,
  scroller: Oc,
  board: Dc,
  laneCount: Hc,
  lanes: Fc
};
function v$({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function wn(e) {
  return e ? "true" : void 0;
}
function b$({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": t, "data-ruled": wn(i), children: [
    /* @__PURE__ */ n("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: Y.rail, "data-sticky": wn(l), "aria-label": r, children: a })
  ] });
}
function p$({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(hn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(hn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: Y.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Wc = "_form_1j8ub_2", zc = "_fields_1j8ub_9", Gc = "_actions_1j8ub_19", Ra = {
  form: Wc,
  fields: zc,
  actions: Gc
};
function g$({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ra.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ra.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ra.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function y$({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: Y.bandActions, children: a })
  ] });
}
const Uc = "(max-width: 767.98px)";
function Ya({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = y(null);
  Ua(l, t ?? $t.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function Kc({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(A, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Ya, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Vc({ lanes: e, label: a }) {
  const [t, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(Ya, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(Ct, { children: l.content }, l.id)) })
  ] });
}
function N$({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = za(Uc);
  return t === void 0 ? /* @__PURE__ */ n(Ya, { label: a, children: e }) : l ? /* @__PURE__ */ n(Kc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Vc, { lanes: t, label: a });
}
function k$({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = y(null), i = Math.max(e, 1);
  Ua(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const Yc = "_block_1o5o7_2", Xc = "_sentence_1o5o7_15", Jc = "_meta_1o5o7_20", Qc = "_action_1o5o7_25", Zc = "_strip_1o5o7_29", ed = "_loading_1o5o7_48", ad = "_label_1o5o7_56", nd = "_counter_1o5o7_63", _e = {
  block: Yc,
  sentence: Xc,
  meta: Jc,
  action: Qc,
  strip: Zc,
  loading: ed,
  label: ad,
  counter: nd
};
function td({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(_, { onClick: e.onClick, children: e.label }) });
}
function ka({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: _e.sentence, children: e }),
    t,
    /* @__PURE__ */ n(td, { action: a })
  ] });
}
function rd(e) {
  return /* @__PURE__ */ n(ka, { ...e, kind: "ward-emptystate" });
}
function $$({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ka, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function C$(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function S$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ka, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    ce(a)
  ] }) });
}
function R$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ce(e),
    ". Showing snapshot from ",
    ce(a)
  ] });
}
function T$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ce(a)
  ] });
}
function E$({ label: e, startedAt: a }) {
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
const ld = "_note_tlubt_2", od = {
  note: ld
};
function id({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: od.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const sd = "_card_12in3_2", cd = "_hit_12in3_23", dd = "_head_12in3_30", ud = "_title_12in3_36", hd = "_meta_12in3_44", md = "_fields_12in3_45", wd = "_who_12in3_58", _d = "_sep_12in3_65", fd = "_mono_12in3_69", vd = "_field_12in3_45", bd = "_last_12in3_84", pd = "_reason_12in3_96", J = {
  card: sd,
  hit: cd,
  head: dd,
  title: ud,
  meta: hd,
  fields: md,
  who: wd,
  sep: _d,
  mono: fd,
  field: vd,
  last: bd,
  reason: pd
}, gd = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function yd(e, a, t) {
  const r = la(e, "blue"), l = la(e, "orange"), i = la(e, "green"), s = y(/* @__PURE__ */ new Set());
  x(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = gd[d.type];
      u && c[u]();
    });
  }, [r, t, i, a, l]);
}
const Nd = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function kd(e, a) {
  return Nd[a](e);
}
function $d({ item: e, connection: a }) {
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
function Cd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: J.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Sd({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: J.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Rd({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: J.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: J.field, children: kd(e, t) }, t)) });
}
const ja = (e) => e ? !0 : void 0;
function Td(e) {
  return { "--stream": Ee(e.streamStep, "id") };
}
function Ed(e, a, t) {
  e == null || e(a, t);
}
function Ld(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Ad({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: J.last, "data-stale": ja(a), children: t }) : null;
}
function $a(e) {
  const a = e.fields ?? [], t = e.item, r = y(null);
  yd(r, t.key, e.feed);
  const l = Ld(e.feed), i = Td(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: J.hit, onClick: (s) => Ed(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Cd, { item: t }),
        /* @__PURE__ */ n("p", { className: J.title, children: t.title }),
        /* @__PURE__ */ n($d, { item: t, connection: l }),
        /* @__PURE__ */ n(Sd, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Rd, { item: t, fields: a }),
        /* @__PURE__ */ n(Ad, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const xd = "_column_10sxg_3", Id = "_head_10sxg_24", Md = "_label_10sxg_33", qd = "_count_10sxg_42", jd = "_list_10sxg_56", Je = {
  column: xd,
  head: Id,
  label: Md,
  count: qd,
  list: jd
};
function Bn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Bd({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Pd(e) {
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
function Od({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = $(), h = e.cap !== void 0 && a.length > e.cap, f = Bn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Bd, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ n(Pd, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: f }),
    h && /* @__PURE__ */ n(id, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Dd = "_foot_8qg4p_2", Hd = "_note_8qg4p_13", Fd = "_link_8qg4p_19", Ta = {
  foot: Dd,
  note: Hd,
  link: Fd
};
function L$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ta.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ta.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Ta.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Wd = "_head_1la6p_3", zd = "_identity_1la6p_12", Gd = "_titleRow_1la6p_18", Ud = "_title_1la6p_18", Kd = "_key_1la6p_35", Vd = "_rollup_1la6p_45", Yd = "_tools_1la6p_53", Xd = "_swatch_1la6p_62", Jd = "_mark_1la6p_69", pe = {
  head: Wd,
  identity: zd,
  titleRow: Gd,
  title: Ud,
  key: Kd,
  rollup: Vd,
  tools: Yd,
  swatch: Xd,
  mark: Jd
}, _n = "initials:";
function Qd(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Zd(e) {
  const a = [Qd(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function eu(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Zd(e)
  ] });
}
function au(e) {
  return e.startsWith(_n) ? e.slice(_n.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function nu({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ee(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${pe.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: au(e) }) : /* @__PURE__ */ n("span", { className: pe.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function tu({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function A$({
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
        /* @__PURE__ */ n(nu, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: pe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: pe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: pe.rollup, "aria-live": "polite", children: eu(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: pe.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(tu, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(_, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Va, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const ru = "_head_kabyh_11", lu = "_line_kabyh_12", ou = "_cHandle_kabyh_33", iu = "_cName_kabyh_38", su = "_nameLine_kabyh_46", cu = "_cLabel_kabyh_53", du = "_cCap_kabyh_58", uu = "_cShown_kabyh_63", hu = "_name_kabyh_46", mu = "_noCap_kabyh_85", wu = "_state_kabyh_99", _u = "_handle_kabyh_104", fu = "_sub_kabyh_118", j = {
  head: ru,
  line: lu,
  cHandle: ou,
  cName: iu,
  nameLine: su,
  cLabel: cu,
  cCap: du,
  cShown: uu,
  name: hu,
  noCap: mu,
  state: wu,
  handle: _u,
  sub: fu
}, vu = "can't be hidden or collapsed", bu = "terminal · counted, not a column";
function x$() {
  return /* @__PURE__ */ o("div", { className: j.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: j.cHandle }),
    /* @__PURE__ */ n("span", { className: j.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: j.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: j.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: j.cShown, children: "Shown" })
  ] });
}
function pu(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function gu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function fn(e) {
  return e.gate ? vu : e.terminal ? bu : gu(e.agentsMounted);
}
function yu(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Nu({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: j.cName, children: [
    /* @__PURE__ */ o("span", { className: j.nameLine, children: [
      /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    fn(e) && /* @__PURE__ */ n("span", { className: j.sub, children: fn(e) })
  ] });
}
function ku(e) {
  return e === void 0 ? "" : String(e);
}
function $u(e) {
  return e === "" ? void 0 : Number(e);
}
function Cu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: j.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: j.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => yu(t, a),
      children: "⠿"
    }
  ) });
}
function Su({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${j.cCap} ${j.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: j.cCap, children: /* @__PURE__ */ n(A, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: ku(a.cap), onChange: (r) => t({ ...a, cap: $u(r) }) }) });
}
function Ru({ stage: e, config: a, onChange: t }) {
  const r = pu(e, a.shown);
  return /* @__PURE__ */ o("span", { className: j.cShown, children: [
    /* @__PURE__ */ n(Pe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: j.state, "aria-hidden": "true", children: r.state })
  ] });
}
function Tu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function I$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: j.line, "data-kind": Tu(e), children: [
    /* @__PURE__ */ n(Cu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Nu, { stage: e }),
    /* @__PURE__ */ n("span", { className: j.cLabel, children: /* @__PURE__ */ n(A, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(Su, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Ru, { stage: e, config: a, onChange: t })
  ] });
}
const Eu = "_body_hn6d6_2", Lu = "_head_hn6d6_9", Au = "_summary_hn6d6_19", xu = "_block_hn6d6_20", Iu = "_actionsBlock_hn6d6_21", Mu = "_title_hn6d6_41", qu = "_note_hn6d6_46", ju = "_k_hn6d6_51", Bu = "_kv_hn6d6_58", Pu = "_row_hn6d6_64", Ou = "_label_hn6d6_75", Du = "_value_hn6d6_84", Hu = "_quote_hn6d6_90", Fu = "_actions_hn6d6_21", Wu = "_resolve_hn6d6_103", B = {
  body: Eu,
  head: Lu,
  summary: Au,
  block: xu,
  actionsBlock: Iu,
  title: Mu,
  note: qu,
  k: ju,
  kv: Bu,
  row: Pu,
  label: Ou,
  value: Du,
  quote: Hu,
  actions: Fu,
  resolve: Wu
};
function zu(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Gu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Uu(e) {
  const a = ga(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Ku(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...ya(Uu(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...zu(e),
    ...Gu(e, a)
  ];
}
function Vu({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: B.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: B.k, children: a }),
    e
  ] });
}
function Yu({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: B.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Xu({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: B.block, children: [
    /* @__PURE__ */ n("p", { className: B.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: B.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: B.note, children: e.agentMeta })
  ] }) : null;
}
function M$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const d = $(), u = Ku(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: d, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: B.body, children: [
    /* @__PURE__ */ n(Yu, { item: e }),
    /* @__PURE__ */ o("div", { className: B.summary, children: [
      /* @__PURE__ */ n("h2", { className: B.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: B.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: B.kv, children: u.map(([h, f]) => /* @__PURE__ */ o("div", { className: B.row, children: [
      /* @__PURE__ */ n("dt", { className: B.label, children: h }),
      /* @__PURE__ */ n("dd", { className: B.value, children: f })
    ] }, h)) }),
    /* @__PURE__ */ n(Xu, { item: e }),
    /* @__PURE__ */ o("div", { className: B.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: B.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: B.note, children: c })
    ] }),
    /* @__PURE__ */ n(Vu, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Ju = "_root_3azmy_2", Qu = "_list_3azmy_7", Zu = "_item_3azmy_12", eh = "_box_3azmy_18", ah = "_text_3azmy_23", nh = "_note_3azmy_28", He = {
  root: Ju,
  list: Qu,
  item: Zu,
  box: eh,
  text: ah,
  note: nh
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
const th = "_rail_ke7ch_2", rh = "_k_ke7ch_11", lh = "_head_ke7ch_19", oh = "_section_ke7ch_25", ih = "_card_ke7ch_38", sh = "_strip_ke7ch_42", ch = "_skeleton_ke7ch_56", dh = "_skeletonLabel_ke7ch_70", uh = "_bar_ke7ch_76", hh = "_note_ke7ch_85", he = {
  rail: th,
  k: rh,
  head: lh,
  section: oh,
  card: ih,
  strip: sh,
  skeleton: ch,
  skeletonLabel: dh,
  bar: uh,
  note: hh
};
function mh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ea({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: he.k, children: e }),
    a
  ] });
}
function wh({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function _h({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Od, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function fh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(_h, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(wh, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function q$(e) {
  const a = mh(e.onOpen), t = Bn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ea, { title: "Card", children: /* @__PURE__ */ n("div", { className: he.card, children: t && /* @__PURE__ */ n($a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ea, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(fh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ea, { title: "Effect of this config", children: /* @__PURE__ */ n(Ca, { items: e.effects, density: "compact" }) })
  ] });
}
function vh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function bh(e) {
  return Math.ceil(e.length / 2);
}
function ph(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Pn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function gh(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Pn(e);
  l !== void 0 && t(l), r(ph(e.type));
}
function yh(e, a, t, r, l) {
  x(() => {
    if (e !== null)
      return e.subscribe(a, (i) => gh(i, t, r, l));
  }, [e, a, t, r, l]);
}
function Nh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function kh(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function $h(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Ch(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(bh(a ?? [])) + ")"
  };
}
function Sh(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Rh(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: re(e.cost) }) : null;
}
function Th(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Eh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Lh(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Ah(e, a) {
  return a === void 0 ? e : vh(e, a.ref);
}
function xh(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ze(e) {
  return e === !0 ? "true" : void 0;
}
function On(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = y(null), i = la(l), s = y(/* @__PURE__ */ new Set()), [c, d] = p(Nh(a));
  yh(e.feed, a.key, s, d, i);
  const u = kh(a, r), h = $h(a, t), f = Ch(a, e.fields), b = Lh(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...xh(e),
      className: "ward-workcard",
      "data-flagged": Ze(a.flagged),
      "data-selected": Ze(e.selected),
      style: f,
      ref: Ah(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Sh(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Rh(a, e.fields),
          Th(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Eh(t, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Ih({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Mh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function qh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function jh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Ih, { count: e.items.length, cap: e.column.cap });
}
function Bh(e, a) {
  return e.roving ?? a;
}
function Ph(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Oh(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    On,
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
function Dh(e) {
  const a = $(), t = va({ orientation: "vertical" }), r = Bh(e, t), l = Mh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ze(l), "data-gate": Ze(e.column.gate), children: [
    qh(e.column, e.items.length, a),
    jh(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Ph(e, t), children: Oh(e, r) })
  ] });
}
function Hh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Fh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Wh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function j$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Hh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Fh(e),
      Wh(e.onConfigure),
      /* @__PURE__ */ n(Va, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function zh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Gh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Pe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Pe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Uh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function B$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ze(zh(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Gh(e) }),
    /* @__PURE__ */ n(A, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Ln, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Uh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function P$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(On, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Dh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Kh(e, a) {
  const t = Pn(e);
  t !== void 0 && a(t);
}
function Vh(e, a, t) {
  x(() => {
    if (e != null)
      return e.subscribe(a, (r) => Kh(r, t));
  }, [e, a, t]);
}
function Yh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Xh(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function Jh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Qh(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function O$(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  Vh(e.feed, a.key, l);
  const i = [...Yh(a), ...Xh(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Jh(t, r)
    ] }),
    Qh(a, e.actions)
  ] });
}
const Zh = "_card_d2vbe_2", em = "_head_d2vbe_22", am = "_mark_d2vbe_30", nm = "_name_d2vbe_42", tm = "_chips_d2vbe_63", rm = "_description_d2vbe_69", lm = "_run_d2vbe_74", om = "_sep_d2vbe_83", im = "_facts_d2vbe_88", sm = "_fact_d2vbe_88", cm = "_factLabel_d2vbe_101", dm = "_factValue_d2vbe_105", le = {
  card: Zh,
  head: em,
  mark: am,
  name: nm,
  chips: tm,
  description: rm,
  run: lm,
  sep: om,
  facts: im,
  fact: sm,
  factLabel: cm,
  factValue: dm
}, um = { live: "done", draft: "running", paused: "meta" };
function hm(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function mm({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: um[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function wm({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function _m({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function fm({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function vm(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function bm({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": Ee(e.streamStep, "id") }, d = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: hm(s),
      style: c,
      "data-selected": d,
      "data-paused": vm(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(wm, { description: e.description }),
        /* @__PURE__ */ n(_m, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(mm, { versions: e.versions }),
        /* @__PURE__ */ n(fm, { facts: i })
      ]
    }
  );
}
const pm = "_list_4dcyc_2", gm = "_row_4dcyc_11", ym = "_head_4dcyc_23", Nm = "_id_4dcyc_30", km = "_lock_4dcyc_35", $m = "_reason_4dcyc_41", Cm = "_remove_4dcyc_46", Sm = "_clauses_4dcyc_50", Rm = "_clause_4dcyc_50", Tm = "_label_4dcyc_64", Em = "_cell_4dcyc_71", Lm = "_value_4dcyc_76", ie = {
  list: pm,
  row: gm,
  head: ym,
  id: Nm,
  lock: km,
  reason: $m,
  remove: Cm,
  clauses: Sm,
  clause: Rm,
  label: Tm,
  cell: Em,
  value: Lm
}, Dn = Ve(!1);
function D$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Dn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function Am({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(A, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function xm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ie.reason, children: e })
  ] });
}
function Im({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ n("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(xm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function vn(e, a) {
  return e.locked ? void 0 : a;
}
function H$({ rule: e, onChange: a, onRemove: t }) {
  if (!Ke(Dn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = vn(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Im, { rule: e, onRemove: vn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ n("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ie.cell, children: /* @__PURE__ */ n(Am, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Mm = "_ladder_wwnch_2", qm = "_cell_wwnch_7", jm = "_empty_wwnch_26", Bm = "_name_wwnch_34", Pm = "_holder_wwnch_40", Om = "_request_wwnch_46", Dm = "_swatches_wwnch_51", Hm = "_swatch_wwnch_51", Fm = "_tilesFrame_wwnch_78", Wm = "_tiles_wwnch_78", zm = "_tile_wwnch_78", Gm = "_bar_wwnch_117", Um = "_hex_wwnch_128", Km = "_note_wwnch_138", E = {
  ladder: Mm,
  cell: qm,
  empty: jm,
  name: Bm,
  holder: Pm,
  request: Om,
  swatches: Dm,
  swatch: Hm,
  tilesFrame: Fm,
  tiles: Wm,
  tile: zm,
  bar: Gm,
  hex: Um,
  note: Km
}, Vm = "not validated yet, pending a CVD matrix and dark stepping";
function Ym(e) {
  return e.reserved ? "reserved" : pa(e.step) ? "validated" : "partial";
}
function Hn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Xm(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Jm({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Le, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Qm(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Zm(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const bn = (e) => String(e).padStart(2, "0");
function ew(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Hn(e, void 0);
}
function aw({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${bn(e)}` : Ht(e) }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: r ? t : `Step ${bn(e)} · ${t}` })
  ] });
}
function nw({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = Ym(e), s = Hn(i, t), c = s !== "free", d = a === e.step, u = e.name ?? `Step ${e.step}`, h = () => {
    c || r(e.step);
  }, f = `${u} · ${l === "tiles" && d ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": f, ...Zm(c, d), "data-validation": i, style: Xm(e, i), onClick: h, onKeyDown: (g) => Qm(g, h) }, label: f, name: u, holder: s, validation: i, note: ew(i, t, d), step: e.step };
}
const tw = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(aw, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Jm, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function rw(e) {
  return tw[e.presentation](nw(e));
}
function lw(e) {
  for (const a of e)
    if (!a.reserved && !ba(a.step)) throw new Error("colour ladder renders token steps only");
}
function ow() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function iw(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const sw = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function cw() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const dw = { list: ow, swatches: () => null, tiles: cw };
function Fn(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  lw(e.steps);
  const r = iw(e), l = dw[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(rw, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${sw[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: E.tiles, children: i }) : i });
}
const uw = "_rail_1el2t_2", hw = "_section_1el2t_12", mw = "_sectionFlush_1el2t_22", ww = "_head_1el2t_26", _w = "_headLabel_1el2t_34", fw = "_sample_1el2t_42", vw = "_sampleLabel_1el2t_47", bw = "_sampleTitle_1el2t_54", pw = "_sampleMeta_1el2t_59", gw = "_trace_1el2t_65", yw = "_traceHead_1el2t_70", Nw = "_steps_1el2t_78", kw = "_step_1el2t_78", $w = "_stepTitle_1el2t_97", Cw = "_hollow_1el2t_107", Sw = "_stepBody_1el2t_115", Rw = "_stepDetail_1el2t_127", Tw = "_publish_1el2t_132", Ew = "_reason_1el2t_138", Lw = "_note_1el2t_143", Aw = "_reveal_1el2t_148", N = {
  rail: uw,
  section: hw,
  sectionFlush: mw,
  head: ww,
  headLabel: _w,
  sample: fw,
  sampleLabel: vw,
  sampleTitle: bw,
  sampleMeta: pw,
  trace: gw,
  traceHead: yw,
  steps: Nw,
  step: kw,
  stepTitle: $w,
  hollow: Cw,
  stepBody: Sw,
  stepDetail: Rw,
  publish: Tw,
  reason: Ew,
  note: Lw,
  reveal: Aw
}, pn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, xw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Iw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Mw = { notSimulated: "not simulated", running: "running" };
function qw(e) {
  return e.presentation === "foundry";
}
function jw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Bw(e, a) {
  var r;
  const t = xw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Pw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Ow(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Dw(e) {
  if (Pw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Hw(e) {
  const [a, t] = p(!1);
  x(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${N.step} ${N.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Fw(e) {
  const a = Mw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: N.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Le, { size: 6, kind: Iw[e.kind], label: e.kind });
}
function Ww(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: N.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function zw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Gw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Hw, { kind: a.kind, children: [
    /* @__PURE__ */ n(Fw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: N.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: N.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Ww, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(zw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Uw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(se(a)), t.join(" · ");
}
function Wn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${N.trace} ${N.section}`, children: [
    /* @__PURE__ */ n("p", { className: N.traceHead, id: a, children: Uw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: N.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Gw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Kw(e) {
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
function Vw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ce(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${N.sampleMeta} ${N.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Yw(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Rn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(Na, { divided: !0, cells: a }) });
}
function Xw(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Rn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Jw(e) {
  const a = Xw(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: N.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(Na, { divided: !0, cells: a }) });
}
function zn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: `${N.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Qw(e) {
  return /* @__PURE__ */ o("div", { className: `${N.publish} ${N.section}`, children: [
    /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: N.note, children: e.note })
  ] });
}
function Zw(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${N.publish} ${N.section}`, children: /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Gn(e) {
  return /* @__PURE__ */ o("div", { className: `${N.head} ${N.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: N.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: pn[e.run.status].role, label: pn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function e_(e, a) {
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
function a_(e) {
  var t;
  Ow(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Kw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Yw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist }) }),
    /* @__PURE__ */ n(Qw, { reason: jw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function n_(e) {
  var r;
  const a = e_(e.run, e.feed);
  Dw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Vw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Jw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Zw, { reason: Bw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function F$(e) {
  return qw(e) ? /* @__PURE__ */ n(n_, { ...e }) : /* @__PURE__ */ n(a_, { ...e });
}
const t_ = "_list_142ip_3", r_ = "_row_142ip_9", l_ = "_condition_142ip_18", o_ = "_action_142ip_24", oa = {
  list: t_,
  row: r_,
  condition: l_,
  action: o_
}, Un = Ve(!1);
function W$({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Un.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oa.list, "aria-label": a, children: e }) });
}
function z$({ rule: e }) {
  if (!Ke(Un)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
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
function Kn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Vn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function gn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function i_(e) {
  return e === "up" ? "down" : "up";
}
function s_(e, a) {
  const t = gn(e, a.id, a.direction) ?? gn(e, a.id, i_(a.direction));
  t == null || t.focus();
}
function Yn() {
  const e = y(null), [a, t] = p(null), [r, l] = p("");
  return x(() => {
    e.current !== null && a !== null && s_(e.current, a);
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
const c_ = "_body_1h15q_2", d_ = "_title_1h15q_8", u_ = "_section_1h15q_13", h_ = "_legend_1h15q_18", m_ = "_stages_1h15q_26", w_ = "_stage_1h15q_26", __ = "_stageIndex_1h15q_44", f_ = "_stageName_1h15q_50", v_ = "_footer_1h15q_59", b_ = "_note_1h15q_66", p_ = "_reason_1h15q_71", g_ = "_actions_1h15q_76", y_ = "_webHead_1h15q_83", N_ = "_kicker_1h15q_92", k_ = "_webTitle_1h15q_99", $_ = "_webBody_1h15q_105", C_ = "_webSection_1h15q_109", S_ = "_sectionHead_1h15q_121", R_ = "_sectionNote_1h15q_129", T_ = "_formLabel_1h15q_134", E_ = "_identityRow_1h15q_139", L_ = "_nameCell_1h15q_145", A_ = "_keyCell_1h15q_150", x_ = "_colourCell_1h15q_154", I_ = "_colourStatus_1h15q_161", M_ = "_webStages_1h15q_166", q_ = "_webStageList_1h15q_172", j_ = "_webStage_1h15q_166", B_ = "_webIndex_1h15q_191", P_ = "_webStageName_1h15q_196", O_ = "_webMoves_1h15q_201", D_ = "_addStage_1h15q_215", H_ = "_addStageButton_1h15q_223", F_ = "_addStageNote_1h15q_231", W_ = "_webFooter_1h15q_236", z_ = "_webFooterNotes_1h15q_244", G_ = "_webNote_1h15q_251", w = {
  body: c_,
  title: d_,
  section: u_,
  legend: h_,
  stages: m_,
  stage: w_,
  stageIndex: __,
  stageName: f_,
  footer: v_,
  note: b_,
  reason: p_,
  actions: g_,
  webHead: y_,
  kicker: N_,
  webTitle: k_,
  webBody: $_,
  webSection: C_,
  sectionHead: S_,
  sectionNote: R_,
  formLabel: T_,
  identityRow: E_,
  nameCell: L_,
  keyCell: A_,
  colourCell: x_,
  colourStatus: I_,
  webStages: M_,
  webStageList: q_,
  webStage: j_,
  webIndex: B_,
  webStageName: P_,
  webMoves: O_,
  addStage: D_,
  addStageButton: H_,
  addStageNote: F_,
  webFooter: W_,
  webFooterNotes: z_,
  webNote: G_
}, U_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Jn = "not in catalogue";
function K_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Jn}` }, ...t];
}
function V_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(A, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Jn}`;
  return /* @__PURE__ */ n(A, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: K_(t, e.name), invalid: i, onChange: r });
}
function Qn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Y_(e) {
  const a = y([]), t = y(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function X_({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Qn(a, t), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(V_, { stage: a, index: t, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(A, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: U_, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function J_({ stages: e, onChange: a, catalogue: t }) {
  const r = Y_(e.length), l = Yn(), i = (c, d) => {
    const u = Kn(c, d);
    r.current = Ba(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Vn(Qn(e[c], c), u, e.length)), a(Ba(e, c, u));
  }, s = (c, d) => a(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(X_, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: t, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Xn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Q_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Z_ = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], ef = "A new stream starts as a draft. Nothing runs on it until you publish it.", af = "Create is disabled: name the stream and give it a key first.", nf = "reorder with the ↑ ↓ buttons · min 2";
function Xa(e, a) {
  return !e.reserved && pa(e.step) && a[e.step] === void 0;
}
function tf(e, a) {
  const t = e.find((r) => Xa(r, a));
  return t ? t.step : 1;
}
function rf({ stages: e, onMove: a }) {
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
function lf({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: ef }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(_, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function of(e, a) {
  return e !== "" && a !== "" ? null : af;
}
function sf(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = Z_, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = $(), [h, f] = p(""), [b, g] = p(""), [I, D] = p(a[0].value), [oe, $e] = p(() => tf(t, r)), [ne, Oe] = p(e.stages ?? Q_), [De, C] = p(l[0].value), z = { name: h, key: b, streamStep: oe, owner: I, stages: ne, policy: De }, fe = of(h, b);
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
      /* @__PURE__ */ n(Fn, { label: "Stream colour", steps: t, value: oe, onChange: $e, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(rf, { stages: ne, onMove: (Ae, Nt) => Oe(Ba(ne, Ae, Nt)) })
    ] }),
    /* @__PURE__ */ n(Mn, { legend: "Loop policy", options: l, value: De, onChange: C }),
    /* @__PURE__ */ n(lf, { reason: fe, onCreate: () => i(z), onDraft: () => s(z) })
  ] }) });
}
const Zn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], cf = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function df(e, a, t, r, l, i) {
  var c;
  const s = ((c = Zn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function uf(e, a) {
  return hf(e) && mf(e, a) && wf(e);
}
function hf(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function mf(e, a) {
  return e.colourStep !== null && Xa({ step: e.colourStep }, a);
}
function wf(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function _f(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${Vm}.` : Xa({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function ff({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function vf({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(ff, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: cf })
    ] }),
    l && /* @__PURE__ */ n(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function bf({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function pf({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function gf(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, f] = p(null), [b, g] = p("relay"), [I, D] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = df(l, s, d, h, b, I), $e = uf(oe, r), ne = I.find((C) => C.kind === "agent" && C.name.trim() !== ""), Oe = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Fn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: f, takenBy: r })
  ] }), De = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: _f(h, r) }),
    /* @__PURE__ */ n(A, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((C) => ({ value: C, label: C })), onChange: u })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(bf, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(pf, { name: l, setName: i, streamKey: s, setKey: c, colour: Oe, owner: De }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: nf })
        ] }),
        /* @__PURE__ */ n(J_, { stages: I, onChange: D })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(Mn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Zn, onChange: g }) }),
      /* @__PURE__ */ n(vf, { ready: $e, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function G$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(gf, { ...e }) : /* @__PURE__ */ n(sf, { ...e });
}
const yf = "_row_bs8hc_2", Nf = "_cell_bs8hc_6", kf = "_condition_bs8hc_11", $f = "_action_bs8hc_18", Cf = "_contract_bs8hc_24", Sf = "_contractCondition_bs8hc_33", Rf = "_contractAction_bs8hc_39", Q = {
  row: yf,
  cell: Nf,
  condition: kf,
  action: $f,
  contract: Cf,
  contractCondition: Sf,
  contractAction: Rf
}, et = ["advance", "block", "escalate", "requestReview"], yn = {
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
      options: et.map((l) => ({ value: l, label: yn[l] }))
    }
  );
}
function Tf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: Q.condition, title: ma(e, r), children: ma(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Ja(e, a, t) })
  ] });
}
function Ef({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: Q.condition, children: ma(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Ja(e, a, t) })
  ] });
}
function Lf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractCondition, children: ma(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractAction, children: Ja(e, a, t, !0) })
  ] });
}
const Af = { two: Ef, four: Tf, contract: Lf };
function U$(e) {
  var t;
  if (!et.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Af[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const xf = "_column_k4nls_2", If = "_head_k4nls_17", Mf = "_index_k4nls_23", qf = "_name_k4nls_29", jf = "_meta_k4nls_38", Bf = "_mono_k4nls_43", Pf = "_gate_k4nls_50", Of = "_reviewersLabel_k4nls_57", Df = "_reviewers_k4nls_57", Hf = "_reviewer_k4nls_57", Ff = "_agents_k4nls_74", Wf = "_workflowColumn_k4nls_79", zf = "_workflowHead_k4nls_96", Gf = "_stageRow_k4nls_102", Uf = "_stageLabel_k4nls_109", Kf = "_workflowTitle_k4nls_116", Vf = "_workflowMeta_k4nls_122", Yf = "_workflowGate_k4nls_127", Xf = "_gateNote_k4nls_135", Jf = "_cardNote_k4nls_140", Qf = "_reviewerList_k4nls_145", Zf = "_reviewerRow_k4nls_151", ev = "_reviewerMark_k4nls_157", av = "_reviewerName_k4nls_167", nv = "_terminalCard_k4nls_173", tv = "_terminalCount_k4nls_182", rv = "_workflowAgents_k4nls_188", lv = "_mount_k4nls_194", k = {
  column: xf,
  head: If,
  index: Mf,
  name: qf,
  meta: jf,
  mono: Bf,
  gate: Pf,
  reviewersLabel: Of,
  reviewers: Df,
  reviewer: Hf,
  agents: Ff,
  workflowColumn: Wf,
  workflowHead: zf,
  stageRow: Gf,
  stageLabel: Uf,
  workflowTitle: Kf,
  workflowMeta: Vf,
  workflowGate: Yf,
  gateNote: Xf,
  cardNote: Jf,
  reviewerList: Qf,
  reviewerRow: Zf,
  reviewerMark: ev,
  reviewerName: av,
  terminalCard: nv,
  terminalCount: tv,
  workflowAgents: rv,
  mount: lv
}, ov = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Qa(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function at(e) {
  return `${Math.round(e * 100)}%`;
}
function iv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: k.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: k.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: k.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Na, { cells: [
      { value: at(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function sv({ stage: e }) {
  return /* @__PURE__ */ n(Na, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Qa(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function cv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: k.head, children: [
    /* @__PURE__ */ n("span", { className: k.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: k.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: ov[e.kind] })
  ] });
}
function dv({ stage: e }) {
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
function uv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(iv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(sv, { stage: e }) : null;
}
function hv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function mv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: k.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(cv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(dv, { stage: e }),
    /* @__PURE__ */ n(uv, { stage: e }),
    /* @__PURE__ */ n("div", { className: k.agents, children: a.map((s) => /* @__PURE__ */ n(bm, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(hv, { onMount: t })
  ] });
}
const wv = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function _v({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: k.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: k.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: k.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: k.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function fv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: k.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(_v, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: k.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: at(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function vv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function bv({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: k.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: k.terminalCount, children: Qa(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: k.cardNote, children: vv(e.rolledBackThisWeek) })
  ] });
}
function pv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function gv(e) {
  if (e.kind === "terminal") return `${Qa(e.closedThisWeek)} this week`;
  const a = pv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function yv({ stage: e, titleId: a }) {
  const t = wv[e.kind];
  return /* @__PURE__ */ o("header", { className: k.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: k.stageRow, children: [
      /* @__PURE__ */ o("span", { className: k.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: k.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: k.workflowMeta, children: gv(e) })
  ] });
}
function Nv(e) {
  return e === "entry" || e === "agent";
}
function kv({ stage: e, onMount: a }) {
  return a === void 0 || !Nv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: `${k.mount} ward-target`, onClick: () => a(e.index), children: "+ Mount agent" });
}
function $v({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: k.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(yv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(fv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(bv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: k.workflowAgents, children: a }),
    /* @__PURE__ */ n(kv, { stage: e, onMount: t })
  ] });
}
function Cv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function K$(e) {
  return Cv(e) ? /* @__PURE__ */ n($v, { ...e }) : /* @__PURE__ */ n(mv, { ...e });
}
const Sv = "_row_1jw40_6", Rv = "_name_1jw40_12", Tv = "_compactRow_1jw40_13", Ev = "_compactName_1jw40_13", Lv = "_cell_1jw40_30", Av = "_chain_1jw40_45", xv = "_owner_1jw40_51", Iv = "_mono_1jw40_57", Mv = "_compactCell_1jw40_79", qv = "_stack_1jw40_96", jv = "_stat_1jw40_103", Bv = "_identityLine_1jw40_110", Pv = "_identity_1jw40_110", Ov = "_ownerLine_1jw40_137", Dv = "_link_1jw40_150", Hv = "_gateMark_1jw40_156", Fv = "_emptyChain_1jw40_161", Wv = "_arrow_1jw40_167", zv = "_muted_1jw40_168", Gv = "_define_1jw40_173", Uv = "_statValue_1jw40_180", Kv = "_policyId_1jw40_186", Vv = "_sub_1jw40_191", v = {
  row: Sv,
  name: Rv,
  compactRow: Tv,
  compactName: Ev,
  cell: Lv,
  chain: Av,
  owner: xv,
  mono: Iv,
  compactCell: Mv,
  stack: qv,
  stat: jv,
  identityLine: Bv,
  identity: Pv,
  ownerLine: Ov,
  link: Dv,
  gateMark: Hv,
  emptyChain: Fv,
  arrow: Wv,
  muted: zv,
  define: Gv,
  statValue: Uv,
  policyId: Kv,
  sub: Vv
};
function nt(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function Yv(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Xv(e) {
  return e === void 0 ? v.compactRow : `${v.compactRow} ${e}`;
}
function tt(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Jv(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${tt(e.members)}`;
}
function Qv(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: /* @__PURE__ */ o("span", { className: v.stack, children: [
    /* @__PURE__ */ o("span", { className: v.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${v.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${v.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: v.ownerLine, children: Jv(e) })
  ] }) });
}
function rt({ name: e, gate: a, size: t }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ n("span", { className: v.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { role: a ? "gate" : "soft", size: t, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Zv(e) {
  return /* @__PURE__ */ n("span", { className: `${v.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: v.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: v.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(rt, { name: a.name, gate: a.gate === !0, size: "tag" })
  ] }, `${a.name}${t}`)) });
}
function eb(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: v.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: v.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: v.define, children: "Define workflow" })
  ] }) : Zv(e) });
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
function ab(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: v.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: v.sub, children: e.summary })
  ] }) });
}
function nb(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function tb({ stream: e, href: a, presentation: t }) {
  const r = Xv(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: nt, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": Ee(e.streamStep, "chip") }, children: [
    Qv(e, a),
    eb(e.stages),
    Nn(nb(e.agents), e.agents === void 0 ? void 0 : Yv(e.agents), "—"),
    ab(e.policy),
    Nn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function rb(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function V$(e) {
  if (rb(e)) return tb(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: v.row, onClick: nt, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: v.cell, children: [
      /* @__PURE__ */ n("a", { className: `${v.name} ward-target`, href: W(t), children: a.name }),
      /* @__PURE__ */ n(m, { ...ya(a.key, a.streamStep) }),
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
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, title: a.inFlightHint, "data-raised": lt(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const lb = "_row_mdce7_2", ob = "_name_mdce7_16", ib = "_scope_mdce7_24", wa = {
  row: lb,
  name: ob,
  scope: ib
};
function sb(e) {
  return e === void 0 ? `${wa.row} ward-toolrow` : `${wa.row} ward-toolrow ${e}`;
}
function cb(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function db({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function ub({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function hb({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${wa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function mb(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Y$({ tool: e, onChange: a, presentation: t }) {
  const r = $(), l = $(), i = cb(e, t), s = mb(t);
  return /* @__PURE__ */ o(s, { className: sb(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(db, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${wa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(hb, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(ub, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const wb = "_strip_1qtlf_2", _b = "_head_1qtlf_10", fb = "_name_1qtlf_16", vb = "_chart_1qtlf_24", bb = "_segment_1qtlf_30", pb = "_detailedChart_1qtlf_36", gb = "_rail_1qtlf_49", yb = "_section_1qtlf_55", Nb = "_label_1qtlf_66", kb = "_note_1qtlf_83", ee = {
  strip: wb,
  head: _b,
  name: fb,
  chart: vb,
  segment: bb,
  detailedChart: pb,
  rail: gb,
  section: yb,
  label: Nb,
  note: kb
}, $b = "No item in flight to preview.", Cb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Sb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Pa = [1, 2, 3, 4, 5, 6], _a = 100;
function Rb(e, a) {
  return a.has(e) ? Ee(e, "id") : "var(--ward-color-line)";
}
function Tb({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Pa.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: ee.segment,
      x: l * _a,
      y: "0",
      width: _a,
      height: "8",
      fill: Rb(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Eb(e) {
  const a = e.slice(0, Pa.length);
  for (; a.length < Pa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Lb({ identities: e }) {
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
function ot(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ta({ label: e, children: a }) {
  const t = $();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: ee.label, children: e }),
    a
  ] });
}
function Ab({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: ee.note, children: a ?? $b }) : /* @__PURE__ */ n($a, { item: { ...e, streamStep: ga(t.streamStep) }, onOpen: ot(r), feed: null });
}
function xb({ draft: e }) {
  const a = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...ya(e.key, e.streamStep) })
  ] });
}
function Ib(e) {
  const a = Eb(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ta, { label: "Board card", children: /* @__PURE__ */ n(Ab, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ta, { label: "Streams index row", children: /* @__PURE__ */ n(xb, { draft: t }) }),
    /* @__PURE__ */ o(ta, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Lb, { identities: a }),
      /* @__PURE__ */ n("p", { className: ee.note, children: Cb })
    ] }),
    /* @__PURE__ */ n(ta, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: ee.note, children: Sb }) })
  ] });
}
function Mb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...ya(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n($a, { item: { ...a, streamStep: e.streamStep }, onOpen: ot(r) }),
    /* @__PURE__ */ n(Tb, { draft: e, streams: t })
  ] });
}
function X$(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Ib, { ...e }) : /* @__PURE__ */ n(Mb, { ...e });
}
const qb = "_row_ixlg5_6", jb = "_headCell_ixlg5_10", Bb = "_cell_ixlg5_11", Pb = "_name_ixlg5_23", Ob = "_consequence_ixlg5_29", Db = "_governed_ixlg5_36", Hb = "_control_ixlg5_42", Fb = "_byRole_ixlg5_48", Wb = "_webControl_ixlg5_59", zb = "_webConsequence_ixlg5_65", Gb = "_webGoverned_ixlg5_71", O = {
  row: qb,
  headCell: jb,
  cell: Bb,
  name: Pb,
  consequence: Ob,
  governed: Db,
  control: Hb,
  byRole: Fb,
  webControl: Wb,
  webConsequence: zb,
  webGoverned: Gb
};
function Ub({
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
function Kb({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Ub, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Vb(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Yb({ name: e, cell: a, onChange: t }) {
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
function Xb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ n("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Yb, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webGoverned} ward-cellmeta`, children: Vb(e) }) })
  ] });
}
function J$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Xb, { ...e }) : /* @__PURE__ */ n(Kb, { ...e });
}
const Jb = "_row_vv64h_2", Qb = "_cell_vv64h_6", Zb = "_name_vv64h_25", ep = "_note_vv64h_30", ap = "_webName_vv64h_41", np = "_webMeta_vv64h_47", K = {
  row: Jb,
  cell: Qb,
  name: Zb,
  note: ep,
  webName: ap,
  webMeta: np
}, it = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function tp(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function rp({ component: e, onRestart: a }) {
  const t = $(), r = it[e.state], l = e.state === "drainFirst";
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
function lp({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: tp(e.state) });
}
function op({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...it[e.state] }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(lp, { component: e, onRestart: a }) })
  ] });
}
function Q$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(op, { ...e }) : /* @__PURE__ */ n(rp, { ...e });
}
const ip = "_row_1f1gp_7", sp = "_cell_1f1gp_11", cp = "_next_1f1gp_28", dp = "_headCell_1f1gp_38", up = "_webId_1f1gp_77", hp = "_webPurpose_1f1gp_83", mp = "_webMeta_1f1gp_91", wp = "_webUrgent_1f1gp_97", H = {
  row: ip,
  cell: sp,
  next: cp,
  headCell: dp,
  webId: up,
  webPurpose: hp,
  webMeta: mp,
  webUrgent: wp
}, _p = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, fp = {
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
], vp = Object.fromEntries(st.map((e) => [e.key, e]));
function Fe({ column: e, children: a }) {
  const t = vp[e];
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
function Z$() {
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
function bp({ cred: e }) {
  const a = _p[e.state];
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n(Fe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Fe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Fe, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Fe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Fe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Fe, { column: "next", children: /* @__PURE__ */ n("span", { className: H.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function pp({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${H.webMeta} ${H.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function gp({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(pp, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { ...fp[e.state] }) })
  ] });
}
function eC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(gp, { ...e }) : /* @__PURE__ */ n(bp, { ...e });
}
const yp = "_card_17zba_2", Np = "_head_17zba_11", kp = "_env_17zba_18", $p = "_version_17zba_25", Cp = "_meta_17zba_32", Sp = "_webCard_17zba_37", Rp = "_webRow_17zba_47", Tp = "_webTitle_17zba_55", Ep = "_webLine_17zba_65", Lp = "_webVersion_17zba_72", Ap = "_webMeta_17zba_77", U = {
  card: yp,
  head: Np,
  env: kp,
  version: $p,
  meta: Cp,
  webCard: Sp,
  webRow: Rp,
  webTitle: Tp,
  webLine: Ep,
  webVersion: Lp,
  webMeta: Ap
}, ct = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function xp({ env: e }) {
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
function Ip(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ce(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Mp(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...ct[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: Ip(e) })
  ] });
}
function aC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Mp, { ...e }) : /* @__PURE__ */ n(xp, { ...e });
}
const qp = "_panel_1hmja_2", jp = "_line_1hmja_8", Bp = "_actions_1hmja_14", ra = {
  panel: qp,
  line: jp,
  actions: Bp
};
function nC(e) {
  return /* @__PURE__ */ o("div", { className: ra.panel, children: [
    /* @__PURE__ */ n("p", { className: ra.line, children: e.status }),
    /* @__PURE__ */ n(A, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ra.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ra.line, children: e.note ?? "" })
  ] });
}
const Pp = "_upload_erepj_2", Op = "_preview_erepj_7", Dp = "_mark_erepj_17", Hp = "_empty_erepj_22", Fp = "_actions_erepj_28", Wp = "_input_erepj_33", zp = "_reasons_erepj_41", Gp = "_reason_erepj_41", Up = "_accepted_erepj_57", te = {
  upload: Pp,
  preview: Op,
  mark: Dp,
  empty: Hp,
  actions: Fp,
  input: Wp,
  reasons: zp,
  reason: Gp,
  accepted: Up
}, dt = 1.5, ut = 22, fa = "script elements or event handlers", Se = "links or external references", Ne = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${dt}px at ${ut}px`], Kp = [Ne[1], Ne[2], fa, Se], Vp = /* @__PURE__ */ new Map([
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
]), Yp = "http://www.w3.org/2000/svg", Xp = "http://www.w3.org/2000/xmlns/", Jp = /* @__PURE__ */ new Set([
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
]), Qp = /* @__PURE__ */ new Set([
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
]), Zp = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, eg = /url\s*\(|['"\\]/i;
function ag() {
  return { ok: !1, reasons: [Ne[1]] };
}
function ht(e) {
  return e.namespaceURI === Yp || e.namespaceURI === null;
}
function ng(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && ht(a) ? a : null;
  } catch {
    return null;
  }
}
function tg(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ne[0]] : [];
}
function rg(e) {
  return Vp.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function lg(e) {
  return eg.test(e.replace(Zp, ""));
}
function og(e) {
  return /^on/i.test(e.localName) ? fa : e.localName === "href" || lg(e.value) ? Se : void 0;
}
function ig(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(rg(t));
    for (const r of Array.from(t.attributes)) a.add(og(r));
  }
  return Kp.filter((t) => a.has(t));
}
function sg(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? ut / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < dt;
  }) ? [Ne[3]] : [];
}
function cg(e) {
  if (e.namespaceURI === Xp) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Qp.has(a) || a.startsWith("stroke"));
}
function dg(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && ht(a) && Jp.has(a.localName);
}
function ug(e, a) {
  dg(a) ? a.nodeType === Node.ELEMENT_NODE && mt(a) : e.removeChild(a);
}
function mt(e) {
  for (const a of Array.from(e.attributes)) cg(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) ug(e, a);
  return e;
}
function tC(e) {
  const a = ng(e);
  if (a === null) return ag();
  const t = [...tg(a), ...ig(a), ...sg(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(mt(a)) };
}
const hg = "Mark accepted.";
function mg({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function wg(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function _g(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function fg({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: hg }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function vg({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(fg, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${wg(e, t)}`, role: "status", children: _g(e, t) });
}
function rC({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = y(null), [i, s] = p(null), c = (d) => {
    if (d === void 0) return;
    const u = a(d);
    u instanceof Promise ? u.then(s) : s(u);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(mg, { current: e }),
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
    /* @__PURE__ */ n(vg, { result: i, presentation: r })
  ] });
}
const bg = "_row_1wp9s_7", pg = "_cell_1wp9s_11", gg = "_head_1wp9s_28", yg = "_name_1wp9s_34", Ng = "_pinned_1wp9s_42", kg = "_headCell_1wp9s_49", $g = "_webName_1wp9s_88", Cg = "_webMeta_1wp9s_95", Sg = "_webWarn_1wp9s_103", q = {
  row: bg,
  cell: pg,
  head: gg,
  name: yg,
  pinned: Ng,
  headCell: kg,
  webName: $g,
  webMeta: Cg,
  webWarn: Sg
}, Za = {
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
], Rg = Object.fromEntries(wt.map((e) => [e.key, e]));
function Tg(e, a) {
  return `mcp.${e}.${a}`;
}
function Eg(e) {
  return Object.keys(Za).includes(e);
}
function Lg(e) {
  return Za[e !== void 0 && Eg(e) ? e : "unknown"];
}
function Ye({ column: e, children: a }) {
  const t = Rg[e];
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
function lC() {
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
function Ag({ server: e }) {
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
    /* @__PURE__ */ n(Ye, { column: "tools", children: e.tools.map((t) => Tg(e.name, t)).join(" · ") })
  ] });
}
function xg(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Ig(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Mg({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function qg({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function jg({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Bg({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: xg(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Ig(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Mg, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Lg(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n(qg, { server: e, onRestart: a }),
      /* @__PURE__ */ n(jg, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function oC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Bg, { ...e }) : /* @__PURE__ */ n(Ag, { ...e });
}
const Pg = "_row_1h9nq_2", Og = "_headCell_1h9nq_14", Dg = "_cell_1h9nq_15", Hg = "_name_1h9nq_26", Fg = "_consequence_1h9nq_32", Wg = "_reason_1h9nq_38", zg = "_value_1h9nq_44", Gg = "_webRow_1h9nq_60", Ug = "_webSetting_1h9nq_71", Kg = "_webName_1h9nq_79", Vg = "_webConsequence_1h9nq_87", Yg = "_webControl_1h9nq_93", Xg = "_webState_1h9nq_106", Jg = "_webChip_1h9nq_111", L = {
  row: Pg,
  headCell: Og,
  cell: Dg,
  name: Hg,
  consequence: Fg,
  reason: Wg,
  value: zg,
  webRow: Gg,
  webSetting: Ug,
  webName: Kg,
  webConsequence: Vg,
  webControl: Yg,
  webState: Xg,
  webChip: Jg
}, _t = 104, ft = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Qg({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Pe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(xn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: L.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Zg({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = ft[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: L.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: L.headCell, children: [
      /* @__PURE__ */ n("span", { className: L.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: L.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: L.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(Qg, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: L.cell, style: { width: _t }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function vt(e, a) {
  return String(e ?? a);
}
function ey(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function ay(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? vt(e.value, "—");
}
function ny({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: L.webControl, children: [
    /* @__PURE__ */ n(Pe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: L.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function ty(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(ny, { ...e });
  const l = ey(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: L.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(xn, { options: l, value: vt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${L.webControl} ${L.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: ay(a) });
}
function ry({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = $(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${L.row} ${L.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: L.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${L.name} ${L.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${L.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: L.webControl, children: i(s) }) : /* @__PURE__ */ n(ty, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${L.webChip} ward-policy-chip`, style: { width: _t }, children: /* @__PURE__ */ n(m, { ...ft[t], size: "tag" }) })
  ] });
}
function iC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ry, { ...e }) : /* @__PURE__ */ n(Zg, { ...e });
}
const ly = "_label_1o9za_7", oy = "_name_1o9za_15", iy = "_column_1o9za_24", sy = "_webFrame_1o9za_57", cy = "_webHead_1o9za_62", dy = "_webHeadLabel_1o9za_74", uy = "_webLabel_1o9za_112", hy = "_webColumns_1o9za_119", my = "_webGroup_1o9za_125", wy = "_webPeople_1o9za_126", _y = "_webVia_1o9za_127", fy = "_webMeta_1o9za_156", F = {
  label: ly,
  name: oy,
  column: iy,
  webFrame: sy,
  webHead: cy,
  webHeadLabel: dy,
  webLabel: uy,
  webColumns: hy,
  webGroup: my,
  webPeople: wy,
  webVia: _y,
  webMeta: fy
}, vy = {
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
function by(e) {
  if (!e.matrixRole) return;
  const a = vy[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function py({ node: e }) {
  const a = by(e);
  return /* @__PURE__ */ o("span", { className: F.label, children: [
    /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
    /* @__PURE__ */ n(gy, { role: a, node: e }),
    /* @__PURE__ */ n(Aa, { column: La[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Aa, { column: La[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Aa, { column: La[2], children: e.requestedVia ?? "" })
  ] });
}
function gy({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function yy({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    jn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(py, { node: t }),
      children: s
    }
  );
}
function xa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Ny({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(xa, { className: `${F.webMeta} ${F.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(xa, { className: `${F.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(xa, { className: `${F.webMeta} ${F.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function ky() {
  return /* @__PURE__ */ o("div", { className: F.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: F.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: F.webColumns, children: [
      /* @__PURE__ */ n("span", { className: F.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: F.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: F.webVia, children: "Requested via" })
    ] })
  ] });
}
function $y({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Cy(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Sy({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: F.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(ky, {}),
    /* @__PURE__ */ n(pc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      jn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n($y, { row: t }),
        detail: /* @__PURE__ */ n(Ny, { row: t }),
        expanded: Cy(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function sC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Sy, { ...e }) : /* @__PURE__ */ n(yy, { ...e });
}
const Ry = "_runbook_b9agc_2", Ty = "_list_b9agc_7", Ey = "_step_b9agc_15", Ly = "_numeral_b9agc_21", Ay = "_body_b9agc_28", xy = "_head_b9agc_34", Iy = "_title_b9agc_40", My = "_detail_b9agc_45", qy = "_actions_b9agc_50", jy = "_webList_b9agc_56", By = "_webStep_b9agc_60", Py = "_webBody_b9agc_66", Oy = "_webTitle_b9agc_74", Dy = "_webDetail_b9agc_78", T = {
  runbook: Ry,
  list: Ty,
  step: Ey,
  numeral: Ly,
  body: Ay,
  head: xy,
  title: Iy,
  detail: My,
  actions: qy,
  webList: jy,
  webStep: By,
  webBody: Py,
  webTitle: Oy,
  webDetail: Dy
}, bt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function pt(e) {
  return String(e + 1).padStart(2, "0");
}
function Hy({ step: e, index: a, connection: t }) {
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
function Fy({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: T.list, children: e.map((r, l) => /* @__PURE__ */ n(Hy, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: T.actions, children: a })
  ] });
}
function Wy({ step: e, index: a, connection: t }) {
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
function zy({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${T.list} ${T.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(Wy, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${T.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function cC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(zy, { ...e }) : /* @__PURE__ */ n(Fy, { ...e });
}
const Gy = "_list_1gu6a_2", Uy = "_check_1gu6a_10", Ky = "_body_1gu6a_16", Vy = "_text_1gu6a_23", Yy = "_pending_1gu6a_32", Xy = "_measured_1gu6a_37", ze = {
  list: Gy,
  check: Uy,
  body: Ky,
  text: Vy,
  pending: Yy,
  measured: Xy
};
function Jy(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Qy({ check: e }) {
  const a = Jy(e.passed);
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
function dC({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Qy, { check: a }, a.text)) });
}
const Zy = "_root_khinh_2", eN = "_list_khinh_10", aN = "_line_khinh_21", nN = "_at_khinh_48", tN = "_text_khinh_52", rN = "_foot_khinh_56", lN = "_idle_khinh_68", oN = "_caret_khinh_76", iN = "_jump_khinh_83", me = {
  root: Zy,
  list: eN,
  line: aN,
  at: nN,
  text: tN,
  foot: rN,
  idle: lN,
  caret: oN,
  jump: iN
}, sN = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function en(e) {
  return Number.isNaN(Date.parse(e)) ? "" : sN.format(new Date(e));
}
const cN = { warn: "warning", ok: "ok" };
function dN({ kind: e }) {
  const a = cN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function uN({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${en(e)}` });
}
function hN({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${en(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: me.idle, children: i }),
    /* @__PURE__ */ n(uN, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const mN = 8;
function wN(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > mN;
}
function _N({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
function uC({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = y(null), [i, s] = p(0), [c, d] = p(!1), [u, h] = p(!1), f = e.at(-1);
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
    /* @__PURE__ */ n("ol", { className: me.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (g) => h(wN(g.currentTarget)), children: e.map((g, I) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${g.kind}`, "data-kind": g.kind, "data-revealed": I < i, children: [
      /* @__PURE__ */ n("span", { className: me.at, children: en(g.at) }),
      /* @__PURE__ */ n(dN, { kind: g.kind }),
      /* @__PURE__ */ n("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: g.text })
    ] }, `${g.at}-${I}`)) }),
    /* @__PURE__ */ o(hN, { connection: a, idleSince: t, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ n(_N, { shown: u, onJump: b })
    ] })
  ] });
}
const fN = "_row_11jhe_2", vN = "_head_11jhe_14", bN = "_author_11jhe_20", pN = "_eta_11jhe_25", gN = "_edited_11jhe_26", yN = "_body_11jhe_32", NN = "_reason_11jhe_37", kN = "_actions_11jhe_42", be = {
  row: fN,
  head: vN,
  author: bN,
  eta: pN,
  edited: gN,
  body: yN,
  reason: NN,
  actions: kN
}, $N = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function CN(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function SN({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function RN({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: be.reason, id: a, children: e })
  ] });
}
function TN(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function EN(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(SN, { ...e }) : /* @__PURE__ */ n(RN, { reason: e.unavailable, reasonId: e.unavailableId });
}
function hC(e) {
  const { comment: a } = e;
  TN(e);
  const t = $(), r = `${t}-unavailable`, l = $N[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${be.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: be.head, children: [
      /* @__PURE__ */ n("span", { className: be.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: be.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: be.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: be.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: be.reason, id: t, children: CN(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: be.actions, children: /* @__PURE__ */ n(EN, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const LN = "_root_c46wj_2", AN = "_attach_c46wj_11", xN = "_actions_c46wj_17", IN = "_reply_c46wj_23", MN = "_replyRow_c46wj_28", qN = "_sendsAs_c46wj_42", Ue = {
  root: LN,
  attach: AN,
  actions: xN,
  reply: IN,
  replyRow: MN,
  sendsAs: qN
};
function jN({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = p(""), i = $();
  return /* @__PURE__ */ o("div", { className: Ue.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ue.replyRow, children: [
      /* @__PURE__ */ n(A, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(_, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ue.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function mC(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(jN, { ...e }) : /* @__PURE__ */ n(BN, { ...e });
}
function BN({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [s, c] = p("");
  return /* @__PURE__ */ o("div", { className: Ue.root, children: [
    /* @__PURE__ */ n(A, { kind: "textarea", label: e, value: s, onChange: c }),
    t && /* @__PURE__ */ o("div", { className: Ue.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      Ln,
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
const PN = "_list_1ih9e_2", ON = "_item_1ih9e_6", DN = "_body_1ih9e_22", HN = "_text_1ih9e_28", FN = "_evidence_1ih9e_37", WN = "_consequence_1ih9e_49", zN = "_note_1ih9e_54", Be = {
  list: PN,
  item: ON,
  body: DN,
  text: HN,
  evidence: FN,
  consequence: WN,
  note: zN
};
function GN({ criterion: e }) {
  return /* @__PURE__ */ n(Le, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function kn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function UN(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function KN({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Be.body, children: [
    /* @__PURE__ */ n("span", { className: Be.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(kn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Be.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(kn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Be.consequence, children: UN(e.why) })
    ] })
  ] });
}
function VN({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Be.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(GN, { criterion: e }),
    /* @__PURE__ */ n(KN, { criterion: e })
  ] });
}
function wC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Be.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(VN, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Be.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const YN = "_list_dwhoz_2", XN = "_rung_dwhoz_6", JN = "_name_dwhoz_18", QN = "_actor_dwhoz_32", ia = {
  list: YN,
  rung: XN,
  name: JN,
  actor: QN
}, ZN = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function ek({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = ZN[e.state];
  return /* @__PURE__ */ o("li", { className: ia.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ia.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ia.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function _C({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ia.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(ek, { rung: a }, a.name)) });
}
const ak = "_sheet_1fqco_2", nk = "_title_1fqco_9", tk = "_stage_1fqco_15", rk = "_effects_1fqco_20", lk = "_effect_1fqco_20", ok = "_numeral_1fqco_31", ik = "_effectText_1fqco_38", sk = "_refusals_1fqco_43", ck = "_reasons_1fqco_52", dk = "_reason_1fqco_52", uk = "_actions_1fqco_62", ue = {
  sheet: ak,
  title: nk,
  stage: tk,
  effects: rk,
  effect: lk,
  numeral: ok,
  effectText: ik,
  refusals: sk,
  reasons: ck,
  reason: dk,
  actions: uk
};
function hk({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function fC({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      ls,
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
      /* @__PURE__ */ n(hk, { refused: f, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const mk = "_list_1hvqu_2", wk = "_path_1hvqu_7", _k = "_head_1hvqu_21", fk = "_label_1hvqu_28", vk = "_consequence_1hvqu_35", bk = "_ask_1hvqu_36", Ge = {
  list: mk,
  path: wk,
  head: _k,
  label: fk,
  consequence: vk,
  ask: bk
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
function pk({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(_, { variant: Cn(a), size: "sm", onClick: () => t(e.kind), children: Oa[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: Cn(a), size: "sm", disabled: !0, describedBy: r, children: Oa[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ge.ask, id: r, children: e.askInstead })
  ] });
}
function gk({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ge.path, "data-allowed": e.allowed, "data-role": $n(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ge.head, children: [
      /* @__PURE__ */ n("span", { className: Ge.label, children: e.title ?? Oa[e.kind] }),
      /* @__PURE__ */ n(m, { role: $n(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ge.consequence, children: e.consequence }),
    /* @__PURE__ */ n(pk, { path: e, primary: a, onChoose: t })
  ] });
}
function vC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ge.list, children: e.map((t, r) => /* @__PURE__ */ n(gk, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const yk = "_list_1nyt1_2", Nk = "_item_1nyt1_6", kk = "_node_1nyt1_18", $k = "_body_1nyt1_24", Ck = "_head_1nyt1_30", Sk = "_stage_1nyt1_36", Rk = "_version_1nyt1_41", Tk = "_sentence_1nyt1_49", Ek = "_meta_1nyt1_54", ge = {
  list: yk,
  item: Nk,
  node: kk,
  body: $k,
  head: Ck,
  stage: Sk,
  version: Rk,
  sentence: Tk,
  meta: Ek
}, Lk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Ak({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function xk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(Le, { size: 9, kind: Lk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Ak, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${ce(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function bC({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(xk, { entry: a }, a.stage + String(t))) });
}
const Ik = "_thread_1kn6s_3", Mk = "_turn_1kn6s_8", qk = "_who_1kn6s_27", jk = "_body_1kn6s_32", sa = {
  thread: Ik,
  turn: Mk,
  who: qk,
  body: jk
}, gt = Ve(!1);
function pC({ children: e, density: a }) {
  return /* @__PURE__ */ n(gt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${sa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function gC({ turn: e }) {
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
const Bk = "_list_1rt9c_3", Pk = "_row_1rt9c_7", Ok = "_label_1rt9c_20", Dk = "_n_1rt9c_26", Hk = "_cause_1rt9c_33", Qe = {
  list: Bk,
  row: Pk,
  label: Ok,
  n: Dk,
  cause: Hk
};
function Fk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Wk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function zk({ row: e, formatNumber: a }) {
  return Fk(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Le, { size: 8, ...Wk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Gk, { cause: e.cause })
  ] });
}
function Gk({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function yC({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(zk, { row: t, formatNumber: a }, t.label)) });
}
const Uk = "_root_1jxwp_2", Kk = {
  root: Uk
};
function NC({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: Kk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ca, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const Vk = "_row_dhbre_3", Yk = "_key_dhbre_13", Xk = "_stack_dhbre_24", Jk = "_value_dhbre_32", Qk = "_evidence_dhbre_39", Zk = "_mark_dhbre_47", We = {
  row: Vk,
  key: Yk,
  stack: Xk,
  value: Jk,
  evidence: Qk,
  mark: Zk
};
function e1({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ka, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function kC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${We.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${We.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${We.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${We.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${We.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${We.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(e1, { state: e.state }) })
  ] });
}
const a1 = "_cell_1monp_2", n1 = {
  cell: a1
}, t1 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function r1(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function l1(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function o1(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: r1(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function i1(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function $C({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  l1(e, t);
  const r = i1(e);
  return /* @__PURE__ */ n(
    ps,
    {
      label: "Rejection routing",
      columns: t1,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: n1.cell, "data-norerun": l.noRerun ? !0 : void 0, children: o1(l, i) }),
      empty: a ?? /* @__PURE__ */ n(rd, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const s1 = "_row_ute8v_2", c1 = "_title_ute8v_11", d1 = "_turns_ute8v_20", u1 = "_waiting_ute8v_21", h1 = "_resolved_ute8v_22", m1 = "_activity_ute8v_23", w1 = "_cost_ute8v_29", _1 = "_link_ute8v_30", f1 = "_tableRow_ute8v_47", v1 = "_tableTitle_ute8v_59", b1 = "_tableResolved_ute8v_64", p1 = "_tableLink_ute8v_68", g1 = "_tableMeta_ute8v_83", y1 = "_tableCost_ute8v_90", N1 = "_tableActivity_ute8v_91", k1 = "_tableState_ute8v_101", $1 = "_tableRecord_ute8v_112", P = {
  row: s1,
  title: c1,
  turns: d1,
  waiting: u1,
  resolved: h1,
  activity: m1,
  cost: w1,
  link: _1,
  tableRow: f1,
  tableTitle: v1,
  tableResolved: b1,
  tableLink: p1,
  tableMeta: g1,
  tableCost: y1,
  tableActivity: N1,
  tableState: k1,
  tableRecord: $1
}, yt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function C1(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function S1(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function R1(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const T1 = { duplicate: "CLOSED · DUPLICATE" };
function E1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: P.tableMeta, children: `waiting on ${e}` });
}
function L1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: P.tableCost, children: e === void 0 ? null : re(e) });
}
function A1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${P.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function x1({ session: e, href: a }) {
  const t = yt[e.state];
  return /* @__PURE__ */ o("tr", { className: P.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: P.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${P.tableLink} ward-target`, href: W(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: P.tableMeta, children: S1(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: P.tableResolved, children: [
      R1(e.resolved),
      /* @__PURE__ */ n(E1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(L1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: P.tableActivity, children: C1(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: P.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: T1[e.state] ?? t.label }),
      /* @__PURE__ */ n(A1, { link: e.link })
    ] }) })
  ] });
}
function I1({ session: e }) {
  const a = yt[e.state];
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
function CC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(x1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(I1, { session: e.session });
}
const M1 = "_block_1yy2v_3", q1 = "_list_1yy2v_9", j1 = "_line_1yy2v_14", Da = {
  block: M1,
  list: q1,
  line: j1
}, B1 = { warn: "warning", ok: "ok" };
function P1({ kind: e }) {
  const a = B1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function O1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Da.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(P1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function SC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Da.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Da.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(O1, { line: t }, `${r}-${t.text}`)) }) });
}
const D1 = "_band_tt7hp_1", H1 = "_head_tt7hp_8", F1 = "_cell_tt7hp_19", W1 = "_index_tt7hp_35", z1 = "_title_tt7hp_42", G1 = "_note_tt7hp_48", U1 = "_cellTitle_tt7hp_53", K1 = "_cellBody_tt7hp_58", V1 = "_tag_tt7hp_64", ve = {
  band: D1,
  head: H1,
  cell: F1,
  index: W1,
  title: z1,
  note: G1,
  cellTitle: U1,
  cellBody: K1,
  tag: V1
}, Sn = 4;
function RC({ index: e, title: a, note: t, cells: r }) {
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
  _$ as ActionStack,
  uC as ActivityConsole,
  bm as AgentCard,
  i$ as AppShell,
  X$ as AppearanceStrip,
  RC as Band,
  h$ as BarChart,
  Od as BoardColumn,
  L$ as BoardFootnote,
  A$ as BoardHeader,
  N$ as BoardScroller,
  _ as Btn,
  t$ as CHIP_ROLES,
  st as CREDENTIAL_COLUMNS,
  u$ as Callout,
  J$ as CapabilityRow,
  gC as ChatMessage,
  Ln as Checkbox,
  m as Chip,
  hC as ClarificationRow,
  H$ as ClauseRuleRow,
  D$ as ClauseRules,
  Fn as ColourLadder,
  Q$ as ComponentRow,
  mC as Composer,
  I$ as ConfigRow,
  x$ as ConfigRowHead,
  Va as ConnectionMark,
  pC as Conversation,
  ls as CostMeter,
  eC as CredentialRow,
  Z$ as CredentialRowHead,
  wC as CriteriaList,
  _l as Crumb,
  yC as DeliveryHealth,
  C$ as DeniedState,
  F$ as DryRunRail,
  rd as EmptyState,
  aC as EnvCard,
  A as Field,
  $$ as FilteredEmpty,
  g$ as FormStack,
  Ca as GateChecklist,
  _C as GateLadder,
  ps as Grid,
  z$ as HandoffRuleRow,
  W$ as HandoffRules,
  M$ as ItemDrawer,
  nC as KeyPanel,
  Ot as LIVE_EVENT_TYPES,
  Dh as LegacyBoardColumn,
  j$ as LegacyBoardHeader,
  B$ as LegacyConfigRow,
  O$ as LegacyItemDrawer,
  Ih as LegacyOverCapNote,
  P$ as LegacyPreviewRail,
  On as LegacyWorkCard,
  ke as LiveIndicator,
  S$ as LoadFailed,
  E$ as Loading,
  wt as MCP_SERVER_COLUMNS,
  Ka as Mark,
  rC as MarkUpload,
  Le as Marker,
  oC as McpServerRow,
  lC as McpServerRowHead,
  G$ as NewStreamModal,
  id as OverCapNote,
  ea as Overlay,
  Vm as PARTIAL_STEP_REASON,
  _t as POLICY_CHIP_WIDTH,
  v$ as PageFrame,
  d$ as PageHeader,
  m$ as PlainList,
  iC as PolicyRow,
  q$ as PreviewRail,
  La as ROLE_MATRIX_COLUMNS,
  et as RULE_ACTIONS,
  Mn as Radio,
  NC as ReadyChecklist,
  p$ as RecordSection,
  fC as RequeueSheet,
  vC as ResolveBlock,
  kC as ResolvedFieldRow,
  sC as RoleMatrixRow,
  $C as RoutingTable,
  U$ as RuleRow,
  cC as RunbookSteps,
  Bt as STREAM_STEPS,
  y$ as SectionBand,
  hn as SectionHeader,
  xn as SegmentedControl,
  CC as SessionRow,
  c$ as Sidebar,
  K$ as StageColumn,
  k$ as StageGrid,
  bC as StageHistory,
  J_ as StageListEditor,
  R$ as StaleStrip,
  Na as StatStrip,
  V$ as StreamRow,
  b$ as SubjectRail,
  Pe as Switch,
  w$ as TableHead,
  s$ as Tabs,
  Y$ as ToolRow,
  f$ as TopBar,
  pc as Tree,
  jn as TreeRow,
  SC as TypedInputBlock,
  qr as UNSAFE_HREF,
  dC as ValidationList,
  Q1 as VisibilityProvider,
  Z1 as Visible,
  n$ as WARD_VERSION,
  $a as WorkCard,
  T$ as WriteUnavailableStrip,
  C1 as agoSince,
  Et as clock,
  _f as colourStatus,
  ae as count,
  se as duration,
  Fa as elapsed,
  a$ as eventSourceTransport,
  ba as isStreamStep,
  pa as isValidatedStreamStep,
  Ym as ladderValidation,
  Lg as mcpConnectionChip,
  Tg as mcpToolName,
  re as money,
  we as ms,
  Bn as ordered,
  Rn as ratio,
  tp as restartLabel,
  W as safeHref,
  ce as stamp,
  En as stream,
  l$ as streamChip,
  ya as streamChipProps,
  Ee as streamColour,
  Ht as streamHex,
  r$ as streamVars,
  la as useBorderFlash,
  Mt as useFocusTrap,
  o$ as useLiveFeed,
  e$ as useReturnFocus,
  va as useRovingTabindex,
  Wa as useTicker,
  Lt as useVisible,
  G as v,
  tC as validateMark,
  ga as validatedStep,
  Pt as validatedStreamSteps
};
