import { jsx as t, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as It, useContext as Oe, createContext as De, useCallback as J, useEffect as I, useState as p, useRef as g, useLayoutEffect as za, useId as $, isValidElement as qn, Children as Bn, Fragment as Pn } from "react";
import { createPortal as jn } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${a % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const ot = (e) => String(e).padStart(2, "0");
function Ga(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const n = Math.floor(a / 60);
  return n < 60 ? `${n}m ${ot(a % 60)}s` : `${Math.floor(n / 60)}h ${ot(n % 60)}m`;
}
const Hn = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function se(e) {
  const a = Hn.formatToParts(new Date(e)), n = (r) => {
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
function Mt(e, a) {
  return `${e} / ${a}`;
}
const Fn = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function On(e) {
  return Fn.format(new Date(e));
}
const qt = De(/* @__PURE__ */ new Set());
function $$({ hidden: e, children: a }) {
  const n = It(() => new Set(e), [e]);
  return /* @__PURE__ */ t(qt.Provider, { value: n, children: a });
}
function Dn(e) {
  return !Oe(qt).has(e);
}
function C$({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(S, { children: Dn(e) ? a : n });
}
const Wn = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function zn(e, a, n, r) {
  return e.shiftKey ? document.activeElement === n ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? n : void 0;
}
function Gn(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = zn(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Kn(e) {
  return { onKeyDown: J(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Wn));
      Gn(n, e.current, r);
    },
    [e]
  ) };
}
function S$(e, a = !0) {
  I(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const it = { ArrowUp: -1, ArrowDown: 1 }, ct = { ArrowLeft: -1, ArrowRight: 1 }, Un = (e, a, n) => Math.min(n, Math.max(a, e));
function Vn(e, a) {
  if (a !== "horizontal" && e in it) return it[e];
  if (a !== "vertical" && e in ct) return ct[e];
}
function Na({ orientation: e = "both" } = {}) {
  const [a, n] = p(0), r = g(/* @__PURE__ */ new Map()), l = g(!1);
  za(() => {
    var v;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const m = d[0], f = l.current;
    l.current = !1, n(m), f && ((v = r.current.get(m)) == null || v.focus());
  });
  const i = J((d) => n(d), []), c = J((d) => {
    var m;
    n(d), (m = r.current.get(d)) == null || m.focus();
  }, []), s = J(
    (d) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const f = Math.max(0, m.indexOf(a)), v = Vn(d.key, e);
      v !== void 0 ? (d.preventDefault(), c(m[Un(f + v, 0, m.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(m[0])) : d.key === "End" && (d.preventDefault(), c(m[m.length - 1]));
    },
    [a, c, e]
  ), u = J(
    (d) => ({
      tabIndex: d === a ? 0 : -1,
      ref: (m) => {
        m ? r.current.set(d, m) : (r.current.delete(d), d === a && (l.current = !0));
      },
      onFocus: () => n(d),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: s }, itemProps: u, setActive: i };
}
const R$ = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, T$ = "0.2.0", x$ = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Xn = [1, 2, 3, 4, 5, 6], Bt = [1, 2, 3], Yn = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
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
    accentTint: "var(--ward-color-accentTint)",
    accentPill: "var(--ward-color-accentPill)",
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
  radiusChip: "var(--ward-radius-chip)",
  radiusCard: "var(--ward-radius-card)",
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
function Pt(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function ka(e) {
  return Xn.includes(e);
}
function $a(e) {
  return Bt.includes(e);
}
function L$(e) {
  if (!ka(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function A$(e) {
  if (!ka(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Jn = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Qn(e) {
  if (!ka(e)) throw new Error("unvalidated stream step");
  return Jn[e];
}
function st(e) {
  return typeof e != "string" ? null : Yn.includes(e) ? e : null;
}
function Zn(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function er(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function ar(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function tr(e, a, n) {
  const r = Zn(e);
  if (r === null) return null;
  const l = st(n) ?? st(r.type);
  return l === null ? null : { ...r, type: l, id: er(r, a), at: ar(r) };
}
function nr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function rr(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function E$(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), c = g(/* @__PURE__ */ new Map()), s = g(0), u = g(""), d = g(0), m = g(null), f = g(0), v = g(0), y = g(!1), L = g("reconnecting"), q = J((C) => {
    L.current = C, r(C);
  }, []), oe = J(() => {
    s.current = Date.now();
  }, []), Ce = J((C) => {
    for (const [z, ve] of c.current)
      (ve === "*" || C.itemKey === ve) && z(C);
  }, []), te = J(() => {
    m.current = a(e, { lastEventId: u.current }, {
      onEvent: (C, z, ve) => {
        const Ee = tr(C, z, ve);
        Ee !== null && (Ee.id && (u.current = Ee.id), oe(), y.current = !1, q("live"), i(Ee.at), Ce(Ee));
      },
      onOpen: () => {
        d.current = 0, y.current = !1, oe(), q("live");
      },
      onError: () => {
        var z;
        (z = m.current) == null || z.close(), m.current = null, y.current = !0, L.current !== "stale" && q("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** d.current, we.reconnectMax);
        d.current += 1, f.current = window.setTimeout(te, C);
      }
    });
  }, [Ce, q, oe, a, e]), We = J((C) => {
    y.current = !0, C.close(), m.current = null, f.current = window.setTimeout(te, we.reconnectBase);
  }, [te]), ze = J((C, z) => (c.current.set(z, C), () => {
    c.current.delete(z);
  }), []);
  return I(() => (te(), v.current = window.setInterval(() => {
    const C = Date.now() - s.current, z = nr(C, L.current);
    z && q(z);
    const ve = m.current;
    rr(C, y.current, ve) && We(ve);
  }, we.tick), () => {
    var C;
    window.clearInterval(v.current), window.clearTimeout(f.current), y.current = !1, (C = m.current) == null || C.close(), m.current = null;
  }), [te, We, q]), { connection: n, lastEventAt: l, subscribe: ze };
}
function Ka(e, a) {
  const n = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return I(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const c = window.setInterval(i, we.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(c), document.removeEventListener("visibilitychange", i);
    };
  }, [a, n]), Math.max(0, r - n);
}
function lr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function dt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function sa(e, a) {
  const n = g(0), r = J((l) => {
    const i = l ?? a, c = e.current;
    c !== null && i !== void 0 && (lr() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => dt(c), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => dt(c), we.flash)));
  }, [a, e]);
  return I(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const or = "_root_1otpc_2", ir = {
  root: or
};
function cr(e, a, n, r, l) {
  const i = [Ga(a)];
  return e || i.push(`as of ${On(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function $e({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = Ka(e, l), c = (a == null ? void 0 : a.at) ?? e, s = cr(l, i, c, r, a);
  return /* @__PURE__ */ o("span", { className: `${ir.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      se(e)
    ] })
  ] });
}
const sr = "_app_k9nx2_1", dr = "_side_k9nx2_18", ur = "_main_k9nx2_26", mr = "_rail_k9nx2_33", hr = "_page_k9nx2_40", wr = "_root_k9nx2_91", _r = "_topbar_k9nx2_98", fr = "_mark_k9nx2_109", vr = "_brand_k9nx2_116", br = "_tagline_k9nx2_122", pr = "_identity_k9nx2_128", gr = "_tools_k9nx2_129", yr = "_nav_k9nx2_139", Nr = "_metadata_k9nx2_146", kr = "_actor_k9nx2_161", $r = "_detail_k9nx2_162", Cr = "_content_k9nx2_222", Sr = "_toolsPanel_k9nx2_238", Rr = "_skip_k9nx2_264", M = {
  app: sr,
  side: dr,
  main: ur,
  rail: mr,
  page: hr,
  root: wr,
  topbar: _r,
  mark: fr,
  brand: vr,
  tagline: br,
  identity: pr,
  tools: gr,
  nav: yr,
  metadata: Nr,
  actor: kr,
  detail: $r,
  content: Cr,
  toolsPanel: Sr,
  skip: Rr
}, Tr = "_btn_1e06l_2", xr = "_primary_1e06l_14", Lr = "_destructive_1e06l_25", Ar = "_secondary_1e06l_35", Er = "_ghost_1e06l_40", Ir = "_overflow_1e06l_49", Mr = "_sm_1e06l_56", qr = "_disabled_1e06l_60", la = {
  btn: Tr,
  primary: xr,
  destructive: Lr,
  secondary: Ar,
  ghost: Er,
  overflow: Ir,
  sm: Mr,
  disabled: qr
};
function Br(e, a, n, r) {
  const l = a === "sm" ? [la.sm, "ward-btn--sm"] : [], i = n ? [la.disabled] : [];
  return [la.btn, la[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Pr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function jr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Hr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Fr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Or(e, a, n) {
  return Fr(e.describedBy, a && n);
}
function Dr({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Wr(e) {
  return e.children ?? e.label;
}
function _(e) {
  jr(e);
  const a = e.variant ?? "secondary", n = e.size ?? "md", r = e.disabled ?? !1, l = Hr(e), i = $();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Br(a, n, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": n,
        disabled: r,
        title: l,
        "aria-describedby": Or(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Pr(a, e.controls),
        children: Wr(e)
      }
    ),
    /* @__PURE__ */ t(Dr, { id: i, reason: l })
  ] });
}
const zr = /^([a-z][a-z0-9+.-]*):/i, Gr = /* @__PURE__ */ new Set(["http", "https"]), Kr = "#";
function Ur(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = zr.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = Ur(e);
  return a === void 0 || Gr.has(a) ? e : Kr;
}
function Vr(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function jt(e) {
  const a = Vr(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function ta(e, a, n) {
  I(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const c = jt(r);
      n == null || n(c.start || c.end);
    };
    r.addEventListener("scroll", l, { passive: !0 });
    const i = typeof ResizeObserver > "u" ? null : new ResizeObserver(l);
    for (const c of [r, ...r.children]) i == null || i.observe(c);
    return l(), () => {
      r.removeEventListener("scroll", l), i == null || i.disconnect();
    };
  }, [e, a, n]);
}
function Xr(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function Ua(e, a, n) {
  za(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = Xr(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), jt(r);
  }, [e, a, n]);
}
function Va(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return I(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (c) => n(c.matches);
    return r.addEventListener("change", l), n(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function Yr({ sidebar: e, header: a, children: n, rail: r }) {
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
function Jr({ destinations: e, active: a }) {
  const n = g(null);
  return ta(n, e.length), Ua(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t("nav", { ref: n, className: M.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ t("a", { href: W(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Pa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function Qr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ t(Pa, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Pa, { value: a, className: M.detail })
  ] });
}
function Zr() {
  const e = Va("(max-width: 767.98px)"), a = $(), n = g(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var c, s;
    l(!1), (s = (c = n.current) == null ? void 0 : c.querySelector("button")) == null || s.focus();
  } };
}
function el({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: M.tools, children: /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: M.tools, children: e });
}
function al({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function tl(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ t("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Pa, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ t(Jr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: M.identity, children: /* @__PURE__ */ t(Qr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(el, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function nl(e) {
  const a = $(), n = Zr();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(tl, { ...e, menu: n }),
    /* @__PURE__ */ t(al, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: M.content, children: e.children })
  ] });
}
function rl(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function I$(e) {
  return rl(e) ? /* @__PURE__ */ t(Yr, { ...e }) : /* @__PURE__ */ t(nl, { ...e });
}
function Xa(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const ll = "_root_o4yib_2", ol = "_row_o4yib_8", il = "_box_o4yib_14", cl = "_label_o4yib_21", sl = "_lockedNote_o4yib_26", dl = "_consequence_o4yib_34", ul = "_sample_o4yib_69", qe = {
  root: ll,
  row: ol,
  box: il,
  label: cl,
  lockedNote: sl,
  consequence: dl,
  sample: ul
};
function ml(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function hl({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${qe.consequence} ward-check-consequence`, children: a }) : null;
}
function wl({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${qe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function _l({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: qe.sample, "aria-hidden": "true", children: e }) : null;
}
function Ht(e) {
  const a = $(), n = e.consequence ? `${a}-note` : void 0, r = ml(e);
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
          "aria-describedby": Xa(n, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: qe.label, children: [
        e.label,
        /* @__PURE__ */ t(wl, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(_l, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(hl, { id: n, text: e.consequence })
  ] });
}
const fl = "_chip_pq6tb_2", vl = {
  chip: fl
}, bl = {
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
function pl(e, a) {
  if (e === "stream") return gl(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = bl[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function gl(e) {
  if (!e || !$a(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Pt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${vl.chip} ward-chip ward-chip--${e}`, style: pl(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const yl = "_clamp_zn74g_3", ut = {
  clamp: yl
};
function Le({ text: e, as: a = "span", className: n }) {
  return /* @__PURE__ */ t(a, { className: n === void 0 ? ut.clamp : `${ut.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
}
function na(e) {
  return typeof e == "number" && $a(e) ? e : null;
}
function fe(e, a) {
  const n = na(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function Ca(e, a) {
  const n = na(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const Nl = "_nav_12vi0_2", kl = "_list_12vi0_8", $l = "_item_12vi0_15", Cl = "_link_12vi0_30", Sl = "_sep_12vi0_40", Rl = "_current_12vi0_44", Tl = "_chips_12vi0_48", Ie = {
  nav: Nl,
  list: kl,
  item: $l,
  link: Cl,
  sep: Sl,
  current: Rl,
  chips: Tl
};
function xl({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ie.nav, children: [
    /* @__PURE__ */ t("ol", { className: Ie.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: Ie.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Ie.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Ie.link} ward-target`, href: W(n.href), children: n.label }) : n.label : /* @__PURE__ */ t("span", { className: Ie.current, "aria-current": "page", children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Ie.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] }) });
}
const Ll = "_field_octb1_2", Al = "_label_octb1_8", El = "_labelHidden_octb1_15", Il = "_control_octb1_25", Ml = "_mono_octb1_45", ql = "_area_octb1_50", Bl = "_invalid_octb1_57", xe = {
  field: Ll,
  label: Al,
  labelHidden: El,
  control: Il,
  mono: Ml,
  area: ql,
  invalid: Bl
}, Pl = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function jl({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? Pl : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function Hl({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("select", { className: n, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ t("option", { value: r.value, children: r.label }, r.value)) });
}
function Fl({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const Ol = { input: jl, select: Hl, textarea: Fl };
function Dl(e, a, n) {
  const r = Ol[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function Wl(e, a, n) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Xa(r ? n : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function zl(e) {
  const a = e.mono ? [xe.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [xe.area] : [];
  return [xe.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function Gl(e) {
  return e ? `${xe.label} ${xe.labelHidden} ward-field-label` : `${xe.label} ward-field-label`;
}
function E(e) {
  const a = $(), n = `${a}-msg`, r = Wl(e, a, n), l = zl(e);
  return /* @__PURE__ */ o("div", { className: `${xe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { className: Gl(e.labelHidden), htmlFor: a, children: e.label }),
    Dl(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${xe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Kl = "_strip_4moyw_2", Ul = "_tab_4moyw_32", Vl = "_count_4moyw_68", ea = {
  strip: Kl,
  tab: Ul,
  count: Vl
}, ha = 7;
function Xl(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
function Ft(e) {
  return `${ea.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function M$({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ha) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ha} — the set is fixed`);
  const i = Na({ orientation: "horizontal" }), c = Xl(e, a);
  I(() => i.setActive(c), [i.setActive, c]);
  const s = g(null);
  return ta(s, e.length), Ua(s, c, '[role="tab"]'), /* @__PURE__ */ t(
    "div",
    {
      ref: s,
      className: Ft(l),
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
          className: `${ea.tab} ward-tab`,
          "aria-selected": u.id === a,
          "aria-controls": `panel-${u.id}`,
          onClick: () => n(u.id),
          ...i.itemProps(d),
          children: [
            u.label,
            u.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
              " ",
              /* @__PURE__ */ t("span", { className: ea.count, children: `· ${u.count}` })
            ] })
          ]
        },
        u.id
      ))
    }
  );
}
function q$({ links: e, active: a, label: n, level: r = 1 }) {
  if (e.length > ha) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ha} — the set is fixed`);
  const l = g(null);
  return ta(l, e.length), Ua(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t("nav", { ref: l, className: Ft(r), "aria-label": n, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ea.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ea.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Yl = "_root_v56ff_3", Jl = "_segment_v56ff_9", mt = {
  root: Yl,
  segment: Jl
};
function Ot({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = Na({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return I(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ t("div", { className: `${mt.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: mt.segment,
      "aria-checked": u.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => n(u.value),
      ...c.itemProps(d),
      children: u.label
    },
    u.value
  )) });
}
const Ql = "_sidebar_11008_3", Zl = "_brand_11008_9", eo = "_mark_11008_17", ao = "_word_11008_24", to = "_nav_11008_30", no = "_navItem_11008_39", ro = "_footLink_11008_49", lo = "_group_11008_58", oo = "_groupName_11008_65", io = "_agents_11008_81", co = "_agent_11008_81", so = "_root_11008_96", uo = "_agentTop_11008_105", mo = "_dot_11008_112", ho = "_agentName_11008_124", wo = "_agentMeta_11008_137", _o = "_foot_11008_49", fo = "_footName_11008_149", vo = "_footLinks_11008_156", bo = "_linkBrand_11008_183", po = "_label_11008_204", go = "_note_11008_209", yo = "_footer_11008_218", R = {
  sidebar: Ql,
  brand: Zl,
  mark: eo,
  word: ao,
  nav: to,
  navItem: no,
  new: "_new_11008_48",
  footLink: ro,
  group: lo,
  groupName: oo,
  agents: io,
  agent: co,
  root: so,
  agentTop: uo,
  dot: mo,
  agentName: ho,
  agentMeta: wo,
  foot: _o,
  footName: fo,
  footLinks: vo,
  linkBrand: bo,
  label: po,
  note: go,
  footer: yo
};
function No({ agent: e }) {
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
              style: { "--dot": Pt(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ t("span", { className: R.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ t("span", { className: R.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function ko({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: R.foot, children: [
    /* @__PURE__ */ t("span", { className: R.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: R.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${R.footLink} ward-target`, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function $o({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: R.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: R.brand, children: [
      /* @__PURE__ */ t("span", { className: R.mark }),
      /* @__PURE__ */ t("span", { className: R.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: R.nav, children: a.map((c) => /* @__PURE__ */ t("a", { className: R.navItem, href: W(c.href), "aria-current": c.current === !0 ? "page" : void 0, children: c.label }, c.href)) }),
    /* @__PURE__ */ o("div", { className: R.group, children: [
      /* @__PURE__ */ o("span", { className: R.groupName, children: [
        n,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: R.new, href: W(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: R.agents, children: r.map((c) => /* @__PURE__ */ t(No, { agent: c }, c.href)) }),
    /* @__PURE__ */ t(ko, { shared: i })
  ] });
}
function Co(e) {
  return e.destinations ?? e.items ?? [];
}
function So({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: R.linkBrand, children: e });
}
function Ro({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: R.footer, children: e });
}
function To({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: R.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: R.note, children: e.note })
  ] });
}
function xo(e) {
  return /* @__PURE__ */ o("aside", { className: `${R.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(So, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Co(e).map((a) => /* @__PURE__ */ t(To, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(Ro, { children: e.children })
  ] });
}
function Lo(e) {
  return "agents" in e;
}
function B$(e) {
  return Lo(e) ? /* @__PURE__ */ t($o, { ...e }) : /* @__PURE__ */ t(xo, { ...e });
}
const Ao = "_mark_wlgi8_3", Eo = {
  mark: Ao
}, Io = { met: "✓", unmet: "", failed: "✕" };
function Ya({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: Eo.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Io[e]
    }
  );
}
const Mo = "_marker_br9fi_2", qo = {
  marker: Mo
}, Bo = {
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
function Ae({ size: e, kind: a, label: n }) {
  const r = { "--marker": Bo[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${qo.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const Po = "_root_ti0pq_2", jo = "_chip_ti0pq_11", Ho = "_noCase_ti0pq_23", oa = {
  root: Po,
  chip: jo,
  noCase: Ho
};
function Fo(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Ja({ connection: e, since: a, lastEventAt: n }) {
  const r = Fo(a, n), l = Ka(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${oa.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(Ae, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${oa.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: oa.noCase, children: Ga(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${oa.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    se(r)
  ] });
}
const Oo = "_root_w7yld_2", Do = "_context_w7yld_12", Wo = "_row_w7yld_1", zo = "_heading_w7yld_25", Go = "_headingWrap_w7yld_33", Ko = "_chips_w7yld_38", Uo = "_title_w7yld_45", Vo = "_consequence_w7yld_55", Xo = "_actionsWrap_w7yld_62", Yo = "_actions_w7yld_62", Jo = "_action_w7yld_62", Qo = "_overflowPanel_w7yld_91", Zo = "_measureClip_w7yld_102", ei = "_measure_w7yld_102", V = {
  root: Oo,
  context: Do,
  row: Wo,
  heading: zo,
  headingWrap: Go,
  chips: Ko,
  title: Uo,
  consequence: Vo,
  actionsWrap: Xo,
  actions: Yo,
  action: Jo,
  overflowPanel: Qo,
  measureClip: Zo,
  measure: ei
};
function ai({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(Le, { as: "h1", className: V.title, text: e }) : /* @__PURE__ */ t("h1", { className: V.title, children: e });
}
function ti({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: V.heading, children: [
    /* @__PURE__ */ t(ai, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: V.consequence, title: n, children: a })
  ] });
}
function ja({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: V.action, "data-action": "", children: a }, n));
}
function ht({ disclosure: e }) {
  return /* @__PURE__ */ t(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function ni({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(ht, { disclosure: l }) : a ? [/* @__PURE__ */ t(ht, { disclosure: l }, "more"), /* @__PURE__ */ t(ja, { actions: e }, "actions")] : /* @__PURE__ */ t(ja, { actions: e });
}
function ri(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function li({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: V.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(ja, { actions: e }) });
}
function oi(e, a) {
  const n = $(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function ii({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: V.context, children: [
    /* @__PURE__ */ t(xl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: V.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function ci(...e) {
  return e.some((a) => a === null);
}
function si(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function di(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + si(e);
}
function ui(e, a, n, r, l) {
  if (l === 0 || ci(a, n, r)) return !1;
  const [i, c, s] = [a, n, r], u = Math.max(0, e.clientWidth - di(e, i));
  return s.offsetWidth > u || c.scrollWidth > c.clientWidth + 1;
}
function mi(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function hi(e) {
  return qn(e) && (e.type === "a" || typeof e.props.href == "string");
}
function wi(e, a) {
  return a.length === 0 && e.length === 1 && hi(e[0]);
}
function _i(e, a) {
  const n = g(null), r = g(null), l = g(null), i = g(null), [c, s] = p(!1);
  return I(() => {
    const u = n.current;
    if (!mi(u)) return;
    const d = () => s(ui(u, r.current, l.current, i.current, e.length)), m = new ResizeObserver(d);
    return m.observe(u), i.current && m.observe(i.current), d(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: c && !a };
}
function fi({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: V.measureClip, children: /* @__PURE__ */ o("div", { className: V.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function vi({ connection: e }) {
  return e ? /* @__PURE__ */ t(Ja, { connection: e.connection, since: e.since }) : null;
}
function P$({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: c = [], connection: s, onOverflow: u, density: d = "page" }) {
  const { rowRef: m, headingRef: f, actionsRef: v, measureRef: y, collapsed: L } = _i(i, wi(i, c)), q = c.length > 0, { disclosure: oe, close: Ce } = oi(L || q, v), te = ri(c, i, L, u);
  return /* @__PURE__ */ o("header", { className: V.root, "data-density": d, children: [
    /* @__PURE__ */ t(ii, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: V.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: f, className: V.headingWrap, children: /* @__PURE__ */ t(ti, { title: n, consequence: r, consequenceHint: l, density: d }) }),
      /* @__PURE__ */ o("div", { className: V.actionsWrap, children: [
        /* @__PURE__ */ t(vi, { connection: s }),
        /* @__PURE__ */ t("div", { className: V.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ t(ni, { actions: i, hasMore: q, collapsed: L, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ t(li, { actions: te, disclosure: oe, onEscape: Ce }),
    /* @__PURE__ */ t(fi, { actions: i, hasMore: q, measureRef: y })
  ] });
}
const bi = "_scrim_rn7fr_2", pi = "_drawer_rn7fr_10", gi = "_sheet_rn7fr_14", yi = "_modal_rn7fr_18", Ni = "_panel_rn7fr_23", ki = "_header_rn7fr_54", $i = "_title_rn7fr_62", Ci = "_body_rn7fr_66", Si = "_close_rn7fr_93", Ne = {
  scrim: bi,
  drawer: pi,
  sheet: gi,
  modal: yi,
  panel: Ni,
  header: ki,
  title: $i,
  body: Ci,
  close: Si
}, Ri = De(null), wa = [], _a = /* @__PURE__ */ new Map();
function Ti(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function xi(e, a) {
  let n = _a.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, _a.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Li(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !Ti(r) && xi(e, r);
}
function Ai(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (Li(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function Ei(e) {
  for (const a of e.claims) {
    const n = _a.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), _a.delete(a)));
  }
}
function Ii(e, a) {
  const n = { root: e, claims: [] };
  return wa.push(n), Ai(n, a), n;
}
function Mi(e) {
  const a = wa.indexOf(e);
  a >= 0 && wa.splice(a, 1), Ei(e);
}
function wt(e) {
  return e !== null && wa.at(-1) === e;
}
function qi(e, a, n) {
  const r = g(null), l = g(n);
  return l.current = n, I(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = Ii(i, a);
    return r.current = s, () => {
      var d, m;
      const u = wt(s);
      Mi(s), r.current = null, u && ((m = (d = l.current ?? c) == null ? void 0 : d.focus) == null || m.call(d));
    };
  }, [a]), J(() => wt(r.current), []);
}
function Bi(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Pi(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function ji({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Ne.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("header", { className: `${Ne.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Ne.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Ne.body} ward-drawer-body`, children: e.children })
  ] });
}
function Hi(e) {
  return `${Ne.scrim} ${Ne[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Fi(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ne.panel} ${Ne[e]} ward-overlay-panel${n}${r}`;
}
function Oi(e) {
  const a = Oe(Ri);
  return e ?? a ?? document.body;
}
function ra(e) {
  const a = g(null), n = g(null), r = $(), l = Oi(e.container), i = Va("(min-width: 768px)"), c = Bi(e.kind, i), s = Pi(e, r), u = Kn(n), d = qi(a, l, e.returnFocusTo), m = J(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return I(() => {
    var f, v;
    d() && ((v = (f = n.current) == null ? void 0 : f.querySelector("button")) == null || v.focus());
  }, [d]), I(() => {
    const f = (v) => {
      v.key === "Escape" && m();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [m]), jn(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: Hi(c),
        "data-ward-overlay-kind": c,
        "data-ward-overlay-root": "",
        onClick: m,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: n,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": s.labelledBy,
            "aria-label": s.label,
            className: Fi(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => d() && u.onKeyDown(f),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Ne.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(ji, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Di = "_root_tgu1l_2", Wi = "_ticket_tgu1l_16", zi = "_body_tgu1l_25", La = {
  root: Di,
  ticket: Wi,
  body: zi
};
function j$({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${La.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ t("span", { className: `${La.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ t("div", { className: La.body, children: n })
  ] });
}
const Gi = "_root_bf1pc_2", Ki = "_table_bf1pc_9", Ui = "_caption_bf1pc_14", Vi = "_series_bf1pc_23", Xi = "_category_bf1pc_31", Yi = "_cell_bf1pc_39", Ji = "_track_bf1pc_45", Qi = "_lane_bf1pc_52", Zi = "_bar_bf1pc_56", ec = "_value_bf1pc_63", ac = "_swatch_bf1pc_70", tc = "_empty_bf1pc_78", X = {
  root: Gi,
  table: Ki,
  caption: Ui,
  series: Vi,
  category: Xi,
  cell: Yi,
  track: Ji,
  lane: Qi,
  bar: Zi,
  value: ec,
  swatch: ac,
  empty: tc
}, nc = "—", _t = 6;
function rc(e, a) {
  if (a.length < 1 || a.length > _t)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${_t}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function lc(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function Dt(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function oc(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function ic({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = oc(e, a), c = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: X.cell, children: /* @__PURE__ */ o("span", { className: X.track, children: [
    /* @__PURE__ */ t("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${X.bar} ward-barchart-bar`, "data-step": n, style: c, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function cc({ series: e }) {
  return /* @__PURE__ */ t(S, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: X.swatch, "data-step": Dt(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function sc({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: X.caption, children: e }),
    /* @__PURE__ */ t("p", { className: X.empty, children: a })
  ] });
}
function dc({ title: e, categories: a, series: n, top: r, format: l = ae, categoryHead: i = "Category", missing: c = nc }) {
  return /* @__PURE__ */ t("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: X.table, children: [
    /* @__PURE__ */ t("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: X.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(cc, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((s, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: X.category, children: s }),
      n.map((d, m) => /* @__PURE__ */ t(ic, { value: d.values[u], top: r, step: Dt(m, n.length), format: l, missing: c }, d.name))
    ] }, s)) })
  ] }) });
}
function H$(e) {
  rc(e.categories, e.series);
  const a = lc(e.series);
  return a === 0 ? /* @__PURE__ */ t(sc, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(dc, { ...e, top: a });
}
const uc = "_root_1bfqw_2", mc = "_figure_1bfqw_7", hc = "_of_1bfqw_13", wc = "_bar_1bfqw_18", _c = "_rows_1bfqw_38", fc = "_row_1bfqw_38", vc = "_label_1bfqw_49", bc = "_amount_1bfqw_54", Se = {
  root: uc,
  figure: mc,
  of: hc,
  bar: wc,
  rows: _c,
  row: fc,
  label: vc,
  amount: bc
};
function pc({ spent: e, ceiling: a, breakdown: n }) {
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
const gc = "_frame_uovfv_2", yc = "_table_uovfv_6", Nc = "_th_uovfv_12", kc = "_td_uovfv_13", $c = "_sort_uovfv_48", Cc = "_row_uovfv_60", Sc = "_empty_uovfv_68", Te = {
  frame: gc,
  table: yc,
  th: Nc,
  td: kc,
  sort: $c,
  row: Cc,
  empty: Sc
}, Rc = { asc: "ascending", desc: "descending" };
function Tc(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Rc[a.direction];
}
function xc(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Te.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Lc(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Ac({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Te.th,
      style: Lc(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Tc(e, a),
      children: xc(e, n)
    }
  );
}
function Ec({ row: e, props: a }) {
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
function Ic({
  label: e,
  columns: a,
  rows: n,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: c = [],
  sort: s,
  onSort: u,
  empty: d
}) {
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: Te.empty, children: d }) : /* @__PURE__ */ t("div", { className: Te.frame, children: /* @__PURE__ */ o("table", { className: Te.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Te.head, children: a.map((m) => /* @__PURE__ */ t(Ac, { column: m, sort: s, onSort: u }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t(Ec, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(m))) })
  ] }) });
}
const Mc = "_list_v0s52_2", qc = {
  list: Mc
};
function F$({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: qc.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Bc = "_label_1u62a_2", Pc = {
  label: Bc
};
function O$({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: Pc.label, children: a.header }) }, a.key)) }) });
}
const jc = "_stack_bp6a0_2", Hc = {
  stack: jc
};
function D$({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Hc.stack, "data-ward-action-stack": "", children: e });
}
const Fc = "_set_y5zy3_2", Oc = "_legend_y5zy3_7", Dc = "_row_y5zy3_15", Wc = "_control_y5zy3_20", zc = "_input_y5zy3_26", Gc = "_label_y5zy3_31", Kc = "_consequence_y5zy3_36", Me = {
  set: Fc,
  legend: Oc,
  row: Dc,
  control: Wc,
  input: zc,
  label: Gc,
  consequence: Kc
};
function Wt({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: c, variant: s }) {
  const u = $(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: Me.set, "data-variant": s, children: [
    /* @__PURE__ */ t("legend", { className: Me.legend, children: e }),
    a.map((m) => {
      const f = `${d}-${m.value}`, v = m.consequence ? `${f}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Me.row, children: [
        /* @__PURE__ */ o("span", { className: Me.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: f,
              type: "radio",
              name: d,
              className: Me.input,
              value: m.value,
              checked: n === m.value,
              disabled: l,
              "aria-describedby": Xa(v, c),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: f, className: Me.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ t("p", { id: v, className: `${Me.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const Uc = "_root_5to6d_2", Vc = "_head_5to6d_11", Xc = "_note_5to6d_30", Yc = "_index_5to6d_35", Jc = "_dot_5to6d_39", Qc = "_counter_5to6d_50", Zc = "_trailing_5to6d_58", Be = {
  root: Uc,
  head: Vc,
  note: Xc,
  index: Yc,
  dot: Jc,
  counter: Qc,
  trailing: Zc
};
function es({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("span", { className: `${Be.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Be.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function as({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Be.counter, "aria-hidden": "true", children: e }) : null;
}
function ft({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Be.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Be.head, children: [
      /* @__PURE__ */ t(es, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: Be.note, children: n }),
    /* @__PURE__ */ t(as, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: Be.trailing, children: i })
  ] });
}
const ts = "_strip_1foyq_2", ns = "_cell_1foyq_7", rs = "_value_1foyq_12", ls = "_link_1foyq_29", os = "_label_1foyq_47", He = {
  strip: ts,
  cell: ns,
  value: rs,
  link: ls,
  label: os
};
function is(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const zt = (e) => `${He.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function cs({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: He.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: zt(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${He.label} ward-stat-label`, children: e.label })
  ] });
}
function ss({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: He.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: zt(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${He.link} ward-stat-link`, href: W(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${He.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Sa({ cells: e, divided: a = !1 }) {
  return is(e), /* @__PURE__ */ t("dl", { className: `${He.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(cs, { cell: n }, n.label) : /* @__PURE__ */ t(ss, { cell: n, href: n.href }, n.label)) });
}
const ds = "_root_5jkzr_2", us = "_track_5jkzr_8", ms = "_thumb_5jkzr_46", hs = "_labelHidden_5jkzr_64", ws = "_label_5jkzr_64", _s = "_lockedNote_5jkzr_84", Pe = {
  root: ds,
  track: us,
  thumb: ms,
  labelHidden: hs,
  label: ws,
  lockedNote: _s
};
function fs(e) {
  return e ? `${Pe.label} ${Pe.labelHidden}` : Pe.label;
}
function Fe({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: c }) {
  const s = $(), u = `${s}switch`, d = l ? !0 : a, m = r || l;
  return /* @__PURE__ */ o("span", { className: `${Pe.root} ward-switchrow`, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": d,
        "aria-label": e,
        "aria-labelledby": s,
        "aria-describedby": i,
        className: `${Pe.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: m,
        onClick: () => !m && (n == null ? void 0 : n(!d)),
        children: /* @__PURE__ */ t("span", { className: Pe.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: s, htmlFor: u, className: fs(c), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: Pe.lockedNote, children: "always on" })
    ] })
  ] });
}
const vs = "_bar_5ocpj_2", bs = "_skip_5ocpj_11", ps = "_mark_5ocpj_22", gs = "_nav_5ocpj_30", ys = "_list_5ocpj_34", Ns = "_select_5ocpj_40", ks = "_dest_5ocpj_49", $s = "_actor_5ocpj_68", Cs = "_actorMark_5ocpj_81", Ss = "_actorLabel_5ocpj_86", Rs = "_tagline_5ocpj_105", de = {
  bar: vs,
  skip: bs,
  mark: ps,
  nav: gs,
  list: ys,
  select: Ns,
  dest: ks,
  actor: $s,
  actorMark: Cs,
  actorLabel: Ss,
  tagline: Rs
};
function Ts(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function xs(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function W$({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: c = "main" }) {
  const s = xs(r);
  return /* @__PURE__ */ o("header", { className: de.bar, children: [
    /* @__PURE__ */ t("a", { className: `${de.skip} ward-target`, href: `#${c}`, children: "Skip to content" }),
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
    s && /* @__PURE__ */ o("span", { className: de.actor, children: [
      /* @__PURE__ */ t("span", { className: de.actorLabel, children: s }),
      /* @__PURE__ */ t("span", { className: de.actorMark, "aria-hidden": "true", children: Ts(s) })
    ] })
  ] });
}
const Ls = "_tree_1ite1_2", As = "_item_1ite1_6", Es = "_row_1ite1_10", Is = "_button_1ite1_22", fa = {
  tree: Ls,
  item: As,
  row: Es,
  button: Is
}, Gt = De(null);
function Ms({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = Na({ orientation: "vertical" });
  return /* @__PURE__ */ t(Gt.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: fa.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const qs = { ArrowRight: !0, ArrowLeft: !1 };
function vt(e) {
  return e ? !0 : void 0;
}
function Bs(e, a) {
  const n = qs[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function Ps(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function js(e) {
  const a = [fa.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Hs(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Fs(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Os(e) {
  return typeof e == "string" ? e : void 0;
}
function Ds({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Ws({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function Kt(e) {
  const a = Oe(Gt);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Hs(e);
  return /* @__PURE__ */ o("li", { className: fa.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: js(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": n,
        "data-depth": e.depth,
        "data-unresolved": vt(e.unresolved),
        "data-inherited": vt(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${fa.button} ward-treeitem-btn`,
            onClick: () => Ps(e),
            onKeyDown: (r) => Bs(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Fs(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: Os(e.label), children: e.label }),
              /* @__PURE__ */ t(Ds, { value: e.detail }),
              /* @__PURE__ */ t(Ws, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const zs = "_frame_1fj9j_2", Gs = "_subjectRail_1fj9j_22", Ks = "_subject_1fj9j_22", Us = "_rail_1fj9j_42", Vs = "_record_1fj9j_64", Xs = "_recordBody_1fj9j_69", Ys = "_stageGrid_1fj9j_118", Js = "_band_1fj9j_144", Qs = "_bandBody_1fj9j_153", Zs = "_bandActions_1fj9j_158", ed = "_scroller_1fj9j_166", ad = "_board_1fj9j_192", td = "_laneCount_1fj9j_200", nd = "_lanes_1fj9j_210", Y = {
  frame: zs,
  subjectRail: Gs,
  subject: Ks,
  rail: Us,
  record: Vs,
  recordBody: Xs,
  stageGrid: Ys,
  band: Js,
  bandBody: Qs,
  bandActions: Zs,
  scroller: ed,
  board: ad,
  laneCount: td,
  lanes: nd
};
function z$({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function bt(e) {
  return e ? "true" : void 0;
}
function G$({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": n, "data-ruled": bt(i), children: [
    /* @__PURE__ */ t("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Y.rail, "data-sticky": bt(l), "aria-label": r, children: a })
  ] });
}
function K$({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: c, measure: s }) {
  return c === "inline" ? /* @__PURE__ */ t("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(ft, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(ft, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Y.recordBody, "data-pad": l, "data-measure": s, children: a })
  ] });
}
const rd = "_form_1j8ub_2", ld = "_fields_1j8ub_9", od = "_actions_1j8ub_19", Aa = {
  form: rd,
  fields: ld,
  actions: od
};
function U$({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Aa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Aa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Aa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function V$({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Y.bandActions, children: a })
  ] });
}
const id = "(max-width: 767.98px)";
function Qa({ label: e, children: a, laneCount: n, onOverflow: r }) {
  const l = g(null);
  ta(l, n ?? Bn.count(a), r);
  const i = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function cd({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(E, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: l }),
    /* @__PURE__ */ t(Qa, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function sd({ lanes: e, label: a }) {
  const [n, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !n, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ t(Qa, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ t(Pn, { children: l.content }, l.id)) })
  ] });
}
function X$({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Va(id);
  return n === void 0 ? /* @__PURE__ */ t(Qa, { label: a, children: e }) : l ? /* @__PURE__ */ t(cd, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(sd, { lanes: n, label: a });
}
function Y$({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = g(null), i = Math.max(e, 1);
  ta(l, i);
  const c = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ t("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": n, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: c, children: a });
}
const dd = "_block_1o5o7_2", ud = "_sentence_1o5o7_15", md = "_meta_1o5o7_20", hd = "_action_1o5o7_25", wd = "_strip_1o5o7_29", _d = "_loading_1o5o7_48", fd = "_label_1o5o7_56", vd = "_counter_1o5o7_63", _e = {
  block: dd,
  sentence: ud,
  meta: md,
  action: hd,
  strip: wd,
  loading: _d,
  label: fd,
  counter: vd
};
function bd({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: _e.action, children: /* @__PURE__ */ t(_, { onClick: e.onClick, children: e.label }) });
}
function Ra({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: _e.sentence, children: e }),
    n,
    /* @__PURE__ */ t(bd, { action: a })
  ] });
}
function pd(e) {
  return /* @__PURE__ */ t(Ra, { ...e, kind: "ward-emptystate" });
}
function J$({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Ra, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function Q$(e) {
  return /* @__PURE__ */ t(Ra, { ...e });
}
function Z$({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Ra, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    se(a)
  ] }) });
}
function e0({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    se(e),
    ". Showing snapshot from ",
    se(a)
  ] });
}
function a0({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    se(a)
  ] });
}
function t0({ label: e, startedAt: a }) {
  const n = g(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  I(() => {
    const c = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Ka(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: _e.counter, children: Ga(i) }) : null
  ] });
}
const gd = "_note_tlubt_2", yd = {
  note: gd
};
function Nd({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: yd.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const kd = "_card_13pd2_2", $d = "_hit_13pd2_29", Cd = "_head_13pd2_42", Sd = "_title_13pd2_49", Rd = "_meta_13pd2_54", Td = "_fields_13pd2_55", xd = "_who_13pd2_68", Ld = "_sep_13pd2_72", Ad = "_mono_13pd2_76", Ed = "_field_13pd2_55", Id = "_last_13pd2_92", Md = "_reason_13pd2_104", Q = {
  card: kd,
  hit: $d,
  head: Cd,
  title: Sd,
  meta: Rd,
  fields: Td,
  who: xd,
  sep: Ld,
  mono: Ad,
  field: Ed,
  last: Id,
  reason: Md
}, qd = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Bd(e, a, n) {
  const r = sa(e, "blue"), l = sa(e, "orange"), i = sa(e, "green"), c = g(/* @__PURE__ */ new Set());
  I(() => {
    if (!n) return;
    const s = { blue: r, orange: l, green: i };
    return n.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = qd[u.type];
      d && s[d]();
    });
  }, [r, n, i, a, l]);
}
const Pd = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function jd(e, a) {
  return Pd[a](e);
}
function Hd({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: Q.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: Q.meta, children: [
    /* @__PURE__ */ t(Le, { className: Q.who, text: `waits on ${e.run.agent}` }),
    n,
    /* @__PURE__ */ t($e, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: Q.meta, children: [
    /* @__PURE__ */ t(Le, { className: Q.who, text: `waits on ${e.waitsOn}` }),
    n,
    /* @__PURE__ */ o("span", { className: Q.mono, children: [
      ce(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Fd({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: Q.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function Od({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Q.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Dd({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: Q.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: Q.field, children: jd(e, n) }, n)) });
}
const Ha = (e) => e ? !0 : void 0;
function Wd(e) {
  return { "--stream": fe(e.streamStep, "id") };
}
function zd(e, a, n) {
  e == null || e(a, n);
}
function Gd(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Kd({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: Q.last, "data-stale": Ha(a), children: n }) : null;
}
function Ta(e) {
  const a = e.fields ?? [], n = e.item, r = g(null);
  Bd(r, n.key, e.feed);
  const l = Gd(e.feed), i = Wd(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: Q.card,
      style: i,
      "data-selected": Ha(e.selected),
      "data-flagged": Ha(n.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: Q.hit, onClick: (c) => zd(e.onOpen, n.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Fd, { item: n }),
        /* @__PURE__ */ t(Le, { as: "p", className: Q.title, text: n.title }),
        /* @__PURE__ */ t(Hd, { item: n, connection: l }),
        /* @__PURE__ */ t(Od, { reason: n.blockedReason }),
        /* @__PURE__ */ t(Dd, { item: n, fields: a }),
        /* @__PURE__ */ t(Kd, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Ud = "_column_10sxg_3", Vd = "_head_10sxg_24", Xd = "_label_10sxg_33", Yd = "_count_10sxg_42", Jd = "_list_10sxg_56", Qe = {
  column: Ud,
  head: Vd,
  label: Xd,
  count: Yd,
  list: Jd
};
function Ut(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Qd({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: Qe.head, children: [
    /* @__PURE__ */ t("h2", { className: Qe.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: Qe.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Zd(e) {
  return /* @__PURE__ */ t("div", { className: Qe.list, role: "list", children: e.rows.map((a, n) => {
    var r;
    return /* @__PURE__ */ t(
      Ta,
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
function eu({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = $(), m = e.cap !== void 0 && a.length > e.cap, f = Ut(a, r);
  return /* @__PURE__ */ o("section", { className: Qe.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ t(Qd, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ t(Zd, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, rows: f }),
    m && /* @__PURE__ */ t(Nd, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const au = "_foot_1tnhe_2", tu = "_note_1tnhe_13", nu = "_link_1tnhe_19", Ea = {
  foot: au,
  note: tu,
  link: nu
};
function n0({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ea.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: Ea.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${Ea.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const ru = "_head_m60n1_3", lu = "_identity_m60n1_12", ou = "_titleRow_m60n1_18", iu = "_title_m60n1_18", cu = "_key_m60n1_35", su = "_rollup_m60n1_45", du = "_tools_m60n1_53", uu = "_swatch_m60n1_65", mu = "_mark_m60n1_72", ge = {
  head: ru,
  identity: lu,
  titleRow: ou,
  title: iu,
  key: cu,
  rollup: su,
  tools: du,
  swatch: uu,
  mark: mu
}, pt = "initials:";
function hu(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function wu(e) {
  const a = [hu(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function _u(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    wu(e)
  ] });
}
function fu(e) {
  return e.startsWith(pt) ? e.slice(pt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function vu({ markRef: e, streamStep: a }) {
  const n = { "--stream": fe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ge.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: fu(e) }) : /* @__PURE__ */ t("span", { className: ge.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function bu({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(E, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function r0({
  stream: e,
  rollups: a,
  connection: n,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: c,
  onConfigure: s,
  actions: u
}) {
  return /* @__PURE__ */ o("div", { className: ge.head, children: [
    /* @__PURE__ */ o("div", { className: ge.identity, children: [
      /* @__PURE__ */ o("div", { className: ge.titleRow, children: [
        /* @__PURE__ */ t(vu, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ge.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ge.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ge.rollup, "aria-live": "polite", children: _u(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ge.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(bu, { owners: l, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ t(_, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ t(Ja, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const pu = "_head_16yf6_14", gu = "_line_16yf6_15", yu = "_cHandle_16yf6_36", Nu = "_cName_16yf6_41", ku = "_nameLine_16yf6_49", $u = "_cLabel_16yf6_56", Cu = "_cCap_16yf6_61", Su = "_cShown_16yf6_66", Ru = "_name_16yf6_49", Tu = "_noCap_16yf6_88", xu = "_state_16yf6_102", Lu = "_handle_16yf6_111", Au = "_sub_16yf6_137", P = {
  head: pu,
  line: gu,
  cHandle: yu,
  cName: Nu,
  nameLine: ku,
  cLabel: $u,
  cCap: Cu,
  cShown: Su,
  name: Ru,
  noCap: Tu,
  state: xu,
  handle: Lu,
  sub: Au
}, Eu = "can't be hidden or collapsed", Iu = "terminal · counted, not a column";
function l0() {
  return /* @__PURE__ */ o("div", { className: P.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: P.cHandle }),
    /* @__PURE__ */ t("span", { className: P.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: P.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: P.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: P.cShown, children: "Shown" })
  ] });
}
function Mu(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function qu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function gt(e) {
  return e.gate ? Eu : e.terminal ? Iu : qu(e.agentsMounted);
}
function Bu(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Pu({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: P.cName, children: [
    /* @__PURE__ */ o("span", { className: P.nameLine, children: [
      /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    gt(e) && /* @__PURE__ */ t("span", { className: P.sub, children: gt(e) })
  ] });
}
function ju(e) {
  return e === void 0 ? "" : String(e);
}
function Hu(e) {
  return e === "" ? void 0 : Number(e);
}
function Fu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ t("span", { className: P.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: P.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (n) => Bu(n, a),
      children: "⠿"
    }
  ) });
}
function Ou({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${P.cCap} ${P.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: P.cCap, children: /* @__PURE__ */ t(E, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: ju(a.cap), onChange: (r) => n({ ...a, cap: Hu(r) }) }) });
}
function Du({ stage: e, config: a, onChange: n }) {
  const r = Mu(e, a.shown), l = e.gate || e.terminal, i = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: P.cShown, children: [
    /* @__PURE__ */ t(Fe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ t("span", { className: P.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function Wu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function o0({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: P.line, "data-kind": Wu(e), children: [
    /* @__PURE__ */ t(Fu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(Pu, { stage: e }),
    /* @__PURE__ */ t("span", { className: P.cLabel, children: /* @__PURE__ */ t(E, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(Ou, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(Du, { stage: e, config: a, onChange: n })
  ] });
}
const zu = "_body_hn6d6_2", Gu = "_head_hn6d6_9", Ku = "_summary_hn6d6_19", Uu = "_block_hn6d6_20", Vu = "_actionsBlock_hn6d6_21", Xu = "_title_hn6d6_41", Yu = "_note_hn6d6_46", Ju = "_k_hn6d6_51", Qu = "_kv_hn6d6_58", Zu = "_row_hn6d6_64", em = "_label_hn6d6_75", am = "_value_hn6d6_84", tm = "_quote_hn6d6_90", nm = "_actions_hn6d6_21", rm = "_resolve_hn6d6_103", j = {
  body: zu,
  head: Gu,
  summary: Ku,
  block: Uu,
  actionsBlock: Vu,
  title: Xu,
  note: Yu,
  k: Ju,
  kv: Qu,
  row: Zu,
  label: em,
  value: am,
  quote: tm,
  actions: nm,
  resolve: rm
};
function lm(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function om(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t($e, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function im(e) {
  const a = na(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function cm(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ca(im(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...lm(e),
    ...om(e, a)
  ];
}
function sm({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: j.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: j.k, children: a }),
    e
  ] });
}
function dm({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: j.head, children: [
    /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function um({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: j.block, children: [
    /* @__PURE__ */ t("p", { className: j.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: j.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: j.note, children: e.agentMeta })
  ] }) : null;
}
function i0({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = $(), d = cm(e, l);
  return /* @__PURE__ */ t(ra, { kind: "drawer", labelledBy: u, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: j.body, children: [
    /* @__PURE__ */ t(dm, { item: e }),
    /* @__PURE__ */ o("div", { className: j.summary, children: [
      /* @__PURE__ */ t("h2", { className: j.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: j.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: j.kv, children: d.map(([m, f]) => /* @__PURE__ */ o("div", { className: j.row, children: [
      /* @__PURE__ */ t("dt", { className: j.label, children: m }),
      /* @__PURE__ */ t("dd", { className: j.value, children: f })
    ] }, m)) }),
    /* @__PURE__ */ t(um, { item: e }),
    /* @__PURE__ */ o("div", { className: j.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: j.actions, children: a }),
      s && /* @__PURE__ */ t("p", { className: j.note, children: s })
    ] }),
    /* @__PURE__ */ t(sm, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const mm = "_root_3azmy_2", hm = "_list_3azmy_7", wm = "_item_3azmy_12", _m = "_box_3azmy_18", fm = "_text_3azmy_23", vm = "_note_3azmy_28", Ge = {
  root: mm,
  list: hm,
  item: wm,
  box: _m,
  text: fm,
  note: vm
};
function xa({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ge.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ge.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ge.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ge.box, children: /* @__PURE__ */ t(Ya, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ge.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ge.note} ward-checklist-note`, children: a })
  ] });
}
const bm = "_rail_ke7ch_2", pm = "_k_ke7ch_11", gm = "_head_ke7ch_19", ym = "_section_ke7ch_25", Nm = "_card_ke7ch_38", km = "_strip_ke7ch_42", $m = "_skeleton_ke7ch_56", Cm = "_skeletonLabel_ke7ch_70", Sm = "_bar_ke7ch_76", Rm = "_note_ke7ch_85", me = {
  rail: bm,
  k: pm,
  head: gm,
  section: ym,
  card: Nm,
  strip: km,
  skeleton: $m,
  skeletonLabel: Cm,
  bar: Sm,
  note: Rm
};
function Tm(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ia({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function xm({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function Lm({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(eu, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function Am(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(Lm, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(xm, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function c0(e) {
  const a = Tm(e.onOpen), n = Ut(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Ia, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(Ta, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ia, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(Am, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Ia, { title: "Effect of this config", children: /* @__PURE__ */ t(xa, { items: e.effects, density: "compact" }) })
  ] });
}
function Em(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function Im(e) {
  return Math.ceil(e.length / 2);
}
function Mm(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Vt(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function qm(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Vt(e);
  l !== void 0 && n(l), r(Mm(e.type));
}
function Bm(e, a, n, r, l) {
  I(() => {
    if (e !== null)
      return e.subscribe(a, (i) => qm(i, n, r, l));
  }, [e, a, n, r, l]);
}
function Pm(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function jm(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Hm(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Fm(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(Im(a ?? [])) + ")"
  };
}
function Om(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Dm(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: re(e.cost) }) : null;
}
function Wm(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function zm(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t($e, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Gm(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Km(e, a) {
  return a === void 0 ? e : Em(e, a.ref);
}
function Um(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function aa(e) {
  return e === !0 ? "true" : void 0;
}
function Xt(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = g(null), i = sa(l), c = g(/* @__PURE__ */ new Set()), [s, u] = p(Pm(a));
  Bm(e.feed, a.key, c, u, i);
  const d = jm(a, r), m = Hm(a, n), f = Fm(a, e.fields), v = Gm(a, n, s);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Um(e),
      className: "ward-workcard",
      "data-flagged": aa(a.flagged),
      "data-selected": aa(e.selected),
      style: f,
      ref: Km(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Om(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: d.role, label: d.label }),
          Dm(a, e.fields),
          Wm(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          zm(n, s, e.connection, a.changedAt),
          v !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: v, children: v }) : null
        ] })
      ]
    }
  ) });
}
function Vm({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Xm(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Ym(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Jm(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Vm, { count: e.items.length, cap: e.column.cap });
}
function Qm(e, a) {
  return e.roving ?? a;
}
function Zm(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function eh(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    Xt,
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
function ah(e) {
  const a = $(), n = Na({ orientation: "vertical" }), r = Qm(e, n), l = Xm(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": aa(l), "data-gate": aa(e.column.gate), children: [
    Ym(e.column, e.items.length, a),
    Jm(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Zm(e, n), children: eh(e, r) })
  ] });
}
function th(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function nh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(E, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function rh(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function s0(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: th(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      nh(e),
      rh(e.onConfigure),
      /* @__PURE__ */ t(Ja, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function lh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function oh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Fe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Fe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function ih(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function d0(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": aa(lh(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: oh(e) }),
    /* @__PURE__ */ t(E, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(Ht, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    ih(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function u0(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(Xt, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(ah, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function ch(e, a) {
  const n = Vt(e);
  n !== void 0 && a(n);
}
function sh(e, a, n) {
  I(() => {
    if (e != null)
      return e.subscribe(a, (r) => ch(r, n));
  }, [e, a, n]);
}
function dh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function uh(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function mh(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t($e, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function hh(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function m0(e) {
  var c;
  const a = e.item, n = a.run, [r, l] = p((c = a.run) == null ? void 0 : c.lastStep);
  sh(e.feed, a.key, l);
  const i = [...dh(a), ...uh(a)];
  return /* @__PURE__ */ o(ra, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: s[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      mh(n, r)
    ] }),
    hh(a, e.actions)
  ] });
}
const wh = "_card_1u4a0_2", _h = "_head_1u4a0_28", fh = "_mark_1u4a0_36", vh = "_name_1u4a0_48", bh = "_chips_1u4a0_69", ph = "_description_1u4a0_75", gh = "_run_1u4a0_80", yh = "_sep_1u4a0_89", Nh = "_facts_1u4a0_94", kh = "_fact_1u4a0_94", $h = "_factLabel_1u4a0_107", Ch = "_factValue_1u4a0_111", le = {
  card: wh,
  head: _h,
  mark: fh,
  name: vh,
  chips: bh,
  description: ph,
  run: gh,
  sep: yh,
  facts: Nh,
  fact: kh,
  factLabel: $h,
  factValue: Ch
}, Sh = { live: "done", draft: "running", paused: "meta" };
function Rh(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function Th({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: Sh[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function xh({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: le.description, children: e });
}
function Lh({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t($e, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function Ah({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ t("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function Eh(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Ih({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: c }) {
  const s = { "--stream": fe(e.streamStep, "id") }, u = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: Rh(c),
      style: s,
      "data-selected": u,
      "data-paused": Eh(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ t("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ t(xh, { description: e.description }),
        /* @__PURE__ */ t(Lh, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(Th, { versions: e.versions }),
        /* @__PURE__ */ t(Ah, { facts: i })
      ]
    }
  );
}
const Mh = "_list_4dcyc_2", qh = "_row_4dcyc_11", Bh = "_head_4dcyc_23", Ph = "_id_4dcyc_30", jh = "_lock_4dcyc_35", Hh = "_reason_4dcyc_41", Fh = "_remove_4dcyc_46", Oh = "_clauses_4dcyc_50", Dh = "_clause_4dcyc_50", Wh = "_label_4dcyc_64", zh = "_cell_4dcyc_71", Gh = "_value_4dcyc_76", ie = {
  list: Mh,
  row: qh,
  head: Bh,
  id: Ph,
  lock: jh,
  reason: Hh,
  remove: Fh,
  clauses: Oh,
  clause: Dh,
  label: Wh,
  cell: zh,
  value: Gh
}, Yt = De(!1);
function h0({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(Yt.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function Kh({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(E, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function Uh({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function Vh({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(Uh, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function yt(e, a) {
  return e.locked ? void 0 : a;
}
function w0({ rule: e, onChange: a, onRemove: n }) {
  if (!Oe(Yt)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = yt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Vh, { rule: e, onRemove: yt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(Kh, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Xh = "_ladder_j98f1_2", Yh = "_cell_j98f1_7", Jh = "_empty_j98f1_26", Qh = "_name_j98f1_34", Zh = "_holder_j98f1_40", ew = "_request_j98f1_46", aw = "_swatches_j98f1_51", tw = "_swatch_j98f1_51", nw = "_tilesFrame_j98f1_78", rw = "_tiles_j98f1_78", lw = "_tile_j98f1_78", ow = "_bar_j98f1_117", iw = "_hex_j98f1_128", cw = "_note_j98f1_138", x = {
  ladder: Xh,
  cell: Yh,
  empty: Jh,
  name: Qh,
  holder: Zh,
  request: ew,
  swatches: aw,
  swatch: tw,
  tilesFrame: nw,
  tiles: rw,
  tile: lw,
  bar: ow,
  hex: iw,
  note: cw
}, _0 = "not validated yet, pending a CVD matrix and dark stepping";
function sw(e) {
  return e.reserved ? "reserved" : $a(e.step) ? "validated" : "partial";
}
function Jt(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function dw(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function uw({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(Ae, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${x.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function mw(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function hw(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Nt = (e) => String(e).padStart(2, "0");
function ww(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? Jt(e, void 0);
}
function _w({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("span", { className: `${x.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${x.hex} ward-ladder-hex`, children: r ? `step ${Nt(e)}` : Qn(e) }),
    /* @__PURE__ */ t("span", { className: `${x.note} ward-ladder-note`, children: r ? n : `Step ${Nt(e)} · ${n}` })
  ] });
}
function fw({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const c = sw(e), s = Jt(c, n), u = s !== "free", d = u || i, m = a === e.step, f = e.name ?? `Step ${e.step}`, v = () => {
    d || r(e.step);
  }, y = `${f} · ${l === "tiles" && m ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": y, ...hw(u, m, d), "data-validation": c, style: dw(e, c), onClick: v, onKeyDown: (q) => mw(q, v) }, label: y, name: f, holder: s, validation: c, note: ww(c, n, m), step: e.step };
}
const vw = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${x.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${x.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(_w, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${x.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(uw, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${x.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${x.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function bw(e) {
  return vw[e.presentation](fw(e));
}
function pw(e) {
  for (const a of e)
    if (!a.reserved && !ka(a.step)) throw new Error("colour ladder renders token steps only");
}
function gw() {
  return /* @__PURE__ */ o("div", { className: `${x.cell} ward-ladder-cell ${x.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${x.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${x.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${x.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function yw(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Nw = { list: x.ladder, swatches: x.swatches, tiles: x.tilesFrame };
function kw() {
  return /* @__PURE__ */ o("div", { className: `${x.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${x.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${x.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${x.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const $w = { list: gw, swatches: () => null, tiles: kw };
function Cw(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Qt(e) {
  const a = e.takenBy ?? {}, n = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  pw(e.steps);
  const r = yw(e), l = $w[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((c) => /* @__PURE__ */ t(bw, { step: c, value: e.value, taken: a[c.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, c.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Cw(e.disabled === !0), className: `${Nw[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: x.tiles, children: i }) : i });
}
const Sw = "_rail_1el2t_2", Rw = "_section_1el2t_12", Tw = "_sectionFlush_1el2t_22", xw = "_head_1el2t_26", Lw = "_headLabel_1el2t_34", Aw = "_sample_1el2t_42", Ew = "_sampleLabel_1el2t_47", Iw = "_sampleTitle_1el2t_54", Mw = "_sampleMeta_1el2t_59", qw = "_trace_1el2t_65", Bw = "_traceHead_1el2t_70", Pw = "_steps_1el2t_78", jw = "_step_1el2t_78", Hw = "_stepTitle_1el2t_97", Fw = "_hollow_1el2t_107", Ow = "_stepBody_1el2t_115", Dw = "_stepDetail_1el2t_127", Ww = "_publish_1el2t_132", zw = "_reason_1el2t_138", Gw = "_note_1el2t_143", Kw = "_reveal_1el2t_148", N = {
  rail: Sw,
  section: Rw,
  sectionFlush: Tw,
  head: xw,
  headLabel: Lw,
  sample: Aw,
  sampleLabel: Ew,
  sampleTitle: Iw,
  sampleMeta: Mw,
  trace: qw,
  traceHead: Bw,
  steps: Pw,
  step: jw,
  stepTitle: Hw,
  hollow: Fw,
  stepBody: Ow,
  stepDetail: Dw,
  publish: Ww,
  reason: zw,
  note: Gw,
  reveal: Kw
}, kt = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Uw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Vw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Xw = { notSimulated: "not simulated", running: "running" };
function Yw(e) {
  return e.presentation === "foundry";
}
function Jw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Qw(e, a) {
  var r;
  const n = Uw[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Zw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function e_(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function a_(e) {
  if (Zw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function t_(e) {
  const [a, n] = p(!1);
  I(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${N.step} ${N.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function n_(e) {
  const a = Xw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: N.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(Ae, { size: 6, kind: Vw[e.kind], label: e.kind });
}
function r_(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: N.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function l_(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t($e, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function o_(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(t_, { kind: a.kind, children: [
    /* @__PURE__ */ t(n_, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: N.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: N.stepTitle, children: a.title }),
      /* @__PURE__ */ t(r_, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(l_, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function i_(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Zt(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${N.trace} ${N.section}`, children: [
    /* @__PURE__ */ t("p", { className: N.traceHead, id: a, children: i_(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: N.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(o_, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function c_(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${N.sample} ${N.section}`, children: [
    /* @__PURE__ */ t("p", { className: N.sampleLabel, children: "Sample item" }),
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
function s_(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + se(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${N.sampleMeta} ${N.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function d_(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Mt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: N.sectionFlush, children: /* @__PURE__ */ t(Sa, { divided: !0, cells: a }) });
}
function u_(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Mt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function m_(e) {
  const a = u_(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: N.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: N.sectionFlush, children: /* @__PURE__ */ t(Sa, { divided: !0, cells: a }) });
}
function en(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("p", { className: `${N.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function h_(e) {
  return /* @__PURE__ */ o("div", { className: `${N.publish} ${N.section}`, children: [
    /* @__PURE__ */ t(en, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: N.note, children: e.note })
  ] });
}
function w_(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${N.publish} ${N.section}`, children: /* @__PURE__ */ t(en, { reason: e.reason, onPublish: e.onPublish }) });
}
function an(e) {
  return /* @__PURE__ */ o("div", { className: `${N.head} ${N.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: N.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: kt[e.run.status].role, label: kt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t($e, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function __(e, a) {
  const [n, r] = p(e.steps);
  return I(() => r(e.steps), [e.steps]), I(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var c, s;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((c = l.step) == null ? void 0 : c.label) ?? "step", detail: (s = l.step) == null ? void 0 : s.tool }];
        });
      });
  }, [a, e.status]), n;
}
function f_(e) {
  var n;
  e_(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(an, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(c_, { sample: e.run.sample }),
    /* @__PURE__ */ t(Zt, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(d_, { run: e.run }),
    /* @__PURE__ */ t("div", { className: N.section, children: /* @__PURE__ */ t(xa, { items: e.checklist }) }),
    /* @__PURE__ */ t(h_, { reason: Jw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function v_(e) {
  var r;
  const a = __(e.run, e.feed);
  a_(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(an, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(s_, { sample: e.run.sample }),
    /* @__PURE__ */ t(Zt, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(m_, { run: e.run }),
    /* @__PURE__ */ t("div", { className: N.section, children: /* @__PURE__ */ t(xa, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(w_, { reason: Qw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function f0(e) {
  return Yw(e) ? /* @__PURE__ */ t(v_, { ...e }) : /* @__PURE__ */ t(f_, { ...e });
}
const b_ = "_list_142ip_3", p_ = "_row_142ip_9", g_ = "_condition_142ip_18", y_ = "_action_142ip_24", da = {
  list: b_,
  row: p_,
  condition: g_,
  action: y_
}, tn = De(!1);
function v0({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(tn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: da.list, "aria-label": a, children: e }) });
}
function b0({ rule: e }) {
  if (!Oe(tn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: da.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: da.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: da.action, children: e.then })
  ] });
}
const N_ = "_move_tmppt_3", k_ = {
  move: N_
};
function Fa(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function nn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function rn(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function $t(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function $_(e) {
  return e === "up" ? "down" : "up";
}
function C_(e, a) {
  const n = $t(e, a.id, a.direction) ?? $t(e, a.id, $_(a.direction));
  n == null || n.focus();
}
function ln() {
  const e = g(null), [a, n] = p(null), [r, l] = p("");
  return I(() => {
    e.current !== null && a !== null && C_(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    n(c), l(s);
  } };
}
function on({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function va({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${k_.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const S_ = "_body_1h15q_2", R_ = "_title_1h15q_8", T_ = "_section_1h15q_13", x_ = "_legend_1h15q_18", L_ = "_stages_1h15q_26", A_ = "_stage_1h15q_26", E_ = "_stageIndex_1h15q_44", I_ = "_stageName_1h15q_50", M_ = "_footer_1h15q_59", q_ = "_note_1h15q_66", B_ = "_reason_1h15q_71", P_ = "_actions_1h15q_76", j_ = "_webHead_1h15q_83", H_ = "_kicker_1h15q_92", F_ = "_webTitle_1h15q_99", O_ = "_webBody_1h15q_105", D_ = "_webSection_1h15q_109", W_ = "_sectionHead_1h15q_121", z_ = "_sectionNote_1h15q_129", G_ = "_formLabel_1h15q_134", K_ = "_identityRow_1h15q_139", U_ = "_nameCell_1h15q_145", V_ = "_keyCell_1h15q_150", X_ = "_colourCell_1h15q_154", Y_ = "_colourStatus_1h15q_161", J_ = "_webStages_1h15q_166", Q_ = "_webStageList_1h15q_172", Z_ = "_webStage_1h15q_166", ef = "_webIndex_1h15q_191", af = "_webStageName_1h15q_196", tf = "_webMoves_1h15q_201", nf = "_addStage_1h15q_215", rf = "_addStageButton_1h15q_223", lf = "_addStageNote_1h15q_231", of = "_webFooter_1h15q_236", cf = "_webFooterNotes_1h15q_244", sf = "_webNote_1h15q_251", w = {
  body: S_,
  title: R_,
  section: T_,
  legend: x_,
  stages: L_,
  stage: A_,
  stageIndex: E_,
  stageName: I_,
  footer: M_,
  note: q_,
  reason: B_,
  actions: P_,
  webHead: j_,
  kicker: H_,
  webTitle: F_,
  webBody: O_,
  webSection: D_,
  sectionHead: W_,
  sectionNote: z_,
  formLabel: G_,
  identityRow: K_,
  nameCell: U_,
  keyCell: V_,
  colourCell: X_,
  colourStatus: Y_,
  webStages: J_,
  webStageList: Q_,
  webStage: Z_,
  webIndex: ef,
  webStageName: af,
  webMoves: tf,
  addStage: nf,
  addStageButton: rf,
  addStageNote: lf,
  webFooter: of,
  webFooterNotes: cf,
  webNote: sf
}, df = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], cn = "not in catalogue";
function uf(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${cn}` }, ...n];
}
function mf({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(E, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${cn}`;
  return /* @__PURE__ */ t(E, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: uf(n, e.name), invalid: i, onChange: r });
}
function sn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function hf(e) {
  const a = g([]), n = g(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function wf({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: c }) {
  const s = sn(a, n), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: w.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: w.webStageName, children: /* @__PURE__ */ t(mf, { stage: a, index: n, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ t(E, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: df, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(va, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      n < r - 1 && /* @__PURE__ */ t(va, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function _f({ stages: e, onChange: a, catalogue: n }) {
  const r = hf(e.length), l = ln(), i = (s, u) => {
    const d = nn(s, u);
    r.current = Fa(r.current, s, d), l.moved({ id: r.current[d], direction: u }, rn(sn(e[s], s), d, e.length)), a(Fa(e, s, d));
  }, c = (s, u) => a(e.map((d, m) => m === s ? u : d));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ t(wf, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: n, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ t(on, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const ff = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], vf = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], bf = "A new stream starts as a draft. Nothing runs on it until you publish it.", pf = "Create is disabled: name the stream and give it a key first.", gf = "reorder with the ↑ ↓ buttons · min 2";
function Za(e, a) {
  return !e.reserved && $a(e.step) && a[e.step] === void 0;
}
function yf(e, a) {
  const n = e.find((r) => Za(r, a));
  return n ? n.step : 1;
}
function Nf({ stages: e, onMove: a }) {
  const n = ln(), r = (l, i) => {
    const c = nn(l, i);
    n.moved({ id: e[l].id, direction: i }, rn(e[l].name, c, e.length)), a(l, c);
  };
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t(va, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(va, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(on, { text: n.announcement })
  ] });
}
function kf({ reason: e, onCreate: a, onDraft: n }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ t("p", { className: w.note, children: bf }),
    e && /* @__PURE__ */ t("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ t(_, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function $f(e, a) {
  return e !== "" && a !== "" ? null : pf;
}
function Cf(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = vf, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = $(), [m, f] = p(""), [v, y] = p(""), [L, q] = p(a[0].value), [oe, Ce] = p(() => yf(n, r)), [te, We] = p(e.stages ?? ff), [ze, C] = p(l[0].value), z = { name: m, key: v, streamStep: oe, owner: L, stages: te, policy: ze }, ve = $f(m, v);
  return /* @__PURE__ */ t(ra, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ t("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ t("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ t(E, { kind: "input", label: "Stream name", value: m, onChange: f }),
      /* @__PURE__ */ t(E, { kind: "input", label: "Key", value: v, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(E, { kind: "select", label: "Owner", value: L, onChange: q, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ t("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ t(Qt, { label: "Stream colour", steps: n, value: oe, onChange: Ce, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ t("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ t(Nf, { stages: te, onMove: (Ee, Mn) => We(Fa(te, Ee, Mn)) })
    ] }),
    /* @__PURE__ */ t(Wt, { legend: "Loop policy", options: l, value: ze, onChange: C }),
    /* @__PURE__ */ t(kf, { reason: ve, onCreate: () => i(z), onDraft: () => c(z) })
  ] }) });
}
const dn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Sf = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Rf(e, a, n, r, l, i) {
  var s;
  const c = ((s = dn.find((u) => u.value === l)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: c, stages: i };
}
function Tf(e, a) {
  return xf(e) && Lf(e, a) && Af(e);
}
function xf(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Lf(e, a) {
  return e.colourStep === null || Za({ step: e.colourStep }, a);
}
function Af(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Ef(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : Za({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function If({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Mf({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ t(If, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: w.reason, children: Sf })
    ] }),
    l && /* @__PURE__ */ t(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function qf({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ t("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function Bf({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: w.webSection, children: [
    /* @__PURE__ */ t("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: w.identityRow, children: [
      /* @__PURE__ */ t("div", { className: w.nameCell, children: /* @__PURE__ */ t(E, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ t("div", { className: w.keyCell, children: /* @__PURE__ */ t(E, { variant: "form", label: "Key", value: n, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function Pf(e) {
  const a = $(), n = $(), r = e.takenBy ?? {}, [l, i] = p(""), [c, s] = p(""), [u, d] = p(e.owners[0] ?? ""), [m, f] = p(null), [v, y] = p("relay"), [L, q] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = Rf(l, c, u, m, v, L), Ce = Tf(oe, r), te = L.find((C) => C.kind === "agent" && C.name.trim() !== ""), We = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ t("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Qt, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: f, takenBy: r })
  ] }), ze = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("p", { className: w.colourStatus, "data-colour-status": "", children: Ef(m, r) }),
    /* @__PURE__ */ t(E, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((C) => ({ value: C, label: C })), onChange: d })
  ] });
  return /* @__PURE__ */ o(ra, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(qf, { titleId: n }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ t(Bf, { name: l, setName: i, streamKey: c, setKey: s, colour: We, owner: ze }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: w.sectionNote, children: gf })
        ] }),
        /* @__PURE__ */ t(_f, { stages: L, onChange: q })
      ] }),
      /* @__PURE__ */ t("section", { className: w.webSection, children: /* @__PURE__ */ t(Wt, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: v, options: dn, onChange: y }) }),
      /* @__PURE__ */ t(Mf, { ready: Ce, draft: oe, agentStage: te, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function p0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Pf, { ...e }) : /* @__PURE__ */ t(Cf, { ...e });
}
const jf = "_row_bs8hc_2", Hf = "_cell_bs8hc_6", Ff = "_condition_bs8hc_11", Of = "_action_bs8hc_18", Df = "_contract_bs8hc_24", Wf = "_contractCondition_bs8hc_33", zf = "_contractAction_bs8hc_39", Z = {
  row: jf,
  cell: Hf,
  condition: Ff,
  action: Of,
  contract: Df,
  contractCondition: Wf,
  contractAction: zf
}, un = ["advance", "block", "escalate", "requestReview"], Ct = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ba(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function et(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Z.action, children: Ct[e.then] }) : /* @__PURE__ */ t(
    E,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: un.map((l) => ({ value: l, label: Ct[l] }))
    }
  );
}
function Gf({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t("span", { className: Z.condition, title: ba(e, r), children: ba(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: et(e, a, n) })
  ] });
}
function Kf({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Z.condition, children: ba(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: et(e, a, n) })
  ] });
}
function Uf({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Z.contractCondition, children: ba(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Z.contractAction, children: et(e, a, n, !0) })
  ] });
}
const Vf = { two: Kf, four: Gf, contract: Uf };
function g0(e) {
  var n;
  if (!un.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Vf[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Xf = "_column_1tf9e_2", Yf = "_head_1tf9e_17", Jf = "_index_1tf9e_23", Qf = "_name_1tf9e_29", Zf = "_meta_1tf9e_38", ev = "_mono_1tf9e_43", av = "_gate_1tf9e_50", tv = "_reviewersLabel_1tf9e_57", nv = "_reviewers_1tf9e_57", rv = "_reviewer_1tf9e_57", lv = "_agents_1tf9e_74", ov = "_workflowColumn_1tf9e_79", iv = "_workflowHead_1tf9e_96", cv = "_stageRow_1tf9e_102", sv = "_stageLabel_1tf9e_109", dv = "_workflowTitle_1tf9e_116", uv = "_workflowMeta_1tf9e_122", mv = "_workflowGate_1tf9e_127", hv = "_gateNote_1tf9e_135", wv = "_cardNote_1tf9e_140", _v = "_reviewerList_1tf9e_145", fv = "_reviewerRow_1tf9e_151", vv = "_reviewerMark_1tf9e_157", bv = "_reviewerName_1tf9e_167", pv = "_terminalCard_1tf9e_173", gv = "_terminalCount_1tf9e_182", yv = "_workflowAgents_1tf9e_188", Nv = "_mount_1tf9e_194", k = {
  column: Xf,
  head: Yf,
  index: Jf,
  name: Qf,
  meta: Zf,
  mono: ev,
  gate: av,
  reviewersLabel: tv,
  reviewers: nv,
  reviewer: rv,
  agents: lv,
  workflowColumn: ov,
  workflowHead: iv,
  stageRow: cv,
  stageLabel: sv,
  workflowTitle: dv,
  workflowMeta: uv,
  workflowGate: mv,
  gateNote: hv,
  cardNote: wv,
  reviewerList: _v,
  reviewerRow: fv,
  reviewerMark: vv,
  reviewerName: bv,
  terminalCard: pv,
  terminalCount: gv,
  workflowAgents: yv,
  mount: Nv
}, kv = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function at(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function mn(e) {
  return `${Math.round(e * 100)}%`;
}
function $v({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: k.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: k.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: k.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Sa, { cells: [
      { value: mn(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function Cv({ stage: e }) {
  return /* @__PURE__ */ t(Sa, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: at(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function Sv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: k.head, children: [
    /* @__PURE__ */ t("span", { className: k.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: k.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: kv[e.kind] })
  ] });
}
function Rv({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: k.meta, children: [
    /* @__PURE__ */ o("span", { className: k.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: k.mono, children: [
      ce(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Tv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t($v, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(Cv, { stage: e }) : null;
}
function xv({ onMount: e }) {
  return e ? /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Lv({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: k.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Sv, { stage: e, titleId: l }),
    /* @__PURE__ */ t(Rv, { stage: e }),
    /* @__PURE__ */ t(Tv, { stage: e }),
    /* @__PURE__ */ t("div", { className: k.agents, children: a.map((c) => /* @__PURE__ */ t(Ih, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ t(xv, { onMount: n })
  ] });
}
const Av = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Ev({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: k.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: k.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: k.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: k.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function Iv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: k.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(Ev, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: k.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: mn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Mv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function qv({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: k.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: k.terminalCount, children: at(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: k.cardNote, children: Mv(e.rolledBackThisWeek) })
  ] });
}
function Bv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Pv(e) {
  if (e.kind === "terminal") return `${at(e.closedThisWeek)} this week`;
  const a = Bv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function jv({ stage: e, titleId: a }) {
  const n = Av[e.kind];
  return /* @__PURE__ */ o("header", { className: k.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: k.stageRow, children: [
      /* @__PURE__ */ o("span", { className: k.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: k.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: k.workflowMeta, children: Pv(e) })
  ] });
}
function Hv(e) {
  return e === "entry" || e === "agent";
}
function Fv({ stage: e, onMount: a }) {
  return a === void 0 || !Hv(e.kind) ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", className: k.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Ov({ stage: e, agentCards: a, onMount: n }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: k.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(jv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Iv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(qv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: k.workflowAgents, children: a }),
    /* @__PURE__ */ t(Fv, { stage: e, onMount: n })
  ] });
}
function Dv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function y0(e) {
  return Dv(e) ? /* @__PURE__ */ t(Ov, { ...e }) : /* @__PURE__ */ t(Lv, { ...e });
}
const Wv = "_row_1jata_6", zv = "_name_1jata_12", Gv = "_compactRow_1jata_13", Kv = "_compactName_1jata_13", Uv = "_cell_1jata_30", Vv = "_chain_1jata_45", Xv = "_owner_1jata_51", Yv = "_mono_1jata_57", Jv = "_compactCell_1jata_79", Qv = "_stack_1jata_96", Zv = "_stat_1jata_103", eb = "_identityLine_1jata_110", ab = "_identity_1jata_110", tb = "_ownerLine_1jata_137", nb = "_link_1jata_150", rb = "_gateMark_1jata_156", lb = "_emptyChain_1jata_161", ob = "_arrow_1jata_167", ib = "_muted_1jata_168", cb = "_define_1jata_173", sb = "_statValue_1jata_180", db = "_policyId_1jata_186", ub = "_sub_1jata_191", b = {
  row: Wv,
  name: zv,
  compactRow: Gv,
  compactName: Kv,
  cell: Uv,
  chain: Vv,
  owner: Xv,
  mono: Yv,
  compactCell: Jv,
  stack: Qv,
  stat: Zv,
  identityLine: eb,
  identity: ab,
  ownerLine: tb,
  link: nb,
  gateMark: rb,
  emptyChain: lb,
  arrow: ob,
  muted: ib,
  define: cb,
  statValue: sb,
  policyId: db,
  sub: ub
};
function hn(e) {
  var s;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, c = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (s = e.currentTarget.querySelector("a")) == null || s.dispatchEvent(new MouseEvent("click", c));
}
function mb(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function hb(e) {
  return e === void 0 ? b.compactRow : `${b.compactRow} ${e}`;
}
function wn(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function wb(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${wn(e.members)}`;
}
function _b(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: b.compactCell, children: /* @__PURE__ */ o("span", { className: b.stack, children: [
    /* @__PURE__ */ o("span", { className: b.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${b.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${b.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: b.ownerLine, children: wb(e) })
  ] }) });
}
function _n({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ t("span", { className: b.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function fb(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = na(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function vb({ stages: e, streamStep: a }) {
  const n = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ t("span", { className: `${b.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: b.link, children: [
    l === 0 ? null : /* @__PURE__ */ t("span", { className: b.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ t(_n, { name: r.name, gate: r.gate === !0, look: fb(l, n, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function bb(e) {
  return /* @__PURE__ */ t("td", { className: b.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: b.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: b.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: b.define, children: "Define workflow" })
  ] }) : vb(e) });
}
function fn(e) {
  return e === void 0 ? void 0 : !0;
}
function St(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: b.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: b.muted, children: n }) : /* @__PURE__ */ o("span", { className: b.stat, children: [
    /* @__PURE__ */ t("span", { className: `${b.statValue} ward-stat-value`, title: r, "data-raised": fn(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: b.sub, children: a })
  ] }) });
}
function pb(e) {
  return /* @__PURE__ */ t("td", { className: b.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: b.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: b.stat, children: [
    /* @__PURE__ */ t("span", { className: b.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: b.sub, children: e.summary })
  ] }) });
}
function gb(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function yb({ stream: e, href: a, presentation: n }) {
  const r = hb(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: hn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": fe(e.streamStep, "chip") }, children: [
    _b(e, a),
    bb(e),
    St(gb(e.agents), e.agents === void 0 ? void 0 : mb(e.agents), "—"),
    pb(e.policy),
    St(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Nb(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function N0(e) {
  if (Nb(e)) return yb(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: b.row, onClick: hn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: b.cell, children: [
      /* @__PURE__ */ t("a", { className: `${b.name} ward-target`, href: W(n), children: a.name }),
      /* @__PURE__ */ t(h, { ...Ca(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: b.cell, children: /* @__PURE__ */ t("span", { className: b.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: b.link, children: /* @__PURE__ */ t(_n, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ t("span", { className: b.mono, children: wn(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: b.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: b.mono, title: a.inFlightHint, "data-raised": fn(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: b.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: b.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const kb = "_row_mdce7_2", $b = "_name_mdce7_16", Cb = "_scope_mdce7_24", pa = {
  row: kb,
  name: $b,
  scope: Cb
};
function tt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Sb(e) {
  return e === void 0 ? `${pa.row} ward-toolrow` : `${pa.row} ward-toolrow ${e}`;
}
function Rb(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Tb({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function xb({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: tt(e) });
}
function Lb({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${pa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Ab(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function k0({ tool: e, onChange: a, presentation: n }) {
  const r = $(), l = $(), i = Rb(e, n), c = Ab(n);
  return /* @__PURE__ */ o(c, { className: Sb(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Tb, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${pa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(Lb, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(xb, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const Eb = "_strip_1qtlf_2", Ib = "_head_1qtlf_10", Mb = "_name_1qtlf_16", qb = "_chart_1qtlf_24", Bb = "_segment_1qtlf_30", Pb = "_detailedChart_1qtlf_36", jb = "_rail_1qtlf_49", Hb = "_section_1qtlf_55", Fb = "_label_1qtlf_66", Ob = "_note_1qtlf_83", ee = {
  strip: Eb,
  head: Ib,
  name: Mb,
  chart: qb,
  segment: Bb,
  detailedChart: Pb,
  rail: jb,
  section: Hb,
  label: Fb,
  note: Ob
}, Db = "No item in flight to preview.", Wb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", zb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Oa = [1, 2, 3, 4, 5, 6], ga = 100;
function Gb(e, a) {
  return a.has(e) ? fe(e, "id") : "var(--ward-color-line)";
}
function Kb({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Oa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: ee.segment,
      x: l * ga,
      y: "0",
      width: ga,
      height: "8",
      fill: Gb(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Ub(e) {
  const a = e.slice(0, Oa.length);
  for (; a.length < Oa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Vb({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${ee.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, n) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(n * ga),
        y: "0",
        width: String(ga),
        height: "40",
        style: { fill: fe(a.streamStep, "chip") }
      },
      a.key + String(n)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((a, n) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(n))) })
  ] });
}
function vn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ia({ label: e, children: a }) {
  const n = $();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: ee.label, children: e }),
    a
  ] });
}
function Xb({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: ee.note, children: a ?? Db }) : /* @__PURE__ */ t(Ta, { item: { ...e, streamStep: na(n.streamStep) }, onOpen: vn(r), feed: null });
}
function Yb({ draft: e }) {
  const a = { "--stream": fe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ t(Ae, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ca(e.key, e.streamStep) })
  ] });
}
function Jb(e) {
  const a = Ub(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(ia, { label: "Board card", children: /* @__PURE__ */ t(Xb, { ...e, draft: n }) }),
    /* @__PURE__ */ t(ia, { label: "Streams index row", children: /* @__PURE__ */ t(Yb, { draft: n }) }),
    /* @__PURE__ */ o(ia, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Vb, { identities: a }),
      /* @__PURE__ */ t("p", { className: ee.note, children: Wb })
    ] }),
    /* @__PURE__ */ t(ia, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: ee.note, children: zb }) })
  ] });
}
function Qb({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": fe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ t(Ae, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ca(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t(Ta, { item: { ...a, streamStep: e.streamStep }, onOpen: vn(r) }),
    /* @__PURE__ */ t(Kb, { draft: e, streams: n })
  ] });
}
function $0(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(Jb, { ...e }) : /* @__PURE__ */ t(Qb, { ...e });
}
const Zb = "_row_ixlg5_6", ep = "_headCell_ixlg5_10", ap = "_cell_ixlg5_11", tp = "_name_ixlg5_23", np = "_consequence_ixlg5_29", rp = "_governed_ixlg5_36", lp = "_control_ixlg5_42", op = "_byRole_ixlg5_48", ip = "_webControl_ixlg5_59", cp = "_webConsequence_ixlg5_65", sp = "_webGoverned_ixlg5_71", F = {
  row: Zb,
  headCell: ep,
  cell: ap,
  name: tp,
  consequence: np,
  governed: rp,
  control: lp,
  byRole: op,
  webControl: ip,
  webConsequence: cp,
  webGoverned: sp
};
function dp({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: F.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: F.control, children: [
    /* @__PURE__ */ t(
      Fe,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => n(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ t(h, { role: "running", label: "Pilot" })
  ] });
}
function up({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: F.headCell, children: [
      /* @__PURE__ */ t("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: F.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: F.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(dp, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function mp(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function hp({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${F.webControl} ${F.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Fe,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${F.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function wp({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ o("td", { className: F.cell, children: [
      /* @__PURE__ */ t("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${F.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(hp, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webGoverned} ward-cellmeta`, children: mp(e) }) })
  ] });
}
function C0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(wp, { ...e }) : /* @__PURE__ */ t(up, { ...e });
}
const _p = "_row_vv64h_2", fp = "_cell_vv64h_6", vp = "_name_vv64h_25", bp = "_note_vv64h_30", pp = "_webName_vv64h_41", gp = "_webMeta_vv64h_47", U = {
  row: _p,
  cell: fp,
  name: vp,
  note: bp,
  webName: pp,
  webMeta: gp
}, bn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function yp(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Np({ component: e, onRestart: a }) {
  const n = $(), r = bn[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: U.row, children: [
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t("span", { className: U.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: U.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t("span", { id: n, className: U.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: U.cell, "data-align": "end", children: l ? /* @__PURE__ */ t(_, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function kp({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: yp(e.state) });
}
function $p({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: U.row, children: [
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t("span", { className: `${U.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t("span", { className: `${U.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t(h, { ...bn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t(kp, { component: e, onRestart: a }) })
  ] });
}
function S0(e) {
  return "presentation" in e ? /* @__PURE__ */ t($p, { ...e }) : /* @__PURE__ */ t(Np, { ...e });
}
const Cp = "_row_1f1gp_7", Sp = "_cell_1f1gp_11", Rp = "_next_1f1gp_28", Tp = "_headCell_1f1gp_38", xp = "_webId_1f1gp_77", Lp = "_webPurpose_1f1gp_83", Ap = "_webMeta_1f1gp_91", Ep = "_webUrgent_1f1gp_97", O = {
  row: Cp,
  cell: Sp,
  next: Rp,
  headCell: Tp,
  webId: xp,
  webPurpose: Lp,
  webMeta: Ap,
  webUrgent: Ep
}, Ip = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Mp = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, pn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], qp = Object.fromEntries(pn.map((e) => [e.key, e]));
function Ke({ column: e, children: a }) {
  const n = qp[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: O.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function R0() {
  return /* @__PURE__ */ t("tr", { children: pn.map((e) => /* @__PURE__ */ t(
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
function Bp({ cred: e }) {
  const a = Ip[e.state];
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ t(Ke, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Ke, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Ke, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Ke, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: tt(e.cls) }) }),
    /* @__PURE__ */ t(Ke, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Ke, { column: "next", children: /* @__PURE__ */ t("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Pp({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function jp({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(Pp, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(h, { ...Mp[e.state] }) })
  ] });
}
function T0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(jp, { ...e }) : /* @__PURE__ */ t(Bp, { ...e });
}
const Hp = "_card_17zba_2", Fp = "_head_17zba_11", Op = "_env_17zba_18", Dp = "_version_17zba_25", Wp = "_meta_17zba_32", zp = "_webCard_17zba_37", Gp = "_webRow_17zba_47", Kp = "_webTitle_17zba_55", Up = "_webLine_17zba_65", Vp = "_webVersion_17zba_72", Xp = "_webMeta_17zba_77", K = {
  card: Hp,
  head: Fp,
  env: Op,
  version: Dp,
  meta: Wp,
  webCard: zp,
  webRow: Gp,
  webTitle: Kp,
  webLine: Up,
  webVersion: Vp,
  webMeta: Xp
}, Rt = { dev: "Dev", uat: "UAT", prod: "Prod" }, gn = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function Yp({ env: e }) {
  const a = gn[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: K.card, "aria-label": Rt[e.env], children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t("span", { className: K.env, children: Rt[e.env] }),
      /* @__PURE__ */ t(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ t("p", { className: K.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: K.meta, children: [
      "deployed ",
      se(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ t("p", { className: K.meta, children: n })
  ] });
}
function Jp(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [se(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function Qp(e) {
  return /* @__PURE__ */ o("article", { className: `${K.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${K.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${K.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...gn[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${K.version} ${K.webVersion} ${K.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${K.meta} ${K.webMeta} ${K.webLine} ward-cellmeta`, children: Jp(e) })
  ] });
}
function x0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Qp, { ...e }) : /* @__PURE__ */ t(Yp, { ...e });
}
const Zp = "_panel_1hmja_2", eg = "_line_1hmja_8", ag = "_actions_1hmja_14", ca = {
  panel: Zp,
  line: eg,
  actions: ag
};
function L0(e) {
  return /* @__PURE__ */ o("div", { className: ca.panel, children: [
    /* @__PURE__ */ t("p", { className: ca.line, children: e.status }),
    /* @__PURE__ */ t(E, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: ca.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: ca.line, children: e.note ?? "" })
  ] });
}
const tg = "_upload_1vgt7_2", ng = "_preview_1vgt7_7", rg = "_mark_1vgt7_17", lg = "_empty_1vgt7_22", og = "_actions_1vgt7_28", ig = "_input_1vgt7_33", cg = "_reasons_1vgt7_41", sg = "_reason_1vgt7_41", dg = "_accepted_1vgt7_57", ne = {
  upload: tg,
  preview: ng,
  mark: rg,
  empty: lg,
  actions: og,
  input: ig,
  reasons: cg,
  reason: sg,
  accepted: dg
}, yn = 1.5, Nn = 22, ya = "script elements or event handlers", Re = "links or external references", ke = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${yn}px at ${Nn}px`], ug = [ke[1], ke[2], ya, Re], mg = /* @__PURE__ */ new Map([
  ["image", ke[1]],
  ["text", ke[2]],
  ["tspan", ke[2]],
  ["textPath", ke[2]],
  ["script", ya],
  ["foreignObject", ya],
  ["a", Re],
  ["use", Re],
  ["style", Re],
  ["feImage", Re],
  ["set", Re]
]), hg = "http://www.w3.org/2000/svg", wg = "http://www.w3.org/2000/xmlns/", _g = /* @__PURE__ */ new Set([
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
]), fg = /* @__PURE__ */ new Set([
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
]), nt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, vg = /url\s*\(|['"\\]/i;
function bg() {
  return { ok: !1, reasons: [ke[1]] };
}
function kn(e) {
  return e.namespaceURI === hg;
}
function pg(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && kn(a) ? a : null;
  } catch {
    return null;
  }
}
function gg(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [ke[0]] : [];
}
function yg(e) {
  return mg.get(e.localName) ?? (e.localName.startsWith("animate") ? Re : void 0);
}
function Ng(e) {
  return vg.test(e.replace(nt, ""));
}
function kg(e) {
  return /^on/i.test(e.localName) ? ya : e.localName === "href" || Ng(e.value) ? Re : void 0;
}
function $g(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(yg(n));
    for (const r of Array.from(n.attributes)) a.add(kg(r));
  }
  return ug.filter((n) => a.has(n));
}
function Cg(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? Nn / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < yn;
  }) ? [ke[3]] : [];
}
function Sg(e) {
  if (e.namespaceURI === wg) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (fg.has(a) || a.startsWith("stroke"));
}
function Rg(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && kn(a) && _g.has(a.localName);
}
function Tg(e, a) {
  Rg(a) ? a.nodeType === Node.ELEMENT_NODE && $n(a) : e.removeChild(a);
}
function $n(e) {
  for (const a of Array.from(e.attributes)) Sg(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) Tg(e, a);
  return e;
}
function xg(e) {
  return Array.from(e.matchAll(nt), (a) => a[2]).filter((a) => a !== "");
}
function Lg(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function Ag(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of xg(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function Eg(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(nt, (r, l, i) => {
      const c = a.get(i);
      return c === void 0 ? r : r.replace(`#${i}`, `#${c}`);
    });
}
function Ig(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = Ag(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), Eg(l, r);
  }
  return e;
}
function A0(e) {
  const a = pg(e);
  if (a === null) return bg();
  const n = [...gg(a), ...$g(a), ...Cg(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(Ig($n(a), Lg(e))) };
}
const Mg = "Mark accepted.", qg = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Bg = new Set(Bt.flatMap((e) => [fe(e, "id"), fe(e, "chip")]));
function Pg(e) {
  return e !== void 0 && (qg.test(e) || Bg.has(e)) ? e : void 0;
}
function jg({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: ne.preview, style: { "--mark": Pg(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: ne.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: ne.empty }) });
}
function Hg(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function Fg(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Og({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: ne.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("p", { className: ne.accepted, children: Mg }) }) : /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("ul", { className: ne.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: ne.reason, children: a }, a)) }) });
}
function Dg({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(Og, { result: e }) : /* @__PURE__ */ t("p", { className: `${ne.result} ${Hg(e, n)}`, role: "status", children: Fg(e, n) });
}
function Tt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function E0({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = g(null), [c, s] = p(null), u = (d) => {
    if (d === void 0) return;
    const m = a(d);
    m instanceof Promise ? m.then(s) : s(m);
  };
  return /* @__PURE__ */ o("div", { className: ne.upload, children: [
    /* @__PURE__ */ t(jg, { current: e }),
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
            var m;
            return u((m = d.target.files) == null ? void 0 : m[0]);
          }
        }
      ),
      /* @__PURE__ */ t(_, { ...Tt(l), onClick: () => {
        var d;
        return (d = i.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(_, { ...Tt(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(Dg, { result: c, presentation: r })
  ] });
}
const Wg = "_row_1wp9s_7", zg = "_cell_1wp9s_11", Gg = "_head_1wp9s_28", Kg = "_name_1wp9s_34", Ug = "_pinned_1wp9s_42", Vg = "_headCell_1wp9s_49", Xg = "_webName_1wp9s_88", Yg = "_webMeta_1wp9s_95", Jg = "_webWarn_1wp9s_103", B = {
  row: Wg,
  cell: zg,
  head: Gg,
  name: Kg,
  pinned: Ug,
  headCell: Vg,
  webName: Xg,
  webMeta: Yg,
  webWarn: Jg
}, rt = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Cn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Qg = Object.fromEntries(Cn.map((e) => [e.key, e]));
function Zg(e, a) {
  return `mcp.${e}.${a}`;
}
function ey(e) {
  return Object.keys(rt).includes(e);
}
function ay(e) {
  return rt[e !== void 0 && ey(e) ? e : "unknown"];
}
function Je({ column: e, children: a }) {
  const n = Qg[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: B.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function I0() {
  return /* @__PURE__ */ t("tr", { children: Cn.map((e) => /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: B.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function ty({ server: e }) {
  const a = rt[e.connection];
  return /* @__PURE__ */ o("tr", { className: B.row, children: [
    /* @__PURE__ */ o(Je, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: B.head, children: [
        /* @__PURE__ */ t("span", { className: B.name, children: e.name }),
        /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: tt(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: B.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(Je, { column: "connection", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(Je, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(Je, { column: "tools", children: e.tools.map((n) => Zg(e.name, n)).join(" · ") })
  ] });
}
function ny(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function ry(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function ly({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${B.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta`, children: e });
}
function oy({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function iy({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function cy({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: B.row, children: [
    /* @__PURE__ */ o("td", { className: B.cell, children: [
      /* @__PURE__ */ t("span", { className: `${B.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta`, children: ny(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t(h, { ...ry(e) }) }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t(ly, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t(h, { ...ay(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: B.cell, children: [
      /* @__PURE__ */ t(oy, { server: e, onRestart: a }),
      /* @__PURE__ */ t(iy, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function M0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(cy, { ...e }) : /* @__PURE__ */ t(ty, { ...e });
}
const sy = "_row_160my_2", dy = "_headCell_160my_14", uy = "_cell_160my_15", my = "_name_160my_26", hy = "_consequence_160my_32", wy = "_reason_160my_38", _y = "_value_160my_44", fy = "_webRow_160my_60", vy = "_webSetting_160my_71", by = "_webName_160my_79", py = "_webConsequence_160my_87", gy = "_webControl_160my_93", yy = "_webState_160my_107", Ny = "_webChip_160my_112", A = {
  row: sy,
  headCell: dy,
  cell: uy,
  name: my,
  consequence: hy,
  reason: wy,
  value: _y,
  webRow: fy,
  webSetting: vy,
  webName: by,
  webConsequence: py,
  webControl: gy,
  webState: yy,
  webChip: Ny
}, Sn = 104, Rn = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function ky({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Fe, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Ot, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: A.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function $y({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = Rn[n], c = n === "locked";
  return /* @__PURE__ */ o("tr", { className: A.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: A.headCell, children: [
      /* @__PURE__ */ t("span", { className: A.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: A.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: A.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: A.cell, children: /* @__PURE__ */ t(ky, { control: a, name: e.name, locked: c, describedBy: c ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: A.cell, style: { width: Sn }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function Tn(e, a) {
  return String(e ?? a);
}
function Cy(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Sy(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Tn(e.value, "—");
}
function Ry({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: A.webControl, children: [
    /* @__PURE__ */ t(Fe, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (c) => l == null ? void 0 : l(c) }),
    /* @__PURE__ */ t("span", { className: A.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function Ty(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(Ry, { ...e });
  const l = Cy(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: A.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Ot, { options: l, value: Tn(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${A.webControl} ${A.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: Sy(a) });
}
function xy({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const c = $(), s = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${A.row} ${A.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: A.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${A.name} ${A.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: c, className: `${A.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: A.webControl, children: i(c) }) : /* @__PURE__ */ t(Ty, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${A.webChip} ward-policy-chip`, style: { width: Sn }, children: /* @__PURE__ */ t(h, { ...Rn[n], size: "tag" }) })
  ] });
}
function q0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(xy, { ...e }) : /* @__PURE__ */ t($y, { ...e });
}
const Ly = "_label_1o9za_7", Ay = "_name_1o9za_15", Ey = "_column_1o9za_24", Iy = "_webFrame_1o9za_57", My = "_webHead_1o9za_62", qy = "_webHeadLabel_1o9za_74", By = "_webLabel_1o9za_112", Py = "_webColumns_1o9za_119", jy = "_webGroup_1o9za_125", Hy = "_webPeople_1o9za_126", Fy = "_webVia_1o9za_127", Oy = "_webMeta_1o9za_156", D = {
  label: Ly,
  name: Ay,
  column: Ey,
  webFrame: Iy,
  webHead: My,
  webHeadLabel: qy,
  webLabel: By,
  webColumns: Py,
  webGroup: jy,
  webPeople: Hy,
  webVia: Fy,
  webMeta: Oy
}, Dy = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Ma = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function qa({ column: e, children: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: D.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function Wy(e) {
  if (!e.matrixRole) return;
  const a = Dy[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function zy({ node: e }) {
  const a = Wy(e);
  return /* @__PURE__ */ o("span", { className: D.label, children: [
    /* @__PURE__ */ t("span", { className: D.name, children: e.name }),
    /* @__PURE__ */ t(Gy, { role: a, node: e }),
    /* @__PURE__ */ t(qa, { column: Ma[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(qa, { column: Ma[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ t(qa, { column: Ma[2], children: e.requestedVia ?? "" })
  ] });
}
function Gy({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function Ky({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: c }) {
  return /* @__PURE__ */ t(
    Kt,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(zy, { node: n }),
      children: c
    }
  );
}
function Ba({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function Uy({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${D.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ba, { className: `${D.webMeta} ${D.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ba, { className: `${D.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ba, { className: `${D.webMeta} ${D.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Vy() {
  return /* @__PURE__ */ o("div", { className: D.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: D.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: D.webColumns, children: [
      /* @__PURE__ */ t("span", { className: D.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: D.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: D.webVia, children: "Requested via" })
    ] })
  ] });
}
function Xy({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${D.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Yy(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Jy({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: D.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(Vy, {}),
    /* @__PURE__ */ t(Ms, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      Kt,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(Xy, { row: n }),
        detail: /* @__PURE__ */ t(Uy, { row: n }),
        expanded: Yy(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function B0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Jy, { ...e }) : /* @__PURE__ */ t(Ky, { ...e });
}
const Qy = "_runbook_b9agc_2", Zy = "_list_b9agc_7", eN = "_step_b9agc_15", aN = "_numeral_b9agc_21", tN = "_body_b9agc_28", nN = "_head_b9agc_34", rN = "_title_b9agc_40", lN = "_detail_b9agc_45", oN = "_actions_b9agc_50", iN = "_webList_b9agc_56", cN = "_webStep_b9agc_60", sN = "_webBody_b9agc_66", dN = "_webTitle_b9agc_74", uN = "_webDetail_b9agc_78", T = {
  runbook: Qy,
  list: Zy,
  step: eN,
  numeral: aN,
  body: tN,
  head: nN,
  title: rN,
  detail: lN,
  actions: oN,
  webList: iN,
  webStep: cN,
  webBody: sN,
  webTitle: dN,
  webDetail: uN
}, xn = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Ln(e) {
  return String(e + 1).padStart(2, "0");
}
function mN({ step: e, index: a, connection: n }) {
  const r = xn[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: T.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: T.numeral, children: Ln(a) }),
    /* @__PURE__ */ o("span", { className: T.body, children: [
      /* @__PURE__ */ o("span", { className: T.head, children: [
        /* @__PURE__ */ t("span", { className: T.title, children: e.title }),
        /* @__PURE__ */ t(h, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ t($e, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ t("span", { className: T.detail, children: e.detail })
    ] })
  ] });
}
function hN({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ t("ol", { className: T.list, children: e.map((r, l) => /* @__PURE__ */ t(mN, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: T.actions, children: a })
  ] });
}
function wN({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${T.step} ${T.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${T.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Ln(a) }),
    /* @__PURE__ */ o("span", { className: `${T.body} ${T.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${T.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${T.title} ${T.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(h, { ...xn[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t($e, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${T.detail} ${T.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function _N({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${T.list} ${T.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(wN, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${T.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function P0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(_N, { ...e }) : /* @__PURE__ */ t(hN, { ...e });
}
const fN = "_list_1gu6a_2", vN = "_check_1gu6a_10", bN = "_body_1gu6a_16", pN = "_text_1gu6a_23", gN = "_pending_1gu6a_32", yN = "_measured_1gu6a_37", Ve = {
  list: fN,
  check: vN,
  body: bN,
  text: pN,
  pending: gN,
  measured: yN
};
function NN(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function kN({ check: e }) {
  const a = NN(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Ve.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(Ya, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Ve.body, children: [
      /* @__PURE__ */ t("span", { className: Ve.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Ve.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ t("span", { className: Ve.measured, children: e.measured })
  ] });
}
function j0({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Ve.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(kN, { check: a }, a.text)) });
}
const $N = "_root_a6xzy_2", CN = "_list_a6xzy_10", SN = "_line_a6xzy_21", RN = "_at_a6xzy_48", TN = "_text_a6xzy_52", xN = "_foot_a6xzy_56", LN = "_idle_a6xzy_68", AN = "_caret_a6xzy_76", EN = "_jump_a6xzy_83", he = {
  root: $N,
  list: CN,
  line: SN,
  at: RN,
  text: TN,
  foot: xN,
  idle: LN,
  caret: AN,
  jump: EN
}, IN = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function lt(e) {
  return Number.isNaN(Date.parse(e)) ? "" : IN.format(new Date(e));
}
const MN = { warn: "warning", ok: "ok" };
function qN({ kind: e }) {
  const a = MN[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function BN({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${lt(e)}` });
}
function PN({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${lt(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(BN, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const jN = 8;
function HN(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > jN;
}
function FN({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const An = De(null);
function H0({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = It(() => ({
    announce: e ?? r,
    setAnnounce: (c) => {
      l(c), a == null || a(c);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(An.Provider, { value: i, children: n });
}
function ON() {
  const e = Oe(An), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function F0({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = g(null), [i, c] = p(0), [s, u] = ON(), [d, m] = p(!1), f = e.at(-1);
  I(() => {
    c(e.length);
  }, [e.length]), za(() => {
    const y = l.current;
    y && !d && (y.scrollTop = y.scrollHeight);
  }, [e.length, d]);
  const v = () => {
    var q;
    const y = l.current;
    if (!y) return;
    const L = y.querySelectorAll("[data-consline-text]");
    (q = L.item(L.length - 1)) == null || q.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ t("ol", { className: he.list, ref: l, "aria-live": s ? "polite" : "off", "aria-label": r, onScroll: (y) => m(HN(y.currentTarget)), children: e.map((y, L) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": L < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: lt(y.at) }),
      /* @__PURE__ */ t(qN, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${L}`)) }),
    /* @__PURE__ */ o(PN, { connection: a, idleSince: n, last: f, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": s, onClick: () => u(!s), children: "Read new events" }),
      /* @__PURE__ */ t(FN, { shown: d, onJump: v })
    ] })
  ] });
}
const DN = "_row_11jhe_2", WN = "_head_11jhe_14", zN = "_author_11jhe_20", GN = "_eta_11jhe_25", KN = "_edited_11jhe_26", UN = "_body_11jhe_32", VN = "_reason_11jhe_37", XN = "_actions_11jhe_42", pe = {
  row: DN,
  head: WN,
  author: zN,
  eta: GN,
  edited: KN,
  body: UN,
  reason: VN,
  actions: XN
}, YN = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function JN(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function QN({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function ZN({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: pe.reason, id: a, children: e })
  ] });
}
function e1(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function a1(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(QN, { ...e }) : /* @__PURE__ */ t(ZN, { reason: e.unavailable, reasonId: e.unavailableId });
}
function O0(e) {
  const { comment: a } = e;
  e1(e);
  const n = $(), r = `${n}-unavailable`, l = YN[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${pe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ t("span", { className: pe.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: pe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: pe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: pe.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: pe.reason, id: n, children: JN(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: pe.actions, children: /* @__PURE__ */ t(a1, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const t1 = "_root_c46wj_2", n1 = "_attach_c46wj_11", r1 = "_actions_c46wj_17", l1 = "_reply_c46wj_23", o1 = "_replyRow_c46wj_28", i1 = "_sendsAs_c46wj_42", Ye = {
  root: t1,
  attach: n1,
  actions: r1,
  reply: l1,
  replyRow: o1,
  sendsAs: i1
};
function c1({ placeholder: e, asUser: a, onPost: n }) {
  const [r, l] = p(""), i = $();
  return /* @__PURE__ */ o("div", { className: Ye.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ye.replyRow, children: [
      /* @__PURE__ */ t(E, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ t(_, { variant: "ghost", describedBy: i, onClick: () => n(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ t("p", { id: i, className: Ye.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function D0(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(c1, { ...e }) : /* @__PURE__ */ t(s1, { ...e });
}
function s1({ placeholder: e, asUser: a, attachTo: n, requeueAfter: r, onPost: l, onDraft: i }) {
  const [c, s] = p("");
  return /* @__PURE__ */ o("div", { className: Ye.root, children: [
    /* @__PURE__ */ t(E, { kind: "textarea", label: e, value: c, onChange: s }),
    n && /* @__PURE__ */ o("div", { className: Ye.attach, children: [
      /* @__PURE__ */ t(h, { role: "soft", label: n.label }),
      /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ t(
      Ht,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Ye.actions, children: [
      /* @__PURE__ */ t(_, { variant: "primary", onClick: () => l(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ t(_, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const d1 = "_list_1ih9e_2", u1 = "_item_1ih9e_6", m1 = "_body_1ih9e_22", h1 = "_text_1ih9e_28", w1 = "_evidence_1ih9e_37", _1 = "_consequence_1ih9e_49", f1 = "_note_1ih9e_54", je = {
  list: d1,
  item: u1,
  body: m1,
  text: h1,
  evidence: w1,
  consequence: _1,
  note: f1
};
function v1({ criterion: e }) {
  return /* @__PURE__ */ t(Ae, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function xt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function b1(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function p1({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: je.body, children: [
    /* @__PURE__ */ t("span", { className: je.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ t(xt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: je.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ t(xt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: je.consequence, children: b1(e.why) })
    ] })
  ] });
}
function g1({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: je.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(v1, { criterion: e }),
    /* @__PURE__ */ t(p1, { criterion: e })
  ] });
}
function W0({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${je.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(g1, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: je.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const y1 = "_list_dwhoz_2", N1 = "_rung_dwhoz_6", k1 = "_name_dwhoz_18", $1 = "_actor_dwhoz_32", ua = {
  list: y1,
  rung: N1,
  name: k1,
  actor: $1
}, C1 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function S1({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = C1[e.state];
  return /* @__PURE__ */ o("li", { className: ua.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ua.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ua.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function z0({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ua.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(S1, { rung: a }, a.name)) });
}
const R1 = "_sheet_1fqco_2", T1 = "_title_1fqco_9", x1 = "_stage_1fqco_15", L1 = "_effects_1fqco_20", A1 = "_effect_1fqco_20", E1 = "_numeral_1fqco_31", I1 = "_effectText_1fqco_38", M1 = "_refusals_1fqco_43", q1 = "_reasons_1fqco_52", B1 = "_reason_1fqco_52", P1 = "_actions_1fqco_62", ue = {
  sheet: R1,
  title: T1,
  stage: x1,
  effects: L1,
  effect: A1,
  numeral: E1,
  effectText: I1,
  refusals: M1,
  reasons: q1,
  reason: B1,
  actions: P1
};
function j1({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function G0({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: c }) {
  const s = $(), u = `${s}-refusal`, [d, m] = p(""), f = n.length > 0;
  return /* @__PURE__ */ t(ra, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: ue.effects, children: a.map((v, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ t("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: ue.effectText, children: v })
    ] }, v)) }),
    /* @__PURE__ */ t(
      pc,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ t(E, { kind: "textarea", label: "Note for the agent", value: d, onChange: m }),
    f && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ t(h, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: ue.reasons, children: n.map((v, y) => /* @__PURE__ */ t("li", { className: ue.reason, id: y === 0 ? u : void 0, children: v.reason }, v.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ t(j1, { refused: f, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ t(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const H1 = "_list_1hvqu_2", F1 = "_path_1hvqu_7", O1 = "_head_1hvqu_21", D1 = "_label_1hvqu_28", W1 = "_consequence_1hvqu_35", z1 = "_ask_1hvqu_36", Xe = {
  list: H1,
  path: F1,
  head: O1,
  label: D1,
  consequence: W1,
  ask: z1
}, Da = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Lt(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function At(e) {
  return e ? "primary" : "secondary";
}
function G1({ path: e, primary: a, onChoose: n }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ t(_, { variant: At(a), size: "sm", onClick: () => n(e.kind), children: Da[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: At(a), size: "sm", disabled: !0, describedBy: r, children: Da[e.kind] }),
    /* @__PURE__ */ t("span", { className: Xe.ask, id: r, children: e.askInstead })
  ] });
}
function K1({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Xe.path, "data-allowed": e.allowed, "data-role": Lt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Xe.head, children: [
      /* @__PURE__ */ t("span", { className: Xe.label, children: e.title ?? Da[e.kind] }),
      /* @__PURE__ */ t(h, { role: Lt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: Xe.consequence, children: e.consequence }),
    /* @__PURE__ */ t(G1, { path: e, primary: a, onChoose: n })
  ] });
}
function K0({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: Xe.list, children: e.map((n, r) => /* @__PURE__ */ t(K1, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const U1 = "_list_1nyt1_2", V1 = "_item_1nyt1_6", X1 = "_node_1nyt1_18", Y1 = "_body_1nyt1_24", J1 = "_head_1nyt1_30", Q1 = "_stage_1nyt1_36", Z1 = "_version_1nyt1_41", ek = "_sentence_1nyt1_49", ak = "_meta_1nyt1_54", ye = {
  list: U1,
  item: V1,
  node: X1,
  body: Y1,
  head: J1,
  stage: Q1,
  version: Z1,
  sentence: ek,
  meta: ak
}, tk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function nk({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ye.head, children: [
    /* @__PURE__ */ t("span", { className: ye.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: ye.version, title: e.version, children: e.version }) : null
  ] });
}
function rk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ye.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${ye.node} ward-history-node`, children: /* @__PURE__ */ t(Ae, { size: 9, kind: tk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ye.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(nk, { entry: e }),
      /* @__PURE__ */ t("span", { className: ye.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ye.meta} ward-history-meta`, children: [
        `${se(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function U0({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ye.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(rk, { entry: a }, a.stage + String(n))) });
}
const lk = "_thread_1kn6s_3", ok = "_turn_1kn6s_8", ik = "_who_1kn6s_27", ck = "_body_1kn6s_32", ma = {
  thread: lk,
  turn: ok,
  who: ik,
  body: ck
}, En = De(!1);
function V0({ children: e, density: a }) {
  return /* @__PURE__ */ t(En.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ma.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function X0({ turn: e }) {
  if (!Oe(En)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ma.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ma.who} ward-chat-who`, children: [
      e.author,
      " · ",
      se(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ma.body} ward-chat-body`, children: e.body })
  ] });
}
const sk = "_list_1rt9c_3", dk = "_row_1rt9c_7", uk = "_label_1rt9c_20", mk = "_n_1rt9c_26", hk = "_cause_1rt9c_33", Ze = {
  list: sk,
  row: dk,
  label: uk,
  n: mk,
  cause: hk
};
function wk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const _k = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function fk({ row: e, formatNumber: a }) {
  return wk(e), /* @__PURE__ */ o("li", { className: `${Ze.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(Ae, { size: 8, ..._k[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: Ze.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${Ze.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(vk, { cause: e.cause })
  ] });
}
function vk({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Ze.cause} ward-healthrow-cause`, children: e }) : null;
}
function Y0({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ t("ul", { className: `${Ze.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(fk, { row: n, formatNumber: a }, n.label)) });
}
const bk = "_root_1jxwp_2", pk = {
  root: bk
};
function J0({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: pk.root, "data-density": l, children: [
    /* @__PURE__ */ t(xa, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const gk = "_row_dhbre_3", yk = "_key_dhbre_13", Nk = "_stack_dhbre_24", kk = "_value_dhbre_32", $k = "_evidence_dhbre_39", Ck = "_mark_dhbre_47", Ue = {
  row: gk,
  key: yk,
  stack: Nk,
  value: kk,
  evidence: $k,
  mark: Ck
};
function Sk({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(Ya, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function Q0({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ue.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Ue.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ue.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Ue.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Ue.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Ue.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(Sk, { state: e.state }) })
  ] });
}
const Rk = "_cell_1monp_2", Tk = {
  cell: Rk
}, xk = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Lk(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function Ak(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function Ek(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Lk(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function Ik(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function Z0({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  Ak(e, n);
  const r = Ik(e);
  return /* @__PURE__ */ t(
    Ic,
    {
      label: "Rejection routing",
      columns: xk,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: Tk.cell, "data-norerun": l.noRerun ? !0 : void 0, children: Ek(l, i) }),
      empty: a ?? /* @__PURE__ */ t(pd, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Mk = "_row_aureb_2", qk = "_title_aureb_12", Bk = "_turns_aureb_18", Pk = "_waiting_aureb_19", jk = "_resolved_aureb_20", Hk = "_activity_aureb_21", Fk = "_cost_aureb_28", Ok = "_link_aureb_29", Dk = "_tableLink_aureb_47", Wk = "_tableRecord_aureb_48", zk = "_tableRow_aureb_59", Gk = "_tableTitle_aureb_71", Kk = "_tableResolved_aureb_76", Uk = "_tableMeta_aureb_91", Vk = "_tableCost_aureb_98", Xk = "_tableActivity_aureb_99", Yk = "_tableState_aureb_109", H = {
  row: Mk,
  title: qk,
  turns: Bk,
  waiting: Pk,
  resolved: jk,
  activity: Hk,
  cost: Fk,
  link: Ok,
  tableLink: Dk,
  tableRecord: Wk,
  tableRow: zk,
  tableTitle: Gk,
  tableResolved: Kk,
  tableMeta: Uk,
  tableCost: Vk,
  tableActivity: Xk,
  tableState: Yk
}, In = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function Jk(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function Qk(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Zk(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const e$ = { duplicate: "Closed · duplicate" };
function a$({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(Le, { className: H.tableMeta, text: `waiting on ${e}` });
}
function t$({ value: e }) {
  return /* @__PURE__ */ t("td", { className: H.tableCost, children: e === void 0 ? null : re(e) });
}
function n$({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${H.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function r$({ session: e, href: a }) {
  const n = In[e.state];
  return /* @__PURE__ */ o("tr", { className: H.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: H.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${H.tableLink} ward-target`, href: W(a), children: /* @__PURE__ */ t(Le, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: H.tableMeta, children: Qk(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: H.tableResolved, children: [
      Zk(e.resolved),
      /* @__PURE__ */ t(a$, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(t$, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: H.tableActivity, children: Jk(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: H.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: e$[e.state] ?? n.label }),
      /* @__PURE__ */ t(n$, { link: e.link })
    ] }) })
  ] });
}
function l$({ session: e }) {
  const a = In[e.state];
  return /* @__PURE__ */ o("div", { className: H.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(Le, { className: H.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: H.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(Le, { className: H.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: H.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: H.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ t("span", { className: H.activity, children: se(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: H.link, href: W(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function eC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(r$, { session: e.session, href: e.href }) : /* @__PURE__ */ t(l$, { session: e.session });
}
const o$ = "_block_1yy2v_3", i$ = "_list_1yy2v_9", c$ = "_line_1yy2v_14", Wa = {
  block: o$,
  list: i$,
  line: c$
}, s$ = { warn: "warning", ok: "ok" };
function d$({ kind: e }) {
  const a = s$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function u$({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Wa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(d$, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function aC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${Wa.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: Wa.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(u$, { line: n }, `${r}-${n.text}`)) }) });
}
const m$ = "_band_tt7hp_1", h$ = "_head_tt7hp_8", w$ = "_cell_tt7hp_19", _$ = "_index_tt7hp_35", f$ = "_title_tt7hp_42", v$ = "_note_tt7hp_48", b$ = "_cellTitle_tt7hp_53", p$ = "_cellBody_tt7hp_58", g$ = "_tag_tt7hp_64", be = {
  band: m$,
  head: h$,
  cell: w$,
  index: _$,
  title: f$,
  note: v$,
  cellTitle: b$,
  cellBody: p$,
  tag: g$
}, Et = 4;
function tC({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== Et)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Et}-cell grid`);
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
  D$ as ActionStack,
  F0 as ActivityConsole,
  Ih as AgentCard,
  I$ as AppShell,
  $0 as AppearanceStrip,
  tC as Band,
  H$ as BarChart,
  eu as BoardColumn,
  n0 as BoardFootnote,
  r0 as BoardHeader,
  X$ as BoardScroller,
  _ as Btn,
  x$ as CHIP_ROLES,
  pn as CREDENTIAL_COLUMNS,
  j$ as Callout,
  C0 as CapabilityRow,
  X0 as ChatMessage,
  Ht as Checkbox,
  h as Chip,
  Le as ClampText,
  O0 as ClarificationRow,
  w0 as ClauseRuleRow,
  h0 as ClauseRules,
  Qt as ColourLadder,
  S0 as ComponentRow,
  D0 as Composer,
  o0 as ConfigRow,
  l0 as ConfigRowHead,
  Ja as ConnectionMark,
  H0 as ConsoleAnnounceProvider,
  V0 as Conversation,
  pc as CostMeter,
  T0 as CredentialRow,
  R0 as CredentialRowHead,
  W0 as CriteriaList,
  xl as Crumb,
  Y0 as DeliveryHealth,
  Q$ as DeniedState,
  f0 as DryRunRail,
  pd as EmptyState,
  x0 as EnvCard,
  E as Field,
  J$ as FilteredEmpty,
  U$ as FormStack,
  xa as GateChecklist,
  z0 as GateLadder,
  Ic as Grid,
  b0 as HandoffRuleRow,
  v0 as HandoffRules,
  i0 as ItemDrawer,
  L0 as KeyPanel,
  Yn as LIVE_EVENT_TYPES,
  ah as LegacyBoardColumn,
  s0 as LegacyBoardHeader,
  d0 as LegacyConfigRow,
  m0 as LegacyItemDrawer,
  Vm as LegacyOverCapNote,
  u0 as LegacyPreviewRail,
  Xt as LegacyWorkCard,
  $e as LiveIndicator,
  Z$ as LoadFailed,
  t0 as Loading,
  Cn as MCP_SERVER_COLUMNS,
  Ya as Mark,
  E0 as MarkUpload,
  Ae as Marker,
  M0 as McpServerRow,
  I0 as McpServerRowHead,
  p0 as NewStreamModal,
  Nd as OverCapNote,
  ra as Overlay,
  _0 as PARTIAL_STEP_REASON,
  Sn as POLICY_CHIP_WIDTH,
  z$ as PageFrame,
  P$ as PageHeader,
  F$ as PlainList,
  q0 as PolicyRow,
  c0 as PreviewRail,
  Ma as ROLE_MATRIX_COLUMNS,
  un as RULE_ACTIONS,
  Wt as Radio,
  J0 as ReadyChecklist,
  K$ as RecordSection,
  G0 as RequeueSheet,
  K0 as ResolveBlock,
  Q0 as ResolvedFieldRow,
  B0 as RoleMatrixRow,
  Z0 as RoutingTable,
  g0 as RuleRow,
  P0 as RunbookSteps,
  Xn as STREAM_STEPS,
  V$ as SectionBand,
  ft as SectionHeader,
  Ot as SegmentedControl,
  eC as SessionRow,
  B$ as Sidebar,
  y0 as StageColumn,
  Y$ as StageGrid,
  U0 as StageHistory,
  _f as StageListEditor,
  e0 as StaleStrip,
  Sa as StatStrip,
  N0 as StreamRow,
  G$ as SubjectRail,
  Fe as Switch,
  q$ as TabLinks,
  O$ as TableHead,
  M$ as Tabs,
  k0 as ToolRow,
  W$ as TopBar,
  Ms as Tree,
  Kt as TreeRow,
  aC as TypedInputBlock,
  Kr as UNSAFE_HREF,
  j0 as ValidationList,
  $$ as VisibilityProvider,
  C$ as Visible,
  T$ as WARD_VERSION,
  Ta as WorkCard,
  a0 as WriteUnavailableStrip,
  Jk as agoSince,
  On as clock,
  Ef as colourStatus,
  ae as count,
  ce as duration,
  Ga as elapsed,
  R$ as eventSourceTransport,
  ka as isStreamStep,
  $a as isValidatedStreamStep,
  sw as ladderValidation,
  ay as mcpConnectionChip,
  Zg as mcpToolName,
  re as money,
  we as ms,
  Ut as ordered,
  Mt as ratio,
  yp as restartLabel,
  W as safeHref,
  se as stamp,
  Pt as stream,
  A$ as streamChip,
  Ca as streamChipProps,
  fe as streamColour,
  Qn as streamHex,
  L$ as streamVars,
  sa as useBorderFlash,
  Kn as useFocusTrap,
  E$ as useLiveFeed,
  S$ as useReturnFocus,
  Na as useRovingTabindex,
  Ka as useTicker,
  Dn as useVisible,
  G as v,
  A0 as validateMark,
  na as validatedStep,
  Bt as validatedStreamSteps
};
