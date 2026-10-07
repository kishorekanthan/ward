import { jsx as t, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as At, useContext as Fe, createContext as je, useCallback as X, useEffect as R, useState as p, useRef as f, useLayoutEffect as Ga, useId as k, isValidElement as Dn, Children as Hn, Fragment as Fn } from "react";
import { flushSync as jn, createPortal as Wn } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${a % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const ot = (e) => String(e).padStart(2, "0");
function Ka(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const n = Math.floor(a / 60);
  return n < 60 ? `${n}m ${ot(a % 60)}s` : `${Math.floor(n / 60)}h ${ot(n % 60)}m`;
}
const zn = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = zn.formatToParts(new Date(e)), n = (r) => {
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
function It(e, a) {
  return `${e} / ${a}`;
}
const Gn = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Kn(e) {
  return Gn.format(new Date(e));
}
const Mt = je(/* @__PURE__ */ new Set());
function Z$({ hidden: e, children: a }) {
  const n = At(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Mt.Provider, { value: n, children: a });
}
function Un(e) {
  return !Fe(Mt).has(e);
}
function e0({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(S, { children: Un(e) ? a : n });
}
const Vn = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Yn(e, a, n, r) {
  return e.shiftKey ? document.activeElement === n ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? n : void 0;
}
function Xn(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Yn(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Jn(e) {
  return { onKeyDown: X(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Vn));
      Xn(n, e.current, r);
    },
    [e]
  ) };
}
function a0(e, a = !0) {
  R(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const it = { ArrowUp: -1, ArrowDown: 1 }, st = { ArrowLeft: -1, ArrowRight: 1 }, Qn = (e, a, n) => Math.min(n, Math.max(a, e));
function Zn(e, a) {
  if (a !== "horizontal" && e in it) return it[e];
  if (a !== "vertical" && e in st) return st[e];
}
function Na({ orientation: e = "both" } = {}) {
  const [a, n] = p(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  Ga(() => {
    var b;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const h = d[0], v = l.current;
    l.current = !1, n(h), v && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = X((d) => n(d), []), s = X((d) => {
    var h;
    n(d), (h = r.current.get(d)) == null || h.focus();
  }, []), c = X(
    (d) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const v = Math.max(0, h.indexOf(a)), b = Zn(d.key, e);
      b !== void 0 ? (d.preventDefault(), s(h[Qn(v + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), s(h[0])) : d.key === "End" && (d.preventDefault(), s(h[h.length - 1]));
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
const t0 = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, n0 = "0.2.0", r0 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], er = [1, 2, 3, 4, 5, 6], qt = [1, 2, 3], ar = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
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
  return er.includes(e);
}
function $a(e) {
  return qt.includes(e);
}
function l0(e) {
  if (!ka(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function o0(e) {
  if (!ka(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const tr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function nr(e) {
  if (!ka(e)) throw new Error("unvalidated stream step");
  return tr[e];
}
function ct(e) {
  return typeof e != "string" ? null : ar.includes(e) ? e : null;
}
function rr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function lr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function or(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function ir(e, a, n) {
  const r = rr(e);
  if (r === null) return null;
  const l = ct(n) ?? ct(r.type);
  return l === null ? null : { ...r, type: l, id: lr(r, a), at: or(r) };
}
function sr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function cr(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function i0(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = f(/* @__PURE__ */ new Map()), c = f(0), u = f(""), d = f(0), h = f(null), v = f(0), b = f(0), y = f(!1), x = f("reconnecting"), q = X((C) => {
    x.current = C, r(C);
  }, []), oe = X(() => {
    c.current = Date.now();
  }, []), Se = X((C) => {
    for (const [z, be] of s.current)
      (be === "*" || C.itemKey === be) && z(C);
  }, []), te = X(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: (C, z, be) => {
        const Ae = ir(C, z, be);
        Ae !== null && (Ae.id && (u.current = Ae.id), oe(), y.current = !1, q("live"), i(Ae.at), Se(Ae));
      },
      onOpen: () => {
        d.current = 0, y.current = !1, oe(), q("live");
      },
      onError: () => {
        var z;
        (z = h.current) == null || z.close(), h.current = null, y.current = !0, x.current !== "stale" && q("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** d.current, we.reconnectMax);
        d.current += 1, v.current = window.setTimeout(te, C);
      }
    });
  }, [Se, q, oe, a, e]), We = X((C) => {
    y.current = !0, C.close(), h.current = null, v.current = window.setTimeout(te, we.reconnectBase);
  }, [te]), ze = X((C, z) => (s.current.set(z, C), () => {
    s.current.delete(z);
  }), []);
  return R(() => (te(), b.current = window.setInterval(() => {
    const C = Date.now() - c.current, z = sr(C, x.current);
    z && q(z);
    const be = h.current;
    cr(C, y.current, be) && We(be);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(v.current), y.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [te, We, q]), { connection: n, lastEventAt: l, subscribe: ze };
}
function Ua(e, a) {
  const n = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return R(() => {
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
function dr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function dt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ca(e, a) {
  const n = f(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (dr() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), s.style.setProperty("--flash", `var(--ward-color-${i})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => dt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => dt(s), we.flash)));
  }, [a, e]);
  return R(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const ur = "_root_1otpc_2", hr = {
  root: ur
};
function mr(e, a, n, r, l) {
  const i = [Ka(a)];
  return e || i.push(`as of ${Kn(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Ce({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = Ua(e, l), s = (a == null ? void 0 : a.at) ?? e, c = mr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${hr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const wr = "_app_k9nx2_1", _r = "_side_k9nx2_18", fr = "_main_k9nx2_26", vr = "_rail_k9nx2_33", br = "_page_k9nx2_40", gr = "_root_k9nx2_91", pr = "_topbar_k9nx2_98", yr = "_mark_k9nx2_109", Nr = "_brand_k9nx2_116", kr = "_tagline_k9nx2_122", $r = "_identity_k9nx2_128", Cr = "_tools_k9nx2_129", Sr = "_nav_k9nx2_139", Rr = "_metadata_k9nx2_146", Tr = "_actor_k9nx2_161", Er = "_detail_k9nx2_162", Lr = "_content_k9nx2_222", xr = "_toolsPanel_k9nx2_238", Ar = "_skip_k9nx2_264", M = {
  app: wr,
  side: _r,
  main: fr,
  rail: vr,
  page: br,
  root: gr,
  topbar: pr,
  mark: yr,
  brand: Nr,
  tagline: kr,
  identity: $r,
  tools: Cr,
  nav: Sr,
  metadata: Rr,
  actor: Tr,
  detail: Er,
  content: Lr,
  toolsPanel: xr,
  skip: Ar
}, Ir = "_btn_1e06l_2", Mr = "_primary_1e06l_14", qr = "_destructive_1e06l_25", Pr = "_secondary_1e06l_35", Br = "_ghost_1e06l_40", Or = "_overflow_1e06l_49", Dr = "_sm_1e06l_56", Hr = "_disabled_1e06l_60", la = {
  btn: Ir,
  primary: Mr,
  destructive: qr,
  secondary: Pr,
  ghost: Br,
  overflow: Or,
  sm: Dr,
  disabled: Hr
};
function Fr(e, a, n, r) {
  const l = a === "sm" ? [la.sm, "ward-btn--sm"] : [], i = n ? [la.disabled] : [];
  return [la.btn, la[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function jr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Wr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function zr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Gr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Kr(e, a, n) {
  return Gr(e.describedBy, a && n);
}
function Ur({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Vr(e) {
  return e.children ?? e.label;
}
function _(e) {
  Wr(e);
  const a = e.variant ?? "secondary", n = e.size ?? "md", r = e.disabled ?? !1, l = zr(e), i = k();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Fr(a, n, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": n,
        disabled: r,
        title: l,
        "aria-describedby": Kr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...jr(a, e.controls),
        children: Vr(e)
      }
    ),
    /* @__PURE__ */ t(Ur, { id: i, reason: l })
  ] });
}
const Yr = /^([a-z][a-z0-9+.-]*):/i, Xr = /* @__PURE__ */ new Set(["http", "https"]), Jr = "#";
function Qr(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = Yr.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = Qr(e);
  return a === void 0 || Xr.has(a) ? e : Jr;
}
function Zr(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Bt(e) {
  const a = Zr(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function ta(e, a, n) {
  R(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const s = Bt(r);
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
function el(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function Va(e, a, n) {
  Ga(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = el(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Bt(r);
  }, [e, a, n]);
}
function Ya(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return R(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => n(s.matches);
    return r.addEventListener("change", l), n(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function al({ sidebar: e, header: a, children: n, rail: r }) {
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
function tl({ destinations: e, active: a }) {
  const n = f(null);
  return ta(n, e.length), Va(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t("nav", { ref: n, className: M.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ t("a", { href: W(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Oa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function nl({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ t(Oa, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Oa, { value: a, className: M.detail })
  ] });
}
function rl() {
  const e = Ya("(max-width: 767.98px)"), a = k(), n = f(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function ll({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: M.tools, children: /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: M.tools, children: e });
}
function ol({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function il(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ t("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Oa, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ t(tl, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: M.identity, children: /* @__PURE__ */ t(nl, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(ll, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function sl(e) {
  const a = k(), n = rl();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(il, { ...e, menu: n }),
    /* @__PURE__ */ t(ol, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: M.content, children: e.children })
  ] });
}
function cl(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function s0(e) {
  return cl(e) ? /* @__PURE__ */ t(al, { ...e }) : /* @__PURE__ */ t(sl, { ...e });
}
function Ca(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const dl = "_root_o4yib_2", ul = "_row_o4yib_8", hl = "_box_o4yib_14", ml = "_label_o4yib_21", wl = "_lockedNote_o4yib_26", _l = "_consequence_o4yib_34", fl = "_sample_o4yib_69", qe = {
  root: dl,
  row: ul,
  box: hl,
  label: ml,
  lockedNote: wl,
  consequence: _l,
  sample: fl
};
function vl(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function bl({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${qe.consequence} ward-check-consequence`, children: a }) : null;
}
function gl({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${qe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function pl({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: qe.sample, "aria-hidden": "true", children: e }) : null;
}
function Ot(e) {
  const a = k(), n = e.consequence ? `${a}-note` : void 0, r = vl(e);
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
          "aria-describedby": Ca(n, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: qe.label, children: [
        e.label,
        /* @__PURE__ */ t(gl, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(pl, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(bl, { id: n, text: e.consequence })
  ] });
}
const yl = "_chip_pq6tb_2", Nl = {
  chip: yl
}, kl = {
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
function $l(e, a) {
  if (e === "stream") return Cl(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = kl[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function Cl(e) {
  if (!e || !$a(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Pt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${Nl.chip} ward-chip ward-chip--${e}`, style: $l(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
function na(e) {
  return typeof e == "number" && $a(e) ? e : null;
}
function ve(e, a) {
  const n = na(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function Sa(e, a) {
  const n = na(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const Sl = "_nav_1y0vk_2", Rl = "_list_1y0vk_8", Tl = "_item_1y0vk_15", El = "_link_1y0vk_30", Ll = "_sep_1y0vk_40", xl = "_current_1y0vk_44", Al = "_chips_1y0vk_48", Ie = {
  nav: Sl,
  list: Rl,
  item: Tl,
  link: El,
  sep: Ll,
  current: xl,
  chips: Al
};
function Il({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ie.nav, children: [
    /* @__PURE__ */ t("ol", { className: Ie.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: Ie.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Ie.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Ie.link} ward-target`, href: W(n.href), children: n.label }) : n.label : /* @__PURE__ */ t("span", { className: Ie.current, "aria-current": "page", children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Ie.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(m, { ...n }, n.label)) }) : null
  ] }) });
}
const Ml = "_root_3rsto_2", ql = "_trigger_3rsto_7", Pl = "_value_3rsto_32", Bl = "_menu_3rsto_49", Ol = "_find_3rsto_71", Dl = "_list_3rsto_85", Hl = "_option_3rsto_95", Fl = "_check_3rsto_114", jl = "_empty_3rsto_125", _e = {
  root: Ml,
  trigger: ql,
  value: Pl,
  menu: Bl,
  find: Ol,
  list: Dl,
  option: Hl,
  check: Fl,
  empty: jl
}, Wl = 7, zl = 500;
function Gl(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function ut(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Kl(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => ut(e.options, e.value)), u = (d) => {
    var h;
    jn(() => r(!1)), d && ((h = a.current) == null || h.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: Gl(e.options, l),
    findable: e.options.length > Wl,
    show: () => {
      e.disabled || (i(""), c(ut(e.options, e.value)), r(!0));
    },
    close: u,
    to: c,
    pick: (d) => {
      var h;
      d && d.option.value !== e.value && ((h = e.onChange) == null || h.call(e, d.option.value)), u(!0);
    },
    find: (d) => {
      i(d), c(0);
    }
  };
}
function Ul(e, a, n) {
  const r = f(n);
  r.current = n, R(() => {
    if (!e) return;
    const l = (i) => {
      var s;
      (s = a.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, a]);
}
function Vl(e, a) {
  const n = f(!1);
  return R(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function Yl(e) {
  const a = f(""), n = f(void 0);
  return R(() => () => clearTimeout(n.current), []), (r) => {
    clearTimeout(n.current), a.current += r.toLowerCase(), n.current = setTimeout(() => {
      a.current = "";
    }, zl);
    const l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(a.current));
    l >= 0 && e.to(l);
  };
}
function Xl(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Dt(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Jl(e) {
  return { ...Dt(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Ht(e, a, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const Ql = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Zl(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      Ql.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function eo({ entry: e, at: a, menu: n, ids: r, value: l }) {
  return /* @__PURE__ */ o(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": a === n.active || void 0,
      className: _e.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => n.to(a),
      onClick: () => n.pick(e),
      children: [
        /* @__PURE__ */ t("span", { className: _e.check, "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: _e.label, children: e.option.label })
      ]
    }
  );
}
function Xa(e, a) {
  const n = e.entries[e.active];
  return n ? a.option(n.index) : void 0;
}
function ao({ menu: e, ids: a, focusRef: n }) {
  return /* @__PURE__ */ t(
    "input",
    {
      ref: n,
      className: _e.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": a.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": Xa(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Ht(e, Dt(e), () => {
      })
    }
  );
}
function to({ props: e, menu: a, ids: n, focusRef: r }) {
  const l = Yl(a), i = (s) => {
    Xl(s) && l(s.key);
  };
  return /* @__PURE__ */ o("div", { className: _e.menu, children: [
    a.findable && /* @__PURE__ */ t(ao, { menu: a, ids: n, focusRef: r }),
    /* @__PURE__ */ t(
      "ul",
      {
        ref: a.findable ? void 0 : r,
        id: n.list,
        role: "listbox",
        tabIndex: -1,
        className: _e.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": a.findable ? void 0 : Xa(a, n),
        onKeyDown: Ht(a, Jl(a), i),
        children: a.entries.map((s, c) => /* @__PURE__ */ t(eo, { entry: s, at: c, menu: a, ids: n, value: e.value }, s.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: _e.empty, children: "No match" })
  ] });
}
function no(e, a) {
  const n = e.open ? Xa(e, a) : void 0;
  R(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function Ft(...e) {
  return e.filter(Boolean).join(" ");
}
function ro(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function lo({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  const i = !e.options.some((s) => s.value === e.value);
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Ft(_e.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? n.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": Ca(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      ...Zl(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: _e.value, "data-placeholder": i || void 0, children: ro(e) })
    }
  );
}
function jt(e) {
  const a = k(), n = { list: `${a}-list`, value: `${a}-value`, option: (u) => `${a}-option-${u}` }, r = f(null), l = f(null), i = f(null), s = Kl(e, l), c = Vl(s.open, i);
  return Ul(s.open, r, () => s.close(!1)), no(s, n), /* @__PURE__ */ o("div", { ref: r, className: Ft(_e.root, e.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(lo, { props: e, menu: s, ids: n, trigger: l, wantFocus: c }),
    e.name && /* @__PURE__ */ t("input", { type: "hidden", name: e.name, value: e.value }),
    s.open && /* @__PURE__ */ t(to, { props: e, menu: s, ids: n, focusRef: i })
  ] });
}
const oo = "_field_1yzn8_2", io = "_label_1yzn8_8", so = "_labelHidden_1yzn8_15", co = "_control_1yzn8_25", uo = "_mono_1yzn8_45", ho = "_area_1yzn8_50", mo = "_invalid_1yzn8_57", Le = {
  field: oo,
  label: io,
  labelHidden: so,
  control: co,
  mono: uo,
  area: ho,
  invalid: mo
}, wo = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Wt = (e) => `${e}-label`;
function _o({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? wo : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function fo({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t(
    jt,
    {
      id: a.id,
      triggerClassName: n,
      "aria-labelledby": Wt(a.id),
      "aria-invalid": a["aria-invalid"],
      "aria-describedby": a["aria-describedby"],
      value: e.value,
      options: e.options ?? [],
      disabled: e.disabled,
      placeholder: e.placeholder,
      onChange: e.onChange
    }
  );
}
function vo({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const bo = { input: _o, select: fo, textarea: vo };
function go(e, a, n) {
  const r = bo[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function po(e, a, n) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ca(r ? n : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function yo(e) {
  const a = e.mono ? [Le.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Le.area] : [];
  return [Le.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function No(e) {
  return e ? `${Le.label} ${Le.labelHidden} ward-field-label` : `${Le.label} ward-field-label`;
}
function I(e) {
  const a = k(), n = `${a}-msg`, r = po(e, a, n), l = yo(e);
  return /* @__PURE__ */ o("div", { className: `${Le.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: Wt(a), className: No(e.labelHidden), htmlFor: a, children: e.label }),
    go(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Le.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const ko = "_strip_4moyw_2", $o = "_tab_4moyw_32", Co = "_count_4moyw_68", ea = {
  strip: ko,
  tab: $o,
  count: Co
}, ma = 7;
function So(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
function zt(e) {
  return `${ea.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function c0({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ma) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ma} — the set is fixed`);
  const i = Na({ orientation: "horizontal" }), s = So(e, a);
  R(() => i.setActive(s), [i.setActive, s]);
  const c = f(null);
  return ta(c, e.length), Va(c, s, '[role="tab"]'), /* @__PURE__ */ t(
    "div",
    {
      ref: c,
      className: zt(l),
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
function d0({ links: e, active: a, label: n, level: r = 1 }) {
  if (e.length > ma) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ma} — the set is fixed`);
  const l = f(null);
  return ta(l, e.length), Va(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t("nav", { ref: l, className: zt(r), "aria-label": n, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ea.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ea.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Ro = "_root_v56ff_3", To = "_segment_v56ff_9", ht = {
  root: Ro,
  segment: To
};
function Gt({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Na({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((u) => u.value === a));
  return R(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${ht.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((u, d) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: ht.segment,
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
const Eo = "_sidebar_11008_3", Lo = "_brand_11008_9", xo = "_mark_11008_17", Ao = "_word_11008_24", Io = "_nav_11008_30", Mo = "_navItem_11008_39", qo = "_footLink_11008_49", Po = "_group_11008_58", Bo = "_groupName_11008_65", Oo = "_agents_11008_81", Do = "_agent_11008_81", Ho = "_root_11008_96", Fo = "_agentTop_11008_105", jo = "_dot_11008_112", Wo = "_agentName_11008_124", zo = "_agentMeta_11008_137", Go = "_foot_11008_49", Ko = "_footName_11008_149", Uo = "_footLinks_11008_156", Vo = "_linkBrand_11008_183", Yo = "_label_11008_204", Xo = "_note_11008_209", Jo = "_footer_11008_218", T = {
  sidebar: Eo,
  brand: Lo,
  mark: xo,
  word: Ao,
  nav: Io,
  navItem: Mo,
  new: "_new_11008_48",
  footLink: qo,
  group: Po,
  groupName: Bo,
  agents: Oo,
  agent: Do,
  root: Ho,
  agentTop: Fo,
  dot: jo,
  agentName: Wo,
  agentMeta: zo,
  foot: Go,
  footName: Ko,
  footLinks: Uo,
  linkBrand: Vo,
  label: Yo,
  note: Xo,
  footer: Jo
};
function Qo({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: T.agent,
      href: W(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: T.agentTop, children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: T.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": Pt(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ t("span", { className: T.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ t("span", { className: T.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Zo({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: T.foot, children: [
    /* @__PURE__ */ t("span", { className: T.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: T.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${T.footLink} ward-target`, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function ei({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: T.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: T.brand, children: [
      /* @__PURE__ */ t("span", { className: T.mark }),
      /* @__PURE__ */ t("span", { className: T.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: T.nav, children: a.map((s) => /* @__PURE__ */ t("a", { className: T.navItem, href: W(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: T.group, children: [
      /* @__PURE__ */ o("span", { className: T.groupName, children: [
        n,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: T.new, href: W(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: T.agents, children: r.map((s) => /* @__PURE__ */ t(Qo, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(Zo, { shared: i })
  ] });
}
function ai(e) {
  return e.destinations ?? e.items ?? [];
}
function ti({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: T.linkBrand, children: e });
}
function ni({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: T.footer, children: e });
}
function ri({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: T.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: T.note, children: e.note })
  ] });
}
function li(e) {
  return /* @__PURE__ */ o("aside", { className: `${T.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(ti, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: ai(e).map((a) => /* @__PURE__ */ t(ri, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(ni, { children: e.children })
  ] });
}
function oi(e) {
  return "agents" in e;
}
function u0(e) {
  return oi(e) ? /* @__PURE__ */ t(ei, { ...e }) : /* @__PURE__ */ t(li, { ...e });
}
const ii = "_mark_wlgi8_3", si = {
  mark: ii
}, ci = { met: "✓", unmet: "", failed: "✕" };
function Ja({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: si.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: ci[e]
    }
  );
}
const di = "_marker_br9fi_2", ui = {
  marker: di
}, hi = {
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
  const r = { "--marker": hi[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${ui.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const mi = "_root_ti0pq_2", wi = "_chip_ti0pq_11", _i = "_noCase_ti0pq_23", oa = {
  root: mi,
  chip: wi,
  noCase: _i
};
function fi(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Qa({ connection: e, since: a, lastEventAt: n }) {
  const r = fi(a, n), l = Ua(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${oa.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(xe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${oa.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: oa.noCase, children: Ka(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${oa.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const vi = "_root_hijag_2", bi = "_context_hijag_12", gi = "_row_hijag_1", pi = "_heading_hijag_25", yi = "_headingWrap_hijag_33", Ni = "_chips_hijag_38", ki = "_title_hijag_45", $i = "_consequence_hijag_54", Ci = "_actionsWrap_hijag_60", Si = "_actions_hijag_60", Ri = "_action_hijag_60", Ti = "_overflowPanel_hijag_89", Ei = "_measureClip_hijag_100", Li = "_measure_hijag_100", Z = {
  root: vi,
  context: bi,
  row: gi,
  heading: pi,
  headingWrap: yi,
  chips: Ni,
  title: ki,
  consequence: $i,
  actionsWrap: Ci,
  actions: Si,
  action: Ri,
  overflowPanel: Ti,
  measureClip: Ei,
  measure: Li
};
function xi({ title: e, consequence: a, consequenceHint: n }) {
  return /* @__PURE__ */ o("div", { className: Z.heading, children: [
    /* @__PURE__ */ t("h1", { className: Z.title, children: e }),
    a && /* @__PURE__ */ t("p", { className: Z.consequence, title: n, children: a })
  ] });
}
function Da({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Z.action, "data-action": "", children: a }, n));
}
function mt({ disclosure: e }) {
  return /* @__PURE__ */ t(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Ai({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(mt, { disclosure: l }) : a ? [/* @__PURE__ */ t(mt, { disclosure: l }, "more"), /* @__PURE__ */ t(Da, { actions: e }, "actions")] : /* @__PURE__ */ t(Da, { actions: e });
}
function Ii(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Mi({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Da, { actions: e }) });
}
function qi(e, a) {
  const n = k(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function Pi({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Z.context, children: [
    /* @__PURE__ */ t(Il, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Z.chips, children: a.map((n) => /* @__PURE__ */ t(m, { ...n }, n.label)) }) : null
  ] });
}
function Bi(...e) {
  return e.some((a) => a === null);
}
function Oi(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Di(e, a, n, r, l) {
  if (l === 0 || Bi(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], u = Oi(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Hi(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Fi(e) {
  return Dn(e) && (e.type === "a" || typeof e.props.href == "string");
}
function ji(e, a) {
  return a.length === 0 && e.length === 1 && Fi(e[0]);
}
function Wi(e, a) {
  const n = f(null), r = f(null), l = f(null), i = f(null), [s, c] = p(!1);
  return R(() => {
    const u = n.current;
    if (!Hi(u)) return;
    const d = () => c(Di(u, r.current, l.current, i.current, e.length)), h = new ResizeObserver(d);
    return h.observe(u), d(), () => h.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function zi({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Z.measureClip, children: /* @__PURE__ */ o("div", { className: Z.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function Gi({ connection: e }) {
  return e ? /* @__PURE__ */ t(Qa, { connection: e.connection, since: e.since }) : null;
}
function h0({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: u, density: d = "page" }) {
  const { rowRef: h, headingRef: v, actionsRef: b, measureRef: y, collapsed: x } = Wi(i, ji(i, s)), q = s.length > 0, { disclosure: oe, close: Se } = qi(x || q, b), te = Ii(s, i, x, u);
  return /* @__PURE__ */ o("header", { className: Z.root, "data-density": d, children: [
    /* @__PURE__ */ t(Pi, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Z.row, ref: h, children: [
      /* @__PURE__ */ t("div", { ref: v, className: Z.headingWrap, children: /* @__PURE__ */ t(xi, { title: n, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ t(Gi, { connection: c }),
        /* @__PURE__ */ t("div", { className: Z.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ t(Ai, { actions: i, hasMore: q, collapsed: x, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Mi, { actions: te, disclosure: oe, onEscape: Se }),
    /* @__PURE__ */ t(zi, { actions: i, hasMore: q, measureRef: y })
  ] });
}
const Ki = "_scrim_rn7fr_2", Ui = "_drawer_rn7fr_10", Vi = "_sheet_rn7fr_14", Yi = "_modal_rn7fr_18", Xi = "_panel_rn7fr_23", Ji = "_header_rn7fr_54", Qi = "_title_rn7fr_62", Zi = "_body_rn7fr_66", es = "_close_rn7fr_93", ke = {
  scrim: Ki,
  drawer: Ui,
  sheet: Vi,
  modal: Yi,
  panel: Xi,
  header: Ji,
  title: Qi,
  body: Zi,
  close: es
}, as = je(null), wa = [], _a = /* @__PURE__ */ new Map();
function ts(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function ns(e, a) {
  let n = _a.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, _a.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function rs(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !ts(r) && ns(e, r);
}
function ls(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (rs(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function os(e) {
  for (const a of e.claims) {
    const n = _a.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), _a.delete(a)));
  }
}
function is(e, a) {
  const n = { root: e, claims: [] };
  return wa.push(n), ls(n, a), n;
}
function ss(e) {
  const a = wa.indexOf(e);
  a >= 0 && wa.splice(a, 1), os(e);
}
function wt(e) {
  return e !== null && wa.at(-1) === e;
}
function cs(e, a, n) {
  const r = f(null), l = f(n);
  return l.current = n, R(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = is(i, a);
    return r.current = c, () => {
      var d, h;
      const u = wt(c);
      ss(c), r.current = null, u && ((h = (d = l.current ?? s) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), X(() => wt(r.current), []);
}
function ds(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function us(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function hs({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${ke.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("header", { className: `${ke.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${ke.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${ke.body} ward-drawer-body`, children: e.children })
  ] });
}
function ms(e) {
  return `${ke.scrim} ${ke[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ws(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ke.panel} ${ke[e]} ward-overlay-panel${n}${r}`;
}
function _s(e) {
  const a = Fe(as);
  return e ?? a ?? document.body;
}
function ra(e) {
  const a = f(null), n = f(null), r = k(), l = _s(e.container), i = Ya("(min-width: 768px)"), s = ds(e.kind, i), c = us(e, r), u = Jn(n), d = cs(a, l, e.returnFocusTo), h = X(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return R(() => {
    var v, b;
    d() && ((b = (v = n.current) == null ? void 0 : v.querySelector("button")) == null || b.focus());
  }, [d]), R(() => {
    const v = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  }, [h]), Wn(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: ms(s),
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
            className: ws(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (v) => v.stopPropagation(),
            onKeyDown: (v) => d() && u.onKeyDown(v),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${ke.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(hs, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const fs = "_root_tgu1l_2", vs = "_ticket_tgu1l_16", bs = "_body_tgu1l_25", xa = {
  root: fs,
  ticket: vs,
  body: bs
};
function m0({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${xa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ t("span", { className: `${xa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ t("div", { className: xa.body, children: n })
  ] });
}
const gs = "_root_bf1pc_2", ps = "_table_bf1pc_9", ys = "_caption_bf1pc_14", Ns = "_series_bf1pc_23", ks = "_category_bf1pc_31", $s = "_cell_bf1pc_39", Cs = "_track_bf1pc_45", Ss = "_lane_bf1pc_52", Rs = "_bar_bf1pc_56", Ts = "_value_bf1pc_63", Es = "_swatch_bf1pc_70", Ls = "_empty_bf1pc_78", V = {
  root: gs,
  table: ps,
  caption: ys,
  series: Ns,
  category: ks,
  cell: $s,
  track: Cs,
  lane: Ss,
  bar: Rs,
  value: Ts,
  swatch: Es,
  empty: Ls
}, xs = "—", _t = 6;
function As(e, a) {
  if (a.length < 1 || a.length > _t)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${_t}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Is(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function Kt(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Ms(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function qs({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = Ms(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ o("span", { className: V.track, children: [
    /* @__PURE__ */ t("span", { className: V.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${V.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: V.value, children: e === null ? l : r(e) })
  ] }) });
}
function Ps({ series: e }) {
  return /* @__PURE__ */ t(S, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: V.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: V.swatch, "data-step": Kt(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Bs({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${V.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: V.caption, children: e }),
    /* @__PURE__ */ t("p", { className: V.empty, children: a })
  ] });
}
function Os({ title: e, categories: a, series: n, top: r, format: l = ae, categoryHead: i = "Category", missing: s = xs }) {
  return /* @__PURE__ */ t("div", { className: `${V.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: V.table, children: [
    /* @__PURE__ */ t("caption", { className: V.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: V.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(Ps, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: V.category, children: c }),
      n.map((d, h) => /* @__PURE__ */ t(qs, { value: d.values[u], top: r, step: Kt(h, n.length), format: l, missing: s }, d.name))
    ] }, c)) })
  ] }) });
}
function w0(e) {
  As(e.categories, e.series);
  const a = Is(e.series);
  return a === 0 ? /* @__PURE__ */ t(Bs, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(Os, { ...e, top: a });
}
const Ds = "_root_1bfqw_2", Hs = "_figure_1bfqw_7", Fs = "_of_1bfqw_13", js = "_bar_1bfqw_18", Ws = "_rows_1bfqw_38", zs = "_row_1bfqw_38", Gs = "_label_1bfqw_49", Ks = "_amount_1bfqw_54", Re = {
  root: Ds,
  figure: Hs,
  of: Fs,
  bar: js,
  rows: Ws,
  row: zs,
  label: Gs,
  amount: Ks
};
function Us({ spent: e, ceiling: a, breakdown: n }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Re.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Re.figure} ward-stat-value`, children: [
      re(e),
      " ",
      /* @__PURE__ */ o("span", { className: Re.of, children: [
        "of ",
        re(a)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${Re.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${re(e)} of ${re(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ t("ul", { className: Re.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Re.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Re.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: Re.amount, children: re(l.amount) })
    ] }, l.label)) })
  ] });
}
const Vs = "_frame_uovfv_2", Ys = "_table_uovfv_6", Xs = "_th_uovfv_12", Js = "_td_uovfv_13", Qs = "_sort_uovfv_48", Zs = "_row_uovfv_60", ec = "_empty_uovfv_68", Ee = {
  frame: Vs,
  table: Ys,
  th: Xs,
  td: Js,
  sort: Qs,
  row: Zs,
  empty: ec
}, ac = { asc: "ascending", desc: "descending" };
function tc(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ac[a.direction];
}
function nc(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Ee.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function rc(e) {
  return e === void 0 ? void 0 : { width: e };
}
function lc({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Ee.th,
      style: rc(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": tc(e, a),
      children: nc(e, n)
    }
  );
}
function oc({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: Ee.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ t("td", { className: Ee.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function ic({
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
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: Ee.empty, children: d }) : /* @__PURE__ */ t("div", { className: Ee.frame, children: /* @__PURE__ */ o("table", { className: Ee.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Ee.head, children: a.map((h) => /* @__PURE__ */ t(lc, { column: h, sort: c, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((h) => /* @__PURE__ */ t(oc, { row: h, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const sc = "_list_v0s52_2", cc = {
  list: sc
};
function _0({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: cc.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const dc = "_label_1u62a_2", uc = {
  label: dc
};
function f0({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: uc.label, children: a.header }) }, a.key)) }) });
}
const hc = "_stack_bp6a0_2", mc = {
  stack: hc
};
function v0({ children: e }) {
  return /* @__PURE__ */ t("span", { className: mc.stack, "data-ward-action-stack": "", children: e });
}
const wc = "_set_y5zy3_2", _c = "_legend_y5zy3_7", fc = "_row_y5zy3_15", vc = "_control_y5zy3_20", bc = "_input_y5zy3_26", gc = "_label_y5zy3_31", pc = "_consequence_y5zy3_36", Me = {
  set: wc,
  legend: _c,
  row: fc,
  control: vc,
  input: bc,
  label: gc,
  consequence: pc
};
function Ut({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const u = k(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: Me.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: Me.legend, children: e }),
    a.map((h) => {
      const v = `${d}-${h.value}`, b = h.consequence ? `${v}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Me.row, children: [
        /* @__PURE__ */ o("span", { className: Me.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: v,
              type: "radio",
              name: d,
              className: Me.input,
              value: h.value,
              checked: n === h.value,
              disabled: l,
              "aria-describedby": Ca(b, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: v, className: Me.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ t("p", { id: b, className: `${Me.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const yc = "_root_1lu1e_2", Nc = "_head_1lu1e_11", kc = "_note_1lu1e_30", $c = "_index_1lu1e_35", Cc = "_dot_1lu1e_39", Sc = "_counter_1lu1e_50", Rc = "_trailing_1lu1e_58", Pe = {
  root: yc,
  head: Nc,
  note: kc,
  index: $c,
  dot: Cc,
  counter: Sc,
  trailing: Rc
};
function Tc({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("span", { className: `${Pe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Pe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ec({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Pe.counter, "aria-hidden": "true", children: e }) : null;
}
function ft({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Pe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Pe.head, children: [
      /* @__PURE__ */ t(Tc, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: Pe.note, children: n }),
    /* @__PURE__ */ t(Ec, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: Pe.trailing, children: i })
  ] });
}
const Lc = "_strip_1foyq_2", xc = "_cell_1foyq_7", Ac = "_value_1foyq_12", Ic = "_link_1foyq_29", Mc = "_label_1foyq_47", De = {
  strip: Lc,
  cell: xc,
  value: Ac,
  link: Ic,
  label: Mc
};
function qc(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Vt = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Pc({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Vt(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function Bc({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Vt(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${De.link} ward-stat-link`, href: W(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ra({ cells: e, divided: a = !1 }) {
  return qc(e), /* @__PURE__ */ t("dl", { className: `${De.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(Pc, { cell: n }, n.label) : /* @__PURE__ */ t(Bc, { cell: n, href: n.href }, n.label)) });
}
const Oc = "_root_5jkzr_2", Dc = "_track_5jkzr_8", Hc = "_thumb_5jkzr_46", Fc = "_labelHidden_5jkzr_64", jc = "_label_5jkzr_64", Wc = "_lockedNote_5jkzr_84", Be = {
  root: Oc,
  track: Dc,
  thumb: Hc,
  labelHidden: Fc,
  label: jc,
  lockedNote: Wc
};
function zc(e) {
  return e ? `${Be.label} ${Be.labelHidden}` : Be.label;
}
function He({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = k(), u = `${c}switch`, d = l ? !0 : a, h = r || l;
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
    /* @__PURE__ */ o("label", { id: c, htmlFor: u, className: zc(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const Gc = "_bar_1y1tp_2", Kc = "_skip_1y1tp_11", Uc = "_mark_1y1tp_22", Vc = "_nav_1y1tp_30", Yc = "_list_1y1tp_34", Xc = "_select_1y1tp_41", Jc = "_selectTrigger_1y1tp_45", Qc = "_dest_1y1tp_52", Zc = "_actor_1y1tp_71", ed = "_actorMark_1y1tp_84", ad = "_actorLabel_1y1tp_89", td = "_tagline_1y1tp_108", ie = {
  bar: Gc,
  skip: Kc,
  mark: Uc,
  nav: Vc,
  list: Yc,
  select: Xc,
  selectTrigger: Jc,
  dest: Qc,
  actor: Zc,
  actorMark: ed,
  actorLabel: ad,
  tagline: td
};
function nd(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function rd(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function b0({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = rd(r);
  return /* @__PURE__ */ o("header", { className: ie.bar, children: [
    /* @__PURE__ */ t("a", { className: `${ie.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: ie.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: ie.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: ie.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: ie.list, children: a.map((u) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${ie.dest} ward-target`,
          href: W(u.href),
          "aria-current": u.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ t(
        jt,
        {
          className: ie.select,
          triggerClassName: ie.selectTrigger,
          "aria-label": "Destination",
          value: n,
          options: a.map((u) => ({ value: u.id, label: u.label })),
          onChange: (u) => i == null ? void 0 : i(u)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: ie.actor, children: [
      /* @__PURE__ */ t("span", { className: ie.actorLabel, children: c }),
      /* @__PURE__ */ t("span", { className: ie.actorMark, "aria-hidden": "true", children: nd(c) })
    ] })
  ] });
}
const ld = "_tree_1ite1_2", od = "_item_1ite1_6", id = "_row_1ite1_10", sd = "_button_1ite1_22", fa = {
  tree: ld,
  item: od,
  row: id,
  button: sd
}, Yt = je(null);
function cd({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = Na({ orientation: "vertical" });
  return /* @__PURE__ */ t(Yt.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: fa.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const dd = { ArrowRight: !0, ArrowLeft: !1 };
function vt(e) {
  return e ? !0 : void 0;
}
function ud(e, a) {
  const n = dd[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function hd(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function md(e) {
  const a = [fa.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function wd(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function _d(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function fd(e) {
  return typeof e == "string" ? e : void 0;
}
function vd({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function bd({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function Xt(e) {
  const a = Fe(Yt);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = wd(e);
  return /* @__PURE__ */ o("li", { className: fa.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: md(e),
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
            onClick: () => hd(e),
            onKeyDown: (r) => ud(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: _d(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: fd(e.label), children: e.label }),
              /* @__PURE__ */ t(vd, { value: e.detail }),
              /* @__PURE__ */ t(bd, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const gd = "_frame_1fj9j_2", pd = "_subjectRail_1fj9j_22", yd = "_subject_1fj9j_22", Nd = "_rail_1fj9j_42", kd = "_record_1fj9j_64", $d = "_recordBody_1fj9j_69", Cd = "_stageGrid_1fj9j_118", Sd = "_band_1fj9j_144", Rd = "_bandBody_1fj9j_153", Td = "_bandActions_1fj9j_158", Ed = "_scroller_1fj9j_166", Ld = "_board_1fj9j_192", xd = "_laneCount_1fj9j_200", Ad = "_lanes_1fj9j_210", Y = {
  frame: gd,
  subjectRail: pd,
  subject: yd,
  rail: Nd,
  record: kd,
  recordBody: $d,
  stageGrid: Cd,
  band: Sd,
  bandBody: Rd,
  bandActions: Td,
  scroller: Ed,
  board: Ld,
  laneCount: xd,
  lanes: Ad
};
function g0({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function bt(e) {
  return e ? "true" : void 0;
}
function p0({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": n, "data-ruled": bt(i), children: [
    /* @__PURE__ */ t("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Y.rail, "data-sticky": bt(l), "aria-label": r, children: a })
  ] });
}
function y0({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(ft, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(ft, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Y.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Id = "_form_1j8ub_2", Md = "_fields_1j8ub_9", qd = "_actions_1j8ub_19", Aa = {
  form: Id,
  fields: Md,
  actions: qd
};
function N0({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Aa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Aa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Aa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function k0({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Y.bandActions, children: a })
  ] });
}
const Pd = "(max-width: 767.98px)";
function Za({ label: e, children: a, laneCount: n, onOverflow: r }) {
  const l = f(null);
  ta(l, n ?? Hn.count(a), r);
  const i = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function Bd({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(I, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(Za, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Od({ lanes: e, label: a }) {
  const [n, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !n, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ t(Za, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ t(Fn, { children: l.content }, l.id)) })
  ] });
}
function $0({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ya(Pd);
  return n === void 0 ? /* @__PURE__ */ t(Za, { label: a, children: e }) : l ? /* @__PURE__ */ t(Bd, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(Od, { lanes: n, label: a });
}
function C0({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = f(null), i = Math.max(e, 1);
  ta(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ t("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": n, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const Dd = "_block_1o5o7_2", Hd = "_sentence_1o5o7_15", Fd = "_meta_1o5o7_20", jd = "_action_1o5o7_25", Wd = "_strip_1o5o7_29", zd = "_loading_1o5o7_48", Gd = "_label_1o5o7_56", Kd = "_counter_1o5o7_63", fe = {
  block: Dd,
  sentence: Hd,
  meta: Fd,
  action: jd,
  strip: Wd,
  loading: zd,
  label: Gd,
  counter: Kd
};
function Ud({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: fe.action, children: /* @__PURE__ */ t(_, { onClick: e.onClick, children: e.label }) });
}
function Ta({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${fe.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: fe.sentence, children: e }),
    n,
    /* @__PURE__ */ t(Ud, { action: a })
  ] });
}
function Vd(e) {
  return /* @__PURE__ */ t(Ta, { ...e, kind: "ward-emptystate" });
}
function S0({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Ta, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function R0(e) {
  return /* @__PURE__ */ t(Ta, { ...e });
}
function T0({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Ta, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function E0({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function L0({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function x0({ label: e, startedAt: a }) {
  const n = f(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  R(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = Ua(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${fe.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: fe.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: fe.counter, children: Ka(i) }) : null
  ] });
}
const Yd = "_note_tlubt_2", Xd = {
  note: Yd
};
function Jd({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: Xd.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const Qd = "_card_1tggt_2", Zd = "_hit_1tggt_29", eu = "_head_1tggt_42", au = "_title_1tggt_48", tu = "_meta_1tggt_56", nu = "_fields_1tggt_57", ru = "_who_1tggt_70", lu = "_sep_1tggt_77", ou = "_mono_1tggt_81", iu = "_field_1tggt_57", su = "_last_1tggt_96", cu = "_reason_1tggt_108", J = {
  card: Qd,
  hit: Zd,
  head: eu,
  title: au,
  meta: tu,
  fields: nu,
  who: ru,
  sep: lu,
  mono: ou,
  field: iu,
  last: su,
  reason: cu
}, du = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function uu(e, a, n) {
  const r = ca(e, "blue"), l = ca(e, "orange"), i = ca(e, "green"), s = f(/* @__PURE__ */ new Set());
  R(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (u) => {
      if (s.current.has(u.id)) return;
      s.current.add(u.id);
      const d = du[u.type];
      d && c[d]();
    });
  }, [r, n, i, a, l]);
}
const hu = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function mu(e, a) {
  return hu[a](e);
}
function wu({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: J.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: J.meta, children: [
    /* @__PURE__ */ o("span", { className: J.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    n,
    /* @__PURE__ */ t(Ce, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: J.meta, children: [
    /* @__PURE__ */ o("span", { className: J.who, children: [
      "waits on ",
      e.waitsOn
    ] }),
    n,
    /* @__PURE__ */ o("span", { className: J.mono, children: [
      ce(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function _u({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: J.head, children: [
    e.flagged && /* @__PURE__ */ t(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function fu({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: J.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function vu({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: J.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: J.field, children: mu(e, n) }, n)) });
}
const Ha = (e) => e ? !0 : void 0;
function bu(e) {
  return { "--stream": ve(e.streamStep, "id") };
}
function gu(e, a, n) {
  e == null || e(a, n);
}
function pu(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function yu({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: J.last, "data-stale": Ha(a), children: n }) : null;
}
function Ea(e) {
  const a = e.fields ?? [], n = e.item, r = f(null);
  uu(r, n.key, e.feed);
  const l = pu(e.feed), i = bu(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: J.card,
      style: i,
      "data-selected": Ha(e.selected),
      "data-flagged": Ha(n.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: J.hit, onClick: (s) => gu(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(_u, { item: n }),
        /* @__PURE__ */ t("p", { className: J.title, children: n.title }),
        /* @__PURE__ */ t(wu, { item: n, connection: l }),
        /* @__PURE__ */ t(fu, { reason: n.blockedReason }),
        /* @__PURE__ */ t(vu, { item: n, fields: a }),
        /* @__PURE__ */ t(yu, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Nu = "_column_10sxg_3", ku = "_head_10sxg_24", $u = "_label_10sxg_33", Cu = "_count_10sxg_42", Su = "_list_10sxg_56", Qe = {
  column: Nu,
  head: ku,
  label: $u,
  count: Cu,
  list: Su
};
function Jt(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Ru({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: Qe.head, children: [
    /* @__PURE__ */ t("h2", { className: Qe.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Qe.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Tu(e) {
  return /* @__PURE__ */ t("div", { className: Qe.list, role: "list", children: e.rows.map((a, n) => {
    var r;
    return /* @__PURE__ */ t(
      Ea,
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
function Eu({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, v = Jt(a, r);
  return /* @__PURE__ */ o("section", { className: Qe.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ t(Ru, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ t(Tu, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: v }),
    h && /* @__PURE__ */ t(Jd, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Lu = "_foot_1tnhe_2", xu = "_note_1tnhe_13", Au = "_link_1tnhe_19", Ia = {
  foot: Lu,
  note: xu,
  link: Au
};
function A0({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ia.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: Ia.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${Ia.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Iu = "_head_m60n1_3", Mu = "_identity_m60n1_12", qu = "_titleRow_m60n1_18", Pu = "_title_m60n1_18", Bu = "_key_m60n1_35", Ou = "_rollup_m60n1_45", Du = "_tools_m60n1_53", Hu = "_swatch_m60n1_65", Fu = "_mark_m60n1_72", ye = {
  head: Iu,
  identity: Mu,
  titleRow: qu,
  title: Pu,
  key: Bu,
  rollup: Ou,
  tools: Du,
  swatch: Hu,
  mark: Fu
}, gt = "initials:";
function ju(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Wu(e) {
  const a = [ju(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function zu(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Wu(e)
  ] });
}
function Gu(e) {
  return e.startsWith(gt) ? e.slice(gt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function Ku({ markRef: e, streamStep: a }) {
  const n = { "--stream": ve(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ye.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: Gu(e) }) : /* @__PURE__ */ t("span", { className: ye.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Uu({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(I, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function I0({
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
  return /* @__PURE__ */ o("div", { className: ye.head, children: [
    /* @__PURE__ */ o("div", { className: ye.identity, children: [
      /* @__PURE__ */ o("div", { className: ye.titleRow, children: [
        /* @__PURE__ */ t(Ku, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ye.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ye.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ye.rollup, "aria-live": "polite", children: zu(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ye.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(Uu, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(_, { onClick: c, children: "Configure board" }),
      u,
      /* @__PURE__ */ t(Qa, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const Vu = "_head_16yf6_14", Yu = "_line_16yf6_15", Xu = "_cHandle_16yf6_36", Ju = "_cName_16yf6_41", Qu = "_nameLine_16yf6_49", Zu = "_cLabel_16yf6_56", eh = "_cCap_16yf6_61", ah = "_cShown_16yf6_66", th = "_name_16yf6_49", nh = "_noCap_16yf6_88", rh = "_state_16yf6_102", lh = "_handle_16yf6_111", oh = "_sub_16yf6_137", B = {
  head: Vu,
  line: Yu,
  cHandle: Xu,
  cName: Ju,
  nameLine: Qu,
  cLabel: Zu,
  cCap: eh,
  cShown: ah,
  name: th,
  noCap: nh,
  state: rh,
  handle: lh,
  sub: oh
}, ih = "can't be hidden or collapsed", sh = "terminal · counted, not a column";
function M0() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: B.cHandle }),
    /* @__PURE__ */ t("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: B.cShown, children: "Shown" })
  ] });
}
function ch(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function dh(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function pt(e) {
  return e.gate ? ih : e.terminal ? sh : dh(e.agentsMounted);
}
function uh(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function hh({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ t("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    pt(e) && /* @__PURE__ */ t("span", { className: B.sub, children: pt(e) })
  ] });
}
function mh(e) {
  return e === void 0 ? "" : String(e);
}
function wh(e) {
  return e === "" ? void 0 : Number(e);
}
function _h({ name: e, onReorder: a }) {
  return /* @__PURE__ */ t("span", { className: B.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: B.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (n) => uh(n, a),
      children: "⠿"
    }
  ) });
}
function fh({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: B.cCap, children: /* @__PURE__ */ t(I, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: mh(a.cap), onChange: (r) => n({ ...a, cap: wh(r) }) }) });
}
function vh({ stage: e, config: a, onChange: n }) {
  const r = ch(e, a.shown), l = e.gate || e.terminal, i = (s) => n({ ...a, shown: s });
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ t(He, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ t("span", { className: B.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function bh(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function q0({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": bh(e), children: [
    /* @__PURE__ */ t(_h, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(hh, { stage: e }),
    /* @__PURE__ */ t("span", { className: B.cLabel, children: /* @__PURE__ */ t(I, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(fh, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(vh, { stage: e, config: a, onChange: n })
  ] });
}
const gh = "_body_hn6d6_2", ph = "_head_hn6d6_9", yh = "_summary_hn6d6_19", Nh = "_block_hn6d6_20", kh = "_actionsBlock_hn6d6_21", $h = "_title_hn6d6_41", Ch = "_note_hn6d6_46", Sh = "_k_hn6d6_51", Rh = "_kv_hn6d6_58", Th = "_row_hn6d6_64", Eh = "_label_hn6d6_75", Lh = "_value_hn6d6_84", xh = "_quote_hn6d6_90", Ah = "_actions_hn6d6_21", Ih = "_resolve_hn6d6_103", O = {
  body: gh,
  head: ph,
  summary: yh,
  block: Nh,
  actionsBlock: kh,
  title: $h,
  note: Ch,
  k: Sh,
  kv: Rh,
  row: Th,
  label: Eh,
  value: Lh,
  quote: xh,
  actions: Ah,
  resolve: Ih
};
function Mh(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function qh(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Ce, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Ph(e) {
  const a = na(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Bh(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(m, { ...Sa(Ph(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Mh(e),
    ...qh(e, a)
  ];
}
function Oh({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: O.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: O.k, children: a }),
    e
  ] });
}
function Dh({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: O.head, children: [
    /* @__PURE__ */ t(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function Hh({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: O.block, children: [
    /* @__PURE__ */ t("p", { className: O.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: O.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: O.note, children: e.agentMeta })
  ] }) : null;
}
function P0({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const u = k(), d = Bh(e, l);
  return /* @__PURE__ */ t(ra, { kind: "drawer", labelledBy: u, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: O.body, children: [
    /* @__PURE__ */ t(Dh, { item: e }),
    /* @__PURE__ */ o("div", { className: O.summary, children: [
      /* @__PURE__ */ t("h2", { className: O.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: O.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: O.kv, children: d.map(([h, v]) => /* @__PURE__ */ o("div", { className: O.row, children: [
      /* @__PURE__ */ t("dt", { className: O.label, children: h }),
      /* @__PURE__ */ t("dd", { className: O.value, children: v })
    ] }, h)) }),
    /* @__PURE__ */ t(Hh, { item: e }),
    /* @__PURE__ */ o("div", { className: O.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: O.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: O.note, children: c })
    ] }),
    /* @__PURE__ */ t(Oh, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Fh = "_root_3azmy_2", jh = "_list_3azmy_7", Wh = "_item_3azmy_12", zh = "_box_3azmy_18", Gh = "_text_3azmy_23", Kh = "_note_3azmy_28", Ge = {
  root: Fh,
  list: jh,
  item: Wh,
  box: zh,
  text: Gh,
  note: Kh
};
function La({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ge.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ge.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ge.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ge.box, children: /* @__PURE__ */ t(Ja, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ge.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ge.note} ward-checklist-note`, children: a })
  ] });
}
const Uh = "_rail_ke7ch_2", Vh = "_k_ke7ch_11", Yh = "_head_ke7ch_19", Xh = "_section_ke7ch_25", Jh = "_card_ke7ch_38", Qh = "_strip_ke7ch_42", Zh = "_skeleton_ke7ch_56", em = "_skeletonLabel_ke7ch_70", am = "_bar_ke7ch_76", tm = "_note_ke7ch_85", he = {
  rail: Uh,
  k: Vh,
  head: Yh,
  section: Xh,
  card: Jh,
  strip: Qh,
  skeleton: Zh,
  skeletonLabel: em,
  bar: am,
  note: tm
};
function nm(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ma({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: he.k, children: e }),
    a
  ] });
}
function rm({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function lm({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Eu, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function om(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(lm, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(rm, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function B0(e) {
  const a = nm(e.onOpen), n = Jt(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Ma, { title: "Card", children: /* @__PURE__ */ t("div", { className: he.card, children: n && /* @__PURE__ */ t(Ea, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ma, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(om, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Ma, { title: "Effect of this config", children: /* @__PURE__ */ t(La, { items: e.effects, density: "compact" }) })
  ] });
}
function im(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function sm(e) {
  return Math.ceil(e.length / 2);
}
function cm(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Qt(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function dm(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Qt(e);
  l !== void 0 && n(l), r(cm(e.type));
}
function um(e, a, n, r, l) {
  R(() => {
    if (e !== null)
      return e.subscribe(a, (i) => dm(i, n, r, l));
  }, [e, a, n, r, l]);
}
function hm(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function mm(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function wm(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function _m(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(sm(a ?? [])) + ")"
  };
}
function fm(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function vm(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(m, { role: "meta", label: re(e.cost) }) : null;
}
function bm(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(m, { role: "meta", label: e.jiraKey }) : null;
}
function gm(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function pm(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function ym(e, a) {
  return a === void 0 ? e : im(e, a.ref);
}
function Nm(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function aa(e) {
  return e === !0 ? "true" : void 0;
}
function Zt(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = f(null), i = ca(l), s = f(/* @__PURE__ */ new Set()), [c, u] = p(hm(a));
  um(e.feed, a.key, s, u, i);
  const d = mm(a, r), h = wm(a, n), v = _m(a, e.fields), b = pm(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Nm(e),
      className: "ward-workcard",
      "data-flagged": aa(a.flagged),
      "data-selected": aa(e.selected),
      style: v,
      ref: ym(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        fm(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(m, { role: d.role, label: d.label }),
          vm(a, e.fields),
          bm(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          gm(n, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function km({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function $m(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Cm(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ t(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Sm(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(km, { count: e.items.length, cap: e.column.cap });
}
function Rm(e, a) {
  return e.roving ?? a;
}
function Tm(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Em(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    Zt,
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
function Lm(e) {
  const a = k(), n = Na({ orientation: "vertical" }), r = Rm(e, n), l = $m(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": aa(l), "data-gate": aa(e.column.gate), children: [
    Cm(e.column, e.items.length, a),
    Sm(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Tm(e, n), children: Em(e, r) })
  ] });
}
function xm(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function Am(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(I, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Im(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function O0(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: xm(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Am(e),
      Im(e.onConfigure),
      /* @__PURE__ */ t(Qa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Mm(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function qm(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(He, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(He, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Pm(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ t(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function D0(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": aa(Mm(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: qm(e) }),
    /* @__PURE__ */ t(I, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(Ot, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Pm(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function H0(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(Zt, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(Lm, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function Bm(e, a) {
  const n = Qt(e);
  n !== void 0 && a(n);
}
function Om(e, a, n) {
  R(() => {
    if (e != null)
      return e.subscribe(a, (r) => Bm(r, n));
  }, [e, a, n]);
}
function Dm(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Hm(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function Fm(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function jm(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function F0(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  Om(e.feed, a.key, l);
  const i = [...Dm(a), ...Hm(a)];
  return /* @__PURE__ */ o(ra, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Fm(n, r)
    ] }),
    jm(a, e.actions)
  ] });
}
const Wm = "_card_1u4a0_2", zm = "_head_1u4a0_28", Gm = "_mark_1u4a0_36", Km = "_name_1u4a0_48", Um = "_chips_1u4a0_69", Vm = "_description_1u4a0_75", Ym = "_run_1u4a0_80", Xm = "_sep_1u4a0_89", Jm = "_facts_1u4a0_94", Qm = "_fact_1u4a0_94", Zm = "_factLabel_1u4a0_107", ew = "_factValue_1u4a0_111", le = {
  card: Wm,
  head: zm,
  mark: Gm,
  name: Km,
  chips: Um,
  description: Vm,
  run: Ym,
  sep: Xm,
  facts: Jm,
  fact: Qm,
  factLabel: Zm,
  factValue: ew
}, aw = { live: "done", draft: "running", paused: "meta" };
function tw(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function nw({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ t(m, { role: aw[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function rw({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: le.description, children: e });
}
function lw({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function ow({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ t("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function iw(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function sw({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": ve(e.streamStep, "id") }, u = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: tw(s),
      style: c,
      "data-selected": u,
      "data-paused": iw(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ t("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ t(rw, { description: e.description }),
        /* @__PURE__ */ t(lw, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(nw, { versions: e.versions }),
        /* @__PURE__ */ t(ow, { facts: i })
      ]
    }
  );
}
const cw = "_list_4dcyc_2", dw = "_row_4dcyc_11", uw = "_head_4dcyc_23", hw = "_id_4dcyc_30", mw = "_lock_4dcyc_35", ww = "_reason_4dcyc_41", _w = "_remove_4dcyc_46", fw = "_clauses_4dcyc_50", vw = "_clause_4dcyc_50", bw = "_label_4dcyc_64", gw = "_cell_4dcyc_71", pw = "_value_4dcyc_76", se = {
  list: cw,
  row: dw,
  head: uw,
  id: hw,
  lock: mw,
  reason: ww,
  remove: _w,
  clauses: fw,
  clause: vw,
  label: bw,
  cell: gw,
  value: pw
}, en = je(!1);
function j0({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(en.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: se.list, "aria-label": a, children: e }) });
}
function yw({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: se.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(I, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function Nw({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: se.lock, children: [
    /* @__PURE__ */ t(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: se.reason, children: e })
  ] });
}
function kw({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: se.head, children: [
    /* @__PURE__ */ t("span", { className: se.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(Nw, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: se.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function yt(e, a) {
  return e.locked ? void 0 : a;
}
function W0({ rule: e, onChange: a, onRemove: n }) {
  if (!Fe(en)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = yt(e, a);
  return /* @__PURE__ */ o("li", { className: se.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(kw, { rule: e, onRemove: yt(e, n) }),
    /* @__PURE__ */ t("dl", { className: se.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: se.clause, children: [
      /* @__PURE__ */ t("dt", { className: se.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: se.cell, children: /* @__PURE__ */ t(yw, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const $w = "_ladder_j98f1_2", Cw = "_cell_j98f1_7", Sw = "_empty_j98f1_26", Rw = "_name_j98f1_34", Tw = "_holder_j98f1_40", Ew = "_request_j98f1_46", Lw = "_swatches_j98f1_51", xw = "_swatch_j98f1_51", Aw = "_tilesFrame_j98f1_78", Iw = "_tiles_j98f1_78", Mw = "_tile_j98f1_78", qw = "_bar_j98f1_117", Pw = "_hex_j98f1_128", Bw = "_note_j98f1_138", L = {
  ladder: $w,
  cell: Cw,
  empty: Sw,
  name: Rw,
  holder: Tw,
  request: Ew,
  swatches: Lw,
  swatch: xw,
  tilesFrame: Aw,
  tiles: Iw,
  tile: Mw,
  bar: qw,
  hex: Pw,
  note: Bw
}, z0 = "not validated yet, pending a CVD matrix and dark stepping";
function Ow(e) {
  return e.reserved ? "reserved" : $a(e.step) ? "validated" : "partial";
}
function an(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Dw(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Hw({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(xe, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Fw(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function jw(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Nt = (e) => String(e).padStart(2, "0");
function Ww(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? an(e, void 0);
}
function zw({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${L.hex} ward-ladder-hex`, children: r ? `step ${Nt(e)}` : nr(e) }),
    /* @__PURE__ */ t("span", { className: `${L.note} ward-ladder-note`, children: r ? n : `Step ${Nt(e)} · ${n}` })
  ] });
}
function Gw({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = Ow(e), c = an(s, n), u = c !== "free", d = u || i, h = a === e.step, v = e.name ?? `Step ${e.step}`, b = () => {
    d || r(e.step);
  }, y = `${v} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...jw(u, h, d), "data-validation": s, style: Dw(e, s), onClick: b, onKeyDown: (q) => Fw(q, b) }, label: y, name: v, holder: c, validation: s, note: Ww(s, n, h), step: e.step };
}
const Kw = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${L.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${L.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(zw, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${L.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(Hw, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${L.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${L.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Uw(e) {
  return Kw[e.presentation](Gw(e));
}
function Vw(e) {
  for (const a of e)
    if (!a.reserved && !ka(a.step)) throw new Error("colour ladder renders token steps only");
}
function Yw() {
  return /* @__PURE__ */ o("div", { className: `${L.cell} ward-ladder-cell ${L.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${L.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${L.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Xw(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Jw = { list: L.ladder, swatches: L.swatches, tiles: L.tilesFrame };
function Qw() {
  return /* @__PURE__ */ o("div", { className: `${L.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${L.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${L.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Zw = { list: Yw, swatches: () => null, tiles: Qw };
function e_(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function tn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Vw(e.steps);
  const r = Xw(e), l = Zw[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(Uw, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...e_(e.disabled === !0), className: `${Jw[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: L.tiles, children: i }) : i });
}
const a_ = "_rail_1el2t_2", t_ = "_section_1el2t_12", n_ = "_sectionFlush_1el2t_22", r_ = "_head_1el2t_26", l_ = "_headLabel_1el2t_34", o_ = "_sample_1el2t_42", i_ = "_sampleLabel_1el2t_47", s_ = "_sampleTitle_1el2t_54", c_ = "_sampleMeta_1el2t_59", d_ = "_trace_1el2t_65", u_ = "_traceHead_1el2t_70", h_ = "_steps_1el2t_78", m_ = "_step_1el2t_78", w_ = "_stepTitle_1el2t_97", __ = "_hollow_1el2t_107", f_ = "_stepBody_1el2t_115", v_ = "_stepDetail_1el2t_127", b_ = "_publish_1el2t_132", g_ = "_reason_1el2t_138", p_ = "_note_1el2t_143", y_ = "_reveal_1el2t_148", N = {
  rail: a_,
  section: t_,
  sectionFlush: n_,
  head: r_,
  headLabel: l_,
  sample: o_,
  sampleLabel: i_,
  sampleTitle: s_,
  sampleMeta: c_,
  trace: d_,
  traceHead: u_,
  steps: h_,
  step: m_,
  stepTitle: w_,
  hollow: __,
  stepBody: f_,
  stepDetail: v_,
  publish: b_,
  reason: g_,
  note: p_,
  reveal: y_
}, kt = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, N_ = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, k_ = { ok: "greenFill", finding: "orangeFill", action: "blue" }, $_ = { notSimulated: "not simulated", running: "running" };
function C_(e) {
  return e.presentation === "foundry";
}
function S_(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function R_(e, a) {
  var r;
  const n = N_[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function T_(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function E_(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function L_(e) {
  if (T_(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function x_(e) {
  const [a, n] = p(!1);
  R(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${N.step} ${N.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function A_(e) {
  const a = $_[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: N.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(xe, { size: 6, kind: k_[e.kind], label: e.kind });
}
function I_(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: N.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function M_(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Ce, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function q_(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(x_, { kind: a.kind, children: [
    /* @__PURE__ */ t(A_, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: N.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: N.stepTitle, children: a.title }),
      /* @__PURE__ */ t(I_, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(M_, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function P_(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function nn(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${N.trace} ${N.section}`, children: [
    /* @__PURE__ */ t("p", { className: N.traceHead, id: a, children: P_(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: N.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(q_, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function B_(e) {
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
function O_(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${N.sampleMeta} ${N.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function D_(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? It(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: N.sectionFlush, children: /* @__PURE__ */ t(Ra, { divided: !0, cells: a }) });
}
function H_(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: It(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function F_(e) {
  const a = H_(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: N.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: N.sectionFlush, children: /* @__PURE__ */ t(Ra, { divided: !0, cells: a }) });
}
function rn(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("p", { className: `${N.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function j_(e) {
  return /* @__PURE__ */ o("div", { className: `${N.publish} ${N.section}`, children: [
    /* @__PURE__ */ t(rn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: N.note, children: e.note })
  ] });
}
function W_(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${N.publish} ${N.section}`, children: /* @__PURE__ */ t(rn, { reason: e.reason, onPublish: e.onPublish }) });
}
function ln(e) {
  return /* @__PURE__ */ o("div", { className: `${N.head} ${N.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: N.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(m, { role: kt[e.run.status].role, label: kt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Ce, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function z_(e, a) {
  const [n, r] = p(e.steps);
  return R(() => r(e.steps), [e.steps]), R(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), n;
}
function G_(e) {
  var n;
  E_(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(ln, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(B_, { sample: e.run.sample }),
    /* @__PURE__ */ t(nn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(D_, { run: e.run }),
    /* @__PURE__ */ t("div", { className: N.section, children: /* @__PURE__ */ t(La, { items: e.checklist }) }),
    /* @__PURE__ */ t(j_, { reason: S_(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function K_(e) {
  var r;
  const a = z_(e.run, e.feed);
  L_(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(ln, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(O_, { sample: e.run.sample }),
    /* @__PURE__ */ t(nn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(F_, { run: e.run }),
    /* @__PURE__ */ t("div", { className: N.section, children: /* @__PURE__ */ t(La, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(W_, { reason: R_(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function G0(e) {
  return C_(e) ? /* @__PURE__ */ t(K_, { ...e }) : /* @__PURE__ */ t(G_, { ...e });
}
const U_ = "_list_142ip_3", V_ = "_row_142ip_9", Y_ = "_condition_142ip_18", X_ = "_action_142ip_24", da = {
  list: U_,
  row: V_,
  condition: Y_,
  action: X_
}, on = je(!1);
function K0({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(on.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: da.list, "aria-label": a, children: e }) });
}
function U0({ rule: e }) {
  if (!Fe(on)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: da.row, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ t("span", { className: da.condition, children: e.when }),
    /* @__PURE__ */ t(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ t("span", { className: da.action, children: e.then })
  ] });
}
const J_ = "_move_tmppt_3", Q_ = {
  move: J_
};
function Fa(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function sn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function cn(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function $t(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function Z_(e) {
  return e === "up" ? "down" : "up";
}
function ef(e, a) {
  const n = $t(e, a.id, a.direction) ?? $t(e, a.id, Z_(a.direction));
  n == null || n.focus();
}
function dn() {
  const e = f(null), [a, n] = p(null), [r, l] = p("");
  return R(() => {
    e.current !== null && a !== null && ef(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function un({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function va({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${Q_.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const af = "_body_1h15q_2", tf = "_title_1h15q_8", nf = "_section_1h15q_13", rf = "_legend_1h15q_18", lf = "_stages_1h15q_26", of = "_stage_1h15q_26", sf = "_stageIndex_1h15q_44", cf = "_stageName_1h15q_50", df = "_footer_1h15q_59", uf = "_note_1h15q_66", hf = "_reason_1h15q_71", mf = "_actions_1h15q_76", wf = "_webHead_1h15q_83", _f = "_kicker_1h15q_92", ff = "_webTitle_1h15q_99", vf = "_webBody_1h15q_105", bf = "_webSection_1h15q_109", gf = "_sectionHead_1h15q_121", pf = "_sectionNote_1h15q_129", yf = "_formLabel_1h15q_134", Nf = "_identityRow_1h15q_139", kf = "_nameCell_1h15q_145", $f = "_keyCell_1h15q_150", Cf = "_colourCell_1h15q_154", Sf = "_colourStatus_1h15q_161", Rf = "_webStages_1h15q_166", Tf = "_webStageList_1h15q_172", Ef = "_webStage_1h15q_166", Lf = "_webIndex_1h15q_191", xf = "_webStageName_1h15q_196", Af = "_webMoves_1h15q_201", If = "_addStage_1h15q_215", Mf = "_addStageButton_1h15q_223", qf = "_addStageNote_1h15q_231", Pf = "_webFooter_1h15q_236", Bf = "_webFooterNotes_1h15q_244", Of = "_webNote_1h15q_251", w = {
  body: af,
  title: tf,
  section: nf,
  legend: rf,
  stages: lf,
  stage: of,
  stageIndex: sf,
  stageName: cf,
  footer: df,
  note: uf,
  reason: hf,
  actions: mf,
  webHead: wf,
  kicker: _f,
  webTitle: ff,
  webBody: vf,
  webSection: bf,
  sectionHead: gf,
  sectionNote: pf,
  formLabel: yf,
  identityRow: Nf,
  nameCell: kf,
  keyCell: $f,
  colourCell: Cf,
  colourStatus: Sf,
  webStages: Rf,
  webStageList: Tf,
  webStage: Ef,
  webIndex: Lf,
  webStageName: xf,
  webMoves: Af,
  addStage: If,
  addStageButton: Mf,
  addStageNote: qf,
  webFooter: Pf,
  webFooterNotes: Bf,
  webNote: Of
}, Df = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], hn = "not in catalogue";
function Hf(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${hn}` }, ...n];
}
function Ff({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(I, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${hn}`;
  return /* @__PURE__ */ t(I, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Hf(n, e.name), invalid: i, onChange: r });
}
function mn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function jf(e) {
  const a = f([]), n = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Wf({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = mn(a, n), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: w.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: w.webStageName, children: /* @__PURE__ */ t(Ff, { stage: a, index: n, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ t(I, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: Df, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(va, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(va, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function zf({ stages: e, onChange: a, catalogue: n }) {
  const r = jf(e.length), l = dn(), i = (c, u) => {
    const d = sn(c, u);
    r.current = Fa(r.current, c, d), l.moved({ id: r.current[d], direction: u }, cn(mn(e[c], c), d, e.length)), a(Fa(e, c, d));
  }, s = (c, u) => a(e.map((d, h) => h === c ? u : d));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, u) => /* @__PURE__ */ t(Wf, { id: r.current[u], stage: c, index: u, total: e.length, catalogue: n, onReplace: (d) => s(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ t(un, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Gf = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Kf = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Uf = "A new stream starts as a draft. Nothing runs on it until you publish it.", Vf = "Create is disabled: name the stream and give it a key first.", Yf = "reorder with the ↑ ↓ buttons · min 2";
function et(e, a) {
  return !e.reserved && $a(e.step) && a[e.step] === void 0;
}
function Xf(e, a) {
  const n = e.find((r) => et(r, a));
  return n ? n.step : 1;
}
function Jf({ stages: e, onMove: a }) {
  const n = dn(), r = (l, i) => {
    const s = sn(l, i);
    n.moved({ id: e[l].id, direction: i }, cn(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ t(va, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(va, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(un, { text: n.announcement })
  ] });
}
function Qf({ reason: e, onCreate: a, onDraft: n }) {
  const r = k();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ t("p", { className: w.note, children: Uf }),
    e && /* @__PURE__ */ t("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ t(_, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Zf(e, a) {
  return e !== "" && a !== "" ? null : Vf;
}
function ev(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = Kf, onCreate: i, onDraft: s, onClose: c, returnFocusTo: u } = e, d = k(), [h, v] = p(""), [b, y] = p(""), [x, q] = p(a[0].value), [oe, Se] = p(() => Xf(n, r)), [te, We] = p(e.stages ?? Gf), [ze, C] = p(l[0].value), z = { name: h, key: b, streamStep: oe, owner: x, stages: te, policy: ze }, be = Zf(h, b);
  return /* @__PURE__ */ t(ra, { kind: "modal", labelledBy: d, onClose: c, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ t("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ t("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ t(I, { kind: "input", label: "Stream name", value: h, onChange: v }),
      /* @__PURE__ */ t(I, { kind: "input", label: "Key", value: b, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(I, { kind: "select", label: "Owner", value: x, onChange: q, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ t("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ t(tn, { label: "Stream colour", steps: n, value: oe, onChange: Se, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ t("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ t(Jf, { stages: te, onMove: (Ae, On) => We(Fa(te, Ae, On)) })
    ] }),
    /* @__PURE__ */ t(Ut, { legend: "Loop policy", options: l, value: ze, onChange: C }),
    /* @__PURE__ */ t(Qf, { reason: be, onCreate: () => i(z), onDraft: () => s(z) })
  ] }) });
}
const wn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], av = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function tv(e, a, n, r, l, i) {
  var c;
  const s = ((c = wn.find((u) => u.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function nv(e, a) {
  return rv(e) && lv(e, a) && ov(e);
}
function rv(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function lv(e, a) {
  return e.colourStep === null || et({ step: e.colourStep }, a);
}
function ov(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function iv(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : et({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function sv({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function cv({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ t(sv, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: w.reason, children: av })
    ] }),
    l && /* @__PURE__ */ t(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function dv({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ t("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function uv({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: w.webSection, children: [
    /* @__PURE__ */ t("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: w.identityRow, children: [
      /* @__PURE__ */ t("div", { className: w.nameCell, children: /* @__PURE__ */ t(I, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ t("div", { className: w.keyCell, children: /* @__PURE__ */ t(I, { variant: "form", label: "Key", value: n, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function hv(e) {
  const a = k(), n = k(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [u, d] = p(e.owners[0] ?? ""), [h, v] = p(null), [b, y] = p("relay"), [x, q] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = tv(l, s, u, h, b, x), Se = nv(oe, r), te = x.find((C) => C.kind === "agent" && C.name.trim() !== ""), We = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ t("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(tn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: v, takenBy: r })
  ] }), ze = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("p", { className: w.colourStatus, "data-colour-status": "", children: iv(h, r) }),
    /* @__PURE__ */ t(I, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((C) => ({ value: C, label: C })), onChange: d })
  ] });
  return /* @__PURE__ */ o(ra, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(dv, { titleId: n }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ t(uv, { name: l, setName: i, streamKey: s, setKey: c, colour: We, owner: ze }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: w.sectionNote, children: Yf })
        ] }),
        /* @__PURE__ */ t(zf, { stages: x, onChange: q })
      ] }),
      /* @__PURE__ */ t("section", { className: w.webSection, children: /* @__PURE__ */ t(Ut, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: wn, onChange: y }) }),
      /* @__PURE__ */ t(cv, { ready: Se, draft: oe, agentStage: te, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function V0(e) {
  return "presentation" in e ? /* @__PURE__ */ t(hv, { ...e }) : /* @__PURE__ */ t(ev, { ...e });
}
const mv = "_row_bs8hc_2", wv = "_cell_bs8hc_6", _v = "_condition_bs8hc_11", fv = "_action_bs8hc_18", vv = "_contract_bs8hc_24", bv = "_contractCondition_bs8hc_33", gv = "_contractAction_bs8hc_39", Q = {
  row: mv,
  cell: wv,
  condition: _v,
  action: fv,
  contract: vv,
  contractCondition: bv,
  contractAction: gv
}, _n = ["advance", "block", "escalate", "requestReview"], Ct = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ba(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function at(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Q.action, children: Ct[e.then] }) : /* @__PURE__ */ t(
    I,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: _n.map((l) => ({ value: l, label: Ct[l] }))
    }
  );
}
function pv({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t("span", { className: Q.condition, title: ba(e, r), children: ba(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: at(e, a, n) })
  ] });
}
function yv({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ t(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ t("span", { className: Q.condition, children: ba(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: at(e, a, n) })
  ] });
}
function Nv({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ t("span", { className: Q.contractCondition, children: ba(e, r) }),
    /* @__PURE__ */ t(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ t("span", { className: Q.contractAction, children: at(e, a, n, !0) })
  ] });
}
const kv = { two: yv, four: pv, contract: Nv };
function Y0(e) {
  var n;
  if (!_n.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = kv[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const $v = "_column_1tf9e_2", Cv = "_head_1tf9e_17", Sv = "_index_1tf9e_23", Rv = "_name_1tf9e_29", Tv = "_meta_1tf9e_38", Ev = "_mono_1tf9e_43", Lv = "_gate_1tf9e_50", xv = "_reviewersLabel_1tf9e_57", Av = "_reviewers_1tf9e_57", Iv = "_reviewer_1tf9e_57", Mv = "_agents_1tf9e_74", qv = "_workflowColumn_1tf9e_79", Pv = "_workflowHead_1tf9e_96", Bv = "_stageRow_1tf9e_102", Ov = "_stageLabel_1tf9e_109", Dv = "_workflowTitle_1tf9e_116", Hv = "_workflowMeta_1tf9e_122", Fv = "_workflowGate_1tf9e_127", jv = "_gateNote_1tf9e_135", Wv = "_cardNote_1tf9e_140", zv = "_reviewerList_1tf9e_145", Gv = "_reviewerRow_1tf9e_151", Kv = "_reviewerMark_1tf9e_157", Uv = "_reviewerName_1tf9e_167", Vv = "_terminalCard_1tf9e_173", Yv = "_terminalCount_1tf9e_182", Xv = "_workflowAgents_1tf9e_188", Jv = "_mount_1tf9e_194", $ = {
  column: $v,
  head: Cv,
  index: Sv,
  name: Rv,
  meta: Tv,
  mono: Ev,
  gate: Lv,
  reviewersLabel: xv,
  reviewers: Av,
  reviewer: Iv,
  agents: Mv,
  workflowColumn: qv,
  workflowHead: Pv,
  stageRow: Bv,
  stageLabel: Ov,
  workflowTitle: Dv,
  workflowMeta: Hv,
  workflowGate: Fv,
  gateNote: jv,
  cardNote: Wv,
  reviewerList: zv,
  reviewerRow: Gv,
  reviewerMark: Kv,
  reviewerName: Uv,
  terminalCard: Vv,
  terminalCount: Yv,
  workflowAgents: Xv,
  mount: Jv
}, Qv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function tt(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function fn(e) {
  return `${Math.round(e * 100)}%`;
}
function Zv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: $.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: $.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: $.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: $.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Ra, { cells: [
      { value: fn(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function eb({ stage: e }) {
  return /* @__PURE__ */ t(Ra, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: tt(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function ab({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: $.head, children: [
    /* @__PURE__ */ t("span", { className: $.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: $.name, id: a, children: e.name }),
    /* @__PURE__ */ t(m, { role: e.kind === "gate" ? "gate" : "soft", label: Qv[e.kind] })
  ] });
}
function tb({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: $.meta, children: [
    /* @__PURE__ */ o("span", { className: $.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: $.mono, children: [
      ce(e.medianWait),
      " median wait"
    ] })
  ] });
}
function nb({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(Zv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(eb, { stage: e }) : null;
}
function rb({ onMount: e }) {
  return e ? /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function lb({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: $.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(ab, { stage: e, titleId: l }),
    /* @__PURE__ */ t(tb, { stage: e }),
    /* @__PURE__ */ t(nb, { stage: e }),
    /* @__PURE__ */ t("div", { className: $.agents, children: a.map((s) => /* @__PURE__ */ t(sw, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(rb, { onMount: n })
  ] });
}
const ob = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function ib({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: $.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: $.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: $.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: $.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function sb({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: $.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: $.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(ib, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: $.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: fn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function cb(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function db({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: $.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: $.terminalCount, children: tt(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: $.cardNote, children: cb(e.rolledBackThisWeek) })
  ] });
}
function ub(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function hb(e) {
  if (e.kind === "terminal") return `${tt(e.closedThisWeek)} this week`;
  const a = ub(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function mb({ stage: e, titleId: a }) {
  const n = ob[e.kind];
  return /* @__PURE__ */ o("header", { className: $.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: $.stageRow, children: [
      /* @__PURE__ */ o("span", { className: $.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(m, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: $.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: $.workflowMeta, children: hb(e) })
  ] });
}
function wb(e) {
  return e === "entry" || e === "agent";
}
function _b({ stage: e, onMount: a }) {
  return a === void 0 || !wb(e.kind) ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", className: $.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function fb({ stage: e, agentCards: a, onMount: n }) {
  const r = k();
  return /* @__PURE__ */ o("section", { className: $.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(mb, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(sb, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(db, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: $.workflowAgents, children: a }),
    /* @__PURE__ */ t(_b, { stage: e, onMount: n })
  ] });
}
function vb(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function X0(e) {
  return vb(e) ? /* @__PURE__ */ t(fb, { ...e }) : /* @__PURE__ */ t(lb, { ...e });
}
const bb = "_row_1jata_6", gb = "_name_1jata_12", pb = "_compactRow_1jata_13", yb = "_compactName_1jata_13", Nb = "_cell_1jata_30", kb = "_chain_1jata_45", $b = "_owner_1jata_51", Cb = "_mono_1jata_57", Sb = "_compactCell_1jata_79", Rb = "_stack_1jata_96", Tb = "_stat_1jata_103", Eb = "_identityLine_1jata_110", Lb = "_identity_1jata_110", xb = "_ownerLine_1jata_137", Ab = "_link_1jata_150", Ib = "_gateMark_1jata_156", Mb = "_emptyChain_1jata_161", qb = "_arrow_1jata_167", Pb = "_muted_1jata_168", Bb = "_define_1jata_173", Ob = "_statValue_1jata_180", Db = "_policyId_1jata_186", Hb = "_sub_1jata_191", g = {
  row: bb,
  name: gb,
  compactRow: pb,
  compactName: yb,
  cell: Nb,
  chain: kb,
  owner: $b,
  mono: Cb,
  compactCell: Sb,
  stack: Rb,
  stat: Tb,
  identityLine: Eb,
  identity: Lb,
  ownerLine: xb,
  link: Ab,
  gateMark: Ib,
  emptyChain: Mb,
  arrow: qb,
  muted: Pb,
  define: Bb,
  statValue: Ob,
  policyId: Db,
  sub: Hb
};
function vn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function Fb(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function jb(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function bn(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Wb(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${bn(e.members)}`;
}
function zb(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(m, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: Wb(e) })
  ] }) });
}
function gn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(m, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Gb(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = na(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Kb({ stages: e, streamStep: a }) {
  const n = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: g.link, children: [
    l === 0 ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ t(gn, { name: r.name, gate: r.gate === !0, look: Gb(l, n, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function Ub(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : Kb(e) });
}
function pn(e) {
  return e === void 0 ? void 0 : !0;
}
function St(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": pn(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function Vb(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Yb(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Xb({ stream: e, href: a, presentation: n }) {
  const r = jb(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: vn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ve(e.streamStep, "chip") }, children: [
    zb(e, a),
    Ub(e),
    St(Yb(e.agents), e.agents === void 0 ? void 0 : Fb(e.agents), "—"),
    Vb(e.policy),
    St(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Jb(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function J0(e) {
  if (Jb(e)) return Xb(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: vn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: W(n), children: a.name }),
      /* @__PURE__ */ t(m, { ...Sa(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(gn, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ o("span", { className: g.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("span", { className: g.owner, children: a.owner }),
      /* @__PURE__ */ t("span", { className: g.mono, children: bn(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": pn(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const Qb = "_row_mdce7_2", Zb = "_name_mdce7_16", eg = "_scope_mdce7_24", ga = {
  row: Qb,
  name: Zb,
  scope: eg
};
function ag(e) {
  return e === void 0 ? `${ga.row} ward-toolrow` : `${ga.row} ward-toolrow ${e}`;
}
function tg(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function ng({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function rg({ classification: e }) {
  return /* @__PURE__ */ t(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function lg({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${ga.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function og(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function Q0({ tool: e, onChange: a, presentation: n }) {
  const r = k(), l = k(), i = tg(e, n), s = og(n);
  return /* @__PURE__ */ o(s, { className: ag(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(ng, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${ga.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(lg, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(rg, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const ig = "_strip_1qtlf_2", sg = "_head_1qtlf_10", cg = "_name_1qtlf_16", dg = "_chart_1qtlf_24", ug = "_segment_1qtlf_30", hg = "_detailedChart_1qtlf_36", mg = "_rail_1qtlf_49", wg = "_section_1qtlf_55", _g = "_label_1qtlf_66", fg = "_note_1qtlf_83", ee = {
  strip: ig,
  head: sg,
  name: cg,
  chart: dg,
  segment: ug,
  detailedChart: hg,
  rail: mg,
  section: wg,
  label: _g,
  note: fg
}, vg = "No item in flight to preview.", bg = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", gg = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", ja = [1, 2, 3, 4, 5, 6], pa = 100;
function pg(e, a) {
  return a.has(e) ? ve(e, "id") : "var(--ward-color-line)";
}
function yg({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: ja.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: ee.segment,
      x: l * pa,
      y: "0",
      width: pa,
      height: "8",
      fill: pg(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Ng(e) {
  const a = e.slice(0, ja.length);
  for (; a.length < ja.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function kg({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${ee.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, n) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(n * pa),
        y: "0",
        width: String(pa),
        height: "40",
        style: { fill: ve(a.streamStep, "chip") }
      },
      a.key + String(n)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((a, n) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(n))) })
  ] });
}
function yn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ia({ label: e, children: a }) {
  const n = k();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: ee.label, children: e }),
    a
  ] });
}
function $g({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: ee.note, children: a ?? vg }) : /* @__PURE__ */ t(Ea, { item: { ...e, streamStep: na(n.streamStep) }, onOpen: yn(r), feed: null });
}
function Cg({ draft: e }) {
  const a = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ t(xe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ t(m, { ...Sa(e.key, e.streamStep) })
  ] });
}
function Sg(e) {
  const a = Ng(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(ia, { label: "Board card", children: /* @__PURE__ */ t($g, { ...e, draft: n }) }),
    /* @__PURE__ */ t(ia, { label: "Streams index row", children: /* @__PURE__ */ t(Cg, { draft: n }) }),
    /* @__PURE__ */ o(ia, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(kg, { identities: a }),
      /* @__PURE__ */ t("p", { className: ee.note, children: bg })
    ] }),
    /* @__PURE__ */ t(ia, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: ee.note, children: gg }) })
  ] });
}
function Rg({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ t(xe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ t(m, { ...Sa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t(Ea, { item: { ...a, streamStep: e.streamStep }, onOpen: yn(r) }),
    /* @__PURE__ */ t(yg, { draft: e, streams: n })
  ] });
}
function Z0(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(Sg, { ...e }) : /* @__PURE__ */ t(Rg, { ...e });
}
const Tg = "_row_ixlg5_6", Eg = "_headCell_ixlg5_10", Lg = "_cell_ixlg5_11", xg = "_name_ixlg5_23", Ag = "_consequence_ixlg5_29", Ig = "_governed_ixlg5_36", Mg = "_control_ixlg5_42", qg = "_byRole_ixlg5_48", Pg = "_webControl_ixlg5_59", Bg = "_webConsequence_ixlg5_65", Og = "_webGoverned_ixlg5_71", H = {
  row: Tg,
  headCell: Eg,
  cell: Lg,
  name: xg,
  consequence: Ag,
  governed: Ig,
  control: Mg,
  byRole: qg,
  webControl: Pg,
  webConsequence: Bg,
  webGoverned: Og
};
function Dg({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: H.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: H.control, children: [
    /* @__PURE__ */ t(
      He,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => n(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ t(m, { role: "running", label: "PILOT" })
  ] });
}
function Hg({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: H.headCell, children: [
      /* @__PURE__ */ t("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: H.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: H.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(Dg, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function Fg(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function jg({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${H.webControl} ${H.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    He,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${H.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(m, { role: "running", label: "PILOT" }),
    r
  ] });
}
function Wg({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("td", { className: H.cell, children: [
      /* @__PURE__ */ t("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${H.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(jg, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t("span", { className: `${H.webGoverned} ward-cellmeta`, children: Fg(e) }) })
  ] });
}
function eC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Wg, { ...e }) : /* @__PURE__ */ t(Hg, { ...e });
}
const zg = "_row_vv64h_2", Gg = "_cell_vv64h_6", Kg = "_name_vv64h_25", Ug = "_note_vv64h_30", Vg = "_webName_vv64h_41", Yg = "_webMeta_vv64h_47", U = {
  row: zg,
  cell: Gg,
  name: Kg,
  note: Ug,
  webName: Vg,
  webMeta: Yg
}, Nn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Xg(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Jg({ component: e, onRestart: a }) {
  const n = k(), r = Nn[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: U.row, children: [
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t("span", { className: U.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: U.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t("span", { id: n, className: U.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: U.cell, "data-align": "end", children: l ? /* @__PURE__ */ t(_, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Qg({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: Xg(e.state) });
}
function Zg({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: U.row, children: [
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t("span", { className: `${U.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t("span", { className: `${U.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t(m, { ...Nn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t(Qg, { component: e, onRestart: a }) })
  ] });
}
function aC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Zg, { ...e }) : /* @__PURE__ */ t(Jg, { ...e });
}
const ep = "_row_1f1gp_7", ap = "_cell_1f1gp_11", tp = "_next_1f1gp_28", np = "_headCell_1f1gp_38", rp = "_webId_1f1gp_77", lp = "_webPurpose_1f1gp_83", op = "_webMeta_1f1gp_91", ip = "_webUrgent_1f1gp_97", F = {
  row: ep,
  cell: ap,
  next: tp,
  headCell: np,
  webId: rp,
  webPurpose: lp,
  webMeta: op,
  webUrgent: ip
}, sp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, cp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, kn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], dp = Object.fromEntries(kn.map((e) => [e.key, e]));
function Ke({ column: e, children: a }) {
  const n = dp[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: F.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function tC() {
  return /* @__PURE__ */ t("tr", { children: kn.map((e) => /* @__PURE__ */ t(
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
function up({ cred: e }) {
  const a = sp[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Ke, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Ke, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Ke, { column: "state", children: /* @__PURE__ */ t(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Ke, { column: "cls", children: /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ t(Ke, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Ke, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function hp({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function mp({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(hp, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(m, { ...cp[e.state] }) })
  ] });
}
function nC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(mp, { ...e }) : /* @__PURE__ */ t(up, { ...e });
}
const wp = "_card_17zba_2", _p = "_head_17zba_11", fp = "_env_17zba_18", vp = "_version_17zba_25", bp = "_meta_17zba_32", gp = "_webCard_17zba_37", pp = "_webRow_17zba_47", yp = "_webTitle_17zba_55", Np = "_webLine_17zba_65", kp = "_webVersion_17zba_72", $p = "_webMeta_17zba_77", K = {
  card: wp,
  head: _p,
  env: fp,
  version: vp,
  meta: bp,
  webCard: gp,
  webRow: pp,
  webTitle: yp,
  webLine: Np,
  webVersion: kp,
  webMeta: $p
}, $n = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Cp({ env: e }) {
  const a = $n[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: K.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t("span", { className: K.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ t(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ t("p", { className: K.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: K.meta, children: [
      "deployed ",
      de(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ t("p", { className: K.meta, children: n })
  ] });
}
function Sp(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function Rp(e) {
  return /* @__PURE__ */ o("article", { className: `${K.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${K.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${K.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(m, { ...$n[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${K.version} ${K.webVersion} ${K.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${K.meta} ${K.webMeta} ${K.webLine} ward-cellmeta`, children: Sp(e) })
  ] });
}
function rC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Rp, { ...e }) : /* @__PURE__ */ t(Cp, { ...e });
}
const Tp = "_panel_1hmja_2", Ep = "_line_1hmja_8", Lp = "_actions_1hmja_14", sa = {
  panel: Tp,
  line: Ep,
  actions: Lp
};
function lC(e) {
  return /* @__PURE__ */ o("div", { className: sa.panel, children: [
    /* @__PURE__ */ t("p", { className: sa.line, children: e.status }),
    /* @__PURE__ */ t(I, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: sa.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: sa.line, children: e.note ?? "" })
  ] });
}
const xp = "_upload_1vgt7_2", Ap = "_preview_1vgt7_7", Ip = "_mark_1vgt7_17", Mp = "_empty_1vgt7_22", qp = "_actions_1vgt7_28", Pp = "_input_1vgt7_33", Bp = "_reasons_1vgt7_41", Op = "_reason_1vgt7_41", Dp = "_accepted_1vgt7_57", ne = {
  upload: xp,
  preview: Ap,
  mark: Ip,
  empty: Mp,
  actions: qp,
  input: Pp,
  reasons: Bp,
  reason: Op,
  accepted: Dp
}, Cn = 1.5, Sn = 22, ya = "script elements or event handlers", Te = "links or external references", $e = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Cn}px at ${Sn}px`], Hp = [$e[1], $e[2], ya, Te], Fp = /* @__PURE__ */ new Map([
  ["image", $e[1]],
  ["text", $e[2]],
  ["tspan", $e[2]],
  ["textPath", $e[2]],
  ["script", ya],
  ["foreignObject", ya],
  ["a", Te],
  ["use", Te],
  ["style", Te],
  ["feImage", Te],
  ["set", Te]
]), jp = "http://www.w3.org/2000/svg", Wp = "http://www.w3.org/2000/xmlns/", zp = /* @__PURE__ */ new Set([
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
]), Gp = /* @__PURE__ */ new Set([
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
]), nt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, Kp = /url\s*\(|['"\\]/i;
function Up() {
  return { ok: !1, reasons: [$e[1]] };
}
function Rn(e) {
  return e.namespaceURI === jp;
}
function Vp(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && Rn(a) ? a : null;
  } catch {
    return null;
  }
}
function Yp(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [$e[0]] : [];
}
function Xp(e) {
  return Fp.get(e.localName) ?? (e.localName.startsWith("animate") ? Te : void 0);
}
function Jp(e) {
  return Kp.test(e.replace(nt, ""));
}
function Qp(e) {
  return /^on/i.test(e.localName) ? ya : e.localName === "href" || Jp(e.value) ? Te : void 0;
}
function Zp(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(Xp(n));
    for (const r of Array.from(n.attributes)) a.add(Qp(r));
  }
  return Hp.filter((n) => a.has(n));
}
function ey(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? Sn / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Cn;
  }) ? [$e[3]] : [];
}
function ay(e) {
  if (e.namespaceURI === Wp) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Gp.has(a) || a.startsWith("stroke"));
}
function ty(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && Rn(a) && zp.has(a.localName);
}
function ny(e, a) {
  ty(a) ? a.nodeType === Node.ELEMENT_NODE && Tn(a) : e.removeChild(a);
}
function Tn(e) {
  for (const a of Array.from(e.attributes)) ay(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) ny(e, a);
  return e;
}
function ry(e) {
  return Array.from(e.matchAll(nt), (a) => a[2]).filter((a) => a !== "");
}
function ly(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function oy(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of ry(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function iy(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(nt, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function sy(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = oy(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), iy(l, r);
  }
  return e;
}
function oC(e) {
  const a = Vp(e);
  if (a === null) return Up();
  const n = [...Yp(a), ...Zp(a), ...ey(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(sy(Tn(a), ly(e))) };
}
const cy = "Mark accepted.", dy = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, uy = new Set(qt.flatMap((e) => [ve(e, "id"), ve(e, "chip")]));
function hy(e) {
  return e !== void 0 && (dy.test(e) || uy.has(e)) ? e : void 0;
}
function my({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: ne.preview, style: { "--mark": hy(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: ne.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: ne.empty }) });
}
function wy(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function _y(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function fy({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: ne.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("p", { className: ne.accepted, children: cy }) }) : /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("ul", { className: ne.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: ne.reason, children: a }, a)) }) });
}
function vy({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(fy, { result: e }) : /* @__PURE__ */ t("p", { className: `${ne.result} ${wy(e, n)}`, role: "status", children: _y(e, n) });
}
function Rt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function iC({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = f(null), [s, c] = p(null), u = (d) => {
    if (d === void 0) return;
    const h = a(d);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ o("div", { className: ne.upload, children: [
    /* @__PURE__ */ t(my, { current: e }),
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
      /* @__PURE__ */ t(_, { ...Rt(l), onClick: () => {
        var d;
        return (d = i.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(_, { ...Rt(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(vy, { result: s, presentation: r })
  ] });
}
const by = "_row_1wp9s_7", gy = "_cell_1wp9s_11", py = "_head_1wp9s_28", yy = "_name_1wp9s_34", Ny = "_pinned_1wp9s_42", ky = "_headCell_1wp9s_49", $y = "_webName_1wp9s_88", Cy = "_webMeta_1wp9s_95", Sy = "_webWarn_1wp9s_103", P = {
  row: by,
  cell: gy,
  head: py,
  name: yy,
  pinned: Ny,
  headCell: ky,
  webName: $y,
  webMeta: Cy,
  webWarn: Sy
}, rt = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, En = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Ry = Object.fromEntries(En.map((e) => [e.key, e]));
function Ty(e, a) {
  return `mcp.${e}.${a}`;
}
function Ey(e) {
  return Object.keys(rt).includes(e);
}
function Ly(e) {
  return rt[e !== void 0 && Ey(e) ? e : "unknown"];
}
function Je({ column: e, children: a }) {
  const n = Ry[e];
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
function sC() {
  return /* @__PURE__ */ t("tr", { children: En.map((e) => /* @__PURE__ */ t(
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
function xy({ server: e }) {
  const a = rt[e.connection];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o(Je, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: P.head, children: [
        /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
        /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: P.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(Je, { column: "connection", children: /* @__PURE__ */ t(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(Je, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(Je, { column: "tools", children: e.tools.map((n) => Ty(e.name, n)).join(" · ") })
  ] });
}
function Ay(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Iy(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function My({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function qy({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Py({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function By({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: Ay(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(m, { ...Iy(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(My, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(m, { ...Ly(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t(qy, { server: e, onRestart: a }),
      /* @__PURE__ */ t(Py, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function cC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(By, { ...e }) : /* @__PURE__ */ t(xy, { ...e });
}
const Oy = "_row_160my_2", Dy = "_headCell_160my_14", Hy = "_cell_160my_15", Fy = "_name_160my_26", jy = "_consequence_160my_32", Wy = "_reason_160my_38", zy = "_value_160my_44", Gy = "_webRow_160my_60", Ky = "_webSetting_160my_71", Uy = "_webName_160my_79", Vy = "_webConsequence_160my_87", Yy = "_webControl_160my_93", Xy = "_webState_160my_107", Jy = "_webChip_160my_112", A = {
  row: Oy,
  headCell: Dy,
  cell: Hy,
  name: Fy,
  consequence: jy,
  reason: Wy,
  value: zy,
  webRow: Gy,
  webSetting: Ky,
  webName: Uy,
  webConsequence: Vy,
  webControl: Yy,
  webState: Xy,
  webChip: Jy
}, Ln = 104, xn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function Qy({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(He, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Gt, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: A.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function Zy({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = k(), i = xn[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: A.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: A.headCell, children: [
      /* @__PURE__ */ t("span", { className: A.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: A.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: A.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: A.cell, children: /* @__PURE__ */ t(Qy, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: A.cell, style: { width: Ln }, children: /* @__PURE__ */ t(m, { role: i.role, label: i.label }) })
  ] });
}
function An(e, a) {
  return String(e ?? a);
}
function eN(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function aN(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? An(e.value, "—");
}
function tN({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: A.webControl, children: [
    /* @__PURE__ */ t(He, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: A.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function nN(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(tN, { ...e });
  const l = eN(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: A.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Gt, { options: l, value: An(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${A.webControl} ${A.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: aN(a) });
}
function rN({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = k(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${A.row} ${A.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: A.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${A.name} ${A.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${A.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: A.webControl, children: i(s) }) : /* @__PURE__ */ t(nN, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${A.webChip} ward-policy-chip`, style: { width: Ln }, children: /* @__PURE__ */ t(m, { ...xn[n], size: "tag" }) })
  ] });
}
function dC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(rN, { ...e }) : /* @__PURE__ */ t(Zy, { ...e });
}
const lN = "_label_1o9za_7", oN = "_name_1o9za_15", iN = "_column_1o9za_24", sN = "_webFrame_1o9za_57", cN = "_webHead_1o9za_62", dN = "_webHeadLabel_1o9za_74", uN = "_webLabel_1o9za_112", hN = "_webColumns_1o9za_119", mN = "_webGroup_1o9za_125", wN = "_webPeople_1o9za_126", _N = "_webVia_1o9za_127", fN = "_webMeta_1o9za_156", j = {
  label: lN,
  name: oN,
  column: iN,
  webFrame: sN,
  webHead: cN,
  webHeadLabel: dN,
  webLabel: uN,
  webColumns: hN,
  webGroup: mN,
  webPeople: wN,
  webVia: _N,
  webMeta: fN
}, vN = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, qa = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Pa({ column: e, children: a }) {
  return /* @__PURE__ */ t(
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
function bN(e) {
  if (!e.matrixRole) return;
  const a = vN[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function gN({ node: e }) {
  const a = bN(e);
  return /* @__PURE__ */ o("span", { className: j.label, children: [
    /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
    /* @__PURE__ */ t(pN, { role: a, node: e }),
    /* @__PURE__ */ t(Pa, { column: qa[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Pa, { column: qa[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ t(Pa, { column: qa[2], children: e.requestedVia ?? "" })
  ] });
}
function pN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ t(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ t(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function yN({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    Xt,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(gN, { node: n }),
      children: s
    }
  );
}
function Ba({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function NN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${j.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ba, { className: `${j.webMeta} ${j.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ba, { className: `${j.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ba, { className: `${j.webMeta} ${j.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function kN() {
  return /* @__PURE__ */ o("div", { className: j.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: j.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: j.webColumns, children: [
      /* @__PURE__ */ t("span", { className: j.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: j.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: j.webVia, children: "Requested via" })
    ] })
  ] });
}
function $N({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${j.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function CN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function SN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: j.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(kN, {}),
    /* @__PURE__ */ t(cd, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      Xt,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t($N, { row: n }),
        detail: /* @__PURE__ */ t(NN, { row: n }),
        expanded: CN(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function uC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(SN, { ...e }) : /* @__PURE__ */ t(yN, { ...e });
}
const RN = "_runbook_b9agc_2", TN = "_list_b9agc_7", EN = "_step_b9agc_15", LN = "_numeral_b9agc_21", xN = "_body_b9agc_28", AN = "_head_b9agc_34", IN = "_title_b9agc_40", MN = "_detail_b9agc_45", qN = "_actions_b9agc_50", PN = "_webList_b9agc_56", BN = "_webStep_b9agc_60", ON = "_webBody_b9agc_66", DN = "_webTitle_b9agc_74", HN = "_webDetail_b9agc_78", E = {
  runbook: RN,
  list: TN,
  step: EN,
  numeral: LN,
  body: xN,
  head: AN,
  title: IN,
  detail: MN,
  actions: qN,
  webList: PN,
  webStep: BN,
  webBody: ON,
  webTitle: DN,
  webDetail: HN
}, In = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function Mn(e) {
  return String(e + 1).padStart(2, "0");
}
function FN({ step: e, index: a, connection: n }) {
  const r = In[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: E.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: E.numeral, children: Mn(a) }),
    /* @__PURE__ */ o("span", { className: E.body, children: [
      /* @__PURE__ */ o("span", { className: E.head, children: [
        /* @__PURE__ */ t("span", { className: E.title, children: e.title }),
        /* @__PURE__ */ t(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ t("span", { className: E.detail, children: e.detail })
    ] })
  ] });
}
function jN({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: E.runbook, children: [
    /* @__PURE__ */ t("ol", { className: E.list, children: e.map((r, l) => /* @__PURE__ */ t(FN, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: E.actions, children: a })
  ] });
}
function WN({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${E.step} ${E.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${E.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Mn(a) }),
    /* @__PURE__ */ o("span", { className: `${E.body} ${E.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${E.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${E.title} ${E.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(m, { ...In[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${E.detail} ${E.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function zN({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: E.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${E.list} ${E.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(WN, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${E.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function hC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(zN, { ...e }) : /* @__PURE__ */ t(jN, { ...e });
}
const GN = "_list_1gu6a_2", KN = "_check_1gu6a_10", UN = "_body_1gu6a_16", VN = "_text_1gu6a_23", YN = "_pending_1gu6a_32", XN = "_measured_1gu6a_37", Ve = {
  list: GN,
  check: KN,
  body: UN,
  text: VN,
  pending: YN,
  measured: XN
};
function JN(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function QN({ check: e }) {
  const a = JN(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Ve.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(Ja, { state: a.state, label: a.label }),
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
function mC({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Ve.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(QN, { check: a }, a.text)) });
}
const ZN = "_root_a6xzy_2", e1 = "_list_a6xzy_10", a1 = "_line_a6xzy_21", t1 = "_at_a6xzy_48", n1 = "_text_a6xzy_52", r1 = "_foot_a6xzy_56", l1 = "_idle_a6xzy_68", o1 = "_caret_a6xzy_76", i1 = "_jump_a6xzy_83", me = {
  root: ZN,
  list: e1,
  line: a1,
  at: t1,
  text: n1,
  foot: r1,
  idle: l1,
  caret: o1,
  jump: i1
}, s1 = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function lt(e) {
  return Number.isNaN(Date.parse(e)) ? "" : s1.format(new Date(e));
}
const c1 = { warn: "warning", ok: "ok" };
function d1({ kind: e }) {
  const a = c1[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function u1({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${lt(e)}` });
}
function h1({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${lt(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: me.idle, children: i }),
    /* @__PURE__ */ t(u1, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const m1 = 8;
function w1(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > m1;
}
function _1({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const qn = je(null);
function wC({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = At(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(qn.Provider, { value: i, children: n });
}
function f1() {
  const e = Fe(qn), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function _C({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = f(null), [i, s] = p(0), [c, u] = f1(), [d, h] = p(!1), v = e.at(-1);
  R(() => {
    s(e.length);
  }, [e.length]), Ga(() => {
    const y = l.current;
    y && !d && (y.scrollTop = y.scrollHeight);
  }, [e.length, d]);
  const b = () => {
    var q;
    const y = l.current;
    if (!y) return;
    const x = y.querySelectorAll("[data-consline-text]");
    (q = x.item(x.length - 1)) == null || q.focus(), h(!1);
  };
  return /* @__PURE__ */ o("div", { className: me.root, children: [
    /* @__PURE__ */ t("ol", { className: me.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => h(w1(y.currentTarget)), children: e.map((y, x) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": x < i, children: [
      /* @__PURE__ */ t("span", { className: me.at, children: lt(y.at) }),
      /* @__PURE__ */ t(d1, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${x}`)) }),
    /* @__PURE__ */ o(h1, { connection: a, idleSince: n, last: v, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": c, onClick: () => u(!c), children: "Read new events" }),
      /* @__PURE__ */ t(_1, { shown: d, onJump: b })
    ] })
  ] });
}
const v1 = "_row_11jhe_2", b1 = "_head_11jhe_14", g1 = "_author_11jhe_20", p1 = "_eta_11jhe_25", y1 = "_edited_11jhe_26", N1 = "_body_11jhe_32", k1 = "_reason_11jhe_37", $1 = "_actions_11jhe_42", pe = {
  row: v1,
  head: b1,
  author: g1,
  eta: p1,
  edited: y1,
  body: N1,
  reason: k1,
  actions: $1
}, C1 = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function S1(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function R1({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function T1({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: pe.reason, id: a, children: e })
  ] });
}
function E1(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function L1(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(R1, { ...e }) : /* @__PURE__ */ t(T1, { reason: e.unavailable, reasonId: e.unavailableId });
}
function fC(e) {
  const { comment: a } = e;
  E1(e);
  const n = k(), r = `${n}-unavailable`, l = C1[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${pe.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ t("span", { className: pe.author, children: a.author }),
      /* @__PURE__ */ t(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: pe.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: pe.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: pe.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: pe.reason, id: n, children: S1(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: pe.actions, children: /* @__PURE__ */ t(L1, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const x1 = "_root_c46wj_2", A1 = "_attach_c46wj_11", I1 = "_actions_c46wj_17", M1 = "_reply_c46wj_23", q1 = "_replyRow_c46wj_28", P1 = "_sendsAs_c46wj_42", Xe = {
  root: x1,
  attach: A1,
  actions: I1,
  reply: M1,
  replyRow: q1,
  sendsAs: P1
};
function B1({ placeholder: e, asUser: a, onPost: n }) {
  const [r, l] = p(""), i = k();
  return /* @__PURE__ */ o("div", { className: Xe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Xe.replyRow, children: [
      /* @__PURE__ */ t(I, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ t(_, { variant: "ghost", describedBy: i, onClick: () => n(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ t("p", { id: i, className: Xe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function vC(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(B1, { ...e }) : /* @__PURE__ */ t(O1, { ...e });
}
function O1({ placeholder: e, asUser: a, attachTo: n, requeueAfter: r, onPost: l, onDraft: i }) {
  const [s, c] = p("");
  return /* @__PURE__ */ o("div", { className: Xe.root, children: [
    /* @__PURE__ */ t(I, { kind: "textarea", label: e, value: s, onChange: c }),
    n && /* @__PURE__ */ o("div", { className: Xe.attach, children: [
      /* @__PURE__ */ t(m, { role: "soft", label: n.label }),
      /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ t(
      Ot,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Xe.actions, children: [
      /* @__PURE__ */ t(_, { variant: "primary", onClick: () => l(a, s), children: `Post as ${a}` }),
      i && /* @__PURE__ */ t(_, { variant: "ghost", onClick: () => i(s), children: "Save draft" })
    ] })
  ] });
}
const D1 = "_list_1ih9e_2", H1 = "_item_1ih9e_6", F1 = "_body_1ih9e_22", j1 = "_text_1ih9e_28", W1 = "_evidence_1ih9e_37", z1 = "_consequence_1ih9e_49", G1 = "_note_1ih9e_54", Oe = {
  list: D1,
  item: H1,
  body: F1,
  text: j1,
  evidence: W1,
  consequence: z1,
  note: G1
};
function K1({ criterion: e }) {
  return /* @__PURE__ */ t(xe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Tt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function U1(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function V1({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Oe.body, children: [
    /* @__PURE__ */ t("span", { className: Oe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ t(Tt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: Oe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ t(Tt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: Oe.consequence, children: U1(e.why) })
    ] })
  ] });
}
function Y1({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Oe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(K1, { criterion: e }),
    /* @__PURE__ */ t(V1, { criterion: e })
  ] });
}
function bC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${Oe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(Y1, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: Oe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const X1 = "_list_dwhoz_2", J1 = "_rung_dwhoz_6", Q1 = "_name_dwhoz_18", Z1 = "_actor_dwhoz_32", ua = {
  list: X1,
  rung: J1,
  name: Q1,
  actor: Z1
}, ek = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function ak({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = ek[e.state];
  return /* @__PURE__ */ o("li", { className: ua.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ua.name, children: e.name }),
    /* @__PURE__ */ t(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ua.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function gC({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ua.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(ak, { rung: a }, a.name)) });
}
const tk = "_sheet_1fqco_2", nk = "_title_1fqco_9", rk = "_stage_1fqco_15", lk = "_effects_1fqco_20", ok = "_effect_1fqco_20", ik = "_numeral_1fqco_31", sk = "_effectText_1fqco_38", ck = "_refusals_1fqco_43", dk = "_reasons_1fqco_52", uk = "_reason_1fqco_52", hk = "_actions_1fqco_62", ue = {
  sheet: tk,
  title: nk,
  stage: rk,
  effects: lk,
  effect: ok,
  numeral: ik,
  effectText: sk,
  refusals: ck,
  reasons: dk,
  reason: uk,
  actions: hk
};
function mk({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function pC({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = k(), u = `${c}-refusal`, [d, h] = p(""), v = n.length > 0;
  return /* @__PURE__ */ t(ra, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: ue.effects, children: a.map((b, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ t("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: ue.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ t(
      Us,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ t(I, { kind: "textarea", label: "Note for the agent", value: d, onChange: h }),
    v && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ t(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ t("ul", { className: ue.reasons, children: n.map((b, y) => /* @__PURE__ */ t("li", { className: ue.reason, id: y === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ t(mk, { refused: v, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ t(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const wk = "_list_1hvqu_2", _k = "_path_1hvqu_7", fk = "_head_1hvqu_21", vk = "_label_1hvqu_28", bk = "_consequence_1hvqu_35", gk = "_ask_1hvqu_36", Ye = {
  list: wk,
  path: _k,
  head: fk,
  label: vk,
  consequence: bk,
  ask: gk
}, Wa = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Et(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Lt(e) {
  return e ? "primary" : "secondary";
}
function pk({ path: e, primary: a, onChoose: n }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ t(_, { variant: Lt(a), size: "sm", onClick: () => n(e.kind), children: Wa[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: Lt(a), size: "sm", disabled: !0, describedBy: r, children: Wa[e.kind] }),
    /* @__PURE__ */ t("span", { className: Ye.ask, id: r, children: e.askInstead })
  ] });
}
function yk({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ye.path, "data-allowed": e.allowed, "data-role": Et(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ye.head, children: [
      /* @__PURE__ */ t("span", { className: Ye.label, children: e.title ?? Wa[e.kind] }),
      /* @__PURE__ */ t(m, { role: Et(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: Ye.consequence, children: e.consequence }),
    /* @__PURE__ */ t(pk, { path: e, primary: a, onChoose: n })
  ] });
}
function yC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: Ye.list, children: e.map((n, r) => /* @__PURE__ */ t(yk, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const Nk = "_list_1nyt1_2", kk = "_item_1nyt1_6", $k = "_node_1nyt1_18", Ck = "_body_1nyt1_24", Sk = "_head_1nyt1_30", Rk = "_stage_1nyt1_36", Tk = "_version_1nyt1_41", Ek = "_sentence_1nyt1_49", Lk = "_meta_1nyt1_54", Ne = {
  list: Nk,
  item: kk,
  node: $k,
  body: Ck,
  head: Sk,
  stage: Rk,
  version: Tk,
  sentence: Ek,
  meta: Lk
}, xk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Ak({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ t("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function Ik({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ t(xe, { size: 9, kind: xk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(Ak, { entry: e }),
      /* @__PURE__ */ t("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function NC({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Ne.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(Ik, { entry: a }, a.stage + String(n))) });
}
const Mk = "_thread_1kn6s_3", qk = "_turn_1kn6s_8", Pk = "_who_1kn6s_27", Bk = "_body_1kn6s_32", ha = {
  thread: Mk,
  turn: qk,
  who: Pk,
  body: Bk
}, Pn = je(!1);
function kC({ children: e, density: a }) {
  return /* @__PURE__ */ t(Pn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ha.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function $C({ turn: e }) {
  if (!Fe(Pn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ha.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ha.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ha.body} ward-chat-body`, children: e.body })
  ] });
}
const Ok = "_list_1rt9c_3", Dk = "_row_1rt9c_7", Hk = "_label_1rt9c_20", Fk = "_n_1rt9c_26", jk = "_cause_1rt9c_33", Ze = {
  list: Ok,
  row: Dk,
  label: Hk,
  n: Fk,
  cause: jk
};
function Wk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const zk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Gk({ row: e, formatNumber: a }) {
  return Wk(e), /* @__PURE__ */ o("li", { className: `${Ze.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(xe, { size: 8, ...zk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: Ze.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${Ze.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(Kk, { cause: e.cause })
  ] });
}
function Kk({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Ze.cause} ward-healthrow-cause`, children: e }) : null;
}
function CC({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ t("ul", { className: `${Ze.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(Gk, { row: n, formatNumber: a }, n.label)) });
}
const Uk = "_root_1jxwp_2", Vk = {
  root: Uk
};
function SC({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: Vk.root, "data-density": l, children: [
    /* @__PURE__ */ t(La, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const Yk = "_row_dhbre_3", Xk = "_key_dhbre_13", Jk = "_stack_dhbre_24", Qk = "_value_dhbre_32", Zk = "_evidence_dhbre_39", e$ = "_mark_dhbre_47", Ue = {
  row: Yk,
  key: Xk,
  stack: Jk,
  value: Qk,
  evidence: Zk,
  mark: e$
};
function a$({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ t(Ja, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function RC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ue.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Ue.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ue.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Ue.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Ue.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Ue.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(a$, { state: e.state }) })
  ] });
}
const t$ = "_cell_1monp_2", n$ = {
  cell: t$
}, r$ = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function l$(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function o$(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function i$(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: l$(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function s$(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function TC({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  o$(e, n);
  const r = s$(e);
  return /* @__PURE__ */ t(
    ic,
    {
      label: "Rejection routing",
      columns: r$,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: n$.cell, "data-norerun": l.noRerun ? !0 : void 0, children: i$(l, i) }),
      empty: a ?? /* @__PURE__ */ t(Vd, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const c$ = "_row_iqmbr_2", d$ = "_title_iqmbr_11", u$ = "_turns_iqmbr_20", h$ = "_waiting_iqmbr_21", m$ = "_resolved_iqmbr_22", w$ = "_activity_iqmbr_23", _$ = "_cost_iqmbr_29", f$ = "_link_iqmbr_30", v$ = "_tableLink_iqmbr_48", b$ = "_tableRecord_iqmbr_49", g$ = "_tableRow_iqmbr_60", p$ = "_tableTitle_iqmbr_72", y$ = "_tableResolved_iqmbr_77", N$ = "_tableMeta_iqmbr_92", k$ = "_tableCost_iqmbr_99", $$ = "_tableActivity_iqmbr_100", C$ = "_tableState_iqmbr_110", D = {
  row: c$,
  title: d$,
  turns: u$,
  waiting: h$,
  resolved: m$,
  activity: w$,
  cost: _$,
  link: f$,
  tableLink: v$,
  tableRecord: b$,
  tableRow: g$,
  tableTitle: p$,
  tableResolved: y$,
  tableMeta: N$,
  tableCost: k$,
  tableActivity: $$,
  tableState: C$
}, Bn = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function S$(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function R$(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function T$(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const E$ = { duplicate: "CLOSED · DUPLICATE" };
function L$({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: D.tableMeta, children: `waiting on ${e}` });
}
function x$({ value: e }) {
  return /* @__PURE__ */ t("td", { className: D.tableCost, children: e === void 0 ? null : re(e) });
}
function A$({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${D.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function I$({ session: e, href: a }) {
  const n = Bn[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${D.tableLink} ward-target`, href: W(a), children: e.title }),
      /* @__PURE__ */ t("span", { className: D.tableMeta, children: R$(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      T$(e.resolved),
      /* @__PURE__ */ t(L$, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(x$, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: D.tableActivity, children: S$(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(m, { role: n.role, label: E$[e.state] ?? n.label }),
      /* @__PURE__ */ t(A$, { link: e.link })
    ] }) })
  ] });
}
function M$({ session: e }) {
  const a = Bn[e.state];
  return /* @__PURE__ */ o("div", { className: D.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t("span", { className: D.title, children: e.title }),
    /* @__PURE__ */ t("span", { className: D.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t("span", { className: D.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: D.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: D.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ t("span", { className: D.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: D.link, href: W(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function EC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(I$, { session: e.session, href: e.href }) : /* @__PURE__ */ t(M$, { session: e.session });
}
const q$ = "_block_1yy2v_3", P$ = "_list_1yy2v_9", B$ = "_line_1yy2v_14", za = {
  block: q$,
  list: P$,
  line: B$
}, O$ = { warn: "warning", ok: "ok" };
function D$({ kind: e }) {
  const a = O$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function H$({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${za.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(D$, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function LC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${za.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: za.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(H$, { line: n }, `${r}-${n.text}`)) }) });
}
const F$ = "_band_tt7hp_1", j$ = "_head_tt7hp_8", W$ = "_cell_tt7hp_19", z$ = "_index_tt7hp_35", G$ = "_title_tt7hp_42", K$ = "_note_tt7hp_48", U$ = "_cellTitle_tt7hp_53", V$ = "_cellBody_tt7hp_58", Y$ = "_tag_tt7hp_64", ge = {
  band: F$,
  head: j$,
  cell: W$,
  index: z$,
  title: G$,
  note: K$,
  cellTitle: U$,
  cellBody: V$,
  tag: Y$
}, xt = 4;
function xC({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== xt)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${xt}-cell grid`);
  return /* @__PURE__ */ o("section", { className: ge.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: ge.head, children: [
      /* @__PURE__ */ t("span", { className: ge.index, children: e }),
      /* @__PURE__ */ t("span", { className: ge.title, children: a }),
      /* @__PURE__ */ t("span", { className: ge.note, children: n })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: ge.cell, children: [
      /* @__PURE__ */ t("span", { className: ge.cellTitle, children: l.title }),
      /* @__PURE__ */ t("span", { className: ge.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ t("span", { className: ge.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  v0 as ActionStack,
  _C as ActivityConsole,
  sw as AgentCard,
  s0 as AppShell,
  Z0 as AppearanceStrip,
  xC as Band,
  w0 as BarChart,
  Eu as BoardColumn,
  A0 as BoardFootnote,
  I0 as BoardHeader,
  $0 as BoardScroller,
  _ as Btn,
  r0 as CHIP_ROLES,
  kn as CREDENTIAL_COLUMNS,
  m0 as Callout,
  eC as CapabilityRow,
  $C as ChatMessage,
  Ot as Checkbox,
  m as Chip,
  fC as ClarificationRow,
  W0 as ClauseRuleRow,
  j0 as ClauseRules,
  tn as ColourLadder,
  aC as ComponentRow,
  vC as Composer,
  q0 as ConfigRow,
  M0 as ConfigRowHead,
  Qa as ConnectionMark,
  wC as ConsoleAnnounceProvider,
  kC as Conversation,
  Us as CostMeter,
  nC as CredentialRow,
  tC as CredentialRowHead,
  bC as CriteriaList,
  Il as Crumb,
  CC as DeliveryHealth,
  R0 as DeniedState,
  G0 as DryRunRail,
  Vd as EmptyState,
  rC as EnvCard,
  I as Field,
  S0 as FilteredEmpty,
  N0 as FormStack,
  La as GateChecklist,
  gC as GateLadder,
  ic as Grid,
  U0 as HandoffRuleRow,
  K0 as HandoffRules,
  P0 as ItemDrawer,
  lC as KeyPanel,
  ar as LIVE_EVENT_TYPES,
  Lm as LegacyBoardColumn,
  O0 as LegacyBoardHeader,
  D0 as LegacyConfigRow,
  F0 as LegacyItemDrawer,
  km as LegacyOverCapNote,
  H0 as LegacyPreviewRail,
  Zt as LegacyWorkCard,
  Ce as LiveIndicator,
  T0 as LoadFailed,
  x0 as Loading,
  En as MCP_SERVER_COLUMNS,
  Ja as Mark,
  iC as MarkUpload,
  xe as Marker,
  cC as McpServerRow,
  sC as McpServerRowHead,
  V0 as NewStreamModal,
  Jd as OverCapNote,
  ra as Overlay,
  z0 as PARTIAL_STEP_REASON,
  Ln as POLICY_CHIP_WIDTH,
  g0 as PageFrame,
  h0 as PageHeader,
  _0 as PlainList,
  dC as PolicyRow,
  B0 as PreviewRail,
  qa as ROLE_MATRIX_COLUMNS,
  _n as RULE_ACTIONS,
  Ut as Radio,
  SC as ReadyChecklist,
  y0 as RecordSection,
  pC as RequeueSheet,
  yC as ResolveBlock,
  RC as ResolvedFieldRow,
  uC as RoleMatrixRow,
  TC as RoutingTable,
  Y0 as RuleRow,
  hC as RunbookSteps,
  er as STREAM_STEPS,
  k0 as SectionBand,
  ft as SectionHeader,
  Gt as SegmentedControl,
  jt as Select,
  EC as SessionRow,
  u0 as Sidebar,
  X0 as StageColumn,
  C0 as StageGrid,
  NC as StageHistory,
  zf as StageListEditor,
  E0 as StaleStrip,
  Ra as StatStrip,
  J0 as StreamRow,
  p0 as SubjectRail,
  He as Switch,
  d0 as TabLinks,
  f0 as TableHead,
  c0 as Tabs,
  Q0 as ToolRow,
  b0 as TopBar,
  cd as Tree,
  Xt as TreeRow,
  LC as TypedInputBlock,
  Jr as UNSAFE_HREF,
  mC as ValidationList,
  Z$ as VisibilityProvider,
  e0 as Visible,
  n0 as WARD_VERSION,
  Ea as WorkCard,
  L0 as WriteUnavailableStrip,
  S$ as agoSince,
  Kn as clock,
  iv as colourStatus,
  ae as count,
  ce as duration,
  Ka as elapsed,
  t0 as eventSourceTransport,
  ka as isStreamStep,
  $a as isValidatedStreamStep,
  Ow as ladderValidation,
  Ly as mcpConnectionChip,
  Ty as mcpToolName,
  re as money,
  we as ms,
  Jt as ordered,
  It as ratio,
  Xg as restartLabel,
  W as safeHref,
  de as stamp,
  Pt as stream,
  o0 as streamChip,
  Sa as streamChipProps,
  ve as streamColour,
  nr as streamHex,
  l0 as streamVars,
  ca as useBorderFlash,
  Jn as useFocusTrap,
  i0 as useLiveFeed,
  a0 as useReturnFocus,
  Na as useRovingTabindex,
  Ua as useTicker,
  Un as useVisible,
  G as v,
  oC as validateMark,
  na as validatedStep,
  qt as validatedStreamSteps
};
