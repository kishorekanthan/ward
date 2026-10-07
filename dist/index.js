import { jsx as t, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as Lt, useContext as je, createContext as He, useCallback as X, useEffect as I, useState as p, useRef as g, useLayoutEffect as Wa, useId as $, isValidElement as xn, Children as An, Fragment as In } from "react";
import { createPortal as Mn } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${a % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const rt = (e) => String(e).padStart(2, "0");
function za(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const n = Math.floor(a / 60);
  return n < 60 ? `${n}m ${rt(a % 60)}s` : `${Math.floor(n / 60)}h ${rt(n % 60)}m`;
}
const qn = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ce(e) {
  const a = qn.formatToParts(new Date(e)), n = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${n("day")} ${n("month")} ${n("hour")}:${n("minute")}`;
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
function Et(e, a) {
  return `${e} / ${a}`;
}
const Pn = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Bn(e) {
  return Pn.format(new Date(e));
}
const xt = He(/* @__PURE__ */ new Set());
function v$({ hidden: e, children: a }) {
  const n = Lt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(xt.Provider, { value: n, children: a });
}
function On(e) {
  return !je(xt).has(e);
}
function b$({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(S, { children: On(e) ? a : n });
}
const Dn = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function jn(e, a, n, r) {
  return e.shiftKey ? document.activeElement === n ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? n : void 0;
}
function Hn(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = jn(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Fn(e) {
  return { onKeyDown: X(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Dn));
      Hn(n, e.current, r);
    },
    [e]
  ) };
}
function p$(e, a = !0) {
  I(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const lt = { ArrowUp: -1, ArrowDown: 1 }, ot = { ArrowLeft: -1, ArrowRight: 1 }, Wn = (e, a, n) => Math.min(n, Math.max(a, e));
function zn(e, a) {
  if (a !== "horizontal" && e in lt) return lt[e];
  if (a !== "vertical" && e in ot) return ot[e];
}
function Na({ orientation: e = "both" } = {}) {
  const [a, n] = p(0), r = g(/* @__PURE__ */ new Map()), l = g(!1);
  Wa(() => {
    var v;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const h = d[0], f = l.current;
    l.current = !1, n(h), f && ((v = r.current.get(h)) == null || v.focus());
  });
  const i = X((d) => n(d), []), s = X((d) => {
    var h;
    n(d), (h = r.current.get(d)) == null || h.focus();
  }, []), c = X(
    (d) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const f = Math.max(0, h.indexOf(a)), v = zn(d.key, e);
      v !== void 0 ? (d.preventDefault(), s(h[Wn(f + v, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), s(h[0])) : d.key === "End" && (d.preventDefault(), s(h[h.length - 1]));
    },
    [a, s, e]
  ), u = X(
    (d) => ({
      tabIndex: d === a ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(d, h) : (r.current.delete(d), d === a && (l.current = !0));
      },
      onFocus: () => n(d),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: c }, itemProps: u, setActive: i };
}
const g$ = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, N$ = "0.2.0", y$ = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Gn = [1, 2, 3, 4, 5, 6], At = [1, 2, 3], Un = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
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
function It(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function ya(e) {
  return Gn.includes(e);
}
function ka(e) {
  return At.includes(e);
}
function k$(e) {
  if (!ya(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function $$(e) {
  if (!ya(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Kn = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Vn(e) {
  if (!ya(e)) throw new Error("unvalidated stream step");
  return Kn[e];
}
function it(e) {
  return typeof e != "string" ? null : Un.includes(e) ? e : null;
}
function Yn(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Xn(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Jn(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Qn(e, a, n) {
  const r = Yn(e);
  if (r === null) return null;
  const l = it(n) ?? it(r.type);
  return l === null ? null : { ...r, type: l, id: Xn(r, a), at: Jn(r) };
}
function Zn(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function er(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function C$(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = g(/* @__PURE__ */ new Map()), c = g(0), u = g(""), d = g(0), h = g(null), f = g(0), v = g(0), N = g(!1), E = g("reconnecting"), q = X((C) => {
    E.current = C, r(C);
  }, []), oe = X(() => {
    c.current = Date.now();
  }, []), Ce = X((C) => {
    for (const [z, ve] of s.current)
      (ve === "*" || C.itemKey === ve) && z(C);
  }, []), te = X(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: (C, z, ve) => {
        const Ae = Qn(C, z, ve);
        Ae !== null && (Ae.id && (u.current = Ae.id), oe(), N.current = !1, q("live"), i(Ae.at), Ce(Ae));
      },
      onOpen: () => {
        d.current = 0, N.current = !1, oe(), q("live");
      },
      onError: () => {
        var z;
        (z = h.current) == null || z.close(), h.current = null, N.current = !0, E.current !== "stale" && q("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** d.current, we.reconnectMax);
        d.current += 1, f.current = window.setTimeout(te, C);
      }
    });
  }, [Ce, q, oe, a, e]), Fe = X((C) => {
    N.current = !0, C.close(), h.current = null, f.current = window.setTimeout(te, we.reconnectBase);
  }, [te]), We = X((C, z) => (s.current.set(z, C), () => {
    s.current.delete(z);
  }), []);
  return I(() => (te(), v.current = window.setInterval(() => {
    const C = Date.now() - c.current, z = Zn(C, E.current);
    z && q(z);
    const ve = h.current;
    er(C, N.current, ve) && Fe(ve);
  }, we.tick), () => {
    var C;
    window.clearInterval(v.current), window.clearTimeout(f.current), N.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [te, Fe, q]), { connection: n, lastEventAt: l, subscribe: We };
}
function Ga(e, a) {
  const n = new Date(e).getTime(), [r, l] = p(() => Date.now());
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
  }, [a, n]), Math.max(0, r - n);
}
function ar() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function st(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function sa(e, a) {
  const n = g(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (ar() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), s.style.setProperty("--flash", `var(--ward-color-${i})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => st(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => st(s), we.flash)));
  }, [a, e]);
  return I(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const tr = "_root_1otpc_2", nr = {
  root: tr
};
function rr(e, a, n, r, l) {
  const i = [za(a)];
  return e || i.push(`as of ${Bn(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function $e({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = Ga(e, l), s = (a == null ? void 0 : a.at) ?? e, c = rr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${nr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ce(e)
    ] })
  ] });
}
const lr = "_app_40mlx_1", or = "_side_40mlx_18", ir = "_main_40mlx_26", sr = "_rail_40mlx_33", cr = "_page_40mlx_40", dr = "_root_40mlx_91", ur = "_topbar_40mlx_98", hr = "_mark_40mlx_109", mr = "_brand_40mlx_116", wr = "_tagline_40mlx_122", _r = "_identity_40mlx_128", fr = "_tools_40mlx_129", vr = "_metadata_40mlx_138", br = "_actor_40mlx_153", pr = "_detail_40mlx_154", gr = "_nav_40mlx_159", Nr = "_content_40mlx_208", yr = "_toolsPanel_40mlx_224", kr = "_skip_40mlx_250", M = {
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
  detail: pr,
  nav: gr,
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
function Ar(e, a, n, r) {
  const l = a === "sm" ? [ra.sm, "ward-btn--sm"] : [], i = n ? [ra.disabled] : [];
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
function Br(e, a, n) {
  return Pr(e.describedBy, a && n);
}
function Or({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Dr(e) {
  return e.children ?? e.label;
}
function _(e) {
  Mr(e);
  const a = e.variant ?? "secondary", n = e.size ?? "md", r = e.disabled ?? !1, l = qr(e), i = $();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Ar(a, n, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": n,
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
    /* @__PURE__ */ t(Or, { id: i, reason: l })
  ] });
}
const jr = /^([a-z][a-z0-9+.-]*):/i, Hr = /* @__PURE__ */ new Set(["http", "https"]), Fr = "#";
function Wr(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = jr.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = Wr(e);
  return a === void 0 || Hr.has(a) ? e : Fr;
}
function zr(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Mt(e) {
  const a = zr(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function aa(e, a, n) {
  I(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const s = Mt(r);
      n == null || n(s.start || s.end);
    };
    r.addEventListener("scroll", l, { passive: !0 });
    const i = typeof ResizeObserver > "u" ? null : new ResizeObserver(l);
    for (const s of [r, ...r.children]) i == null || i.observe(s);
    return l(), () => {
      r.removeEventListener("scroll", l), i == null || i.disconnect();
    };
  }, [e, a, n]);
}
function Gr(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function Ua(e, a, n) {
  Wa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = Gr(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Mt(r);
  }, [e, a, n]);
}
function Ka(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return I(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => n(s.matches);
    return r.addEventListener("change", l), n(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function Ur({ sidebar: e, header: a, children: n, rail: r }) {
  const l = r != null;
  return /* @__PURE__ */ o("div", { className: M.app, "data-rail": l ? "true" : "false", children: [
    /* @__PURE__ */ t("div", { className: M.side, children: e }),
    /* @__PURE__ */ o("main", { className: M.main, children: [
      a,
      /* @__PURE__ */ t("div", { className: M.page, children: n })
    ] }),
    l && /* @__PURE__ */ t("div", { className: M.rail, children: r })
  ] });
}
function Kr({ destinations: e, active: a }) {
  const n = g(null);
  return aa(n, e.length), Ua(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t("nav", { ref: n, className: M.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ t("a", { href: W(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Pa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function Vr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ t(Pa, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Pa, { value: a, className: M.detail })
  ] });
}
function Yr() {
  const e = Ka("(max-width: 767.98px)"), a = $(), n = g(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Xr({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: M.tools, children: /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: M.tools, children: e });
}
function Jr({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function Qr(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ t("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Pa, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ t(Kr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: M.identity, children: /* @__PURE__ */ t(Vr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(Xr, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Zr(e) {
  const a = $(), n = Yr();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(Qr, { ...e, menu: n }),
    /* @__PURE__ */ t(Jr, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: M.content, children: e.children })
  ] });
}
function el(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function S$(e) {
  return el(e) ? /* @__PURE__ */ t(Ur, { ...e }) : /* @__PURE__ */ t(Zr, { ...e });
}
function Va(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const al = "_root_o4yib_2", tl = "_row_o4yib_8", nl = "_box_o4yib_14", rl = "_label_o4yib_21", ll = "_lockedNote_o4yib_26", ol = "_consequence_o4yib_34", il = "_sample_o4yib_69", qe = {
  root: al,
  row: tl,
  box: nl,
  label: rl,
  lockedNote: ll,
  consequence: ol,
  sample: il
};
function sl(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function cl({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${qe.consequence} ward-check-consequence`, children: a }) : null;
}
function dl({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${qe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function ul({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: qe.sample, "aria-hidden": "true", children: e }) : null;
}
function qt(e) {
  const a = $(), n = e.consequence ? `${a}-note` : void 0, r = sl(e);
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: qe.row, children: [
      /* @__PURE__ */ t(
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
          "aria-describedby": Va(n, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: qe.label, children: [
        e.label,
        /* @__PURE__ */ t(dl, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(ul, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(cl, { id: n, text: e.consequence })
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
  const n = wl[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function fl(e) {
  if (!e || !ka(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = It(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${ml.chip} ward-chip ward-chip--${e}`, style: _l(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
function ta(e) {
  return typeof e == "number" && ka(e) ? e : null;
}
function fe(e, a) {
  const n = ta(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function $a(e, a) {
  const n = ta(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const vl = "_nav_j90m2_2", bl = "_list_j90m2_8", pl = "_item_j90m2_15", gl = "_link_j90m2_30", Nl = "_sep_j90m2_40", yl = "_current_j90m2_44", kl = "_chips_j90m2_48", Ie = {
  nav: vl,
  list: bl,
  item: pl,
  link: gl,
  sep: Nl,
  current: yl,
  chips: kl
};
function $l({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ie.nav, children: [
    /* @__PURE__ */ t("ol", { className: Ie.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: Ie.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Ie.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Ie.link} ward-target`, href: W(n.href), children: n.label }) : n.label : /* @__PURE__ */ t("span", { className: Ie.current, "aria-current": "page", children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Ie.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(m, { ...n }, n.label)) }) : null
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
function Il({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? Al : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function Ml({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("select", { className: n, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ t("option", { value: r.value, children: r.label }, r.value)) });
}
function ql({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const Pl = { input: Il, select: Ml, textarea: ql };
function Bl(e, a, n) {
  const r = Pl[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function Ol(e, a, n) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Va(r ? n : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function Dl(e) {
  const a = e.mono ? [Ee.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Ee.area] : [];
  return [Ee.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function jl(e) {
  return e ? `${Ee.label} ${Ee.labelHidden} ward-field-label` : `${Ee.label} ward-field-label`;
}
function A(e) {
  const a = $(), n = `${a}-msg`, r = Ol(e, a, n), l = Dl(e);
  return /* @__PURE__ */ o("div", { className: `${Ee.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { className: jl(e.labelHidden), htmlFor: a, children: e.label }),
    Bl(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Ee.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Hl = "_strip_kancu_2", Fl = "_tab_kancu_32", Wl = "_count_kancu_75", Ze = {
  strip: Hl,
  tab: Fl,
  count: Wl
}, ha = 7;
function zl(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
function Pt(e) {
  return `${Ze.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function R$({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ha) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ha} — the set is fixed`);
  const i = Na({ orientation: "horizontal" }), s = zl(e, a);
  I(() => i.setActive(s), [i.setActive, s]);
  const c = g(null);
  return aa(c, e.length), Ua(c, s, '[role="tab"]'), /* @__PURE__ */ t(
    "div",
    {
      ref: c,
      className: Pt(l),
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
          onClick: () => n(u.id),
          ...i.itemProps(d),
          children: [
            u.label,
            u.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
              " ",
              /* @__PURE__ */ t("span", { className: Ze.count, children: `· ${u.count}` })
            ] })
          ]
        },
        u.id
      ))
    }
  );
}
function T$({ links: e, active: a, label: n, level: r = 1 }) {
  if (e.length > ha) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ha} — the set is fixed`);
  const l = g(null);
  return aa(l, e.length), Ua(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t("nav", { ref: l, className: Pt(r), "aria-label": n, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${Ze.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: Ze.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Gl = "_root_t3lk3_2", Ul = "_segment_t3lk3_7", ct = {
  root: Gl,
  segment: Ul
};
function Bt({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Na({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((u) => u.value === a));
  return I(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${ct.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((u, d) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: ct.segment,
      "aria-checked": u.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => n(u.value),
      ...s.itemProps(d),
      children: u.label
    },
    u.value
  )) });
}
const Kl = "_sidebar_1g24y_3", Vl = "_brand_1g24y_9", Yl = "_mark_1g24y_17", Xl = "_word_1g24y_24", Jl = "_nav_1g24y_30", Ql = "_navItem_1g24y_38", Zl = "_group_1g24y_50", eo = "_groupName_1g24y_57", ao = "_agents_1g24y_70", to = "_agent_1g24y_70", no = "_agentTop_1g24y_88", ro = "_dot_1g24y_95", lo = "_agentName_1g24y_107", oo = "_agentMeta_1g24y_120", io = "_foot_1g24y_126", so = "_footName_1g24y_132", co = "_footLinks_1g24y_139", uo = "_footLink_1g24y_139", ho = "_root_1g24y_153", mo = "_linkBrand_1g24y_162", wo = "_label_1g24y_183", _o = "_note_1g24y_188", fo = "_footer_1g24y_202", R = {
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
  agent: to,
  agentTop: no,
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
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: R.agent,
      href: W(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: R.agentTop, children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: R.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": It(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ t("span", { className: R.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ t("span", { className: R.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function bo({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: R.foot, children: [
    /* @__PURE__ */ t("span", { className: R.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: R.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${R.footLink} ward-target`, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function po({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: R.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: R.brand, children: [
      /* @__PURE__ */ t("span", { className: R.mark }),
      /* @__PURE__ */ t("span", { className: R.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: R.nav, children: a.map((s) => /* @__PURE__ */ t("a", { className: R.navItem, href: W(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: R.group, children: [
      /* @__PURE__ */ o("span", { className: R.groupName, children: [
        n,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: R.new, href: W(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: R.agents, children: r.map((s) => /* @__PURE__ */ t(vo, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(bo, { shared: i })
  ] });
}
function go(e) {
  return e.destinations ?? e.items ?? [];
}
function No({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: R.linkBrand, children: e });
}
function yo({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: R.footer, children: e });
}
function ko({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: R.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: R.note, children: e.note })
  ] });
}
function $o(e) {
  return /* @__PURE__ */ o("aside", { className: `${R.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(No, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: go(e).map((a) => /* @__PURE__ */ t(ko, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(yo, { children: e.children })
  ] });
}
function Co(e) {
  return "agents" in e;
}
function L$(e) {
  return Co(e) ? /* @__PURE__ */ t(po, { ...e }) : /* @__PURE__ */ t($o, { ...e });
}
const So = "_mark_wlgi8_3", Ro = {
  mark: So
}, To = { met: "✓", unmet: "", failed: "✕" };
function Ya({ state: e, label: a }) {
  return /* @__PURE__ */ t(
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
function xe({ size: e, kind: a, label: n }) {
  const r = { "--marker": xo[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${Eo.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
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
function Xa({ connection: e, since: a, lastEventAt: n }) {
  const r = qo(a, n), l = Ga(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${la.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(xe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${la.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: la.noCase, children: za(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${la.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ce(r)
  ] });
}
const Po = "_root_eo7ep_2", Bo = "_context_eo7ep_12", Oo = "_row_eo7ep_1", Do = "_heading_eo7ep_25", jo = "_headingWrap_eo7ep_33", Ho = "_chips_eo7ep_38", Fo = "_title_eo7ep_45", Wo = "_consequence_eo7ep_54", zo = "_actionsWrap_eo7ep_59", Go = "_actions_eo7ep_59", Uo = "_action_eo7ep_59", Ko = "_overflowPanel_eo7ep_85", Vo = "_measureClip_eo7ep_96", Yo = "_measure_eo7ep_96", Z = {
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
function Xo({ title: e, consequence: a, consequenceHint: n }) {
  return /* @__PURE__ */ o("div", { className: Z.heading, children: [
    /* @__PURE__ */ t("h1", { className: Z.title, children: e }),
    a && /* @__PURE__ */ t("p", { className: Z.consequence, title: n, children: a })
  ] });
}
function Ba({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Z.action, "data-action": "", children: a }, n));
}
function dt({ disclosure: e }) {
  return /* @__PURE__ */ t(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Jo({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(dt, { disclosure: l }) : a ? [/* @__PURE__ */ t(dt, { disclosure: l }, "more"), /* @__PURE__ */ t(Ba, { actions: e }, "actions")] : /* @__PURE__ */ t(Ba, { actions: e });
}
function Qo(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Zo({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ba, { actions: e }) });
}
function ei(e, a) {
  const n = $(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function ai({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Z.context, children: [
    /* @__PURE__ */ t($l, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Z.chips, children: a.map((n) => /* @__PURE__ */ t(m, { ...n }, n.label)) }) : null
  ] });
}
function ti(...e) {
  return e.some((a) => a === null);
}
function ni(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function ri(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + ni(e);
}
function li(e, a, n, r, l) {
  if (l === 0 || ti(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], u = Math.max(0, e.clientWidth - ri(e, i));
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function oi(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function ii(e) {
  return xn(e) && (e.type === "a" || typeof e.props.href == "string");
}
function si(e, a) {
  return a.length === 0 && e.length === 1 && ii(e[0]);
}
function ci(e, a) {
  const n = g(null), r = g(null), l = g(null), i = g(null), [s, c] = p(!1);
  return I(() => {
    const u = n.current;
    if (!oi(u)) return;
    const d = () => c(li(u, r.current, l.current, i.current, e.length)), h = new ResizeObserver(d);
    return h.observe(u), i.current && h.observe(i.current), d(), () => h.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function di({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Z.measureClip, children: /* @__PURE__ */ o("div", { className: Z.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function ui({ connection: e }) {
  return e ? /* @__PURE__ */ t(Xa, { connection: e.connection, since: e.since }) : null;
}
function E$({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: u, density: d = "page" }) {
  const { rowRef: h, headingRef: f, actionsRef: v, measureRef: N, collapsed: E } = ci(i, si(i, s)), q = s.length > 0, { disclosure: oe, close: Ce } = ei(E || q, v), te = Qo(s, i, E, u);
  return /* @__PURE__ */ o("header", { className: Z.root, "data-density": d, children: [
    /* @__PURE__ */ t(ai, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Z.row, ref: h, children: [
      /* @__PURE__ */ t("div", { ref: f, className: Z.headingWrap, children: /* @__PURE__ */ t(Xo, { title: n, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ t(ui, { connection: c }),
        /* @__PURE__ */ t("div", { className: Z.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ t(Jo, { actions: i, hasMore: q, collapsed: E, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Zo, { actions: te, disclosure: oe, onEscape: Ce }),
    /* @__PURE__ */ t(di, { actions: i, hasMore: q, measureRef: N })
  ] });
}
const hi = "_scrim_c7sqj_2", mi = "_drawer_c7sqj_10", wi = "_sheet_c7sqj_14", _i = "_modal_c7sqj_18", fi = "_panel_c7sqj_23", vi = "_header_c7sqj_51", bi = "_title_c7sqj_59", pi = "_body_c7sqj_63", gi = "_close_c7sqj_90", ye = {
  scrim: hi,
  drawer: mi,
  sheet: wi,
  modal: _i,
  panel: fi,
  header: vi,
  title: bi,
  body: pi,
  close: gi
}, Ni = He(null), ma = [], wa = /* @__PURE__ */ new Map();
function yi(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function ki(e, a) {
  let n = wa.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, wa.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function $i(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !yi(r) && ki(e, r);
}
function Ci(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if ($i(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function Si(e) {
  for (const a of e.claims) {
    const n = wa.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), wa.delete(a)));
  }
}
function Ri(e, a) {
  const n = { root: e, claims: [] };
  return ma.push(n), Ci(n, a), n;
}
function Ti(e) {
  const a = ma.indexOf(e);
  a >= 0 && ma.splice(a, 1), Si(e);
}
function ut(e) {
  return e !== null && ma.at(-1) === e;
}
function Li(e, a, n) {
  const r = g(null), l = g(n);
  return l.current = n, I(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Ri(i, a);
    return r.current = c, () => {
      var d, h;
      const u = ut(c);
      Ti(c), r.current = null, u && ((h = (d = l.current ?? s) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), X(() => ut(r.current), []);
}
function Ei(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function xi(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ai({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${ye.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("header", { className: `${ye.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${ye.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${ye.body} ward-drawer-body`, children: e.children })
  ] });
}
function Ii(e) {
  return `${ye.scrim} ${ye[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Mi(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ye.panel} ${ye[e]} ward-overlay-panel${n}${r}`;
}
function qi(e) {
  const a = je(Ni);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = g(null), n = g(null), r = $(), l = qi(e.container), i = Ka("(min-width: 768px)"), s = Ei(e.kind, i), c = xi(e, r), u = Fn(n), d = Li(a, l, e.returnFocusTo), h = X(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return I(() => {
    var f, v;
    d() && ((v = (f = n.current) == null ? void 0 : f.querySelector("button")) == null || v.focus());
  }, [d]), I(() => {
    const f = (v) => {
      v.key === "Escape" && h();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [h]), Mn(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: Ii(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: h,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: n,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c.labelledBy,
            "aria-label": c.label,
            className: Mi(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => d() && u.onKeyDown(f),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${ye.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(Ai, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Pi = "_root_drrhx_2", Bi = "_ticket_drrhx_15", Oi = "_body_drrhx_24", La = {
  root: Pi,
  ticket: Bi,
  body: Oi
};
function x$({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${La.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ t("span", { className: `${La.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ t("div", { className: La.body, children: n })
  ] });
}
const Di = "_root_bf1pc_2", ji = "_table_bf1pc_9", Hi = "_caption_bf1pc_14", Fi = "_series_bf1pc_23", Wi = "_category_bf1pc_31", zi = "_cell_bf1pc_39", Gi = "_track_bf1pc_45", Ui = "_lane_bf1pc_52", Ki = "_bar_bf1pc_56", Vi = "_value_bf1pc_63", Yi = "_swatch_bf1pc_70", Xi = "_empty_bf1pc_78", V = {
  root: Di,
  table: ji,
  caption: Hi,
  series: Fi,
  category: Wi,
  cell: zi,
  track: Gi,
  lane: Ui,
  bar: Ki,
  value: Vi,
  swatch: Yi,
  empty: Xi
}, Ji = "—", ht = 6;
function Qi(e, a) {
  if (a.length < 1 || a.length > ht)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${ht}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Zi(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function Ot(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function es(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function as({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = es(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ o("span", { className: V.track, children: [
    /* @__PURE__ */ t("span", { className: V.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${V.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: V.value, children: e === null ? l : r(e) })
  ] }) });
}
function ts({ series: e }) {
  return /* @__PURE__ */ t(S, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: V.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: V.swatch, "data-step": Ot(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function ns({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${V.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: V.caption, children: e }),
    /* @__PURE__ */ t("p", { className: V.empty, children: a })
  ] });
}
function rs({ title: e, categories: a, series: n, top: r, format: l = ae, categoryHead: i = "Category", missing: s = Ji }) {
  return /* @__PURE__ */ t("div", { className: `${V.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: V.table, children: [
    /* @__PURE__ */ t("caption", { className: V.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: V.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(ts, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: V.category, children: c }),
      n.map((d, h) => /* @__PURE__ */ t(as, { value: d.values[u], top: r, step: Ot(h, n.length), format: l, missing: s }, d.name))
    ] }, c)) })
  ] }) });
}
function A$(e) {
  Qi(e.categories, e.series);
  const a = Zi(e.series);
  return a === 0 ? /* @__PURE__ */ t(ns, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(rs, { ...e, top: a });
}
const ls = "_root_1bfqw_2", os = "_figure_1bfqw_7", is = "_of_1bfqw_13", ss = "_bar_1bfqw_18", cs = "_rows_1bfqw_38", ds = "_row_1bfqw_38", us = "_label_1bfqw_49", hs = "_amount_1bfqw_54", Se = {
  root: ls,
  figure: os,
  of: is,
  bar: ss,
  rows: cs,
  row: ds,
  label: us,
  amount: hs
};
function ms({ spent: e, ceiling: a, breakdown: n }) {
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
    /* @__PURE__ */ t(
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
    n && /* @__PURE__ */ t("ul", { className: Se.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Se.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Se.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: Se.amount, children: re(l.amount) })
    ] }, l.label)) })
  ] });
}
const ws = "_frame_mg2jl_2", _s = "_table_mg2jl_6", fs = "_th_mg2jl_12", vs = "_td_mg2jl_13", bs = "_sort_mg2jl_47", ps = "_row_mg2jl_53", gs = "_empty_mg2jl_61", Te = {
  frame: ws,
  table: _s,
  th: fs,
  td: vs,
  sort: bs,
  row: ps,
  empty: gs
}, Ns = { asc: "ascending", desc: "descending" };
function ys(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Ns[a.direction];
}
function ks(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Te.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function $s(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Cs({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Te.th,
      style: $s(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ys(e, a),
      children: ks(e, n)
    }
  );
}
function Ss({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: Te.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ t("td", { className: Te.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function Rs({
  label: e,
  columns: a,
  rows: n,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: u,
  empty: d
}) {
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: Te.empty, children: d }) : /* @__PURE__ */ t("div", { className: Te.frame, children: /* @__PURE__ */ o("table", { className: Te.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Te.head, children: a.map((h) => /* @__PURE__ */ t(Cs, { column: h, sort: c, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((h) => /* @__PURE__ */ t(Ss, { row: h, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const Ts = "_list_v0s52_2", Ls = {
  list: Ts
};
function I$({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Ls.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Es = "_label_1u62a_2", xs = {
  label: Es
};
function M$({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: xs.label, children: a.header }) }, a.key)) }) });
}
const As = "_stack_bp6a0_2", Is = {
  stack: As
};
function q$({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Is.stack, "data-ward-action-stack": "", children: e });
}
const Ms = "_set_y5zy3_2", qs = "_legend_y5zy3_7", Ps = "_row_y5zy3_15", Bs = "_control_y5zy3_20", Os = "_input_y5zy3_26", Ds = "_label_y5zy3_31", js = "_consequence_y5zy3_36", Me = {
  set: Ms,
  legend: qs,
  row: Ps,
  control: Bs,
  input: Os,
  label: Ds,
  consequence: js
};
function Dt({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const u = $(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: Me.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: Me.legend, children: e }),
    a.map((h) => {
      const f = `${d}-${h.value}`, v = h.consequence ? `${f}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Me.row, children: [
        /* @__PURE__ */ o("span", { className: Me.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: f,
              type: "radio",
              name: d,
              className: Me.input,
              value: h.value,
              checked: n === h.value,
              disabled: l,
              "aria-describedby": Va(v, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: f, className: Me.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ t("p", { id: v, className: `${Me.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Hs = "_root_1lu1e_2", Fs = "_head_1lu1e_11", Ws = "_note_1lu1e_30", zs = "_index_1lu1e_35", Gs = "_dot_1lu1e_39", Us = "_counter_1lu1e_50", Ks = "_trailing_1lu1e_58", Pe = {
  root: Hs,
  head: Fs,
  note: Ws,
  index: zs,
  dot: Gs,
  counter: Us,
  trailing: Ks
};
function Vs({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("span", { className: `${Pe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Pe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ys({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Pe.counter, "aria-hidden": "true", children: e }) : null;
}
function mt({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Pe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Pe.head, children: [
      /* @__PURE__ */ t(Vs, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: Pe.note, children: n }),
    /* @__PURE__ */ t(Ys, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: Pe.trailing, children: i })
  ] });
}
const Xs = "_strip_1cw2w_2", Js = "_cell_1cw2w_7", Qs = "_value_1cw2w_12", Zs = "_link_1cw2w_28", ec = "_linkValue_1cw2w_37", ac = "_label_1cw2w_48", Le = {
  strip: Xs,
  cell: Js,
  value: Qs,
  link: Zs,
  linkValue: ec,
  label: ac
};
function tc(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const jt = (e) => `${Le.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function nc({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Le.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: jt(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${Le.label} ward-stat-label`, children: e.label })
  ] });
}
function rc({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Le.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: jt(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Le.link} ward-stat-link`, href: W(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { className: Le.linkValue, children: e.value }),
      /* @__PURE__ */ t("span", { className: `${Le.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ca({ cells: e, divided: a = !1 }) {
  return tc(e), /* @__PURE__ */ t("dl", { className: `${Le.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(nc, { cell: n }, n.label) : /* @__PURE__ */ t(rc, { cell: n, href: n.href }, n.label)) });
}
const lc = "_root_5jkzr_2", oc = "_track_5jkzr_8", ic = "_thumb_5jkzr_46", sc = "_labelHidden_5jkzr_64", cc = "_label_5jkzr_64", dc = "_lockedNote_5jkzr_84", Be = {
  root: lc,
  track: oc,
  thumb: ic,
  labelHidden: sc,
  label: cc,
  lockedNote: dc
};
function uc(e) {
  return e ? `${Be.label} ${Be.labelHidden}` : Be.label;
}
function De({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = $(), u = `${c}switch`, d = l ? !0 : a, h = r || l;
  return /* @__PURE__ */ o("span", { className: `${Be.root} ward-switchrow`, children: [
    /* @__PURE__ */ t(
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
        onClick: () => !h && (n == null ? void 0 : n(!d)),
        children: /* @__PURE__ */ t("span", { className: Be.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: u, className: uc(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const hc = "_bar_wr7qx_2", mc = "_skip_wr7qx_11", wc = "_mark_wr7qx_22", _c = "_nav_wr7qx_30", fc = "_list_wr7qx_34", vc = "_select_wr7qx_40", bc = "_dest_wr7qx_48", pc = "_actor_wr7qx_76", gc = "_actorMark_wr7qx_89", Nc = "_actorLabel_wr7qx_94", yc = "_tagline_wr7qx_113", de = {
  bar: hc,
  skip: mc,
  mark: wc,
  nav: _c,
  list: fc,
  select: vc,
  dest: bc,
  actor: pc,
  actorMark: gc,
  actorLabel: Nc,
  tagline: yc
};
function kc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function $c(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function P$({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = $c(r);
  return /* @__PURE__ */ o("header", { className: de.bar, children: [
    /* @__PURE__ */ t("a", { className: `${de.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: de.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: de.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: de.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: de.list, children: a.map((u) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${de.dest} ward-target`,
          href: W(u.href),
          "aria-current": u.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ t(
        "select",
        {
          className: de.select,
          "aria-label": "Destination",
          value: n,
          onChange: (u) => i == null ? void 0 : i(u.target.value),
          children: a.map((u) => /* @__PURE__ */ t("option", { value: u.id, children: u.label }, u.id))
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: de.actor, children: [
      /* @__PURE__ */ t("span", { className: de.actorLabel, children: c }),
      /* @__PURE__ */ t("span", { className: de.actorMark, "aria-hidden": "true", children: kc(c) })
    ] })
  ] });
}
const Cc = "_tree_1lyby_2", Sc = "_item_1lyby_6", Rc = "_row_1lyby_10", Tc = "_button_1lyby_22", _a = {
  tree: Cc,
  item: Sc,
  row: Rc,
  button: Tc
}, Ht = He(null);
function Lc({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = Na({ orientation: "vertical" });
  return /* @__PURE__ */ t(Ht.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: _a.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const Ec = { ArrowRight: !0, ArrowLeft: !1 };
function wt(e) {
  return e ? !0 : void 0;
}
function xc(e, a) {
  const n = Ec[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function Ac(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function Ic(e) {
  const a = [_a.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Mc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function qc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Pc(e) {
  return typeof e == "string" ? e : void 0;
}
function Bc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Oc({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function Ft(e) {
  const a = je(Ht);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Mc(e);
  return /* @__PURE__ */ o("li", { className: _a.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: Ic(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": n,
        "data-depth": e.depth,
        "data-unresolved": wt(e.unresolved),
        "data-inherited": wt(e.inherited),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${_a.button} ward-treeitem-btn`,
            onClick: () => Ac(e),
            onKeyDown: (r) => xc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: qc(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: Pc(e.label), children: e.label }),
              /* @__PURE__ */ t(Bc, { value: e.detail }),
              /* @__PURE__ */ t(Oc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Dc = "_frame_1fj9j_2", jc = "_subjectRail_1fj9j_22", Hc = "_subject_1fj9j_22", Fc = "_rail_1fj9j_42", Wc = "_record_1fj9j_64", zc = "_recordBody_1fj9j_69", Gc = "_stageGrid_1fj9j_118", Uc = "_band_1fj9j_144", Kc = "_bandBody_1fj9j_153", Vc = "_bandActions_1fj9j_158", Yc = "_scroller_1fj9j_166", Xc = "_board_1fj9j_192", Jc = "_laneCount_1fj9j_200", Qc = "_lanes_1fj9j_210", Y = {
  frame: Dc,
  subjectRail: jc,
  subject: Hc,
  rail: Fc,
  record: Wc,
  recordBody: zc,
  stageGrid: Gc,
  band: Uc,
  bandBody: Kc,
  bandActions: Vc,
  scroller: Yc,
  board: Xc,
  laneCount: Jc,
  lanes: Qc
};
function B$({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function _t(e) {
  return e ? "true" : void 0;
}
function O$({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": n, "data-ruled": _t(i), children: [
    /* @__PURE__ */ t("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Y.rail, "data-sticky": _t(l), "aria-label": r, children: a })
  ] });
}
function D$({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(mt, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(mt, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Y.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Zc = "_form_1j8ub_2", ed = "_fields_1j8ub_9", ad = "_actions_1j8ub_19", Ea = {
  form: Zc,
  fields: ed,
  actions: ad
};
function j$({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ea.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Ea.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Ea.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function H$({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Y.bandActions, children: a })
  ] });
}
const td = "(max-width: 767.98px)";
function Ja({ label: e, children: a, laneCount: n, onOverflow: r }) {
  const l = g(null);
  aa(l, n ?? An.count(a), r);
  const i = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function nd({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(A, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(Ja, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function rd({ lanes: e, label: a }) {
  const [n, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !n, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ t(Ja, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ t(In, { children: l.content }, l.id)) })
  ] });
}
function F$({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ka(td);
  return n === void 0 ? /* @__PURE__ */ t(Ja, { label: a, children: e }) : l ? /* @__PURE__ */ t(nd, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(rd, { lanes: n, label: a });
}
function W$({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = g(null), i = Math.max(e, 1);
  aa(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ t("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": n, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const ld = "_block_1o5o7_2", od = "_sentence_1o5o7_15", id = "_meta_1o5o7_20", sd = "_action_1o5o7_25", cd = "_strip_1o5o7_29", dd = "_loading_1o5o7_48", ud = "_label_1o5o7_56", hd = "_counter_1o5o7_63", _e = {
  block: ld,
  sentence: od,
  meta: id,
  action: sd,
  strip: cd,
  loading: dd,
  label: ud,
  counter: hd
};
function md({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: _e.action, children: /* @__PURE__ */ t(_, { onClick: e.onClick, children: e.label }) });
}
function Sa({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: _e.sentence, children: e }),
    n,
    /* @__PURE__ */ t(md, { action: a })
  ] });
}
function wd(e) {
  return /* @__PURE__ */ t(Sa, { ...e, kind: "ward-emptystate" });
}
function z$({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Sa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function G$(e) {
  return /* @__PURE__ */ t(Sa, { ...e });
}
function U$({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Sa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    ce(a)
  ] }) });
}
function K$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ce(e),
    ". Showing snapshot from ",
    ce(a)
  ] });
}
function V$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ce(a)
  ] });
}
function Y$({ label: e, startedAt: a }) {
  const n = g(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  I(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = Ga(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: _e.counter, children: za(i) }) : null
  ] });
}
const _d = "_note_tlubt_2", fd = {
  note: _d
};
function vd({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: fd.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const bd = "_card_12in3_2", pd = "_hit_12in3_23", gd = "_head_12in3_30", Nd = "_title_12in3_36", yd = "_meta_12in3_44", kd = "_fields_12in3_45", $d = "_who_12in3_58", Cd = "_sep_12in3_65", Sd = "_mono_12in3_69", Rd = "_field_12in3_45", Td = "_last_12in3_84", Ld = "_reason_12in3_96", J = {
  card: bd,
  hit: pd,
  head: gd,
  title: Nd,
  meta: yd,
  fields: kd,
  who: $d,
  sep: Cd,
  mono: Sd,
  field: Rd,
  last: Td,
  reason: Ld
}, Ed = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function xd(e, a, n) {
  const r = sa(e, "blue"), l = sa(e, "orange"), i = sa(e, "green"), s = g(/* @__PURE__ */ new Set());
  I(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (u) => {
      if (s.current.has(u.id)) return;
      s.current.add(u.id);
      const d = Ed[u.type];
      d && c[d]();
    });
  }, [r, n, i, a, l]);
}
const Ad = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Id(e, a) {
  return Ad[a](e);
}
function Md({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: J.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: J.meta, children: [
    /* @__PURE__ */ o("span", { className: J.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    n,
    /* @__PURE__ */ t($e, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: J.meta, children: [
    /* @__PURE__ */ o("span", { className: J.who, children: [
      "waits on ",
      e.waitsOn
    ] }),
    n,
    /* @__PURE__ */ o("span", { className: J.mono, children: [
      se(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function qd({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: J.head, children: [
    e.flagged && /* @__PURE__ */ t(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function Pd({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: J.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Bd({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: J.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: J.field, children: Id(e, n) }, n)) });
}
const Oa = (e) => e ? !0 : void 0;
function Od(e) {
  return { "--stream": fe(e.streamStep, "id") };
}
function Dd(e, a, n) {
  e == null || e(a, n);
}
function jd(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Hd({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: J.last, "data-stale": Oa(a), children: n }) : null;
}
function Ra(e) {
  const a = e.fields ?? [], n = e.item, r = g(null);
  xd(r, n.key, e.feed);
  const l = jd(e.feed), i = Od(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: J.card,
      style: i,
      "data-selected": Oa(e.selected),
      "data-flagged": Oa(n.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: J.hit, onClick: (s) => Dd(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(qd, { item: n }),
        /* @__PURE__ */ t("p", { className: J.title, children: n.title }),
        /* @__PURE__ */ t(Md, { item: n, connection: l }),
        /* @__PURE__ */ t(Pd, { reason: n.blockedReason }),
        /* @__PURE__ */ t(Bd, { item: n, fields: a }),
        /* @__PURE__ */ t(Hd, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Fd = "_column_10sxg_3", Wd = "_head_10sxg_24", zd = "_label_10sxg_33", Gd = "_count_10sxg_42", Ud = "_list_10sxg_56", Je = {
  column: Fd,
  head: Wd,
  label: zd,
  count: Gd,
  list: Ud
};
function Wt(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Kd({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ t("h2", { className: Je.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Vd(e) {
  return /* @__PURE__ */ t("div", { className: Je.list, role: "list", children: e.rows.map((a, n) => {
    var r;
    return /* @__PURE__ */ t(
      Ra,
      {
        item: a,
        fields: e.fields,
        onOpen: e.onOpen,
        selected: a.key === e.selectedKey,
        feed: e.feed,
        rovingProps: (r = e.roving) == null ? void 0 : r.itemProps(e.roving.base + n),
        inList: !0
      },
      a.key
    );
  }) });
}
function Yd({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: u }) {
  const d = $(), h = e.cap !== void 0 && a.length > e.cap, f = Wt(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ t(Kd, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ t(Vd, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: f }),
    h && /* @__PURE__ */ t(vd, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Xd = "_foot_8qg4p_2", Jd = "_note_8qg4p_13", Qd = "_link_8qg4p_19", xa = {
  foot: Xd,
  note: Jd,
  link: Qd
};
function X$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: xa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: xa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${xa.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Zd = "_head_1la6p_3", eu = "_identity_1la6p_12", au = "_titleRow_1la6p_18", tu = "_title_1la6p_18", nu = "_key_1la6p_35", ru = "_rollup_1la6p_45", lu = "_tools_1la6p_53", ou = "_swatch_1la6p_62", iu = "_mark_1la6p_69", ge = {
  head: Zd,
  identity: eu,
  titleRow: au,
  title: tu,
  key: nu,
  rollup: ru,
  tools: lu,
  swatch: ou,
  mark: iu
}, ft = "initials:";
function su(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function cu(e) {
  const a = [su(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function du(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    cu(e)
  ] });
}
function uu(e) {
  return e.startsWith(ft) ? e.slice(ft.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function hu({ markRef: e, streamStep: a }) {
  const n = { "--stream": fe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ge.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: uu(e) }) : /* @__PURE__ */ t("span", { className: ge.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function mu({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(A, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function J$({
  stream: e,
  rollups: a,
  connection: n,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: u
}) {
  return /* @__PURE__ */ o("div", { className: ge.head, children: [
    /* @__PURE__ */ o("div", { className: ge.identity, children: [
      /* @__PURE__ */ o("div", { className: ge.titleRow, children: [
        /* @__PURE__ */ t(hu, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ge.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ge.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ge.rollup, "aria-live": "polite", children: du(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ge.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(mu, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(_, { onClick: c, children: "Configure board" }),
      u,
      /* @__PURE__ */ t(Xa, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const wu = "_head_589hw_11", _u = "_line_589hw_12", fu = "_cHandle_589hw_33", vu = "_cName_589hw_38", bu = "_nameLine_589hw_46", pu = "_cLabel_589hw_53", gu = "_cCap_589hw_58", Nu = "_cShown_589hw_63", yu = "_name_589hw_46", ku = "_noCap_589hw_85", $u = "_state_589hw_99", Cu = "_handle_589hw_108", Su = "_sub_589hw_134", B = {
  head: wu,
  line: _u,
  cHandle: fu,
  cName: vu,
  nameLine: bu,
  cLabel: pu,
  cCap: gu,
  cShown: Nu,
  name: yu,
  noCap: ku,
  state: $u,
  handle: Cu,
  sub: Su
}, Ru = "can't be hidden or collapsed", Tu = "terminal · counted, not a column";
function Q$() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: B.cHandle }),
    /* @__PURE__ */ t("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: B.cShown, children: "Shown" })
  ] });
}
function Lu(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Eu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function vt(e) {
  return e.gate ? Ru : e.terminal ? Tu : Eu(e.agentsMounted);
}
function xu(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Au({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ t("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    vt(e) && /* @__PURE__ */ t("span", { className: B.sub, children: vt(e) })
  ] });
}
function Iu(e) {
  return e === void 0 ? "" : String(e);
}
function Mu(e) {
  return e === "" ? void 0 : Number(e);
}
function qu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ t("span", { className: B.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: B.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (n) => xu(n, a),
      children: "⠿"
    }
  ) });
}
function Pu({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: B.cCap, children: /* @__PURE__ */ t(A, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Iu(a.cap), onChange: (r) => n({ ...a, cap: Mu(r) }) }) });
}
function Bu({ stage: e, config: a, onChange: n }) {
  const r = Lu(e, a.shown), l = e.gate || e.terminal, i = (s) => n({ ...a, shown: s });
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ t(De, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ t("span", { className: B.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function Ou(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function Z$({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": Ou(e), children: [
    /* @__PURE__ */ t(qu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(Au, { stage: e }),
    /* @__PURE__ */ t("span", { className: B.cLabel, children: /* @__PURE__ */ t(A, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(Pu, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(Bu, { stage: e, config: a, onChange: n })
  ] });
}
const Du = "_body_hn6d6_2", ju = "_head_hn6d6_9", Hu = "_summary_hn6d6_19", Fu = "_block_hn6d6_20", Wu = "_actionsBlock_hn6d6_21", zu = "_title_hn6d6_41", Gu = "_note_hn6d6_46", Uu = "_k_hn6d6_51", Ku = "_kv_hn6d6_58", Vu = "_row_hn6d6_64", Yu = "_label_hn6d6_75", Xu = "_value_hn6d6_84", Ju = "_quote_hn6d6_90", Qu = "_actions_hn6d6_21", Zu = "_resolve_hn6d6_103", O = {
  body: Du,
  head: ju,
  summary: Hu,
  block: Fu,
  actionsBlock: Wu,
  title: zu,
  note: Gu,
  k: Uu,
  kv: Ku,
  row: Vu,
  label: Yu,
  value: Xu,
  quote: Ju,
  actions: Qu,
  resolve: Zu
};
function eh(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function ah(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t($e, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function th(e) {
  const a = ta(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function nh(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(m, { ...$a(th(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...eh(e),
    ...ah(e, a)
  ];
}
function rh({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: O.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: O.k, children: a }),
    e
  ] });
}
function lh({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: O.head, children: [
    /* @__PURE__ */ t(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function oh({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: O.block, children: [
    /* @__PURE__ */ t("p", { className: O.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: O.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: O.note, children: e.agentMeta })
  ] }) : null;
}
function e0({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const u = $(), d = nh(e, l);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: u, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: O.body, children: [
    /* @__PURE__ */ t(lh, { item: e }),
    /* @__PURE__ */ o("div", { className: O.summary, children: [
      /* @__PURE__ */ t("h2", { className: O.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: O.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: O.kv, children: d.map(([h, f]) => /* @__PURE__ */ o("div", { className: O.row, children: [
      /* @__PURE__ */ t("dt", { className: O.label, children: h }),
      /* @__PURE__ */ t("dd", { className: O.value, children: f })
    ] }, h)) }),
    /* @__PURE__ */ t(oh, { item: e }),
    /* @__PURE__ */ o("div", { className: O.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: O.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: O.note, children: c })
    ] }),
    /* @__PURE__ */ t(rh, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const ih = "_root_3azmy_2", sh = "_list_3azmy_7", ch = "_item_3azmy_12", dh = "_box_3azmy_18", uh = "_text_3azmy_23", hh = "_note_3azmy_28", ze = {
  root: ih,
  list: sh,
  item: ch,
  box: dh,
  text: uh,
  note: hh
};
function Ta({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: ze.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${ze.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${ze.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: ze.box, children: /* @__PURE__ */ t(Ya, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: ze.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${ze.note} ward-checklist-note`, children: a })
  ] });
}
const mh = "_rail_ke7ch_2", wh = "_k_ke7ch_11", _h = "_head_ke7ch_19", fh = "_section_ke7ch_25", vh = "_card_ke7ch_38", bh = "_strip_ke7ch_42", ph = "_skeleton_ke7ch_56", gh = "_skeletonLabel_ke7ch_70", Nh = "_bar_ke7ch_76", yh = "_note_ke7ch_85", he = {
  rail: mh,
  k: wh,
  head: _h,
  section: fh,
  card: vh,
  strip: bh,
  skeleton: ph,
  skeletonLabel: gh,
  bar: Nh,
  note: yh
};
function kh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Aa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: he.k, children: e }),
    a
  ] });
}
function $h({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function Ch({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Yd, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function Sh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(Ch, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t($h, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function a0(e) {
  const a = kh(e.onOpen), n = Wt(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Aa, { title: "Card", children: /* @__PURE__ */ t("div", { className: he.card, children: n && /* @__PURE__ */ t(Ra, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Aa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(Sh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Aa, { title: "Effect of this config", children: /* @__PURE__ */ t(Ta, { items: e.effects, density: "compact" }) })
  ] });
}
function Rh(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function Th(e) {
  return Math.ceil(e.length / 2);
}
function Lh(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function zt(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Eh(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = zt(e);
  l !== void 0 && n(l), r(Lh(e.type));
}
function xh(e, a, n, r, l) {
  I(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Eh(i, n, r, l));
  }, [e, a, n, r, l]);
}
function Ah(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Ih(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function Mh(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function qh(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(Th(a ?? [])) + ")"
  };
}
function Ph(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Bh(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(m, { role: "meta", label: re(e.cost) }) : null;
}
function Oh(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(m, { role: "meta", label: e.jiraKey }) : null;
}
function Dh(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t($e, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function jh(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Hh(e, a) {
  return a === void 0 ? e : Rh(e, a.ref);
}
function Fh(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ea(e) {
  return e === !0 ? "true" : void 0;
}
function Gt(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = g(null), i = sa(l), s = g(/* @__PURE__ */ new Set()), [c, u] = p(Ah(a));
  xh(e.feed, a.key, s, u, i);
  const d = Ih(a, r), h = Mh(a, n), f = qh(a, e.fields), v = jh(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Fh(e),
      className: "ward-workcard",
      "data-flagged": ea(a.flagged),
      "data-selected": ea(e.selected),
      style: f,
      ref: Hh(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Ph(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(m, { role: d.role, label: d.label }),
          Bh(a, e.fields),
          Oh(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Dh(n, c, e.connection, a.changedAt),
          v !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: v, children: v }) : null
        ] })
      ]
    }
  ) });
}
function Wh({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function zh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Gh(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ t(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Uh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Wh, { count: e.items.length, cap: e.column.cap });
}
function Kh(e, a) {
  return e.roving ?? a;
}
function Vh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Yh(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    Gt,
    {
      item: n,
      fields: e.fields,
      onOpen: e.onOpen,
      selected: n.key === e.selectedKey,
      feed: e.feed,
      connection: e.connection,
      rovingItem: a.itemProps(r)
    },
    n.key
  ));
}
function Xh(e) {
  const a = $(), n = Na({ orientation: "vertical" }), r = Kh(e, n), l = zh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ea(l), "data-gate": ea(e.column.gate), children: [
    Gh(e.column, e.items.length, a),
    Uh(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Vh(e, n), children: Yh(e, r) })
  ] });
}
function Jh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Qh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(A, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Zh(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function t0(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: Jh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Qh(e),
      Zh(e.onConfigure),
      /* @__PURE__ */ t(Xa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function em(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function am(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(De, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(De, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function tm(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ t(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function n0(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ea(em(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: am(e) }),
    /* @__PURE__ */ t(A, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(qt, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    tm(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function r0(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(Gt, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(Xh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function nm(e, a) {
  const n = zt(e);
  n !== void 0 && a(n);
}
function rm(e, a, n) {
  I(() => {
    if (e != null)
      return e.subscribe(a, (r) => nm(r, n));
  }, [e, a, n]);
}
function lm(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function om(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function im(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t($e, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function sm(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function l0(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  rm(e.feed, a.key, l);
  const i = [...lm(a), ...om(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      im(n, r)
    ] }),
    sm(a, e.actions)
  ] });
}
const cm = "_card_d2vbe_2", dm = "_head_d2vbe_22", um = "_mark_d2vbe_30", hm = "_name_d2vbe_42", mm = "_chips_d2vbe_63", wm = "_description_d2vbe_69", _m = "_run_d2vbe_74", fm = "_sep_d2vbe_83", vm = "_facts_d2vbe_88", bm = "_fact_d2vbe_88", pm = "_factLabel_d2vbe_101", gm = "_factValue_d2vbe_105", le = {
  card: cm,
  head: dm,
  mark: um,
  name: hm,
  chips: mm,
  description: wm,
  run: _m,
  sep: fm,
  facts: vm,
  fact: bm,
  factLabel: pm,
  factValue: gm
}, Nm = { live: "done", draft: "running", paused: "meta" };
function ym(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function km({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ t(m, { role: Nm[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function $m({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: le.description, children: e });
}
function Cm({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t($e, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function Sm({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ t("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function Rm(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Tm({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": fe(e.streamStep, "id") }, u = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: ym(s),
      style: c,
      "data-selected": u,
      "data-paused": Rm(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ t("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ t($m, { description: e.description }),
        /* @__PURE__ */ t(Cm, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(km, { versions: e.versions }),
        /* @__PURE__ */ t(Sm, { facts: i })
      ]
    }
  );
}
const Lm = "_list_4dcyc_2", Em = "_row_4dcyc_11", xm = "_head_4dcyc_23", Am = "_id_4dcyc_30", Im = "_lock_4dcyc_35", Mm = "_reason_4dcyc_41", qm = "_remove_4dcyc_46", Pm = "_clauses_4dcyc_50", Bm = "_clause_4dcyc_50", Om = "_label_4dcyc_64", Dm = "_cell_4dcyc_71", jm = "_value_4dcyc_76", ie = {
  list: Lm,
  row: Em,
  head: xm,
  id: Am,
  lock: Im,
  reason: Mm,
  remove: qm,
  clauses: Pm,
  clause: Bm,
  label: Om,
  cell: Dm,
  value: jm
}, Ut = He(!1);
function o0({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(Ut.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function Hm({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(A, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function Fm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function Wm({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(Fm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function bt(e, a) {
  return e.locked ? void 0 : a;
}
function i0({ rule: e, onChange: a, onRemove: n }) {
  if (!je(Ut)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = bt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Wm, { rule: e, onRemove: bt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(Hm, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const zm = "_ladder_j98f1_2", Gm = "_cell_j98f1_7", Um = "_empty_j98f1_26", Km = "_name_j98f1_34", Vm = "_holder_j98f1_40", Ym = "_request_j98f1_46", Xm = "_swatches_j98f1_51", Jm = "_swatch_j98f1_51", Qm = "_tilesFrame_j98f1_78", Zm = "_tiles_j98f1_78", ew = "_tile_j98f1_78", aw = "_bar_j98f1_117", tw = "_hex_j98f1_128", nw = "_note_j98f1_138", L = {
  ladder: zm,
  cell: Gm,
  empty: Um,
  name: Km,
  holder: Vm,
  request: Ym,
  swatches: Xm,
  swatch: Jm,
  tilesFrame: Qm,
  tiles: Zm,
  tile: ew,
  bar: aw,
  hex: tw,
  note: nw
}, s0 = "not validated yet, pending a CVD matrix and dark stepping";
function rw(e) {
  return e.reserved ? "reserved" : ka(e.step) ? "validated" : "partial";
}
function Kt(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function lw(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function ow({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(xe, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function iw(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function sw(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const pt = (e) => String(e).padStart(2, "0");
function cw(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? Kt(e, void 0);
}
function dw({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${L.hex} ward-ladder-hex`, children: r ? `step ${pt(e)}` : Vn(e) }),
    /* @__PURE__ */ t("span", { className: `${L.note} ward-ladder-note`, children: r ? n : `Step ${pt(e)} · ${n}` })
  ] });
}
function uw({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = rw(e), c = Kt(s, n), u = c !== "free", d = u || i, h = a === e.step, f = e.name ?? `Step ${e.step}`, v = () => {
    d || r(e.step);
  }, N = `${f} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...sw(u, h, d), "data-validation": s, style: lw(e, s), onClick: v, onKeyDown: (q) => iw(q, v) }, label: N, name: f, holder: c, validation: s, note: cw(s, n, h), step: e.step };
}
const hw = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${L.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${L.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(dw, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${L.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(ow, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${L.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${L.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function mw(e) {
  return hw[e.presentation](uw(e));
}
function ww(e) {
  for (const a of e)
    if (!a.reserved && !ya(a.step)) throw new Error("colour ladder renders token steps only");
}
function _w() {
  return /* @__PURE__ */ o("div", { className: `${L.cell} ward-ladder-cell ${L.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${L.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${L.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function fw(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const vw = { list: L.ladder, swatches: L.swatches, tiles: L.tilesFrame };
function bw() {
  return /* @__PURE__ */ o("div", { className: `${L.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${L.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${L.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const pw = { list: _w, swatches: () => null, tiles: bw };
function gw(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Vt(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  ww(e.steps);
  const r = fw(e), l = pw[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(mw, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...gw(e.disabled === !0), className: `${vw[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: L.tiles, children: i }) : i });
}
const Nw = "_rail_1el2t_2", yw = "_section_1el2t_12", kw = "_sectionFlush_1el2t_22", $w = "_head_1el2t_26", Cw = "_headLabel_1el2t_34", Sw = "_sample_1el2t_42", Rw = "_sampleLabel_1el2t_47", Tw = "_sampleTitle_1el2t_54", Lw = "_sampleMeta_1el2t_59", Ew = "_trace_1el2t_65", xw = "_traceHead_1el2t_70", Aw = "_steps_1el2t_78", Iw = "_step_1el2t_78", Mw = "_stepTitle_1el2t_97", qw = "_hollow_1el2t_107", Pw = "_stepBody_1el2t_115", Bw = "_stepDetail_1el2t_127", Ow = "_publish_1el2t_132", Dw = "_reason_1el2t_138", jw = "_note_1el2t_143", Hw = "_reveal_1el2t_148", y = {
  rail: Nw,
  section: yw,
  sectionFlush: kw,
  head: $w,
  headLabel: Cw,
  sample: Sw,
  sampleLabel: Rw,
  sampleTitle: Tw,
  sampleMeta: Lw,
  trace: Ew,
  traceHead: xw,
  steps: Aw,
  step: Iw,
  stepTitle: Mw,
  hollow: qw,
  stepBody: Pw,
  stepDetail: Bw,
  publish: Ow,
  reason: Dw,
  note: jw,
  reveal: Hw
}, gt = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Fw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Ww = { ok: "greenFill", finding: "orangeFill", action: "blue" }, zw = { notSimulated: "not simulated", running: "running" };
function Gw(e) {
  return e.presentation === "foundry";
}
function Uw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Kw(e, a) {
  var r;
  const n = Fw[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Vw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Yw(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Xw(e) {
  if (Vw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Jw(e) {
  const [a, n] = p(!1);
  I(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${y.step} ${y.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Qw(e) {
  const a = zw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: y.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(xe, { size: 6, kind: Ww[e.kind], label: e.kind });
}
function Zw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: y.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function e_(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t($e, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function a_(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Jw, { kind: a.kind, children: [
    /* @__PURE__ */ t(Qw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: y.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: y.stepTitle, children: a.title }),
      /* @__PURE__ */ t(Zw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(e_, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function t_(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(se(a)), n.join(" · ");
}
function Yt(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${y.trace} ${y.section}`, children: [
    /* @__PURE__ */ t("p", { className: y.traceHead, id: a, children: t_(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: y.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(a_, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function n_(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${y.sample} ${y.section}`, children: [
    /* @__PURE__ */ t("p", { className: y.sampleLabel, children: "Sample item" }),
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
function r_(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ce(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${y.sampleMeta} ${y.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function l_(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Et(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: y.sectionFlush, children: /* @__PURE__ */ t(Ca, { divided: !0, cells: a }) });
}
function o_(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Et(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function i_(e) {
  const a = o_(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: y.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: y.sectionFlush, children: /* @__PURE__ */ t(Ca, { divided: !0, cells: a }) });
}
function Xt(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("p", { className: `${y.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function s_(e) {
  return /* @__PURE__ */ o("div", { className: `${y.publish} ${y.section}`, children: [
    /* @__PURE__ */ t(Xt, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: y.note, children: e.note })
  ] });
}
function c_(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${y.publish} ${y.section}`, children: /* @__PURE__ */ t(Xt, { reason: e.reason, onPublish: e.onPublish }) });
}
function Jt(e) {
  return /* @__PURE__ */ o("div", { className: `${y.head} ${y.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: y.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(m, { role: gt[e.run.status].role, label: gt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t($e, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function d_(e, a) {
  const [n, r] = p(e.steps);
  return I(() => r(e.steps), [e.steps]), I(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), n;
}
function u_(e) {
  var n;
  Yw(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Jt, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(n_, { sample: e.run.sample }),
    /* @__PURE__ */ t(Yt, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(l_, { run: e.run }),
    /* @__PURE__ */ t("div", { className: y.section, children: /* @__PURE__ */ t(Ta, { items: e.checklist }) }),
    /* @__PURE__ */ t(s_, { reason: Uw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function h_(e) {
  var r;
  const a = d_(e.run, e.feed);
  Xw(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Jt, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(r_, { sample: e.run.sample }),
    /* @__PURE__ */ t(Yt, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(i_, { run: e.run }),
    /* @__PURE__ */ t("div", { className: y.section, children: /* @__PURE__ */ t(Ta, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(c_, { reason: Kw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function c0(e) {
  return Gw(e) ? /* @__PURE__ */ t(h_, { ...e }) : /* @__PURE__ */ t(u_, { ...e });
}
const m_ = "_list_142ip_3", w_ = "_row_142ip_9", __ = "_condition_142ip_18", f_ = "_action_142ip_24", ca = {
  list: m_,
  row: w_,
  condition: __,
  action: f_
}, Qt = He(!1);
function d0({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(Qt.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ca.list, "aria-label": a, children: e }) });
}
function u0({ rule: e }) {
  if (!je(Qt)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ca.row, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ t("span", { className: ca.condition, children: e.when }),
    /* @__PURE__ */ t(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ t("span", { className: ca.action, children: e.then })
  ] });
}
function Da(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function Zt(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function en(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function Nt(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function v_(e) {
  return e === "up" ? "down" : "up";
}
function b_(e, a) {
  const n = Nt(e, a.id, a.direction) ?? Nt(e, a.id, v_(a.direction));
  n == null || n.focus();
}
function an() {
  const e = g(null), [a, n] = p(null), [r, l] = p("");
  return I(() => {
    e.current !== null && a !== null && b_(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function tn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function fa({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const p_ = "_body_1h15q_2", g_ = "_title_1h15q_8", N_ = "_section_1h15q_13", y_ = "_legend_1h15q_18", k_ = "_stages_1h15q_26", $_ = "_stage_1h15q_26", C_ = "_stageIndex_1h15q_44", S_ = "_stageName_1h15q_50", R_ = "_footer_1h15q_59", T_ = "_note_1h15q_66", L_ = "_reason_1h15q_71", E_ = "_actions_1h15q_76", x_ = "_webHead_1h15q_83", A_ = "_kicker_1h15q_92", I_ = "_webTitle_1h15q_99", M_ = "_webBody_1h15q_105", q_ = "_webSection_1h15q_109", P_ = "_sectionHead_1h15q_121", B_ = "_sectionNote_1h15q_129", O_ = "_formLabel_1h15q_134", D_ = "_identityRow_1h15q_139", j_ = "_nameCell_1h15q_145", H_ = "_keyCell_1h15q_150", F_ = "_colourCell_1h15q_154", W_ = "_colourStatus_1h15q_161", z_ = "_webStages_1h15q_166", G_ = "_webStageList_1h15q_172", U_ = "_webStage_1h15q_166", K_ = "_webIndex_1h15q_191", V_ = "_webStageName_1h15q_196", Y_ = "_webMoves_1h15q_201", X_ = "_addStage_1h15q_215", J_ = "_addStageButton_1h15q_223", Q_ = "_addStageNote_1h15q_231", Z_ = "_webFooter_1h15q_236", ef = "_webFooterNotes_1h15q_244", af = "_webNote_1h15q_251", w = {
  body: p_,
  title: g_,
  section: N_,
  legend: y_,
  stages: k_,
  stage: $_,
  stageIndex: C_,
  stageName: S_,
  footer: R_,
  note: T_,
  reason: L_,
  actions: E_,
  webHead: x_,
  kicker: A_,
  webTitle: I_,
  webBody: M_,
  webSection: q_,
  sectionHead: P_,
  sectionNote: B_,
  formLabel: O_,
  identityRow: D_,
  nameCell: j_,
  keyCell: H_,
  colourCell: F_,
  colourStatus: W_,
  webStages: z_,
  webStageList: G_,
  webStage: U_,
  webIndex: K_,
  webStageName: V_,
  webMoves: Y_,
  addStage: X_,
  addStageButton: J_,
  addStageNote: Q_,
  webFooter: Z_,
  webFooterNotes: ef,
  webNote: af
}, tf = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], nn = "not in catalogue";
function nf(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${nn}` }, ...n];
}
function rf({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(A, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${nn}`;
  return /* @__PURE__ */ t(A, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: nf(n, e.name), invalid: i, onChange: r });
}
function rn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function lf(e) {
  const a = g([]), n = g(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function of({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = rn(a, n), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: w.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: w.webStageName, children: /* @__PURE__ */ t(rf, { stage: a, index: n, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ t(A, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: tf, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(fa, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(fa, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function sf({ stages: e, onChange: a, catalogue: n }) {
  const r = lf(e.length), l = an(), i = (c, u) => {
    const d = Zt(c, u);
    r.current = Da(r.current, c, d), l.moved({ id: r.current[d], direction: u }, en(rn(e[c], c), d, e.length)), a(Da(e, c, d));
  }, s = (c, u) => a(e.map((d, h) => h === c ? u : d));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, u) => /* @__PURE__ */ t(of, { id: r.current[u], stage: c, index: u, total: e.length, catalogue: n, onReplace: (d) => s(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ t(tn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const cf = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], df = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], uf = "A new stream starts as a draft. Nothing runs on it until you publish it.", hf = "Create is disabled: name the stream and give it a key first.", mf = "reorder with the ↑ ↓ buttons · min 2";
function Qa(e, a) {
  return !e.reserved && ka(e.step) && a[e.step] === void 0;
}
function wf(e, a) {
  const n = e.find((r) => Qa(r, a));
  return n ? n.step : 1;
}
function _f({ stages: e, onMove: a }) {
  const n = an(), r = (l, i) => {
    const s = Zt(l, i);
    n.moved({ id: e[l].id, direction: i }, en(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ t(fa, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(fa, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(tn, { text: n.announcement })
  ] });
}
function ff({ reason: e, onCreate: a, onDraft: n }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ t("p", { className: w.note, children: uf }),
    e && /* @__PURE__ */ t("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ t(_, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function vf(e, a) {
  return e !== "" && a !== "" ? null : hf;
}
function bf(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = df, onCreate: i, onDraft: s, onClose: c, returnFocusTo: u } = e, d = $(), [h, f] = p(""), [v, N] = p(""), [E, q] = p(a[0].value), [oe, Ce] = p(() => wf(n, r)), [te, Fe] = p(e.stages ?? cf), [We, C] = p(l[0].value), z = { name: h, key: v, streamStep: oe, owner: E, stages: te, policy: We }, ve = vf(h, v);
  return /* @__PURE__ */ t(na, { kind: "modal", labelledBy: d, onClose: c, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ t("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ t("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ t(A, { kind: "input", label: "Stream name", value: h, onChange: f }),
      /* @__PURE__ */ t(A, { kind: "input", label: "Key", value: v, onChange: N, mono: !0 }),
      /* @__PURE__ */ t(A, { kind: "select", label: "Owner", value: E, onChange: q, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ t("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ t(Vt, { label: "Stream colour", steps: n, value: oe, onChange: Ce, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ t("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ t(_f, { stages: te, onMove: (Ae, En) => Fe(Da(te, Ae, En)) })
    ] }),
    /* @__PURE__ */ t(Dt, { legend: "Loop policy", options: l, value: We, onChange: C }),
    /* @__PURE__ */ t(ff, { reason: ve, onCreate: () => i(z), onDraft: () => s(z) })
  ] }) });
}
const ln = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], pf = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function gf(e, a, n, r, l, i) {
  var c;
  const s = ((c = ln.find((u) => u.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function Nf(e, a) {
  return yf(e) && kf(e, a) && $f(e);
}
function yf(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function kf(e, a) {
  return e.colourStep === null || Qa({ step: e.colourStep }, a);
}
function $f(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Cf(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : Qa({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Sf({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Rf({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ t(Sf, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: w.reason, children: pf })
    ] }),
    l && /* @__PURE__ */ t(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Tf({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ t("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function Lf({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: w.webSection, children: [
    /* @__PURE__ */ t("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: w.identityRow, children: [
      /* @__PURE__ */ t("div", { className: w.nameCell, children: /* @__PURE__ */ t(A, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ t("div", { className: w.keyCell, children: /* @__PURE__ */ t(A, { variant: "form", label: "Key", value: n, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function Ef(e) {
  const a = $(), n = $(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [u, d] = p(e.owners[0] ?? ""), [h, f] = p(null), [v, N] = p("relay"), [E, q] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = gf(l, s, u, h, v, E), Ce = Nf(oe, r), te = E.find((C) => C.kind === "agent" && C.name.trim() !== ""), Fe = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ t("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Vt, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: f, takenBy: r })
  ] }), We = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("p", { className: w.colourStatus, "data-colour-status": "", children: Cf(h, r) }),
    /* @__PURE__ */ t(A, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((C) => ({ value: C, label: C })), onChange: d })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(Tf, { titleId: n }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ t(Lf, { name: l, setName: i, streamKey: s, setKey: c, colour: Fe, owner: We }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: w.sectionNote, children: mf })
        ] }),
        /* @__PURE__ */ t(sf, { stages: E, onChange: q })
      ] }),
      /* @__PURE__ */ t("section", { className: w.webSection, children: /* @__PURE__ */ t(Dt, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: v, options: ln, onChange: N }) }),
      /* @__PURE__ */ t(Rf, { ready: Ce, draft: oe, agentStage: te, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function h0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Ef, { ...e }) : /* @__PURE__ */ t(bf, { ...e });
}
const xf = "_row_bs8hc_2", Af = "_cell_bs8hc_6", If = "_condition_bs8hc_11", Mf = "_action_bs8hc_18", qf = "_contract_bs8hc_24", Pf = "_contractCondition_bs8hc_33", Bf = "_contractAction_bs8hc_39", Q = {
  row: xf,
  cell: Af,
  condition: If,
  action: Mf,
  contract: qf,
  contractCondition: Pf,
  contractAction: Bf
}, on = ["advance", "block", "escalate", "requestReview"], yt = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function va(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Za(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Q.action, children: yt[e.then] }) : /* @__PURE__ */ t(
    A,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: on.map((l) => ({ value: l, label: yt[l] }))
    }
  );
}
function Of({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t("span", { className: Q.condition, title: va(e, r), children: va(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: Za(e, a, n) })
  ] });
}
function Df({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ t(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ t("span", { className: Q.condition, children: va(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: Za(e, a, n) })
  ] });
}
function jf({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ t("span", { className: Q.contractCondition, children: va(e, r) }),
    /* @__PURE__ */ t(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ t("span", { className: Q.contractAction, children: Za(e, a, n, !0) })
  ] });
}
const Hf = { two: Df, four: Of, contract: jf };
function m0(e) {
  var n;
  if (!on.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Hf[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Ff = "_column_1tf9e_2", Wf = "_head_1tf9e_17", zf = "_index_1tf9e_23", Gf = "_name_1tf9e_29", Uf = "_meta_1tf9e_38", Kf = "_mono_1tf9e_43", Vf = "_gate_1tf9e_50", Yf = "_reviewersLabel_1tf9e_57", Xf = "_reviewers_1tf9e_57", Jf = "_reviewer_1tf9e_57", Qf = "_agents_1tf9e_74", Zf = "_workflowColumn_1tf9e_79", ev = "_workflowHead_1tf9e_96", av = "_stageRow_1tf9e_102", tv = "_stageLabel_1tf9e_109", nv = "_workflowTitle_1tf9e_116", rv = "_workflowMeta_1tf9e_122", lv = "_workflowGate_1tf9e_127", ov = "_gateNote_1tf9e_135", iv = "_cardNote_1tf9e_140", sv = "_reviewerList_1tf9e_145", cv = "_reviewerRow_1tf9e_151", dv = "_reviewerMark_1tf9e_157", uv = "_reviewerName_1tf9e_167", hv = "_terminalCard_1tf9e_173", mv = "_terminalCount_1tf9e_182", wv = "_workflowAgents_1tf9e_188", _v = "_mount_1tf9e_194", k = {
  column: Ff,
  head: Wf,
  index: zf,
  name: Gf,
  meta: Uf,
  mono: Kf,
  gate: Vf,
  reviewersLabel: Yf,
  reviewers: Xf,
  reviewer: Jf,
  agents: Qf,
  workflowColumn: Zf,
  workflowHead: ev,
  stageRow: av,
  stageLabel: tv,
  workflowTitle: nv,
  workflowMeta: rv,
  workflowGate: lv,
  gateNote: ov,
  cardNote: iv,
  reviewerList: sv,
  reviewerRow: cv,
  reviewerMark: dv,
  reviewerName: uv,
  terminalCard: hv,
  terminalCount: mv,
  workflowAgents: wv,
  mount: _v
}, fv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function et(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function sn(e) {
  return `${Math.round(e * 100)}%`;
}
function vv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: k.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: k.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: k.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Ca, { cells: [
      { value: sn(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function bv({ stage: e }) {
  return /* @__PURE__ */ t(Ca, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: et(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function pv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: k.head, children: [
    /* @__PURE__ */ t("span", { className: k.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: k.name, id: a, children: e.name }),
    /* @__PURE__ */ t(m, { role: e.kind === "gate" ? "gate" : "soft", label: fv[e.kind] })
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
function Nv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(vv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(bv, { stage: e }) : null;
}
function yv({ onMount: e }) {
  return e ? /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function kv({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: k.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(pv, { stage: e, titleId: l }),
    /* @__PURE__ */ t(gv, { stage: e }),
    /* @__PURE__ */ t(Nv, { stage: e }),
    /* @__PURE__ */ t("div", { className: k.agents, children: a.map((s) => /* @__PURE__ */ t(Tm, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(yv, { onMount: n })
  ] });
}
const $v = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function Cv({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: k.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: k.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: k.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: k.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function Sv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: k.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(Cv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: k.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: sn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Rv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Tv({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: k.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: k.terminalCount, children: et(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: k.cardNote, children: Rv(e.rolledBackThisWeek) })
  ] });
}
function Lv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Ev(e) {
  if (e.kind === "terminal") return `${et(e.closedThisWeek)} this week`;
  const a = Lv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function xv({ stage: e, titleId: a }) {
  const n = $v[e.kind];
  return /* @__PURE__ */ o("header", { className: k.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: k.stageRow, children: [
      /* @__PURE__ */ o("span", { className: k.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(m, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: k.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: k.workflowMeta, children: Ev(e) })
  ] });
}
function Av(e) {
  return e === "entry" || e === "agent";
}
function Iv({ stage: e, onMount: a }) {
  return a === void 0 || !Av(e.kind) ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", className: k.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Mv({ stage: e, agentCards: a, onMount: n }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: k.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(xv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Sv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(Tv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: k.workflowAgents, children: a }),
    /* @__PURE__ */ t(Iv, { stage: e, onMount: n })
  ] });
}
function qv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function w0(e) {
  return qv(e) ? /* @__PURE__ */ t(Mv, { ...e }) : /* @__PURE__ */ t(kv, { ...e });
}
const Pv = "_row_1jw40_6", Bv = "_name_1jw40_12", Ov = "_compactRow_1jw40_13", Dv = "_compactName_1jw40_13", jv = "_cell_1jw40_30", Hv = "_chain_1jw40_45", Fv = "_owner_1jw40_51", Wv = "_mono_1jw40_57", zv = "_compactCell_1jw40_79", Gv = "_stack_1jw40_96", Uv = "_stat_1jw40_103", Kv = "_identityLine_1jw40_110", Vv = "_identity_1jw40_110", Yv = "_ownerLine_1jw40_137", Xv = "_link_1jw40_150", Jv = "_gateMark_1jw40_156", Qv = "_emptyChain_1jw40_161", Zv = "_arrow_1jw40_167", eb = "_muted_1jw40_168", ab = "_define_1jw40_173", tb = "_statValue_1jw40_180", nb = "_policyId_1jw40_186", rb = "_sub_1jw40_191", b = {
  row: Pv,
  name: Bv,
  compactRow: Ov,
  compactName: Dv,
  cell: jv,
  chain: Hv,
  owner: Fv,
  mono: Wv,
  compactCell: zv,
  stack: Gv,
  stat: Uv,
  identityLine: Kv,
  identity: Vv,
  ownerLine: Yv,
  link: Xv,
  gateMark: Jv,
  emptyChain: Qv,
  arrow: Zv,
  muted: eb,
  define: ab,
  statValue: tb,
  policyId: nb,
  sub: rb
};
function cn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function lb(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function ob(e) {
  return e === void 0 ? b.compactRow : `${b.compactRow} ${e}`;
}
function dn(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function ib(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${dn(e.members)}`;
}
function sb(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: b.compactCell, children: /* @__PURE__ */ o("span", { className: b.stack, children: [
    /* @__PURE__ */ o("span", { className: b.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${b.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${b.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(m, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: b.ownerLine, children: ib(e) })
  ] }) });
}
function un({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ t("span", { className: b.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(m, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function cb(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ta(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function db({ stages: e, streamStep: a }) {
  const n = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ t("span", { className: `${b.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: b.link, children: [
    l === 0 ? null : /* @__PURE__ */ t("span", { className: b.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ t(un, { name: r.name, gate: r.gate === !0, look: cb(l, n, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function ub(e) {
  return /* @__PURE__ */ t("td", { className: b.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: b.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: b.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: b.define, children: "Define workflow" })
  ] }) : db(e) });
}
function hn(e) {
  return e === void 0 ? void 0 : !0;
}
function kt(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: b.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: b.muted, children: n }) : /* @__PURE__ */ o("span", { className: b.stat, children: [
    /* @__PURE__ */ t("span", { className: `${b.statValue} ward-stat-value`, title: r, "data-raised": hn(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: b.sub, children: a })
  ] }) });
}
function hb(e) {
  return /* @__PURE__ */ t("td", { className: b.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: b.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: b.stat, children: [
    /* @__PURE__ */ t("span", { className: b.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: b.sub, children: e.summary })
  ] }) });
}
function mb(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function wb({ stream: e, href: a, presentation: n }) {
  const r = ob(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: cn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": fe(e.streamStep, "chip") }, children: [
    sb(e, a),
    ub(e),
    kt(mb(e.agents), e.agents === void 0 ? void 0 : lb(e.agents), "—"),
    hb(e.policy),
    kt(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function _b(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function _0(e) {
  if (_b(e)) return wb(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: b.row, onClick: cn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: b.cell, children: [
      /* @__PURE__ */ t("a", { className: `${b.name} ward-target`, href: W(n), children: a.name }),
      /* @__PURE__ */ t(m, { ...$a(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ t("td", { className: b.cell, children: /* @__PURE__ */ t("span", { className: b.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: b.link, children: /* @__PURE__ */ t(un, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ t("td", { className: b.cell, children: /* @__PURE__ */ o("span", { className: b.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: b.cell, children: [
      /* @__PURE__ */ t("span", { className: b.owner, children: a.owner }),
      /* @__PURE__ */ t("span", { className: b.mono, children: dn(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: b.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: b.mono, title: a.inFlightHint, "data-raised": hn(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: b.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: b.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const fb = "_row_mdce7_2", vb = "_name_mdce7_16", bb = "_scope_mdce7_24", ba = {
  row: fb,
  name: vb,
  scope: bb
};
function pb(e) {
  return e === void 0 ? `${ba.row} ward-toolrow` : `${ba.row} ward-toolrow ${e}`;
}
function gb(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Nb({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
  return /* @__PURE__ */ t(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: n.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? a : void 0,
      onChange: (i) => {
        r.locked || l(i.target.checked);
      }
    }
  );
}
function yb({ classification: e }) {
  return /* @__PURE__ */ t(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function kb({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${ba.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function $b(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function f0({ tool: e, onChange: a, presentation: n }) {
  const r = $(), l = $(), i = gb(e, n), s = $b(n);
  return /* @__PURE__ */ o(s, { className: pb(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Nb, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${ba.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(kb, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(yb, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Cb = "_strip_1qtlf_2", Sb = "_head_1qtlf_10", Rb = "_name_1qtlf_16", Tb = "_chart_1qtlf_24", Lb = "_segment_1qtlf_30", Eb = "_detailedChart_1qtlf_36", xb = "_rail_1qtlf_49", Ab = "_section_1qtlf_55", Ib = "_label_1qtlf_66", Mb = "_note_1qtlf_83", ee = {
  strip: Cb,
  head: Sb,
  name: Rb,
  chart: Tb,
  segment: Lb,
  detailedChart: Eb,
  rail: xb,
  section: Ab,
  label: Ib,
  note: Mb
}, qb = "No item in flight to preview.", Pb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Bb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", ja = [1, 2, 3, 4, 5, 6], pa = 100;
function Ob(e, a) {
  return a.has(e) ? fe(e, "id") : "var(--ward-color-line)";
}
function Db({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: ja.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: ee.segment,
      x: l * pa,
      y: "0",
      width: pa,
      height: "8",
      fill: Ob(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function jb(e) {
  const a = e.slice(0, ja.length);
  for (; a.length < ja.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Hb({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${ee.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, n) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(n * pa),
        y: "0",
        width: String(pa),
        height: "40",
        style: { fill: fe(a.streamStep, "chip") }
      },
      a.key + String(n)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((a, n) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(n))) })
  ] });
}
function mn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function oa({ label: e, children: a }) {
  const n = $();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: ee.label, children: e }),
    a
  ] });
}
function Fb({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: ee.note, children: a ?? qb }) : /* @__PURE__ */ t(Ra, { item: { ...e, streamStep: ta(n.streamStep) }, onOpen: mn(r), feed: null });
}
function Wb({ draft: e }) {
  const a = { "--stream": fe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ t(xe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ t(m, { ...$a(e.key, e.streamStep) })
  ] });
}
function zb(e) {
  const a = jb(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(oa, { label: "Board card", children: /* @__PURE__ */ t(Fb, { ...e, draft: n }) }),
    /* @__PURE__ */ t(oa, { label: "Streams index row", children: /* @__PURE__ */ t(Wb, { draft: n }) }),
    /* @__PURE__ */ o(oa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Hb, { identities: a }),
      /* @__PURE__ */ t("p", { className: ee.note, children: Pb })
    ] }),
    /* @__PURE__ */ t(oa, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: ee.note, children: Bb }) })
  ] });
}
function Gb({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": fe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ t(xe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ t(m, { ...$a(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t(Ra, { item: { ...a, streamStep: e.streamStep }, onOpen: mn(r) }),
    /* @__PURE__ */ t(Db, { draft: e, streams: n })
  ] });
}
function v0(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(zb, { ...e }) : /* @__PURE__ */ t(Gb, { ...e });
}
const Ub = "_row_ixlg5_6", Kb = "_headCell_ixlg5_10", Vb = "_cell_ixlg5_11", Yb = "_name_ixlg5_23", Xb = "_consequence_ixlg5_29", Jb = "_governed_ixlg5_36", Qb = "_control_ixlg5_42", Zb = "_byRole_ixlg5_48", ep = "_webControl_ixlg5_59", ap = "_webConsequence_ixlg5_65", tp = "_webGoverned_ixlg5_71", j = {
  row: Ub,
  headCell: Kb,
  cell: Vb,
  name: Yb,
  consequence: Xb,
  governed: Jb,
  control: Qb,
  byRole: Zb,
  webControl: ep,
  webConsequence: ap,
  webGoverned: tp
};
function np({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: j.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: j.control, children: [
    /* @__PURE__ */ t(
      De,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => n(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ t(m, { role: "running", label: "PILOT" })
  ] });
}
function rp({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: j.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: j.headCell, children: [
      /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: j.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: j.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: j.cell, children: /* @__PURE__ */ t(np, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function lp(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function op({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${j.webControl} ${j.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    De,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${j.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(m, { role: "running", label: "PILOT" }),
    r
  ] });
}
function ip({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: j.row, children: [
    /* @__PURE__ */ o("td", { className: j.cell, children: [
      /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${j.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: j.cell, children: /* @__PURE__ */ t(op, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: j.cell, children: /* @__PURE__ */ t("span", { className: `${j.webGoverned} ward-cellmeta`, children: lp(e) }) })
  ] });
}
function b0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(ip, { ...e }) : /* @__PURE__ */ t(rp, { ...e });
}
const sp = "_row_vv64h_2", cp = "_cell_vv64h_6", dp = "_name_vv64h_25", up = "_note_vv64h_30", hp = "_webName_vv64h_41", mp = "_webMeta_vv64h_47", K = {
  row: sp,
  cell: cp,
  name: dp,
  note: up,
  webName: hp,
  webMeta: mp
}, wn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function wp(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function _p({ component: e, onRestart: a }) {
  const n = $(), r = wn[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ t("td", { className: K.cell, children: /* @__PURE__ */ t("span", { className: K.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: K.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: K.cell, children: /* @__PURE__ */ t(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: K.cell, children: /* @__PURE__ */ t("span", { id: n, className: K.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: K.cell, "data-align": "end", children: l ? /* @__PURE__ */ t(_, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function fp({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: wp(e.state) });
}
function vp({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ t("td", { className: K.cell, children: /* @__PURE__ */ t("span", { className: `${K.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: K.cell, children: /* @__PURE__ */ t("span", { className: `${K.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: K.cell, children: /* @__PURE__ */ t(m, { ...wn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: K.cell, children: /* @__PURE__ */ t(fp, { component: e, onRestart: a }) })
  ] });
}
function p0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(vp, { ...e }) : /* @__PURE__ */ t(_p, { ...e });
}
const bp = "_row_1f1gp_7", pp = "_cell_1f1gp_11", gp = "_next_1f1gp_28", Np = "_headCell_1f1gp_38", yp = "_webId_1f1gp_77", kp = "_webPurpose_1f1gp_83", $p = "_webMeta_1f1gp_91", Cp = "_webUrgent_1f1gp_97", H = {
  row: bp,
  cell: pp,
  next: gp,
  headCell: Np,
  webId: yp,
  webPurpose: kp,
  webMeta: $p,
  webUrgent: Cp
}, Sp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Rp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, _n = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Tp = Object.fromEntries(_n.map((e) => [e.key, e]));
function Ge({ column: e, children: a }) {
  const n = Tp[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: H.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function g0() {
  return /* @__PURE__ */ t("tr", { children: _n.map((e) => /* @__PURE__ */ t(
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
function Lp({ cred: e }) {
  const a = Sp[e.state];
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ t(Ge, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Ge, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Ge, { column: "state", children: /* @__PURE__ */ t(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Ge, { column: "cls", children: /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ t(Ge, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Ge, { column: "next", children: /* @__PURE__ */ t("span", { className: H.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Ep({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${H.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${H.webMeta} ${H.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function xp({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t("span", { className: `${H.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t("span", { className: `${H.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t("span", { className: `${H.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(Ep, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(m, { ...Rp[e.state] }) })
  ] });
}
function N0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(xp, { ...e }) : /* @__PURE__ */ t(Lp, { ...e });
}
const Ap = "_card_17zba_2", Ip = "_head_17zba_11", Mp = "_env_17zba_18", qp = "_version_17zba_25", Pp = "_meta_17zba_32", Bp = "_webCard_17zba_37", Op = "_webRow_17zba_47", Dp = "_webTitle_17zba_55", jp = "_webLine_17zba_65", Hp = "_webVersion_17zba_72", Fp = "_webMeta_17zba_77", U = {
  card: Ap,
  head: Ip,
  env: Mp,
  version: qp,
  meta: Pp,
  webCard: Bp,
  webRow: Op,
  webTitle: Dp,
  webLine: jp,
  webVersion: Hp,
  webMeta: Fp
}, fn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Wp({ env: e }) {
  const a = fn[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: U.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ o("div", { className: U.head, children: [
      /* @__PURE__ */ t("span", { className: U.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ t(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ t("p", { className: U.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: U.meta, children: [
      "deployed ",
      ce(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ t("p", { className: U.meta, children: n })
  ] });
}
function zp(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ce(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function Gp(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(m, { ...fn[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: zp(e) })
  ] });
}
function y0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Gp, { ...e }) : /* @__PURE__ */ t(Wp, { ...e });
}
const Up = "_panel_1hmja_2", Kp = "_line_1hmja_8", Vp = "_actions_1hmja_14", ia = {
  panel: Up,
  line: Kp,
  actions: Vp
};
function k0(e) {
  return /* @__PURE__ */ o("div", { className: ia.panel, children: [
    /* @__PURE__ */ t("p", { className: ia.line, children: e.status }),
    /* @__PURE__ */ t(A, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: ia.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: ia.line, children: e.note ?? "" })
  ] });
}
const Yp = "_upload_1vgt7_2", Xp = "_preview_1vgt7_7", Jp = "_mark_1vgt7_17", Qp = "_empty_1vgt7_22", Zp = "_actions_1vgt7_28", eg = "_input_1vgt7_33", ag = "_reasons_1vgt7_41", tg = "_reason_1vgt7_41", ng = "_accepted_1vgt7_57", ne = {
  upload: Yp,
  preview: Xp,
  mark: Jp,
  empty: Qp,
  actions: Zp,
  input: eg,
  reasons: ag,
  reason: tg,
  accepted: ng
}, vn = 1.5, bn = 22, ga = "script elements or event handlers", Re = "links or external references", ke = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${vn}px at ${bn}px`], rg = [ke[1], ke[2], ga, Re], lg = /* @__PURE__ */ new Map([
  ["image", ke[1]],
  ["text", ke[2]],
  ["tspan", ke[2]],
  ["textPath", ke[2]],
  ["script", ga],
  ["foreignObject", ga],
  ["a", Re],
  ["use", Re],
  ["style", Re],
  ["feImage", Re],
  ["set", Re]
]), og = "http://www.w3.org/2000/svg", ig = "http://www.w3.org/2000/xmlns/", sg = /* @__PURE__ */ new Set([
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
]), cg = /* @__PURE__ */ new Set([
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
]), at = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, dg = /url\s*\(|['"\\]/i;
function ug() {
  return { ok: !1, reasons: [ke[1]] };
}
function pn(e) {
  return e.namespaceURI === og;
}
function hg(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && pn(a) ? a : null;
  } catch {
    return null;
  }
}
function mg(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [ke[0]] : [];
}
function wg(e) {
  return lg.get(e.localName) ?? (e.localName.startsWith("animate") ? Re : void 0);
}
function _g(e) {
  return dg.test(e.replace(at, ""));
}
function fg(e) {
  return /^on/i.test(e.localName) ? ga : e.localName === "href" || _g(e.value) ? Re : void 0;
}
function vg(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(wg(n));
    for (const r of Array.from(n.attributes)) a.add(fg(r));
  }
  return rg.filter((n) => a.has(n));
}
function bg(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? bn / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < vn;
  }) ? [ke[3]] : [];
}
function pg(e) {
  if (e.namespaceURI === ig) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (cg.has(a) || a.startsWith("stroke"));
}
function gg(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && pn(a) && sg.has(a.localName);
}
function Ng(e, a) {
  gg(a) ? a.nodeType === Node.ELEMENT_NODE && gn(a) : e.removeChild(a);
}
function gn(e) {
  for (const a of Array.from(e.attributes)) pg(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) Ng(e, a);
  return e;
}
function yg(e) {
  return Array.from(e.matchAll(at), (a) => a[2]).filter((a) => a !== "");
}
function kg(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function $g(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of yg(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function Cg(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(at, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function Sg(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = $g(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), Cg(l, r);
  }
  return e;
}
function $0(e) {
  const a = hg(e);
  if (a === null) return ug();
  const n = [...mg(a), ...vg(a), ...bg(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(Sg(gn(a), kg(e))) };
}
const Rg = "Mark accepted.", Tg = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Lg = new Set(At.flatMap((e) => [fe(e, "id"), fe(e, "chip")]));
function Eg(e) {
  return e !== void 0 && (Tg.test(e) || Lg.has(e)) ? e : void 0;
}
function xg({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: ne.preview, style: { "--mark": Eg(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: ne.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: ne.empty }) });
}
function Ag(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function Ig(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Mg({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: ne.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("p", { className: ne.accepted, children: Rg }) }) : /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("ul", { className: ne.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: ne.reason, children: a }, a)) }) });
}
function qg({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(Mg, { result: e }) : /* @__PURE__ */ t("p", { className: `${ne.result} ${Ag(e, n)}`, role: "status", children: Ig(e, n) });
}
function $t(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function C0({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = g(null), [s, c] = p(null), u = (d) => {
    if (d === void 0) return;
    const h = a(d);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ o("div", { className: ne.upload, children: [
    /* @__PURE__ */ t(xg, { current: e }),
    /* @__PURE__ */ o("div", { className: ne.actions, children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: i,
          className: ne.input,
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
      /* @__PURE__ */ t(_, { ...$t(l), onClick: () => {
        var d;
        return (d = i.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(_, { ...$t(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(qg, { result: s, presentation: r })
  ] });
}
const Pg = "_row_1wp9s_7", Bg = "_cell_1wp9s_11", Og = "_head_1wp9s_28", Dg = "_name_1wp9s_34", jg = "_pinned_1wp9s_42", Hg = "_headCell_1wp9s_49", Fg = "_webName_1wp9s_88", Wg = "_webMeta_1wp9s_95", zg = "_webWarn_1wp9s_103", P = {
  row: Pg,
  cell: Bg,
  head: Og,
  name: Dg,
  pinned: jg,
  headCell: Hg,
  webName: Fg,
  webMeta: Wg,
  webWarn: zg
}, tt = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, Nn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Gg = Object.fromEntries(Nn.map((e) => [e.key, e]));
function Ug(e, a) {
  return `mcp.${e}.${a}`;
}
function Kg(e) {
  return Object.keys(tt).includes(e);
}
function Vg(e) {
  return tt[e !== void 0 && Kg(e) ? e : "unknown"];
}
function Xe({ column: e, children: a }) {
  const n = Gg[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: P.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function S0() {
  return /* @__PURE__ */ t("tr", { children: Nn.map((e) => /* @__PURE__ */ t(
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
function Yg({ server: e }) {
  const a = tt[e.connection];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o(Xe, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: P.head, children: [
        /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
        /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: P.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(Xe, { column: "connection", children: /* @__PURE__ */ t(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Xe, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(Xe, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(Xe, { column: "tools", children: e.tools.map((n) => Ug(e.name, n)).join(" · ") })
  ] });
}
function Xg(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Jg(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Qg({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function Zg({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function eN({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function aN({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: Xg(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(m, { ...Jg(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(Qg, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(m, { ...Vg(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t(Zg, { server: e, onRestart: a }),
      /* @__PURE__ */ t(eN, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function R0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(aN, { ...e }) : /* @__PURE__ */ t(Yg, { ...e });
}
const tN = "_row_160my_2", nN = "_headCell_160my_14", rN = "_cell_160my_15", lN = "_name_160my_26", oN = "_consequence_160my_32", iN = "_reason_160my_38", sN = "_value_160my_44", cN = "_webRow_160my_60", dN = "_webSetting_160my_71", uN = "_webName_160my_79", hN = "_webConsequence_160my_87", mN = "_webControl_160my_93", wN = "_webState_160my_107", _N = "_webChip_160my_112", x = {
  row: tN,
  headCell: nN,
  cell: rN,
  name: lN,
  consequence: oN,
  reason: iN,
  value: sN,
  webRow: cN,
  webSetting: dN,
  webName: uN,
  webConsequence: hN,
  webControl: mN,
  webState: wN,
  webChip: _N
}, yn = 104, kn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function fN({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(De, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Bt, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: x.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function vN({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = kn[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: x.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: x.headCell, children: [
      /* @__PURE__ */ t("span", { className: x.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: x.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: x.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: x.cell, children: /* @__PURE__ */ t(fN, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: x.cell, style: { width: yn }, children: /* @__PURE__ */ t(m, { role: i.role, label: i.label }) })
  ] });
}
function $n(e, a) {
  return String(e ?? a);
}
function bN(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function pN(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? $n(e.value, "—");
}
function gN({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: x.webControl, children: [
    /* @__PURE__ */ t(De, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: x.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function NN(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(gN, { ...e });
  const l = bN(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: x.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Bt, { options: l, value: $n(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${x.webControl} ${x.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: pN(a) });
}
function yN({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = $(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${x.row} ${x.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: x.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${x.name} ${x.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${x.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: x.webControl, children: i(s) }) : /* @__PURE__ */ t(NN, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${x.webChip} ward-policy-chip`, style: { width: yn }, children: /* @__PURE__ */ t(m, { ...kn[n], size: "tag" }) })
  ] });
}
function T0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(yN, { ...e }) : /* @__PURE__ */ t(vN, { ...e });
}
const kN = "_label_1o9za_7", $N = "_name_1o9za_15", CN = "_column_1o9za_24", SN = "_webFrame_1o9za_57", RN = "_webHead_1o9za_62", TN = "_webHeadLabel_1o9za_74", LN = "_webLabel_1o9za_112", EN = "_webColumns_1o9za_119", xN = "_webGroup_1o9za_125", AN = "_webPeople_1o9za_126", IN = "_webVia_1o9za_127", MN = "_webMeta_1o9za_156", F = {
  label: kN,
  name: $N,
  column: CN,
  webFrame: SN,
  webHead: RN,
  webHeadLabel: TN,
  webLabel: LN,
  webColumns: EN,
  webGroup: xN,
  webPeople: AN,
  webVia: IN,
  webMeta: MN
}, qN = {
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
  return /* @__PURE__ */ t(
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
function PN(e) {
  if (!e.matrixRole) return;
  const a = qN[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function BN({ node: e }) {
  const a = PN(e);
  return /* @__PURE__ */ o("span", { className: F.label, children: [
    /* @__PURE__ */ t("span", { className: F.name, children: e.name }),
    /* @__PURE__ */ t(ON, { role: a, node: e }),
    /* @__PURE__ */ t(Ma, { column: Ia[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ma, { column: Ia[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ t(Ma, { column: Ia[2], children: e.requestedVia ?? "" })
  ] });
}
function ON({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ t(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ t(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function DN({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    Ft,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(BN, { node: n }),
      children: s
    }
  );
}
function qa({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function jN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(qa, { className: `${F.webMeta} ${F.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(qa, { className: `${F.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(qa, { className: `${F.webMeta} ${F.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function HN() {
  return /* @__PURE__ */ o("div", { className: F.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: F.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: F.webColumns, children: [
      /* @__PURE__ */ t("span", { className: F.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: F.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: F.webVia, children: "Requested via" })
    ] })
  ] });
}
function FN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function WN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function zN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: F.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(HN, {}),
    /* @__PURE__ */ t(Lc, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      Ft,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(FN, { row: n }),
        detail: /* @__PURE__ */ t(jN, { row: n }),
        expanded: WN(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function L0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(zN, { ...e }) : /* @__PURE__ */ t(DN, { ...e });
}
const GN = "_runbook_b9agc_2", UN = "_list_b9agc_7", KN = "_step_b9agc_15", VN = "_numeral_b9agc_21", YN = "_body_b9agc_28", XN = "_head_b9agc_34", JN = "_title_b9agc_40", QN = "_detail_b9agc_45", ZN = "_actions_b9agc_50", ey = "_webList_b9agc_56", ay = "_webStep_b9agc_60", ty = "_webBody_b9agc_66", ny = "_webTitle_b9agc_74", ry = "_webDetail_b9agc_78", T = {
  runbook: GN,
  list: UN,
  step: KN,
  numeral: VN,
  body: YN,
  head: XN,
  title: JN,
  detail: QN,
  actions: ZN,
  webList: ey,
  webStep: ay,
  webBody: ty,
  webTitle: ny,
  webDetail: ry
}, Cn = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function Sn(e) {
  return String(e + 1).padStart(2, "0");
}
function ly({ step: e, index: a, connection: n }) {
  const r = Cn[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: T.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: T.numeral, children: Sn(a) }),
    /* @__PURE__ */ o("span", { className: T.body, children: [
      /* @__PURE__ */ o("span", { className: T.head, children: [
        /* @__PURE__ */ t("span", { className: T.title, children: e.title }),
        /* @__PURE__ */ t(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ t($e, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ t("span", { className: T.detail, children: e.detail })
    ] })
  ] });
}
function oy({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ t("ol", { className: T.list, children: e.map((r, l) => /* @__PURE__ */ t(ly, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: T.actions, children: a })
  ] });
}
function iy({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${T.step} ${T.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${T.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Sn(a) }),
    /* @__PURE__ */ o("span", { className: `${T.body} ${T.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${T.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${T.title} ${T.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(m, { ...Cn[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t($e, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${T.detail} ${T.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function sy({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${T.list} ${T.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(iy, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${T.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function E0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(sy, { ...e }) : /* @__PURE__ */ t(oy, { ...e });
}
const cy = "_list_1gu6a_2", dy = "_check_1gu6a_10", uy = "_body_1gu6a_16", hy = "_text_1gu6a_23", my = "_pending_1gu6a_32", wy = "_measured_1gu6a_37", Ke = {
  list: cy,
  check: dy,
  body: uy,
  text: hy,
  pending: my,
  measured: wy
};
function _y(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function fy({ check: e }) {
  const a = _y(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Ke.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(Ya, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Ke.body, children: [
      /* @__PURE__ */ t("span", { className: Ke.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Ke.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ t("span", { className: Ke.measured, children: e.measured })
  ] });
}
function x0({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Ke.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(fy, { check: a }, a.text)) });
}
const vy = "_root_khinh_2", by = "_list_khinh_10", py = "_line_khinh_21", gy = "_at_khinh_48", Ny = "_text_khinh_52", yy = "_foot_khinh_56", ky = "_idle_khinh_68", $y = "_caret_khinh_76", Cy = "_jump_khinh_83", me = {
  root: vy,
  list: by,
  line: py,
  at: gy,
  text: Ny,
  foot: yy,
  idle: ky,
  caret: $y,
  jump: Cy
}, Sy = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function nt(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Sy.format(new Date(e));
}
const Ry = { warn: "warning", ok: "ok" };
function Ty({ kind: e }) {
  const a = Ry[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function Ly({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${nt(e)}` });
}
function Ey({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${nt(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: me.idle, children: i }),
    /* @__PURE__ */ t(Ly, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const xy = 8;
function Ay(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > xy;
}
function Iy({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Rn = He(null);
function A0({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Lt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(Rn.Provider, { value: i, children: n });
}
function My() {
  const e = je(Rn), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function I0({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = g(null), [i, s] = p(0), [c, u] = My(), [d, h] = p(!1), f = e.at(-1);
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
    /* @__PURE__ */ t("ol", { className: me.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (N) => h(Ay(N.currentTarget)), children: e.map((N, E) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${N.kind}`, "data-kind": N.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ t("span", { className: me.at, children: nt(N.at) }),
      /* @__PURE__ */ t(Ty, { kind: N.kind }),
      /* @__PURE__ */ t("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: N.text })
    ] }, `${N.at}-${E}`)) }),
    /* @__PURE__ */ o(Ey, { connection: a, idleSince: n, last: f, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": c, onClick: () => u(!c), children: "Read new events" }),
      /* @__PURE__ */ t(Iy, { shown: d, onJump: v })
    ] })
  ] });
}
const qy = "_row_11jhe_2", Py = "_head_11jhe_14", By = "_author_11jhe_20", Oy = "_eta_11jhe_25", Dy = "_edited_11jhe_26", jy = "_body_11jhe_32", Hy = "_reason_11jhe_37", Fy = "_actions_11jhe_42", pe = {
  row: qy,
  head: Py,
  author: By,
  eta: Oy,
  edited: Dy,
  body: jy,
  reason: Hy,
  actions: Fy
}, Wy = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function zy(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function Gy({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: "primary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function Uy({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: pe.reason, id: a, children: e })
  ] });
}
function Ky(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Vy(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(Gy, { ...e }) : /* @__PURE__ */ t(Uy, { reason: e.unavailable, reasonId: e.unavailableId });
}
function M0(e) {
  const { comment: a } = e;
  Ky(e);
  const n = $(), r = `${n}-unavailable`, l = Wy[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${pe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ t("span", { className: pe.author, children: a.author }),
      /* @__PURE__ */ t(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: pe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: pe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: pe.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: pe.reason, id: n, children: zy(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: pe.actions, children: /* @__PURE__ */ t(Vy, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const Yy = "_root_c46wj_2", Xy = "_attach_c46wj_11", Jy = "_actions_c46wj_17", Qy = "_reply_c46wj_23", Zy = "_replyRow_c46wj_28", e1 = "_sendsAs_c46wj_42", Ye = {
  root: Yy,
  attach: Xy,
  actions: Jy,
  reply: Qy,
  replyRow: Zy,
  sendsAs: e1
};
function a1({ placeholder: e, asUser: a, onPost: n }) {
  const [r, l] = p(""), i = $();
  return /* @__PURE__ */ o("div", { className: Ye.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ye.replyRow, children: [
      /* @__PURE__ */ t(A, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ t(_, { variant: "ghost", describedBy: i, onClick: () => n(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ t("p", { id: i, className: Ye.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function q0(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(a1, { ...e }) : /* @__PURE__ */ t(t1, { ...e });
}
function t1({ placeholder: e, asUser: a, attachTo: n, requeueAfter: r, onPost: l, onDraft: i }) {
  const [s, c] = p("");
  return /* @__PURE__ */ o("div", { className: Ye.root, children: [
    /* @__PURE__ */ t(A, { kind: "textarea", label: e, value: s, onChange: c }),
    n && /* @__PURE__ */ o("div", { className: Ye.attach, children: [
      /* @__PURE__ */ t(m, { role: "soft", label: n.label }),
      /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ t(
      qt,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Ye.actions, children: [
      /* @__PURE__ */ t(_, { variant: "primary", onClick: () => l(a, s), children: `Post as ${a}` }),
      i && /* @__PURE__ */ t(_, { variant: "ghost", onClick: () => i(s), children: "Save draft" })
    ] })
  ] });
}
const n1 = "_list_1ih9e_2", r1 = "_item_1ih9e_6", l1 = "_body_1ih9e_22", o1 = "_text_1ih9e_28", i1 = "_evidence_1ih9e_37", s1 = "_consequence_1ih9e_49", c1 = "_note_1ih9e_54", Oe = {
  list: n1,
  item: r1,
  body: l1,
  text: o1,
  evidence: i1,
  consequence: s1,
  note: c1
};
function d1({ criterion: e }) {
  return /* @__PURE__ */ t(xe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Ct({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function u1(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function h1({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Oe.body, children: [
    /* @__PURE__ */ t("span", { className: Oe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ t(Ct, { text: " · " }),
      /* @__PURE__ */ t("code", { className: Oe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ t(Ct, { text: " · " }),
      /* @__PURE__ */ t("span", { className: Oe.consequence, children: u1(e.why) })
    ] })
  ] });
}
function m1({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Oe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(d1, { criterion: e }),
    /* @__PURE__ */ t(h1, { criterion: e })
  ] });
}
function P0({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${Oe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(m1, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: Oe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const w1 = "_list_dwhoz_2", _1 = "_rung_dwhoz_6", f1 = "_name_dwhoz_18", v1 = "_actor_dwhoz_32", da = {
  list: w1,
  rung: _1,
  name: f1,
  actor: v1
}, b1 = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function p1({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = b1[e.state];
  return /* @__PURE__ */ o("li", { className: da.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: da.name, children: e.name }),
    /* @__PURE__ */ t(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${da.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function B0({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${da.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(p1, { rung: a }, a.name)) });
}
const g1 = "_sheet_1fqco_2", N1 = "_title_1fqco_9", y1 = "_stage_1fqco_15", k1 = "_effects_1fqco_20", $1 = "_effect_1fqco_20", C1 = "_numeral_1fqco_31", S1 = "_effectText_1fqco_38", R1 = "_refusals_1fqco_43", T1 = "_reasons_1fqco_52", L1 = "_reason_1fqco_52", E1 = "_actions_1fqco_62", ue = {
  sheet: g1,
  title: N1,
  stage: y1,
  effects: k1,
  effect: $1,
  numeral: C1,
  effectText: S1,
  refusals: R1,
  reasons: T1,
  reason: L1,
  actions: E1
};
function x1({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function O0({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = $(), u = `${c}-refusal`, [d, h] = p(""), f = n.length > 0;
  return /* @__PURE__ */ t(na, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: ue.effects, children: a.map((v, N) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ t("span", { className: ue.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: ue.effectText, children: v })
    ] }, v)) }),
    /* @__PURE__ */ t(
      ms,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ t(A, { kind: "textarea", label: "Note for the agent", value: d, onChange: h }),
    f && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ t(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ t("ul", { className: ue.reasons, children: n.map((v, N) => /* @__PURE__ */ t("li", { className: ue.reason, id: N === 0 ? u : void 0, children: v.reason }, v.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ t(x1, { refused: f, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ t(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const A1 = "_list_1hvqu_2", I1 = "_path_1hvqu_7", M1 = "_head_1hvqu_21", q1 = "_label_1hvqu_28", P1 = "_consequence_1hvqu_35", B1 = "_ask_1hvqu_36", Ve = {
  list: A1,
  path: I1,
  head: M1,
  label: q1,
  consequence: P1,
  ask: B1
}, Ha = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function St(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Rt(e) {
  return e ? "primary" : "secondary";
}
function O1({ path: e, primary: a, onChoose: n }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ t(_, { variant: Rt(a), size: "sm", onClick: () => n(e.kind), children: Ha[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: Rt(a), size: "sm", disabled: !0, describedBy: r, children: Ha[e.kind] }),
    /* @__PURE__ */ t("span", { className: Ve.ask, id: r, children: e.askInstead })
  ] });
}
function D1({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ve.path, "data-allowed": e.allowed, "data-role": St(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ve.head, children: [
      /* @__PURE__ */ t("span", { className: Ve.label, children: e.title ?? Ha[e.kind] }),
      /* @__PURE__ */ t(m, { role: St(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: Ve.consequence, children: e.consequence }),
    /* @__PURE__ */ t(O1, { path: e, primary: a, onChoose: n })
  ] });
}
function D0({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: Ve.list, children: e.map((n, r) => /* @__PURE__ */ t(D1, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const j1 = "_list_1nyt1_2", H1 = "_item_1nyt1_6", F1 = "_node_1nyt1_18", W1 = "_body_1nyt1_24", z1 = "_head_1nyt1_30", G1 = "_stage_1nyt1_36", U1 = "_version_1nyt1_41", K1 = "_sentence_1nyt1_49", V1 = "_meta_1nyt1_54", Ne = {
  list: j1,
  item: H1,
  node: F1,
  body: W1,
  head: z1,
  stage: G1,
  version: U1,
  sentence: K1,
  meta: V1
}, Y1 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function X1({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ t("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function J1({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ t(xe, { size: 9, kind: Y1[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(X1, { entry: e }),
      /* @__PURE__ */ t("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${ce(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function j0({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Ne.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(J1, { entry: a }, a.stage + String(n))) });
}
const Q1 = "_thread_1kn6s_3", Z1 = "_turn_1kn6s_8", ek = "_who_1kn6s_27", ak = "_body_1kn6s_32", ua = {
  thread: Q1,
  turn: Z1,
  who: ek,
  body: ak
}, Tn = He(!1);
function H0({ children: e, density: a }) {
  return /* @__PURE__ */ t(Tn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ua.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function F0({ turn: e }) {
  if (!je(Tn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ua.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ua.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ce(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ua.body} ward-chat-body`, children: e.body })
  ] });
}
const tk = "_list_1rt9c_3", nk = "_row_1rt9c_7", rk = "_label_1rt9c_20", lk = "_n_1rt9c_26", ok = "_cause_1rt9c_33", Qe = {
  list: tk,
  row: nk,
  label: rk,
  n: lk,
  cause: ok
};
function ik(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const sk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function ck({ row: e, formatNumber: a }) {
  return ik(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(xe, { size: 8, ...sk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(dk, { cause: e.cause })
  ] });
}
function dk({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function W0({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(ck, { row: n, formatNumber: a }, n.label)) });
}
const uk = "_root_1jxwp_2", hk = {
  root: uk
};
function z0({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: hk.root, "data-density": l, children: [
    /* @__PURE__ */ t(Ta, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const mk = "_row_dhbre_3", wk = "_key_dhbre_13", _k = "_stack_dhbre_24", fk = "_value_dhbre_32", vk = "_evidence_dhbre_39", bk = "_mark_dhbre_47", Ue = {
  row: mk,
  key: wk,
  stack: _k,
  value: fk,
  evidence: vk,
  mark: bk
};
function pk({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ t(Ya, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function G0({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ue.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Ue.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ue.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Ue.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Ue.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Ue.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(pk, { state: e.state }) })
  ] });
}
const gk = "_cell_1monp_2", Nk = {
  cell: gk
}, yk = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function kk(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function $k(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function Ck(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: kk(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function Sk(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function U0({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  $k(e, n);
  const r = Sk(e);
  return /* @__PURE__ */ t(
    Rs,
    {
      label: "Rejection routing",
      columns: yk,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: Nk.cell, "data-norerun": l.noRerun ? !0 : void 0, children: Ck(l, i) }),
      empty: a ?? /* @__PURE__ */ t(wd, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Rk = "_row_ute8v_2", Tk = "_title_ute8v_11", Lk = "_turns_ute8v_20", Ek = "_waiting_ute8v_21", xk = "_resolved_ute8v_22", Ak = "_activity_ute8v_23", Ik = "_cost_ute8v_29", Mk = "_link_ute8v_30", qk = "_tableRow_ute8v_47", Pk = "_tableTitle_ute8v_59", Bk = "_tableResolved_ute8v_64", Ok = "_tableLink_ute8v_68", Dk = "_tableMeta_ute8v_83", jk = "_tableCost_ute8v_90", Hk = "_tableActivity_ute8v_91", Fk = "_tableState_ute8v_101", Wk = "_tableRecord_ute8v_112", D = {
  row: Rk,
  title: Tk,
  turns: Lk,
  waiting: Ek,
  resolved: xk,
  activity: Ak,
  cost: Ik,
  link: Mk,
  tableRow: qk,
  tableTitle: Pk,
  tableResolved: Bk,
  tableLink: Ok,
  tableMeta: Dk,
  tableCost: jk,
  tableActivity: Hk,
  tableState: Fk,
  tableRecord: Wk
}, Ln = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function zk(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function Gk(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Uk(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const Kk = { duplicate: "CLOSED · DUPLICATE" };
function Vk({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: D.tableMeta, children: `waiting on ${e}` });
}
function Yk({ value: e }) {
  return /* @__PURE__ */ t("td", { className: D.tableCost, children: e === void 0 ? null : re(e) });
}
function Xk({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${D.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function Jk({ session: e, href: a }) {
  const n = Ln[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${D.tableLink} ward-target`, href: W(a), children: e.title }),
      /* @__PURE__ */ t("span", { className: D.tableMeta, children: Gk(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      Uk(e.resolved),
      /* @__PURE__ */ t(Vk, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(Yk, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: D.tableActivity, children: zk(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(m, { role: n.role, label: Kk[e.state] ?? n.label }),
      /* @__PURE__ */ t(Xk, { link: e.link })
    ] }) })
  ] });
}
function Qk({ session: e }) {
  const a = Ln[e.state];
  return /* @__PURE__ */ o("div", { className: D.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t("span", { className: D.title, children: e.title }),
    /* @__PURE__ */ t("span", { className: D.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t("span", { className: D.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: D.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: D.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ t("span", { className: D.activity, children: ce(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: D.link, href: W(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function K0(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(Jk, { session: e.session, href: e.href }) : /* @__PURE__ */ t(Qk, { session: e.session });
}
const Zk = "_block_1yy2v_3", e$ = "_list_1yy2v_9", a$ = "_line_1yy2v_14", Fa = {
  block: Zk,
  list: e$,
  line: a$
}, t$ = { warn: "warning", ok: "ok" };
function n$({ kind: e }) {
  const a = t$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function r$({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Fa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(n$, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function V0({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${Fa.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: Fa.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(r$, { line: n }, `${r}-${n.text}`)) }) });
}
const l$ = "_band_tt7hp_1", o$ = "_head_tt7hp_8", i$ = "_cell_tt7hp_19", s$ = "_index_tt7hp_35", c$ = "_title_tt7hp_42", d$ = "_note_tt7hp_48", u$ = "_cellTitle_tt7hp_53", h$ = "_cellBody_tt7hp_58", m$ = "_tag_tt7hp_64", be = {
  band: l$,
  head: o$,
  cell: i$,
  index: s$,
  title: c$,
  note: d$,
  cellTitle: u$,
  cellBody: h$,
  tag: m$
}, Tt = 4;
function Y0({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== Tt)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Tt}-cell grid`);
  return /* @__PURE__ */ o("section", { className: be.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: be.head, children: [
      /* @__PURE__ */ t("span", { className: be.index, children: e }),
      /* @__PURE__ */ t("span", { className: be.title, children: a }),
      /* @__PURE__ */ t("span", { className: be.note, children: n })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: be.cell, children: [
      /* @__PURE__ */ t("span", { className: be.cellTitle, children: l.title }),
      /* @__PURE__ */ t("span", { className: be.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ t("span", { className: be.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  q$ as ActionStack,
  I0 as ActivityConsole,
  Tm as AgentCard,
  S$ as AppShell,
  v0 as AppearanceStrip,
  Y0 as Band,
  A$ as BarChart,
  Yd as BoardColumn,
  X$ as BoardFootnote,
  J$ as BoardHeader,
  F$ as BoardScroller,
  _ as Btn,
  y$ as CHIP_ROLES,
  _n as CREDENTIAL_COLUMNS,
  x$ as Callout,
  b0 as CapabilityRow,
  F0 as ChatMessage,
  qt as Checkbox,
  m as Chip,
  M0 as ClarificationRow,
  i0 as ClauseRuleRow,
  o0 as ClauseRules,
  Vt as ColourLadder,
  p0 as ComponentRow,
  q0 as Composer,
  Z$ as ConfigRow,
  Q$ as ConfigRowHead,
  Xa as ConnectionMark,
  A0 as ConsoleAnnounceProvider,
  H0 as Conversation,
  ms as CostMeter,
  N0 as CredentialRow,
  g0 as CredentialRowHead,
  P0 as CriteriaList,
  $l as Crumb,
  W0 as DeliveryHealth,
  G$ as DeniedState,
  c0 as DryRunRail,
  wd as EmptyState,
  y0 as EnvCard,
  A as Field,
  z$ as FilteredEmpty,
  j$ as FormStack,
  Ta as GateChecklist,
  B0 as GateLadder,
  Rs as Grid,
  u0 as HandoffRuleRow,
  d0 as HandoffRules,
  e0 as ItemDrawer,
  k0 as KeyPanel,
  Un as LIVE_EVENT_TYPES,
  Xh as LegacyBoardColumn,
  t0 as LegacyBoardHeader,
  n0 as LegacyConfigRow,
  l0 as LegacyItemDrawer,
  Wh as LegacyOverCapNote,
  r0 as LegacyPreviewRail,
  Gt as LegacyWorkCard,
  $e as LiveIndicator,
  U$ as LoadFailed,
  Y$ as Loading,
  Nn as MCP_SERVER_COLUMNS,
  Ya as Mark,
  C0 as MarkUpload,
  xe as Marker,
  R0 as McpServerRow,
  S0 as McpServerRowHead,
  h0 as NewStreamModal,
  vd as OverCapNote,
  na as Overlay,
  s0 as PARTIAL_STEP_REASON,
  yn as POLICY_CHIP_WIDTH,
  B$ as PageFrame,
  E$ as PageHeader,
  I$ as PlainList,
  T0 as PolicyRow,
  a0 as PreviewRail,
  Ia as ROLE_MATRIX_COLUMNS,
  on as RULE_ACTIONS,
  Dt as Radio,
  z0 as ReadyChecklist,
  D$ as RecordSection,
  O0 as RequeueSheet,
  D0 as ResolveBlock,
  G0 as ResolvedFieldRow,
  L0 as RoleMatrixRow,
  U0 as RoutingTable,
  m0 as RuleRow,
  E0 as RunbookSteps,
  Gn as STREAM_STEPS,
  H$ as SectionBand,
  mt as SectionHeader,
  Bt as SegmentedControl,
  K0 as SessionRow,
  L$ as Sidebar,
  w0 as StageColumn,
  W$ as StageGrid,
  j0 as StageHistory,
  sf as StageListEditor,
  K$ as StaleStrip,
  Ca as StatStrip,
  _0 as StreamRow,
  O$ as SubjectRail,
  De as Switch,
  T$ as TabLinks,
  M$ as TableHead,
  R$ as Tabs,
  f0 as ToolRow,
  P$ as TopBar,
  Lc as Tree,
  Ft as TreeRow,
  V0 as TypedInputBlock,
  Fr as UNSAFE_HREF,
  x0 as ValidationList,
  v$ as VisibilityProvider,
  b$ as Visible,
  N$ as WARD_VERSION,
  Ra as WorkCard,
  V$ as WriteUnavailableStrip,
  zk as agoSince,
  Bn as clock,
  Cf as colourStatus,
  ae as count,
  se as duration,
  za as elapsed,
  g$ as eventSourceTransport,
  ya as isStreamStep,
  ka as isValidatedStreamStep,
  rw as ladderValidation,
  Vg as mcpConnectionChip,
  Ug as mcpToolName,
  re as money,
  we as ms,
  Wt as ordered,
  Et as ratio,
  wp as restartLabel,
  W as safeHref,
  ce as stamp,
  It as stream,
  $$ as streamChip,
  $a as streamChipProps,
  fe as streamColour,
  Vn as streamHex,
  k$ as streamVars,
  sa as useBorderFlash,
  Fn as useFocusTrap,
  C$ as useLiveFeed,
  p$ as useReturnFocus,
  Na as useRovingTabindex,
  Ga as useTicker,
  On as useVisible,
  G as v,
  $0 as validateMark,
  ta as validatedStep,
  At as validatedStreamSteps
};
