import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as Nt, useContext as Ke, createContext as Ve, useCallback as X, useEffect as x, useState as p, useRef as N, useLayoutEffect as Ha, useId as $, Children as yt, Fragment as kt } from "react";
import { createPortal as $t } from "react-dom";
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
const Ct = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ce(e) {
  const a = Ct.formatToParts(new Date(e)), t = (r) => {
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
const St = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Rt(e) {
  return St.format(new Date(e));
}
const Tn = Ve(/* @__PURE__ */ new Set());
function X1({ hidden: e, children: a }) {
  const t = Nt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Tn.Provider, { value: t, children: a });
}
function Tt(e) {
  return !Ke(Tn).has(e);
}
function J1({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(S, { children: Tt(e) ? a : t });
}
const Et = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Lt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function At(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Lt(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function xt(e) {
  return { onKeyDown: X(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Et));
      At(t, e.current, r);
    },
    [e]
  ) };
}
function Q1(e, a = !0) {
  x(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const nn = { ArrowUp: -1, ArrowDown: 1 }, tn = { ArrowLeft: -1, ArrowRight: 1 }, It = (e, a, t) => Math.min(t, Math.max(a, e));
function Mt(e, a) {
  if (a !== "horizontal" && e in nn) return nn[e];
  if (a !== "vertical" && e in tn) return tn[e];
}
function va({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = N(/* @__PURE__ */ new Map()), l = N(!1);
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
      const f = Math.max(0, h.indexOf(a)), b = Mt(u.key, e);
      b !== void 0 ? (u.preventDefault(), s(h[It(f + b, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const Z1 = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, e$ = "0.2.0", a$ = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], qt = [1, 2, 3, 4, 5, 6], Bt = [1, 2, 3], Pt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
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
  return qt.includes(e);
}
function pa(e) {
  return Bt.includes(e);
}
function n$(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function t$(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Ot = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Dt(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return Ot[e];
}
function rn(e) {
  return typeof e != "string" ? null : Pt.includes(e) ? e : null;
}
function jt(e) {
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
function Wt(e, a, t) {
  const r = jt(e);
  if (r === null) return null;
  const l = rn(t) ?? rn(r.type);
  return l === null ? null : { ...r, type: l, id: Ht(r, a), at: Ft(r) };
}
function zt(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Gt(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function r$(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), s = N(/* @__PURE__ */ new Map()), c = N(0), d = N(""), u = N(0), h = N(null), f = N(0), b = N(0), g = N(!1), I = N("reconnecting"), j = X((C) => {
    I.current = C, r(C);
  }, []), oe = X(() => {
    c.current = Date.now();
  }, []), $e = X((C) => {
    for (const [z, fe] of s.current)
      (fe === "*" || C.itemKey === fe) && z(C);
  }, []), ne = X(() => {
    h.current = a(e, { lastEventId: d.current }, {
      onEvent: (C, z, fe) => {
        const Ae = Wt(C, z, fe);
        Ae !== null && (Ae.id && (d.current = Ae.id), oe(), g.current = !1, j("live"), i(Ae.at), $e(Ae));
      },
      onOpen: () => {
        u.current = 0, g.current = !1, oe(), j("live");
      },
      onError: () => {
        var z;
        (z = h.current) == null || z.close(), h.current = null, g.current = !0, I.current !== "stale" && j("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, f.current = window.setTimeout(ne, C);
      }
    });
  }, [$e, j, oe, a, e]), De = X((C) => {
    g.current = !0, C.close(), h.current = null, f.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), je = X((C, z) => (s.current.set(z, C), () => {
    s.current.delete(z);
  }), []);
  return x(() => (ne(), b.current = window.setInterval(() => {
    const C = Date.now() - c.current, z = zt(C, I.current);
    z && j(z);
    const fe = h.current;
    Gt(C, g.current, fe) && De(fe);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(f.current), g.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [ne, De, j]), { connection: t, lastEventAt: l, subscribe: je };
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
function Ut() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ln(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function la(e, a) {
  const t = N(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Ut() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), s.style.setProperty("--flash", `var(--ward-color-${i})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => ln(s), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => ln(s), we.flash)));
  }, [a, e]);
  return x(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Kt = "_root_1otpc_2", Vt = {
  root: Kt
};
function Yt(e, a, t, r, l) {
  const i = [Fa(a)];
  return e || i.push(`as of ${Rt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function ke({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Wa(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Yt(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Vt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ce(e)
    ] })
  ] });
}
const Xt = "_app_1g5ye_1", Jt = "_side_1g5ye_18", Qt = "_main_1g5ye_26", Zt = "_rail_1g5ye_33", er = "_page_1g5ye_40", ar = "_root_1g5ye_91", nr = "_topbar_1g5ye_98", tr = "_mark_1g5ye_109", rr = "_brand_1g5ye_116", lr = "_tagline_1g5ye_122", or = "_identity_1g5ye_128", ir = "_tools_1g5ye_129", sr = "_metadata_1g5ye_138", cr = "_actor_1g5ye_153", dr = "_detail_1g5ye_154", ur = "_nav_1g5ye_159", hr = "_content_1g5ye_194", mr = "_toolsPanel_1g5ye_210", wr = "_skip_1g5ye_236", M = {
  app: Xt,
  side: Jt,
  main: Qt,
  rail: Zt,
  page: er,
  root: ar,
  topbar: nr,
  mark: tr,
  brand: rr,
  tagline: lr,
  identity: or,
  tools: ir,
  metadata: sr,
  actor: cr,
  detail: dr,
  nav: ur,
  content: hr,
  toolsPanel: mr,
  skip: wr
}, _r = "_btn_j72f1_2", fr = "_primary_j72f1_13", vr = "_destructive_j72f1_24", br = "_secondary_j72f1_34", pr = "_ghost_j72f1_39", gr = "_overflow_j72f1_48", Nr = "_sm_j72f1_55", yr = "_disabled_j72f1_59", aa = {
  btn: _r,
  primary: fr,
  destructive: vr,
  secondary: br,
  ghost: pr,
  overflow: gr,
  sm: Nr,
  disabled: yr
};
function kr(e, a, t, r) {
  const l = a === "sm" ? [aa.sm, "ward-btn--sm"] : [], i = t ? [aa.disabled] : [];
  return [aa.btn, aa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function $r(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Cr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Sr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Rr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Tr(e, a, t) {
  return Rr(e.describedBy, a && t);
}
function Er({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Lr(e) {
  return e.children ?? e.label;
}
function _(e) {
  Cr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = Sr(e), i = $();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: kr(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": Tr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...$r(a, e.controls),
        children: Lr(e)
      }
    ),
    /* @__PURE__ */ n(Er, { id: i, reason: l })
  ] });
}
const Ar = /^([a-z][a-z0-9+.-]*):/i, xr = /* @__PURE__ */ new Set(["http", "https"]), Ir = "#";
function Mr(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Ar.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = Mr(e);
  return a === void 0 || xr.has(a) ? e : Ir;
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
function qr({ sidebar: e, header: a, children: t, rail: r }) {
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
function Br({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: M.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: W(t.href), "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function Ia({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Pr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(Ia, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Ia, { value: a, className: M.detail })
  ] });
}
function Or() {
  const e = za("(max-width: 767.98px)"), a = $(), t = N(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Dr({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: M.tools, children: /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: M.tools, children: e });
}
function jr({ tools: e, menu: a }) {
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
    /* @__PURE__ */ n(Br, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(Pr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Dr, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Fr(e) {
  const a = $(), t = Or();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Hr, { ...e, menu: t }),
    /* @__PURE__ */ n(jr, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function Wr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function l$(e) {
  return Wr(e) ? /* @__PURE__ */ n(qr, { ...e }) : /* @__PURE__ */ n(Fr, { ...e });
}
function Ga(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const zr = "_root_o4yib_2", Gr = "_row_o4yib_8", Ur = "_box_o4yib_14", Kr = "_label_o4yib_21", Vr = "_lockedNote_o4yib_26", Yr = "_consequence_o4yib_34", Xr = "_sample_o4yib_69", Me = {
  root: zr,
  row: Gr,
  box: Ur,
  label: Kr,
  lockedNote: Vr,
  consequence: Yr,
  sample: Xr
};
function Jr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function Qr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Me.consequence} ward-check-consequence`, children: a }) : null;
}
function Zr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Me.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function el({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Me.sample, "aria-hidden": "true", children: e }) : null;
}
function Ln(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = Jr(e);
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
        /* @__PURE__ */ n(Zr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(el, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Qr, { id: t, text: e.consequence })
  ] });
}
const al = "_chip_1073r_2", nl = {
  chip: al
}, tl = {
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
function rl(e, a) {
  if (e === "stream") return ll(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = tl[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function ll(e) {
  if (!e || !pa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = En(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${nl.chip} ward-chip ward-chip--${e}`, style: rl(e, t), "data-ward-chip": e, "data-size": r, children: a });
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
const ol = "_nav_j90m2_2", il = "_list_j90m2_8", sl = "_item_j90m2_15", cl = "_link_j90m2_30", dl = "_sep_j90m2_40", ul = "_current_j90m2_44", hl = "_chips_j90m2_48", xe = {
  nav: ol,
  list: il,
  item: sl,
  link: cl,
  sep: dl,
  current: ul,
  chips: hl
};
function ml({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: xe.nav, children: [
    /* @__PURE__ */ n("ol", { className: xe.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: xe.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: xe.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${xe.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: xe.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${xe.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const wl = "_field_fy549_2", _l = "_label_fy549_8", fl = "_labelHidden_fy549_15", vl = "_control_fy549_25", bl = "_mono_fy549_44", pl = "_area_fy549_49", gl = "_invalid_fy549_56", Te = {
  field: wl,
  label: _l,
  labelHidden: fl,
  control: vl,
  mono: bl,
  area: pl,
  invalid: gl
}, Nl = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function yl({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? Nl : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function kl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function $l({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Cl = { input: yl, select: kl, textarea: $l };
function Sl(e, a, t) {
  const r = Cl[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Rl(e, a, t) {
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
function Tl(e) {
  const a = e.mono ? [Te.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Te.area] : [];
  return [Te.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function El(e) {
  return e ? `${Te.label} ${Te.labelHidden} ward-field-label` : `${Te.label} ward-field-label`;
}
function A(e) {
  const a = $(), t = `${a}-msg`, r = Rl(e, a, t), l = Tl(e);
  return /* @__PURE__ */ o("div", { className: `${Te.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: El(e.labelHidden), htmlFor: a, children: e.label }),
    Sl(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Te.invalid} ward-field-error`, children: e.invalid })
  ] });
}
function Ll(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function An(e) {
  const a = Ll(e);
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
const Al = "_strip_tivso_2", xl = "_tab_tivso_26", Il = "_count_tivso_49", Ma = {
  strip: Al,
  tab: xl,
  count: Il
}, on = 7;
function Ml(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function ql(e) {
  return `${Ma.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function Bl(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Pl(e, a) {
  Ha(() => {
    const t = e.current, r = t == null ? void 0 : t.querySelectorAll('[role="tab"]')[a];
    if (!t || !r) return;
    const l = Bl(t, r);
    l !== null && (t.scrollLeft = Math.max(0, l)), An(t);
  }, [e, a]);
}
function o$({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > on) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${on} — the set is fixed`);
  const i = va({ orientation: "horizontal" }), s = Ml(e, a);
  x(() => i.setActive(s), [i.setActive, s]);
  const c = N(null);
  return Ua(c, e.length), Pl(c, s), /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      className: ql(l),
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
const Ol = "_root_jem6y_2", Dl = "_segment_jem6y_7", sn = {
  root: Ol,
  segment: Dl
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
const jl = "_sidebar_1jywv_3", Hl = "_brand_1jywv_9", Fl = "_mark_1jywv_17", Wl = "_word_1jywv_24", zl = "_nav_1jywv_30", Gl = "_navItem_1jywv_38", Ul = "_group_1jywv_50", Kl = "_groupName_1jywv_57", Vl = "_agents_1jywv_70", Yl = "_agent_1jywv_70", Xl = "_agentTop_1jywv_88", Jl = "_dot_1jywv_95", Ql = "_agentName_1jywv_107", Zl = "_agentMeta_1jywv_120", eo = "_foot_1jywv_126", ao = "_footName_1jywv_132", no = "_footLinks_1jywv_139", to = "_footLink_1jywv_139", ro = "_root_1jywv_153", lo = "_linkBrand_1jywv_162", oo = "_label_1jywv_183", io = "_note_1jywv_188", so = "_footer_1jywv_202", R = {
  sidebar: jl,
  brand: Hl,
  mark: Fl,
  word: Wl,
  nav: zl,
  navItem: Gl,
  group: Ul,
  groupName: Kl,
  new: "_new_1jywv_64",
  agents: Vl,
  agent: Yl,
  agentTop: Xl,
  dot: Jl,
  agentName: Ql,
  agentMeta: Zl,
  foot: eo,
  footName: ao,
  footLinks: no,
  footLink: to,
  root: ro,
  linkBrand: lo,
  label: oo,
  note: io,
  footer: so
};
function co({ agent: e }) {
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
function uo({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: R.foot, children: [
    /* @__PURE__ */ n("span", { className: R.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: R.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: R.footLink, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function ho({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: R.agents, children: r.map((s) => /* @__PURE__ */ n(co, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(uo, { shared: i })
  ] });
}
function mo(e) {
  return e.destinations ?? e.items ?? [];
}
function wo({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.linkBrand, children: e });
}
function _o({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.footer, children: e });
}
function fo({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: R.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: R.note, children: e.note })
  ] });
}
function vo(e) {
  return /* @__PURE__ */ o("aside", { className: `${R.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(wo, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: mo(e).map((a) => /* @__PURE__ */ n(fo, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(_o, { children: e.children })
  ] });
}
function bo(e) {
  return "agents" in e;
}
function i$(e) {
  return bo(e) ? /* @__PURE__ */ n(ho, { ...e }) : /* @__PURE__ */ n(vo, { ...e });
}
const po = "_mark_wlgi8_3", go = {
  mark: po
}, No = { met: "✓", unmet: "", failed: "✕" };
function Ka({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: go.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: No[e]
    }
  );
}
const yo = "_marker_br9fi_2", ko = {
  marker: yo
}, $o = {
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
  const r = { "--marker": $o[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${ko.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Co = "_root_ti0pq_2", So = "_chip_ti0pq_11", Ro = "_noCase_ti0pq_23", na = {
  root: Co,
  chip: So,
  noCase: Ro
};
function To(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Va({ connection: e, since: a, lastEventAt: t }) {
  const r = To(a, t), l = Wa(r, e === "reconnecting");
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
const Eo = "_root_k8vuh_2", Lo = "_context_k8vuh_12", Ao = "_row_k8vuh_1", xo = "_heading_k8vuh_25", Io = "_headingWrap_k8vuh_33", Mo = "_chips_k8vuh_38", qo = "_title_k8vuh_45", Bo = "_consequence_k8vuh_54", Po = "_actionsWrap_k8vuh_59", Oo = "_actions_k8vuh_59", Do = "_action_k8vuh_59", jo = "_overflowPanel_k8vuh_78", Ho = "_measureClip_k8vuh_89", Fo = "_measure_k8vuh_89", Z = {
  root: Eo,
  context: Lo,
  row: Ao,
  heading: xo,
  headingWrap: Io,
  chips: Mo,
  title: qo,
  consequence: Bo,
  actionsWrap: Po,
  actions: Oo,
  action: Do,
  overflowPanel: jo,
  measureClip: Ho,
  measure: Fo
};
function Wo({ title: e, consequence: a, consequenceHint: t }) {
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
function zo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(cn, { disclosure: l }) : a ? [/* @__PURE__ */ n(cn, { disclosure: l }, "more"), /* @__PURE__ */ n(qa, { actions: e }, "actions")] : /* @__PURE__ */ n(qa, { actions: e });
}
function Go(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Uo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(qa, { actions: e }) });
}
function Ko(e, a) {
  const t = $(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Vo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Z.context, children: [
    /* @__PURE__ */ n(ml, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Z.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function Yo(...e) {
  return e.some((a) => a === null);
}
function Xo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Jo(e, a, t, r, l) {
  if (l === 0 || Yo(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], d = Xo(e), u = Math.max(0, e.clientWidth - i.offsetWidth - d);
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function Qo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Zo(e) {
  const a = N(null), t = N(null), r = N(null), l = N(null), [i, s] = p(!1);
  return x(() => {
    const c = a.current;
    if (!Qo(c)) return;
    const d = () => s(Jo(c, t.current, r.current, l.current, e.length)), u = new ResizeObserver(d);
    return u.observe(c), d(), () => u.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function ei({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: Z.measureClip, children: /* @__PURE__ */ o("div", { className: Z.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function ai({ connection: e }) {
  return e ? /* @__PURE__ */ n(Va, { connection: e.connection, since: e.since }) : null;
}
function s$({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: h, headingRef: f, actionsRef: b, measureRef: g, collapsed: I } = Zo(i), j = s.length > 0, { disclosure: oe, close: $e } = Ko(I || j, b), ne = Go(s, i, I, d);
  return /* @__PURE__ */ o("header", { className: Z.root, "data-density": u, children: [
    /* @__PURE__ */ n(Vo, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Z.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: f, className: Z.headingWrap, children: /* @__PURE__ */ n(Wo, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ n(ai, { connection: c }),
        /* @__PURE__ */ n("div", { className: Z.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(zo, { actions: i, hasMore: j, collapsed: I, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Uo, { actions: ne, disclosure: oe, onEscape: $e }),
    /* @__PURE__ */ n(ei, { actions: i, hasMore: j, measureRef: g })
  ] });
}
const ni = "_scrim_c7sqj_2", ti = "_drawer_c7sqj_10", ri = "_sheet_c7sqj_14", li = "_modal_c7sqj_18", oi = "_panel_c7sqj_23", ii = "_header_c7sqj_51", si = "_title_c7sqj_59", ci = "_body_c7sqj_63", di = "_close_c7sqj_90", Ne = {
  scrim: ni,
  drawer: ti,
  sheet: ri,
  modal: li,
  panel: oi,
  header: ii,
  title: si,
  body: ci,
  close: di
}, ui = Ve(null), ca = [], da = /* @__PURE__ */ new Map();
function hi(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function mi(e, a) {
  let t = da.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, da.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function wi(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !hi(r) && mi(e, r);
}
function _i(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (wi(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function fi(e) {
  for (const a of e.claims) {
    const t = da.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), da.delete(a)));
  }
}
function vi(e, a) {
  const t = { root: e, claims: [] };
  return ca.push(t), _i(t, a), t;
}
function bi(e) {
  const a = ca.indexOf(e);
  a >= 0 && ca.splice(a, 1), fi(e);
}
function dn(e) {
  return e !== null && ca.at(-1) === e;
}
function pi(e, a, t) {
  const r = N(null), l = N(t);
  return l.current = t, x(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = vi(i, a);
    return r.current = c, () => {
      var u, h;
      const d = dn(c);
      bi(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [a]), X(() => dn(r.current), []);
}
function gi(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Ni(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function yi({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${Ne.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ne.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, children: e.children })
  ] });
}
function ki(e) {
  return `${Ne.scrim} ${Ne[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function $i(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ne.panel} ${Ne[e]} ward-overlay-panel${t}${r}`;
}
function Ci(e) {
  const a = Ke(ui);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = N(null), t = N(null), r = $(), l = Ci(e.container), i = za("(min-width: 768px)"), s = gi(e.kind, i), c = Ni(e, r), d = xt(t), u = pi(a, l, e.returnFocusTo), h = X(() => {
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
  }, [h]), $t(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: ki(s),
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
            className: $i(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => u() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ne.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(yi, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Si = "_root_drrhx_2", Ri = "_ticket_drrhx_15", Ti = "_body_drrhx_24", Sa = {
  root: Si,
  ticket: Ri,
  body: Ti
};
function c$({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Sa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Sa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Sa.body, children: t })
  ] });
}
const Ei = "_root_bf1pc_2", Li = "_table_bf1pc_9", Ai = "_caption_bf1pc_14", xi = "_series_bf1pc_23", Ii = "_category_bf1pc_31", Mi = "_cell_bf1pc_39", qi = "_track_bf1pc_45", Bi = "_lane_bf1pc_52", Pi = "_bar_bf1pc_56", Oi = "_value_bf1pc_63", Di = "_swatch_bf1pc_70", ji = "_empty_bf1pc_78", V = {
  root: Ei,
  table: Li,
  caption: Ai,
  series: xi,
  category: Ii,
  cell: Mi,
  track: qi,
  lane: Bi,
  bar: Pi,
  value: Oi,
  swatch: Di,
  empty: ji
}, Hi = "—", un = 6;
function Fi(e, a) {
  if (a.length < 1 || a.length > un)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${un}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Wi(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function In(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function zi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Gi({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = zi(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ o("span", { className: V.track, children: [
    /* @__PURE__ */ n("span", { className: V.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${V.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: V.value, children: e === null ? l : r(e) })
  ] }) });
}
function Ui({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: V.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: V.swatch, "data-step": In(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Ki({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${V.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: V.caption, children: e }),
    /* @__PURE__ */ n("p", { className: V.empty, children: a })
  ] });
}
function Vi({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: s = Hi }) {
  return /* @__PURE__ */ n("div", { className: `${V.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: V.table, children: [
    /* @__PURE__ */ n("caption", { className: V.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: V.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Ui, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: V.category, children: c }),
      t.map((u, h) => /* @__PURE__ */ n(Gi, { value: u.values[d], top: r, step: In(h, t.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function d$(e) {
  Fi(e.categories, e.series);
  const a = Wi(e.series);
  return a === 0 ? /* @__PURE__ */ n(Ki, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Vi, { ...e, top: a });
}
const Yi = "_root_1bfqw_2", Xi = "_figure_1bfqw_7", Ji = "_of_1bfqw_13", Qi = "_bar_1bfqw_18", Zi = "_rows_1bfqw_38", es = "_row_1bfqw_38", as = "_label_1bfqw_49", ns = "_amount_1bfqw_54", Ce = {
  root: Yi,
  figure: Xi,
  of: Ji,
  bar: Qi,
  rows: Zi,
  row: es,
  label: as,
  amount: ns
};
function ts({ spent: e, ceiling: a, breakdown: t }) {
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
const rs = "_frame_mg2jl_2", ls = "_table_mg2jl_6", os = "_th_mg2jl_12", is = "_td_mg2jl_13", ss = "_sort_mg2jl_47", cs = "_row_mg2jl_53", ds = "_empty_mg2jl_61", Re = {
  frame: rs,
  table: ls,
  th: os,
  td: is,
  sort: ss,
  row: cs,
  empty: ds
}, us = { asc: "ascending", desc: "descending" };
function hs(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return us[a.direction];
}
function ms(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function ws(e) {
  return e === void 0 ? void 0 : { width: e };
}
function _s({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: ws(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": hs(e, a),
      children: ms(e, t)
    }
  );
}
function fs({ row: e, props: a }) {
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(_s, { column: h, sort: c, onSort: d }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(fs, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(h))) })
  ] }) });
}
const bs = "_list_v0s52_2", ps = {
  list: bs
};
function u$({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: ps.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const gs = "_label_1u62a_2", Ns = {
  label: gs
};
function h$({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: Ns.label, children: a.header }) }, a.key)) }) });
}
const ys = "_stack_bp6a0_2", ks = {
  stack: ys
};
function m$({ children: e }) {
  return /* @__PURE__ */ n("span", { className: ks.stack, "data-ward-action-stack": "", children: e });
}
const $s = "_set_y5zy3_2", Cs = "_legend_y5zy3_7", Ss = "_row_y5zy3_15", Rs = "_control_y5zy3_20", Ts = "_input_y5zy3_26", Es = "_label_y5zy3_31", Ls = "_consequence_y5zy3_36", Ie = {
  set: $s,
  legend: Cs,
  row: Ss,
  control: Rs,
  input: Ts,
  label: Es,
  consequence: Ls
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
const As = "_root_1pyf1_2", xs = "_head_1pyf1_11", Is = "_index_1pyf1_31", Ms = "_dot_1pyf1_35", qs = "_note_1pyf1_40", Bs = "_counter_1pyf1_46", Ps = "_trailing_1pyf1_54", qe = {
  root: As,
  head: xs,
  index: Is,
  dot: Ms,
  note: qs,
  counter: Bs,
  trailing: Ps
};
function Os({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${qe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: qe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ds({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.counter, "aria-hidden": "true", children: e }) : null;
}
function hn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: qe.head, children: [
      /* @__PURE__ */ n(Os, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: qe.note, children: t }),
    /* @__PURE__ */ n(Ds, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: qe.trailing, children: i })
  ] });
}
const js = "_strip_1cfs3_2", Hs = "_cell_1cfs3_7", Fs = "_value_1cfs3_12", Ws = "_link_1cfs3_27", zs = "_label_1cfs3_39", Xe = {
  strip: js,
  cell: Hs,
  value: Fs,
  link: Ws,
  label: zs
};
function Gs(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function Us({ cell: e }) {
  return e.href === void 0 ? /* @__PURE__ */ n(S, { children: e.value }) : /* @__PURE__ */ n("a", { className: `${Xe.link} ward-stat-link`, href: W(e.href), "aria-label": `${e.label}: ${e.value}`, children: e.value });
}
function ya({ cells: e, divided: a = !1 }) {
  return Gs(e), /* @__PURE__ */ n("dl", { className: `${Xe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ o("div", { className: Xe.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Xe.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, title: t.hint, children: /* @__PURE__ */ n(Us, { cell: t }) }),
    /* @__PURE__ */ n("dt", { className: `${Xe.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Ks = "_root_xk7sv_2", Vs = "_track_xk7sv_8", Ys = "_thumb_xk7sv_35", Xs = "_labelHidden_xk7sv_53", Js = "_label_xk7sv_53", Qs = "_lockedNote_xk7sv_68", Be = {
  root: Ks,
  track: Vs,
  thumb: Ys,
  labelHidden: Xs,
  label: Js,
  lockedNote: Qs
};
function Zs(e) {
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
    /* @__PURE__ */ o("span", { id: c, className: Zs(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const ec = "_bar_1u2kl_2", ac = "_skip_1u2kl_11", nc = "_mark_1u2kl_22", tc = "_nav_1u2kl_30", rc = "_list_1u2kl_34", lc = "_select_1u2kl_40", oc = "_dest_1u2kl_47", ic = "_actor_1u2kl_61", sc = "_actorMark_1u2kl_74", cc = "_actorLabel_1u2kl_79", dc = "_tagline_1u2kl_98", de = {
  bar: ec,
  skip: ac,
  mark: nc,
  nav: tc,
  list: rc,
  select: lc,
  dest: oc,
  actor: ic,
  actorMark: sc,
  actorLabel: cc,
  tagline: dc
};
function uc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function hc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function w$({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = hc(r);
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
      /* @__PURE__ */ n("span", { className: de.actorMark, "aria-hidden": "true", children: uc(c) })
    ] })
  ] });
}
const mc = "_tree_1lyby_2", wc = "_item_1lyby_6", _c = "_row_1lyby_10", fc = "_button_1lyby_22", ua = {
  tree: mc,
  item: wc,
  row: _c,
  button: fc
}, qn = Ve(null);
function vc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = va({ orientation: "vertical" });
  return /* @__PURE__ */ n(qn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ua.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const bc = { ArrowRight: !0, ArrowLeft: !1 };
function mn(e) {
  return e ? !0 : void 0;
}
function pc(e, a) {
  const t = bc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function gc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function Nc(e) {
  const a = [ua.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function yc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function kc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function $c(e) {
  return typeof e == "string" ? e : void 0;
}
function Cc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Sc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Bn(e) {
  const a = Ke(qn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = yc(e);
  return /* @__PURE__ */ o("li", { className: ua.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Nc(e),
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
            onClick: () => gc(e),
            onKeyDown: (r) => pc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: kc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: $c(e.label), children: e.label }),
              /* @__PURE__ */ n(Cc, { value: e.detail }),
              /* @__PURE__ */ n(Sc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Rc = "_frame_1fj9j_2", Tc = "_subjectRail_1fj9j_22", Ec = "_subject_1fj9j_22", Lc = "_rail_1fj9j_42", Ac = "_record_1fj9j_64", xc = "_recordBody_1fj9j_69", Ic = "_stageGrid_1fj9j_118", Mc = "_band_1fj9j_144", qc = "_bandBody_1fj9j_153", Bc = "_bandActions_1fj9j_158", Pc = "_scroller_1fj9j_166", Oc = "_board_1fj9j_192", Dc = "_laneCount_1fj9j_200", jc = "_lanes_1fj9j_210", Y = {
  frame: Rc,
  subjectRail: Tc,
  subject: Ec,
  rail: Lc,
  record: Ac,
  recordBody: xc,
  stageGrid: Ic,
  band: Mc,
  bandBody: qc,
  bandActions: Bc,
  scroller: Pc,
  board: Oc,
  laneCount: Dc,
  lanes: jc
};
function _$({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function wn(e) {
  return e ? "true" : void 0;
}
function f$({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": t, "data-ruled": wn(i), children: [
    /* @__PURE__ */ n("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: Y.rail, "data-sticky": wn(l), "aria-label": r, children: a })
  ] });
}
function v$({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(hn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(hn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: Y.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Hc = "_form_1j8ub_2", Fc = "_fields_1j8ub_9", Wc = "_actions_1j8ub_19", Ra = {
  form: Hc,
  fields: Fc,
  actions: Wc
};
function b$({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ra.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ra.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ra.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function p$({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: Y.bandActions, children: a })
  ] });
}
const zc = "(max-width: 767.98px)";
function Ya({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = N(null);
  Ua(l, t ?? yt.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function Gc({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(A, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Ya, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Uc({ lanes: e, label: a }) {
  const [t, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(Ya, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(kt, { children: l.content }, l.id)) })
  ] });
}
function g$({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = za(zc);
  return t === void 0 ? /* @__PURE__ */ n(Ya, { label: a, children: e }) : l ? /* @__PURE__ */ n(Gc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Uc, { lanes: t, label: a });
}
function N$({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = N(null), i = Math.max(e, 1);
  Ua(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const Kc = "_block_1o5o7_2", Vc = "_sentence_1o5o7_15", Yc = "_meta_1o5o7_20", Xc = "_action_1o5o7_25", Jc = "_strip_1o5o7_29", Qc = "_loading_1o5o7_48", Zc = "_label_1o5o7_56", ed = "_counter_1o5o7_63", _e = {
  block: Kc,
  sentence: Vc,
  meta: Yc,
  action: Xc,
  strip: Jc,
  loading: Qc,
  label: Zc,
  counter: ed
};
function ad({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(_, { onClick: e.onClick, children: e.label }) });
}
function ka({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: _e.sentence, children: e }),
    t,
    /* @__PURE__ */ n(ad, { action: a })
  ] });
}
function nd(e) {
  return /* @__PURE__ */ n(ka, { ...e, kind: "ward-emptystate" });
}
function y$({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ka, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function k$(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function $$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ka, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    ce(a)
  ] }) });
}
function C$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ce(e),
    ". Showing snapshot from ",
    ce(a)
  ] });
}
function S$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ce(a)
  ] });
}
function R$({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
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
const td = "_note_tlubt_2", rd = {
  note: td
};
function ld({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: rd.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const od = "_card_12in3_2", id = "_hit_12in3_23", sd = "_head_12in3_30", cd = "_title_12in3_36", dd = "_meta_12in3_44", ud = "_fields_12in3_45", hd = "_who_12in3_58", md = "_sep_12in3_65", wd = "_mono_12in3_69", _d = "_field_12in3_45", fd = "_last_12in3_84", vd = "_reason_12in3_96", J = {
  card: od,
  hit: id,
  head: sd,
  title: cd,
  meta: dd,
  fields: ud,
  who: hd,
  sep: md,
  mono: wd,
  field: _d,
  last: fd,
  reason: vd
}, bd = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function pd(e, a, t) {
  const r = la(e, "blue"), l = la(e, "orange"), i = la(e, "green"), s = N(/* @__PURE__ */ new Set());
  x(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = bd[d.type];
      u && c[u]();
    });
  }, [r, t, i, a, l]);
}
const gd = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Nd(e, a) {
  return gd[a](e);
}
function yd({ item: e, connection: a }) {
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
function kd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: J.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function $d({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: J.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Cd({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: J.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: J.field, children: Nd(e, t) }, t)) });
}
const Ba = (e) => e ? !0 : void 0;
function Sd(e) {
  return { "--stream": Ee(e.streamStep, "id") };
}
function Rd(e, a, t) {
  e == null || e(a, t);
}
function Td(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Ed({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: J.last, "data-stale": Ba(a), children: t }) : null;
}
function $a(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  pd(r, t.key, e.feed);
  const l = Td(e.feed), i = Sd(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: J.card,
      style: i,
      "data-selected": Ba(e.selected),
      "data-flagged": Ba(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: J.hit, onClick: (s) => Rd(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(kd, { item: t }),
        /* @__PURE__ */ n("p", { className: J.title, children: t.title }),
        /* @__PURE__ */ n(yd, { item: t, connection: l }),
        /* @__PURE__ */ n($d, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Cd, { item: t, fields: a }),
        /* @__PURE__ */ n(Ed, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const Ld = "_column_10sxg_3", Ad = "_head_10sxg_24", xd = "_label_10sxg_33", Id = "_count_10sxg_42", Md = "_list_10sxg_56", Je = {
  column: Ld,
  head: Ad,
  label: xd,
  count: Id,
  list: Md
};
function Pn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function qd({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Bd(e) {
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
function Pd({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = $(), h = e.cap !== void 0 && a.length > e.cap, f = Pn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(qd, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ n(Bd, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: f }),
    h && /* @__PURE__ */ n(ld, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Od = "_foot_8qg4p_2", Dd = "_note_8qg4p_13", jd = "_link_8qg4p_19", Ta = {
  foot: Od,
  note: Dd,
  link: jd
};
function T$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ta.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ta.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Ta.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Hd = "_head_1la6p_3", Fd = "_identity_1la6p_12", Wd = "_titleRow_1la6p_18", zd = "_title_1la6p_18", Gd = "_key_1la6p_35", Ud = "_rollup_1la6p_45", Kd = "_tools_1la6p_53", Vd = "_swatch_1la6p_62", Yd = "_mark_1la6p_69", pe = {
  head: Hd,
  identity: Fd,
  titleRow: Wd,
  title: zd,
  key: Gd,
  rollup: Ud,
  tools: Kd,
  swatch: Vd,
  mark: Yd
}, _n = "initials:";
function Xd(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Jd(e) {
  const a = [Xd(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function Qd(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Jd(e)
  ] });
}
function Zd(e) {
  return e.startsWith(_n) ? e.slice(_n.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function eu({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ee(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${pe.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Zd(e) }) : /* @__PURE__ */ n("span", { className: pe.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function au({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function E$({
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
        /* @__PURE__ */ n(eu, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: pe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: pe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: pe.rollup, "aria-live": "polite", children: Qd(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: pe.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(au, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(_, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Va, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const nu = "_head_kabyh_11", tu = "_line_kabyh_12", ru = "_cHandle_kabyh_33", lu = "_cName_kabyh_38", ou = "_nameLine_kabyh_46", iu = "_cLabel_kabyh_53", su = "_cCap_kabyh_58", cu = "_cShown_kabyh_63", du = "_name_kabyh_46", uu = "_noCap_kabyh_85", hu = "_state_kabyh_99", mu = "_handle_kabyh_104", wu = "_sub_kabyh_118", B = {
  head: nu,
  line: tu,
  cHandle: ru,
  cName: lu,
  nameLine: ou,
  cLabel: iu,
  cCap: su,
  cShown: cu,
  name: du,
  noCap: uu,
  state: hu,
  handle: mu,
  sub: wu
}, _u = "can't be hidden or collapsed", fu = "terminal · counted, not a column";
function L$() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: B.cHandle }),
    /* @__PURE__ */ n("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: B.cShown, children: "Shown" })
  ] });
}
function vu(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function bu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function fn(e) {
  return e.gate ? _u : e.terminal ? fu : bu(e.agentsMounted);
}
function pu(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function gu({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ n("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    fn(e) && /* @__PURE__ */ n("span", { className: B.sub, children: fn(e) })
  ] });
}
function Nu(e) {
  return e === void 0 ? "" : String(e);
}
function yu(e) {
  return e === "" ? void 0 : Number(e);
}
function ku({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: B.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: B.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => pu(t, a),
      children: "⠿"
    }
  ) });
}
function $u({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: B.cCap, children: /* @__PURE__ */ n(A, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Nu(a.cap), onChange: (r) => t({ ...a, cap: yu(r) }) }) });
}
function Cu({ stage: e, config: a, onChange: t }) {
  const r = vu(e, a.shown);
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ n(Oe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: B.state, "aria-hidden": "true", children: r.state })
  ] });
}
function Su(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function A$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": Su(e), children: [
    /* @__PURE__ */ n(ku, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(gu, { stage: e }),
    /* @__PURE__ */ n("span", { className: B.cLabel, children: /* @__PURE__ */ n(A, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n($u, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Cu, { stage: e, config: a, onChange: t })
  ] });
}
const Ru = "_body_hn6d6_2", Tu = "_head_hn6d6_9", Eu = "_summary_hn6d6_19", Lu = "_block_hn6d6_20", Au = "_actionsBlock_hn6d6_21", xu = "_title_hn6d6_41", Iu = "_note_hn6d6_46", Mu = "_k_hn6d6_51", qu = "_kv_hn6d6_58", Bu = "_row_hn6d6_64", Pu = "_label_hn6d6_75", Ou = "_value_hn6d6_84", Du = "_quote_hn6d6_90", ju = "_actions_hn6d6_21", Hu = "_resolve_hn6d6_103", P = {
  body: Ru,
  head: Tu,
  summary: Eu,
  block: Lu,
  actionsBlock: Au,
  title: xu,
  note: Iu,
  k: Mu,
  kv: qu,
  row: Bu,
  label: Pu,
  value: Ou,
  quote: Du,
  actions: ju,
  resolve: Hu
};
function Fu(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Wu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function zu(e) {
  const a = ga(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Gu(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Na(zu(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Fu(e),
    ...Wu(e, a)
  ];
}
function Uu({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: P.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: P.k, children: a }),
    e
  ] });
}
function Ku({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: P.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Vu({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: P.block, children: [
    /* @__PURE__ */ n("p", { className: P.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: P.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: P.note, children: e.agentMeta })
  ] }) : null;
}
function x$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const d = $(), u = Gu(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: d, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: P.body, children: [
    /* @__PURE__ */ n(Ku, { item: e }),
    /* @__PURE__ */ o("div", { className: P.summary, children: [
      /* @__PURE__ */ n("h2", { className: P.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: P.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: P.kv, children: u.map(([h, f]) => /* @__PURE__ */ o("div", { className: P.row, children: [
      /* @__PURE__ */ n("dt", { className: P.label, children: h }),
      /* @__PURE__ */ n("dd", { className: P.value, children: f })
    ] }, h)) }),
    /* @__PURE__ */ n(Vu, { item: e }),
    /* @__PURE__ */ o("div", { className: P.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: P.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: P.note, children: c })
    ] }),
    /* @__PURE__ */ n(Uu, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Yu = "_root_3azmy_2", Xu = "_list_3azmy_7", Ju = "_item_3azmy_12", Qu = "_box_3azmy_18", Zu = "_text_3azmy_23", eh = "_note_3azmy_28", He = {
  root: Yu,
  list: Xu,
  item: Ju,
  box: Qu,
  text: Zu,
  note: eh
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
const ah = "_rail_ke7ch_2", nh = "_k_ke7ch_11", th = "_head_ke7ch_19", rh = "_section_ke7ch_25", lh = "_card_ke7ch_38", oh = "_strip_ke7ch_42", ih = "_skeleton_ke7ch_56", sh = "_skeletonLabel_ke7ch_70", ch = "_bar_ke7ch_76", dh = "_note_ke7ch_85", he = {
  rail: ah,
  k: nh,
  head: th,
  section: rh,
  card: lh,
  strip: oh,
  skeleton: ih,
  skeletonLabel: sh,
  bar: ch,
  note: dh
};
function uh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ea({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: he.k, children: e }),
    a
  ] });
}
function hh({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function mh({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Pd, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function wh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(mh, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(hh, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function I$(e) {
  const a = uh(e.onOpen), t = Pn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ea, { title: "Card", children: /* @__PURE__ */ n("div", { className: he.card, children: t && /* @__PURE__ */ n($a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ea, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(wh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ea, { title: "Effect of this config", children: /* @__PURE__ */ n(Ca, { items: e.effects, density: "compact" }) })
  ] });
}
function _h(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function fh(e) {
  return Math.ceil(e.length / 2);
}
function vh(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function On(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function bh(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = On(e);
  l !== void 0 && t(l), r(vh(e.type));
}
function ph(e, a, t, r, l) {
  x(() => {
    if (e !== null)
      return e.subscribe(a, (i) => bh(i, t, r, l));
  }, [e, a, t, r, l]);
}
function gh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Nh(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function yh(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function kh(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(fh(a ?? [])) + ")"
  };
}
function $h(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Ch(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: re(e.cost) }) : null;
}
function Sh(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Rh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Th(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Eh(e, a) {
  return a === void 0 ? e : _h(e, a.ref);
}
function Lh(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ze(e) {
  return e === !0 ? "true" : void 0;
}
function Dn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = N(null), i = la(l), s = N(/* @__PURE__ */ new Set()), [c, d] = p(gh(a));
  ph(e.feed, a.key, s, d, i);
  const u = Nh(a, r), h = yh(a, t), f = kh(a, e.fields), b = Th(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Lh(e),
      className: "ward-workcard",
      "data-flagged": Ze(a.flagged),
      "data-selected": Ze(e.selected),
      style: f,
      ref: Eh(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        $h(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Ch(a, e.fields),
          Sh(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Rh(t, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Ah({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function xh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Ih(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Mh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Ah, { count: e.items.length, cap: e.column.cap });
}
function qh(e, a) {
  return e.roving ?? a;
}
function Bh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Ph(e, a) {
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
function Oh(e) {
  const a = $(), t = va({ orientation: "vertical" }), r = qh(e, t), l = xh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ze(l), "data-gate": Ze(e.column.gate), children: [
    Ih(e.column, e.items.length, a),
    Mh(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Bh(e, t), children: Ph(e, r) })
  ] });
}
function Dh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function jh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Hh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function M$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Dh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      jh(e),
      Hh(e.onConfigure),
      /* @__PURE__ */ n(Va, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Fh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Wh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Oe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Oe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function zh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function q$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ze(Fh(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Wh(e) }),
    /* @__PURE__ */ n(A, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(Ln, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    zh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function B$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Dn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Oh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Gh(e, a) {
  const t = On(e);
  t !== void 0 && a(t);
}
function Uh(e, a, t) {
  x(() => {
    if (e != null)
      return e.subscribe(a, (r) => Gh(r, t));
  }, [e, a, t]);
}
function Kh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Vh(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function Yh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Xh(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function P$(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  Uh(e.feed, a.key, l);
  const i = [...Kh(a), ...Vh(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Yh(t, r)
    ] }),
    Xh(a, e.actions)
  ] });
}
const Jh = "_card_hvxp7_2", Qh = "_head_hvxp7_17", Zh = "_mark_hvxp7_25", em = "_name_hvxp7_37", am = "_chips_hvxp7_48", nm = "_description_hvxp7_54", tm = "_run_hvxp7_59", rm = "_sep_hvxp7_68", lm = "_facts_hvxp7_73", om = "_fact_hvxp7_73", im = "_factLabel_hvxp7_86", sm = "_factValue_hvxp7_90", le = {
  card: Jh,
  head: Qh,
  mark: Zh,
  name: em,
  chips: am,
  description: nm,
  run: tm,
  sep: rm,
  facts: lm,
  fact: om,
  factLabel: im,
  factValue: sm
}, cm = { live: "done", draft: "running", paused: "meta" };
function dm(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function um({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: cm[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function hm({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function mm({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function wm({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function _m(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function fm({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": Ee(e.streamStep, "id") }, d = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: dm(s),
      style: c,
      "data-selected": d,
      "data-paused": _m(e.versions),
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(hm, { description: e.description }),
        /* @__PURE__ */ n(mm, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(um, { versions: e.versions }),
        /* @__PURE__ */ n(wm, { facts: i })
      ]
    }
  );
}
const vm = "_list_4dcyc_2", bm = "_row_4dcyc_11", pm = "_head_4dcyc_23", gm = "_id_4dcyc_30", Nm = "_lock_4dcyc_35", ym = "_reason_4dcyc_41", km = "_remove_4dcyc_46", $m = "_clauses_4dcyc_50", Cm = "_clause_4dcyc_50", Sm = "_label_4dcyc_64", Rm = "_cell_4dcyc_71", Tm = "_value_4dcyc_76", ie = {
  list: vm,
  row: bm,
  head: pm,
  id: gm,
  lock: Nm,
  reason: ym,
  remove: km,
  clauses: $m,
  clause: Cm,
  label: Sm,
  cell: Rm,
  value: Tm
}, jn = Ve(!1);
function O$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(jn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function Em({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(A, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function Lm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ie.reason, children: e })
  ] });
}
function Am({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ n("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Lm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function vn(e, a) {
  return e.locked ? void 0 : a;
}
function D$({ rule: e, onChange: a, onRemove: t }) {
  if (!Ke(jn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = vn(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Am, { rule: e, onRemove: vn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ n("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ie.cell, children: /* @__PURE__ */ n(Em, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const xm = "_ladder_wwnch_2", Im = "_cell_wwnch_7", Mm = "_empty_wwnch_26", qm = "_name_wwnch_34", Bm = "_holder_wwnch_40", Pm = "_request_wwnch_46", Om = "_swatches_wwnch_51", Dm = "_swatch_wwnch_51", jm = "_tilesFrame_wwnch_78", Hm = "_tiles_wwnch_78", Fm = "_tile_wwnch_78", Wm = "_bar_wwnch_117", zm = "_hex_wwnch_128", Gm = "_note_wwnch_138", E = {
  ladder: xm,
  cell: Im,
  empty: Mm,
  name: qm,
  holder: Bm,
  request: Pm,
  swatches: Om,
  swatch: Dm,
  tilesFrame: jm,
  tiles: Hm,
  tile: Fm,
  bar: Wm,
  hex: zm,
  note: Gm
}, Um = "not validated yet, pending a CVD matrix and dark stepping";
function Km(e) {
  return e.reserved ? "reserved" : pa(e.step) ? "validated" : "partial";
}
function Hn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Vm(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Ym({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Le, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Xm(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Jm(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const bn = (e) => String(e).padStart(2, "0");
function Qm(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Hn(e, void 0);
}
function Zm({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${bn(e)}` : Dt(e) }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: r ? t : `Step ${bn(e)} · ${t}` })
  ] });
}
function ew({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = Km(e), s = Hn(i, t), c = s !== "free", d = a === e.step, u = e.name ?? `Step ${e.step}`, h = () => {
    c || r(e.step);
  }, f = `${u} · ${l === "tiles" && d ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": f, ...Jm(c, d), "data-validation": i, style: Vm(e, i), onClick: h, onKeyDown: (g) => Xm(g, h) }, label: f, name: u, holder: s, validation: i, note: Qm(i, t, d), step: e.step };
}
const aw = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Zm, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Ym, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function nw(e) {
  return aw[e.presentation](ew(e));
}
function tw(e) {
  for (const a of e)
    if (!a.reserved && !ba(a.step)) throw new Error("colour ladder renders token steps only");
}
function rw() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function lw(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const ow = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function iw() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const sw = { list: rw, swatches: () => null, tiles: iw };
function Fn(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  tw(e.steps);
  const r = lw(e), l = sw[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(nw, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${ow[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: E.tiles, children: i }) : i });
}
const cw = "_rail_1el2t_2", dw = "_section_1el2t_12", uw = "_sectionFlush_1el2t_22", hw = "_head_1el2t_26", mw = "_headLabel_1el2t_34", ww = "_sample_1el2t_42", _w = "_sampleLabel_1el2t_47", fw = "_sampleTitle_1el2t_54", vw = "_sampleMeta_1el2t_59", bw = "_trace_1el2t_65", pw = "_traceHead_1el2t_70", gw = "_steps_1el2t_78", Nw = "_step_1el2t_78", yw = "_stepTitle_1el2t_97", kw = "_hollow_1el2t_107", $w = "_stepBody_1el2t_115", Cw = "_stepDetail_1el2t_127", Sw = "_publish_1el2t_132", Rw = "_reason_1el2t_138", Tw = "_note_1el2t_143", Ew = "_reveal_1el2t_148", y = {
  rail: cw,
  section: dw,
  sectionFlush: uw,
  head: hw,
  headLabel: mw,
  sample: ww,
  sampleLabel: _w,
  sampleTitle: fw,
  sampleMeta: vw,
  trace: bw,
  traceHead: pw,
  steps: gw,
  step: Nw,
  stepTitle: yw,
  hollow: kw,
  stepBody: $w,
  stepDetail: Cw,
  publish: Sw,
  reason: Rw,
  note: Tw,
  reveal: Ew
}, pn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Lw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Aw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, xw = { notSimulated: "not simulated", running: "running" };
function Iw(e) {
  return e.presentation === "foundry";
}
function Mw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function qw(e, a) {
  var r;
  const t = Lw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Bw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Pw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Ow(e) {
  if (Bw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Dw(e) {
  const [a, t] = p(!1);
  x(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${y.step} ${y.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function jw(e) {
  const a = xw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: y.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Le, { size: 6, kind: Aw[e.kind], label: e.kind });
}
function Hw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: y.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Fw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Ww(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Dw, { kind: a.kind, children: [
    /* @__PURE__ */ n(jw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: y.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: y.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Hw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Fw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function zw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(se(a)), t.join(" · ");
}
function Wn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${y.trace} ${y.section}`, children: [
    /* @__PURE__ */ n("p", { className: y.traceHead, id: a, children: zw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: y.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Ww, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Gw(e) {
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
function Uw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ce(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${y.sampleMeta} ${y.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Kw(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Rn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: y.sectionFlush, children: /* @__PURE__ */ n(ya, { divided: !0, cells: a }) });
}
function Vw(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Rn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Yw(e) {
  const a = Vw(e.run);
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
function Xw(e) {
  return /* @__PURE__ */ o("div", { className: `${y.publish} ${y.section}`, children: [
    /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: y.note, children: e.note })
  ] });
}
function Jw(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${y.publish} ${y.section}`, children: /* @__PURE__ */ n(zn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Gn(e) {
  return /* @__PURE__ */ o("div", { className: `${y.head} ${y.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: y.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: pn[e.run.status].role, label: pn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Qw(e, a) {
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
function Zw(e) {
  var t;
  Pw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Gw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Kw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist }) }),
    /* @__PURE__ */ n(Xw, { reason: Mw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function e_(e) {
  var r;
  const a = Qw(e.run, e.feed);
  Ow(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Gn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Uw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Wn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Yw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Jw, { reason: qw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function j$(e) {
  return Iw(e) ? /* @__PURE__ */ n(e_, { ...e }) : /* @__PURE__ */ n(Zw, { ...e });
}
const a_ = "_list_142ip_3", n_ = "_row_142ip_9", t_ = "_condition_142ip_18", r_ = "_action_142ip_24", oa = {
  list: a_,
  row: n_,
  condition: t_,
  action: r_
}, Un = Ve(!1);
function H$({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Un.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oa.list, "aria-label": a, children: e }) });
}
function F$({ rule: e }) {
  if (!Ke(Un)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: oa.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: oa.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: oa.action, children: e.then })
  ] });
}
function Pa(e, a, t) {
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
function l_(e) {
  return e === "up" ? "down" : "up";
}
function o_(e, a) {
  const t = gn(e, a.id, a.direction) ?? gn(e, a.id, l_(a.direction));
  t == null || t.focus();
}
function Yn() {
  const e = N(null), [a, t] = p(null), [r, l] = p("");
  return x(() => {
    e.current !== null && a !== null && o_(e.current, a);
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
const i_ = "_body_1h15q_2", s_ = "_title_1h15q_8", c_ = "_section_1h15q_13", d_ = "_legend_1h15q_18", u_ = "_stages_1h15q_26", h_ = "_stage_1h15q_26", m_ = "_stageIndex_1h15q_44", w_ = "_stageName_1h15q_50", __ = "_footer_1h15q_59", f_ = "_note_1h15q_66", v_ = "_reason_1h15q_71", b_ = "_actions_1h15q_76", p_ = "_webHead_1h15q_83", g_ = "_kicker_1h15q_92", N_ = "_webTitle_1h15q_99", y_ = "_webBody_1h15q_105", k_ = "_webSection_1h15q_109", $_ = "_sectionHead_1h15q_121", C_ = "_sectionNote_1h15q_129", S_ = "_formLabel_1h15q_134", R_ = "_identityRow_1h15q_139", T_ = "_nameCell_1h15q_145", E_ = "_keyCell_1h15q_150", L_ = "_colourCell_1h15q_154", A_ = "_colourStatus_1h15q_161", x_ = "_webStages_1h15q_166", I_ = "_webStageList_1h15q_172", M_ = "_webStage_1h15q_166", q_ = "_webIndex_1h15q_191", B_ = "_webStageName_1h15q_196", P_ = "_webMoves_1h15q_201", O_ = "_addStage_1h15q_215", D_ = "_addStageButton_1h15q_223", j_ = "_addStageNote_1h15q_231", H_ = "_webFooter_1h15q_236", F_ = "_webFooterNotes_1h15q_244", W_ = "_webNote_1h15q_251", w = {
  body: i_,
  title: s_,
  section: c_,
  legend: d_,
  stages: u_,
  stage: h_,
  stageIndex: m_,
  stageName: w_,
  footer: __,
  note: f_,
  reason: v_,
  actions: b_,
  webHead: p_,
  kicker: g_,
  webTitle: N_,
  webBody: y_,
  webSection: k_,
  sectionHead: $_,
  sectionNote: C_,
  formLabel: S_,
  identityRow: R_,
  nameCell: T_,
  keyCell: E_,
  colourCell: L_,
  colourStatus: A_,
  webStages: x_,
  webStageList: I_,
  webStage: M_,
  webIndex: q_,
  webStageName: B_,
  webMoves: P_,
  addStage: O_,
  addStageButton: D_,
  addStageNote: j_,
  webFooter: H_,
  webFooterNotes: F_,
  webNote: W_
}, z_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Jn = "not in catalogue";
function G_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Jn}` }, ...t];
}
function U_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(A, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Jn}`;
  return /* @__PURE__ */ n(A, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: G_(t, e.name), invalid: i, onChange: r });
}
function Qn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function K_(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function V_({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Qn(a, t), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(U_, { stage: a, index: t, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(A, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: z_, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Y_({ stages: e, onChange: a, catalogue: t }) {
  const r = K_(e.length), l = Yn(), i = (c, d) => {
    const u = Kn(c, d);
    r.current = Pa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Vn(Qn(e[c], c), u, e.length)), a(Pa(e, c, u));
  }, s = (c, d) => a(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(V_, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: t, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Xn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const X_ = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], J_ = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Q_ = "A new stream starts as a draft. Nothing runs on it until you publish it.", Z_ = "Create is disabled: name the stream and give it a key first.", ef = "reorder with the ↑ ↓ buttons · min 2";
function Xa(e, a) {
  return !e.reserved && pa(e.step) && a[e.step] === void 0;
}
function af(e, a) {
  const t = e.find((r) => Xa(r, a));
  return t ? t.step : 1;
}
function nf({ stages: e, onMove: a }) {
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
function tf({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: Q_ }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(_, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function rf(e, a) {
  return e !== "" && a !== "" ? null : Z_;
}
function lf(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = J_, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = $(), [h, f] = p(""), [b, g] = p(""), [I, j] = p(a[0].value), [oe, $e] = p(() => af(t, r)), [ne, De] = p(e.stages ?? X_), [je, C] = p(l[0].value), z = { name: h, key: b, streamStep: oe, owner: I, stages: ne, policy: je }, fe = rf(h, b);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Stream name", value: h, onChange: f }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Key", value: b, onChange: g, mono: !0 }),
      /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: I, onChange: j, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Fn, { label: "Stream colour", steps: t, value: oe, onChange: $e, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(nf, { stages: ne, onMove: (Ae, gt) => De(Pa(ne, Ae, gt)) })
    ] }),
    /* @__PURE__ */ n(Mn, { legend: "Loop policy", options: l, value: je, onChange: C }),
    /* @__PURE__ */ n(tf, { reason: fe, onCreate: () => i(z), onDraft: () => s(z) })
  ] }) });
}
const Zn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], of = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function sf(e, a, t, r, l, i) {
  var c;
  const s = ((c = Zn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function cf(e, a) {
  return df(e) && uf(e, a) && hf(e);
}
function df(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function uf(e, a) {
  return e.colourStep !== null && Xa({ step: e.colourStep }, a);
}
function hf(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function mf(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${Um}.` : Xa({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function wf({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function _f({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(wf, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: of })
    ] }),
    l && /* @__PURE__ */ n(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function ff({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function vf({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function bf(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, f] = p(null), [b, g] = p("relay"), [I, j] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = sf(l, s, d, h, b, I), $e = cf(oe, r), ne = I.find((C) => C.kind === "agent" && C.name.trim() !== ""), De = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Fn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: f, takenBy: r })
  ] }), je = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: mf(h, r) }),
    /* @__PURE__ */ n(A, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((C) => ({ value: C, label: C })), onChange: u })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(ff, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(vf, { name: l, setName: i, streamKey: s, setKey: c, colour: De, owner: je }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: ef })
        ] }),
        /* @__PURE__ */ n(Y_, { stages: I, onChange: j })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(Mn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: Zn, onChange: g }) }),
      /* @__PURE__ */ n(_f, { ready: $e, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function W$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(bf, { ...e }) : /* @__PURE__ */ n(lf, { ...e });
}
const pf = "_row_bs8hc_2", gf = "_cell_bs8hc_6", Nf = "_condition_bs8hc_11", yf = "_action_bs8hc_18", kf = "_contract_bs8hc_24", $f = "_contractCondition_bs8hc_33", Cf = "_contractAction_bs8hc_39", Q = {
  row: pf,
  cell: gf,
  condition: Nf,
  action: yf,
  contract: kf,
  contractCondition: $f,
  contractAction: Cf
}, et = ["advance", "block", "escalate", "requestReview"], Nn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ma(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Ja(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: Q.action, children: Nn[e.then] }) : /* @__PURE__ */ n(
    A,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: et.map((l) => ({ value: l, label: Nn[l] }))
    }
  );
}
function Sf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: Q.condition, title: ma(e, r), children: ma(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Ja(e, a, t) })
  ] });
}
function Rf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: Q.condition, children: ma(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Ja(e, a, t) })
  ] });
}
function Tf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractCondition, children: ma(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractAction, children: Ja(e, a, t, !0) })
  ] });
}
const Ef = { two: Rf, four: Sf, contract: Tf };
function z$(e) {
  var t;
  if (!et.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Ef[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Lf = "_column_k4nls_2", Af = "_head_k4nls_17", xf = "_index_k4nls_23", If = "_name_k4nls_29", Mf = "_meta_k4nls_38", qf = "_mono_k4nls_43", Bf = "_gate_k4nls_50", Pf = "_reviewersLabel_k4nls_57", Of = "_reviewers_k4nls_57", Df = "_reviewer_k4nls_57", jf = "_agents_k4nls_74", Hf = "_workflowColumn_k4nls_79", Ff = "_workflowHead_k4nls_96", Wf = "_stageRow_k4nls_102", zf = "_stageLabel_k4nls_109", Gf = "_workflowTitle_k4nls_116", Uf = "_workflowMeta_k4nls_122", Kf = "_workflowGate_k4nls_127", Vf = "_gateNote_k4nls_135", Yf = "_cardNote_k4nls_140", Xf = "_reviewerList_k4nls_145", Jf = "_reviewerRow_k4nls_151", Qf = "_reviewerMark_k4nls_157", Zf = "_reviewerName_k4nls_167", ev = "_terminalCard_k4nls_173", av = "_terminalCount_k4nls_182", nv = "_workflowAgents_k4nls_188", tv = "_mount_k4nls_194", k = {
  column: Lf,
  head: Af,
  index: xf,
  name: If,
  meta: Mf,
  mono: qf,
  gate: Bf,
  reviewersLabel: Pf,
  reviewers: Of,
  reviewer: Df,
  agents: jf,
  workflowColumn: Hf,
  workflowHead: Ff,
  stageRow: Wf,
  stageLabel: zf,
  workflowTitle: Gf,
  workflowMeta: Uf,
  workflowGate: Kf,
  gateNote: Vf,
  cardNote: Yf,
  reviewerList: Xf,
  reviewerRow: Jf,
  reviewerMark: Qf,
  reviewerName: Zf,
  terminalCard: ev,
  terminalCount: av,
  workflowAgents: nv,
  mount: tv
}, rv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Qa(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function at(e) {
  return `${Math.round(e * 100)}%`;
}
function lv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: k.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: k.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: k.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ya, { cells: [
      { value: at(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function ov({ stage: e }) {
  return /* @__PURE__ */ n(ya, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Qa(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function iv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: k.head, children: [
    /* @__PURE__ */ n("span", { className: k.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: k.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: rv[e.kind] })
  ] });
}
function sv({ stage: e }) {
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
function cv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(lv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(ov, { stage: e }) : null;
}
function dv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function uv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: k.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(iv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(sv, { stage: e }),
    /* @__PURE__ */ n(cv, { stage: e }),
    /* @__PURE__ */ n("div", { className: k.agents, children: a.map((s) => /* @__PURE__ */ n(fm, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(dv, { onMount: t })
  ] });
}
const hv = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function mv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: k.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: k.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: k.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: k.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function wv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: k.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(mv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: k.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: at(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function _v(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function fv({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: k.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: k.terminalCount, children: Qa(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: k.cardNote, children: _v(e.rolledBackThisWeek) })
  ] });
}
function vv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function bv(e) {
  if (e.kind === "terminal") return `${Qa(e.closedThisWeek)} this week`;
  const a = vv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function pv({ stage: e, titleId: a }) {
  const t = hv[e.kind];
  return /* @__PURE__ */ o("header", { className: k.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: k.stageRow, children: [
      /* @__PURE__ */ o("span", { className: k.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: k.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: k.workflowMeta, children: bv(e) })
  ] });
}
function gv(e) {
  return e === "entry" || e === "agent";
}
function Nv({ stage: e, onMount: a }) {
  return a === void 0 || !gv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: `${k.mount} ward-target`, onClick: () => a(e.index), children: "+ Mount agent" });
}
function yv({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: k.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(pv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(wv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(fv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: k.workflowAgents, children: a }),
    /* @__PURE__ */ n(Nv, { stage: e, onMount: t })
  ] });
}
function kv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function G$(e) {
  return kv(e) ? /* @__PURE__ */ n(yv, { ...e }) : /* @__PURE__ */ n(uv, { ...e });
}
const $v = "_row_9esh9_6", Cv = "_cell_9esh9_10", Sv = "_name_9esh9_19", Rv = "_chain_9esh9_26", Tv = "_owner_9esh9_32", Ev = "_mono_9esh9_38", Lv = "_compactRow_9esh9_45", Av = "_compactCell_9esh9_54", xv = "_stack_9esh9_71", Iv = "_stat_9esh9_78", Mv = "_identityLine_9esh9_85", qv = "_identity_9esh9_85", Bv = "_compactName_9esh9_103", Pv = "_ownerLine_9esh9_117", Ov = "_link_9esh9_130", Dv = "_gateMark_9esh9_136", jv = "_emptyChain_9esh9_141", Hv = "_arrow_9esh9_147", Fv = "_muted_9esh9_148", Wv = "_define_9esh9_153", zv = "_statValue_9esh9_160", Gv = "_policyId_9esh9_166", Uv = "_sub_9esh9_171", v = {
  row: $v,
  cell: Cv,
  name: Sv,
  chain: Rv,
  owner: Tv,
  mono: Ev,
  compactRow: Lv,
  compactCell: Av,
  stack: xv,
  stat: Iv,
  identityLine: Mv,
  identity: qv,
  compactName: Bv,
  ownerLine: Pv,
  link: Ov,
  gateMark: Dv,
  emptyChain: jv,
  arrow: Hv,
  muted: Fv,
  define: Wv,
  statValue: zv,
  policyId: Gv,
  sub: Uv
};
function Kv(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Vv(e) {
  return e === void 0 ? v.compactRow : `${v.compactRow} ${e}`;
}
function nt(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Yv(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${nt(e.members)}`;
}
function Xv(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: /* @__PURE__ */ o("span", { className: v.stack, children: [
    /* @__PURE__ */ o("span", { className: v.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${v.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${v.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: v.ownerLine, children: Yv(e) })
  ] }) });
}
function tt({ name: e, gate: a, size: t }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ n("span", { className: v.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { role: a ? "gate" : "soft", size: t, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Jv(e) {
  return /* @__PURE__ */ n("span", { className: `${v.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: v.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: v.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(tt, { name: a.name, gate: a.gate === !0, size: "tag" })
  ] }, `${a.name}${t}`)) });
}
function Qv(e, a) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: v.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: v.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: `${v.define} ward-target`, href: W(a), children: "Define workflow" })
  ] }) : Jv(e) });
}
function yn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: t }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: `${v.statValue} ward-stat-value`, title: r, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: v.sub, children: a })
  ] }) });
}
function Zv(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: v.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: v.sub, children: e.summary })
  ] }) });
}
function eb(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function ab({ stream: e, href: a, presentation: t }) {
  const r = Vv(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ee(e.streamStep, "chip") }, children: [
    Xv(e, a),
    Qv(e.stages, a),
    yn(eb(e.agents), e.agents === void 0 ? void 0 : Kv(e.agents), "—"),
    Zv(e.policy),
    yn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function nb(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function U$(e) {
  if (nb(e)) return ab(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: v.row, children: [
    /* @__PURE__ */ o("td", { className: v.cell, children: [
      /* @__PURE__ */ n("a", { className: `${v.name} ward-target`, href: W(t), children: a.name }),
      /* @__PURE__ */ n(m, { ...Na(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, children: /* @__PURE__ */ n("span", { className: v.chain, children: a.stages.map((r) => /* @__PURE__ */ n("span", { className: v.link, children: /* @__PURE__ */ n(tt, { name: r.name, gate: r.gate }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: v.mono, children: nt(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, title: a.inFlightHint, children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const tb = "_row_mdce7_2", rb = "_name_mdce7_16", lb = "_scope_mdce7_24", wa = {
  row: tb,
  name: rb,
  scope: lb
};
function ob(e) {
  return e === void 0 ? `${wa.row} ward-toolrow` : `${wa.row} ward-toolrow ${e}`;
}
function ib(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function sb({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function cb({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function db({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${wa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function ub(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function K$({ tool: e, onChange: a, presentation: t }) {
  const r = $(), l = $(), i = ib(e, t), s = ub(t);
  return /* @__PURE__ */ o(s, { className: ob(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(sb, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${wa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(db, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(cb, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const hb = "_strip_1qtlf_2", mb = "_head_1qtlf_10", wb = "_name_1qtlf_16", _b = "_chart_1qtlf_24", fb = "_segment_1qtlf_30", vb = "_detailedChart_1qtlf_36", bb = "_rail_1qtlf_49", pb = "_section_1qtlf_55", gb = "_label_1qtlf_66", Nb = "_note_1qtlf_83", ee = {
  strip: hb,
  head: mb,
  name: wb,
  chart: _b,
  segment: fb,
  detailedChart: vb,
  rail: bb,
  section: pb,
  label: gb,
  note: Nb
}, yb = "No item in flight to preview.", kb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", $b = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Oa = [1, 2, 3, 4, 5, 6], _a = 100;
function Cb(e, a) {
  return a.has(e) ? Ee(e, "id") : "var(--ward-color-line)";
}
function Sb({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Oa.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: ee.segment,
      x: l * _a,
      y: "0",
      width: _a,
      height: "8",
      fill: Cb(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Rb(e) {
  const a = e.slice(0, Oa.length);
  for (; a.length < Oa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Tb({ identities: e }) {
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
function rt(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ta({ label: e, children: a }) {
  const t = $();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: ee.label, children: e }),
    a
  ] });
}
function Eb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: ee.note, children: a ?? yb }) : /* @__PURE__ */ n($a, { item: { ...e, streamStep: ga(t.streamStep) }, onOpen: rt(r), feed: null });
}
function Lb({ draft: e }) {
  const a = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
  ] });
}
function Ab(e) {
  const a = Rb(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ta, { label: "Board card", children: /* @__PURE__ */ n(Eb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ta, { label: "Streams index row", children: /* @__PURE__ */ n(Lb, { draft: t }) }),
    /* @__PURE__ */ o(ta, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Tb, { identities: a }),
      /* @__PURE__ */ n("p", { className: ee.note, children: kb })
    ] }),
    /* @__PURE__ */ n(ta, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: ee.note, children: $b }) })
  ] });
}
function xb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ n(Le, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Na(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n($a, { item: { ...a, streamStep: e.streamStep }, onOpen: rt(r) }),
    /* @__PURE__ */ n(Sb, { draft: e, streams: t })
  ] });
}
function V$(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Ab, { ...e }) : /* @__PURE__ */ n(xb, { ...e });
}
const Ib = "_row_ixlg5_6", Mb = "_headCell_ixlg5_10", qb = "_cell_ixlg5_11", Bb = "_name_ixlg5_23", Pb = "_consequence_ixlg5_29", Ob = "_governed_ixlg5_36", Db = "_control_ixlg5_42", jb = "_byRole_ixlg5_48", Hb = "_webControl_ixlg5_59", Fb = "_webConsequence_ixlg5_65", Wb = "_webGoverned_ixlg5_71", D = {
  row: Ib,
  headCell: Mb,
  cell: qb,
  name: Bb,
  consequence: Pb,
  governed: Ob,
  control: Db,
  byRole: jb,
  webControl: Hb,
  webConsequence: Fb,
  webGoverned: Wb
};
function zb({
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
function Gb({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(zb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Ub(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Kb({ name: e, cell: a, onChange: t }) {
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
function Vb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Kb, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webGoverned} ward-cellmeta`, children: Ub(e) }) })
  ] });
}
function Y$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Vb, { ...e }) : /* @__PURE__ */ n(Gb, { ...e });
}
const Yb = "_row_vv64h_2", Xb = "_cell_vv64h_6", Jb = "_name_vv64h_25", Qb = "_note_vv64h_30", Zb = "_webName_vv64h_41", ep = "_webMeta_vv64h_47", K = {
  row: Yb,
  cell: Xb,
  name: Jb,
  note: Qb,
  webName: Zb,
  webMeta: ep
}, lt = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function ap(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function np({ component: e, onRestart: a }) {
  const t = $(), r = lt[e.state], l = e.state === "drainFirst";
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
function tp({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: ap(e.state) });
}
function rp({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...lt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(tp, { component: e, onRestart: a }) })
  ] });
}
function X$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(rp, { ...e }) : /* @__PURE__ */ n(np, { ...e });
}
const lp = "_row_1f1gp_7", op = "_cell_1f1gp_11", ip = "_next_1f1gp_28", sp = "_headCell_1f1gp_38", cp = "_webId_1f1gp_77", dp = "_webPurpose_1f1gp_83", up = "_webMeta_1f1gp_91", hp = "_webUrgent_1f1gp_97", H = {
  row: lp,
  cell: op,
  next: ip,
  headCell: sp,
  webId: cp,
  webPurpose: dp,
  webMeta: up,
  webUrgent: hp
}, mp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, wp = {
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
], _p = Object.fromEntries(ot.map((e) => [e.key, e]));
function Fe({ column: e, children: a }) {
  const t = _p[e];
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
function J$() {
  return /* @__PURE__ */ n("tr", { children: ot.map((e) => /* @__PURE__ */ n(
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
function fp({ cred: e }) {
  const a = mp[e.state];
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n(Fe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Fe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Fe, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Fe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Fe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Fe, { column: "next", children: /* @__PURE__ */ n("span", { className: H.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function vp({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${H.webMeta} ${H.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function bp({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(vp, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { ...wp[e.state] }) })
  ] });
}
function Q$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(bp, { ...e }) : /* @__PURE__ */ n(fp, { ...e });
}
const pp = "_card_17zba_2", gp = "_head_17zba_11", Np = "_env_17zba_18", yp = "_version_17zba_25", kp = "_meta_17zba_32", $p = "_webCard_17zba_37", Cp = "_webRow_17zba_47", Sp = "_webTitle_17zba_55", Rp = "_webLine_17zba_65", Tp = "_webVersion_17zba_72", Ep = "_webMeta_17zba_77", U = {
  card: pp,
  head: gp,
  env: Np,
  version: yp,
  meta: kp,
  webCard: $p,
  webRow: Cp,
  webTitle: Sp,
  webLine: Rp,
  webVersion: Tp,
  webMeta: Ep
}, it = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Lp({ env: e }) {
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
function Ap(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ce(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function xp(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...it[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: Ap(e) })
  ] });
}
function Z$(e) {
  return "presentation" in e ? /* @__PURE__ */ n(xp, { ...e }) : /* @__PURE__ */ n(Lp, { ...e });
}
const Ip = "_panel_1hmja_2", Mp = "_line_1hmja_8", qp = "_actions_1hmja_14", ra = {
  panel: Ip,
  line: Mp,
  actions: qp
};
function eC(e) {
  return /* @__PURE__ */ o("div", { className: ra.panel, children: [
    /* @__PURE__ */ n("p", { className: ra.line, children: e.status }),
    /* @__PURE__ */ n(A, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ra.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ra.line, children: e.note ?? "" })
  ] });
}
const Bp = "_upload_erepj_2", Pp = "_preview_erepj_7", Op = "_mark_erepj_17", Dp = "_empty_erepj_22", jp = "_actions_erepj_28", Hp = "_input_erepj_33", Fp = "_reasons_erepj_41", Wp = "_reason_erepj_41", zp = "_accepted_erepj_57", te = {
  upload: Bp,
  preview: Pp,
  mark: Op,
  empty: Dp,
  actions: jp,
  input: Hp,
  reasons: Fp,
  reason: Wp,
  accepted: zp
}, st = 1.5, ct = 22, fa = "script elements or event handlers", Se = "links or external references", ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${st}px at ${ct}px`], Gp = [ye[1], ye[2], fa, Se], Up = /* @__PURE__ */ new Map([
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
]), Kp = "http://www.w3.org/2000/svg", Vp = "http://www.w3.org/2000/xmlns/", Yp = /* @__PURE__ */ new Set([
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
]), Xp = /* @__PURE__ */ new Set([
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
]), Jp = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, Qp = /url\s*\(|['"\\]/i;
function Zp() {
  return { ok: !1, reasons: [ye[1]] };
}
function dt(e) {
  return e.namespaceURI === Kp || e.namespaceURI === null;
}
function eg(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && dt(a) ? a : null;
  } catch {
    return null;
  }
}
function ag(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [ye[0]] : [];
}
function ng(e) {
  return Up.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function tg(e) {
  return Qp.test(e.replace(Jp, ""));
}
function rg(e) {
  return /^on/i.test(e.localName) ? fa : e.localName === "href" || tg(e.value) ? Se : void 0;
}
function lg(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(ng(t));
    for (const r of Array.from(t.attributes)) a.add(rg(r));
  }
  return Gp.filter((t) => a.has(t));
}
function og(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? ct / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < st;
  }) ? [ye[3]] : [];
}
function ig(e) {
  if (e.namespaceURI === Vp) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Xp.has(a) || a.startsWith("stroke"));
}
function sg(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && dt(a) && Yp.has(a.localName);
}
function cg(e, a) {
  sg(a) ? a.nodeType === Node.ELEMENT_NODE && ut(a) : e.removeChild(a);
}
function ut(e) {
  for (const a of Array.from(e.attributes)) ig(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) cg(e, a);
  return e;
}
function aC(e) {
  const a = eg(e);
  if (a === null) return Zp();
  const t = [...ag(a), ...lg(a), ...og(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(ut(a)) };
}
const dg = "Mark accepted.";
function ug({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function hg(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function mg(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function wg({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: dg }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function _g({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(wg, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${hg(e, t)}`, role: "status", children: mg(e, t) });
}
function nC({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = N(null), [i, s] = p(null), c = (d) => {
    if (d === void 0) return;
    const u = a(d);
    u instanceof Promise ? u.then(s) : s(u);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(ug, { current: e }),
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
    /* @__PURE__ */ n(_g, { result: i, presentation: r })
  ] });
}
const fg = "_row_1wp9s_7", vg = "_cell_1wp9s_11", bg = "_head_1wp9s_28", pg = "_name_1wp9s_34", gg = "_pinned_1wp9s_42", Ng = "_headCell_1wp9s_49", yg = "_webName_1wp9s_88", kg = "_webMeta_1wp9s_95", $g = "_webWarn_1wp9s_103", q = {
  row: fg,
  cell: vg,
  head: bg,
  name: pg,
  pinned: gg,
  headCell: Ng,
  webName: yg,
  webMeta: kg,
  webWarn: $g
}, Za = {
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
], Cg = Object.fromEntries(ht.map((e) => [e.key, e]));
function Sg(e, a) {
  return `mcp.${e}.${a}`;
}
function Rg(e) {
  return Object.keys(Za).includes(e);
}
function Tg(e) {
  return Za[e !== void 0 && Rg(e) ? e : "unknown"];
}
function Ye({ column: e, children: a }) {
  const t = Cg[e];
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
function tC() {
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
function Eg({ server: e }) {
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
    /* @__PURE__ */ n(Ye, { column: "tools", children: e.tools.map((t) => Sg(e.name, t)).join(" · ") })
  ] });
}
function Lg(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Ag(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function xg({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Ig({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Mg({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function qg({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Lg(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Ag(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(xg, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Tg(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n(Ig, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Mg, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function rC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(qg, { ...e }) : /* @__PURE__ */ n(Eg, { ...e });
}
const Bg = "_row_1h9nq_2", Pg = "_headCell_1h9nq_14", Og = "_cell_1h9nq_15", Dg = "_name_1h9nq_26", jg = "_consequence_1h9nq_32", Hg = "_reason_1h9nq_38", Fg = "_value_1h9nq_44", Wg = "_webRow_1h9nq_60", zg = "_webSetting_1h9nq_71", Gg = "_webName_1h9nq_79", Ug = "_webConsequence_1h9nq_87", Kg = "_webControl_1h9nq_93", Vg = "_webState_1h9nq_106", Yg = "_webChip_1h9nq_111", L = {
  row: Bg,
  headCell: Pg,
  cell: Og,
  name: Dg,
  consequence: jg,
  reason: Hg,
  value: Fg,
  webRow: Wg,
  webSetting: zg,
  webName: Gg,
  webConsequence: Ug,
  webControl: Kg,
  webState: Vg,
  webChip: Yg
}, mt = 104, wt = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Xg({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Oe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(xn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: L.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function Jg({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = wt[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: L.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: L.headCell, children: [
      /* @__PURE__ */ n("span", { className: L.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: L.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: L.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(Xg, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: L.cell, style: { width: mt }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function _t(e, a) {
  return String(e ?? a);
}
function Qg(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Zg(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? _t(e.value, "—");
}
function eN({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: L.webControl, children: [
    /* @__PURE__ */ n(Oe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: L.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function aN(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(eN, { ...e });
  const l = Qg(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: L.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(xn, { options: l, value: _t(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${L.webControl} ${L.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: Zg(a) });
}
function nN({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = $(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${L.row} ${L.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: L.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${L.name} ${L.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${L.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: L.webControl, children: i(s) }) : /* @__PURE__ */ n(aN, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${L.webChip} ward-policy-chip`, style: { width: mt }, children: /* @__PURE__ */ n(m, { ...wt[t], size: "tag" }) })
  ] });
}
function lC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(nN, { ...e }) : /* @__PURE__ */ n(Jg, { ...e });
}
const tN = "_label_1o9za_7", rN = "_name_1o9za_15", lN = "_column_1o9za_24", oN = "_webFrame_1o9za_57", iN = "_webHead_1o9za_62", sN = "_webHeadLabel_1o9za_74", cN = "_webLabel_1o9za_112", dN = "_webColumns_1o9za_119", uN = "_webGroup_1o9za_125", hN = "_webPeople_1o9za_126", mN = "_webVia_1o9za_127", wN = "_webMeta_1o9za_156", F = {
  label: tN,
  name: rN,
  column: lN,
  webFrame: oN,
  webHead: iN,
  webHeadLabel: sN,
  webLabel: cN,
  webColumns: dN,
  webGroup: uN,
  webPeople: hN,
  webVia: mN,
  webMeta: wN
}, _N = {
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
function fN(e) {
  if (!e.matrixRole) return;
  const a = _N[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function vN({ node: e }) {
  const a = fN(e);
  return /* @__PURE__ */ o("span", { className: F.label, children: [
    /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
    /* @__PURE__ */ n(bN, { role: a, node: e }),
    /* @__PURE__ */ n(Aa, { column: La[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Aa, { column: La[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Aa, { column: La[2], children: e.requestedVia ?? "" })
  ] });
}
function bN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function pN({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ n(vN, { node: t }),
      children: s
    }
  );
}
function xa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function gN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(xa, { className: `${F.webMeta} ${F.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(xa, { className: `${F.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(xa, { className: `${F.webMeta} ${F.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function NN() {
  return /* @__PURE__ */ o("div", { className: F.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: F.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: F.webColumns, children: [
      /* @__PURE__ */ n("span", { className: F.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: F.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: F.webVia, children: "Requested via" })
    ] })
  ] });
}
function yN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function kN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function $N({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: F.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(NN, {}),
    /* @__PURE__ */ n(vc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Bn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(yN, { row: t }),
        detail: /* @__PURE__ */ n(gN, { row: t }),
        expanded: kN(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function oC(e) {
  return "presentation" in e ? /* @__PURE__ */ n($N, { ...e }) : /* @__PURE__ */ n(pN, { ...e });
}
const CN = "_runbook_b9agc_2", SN = "_list_b9agc_7", RN = "_step_b9agc_15", TN = "_numeral_b9agc_21", EN = "_body_b9agc_28", LN = "_head_b9agc_34", AN = "_title_b9agc_40", xN = "_detail_b9agc_45", IN = "_actions_b9agc_50", MN = "_webList_b9agc_56", qN = "_webStep_b9agc_60", BN = "_webBody_b9agc_66", PN = "_webTitle_b9agc_74", ON = "_webDetail_b9agc_78", T = {
  runbook: CN,
  list: SN,
  step: RN,
  numeral: TN,
  body: EN,
  head: LN,
  title: AN,
  detail: xN,
  actions: IN,
  webList: MN,
  webStep: qN,
  webBody: BN,
  webTitle: PN,
  webDetail: ON
}, ft = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function vt(e) {
  return String(e + 1).padStart(2, "0");
}
function DN({ step: e, index: a, connection: t }) {
  const r = ft[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: T.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: T.numeral, children: vt(a) }),
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
function jN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: T.list, children: e.map((r, l) => /* @__PURE__ */ n(DN, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: T.actions, children: a })
  ] });
}
function HN({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${T.step} ${T.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${T.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: vt(a) }),
    /* @__PURE__ */ o("span", { className: `${T.body} ${T.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${T.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${T.title} ${T.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...ft[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${T.detail} ${T.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function FN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${T.list} ${T.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(HN, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${T.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function iC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(FN, { ...e }) : /* @__PURE__ */ n(jN, { ...e });
}
const WN = "_list_1gu6a_2", zN = "_check_1gu6a_10", GN = "_body_1gu6a_16", UN = "_text_1gu6a_23", KN = "_pending_1gu6a_32", VN = "_measured_1gu6a_37", ze = {
  list: WN,
  check: zN,
  body: GN,
  text: UN,
  pending: KN,
  measured: VN
};
function YN(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function XN({ check: e }) {
  const a = YN(e.passed);
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
function sC({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(XN, { check: a }, a.text)) });
}
const JN = "_root_khinh_2", QN = "_list_khinh_10", ZN = "_line_khinh_21", ey = "_at_khinh_48", ay = "_text_khinh_52", ny = "_foot_khinh_56", ty = "_idle_khinh_68", ry = "_caret_khinh_76", ly = "_jump_khinh_83", me = {
  root: JN,
  list: QN,
  line: ZN,
  at: ey,
  text: ay,
  foot: ny,
  idle: ty,
  caret: ry,
  jump: ly
}, oy = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function en(e) {
  return Number.isNaN(Date.parse(e)) ? "" : oy.format(new Date(e));
}
const iy = { warn: "warning", ok: "ok" };
function sy({ kind: e }) {
  const a = iy[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function cy({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${en(e)}` });
}
function dy({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${en(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: me.idle, children: i }),
    /* @__PURE__ */ n(cy, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const uy = 8;
function hy(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > uy;
}
function my({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
function cC({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = N(null), [i, s] = p(0), [c, d] = p(!1), [u, h] = p(!1), f = e.at(-1);
  x(() => {
    s(e.length);
  }, [e.length]), Ha(() => {
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
    /* @__PURE__ */ n("ol", { className: me.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (g) => h(hy(g.currentTarget)), children: e.map((g, I) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${g.kind}`, "data-kind": g.kind, "data-revealed": I < i, children: [
      /* @__PURE__ */ n("span", { className: me.at, children: en(g.at) }),
      /* @__PURE__ */ n(sy, { kind: g.kind }),
      /* @__PURE__ */ n("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: g.text })
    ] }, `${g.at}-${I}`)) }),
    /* @__PURE__ */ o(dy, { connection: a, idleSince: t, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ n(my, { shown: u, onJump: b })
    ] })
  ] });
}
const wy = "_row_11jhe_2", _y = "_head_11jhe_14", fy = "_author_11jhe_20", vy = "_eta_11jhe_25", by = "_edited_11jhe_26", py = "_body_11jhe_32", gy = "_reason_11jhe_37", Ny = "_actions_11jhe_42", be = {
  row: wy,
  head: _y,
  author: fy,
  eta: vy,
  edited: by,
  body: py,
  reason: gy,
  actions: Ny
}, yy = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function ky(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function $y({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function Cy({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: be.reason, id: a, children: e })
  ] });
}
function Sy(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Ry(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n($y, { ...e }) : /* @__PURE__ */ n(Cy, { reason: e.unavailable, reasonId: e.unavailableId });
}
function dC(e) {
  const { comment: a } = e;
  Sy(e);
  const t = $(), r = `${t}-unavailable`, l = yy[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${be.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: be.head, children: [
      /* @__PURE__ */ n("span", { className: be.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: be.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: be.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: be.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: be.reason, id: t, children: ky(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: be.actions, children: /* @__PURE__ */ n(Ry, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Ty = "_root_c46wj_2", Ey = "_attach_c46wj_11", Ly = "_actions_c46wj_17", Ay = "_reply_c46wj_23", xy = "_replyRow_c46wj_28", Iy = "_sendsAs_c46wj_42", Ue = {
  root: Ty,
  attach: Ey,
  actions: Ly,
  reply: Ay,
  replyRow: xy,
  sendsAs: Iy
};
function My({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = p(""), i = $();
  return /* @__PURE__ */ o("div", { className: Ue.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ue.replyRow, children: [
      /* @__PURE__ */ n(A, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(_, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ue.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function uC(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(My, { ...e }) : /* @__PURE__ */ n(qy, { ...e });
}
function qy({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
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
const By = "_list_1ih9e_2", Py = "_item_1ih9e_6", Oy = "_body_1ih9e_22", Dy = "_text_1ih9e_28", jy = "_evidence_1ih9e_37", Hy = "_consequence_1ih9e_49", Fy = "_note_1ih9e_54", Pe = {
  list: By,
  item: Py,
  body: Oy,
  text: Dy,
  evidence: jy,
  consequence: Hy,
  note: Fy
};
function Wy({ criterion: e }) {
  return /* @__PURE__ */ n(Le, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function kn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function zy(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function Gy({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Pe.body, children: [
    /* @__PURE__ */ n("span", { className: Pe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(kn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Pe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n(kn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Pe.consequence, children: zy(e.why) })
    ] })
  ] });
}
function Uy({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Pe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(Wy, { criterion: e }),
    /* @__PURE__ */ n(Gy, { criterion: e })
  ] });
}
function hC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(Uy, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Pe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const Ky = "_list_dwhoz_2", Vy = "_rung_dwhoz_6", Yy = "_name_dwhoz_18", Xy = "_actor_dwhoz_32", ia = {
  list: Ky,
  rung: Vy,
  name: Yy,
  actor: Xy
}, Jy = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function Qy({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = Jy[e.state];
  return /* @__PURE__ */ o("li", { className: ia.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ia.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ia.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function mC({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ia.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(Qy, { rung: a }, a.name)) });
}
const Zy = "_sheet_1fqco_2", ek = "_title_1fqco_9", ak = "_stage_1fqco_15", nk = "_effects_1fqco_20", tk = "_effect_1fqco_20", rk = "_numeral_1fqco_31", lk = "_effectText_1fqco_38", ok = "_refusals_1fqco_43", ik = "_reasons_1fqco_52", sk = "_reason_1fqco_52", ck = "_actions_1fqco_62", ue = {
  sheet: Zy,
  title: ek,
  stage: ak,
  effects: nk,
  effect: tk,
  numeral: rk,
  effectText: lk,
  refusals: ok,
  reasons: ik,
  reason: sk,
  actions: ck
};
function dk({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function wC({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      ts,
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
      /* @__PURE__ */ n(dk, { refused: f, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const uk = "_list_1hvqu_2", hk = "_path_1hvqu_7", mk = "_head_1hvqu_21", wk = "_label_1hvqu_28", _k = "_consequence_1hvqu_35", fk = "_ask_1hvqu_36", Ge = {
  list: uk,
  path: hk,
  head: mk,
  label: wk,
  consequence: _k,
  ask: fk
}, Da = {
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
function vk({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(_, { variant: Cn(a), size: "sm", onClick: () => t(e.kind), children: Da[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: Cn(a), size: "sm", disabled: !0, describedBy: r, children: Da[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ge.ask, id: r, children: e.askInstead })
  ] });
}
function bk({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ge.path, "data-allowed": e.allowed, "data-role": $n(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ge.head, children: [
      /* @__PURE__ */ n("span", { className: Ge.label, children: e.title ?? Da[e.kind] }),
      /* @__PURE__ */ n(m, { role: $n(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ge.consequence, children: e.consequence }),
    /* @__PURE__ */ n(vk, { path: e, primary: a, onChoose: t })
  ] });
}
function _C({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ge.list, children: e.map((t, r) => /* @__PURE__ */ n(bk, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const pk = "_list_1nyt1_2", gk = "_item_1nyt1_6", Nk = "_node_1nyt1_18", yk = "_body_1nyt1_24", kk = "_head_1nyt1_30", $k = "_stage_1nyt1_36", Ck = "_version_1nyt1_41", Sk = "_sentence_1nyt1_49", Rk = "_meta_1nyt1_54", ge = {
  list: pk,
  item: gk,
  node: Nk,
  body: yk,
  head: kk,
  stage: $k,
  version: Ck,
  sentence: Sk,
  meta: Rk
}, Tk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Ek({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function Lk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(Le, { size: 9, kind: Tk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Ek, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${ce(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function fC({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Lk, { entry: a }, a.stage + String(t))) });
}
const Ak = "_thread_1kn6s_3", xk = "_turn_1kn6s_8", Ik = "_who_1kn6s_27", Mk = "_body_1kn6s_32", sa = {
  thread: Ak,
  turn: xk,
  who: Ik,
  body: Mk
}, bt = Ve(!1);
function vC({ children: e, density: a }) {
  return /* @__PURE__ */ n(bt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${sa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function bC({ turn: e }) {
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
const qk = "_list_1rt9c_3", Bk = "_row_1rt9c_7", Pk = "_label_1rt9c_20", Ok = "_n_1rt9c_26", Dk = "_cause_1rt9c_33", Qe = {
  list: qk,
  row: Bk,
  label: Pk,
  n: Ok,
  cause: Dk
};
function jk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Hk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Fk({ row: e, formatNumber: a }) {
  return jk(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Le, { size: 8, ...Hk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Wk, { cause: e.cause })
  ] });
}
function Wk({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function pC({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(Fk, { row: t, formatNumber: a }, t.label)) });
}
const zk = "_root_1jxwp_2", Gk = {
  root: zk
};
function gC({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: Gk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ca, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const Uk = "_row_dhbre_3", Kk = "_key_dhbre_13", Vk = "_stack_dhbre_24", Yk = "_value_dhbre_32", Xk = "_evidence_dhbre_39", Jk = "_mark_dhbre_47", We = {
  row: Uk,
  key: Kk,
  stack: Vk,
  value: Yk,
  evidence: Xk,
  mark: Jk
};
function Qk({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ka, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function NC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${We.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${We.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${We.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${We.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${We.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${We.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(Qk, { state: e.state }) })
  ] });
}
const Zk = "_cell_1monp_2", e1 = {
  cell: Zk
}, a1 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function n1(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function t1(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function r1(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: n1(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function l1(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function yC({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  t1(e, t);
  const r = l1(e);
  return /* @__PURE__ */ n(
    vs,
    {
      label: "Rejection routing",
      columns: a1,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: e1.cell, "data-norerun": l.noRerun ? !0 : void 0, children: r1(l, i) }),
      empty: a ?? /* @__PURE__ */ n(nd, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const o1 = "_row_ute8v_2", i1 = "_title_ute8v_11", s1 = "_turns_ute8v_20", c1 = "_waiting_ute8v_21", d1 = "_resolved_ute8v_22", u1 = "_activity_ute8v_23", h1 = "_cost_ute8v_29", m1 = "_link_ute8v_30", w1 = "_tableRow_ute8v_47", _1 = "_tableTitle_ute8v_59", f1 = "_tableResolved_ute8v_64", v1 = "_tableLink_ute8v_68", b1 = "_tableMeta_ute8v_83", p1 = "_tableCost_ute8v_90", g1 = "_tableActivity_ute8v_91", N1 = "_tableState_ute8v_101", y1 = "_tableRecord_ute8v_112", O = {
  row: o1,
  title: i1,
  turns: s1,
  waiting: c1,
  resolved: d1,
  activity: u1,
  cost: h1,
  link: m1,
  tableRow: w1,
  tableTitle: _1,
  tableResolved: f1,
  tableLink: v1,
  tableMeta: b1,
  tableCost: p1,
  tableActivity: g1,
  tableState: N1,
  tableRecord: y1
}, pt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function k1(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function $1(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function C1(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const S1 = { duplicate: "CLOSED · DUPLICATE" };
function R1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: O.tableMeta, children: `waiting on ${e}` });
}
function T1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: O.tableCost, children: e === void 0 ? null : re(e) });
}
function E1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${O.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function L1({ session: e, href: a }) {
  const t = pt[e.state];
  return /* @__PURE__ */ o("tr", { className: O.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: O.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${O.tableLink} ward-target`, href: W(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: O.tableMeta, children: $1(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: O.tableResolved, children: [
      C1(e.resolved),
      /* @__PURE__ */ n(R1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(T1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: O.tableActivity, children: k1(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: O.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: S1[e.state] ?? t.label }),
      /* @__PURE__ */ n(E1, { link: e.link })
    ] }) })
  ] });
}
function A1({ session: e }) {
  const a = pt[e.state];
  return /* @__PURE__ */ o("div", { className: O.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: O.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: O.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: O.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: O.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: O.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ n("span", { className: O.activity, children: ce(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: O.link, href: W(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function kC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(L1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(A1, { session: e.session });
}
const x1 = "_block_1yy2v_3", I1 = "_list_1yy2v_9", M1 = "_line_1yy2v_14", ja = {
  block: x1,
  list: I1,
  line: M1
}, q1 = { warn: "warning", ok: "ok" };
function B1({ kind: e }) {
  const a = q1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function P1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${ja.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(B1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function $C({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${ja.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: ja.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(P1, { line: t }, `${r}-${t.text}`)) }) });
}
const O1 = "_band_tt7hp_1", D1 = "_head_tt7hp_8", j1 = "_cell_tt7hp_19", H1 = "_index_tt7hp_35", F1 = "_title_tt7hp_42", W1 = "_note_tt7hp_48", z1 = "_cellTitle_tt7hp_53", G1 = "_cellBody_tt7hp_58", U1 = "_tag_tt7hp_64", ve = {
  band: O1,
  head: D1,
  cell: j1,
  index: H1,
  title: F1,
  note: W1,
  cellTitle: z1,
  cellBody: G1,
  tag: U1
}, Sn = 4;
function CC({ index: e, title: a, note: t, cells: r }) {
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
  m$ as ActionStack,
  cC as ActivityConsole,
  fm as AgentCard,
  l$ as AppShell,
  V$ as AppearanceStrip,
  CC as Band,
  d$ as BarChart,
  Pd as BoardColumn,
  T$ as BoardFootnote,
  E$ as BoardHeader,
  g$ as BoardScroller,
  _ as Btn,
  a$ as CHIP_ROLES,
  ot as CREDENTIAL_COLUMNS,
  c$ as Callout,
  Y$ as CapabilityRow,
  bC as ChatMessage,
  Ln as Checkbox,
  m as Chip,
  dC as ClarificationRow,
  D$ as ClauseRuleRow,
  O$ as ClauseRules,
  Fn as ColourLadder,
  X$ as ComponentRow,
  uC as Composer,
  A$ as ConfigRow,
  L$ as ConfigRowHead,
  Va as ConnectionMark,
  vC as Conversation,
  ts as CostMeter,
  Q$ as CredentialRow,
  J$ as CredentialRowHead,
  hC as CriteriaList,
  ml as Crumb,
  pC as DeliveryHealth,
  k$ as DeniedState,
  j$ as DryRunRail,
  nd as EmptyState,
  Z$ as EnvCard,
  A as Field,
  y$ as FilteredEmpty,
  b$ as FormStack,
  Ca as GateChecklist,
  mC as GateLadder,
  vs as Grid,
  F$ as HandoffRuleRow,
  H$ as HandoffRules,
  x$ as ItemDrawer,
  eC as KeyPanel,
  Pt as LIVE_EVENT_TYPES,
  Oh as LegacyBoardColumn,
  M$ as LegacyBoardHeader,
  q$ as LegacyConfigRow,
  P$ as LegacyItemDrawer,
  Ah as LegacyOverCapNote,
  B$ as LegacyPreviewRail,
  Dn as LegacyWorkCard,
  ke as LiveIndicator,
  $$ as LoadFailed,
  R$ as Loading,
  ht as MCP_SERVER_COLUMNS,
  Ka as Mark,
  nC as MarkUpload,
  Le as Marker,
  rC as McpServerRow,
  tC as McpServerRowHead,
  W$ as NewStreamModal,
  ld as OverCapNote,
  ea as Overlay,
  Um as PARTIAL_STEP_REASON,
  mt as POLICY_CHIP_WIDTH,
  _$ as PageFrame,
  s$ as PageHeader,
  u$ as PlainList,
  lC as PolicyRow,
  I$ as PreviewRail,
  La as ROLE_MATRIX_COLUMNS,
  et as RULE_ACTIONS,
  Mn as Radio,
  gC as ReadyChecklist,
  v$ as RecordSection,
  wC as RequeueSheet,
  _C as ResolveBlock,
  NC as ResolvedFieldRow,
  oC as RoleMatrixRow,
  yC as RoutingTable,
  z$ as RuleRow,
  iC as RunbookSteps,
  qt as STREAM_STEPS,
  p$ as SectionBand,
  hn as SectionHeader,
  xn as SegmentedControl,
  kC as SessionRow,
  i$ as Sidebar,
  G$ as StageColumn,
  N$ as StageGrid,
  fC as StageHistory,
  Y_ as StageListEditor,
  C$ as StaleStrip,
  ya as StatStrip,
  U$ as StreamRow,
  f$ as SubjectRail,
  Oe as Switch,
  h$ as TableHead,
  o$ as Tabs,
  K$ as ToolRow,
  w$ as TopBar,
  vc as Tree,
  Bn as TreeRow,
  $C as TypedInputBlock,
  Ir as UNSAFE_HREF,
  sC as ValidationList,
  X1 as VisibilityProvider,
  J1 as Visible,
  e$ as WARD_VERSION,
  $a as WorkCard,
  S$ as WriteUnavailableStrip,
  k1 as agoSince,
  Rt as clock,
  mf as colourStatus,
  ae as count,
  se as duration,
  Fa as elapsed,
  Z1 as eventSourceTransport,
  ba as isStreamStep,
  pa as isValidatedStreamStep,
  Km as ladderValidation,
  Tg as mcpConnectionChip,
  Sg as mcpToolName,
  re as money,
  we as ms,
  Pn as ordered,
  Rn as ratio,
  ap as restartLabel,
  W as safeHref,
  ce as stamp,
  En as stream,
  t$ as streamChip,
  Na as streamChipProps,
  Ee as streamColour,
  Dt as streamHex,
  n$ as streamVars,
  la as useBorderFlash,
  xt as useFocusTrap,
  r$ as useLiveFeed,
  Q1 as useReturnFocus,
  va as useRovingTabindex,
  Wa as useTicker,
  Tt as useVisible,
  G as v,
  aC as validateMark,
  ga as validatedStep,
  Bt as validatedStreamSteps
};
