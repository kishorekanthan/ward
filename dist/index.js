import { jsx as t, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as Bt, useContext as je, createContext as We, useCallback as J, useEffect as R, useState as g, useRef as f, useLayoutEffect as Ga, useId as k, isValidElement as zn, Children as Kn, Fragment as Gn } from "react";
import { flushSync as Un, createPortal as Vn } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${a % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const ct = (e) => String(e).padStart(2, "0");
function Ua(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const n = Math.floor(a / 60);
  return n < 60 ? `${n}m ${ct(a % 60)}s` : `${Math.floor(n / 60)}h ${ct(n % 60)}m`;
}
const Xn = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = Xn.formatToParts(new Date(e)), n = (r) => {
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
function Pt(e, a) {
  return `${e} / ${a}`;
}
const Yn = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Jn(e) {
  return Yn.format(new Date(e));
}
const Ht = We(/* @__PURE__ */ new Set());
function i0({ hidden: e, children: a }) {
  const n = Bt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Ht.Provider, { value: n, children: a });
}
function Qn(e) {
  return !je(Ht).has(e);
}
function c0({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(S, { children: Qn(e) ? a : n });
}
const Zn = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function er(e, a, n, r) {
  return e.shiftKey ? document.activeElement === n ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? n : void 0;
}
function ar(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = er(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function tr(e) {
  return { onKeyDown: J(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Zn));
      ar(n, e.current, r);
    },
    [e]
  ) };
}
function s0(e, a = !0) {
  R(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const st = { ArrowUp: -1, ArrowDown: 1 }, dt = { ArrowLeft: -1, ArrowRight: 1 }, nr = (e, a, n) => Math.min(n, Math.max(a, e));
function rr(e, a) {
  if (a !== "horizontal" && e in st) return st[e];
  if (a !== "vertical" && e in dt) return dt[e];
}
function ka({ orientation: e = "both" } = {}) {
  const [a, n] = g(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  Ga(() => {
    var b;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const h = d[0], v = l.current;
    l.current = !1, n(h), v && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = J((d) => n(d), []), c = J((d) => {
    var h;
    n(d), (h = r.current.get(d)) == null || h.focus();
  }, []), s = J(
    (d) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const v = Math.max(0, h.indexOf(a)), b = rr(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[nr(v + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
    },
    [a, c, e]
  ), u = J(
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
  return { containerProps: { onKeyDown: s }, itemProps: u, setActive: i };
}
const d0 = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, u0 = "0.2.0", h0 = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], lr = [1, 2, 3, 4, 5, 6], Ft = [1, 2, 3], or = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], K = {
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
function Dt(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function $a(e) {
  return lr.includes(e);
}
function Ca(e) {
  return Ft.includes(e);
}
function m0(e) {
  if (!$a(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function w0(e) {
  if (!$a(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const ir = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function cr(e) {
  if (!$a(e)) throw new Error("unvalidated stream step");
  return ir[e];
}
function ut(e) {
  return typeof e != "string" ? null : or.includes(e) ? e : null;
}
function sr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function dr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function ur(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function hr(e, a, n) {
  const r = sr(e);
  if (r === null) return null;
  const l = ut(n) ?? ut(r.type);
  return l === null ? null : { ...r, type: l, id: dr(r, a), at: ur(r) };
}
function mr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function wr(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function _0(e, a) {
  const [n, r] = g("reconnecting"), [l, i] = g(null), c = f(/* @__PURE__ */ new Map()), s = f(0), u = f(""), d = f(0), h = f(null), v = f(0), b = f(0), y = f(!1), A = f("reconnecting"), q = J((C) => {
    A.current = C, r(C);
  }, []), oe = J(() => {
    s.current = Date.now();
  }, []), Se = J((C) => {
    for (const [z, be] of c.current)
      (be === "*" || C.itemKey === be) && z(C);
  }, []), te = J(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: (C, z, be) => {
        const Ie = hr(C, z, be);
        Ie !== null && (Ie.id && (u.current = Ie.id), oe(), y.current = !1, q("live"), i(Ie.at), Se(Ie));
      },
      onOpen: () => {
        d.current = 0, y.current = !1, oe(), q("live");
      },
      onError: () => {
        var z;
        (z = h.current) == null || z.close(), h.current = null, y.current = !0, A.current !== "stale" && q("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** d.current, we.reconnectMax);
        d.current += 1, v.current = window.setTimeout(te, C);
      }
    });
  }, [Se, q, oe, a, e]), ze = J((C) => {
    y.current = !0, C.close(), h.current = null, v.current = window.setTimeout(te, we.reconnectBase);
  }, [te]), Ke = J((C, z) => (c.current.set(z, C), () => {
    c.current.delete(z);
  }), []);
  return R(() => (te(), b.current = window.setInterval(() => {
    const C = Date.now() - s.current, z = mr(C, A.current);
    z && q(z);
    const be = h.current;
    wr(C, y.current, be) && ze(be);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(v.current), y.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [te, ze, q]), { connection: n, lastEventAt: l, subscribe: Ke };
}
function Va(e, a) {
  const n = new Date(e).getTime(), [r, l] = g(() => Date.now());
  return R(() => {
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
function _r() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ht(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function da(e, a) {
  const n = f(0), r = J((l) => {
    const i = l ?? a, c = e.current;
    c !== null && i !== void 0 && (_r() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => ht(c), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => ht(c), we.flash)));
  }, [a, e]);
  return R(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const fr = "_root_1otpc_2", vr = {
  root: fr
};
function br(e, a, n, r, l) {
  const i = [Ua(a)];
  return e || i.push(`as of ${Jn(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Ce({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = Va(e, l), c = (a == null ? void 0 : a.at) ?? e, s = br(l, i, c, r, a);
  return /* @__PURE__ */ o("span", { className: `${vr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const pr = "_app_k9nx2_1", gr = "_side_k9nx2_18", yr = "_main_k9nx2_26", Nr = "_rail_k9nx2_33", kr = "_page_k9nx2_40", $r = "_root_k9nx2_91", Cr = "_topbar_k9nx2_98", Sr = "_mark_k9nx2_109", Rr = "_brand_k9nx2_116", Tr = "_tagline_k9nx2_122", xr = "_identity_k9nx2_128", Lr = "_tools_k9nx2_129", Ar = "_nav_k9nx2_139", Er = "_metadata_k9nx2_146", Ir = "_actor_k9nx2_161", Mr = "_detail_k9nx2_162", qr = "_content_k9nx2_222", Br = "_toolsPanel_k9nx2_238", Pr = "_skip_k9nx2_264", M = {
  app: pr,
  side: gr,
  main: yr,
  rail: Nr,
  page: kr,
  root: $r,
  topbar: Cr,
  mark: Sr,
  brand: Rr,
  tagline: Tr,
  identity: xr,
  tools: Lr,
  nav: Ar,
  metadata: Er,
  actor: Ir,
  detail: Mr,
  content: qr,
  toolsPanel: Br,
  skip: Pr
}, Hr = "_btn_1e06l_2", Fr = "_primary_1e06l_14", Dr = "_destructive_1e06l_25", Or = "_secondary_1e06l_35", jr = "_ghost_1e06l_40", Wr = "_overflow_1e06l_49", zr = "_sm_1e06l_56", Kr = "_disabled_1e06l_60", oa = {
  btn: Hr,
  primary: Fr,
  destructive: Dr,
  secondary: Or,
  ghost: jr,
  overflow: Wr,
  sm: zr,
  disabled: Kr
};
function Gr(e, a, n, r) {
  const l = a === "sm" ? [oa.sm, "ward-btn--sm"] : [], i = n ? [oa.disabled] : [];
  return [oa.btn, oa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Ur(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Vr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Xr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Yr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Jr(e, a, n) {
  return Yr(e.describedBy, a && n);
}
function Qr({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Zr(e) {
  return e.children ?? e.label;
}
function _(e) {
  Vr(e);
  const a = e.variant ?? "secondary", n = e.size ?? "md", r = e.disabled ?? !1, l = Xr(e), i = k();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Gr(a, n, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": n,
        disabled: r,
        title: l,
        "aria-describedby": Jr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Ur(a, e.controls),
        children: Zr(e)
      }
    ),
    /* @__PURE__ */ t(Qr, { id: i, reason: l })
  ] });
}
const el = /^([a-z][a-z0-9+.-]*):/i, al = /* @__PURE__ */ new Set(["http", "https"]), tl = "#";
function nl(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = el.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = nl(e);
  return a === void 0 || al.has(a) ? e : tl;
}
function rl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Ot(e) {
  const a = rl(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function na(e, a, n) {
  R(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const c = Ot(r);
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
function ll(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function Xa(e, a, n) {
  Ga(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = ll(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Ot(r);
  }, [e, a, n]);
}
function Ya(e) {
  const [a, n] = g(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return R(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (c) => n(c.matches);
    return r.addEventListener("change", l), n(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function ol({ sidebar: e, header: a, children: n, rail: r }) {
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
function il({ destinations: e, active: a }) {
  const n = f(null);
  return na(n, e.length), Xa(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t("nav", { ref: n, className: M.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ t("a", { href: W(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Fa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function cl({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ t(Fa, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Fa, { value: a, className: M.detail })
  ] });
}
function sl() {
  const e = Ya("(max-width: 767.98px)"), a = k(), n = f(null), [r, l] = g(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var c, s;
    l(!1), (s = (c = n.current) == null ? void 0 : c.querySelector("button")) == null || s.focus();
  } };
}
function dl({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: M.tools, children: /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: M.tools, children: e });
}
function ul({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function hl(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ t("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Fa, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ t(il, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: M.identity, children: /* @__PURE__ */ t(cl, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(dl, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function ml(e) {
  const a = k(), n = sl();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(hl, { ...e, menu: n }),
    /* @__PURE__ */ t(ul, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: M.content, children: e.children })
  ] });
}
function wl(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function f0(e) {
  return wl(e) ? /* @__PURE__ */ t(ol, { ...e }) : /* @__PURE__ */ t(ml, { ...e });
}
function Sa(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const _l = "_root_o4yib_2", fl = "_row_o4yib_8", vl = "_box_o4yib_14", bl = "_label_o4yib_21", pl = "_lockedNote_o4yib_26", gl = "_consequence_o4yib_34", yl = "_sample_o4yib_69", Be = {
  root: _l,
  row: fl,
  box: vl,
  label: bl,
  lockedNote: pl,
  consequence: gl,
  sample: yl
};
function Nl(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function kl({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: a }) : null;
}
function $l({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Cl({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function jt(e) {
  const a = k(), n = e.consequence ? `${a}-note` : void 0, r = Nl(e);
  return /* @__PURE__ */ o("div", { className: `${Be.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: Be.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Be.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, l.target.checked));
          },
          "aria-describedby": Sa(n, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: Be.label, children: [
        e.label,
        /* @__PURE__ */ t($l, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(Cl, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(kl, { id: n, text: e.consequence })
  ] });
}
const Sl = "_chip_pq6tb_2", Rl = {
  chip: Sl
}, Tl = {
  gate: K.chip.gate,
  system: K.chip.system,
  write: K.chip.write,
  drift: K.chip.drift,
  done: K.chip.done,
  attention: K.chip.attention,
  failed: K.chip.failed,
  pending: K.chip.pending,
  running: K.chip.running,
  warn: K.chip.warn,
  meta: K.chip.meta,
  soft: K.chip.soft,
  quiet: K.chip.quiet
};
function xl(e, a) {
  if (e === "stream") return Ll(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = Tl[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function Ll(e) {
  if (!e || !Ca(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Dt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${Rl.chip} ward-chip ward-chip--${e}`, style: xl(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const Al = "_clamp_zn74g_3", mt = {
  clamp: Al
};
function Ae({ text: e, as: a = "span", className: n }) {
  return /* @__PURE__ */ t(a, { className: n === void 0 ? mt.clamp : `${mt.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
}
function ra(e) {
  return typeof e == "number" && Ca(e) ? e : null;
}
function ve(e, a) {
  const n = ra(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function Ra(e, a) {
  const n = ra(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const El = "_nav_12vi0_2", Il = "_list_12vi0_8", Ml = "_item_12vi0_15", ql = "_link_12vi0_30", Bl = "_sep_12vi0_40", Pl = "_current_12vi0_44", Hl = "_chips_12vi0_48", Me = {
  nav: El,
  list: Il,
  item: Ml,
  link: ql,
  sep: Bl,
  current: Pl,
  chips: Hl
};
function Fl({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ t("ol", { className: Me.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: Me.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Me.link} ward-target`, href: W(n.href), children: n.label }) : n.label : /* @__PURE__ */ t("span", { className: Me.current, "aria-current": "page", children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Me.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(m, { ...n }, n.label)) }) : null
  ] }) });
}
const Dl = "_root_17xtp_2", Ol = "_trigger_17xtp_7", jl = "_value_17xtp_32", Wl = "_menu_17xtp_49", zl = "_find_17xtp_71", Kl = "_list_17xtp_85", Gl = "_option_17xtp_95", Ul = "_check_17xtp_114", Vl = "_empty_17xtp_125", _e = {
  root: Dl,
  trigger: Ol,
  value: jl,
  menu: Wl,
  find: zl,
  list: Kl,
  option: Gl,
  check: Ul,
  empty: Vl
}, Xl = 7, Yl = 500;
function Jl(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function wt(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Ql(e, a) {
  const [n, r] = g(e.defaultOpen === !0), [l, i] = g(""), [c, s] = g(() => wt(e.options, e.value)), u = (d) => {
    var h;
    Un(() => r(!1)), d && ((h = a.current) == null || h.focus());
  };
  return {
    open: n,
    query: l,
    active: c,
    entries: Jl(e.options, l),
    findable: e.options.length > Xl,
    show: () => {
      e.disabled || (i(""), s(wt(e.options, e.value)), r(!0));
    },
    close: u,
    to: s,
    pick: (d) => {
      var h;
      d && d.option.value !== e.value && ((h = e.onChange) == null || h.call(e, d.option.value)), u(!0);
    },
    find: (d) => {
      i(d), s(0);
    }
  };
}
function Zl(e, a, n) {
  const r = f(n);
  r.current = n, R(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      (c = a.current) != null && c.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, a]);
}
function eo(e, a) {
  const n = f(!1);
  return R(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function ao(e) {
  const a = f(""), n = f(void 0);
  return R(() => () => clearTimeout(n.current), []), (r) => {
    clearTimeout(n.current), a.current += r.toLowerCase(), n.current = setTimeout(() => {
      a.current = "";
    }, Yl);
    const l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(a.current));
    l >= 0 && e.to(l);
  };
}
function to(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Wt(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function no(e) {
  return { ...Wt(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function zt(e, a, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const ro = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function lo(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      ro.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function oo({ entry: e, at: a, menu: n, ids: r, value: l }) {
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
function Ja(e, a) {
  const n = e.entries[e.active];
  return n ? a.option(n.index) : void 0;
}
function io({ menu: e, ids: a, focusRef: n }) {
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
      "aria-activedescendant": Ja(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: zt(e, Wt(e), () => {
      })
    }
  );
}
function co({ props: e, menu: a, ids: n, focusRef: r }) {
  const l = ao(a), i = (c) => {
    to(c) && l(c.key);
  };
  return /* @__PURE__ */ o("div", { className: _e.menu, children: [
    a.findable && /* @__PURE__ */ t(io, { menu: a, ids: n, focusRef: r }),
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
        "aria-activedescendant": a.findable ? void 0 : Ja(a, n),
        onKeyDown: zt(a, no(a), i),
        children: a.entries.map((c, s) => /* @__PURE__ */ t(oo, { entry: c, at: s, menu: a, ids: n, value: e.value }, c.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: _e.empty, children: "No match" })
  ] });
}
function so(e, a) {
  const n = e.open ? Ja(e, a) : void 0;
  R(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function Kt(...e) {
  return e.filter(Boolean).join(" ");
}
function uo(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function ho({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  const i = !e.options.some((c) => c.value === e.value);
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Kt(_e.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? n.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": Sa(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      ...lo(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: _e.value, "data-placeholder": i || void 0, children: uo(e) })
    }
  );
}
function Gt(e) {
  const a = k(), n = { list: `${a}-list`, value: `${a}-value`, option: (u) => `${a}-option-${u}` }, r = f(null), l = f(null), i = f(null), c = Ql(e, l), s = eo(c.open, i);
  return Zl(c.open, r, () => c.close(!1)), so(c, n), /* @__PURE__ */ o("div", { ref: r, className: Kt(_e.root, e.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(ho, { props: e, menu: c, ids: n, trigger: l, wantFocus: s }),
    e.name && /* @__PURE__ */ t("input", { type: "hidden", name: e.name, value: e.value }),
    c.open && /* @__PURE__ */ t(co, { props: e, menu: c, ids: n, focusRef: i })
  ] });
}
const mo = "_field_1yzn8_2", wo = "_label_1yzn8_8", _o = "_labelHidden_1yzn8_15", fo = "_control_1yzn8_25", vo = "_mono_1yzn8_45", bo = "_area_1yzn8_50", po = "_invalid_1yzn8_57", Le = {
  field: mo,
  label: wo,
  labelHidden: _o,
  control: fo,
  mono: vo,
  area: bo,
  invalid: po
}, go = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Ut = (e) => `${e}-label`;
function yo({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? go : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function No({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t(
    Gt,
    {
      id: a.id,
      triggerClassName: n,
      "aria-labelledby": Ut(a.id),
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
function ko({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const $o = { input: yo, select: No, textarea: ko };
function Co(e, a, n) {
  const r = $o[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function So(e, a, n) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Sa(r ? n : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function Ro(e) {
  const a = e.mono ? [Le.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Le.area] : [];
  return [Le.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function To(e) {
  return e ? `${Le.label} ${Le.labelHidden} ward-field-label` : `${Le.label} ward-field-label`;
}
function I(e) {
  const a = k(), n = `${a}-msg`, r = So(e, a, n), l = Ro(e);
  return /* @__PURE__ */ o("div", { className: `${Le.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: Ut(a), className: To(e.labelHidden), htmlFor: a, children: e.label }),
    Co(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Le.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const xo = "_strip_4moyw_2", Lo = "_tab_4moyw_32", Ao = "_count_4moyw_68", aa = {
  strip: xo,
  tab: Lo,
  count: Ao
}, wa = 7;
function Eo(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
function Vt(e) {
  return `${aa.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function v0({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l = 1 }) {
  if (e.length > wa) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${wa} — the set is fixed`);
  const i = ka({ orientation: "horizontal" }), c = Eo(e, a);
  R(() => i.setActive(c), [i.setActive, c]);
  const s = f(null);
  return na(s, e.length), Xa(s, c, '[role="tab"]'), /* @__PURE__ */ t(
    "div",
    {
      ref: s,
      className: Vt(l),
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
          className: `${aa.tab} ward-tab`,
          "aria-selected": u.id === a,
          "aria-controls": `panel-${u.id}`,
          onClick: () => n(u.id),
          ...i.itemProps(d),
          children: [
            u.label,
            u.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
              " ",
              /* @__PURE__ */ t("span", { className: aa.count, children: `· ${u.count}` })
            ] })
          ]
        },
        u.id
      ))
    }
  );
}
function b0({ links: e, active: a, label: n, level: r = 1 }) {
  if (e.length > wa) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${wa} — the set is fixed`);
  const l = f(null);
  return na(l, e.length), Xa(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t("nav", { ref: l, className: Vt(r), "aria-label": n, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${aa.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: aa.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Io = "_root_v56ff_3", Mo = "_segment_v56ff_9", _t = {
  root: Io,
  segment: Mo
};
function Xt({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = ka({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return R(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ t("div", { className: `${_t.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: _t.segment,
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
const qo = "_sidebar_11008_3", Bo = "_brand_11008_9", Po = "_mark_11008_17", Ho = "_word_11008_24", Fo = "_nav_11008_30", Do = "_navItem_11008_39", Oo = "_footLink_11008_49", jo = "_group_11008_58", Wo = "_groupName_11008_65", zo = "_agents_11008_81", Ko = "_agent_11008_81", Go = "_root_11008_96", Uo = "_agentTop_11008_105", Vo = "_dot_11008_112", Xo = "_agentName_11008_124", Yo = "_agentMeta_11008_137", Jo = "_foot_11008_49", Qo = "_footName_11008_149", Zo = "_footLinks_11008_156", ei = "_linkBrand_11008_183", ai = "_label_11008_204", ti = "_note_11008_209", ni = "_footer_11008_218", T = {
  sidebar: qo,
  brand: Bo,
  mark: Po,
  word: Ho,
  nav: Fo,
  navItem: Do,
  new: "_new_11008_48",
  footLink: Oo,
  group: jo,
  groupName: Wo,
  agents: zo,
  agent: Ko,
  root: Go,
  agentTop: Uo,
  dot: Vo,
  agentName: Xo,
  agentMeta: Yo,
  foot: Jo,
  footName: Qo,
  footLinks: Zo,
  linkBrand: ei,
  label: ai,
  note: ti,
  footer: ni
};
function ri({ agent: e }) {
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
              style: { "--dot": Dt(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ t("span", { className: T.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ t("span", { className: T.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function li({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: T.foot, children: [
    /* @__PURE__ */ t("span", { className: T.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: T.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${T.footLink} ward-target`, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function oi({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: T.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: T.brand, children: [
      /* @__PURE__ */ t("span", { className: T.mark }),
      /* @__PURE__ */ t("span", { className: T.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: T.nav, children: a.map((c) => /* @__PURE__ */ t("a", { className: T.navItem, href: W(c.href), "aria-current": c.current === !0 ? "page" : void 0, children: c.label }, c.href)) }),
    /* @__PURE__ */ o("div", { className: T.group, children: [
      /* @__PURE__ */ o("span", { className: T.groupName, children: [
        n,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: T.new, href: W(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: T.agents, children: r.map((c) => /* @__PURE__ */ t(ri, { agent: c }, c.href)) }),
    /* @__PURE__ */ t(li, { shared: i })
  ] });
}
function ii(e) {
  return e.destinations ?? e.items ?? [];
}
function ci({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: T.linkBrand, children: e });
}
function si({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: T.footer, children: e });
}
function di({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: T.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: T.note, children: e.note })
  ] });
}
function ui(e) {
  return /* @__PURE__ */ o("aside", { className: `${T.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(ci, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: ii(e).map((a) => /* @__PURE__ */ t(di, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(si, { children: e.children })
  ] });
}
function hi(e) {
  return "agents" in e;
}
function p0(e) {
  return hi(e) ? /* @__PURE__ */ t(oi, { ...e }) : /* @__PURE__ */ t(ui, { ...e });
}
const mi = "_mark_wlgi8_3", wi = {
  mark: mi
}, _i = { met: "✓", unmet: "", failed: "✕" };
function Qa({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: wi.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: _i[e]
    }
  );
}
const fi = "_marker_br9fi_2", vi = {
  marker: fi
}, bi = {
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
function Ee({ size: e, kind: a, label: n }) {
  const r = { "--marker": bi[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${vi.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const pi = "_root_ti0pq_2", gi = "_chip_ti0pq_11", yi = "_noCase_ti0pq_23", ia = {
  root: pi,
  chip: gi,
  noCase: yi
};
function Ni(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Za({ connection: e, since: a, lastEventAt: n }) {
  const r = Ni(a, n), l = Va(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${ia.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(Ee, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${ia.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: ia.noCase, children: Ua(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${ia.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const ki = "_root_w7yld_2", $i = "_context_w7yld_12", Ci = "_row_w7yld_1", Si = "_heading_w7yld_25", Ri = "_headingWrap_w7yld_33", Ti = "_chips_w7yld_38", xi = "_title_w7yld_45", Li = "_consequence_w7yld_55", Ai = "_actionsWrap_w7yld_62", Ei = "_actions_w7yld_62", Ii = "_action_w7yld_62", Mi = "_overflowPanel_w7yld_91", qi = "_measureClip_w7yld_102", Bi = "_measure_w7yld_102", V = {
  root: ki,
  context: $i,
  row: Ci,
  heading: Si,
  headingWrap: Ri,
  chips: Ti,
  title: xi,
  consequence: Li,
  actionsWrap: Ai,
  actions: Ei,
  action: Ii,
  overflowPanel: Mi,
  measureClip: qi,
  measure: Bi
};
function Pi({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(Ae, { as: "h1", className: V.title, text: e }) : /* @__PURE__ */ t("h1", { className: V.title, children: e });
}
function Hi({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: V.heading, children: [
    /* @__PURE__ */ t(Pi, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: V.consequence, title: n, children: a })
  ] });
}
function Da({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: V.action, "data-action": "", children: a }, n));
}
function ft({ disclosure: e }) {
  return /* @__PURE__ */ t(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Fi({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(ft, { disclosure: l }) : a ? [/* @__PURE__ */ t(ft, { disclosure: l }, "more"), /* @__PURE__ */ t(Da, { actions: e }, "actions")] : /* @__PURE__ */ t(Da, { actions: e });
}
function Di(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Oi({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: V.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Da, { actions: e }) });
}
function ji(e, a) {
  const n = k(), [r, l] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var u, d;
    l(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function Wi({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: V.context, children: [
    /* @__PURE__ */ t(Fl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: V.chips, children: a.map((n) => /* @__PURE__ */ t(m, { ...n }, n.label)) }) : null
  ] });
}
function zi(...e) {
  return e.some((a) => a === null);
}
function Ki(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Gi(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + Ki(e);
}
function Ui(e, a, n, r, l) {
  if (l === 0 || zi(a, n, r)) return !1;
  const [i, c, s] = [a, n, r], u = Math.max(0, e.clientWidth - Gi(e, i));
  return s.offsetWidth > u || c.scrollWidth > c.clientWidth + 1;
}
function Vi(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Xi(e) {
  return zn(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Yi(e, a) {
  return a.length === 0 && e.length === 1 && Xi(e[0]);
}
function Ji(e, a) {
  const n = f(null), r = f(null), l = f(null), i = f(null), [c, s] = g(!1);
  return R(() => {
    const u = n.current;
    if (!Vi(u)) return;
    const d = () => s(Ui(u, r.current, l.current, i.current, e.length)), h = new ResizeObserver(d);
    return h.observe(u), i.current && h.observe(i.current), d(), () => h.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: c && !a };
}
function Qi({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: V.measureClip, children: /* @__PURE__ */ o("div", { className: V.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function Zi({ connection: e }) {
  return e ? /* @__PURE__ */ t(Za, { connection: e.connection, since: e.since }) : null;
}
function g0({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: c = [], connection: s, onOverflow: u, density: d = "page" }) {
  const { rowRef: h, headingRef: v, actionsRef: b, measureRef: y, collapsed: A } = Ji(i, Yi(i, c)), q = c.length > 0, { disclosure: oe, close: Se } = ji(A || q, b), te = Di(c, i, A, u);
  return /* @__PURE__ */ o("header", { className: V.root, "data-density": d, children: [
    /* @__PURE__ */ t(Wi, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: V.row, ref: h, children: [
      /* @__PURE__ */ t("div", { ref: v, className: V.headingWrap, children: /* @__PURE__ */ t(Hi, { title: n, consequence: r, consequenceHint: l, density: d }) }),
      /* @__PURE__ */ o("div", { className: V.actionsWrap, children: [
        /* @__PURE__ */ t(Zi, { connection: s }),
        /* @__PURE__ */ t("div", { className: V.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ t(Fi, { actions: i, hasMore: q, collapsed: A, onOverflow: u, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Oi, { actions: te, disclosure: oe, onEscape: Se }),
    /* @__PURE__ */ t(Qi, { actions: i, hasMore: q, measureRef: y })
  ] });
}
const ec = "_scrim_rn7fr_2", ac = "_drawer_rn7fr_10", tc = "_sheet_rn7fr_14", nc = "_modal_rn7fr_18", rc = "_panel_rn7fr_23", lc = "_header_rn7fr_54", oc = "_title_rn7fr_62", ic = "_body_rn7fr_66", cc = "_close_rn7fr_93", ke = {
  scrim: ec,
  drawer: ac,
  sheet: tc,
  modal: nc,
  panel: rc,
  header: lc,
  title: oc,
  body: ic,
  close: cc
}, sc = We(null), _a = [], fa = /* @__PURE__ */ new Map();
function dc(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function uc(e, a) {
  let n = fa.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, fa.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function hc(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !dc(r) && uc(e, r);
}
function mc(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (hc(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function wc(e) {
  for (const a of e.claims) {
    const n = fa.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), fa.delete(a)));
  }
}
function _c(e, a) {
  const n = { root: e, claims: [] };
  return _a.push(n), mc(n, a), n;
}
function fc(e) {
  const a = _a.indexOf(e);
  a >= 0 && _a.splice(a, 1), wc(e);
}
function vt(e) {
  return e !== null && _a.at(-1) === e;
}
function vc(e, a, n) {
  const r = f(null), l = f(n);
  return l.current = n, R(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = _c(i, a);
    return r.current = s, () => {
      var d, h;
      const u = vt(s);
      fc(s), r.current = null, u && ((h = (d = l.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), J(() => vt(r.current), []);
}
function bc(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function pc(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function gc({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${ke.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("header", { className: `${ke.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${ke.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${ke.body} ward-drawer-body`, children: e.children })
  ] });
}
function yc(e) {
  return `${ke.scrim} ${ke[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Nc(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ke.panel} ${ke[e]} ward-overlay-panel${n}${r}`;
}
function kc(e) {
  const a = je(sc);
  return e ?? a ?? document.body;
}
function la(e) {
  const a = f(null), n = f(null), r = k(), l = kc(e.container), i = Ya("(min-width: 768px)"), c = bc(e.kind, i), s = pc(e, r), u = tr(n), d = vc(a, l, e.returnFocusTo), h = J(() => {
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
  }, [h]), Vn(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: yc(c),
        "data-ward-overlay-kind": c,
        "data-ward-overlay-root": "",
        onClick: h,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: n,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": s.labelledBy,
            "aria-label": s.label,
            className: Nc(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (v) => v.stopPropagation(),
            onKeyDown: (v) => d() && u.onKeyDown(v),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${ke.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(gc, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const $c = "_root_tgu1l_2", Cc = "_ticket_tgu1l_16", Sc = "_body_tgu1l_25", Ea = {
  root: $c,
  ticket: Cc,
  body: Sc
};
function y0({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Ea.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ t("span", { className: `${Ea.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ t("div", { className: Ea.body, children: n })
  ] });
}
const Rc = "_root_bf1pc_2", Tc = "_table_bf1pc_9", xc = "_caption_bf1pc_14", Lc = "_series_bf1pc_23", Ac = "_category_bf1pc_31", Ec = "_cell_bf1pc_39", Ic = "_track_bf1pc_45", Mc = "_lane_bf1pc_52", qc = "_bar_bf1pc_56", Bc = "_value_bf1pc_63", Pc = "_swatch_bf1pc_70", Hc = "_empty_bf1pc_78", X = {
  root: Rc,
  table: Tc,
  caption: xc,
  series: Lc,
  category: Ac,
  cell: Ec,
  track: Ic,
  lane: Mc,
  bar: qc,
  value: Bc,
  swatch: Pc,
  empty: Hc
}, Fc = "—", bt = 6;
function Dc(e, a) {
  if (a.length < 1 || a.length > bt)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${bt}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Oc(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function Yt(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function jc(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Wc({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = jc(e, a), c = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: X.cell, children: /* @__PURE__ */ o("span", { className: X.track, children: [
    /* @__PURE__ */ t("span", { className: X.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${X.bar} ward-barchart-bar`, "data-step": n, style: c, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: X.value, children: e === null ? l : r(e) })
  ] }) });
}
function zc({ series: e }) {
  return /* @__PURE__ */ t(S, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: X.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: X.swatch, "data-step": Yt(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Kc({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${X.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: X.caption, children: e }),
    /* @__PURE__ */ t("p", { className: X.empty, children: a })
  ] });
}
function Gc({ title: e, categories: a, series: n, top: r, format: l = ae, categoryHead: i = "Category", missing: c = Fc }) {
  return /* @__PURE__ */ t("div", { className: `${X.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: X.table, children: [
    /* @__PURE__ */ t("caption", { className: X.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: X.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(zc, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((s, u) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: X.category, children: s }),
      n.map((d, h) => /* @__PURE__ */ t(Wc, { value: d.values[u], top: r, step: Yt(h, n.length), format: l, missing: c }, d.name))
    ] }, s)) })
  ] }) });
}
function N0(e) {
  Dc(e.categories, e.series);
  const a = Oc(e.series);
  return a === 0 ? /* @__PURE__ */ t(Kc, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(Gc, { ...e, top: a });
}
const Uc = "_root_1bfqw_2", Vc = "_figure_1bfqw_7", Xc = "_of_1bfqw_13", Yc = "_bar_1bfqw_18", Jc = "_rows_1bfqw_38", Qc = "_row_1bfqw_38", Zc = "_label_1bfqw_49", es = "_amount_1bfqw_54", Re = {
  root: Uc,
  figure: Vc,
  of: Xc,
  bar: Yc,
  rows: Jc,
  row: Qc,
  label: Zc,
  amount: es
};
function as({ spent: e, ceiling: a, breakdown: n }) {
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
const ts = "_frame_uovfv_2", ns = "_table_uovfv_6", rs = "_th_uovfv_12", ls = "_td_uovfv_13", os = "_sort_uovfv_48", is = "_row_uovfv_60", cs = "_empty_uovfv_68", xe = {
  frame: ts,
  table: ns,
  th: rs,
  td: ls,
  sort: os,
  row: is,
  empty: cs
}, ss = { asc: "ascending", desc: "descending" };
function ds(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ss[a.direction];
}
function us(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: xe.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function hs(e) {
  return e === void 0 ? void 0 : { width: e };
}
function ms({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: xe.th,
      style: hs(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ds(e, a),
      children: us(e, n)
    }
  );
}
function ws({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: xe.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ t("td", { className: xe.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function _s({
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
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: xe.empty, children: d }) : /* @__PURE__ */ t("div", { className: xe.frame, children: /* @__PURE__ */ o("table", { className: xe.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: xe.head, children: a.map((h) => /* @__PURE__ */ t(ms, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((h) => /* @__PURE__ */ t(ws, { row: h, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const fs = "_list_v0s52_2", vs = {
  list: fs
};
function k0({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: vs.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const bs = "_label_1u62a_2", ps = {
  label: bs
};
function $0({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: ps.label, children: a.header }) }, a.key)) }) });
}
const gs = "_stack_bp6a0_2", ys = {
  stack: gs
};
function C0({ children: e }) {
  return /* @__PURE__ */ t("span", { className: ys.stack, "data-ward-action-stack": "", children: e });
}
const Ns = "_set_y5zy3_2", ks = "_legend_y5zy3_7", $s = "_row_y5zy3_15", Cs = "_control_y5zy3_20", Ss = "_input_y5zy3_26", Rs = "_label_y5zy3_31", Ts = "_consequence_y5zy3_36", qe = {
  set: Ns,
  legend: ks,
  row: $s,
  control: Cs,
  input: Ss,
  label: Rs,
  consequence: Ts
};
function Jt({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: c, variant: s }) {
  const u = k(), d = i ?? u;
  return /* @__PURE__ */ o("fieldset", { className: qe.set, "data-variant": s, children: [
    /* @__PURE__ */ t("legend", { className: qe.legend, children: e }),
    a.map((h) => {
      const v = `${d}-${h.value}`, b = h.consequence ? `${v}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: qe.row, children: [
        /* @__PURE__ */ o("span", { className: qe.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: v,
              type: "radio",
              name: d,
              className: qe.input,
              value: h.value,
              checked: n === h.value,
              disabled: l,
              "aria-describedby": Sa(b, c),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: v, className: qe.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ t("p", { id: b, className: `${qe.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const xs = "_root_5to6d_2", Ls = "_head_5to6d_11", As = "_note_5to6d_30", Es = "_index_5to6d_35", Is = "_dot_5to6d_39", Ms = "_counter_5to6d_50", qs = "_trailing_5to6d_58", Pe = {
  root: xs,
  head: Ls,
  note: As,
  index: Es,
  dot: Is,
  counter: Ms,
  trailing: qs
};
function Bs({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("span", { className: `${Pe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Pe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ps({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Pe.counter, "aria-hidden": "true", children: e }) : null;
}
function pt({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Pe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Pe.head, children: [
      /* @__PURE__ */ t(Bs, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: Pe.note, children: n }),
    /* @__PURE__ */ t(Ps, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: Pe.trailing, children: i })
  ] });
}
const Hs = "_strip_1foyq_2", Fs = "_cell_1foyq_7", Ds = "_value_1foyq_12", Os = "_link_1foyq_29", js = "_label_1foyq_47", De = {
  strip: Hs,
  cell: Fs,
  value: Ds,
  link: Os,
  label: js
};
function Ws(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Qt = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function zs({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Qt(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function Ks({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Qt(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${De.link} ward-stat-link`, href: W(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ta({ cells: e, divided: a = !1 }) {
  return Ws(e), /* @__PURE__ */ t("dl", { className: `${De.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(zs, { cell: n }, n.label) : /* @__PURE__ */ t(Ks, { cell: n, href: n.href }, n.label)) });
}
const Gs = "_root_5jkzr_2", Us = "_track_5jkzr_8", Vs = "_thumb_5jkzr_46", Xs = "_labelHidden_5jkzr_64", Ys = "_label_5jkzr_64", Js = "_lockedNote_5jkzr_84", He = {
  root: Gs,
  track: Us,
  thumb: Vs,
  labelHidden: Xs,
  label: Ys,
  lockedNote: Js
};
function Qs(e) {
  return e ? `${He.label} ${He.labelHidden}` : He.label;
}
function Oe({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: c }) {
  const s = k(), u = `${s}switch`, d = l ? !0 : a, h = r || l;
  return /* @__PURE__ */ o("span", { className: `${He.root} ward-switchrow`, children: [
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
        className: `${He.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: h,
        onClick: () => !h && (n == null ? void 0 : n(!d)),
        children: /* @__PURE__ */ t("span", { className: He.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: s, htmlFor: u, className: Qs(c), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: He.lockedNote, children: "always on" })
    ] })
  ] });
}
const Zs = "_bar_1y1tp_2", ed = "_skip_1y1tp_11", ad = "_mark_1y1tp_22", td = "_nav_1y1tp_30", nd = "_list_1y1tp_34", rd = "_select_1y1tp_41", ld = "_selectTrigger_1y1tp_45", od = "_dest_1y1tp_52", id = "_actor_1y1tp_71", cd = "_actorMark_1y1tp_84", sd = "_actorLabel_1y1tp_89", dd = "_tagline_1y1tp_108", ie = {
  bar: Zs,
  skip: ed,
  mark: ad,
  nav: td,
  list: nd,
  select: rd,
  selectTrigger: ld,
  dest: od,
  actor: id,
  actorMark: cd,
  actorLabel: sd,
  tagline: dd
};
function ud(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function hd(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function S0({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: c = "main" }) {
  const s = hd(r);
  return /* @__PURE__ */ o("header", { className: ie.bar, children: [
    /* @__PURE__ */ t("a", { className: `${ie.skip} ward-target`, href: `#${c}`, children: "Skip to content" }),
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
        Gt,
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
    s && /* @__PURE__ */ o("span", { className: ie.actor, children: [
      /* @__PURE__ */ t("span", { className: ie.actorLabel, children: s }),
      /* @__PURE__ */ t("span", { className: ie.actorMark, "aria-hidden": "true", children: ud(s) })
    ] })
  ] });
}
const md = "_tree_1ite1_2", wd = "_item_1ite1_6", _d = "_row_1ite1_10", fd = "_button_1ite1_22", va = {
  tree: md,
  item: wd,
  row: _d,
  button: fd
}, Zt = We(null);
function vd({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = ka({ orientation: "vertical" });
  return /* @__PURE__ */ t(Zt.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: va.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const bd = { ArrowRight: !0, ArrowLeft: !1 };
function gt(e) {
  return e ? !0 : void 0;
}
function pd(e, a) {
  const n = bd[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function gd(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function yd(e) {
  const a = [va.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Nd(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function kd(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function $d(e) {
  return typeof e == "string" ? e : void 0;
}
function Cd({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Sd({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function en(e) {
  const a = je(Zt);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Nd(e);
  return /* @__PURE__ */ o("li", { className: va.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: yd(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": n,
        "data-depth": e.depth,
        "data-unresolved": gt(e.unresolved),
        "data-inherited": gt(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${va.button} ward-treeitem-btn`,
            onClick: () => gd(e),
            onKeyDown: (r) => pd(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: kd(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: $d(e.label), children: e.label }),
              /* @__PURE__ */ t(Cd, { value: e.detail }),
              /* @__PURE__ */ t(Sd, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Rd = "_frame_1fj9j_2", Td = "_subjectRail_1fj9j_22", xd = "_subject_1fj9j_22", Ld = "_rail_1fj9j_42", Ad = "_record_1fj9j_64", Ed = "_recordBody_1fj9j_69", Id = "_stageGrid_1fj9j_118", Md = "_band_1fj9j_144", qd = "_bandBody_1fj9j_153", Bd = "_bandActions_1fj9j_158", Pd = "_scroller_1fj9j_166", Hd = "_board_1fj9j_192", Fd = "_laneCount_1fj9j_200", Dd = "_lanes_1fj9j_210", Y = {
  frame: Rd,
  subjectRail: Td,
  subject: xd,
  rail: Ld,
  record: Ad,
  recordBody: Ed,
  stageGrid: Id,
  band: Md,
  bandBody: qd,
  bandActions: Bd,
  scroller: Pd,
  board: Hd,
  laneCount: Fd,
  lanes: Dd
};
function R0({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function yt(e) {
  return e ? "true" : void 0;
}
function T0({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": n, "data-ruled": yt(i), children: [
    /* @__PURE__ */ t("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Y.rail, "data-sticky": yt(l), "aria-label": r, children: a })
  ] });
}
function x0({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: c, measure: s }) {
  return c === "inline" ? /* @__PURE__ */ t("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(pt, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(pt, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Y.recordBody, "data-pad": l, "data-measure": s, children: a })
  ] });
}
const Od = "_form_1j8ub_2", jd = "_fields_1j8ub_9", Wd = "_actions_1j8ub_19", Ia = {
  form: Od,
  fields: jd,
  actions: Wd
};
function L0({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ia.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Ia.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Ia.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function A0({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Y.bandActions, children: a })
  ] });
}
const zd = "(max-width: 767.98px)";
function et({ label: e, children: a, laneCount: n, onOverflow: r }) {
  const l = f(null);
  na(l, n ?? Kn.count(a), r);
  const i = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function Kd({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(I, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: l }),
    /* @__PURE__ */ t(et, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Gd({ lanes: e, label: a }) {
  const [n, r] = g(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !n, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ t(et, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ t(Gn, { children: l.content }, l.id)) })
  ] });
}
function E0({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ya(zd);
  return n === void 0 ? /* @__PURE__ */ t(et, { label: a, children: e }) : l ? /* @__PURE__ */ t(Kd, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(Gd, { lanes: n, label: a });
}
function I0({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = f(null), i = Math.max(e, 1);
  na(l, i);
  const c = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ t("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": n, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: c, children: a });
}
const Ud = "_block_1o5o7_2", Vd = "_sentence_1o5o7_15", Xd = "_meta_1o5o7_20", Yd = "_action_1o5o7_25", Jd = "_strip_1o5o7_29", Qd = "_loading_1o5o7_48", Zd = "_label_1o5o7_56", eu = "_counter_1o5o7_63", fe = {
  block: Ud,
  sentence: Vd,
  meta: Xd,
  action: Yd,
  strip: Jd,
  loading: Qd,
  label: Zd,
  counter: eu
};
function au({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: fe.action, children: /* @__PURE__ */ t(_, { onClick: e.onClick, children: e.label }) });
}
function xa({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${fe.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: fe.sentence, children: e }),
    n,
    /* @__PURE__ */ t(au, { action: a })
  ] });
}
function tu(e) {
  return /* @__PURE__ */ t(xa, { ...e, kind: "ward-emptystate" });
}
function M0({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(xa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function q0(e) {
  return /* @__PURE__ */ t(xa, { ...e });
}
function B0({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(xa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function P0({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function H0({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function F0({ label: e, startedAt: a }) {
  const n = f(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = g(!1);
  R(() => {
    const c = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Va(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${fe.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: fe.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: fe.counter, children: Ua(i) }) : null
  ] });
}
const nu = "_note_tlubt_2", ru = {
  note: nu
};
function lu({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: ru.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const ou = "_card_13pd2_2", iu = "_hit_13pd2_29", cu = "_head_13pd2_42", su = "_title_13pd2_49", du = "_meta_13pd2_54", uu = "_fields_13pd2_55", hu = "_who_13pd2_68", mu = "_sep_13pd2_72", wu = "_mono_13pd2_76", _u = "_field_13pd2_55", fu = "_last_13pd2_92", vu = "_reason_13pd2_104", Q = {
  card: ou,
  hit: iu,
  head: cu,
  title: su,
  meta: du,
  fields: uu,
  who: hu,
  sep: mu,
  mono: wu,
  field: _u,
  last: fu,
  reason: vu
}, bu = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function pu(e, a, n) {
  const r = da(e, "blue"), l = da(e, "orange"), i = da(e, "green"), c = f(/* @__PURE__ */ new Set());
  R(() => {
    if (!n) return;
    const s = { blue: r, orange: l, green: i };
    return n.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = bu[u.type];
      d && s[d]();
    });
  }, [r, n, i, a, l]);
}
const gu = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function yu(e, a) {
  return gu[a](e);
}
function Nu({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: Q.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: Q.meta, children: [
    /* @__PURE__ */ t(Ae, { className: Q.who, text: `waits on ${e.run.agent}` }),
    n,
    /* @__PURE__ */ t(Ce, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: Q.meta, children: [
    /* @__PURE__ */ t(Ae, { className: Q.who, text: `waits on ${e.waitsOn}` }),
    n,
    /* @__PURE__ */ o("span", { className: Q.mono, children: [
      se(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function ku({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: Q.head, children: [
    e.flagged && /* @__PURE__ */ t(m, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function $u({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: Q.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Cu({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: Q.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: Q.field, children: yu(e, n) }, n)) });
}
const Oa = (e) => e ? !0 : void 0;
function Su(e) {
  return { "--stream": ve(e.streamStep, "id") };
}
function Ru(e, a, n) {
  e == null || e(a, n);
}
function Tu(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function xu({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: Q.last, "data-stale": Oa(a), children: n }) : null;
}
function La(e) {
  const a = e.fields ?? [], n = e.item, r = f(null);
  pu(r, n.key, e.feed);
  const l = Tu(e.feed), i = Su(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: Q.card,
      style: i,
      "data-selected": Oa(e.selected),
      "data-flagged": Oa(n.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: Q.hit, onClick: (c) => Ru(e.onOpen, n.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(ku, { item: n }),
        /* @__PURE__ */ t(Ae, { as: "p", className: Q.title, text: n.title }),
        /* @__PURE__ */ t(Nu, { item: n, connection: l }),
        /* @__PURE__ */ t($u, { reason: n.blockedReason }),
        /* @__PURE__ */ t(Cu, { item: n, fields: a }),
        /* @__PURE__ */ t(xu, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Lu = "_column_10sxg_3", Au = "_head_10sxg_24", Eu = "_label_10sxg_33", Iu = "_count_10sxg_42", Mu = "_list_10sxg_56", Ze = {
  column: Lu,
  head: Au,
  label: Eu,
  count: Iu,
  list: Mu
};
function an(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function qu({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: Ze.head, children: [
    /* @__PURE__ */ t("h2", { className: Ze.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: Ze.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Bu(e) {
  return /* @__PURE__ */ t("div", { className: Ze.list, role: "list", children: e.rows.map((a, n) => {
    var r;
    return /* @__PURE__ */ t(
      La,
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
function Pu({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, v = an(a, r);
  return /* @__PURE__ */ o("section", { className: Ze.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ t(qu, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ t(Bu, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: c, roving: s, rows: v }),
    h && /* @__PURE__ */ t(lu, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Hu = "_foot_1tnhe_2", Fu = "_note_1tnhe_13", Du = "_link_1tnhe_19", Ma = {
  foot: Hu,
  note: Fu,
  link: Du
};
function D0({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ma.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: Ma.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${Ma.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Ou = "_head_m60n1_3", ju = "_identity_m60n1_12", Wu = "_titleRow_m60n1_18", zu = "_title_m60n1_18", Ku = "_key_m60n1_35", Gu = "_rollup_m60n1_45", Uu = "_tools_m60n1_53", Vu = "_swatch_m60n1_65", Xu = "_mark_m60n1_72", ye = {
  head: Ou,
  identity: ju,
  titleRow: Wu,
  title: zu,
  key: Ku,
  rollup: Gu,
  tools: Uu,
  swatch: Vu,
  mark: Xu
}, Nt = "initials:";
function Yu(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Ju(e) {
  const a = [Yu(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function Qu(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Ju(e)
  ] });
}
function Zu(e) {
  return e.startsWith(Nt) ? e.slice(Nt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function eh({ markRef: e, streamStep: a }) {
  const n = { "--stream": ve(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ye.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: Zu(e) }) : /* @__PURE__ */ t("span", { className: ye.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function ah({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(I, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function O0({
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
  return /* @__PURE__ */ o("div", { className: ye.head, children: [
    /* @__PURE__ */ o("div", { className: ye.identity, children: [
      /* @__PURE__ */ o("div", { className: ye.titleRow, children: [
        /* @__PURE__ */ t(eh, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ye.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ye.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ye.rollup, "aria-live": "polite", children: Qu(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ye.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(ah, { owners: l, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ t(_, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ t(Za, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const th = "_head_16yf6_14", nh = "_line_16yf6_15", rh = "_cHandle_16yf6_36", lh = "_cName_16yf6_41", oh = "_nameLine_16yf6_49", ih = "_cLabel_16yf6_56", ch = "_cCap_16yf6_61", sh = "_cShown_16yf6_66", dh = "_name_16yf6_49", uh = "_noCap_16yf6_88", hh = "_state_16yf6_102", mh = "_handle_16yf6_111", wh = "_sub_16yf6_137", P = {
  head: th,
  line: nh,
  cHandle: rh,
  cName: lh,
  nameLine: oh,
  cLabel: ih,
  cCap: ch,
  cShown: sh,
  name: dh,
  noCap: uh,
  state: hh,
  handle: mh,
  sub: wh
}, _h = "can't be hidden or collapsed", fh = "terminal · counted, not a column";
function j0() {
  return /* @__PURE__ */ o("div", { className: P.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: P.cHandle }),
    /* @__PURE__ */ t("span", { className: P.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: P.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: P.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: P.cShown, children: "Shown" })
  ] });
}
function vh(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function bh(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function kt(e) {
  return e.gate ? _h : e.terminal ? fh : bh(e.agentsMounted);
}
function ph(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function gh({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: P.cName, children: [
    /* @__PURE__ */ o("span", { className: P.nameLine, children: [
      /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    kt(e) && /* @__PURE__ */ t("span", { className: P.sub, children: kt(e) })
  ] });
}
function yh(e) {
  return e === void 0 ? "" : String(e);
}
function Nh(e) {
  return e === "" ? void 0 : Number(e);
}
function kh({ name: e, onReorder: a }) {
  return /* @__PURE__ */ t("span", { className: P.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: P.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (n) => ph(n, a),
      children: "⠿"
    }
  ) });
}
function $h({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${P.cCap} ${P.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: P.cCap, children: /* @__PURE__ */ t(I, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: yh(a.cap), onChange: (r) => n({ ...a, cap: Nh(r) }) }) });
}
function Ch({ stage: e, config: a, onChange: n }) {
  const r = vh(e, a.shown), l = e.gate || e.terminal, i = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: P.cShown, children: [
    /* @__PURE__ */ t(Oe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ t("span", { className: P.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function Sh(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function W0({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: P.line, "data-kind": Sh(e), children: [
    /* @__PURE__ */ t(kh, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(gh, { stage: e }),
    /* @__PURE__ */ t("span", { className: P.cLabel, children: /* @__PURE__ */ t(I, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t($h, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(Ch, { stage: e, config: a, onChange: n })
  ] });
}
const Rh = "_body_hn6d6_2", Th = "_head_hn6d6_9", xh = "_summary_hn6d6_19", Lh = "_block_hn6d6_20", Ah = "_actionsBlock_hn6d6_21", Eh = "_title_hn6d6_41", Ih = "_note_hn6d6_46", Mh = "_k_hn6d6_51", qh = "_kv_hn6d6_58", Bh = "_row_hn6d6_64", Ph = "_label_hn6d6_75", Hh = "_value_hn6d6_84", Fh = "_quote_hn6d6_90", Dh = "_actions_hn6d6_21", Oh = "_resolve_hn6d6_103", H = {
  body: Rh,
  head: Th,
  summary: xh,
  block: Lh,
  actionsBlock: Ah,
  title: Eh,
  note: Ih,
  k: Mh,
  kv: qh,
  row: Bh,
  label: Ph,
  value: Hh,
  quote: Fh,
  actions: Dh,
  resolve: Oh
};
function jh(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Wh(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Ce, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function zh(e) {
  const a = ra(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function Kh(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(m, { ...Ra(zh(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...jh(e),
    ...Wh(e, a)
  ];
}
function Gh({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: H.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: H.k, children: a }),
    e
  ] });
}
function Uh({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: H.head, children: [
    /* @__PURE__ */ t(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function Vh({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: H.block, children: [
    /* @__PURE__ */ t("p", { className: H.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: H.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: H.note, children: e.agentMeta })
  ] }) : null;
}
function z0({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = Kh(e, l);
  return /* @__PURE__ */ t(la, { kind: "drawer", labelledBy: u, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: H.body, children: [
    /* @__PURE__ */ t(Uh, { item: e }),
    /* @__PURE__ */ o("div", { className: H.summary, children: [
      /* @__PURE__ */ t("h2", { className: H.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: H.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: H.kv, children: d.map(([h, v]) => /* @__PURE__ */ o("div", { className: H.row, children: [
      /* @__PURE__ */ t("dt", { className: H.label, children: h }),
      /* @__PURE__ */ t("dd", { className: H.value, children: v })
    ] }, h)) }),
    /* @__PURE__ */ t(Vh, { item: e }),
    /* @__PURE__ */ o("div", { className: H.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: H.actions, children: a }),
      s && /* @__PURE__ */ t("p", { className: H.note, children: s })
    ] }),
    /* @__PURE__ */ t(Gh, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Xh = "_root_3azmy_2", Yh = "_list_3azmy_7", Jh = "_item_3azmy_12", Qh = "_box_3azmy_18", Zh = "_text_3azmy_23", em = "_note_3azmy_28", Ge = {
  root: Xh,
  list: Yh,
  item: Jh,
  box: Qh,
  text: Zh,
  note: em
};
function Aa({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ge.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ge.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ge.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ge.box, children: /* @__PURE__ */ t(Qa, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ge.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ge.note} ward-checklist-note`, children: a })
  ] });
}
const am = "_rail_ke7ch_2", tm = "_k_ke7ch_11", nm = "_head_ke7ch_19", rm = "_section_ke7ch_25", lm = "_card_ke7ch_38", om = "_strip_ke7ch_42", im = "_skeleton_ke7ch_56", cm = "_skeletonLabel_ke7ch_70", sm = "_bar_ke7ch_76", dm = "_note_ke7ch_85", he = {
  rail: am,
  k: tm,
  head: nm,
  section: rm,
  card: lm,
  strip: om,
  skeleton: im,
  skeletonLabel: cm,
  bar: sm,
  note: dm
};
function um(e) {
  return (a) => e == null ? void 0 : e(a);
}
function qa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: he.k, children: e }),
    a
  ] });
}
function hm({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function mm({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Pu, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function wm(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(mm, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(hm, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function K0(e) {
  const a = um(e.onOpen), n = an(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(qa, { title: "Card", children: /* @__PURE__ */ t("div", { className: he.card, children: n && /* @__PURE__ */ t(La, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(qa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(wm, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(qa, { title: "Effect of this config", children: /* @__PURE__ */ t(Aa, { items: e.effects, density: "compact" }) })
  ] });
}
function _m(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function fm(e) {
  return Math.ceil(e.length / 2);
}
function vm(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function tn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function bm(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = tn(e);
  l !== void 0 && n(l), r(vm(e.type));
}
function pm(e, a, n, r, l) {
  R(() => {
    if (e !== null)
      return e.subscribe(a, (i) => bm(i, n, r, l));
  }, [e, a, n, r, l]);
}
function gm(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function ym(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Nm(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function km(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + K.height.card + " + " + K.height.cardRow + " * " + String(fm(a ?? [])) + ")"
  };
}
function $m(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Cm(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(m, { role: "meta", label: re(e.cost) }) : null;
}
function Sm(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(m, { role: "meta", label: e.jiraKey }) : null;
}
function Rm(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Tm(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function xm(e, a) {
  return a === void 0 ? e : _m(e, a.ref);
}
function Lm(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ta(e) {
  return e === !0 ? "true" : void 0;
}
function nn(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = f(null), i = da(l), c = f(/* @__PURE__ */ new Set()), [s, u] = g(gm(a));
  pm(e.feed, a.key, c, u, i);
  const d = ym(a, r), h = Nm(a, n), v = km(a, e.fields), b = Tm(a, n, s);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Lm(e),
      className: "ward-workcard",
      "data-flagged": ta(a.flagged),
      "data-selected": ta(e.selected),
      style: v,
      ref: xm(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        $m(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(m, { role: d.role, label: d.label }),
          Cm(a, e.fields),
          Sm(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Rm(n, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Am({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Em(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Im(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Mm(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Am, { count: e.items.length, cap: e.column.cap });
}
function qm(e, a) {
  return e.roving ?? a;
}
function Bm(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Pm(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    nn,
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
function Hm(e) {
  const a = k(), n = ka({ orientation: "vertical" }), r = qm(e, n), l = Em(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ta(l), "data-gate": ta(e.column.gate), children: [
    Im(e.column, e.items.length, a),
    Mm(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Bm(e, n), children: Pm(e, r) })
  ] });
}
function Fm(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Dm(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(I, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Om(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function G0(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: Fm(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Dm(e),
      Om(e.onConfigure),
      /* @__PURE__ */ t(Za, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function jm(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Wm(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Oe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Oe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function zm(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ t(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function U0(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ta(jm(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: Wm(e) }),
    /* @__PURE__ */ t(I, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(jt, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    zm(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function V0(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(nn, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(Hm, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function Km(e, a) {
  const n = tn(e);
  n !== void 0 && a(n);
}
function Gm(e, a, n) {
  R(() => {
    if (e != null)
      return e.subscribe(a, (r) => Km(r, n));
  }, [e, a, n]);
}
function Um(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Vm(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function Xm(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Ym(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function X0(e) {
  var c;
  const a = e.item, n = a.run, [r, l] = g((c = a.run) == null ? void 0 : c.lastStep);
  Gm(e.feed, a.key, l);
  const i = [...Um(a), ...Vm(a)];
  return /* @__PURE__ */ o(la, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: s[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Xm(n, r)
    ] }),
    Ym(a, e.actions)
  ] });
}
const Jm = "_card_1u4a0_2", Qm = "_head_1u4a0_28", Zm = "_mark_1u4a0_36", ew = "_name_1u4a0_48", aw = "_chips_1u4a0_69", tw = "_description_1u4a0_75", nw = "_run_1u4a0_80", rw = "_sep_1u4a0_89", lw = "_facts_1u4a0_94", ow = "_fact_1u4a0_94", iw = "_factLabel_1u4a0_107", cw = "_factValue_1u4a0_111", le = {
  card: Jm,
  head: Qm,
  mark: Zm,
  name: ew,
  chips: aw,
  description: tw,
  run: nw,
  sep: rw,
  facts: lw,
  fact: ow,
  factLabel: iw,
  factValue: cw
}, sw = { live: "done", draft: "running", paused: "meta" };
function dw(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function uw({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ t(m, { role: sw[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function hw({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: le.description, children: e });
}
function mw({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function ww({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ t("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function _w(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function fw({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: c }) {
  const s = { "--stream": ve(e.streamStep, "id") }, u = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": u,
      className: dw(c),
      style: s,
      "data-selected": u,
      "data-paused": _w(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ t("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ t(hw, { description: e.description }),
        /* @__PURE__ */ t(mw, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(uw, { versions: e.versions }),
        /* @__PURE__ */ t(ww, { facts: i })
      ]
    }
  );
}
const vw = "_list_4dcyc_2", bw = "_row_4dcyc_11", pw = "_head_4dcyc_23", gw = "_id_4dcyc_30", yw = "_lock_4dcyc_35", Nw = "_reason_4dcyc_41", kw = "_remove_4dcyc_46", $w = "_clauses_4dcyc_50", Cw = "_clause_4dcyc_50", Sw = "_label_4dcyc_64", Rw = "_cell_4dcyc_71", Tw = "_value_4dcyc_76", ce = {
  list: vw,
  row: bw,
  head: pw,
  id: gw,
  lock: yw,
  reason: Nw,
  remove: kw,
  clauses: $w,
  clause: Cw,
  label: Sw,
  cell: Rw,
  value: Tw
}, rn = We(!1);
function Y0({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(rn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ce.list, "aria-label": a, children: e }) });
}
function xw({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(I, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function Lw({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ce.lock, children: [
    /* @__PURE__ */ t(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ce.reason, children: e })
  ] });
}
function Aw({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ce.head, children: [
    /* @__PURE__ */ t("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(Lw, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ce.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function $t(e, a) {
  return e.locked ? void 0 : a;
}
function J0({ rule: e, onChange: a, onRemove: n }) {
  if (!je(rn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = $t(e, a);
  return /* @__PURE__ */ o("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Aw, { rule: e, onRemove: $t(e, n) }),
    /* @__PURE__ */ t("dl", { className: ce.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ce.clause, children: [
      /* @__PURE__ */ t("dt", { className: ce.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ce.cell, children: /* @__PURE__ */ t(xw, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Ew = "_ladder_j98f1_2", Iw = "_cell_j98f1_7", Mw = "_empty_j98f1_26", qw = "_name_j98f1_34", Bw = "_holder_j98f1_40", Pw = "_request_j98f1_46", Hw = "_swatches_j98f1_51", Fw = "_swatch_j98f1_51", Dw = "_tilesFrame_j98f1_78", Ow = "_tiles_j98f1_78", jw = "_tile_j98f1_78", Ww = "_bar_j98f1_117", zw = "_hex_j98f1_128", Kw = "_note_j98f1_138", L = {
  ladder: Ew,
  cell: Iw,
  empty: Mw,
  name: qw,
  holder: Bw,
  request: Pw,
  swatches: Hw,
  swatch: Fw,
  tilesFrame: Dw,
  tiles: Ow,
  tile: jw,
  bar: Ww,
  hex: zw,
  note: Kw
}, Q0 = "not validated yet, pending a CVD matrix and dark stepping";
function Gw(e) {
  return e.reserved ? "reserved" : Ca(e.step) ? "validated" : "partial";
}
function ln(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Uw(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Vw({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(Ee, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Xw(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Yw(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Ct = (e) => String(e).padStart(2, "0");
function Jw(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? ln(e, void 0);
}
function Qw({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${L.hex} ward-ladder-hex`, children: r ? `step ${Ct(e)}` : cr(e) }),
    /* @__PURE__ */ t("span", { className: `${L.note} ward-ladder-note`, children: r ? n : `Step ${Ct(e)} · ${n}` })
  ] });
}
function Zw({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const c = Gw(e), s = ln(c, n), u = s !== "free", d = u || i, h = a === e.step, v = e.name ?? `Step ${e.step}`, b = () => {
    d || r(e.step);
  }, y = `${v} · ${l === "tiles" && h ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": y, ...Yw(u, h, d), "data-validation": c, style: Uw(e, c), onClick: b, onKeyDown: (q) => Xw(q, b) }, label: y, name: v, holder: s, validation: c, note: Jw(c, n, h), step: e.step };
}
const e_ = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${L.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${L.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(Qw, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${L.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(Vw, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${L.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${L.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function a_(e) {
  return e_[e.presentation](Zw(e));
}
function t_(e) {
  for (const a of e)
    if (!a.reserved && !$a(a.step)) throw new Error("colour ladder renders token steps only");
}
function n_() {
  return /* @__PURE__ */ o("div", { className: `${L.cell} ward-ladder-cell ${L.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${L.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${L.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function r_(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const l_ = { list: L.ladder, swatches: L.swatches, tiles: L.tilesFrame };
function o_() {
  return /* @__PURE__ */ o("div", { className: `${L.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${L.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${L.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const i_ = { list: n_, swatches: () => null, tiles: o_ };
function c_(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function on(e) {
  const a = e.takenBy ?? {}, n = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  t_(e.steps);
  const r = r_(e), l = i_[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((c) => /* @__PURE__ */ t(a_, { step: c, value: e.value, taken: a[c.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, c.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...c_(e.disabled === !0), className: `${l_[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: L.tiles, children: i }) : i });
}
const s_ = "_rail_1el2t_2", d_ = "_section_1el2t_12", u_ = "_sectionFlush_1el2t_22", h_ = "_head_1el2t_26", m_ = "_headLabel_1el2t_34", w_ = "_sample_1el2t_42", __ = "_sampleLabel_1el2t_47", f_ = "_sampleTitle_1el2t_54", v_ = "_sampleMeta_1el2t_59", b_ = "_trace_1el2t_65", p_ = "_traceHead_1el2t_70", g_ = "_steps_1el2t_78", y_ = "_step_1el2t_78", N_ = "_stepTitle_1el2t_97", k_ = "_hollow_1el2t_107", $_ = "_stepBody_1el2t_115", C_ = "_stepDetail_1el2t_127", S_ = "_publish_1el2t_132", R_ = "_reason_1el2t_138", T_ = "_note_1el2t_143", x_ = "_reveal_1el2t_148", N = {
  rail: s_,
  section: d_,
  sectionFlush: u_,
  head: h_,
  headLabel: m_,
  sample: w_,
  sampleLabel: __,
  sampleTitle: f_,
  sampleMeta: v_,
  trace: b_,
  traceHead: p_,
  steps: g_,
  step: y_,
  stepTitle: N_,
  hollow: k_,
  stepBody: $_,
  stepDetail: C_,
  publish: S_,
  reason: R_,
  note: T_,
  reveal: x_
}, St = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, L_ = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, A_ = { ok: "greenFill", finding: "orangeFill", action: "blue" }, E_ = { notSimulated: "not simulated", running: "running" };
function I_(e) {
  return e.presentation === "foundry";
}
function M_(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function q_(e, a) {
  var r;
  const n = L_[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function B_(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function P_(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function H_(e) {
  if (B_(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function F_(e) {
  const [a, n] = g(!1);
  R(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${N.step} ${N.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function D_(e) {
  const a = E_[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: N.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(Ee, { size: 6, kind: A_[e.kind], label: e.kind });
}
function O_(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: N.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function j_(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Ce, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function W_(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(F_, { kind: a.kind, children: [
    /* @__PURE__ */ t(D_, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: N.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: N.stepTitle, children: a.title }),
      /* @__PURE__ */ t(O_, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(j_, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function z_(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(se(a)), n.join(" · ");
}
function cn(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${N.trace} ${N.section}`, children: [
    /* @__PURE__ */ t("p", { className: N.traceHead, id: a, children: z_(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: N.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(W_, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function K_(e) {
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
function G_(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${N.sampleMeta} ${N.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function U_(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Pt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: N.sectionFlush, children: /* @__PURE__ */ t(Ta, { divided: !0, cells: a }) });
}
function V_(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Pt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function X_(e) {
  const a = V_(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: N.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: N.sectionFlush, children: /* @__PURE__ */ t(Ta, { divided: !0, cells: a }) });
}
function sn(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("p", { className: `${N.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Y_(e) {
  return /* @__PURE__ */ o("div", { className: `${N.publish} ${N.section}`, children: [
    /* @__PURE__ */ t(sn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: N.note, children: e.note })
  ] });
}
function J_(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${N.publish} ${N.section}`, children: /* @__PURE__ */ t(sn, { reason: e.reason, onPublish: e.onPublish }) });
}
function dn(e) {
  return /* @__PURE__ */ o("div", { className: `${N.head} ${N.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: N.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(m, { role: St[e.run.status].role, label: St[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Ce, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Q_(e, a) {
  const [n, r] = g(e.steps);
  return R(() => r(e.steps), [e.steps]), R(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var c, s;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((c = l.step) == null ? void 0 : c.label) ?? "step", detail: (s = l.step) == null ? void 0 : s.tool }];
        });
      });
  }, [a, e.status]), n;
}
function Z_(e) {
  var n;
  P_(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(dn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(K_, { sample: e.run.sample }),
    /* @__PURE__ */ t(cn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(U_, { run: e.run }),
    /* @__PURE__ */ t("div", { className: N.section, children: /* @__PURE__ */ t(Aa, { items: e.checklist }) }),
    /* @__PURE__ */ t(Y_, { reason: M_(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function ef(e) {
  var r;
  const a = Q_(e.run, e.feed);
  H_(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(dn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(G_, { sample: e.run.sample }),
    /* @__PURE__ */ t(cn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(X_, { run: e.run }),
    /* @__PURE__ */ t("div", { className: N.section, children: /* @__PURE__ */ t(Aa, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(J_, { reason: q_(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Z0(e) {
  return I_(e) ? /* @__PURE__ */ t(ef, { ...e }) : /* @__PURE__ */ t(Z_, { ...e });
}
const af = "_list_142ip_3", tf = "_row_142ip_9", nf = "_condition_142ip_18", rf = "_action_142ip_24", ua = {
  list: af,
  row: tf,
  condition: nf,
  action: rf
}, un = We(!1);
function eC({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(un.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ua.list, "aria-label": a, children: e }) });
}
function aC({ rule: e }) {
  if (!je(un)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ua.row, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ua.condition, children: e.when }),
    /* @__PURE__ */ t(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ua.action, children: e.then })
  ] });
}
const lf = "_move_tmppt_3", of = {
  move: lf
};
function ja(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function hn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function mn(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function Rt(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function cf(e) {
  return e === "up" ? "down" : "up";
}
function sf(e, a) {
  const n = Rt(e, a.id, a.direction) ?? Rt(e, a.id, cf(a.direction));
  n == null || n.focus();
}
function wn() {
  const e = f(null), [a, n] = g(null), [r, l] = g("");
  return R(() => {
    e.current !== null && a !== null && sf(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    n(c), l(s);
  } };
}
function _n({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ba({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${of.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const df = "_body_1h15q_2", uf = "_title_1h15q_8", hf = "_section_1h15q_13", mf = "_legend_1h15q_18", wf = "_stages_1h15q_26", _f = "_stage_1h15q_26", ff = "_stageIndex_1h15q_44", vf = "_stageName_1h15q_50", bf = "_footer_1h15q_59", pf = "_note_1h15q_66", gf = "_reason_1h15q_71", yf = "_actions_1h15q_76", Nf = "_webHead_1h15q_83", kf = "_kicker_1h15q_92", $f = "_webTitle_1h15q_99", Cf = "_webBody_1h15q_105", Sf = "_webSection_1h15q_109", Rf = "_sectionHead_1h15q_121", Tf = "_sectionNote_1h15q_129", xf = "_formLabel_1h15q_134", Lf = "_identityRow_1h15q_139", Af = "_nameCell_1h15q_145", Ef = "_keyCell_1h15q_150", If = "_colourCell_1h15q_154", Mf = "_colourStatus_1h15q_161", qf = "_webStages_1h15q_166", Bf = "_webStageList_1h15q_172", Pf = "_webStage_1h15q_166", Hf = "_webIndex_1h15q_191", Ff = "_webStageName_1h15q_196", Df = "_webMoves_1h15q_201", Of = "_addStage_1h15q_215", jf = "_addStageButton_1h15q_223", Wf = "_addStageNote_1h15q_231", zf = "_webFooter_1h15q_236", Kf = "_webFooterNotes_1h15q_244", Gf = "_webNote_1h15q_251", w = {
  body: df,
  title: uf,
  section: hf,
  legend: mf,
  stages: wf,
  stage: _f,
  stageIndex: ff,
  stageName: vf,
  footer: bf,
  note: pf,
  reason: gf,
  actions: yf,
  webHead: Nf,
  kicker: kf,
  webTitle: $f,
  webBody: Cf,
  webSection: Sf,
  sectionHead: Rf,
  sectionNote: Tf,
  formLabel: xf,
  identityRow: Lf,
  nameCell: Af,
  keyCell: Ef,
  colourCell: If,
  colourStatus: Mf,
  webStages: qf,
  webStageList: Bf,
  webStage: Pf,
  webIndex: Hf,
  webStageName: Ff,
  webMoves: Df,
  addStage: Of,
  addStageButton: jf,
  addStageNote: Wf,
  webFooter: zf,
  webFooterNotes: Kf,
  webNote: Gf
}, Uf = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], fn = "not in catalogue";
function Vf(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${fn}` }, ...n];
}
function Xf({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(I, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${fn}`;
  return /* @__PURE__ */ t(I, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Vf(n, e.name), invalid: i, onChange: r });
}
function vn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Yf(e) {
  const a = f([]), n = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Jf({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: c }) {
  const s = vn(a, n), u = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: w.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: w.webStageName, children: /* @__PURE__ */ t(Xf, { stage: a, index: n, catalogue: l, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ t(I, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: Uf, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(ba, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      n < r - 1 && /* @__PURE__ */ t(ba, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function Qf({ stages: e, onChange: a, catalogue: n }) {
  const r = Yf(e.length), l = wn(), i = (s, u) => {
    const d = hn(s, u);
    r.current = ja(r.current, s, d), l.moved({ id: r.current[d], direction: u }, mn(vn(e[s], s), d, e.length)), a(ja(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ t(Jf, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: n, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ t(_n, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Zf = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], ev = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], av = "A new stream starts as a draft. Nothing runs on it until you publish it.", tv = "Create is disabled: name the stream and give it a key first.", nv = "reorder with the ↑ ↓ buttons · min 2";
function at(e, a) {
  return !e.reserved && Ca(e.step) && a[e.step] === void 0;
}
function rv(e, a) {
  const n = e.find((r) => at(r, a));
  return n ? n.step : 1;
}
function lv({ stages: e, onMove: a }) {
  const n = wn(), r = (l, i) => {
    const c = hn(l, i);
    n.moved({ id: e[l].id, direction: i }, mn(e[l].name, c, e.length)), a(l, c);
  };
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t(ba, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(ba, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(_n, { text: n.announcement })
  ] });
}
function ov({ reason: e, onCreate: a, onDraft: n }) {
  const r = k();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ t("p", { className: w.note, children: av }),
    e && /* @__PURE__ */ t("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ t(_, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function iv(e, a) {
  return e !== "" && a !== "" ? null : tv;
}
function cv(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = ev, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [h, v] = g(""), [b, y] = g(""), [A, q] = g(a[0].value), [oe, Se] = g(() => rv(n, r)), [te, ze] = g(e.stages ?? Zf), [Ke, C] = g(l[0].value), z = { name: h, key: b, streamStep: oe, owner: A, stages: te, policy: Ke }, be = iv(h, b);
  return /* @__PURE__ */ t(la, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ t("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ t("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ t(I, { kind: "input", label: "Stream name", value: h, onChange: v }),
      /* @__PURE__ */ t(I, { kind: "input", label: "Key", value: b, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(I, { kind: "select", label: "Owner", value: A, onChange: q, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ t("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ t(on, { label: "Stream colour", steps: n, value: oe, onChange: Se, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ t("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ t(lv, { stages: te, onMove: (Ie, Wn) => ze(ja(te, Ie, Wn)) })
    ] }),
    /* @__PURE__ */ t(Jt, { legend: "Loop policy", options: l, value: Ke, onChange: C }),
    /* @__PURE__ */ t(ov, { reason: be, onCreate: () => i(z), onDraft: () => c(z) })
  ] }) });
}
const bn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], sv = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function dv(e, a, n, r, l, i) {
  var s;
  const c = ((s = bn.find((u) => u.value === l)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: c, stages: i };
}
function uv(e, a) {
  return hv(e) && mv(e, a) && wv(e);
}
function hv(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function mv(e, a) {
  return e.colourStep === null || at({ step: e.colourStep }, a);
}
function wv(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function _v(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : at({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function fv({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function vv({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ t(fv, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: w.reason, children: sv })
    ] }),
    l && /* @__PURE__ */ t(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function bv({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ t("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function pv({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function gv(e) {
  const a = k(), n = k(), r = e.takenBy ?? {}, [l, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, v] = g(null), [b, y] = g("relay"), [A, q] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = dv(l, c, u, h, b, A), Se = uv(oe, r), te = A.find((C) => C.kind === "agent" && C.name.trim() !== ""), ze = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ t("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(on, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: v, takenBy: r })
  ] }), Ke = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t("p", { className: w.colourStatus, "data-colour-status": "", children: _v(h, r) }),
    /* @__PURE__ */ t(I, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: u, options: e.owners.map((C) => ({ value: C, label: C })), onChange: d })
  ] });
  return /* @__PURE__ */ o(la, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(bv, { titleId: n }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ t(pv, { name: l, setName: i, streamKey: c, setKey: s, colour: ze, owner: Ke }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: w.sectionNote, children: nv })
        ] }),
        /* @__PURE__ */ t(Qf, { stages: A, onChange: q })
      ] }),
      /* @__PURE__ */ t("section", { className: w.webSection, children: /* @__PURE__ */ t(Jt, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: bn, onChange: y }) }),
      /* @__PURE__ */ t(vv, { ready: Se, draft: oe, agentStage: te, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function tC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(gv, { ...e }) : /* @__PURE__ */ t(cv, { ...e });
}
const yv = "_row_bs8hc_2", Nv = "_cell_bs8hc_6", kv = "_condition_bs8hc_11", $v = "_action_bs8hc_18", Cv = "_contract_bs8hc_24", Sv = "_contractCondition_bs8hc_33", Rv = "_contractAction_bs8hc_39", Z = {
  row: yv,
  cell: Nv,
  condition: kv,
  action: $v,
  contract: Cv,
  contractCondition: Sv,
  contractAction: Rv
}, pn = ["advance", "block", "escalate", "requestReview"], Tt = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function pa(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function tt(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Z.action, children: Tt[e.then] }) : /* @__PURE__ */ t(
    I,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: pn.map((l) => ({ value: l, label: Tt[l] }))
    }
  );
}
function Tv({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t("span", { className: Z.condition, title: pa(e, r), children: pa(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: tt(e, a, n) })
  ] });
}
function xv({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ t(m, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Z.condition, children: pa(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: tt(e, a, n) })
  ] });
}
function Lv({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Z.contractCondition, children: pa(e, r) }),
    /* @__PURE__ */ t(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Z.contractAction, children: tt(e, a, n, !0) })
  ] });
}
const Av = { two: xv, four: Tv, contract: Lv };
function nC(e) {
  var n;
  if (!pn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Av[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Ev = "_column_1tf9e_2", Iv = "_head_1tf9e_17", Mv = "_index_1tf9e_23", qv = "_name_1tf9e_29", Bv = "_meta_1tf9e_38", Pv = "_mono_1tf9e_43", Hv = "_gate_1tf9e_50", Fv = "_reviewersLabel_1tf9e_57", Dv = "_reviewers_1tf9e_57", Ov = "_reviewer_1tf9e_57", jv = "_agents_1tf9e_74", Wv = "_workflowColumn_1tf9e_79", zv = "_workflowHead_1tf9e_96", Kv = "_stageRow_1tf9e_102", Gv = "_stageLabel_1tf9e_109", Uv = "_workflowTitle_1tf9e_116", Vv = "_workflowMeta_1tf9e_122", Xv = "_workflowGate_1tf9e_127", Yv = "_gateNote_1tf9e_135", Jv = "_cardNote_1tf9e_140", Qv = "_reviewerList_1tf9e_145", Zv = "_reviewerRow_1tf9e_151", eb = "_reviewerMark_1tf9e_157", ab = "_reviewerName_1tf9e_167", tb = "_terminalCard_1tf9e_173", nb = "_terminalCount_1tf9e_182", rb = "_workflowAgents_1tf9e_188", lb = "_mount_1tf9e_194", $ = {
  column: Ev,
  head: Iv,
  index: Mv,
  name: qv,
  meta: Bv,
  mono: Pv,
  gate: Hv,
  reviewersLabel: Fv,
  reviewers: Dv,
  reviewer: Ov,
  agents: jv,
  workflowColumn: Wv,
  workflowHead: zv,
  stageRow: Kv,
  stageLabel: Gv,
  workflowTitle: Uv,
  workflowMeta: Vv,
  workflowGate: Xv,
  gateNote: Yv,
  cardNote: Jv,
  reviewerList: Qv,
  reviewerRow: Zv,
  reviewerMark: eb,
  reviewerName: ab,
  terminalCard: tb,
  terminalCount: nb,
  workflowAgents: rb,
  mount: lb
}, ob = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function nt(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function gn(e) {
  return `${Math.round(e * 100)}%`;
}
function ib({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: $.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: $.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: $.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: $.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Ta, { cells: [
      { value: gn(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function cb({ stage: e }) {
  return /* @__PURE__ */ t(Ta, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: nt(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function sb({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: $.head, children: [
    /* @__PURE__ */ t("span", { className: $.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: $.name, id: a, children: e.name }),
    /* @__PURE__ */ t(m, { role: e.kind === "gate" ? "gate" : "soft", label: ob[e.kind] })
  ] });
}
function db({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: $.meta, children: [
    /* @__PURE__ */ o("span", { className: $.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: $.mono, children: [
      se(e.medianWait),
      " median wait"
    ] })
  ] });
}
function ub({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(ib, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(cb, { stage: e }) : null;
}
function hb({ onMount: e }) {
  return e ? /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function mb({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: $.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(sb, { stage: e, titleId: l }),
    /* @__PURE__ */ t(db, { stage: e }),
    /* @__PURE__ */ t(ub, { stage: e }),
    /* @__PURE__ */ t("div", { className: $.agents, children: a.map((c) => /* @__PURE__ */ t(fw, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ t(hb, { onMount: n })
  ] });
}
const wb = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function _b({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: $.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: $.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: $.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: $.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function fb({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: $.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: $.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(_b, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: $.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: gn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function vb(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function bb({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: $.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: $.terminalCount, children: nt(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: $.cardNote, children: vb(e.rolledBackThisWeek) })
  ] });
}
function pb(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function gb(e) {
  if (e.kind === "terminal") return `${nt(e.closedThisWeek)} this week`;
  const a = pb(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function yb({ stage: e, titleId: a }) {
  const n = wb[e.kind];
  return /* @__PURE__ */ o("header", { className: $.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: $.stageRow, children: [
      /* @__PURE__ */ o("span", { className: $.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(m, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: $.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: $.workflowMeta, children: gb(e) })
  ] });
}
function Nb(e) {
  return e === "entry" || e === "agent";
}
function kb({ stage: e, onMount: a }) {
  return a === void 0 || !Nb(e.kind) ? null : /* @__PURE__ */ t(_, { variant: "secondary", size: "sm", className: $.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function $b({ stage: e, agentCards: a, onMount: n }) {
  const r = k();
  return /* @__PURE__ */ o("section", { className: $.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(yb, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(fb, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(bb, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: $.workflowAgents, children: a }),
    /* @__PURE__ */ t(kb, { stage: e, onMount: n })
  ] });
}
function Cb(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function rC(e) {
  return Cb(e) ? /* @__PURE__ */ t($b, { ...e }) : /* @__PURE__ */ t(mb, { ...e });
}
const Sb = "_row_1jata_6", Rb = "_name_1jata_12", Tb = "_compactRow_1jata_13", xb = "_compactName_1jata_13", Lb = "_cell_1jata_30", Ab = "_chain_1jata_45", Eb = "_owner_1jata_51", Ib = "_mono_1jata_57", Mb = "_compactCell_1jata_79", qb = "_stack_1jata_96", Bb = "_stat_1jata_103", Pb = "_identityLine_1jata_110", Hb = "_identity_1jata_110", Fb = "_ownerLine_1jata_137", Db = "_link_1jata_150", Ob = "_gateMark_1jata_156", jb = "_emptyChain_1jata_161", Wb = "_arrow_1jata_167", zb = "_muted_1jata_168", Kb = "_define_1jata_173", Gb = "_statValue_1jata_180", Ub = "_policyId_1jata_186", Vb = "_sub_1jata_191", p = {
  row: Sb,
  name: Rb,
  compactRow: Tb,
  compactName: xb,
  cell: Lb,
  chain: Ab,
  owner: Eb,
  mono: Ib,
  compactCell: Mb,
  stack: qb,
  stat: Bb,
  identityLine: Pb,
  identity: Hb,
  ownerLine: Fb,
  link: Db,
  gateMark: Ob,
  emptyChain: jb,
  arrow: Wb,
  muted: zb,
  define: Kb,
  statValue: Gb,
  policyId: Ub,
  sub: Vb
};
function yn(e) {
  var s;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, c = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (s = e.currentTarget.querySelector("a")) == null || s.dispatchEvent(new MouseEvent("click", c));
}
function Xb(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Yb(e) {
  return e === void 0 ? p.compactRow : `${p.compactRow} ${e}`;
}
function Nn(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Jb(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Nn(e.members)}`;
}
function Qb(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: p.compactCell, children: /* @__PURE__ */ o("span", { className: p.stack, children: [
    /* @__PURE__ */ o("span", { className: p.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${p.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${p.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(m, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: p.ownerLine, children: Jb(e) })
  ] }) });
}
function kn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ t("span", { className: p.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(m, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Zb(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ra(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function ep({ stages: e, streamStep: a }) {
  const n = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ t("span", { className: `${p.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: p.link, children: [
    l === 0 ? null : /* @__PURE__ */ t("span", { className: p.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ t(kn, { name: r.name, gate: r.gate === !0, look: Zb(l, n, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function ap(e) {
  return /* @__PURE__ */ t("td", { className: p.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: p.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: p.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: p.define, children: "Define workflow" })
  ] }) : ep(e) });
}
function $n(e) {
  return e === void 0 ? void 0 : !0;
}
function xt(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: p.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: p.muted, children: n }) : /* @__PURE__ */ o("span", { className: p.stat, children: [
    /* @__PURE__ */ t("span", { className: `${p.statValue} ward-stat-value`, title: r, "data-raised": $n(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: p.sub, children: a })
  ] }) });
}
function tp(e) {
  return /* @__PURE__ */ t("td", { className: p.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: p.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: p.stat, children: [
    /* @__PURE__ */ t("span", { className: p.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: p.sub, children: e.summary })
  ] }) });
}
function np(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function rp({ stream: e, href: a, presentation: n }) {
  const r = Yb(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: yn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ve(e.streamStep, "chip") }, children: [
    Qb(e, a),
    ap(e),
    xt(np(e.agents), e.agents === void 0 ? void 0 : Xb(e.agents), "—"),
    tp(e.policy),
    xt(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function lp(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function lC(e) {
  if (lp(e)) return rp(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: p.row, onClick: yn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: p.cell, children: [
      /* @__PURE__ */ t("a", { className: `${p.name} ward-target`, href: W(n), children: a.name }),
      /* @__PURE__ */ t(m, { ...Ra(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: p.cell, children: /* @__PURE__ */ t("span", { className: p.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: p.link, children: /* @__PURE__ */ t(kn, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ t("td", { className: p.cell, children: /* @__PURE__ */ o("span", { className: p.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: p.cell, children: [
      /* @__PURE__ */ t("span", { className: p.owner, children: a.owner }),
      /* @__PURE__ */ t("span", { className: p.mono, children: Nn(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: p.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: p.mono, title: a.inFlightHint, "data-raised": $n(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: p.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: p.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const op = "_row_mdce7_2", ip = "_name_mdce7_16", cp = "_scope_mdce7_24", ga = {
  row: op,
  name: ip,
  scope: cp
};
function rt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function sp(e) {
  return e === void 0 ? `${ga.row} ward-toolrow` : `${ga.row} ward-toolrow ${e}`;
}
function dp(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function up({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function hp({ classification: e }) {
  return /* @__PURE__ */ t(m, { role: e === "write" ? "write" : "meta", label: rt(e) });
}
function mp({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${ga.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function wp(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function oC({ tool: e, onChange: a, presentation: n }) {
  const r = k(), l = k(), i = dp(e, n), c = wp(n);
  return /* @__PURE__ */ o(c, { className: sp(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(up, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${ga.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(mp, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(hp, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const _p = "_strip_1qtlf_2", fp = "_head_1qtlf_10", vp = "_name_1qtlf_16", bp = "_chart_1qtlf_24", pp = "_segment_1qtlf_30", gp = "_detailedChart_1qtlf_36", yp = "_rail_1qtlf_49", Np = "_section_1qtlf_55", kp = "_label_1qtlf_66", $p = "_note_1qtlf_83", ee = {
  strip: _p,
  head: fp,
  name: vp,
  chart: bp,
  segment: pp,
  detailedChart: gp,
  rail: yp,
  section: Np,
  label: kp,
  note: $p
}, Cp = "No item in flight to preview.", Sp = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Rp = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Wa = [1, 2, 3, 4, 5, 6], ya = 100;
function Tp(e, a) {
  return a.has(e) ? ve(e, "id") : "var(--ward-color-line)";
}
function xp({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Wa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: ee.segment,
      x: l * ya,
      y: "0",
      width: ya,
      height: "8",
      fill: Tp(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Lp(e) {
  const a = e.slice(0, Wa.length);
  for (; a.length < Wa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Ap({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${ee.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, n) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(n * ya),
        y: "0",
        width: String(ya),
        height: "40",
        style: { fill: ve(a.streamStep, "chip") }
      },
      a.key + String(n)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((a, n) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(n))) })
  ] });
}
function Cn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ca({ label: e, children: a }) {
  const n = k();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: ee.label, children: e }),
    a
  ] });
}
function Ep({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: ee.note, children: a ?? Cp }) : /* @__PURE__ */ t(La, { item: { ...e, streamStep: ra(n.streamStep) }, onOpen: Cn(r), feed: null });
}
function Ip({ draft: e }) {
  const a = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ t(Ee, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ t(m, { ...Ra(e.key, e.streamStep) })
  ] });
}
function Mp(e) {
  const a = Lp(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(ca, { label: "Board card", children: /* @__PURE__ */ t(Ep, { ...e, draft: n }) }),
    /* @__PURE__ */ t(ca, { label: "Streams index row", children: /* @__PURE__ */ t(Ip, { draft: n }) }),
    /* @__PURE__ */ o(ca, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Ap, { identities: a }),
      /* @__PURE__ */ t("p", { className: ee.note, children: Sp })
    ] }),
    /* @__PURE__ */ t(ca, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: ee.note, children: Rp }) })
  ] });
}
function qp({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": ve(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ t(Ee, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ t(m, { ...Ra(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t(La, { item: { ...a, streamStep: e.streamStep }, onOpen: Cn(r) }),
    /* @__PURE__ */ t(xp, { draft: e, streams: n })
  ] });
}
function iC(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(Mp, { ...e }) : /* @__PURE__ */ t(qp, { ...e });
}
const Bp = "_row_ixlg5_6", Pp = "_headCell_ixlg5_10", Hp = "_cell_ixlg5_11", Fp = "_name_ixlg5_23", Dp = "_consequence_ixlg5_29", Op = "_governed_ixlg5_36", jp = "_control_ixlg5_42", Wp = "_byRole_ixlg5_48", zp = "_webControl_ixlg5_59", Kp = "_webConsequence_ixlg5_65", Gp = "_webGoverned_ixlg5_71", D = {
  row: Bp,
  headCell: Pp,
  cell: Hp,
  name: Fp,
  consequence: Dp,
  governed: Op,
  control: jp,
  byRole: Wp,
  webControl: zp,
  webConsequence: Kp,
  webGoverned: Gp
};
function Up({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: D.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: D.control, children: [
    /* @__PURE__ */ t(
      Oe,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => n(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ t(m, { role: "running", label: "Pilot" })
  ] });
}
function Vp({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: D.headCell, children: [
      /* @__PURE__ */ t("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: D.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: D.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t(Up, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function Xp(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Yp({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${D.webControl} ${D.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Oe,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${D.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Jp({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ t("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t(Yp, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t("span", { className: `${D.webGoverned} ward-cellmeta`, children: Xp(e) }) })
  ] });
}
function cC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Jp, { ...e }) : /* @__PURE__ */ t(Vp, { ...e });
}
const Qp = "_row_vv64h_2", Zp = "_cell_vv64h_6", eg = "_name_vv64h_25", ag = "_note_vv64h_30", tg = "_webName_vv64h_41", ng = "_webMeta_vv64h_47", U = {
  row: Qp,
  cell: Zp,
  name: eg,
  note: ag,
  webName: tg,
  webMeta: ng
}, Sn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function rg(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function lg({ component: e, onRestart: a }) {
  const n = k(), r = Sn[e.state], l = e.state === "drainFirst";
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
function og({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: rg(e.state) });
}
function ig({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: U.row, children: [
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t("span", { className: `${U.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t("span", { className: `${U.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t(m, { ...Sn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: U.cell, children: /* @__PURE__ */ t(og, { component: e, onRestart: a }) })
  ] });
}
function sC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(ig, { ...e }) : /* @__PURE__ */ t(lg, { ...e });
}
const cg = "_row_1f1gp_7", sg = "_cell_1f1gp_11", dg = "_next_1f1gp_28", ug = "_headCell_1f1gp_38", hg = "_webId_1f1gp_77", mg = "_webPurpose_1f1gp_83", wg = "_webMeta_1f1gp_91", _g = "_webUrgent_1f1gp_97", O = {
  row: cg,
  cell: sg,
  next: dg,
  headCell: ug,
  webId: hg,
  webPurpose: mg,
  webMeta: wg,
  webUrgent: _g
}, fg = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, vg = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Rn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], bg = Object.fromEntries(Rn.map((e) => [e.key, e]));
function Ue({ column: e, children: a }) {
  const n = bg[e];
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
function dC() {
  return /* @__PURE__ */ t("tr", { children: Rn.map((e) => /* @__PURE__ */ t(
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
function pg({ cred: e }) {
  const a = fg[e.state];
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ t(Ue, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Ue, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Ue, { column: "state", children: /* @__PURE__ */ t(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Ue, { column: "cls", children: /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: rt(e.cls) }) }),
    /* @__PURE__ */ t(Ue, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Ue, { column: "next", children: /* @__PURE__ */ t("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function gg({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function yg({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(gg, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(m, { ...vg[e.state] }) })
  ] });
}
function uC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(yg, { ...e }) : /* @__PURE__ */ t(pg, { ...e });
}
const Ng = "_card_17zba_2", kg = "_head_17zba_11", $g = "_env_17zba_18", Cg = "_version_17zba_25", Sg = "_meta_17zba_32", Rg = "_webCard_17zba_37", Tg = "_webRow_17zba_47", xg = "_webTitle_17zba_55", Lg = "_webLine_17zba_65", Ag = "_webVersion_17zba_72", Eg = "_webMeta_17zba_77", G = {
  card: Ng,
  head: kg,
  env: $g,
  version: Cg,
  meta: Sg,
  webCard: Rg,
  webRow: Tg,
  webTitle: xg,
  webLine: Lg,
  webVersion: Ag,
  webMeta: Eg
}, Lt = { dev: "Dev", uat: "UAT", prod: "Prod" }, Tn = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function Ig({ env: e }) {
  const a = Tn[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: G.card, "aria-label": Lt[e.env], children: [
    /* @__PURE__ */ o("div", { className: G.head, children: [
      /* @__PURE__ */ t("span", { className: G.env, children: Lt[e.env] }),
      /* @__PURE__ */ t(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ t("p", { className: G.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: G.meta, children: [
      "deployed ",
      de(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ t("p", { className: G.meta, children: n })
  ] });
}
function Mg(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function qg(e) {
  return /* @__PURE__ */ o("article", { className: `${G.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${G.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${G.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(m, { ...Tn[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${G.version} ${G.webVersion} ${G.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${G.meta} ${G.webMeta} ${G.webLine} ward-cellmeta`, children: Mg(e) })
  ] });
}
function hC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(qg, { ...e }) : /* @__PURE__ */ t(Ig, { ...e });
}
const Bg = "_panel_1hmja_2", Pg = "_line_1hmja_8", Hg = "_actions_1hmja_14", sa = {
  panel: Bg,
  line: Pg,
  actions: Hg
};
function mC(e) {
  return /* @__PURE__ */ o("div", { className: sa.panel, children: [
    /* @__PURE__ */ t("p", { className: sa.line, children: e.status }),
    /* @__PURE__ */ t(I, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: sa.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: sa.line, children: e.note ?? "" })
  ] });
}
const Fg = "_upload_1vgt7_2", Dg = "_preview_1vgt7_7", Og = "_mark_1vgt7_17", jg = "_empty_1vgt7_22", Wg = "_actions_1vgt7_28", zg = "_input_1vgt7_33", Kg = "_reasons_1vgt7_41", Gg = "_reason_1vgt7_41", Ug = "_accepted_1vgt7_57", ne = {
  upload: Fg,
  preview: Dg,
  mark: Og,
  empty: jg,
  actions: Wg,
  input: zg,
  reasons: Kg,
  reason: Gg,
  accepted: Ug
}, xn = 1.5, Ln = 22, Na = "script elements or event handlers", Te = "links or external references", $e = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${xn}px at ${Ln}px`], Vg = [$e[1], $e[2], Na, Te], Xg = /* @__PURE__ */ new Map([
  ["image", $e[1]],
  ["text", $e[2]],
  ["tspan", $e[2]],
  ["textPath", $e[2]],
  ["script", Na],
  ["foreignObject", Na],
  ["a", Te],
  ["use", Te],
  ["style", Te],
  ["feImage", Te],
  ["set", Te]
]), Yg = "http://www.w3.org/2000/svg", Jg = "http://www.w3.org/2000/xmlns/", Qg = /* @__PURE__ */ new Set([
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
]), Zg = /* @__PURE__ */ new Set([
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
]), lt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, ey = /url\s*\(|['"\\]/i;
function ay() {
  return { ok: !1, reasons: [$e[1]] };
}
function An(e) {
  return e.namespaceURI === Yg;
}
function ty(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && An(a) ? a : null;
  } catch {
    return null;
  }
}
function ny(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [$e[0]] : [];
}
function ry(e) {
  return Xg.get(e.localName) ?? (e.localName.startsWith("animate") ? Te : void 0);
}
function ly(e) {
  return ey.test(e.replace(lt, ""));
}
function oy(e) {
  return /^on/i.test(e.localName) ? Na : e.localName === "href" || ly(e.value) ? Te : void 0;
}
function iy(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(ry(n));
    for (const r of Array.from(n.attributes)) a.add(oy(r));
  }
  return Vg.filter((n) => a.has(n));
}
function cy(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? Ln / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < xn;
  }) ? [$e[3]] : [];
}
function sy(e) {
  if (e.namespaceURI === Jg) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (Zg.has(a) || a.startsWith("stroke"));
}
function dy(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && An(a) && Qg.has(a.localName);
}
function uy(e, a) {
  dy(a) ? a.nodeType === Node.ELEMENT_NODE && En(a) : e.removeChild(a);
}
function En(e) {
  for (const a of Array.from(e.attributes)) sy(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) uy(e, a);
  return e;
}
function hy(e) {
  return Array.from(e.matchAll(lt), (a) => a[2]).filter((a) => a !== "");
}
function my(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function wy(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of hy(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function _y(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(lt, (r, l, i) => {
      const c = a.get(i);
      return c === void 0 ? r : r.replace(`#${i}`, `#${c}`);
    });
}
function fy(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = wy(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), _y(l, r);
  }
  return e;
}
function wC(e) {
  const a = ty(e);
  if (a === null) return ay();
  const n = [...ny(a), ...iy(a), ...cy(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(fy(En(a), my(e))) };
}
const vy = "Mark accepted.", by = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, py = new Set(Ft.flatMap((e) => [ve(e, "id"), ve(e, "chip")]));
function gy(e) {
  return e !== void 0 && (by.test(e) || py.has(e)) ? e : void 0;
}
function yy({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: ne.preview, style: { "--mark": gy(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: ne.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: ne.empty }) });
}
function Ny(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function ky(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function $y({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: ne.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("p", { className: ne.accepted, children: vy }) }) : /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("ul", { className: ne.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: ne.reason, children: a }, a)) }) });
}
function Cy({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t($y, { result: e }) : /* @__PURE__ */ t("p", { className: `${ne.result} ${Ny(e, n)}`, role: "status", children: ky(e, n) });
}
function At(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function _C({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = f(null), [c, s] = g(null), u = (d) => {
    if (d === void 0) return;
    const h = a(d);
    h instanceof Promise ? h.then(s) : s(h);
  };
  return /* @__PURE__ */ o("div", { className: ne.upload, children: [
    /* @__PURE__ */ t(yy, { current: e }),
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
      /* @__PURE__ */ t(_, { ...At(l), onClick: () => {
        var d;
        return (d = i.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(_, { ...At(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(Cy, { result: c, presentation: r })
  ] });
}
const Sy = "_row_1wp9s_7", Ry = "_cell_1wp9s_11", Ty = "_head_1wp9s_28", xy = "_name_1wp9s_34", Ly = "_pinned_1wp9s_42", Ay = "_headCell_1wp9s_49", Ey = "_webName_1wp9s_88", Iy = "_webMeta_1wp9s_95", My = "_webWarn_1wp9s_103", B = {
  row: Sy,
  cell: Ry,
  head: Ty,
  name: xy,
  pinned: Ly,
  headCell: Ay,
  webName: Ey,
  webMeta: Iy,
  webWarn: My
}, ot = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, In = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], qy = Object.fromEntries(In.map((e) => [e.key, e]));
function By(e, a) {
  return `mcp.${e}.${a}`;
}
function Py(e) {
  return Object.keys(ot).includes(e);
}
function Hy(e) {
  return ot[e !== void 0 && Py(e) ? e : "unknown"];
}
function Qe({ column: e, children: a }) {
  const n = qy[e];
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
function fC() {
  return /* @__PURE__ */ t("tr", { children: In.map((e) => /* @__PURE__ */ t(
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
function Fy({ server: e }) {
  const a = ot[e.connection];
  return /* @__PURE__ */ o("tr", { className: B.row, children: [
    /* @__PURE__ */ o(Qe, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: B.head, children: [
        /* @__PURE__ */ t("span", { className: B.name, children: e.name }),
        /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: rt(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: B.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(Qe, { column: "connection", children: /* @__PURE__ */ t(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Qe, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(Qe, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(Qe, { column: "tools", children: e.tools.map((n) => By(e.name, n)).join(" · ") })
  ] });
}
function Dy(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Oy(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function jy({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${B.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta`, children: e });
}
function Wy({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function zy({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(_, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function Ky({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: B.row, children: [
    /* @__PURE__ */ o("td", { className: B.cell, children: [
      /* @__PURE__ */ t("span", { className: `${B.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta`, children: Dy(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t("span", { className: `${B.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t(m, { ...Oy(e) }) }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t(jy, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: B.cell, children: /* @__PURE__ */ t(m, { ...Hy(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: B.cell, children: [
      /* @__PURE__ */ t(Wy, { server: e, onRestart: a }),
      /* @__PURE__ */ t(zy, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function vC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Ky, { ...e }) : /* @__PURE__ */ t(Fy, { ...e });
}
const Gy = "_row_60u3p_2", Uy = "_headCell_60u3p_14", Vy = "_cell_60u3p_15", Xy = "_name_60u3p_26", Yy = "_consequence_60u3p_32", Jy = "_reason_60u3p_38", Qy = "_value_60u3p_44", Zy = "_webRow_60u3p_60", eN = "_webSetting_60u3p_73", aN = "_webName_60u3p_81", tN = "_webConsequence_60u3p_89", nN = "_webControl_60u3p_95", rN = "_webState_60u3p_109", lN = "_webChip_60u3p_114", E = {
  row: Gy,
  headCell: Uy,
  cell: Vy,
  name: Xy,
  consequence: Yy,
  reason: Jy,
  value: Qy,
  webRow: Zy,
  webSetting: eN,
  webName: aN,
  webConsequence: tN,
  webControl: nN,
  webState: rN,
  webChip: lN
}, Mn = 104, qn = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function oN({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Oe, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Xt, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: E.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function iN({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = k(), i = qn[n], c = n === "locked";
  return /* @__PURE__ */ o("tr", { className: E.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ t("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: E.cell, children: /* @__PURE__ */ t(oN, { control: a, name: e.name, locked: c, describedBy: c ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: E.cell, style: { width: Mn }, children: /* @__PURE__ */ t(m, { role: i.role, label: i.label }) })
  ] });
}
function Bn(e, a) {
  return String(e ?? a);
}
function cN(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function sN(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Bn(e.value, "—");
}
function dN({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: E.webControl, children: [
    /* @__PURE__ */ t(Oe, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (c) => l == null ? void 0 : l(c) }),
    /* @__PURE__ */ t("span", { className: E.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function uN(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(dN, { ...e });
  const l = cN(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Xt, { options: l, value: Bn(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: sN(a) });
}
function hN({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const c = k(), s = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: E.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: c, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: E.webControl, children: i(c) }) : /* @__PURE__ */ t(uN, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${E.webChip} ward-policy-chip`, style: { width: Mn }, children: /* @__PURE__ */ t(m, { ...qn[n], size: "tag" }) })
  ] });
}
function bC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(hN, { ...e }) : /* @__PURE__ */ t(iN, { ...e });
}
const mN = "_label_1o9za_7", wN = "_name_1o9za_15", _N = "_column_1o9za_24", fN = "_webFrame_1o9za_57", vN = "_webHead_1o9za_62", bN = "_webHeadLabel_1o9za_74", pN = "_webLabel_1o9za_112", gN = "_webColumns_1o9za_119", yN = "_webGroup_1o9za_125", NN = "_webPeople_1o9za_126", kN = "_webVia_1o9za_127", $N = "_webMeta_1o9za_156", j = {
  label: mN,
  name: wN,
  column: _N,
  webFrame: fN,
  webHead: vN,
  webHeadLabel: bN,
  webLabel: pN,
  webColumns: gN,
  webGroup: yN,
  webPeople: NN,
  webVia: kN,
  webMeta: $N
}, CN = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Ba = [
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
function SN(e) {
  if (!e.matrixRole) return;
  const a = CN[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function RN({ node: e }) {
  const a = SN(e);
  return /* @__PURE__ */ o("span", { className: j.label, children: [
    /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
    /* @__PURE__ */ t(TN, { role: a, node: e }),
    /* @__PURE__ */ t(Pa, { column: Ba[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Pa, { column: Ba[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ t(Pa, { column: Ba[2], children: e.requestedVia ?? "" })
  ] });
}
function TN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ t(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(m, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(m, { role: "warn", label: "Unresolved" })
  ] });
}
function xN({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: c }) {
  return /* @__PURE__ */ t(
    en,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(RN, { node: n }),
      children: c
    }
  );
}
function Ha({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function LN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${j.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ha, { className: `${j.webMeta} ${j.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ha, { className: `${j.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ha, { className: `${j.webMeta} ${j.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function AN() {
  return /* @__PURE__ */ o("div", { className: j.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: j.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: j.webColumns, children: [
      /* @__PURE__ */ t("span", { className: j.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: j.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: j.webVia, children: "Requested via" })
    ] })
  ] });
}
function EN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${j.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function IN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function MN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: j.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(AN, {}),
    /* @__PURE__ */ t(vd, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      en,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(EN, { row: n }),
        detail: /* @__PURE__ */ t(LN, { row: n }),
        expanded: IN(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function pC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(MN, { ...e }) : /* @__PURE__ */ t(xN, { ...e });
}
const qN = "_runbook_b9agc_2", BN = "_list_b9agc_7", PN = "_step_b9agc_15", HN = "_numeral_b9agc_21", FN = "_body_b9agc_28", DN = "_head_b9agc_34", ON = "_title_b9agc_40", jN = "_detail_b9agc_45", WN = "_actions_b9agc_50", zN = "_webList_b9agc_56", KN = "_webStep_b9agc_60", GN = "_webBody_b9agc_66", UN = "_webTitle_b9agc_74", VN = "_webDetail_b9agc_78", x = {
  runbook: qN,
  list: BN,
  step: PN,
  numeral: HN,
  body: FN,
  head: DN,
  title: ON,
  detail: jN,
  actions: WN,
  webList: zN,
  webStep: KN,
  webBody: GN,
  webTitle: UN,
  webDetail: VN
}, Pn = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Hn(e) {
  return String(e + 1).padStart(2, "0");
}
function XN({ step: e, index: a, connection: n }) {
  const r = Pn[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: x.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.numeral, children: Hn(a) }),
    /* @__PURE__ */ o("span", { className: x.body, children: [
      /* @__PURE__ */ o("span", { className: x.head, children: [
        /* @__PURE__ */ t("span", { className: x.title, children: e.title }),
        /* @__PURE__ */ t(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ t("span", { className: x.detail, children: e.detail })
    ] })
  ] });
}
function YN({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: x.runbook, children: [
    /* @__PURE__ */ t("ol", { className: x.list, children: e.map((r, l) => /* @__PURE__ */ t(XN, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: x.actions, children: a })
  ] });
}
function JN({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${x.step} ${x.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${x.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Hn(a) }),
    /* @__PURE__ */ o("span", { className: `${x.body} ${x.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${x.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${x.title} ${x.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(m, { ...Pn[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(Ce, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${x.detail} ${x.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function QN({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: x.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${x.list} ${x.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(JN, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${x.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function gC(e) {
  return "presentation" in e ? /* @__PURE__ */ t(QN, { ...e }) : /* @__PURE__ */ t(YN, { ...e });
}
const ZN = "_list_1gu6a_2", e1 = "_check_1gu6a_10", a1 = "_body_1gu6a_16", t1 = "_text_1gu6a_23", n1 = "_pending_1gu6a_32", r1 = "_measured_1gu6a_37", Xe = {
  list: ZN,
  check: e1,
  body: a1,
  text: t1,
  pending: n1,
  measured: r1
};
function l1(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function o1({ check: e }) {
  const a = l1(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Xe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(Qa, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Xe.body, children: [
      /* @__PURE__ */ t("span", { className: Xe.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Xe.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ t("span", { className: Xe.measured, children: e.measured })
  ] });
}
function yC({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Xe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(o1, { check: a }, a.text)) });
}
const i1 = "_root_a6xzy_2", c1 = "_list_a6xzy_10", s1 = "_line_a6xzy_21", d1 = "_at_a6xzy_48", u1 = "_text_a6xzy_52", h1 = "_foot_a6xzy_56", m1 = "_idle_a6xzy_68", w1 = "_caret_a6xzy_76", _1 = "_jump_a6xzy_83", me = {
  root: i1,
  list: c1,
  line: s1,
  at: d1,
  text: u1,
  foot: h1,
  idle: m1,
  caret: w1,
  jump: _1
}, f1 = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function it(e) {
  return Number.isNaN(Date.parse(e)) ? "" : f1.format(new Date(e));
}
const v1 = { warn: "warning", ok: "ok" };
function b1({ kind: e }) {
  const a = v1[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function p1({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${it(e)}` });
}
function g1({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${it(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: me.idle, children: i }),
    /* @__PURE__ */ t(p1, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const y1 = 8;
function N1(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > y1;
}
function k1({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Fn = We(null);
function NC({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = g(!1), i = Bt(() => ({
    announce: e ?? r,
    setAnnounce: (c) => {
      l(c), a == null || a(c);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(Fn.Provider, { value: i, children: n });
}
function $1() {
  const e = je(Fn), [a, n] = g(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function kC({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = f(null), [i, c] = g(0), [s, u] = $1(), [d, h] = g(!1), v = e.at(-1);
  R(() => {
    c(e.length);
  }, [e.length]), Ga(() => {
    const y = l.current;
    y && !d && (y.scrollTop = y.scrollHeight);
  }, [e.length, d]);
  const b = () => {
    var q;
    const y = l.current;
    if (!y) return;
    const A = y.querySelectorAll("[data-consline-text]");
    (q = A.item(A.length - 1)) == null || q.focus(), h(!1);
  };
  return /* @__PURE__ */ o("div", { className: me.root, children: [
    /* @__PURE__ */ t("ol", { className: me.list, ref: l, "aria-live": s ? "polite" : "off", "aria-label": r, onScroll: (y) => h(N1(y.currentTarget)), children: e.map((y, A) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": A < i, children: [
      /* @__PURE__ */ t("span", { className: me.at, children: it(y.at) }),
      /* @__PURE__ */ t(b1, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${A}`)) }),
    /* @__PURE__ */ o(g1, { connection: a, idleSince: n, last: v, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": s, onClick: () => u(!s), children: "Read new events" }),
      /* @__PURE__ */ t(k1, { shown: d, onJump: b })
    ] })
  ] });
}
const C1 = "_row_11jhe_2", S1 = "_head_11jhe_14", R1 = "_author_11jhe_20", T1 = "_eta_11jhe_25", x1 = "_edited_11jhe_26", L1 = "_body_11jhe_32", A1 = "_reason_11jhe_37", E1 = "_actions_11jhe_42", ge = {
  row: C1,
  head: S1,
  author: R1,
  eta: T1,
  edited: x1,
  body: L1,
  reason: A1,
  actions: E1
}, I1 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function M1(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function q1({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function B1({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: ge.reason, id: a, children: e })
  ] });
}
function P1(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function H1(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(q1, { ...e }) : /* @__PURE__ */ t(B1, { reason: e.unavailable, reasonId: e.unavailableId });
}
function $C(e) {
  const { comment: a } = e;
  P1(e);
  const n = k(), r = `${n}-unavailable`, l = I1[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${ge.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: ge.head, children: [
      /* @__PURE__ */ t("span", { className: ge.author, children: a.author }),
      /* @__PURE__ */ t(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: ge.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: ge.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: ge.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: ge.reason, id: n, children: M1(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: ge.actions, children: /* @__PURE__ */ t(H1, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const F1 = "_root_c46wj_2", D1 = "_attach_c46wj_11", O1 = "_actions_c46wj_17", j1 = "_reply_c46wj_23", W1 = "_replyRow_c46wj_28", z1 = "_sendsAs_c46wj_42", Je = {
  root: F1,
  attach: D1,
  actions: O1,
  reply: j1,
  replyRow: W1,
  sendsAs: z1
};
function Dn({ value: e, onChange: a }) {
  const [n, r] = g("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function K1(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = Dn(e), c = k();
  return /* @__PURE__ */ o("div", { className: Je.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Je.replyRow, children: [
      /* @__PURE__ */ t(I, { variant: "reply", labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: c }),
      /* @__PURE__ */ t(_, { variant: "ghost", describedBy: c, onClick: () => r(n, l), children: "Send" })
    ] }),
    /* @__PURE__ */ t("p", { id: c, className: Je.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function CC(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(K1, { ...e }) : /* @__PURE__ */ t(G1, { ...e });
}
function G1(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: c } = e, [s, u] = Dn(e);
  return /* @__PURE__ */ o("div", { className: Je.root, children: [
    /* @__PURE__ */ t(I, { kind: "textarea", label: a, value: s, onChange: u }),
    r && /* @__PURE__ */ o("div", { className: Je.attach, children: [
      /* @__PURE__ */ t(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(_, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ t(
      jt,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Je.actions, children: [
      /* @__PURE__ */ t(_, { variant: "primary", onClick: () => i(n, s), children: `Post as ${n}` }),
      c && /* @__PURE__ */ t(_, { variant: "ghost", onClick: () => c(s), children: "Save draft" })
    ] })
  ] });
}
const U1 = "_list_1ih9e_2", V1 = "_item_1ih9e_6", X1 = "_body_1ih9e_22", Y1 = "_text_1ih9e_28", J1 = "_evidence_1ih9e_37", Q1 = "_consequence_1ih9e_49", Z1 = "_note_1ih9e_54", Fe = {
  list: U1,
  item: V1,
  body: X1,
  text: Y1,
  evidence: J1,
  consequence: Q1,
  note: Z1
};
function ek({ criterion: e }) {
  return /* @__PURE__ */ t(Ee, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Et({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function ak(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function tk({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Fe.body, children: [
    /* @__PURE__ */ t("span", { className: Fe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ t(Et, { text: " · " }),
      /* @__PURE__ */ t("code", { className: Fe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ t(Et, { text: " · " }),
      /* @__PURE__ */ t("span", { className: Fe.consequence, children: ak(e.why) })
    ] })
  ] });
}
function nk({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Fe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(ek, { criterion: e }),
    /* @__PURE__ */ t(tk, { criterion: e })
  ] });
}
function SC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${Fe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(nk, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: Fe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const rk = "_list_dwhoz_2", lk = "_rung_dwhoz_6", ok = "_name_dwhoz_18", ik = "_actor_dwhoz_32", ha = {
  list: rk,
  rung: lk,
  name: ok,
  actor: ik
}, ck = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function sk({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = ck[e.state];
  return /* @__PURE__ */ o("li", { className: ha.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ha.name, children: e.name }),
    /* @__PURE__ */ t(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ha.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function RC({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ha.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(sk, { rung: a }, a.name)) });
}
const dk = "_sheet_1fqco_2", uk = "_title_1fqco_9", hk = "_stage_1fqco_15", mk = "_effects_1fqco_20", wk = "_effect_1fqco_20", _k = "_numeral_1fqco_31", fk = "_effectText_1fqco_38", vk = "_refusals_1fqco_43", bk = "_reasons_1fqco_52", pk = "_reason_1fqco_52", gk = "_actions_1fqco_62", ue = {
  sheet: dk,
  title: uk,
  stage: hk,
  effects: mk,
  effect: wk,
  numeral: _k,
  effectText: fk,
  refusals: vk,
  reasons: bk,
  reason: pk,
  actions: gk
};
function yk({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(_, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function TC({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: c }) {
  const s = k(), u = `${s}-refusal`, [d, h] = g(""), v = n.length > 0;
  return /* @__PURE__ */ t(la, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: ue.effects, children: a.map((b, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ t("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: ue.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ t(
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
    /* @__PURE__ */ t(I, { kind: "textarea", label: "Note for the agent", value: d, onChange: h }),
    v && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ t(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: ue.reasons, children: n.map((b, y) => /* @__PURE__ */ t("li", { className: ue.reason, id: y === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ t(yk, { refused: v, reasonId: u, note: d, onRequeue: l }),
      /* @__PURE__ */ t(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const Nk = "_list_1hvqu_2", kk = "_path_1hvqu_7", $k = "_head_1hvqu_21", Ck = "_label_1hvqu_28", Sk = "_consequence_1hvqu_35", Rk = "_ask_1hvqu_36", Ye = {
  list: Nk,
  path: kk,
  head: $k,
  label: Ck,
  consequence: Sk,
  ask: Rk
}, za = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function It(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Mt(e) {
  return e ? "primary" : "secondary";
}
function Tk({ path: e, primary: a, onChoose: n }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ t(_, { variant: Mt(a), size: "sm", onClick: () => n(e.kind), children: za[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ t(_, { variant: Mt(a), size: "sm", disabled: !0, describedBy: r, children: za[e.kind] }),
    /* @__PURE__ */ t("span", { className: Ye.ask, id: r, children: e.askInstead })
  ] });
}
function xk({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ye.path, "data-allowed": e.allowed, "data-role": It(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ye.head, children: [
      /* @__PURE__ */ t("span", { className: Ye.label, children: e.title ?? za[e.kind] }),
      /* @__PURE__ */ t(m, { role: It(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: Ye.consequence, children: e.consequence }),
    /* @__PURE__ */ t(Tk, { path: e, primary: a, onChoose: n })
  ] });
}
function xC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: Ye.list, children: e.map((n, r) => /* @__PURE__ */ t(xk, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const Lk = "_list_1nyt1_2", Ak = "_item_1nyt1_6", Ek = "_node_1nyt1_18", Ik = "_body_1nyt1_24", Mk = "_head_1nyt1_30", qk = "_stage_1nyt1_36", Bk = "_version_1nyt1_41", Pk = "_sentence_1nyt1_49", Hk = "_meta_1nyt1_54", Ne = {
  list: Lk,
  item: Ak,
  node: Ek,
  body: Ik,
  head: Mk,
  stage: qk,
  version: Bk,
  sentence: Pk,
  meta: Hk
}, Fk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Dk({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ t("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function Ok({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ t(Ee, { size: 9, kind: Fk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(Dk, { entry: e }),
      /* @__PURE__ */ t("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function LC({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Ne.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(Ok, { entry: a }, a.stage + String(n))) });
}
const jk = "_thread_1kn6s_3", Wk = "_turn_1kn6s_8", zk = "_who_1kn6s_27", Kk = "_body_1kn6s_32", ma = {
  thread: jk,
  turn: Wk,
  who: zk,
  body: Kk
}, On = We(!1);
function AC({ children: e, density: a }) {
  return /* @__PURE__ */ t(On.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ma.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function EC({ turn: e }) {
  if (!je(On)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ma.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ma.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ma.body} ward-chat-body`, children: e.body })
  ] });
}
const Gk = "_list_1rt9c_3", Uk = "_row_1rt9c_7", Vk = "_label_1rt9c_20", Xk = "_n_1rt9c_26", Yk = "_cause_1rt9c_33", ea = {
  list: Gk,
  row: Uk,
  label: Vk,
  n: Xk,
  cause: Yk
};
function Jk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Qk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Zk({ row: e, formatNumber: a }) {
  return Jk(e), /* @__PURE__ */ o("li", { className: `${ea.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(Ee, { size: 8, ...Qk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: ea.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${ea.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(e$, { cause: e.cause })
  ] });
}
function e$({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${ea.cause} ward-healthrow-cause`, children: e }) : null;
}
function IC({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ t("ul", { className: `${ea.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(Zk, { row: n, formatNumber: a }, n.label)) });
}
const a$ = "_root_1jxwp_2", t$ = {
  root: a$
};
function MC({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: t$.root, "data-density": l, children: [
    /* @__PURE__ */ t(Aa, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const n$ = "_row_dhbre_3", r$ = "_key_dhbre_13", l$ = "_stack_dhbre_24", o$ = "_value_dhbre_32", i$ = "_evidence_dhbre_39", c$ = "_mark_dhbre_47", Ve = {
  row: n$,
  key: r$,
  stack: l$,
  value: o$,
  evidence: i$,
  mark: c$
};
function s$({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(Qa, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function qC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ve.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Ve.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ve.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Ve.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Ve.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Ve.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(s$, { state: e.state }) })
  ] });
}
const d$ = "_cell_1monp_2", u$ = {
  cell: d$
}, h$ = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function m$(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function w$(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function _$(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: m$(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function f$(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function BC({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  w$(e, n);
  const r = f$(e);
  return /* @__PURE__ */ t(
    _s,
    {
      label: "Rejection routing",
      columns: h$,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: u$.cell, "data-norerun": l.noRerun ? !0 : void 0, children: _$(l, i) }),
      empty: a ?? /* @__PURE__ */ t(tu, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const v$ = "_row_aureb_2", b$ = "_title_aureb_12", p$ = "_turns_aureb_18", g$ = "_waiting_aureb_19", y$ = "_resolved_aureb_20", N$ = "_activity_aureb_21", k$ = "_cost_aureb_28", $$ = "_link_aureb_29", C$ = "_tableLink_aureb_47", S$ = "_tableRecord_aureb_48", R$ = "_tableRow_aureb_59", T$ = "_tableTitle_aureb_71", x$ = "_tableResolved_aureb_76", L$ = "_tableMeta_aureb_91", A$ = "_tableCost_aureb_98", E$ = "_tableActivity_aureb_99", I$ = "_tableState_aureb_109", F = {
  row: v$,
  title: b$,
  turns: p$,
  waiting: g$,
  resolved: y$,
  activity: N$,
  cost: k$,
  link: $$,
  tableLink: C$,
  tableRecord: S$,
  tableRow: R$,
  tableTitle: T$,
  tableResolved: x$,
  tableMeta: L$,
  tableCost: A$,
  tableActivity: E$,
  tableState: I$
}, jn = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function M$(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function q$(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function B$(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const P$ = { duplicate: "Closed · duplicate" };
function H$({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(Ae, { className: F.tableMeta, text: `waiting on ${e}` });
}
function F$({ value: e }) {
  return /* @__PURE__ */ t("td", { className: F.tableCost, children: e === void 0 ? null : re(e) });
}
function D$({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${F.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function O$({ session: e, href: a }) {
  const n = jn[e.state];
  return /* @__PURE__ */ o("tr", { className: F.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: F.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${F.tableLink} ward-target`, href: W(a), children: /* @__PURE__ */ t(Ae, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: F.tableMeta, children: q$(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: F.tableResolved, children: [
      B$(e.resolved),
      /* @__PURE__ */ t(H$, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(F$, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: F.tableActivity, children: M$(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: F.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(m, { role: n.role, label: P$[e.state] ?? n.label }),
      /* @__PURE__ */ t(D$, { link: e.link })
    ] }) })
  ] });
}
function j$({ session: e }) {
  const a = jn[e.state];
  return /* @__PURE__ */ o("div", { className: F.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(Ae, { className: F.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: F.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(Ae, { className: F.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: F.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: F.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ t("span", { className: F.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: F.link, href: W(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function PC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(O$, { session: e.session, href: e.href }) : /* @__PURE__ */ t(j$, { session: e.session });
}
const W$ = "_block_1yy2v_3", z$ = "_list_1yy2v_9", K$ = "_line_1yy2v_14", Ka = {
  block: W$,
  list: z$,
  line: K$
}, G$ = { warn: "warning", ok: "ok" };
function U$({ kind: e }) {
  const a = G$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function V$({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Ka.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(U$, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function HC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${Ka.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: Ka.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(V$, { line: n }, `${r}-${n.text}`)) }) });
}
const X$ = "_band_tt7hp_1", Y$ = "_head_tt7hp_8", J$ = "_cell_tt7hp_19", Q$ = "_index_tt7hp_35", Z$ = "_title_tt7hp_42", e0 = "_note_tt7hp_48", a0 = "_cellTitle_tt7hp_53", t0 = "_cellBody_tt7hp_58", n0 = "_tag_tt7hp_64", pe = {
  band: X$,
  head: Y$,
  cell: J$,
  index: Q$,
  title: Z$,
  note: e0,
  cellTitle: a0,
  cellBody: t0,
  tag: n0
}, qt = 4;
function FC({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== qt)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${qt}-cell grid`);
  return /* @__PURE__ */ o("section", { className: pe.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: pe.head, children: [
      /* @__PURE__ */ t("span", { className: pe.index, children: e }),
      /* @__PURE__ */ t("span", { className: pe.title, children: a }),
      /* @__PURE__ */ t("span", { className: pe.note, children: n })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: pe.cell, children: [
      /* @__PURE__ */ t("span", { className: pe.cellTitle, children: l.title }),
      /* @__PURE__ */ t("span", { className: pe.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ t("span", { className: pe.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  C0 as ActionStack,
  kC as ActivityConsole,
  fw as AgentCard,
  f0 as AppShell,
  iC as AppearanceStrip,
  FC as Band,
  N0 as BarChart,
  Pu as BoardColumn,
  D0 as BoardFootnote,
  O0 as BoardHeader,
  E0 as BoardScroller,
  _ as Btn,
  h0 as CHIP_ROLES,
  Rn as CREDENTIAL_COLUMNS,
  y0 as Callout,
  cC as CapabilityRow,
  EC as ChatMessage,
  jt as Checkbox,
  m as Chip,
  Ae as ClampText,
  $C as ClarificationRow,
  J0 as ClauseRuleRow,
  Y0 as ClauseRules,
  on as ColourLadder,
  sC as ComponentRow,
  CC as Composer,
  W0 as ConfigRow,
  j0 as ConfigRowHead,
  Za as ConnectionMark,
  NC as ConsoleAnnounceProvider,
  AC as Conversation,
  as as CostMeter,
  uC as CredentialRow,
  dC as CredentialRowHead,
  SC as CriteriaList,
  Fl as Crumb,
  IC as DeliveryHealth,
  q0 as DeniedState,
  Z0 as DryRunRail,
  tu as EmptyState,
  hC as EnvCard,
  I as Field,
  M0 as FilteredEmpty,
  L0 as FormStack,
  Aa as GateChecklist,
  RC as GateLadder,
  _s as Grid,
  aC as HandoffRuleRow,
  eC as HandoffRules,
  z0 as ItemDrawer,
  mC as KeyPanel,
  or as LIVE_EVENT_TYPES,
  Hm as LegacyBoardColumn,
  G0 as LegacyBoardHeader,
  U0 as LegacyConfigRow,
  X0 as LegacyItemDrawer,
  Am as LegacyOverCapNote,
  V0 as LegacyPreviewRail,
  nn as LegacyWorkCard,
  Ce as LiveIndicator,
  B0 as LoadFailed,
  F0 as Loading,
  In as MCP_SERVER_COLUMNS,
  Qa as Mark,
  _C as MarkUpload,
  Ee as Marker,
  vC as McpServerRow,
  fC as McpServerRowHead,
  tC as NewStreamModal,
  lu as OverCapNote,
  la as Overlay,
  Q0 as PARTIAL_STEP_REASON,
  Mn as POLICY_CHIP_WIDTH,
  R0 as PageFrame,
  g0 as PageHeader,
  k0 as PlainList,
  bC as PolicyRow,
  K0 as PreviewRail,
  Ba as ROLE_MATRIX_COLUMNS,
  pn as RULE_ACTIONS,
  Jt as Radio,
  MC as ReadyChecklist,
  x0 as RecordSection,
  TC as RequeueSheet,
  xC as ResolveBlock,
  qC as ResolvedFieldRow,
  pC as RoleMatrixRow,
  BC as RoutingTable,
  nC as RuleRow,
  gC as RunbookSteps,
  lr as STREAM_STEPS,
  A0 as SectionBand,
  pt as SectionHeader,
  Xt as SegmentedControl,
  Gt as Select,
  PC as SessionRow,
  p0 as Sidebar,
  rC as StageColumn,
  I0 as StageGrid,
  LC as StageHistory,
  Qf as StageListEditor,
  P0 as StaleStrip,
  Ta as StatStrip,
  lC as StreamRow,
  T0 as SubjectRail,
  Oe as Switch,
  b0 as TabLinks,
  $0 as TableHead,
  v0 as Tabs,
  oC as ToolRow,
  S0 as TopBar,
  vd as Tree,
  en as TreeRow,
  HC as TypedInputBlock,
  tl as UNSAFE_HREF,
  yC as ValidationList,
  i0 as VisibilityProvider,
  c0 as Visible,
  u0 as WARD_VERSION,
  La as WorkCard,
  H0 as WriteUnavailableStrip,
  M$ as agoSince,
  Jn as clock,
  _v as colourStatus,
  ae as count,
  se as duration,
  Ua as elapsed,
  d0 as eventSourceTransport,
  $a as isStreamStep,
  Ca as isValidatedStreamStep,
  Gw as ladderValidation,
  Hy as mcpConnectionChip,
  By as mcpToolName,
  re as money,
  we as ms,
  an as ordered,
  Pt as ratio,
  rg as restartLabel,
  W as safeHref,
  de as stamp,
  Dt as stream,
  w0 as streamChip,
  Ra as streamChipProps,
  ve as streamColour,
  cr as streamHex,
  m0 as streamVars,
  da as useBorderFlash,
  tr as useFocusTrap,
  _0 as useLiveFeed,
  s0 as useReturnFocus,
  ka as useRovingTabindex,
  Va as useTicker,
  Qn as useVisible,
  K as v,
  wC as validateMark,
  ra as validatedStep,
  Ft as validatedStreamSteps
};
